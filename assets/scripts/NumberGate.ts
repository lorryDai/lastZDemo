import { _decorator, Component } from 'cc';
import { BuffId, CFG, COLORS, advanceZ, laneX, makeBox } from './GameConfig';
import { ITag, IUnit, removeFrom, world } from './World';
import { bus, EV } from './EventBus';
import { BuffSystem } from './BuffSystem';

const { ccclass } = _decorator;

/** 数字门：有血量，打空后大额奖励（技能满充 + 本局永久增伤） */
@ccclass('NumberGate')
export class NumberGate extends Component implements IUnit {
    laneIndex = 0;
    alive = false;
    hitHalfWidth = 1.7;
    tag?: ITag;
    hp = 0;
    maxHp = 130;
    private buffs: BuffSystem = null!;
    private touched = false;

    init(buffs: BuffSystem): void {
        this.buffs = buffs;
    }

    /** 覆盖左侧两条车道，右侧留一条规避路线：打或绕，由玩家取舍 */
    build(z: number): void {
        this.laneIndex = 0;
        this.hp = this.maxHp;
        this.alive = true;
        this.touched = false;
        this.node.removeAllChildren();
        this.node.setPosition(laneX(0) + CFG.laneWidth / 2, 0, z);
        for (const d of [-1, 1]) {
            const post = makeBox('Post', 0.4, 3.2, 0.4, COLORS.gate, this.node);
            post.setPosition(d * CFG.laneWidth, 1.6, 0);
        }
        const bar = makeBox('Bar', CFG.laneWidth * 2, 0.4, 0.4, COLORS.gate, this.node);
        bar.setPosition(0, 3.2, 0);
        const panel = makeBox('Panel', CFG.laneWidth * 2, 2.6, 0.12, COLORS.gate, this.node);
        panel.setPosition(0, 1.6, 0);
        this.tag = { name: this.tagText(), height: 4.4, color: COLORS.tagItem };
    }

    /** 头顶名牌直接显示剩余血量，玩家不必看 HUD 就能决定打还是绕 */
    private tagText(): string {
        return `数字门 ${Math.max(0, Math.ceil(this.hp))}/${this.maxHp}`;
    }

    takeDamage(dmg: number): void {
        if (!this.alive) return;
        this.hp -= dmg;
        if (this.tag) this.tag.name = this.tagText();
        bus.emit(EV.GATE_PROMPT, `数字门 ${Math.max(0, Math.ceil(this.hp))}/${this.maxHp}　打爆可得技能满充 + 增伤 20%`);
        if (this.hp <= 0) {
            this.alive = false;
            this.buffs.applyPermanent(BuffId.Damage, 0.2, '增伤+20%');
            world.chargeSkill(CFG.skillMax);
            bus.emit(EV.GATE_DONE, '数字门已击破：技能满充 + 增伤 20%');
            removeFrom(world.objects, this);
            world.release('gate', this.node);
        }
    }

    update(dt: number): void {
        if (!this.alive) return;
        advanceZ(this.node, world.travelSpeed * dt);
        // 门被绕过后提示消失
        if (this.node.position.z > world.playerZ + 2) {
            bus.emit(EV.GATE_PROMPT, '');
        }
        // 门板横跨左两条车道：硬闯也要付代价，逼玩家在「打爆」和「绕开」间二选一
        if (!this.touched && Math.abs(this.node.position.z - world.playerZ) < 1.2 && world.playerLane <= 1) {
            this.touched = true;
            world.hitPlayer(CFG.hazardDamage * 0.6);
        }
        if (this.node.position.z > CFG.despawnZ) {
            this.alive = false;
            removeFrom(world.objects, this);
            world.release('gate', this.node);
        }
    }
}
