import { _decorator, Component, MeshRenderer } from 'cc';
import { COLORS, laneX, unlitMaterial } from './GameConfig';
import { world } from './World';

const { ccclass } = _decorator;

/** BOSS 多轨道 AOE 的预警条（纯视觉，伤害由 BOSS 结算） */
@ccclass('WarningStripe')
export class WarningStripe extends Component {
    private life = 0;
    private toggle = 0;
    private on = false;

    build(lane: number, seconds: number): void {
        this.life = seconds;
        this.toggle = 0;
        this.on = false;
        this.node.setPosition(laneX(lane), 0.08, world.playerZ - 8);
        // 覆盖玩家前方的整条车道
        const mr = this.node.getComponent(MeshRenderer);
        if (mr) mr.setMaterial(unlitMaterial(COLORS.hazard), 0);
    }

    update(dt: number): void {
        this.life -= dt;
        this.toggle -= dt;
        if (this.toggle <= 0) {
            this.toggle = 0.14;
            this.on = !this.on;
            const mr = this.node.getComponent(MeshRenderer);
            if (mr) mr.setMaterial(unlitMaterial(this.on ? COLORS.hazard : COLORS.wall), 0);
        }
        if (this.life <= 0) {
            world.release('warning', this.node);
        }
    }
}
