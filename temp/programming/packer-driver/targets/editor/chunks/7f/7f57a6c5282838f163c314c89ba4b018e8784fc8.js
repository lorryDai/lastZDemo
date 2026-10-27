System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, BuffId, CFG, COLORS, advanceZ, laneX, makeCylinder, removeFrom, world, _dec, _class, _crd, ccclass, Barrel;

  function _reportPossibleCrUseOfBuffId(extras) {
    _reporterNs.report("BuffId", "./GameConfig", _context.meta, extras);
  }

  function _reportPossibleCrUseOfCFG(extras) {
    _reporterNs.report("CFG", "./GameConfig", _context.meta, extras);
  }

  function _reportPossibleCrUseOfCOLORS(extras) {
    _reporterNs.report("COLORS", "./GameConfig", _context.meta, extras);
  }

  function _reportPossibleCrUseOfadvanceZ(extras) {
    _reporterNs.report("advanceZ", "./GameConfig", _context.meta, extras);
  }

  function _reportPossibleCrUseOflaneX(extras) {
    _reporterNs.report("laneX", "./GameConfig", _context.meta, extras);
  }

  function _reportPossibleCrUseOfmakeCylinder(extras) {
    _reporterNs.report("makeCylinder", "./GameConfig", _context.meta, extras);
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
    }, function (_unresolved_2) {
      BuffId = _unresolved_2.BuffId;
      CFG = _unresolved_2.CFG;
      COLORS = _unresolved_2.COLORS;
      advanceZ = _unresolved_2.advanceZ;
      laneX = _unresolved_2.laneX;
      makeCylinder = _unresolved_2.makeCylinder;
    }, function (_unresolved_3) {
      removeFrom = _unresolved_3.removeFrom;
      world = _unresolved_3.world;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "b1a4cfSbjlPGJwCfVo7hOYQ", "Barrel", undefined);

      __checkObsolete__(['_decorator', 'Component']);

      ({
        ccclass
      } = _decorator);
      /** 油桶：可击毁，掉落临时增益（攻速 / 伤害 / 僚机） */

      _export("Barrel", Barrel = (_dec = ccclass('Barrel'), _dec(_class = class Barrel extends Component {
        constructor(...args) {
          super(...args);
          this.laneIndex = 1;
          this.alive = false;
          this.hitHalfWidth = 0.75;
          this.tag = void 0;
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
          this.tag = {
            name: '油桶',
            height: 1.9,
            color: (_crd && COLORS === void 0 ? (_reportPossibleCrUseOfCOLORS({
              error: Error()
            }), COLORS) : COLORS).tagItem
          };
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

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=7f57a6c5282838f163c314c89ba4b018e8784fc8.js.map