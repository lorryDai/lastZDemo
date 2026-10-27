import { _decorator, Component, Node } from 'cc';
import { BuffId, CFG, COLORS, laneX, makeBox, makePlane } from './GameConfig';
import { world } from './World';
import { bus, EV } from './EventBus';
import { BuffSystem } from './BuffSystem';

const { ccclass } = _decorator;

/**
 * 英雄：鼠标自由横移 + 自动射击。
 * - 横向位置由鼠标跟随（连续移动，不再离散换道），laneIndex 只作为碰撞归属的近似值
 * - 默认自动射击，子弹笔直向前，不做追踪
 * - 子弹横向对准目标 → 爆头 2.5 倍
 * - 技能独立充能（击杀 / 受击 / 时间），一键释放清场 + 护盾
 */
@ccclass('PlayerController')
export class PlayerController extends Component {
    laneIndex = 1;
    hp = CFG.playerMaxHp;
    maxHp = CFG.playerMaxHp;
    skill = 0;
    alive = false;

    /** 鼠标指向的目标 X（世界单位），角色每帧朝它平滑靠过去 */
    private targetX = 0;

    private buffs: BuffSystem = null!;
    private body: Node = null!;
    private gun: Node = null!;
    private shield: Node = null!;
    private wingL: Node = null!;
    private wingR: Node = null!;

    private fireCd = 0;
    private shieldTime = 0;
    private invTime = 0;
    private flashTime = 0;

    init(buffs: BuffSystem): void {
        this.buffs = buffs;
        this.buildVisual();
        this.reset();
    }

    private buildVisual(): void {
        const root = this.node;
        this.body = makeBox('Body', 0.9, 1.4, 0.9, COLORS.player, root);
        this.body.setPosition(0, 0.7, 0);
        const head = makeBox('Head', 0.6, 0.6, 0.6, COLORS.playerGun, root);
        head.setPosition(0, 1.7, 0);
        this.gun = makeBox('Gun', 0.22, 0.22, 1.5, COLORS.playerGun, root);
        this.gun.setPosition(0, 1.15, -1.0);
        // 护盾（技能期间显示）
        this.shield = makePlane('Shield', 2.6, 2.6, COLORS.shield, root);
        this.shield.setPosition(0, 0.06, 0);
        this.shield.active = false;
        // 脚下拖尾：给出「持续向前推进」的视觉参照
        const trail = makeBox('Trail', 0.7, 0.06, 3.2, COLORS.trail, root);
        trail.setPosition(0, 0.03, 1.8);
        // 僚机：英雄模型的复制体，分列左右各一条车道
        this.wingL = this.buildWing(-1);
        this.wingR = this.buildWing(1);
    }

    /** 僚机复制体（与英雄同一套模型，只有「僚机支援」buff 生效时才显示） */
    private buildWing(side: number): Node {
        const root = new Node(side < 0 ? 'WingLeft' : 'WingRight');
        root.parent = this.node;
        root.setPosition(side * CFG.laneWidth, 0, 0.2);
        const body = makeBox('Body', 0.9, 1.4, 0.9, COLORS.player, root);
        body.setPosition(0, 0.7, 0);
        const head = makeBox('Head', 0.6, 0.6, 0.6, COLORS.playerGun, root);
        head.setPosition(0, 1.7, 0);
        const gun = makeBox('Gun', 0.22, 0.22, 1.5, COLORS.playerGun, root);
        gun.setPosition(0, 1.15, -1.0);
        root.active = false;
        return root;
    }

    /** 每局开始重置 */
    reset(): void {
        this.laneIndex = 1;
        this.targetX = laneX(1);
        this.hp = CFG.playerMaxHp;
        this.skill = 0;
        this.alive = true;
        this.fireCd = 0;
        this.shieldTime = 0;
        this.invTime = 0;
        this.flashTime = 0;
        this.node.setPosition(this.targetX, 0, CFG.playerZ);
        this.node.setScale(1, 1, 1);
        this.shield.active = false;
    }

    /** 鼠标横移：把指针换算出的世界 X 交给角色，限制在跑道内 */
    setTargetX(x: number): void {
        if (!this.alive) return;
        const half = (CFG.laneCount * CFG.laneWidth) / 2 - 0.6;
        this.targetX = Math.max(-half, Math.min(half, x));
    }

