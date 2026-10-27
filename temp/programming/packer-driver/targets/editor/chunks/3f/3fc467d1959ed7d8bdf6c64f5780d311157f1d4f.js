System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, CFG, COLORS, HazardType, advanceZ, laneX, makeBox, makeCylinder, removeFrom, world, _dec, _class, _crd, ccclass, HAZARD_NAME, Hazard;

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

  function _reportPossibleCrUseOfIHazard(extras) {
    _reporterNs.report("IHazard", "./World", _context.meta, extras);
  }

  function _reportPossibleCrUseOfITag(extras) {
    _reporterNs.report("ITag", "./World", _context.meta, extras);
  }

  function _reportPossibleCrUseOfremoveFrom(extras) {
    _reporterNs.report("removeFrom", "./World", _context.meta, extras);
  }

  function _reportPossibleCrUseOfworld(extras) {
    _reporterNs.report("world", "./World", _context.meta, extras);
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
    }, function (_unresolved_2) {
      CFG = _unresolved_2.CFG;
      COLORS = _unresolved_2.COLORS;
      HazardType = _unresolved_2.HazardType;
      advanceZ = _unresolved_2.advanceZ;
      laneX = _unresolved_2.laneX;
      makeBox = _unresolved_2.makeBox;
      makeCylinder = _unresolved_2.makeCylinder;
    }, function (_unresolved_3) {
      removeFrom = _unresolved_3.removeFrom;
      world = _unresolved_3.world;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "f5e8aK2rHRNXLBGi5+tfiw0", "Hazard", undefined);

      __checkObsolete__(['_decorator', 'Component']);

      ({
        ccclass
      } = _decorator);
      HAZARD_NAME = {
        [(_crd && HazardType === void 0 ? (_reportPossibleCrUseOfHazardType({
          error: Error()
        }), HazardType) : HazardType).Spike]: '尖刺',
        [(_crd && HazardType === void 0 ? (_reportPossibleCrUseOfHazardType({
          error: Error()
        }), HazardType) : HazardType).Roller]: '滚轮',
        [(_crd && HazardType === void 0 ? (_reportPossibleCrUseOfHazardType({
          error: Error()
        }), HazardType) : HazardType).Charger]: '冲撞怪'
      };
      /** 不可破坏危险体：打不掉，碰到直接扣大量血（Rule.md 最高优先级） */

      _export("Hazard", Hazard = (_dec = ccclass('Hazard'), _dec(_class = class Hazard extends Component {
        constructor(...args) {
          super(...args);
          this.laneIndex = 1;
          this.alive = false;
          this.tag = void 0;
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

          this.tag = {
            name: HAZARD_NAME[kind] || '危险体',
            height: kind === (_crd && HazardType === void 0 ? (_reportPossibleCrUseOfHazardType({
              error: Error()
            }), HazardType) : HazardType).Charger ? 3.4 : 2.6,
            color: (_crd && COLORS === void 0 ? (_reportPossibleCrUseOfCOLORS({
              error: Error()
            }), COLORS) : COLORS).tagDanger
          };
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

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=3fc467d1959ed7d8bdf6c64f5780d311157f1d4f.js.map