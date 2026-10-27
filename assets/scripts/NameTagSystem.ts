import { _decorator, Camera, Color, Component, Label, Layers, Node, UITransform, Vec3 } from 'cc';
import { COLORS } from './GameConfig';
import { ITagged, ITag, world } from './World';

const { ccclass } = _decorator;

interface TagView {
    node: Node;
    text: Label;
    shadow: Label;
    value: string;
}

/**
 * 实体名牌系统：把「怪物 / 道具」的头顶文字投影到独立 UI 层。
 * 分层的意义：名字挂在 UI_2D 层，由 UI 相机最后绘制，
 * 因此永远不会被 3D 模型遮挡，也不会和模型产生 z-fighting。
 */
@ccclass('NameTagSystem')
export class NameTagSystem extends Component {
    private cam3d: Camera = null!;
    private canvasNode: Node = null!;
    private layer: Node = null!;
    private views = new Map<Node, TagView>();
    private free: TagView[] = [];

    private tmpWorld = new Vec3();
    private tmpUILocal = new Vec3();

    /** canvas 必须是带 Canvas + UITransform 的那层 UI 根节点 */
    init(canvas: Node, cam3d: Camera): void {
        this.cam3d = cam3d;
        this.canvasNode = canvas;
        this.layer = new Node('NameLayer');
        this.layer.layer = Layers.Enum.UI_2D;
        // 先不挂到画布：HUD 在 start() 里才创建，等第一帧再挂，保证名牌画在最上层
    }

    update(): void {
        if (!this.layer || !this.cam3d || !this.canvasNode) return;
        if (this.layer.parent !== this.canvasNode) {
            this.canvasNode.addChild(this.layer);
            this.layer.setSiblingIndex(this.canvasNode.children.length - 1);
        }

        const live = new Set<Node>();
        this.collect(world.zombies, live);
        this.collect(world.objects, live);
        this.collect(world.hazards, live);
        this.collect(world.tagged, live);

        // 回收已离场 / 被销毁实体的名牌
        for (const [owner, view] of Array.from(this.views)) {
            if (!live.has(owner)) {
                this.views.delete(owner);
                view.node.active = false;
                this.free.push(view);
            }
        }
    }

    private collect(list: ITagged[], live: Set<Node>): void {
        for (const u of list) {
            if (!u.alive || !u.node) continue;
            const tag = u.tag;
            if (!tag) continue;
            live.add(u.node);
            const view = this.viewFor(u.node, tag);
            this.place(view, u.node, tag);
        }
    }

    private viewFor(owner: Node, tag: ITag): TagView {
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
    private place(view: TagView, owner: Node, tag: ITag): void {
        const p = owner.worldPosition;
        this.tmpWorld.set(p.x, p.y + tag.height, p.z);
        this.cam3d.convertToUINode(this.tmpWorld, this.canvasNode, this.tmpUILocal);
        view.node.setPosition(this.tmpUILocal.x, this.tmpUILocal.y, 0);
    }

    private makeView(): TagView {
        const node = new Node('NameTag');
        node.layer = Layers.Enum.UI_2D;
        this.layer.addChild(node);

        const shadow = this.makeLabel(node, 'Shadow', COLORS.tagShadow, 0);
        shadow.node.setPosition(1.5, -1.5, 0);
        const text = this.makeLabel(node, 'Text', COLORS.tagMob, 1);

        return { node, text, shadow, value: '' };
    }

    private makeLabel(parent: Node, name: string, color: Color, sibling: number): Label {
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
}
