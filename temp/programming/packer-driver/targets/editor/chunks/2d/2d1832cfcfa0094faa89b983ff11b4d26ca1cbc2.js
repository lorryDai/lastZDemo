System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5", "__unresolved_6", "__unresolved_7", "__unresolved_8", "__unresolved_9", "__unresolved_10", "__unresolved_11", "__unresolved_12"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, BuffId, CFG, COLORS, HazardType, ZombieType, laneX, makeBox, makePlane, world, bus, EV, Barrel, BuffGate, GoalBox, Hazard, NumberGate, WarningStripe, Bullet, Scroller, Zombie, _dec, _class, _crd, ccclass, SpawnDirector;

  function _reportPossibleCrUseOfBuffId(extras) {
    _reporterNs.report("BuffId", "./GameConfig", _context.meta, extras);
  }

  function _reportPossibleCrUseOfCFG(extras) {
    _reporterNs.report("CFG", "./GameConfig", _context.meta, extras);
  }

  function _reportPossibleCrUseOfCOLORS(extras) {
    _reporterNs.report("COLORS", "./GameConfig", _context.meta, extras);
  }

  function _reportPossibleCrUseOfHazardType(extras) {
    _reporterNs.report("HazardType", "./GameConfig", _context.meta, extras);
  }

  function _reportPossibleCrUseOfZombieType(extras) {
    _reporterNs.report("ZombieType", "./GameConfig", _context.meta, extras);
  }

  function _reportPossibleCrUseOflaneX(extras) {
    _reporterNs.report("laneX", "./GameConfig", _context.meta, extras);
  }

  function _reportPossibleCrUseOfmakeBox(extras) {
    _reporterNs.report("makeBox", "./GameConfig", _context.meta, extras);
  }

  function _reportPossibleCrUseOfmakePlane(extras) {
    _reporterNs.report("makePlane", "./GameConfig", _context.meta, extras);
  }

  function _reportPossibleCrUseOfworld(extras) {
    _reporterNs.report("world", "./World", _context.meta, extras);
  }

  function _reportPossibleCrUseOfbus(extras) {
    _reporterNs.report("bus", "./EventBus", _context.meta, extras);
  }

  function _reportPossibleCrUseOfEV(extras) {
    _reporterNs.report("EV", "./EventBus", _context.meta, extras);
  }

  function _reportPossibleCrUseOfBarrel(extras) {
    _reporterNs.report("Barrel", "./Barrel", _context.meta, extras);
  }

  function _reportPossibleCrUseOfBuffGate(extras) {
    _reporterNs.report("BuffGate", "./BuffGate", _context.meta, extras);
  }

  function _reportPossibleCrUseOfGoalBox(extras) {
    _reporterNs.report("GoalBox", "./GoalBox", _context.meta, extras);
  }

  function _reportPossibleCrUseOfHazard(extras) {
    _reporterNs.report("Hazard", "./Hazard", _context.meta, extras);
  }

  function _reportPossibleCrUseOfNumberGate(extras) {
    _reporterNs.report("NumberGate", "./NumberGate", _context.meta, extras);
  }

  function _reportPossibleCrUseOfWarningStripe(extras) {
    _reporterNs.report("WarningStripe", "./WarningStripe", _context.meta, extras);
  }

  function _reportPossibleCrUseOfBullet(extras) {
    _reporterNs.report("Bullet", "./Bullet", _context.meta, extras);
  }

  function _reportPossibleCrUseOfScroller(extras) {
    _reporterNs.report("Scroller", "./Scroller", _context.meta, extras);
  }

  function _reportPossibleCrUseOfZombie(extras) {
    _reporterNs.report("Zombie", "./Zombie", _context.meta, extras);
  }

  function _reportPossibleCrUseOfBuffSystem(extras) {
    _reporterNs.report("BuffSystem", "./BuffSystem", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Node = _cc.Node;
    }, function (_unresolved_2) {
      BuffId = _unresolved_2.BuffId;
      CFG = _unresolved_2.CFG;
      COLORS = _unresolved_2.COLORS;
      HazardType = _unresolved_2.HazardType;
      ZombieType = _unresolved_2.ZombieType;
      laneX = _unresolved_2.laneX;
      makeBox = _unresolved_2.makeBox;
      makePlane = _unresolved_2.makePlane;
    }, function (_unresolved_3) {
      world = _unresolved_3.world;
    }, function (_unresolved_4) {
      bus = _unresolved_4.bus;
      EV = _unresolved_4.EV;
    }, function (_unresolved_5) {
      Barrel = _unresolved_5.Barrel;
    }, function (_unresolved_6) {
      BuffGate = _unresolved_6.BuffGate;
    }, function (_unresolved_7) {
      GoalBox = _unresolved_7.GoalBox;
    }, function (_unresolved_8) {
      Hazard = _unresolved_8.Hazard;
    }, function (_unresolved_9) {
      NumberGate = _unresolved_9.NumberGate;
    }, function (_unresolved_10) {
      WarningStripe = _unresolved_10.WarningStripe;
    }, function (_unresolved_11) {
      Bullet = _unresolved_11.Bullet;
    }, function (_unresolved_12) {
      Scroller = _unresolved_12.Scroller;
    }, function (_unresolved_13) {
      Zombie = _unresolved_13.Zombie;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "224e6Z/IUFCJIIjkDNp6NAP", "SpawnDirector", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node']);

      ({
        ccclass
      } = _decorator);

      /**
       * 关卡编排 + 难度控制。
       * 难度旋钮（Rule.md 第五章）：刷怪密度、多轨道同步威胁、不可破坏障碍占比、BOSS 技能频率。
       * 所有事件按「推进距离」触发，单局表现稳定可复现。
       */
      _export("SpawnDirector", SpawnDirector = (_dec = ccclass('SpawnDirector'), _dec(_class = class SpawnDirector extends Component {
        constructor(...args) {
          super(...args);
          this.traveled = 0;
          this.parent = null;
          this.buffs = null;
          this.script = [];
          this.pools = new Map();
          this.lastWaveAt = 0;
          this.lastDashAt = 0;
          this.lastProgress = -1;
          this.buffGates = [];
          this.gateResolved = false;

          /** 已回收进池的节点（防止同帧重复回收把同一个节点塞进池两次） */
          this.pooled = new Set();

          /** 节点 → 池 key，保证回收时进对池子 */
          this.keyOf = new Map();
        }

        init(buffs) {
          this.buffs = buffs;

          (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
            error: Error()
          }), world) : world).spawnZombie = (t, l, z) => this.spawnZombie(t, l, z);

          (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
            error: Error()
          }), world) : world).spawnBullet = (x, z, d) => this.spawnBullet(x, z, d);

          (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
            error: Error()
          }), world) : world).spawnWarning = (l, s) => this.spawnWarning(l, s);

          (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
            error: Error()
          }), world) : world).release = (key, node) => this.releaseNode(key, node);
        } // ------------------------------------------------------------ 生命周期


        startRun() {
          this.clearWorld();
          this.traveled = 0;
          this.lastWaveAt = 0;
          this.lastDashAt = 0;
          this.lastProgress = -1;
          this.buffGates = [];
          this.gateResolved = false;
          (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
            error: Error()
          }), world) : world).bossEngaged = false;
          (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
            error: Error()
          }), world) : world).travelSpeed = (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).baseSpeed;
          (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
            error: Error()
          }), world) : world).entitySpeed = (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).baseSpeed;
          this.buildScript();
          this.spawnRoadMarks();
        }

        clearWorld() {
          for (const u of (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
            error: Error()
          }), world) : world).zombies.slice()) {
            u.alive = false;
            this.releaseNode('zombie', u.node);
          }

          (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
            error: Error()
          }), world) : world).zombies.length = 0;

          for (const u of (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
            error: Error()
          }), world) : world).objects.slice()) {
            u.alive = false;
            this.releaseNode('barrel', u.node);
          }

          (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
            error: Error()
          }), world) : world).objects.length = 0;

          for (const h of (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
            error: Error()
          }), world) : world).hazards.slice()) {
            h.alive = false;
            this.releaseNode('hazard', h.node);
          }

          (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
            error: Error()
          }), world) : world).hazards.length = 0;

          for (const b of (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
            error: Error()
          }), world) : world).bullets.slice()) {
            b.alive = false;
            this.releaseNode('bullet', b.node);
          }

          (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
            error: Error()
          }), world) : world).bullets.length = 0; // 只挂名牌的实体（增益门 / 终点箱）

          for (const t of (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
            error: Error()
          }), world) : world).tagged) {
            t.alive = false;
            this.releaseNode('buffGate', t.node);
          }

          (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
            error: Error()
          }), world) : world).tagged.length = 0; // 增益门可能尚未结算就被中断：必须一并回收，否则会残留在跑道上

          for (const g of this.buffGates) {
            if (g.alive) {
              g.alive = false;
              this.releaseNode('buffGate', g.node);
            }
          }

          this.buffGates = []; // 路面虚线 / BOSS 预警条等滚动件：按组件类型回收

          for (const child of this.parent.children.slice()) {
            if (child.getComponent(_crd && Scroller === void 0 ? (_reportPossibleCrUseOfScroller({
              error: Error()
            }), Scroller) : Scroller)) this.releaseNode('dash', child);else if (child.getComponent(_crd && WarningStripe === void 0 ? (_reportPossibleCrUseOfWarningStripe({
              error: Error()
            }), WarningStripe) : WarningStripe)) this.releaseNode('warning', child);
          }
        } // ------------------------------------------------------------ 每帧


        tick(dt) {
          const baseSpeed = (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).baseSpeed * (1 + (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).speedGain * (this.traveled / (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).stageLength));
          (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
            error: Error()
          }), world) : world).travelSpeed = (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
            error: Error()
          }), world) : world).bossEngaged ? 0 : baseSpeed; // BOSS 拦截期间保留部分实体速度，小怪仍能逼近玩家

          (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
            error: Error()
          }), world) : world).entitySpeed = (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
            error: Error()
          }), world) : world).bossEngaged ? (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).baseSpeed * 0.45 : baseSpeed;
          this.traveled += (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
            error: Error()
          }), world) : world).travelSpeed * dt;

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
            (_crd && bus === void 0 ? (_reportPossibleCrUseOfbus({
              error: Error()
            }), bus) : bus).emit((_crd && EV === void 0 ? (_reportPossibleCrUseOfEV({
              error: Error()
            }), EV) : EV).PROGRESS, this.progress());
          }
        }

        progress() {
          return Math.max(0, Math.min(1, this.traveled / (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).stageLength));
        } // ------------------------------------------------------------ 关卡脚本


        buildScript() {
          this.script = [];

          const push = (at, run) => this.script.push({
            at,
            done: false,
            run
          }); // 教学段：单轨慢速丧尸，熟悉换道


          push(6, () => this.spawnZombie((_crd && ZombieType === void 0 ? (_reportPossibleCrUseOfZombieType({
            error: Error()
          }), ZombieType) : ZombieType).Normal, 1, (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).spawnZ));
          push(20, () => this.spawnZombie((_crd && ZombieType === void 0 ? (_reportPossibleCrUseOfZombieType({
            error: Error()
          }), ZombieType) : ZombieType).Normal, 0, (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).spawnZ));
          push(34, () => this.spawnZombie((_crd && ZombieType === void 0 ? (_reportPossibleCrUseOfZombieType({
            error: Error()
          }), ZombieType) : ZombieType).Normal, 2, (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).spawnZ)); // 双轨交错 + 疾跑：压缩闪避窗口

          push(48, () => {
            this.spawnZombie((_crd && ZombieType === void 0 ? (_reportPossibleCrUseOfZombieType({
              error: Error()
            }), ZombieType) : ZombieType).Normal, 0, (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
              error: Error()
            }), CFG) : CFG).spawnZ);
            this.spawnZombie((_crd && ZombieType === void 0 ? (_reportPossibleCrUseOfZombieType({
              error: Error()
            }), ZombieType) : ZombieType).Normal, 2, (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
              error: Error()
            }), CFG) : CFG).spawnZ - 8);
          });
          push(60, () => this.spawnZombie((_crd && ZombieType === void 0 ? (_reportPossibleCrUseOfZombieType({
            error: Error()
          }), ZombieType) : ZombieType).Runner, 1, (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).spawnZ));
          push(72, () => {
            this.spawnZombie((_crd && ZombieType === void 0 ? (_reportPossibleCrUseOfZombieType({
              error: Error()
            }), ZombieType) : ZombieType).Runner, 0, (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
              error: Error()
            }), CFG) : CFG).spawnZ);
            this.spawnZombie((_crd && ZombieType === void 0 ? (_reportPossibleCrUseOfZombieType({
              error: Error()
            }), ZombieType) : ZombieType).Normal, 1, (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
              error: Error()
            }), CFG) : CFG).spawnZ - 6);
          }); // 油桶：第一次风险收益取舍（要不要牺牲输出去拿 buff）

          push(86, () => {
            this.spawnBarrel(1, (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
              error: Error()
            }), CFG) : CFG).spawnZ);
            this.spawnBarrel(0, (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
              error: Error()
            }), CFG) : CFG).spawnZ - 10);
          }); // 自爆 + 重甲

          push(102, () => {
            this.spawnZombie((_crd && ZombieType === void 0 ? (_reportPossibleCrUseOfZombieType({
              error: Error()
            }), ZombieType) : ZombieType).Bomber, 2, (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
              error: Error()
            }), CFG) : CFG).spawnZ);
            this.spawnZombie((_crd && ZombieType === void 0 ? (_reportPossibleCrUseOfZombieType({
              error: Error()
            }), ZombieType) : ZombieType).Tank, 0, (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
              error: Error()
            }), CFG) : CFG).spawnZ - 4);
          }); // 数字门：打爆拿大额奖励，或从右侧绕开

          push(124, () => this.spawnNumberGate((_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).spawnZ)); // 不可破坏危险体：最高优先级，必须换道

          push(148, () => {
            this.spawnHazard((_crd && HazardType === void 0 ? (_reportPossibleCrUseOfHazardType({
              error: Error()
            }), HazardType) : HazardType).Spike, 1, (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
              error: Error()
            }), CFG) : CFG).spawnZ);
            this.spawnHazard((_crd && HazardType === void 0 ? (_reportPossibleCrUseOfHazardType({
              error: Error()
            }), HazardType) : HazardType).Roller, 2, (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
              error: Error()
            }), CFG) : CFG).spawnZ - 14);
          }); // 增益门二选一（中道滚轮逼玩家做选择）

          push(174, () => this.spawnBuffZone((_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).spawnZ)); // 高压段：障碍占比提升 + 多轨同步威胁

          push(198, () => {
            this.spawnHazard((_crd && HazardType === void 0 ? (_reportPossibleCrUseOfHazardType({
              error: Error()
            }), HazardType) : HazardType).Roller, 0, (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
              error: Error()
            }), CFG) : CFG).spawnZ);
            this.spawnZombie((_crd && ZombieType === void 0 ? (_reportPossibleCrUseOfZombieType({
              error: Error()
            }), ZombieType) : ZombieType).Bomber, 1, (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
              error: Error()
            }), CFG) : CFG).spawnZ - 6);
            this.spawnHazard((_crd && HazardType === void 0 ? (_reportPossibleCrUseOfHazardType({
              error: Error()
            }), HazardType) : HazardType).Roller, 2, (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
              error: Error()
            }), CFG) : CFG).spawnZ - 18);
          });
          push(222, () => {
            this.spawnZombie((_crd && ZombieType === void 0 ? (_reportPossibleCrUseOfZombieType({
              error: Error()
            }), ZombieType) : ZombieType).Tank, 1, (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
              error: Error()
            }), CFG) : CFG).spawnZ);
            this.spawnZombie((_crd && ZombieType === void 0 ? (_reportPossibleCrUseOfZombieType({
              error: Error()
            }), ZombieType) : ZombieType).Runner, 2, (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
              error: Error()
            }), CFG) : CFG).spawnZ - 8);
            this.spawnBarrel(0, (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
              error: Error()
            }), CFG) : CFG).spawnZ - 14);
          });
          push(242, () => {
            this.spawnHazard((_crd && HazardType === void 0 ? (_reportPossibleCrUseOfHazardType({
              error: Error()
            }), HazardType) : HazardType).Charger, 1, (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
              error: Error()
            }), CFG) : CFG).spawnZ);
            this.spawnZombie((_crd && ZombieType === void 0 ? (_reportPossibleCrUseOfZombieType({
              error: Error()
            }), ZombieType) : ZombieType).Bomber, 0, (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
              error: Error()
            }), CFG) : CFG).spawnZ - 10);
          }); // BOSS：拦截玩家，进度暂停

          push(258, () => this.spawnBoss()); // 终点 XP 箱子：通关主奖励

          push(286, () => this.spawnGoal());
        }
        /** 常规波次：密度随阶段提升，且同一波最多占 2 条轨道（永远留一条安全轨道） */


        waveTick() {
          const gap = this.traveled < 130 ? 13 : this.traveled < 210 ? 10 : 7.5;
          if (this.traveled - this.lastWaveAt < gap) return;
          this.lastWaveAt = this.traveled;
          if (this.traveled < 40 || this.traveled > 258) return; // 教学段与 BOSS 段不刷散怪

          const phase = this.traveled < 130 ? 0 : this.traveled < 210 ? 1 : 2;
          const count = phase === 0 ? 1 : phase === 1 ? Math.random() < 0.5 ? 2 : 1 : Math.random() < 0.4 ? 3 : 2;
          const used = [];

          for (let i = 0; i < count; i++) {
            const lane = this.pickLane(used);
            used.push(lane);
            let type = (_crd && ZombieType === void 0 ? (_reportPossibleCrUseOfZombieType({
              error: Error()
            }), ZombieType) : ZombieType).Normal;
            const r = Math.random();

            if (phase === 1) {
              type = r < 0.35 ? (_crd && ZombieType === void 0 ? (_reportPossibleCrUseOfZombieType({
                error: Error()
              }), ZombieType) : ZombieType).Runner : (_crd && ZombieType === void 0 ? (_reportPossibleCrUseOfZombieType({
                error: Error()
              }), ZombieType) : ZombieType).Normal;
            } else if (phase === 2) {
              type = r < 0.25 ? (_crd && ZombieType === void 0 ? (_reportPossibleCrUseOfZombieType({
                error: Error()
              }), ZombieType) : ZombieType).Bomber : r < 0.6 ? (_crd && ZombieType === void 0 ? (_reportPossibleCrUseOfZombieType({
                error: Error()
              }), ZombieType) : ZombieType).Runner : (_crd && ZombieType === void 0 ? (_reportPossibleCrUseOfZombieType({
                error: Error()
              }), ZombieType) : ZombieType).Normal;
            }

            this.spawnZombie(type, lane, (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
              error: Error()
            }), CFG) : CFG).spawnZ);
          }
        }

        pickLane(used) {
          const pool = [];

          for (let i = 0; i < (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).laneCount; i++) {
            if (used.indexOf(i) < 0) pool.push(i);
          } // 同一波最多用 laneCount-1 条轨道，保证始终有可躲的空间


          if (used.length >= (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).laneCount - 1) return used[0];
          return pool[Math.floor(Math.random() * pool.length)];
        }

        dashTick() {
          if (this.traveled - this.lastDashAt < 6) return;
          this.lastDashAt = this.traveled;
          this.spawnRoadMarks();
        }
        /** 路面虚线：提供“在前进”的视觉参照（伪位移） */


        spawnRoadMarks() {
          for (let i = 0; i < (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).laneCount; i++) {
            const node = this.acquire('dash', () => {
              const n = (_crd && makeBox === void 0 ? (_reportPossibleCrUseOfmakeBox({
                error: Error()
              }), makeBox) : makeBox)('Dash', 0.5, 0.04, 1.6, (_crd && COLORS === void 0 ? (_reportPossibleCrUseOfCOLORS({
                error: Error()
              }), COLORS) : COLORS).dash);
              n.addComponent(_crd && Scroller === void 0 ? (_reportPossibleCrUseOfScroller({
                error: Error()
              }), Scroller) : Scroller);
              return n;
            });
            node.setPosition((_crd && laneX === void 0 ? (_reportPossibleCrUseOflaneX({
              error: Error()
            }), laneX) : laneX)(i), 0.02, (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
              error: Error()
            }), CFG) : CFG).spawnZ);
          }
        } // ------------------------------------------------------------ 生成各实体


        spawnZombie(type, lane, z) {
          const boss = type === (_crd && ZombieType === void 0 ? (_reportPossibleCrUseOfZombieType({
            error: Error()
          }), ZombieType) : ZombieType).Boss;
          const node = this.acquire(boss ? 'boss' : 'zombie', () => {
            const n = new Node(boss ? 'Boss' : 'Zombie');
            n.addComponent(_crd && Zombie === void 0 ? (_reportPossibleCrUseOfZombie({
              error: Error()
            }), Zombie) : Zombie);
            return n;
          });
          const comp = node.getComponent(_crd && Zombie === void 0 ? (_reportPossibleCrUseOfZombie({
            error: Error()
          }), Zombie) : Zombie);
          comp.build(type, lane, z);
          (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
            error: Error()
          }), world) : world).zombies.push(comp);
        }

        spawnBullet(x, z, dmg) {
          const node = this.acquire('bullet', () => {
            const n = (_crd && makeBox === void 0 ? (_reportPossibleCrUseOfmakeBox({
              error: Error()
            }), makeBox) : makeBox)('Bullet', 0.18, 0.18, 1.0, (_crd && COLORS === void 0 ? (_reportPossibleCrUseOfCOLORS({
              error: Error()
            }), COLORS) : COLORS).bullet);
            n.addComponent(_crd && Bullet === void 0 ? (_reportPossibleCrUseOfBullet({
              error: Error()
            }), Bullet) : Bullet);
            return n;
          });
          const b = node.getComponent(_crd && Bullet === void 0 ? (_reportPossibleCrUseOfBullet({
            error: Error()
          }), Bullet) : Bullet);
          b.build(x, z, dmg);
          (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
            error: Error()
          }), world) : world).bullets.push(b);
        }

        spawnBarrel(lane, z) {
          const node = this.acquire('barrel', () => {
            const n = new Node('Barrel');
            n.addComponent(_crd && Barrel === void 0 ? (_reportPossibleCrUseOfBarrel({
              error: Error()
            }), Barrel) : Barrel);
            return n;
          });
          const b = node.getComponent(_crd && Barrel === void 0 ? (_reportPossibleCrUseOfBarrel({
            error: Error()
          }), Barrel) : Barrel);
          b.init(this.buffs);
          b.build(lane, z);
          (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
            error: Error()
          }), world) : world).objects.push(b);
        }

        spawnHazard(kind, lane, z) {
          const node = this.acquire('hazard', () => {
            const n = new Node('Hazard');
            n.addComponent(_crd && Hazard === void 0 ? (_reportPossibleCrUseOfHazard({
              error: Error()
            }), Hazard) : Hazard);
            return n;
          });
          const h = node.getComponent(_crd && Hazard === void 0 ? (_reportPossibleCrUseOfHazard({
            error: Error()
          }), Hazard) : Hazard);
          h.build(kind, lane, z);
          (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
            error: Error()
          }), world) : world).hazards.push(h);
        }

        spawnNumberGate(z) {
          const node = this.acquire('gate', () => {
            const n = new Node('NumberGate');
            n.addComponent(_crd && NumberGate === void 0 ? (_reportPossibleCrUseOfNumberGate({
              error: Error()
            }), NumberGate) : NumberGate);
            return n;
          });
          const g = node.getComponent(_crd && NumberGate === void 0 ? (_reportPossibleCrUseOfNumberGate({
            error: Error()
          }), NumberGate) : NumberGate);
          g.init(this.buffs);
          g.build(z);
          (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
            error: Error()
          }), world) : world).objects.push(g);
          (_crd && bus === void 0 ? (_reportPossibleCrUseOfbus({
            error: Error()
          }), bus) : bus).emit((_crd && EV === void 0 ? (_reportPossibleCrUseOfEV({
            error: Error()
          }), EV) : EV).GATE_PROMPT, '前方数字门：打爆得技能满充 + 增伤 20%，或从右侧绕开');
        }

        spawnBuffGate(lane, z, id, value, label) {
          const node = this.acquire('buffGate', () => {
            const n = new Node('BuffGate');
            n.addComponent(_crd && BuffGate === void 0 ? (_reportPossibleCrUseOfBuffGate({
              error: Error()
            }), BuffGate) : BuffGate);
            return n;
          });
          const g = node.getComponent(_crd && BuffGate === void 0 ? (_reportPossibleCrUseOfBuffGate({
            error: Error()
          }), BuffGate) : BuffGate);
          g.build(lane, z, id, value, label);
          return g;
        }

        spawnBuffZone(z) {
          this.spawnHazard((_crd && HazardType === void 0 ? (_reportPossibleCrUseOfHazardType({
            error: Error()
          }), HazardType) : HazardType).Roller, 1, z); // 中道滚轮：逼玩家必须做选择

          const a = this.spawnBuffGate(0, z - 4, (_crd && BuffId === void 0 ? (_reportPossibleCrUseOfBuffId({
            error: Error()
          }), BuffId) : BuffId).Damage, 0.5, '伤害+50%');
          const b = this.spawnBuffGate(2, z - 4, (_crd && BuffId === void 0 ? (_reportPossibleCrUseOfBuffId({
            error: Error()
          }), BuffId) : BuffId).FireRate, 0.4, '攻速+40%');
          this.buffGates = [a, b];
          this.gateResolved = false;
          (_crd && bus === void 0 ? (_reportPossibleCrUseOfbus({
            error: Error()
          }), bus) : bus).emit((_crd && EV === void 0 ? (_reportPossibleCrUseOfEV({
            error: Error()
          }), EV) : EV).GATE_PROMPT, '二选一：左道 伤害+50%　/　右道 攻速+40%（中道有滚轮）');
        }

        spawnBoss() {
          this.spawnZombie((_crd && ZombieType === void 0 ? (_reportPossibleCrUseOfZombieType({
            error: Error()
          }), ZombieType) : ZombieType).Boss, 1, (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).spawnZ);
          (_crd && bus === void 0 ? (_reportPossibleCrUseOfbus({
            error: Error()
          }), bus) : bus).emit((_crd && EV === void 0 ? (_reportPossibleCrUseOfEV({
            error: Error()
          }), EV) : EV).GATE_PROMPT, '章节 BOSS 来袭：先清小怪，再找输出窗口');
        }

        spawnGoal() {
          const node = this.acquire('goal', () => {
            const n = new Node('GoalBox');
            n.addComponent(_crd && GoalBox === void 0 ? (_reportPossibleCrUseOfGoalBox({
              error: Error()
            }), GoalBox) : GoalBox);
            return n;
          });
          const g = node.getComponent(_crd && GoalBox === void 0 ? (_reportPossibleCrUseOfGoalBox({
            error: Error()
          }), GoalBox) : GoalBox);
          g.build((_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).spawnZ);
        }

        spawnWarning(lane, seconds) {
          const node = this.acquire('warning', () => {
            const n = (_crd && makePlane === void 0 ? (_reportPossibleCrUseOfmakePlane({
              error: Error()
            }), makePlane) : makePlane)('Warning', (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
              error: Error()
            }), CFG) : CFG).laneWidth * 0.9, 14, (_crd && COLORS === void 0 ? (_reportPossibleCrUseOfCOLORS({
              error: Error()
            }), COLORS) : COLORS).hazard);
            n.addComponent(_crd && WarningStripe === void 0 ? (_reportPossibleCrUseOfWarningStripe({
              error: Error()
            }), WarningStripe) : WarningStripe);
            return n;
          });
          const w = node.getComponent(_crd && WarningStripe === void 0 ? (_reportPossibleCrUseOfWarningStripe({
            error: Error()
          }), WarningStripe) : WarningStripe);
          w.build(lane, seconds);
        }
        /** 增益门结算：从哪条车道穿过，就拿哪个 buff */


        gateTick() {
          if (this.gateResolved || this.buffGates.length === 0) return;

          for (const g of this.buffGates) {
            if (!g.alive) continue;
            const dz = g.node.position.z - (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
              error: Error()
            }), world) : world).playerZ;

            if (dz > -1.2 && dz < 1.6 && (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
              error: Error()
            }), world) : world).playerLane === g.laneIndex) {
              this.buffs.applyPermanent(g.buffId, g.buffValue, g.label + '（本局）');
              (_crd && bus === void 0 ? (_reportPossibleCrUseOfbus({
                error: Error()
              }), bus) : bus).emit((_crd && EV === void 0 ? (_reportPossibleCrUseOfEV({
                error: Error()
              }), EV) : EV).GATE_DONE, `已选择：${g.label}`);
              (_crd && bus === void 0 ? (_reportPossibleCrUseOfbus({
                error: Error()
              }), bus) : bus).emit((_crd && EV === void 0 ? (_reportPossibleCrUseOfEV({
                error: Error()
              }), EV) : EV).GATE_PROMPT, '');
              this.gateResolved = true;

              for (const gg of this.buffGates) {
                if (gg.alive) gg.release();
              }

              return;
            }
          }
        } // ------------------------------------------------------------ 对象池


        acquire(key, factory) {
          let node = null;
          const list = this.pools.get(key);

          if (list && list.length > 0) {
            node = list.pop();
          }

          if (!node) node = factory();
          this.pooled.delete(node);
          this.keyOf.set(node, key);
          this.parent.addChild(node);
          node.active = true;
          return node;
        }

        releaseNode(key, node) {
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

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=2d1832cfcfa0094faa89b983ff11b4d26ca1cbc2.js.map