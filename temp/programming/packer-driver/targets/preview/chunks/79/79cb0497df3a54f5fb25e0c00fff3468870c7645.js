System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, bus, EV, _dec, _class, _crd, ccclass, BuffSystem;

  function _reportPossibleCrUseOfBuffId(extras) {
    _reporterNs.report("BuffId", "./GameConfig", _context.meta, extras);
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
      Component = _cc.Component;
    }, function (_unresolved_2) {
      bus = _unresolved_2.bus;
      EV = _unresolved_2.EV;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "dca87r8Op9M0o0MApDXi4nj", "BuffSystem", undefined);

      __checkObsolete__(['_decorator', 'Component']);

      ({
        ccclass
      } = _decorator);

      /**
       * 局内 buff 系统（Rule.md：单局 build，通关失效）。
       * 数值采用累加后乘算：最终倍率 = 1 + Σvalue。
       */
      _export("BuffSystem", BuffSystem = (_dec = ccclass('BuffSystem'), _dec(_class = class BuffSystem extends Component {
        constructor() {
          super(...arguments);
          this.list = [];
          this.time = 0;
        }

        apply(id, value, duration, label) {
          if (duration <= 0) {
            this.emit();
            return;
          }

          var found = this.list.find(b => b.id === id);

          if (found) {
            found.value = value;
            found.until = this.time + duration;
            found.label = label;
            found.permanent = duration >= 99999;
          } else {
            this.list.push({
              id,
              value,
              until: this.time + duration,
              label,
              permanent: duration >= 99999
            });
          }

          this.emit();
        }
        /** 本局永久增益：数字门、增益门等 */


        applyPermanent(id, value, label) {
          this.apply(id, value, 99999, label);
        }

        has(id) {
          return this.list.some(b => b.id === id);
        }
        /** 伤害 / 攻速的乘区 */


        mul(id) {
          var v = 0;

          for (var b of this.list) {
            if (b.id === id) v += b.value;
          }

          return 1 + v;
        }

        clear() {
          this.list.length = 0;
          this.emit();
        }

        update(dt) {
          if (this.list.length === 0) return;
          this.time += dt;
          var changed = false;

          for (var i = this.list.length - 1; i >= 0; i--) {
            if (this.list[i].until <= this.time) {
              this.list.splice(i, 1);
              changed = true;
            }
          }

          if (changed) this.emit();
        }
        /** HUD 用文案，例如「伤害+40% 8s   攻速+30%」 */


        texts() {
          var parts = [];

          for (var b of this.list) {
            parts.push(b.permanent ? b.label : b.label + " " + Math.ceil(b.until - this.time) + "s");
          }

          return parts.join('   ');
        }

        emit() {
          (_crd && bus === void 0 ? (_reportPossibleCrUseOfbus({
            error: Error()
          }), bus) : bus).emit((_crd && EV === void 0 ? (_reportPossibleCrUseOfEV({
            error: Error()
          }), EV) : EV).BUFF, this.texts());
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=79cb0497df3a54f5fb25e0c00fff3468870c7645.js.map