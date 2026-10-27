import { _decorator, Color, Component, MeshRenderer, Node, Vec3 } from 'cc';
import { CFG, COLORS, ZombieType, advanceZ, laneX, makeBox, unlitMaterial } from './GameConfig';
import { ITag, IUnit, removeFrom, world } from './World';
import { bus, EV } from './EventBus';

const { ccclass } = _decorator;

const ZOMBIE_NAME: Record<number, string> = {
    [ZombieType.Normal]: '普通丧尸',
    [ZombieType.Runner]: '疾跑丧尸',
    [ZombieType.Bomber]: '自爆丧尸',
    [ZombieType.Tank]: '重甲感染者',
    [ZombieType.Boss]: 'BOSS',
};

interface ZombieStat {
    hp: number;
    speed: number;
    damage: number;
    width: number;
    height: number;
    color: import('cc').Color;
}

/** 受击闪缩需要逐个改主体部件材质，这里记录一下 */
interface VisualPart {
    node: Node;
    mr: MeshRenderer;
    base: Color;
}

/**
 * 丧尸实体。四种普通类型共用一套逻辑，仅数值与行为分支不同；
 * BOSS 走多阶段分支（Rule.md：多阶段、多轨道 AOE、召唤小怪）。
 */
@ccclass('Zombie')
export class Zombie extends Component implements IUnit {
    type: ZombieType = ZombieType.Normal;
    laneIndex = 1;
    alive = false;
    /** 子弹横向判定半宽，按体型设置 */
    hitHalfWidth = 0.6;
    tag?: ITag;

    private hp = 0;
    private maxHp = 0;
    private damage = 0;
    private speed = 0;
    private hitCd = 0;
    private fuseTime = -1;   // 自爆倒计时
    private phase = 1;       // BOSS 阶段
    private aoeCd = 0;
    private summonCd = 0;
    private engaged = false; // BOSS 是否已拦住玩家
    private flash = 0;
    private aoeDelay = -1;   // AOE 落地倒计时（-1 表示没有待结算的 AOE）
    private aoeLanes: number[] = [];
    private parts: VisualPart[] = [];
    private trailAdded = false;

    build(type: ZombieType, lane: number, z: number): void {
        this.type = type;
        this.laneIndex = lane;
        this.node.setPosition(laneX(lane), 0, z);
        this.applyStat();
    }

    private applyStat(): void {
        const st = this.statOf(this.type);
        this.maxHp = st.hp;
        this.hp = st.hp;
        this.damage = st.damage;
        this.speed = st.speed;
        this.alive = true;
        this.hitCd = 0;
        this.fuseTime = this.type === ZombieType.Bomber ? 2.4 : -1;
        this.phase = 1;
        this.aoeCd = 3;
        this.summonCd = 6;
        this.engaged = false;
        this.flash = 0;
        this.aoeDelay = -1;
        this.aoeLanes = [];
        this.buildVisual(st);
        this.hitHalfWidth = st.width * 0.5 + 0.15;
        this.tag = {
            name: ZOMBIE_NAME[this.type] || '丧尸',
            height: st.height + st.width * 0.8 + (this.type === ZombieType.Boss ? 1.4 : 0.6),
            color: this.type === ZombieType.Boss ? COLORS.tagDanger : COLORS.tagMob,
        };
    }

    private statOf(type: ZombieType): ZombieStat {
        switch (type) {
            case ZombieType.Runner:
                return { hp: 16, speed: 16, damage: 10, width: 0.8, height: 1.5, color: COLORS.runner };
            case ZombieType.Bomber:
                return { hp: 22, speed: 8, damage: CFG.hazardDamage, width: 0.9, height: 1.1, color: COLORS.bomber };
            case ZombieType.Tank:
                return { hp: 90, speed: 4.2, damage: 18, width: 1.4, height: 2.0, color: COLORS.tank };
            case ZombieType.Boss:
                return { hp: CFG.bossHp, speed: 3.2, damage: 22, width: 2.8, height: 3.0, color: COLORS.boss };
            default:
                return { hp: 26, speed: 6.4, damage: 12, width: 0.9, height: 1.6, color: COLORS.normal };
        }
    }

    private addTrail(): void {
        this.trailAdded = true;
        const t = makeBox('Trail', 0.5, 0.5, 3.2, COLORS.trail, this.node);
        t.setPosition(0, 0.9, 1.8);
    }

