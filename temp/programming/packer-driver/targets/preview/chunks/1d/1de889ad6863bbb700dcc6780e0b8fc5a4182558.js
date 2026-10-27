System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, MeshRenderer, CFG, COLORS, unlitMaterial, removeFrom, world, _dec, _class, _class2, _crd, ccclass, Bullet;

  function _reportPossibleCrUseOfCFG(extras) {
    _reporterNs.report("CFG", "./GameConfig", _context.meta, extras);
  }

  function _reportPossibleCrUseOfCOLORS(extras) {
    _reporterNs.report("COLORS", "./GameConfig", _context.meta, extras);
  }

  function _reportPossibleCrUseOfunlitMaterial(extras) {
    _reporterNs.report("unlitMaterial", "./GameConfig", _context.meta, extras);
  }

  function _reportPossibleCrUseOfIBullet(extras) {
    _reporterNs.report("IBullet", "./World", _context.meta, extras);
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
      MeshRenderer = _cc.MeshRenderer;
    }, function (_unresolved_2) {
      CFG = _unresolved_2.CFG;
      COLORS = _unresolved_2.COLORS;
      unlitMaterial = _unresolved_2.unlitMaterial;
    }, function (_unresolved_3) {
      removeFrom = _unresolved_3.removeFrom;
      world = _unresolved_3.world;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "d3c6en0ilJLOp4kb32LXJoS", "Bullet", undefined);

      __checkObsolete__(['_decorator', 'Component', 'MeshRenderer']);

      ({
        ccclass
      } = _decorator);
      /** 子弹：朝 -Z 笔直飞行，不做任何追踪；命中谁只看子弹自己的横向位置 */

      _export("Bullet", Bullet = (_dec = ccclass('Bullet'), _dec(_class = (_class2 = class Bullet extends Component {
        constructor() {
          super(...arguments);
          this.damage = (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).baseDamage;
          this.alive = false;
        }

        build(x, z, dmg) {
          this.damage = dmg;
          this.alive = true;
          this.node.setPosition(x, 1.15, z);
          var mr = this.node.getComponent(MeshRenderer);
          if (mr) mr.setMaterial((_crd && unlitMaterial === void 0 ? (_reportPossibleCrUseOfunlitMaterial({
            error: Error()
          }), unlitMaterial) : unlitMaterial)((_crd && COLORS === void 0 ? (_reportPossibleCrUseOfCOLORS({
            error: Error()
          }), COLORS) : COLORS).bullet), 0);
        }

        kill() {
          if (!this.alive) return;
          this.alive = false;
          (_crd && removeFrom === void 0 ? (_reportPossibleCrUseOfremoveFrom({
            error: Error()
          }), removeFrom) : removeFrom)((_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
            error: Error()
          }), world) : world).bullets, this);
          (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
            error: Error()
          }), world) : world).release('bullet', this.node);
        }

        update(dt) {
          if (!this.alive) return;
          var prevZ = this.node.position.z;
          var z = prevZ - (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).bulletSpeed * dt;
          this.node.setPosition(this.node.position.x, this.node.position.y, z); // 子弹一帧走 ~0.9 单位，必须用「上一帧与这一帧之间」的区间判定，否则会穿透小目标

          var inRange = tz => tz <= prevZ + 0.4 && tz >= z - 0.4;

          var x = this.node.position.x;

          for (var u of (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
            error: Error()
          }), world) : world).zombies) {
            var _u$hitHalfWidth;

            if (!u.alive || !inRange(u.node.position.z)) continue;
            var dx = Math.abs(u.node.position.x - x);
            if (dx > ((_u$hitHalfWidth = u.hitHalfWidth) != null ? _u$hitHalfWidth : 0.7)) continue; // 横向对准头部 → 爆头 2.5 倍；擦着身体命中 → 普通伤害

            u.takeDamage(this.damage, dx < Bullet.HEADSHOT_DX);
            this.kill();
            return;
          } // 交互物同样按 X 距离判定：数字门横跨两条车道


          for (var _u of (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
            error: Error()
          }), world) : world).objects) {
            var _u$hitHalfWidth2;

            if (!_u.alive || !inRange(_u.node.position.z)) continue;
            if (Math.abs(_u.node.position.x - x) > ((_u$hitHalfWidth2 = _u.hitHalfWidth) != null ? _u$hitHalfWidth2 : 0.7)) continue;

            _u.takeDamage(this.damage, false);

            this.kill();
            return;
          }

          if (z < (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).bulletDespawnZ) this.kill();
        }

      }, _class2.HEADSHOT_DX = 0.36, _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=1de889ad6863bbb700dcc6780e0b8fc5a4182558.js.map