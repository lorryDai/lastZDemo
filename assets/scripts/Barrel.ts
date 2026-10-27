import { _decorator, Component } from 'cc';
import { BuffId, CFG, COLORS, advanceZ, laneX, makeCylinder } from './GameConfig';
import { ITag, IUnit, removeFrom, world } from './World';
import { BuffSystem } from './BuffSystem';

const { ccclass } = _decorator;

/** 油桶：可击毁，掉落临时增益（攻速 / 伤害 / 僚机） */
@ccclass('Barrel')
export class Barrel extends Component implements IUnit {
    laneIndex = 1;
    alive = false;
    hitHalfWidth = 0.75;
    tag?: ITag;
    private hp = 0;
    private buffs: BuffSystem = null!;

    init(buffs: BuffSystem): void {
        this.buffs = buffs;
    }

    build(lane: number, z: number): void {
        this.laneIndex = lane;
        this.hp = 12;
        this.alive = true;
        this.node.removeAllChildren();
        this.node.setPosition(laneX(lane), 0, z);
        const body = makeCylinder('Barrel', 0.5, 1.2, COLORS.barrel, this.node);
        body.setPosition(0, 0.6, 0);
        this.tag = { name: '油桶', height: 1.9, color: COLORS.tagItem };
    }

    takeDamage(dmg: number): void {
        if (!this.alive) return;
        this.hp -= dmg;
        if (this.hp <= 0) this.grant();
    }

    /** 撞破也给 buff：风险收益设计的一部分 */
    private grant(): void {
        this.alive = false;
        const pick = Math.random();
        if (pick < 0.35) {
            this.buffs.apply(BuffId.Damage, 0.4, 10, '伤害+40%');
        } else if (pick < 0.7) {
            this.buffs.apply(BuffId.FireRate, 0.3, 10, '攻速+30%');
        } else {
            this.buffs.apply(BuffId.Escort, 1, 10, '僚机支援');
        }
        removeFrom(world.objects, this);
        world.release('barrel', this.node);
    }

    update(dt: number): void {
        if (!this.alive) return;
        advanceZ(this.node, world.travelSpeed * dt);
        if (Math.abs(this.node.position.z - world.playerZ) < 1.4 && world.playerLane === this.laneIndex) {
            this.grant();
            return;
        }
        if (this.node.position.z > CFG.despawnZ) {
            this.alive = false;
            removeFrom(world.objects, this);
            world.release('barrel', this.node);
        }
    }
}