    private buildVisual(st: ZombieStat): void {
        this.node.removeAllChildren();
        this.parts = [];
        this.trailAdded = false;
        const body = makeBox('Body', st.width, st.height, st.width, st.color, this.node);
        body.setPosition(0, st.height / 2, 0);
        this.trackPart(body, st.color);
        // 头部用方盒（不用 sphere，规避图元 API 差异）
        const head = makeBox('Head', st.width * 0.8, st.width * 0.8, st.width * 0.8, st.color, this.node);
        head.setPosition(0, st.height + st.width * 0.32, 0);
        this.trackPart(head, st.color);
        if (this.type === ZombieType.Boss) {
            // BOSS 加两条臂与头顶尖刺，增加识别度
            for (const d of [-1, 1]) {
                const arm = makeBox('Arm', 0.6, 2.2, 0.6, COLORS.boss, this.node);
                arm.setPosition(d * (st.width / 2 + 0.4), 1.4, 0);
                this.trackPart(arm, COLORS.boss);
            }
            const horn = makeBox('Horn', 0.3, 0.9, 0.3, COLORS.hazard, this.node);
            horn.setPosition(0, st.height + 1.2, 0);
        }
        if (this.type === ZombieType.Tank) {
            const armor = makeBox('Armor', st.width + 0.2, st.height * 0.7, st.width + 0.2, COLORS.wall, this.node);
            armor.setPosition(0, st.height * 0.55, 0);
            this.trackPart(armor, COLORS.wall);
        }
    }

    /** 登记到受击闪缩列表 */
    private trackPart(node: Node, color: Color): void {
        const mr = node.getComponent(MeshRenderer);
        if (mr) this.parts.push({ node, mr, base: color });
    }

    private applyFlash(on: boolean): void {
        if (!this.parts) return;
        for (const p of this.parts) {
            p.mr.setMaterial(unlitMaterial(on ? COLORS.hitFlash : p.base), 0);
        }
    }

    takeDamage(dmg: number, headshot: boolean): void {
        if (!this.alive) return;
        const real = headshot ? dmg * CFG.headshotMul : dmg;
        this.hp -= real;
        if (headshot) bus.emit(EV.HEADSHOT, true);
        this.flash = 0.08;
        this.applyFlash(true);
        if (this.hp <= 0) this.die(headshot);
    }

    private die(headshot: boolean): void {
        this.alive = false;
        if (this.type === ZombieType.Boss) {
            world.bossEngaged = false;
            bus.emit(EV.BOSS_INCOMING, false);
            world.onBossKilled();
        } else {
            world.onKill(headshot);
        }
        removeFrom(world.zombies, this);
        world.release(this.type === ZombieType.Boss ? 'boss' : 'zombie', this.node);
    }

    /** 命中玩家检测：同轨 + Z 轴接近 */
    private tryHitPlayer(): boolean {
        if (world.playerLane !== this.laneIndex) return false;
        const dz = this.node.position.z - world.playerZ;
        return dz > -1.2 && dz < 1.6;
    }

    update(dt: number): void {
        if (!this.alive) return;

        // 受击闪缩恢复
        if (this.flash > 0) {
            this.flash -= dt;
            if (this.flash <= 0) {
                this.applyFlash(false);
                if (this.type === ZombieType.Bomber) this.node.setScale(1, 1, 1);
            }
        }

        if (this.type === ZombieType.Boss) {
            this.updateBoss(dt, this.node.position);
            return;
        }

        // 沿轨道向 +Z（朝玩家）推进
        advanceZ(this.node, this.enterSpeed(dt));
        const p = this.node.position;

        // 高速型加一条速度拖尾，让「突进」在画面上读得出来
        if (this.speed >= 10 && !this.trailAdded) this.addTrail();

        // 自爆丧尸：进入引信范围后倒计时，结束时范围伤害
        if (this.type === ZombieType.Bomber && p.z > CFG.playerZ - 12) {
            this.fuseTime -= dt;
            if (this.flash <= 0) {
                const k = 1 + Math.sin(this.fuseTime * 22) * 0.12;
                this.node.setScale(k, k, k);
            }
            if (this.fuseTime <= 0) {
                this.explode();
                return;
            }
        }

        // 撞击判定
        if (this.hitCd > 0) this.hitCd -= dt;
        if (this.hitCd <= 0 && this.tryHitPlayer()) {
            this.hitCd = 1.0;
            world.hitPlayer(this.damage);
            if (this.type === ZombieType.Bomber) {
                this.explode();
                return;
            }
        }

        if (p.z > CFG.despawnZ) {
            this.alive = false;
            removeFrom(world.zombies, this);
            world.release('zombie', this.node);
        }
    }

