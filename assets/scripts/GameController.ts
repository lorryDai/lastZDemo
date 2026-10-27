import {
    _decorator, Camera, Canvas, Component, Director, EventKeyboard, EventMouse, EventTouch,
    Input, KeyCode, Layers, Node, UITransform, Vec3, director, geometry, input, screen,
} from 'cc';
import * as cc from 'cc';
import { EDITOR } from 'cc/env';
import { CFG, COLORS, GameState, makeBox, makePlane } from './GameConfig';
import { world } from './World';
import { bus, EV } from './EventBus';
import { BuffSystem } from './BuffSystem';
import { PlayerController } from './PlayerController';
import { SpawnDirector } from './SpawnDirector';
import { UIManager, DESIGN_H, DESIGN_W } from './UIManager';
import { NameTagSystem } from './NameTagSystem';

const { ccclass } = _decorator;

/**
 * 入口组件：挂到一个空场景的节点上即可自动搭好整个玩法场景。
 * 自举内容：相机 / 跑道 / 玩法系统 / UI / 输入 / 状态机闭环（开始 → 战斗 → 结算 → 重开）。
 */
@ccclass('GameController')
export class GameController extends Component {
    static instance: GameController | null = null;

    state: GameState = GameState.Ready;
    player: PlayerController = null!;
    spawner: SpawnDirector = null!;
    buffs: BuffSystem = null!;
    ui: UIManager = null!;

    private worldRoot: Node = null!;
    private canvasNode: Node = null!;
    private canvasComp: Canvas = null!;
    private cam3d: Camera = null!;
    private kills = 0;
    private headshots = 0;
    private bossKilled = false;
    private gateBroken = false;
    private lastInputAt = 0;
    private pointerRay = new geometry.Ray();
    /** 鼠标/手指所在的世界 X（角色跟随它） */
    private pointerWorldX = 0;

    onLoad(): void {
        if (this.node.getComponent(Canvas)) {
            console.error('[lastZ] GameController 不能挂在 Canvas 节点上：请新建一个空节点再挂载本组件。');
            return;
        }
        GameController.instance = this;
        this.applyDesignResolution();
        this.worldRoot = new Node('WorldRoot');
        this.worldRoot.parent = this.node;
        this.buildCamera();
        this.buildTrack();
        this.buildSystems();
        this.buildCanvas();
        this.wireWorld();
        this.bindInput();
    }

    start(): void {
        // Canvas 完成屏幕适配后再排版 UI，位置按画布实际尺寸换算
        this.ui.build(this.canvasNode);
        this.toReady();
    }

    update(dt: number): void {
        if (this.state !== GameState.Playing) return;
        this.spawner.tick(dt);
        this.ui.setStat(this.kills, this.headshots);
    }

    // ------------------------------------------------------------ 场景自举
    /** 竖版设计分辨率，避免依赖项目设置 */
    private applyDesignResolution(): void {
        const v: any = (cc as any).view;
        const policy: any = (cc as any).ResolutionPolicy;
        if (v && typeof v.setDesignResolutionSize === 'function' && policy) {
            v.setDesignResolutionSize(720, 1280, policy.SHOW_ALL);
        }
    }

    private buildCamera(): void {
        const camNode = new Node('MainCamera');
        camNode.parent = this.node;
        camNode.setPosition(0, 13, 24);
        camNode.lookAt(new Vec3(0, 0.5, -12));
        const cam = camNode.addComponent(Camera);
        cam.projection = Camera.ProjectionType.PERSPECTIVE;
        cam.fov = 46;
        cam.near = 0.1;
        cam.far = 500;
        cam.clearFlags = Camera.ClearFlag.SOLID_COLOR;
        cam.clearColor = COLORS.sky;
        cam.visibility = Layers.Enum.DEFAULT;
        cam.priority = 1; // 高于场景自带相机，保证由我们这层来清屏
        this.cam3d = cam;
    }

    /** 跑道：地面 + 车道线 + 两侧硬边界（长度只做到可视范围，不铺半个世界） */
    private buildTrack(): void {
        const len = 180;
        const midZ = -60;
        const road = makePlane('Road', CFG.laneCount * CFG.laneWidth + 1.4, len, COLORS.ground, this.worldRoot);
        road.setPosition(0, -0.05, midZ);
        for (let k = 0; k <= CFG.laneCount; k++) {
            const x = (k - CFG.laneCount / 2) * CFG.laneWidth;
            const line = makeBox('LaneLine', 0.12, 0.02, len, COLORS.laneLine, this.worldRoot);
            line.setPosition(x, 0.01, midZ);
        }
        for (const d of [-1, 1]) {
            const wall = makeBox('Wall', 0.5, 1.8, len, COLORS.wall, this.worldRoot);
            wall.setPosition(d * (CFG.laneCount * CFG.laneWidth / 2 + 0.5), 0.9, midZ);
        }
    }

