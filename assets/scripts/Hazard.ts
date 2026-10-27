import { _decorator, Component } from 'cc';
import { CFG, COLORS, HazardType, advanceZ, laneX, makeBox, makeCylinder } from './GameConfig';
import { IHazard, ITag, removeFrom, world } from './World';

const { ccclass } = _decorator;

const HAZARD_NAME: Record<number, string> = {
    [HazardType.Spike]: '尖刺',
    [HazardType.Roller]: '滚轮',
    [HazardType.Charger]: '冲撞怪',
};

/** 不可破坏危险体：打不掉，碰到直接扣大量血（Rule.md 最高优先级） */
@ccclass('Hazard')
export class Hazard extends Component implements IHazard {
    laneIndex = 1;
    alive = false;
    tag?: ITag;
    kind: HazardType = HazardType.Spike;
    private touched = false;

    build(kind: HazardType, lane: number, z: number): void {
        this.kind = kind;
        this.laneIndex = lane;
        this.alive = true;
        this.touched = false;
        this.node.removeAllChildren();
        this.node.setPosition(laneX(lane), 0, z);

        if (kind === HazardType.Roller) {
            const r = makeCylinder('Roller', 1.0, CFG.laneWidth * 0.9, COLORS.hazard, this.node);
            r.setPosition(0, 1.0, 0);
            r.setRotationFromEuler(0, 0, 90);
            const core = makeBox('Core', 1.6, 1.2, 1.6, COLORS.wall, this.node);
            core.setPosition(0, 1.2, 0);
        } else if (kind === HazardType.Spike) {
            for (let i = -1; i <= 1; i++) {
                const s = makeBox('Spike', 0.5, 1.4, 0.5, COLORS.hazard, this.node);
                s.setPosition(i * 1.0, 0.7, 0);
                s.setRotationFromEuler(0, 0, 18 * i);
            }
            const base = makeBox('Base', 3.0, 0.3, 1.6, COLORS.wall, this.node);
            base.setPosition(0, 0.15, 0);
        } else {
            const c = makeBox('Charger', 1.1, 1.4, 1.1, COLORS.hazard, this.node);
            c.setPosition(0, 0.7, 0);
            const f = makeBox('Flag', 0.2, 1.6, 0.2, COLORS.bulletHead, this.node);
            f.setPosition(0, 2.2, 0);
        }
        this.tag = {
            name: HAZARD_NAME[kind] || '危险体',
            height: kind === HazardType.Charger ? 3.4 : 2.6,
            color: COLORS.tagDanger,
        };
    }

    update(dt: number): void {
        if (!this.alive) return;
        // 冲撞怪跑得比世界推进更快
        const sp = world.travelSpeed + (this.kind === HazardType.Charger ? 6 : 0);
        advanceZ(this.node, sp * dt);
        if (this.kind === HazardType.Roller) {
            const r = this.node.children[0];
            if (r) r.setRotationFromEuler(0, 0, 90 + this.node.position.z * 60);
        }
        if (!this.touched && Math.abs(this.node.position.z - world.playerZ) < 1.5 && world.playerLane === this.laneIndex) {
            this.touched = true;
            world.hitPlayer(CFG.hazardDamage);
        }
        if (this.node.position.z > CFG.despawnZ) {
            this.alive = false;
            removeFrom(world.hazards, this);
            world.release('hazard', this.node);
        }
    }
}
