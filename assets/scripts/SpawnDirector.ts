import { _decorator, Component, Node } from 'cc';
import { BuffId, CFG, COLORS, HazardType, ZombieType, laneX, makeBox, makePlane } from './GameConfig';
import { world } from './World';
import { bus, EV } from './EventBus';
import { Barrel } from './Barrel';
import { BuffGate } from './BuffGate';
import { GoalBox } from './GoalBox';
import { Hazard } from './Hazard';
import { NumberGate } from './NumberGate';
import { WarningStripe } from './WarningStripe';
import { Bullet } from './Bullet';
import { Scroller } from './Scroller';
import { Zombie } from './Zombie';
import { BuffSystem } from './BuffSystem';

const { ccclass } = _decorator;

interface ScriptEvent {
    at: number;
    done: boolean;
    run: () => void;
}

/**
 * 关卡编排 + 难度控制。
 * 难度旋钮（Rule.md 第五章）：刷怪密度、多轨道同步威胁、不可破坏障碍占比、BOSS 技能频率。
 * 所有事件按「推进距离」触发，单局表现稳定可复现。
 */
@ccclass('SpawnDirector')
export class SpawnDirector extends Component {
    traveled = 0;
    parent: Node = null!;

    private buffs: BuffSystem = null!;
    private script: ScriptEvent[] = [];
    private pools = new Map<string, Node[]>();

    private lastWaveAt = 0;
    private lastDashAt = 0;
    private lastProgress = -1;
    private buffGates: BuffGate[] = [];
    private gateResolved = false;
    /** 已回收进池的节点（防止同帧重复回收把同一个节点塞进池两次） */
    private pooled = new Set<Node>();
    /** 节点 → 池 key，保证回收时进对池子 */
    private keyOf = new Map<Node, string>();

    init(buffs: BuffSystem): void {
        this.buffs = buffs;
        world.spawnZombie = (t, l, z) => this.spawnZombie(t, l, z);
        world.spawnBullet = (x, z, d) => this.spawnBullet(x, z, d);
        world.spawnWarning = (l, s) => this.spawnWarning(l, s);
        world.release = (key, node) => this.releaseNode(key, node);
    }

    // ------------------------------------------------------------ 生命周期
    startRun(): void {
        this.clearWorld();
        this.traveled = 0;
        this.lastWaveAt = 0;
        this.lastDashAt = 0;
        this.lastProgress = -1;
        this.buffGates = [];
        this.gateResolved = false;
        world.bossEngaged = false;
        world.travelSpeed = CFG.baseSpeed;
        world.entitySpeed = CFG.baseSpeed;
        this.buildScript();
        this.spawnRoadMarks();
    }

    clearWorld(): void {
        for (const u of world.zombies.slice()) {
            u.alive = false;
            this.releaseNode('zombie', u.node);
        }
        world.zombies.length = 0;
        for (const u of world.objects.slice()) {
            u.alive = false;
            this.releaseNode('barrel', u.node);
        }
        world.objects.length = 0;
        for (const h of world.hazards.slice()) {
            h.alive = false;
            this.releaseNode('hazard', h.node);
        }
        world.hazards.length = 0;
        for (const b of world.bullets.slice()) {
            b.alive = false;
            this.releaseNode('bullet', b.node);
        }
        world.bullets.length = 0;
        // 只挂名牌的实体（增益门 / 终点箱）
        for (const t of world.tagged) {
            t.alive = false;
            this.releaseNode('buffGate', t.node);
        }
        world.tagged.length = 0;
        // 增益门可能尚未结算就被中断：必须一并回收，否则会残留在跑道上
        for (const g of this.buffGates) {
            if (g.alive) {
                g.alive = false;
                this.releaseNode('buffGate', g.node);
            }
        }
        this.buffGates = [];
        // 路面虚线 / BOSS 预警条等滚动件：按组件类型回收
        for (const child of this.parent.children.slice()) {
            if (child.getComponent(Scroller)) this.releaseNode('dash', child);
            else if (child.getComponent(WarningStripe)) this.releaseNode('warning', child);
        }
    }

