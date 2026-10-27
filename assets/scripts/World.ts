import { Color, Node } from 'cc';
import { CFG, ZombieType } from './GameConfig';

/** 头顶名牌：由 NameTagSystem 投影到 UI 层绘制 */
export interface ITag {
    name: string;
    /** 相对实体原点的高度（世界单位） */
    height: number;
    color: Color;
}

/** 可被子弹命中的实体：丧尸 / 油桶 / 数字门 / 终点箱 / BOSS */
export interface IUnit {
    node: Node;
    laneIndex: number;
    alive: boolean;
    /** 子弹判定用的横向半宽（世界单位），不填则按 0.7 处理 */
    hitHalfWidth?: number;
    tag?: ITag;
    takeDamage(dmg: number, headshot: boolean): void;
}

/** 不可破坏危险体：打不掉，碰到就扣大血 */
export interface IHazard {
    node: Node;
    laneIndex: number;
    alive: boolean;
    tag?: ITag;
}

/** 只挂名牌、不参与射击判定的实体（增益门 / 终点箱等） */
export interface ITagged {
    node: Node;
    alive: boolean;
    tag?: ITag;
}

/** 子弹：由英雄发射，朝 -Z 笔直飞行 */
export interface IBullet {
    node: Node;
    damage: number;
    alive: boolean;
}

/**
 * 世界注册表 + 跨模块回调。
 * 实体（丧尸 / 交互物）只依赖这里，不直接依赖 PlayerController 或 SpawnDirector，
 * 避免模块循环引用。
 */
export const world = {
    zombies: [] as IUnit[],
    objects: [] as IUnit[],   // 油桶 / 数字门 / 增益门 / 终点箱
    hazards: [] as IHazard[], // 尖刺 / 滚轮 / 冲撞怪
    tagged: [] as ITagged[],  // 只挂名牌、不参与射击判定的实体
    bullets: [] as IBullet[],

    playerLane: 1,
    playerZ: CFG.playerZ,

    /** 世界推进速度与实体速度（由 SpawnDirector 每帧写入） */
    travelSpeed: CFG.baseSpeed,
    entitySpeed: CFG.baseSpeed,
    /** BOSS 拦截期间进度停止 */
    bossEngaged: false,

    // ------- 由各系统注入的回调 -------
    hitPlayer: (dmg: number) => { },
    chargeSkill: (v: number) => { },
    spawnZombie: (type: ZombieType, lane: number, z: number) => { },
    spawnWarning: (lane: number, seconds: number) => { },
    spawnBullet: (x: number, z: number, dmg: number) => { },
    onGoal: () => { },
    release: (key: string, node: Node) => { },
    onKill: (headshot: boolean) => { },
    onBossKilled: () => { },
};

/** 从列表里移除（回收时统一调用） */
export function removeFrom<T>(list: T[], item: T): void {
    const i = list.indexOf(item);
    if (i >= 0) list.splice(i, 1);
}

/** 当前是否有存活的 BOSS */
export function hasAliveBoss(): boolean {
    for (const z of world.zombies) {
        if (z.alive && (z as any).type === ZombieType.Boss) return true;
    }
    return false;
}

/** 找出正前方最近的存活目标（用于自动瞄准） */
export function nearestTarget(fromZ: number): IUnit | null {
    let best: IUnit | null = null;
    let bestZ = -Infinity;
    for (const u of world.zombies) {
        if (u.alive && u.node.position.z < fromZ - 0.5 && u.node.position.z > bestZ) {
            bestZ = u.node.position.z;
            best = u;
        }
    }
    if (best) return best;
    for (const u of world.objects) {
        if (u.alive && u.node.position.z < fromZ - 0.5 && u.node.position.z > bestZ) {
            bestZ = u.node.position.z;
            best = u;
        }
    }
    return best;
}
