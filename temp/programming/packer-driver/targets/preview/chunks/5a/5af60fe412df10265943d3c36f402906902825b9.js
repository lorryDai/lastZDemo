System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, BuffId, CFG, COLORS, advanceZ, laneX, makeBox, makePlane, removeFrom, world, _dec, _class, _crd, ccclass, BuffGate;

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
      BuffId = _unresolved_2.BuffId;
      CFG = _unresolved_2.CFG;
      COLORS = _unresolved_2.COLORS;
      advanceZ = _unresolved_2.advanceZ;
      laneX = _unresolved_2.laneX;
      makeBox = _unresolved_2.makeBox;
      makePlane = _unresolved_2.makePlane;
    }, function (_unresolved_3) {
      removeFrom = _unresolved_3.removeFrom;
      world = _unresolved_3.world;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "c2b5djjf0FKKY0TXmyacvNB", "BuffGate", undefined);

      __checkObsolete__(['_decorator', 'Component']);

      ({
        ccclass
      } = _decorator);
      /** 局内增益门（二选一）：从哪条车道穿过就拿哪个 buff */

      _export("BuffGate", BuffGate = (_dec = ccclass('BuffGate'), _dec(_class = class BuffGate extends Component {
        constructor() {
          super(...arguments);
          this.laneIndex = 0;
          this.alive = false;
          this.tag = void 0;
          this.resolved = false;
          this.buffId = (_crd && BuffId === void 0 ? (_reportPossibleCrUseOfBuffId({
            error: Error()
          }), BuffId) : BuffId).Damage;
          this.buffValue = 0.3;
          this.label = '';
        }

        build(lane, z, id, value, text) {
          this.laneIndex = lane;
          this.alive = true;
          this.resolved = false;
          this.buffId = id;
          this.buffValue = value;
          this.label = text;
          this.node.removeAllChildren();
          this.node.setPosition((_crd && laneX === void 0 ? (_reportPossibleCrUseOflaneX({
            error: Error()
          }), laneX) : laneX)(lane), 0, z);

          for (var d of [-1, 1]) {
            var post = (_crd && makeBox === void 0 ? (_reportPossibleCrUseOfmakeBox({
              error: Error()
            }), makeBox) : makeBox)('Post', 0.3, 3.0, 0.3, (_crd && COLORS === void 0 ? (_reportPossibleCrUseOfCOLORS({
              error: Error()
            }), COLORS) : COLORS).buffGate, this.node);
            post.setPosition(d * (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
              error: Error()
            }), CFG) : CFG).laneWidth * 0.45, 1.5, 0);
          }

          var top = (_crd && makeBox === void 0 ? (_reportPossibleCrUseOfmakeBox({
            error: Error()
          }), makeBox) : makeBox)('Top', (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).laneWidth * 0.95, 0.3, 0.3, (_crd && COLORS === void 0 ? (_reportPossibleCrUseOfCOLORS({
            error: Error()
          }), COLORS) : COLORS).buffGate, this.node);
          top.setPosition(0, 3.0, 0);
          var glow = (_crd && makePlane === void 0 ? (_reportPossibleCrUseOfmakePlane({
            error: Error()
          }), makePlane) : makePlane)('Glow', (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).laneWidth * 0.85, 1.6, (_crd && COLORS === void 0 ? (_reportPossibleCrUseOfCOLORS({
            error: Error()
          }), COLORS) : COLORS).buffGate, this.node);
          glow.setPosition(0, 0.05, 0);
          this.tag = {
            name: text,
            height: 3.6,
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
          (_crd && removeFrom === void 0 ? (_reportPossibleCrUseOfremoveFrom({
            error: Error()
          }), removeFrom) : removeFrom)((_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
            error: Error()
          }), world) : world).tagged, this);
          (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
            error: Error()
          }), world) : world).release('buffGate', this.node);
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=5af60fe412df10265943d3c36f402906902825b9.js.map