    // ------------------------------------------------------------ 每帧
    tick(dt: number): void {
        const baseSpeed = CFG.baseSpeed * (1 + CFG.speedGain * (this.traveled / CFG.stageLength));
        world.travelSpeed = world.bossEngaged ? 0 : baseSpeed;
        // BOSS 拦截期间保留部分实体速度，小怪仍能逼近玩家
        world.entitySpeed = world.bossEngaged ? CFG.baseSpeed * 0.45 : baseSpeed;

        this.traveled += world.travelSpeed * dt;

        for (const e of this.script) {
            if (!e.done && this.traveled >= e.at) {
                e.done = true;
                e.run();
            }
        }

        this.waveTick();
        this.dashTick();
        this.gateTick();

        const p = Math.floor(this.progress() * 100);
        if (p !== this.lastProgress) {
            this.lastProgress = p;
            bus.emit(EV.PROGRESS, this.progress());
        }
    }

    progress(): number {
        return Math.max(0, Math.min(1, this.traveled / CFG.stageLength));
    }

    // ------------------------------------------------------------ 关卡脚本
    private buildScript(): void {
        this.script = [];
        const push = (at: number, run: () => void) => this.script.push({ at, done: false, run });

        // 教学段：单轨慢速丧尸，熟悉换道
        push(6, () => this.spawnZombie(ZombieType.Normal, 1, CFG.spawnZ));
        push(20, () => this.spawnZombie(ZombieType.Normal, 0, CFG.spawnZ));
        push(34, () => this.spawnZombie(ZombieType.Normal, 2, CFG.spawnZ));

        // 双轨交错 + 疾跑：压缩闪避窗口
        push(48, () => {
            this.spawnZombie(ZombieType.Normal, 0, CFG.spawnZ);
            this.spawnZombie(ZombieType.Normal, 2, CFG.spawnZ - 8);
        });
        push(60, () => this.spawnZombie(ZombieType.Runner, 1, CFG.spawnZ));
        push(72, () => {
            this.spawnZombie(ZombieType.Runner, 0, CFG.spawnZ);
            this.spawnZombie(ZombieType.Normal, 1, CFG.spawnZ - 6);
        });

        // 油桶：第一次风险收益取舍（要不要牺牲输出去拿 buff）
        push(86, () => {
            this.spawnBarrel(1, CFG.spawnZ);
            this.spawnBarrel(0, CFG.spawnZ - 10);
        });

        // 自爆 + 重甲
        push(102, () => {
            this.spawnZombie(ZombieType.Bomber, 2, CFG.spawnZ);
            this.spawnZombie(ZombieType.Tank, 0, CFG.spawnZ - 4);
        });

        // 数字门：打爆拿大额奖励，或从右侧绕开
        push(124, () => this.spawnNumberGate(CFG.spawnZ));

        // 不可破坏危险体：最高优先级，必须换道
        push(148, () => {
            this.spawnHazard(HazardType.Spike, 1, CFG.spawnZ);
            this.spawnHazard(HazardType.Roller, 2, CFG.spawnZ - 14);
        });

        // 增益门二选一（中道滚轮逼玩家做选择）
        push(174, () => this.spawnBuffZone(CFG.spawnZ));

        // 高压段：障碍占比提升 + 多轨同步威胁
        push(198, () => {
            this.spawnHazard(HazardType.Roller, 0, CFG.spawnZ);
            this.spawnZombie(ZombieType.Bomber, 1, CFG.spawnZ - 6);
            this.spawnHazard(HazardType.Roller, 2, CFG.spawnZ - 18);
        });
        push(222, () => {
            this.spawnZombie(ZombieType.Tank, 1, CFG.spawnZ);
            this.spawnZombie(ZombieType.Runner, 2, CFG.spawnZ - 8);
            this.spawnBarrel(0, CFG.spawnZ - 14);
        });
        push(242, () => {
            this.spawnHazard(HazardType.Charger, 1, CFG.spawnZ);
            this.spawnZombie(ZombieType.Bomber, 0, CFG.spawnZ - 10);
        });

        // BOSS：拦截玩家，进度暂停
        push(258, () => this.spawnBoss());

        // 终点 XP 箱子：通关主奖励
        push(286, () => this.spawnGoal());
    }

