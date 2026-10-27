import { _decorator, Component } from 'cc';
import { BuffId, CFG, COLORS, advanceZ, laneX, makeBox, makePlane } from './GameConfig';
import { ITag, removeFrom, world } from './World';

const { ccclass } = _decorator;

/** 局内增益门（二选一）：从哪条车道穿过就拿哪个 buff */
@ccclass('BuffGate')
export class BuffGate extends Component {
    laneIndex = 0;
    alive = false;
    tag?: ITag;
    resolved = false;
    buffId: BuffId = BuffId.Damage;
    buffValue = 0.3;
    label = '';

    build(lane: number, z: number, id: BuffId, value: number, text: string): void {
        this.laneIndex = lane;
        this.alive = true;
        this.resolved = false;
        this.buffId = id;
        this.buffValue = value;
        this.label = text;
        this.node.removeAllChildren();
        this.node.setPosition(laneX(lane), 0, z);
        for (const d of [-1, 1]) {
            const post = makeBox('Post', 0.3, 3.0, 0.3, COLORS.buffGate, this.node);
            post.setPosition(d * CFG.laneWidth * 0.45, 1.5, 0);
        }
        const top = makeBox('Top', CFG.laneWidth * 0.95, 0.3, 0.3, COLORS.buffGate, this.node);
        top.setPosition(0, 3.0, 0);
        const glow = makePlane('Glow', CFG.laneWidth * 0.85, 1.6, COLORS.buffGate, this.node);
        glow.setPosition(0, 0.05, 0);
        this.tag = { name: text, height: 3.6, color: COLORS.tagItem };
        removeFrom(world.tagged, this);
        world.tagged.push(this);
    }

    update(dt: number): void {
        if (!this.alive) return;
        advanceZ(this.node, world.travelSpeed * dt);
        // 没被选中也要回收，否则会一直挂在场景里
        if (this.node.position.z > CFG.despawnZ) this.release();
    }

    release(): void {
        this.alive = false;
        removeFrom(world.tagged, this);
        world.release('buffGate', this.node);
    }
}
