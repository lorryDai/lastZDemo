import { Color, Material, Mesh, MeshRenderer, Node, primitives, utils } from 'cc';

/** 全局游戏状态：开始页 → 战斗中 → 结算页 */
export enum GameState {
    Ready = 0,
    Playing = 1,
    Result = 2,
}

/** 敌人体系（对应 Rule.md「敌人体系设计」） */
export enum ZombieType {
    Normal = 0, // 普通丧尸：慢速沿轨道冲，单纯伤害压力
    Runner = 1, // 疾跑丧尸：高速突进，压缩闪避窗口
    Bomber = 2, // 自爆丧尸：靠近爆炸范围伤害
    Tank = 3,   // 重甲感染者：高血量慢速，占轨道阻挡视野
    Boss = 4,   // 章节 BOSS：多阶段
}

/** 不可破坏危险体：打不掉，碰到直接扣大量血 */
export enum HazardType {
    Spike = 0,
    Roller = 1,
    Charger = 2,
}

/** 局内增益（单局 build，通关失效） */
export enum BuffId {
    FireRate = 'fireRate',   // 攻速
    Damage = 'damage',       // 伤害
    Escort = 'escort',       // 召唤僚机
}

export const COLORS = {
    sky: new Color(16, 20, 26),
    ground: new Color(44, 52, 62),
    laneLine: new Color(88, 132, 110),
    wall: new Color(70, 84, 100),
    dash: new Color(120, 140, 165),
    player: new Color(86, 226, 190),
    playerGun: new Color(240, 248, 255),
    shield: new Color(90, 200, 255),
    normal: new Color(120, 152, 92),
    runner: new Color(214, 84, 72),
    bomber: new Color(240, 150, 60),
    tank: new Color(96, 118, 140),
    boss: new Color(150, 82, 200),
    hazard: new Color(226, 62, 62),
    barrel: new Color(206, 124, 42),
    gate: new Color(84, 158, 226),
    buffGate: new Color(120, 230, 150),
    goal: new Color(255, 208, 72),
    bullet: new Color(226, 244, 255),
    bulletHead: new Color(255, 200, 40),
    hitFlash: new Color(255, 255, 255),
    trail: new Color(150, 232, 255),
    tagMob: new Color(255, 255, 255),
    tagItem: new Color(255, 214, 92),
    tagDanger: new Color(255, 138, 128),
    tagShadow: new Color(0, 0, 0, 170),
};

/** 全部可调数值集中在这里，方便按手感调参 */
export const CFG = {
    // 视角与轨道（Rule.md：竖版向上卷轴 + 3~5 条平行车道）
    laneCount: 3,
    laneWidth: 3,
    playerZ: 0,
    spawnZ: -62,
    despawnZ: 3.5,

    // 关卡
    stageLength: 300,   // 单局推进距离
    baseSpeed: 7,       // 世界推进速度（单位/秒）
    speedGain: 0.5,     // 关卡末段的速度增幅比例

    // 英雄
    playerMaxHp: 100,
    fireInterval: 0.18,
    bulletSpeed: 55,
    bulletDespawnZ: -70,
    baseDamage: 10,
    headshotMul: 2.5,   // 同轨命中 = 爆头倍率
    laneLerp: 12,       // 换道插值速度

    // 技能（独立充能：击杀 / 受击 / 时间）
    skillMax: 100,
    skillGainKill: 7,
    skillGainHit: 12,
    skillGainPerSec: 3,
    skillDamage: 60,
    skillHeal: 15,
    skillShieldTime: 3,

    // 危险体与自爆伤害
    hazardDamage: 25,
    hitInvincible: 0.8,

    // BOSS
    bossHp: 620,
    bossHoldZ: -20,
    bossAoeDamage: 25,
};

/** 车道序号 → 世界 X 坐标 */
export function laneX(lane: number): number {
    return (lane - (CFG.laneCount - 1) / 2) * CFG.laneWidth;
}

/** X 坐标 → 最近的车道序号 */
export function x2Lane(x: number): number {
    return Math.max(0, Math.min(CFG.laneCount - 1, Math.round(x / CFG.laneWidth + (CFG.laneCount - 1) / 2)));
}

// ---------------------------------------------------------------- 共享材质 / 网格
const meshCache = new Map<string, Mesh>();
const matCache = new Map<string, Material>();

export function unlitMaterial(color: Color): Material {
    const key = color.toHEX();
    let mat = matCache.get(key);
    if (!mat) {
        mat = new Material();
        mat.initialize({ effectName: 'builtin-unlit' });
        mat.setProperty('mainColor', color);
        matCache.set(key, mat);
    }
    return mat;
}

function cachedMesh(key: string, build: () => Mesh): Mesh {
    let mesh = meshCache.get(key);
    if (!mesh) {
        mesh = build();
        meshCache.set(key, mesh);
    }
    return mesh;
}

export function boxMesh(w: number, h: number, l: number): Mesh {
    return cachedMesh(`b${w}_${h}_${l}`, () => utils.createMesh(primitives.box({ width: w, height: h, length: l })));
}

export function cylMesh(r: number, h: number): Mesh {
    // 3.8 的 cylinder 是 (radiusTop, radiusBottom, height, opts) 数值签名，不能传对象
    return cachedMesh(`c${r}_${h}`, () => utils.createMesh(
        primitives.cylinder(r, r, h, { radialSegments: 14, heightSegments: 1 }),
    ));
}

export function planeMesh(w: number, l: number): Mesh {
    return cachedMesh(`p${w}_${l}`, () => utils.createMesh(primitives.plane({
        width: w, length: l, widthSegments: 1, lengthSegments: 1,
    })));
}

// ---------------------------------------------------------------- 节点工厂
function attach(node: Node, mesh: Mesh, color: Color, parent: Node | null): Node {
    const mr = node.addComponent(MeshRenderer);
    mr.mesh = mesh;
    mr.setMaterial(unlitMaterial(color), 0);
    if (parent) parent.addChild(node);
    return node;
}

export function makeBox(name: string, w: number, h: number, l: number, color: Color, parent: Node | null = null): Node {
    return attach(new Node(name), boxMesh(w, h, l), color, parent);
}

export function makeCylinder(name: string, r: number, h: number, color: Color, parent: Node | null = null): Node {
    return attach(new Node(name), cylMesh(r, h), color, parent);
}

export function makePlane(name: string, w: number, l: number, color: Color, parent: Node | null = null): Node {
    return attach(new Node(name), planeMesh(w, l), color, parent);
}

/**
 * 沿 Z 轴平移。必须走 setPosition：
 * 3.x 里直接改 node.position.z 不会把变换标脏，物体会在画面上原地不动。
 */
export function advanceZ(node: Node, dz: number): void {
    const p = node.position;
    node.setPosition(p.x, p.y, p.z + dz);
}
