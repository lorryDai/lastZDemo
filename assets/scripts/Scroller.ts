import { _decorator, Component } from 'cc';
import { CFG, advanceZ } from './GameConfig';
import { world } from './World';

const { ccclass } = _decorator;

/** 只负责前进与回收的滚动件（路面虚线等） */
@ccclass('Scroller')
export class Scroller extends Component {
    key = 'dash';

    update(dt: number): void {
        advanceZ(this.node, world.travelSpeed * dt);
        if (this.node.position.z > CFG.despawnZ) world.release(this.key, this.node);
    }
}