    private buildSystems(): void {
        this.buffs = this.node.addComponent(BuffSystem);

        const playerNode = new Node('Player');
        playerNode.parent = this.worldRoot;
        this.player = playerNode.addComponent(PlayerController);

        const spawnNode = new Node('SpawnDirector');
        spawnNode.parent = this.node;
        this.spawner = spawnNode.addComponent(SpawnDirector);
        this.spawner.parent = this.worldRoot;

        this.spawner.init(this.buffs);
        this.player.init(this.buffs);
    }

    private buildCanvas(): void {
        this.canvasNode = new Node('Canvas');
        this.canvasNode.layer = Layers.Enum.UI_2D;
        this.canvasNode.parent = this.node;
        const canvasUI = this.ensureUITransform(this.canvasNode);
        // 锚点居中：UI 子节点才能用「相对屏幕中心的比例」定位
        canvasUI.setAnchorPoint(0.5, 0.5);
        // 运行时引擎不会替我们改 Canvas 的 UITransform（默认只有 100x100），
        // 必须先铺满可视区域并把节点放到可视区中心，否则所有 UI 会挤在屏幕正中
        this.layoutCanvas();

        const uiCamNode = new Node('UICamera');
        uiCamNode.layer = Layers.Enum.UI_2D;
        uiCamNode.parent = this.canvasNode;
        uiCamNode.setPosition(0, 0, 1000);
        const uiCam = uiCamNode.addComponent(Camera);
        uiCam.projection = Camera.ProjectionType.ORTHO;
        uiCam.visibility = Layers.Enum.UI_2D;
        uiCam.clearFlags = Camera.ClearFlag.DEPTH_ONLY;
        uiCam.near = 1;
        uiCam.far = 2000;
        uiCam.priority = 2; // 最后绘制，只清深度，盖在 3D 之上

        // 先给 Canvas 摄像头，再开自动适配：Canvas 的 resize 依赖 cameraComponent
        const canvas = this.canvasNode.addComponent(Canvas);
        this.canvasComp = canvas;
        canvas.cameraComponent = uiCam;
        canvas.alignCanvasWithScreen = true;

        const uiNode = new Node('UI');
        uiNode.layer = Layers.Enum.UI_2D;
        uiNode.parent = this.canvasNode;
        this.ui = uiNode.addComponent(UIManager);

        // 名牌层：独立的 UI 层，由 UI 相机最后绘制，永远盖在 3D 模型之上
        this.canvasNode.addComponent(NameTagSystem).init(this.canvasNode, this.cam3d);

        const v: any = (cc as any).view;
        if (v && typeof v.on === 'function') v.on('canvas-resize', this.onViewResize, this);
    }

    /** 把 Canvas 铺满可视区域并居中（3D→UI 投影也依赖这个约定） */
    private layoutCanvas(): void {
        let w = DESIGN_W;
        let h = DESIGN_H;
        const v: any = (cc as any).view;
        if (v && typeof v.getVisibleSize === 'function') {
            const vs = v.getVisibleSize();
            if (vs.width > 0 && vs.height > 0) {
                w = vs.width;
                h = vs.height;
            }
        }
        this.ensureUITransform(this.canvasNode).setContentSize(w, h);
        this.canvasNode.setPosition(w / 2, h / 2, 0);
    }

    private onViewResize(): void {
        if (!this.canvasNode || !this.canvasNode.isValid) return;
        this.layoutCanvas();
        // setter 内部会重新把 UI 相机摆到画布中心
        if (this.canvasComp) this.canvasComp.alignCanvasWithScreen = true;
        if (this.ui) this.ui.relayout();
    }

    private ensureUITransform(node: Node): UITransform {
        return node.getComponent(UITransform) || node.addComponent(UITransform);
    }

    private wireWorld(): void {
        world.hitPlayer = (dmg) => {
            if (this.state === GameState.Playing) this.player.takeDamage(dmg);
        };
        world.chargeSkill = (v) => this.player.addSkill(v);
        world.onKill = (headshot) => {
            this.kills++;
            if (headshot) this.headshots++;
            this.player.addSkill(CFG.skillGainKill);
            bus.emit(EV.KILL, this.kills);
        };
        world.onBossKilled = () => {
            this.bossKilled = true;
            this.player.addSkill(CFG.skillMax * 0.6);
        };
        world.onGoal = () => this.endRun(true);

        bus.on(EV.RUN_END, this.onRunEnd, this);
        bus.on(EV.GATE_DONE, this.onGateDone, this);
    }

    onDestroy(): void {
        bus.off(EV.RUN_END, this.onRunEnd, this);
        bus.off(EV.GATE_DONE, this.onGateDone, this);
        const v: any = (cc as any).view;
        if (v && typeof v.off === 'function') v.off('canvas-resize', this.onViewResize, this);
        GameController.instance = null;
    }

    private onRunEnd(data: { win: boolean }): void {
        this.endRun(data && data.win === true);
    }

    private onGateDone(text: string): void {
        if (text && text.indexOf('数字门') >= 0) this.gateBroken = true;
    }

