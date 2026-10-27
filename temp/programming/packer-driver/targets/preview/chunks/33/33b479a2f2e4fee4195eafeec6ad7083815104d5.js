System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Color, Component, MeshRenderer, CFG, COLORS, ZombieType, advanceZ, laneX, makeBox, unlitMaterial, removeFrom, world, bus, EV, _dec, _class, _crd, ccclass, ZOMBIE_NAME, Zombie;

  function _reportPossibleCrUseOfCFG(extras) {
    _reporterNs.report("CFG", "./GameConfig", _context.meta, extras);
  }

  function _reportPossibleCrUseOfCOLORS(extras) {
    _reporterNs.report("COLORS", "./GameConfig", _context.meta, extras);
  }

  function _reportPossibleCrUseOfZombieType(extras) {
    _reporterNs.report("ZombieType", "./GameConfig", _context.meta, extras);
  }

  function _reportPossibleCrUseOfadvanceZ(extras) {
    _reporterNs.report("advanceZ", "./GameConfig", _context.meta, extras);
  }

  function _reportPossibleCrUseOflaneX(extras) {
    _reporterNs.report("laneX", "./GameConfig", _context.meta, extras);
  }

  function _reportPossibleCrUseOfmakeBox(extras) {
    _reporterNs.report("makeBox", "./GameConfig", _context.meta, extras);
  }

  function _reportPossibleCrUseOfunlitMaterial(extras) {
    _reporterNs.report("unlitMaterial", "./GameConfig", _context.meta, extras);
  }

  function _reportPossibleCrUseOfITag(extras) {
    _reporterNs.report("ITag", "./World", _context.meta, extras);
  }

  function _reportPossibleCrUseOfIUnit(extras) {
    _reporterNs.report("IUnit", "./World", _context.meta, extras);
  }

  function _reportPossibleCrUseOfremoveFrom(extras) {
    _reporterNs.report("removeFrom", "./World", _context.meta, extras);
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

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Color = _cc.Color;
      Component = _cc.Component;
      MeshRenderer = _cc.MeshRenderer;
    }, function (_unresolved_2) {
      CFG = _unresolved_2.CFG;
      COLORS = _unresolved_2.COLORS;
      ZombieType = _unresolved_2.ZombieType;
      advanceZ = _unresolved_2.advanceZ;
      laneX = _unresolved_2.laneX;
      makeBox = _unresolved_2.makeBox;
      unlitMaterial = _unresolved_2.unlitMaterial;
    }, function (_unresolved_3) {
      removeFrom = _unresolved_3.removeFrom;
      world = _unresolved_3.world;
    }, function (_unresolved_4) {
      bus = _unresolved_4.bus;
      EV = _unresolved_4.EV;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "004a7GE0q1OHZPdbmTve18H", "Zombie", undefined);

      __checkObsolete__(['_decorator', 'Color', 'Component', 'MeshRenderer', 'Node', 'Vec3']);

      ({
        ccclass
      } = _decorator);
      ZOMBIE_NAME = {
        [(_crd && ZombieType === void 0 ? (_reportPossibleCrUseOfZombieType({
          error: Error()
        }), ZombieType) : ZombieType).Normal]: '普通丧尸',
        [(_crd && ZombieType === void 0 ? (_reportPossibleCrUseOfZombieType({
          error: Error()
        }), ZombieType) : ZombieType).Runner]: '疾跑丧尸',
        [(_crd && ZombieType === void 0 ? (_reportPossibleCrUseOfZombieType({
          error: Error()
        }), ZombieType) : ZombieType).Bomber]: '自爆丧尸',
        [(_crd && ZombieType === void 0 ? (_reportPossibleCrUseOfZombieType({
          error: Error()
        }), ZombieType) : ZombieType).Tank]: '重甲感染者',
        [(_crd && ZombieType === void 0 ? (_reportPossibleCrUseOfZombieType({
          error: Error()
        }), ZombieType) : ZombieType).Boss]: 'BOSS'
      };
      /** 受击闪缩需要逐个改主体部件材质，这里记录一下 */

      /**
       * 丧尸实体。四种普通类型共用一套逻辑，仅数值与行为分支不同；
       * BOSS 走多阶段分支（Rule.md：多阶段、多轨道 AOE、召唤小怪）。
       */
      _export("Zombie", Zombie = (_dec = ccclass('Zombie'), _dec(_class = class Zombie extends Component {
        constructor() {
          super(...arguments);
          this.type = (_crd && ZombieType === void 0 ? (_reportPossibleCrUseOfZombieType({
            error: Error()
          }), ZombieType) : ZombieType).Normal;
          this.laneIndex = 1;
          this.alive = false;

          /** 子弹横向判定半宽，按体型设置 */
          this.hitHalfWidth = 0.6;
          this.tag = void 0;
          this.hp = 0;
          this.maxHp = 0;
          this.damage = 0;
          this.speed = 0;
          this.hitCd = 0;
          this.fuseTime = -1;
          // 自爆倒计时
          this.phase = 1;
          // BOSS 阶段
          this.aoeCd = 0;
          this.summonCd = 0;
          this.engaged = false;
          // BOSS 是否已拦住玩家
          this.flash = 0;
          this.aoeDelay = -1;
          // AOE 落地倒计时（-1 表示没有待结算的 AOE）
          this.aoeLanes = [];
          this.parts = [];
          this.trailAdded = false;
        }

        build(type, lane, z) {
          this.type = type;
          this.laneIndex = lane;
          this.node.setPosition((_crd && laneX === void 0 ? (_reportPossibleCrUseOflaneX({
            error: Error()
          }), laneX) : laneX)(lane), 0, z);
          this.applyStat();
        }

        applyStat() {
          var st = this.statOf(this.type);
          this.maxHp = st.hp;
          this.hp = st.hp;
          this.damage = st.damage;
          this.speed = st.speed;
          this.alive = true;
          this.hitCd = 0;
          this.fuseTime = this.type === (_crd && ZombieType === void 0 ? (_reportPossibleCrUseOfZombieType({
            error: Error()
          }), ZombieType) : ZombieType).Bomber ? 2.4 : -1;
          this.phase = 1;
          this.aoeCd = 3;
          this.summonCd = 6;
          this.engaged = false;
          this.flash = 0;
          this.aoeDelay = -1;
          this.aoeLanes = [];
          this.buildVisual(st);
          this.hitHalfWidth = st.width * 0.5 + 0.15;
          this.tag = {
            name: ZOMBIE_NAME[this.type] || '丧尸',
            height: st.height + st.width * 0.8 + (this.type === (_crd && ZombieType === void 0 ? (_reportPossibleCrUseOfZombieType({
              error: Error()
            }), ZombieType) : ZombieType).Boss ? 1.4 : 0.6),
            color: this.type === (_crd && ZombieType === void 0 ? (_reportPossibleCrUseOfZombieType({
              error: Error()
            }), ZombieType) : ZombieType).Boss ? (_crd && COLORS === void 0 ? (_reportPossibleCrUseOfCOLORS({
              error: Error()
            }), COLORS) : COLORS).tagDanger : (_crd && COLORS === void 0 ? (_reportPossibleCrUseOfCOLORS({
              error: Error()
            }), COLORS) : COLORS).tagMob
          };
        }

        statOf(type) {
          switch (type) {
            case (_crd && ZombieType === void 0 ? (_reportPossibleCrUseOfZombieType({
              error: Error()
            }), ZombieType) : ZombieType).Runner:
              return {
                hp: 16,
                speed: 16,
                damage: 10,
                width: 0.8,
                height: 1.5,
                color: (_crd && COLORS === void 0 ? (_reportPossibleCrUseOfCOLORS({
                  error: Error()
                }), COLORS) : COLORS).runner
              };

            case (_crd && ZombieType === void 0 ? (_reportPossibleCrUseOfZombieType({
              error: Error()
            }), ZombieType) : ZombieType).Bomber:
              return {
                hp: 22,
                speed: 8,
                damage: (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
                  error: Error()
                }), CFG) : CFG).hazardDamage,
                width: 0.9,
                height: 1.1,
                color: (_crd && COLORS === void 0 ? (_reportPossibleCrUseOfCOLORS({
                  error: Error()
                }), COLORS) : COLORS).bomber
              };

            case (_crd && ZombieType === void 0 ? (_reportPossibleCrUseOfZombieType({
              error: Error()
            }), ZombieType) : ZombieType).Tank:
              return {
                hp: 90,
                speed: 4.2,
                damage: 18,
                width: 1.4,
                height: 2.0,
                color: (_crd && COLORS === void 0 ? (_reportPossibleCrUseOfCOLORS({
                  error: Error()
                }), COLORS) : COLORS).tank
              };

            case (_crd && ZombieType === void 0 ? (_reportPossibleCrUseOfZombieType({
              error: Error()
            }), ZombieType) : ZombieType).Boss:
              return {
                hp: (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
                  error: Error()
                }), CFG) : CFG).bossHp,
                speed: 3.2,
                damage: 22,
                width: 2.8,
                height: 3.0,
                color: (_crd && COLORS === void 0 ? (_reportPossibleCrUseOfCOLORS({
                  error: Error()
                }), COLORS) : COLORS).boss
              };

            default:
              return {
                hp: 26,
                speed: 6.4,
                damage: 12,
                width: 0.9,
                height: 1.6,
                color: (_crd && COLORS === void 0 ? (_reportPossibleCrUseOfCOLORS({
                  error: Error()
                }), COLORS) : COLORS).normal
              };
          }
        }

        addTrail() {
          this.trailAdded = true;
          var t = (_crd && makeBox === void 0 ? (_reportPossibleCrUseOfmakeBox({
            error: Error()
          }), makeBox) : makeBox)('Trail', 0.5, 0.5, 3.2, (_crd && COLORS === void 0 ? (_reportPossibleCrUseOfCOLORS({
            error: Error()
          }), COLORS) : COLORS).trail, this.node);
          t.setPosition(0, 0.9, 1.8);
        }

        buildVisual(st) {
          this.node.removeAllChildren();
          this.parts = [];
          this.trailAdded = false;
          var body = (_crd && makeBox === void 0 ? (_reportPossibleCrUseOfmakeBox({
            error: Error()
          }), makeBox) : makeBox)('Body', st.width, st.height, st.width, st.color, this.node);
          body.setPosition(0, st.height / 2, 0);
          this.trackPart(body, st.color); // 头部用方盒（不用 sphere，规避图元 API 差异）

          var head = (_crd && makeBox === void 0 ? (_reportPossibleCrUseOfmakeBox({
            error: Error()
          }), makeBox) : makeBox)('Head', st.width * 0.8, st.width * 0.8, st.width * 0.8, st.color, this.node);
          head.setPosition(0, st.height + st.width * 0.32, 0);
          this.trackPart(head, st.color);

          if (this.type === (_crd && ZombieType === void 0 ? (_reportPossibleCrUseOfZombieType({
            error: Error()
          }), ZombieType) : ZombieType).Boss) {
            // BOSS 加两条臂与头顶尖刺，增加识别度
            for (var d of [-1, 1]) {
              var arm = (_crd && makeBox === void 0 ? (_reportPossibleCrUseOfmakeBox({
                error: Error()
              }), makeBox) : makeBox)('Arm', 0.6, 2.2, 0.6, (_crd && COLORS === void 0 ? (_reportPossibleCrUseOfCOLORS({
                error: Error()
              }), COLORS) : COLORS).boss, this.node);
              arm.setPosition(d * (st.width / 2 + 0.4), 1.4, 0);
              this.trackPart(arm, (_crd && COLORS === void 0 ? (_reportPossibleCrUseOfCOLORS({
                error: Error()
              }), COLORS) : COLORS).boss);
            }

            var horn = (_crd && makeBox === void 0 ? (_reportPossibleCrUseOfmakeBox({
              error: Error()
            }), makeBox) : makeBox)('Horn', 0.3, 0.9, 0.3, (_crd && COLORS === void 0 ? (_reportPossibleCrUseOfCOLORS({
              error: Error()
            }), COLORS) : COLORS).hazard, this.node);
            horn.setPosition(0, st.height + 1.2, 0);
          }

          if (this.type === (_crd && ZombieType === void 0 ? (_reportPossibleCrUseOfZombieType({
            error: Error()
          }), ZombieType) : ZombieType).Tank) {
            var armor = (_crd && makeBox === void 0 ? (_reportPossibleCrUseOfmakeBox({
              error: Error()
            }), makeBox) : makeBox)('Armor', st.width + 0.2, st.height * 0.7, st.width + 0.2, (_crd && COLORS === void 0 ? (_reportPossibleCrUseOfCOLORS({
              error: Error()
            }), COLORS) : COLORS).wall, this.node);
            armor.setPosition(0, st.height * 0.55, 0);
            this.trackPart(armor, (_crd && COLORS === void 0 ? (_reportPossibleCrUseOfCOLORS({
              error: Error()
            }), COLORS) : COLORS).wall);
          }
        }
        /** 登记到受击闪缩列表 */


        trackPart(node, color) {
          var mr = node.getComponent(MeshRenderer);
          if (mr) this.parts.push({
            node,
            mr,
            base: color
          });
        }

        applyFlash(on) {
          if (!this.parts) return;

          for (var p of this.parts) {
            p.mr.setMaterial((_crd && unlitMaterial === void 0 ? (_reportPossibleCrUseOfunlitMaterial({
              error: Error()
            }), unlitMaterial) : unlitMaterial)(on ? (_crd && COLORS === void 0 ? (_reportPossibleCrUseOfCOLORS({
              error: Error()
            }), COLORS) : COLORS).hitFlash : p.base), 0);
          }
        }

        takeDamage(dmg, headshot) {
          if (!this.alive) return;
          var real = headshot ? dmg * (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).headshotMul : dmg;
          this.hp -= real;
          if (headshot) (_crd && bus === void 0 ? (_reportPossibleCrUseOfbus({
            error: Error()
          }), bus) : bus).emit((_crd && EV === void 0 ? (_reportPossibleCrUseOfEV({
            error: Error()
          }), EV) : EV).HEADSHOT, true);
          this.flash = 0.08;
          this.applyFlash(true);
          if (this.hp <= 0) this.die(headshot);
        }

        die(headshot) {
          this.alive = false;

          if (this.type === (_crd && ZombieType === void 0 ? (_reportPossibleCrUseOfZombieType({
            error: Error()
          }), ZombieType) : ZombieType).Boss) {
            (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
              error: Error()
            }), world) : world).bossEngaged = false;
            (_crd && bus === void 0 ? (_reportPossibleCrUseOfbus({
              error: Error()
            }), bus) : bus).emit((_crd && EV === void 0 ? (_reportPossibleCrUseOfEV({
              error: Error()
            }), EV) : EV).BOSS_INCOMING, false);
            (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
              error: Error()
            }), world) : world).onBossKilled();
          } else {
            (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
              error: Error()
            }), world) : world).onKill(headshot);
          }

          (_crd && removeFrom === void 0 ? (_reportPossibleCrUseOfremoveFrom({
            error: Error()
          }), removeFrom) : removeFrom)((_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
            error: Error()
          }), world) : world).zombies, this);
          (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
            error: Error()
          }), world) : world).release(this.type === (_crd && ZombieType === void 0 ? (_reportPossibleCrUseOfZombieType({
            error: Error()
          }), ZombieType) : ZombieType).Boss ? 'boss' : 'zombie', this.node);
        }
        /** 命中玩家检测：同轨 + Z 轴接近 */


        tryHitPlayer() {
          if ((_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
            error: Error()
          }), world) : world).playerLane !== this.laneIndex) return false;
          var dz = this.node.position.z - (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
            error: Error()
          }), world) : world).playerZ;
          return dz > -1.2 && dz < 1.6;
        }

        update(dt) {
          if (!this.alive) return; // 受击闪缩恢复

          if (this.flash > 0) {
            this.flash -= dt;

            if (this.flash <= 0) {
              this.applyFlash(false);
              if (this.type === (_crd && ZombieType === void 0 ? (_reportPossibleCrUseOfZombieType({
                error: Error()
              }), ZombieType) : ZombieType).Bomber) this.node.setScale(1, 1, 1);
            }
          }

          if (this.type === (_crd && ZombieType === void 0 ? (_reportPossibleCrUseOfZombieType({
            error: Error()
          }), ZombieType) : ZombieType).Boss) {
            this.updateBoss(dt, this.node.position);
            return;
          } // 沿轨道向 +Z（朝玩家）推进


          (_crd && advanceZ === void 0 ? (_reportPossibleCrUseOfadvanceZ({
            error: Error()
          }), advanceZ) : advanceZ)(this.node, this.enterSpeed(dt));
          var p = this.node.position; // 高速型加一条速度拖尾，让「突进」在画面上读得出来

          if (this.speed >= 10 && !this.trailAdded) this.addTrail(); // 自爆丧尸：进入引信范围后倒计时，结束时范围伤害

          if (this.type === (_crd && ZombieType === void 0 ? (_reportPossibleCrUseOfZombieType({
            error: Error()
          }), ZombieType) : ZombieType).Bomber && p.z > (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).playerZ - 12) {
            this.fuseTime -= dt;

            if (this.flash <= 0) {
              var k = 1 + Math.sin(this.fuseTime * 22) * 0.12;
              this.node.setScale(k, k, k);
            }

            if (this.fuseTime <= 0) {
              this.explode();
              return;
            }
          } // 撞击判定


          if (this.hitCd > 0) this.hitCd -= dt;

          if (this.hitCd <= 0 && this.tryHitPlayer()) {
            this.hitCd = 1.0;
            (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
              error: Error()
            }), world) : world).hitPlayer(this.damage);

            if (this.type === (_crd && ZombieType === void 0 ? (_reportPossibleCrUseOfZombieType({
              error: Error()
            }), ZombieType) : ZombieType).Bomber) {
              this.explode();
              return;
            }
          }

          if (p.z > (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).despawnZ) {
            this.alive = false;
            (_crd && removeFrom === void 0 ? (_reportPossibleCrUseOfremoveFrom({
              error: Error()
            }), removeFrom) : removeFrom)((_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
              error: Error()
            }), world) : world).zombies, this);
            (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
              error: Error()
            }), world) : world).release('zombie', this.node);
          }
        }

        enterSpeed(dt) {
          return (this.speed + (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
            error: Error()
          }), world) : world).entitySpeed * 0.35) * dt;
        }

        explode() {
          // 自爆：范围伤害，玩家在相邻轨道也会被波及
          var dl = Math.abs((_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
            error: Error()
          }), world) : world).playerLane - this.laneIndex);
          var dz = Math.abs(this.node.position.z - (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
            error: Error()
          }), world) : world).playerZ);

          if (dl <= 1 && dz < 2.6) {
            (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
              error: Error()
            }), world) : world).hitPlayer(dl === 0 ? this.damage : this.damage * 0.6);
          }

          this.alive = false;
          (_crd && removeFrom === void 0 ? (_reportPossibleCrUseOfremoveFrom({
            error: Error()
          }), removeFrom) : removeFrom)((_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
            error: Error()
          }), world) : world).zombies, this);
          (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
            error: Error()
          }), world) : world).release('zombie', this.node);
        } // ------------------------------------------------------------ BOSS


        updateBoss(dt, p) {
          // 阶段推进
          var ratio = this.hp / this.maxHp;
          var next = ratio > 0.66 ? 1 : ratio > 0.33 ? 2 : 3;

          if (next !== this.phase) {
            this.phase = next;
            this.aoeCd = 1.2;
            (_crd && bus === void 0 ? (_reportPossibleCrUseOfbus({
              error: Error()
            }), bus) : bus).emit((_crd && EV === void 0 ? (_reportPossibleCrUseOfEV({
              error: Error()
            }), EV) : EV).GATE_PROMPT, "BOSS \u8FDB\u5165\u7B2C " + this.phase + " \u9636\u6BB5");
          }

          if (!this.engaged) {
            // 先推进到拦截位置，然后停住挡住玩家
            if (p.z < (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
              error: Error()
            }), CFG) : CFG).bossHoldZ) {
              (_crd && advanceZ === void 0 ? (_reportPossibleCrUseOfadvanceZ({
                error: Error()
              }), advanceZ) : advanceZ)(this.node, this.enterSpeed(dt));
            } else {
              this.node.setPosition(p.x, p.y, (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
                error: Error()
              }), CFG) : CFG).bossHoldZ);
              this.engaged = true;
              (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
                error: Error()
              }), world) : world).bossEngaged = true;
              (_crd && bus === void 0 ? (_reportPossibleCrUseOfbus({
                error: Error()
              }), bus) : bus).emit((_crd && EV === void 0 ? (_reportPossibleCrUseOfEV({
                error: Error()
              }), EV) : EV).BOSS_INCOMING, true);
            }

            return;
          } // 左右缓慢游走，制造多轨道压迫


          var t = this.phase === 3 ? 2.2 : 1.2;
          var wander = Math.sin(performance.now() / 1000 * t) * (this.phase === 3 ? (_crd && laneX === void 0 ? (_reportPossibleCrUseOflaneX({
            error: Error()
          }), laneX) : laneX)((_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).laneCount - 1) : (_crd && laneX === void 0 ? (_reportPossibleCrUseOflaneX({
            error: Error()
          }), laneX) : laneX)(1));
          var nx = p.x + (wander - p.x) * Math.min(1, dt * 1.6);
          this.node.setPosition(nx, p.y, p.z);
          this.laneIndex = this.nearLane(nx); // 阶段 2+：多轨道 AOE

          this.aoeCd -= dt;

          if (this.aoeCd <= 0 && this.phase >= 2) {
            this.aoeCd = this.phase === 3 ? 2.4 : 3.4;
            this.castAoe();
          }

          this.tickAoe(dt); // 阶段 3：召唤小怪

          this.summonCd -= dt;

          if (this.summonCd <= 0 && this.phase >= 3) {
            this.summonCd = 6;
            this.summon();
          } // 近身撞击


          if (this.hitCd > 0) this.hitCd -= dt;

          if (this.hitCd <= 0 && this.tryHitPlayer()) {
            this.hitCd = 1.0;
            (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
              error: Error()
            }), world) : world).hitPlayer(this.damage);
          }
        }

        nearLane(x) {
          var best = 0;
          var bd = Infinity;

          for (var i = 0; i < (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).laneCount; i++) {
            var d = Math.abs((_crd && laneX === void 0 ? (_reportPossibleCrUseOflaneX({
              error: Error()
            }), laneX) : laneX)(i) - x);

            if (d < bd) {
              bd = d;
              best = i;
            }
          }

          return best;
        }
        /**
         * 多轨道 AOE：先放预警，0.9 秒后结算。
         * 用自身计时器而不是 scheduleOnce——BOSS 节点会从池里复用，
         * 遗留的延迟回调会在下一次生命里误触发。
         */


        castAoe() {
          var hitLanes = this.phase === 3 ? [0, 1, 2].filter(l => l !== this.laneIndex) : [this.laneIndex];

          for (var l of hitLanes) {
            if (l < 0 || l >= (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
              error: Error()
            }), CFG) : CFG).laneCount) continue;
            (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
              error: Error()
            }), world) : world).spawnWarning(l, 0.9);
          }

          this.aoeLanes = hitLanes.slice();
          this.aoeDelay = 0.9;
        }
        /** 结算待落地的 AOE */


        tickAoe(dt) {
          if (this.aoeDelay < 0) return;
          this.aoeDelay -= dt;
          if (this.aoeDelay > 0) return;
          this.aoeDelay = -1;
          if (!this.alive) return;

          if (this.aoeLanes.indexOf((_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
            error: Error()
          }), world) : world).playerLane) >= 0) {
            (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
              error: Error()
            }), world) : world).hitPlayer((_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
              error: Error()
            }), CFG) : CFG).bossAoeDamage);
          }

          this.aoeLanes = [];
        }

        summon() {
          for (var i = 0; i < 2; i++) {
            var lane = Math.floor(Math.random() * (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
              error: Error()
            }), CFG) : CFG).laneCount);
            (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
              error: Error()
            }), world) : world).spawnZombie(Math.random() < 0.5 ? (_crd && ZombieType === void 0 ? (_reportPossibleCrUseOfZombieType({
              error: Error()
            }), ZombieType) : ZombieType).Runner : (_crd && ZombieType === void 0 ? (_reportPossibleCrUseOfZombieType({
              error: Error()
            }), ZombieType) : ZombieType).Normal, lane, (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
              error: Error()
            }), CFG) : CFG).spawnZ + 4);
          }
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=33b479a2f2e4fee4195eafeec6ad7083815104d5.js.map