    private enterSpeed(dt: number): number {
        return (this.speed + world.entitySpeed * 0.35) * dt;
    }

    private explode(): void {
        // 自爆：范围伤害，玩家在相邻轨道也会被波及
        const dl = Math.abs(world.playerLane - this.laneIndex);
        const dz = Math.abs(this.node.position.z - world.playerZ);
        if (dl <= 1 && dz < 2.6) {
            world.hitPlayer(dl === 0 ? this.damage : this.damage * 0.6);
        }
        this.alive = false;
        removeFrom(world.zombies, this);
        world.release('zombie', this.node);
    }

    // ------------------------------------------------------------ BOSS
    private updateBoss(dt: number, p: Vec3): void {
        // 阶段推进
        const ratio = this.hp / this.maxHp;
        const next = ratio > 0.66 ? 1 : ratio > 0.33 ? 2 : 3;
        if (next !== this.phase) {
            this.phase = next;
            this.aoeCd = 1.2;
            bus.emit(EV.GATE_PROMPT, `BOSS 进入第 ${this.phase} 阶段`);
        }

        if (!this.engaged) {
            // 先推进到拦截位置，然后停住挡住玩家
            if (p.z < CFG.bossHoldZ) {
                advanceZ(this.node, this.enterSpeed(dt));
            } else {
                this.node.setPosition(p.x, p.y, CFG.bossHoldZ);
                this.engaged = true;
                world.bossEngaged = true;
                bus.emit(EV.BOSS_INCOMING, true);
            }
            return;
        }

        // 左右缓慢游走，制造多轨道压迫
        const t = this.phase === 3 ? 2.2 : 1.2;
        const wander = Math.sin(performance.now() / 1000 * t) * (this.phase === 3 ? laneX(CFG.laneCount - 1) : laneX(1));
        const nx = p.x + (wander - p.x) * Math.min(1, dt * 1.6);
        this.node.setPosition(nx, p.y, p.z);
        this.laneIndex = this.nearLane(nx);

        // 阶段 2+：多轨道 AOE
        this.aoeCd -= dt;
        if (this.aoeCd <= 0 && this.phase >= 2) {
            this.aoeCd = this.phase === 3 ? 2.4 : 3.4;
            this.castAoe();
        }

        this.tickAoe(dt);

        // 阶段 3：召唤小怪
        this.summonCd -= dt;
        if (this.summonCd <= 0 && this.phase >= 3) {
            this.summonCd = 6;
            this.summon();
        }

        // 近身撞击
        if (this.hitCd > 0) this.hitCd -= dt;
        if (this.hitCd <= 0 && this.tryHitPlayer()) {
            this.hitCd = 1.0;
            world.hitPlayer(this.damage);
        }
    }

    private nearLane(x: number): number {
        let best = 0;
        let bd = Infinity;
        for (let i = 0; i < CFG.laneCount; i++) {
            const d = Math.abs(laneX(i) - x);
            if (d < bd) {
                bd = d;
                best = i;
            }
        }
        return best;
    }

    /**
     * 多轨道 AOE：先放预警，0.9 秒后结算。
     * 用自身计时器而不是 scheduleOnce——BOSS 节点会从池里复用，
     * 遗留的延迟回调会在下一次生命里误触发。
     */
    private castAoe(): void {
        const hitLanes = this.phase === 3
            ? [0, 1, 2].filter((l) => l !== this.laneIndex)
            : [this.laneIndex];
        for (const l of hitLanes) {
            if (l < 0 || l >= CFG.laneCount) continue;
            world.spawnWarning(l, 0.9);
        }
        this.aoeLanes = hitLanes.slice();
        this.aoeDelay = 0.9;
    }

    /** 结算待落地的 AOE */
    private tickAoe(dt: number): void {
        if (this.aoeDelay < 0) return;
        this.aoeDelay -= dt;
        if (this.aoeDelay > 0) return;
        this.aoeDelay = -1;
        if (!this.alive) return;
        if (this.aoeLanes.indexOf(world.playerLane) >= 0) {
            world.hitPlayer(CFG.bossAoeDamage);
        }
        this.aoeLanes = [];
    }

    private summon(): void {
        for (let i = 0; i < 2; i++) {
            const lane = Math.floor(Math.random() * CFG.laneCount);
            world.spawnZombie(Math.random() < 0.5 ? ZombieType.Runner : ZombieType.Normal, lane, CFG.spawnZ + 4);
        }
    }
}