    /** 常规波次：密度随阶段提升，且同一波最多占 2 条轨道（永远留一条安全轨道） */
    private waveTick(): void {
        const gap = this.traveled < 130 ? 13 : this.traveled < 210 ? 10 : 7.5;
        if (this.traveled - this.lastWaveAt < gap) return;
        this.lastWaveAt = this.traveled;
        if (this.traveled < 40 || this.traveled > 258) return; // 教学段与 BOSS 段不刷散怪

        const phase = this.traveled < 130 ? 0 : this.traveled < 210 ? 1 : 2;
        const count = phase === 0 ? 1 : phase === 1 ? (Math.random() < 0.5 ? 2 : 1) : (Math.random() < 0.4 ? 3 : 2);
        const used: number[] = [];
        for (let i = 0; i < count; i++) {
            const lane = this.pickLane(used);
            used.push(lane);
            let type = ZombieType.Normal;
            const r = Math.random();
            if (phase === 1) {
                type = r < 0.35 ? ZombieType.Runner : ZombieType.Normal;
            } else if (phase === 2) {
                type = r < 0.25 ? ZombieType.Bomber : r < 0.6 ? ZombieType.Runner : ZombieType.Normal;
            }
            this.spawnZombie(type, lane, CFG.spawnZ);
        }
    }

    private pickLane(used: number[]): number {
        const pool: number[] = [];
        for (let i = 0; i < CFG.laneCount; i++) {
            if (used.indexOf(i) < 0) pool.push(i);
        }
        // 同一波最多用 laneCount-1 条轨道，保证始终有可躲的空间
        if (used.length >= CFG.laneCount - 1) return used[0];
        return pool[Math.floor(Math.random() * pool.length)];
    }

    private dashTick(): void {
        if (this.traveled - this.lastDashAt < 6) return;
        this.lastDashAt = this.traveled;
        this.spawnRoadMarks();
    }

    /** 路面虚线：提供“在前进”的视觉参照（伪位移） */
    private spawnRoadMarks(): void {
        for (let i = 0; i < CFG.laneCount; i++) {
            const node = this.acquire('dash', () => {
                const n = makeBox('Dash', 0.5, 0.04, 1.6, COLORS.dash);
                n.addComponent(Scroller);
                return n;
            });
            node.setPosition(laneX(i), 0.02, CFG.spawnZ);
        }
    }

    // ------------------------------------------------------------ 生成各实体
    spawnZombie(type: ZombieType, lane: number, z: number): void {
        const boss = type === ZombieType.Boss;
        const node = this.acquire(boss ? 'boss' : 'zombie', () => {
            const n = new Node(boss ? 'Boss' : 'Zombie');
            n.addComponent(Zombie);
            return n;
        });
        const comp = node.getComponent(Zombie)!;
        comp.build(type, lane, z);
        world.zombies.push(comp);
    }

    spawnBullet(x: number, z: number, dmg: number): void {
        const node = this.acquire('bullet', () => {
            const n = makeBox('Bullet', 0.18, 0.18, 1.0, COLORS.bullet);
            n.addComponent(Bullet);
            return n;
        });
        const b = node.getComponent(Bullet)!;
        b.build(x, z, dmg);
        world.bullets.push(b);
    }

    private spawnBarrel(lane: number, z: number): void {
        const node = this.acquire('barrel', () => {
            const n = new Node('Barrel');
            n.addComponent(Barrel);
            return n;
        });
        const b = node.getComponent(Barrel)!;
        b.init(this.buffs);
        b.build(lane, z);
        world.objects.push(b);
    }

    private spawnHazard(kind: HazardType, lane: number, z: number): void {
        const node = this.acquire('hazard', () => {
            const n = new Node('Hazard');
            n.addComponent(Hazard);
            return n;
        });
        const h = node.getComponent(Hazard)!;
        h.build(kind, lane, z);
        world.hazards.push(h);
    }

