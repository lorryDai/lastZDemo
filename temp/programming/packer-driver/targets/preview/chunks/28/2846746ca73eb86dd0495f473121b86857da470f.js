System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, CFG, ZombieType, _crd, world;

  /** 从列表里移除（回收时统一调用） */
  function removeFrom(list, item) {
    var i = list.indexOf(item);
    if (i >= 0) list.splice(i, 1);
  }
  /** 当前是否有存活的 BOSS */


  function hasAliveBoss() {
    for (var z of world.zombies) {
      if (z.alive && z.type === (_crd && ZombieType === void 0 ? (_reportPossibleCrUseOfZombieType({
        error: Error()
      }), ZombieType) : ZombieType).Boss) return true;
    }

    return false;
  }
  /** 找出正前方最近的存活目标（用于自动瞄准） */


  function nearestTarget(fromZ) {
    var best = null;
    var bestZ = -Infinity;

    for (var u of world.zombies) {
      if (u.alive && u.node.position.z < fromZ - 0.5 && u.node.position.z > bestZ) {
        bestZ = u.node.position.z;
        best = u;
      }
    }

    if (best) return best;

    for (var _u of world.objects) {
      if (_u.alive && _u.node.position.z < fromZ - 0.5 && _u.node.position.z > bestZ) {
        bestZ = _u.node.position.z;
        best = _u;
      }
    }

    return best;
  }

  function _reportPossibleCrUseOfCFG(extras) {
    _reporterNs.report("CFG", "./GameConfig", _context.meta, extras);
  }

  function _reportPossibleCrUseOfZombieType(extras) {
    _reporterNs.report("ZombieType", "./GameConfig", _context.meta, extras);
  }

  _export({
    removeFrom: removeFrom,
    hasAliveBoss: hasAliveBoss,
    nearestTarget: nearestTarget
  });

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
    }, function (_unresolved_2) {
      CFG = _unresolved_2.CFG;
      ZombieType = _unresolved_2.ZombieType;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "9bbb5bn+8tCbbk3xJ7j4mXE", "World", undefined);

      __checkObsolete__(['Color', 'Node']);

      /** 头顶名牌：由 NameTagSystem 投影到 UI 层绘制 */

      /** 可被子弹命中的实体：丧尸 / 油桶 / 数字门 / 终点箱 / BOSS */

      /** 不可破坏危险体：打不掉，碰到就扣大血 */

      /** 只挂名牌、不参与射击判定的实体（增益门 / 终点箱等） */

      /** 子弹：由英雄发射，朝 -Z 笔直飞行 */

      /**
       * 世界注册表 + 跨模块回调。
       * 实体（丧尸 / 交互物）只依赖这里，不直接依赖 PlayerController 或 SpawnDirector，
       * 避免模块循环引用。
       */
      _export("world", world = {
        zombies: [],
        objects: [],
        // 油桶 / 数字门 / 增益门 / 终点箱
        hazards: [],
        // 尖刺 / 滚轮 / 冲撞怪
        tagged: [],
        // 只挂名牌、不参与射击判定的实体
        bullets: [],
        playerLane: 1,
        playerZ: (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
          error: Error()
        }), CFG) : CFG).playerZ,

        /** 世界推进速度与实体速度（由 SpawnDirector 每帧写入） */
        travelSpeed: (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
          error: Error()
        }), CFG) : CFG).baseSpeed,
        entitySpeed: (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
          error: Error()
        }), CFG) : CFG).baseSpeed,

        /** BOSS 拦截期间进度停止 */
        bossEngaged: false,
        // ------- 由各系统注入的回调 -------
        hitPlayer: dmg => {},
        chargeSkill: v => {},
        spawnZombie: (type, lane, z) => {},
        spawnWarning: (lane, seconds) => {},
        spawnBullet: (x, z, dmg) => {},
        onGoal: () => {},
        release: (key, node) => {},
        onKill: headshot => {},
        onBossKilled: () => {}
      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=2846746ca73eb86dd0495f473121b86857da470f.js.map