System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Label, Layers, Node, UITransform, Vec3, COLORS, world, _dec, _class, _crd, ccclass, NameTagSystem;

  function _reportPossibleCrUseOfCOLORS(extras) {
    _reporterNs.report("COLORS", "./GameConfig", _context.meta, extras);
  }

  function _reportPossibleCrUseOfITagged(extras) {
    _reporterNs.report("ITagged", "./World", _context.meta, extras);
  }

  function _reportPossibleCrUseOfITag(extras) {
    _reporterNs.report("ITag", "./World", _context.meta, extras);
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
      Label = _cc.Label;
      Layers = _cc.Layers;
      Node = _cc.Node;
      UITransform = _cc.UITransform;
      Vec3 = _cc.Vec3;
    }, function (_unresolved_2) {
      COLORS = _unresolved_2.COLORS;
    }, function (_unresolved_3) {
      world = _unresolved_3.world;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "9f3c2pUG35MmrDSPm+KHF17", "NameTagSystem", undefined);

      __checkObsolete__(['_decorator', 'Camera', 'Color', 'Component', 'Label', 'Layers', 'Node', 'UITransform', 'Vec3']);

      ({
        ccclass
      } = _decorator);

      /**
       * 实体名牌系统：把「怪物 / 道具」的头顶文字投影到独立 UI 层。
       * 分层的意义：名字挂在 UI_2D 层，由 UI 相机最后绘制，
       * 因此永远不会被 3D 模型遮挡，也不会和模型产生 z-fighting。
       */
      _export("NameTagSystem", NameTagSystem = (_dec = ccclass('NameTagSystem'), _dec(_class = class NameTagSystem extends Component {
        constructor(...args) {
          super(...args);
          this.cam3d = null;
          this.canvasNode = null;
          this.layer = null;
          this.views = new Map();
          this.free = [];
          this.tmpWorld = new Vec3();
          this.tmpUILocal = new Vec3();
        }

        /** canvas 必须是带 Canvas + UITransform 的那层 UI 根节点 */
        init(canvas, cam3d) {
          this.cam3d = cam3d;
          this.canvasNode = canvas;
          this.layer = new Node('NameLayer');
          this.layer.layer = Layers.Enum.UI_2D; // 先不挂到画布：HUD 在 start() 里才创建，等第一帧再挂，保证名牌画在最上层
        }

        update() {
          if (!this.layer || !this.cam3d || !this.canvasNode) return;

          if (this.layer.parent !== this.canvasNode) {
            this.canvasNode.addChild(this.layer);
            this.layer.setSiblingIndex(this.canvasNode.children.length - 1);
          }

          const live = new Set();
          this.collect((_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
            error: Error()
          }), world) : world).zombies, live);
          this.collect((_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
            error: Error()
          }), world) : world).objects, live);
          this.collect((_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
            error: Error()
          }), world) : world).hazards, live);
          this.collect((_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
            error: Error()
          }), world) : world).tagged, live); // 回收已离场 / 被销毁实体的名牌

          for (const [owner, view] of Array.from(this.views)) {
            if (!live.has(owner)) {
              this.views.delete(owner);
              view.node.active = false;
              this.free.push(view);
            }
          }
        }

        collect(list, live) {
          for (const u of list) {
            if (!u.alive || !u.node) continue;
            const tag = u.tag;
            if (!tag) continue;
            live.add(u.node);
            const view = this.viewFor(u.node, tag);
            this.place(view, u.node, tag);
          }
        }

        viewFor(owner, tag) {
          let view = this.views.get(owner);

          if (!view) {
            view = this.free.pop() || this.makeView();
            view.node.active = true;
            this.views.set(owner, view);
          }

          if (view.value !== tag.name) {
            view.value = tag.name;
            view.text.string = tag.name;
            view.shadow.string = tag.name;
            view.text.color = tag.color;
          }

          return view;
        }
        /** 3D 世界坐标 → 指定 UI 节点本地坐标（引擎内部完成屏幕投影与相机换算） */


        place(view, owner, tag) {
          const p = owner.worldPosition;
          this.tmpWorld.set(p.x, p.y + tag.height, p.z);
          this.cam3d.convertToUINode(this.tmpWorld, this.canvasNode, this.tmpUILocal);
          view.node.setPosition(this.tmpUILocal.x, this.tmpUILocal.y, 0);
        }

        makeView() {
          const node = new Node('NameTag');
          node.layer = Layers.Enum.UI_2D;
          this.layer.addChild(node);
          const shadow = this.makeLabel(node, 'Shadow', (_crd && COLORS === void 0 ? (_reportPossibleCrUseOfCOLORS({
            error: Error()
          }), COLORS) : COLORS).tagShadow, 0);
          shadow.node.setPosition(1.5, -1.5, 0);
          const text = this.makeLabel(node, 'Text', (_crd && COLORS === void 0 ? (_reportPossibleCrUseOfCOLORS({
            error: Error()
          }), COLORS) : COLORS).tagMob, 1);
          return {
            node,
            text,
            shadow,
            value: ''
          };
        }

        makeLabel(parent, name, color, sibling) {
          const n = new Node(name);
          n.layer = Layers.Enum.UI_2D;
          parent.addChild(n);
          n.setSiblingIndex(Math.min(sibling, parent.children.length - 1));
          const ui = n.addComponent(UITransform);
          ui.setContentSize(300, 36);
          ui.setAnchorPoint(0.5, 0.5);
          const label = n.addComponent(Label);
          label.string = '';
          label.fontSize = 26;
          label.lineHeight = 30;
          label.color = color;
          label.horizontalAlign = Label.HorizontalAlign.CENTER;
          label.verticalAlign = Label.VerticalAlign.CENTER;
          label.overflow = Label.Overflow.NONE;
          label.enableWrapText = false;
          label.useSystemFont = true;
          label.fontFamily = 'Microsoft YaHei';
          return label;
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=96d558eaf72f292e70ae1ae2ca1e66526dfc2f90.js.map