    // ------------------------------------------------------------ 输入
    private bindInput(): void {
        input.on(Input.EventType.TOUCH_START, this.onTouch, this);
        input.on(Input.EventType.TOUCH_MOVE, this.onPointerMove, this);
        input.on(Input.EventType.MOUSE_DOWN, this.onMouse, this);
        input.on(Input.EventType.MOUSE_MOVE, this.onPointerMove, this);
        input.on(Input.EventType.KEY_DOWN, this.onKey, this);
    }

    private onTouch(e: EventTouch): void {
        const p = e.getLocation();
        this.handleTap(p.x, p.y);
    }

    private onMouse(e: EventMouse): void {
        const p = e.getLocation();
        this.handleTap(p.x, p.y);
    }

    /** 鼠标/手指移动：角色横向位置连续跟随指针，不再「滑一下就换一条道」 */
    private onPointerMove(e: EventTouch | EventMouse): void {
        if (this.state !== GameState.Playing) return;
        const p = e.getLocation();
        this.pointerWorldX = this.screenToWorldX(p.x, p.y);
        this.player.setTargetX(this.pointerWorldX);
    }

    /** 屏幕坐标 → 角色所在高度平面上的世界 X */
    private screenToWorldX(sx: number, sy: number): number {
        this.cam3d.screenPointToRay(sx, sy, this.pointerRay);
        const o = this.pointerRay.o;
        const d = this.pointerRay.d;
        if (Math.abs(d.y) < 1e-5) return o.x;
        const t = (1.1 - o.y) / d.y;
        return o.x + d.x * t;
    }

    /** 点击 / 按下：开始、结算重开、底部区域放技能；其余位置顺带把角色拉过去 */
    private handleTap(x: number, y: number): void {
        const now = performance.now();
        if (now - this.lastInputAt < 60) return; // 触摸与鼠标事件去重
        this.lastInputAt = now;

        if (this.state === GameState.Ready || this.state === GameState.Result) {
            this.startRun();
            return;
        }
        const win = screen.windowSize;
        if (y / win.height < 0.22) {
            this.player.castSkill();
            return;
        }
        this.pointerWorldX = this.screenToWorldX(x, y);
        this.player.setTargetX(this.pointerWorldX);
    }

    private onKey(e: EventKeyboard): void {
        if (this.state !== GameState.Playing) {
            if (e.keyCode === KeyCode.ENTER || e.keyCode === KeyCode.SPACE) this.startRun();
            return;
        }
        switch (e.keyCode) {
            case KeyCode.KEY_A:
            case KeyCode.ARROW_LEFT:
                this.player.nudgeLane(-1);
                break;
            case KeyCode.KEY_D:
            case KeyCode.ARROW_RIGHT:
                this.player.nudgeLane(1);
                break;
            case KeyCode.SPACE:
                this.player.castSkill();
                break;
            default:
                break;
        }
    }

    // ------------------------------------------------------------ 状态机
    toReady(): void {
        this.state = GameState.Ready;
        this.player.alive = false;   // 未开局时不要空放子弹
        world.travelSpeed = 0;
        this.spawner.clearWorld();
        this.ui.showReady();
        bus.emit(EV.HP, 1);
        bus.emit(EV.SKILL, 0);
        bus.emit(EV.PROGRESS, 0);
        bus.emit(EV.BUFF, '');
        bus.emit(EV.GATE_PROMPT, '');
    }

    startRun(): void {
        this.kills = 0;
        this.headshots = 0;
        this.bossKilled = false;
        this.gateBroken = false;
        this.buffs.clear();
        this.player.reset();
        this.spawner.startRun();
        this.state = GameState.Playing;
        this.ui.showPlaying();
        this.ui.setStat(0, 0);
        bus.emit(EV.HP, 1);
        bus.emit(EV.SKILL, 0);
        bus.emit(EV.PROGRESS, 0);
        bus.emit(EV.RUN_START, 0);
    }

    endRun(win: boolean): void {
        if (this.state !== GameState.Playing) return;
        this.state = GameState.Result;
        const progress = this.spawner.progress();
        const xp = this.kills * 10 + this.headshots * 4
            + Math.round(progress * 220)
            + (win ? 300 : 0)
            + (this.bossKilled ? 400 : 0)
            + (this.gateBroken ? 150 : 0);
        this.player.alive = false;   // 结算页停止开火
        world.travelSpeed = 0;
        this.spawner.clearWorld();
        this.ui.showResult(win, {
            progress,
            kills: this.kills,
            headshots: this.headshots,
            xp,
            bossKilled: this.bossKilled,
            gateBroken: this.gateBroken,
        });
        bus.emit(EV.RUN_END, { win, xp });
    }
}

/**
 * 兜底自举：只要脚本被加载，即使忘了手动挂组件，预览时也会自动创建入口节点。
 * 不依赖编辑器「添加组件」菜单，用空场景直接点预览就能跑。
 */
if (!EDITOR) {
    director.on(Director.EVENT_AFTER_SCENE_LAUNCH, () => {
        const scene = director.getScene();
        if (!scene || scene.getComponentInChildren(GameController)) return;
        const root = new Node('LastZGame');
        scene.addChild(root);
        root.addComponent(GameController);
    });
}
