import { _decorator, Component } from 'cc';
import { COLORS, advanceZ, makeBox, makePlane } from './GameConfig';
import { ITag, removeFrom, world } from './World';

const { ccclass } = _decorator;

/** 终点 XP 箱子：本局最核心产出物（英雄经验） */
@ccclass('GoalBox')
export class GoalBox extends Component {
    alive = false;
    tag?: ITag;
    private spin = 0;

    build(z: number): void {
        this.alive = true;
        this.spin = 0;
        this.node.removeAllChildren();
        this.node.setPosition(0, 0, z);
        const box = makeBox('XPBox', 2.0, 2.0, 2.0, COLORS.goal, this.node);
        box.setPosition(0, 1.4, 0);
        const ring = makePlane('Ring', 3.2, 3.2, COLORS.bulletHead, this.node);
        ring.setPosition(0, 0.06, 0);
        this.tag = { name: '终点 XP 箱', height: 3.2, color: COLORS.tagItem };
        removeFrom(world.tagged, this);
        world.tagged.push(this);
    }

    update(dt: number): void {
        if (!this.alive) return;
        this.spin += dt * 120;
        const box = this.node.children[0];
        if (box) box.setRotationFromEuler(0, this.spin, 0);
        advanceZ(this.node, world.travelSpeed * dt);
        if (this.node.position.z >= world.playerZ - 1.0) {
            this.alive = false;
            removeFrom(world.tagged, this);
            world.onGoal();
            world.release('goal', this.node);
        }
    }
}
