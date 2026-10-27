System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, MeshRenderer, COLORS, laneX, unlitMaterial, world, _dec, _class, _crd, ccclass, WarningStripe;

  function _reportPossibleCrUseOfCOLORS(extras) {
    _reporterNs.report("COLORS", "./GameConfig", _context.meta, extras);
  }

  function _reportPossibleCrUseOflaneX(extras) {
    _reporterNs.report("laneX", "./GameConfig", _context.meta, extras);
  }

  function _reportPossibleCrUseOfunlitMaterial(extras) {
    _reporterNs.report("unlitMaterial", "./GameConfig", _context.meta, extras);
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
      MeshRenderer = _cc.MeshRenderer;
    }, function (_unresolved_2) {
      COLORS = _unresolved_2.COLORS;
      laneX = _unresolved_2.laneX;
      unlitMaterial = _unresolved_2.unlitMaterial;
    }, function (_unresolved_3) {
      world = _unresolved_3.world;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "c8b1dXp36dKj+N5vsLaHF9n", "WarningStripe", undefined);

      __checkObsolete__(['_decorator', 'Component', 'MeshRenderer']);

      ({
        ccclass
      } = _decorator);
      /** BOSS 多轨道 AOE 的预警条（纯视觉，伤害由 BOSS 结算） */

      _export("WarningStripe", WarningStripe = (_dec = ccclass('WarningStripe'), _dec(_class = class WarningStripe extends Component {
        constructor() {
          super(...arguments);
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

          var mr = this.node.getComponent(MeshRenderer);
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
            var mr = this.node.getComponent(MeshRenderer);
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

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=f6ff29b8a8c5238e126e010fc70e4bb8840a4ae8.js.map