    /** 键盘 A/D：按一次挪一条车道 */
    nudgeLane(dir: number): void {
        if (!this.alive) return;
        this.setTargetX(this.targetX + dir * CFG.laneWidth);
    }

    addSkill(v: number): void {
        if (!this.alive) return;
        this.skill = Math.min(CFG.skillMax, this.skill + v);
        bus.emit(EV.SKILL, this.skill / CFG.skillMax);
    }

    takeDamage(dmg: number): void {
        if (!this.alive || this.invTime > 0) return;
        let real = dmg;
        if (this.shieldTime > 0) real = dmg * 0.4; // 护盾期减伤
        this.hp -= real;
        this.invTime = 0.35;
        this.flashTime = 0.16;
        this.addSkill(CFG.skillGainHit);
        bus.emit(EV.HP, this.hp / this.maxHp);
        if (this.hp <= 0) {
            this.hp = 0;
            this.alive = false;
            bus.emit(EV.RUN_END, { win: false });
        }
    }

    /** 释放技能：正面清场 + 回血 + 护盾 */
    castSkill(): boolean {
        if (!this.alive || this.skill < CFG.skillMax) return false;
        this.skill = 0;
        bus.emit(EV.SKILL, 0);
        const pz = this.node.position.z;
        for (const z of world.zombies.slice()) {
            if (z.alive && z.node.position.z < pz + 1.5) {
                z.takeDamage(CFG.skillDamage, false);
            }
        }
        for (const o of world.objects.slice()) {
            if (o.alive && o.node.position.z < pz + 1.5) {
                o.takeDamage(CFG.skillDamage, false);
            }
        }
        this.shieldTime = CFG.skillShieldTime;
        this.hp = Math.min(this.maxHp, this.hp + CFG.skillHeal);
        bus.emit(EV.HP, this.hp / this.maxHp);
        return true;
    }

    update(dt: number): void {
        // 僚机复制体：只在「僚机支援」生效且在场时显示
        const escort = this.alive && this.buffs.has(BuffId.Escort);
        if (this.wingL.active !== escort) {
            this.wingL.active = escort;
            this.wingR.active = escort;
        }
        if (!this.alive) return;

        // 1. 横向跟随鼠标（连续移动），laneIndex 取最近车道作为碰撞归属
        const px = this.node.position.x;
        const nx = Math.abs(this.targetX - px) < 0.02
            ? this.targetX
            : px + (this.targetX - px) * Math.min(1, CFG.laneLerp * dt);
        this.node.setPosition(nx, 0, CFG.playerZ);
        world.playerZ = CFG.playerZ;
        this.laneIndex = Math.max(0, Math.min(CFG.laneCount - 1,
            Math.round(nx / CFG.laneWidth + (CFG.laneCount - 1) / 2)));
        world.playerLane = this.laneIndex;

        // 2. 时间类计时器
        if (this.invTime > 0) this.invTime -= dt;
        if (this.flashTime > 0) {
            this.flashTime -= dt;
            const k = this.flashTime > 0 ? 1.15 : 1;
            this.node.setScale(k, k, k); // 受击闪缩
        }
        if (this.shieldTime > 0) {
            this.shieldTime -= dt;
            this.shield.active = this.shieldTime > 0;
        }

        // 3. 技能充能（时间维度）
        this.addSkill(CFG.skillGainPerSec * dt);

        // 4. 自动射击
        this.fireCd -= dt;
        if (this.fireCd <= 0) {
            this.fireCd = CFG.fireInterval / this.buffs.mul(BuffId.FireRate);
            this.fire();
        }
    }

    private fire(): void {
        const dmg = CFG.baseDamage * this.buffs.mul(BuffId.Damage);
        // 枪口取角色当前实际坐标（跟随鼠标途中也是真实位置）
        const gx = this.node.position.x;
        const gz = this.node.position.z - 1.2;
        // 笔直向前：不追踪任何目标，命中谁由子弹自己的横向位置决定
        world.spawnBullet(gx, gz, dmg);

        // 僚机：从左右各一条车道的位置平行补射
        if (this.buffs.has(BuffId.Escort)) {
            world.spawnBullet(gx - CFG.laneWidth, gz, dmg * 0.6);
            world.spawnBullet(gx + CFG.laneWidth, gz, dmg * 0.6);
        }
    }
}