    private spawnNumberGate(z: number): void {
        const node = this.acquire('gate', () => {
            const n = new Node('NumberGate');
            n.addComponent(NumberGate);
            return n;
        });
        const g = node.getComponent(NumberGate)!;
        g.init(this.buffs);
        g.build(z);
        world.objects.push(g);
        bus.emit(EV.GATE_PROMPT, '前方数字门：打爆得技能满充 + 增伤 20%，或从右侧绕开');
    }

    private spawnBuffGate(lane: number, z: number, id: BuffId, value: number, label: string): BuffGate {
        const node = this.acquire('buffGate', () => {
            const n = new Node('BuffGate');
            n.addComponent(BuffGate);
            return n;
        });
        const g = node.getComponent(BuffGate)!;
        g.build(lane, z, id, value, label);
        return g;
    }

    private spawnBuffZone(z: number): void {
        this.spawnHazard(HazardType.Roller, 1, z); // 中道滚轮：逼玩家必须做选择
        const a = this.spawnBuffGate(0, z - 4, BuffId.Damage, 0.5, '伤害+50%');
        const b = this.spawnBuffGate(2, z - 4, BuffId.FireRate, 0.4, '攻速+40%');
        this.buffGates = [a, b];
        this.gateResolved = false;
        bus.emit(EV.GATE_PROMPT, '二选一：左道 伤害+50%　/　右道 攻速+40%（中道有滚轮）');
    }

    private spawnBoss(): void {
        this.spawnZombie(ZombieType.Boss, 1, CFG.spawnZ);
        bus.emit(EV.GATE_PROMPT, '章节 BOSS 来袭：先清小怪，再找输出窗口');
    }

    private spawnGoal(): void {
        const node = this.acquire('goal', () => {
            const n = new Node('GoalBox');
            n.addComponent(GoalBox);
            return n;
        });
        const g = node.getComponent(GoalBox)!;
        g.build(CFG.spawnZ);
    }

    private spawnWarning(lane: number, seconds: number): void {
        const node = this.acquire('warning', () => {
            const n = makePlane('Warning', CFG.laneWidth * 0.9, 14, COLORS.hazard);
            n.addComponent(WarningStripe);
            return n;
        });
        const w = node.getComponent(WarningStripe)!;
        w.build(lane, seconds);
    }

    /** 增益门结算：从哪条车道穿过，就拿哪个 buff */
    private gateTick(): void {
        if (this.gateResolved || this.buffGates.length === 0) return;
        for (const g of this.buffGates) {
            if (!g.alive) continue;
            const dz = g.node.position.z - world.playerZ;
            if (dz > -1.2 && dz < 1.6 && world.playerLane === g.laneIndex) {
                this.buffs.applyPermanent(g.buffId, g.buffValue, g.label + '（本局）');
                bus.emit(EV.GATE_DONE, `已选择：${g.label}`);
                bus.emit(EV.GATE_PROMPT, '');
                this.gateResolved = true;
                for (const gg of this.buffGates) {
                    if (gg.alive) gg.release();
                }
                return;
            }
        }
    }

    // ------------------------------------------------------------ 对象池
    private acquire(key: string, factory: () => Node): Node {
        let node: Node | null = null;
        const list = this.pools.get(key);
        if (list && list.length > 0) {
            node = list.pop()!;
        }
        if (!node) node = factory();
        this.pooled.delete(node);
        this.keyOf.set(node, key);
        this.parent.addChild(node);
        node.active = true;
        return node;
    }

    private releaseNode(key: string, node: Node): void {
        // 受伤/死亡可能在一帧里级联触发多次回收（例如玩家阵亡时 clearWorld 打断实体 update）
        if (this.pooled.has(node)) return;
        this.pooled.add(node);
        const k = this.keyOf.get(node) || key;
        node.active = false;
        node.removeFromParent();
        let list = this.pools.get(k);
        if (!list) {
            list = [];
            this.pools.set(k, list);
        }
        list.push(node);
    }
}
