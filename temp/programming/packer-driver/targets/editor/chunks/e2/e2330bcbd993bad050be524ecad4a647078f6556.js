System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, COLORS, advanceZ, makeBox, makePlane, removeFrom, world, _dec, _class, _crd, ccclass, GoalBox;

  function _reportPossibleCrUseOfCOLORS(extras) {
    _reporterNs.report("COLORS", "./GameConfig", _context.meta, extras);
  }

  function _reportPossibleCrUseOfadvanceZ(extras) {
    _reporterNs.report("advanceZ", "./GameConfig", _context.meta, extras);
  }

  function _reportPossibleCrUseOfmakeBox(extras) {
    _reporterNs.report("makeBox", "./GameConfig", _context.meta, extras);
  }

  function _reportPossibleCrUseOfmakePlane(extras) {
    _reporterNs.report("makePlane", "./GameConfig", _context.meta, extras);
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
      COLORS = _unresolved_2.COLORS;
      advanceZ = _unresolved_2.advanceZ;
      makeBox = _unresolved_2.makeBox;
      makePlane = _unresolved_2.makePlane;
    }, function (_unresolved_3) {
      removeFrom = _unresolved_3.removeFrom;
      world = _unresolved_3.world;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "e4d7fGlm2NMS681eo6cbRsj", "GoalBox", undefined);

      __checkObsolete__(['_decorator', 'Component']);

      ({
        ccclass
      } = _decorator);
      /** 终点 XP 箱子：本局最核心产出物（英雄经验） */

      _export("GoalBox", GoalBox = (_dec = ccclass('GoalBox'), _dec(_class = class GoalBox extends Component {
        constructor(...args) {
          super(...args);
          this.alive = false;
          this.tag = void 0;
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
          this.tag = {
            name: '终点 XP 箱',
            height: 3.2,
            color: (_crd && COLORS === void 0 ? (_reportPossibleCrUseOfCOLORS({
              error: Error()
            }), COLORS) : COLORS).tagItem
          };
          (_crd && removeFrom === void 0 ? (_reportPossibleCrUseOfremoveFrom({
            error: Error()
          }), removeFrom) : removeFrom)((_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
            error: Error()
          }), world) : world).tagged, this);
          (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
            error: Error()
          }), world) : world).tagged.push(this);
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
            (_crd && removeFrom === void 0 ? (_reportPossibleCrUseOfremoveFrom({
              error: Error()
            }), removeFrom) : removeFrom)((_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
              error: Error()
            }), world) : world).tagged, this);
            (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
              error: Error()
            }), world) : world).onGoal();
            (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
              error: Error()
            }), world) : world).release('goal', this.node);
          }
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=e2330bcbd993bad050be524ecad4a647078f6556.js.map