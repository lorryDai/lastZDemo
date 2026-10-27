import { _decorator, Component, MeshRenderer } from 'cc';
import { CFG, COLORS, unlitMaterial } from './GameConfig';
import { IBullet, removeFrom, world } from './World';

const { ccclass } = _decorator;

/** 子弹：朝 -Z 笔直飞行，不做任何追踪；命中谁只看子弹自己的横向位置 */
@ccclass('Bullet')
export class Bullet extends Component implements IBullet {
    damage = CFG.baseDamage;
    alive = false;

    /** 命中判定的「精准线」：横向误差小于它就视为爆头 */
    private static readonly HEADSHOT_DX = 0.36;

    build(x: number, z: number, dmg: number): void {
        this.damage = dmg;
        this.alive = true;
        this.node.setPosition(x, 1.15, z);
        const mr = this.node.getComponent(MeshRenderer);
        if (mr) mr.setMaterial(unlitMaterial(COLORS.bullet), 0);
    }

    private kill(): void {
        if (!this.alive) return;
        this.alive = false;
        removeFrom(world.bullets, this);
        world.release('bullet', this.node);
    }

    update(dt: number): void {
        if (!this.alive) return;
        const prevZ = this.node.position.z;
        const z = prevZ - CFG.bulletSpeed * dt;
        this.node.setPosition(this.node.position.x, this.node.position.y, z);

        // 子弹一帧走 ~0.9 单位，必须用「上一帧与这一帧之间」的区间判定，否则会穿透小目标
        const inRange = (tz: number) => tz <= prevZ + 0.4 && tz >= z - 0.4;
        const x = this.node.position.x;

        for (const u of world.zombies) {
            if (!u.alive || !inRange(u.node.position.z)) continue;
            const dx = Math.abs(u.node.position.x - x);
            if (dx > (u.hitHalfWidth ?? 0.7)) continue;
            // 横向对准头部 → 爆头 2.5 倍；擦着身体命中 → 普通伤害
            u.takeDamage(this.damage, dx < Bullet.HEADSHOT_DX);
            this.kill();
            return;
        }
        // 交互物同样按 X 距离判定：数字门横跨两条车道
        for (const u of world.objects) {
            if (!u.alive || !inRange(u.node.position.z)) continue;
            if (Math.abs(u.node.position.x - x) > (u.hitHalfWidth ?? 0.7)) continue;
            u.takeDamage(this.damage, false);
            this.kill();
            return;
        }
        if (z < CFG.bulletDespawnZ) this.kill();
    }
}
