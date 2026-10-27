System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, BuffId, CFG, COLORS, advanceZ, laneX, makeBox, removeFrom, world, bus, EV, _dec, _class, _crd, ccclass, NumberGate;

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
    }, function (_unresolved_2) {
      BuffId = _unresolved_2.BuffId;
      CFG = _unresolved_2.CFG;
      COLORS = _unresolved_2.COLORS;
      advanceZ = _unresolved_2.advanceZ;
      laneX = _unresolved_2.laneX;
      makeBox = _unresolved_2.makeBox;
    }, function (_unresolved_3) {
      removeFrom = _unresolved_3.removeFrom;
      world = _unresolved_3.world;
    }, function (_unresolved_4) {
      bus = _unresolved_4.bus;
      EV = _unresolved_4.EV;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "a6f9bPHvYVObcFXnKC+jz1F", "NumberGate", undefined);

      __checkObsolete__(['_decorator', 'Component']);

      ({
        ccclass
      } = _decorator);
      /** 数字门：有血量，打空后大额奖励（技能满充 + 本局永久增伤） */

      _export("NumberGate", NumberGate = (_dec = ccclass('NumberGate'), _dec(_class = class NumberGate extends Component {
        constructor(...args) {
          super(...args);
          this.laneIndex = 0;
          this.alive = false;
          this.hitHalfWidth = 1.7;
          this.tag = void 0;
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
          this.tag = {
            name: this.tagText(),
            height: 4.4,
            color: (_crd && COLORS === void 0 ? (_reportPossibleCrUseOfCOLORS({
              error: Error()
            }), COLORS) : COLORS).tagItem
          };
        }
        /** 头顶名牌直接显示剩余血量，玩家不必看 HUD 就能决定打还是绕 */


        tagText() {
          return `数字门 ${Math.max(0, Math.ceil(this.hp))}/${this.maxHp}`;
        }

        takeDamage(dmg) {
          if (!this.alive) return;
          this.hp -= dmg;
          if (this.tag) this.tag.name = this.tagText();
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

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=4ee0c095097803bc723f6e8450fa9a85e1181bc1.js.map