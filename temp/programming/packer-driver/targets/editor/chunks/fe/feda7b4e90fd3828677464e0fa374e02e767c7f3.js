System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Color, Component, Label, Layers, Node, UITransform, bus, EV, _dec, _class, _crd, ccclass, DESIGN_W, DESIGN_H, UIManager;

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
      Color = _cc.Color;
      Component = _cc.Component;
      Label = _cc.Label;
      Layers = _cc.Layers;
      Node = _cc.Node;
      UITransform = _cc.UITransform;
    }, function (_unresolved_2) {
      bus = _unresolved_2.bus;
      EV = _unresolved_2.EV;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "14b7dexqmNOV4BMCza2/TbJ", "UIManager", undefined);

      __checkObsolete__(['_decorator', 'Color', 'Component', 'HorizontalTextAlignment', 'Label', 'Layers', 'Node', 'UITransform']);

      ({
        ccclass
      } = _decorator);
      /** 竖版设计分辨率（UI 全部按这套坐标摆放） */

      _export("DESIGN_W", DESIGN_W = 720);

      _export("DESIGN_H", DESIGN_H = 1280);

      /**
       * 全部 UI：开始页 / HUD / 结算页。
       * 只用系统字体 Label + 代码定位，不依赖任何美术资源，方便直接跑起来。
       * 所有位置以「比例」记录，窗口尺寸变化时 relayout() 重排，不会挤成一团。
       */
      _export("UIManager", UIManager = (_dec = ccclass('UIManager'), _dec(_class = class UIManager extends Component {
        constructor(...args) {
          super(...args);
          this.hud = [];
          this.screen = [];
          this.hpL = null;
          this.statL = null;
          this.progL = null;
          this.skillL = null;
          this.buffL = null;
          this.gateL = null;
          this.flashL = null;
          this.bossL = null;
          this.titleL = null;
          this.subL = null;
          this.infoL = null;
          this.pressL = null;
          this.canvas = null;
          this.specs = [];
          this.flashTime = 0;
          this.bossFlash = 0;
        }

        build(canvas) {
          if (!canvas || !canvas.isValid) return;
          this.canvas = canvas; // ---------------- HUD

          this.hpL = this.mk('HP', -0.472, 0.469, 0.597, 44, 30, new Color(240, 250, 250), Label.HorizontalAlign.LEFT, 0, true);
          this.statL = this.mk('Stat', 0.472, 0.469, 0.597, 44, 26, new Color(200, 216, 230), Label.HorizontalAlign.RIGHT, 1, true);
          this.progL = this.mk('Prog', 0, 0.423, 0.917, 40, 26, new Color(180, 214, 196), Label.HorizontalAlign.CENTER, 0.5, true);
          this.bossL = this.mk('Boss', 0, 0.344, 0.917, 40, 30, new Color(232, 92, 82), Label.HorizontalAlign.CENTER, 0.5, true);
          this.flashL = this.mk('Flash', 0, 0.258, 0.917, 44, 34, new Color(255, 202, 42), Label.HorizontalAlign.CENTER, 0.5, true);
          this.gateL = this.mk('Gate', 0, -0.086, 0.972, 76, 26, new Color(198, 228, 255), Label.HorizontalAlign.CENTER, 0.5, true);
          this.skillL = this.mk('Skill', 0, -0.391, 0.972, 64, 32, new Color(226, 244, 255), Label.HorizontalAlign.CENTER, 0.5, true);
          this.buffL = this.mk('Buff', -0.472, -0.461, 0.903, 40, 24, new Color(150, 238, 186), Label.HorizontalAlign.LEFT, 0, true); // ---------------- 开始 / 结算页

          this.titleL = this.mk('Title', 0, 0.195, 0.972, 80, 56, new Color(120, 236, 190), Label.HorizontalAlign.CENTER, 0.5, false);
          this.subL = this.mk('Sub', 0, 0.109, 0.917, 80, 26, new Color(206, 222, 232), Label.HorizontalAlign.CENTER, 0.5, false);
          this.infoL = this.mk('Info', 0, -0.016, 0.917, 240, 26, new Color(226, 236, 244), Label.HorizontalAlign.CENTER, 0.5, false);
          this.pressL = this.mk('Press', 0, -0.180, 0.917, 60, 32, new Color(255, 210, 72), Label.HorizontalAlign.CENTER, 0.5, false);
          this.layout();
          (_crd && bus === void 0 ? (_reportPossibleCrUseOfbus({
            error: Error()
          }), bus) : bus).on((_crd && EV === void 0 ? (_reportPossibleCrUseOfEV({
            error: Error()
          }), EV) : EV).HP, this.onHp, this);
          (_crd && bus === void 0 ? (_reportPossibleCrUseOfbus({
            error: Error()
          }), bus) : bus).on((_crd && EV === void 0 ? (_reportPossibleCrUseOfEV({
            error: Error()
          }), EV) : EV).SKILL, this.onSkill, this);
          (_crd && bus === void 0 ? (_reportPossibleCrUseOfbus({
            error: Error()
          }), bus) : bus).on((_crd && EV === void 0 ? (_reportPossibleCrUseOfEV({
            error: Error()
          }), EV) : EV).PROGRESS, this.onProgress, this);
          (_crd && bus === void 0 ? (_reportPossibleCrUseOfbus({
            error: Error()
          }), bus) : bus).on((_crd && EV === void 0 ? (_reportPossibleCrUseOfEV({
            error: Error()
          }), EV) : EV).BUFF, this.onBuff, this);
          (_crd && bus === void 0 ? (_reportPossibleCrUseOfbus({
            error: Error()
          }), bus) : bus).on((_crd && EV === void 0 ? (_reportPossibleCrUseOfEV({
            error: Error()
          }), EV) : EV).GATE_PROMPT, this.onGate, this);
          (_crd && bus === void 0 ? (_reportPossibleCrUseOfbus({
            error: Error()
          }), bus) : bus).on((_crd && EV === void 0 ? (_reportPossibleCrUseOfEV({
            error: Error()
          }), EV) : EV).HEADSHOT, this.onHeadshot, this);
          (_crd && bus === void 0 ? (_reportPossibleCrUseOfbus({
            error: Error()
          }), bus) : bus).on((_crd && EV === void 0 ? (_reportPossibleCrUseOfEV({
            error: Error()
          }), EV) : EV).GATE_DONE, this.onGateDone, this);
          (_crd && bus === void 0 ? (_reportPossibleCrUseOfbus({
            error: Error()
          }), bus) : bus).on((_crd && EV === void 0 ? (_reportPossibleCrUseOfEV({
            error: Error()
          }), EV) : EV).BOSS_INCOMING, this.onBoss, this);
        }
        /** 画布尺寸变化后重排（窗口 resize / 旋转屏幕） */


        relayout() {
          this.layout();
        }

        layout() {
          if (!this.canvas || !this.canvas.isValid) return;
          const tf = this.canvas.getComponent(UITransform);
          const H = tf && tf.height > 0 ? tf.height : DESIGN_H;
          let W = tf && tf.width > 0 ? tf.width : DESIGN_W; // 竖版游戏放进宽屏窗口时，UI 只占中间一条竖版区域，别贴到浏览器两边

          W = Math.min(W, H * DESIGN_W / DESIGN_H);

          for (const s of this.specs) {
            if (!s.node || !s.node.isValid) continue;
            s.node.setPosition(s.rx * W, s.ry * H, 0);
            const ui = s.node.getComponent(UITransform);
            if (ui) ui.setContentSize(s.rw * W, s.h);
          }
        }

        onDestroy() {
          (_crd && bus === void 0 ? (_reportPossibleCrUseOfbus({
            error: Error()
          }), bus) : bus).off((_crd && EV === void 0 ? (_reportPossibleCrUseOfEV({
            error: Error()
          }), EV) : EV).HP, this.onHp, this);
          (_crd && bus === void 0 ? (_reportPossibleCrUseOfbus({
            error: Error()
          }), bus) : bus).off((_crd && EV === void 0 ? (_reportPossibleCrUseOfEV({
            error: Error()
          }), EV) : EV).SKILL, this.onSkill, this);
          (_crd && bus === void 0 ? (_reportPossibleCrUseOfbus({
            error: Error()
          }), bus) : bus).off((_crd && EV === void 0 ? (_reportPossibleCrUseOfEV({
            error: Error()
          }), EV) : EV).PROGRESS, this.onProgress, this);
          (_crd && bus === void 0 ? (_reportPossibleCrUseOfbus({
            error: Error()
          }), bus) : bus).off((_crd && EV === void 0 ? (_reportPossibleCrUseOfEV({
            error: Error()
          }), EV) : EV).BUFF, this.onBuff, this);
          (_crd && bus === void 0 ? (_reportPossibleCrUseOfbus({
            error: Error()
          }), bus) : bus).off((_crd && EV === void 0 ? (_reportPossibleCrUseOfEV({
            error: Error()
          }), EV) : EV).GATE_PROMPT, this.onGate, this);
          (_crd && bus === void 0 ? (_reportPossibleCrUseOfbus({
            error: Error()
          }), bus) : bus).off((_crd && EV === void 0 ? (_reportPossibleCrUseOfEV({
            error: Error()
          }), EV) : EV).HEADSHOT, this.onHeadshot, this);
          (_crd && bus === void 0 ? (_reportPossibleCrUseOfbus({
            error: Error()
          }), bus) : bus).off((_crd && EV === void 0 ? (_reportPossibleCrUseOfEV({
            error: Error()
          }), EV) : EV).GATE_DONE, this.onGateDone, this);
          (_crd && bus === void 0 ? (_reportPossibleCrUseOfbus({
            error: Error()
          }), bus) : bus).off((_crd && EV === void 0 ? (_reportPossibleCrUseOfEV({
            error: Error()
          }), EV) : EV).BOSS_INCOMING, this.onBoss, this);
        } // ------------------------------------------------------------ 页面切换


        showReady() {
          this.setHud(false);
          this.setScreen(true);
          this.titleL.string = 'LAST Z · 换道闪避射击';
          this.subL.string = '竖版 3D 轨道玩法 / 生存优先，击杀其次\n左滑右滑换道闪避，自动开火，躲不掉就掉血';
          this.infoL.string = '核心规则\n· 自动射击，同轨命中触发爆头 2.5 倍\n· 不可破坏的尖刺滚轮只能躲，碰到扣 25 血\n· 油桶打爆拿 buff，数字门打爆得大额奖励\n· 技能独立充能，高威胁波次留给技能';
          this.pressL.string = '点击屏幕开始';
        }

        showPlaying() {
          this.setScreen(false);
          this.setHud(true);
          this.flashL.string = '';
          this.gateL.string = '';
          this.bossL.string = '';
        }

        showResult(win, data) {
          this.setHud(false);
          this.setScreen(true);
          this.titleL.string = win ? '通关成功' : '英雄阵亡';
          this.subL.string = win ? '终点 XP 箱子已回收' : '血量归零，本次闯关失败（不损失部队与资源）';
          this.infoL.string = [`推进进度　${Math.round(data.progress * 100)}%`, `击杀丧尸　${data.kills}　（爆头 ${data.headshots}）`, `数字门击破　${data.gateBroken ? '是' : '否'}　　章节 BOSS　${data.bossKilled ? '已击破' : '未击破'}`, `获得英雄经验　${data.xp}`, '体力 -6　　部队 / 资源损失 0'].join('\n');
          this.pressL.string = '点击屏幕重新挑战';
        }

        setHud(on) {
          for (const n of this.hud) n.active = on;
        }

        setScreen(on) {
          for (const n of this.screen) n.active = on;
        } // ------------------------------------------------------------ 事件响应


        onHp(ratio) {
          this.hpL.string = `HP ${this.bar(ratio, 12)} ${Math.ceil(ratio * 100)}%`;
        }

        onSkill(ratio) {
          this.skillL.string = ratio >= 1 ? '【 技能就绪 · 空格 / 点击屏幕下方释放 】' : `技能充能 ${this.bar(ratio, 10)}`;
        }

        onProgress(p) {
          this.progL.string = `推进 ${this.bar(p, 20)} ${Math.round(p * 100)}%`;
        }

        onBuff(text) {
          this.buffL.string = text ? `局内增益：${text}` : '';
        }

        onGate(text) {
          this.gateL.string = text;
        }

        onGateDone(text) {
          this.gateL.string = text;
        }

        onHeadshot(isHead) {
          if (!isHead) return;
          this.flashTime = 0.28;
          this.flashL.string = '爆头 ×2.5';
        }

        onBoss(incoming) {
          this.bossFlash = incoming ? 3 : 0;
          this.bossL.string = incoming ? 'BOSS 已挡住去路：清理小怪并寻找输出窗口' : '';
        }

        update(dt) {
          if (this.flashTime > 0) {
            this.flashTime -= dt;
            if (this.flashTime <= 0) this.flashL.string = '';
          }

          if (this.bossFlash > 0) {
            this.bossFlash -= dt;
            if (this.bossFlash <= 0) this.bossL.string = '';
          }
        }
        /** 击杀数等实时数据 */


        setStat(kills, headshots) {
          this.statL.string = `击杀 ${kills}　爆头 ${headshots}`;
        } // ------------------------------------------------------------ 工具


        bar(ratio, cells) {
          const n = Math.max(0, Math.min(cells, Math.round(ratio * cells)));
          return '█'.repeat(n) + '░'.repeat(cells - n);
        }

        mk(name, rx, ry, rw, h, fontSize, color, align, anchorX, isHud) {
          const node = new Node(name);
          node.layer = Layers.Enum.UI_2D;
          this.canvas.addChild(node);
          const ui = node.addComponent(UITransform);
          ui.setContentSize(DESIGN_W * rw, h);
          ui.setAnchorPoint(anchorX, 0.5);
          const label = node.addComponent(Label);
          label.string = '';
          label.fontSize = fontSize;
          label.lineHeight = Math.round(fontSize * 1.35);
          label.color = color;
          label.horizontalAlign = align;
          label.verticalAlign = Label.VerticalAlign.CENTER;
          label.overflow = Label.Overflow.CLAMP;
          label.enableWrapText = false;
          label.useSystemFont = true;
          label.fontFamily = 'Microsoft YaHei';
          this.specs.push({
            node,
            rx,
            ry,
            rw,
            h
          });
          (isHud ? this.hud : this.screen).push(node);
          return label;
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=feda7b4e90fd3828677464e0fa374e02e767c7f3.js.map