System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, MeshRenderer, BuffId, CFG, COLORS, HazardType, advanceZ, laneX, makeBox, makeCylinder, makePlane, unlitMaterial, removeFrom, world, bus, EV, _dec, _class, _dec2, _class3, _dec3, _class5, _dec4, _class7, _dec5, _class9, _dec6, _class11, _crd, ccclass, Barrel, Hazard, NumberGate, BuffGate, GoalBox, WarningStripe;

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

  function _reportPossibleCrUseOfadvanceZ(extras) {
    _reporterNs.report("advanceZ", "./GameConfig", _context.meta, extras);
  }

  function _reportPossibleCrUseOflaneX(extras) {
    _reporterNs.report("laneX", "./GameConfig", _context.meta, extras);
  }

  function _reportPossibleCrUseOfmakeBox(extras) {
    _reporterNs.report("makeBox", "./GameConfig", _context.meta, extras);
  }

  function _reportPossibleCrUseOfmakeCylinder(extras) {
    _reporterNs.report("makeCylinder", "./GameConfig", _context.meta, extras);
  }

  function _reportPossibleCrUseOfmakePlane(extras) {
    _reporterNs.report("makePlane", "./GameConfig", _context.meta, extras);
  }

  function _reportPossibleCrUseOfunlitMaterial(extras) {
    _reporterNs.report("unlitMaterial", "./GameConfig", _context.meta, extras);
  }

  function _reportPossibleCrUseOfIUnit(extras) {
    _reporterNs.report("IUnit", "./World", _context.meta, extras);
  }

  function _reportPossibleCrUseOfIHazard(extras) {
    _reporterNs.report("IHazard", "./World", _context.meta, extras);
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
      MeshRenderer = _cc.MeshRenderer;
    }, function (_unresolved_2) {
      BuffId = _unresolved_2.BuffId;
      CFG = _unresolved_2.CFG;
      COLORS = _unresolved_2.COLORS;
      HazardType = _unresolved_2.HazardType;
      advanceZ = _unresolved_2.advanceZ;
      laneX = _unresolved_2.laneX;
      makeBox = _unresolved_2.makeBox;
      makeCylinder = _unresolved_2.makeCylinder;
      makePlane = _unresolved_2.makePlane;
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

      _cclegacy._RF.push({}, "5fbd6zp43BDXKoiIWRr52dy", "Interactables", undefined);

      __checkObsolete__(['_decorator', 'Component', 'MeshRenderer']);

      ({
        ccclass
      } = _decorator);
      /** 油桶：可击毁，掉落临时增益（攻速 / 伤害 / 僚机 / 回血） */

      _export("Barrel", Barrel = (_dec = ccclass('Barrel'), _dec(_class = class Barrel extends Component {
        constructor(...args) {
          super(...args);
          this.laneIndex = 1;
          this.alive = false;
          this.hp = 0;
          this.buffs = null;
        }

        init(buffs) {
          this.buffs = buffs;
        }

        build(lane, z) {
          this.laneIndex = lane;
          this.hp = 12;
          this.alive = true;
          this.node.removeAllChildren();
          this.node.setPosition((_crd && laneX === void 0 ? (_reportPossibleCrUseOflaneX({
            error: Error()
          }), laneX) : laneX)(lane), 0, z);
          const body = (_crd && makeCylinder === void 0 ? (_reportPossibleCrUseOfmakeCylinder({
            error: Error()
          }), makeCylinder) : makeCylinder)('Barrel', 0.5, 1.2, (_crd && COLORS === void 0 ? (_reportPossibleCrUseOfCOLORS({
            error: Error()
          }), COLORS) : COLORS).barrel, this.node);
          body.setPosition(0, 0.6, 0);
        }

        takeDamage(dmg) {
          if (!this.alive) return;
          this.hp -= dmg;
          if (this.hp <= 0) this.grant();
        }
        /** 撞破也给 buff：风险收益设计的一部分 */


        grant() {
          this.alive = false;
          const pick = Math.random();

          if (pick < 0.35) {
            this.buffs.apply((_crd && BuffId === void 0 ? (_reportPossibleCrUseOfBuffId({
              error: Error()
            }), BuffId) : BuffId).Damage, 0.4, 10, '伤害+40%');
          } else if (pick < 0.7) {
            this.buffs.apply((_crd && BuffId === void 0 ? (_reportPossibleCrUseOfBuffId({
              error: Error()
            }), BuffId) : BuffId).FireRate, 0.3, 10, '攻速+30%');
          } else {
            this.buffs.apply((_crd && BuffId === void 0 ? (_reportPossibleCrUseOfBuffId({
              error: Error()
            }), BuffId) : BuffId).Escort, 1, 10, '僚机支援');
          }

          (_crd && removeFrom === void 0 ? (_reportPossibleCrUseOfremoveFrom({
            error: Error()
          }), removeFrom) : removeFrom)((_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
            error: Error()
          }), world) : world).objects, this);
          (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
            error: Error()
          }), world) : world).release('barrel', this.node);
        }

        update(dt) {
          if (!this.alive) return;
          (_crd && advanceZ === void 0 ? (_reportPossibleCrUseOfadvanceZ({
            error: Error()
          }), advanceZ) : advanceZ)(this.node, (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
            error: Error()
          }), world) : world).travelSpeed * dt);

          if (Math.abs(this.node.position.z - (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
            error: Error()
          }), world) : world).playerZ) < 1.4 && (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
            error: Error()
          }), world) : world).playerLane === this.laneIndex) {
            this.grant();
            return;
          }

          if (this.node.position.z > (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).despawnZ) {
            this.alive = false;
            (_crd && removeFrom === void 0 ? (_reportPossibleCrUseOfremoveFrom({
              error: Error()
            }), removeFrom) : removeFrom)((_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
              error: Error()
            }), world) : world).objects, this);
            (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
              error: Error()
            }), world) : world).release('barrel', this.node);
          }
        }

      }) || _class));
      /** 不可破坏危险体：打不掉，碰到直接扣大量血（Rule.md 最高优先级） */


      _export("Hazard", Hazard = (_dec2 = ccclass('Hazard'), _dec2(_class3 = class Hazard extends Component {
        constructor(...args) {
          super(...args);
          this.laneIndex = 1;
          this.alive = false;
          this.kind = (_crd && HazardType === void 0 ? (_reportPossibleCrUseOfHazardType({
            error: Error()
          }), HazardType) : HazardType).Spike;
          this.touched = false;
        }

        build(kind, lane, z) {
          this.kind = kind;
          this.laneIndex = lane;
          this.alive = true;
          this.touched = false;
          this.node.removeAllChildren();
          this.node.setPosition((_crd && laneX === void 0 ? (_reportPossibleCrUseOflaneX({
            error: Error()
          }), laneX) : laneX)(lane), 0, z);

          if (kind === (_crd && HazardType === void 0 ? (_reportPossibleCrUseOfHazardType({
            error: Error()
          }), HazardType) : HazardType).Roller) {
            const r = (_crd && makeCylinder === void 0 ? (_reportPossibleCrUseOfmakeCylinder({
              error: Error()
            }), makeCylinder) : makeCylinder)('Roller', 1.0, (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
              error: Error()
            }), CFG) : CFG).laneWidth * 0.9, (_crd && COLORS === void 0 ? (_reportPossibleCrUseOfCOLORS({
              error: Error()
            }), COLORS) : COLORS).hazard, this.node);
            r.setPosition(0, 1.0, 0);
            r.setRotationFromEuler(0, 0, 90);
            const core = (_crd && makeBox === void 0 ? (_reportPossibleCrUseOfmakeBox({
              error: Error()
            }), makeBox) : makeBox)('Core', 1.6, 1.2, 1.6, (_crd && COLORS === void 0 ? (_reportPossibleCrUseOfCOLORS({
              error: Error()
            }), COLORS) : COLORS).wall, this.node);
            core.setPosition(0, 1.2, 0);
          } else if (kind === (_crd && HazardType === void 0 ? (_reportPossibleCrUseOfHazardType({
            error: Error()
          }), HazardType) : HazardType).Spike) {
            for (let i = -1; i <= 1; i++) {
              const s = (_crd && makeBox === void 0 ? (_reportPossibleCrUseOfmakeBox({
                error: Error()
              }), makeBox) : makeBox)('Spike', 0.5, 1.4, 0.5, (_crd && COLORS === void 0 ? (_reportPossibleCrUseOfCOLORS({
                error: Error()
              }), COLORS) : COLORS).hazard, this.node);
              s.setPosition(i * 1.0, 0.7, 0);
              s.setRotationFromEuler(0, 0, 18 * i);
            }

            const base = (_crd && makeBox === void 0 ? (_reportPossibleCrUseOfmakeBox({
              error: Error()
            }), makeBox) : makeBox)('Base', 3.0, 0.3, 1.6, (_crd && COLORS === void 0 ? (_reportPossibleCrUseOfCOLORS({
              error: Error()
            }), COLORS) : COLORS).wall, this.node);
            base.setPosition(0, 0.15, 0);
          } else {
            const c = (_crd && makeBox === void 0 ? (_reportPossibleCrUseOfmakeBox({
              error: Error()
            }), makeBox) : makeBox)('Charger', 1.1, 1.4, 1.1, (_crd && COLORS === void 0 ? (_reportPossibleCrUseOfCOLORS({
              error: Error()
            }), COLORS) : COLORS).hazard, this.node);
            c.setPosition(0, 0.7, 0);
            const f = (_crd && makeBox === void 0 ? (_reportPossibleCrUseOfmakeBox({
              error: Error()
            }), makeBox) : makeBox)('Flag', 0.2, 1.6, 0.2, (_crd && COLORS === void 0 ? (_reportPossibleCrUseOfCOLORS({
              error: Error()
            }), COLORS) : COLORS).bulletHead, this.node);
            f.setPosition(0, 2.2, 0);
          }
        }

        update(dt) {
          if (!this.alive) return; // 冲撞怪跑得比世界推进更快

          const sp = (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
            error: Error()
          }), world) : world).travelSpeed + (this.kind === (_crd && HazardType === void 0 ? (_reportPossibleCrUseOfHazardType({
            error: Error()
          }), HazardType) : HazardType).Charger ? 6 : 0);
          (_crd && advanceZ === void 0 ? (_reportPossibleCrUseOfadvanceZ({
            error: Error()
          }), advanceZ) : advanceZ)(this.node, sp * dt);

          if (this.kind === (_crd && HazardType === void 0 ? (_reportPossibleCrUseOfHazardType({
            error: Error()
          }), HazardType) : HazardType).Roller) {
            const r = this.node.children[0];
            if (r) r.setRotationFromEuler(0, 0, 90 + this.node.position.z * 60);
          }

          if (!this.touched && Math.abs(this.node.position.z - (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
            error: Error()
          }), world) : world).playerZ) < 1.5 && (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
            error: Error()
          }), world) : world).playerLane === this.laneIndex) {
            this.touched = true;
            (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
              error: Error()
            }), world) : world).hitPlayer((_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
              error: Error()
            }), CFG) : CFG).hazardDamage);
          }

          if (this.node.position.z > (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).despawnZ) {
            this.alive = false;
            (_crd && removeFrom === void 0 ? (_reportPossibleCrUseOfremoveFrom({
              error: Error()
            }), removeFrom) : removeFrom)((_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
              error: Error()
            }), world) : world).hazards, this);
            (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
              error: Error()
            }), world) : world).release('hazard', this.node);
          }
        }

      }) || _class3));
      /** 数字门：有血量条，打空后大额奖励（技能满充 + 本局永久增伤） */


      _export("NumberGate", NumberGate = (_dec3 = ccclass('NumberGate'), _dec3(_class5 = class NumberGate extends Component {
        constructor(...args) {
          super(...args);
          this.laneIndex = 0;
          this.alive = false;
          this.hp = 0;
          this.maxHp = 130;
          this.buffs = null;
          this.touched = false;
        }

        init(buffs) {
          this.buffs = buffs;
        }
        /** 覆盖左侧两条车道，右侧留一条规避路线：打或绕，由玩家取舍 */


        build(z) {
          this.laneIndex = 0;
          this.hp = this.maxHp;
          this.alive = true;
          this.touched = false;
          this.node.removeAllChildren();
          this.node.setPosition((_crd && laneX === void 0 ? (_reportPossibleCrUseOflaneX({
            error: Error()
          }), laneX) : laneX)(0) + (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).laneWidth / 2, 0, z);

          for (const d of [-1, 1]) {
            const post = (_crd && makeBox === void 0 ? (_reportPossibleCrUseOfmakeBox({
              error: Error()
            }), makeBox) : makeBox)('Post', 0.4, 3.2, 0.4, (_crd && COLORS === void 0 ? (_reportPossibleCrUseOfCOLORS({
              error: Error()
            }), COLORS) : COLORS).gate, this.node);
            post.setPosition(d * (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
              error: Error()
            }), CFG) : CFG).laneWidth, 1.6, 0);
          }

          const bar = (_crd && makeBox === void 0 ? (_reportPossibleCrUseOfmakeBox({
            error: Error()
          }), makeBox) : makeBox)('Bar', (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).laneWidth * 2, 0.4, 0.4, (_crd && COLORS === void 0 ? (_reportPossibleCrUseOfCOLORS({
            error: Error()
          }), COLORS) : COLORS).gate, this.node);
          bar.setPosition(0, 3.2, 0);
          const panel = (_crd && makeBox === void 0 ? (_reportPossibleCrUseOfmakeBox({
            error: Error()
          }), makeBox) : makeBox)('Panel', (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).laneWidth * 2, 2.6, 0.12, (_crd && COLORS === void 0 ? (_reportPossibleCrUseOfCOLORS({
            error: Error()
          }), COLORS) : COLORS).gate, this.node);
          panel.setPosition(0, 1.6, 0);
        }

        takeDamage(dmg) {
          if (!this.alive) return;
          this.hp -= dmg;
          (_crd && bus === void 0 ? (_reportPossibleCrUseOfbus({
            error: Error()
          }), bus) : bus).emit((_crd && EV === void 0 ? (_reportPossibleCrUseOfEV({
            error: Error()
          }), EV) : EV).GATE_PROMPT, `数字门 ${Math.max(0, Math.ceil(this.hp))}/${this.maxHp}　打爆可得技能满充 + 增伤 20%`);

          if (this.hp <= 0) {
            this.alive = false;
            this.buffs.applyPermanent((_crd && BuffId === void 0 ? (_reportPossibleCrUseOfBuffId({
              error: Error()
            }), BuffId) : BuffId).Damage, 0.2, '增伤+20%');
            (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
              error: Error()
            }), world) : world).chargeSkill((_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
              error: Error()
            }), CFG) : CFG).skillMax);
            (_crd && bus === void 0 ? (_reportPossibleCrUseOfbus({
              error: Error()
            }), bus) : bus).emit((_crd && EV === void 0 ? (_reportPossibleCrUseOfEV({
              error: Error()
            }), EV) : EV).GATE_DONE, '数字门已击破：技能满充 + 增伤 20%');
            (_crd && removeFrom === void 0 ? (_reportPossibleCrUseOfremoveFrom({
              error: Error()
            }), removeFrom) : removeFrom)((_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
              error: Error()
            }), world) : world).objects, this);
            (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
              error: Error()
            }), world) : world).release('gate', this.node);
          }
        }

        update(dt) {
          if (!this.alive) return;
          (_crd && advanceZ === void 0 ? (_reportPossibleCrUseOfadvanceZ({
            error: Error()
          }), advanceZ) : advanceZ)(this.node, (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
            error: Error()
          }), world) : world).travelSpeed * dt); // 门被绕过后提示消失

          if (this.node.position.z > (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
            error: Error()
          }), world) : world).playerZ + 2) {
            (_crd && bus === void 0 ? (_reportPossibleCrUseOfbus({
              error: Error()
            }), bus) : bus).emit((_crd && EV === void 0 ? (_reportPossibleCrUseOfEV({
              error: Error()
            }), EV) : EV).GATE_PROMPT, '');
          } // 门板横跨左两条车道：硬闯也要付代价，逼玩家在「打爆」和「绕开」间二选一


          if (!this.touched && Math.abs(this.node.position.z - (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
            error: Error()
          }), world) : world).playerZ) < 1.2 && (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
            error: Error()
          }), world) : world).playerLane <= 1) {
            this.touched = true;
            (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
              error: Error()
            }), world) : world).hitPlayer((_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
              error: Error()
            }), CFG) : CFG).hazardDamage * 0.6);
          }

          if (this.node.position.z > (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).despawnZ) {
            this.alive = false;
            (_crd && removeFrom === void 0 ? (_reportPossibleCrUseOfremoveFrom({
              error: Error()
            }), removeFrom) : removeFrom)((_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
              error: Error()
            }), world) : world).objects, this);
            (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
              error: Error()
            }), world) : world).release('gate', this.node);
          }
        }

      }) || _class5));
      /** 局内增益门（Roguelike 二选一）：从哪条车道穿过就拿哪个 buff */


      _export("BuffGate", BuffGate = (_dec4 = ccclass('BuffGate'), _dec4(_class7 = class BuffGate extends Component {
        constructor(...args) {
          super(...args);
          this.laneIndex = 0;
          this.alive = false;
          this.resolved = false;
          this.buffId = (_crd && BuffId === void 0 ? (_reportPossibleCrUseOfBuffId({
            error: Error()
          }), BuffId) : BuffId).Damage;
          this.buffValue = 0.3;
          this.label = '';
        }

        build(lane, z, id, value, label) {
          this.laneIndex = lane;
          this.alive = true;
          this.resolved = false;
          this.buffId = id;
          this.buffValue = value;
          this.label = label;
          this.node.removeAllChildren();
          this.node.setPosition((_crd && laneX === void 0 ? (_reportPossibleCrUseOflaneX({
            error: Error()
          }), laneX) : laneX)(lane), 0, z);

          for (const d of [-1, 1]) {
            const post = (_crd && makeBox === void 0 ? (_reportPossibleCrUseOfmakeBox({
              error: Error()
            }), makeBox) : makeBox)('Post', 0.3, 3.0, 0.3, (_crd && COLORS === void 0 ? (_reportPossibleCrUseOfCOLORS({
              error: Error()
            }), COLORS) : COLORS).buffGate, this.node);
            post.setPosition(d * (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
              error: Error()
            }), CFG) : CFG).laneWidth * 0.45, 1.5, 0);
          }

          const top = (_crd && makeBox === void 0 ? (_reportPossibleCrUseOfmakeBox({
            error: Error()
          }), makeBox) : makeBox)('Top', (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).laneWidth * 0.95, 0.3, 0.3, (_crd && COLORS === void 0 ? (_reportPossibleCrUseOfCOLORS({
            error: Error()
          }), COLORS) : COLORS).buffGate, this.node);
          top.setPosition(0, 3.0, 0);
          const glow = (_crd && makePlane === void 0 ? (_reportPossibleCrUseOfmakePlane({
            error: Error()
          }), makePlane) : makePlane)('Glow', (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).laneWidth * 0.85, 1.6, (_crd && COLORS === void 0 ? (_reportPossibleCrUseOfCOLORS({
            error: Error()
          }), COLORS) : COLORS).buffGate, this.node);
          glow.setPosition(0, 0.05, 0);
        }

        update(dt) {
          if (!this.alive) return;
          (_crd && advanceZ === void 0 ? (_reportPossibleCrUseOfadvanceZ({
            error: Error()
          }), advanceZ) : advanceZ)(this.node, (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
            error: Error()
          }), world) : world).travelSpeed * dt); // 没被选中也要回收，否则会一直挂在场景里

          if (this.node.position.z > (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).despawnZ) this.release();
        }

        release() {
          this.alive = false;
          (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
            error: Error()
          }), world) : world).release('buffGate', this.node);
        }

      }) || _class7));
      /** 终点 XP 箱子：本局最核心产出物（英雄经验） */


      _export("GoalBox", GoalBox = (_dec5 = ccclass('GoalBox'), _dec5(_class9 = class GoalBox extends Component {
        constructor(...args) {
          super(...args);
          this.alive = false;
          this.spin = 0;
        }

        build(z) {
          this.alive = true;
          this.spin = 0;
          this.node.removeAllChildren();
          this.node.setPosition(0, 0, z);
          const box = (_crd && makeBox === void 0 ? (_reportPossibleCrUseOfmakeBox({
            error: Error()
          }), makeBox) : makeBox)('XPBox', 2.0, 2.0, 2.0, (_crd && COLORS === void 0 ? (_reportPossibleCrUseOfCOLORS({
            error: Error()
          }), COLORS) : COLORS).goal, this.node);
          box.setPosition(0, 1.4, 0);
          const ring = (_crd && makePlane === void 0 ? (_reportPossibleCrUseOfmakePlane({
            error: Error()
          }), makePlane) : makePlane)('Ring', 3.2, 3.2, (_crd && COLORS === void 0 ? (_reportPossibleCrUseOfCOLORS({
            error: Error()
          }), COLORS) : COLORS).bulletHead, this.node);
          ring.setPosition(0, 0.06, 0);
        }

        update(dt) {
          if (!this.alive) return;
          this.spin += dt * 120;
          const box = this.node.children[0];
          if (box) box.setRotationFromEuler(0, this.spin, 0);
          (_crd && advanceZ === void 0 ? (_reportPossibleCrUseOfadvanceZ({
            error: Error()
          }), advanceZ) : advanceZ)(this.node, (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
            error: Error()
          }), world) : world).travelSpeed * dt);

          if (this.node.position.z >= (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
            error: Error()
          }), world) : world).playerZ - 1.0) {
            this.alive = false;
            (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
              error: Error()
            }), world) : world).onGoal();
            (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
              error: Error()
            }), world) : world).release('goal', this.node);
          }
        }

      }) || _class9));
      /** BOSS 多轨道 AOE 的预警条（纯视觉，伤害由 BOSS 结算） */


      _export("WarningStripe", WarningStripe = (_dec6 = ccclass('WarningStripe'), _dec6(_class11 = class WarningStripe extends Component {
        constructor(...args) {
          super(...args);
          this.life = 0;
          this.toggle = 0;
          this.on = false;
        }

        build(lane, seconds) {
          this.life = seconds;
          this.toggle = 0;
          this.on = false;
          this.node.setPosition((_crd && laneX === void 0 ? (_reportPossibleCrUseOflaneX({
            error: Error()
          }), laneX) : laneX)(lane), 0.08, (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
            error: Error()
          }), world) : world).playerZ - 8); // 覆盖玩家前方的整条车道

          const mr = this.node.getComponent(MeshRenderer);
          if (mr) mr.setMaterial((_crd && unlitMaterial === void 0 ? (_reportPossibleCrUseOfunlitMaterial({
            error: Error()
          }), unlitMaterial) : unlitMaterial)((_crd && COLORS === void 0 ? (_reportPossibleCrUseOfCOLORS({
            error: Error()
          }), COLORS) : COLORS).hazard), 0);
        }

        update(dt) {
          this.life -= dt;
          this.toggle -= dt;

          if (this.toggle <= 0) {
            this.toggle = 0.14;
            this.on = !this.on;
            const mr = this.node.getComponent(MeshRenderer);
            if (mr) mr.setMaterial((_crd && unlitMaterial === void 0 ? (_reportPossibleCrUseOfunlitMaterial({
              error: Error()
            }), unlitMaterial) : unlitMaterial)(this.on ? (_crd && COLORS === void 0 ? (_reportPossibleCrUseOfCOLORS({
              error: Error()
            }), COLORS) : COLORS).hazard : (_crd && COLORS === void 0 ? (_reportPossibleCrUseOfCOLORS({
              error: Error()
            }), COLORS) : COLORS).wall), 0);
          }

          if (this.life <= 0) {
            (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
              error: Error()
            }), world) : world).release('warning', this.node);
          }
        }

      }) || _class11));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=f30e91a84eb65db6bd128479a6ac8093229dc091.js.map