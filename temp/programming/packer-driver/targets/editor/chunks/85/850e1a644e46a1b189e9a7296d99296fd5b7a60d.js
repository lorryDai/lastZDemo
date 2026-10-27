System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, BuffId, CFG, COLORS, laneX, makeBox, makePlane, world, bus, EV, _dec, _class, _crd, ccclass, PlayerController;

  function _reportPossibleCrUseOfBuffId(extras) {
    _reporterNs.report("BuffId", "./GameConfig", _context.meta, extras);
  }

  function _reportPossibleCrUseOfCFG(extras) {
    _reporterNs.report("CFG", "./GameConfig", _context.meta, extras);
  }

  function _reportPossibleCrUseOfCOLORS(extras) {
    _reporterNs.report("COLORS", "./GameConfig", _context.meta, extras);
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
      Node = _cc.Node;
    }, function (_unresolved_2) {
      BuffId = _unresolved_2.BuffId;
      CFG = _unresolved_2.CFG;
      COLORS = _unresolved_2.COLORS;
      laneX = _unresolved_2.laneX;
      makeBox = _unresolved_2.makeBox;
      makePlane = _unresolved_2.makePlane;
    }, function (_unresolved_3) {
      world = _unresolved_3.world;
    }, function (_unresolved_4) {
      bus = _unresolved_4.bus;
      EV = _unresolved_4.EV;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "262bf2I13RPzq3L6tuorb1U", "PlayerController", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node']);

      ({
        ccclass
      } = _decorator);
      /**
       * 英雄：鼠标自由横移 + 自动射击。
       * - 横向位置由鼠标跟随（连续移动，不再离散换道），laneIndex 只作为碰撞归属的近似值
       * - 默认自动射击，子弹笔直向前，不做追踪
       * - 子弹横向对准目标 → 爆头 2.5 倍
       * - 技能独立充能（击杀 / 受击 / 时间），一键释放清场 + 护盾
       */

      _export("PlayerController", PlayerController = (_dec = ccclass('PlayerController'), _dec(_class = class PlayerController extends Component {
        constructor(...args) {
          super(...args);
          this.laneIndex = 1;
          this.hp = (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).playerMaxHp;
          this.maxHp = (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).playerMaxHp;
          this.skill = 0;
          this.alive = false;

          /** 鼠标指向的目标 X（世界单位），角色每帧朝它平滑靠过去 */
          this.targetX = 0;
          this.buffs = null;
          this.body = null;
          this.gun = null;
          this.shield = null;
          this.wingL = null;
          this.wingR = null;
          this.fireCd = 0;
          this.shieldTime = 0;
          this.invTime = 0;
          this.flashTime = 0;
        }

        init(buffs) {
          this.buffs = buffs;
          this.buildVisual();
          this.reset();
        }

        buildVisual() {
          const root = this.node;
          this.body = (_crd && makeBox === void 0 ? (_reportPossibleCrUseOfmakeBox({
            error: Error()
          }), makeBox) : makeBox)('Body', 0.9, 1.4, 0.9, (_crd && COLORS === void 0 ? (_reportPossibleCrUseOfCOLORS({
            error: Error()
          }), COLORS) : COLORS).player, root);
          this.body.setPosition(0, 0.7, 0);
          const head = (_crd && makeBox === void 0 ? (_reportPossibleCrUseOfmakeBox({
            error: Error()
          }), makeBox) : makeBox)('Head', 0.6, 0.6, 0.6, (_crd && COLORS === void 0 ? (_reportPossibleCrUseOfCOLORS({
            error: Error()
          }), COLORS) : COLORS).playerGun, root);
          head.setPosition(0, 1.7, 0);
          this.gun = (_crd && makeBox === void 0 ? (_reportPossibleCrUseOfmakeBox({
            error: Error()
          }), makeBox) : makeBox)('Gun', 0.22, 0.22, 1.5, (_crd && COLORS === void 0 ? (_reportPossibleCrUseOfCOLORS({
            error: Error()
          }), COLORS) : COLORS).playerGun, root);
          this.gun.setPosition(0, 1.15, -1.0); // 护盾（技能期间显示）

          this.shield = (_crd && makePlane === void 0 ? (_reportPossibleCrUseOfmakePlane({
            error: Error()
          }), makePlane) : makePlane)('Shield', 2.6, 2.6, (_crd && COLORS === void 0 ? (_reportPossibleCrUseOfCOLORS({
            error: Error()
          }), COLORS) : COLORS).shield, root);
          this.shield.setPosition(0, 0.06, 0);
          this.shield.active = false; // 脚下拖尾：给出「持续向前推进」的视觉参照

          const trail = (_crd && makeBox === void 0 ? (_reportPossibleCrUseOfmakeBox({
            error: Error()
          }), makeBox) : makeBox)('Trail', 0.7, 0.06, 3.2, (_crd && COLORS === void 0 ? (_reportPossibleCrUseOfCOLORS({
            error: Error()
          }), COLORS) : COLORS).trail, root);
          trail.setPosition(0, 0.03, 1.8); // 僚机：英雄模型的复制体，分列左右各一条车道

          this.wingL = this.buildWing(-1);
          this.wingR = this.buildWing(1);
        }
        /** 僚机复制体（与英雄同一套模型，只有「僚机支援」buff 生效时才显示） */


        buildWing(side) {
          const root = new Node(side < 0 ? 'WingLeft' : 'WingRight');
          root.parent = this.node;
          root.setPosition(side * (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).laneWidth, 0, 0.2);
          const body = (_crd && makeBox === void 0 ? (_reportPossibleCrUseOfmakeBox({
            error: Error()
          }), makeBox) : makeBox)('Body', 0.9, 1.4, 0.9, (_crd && COLORS === void 0 ? (_reportPossibleCrUseOfCOLORS({
            error: Error()
          }), COLORS) : COLORS).player, root);
          body.setPosition(0, 0.7, 0);
          const head = (_crd && makeBox === void 0 ? (_reportPossibleCrUseOfmakeBox({
            error: Error()
          }), makeBox) : makeBox)('Head', 0.6, 0.6, 0.6, (_crd && COLORS === void 0 ? (_reportPossibleCrUseOfCOLORS({
            error: Error()
          }), COLORS) : COLORS).playerGun, root);
          head.setPosition(0, 1.7, 0);
          const gun = (_crd && makeBox === void 0 ? (_reportPossibleCrUseOfmakeBox({
            error: Error()
          }), makeBox) : makeBox)('Gun', 0.22, 0.22, 1.5, (_crd && COLORS === void 0 ? (_reportPossibleCrUseOfCOLORS({
            error: Error()
          }), COLORS) : COLORS).playerGun, root);
          gun.setPosition(0, 1.15, -1.0);
          root.active = false;
          return root;
        }
        /** 每局开始重置 */


        reset() {
          this.laneIndex = 1;
          this.targetX = (_crd && laneX === void 0 ? (_reportPossibleCrUseOflaneX({
            error: Error()
          }), laneX) : laneX)(1);
          this.hp = (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).playerMaxHp;
          this.skill = 0;
          this.alive = true;
          this.fireCd = 0;
          this.shieldTime = 0;
          this.invTime = 0;
          this.flashTime = 0;
          this.node.setPosition(this.targetX, 0, (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).playerZ);
          this.node.setScale(1, 1, 1);
          this.shield.active = false;
        }
        /** 鼠标横移：把指针换算出的世界 X 交给角色，限制在跑道内 */


        setTargetX(x) {
          if (!this.alive) return;
          const half = (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).laneCount * (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).laneWidth / 2 - 0.6;
          this.targetX = Math.max(-half, Math.min(half, x));
        }
        /** 键盘 A/D：按一次挪一条车道 */


        nudgeLane(dir) {
          if (!this.alive) return;
          this.setTargetX(this.targetX + dir * (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).laneWidth);
        }

        addSkill(v) {
          if (!this.alive) return;
          this.skill = Math.min((_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).skillMax, this.skill + v);
          (_crd && bus === void 0 ? (_reportPossibleCrUseOfbus({
            error: Error()
          }), bus) : bus).emit((_crd && EV === void 0 ? (_reportPossibleCrUseOfEV({
            error: Error()
          }), EV) : EV).SKILL, this.skill / (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).skillMax);
        }

        takeDamage(dmg) {
          if (!this.alive || this.invTime > 0) return;
          let real = dmg;
          if (this.shieldTime > 0) real = dmg * 0.4; // 护盾期减伤

          this.hp -= real;
          this.invTime = 0.35;
          this.flashTime = 0.16;
          this.addSkill((_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).skillGainHit);
          (_crd && bus === void 0 ? (_reportPossibleCrUseOfbus({
            error: Error()
          }), bus) : bus).emit((_crd && EV === void 0 ? (_reportPossibleCrUseOfEV({
            error: Error()
          }), EV) : EV).HP, this.hp / this.maxHp);

          if (this.hp <= 0) {
            this.hp = 0;
            this.alive = false;
            (_crd && bus === void 0 ? (_reportPossibleCrUseOfbus({
              error: Error()
            }), bus) : bus).emit((_crd && EV === void 0 ? (_reportPossibleCrUseOfEV({
              error: Error()
            }), EV) : EV).RUN_END, {
              win: false
            });
          }
        }
        /** 释放技能：正面清场 + 回血 + 护盾 */


        castSkill() {
          if (!this.alive || this.skill < (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).skillMax) return false;
          this.skill = 0;
          (_crd && bus === void 0 ? (_reportPossibleCrUseOfbus({
            error: Error()
          }), bus) : bus).emit((_crd && EV === void 0 ? (_reportPossibleCrUseOfEV({
            error: Error()
          }), EV) : EV).SKILL, 0);
          const pz = this.node.position.z;

          for (const z of (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
            error: Error()
          }), world) : world).zombies.slice()) {
            if (z.alive && z.node.position.z < pz + 1.5) {
              z.takeDamage((_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
                error: Error()
              }), CFG) : CFG).skillDamage, false);
            }
          }

          for (const o of (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
            error: Error()
          }), world) : world).objects.slice()) {
            if (o.alive && o.node.position.z < pz + 1.5) {
              o.takeDamage((_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
                error: Error()
              }), CFG) : CFG).skillDamage, false);
            }
          }

          this.shieldTime = (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).skillShieldTime;
          this.hp = Math.min(this.maxHp, this.hp + (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).skillHeal);
          (_crd && bus === void 0 ? (_reportPossibleCrUseOfbus({
            error: Error()
          }), bus) : bus).emit((_crd && EV === void 0 ? (_reportPossibleCrUseOfEV({
            error: Error()
          }), EV) : EV).HP, this.hp / this.maxHp);
          return true;
        }

        update(dt) {
          // 僚机复制体：只在「僚机支援」生效且在场时显示
          const escort = this.alive && this.buffs.has((_crd && BuffId === void 0 ? (_reportPossibleCrUseOfBuffId({
            error: Error()
          }), BuffId) : BuffId).Escort);

          if (this.wingL.active !== escort) {
            this.wingL.active = escort;
            this.wingR.active = escort;
          }

          if (!this.alive) return; // 1. 横向跟随鼠标（连续移动），laneIndex 取最近车道作为碰撞归属

          const px = this.node.position.x;
          const nx = Math.abs(this.targetX - px) < 0.02 ? this.targetX : px + (this.targetX - px) * Math.min(1, (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).laneLerp * dt);
          this.node.setPosition(nx, 0, (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).playerZ);
          (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
            error: Error()
          }), world) : world).playerZ = (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).playerZ;
          this.laneIndex = Math.max(0, Math.min((_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).laneCount - 1, Math.round(nx / (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).laneWidth + ((_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).laneCount - 1) / 2)));
          (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
            error: Error()
          }), world) : world).playerLane = this.laneIndex; // 2. 时间类计时器

          if (this.invTime > 0) this.invTime -= dt;

          if (this.flashTime > 0) {
            this.flashTime -= dt;
            const k = this.flashTime > 0 ? 1.15 : 1;
            this.node.setScale(k, k, k); // 受击闪缩
          }

          if (this.shieldTime > 0) {
            this.shieldTime -= dt;
            this.shield.active = this.shieldTime > 0;
          } // 3. 技能充能（时间维度）


          this.addSkill((_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).skillGainPerSec * dt); // 4. 自动射击

          this.fireCd -= dt;

          if (this.fireCd <= 0) {
            this.fireCd = (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
              error: Error()
            }), CFG) : CFG).fireInterval / this.buffs.mul((_crd && BuffId === void 0 ? (_reportPossibleCrUseOfBuffId({
              error: Error()
            }), BuffId) : BuffId).FireRate);
            this.fire();
          }
        }

        fire() {
          const dmg = (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).baseDamage * this.buffs.mul((_crd && BuffId === void 0 ? (_reportPossibleCrUseOfBuffId({
            error: Error()
          }), BuffId) : BuffId).Damage); // 枪口取角色当前实际坐标（跟随鼠标途中也是真实位置）

          const gx = this.node.position.x;
          const gz = this.node.position.z - 1.2; // 笔直向前：不追踪任何目标，命中谁由子弹自己的横向位置决定

          (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
            error: Error()
          }), world) : world).spawnBullet(gx, gz, dmg); // 僚机：从左右各一条车道的位置平行补射

          if (this.buffs.has((_crd && BuffId === void 0 ? (_reportPossibleCrUseOfBuffId({
            error: Error()
          }), BuffId) : BuffId).Escort)) {
            (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
              error: Error()
            }), world) : world).spawnBullet(gx - (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
              error: Error()
            }), CFG) : CFG).laneWidth, gz, dmg * 0.6);
            (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
              error: Error()
            }), world) : world).spawnBullet(gx + (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
              error: Error()
            }), CFG) : CFG).laneWidth, gz, dmg * 0.6);
          }
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=850e1a644e46a1b189e9a7296d99296fd5b7a60d.js.map