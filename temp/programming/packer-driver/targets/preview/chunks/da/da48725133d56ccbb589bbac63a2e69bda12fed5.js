System.register(["__unresolved_0", "cc", "cc/env", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5", "__unresolved_6", "__unresolved_7", "__unresolved_8"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Camera, Canvas, Component, Director, Input, KeyCode, Layers, Node, UITransform, Vec3, director, geometry, input, screen, _cc, EDITOR, CFG, COLORS, GameState, makeBox, makePlane, world, bus, EV, BuffSystem, PlayerController, SpawnDirector, UIManager, DESIGN_H, DESIGN_W, NameTagSystem, _dec, _class, _class2, _crd, cc, ccclass, GameController;

  function _reportPossibleCrUseOfCFG(extras) {
    _reporterNs.report("CFG", "./GameConfig", _context.meta, extras);
  }

  function _reportPossibleCrUseOfCOLORS(extras) {
    _reporterNs.report("COLORS", "./GameConfig", _context.meta, extras);
  }

  function _reportPossibleCrUseOfGameState(extras) {
    _reporterNs.report("GameState", "./GameConfig", _context.meta, extras);
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

  function _reportPossibleCrUseOfPlayerController(extras) {
    _reporterNs.report("PlayerController", "./PlayerController", _context.meta, extras);
  }

  function _reportPossibleCrUseOfSpawnDirector(extras) {
    _reporterNs.report("SpawnDirector", "./SpawnDirector", _context.meta, extras);
  }

  function _reportPossibleCrUseOfUIManager(extras) {
    _reporterNs.report("UIManager", "./UIManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfDESIGN_H(extras) {
    _reporterNs.report("DESIGN_H", "./UIManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfDESIGN_W(extras) {
    _reporterNs.report("DESIGN_W", "./UIManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfNameTagSystem(extras) {
    _reporterNs.report("NameTagSystem", "./NameTagSystem", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc2) {
      _cclegacy = _cc2.cclegacy;
      __checkObsolete__ = _cc2.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc2.__checkObsoleteInNamespace__;
      _decorator = _cc2._decorator;
      Camera = _cc2.Camera;
      Canvas = _cc2.Canvas;
      Component = _cc2.Component;
      Director = _cc2.Director;
      Input = _cc2.Input;
      KeyCode = _cc2.KeyCode;
      Layers = _cc2.Layers;
      Node = _cc2.Node;
      UITransform = _cc2.UITransform;
      Vec3 = _cc2.Vec3;
      director = _cc2.director;
      geometry = _cc2.geometry;
      input = _cc2.input;
      screen = _cc2.screen;
      _cc = _cc2;
    }, function (_ccEnv) {
      EDITOR = _ccEnv.EDITOR;
    }, function (_unresolved_2) {
      CFG = _unresolved_2.CFG;
      COLORS = _unresolved_2.COLORS;
      GameState = _unresolved_2.GameState;
      makeBox = _unresolved_2.makeBox;
      makePlane = _unresolved_2.makePlane;
    }, function (_unresolved_3) {
      world = _unresolved_3.world;
    }, function (_unresolved_4) {
      bus = _unresolved_4.bus;
      EV = _unresolved_4.EV;
    }, function (_unresolved_5) {
      BuffSystem = _unresolved_5.BuffSystem;
    }, function (_unresolved_6) {
      PlayerController = _unresolved_6.PlayerController;
    }, function (_unresolved_7) {
      SpawnDirector = _unresolved_7.SpawnDirector;
    }, function (_unresolved_8) {
      UIManager = _unresolved_8.UIManager;
      DESIGN_H = _unresolved_8.DESIGN_H;
      DESIGN_W = _unresolved_8.DESIGN_W;
    }, function (_unresolved_9) {
      NameTagSystem = _unresolved_9.NameTagSystem;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "bc9587GglBKHZgm5Tgvh5aV", "GameController", undefined);

      __checkObsolete__(['_decorator', 'Camera', 'Canvas', 'Component', 'Director', 'EventKeyboard', 'EventMouse', 'EventTouch', 'Input', 'KeyCode', 'Layers', 'Node', 'UITransform', 'Vec3', 'director', 'geometry', 'input', 'screen']);

      cc = __checkObsoleteInNamespace__(_cc);
      ({
        ccclass
      } = _decorator);
      /**
       * 入口组件：挂到一个空场景的节点上即可自动搭好整个玩法场景。
       * 自举内容：相机 / 跑道 / 玩法系统 / UI / 输入 / 状态机闭环（开始 → 战斗 → 结算 → 重开）。
       */

      _export("GameController", GameController = (_dec = ccclass('GameController'), _dec(_class = (_class2 = class GameController extends Component {
        constructor() {
          super(...arguments);
          this.state = (_crd && GameState === void 0 ? (_reportPossibleCrUseOfGameState({
            error: Error()
          }), GameState) : GameState).Ready;
          this.player = null;
          this.spawner = null;
          this.buffs = null;
          this.ui = null;
          this.worldRoot = null;
          this.canvasNode = null;
          this.canvasComp = null;
          this.cam3d = null;
          this.kills = 0;
          this.headshots = 0;
          this.bossKilled = false;
          this.gateBroken = false;
          this.lastInputAt = 0;
          this.pointerRay = new geometry.Ray();

          /** 鼠标/手指所在的世界 X（角色跟随它） */
          this.pointerWorldX = 0;
        }

        onLoad() {
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

        start() {
          // Canvas 完成屏幕适配后再排版 UI，位置按画布实际尺寸换算
          this.ui.build(this.canvasNode);
          this.toReady();
        }

        update(dt) {
          if (this.state !== (_crd && GameState === void 0 ? (_reportPossibleCrUseOfGameState({
            error: Error()
          }), GameState) : GameState).Playing) return;
          this.spawner.tick(dt);
          this.ui.setStat(this.kills, this.headshots);
        } // ------------------------------------------------------------ 场景自举

        /** 竖版设计分辨率，避免依赖项目设置 */


        applyDesignResolution() {
          var v = cc.view;
          var policy = cc.ResolutionPolicy;

          if (v && typeof v.setDesignResolutionSize === 'function' && policy) {
            v.setDesignResolutionSize(720, 1280, policy.SHOW_ALL);
          }
        }

        buildCamera() {
          var camNode = new Node('MainCamera');
          camNode.parent = this.node;
          camNode.setPosition(0, 13, 24);
          camNode.lookAt(new Vec3(0, 0.5, -12));
          var cam = camNode.addComponent(Camera);
          cam.projection = Camera.ProjectionType.PERSPECTIVE;
          cam.fov = 46;
          cam.near = 0.1;
          cam.far = 500;
          cam.clearFlags = Camera.ClearFlag.SOLID_COLOR;
          cam.clearColor = (_crd && COLORS === void 0 ? (_reportPossibleCrUseOfCOLORS({
            error: Error()
          }), COLORS) : COLORS).sky;
          cam.visibility = Layers.Enum.DEFAULT;
          cam.priority = 1; // 高于场景自带相机，保证由我们这层来清屏

          this.cam3d = cam;
        }
        /** 跑道：地面 + 车道线 + 两侧硬边界（长度只做到可视范围，不铺半个世界） */


        buildTrack() {
          var len = 180;
          var midZ = -60;
          var road = (_crd && makePlane === void 0 ? (_reportPossibleCrUseOfmakePlane({
            error: Error()
          }), makePlane) : makePlane)('Road', (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).laneCount * (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).laneWidth + 1.4, len, (_crd && COLORS === void 0 ? (_reportPossibleCrUseOfCOLORS({
            error: Error()
          }), COLORS) : COLORS).ground, this.worldRoot);
          road.setPosition(0, -0.05, midZ);

          for (var k = 0; k <= (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
            error: Error()
          }), CFG) : CFG).laneCount; k++) {
            var x = (k - (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
              error: Error()
            }), CFG) : CFG).laneCount / 2) * (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
              error: Error()
            }), CFG) : CFG).laneWidth;
            var line = (_crd && makeBox === void 0 ? (_reportPossibleCrUseOfmakeBox({
              error: Error()
            }), makeBox) : makeBox)('LaneLine', 0.12, 0.02, len, (_crd && COLORS === void 0 ? (_reportPossibleCrUseOfCOLORS({
              error: Error()
            }), COLORS) : COLORS).laneLine, this.worldRoot);
            line.setPosition(x, 0.01, midZ);
          }

          for (var d of [-1, 1]) {
            var wall = (_crd && makeBox === void 0 ? (_reportPossibleCrUseOfmakeBox({
              error: Error()
            }), makeBox) : makeBox)('Wall', 0.5, 1.8, len, (_crd && COLORS === void 0 ? (_reportPossibleCrUseOfCOLORS({
              error: Error()
            }), COLORS) : COLORS).wall, this.worldRoot);
            wall.setPosition(d * ((_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
              error: Error()
            }), CFG) : CFG).laneCount * (_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
              error: Error()
            }), CFG) : CFG).laneWidth / 2 + 0.5), 0.9, midZ);
          }
        }

        buildSystems() {
          this.buffs = this.node.addComponent(_crd && BuffSystem === void 0 ? (_reportPossibleCrUseOfBuffSystem({
            error: Error()
          }), BuffSystem) : BuffSystem);
          var playerNode = new Node('Player');
          playerNode.parent = this.worldRoot;
          this.player = playerNode.addComponent(_crd && PlayerController === void 0 ? (_reportPossibleCrUseOfPlayerController({
            error: Error()
          }), PlayerController) : PlayerController);
          var spawnNode = new Node('SpawnDirector');
          spawnNode.parent = this.node;
          this.spawner = spawnNode.addComponent(_crd && SpawnDirector === void 0 ? (_reportPossibleCrUseOfSpawnDirector({
            error: Error()
          }), SpawnDirector) : SpawnDirector);
          this.spawner.parent = this.worldRoot;
          this.spawner.init(this.buffs);
          this.player.init(this.buffs);
        }

        buildCanvas() {
          this.canvasNode = new Node('Canvas');
          this.canvasNode.layer = Layers.Enum.UI_2D;
          this.canvasNode.parent = this.node;
          var canvasUI = this.ensureUITransform(this.canvasNode); // 锚点居中：UI 子节点才能用「相对屏幕中心的比例」定位

          canvasUI.setAnchorPoint(0.5, 0.5); // 运行时引擎不会替我们改 Canvas 的 UITransform（默认只有 100x100），
          // 必须先铺满可视区域并把节点放到可视区中心，否则所有 UI 会挤在屏幕正中

          this.layoutCanvas();
          var uiCamNode = new Node('UICamera');
          uiCamNode.layer = Layers.Enum.UI_2D;
          uiCamNode.parent = this.canvasNode;
          uiCamNode.setPosition(0, 0, 1000);
          var uiCam = uiCamNode.addComponent(Camera);
          uiCam.projection = Camera.ProjectionType.ORTHO;
          uiCam.visibility = Layers.Enum.UI_2D;
          uiCam.clearFlags = Camera.ClearFlag.DEPTH_ONLY;
          uiCam.near = 1;
          uiCam.far = 2000;
          uiCam.priority = 2; // 最后绘制，只清深度，盖在 3D 之上
          // 先给 Canvas 摄像头，再开自动适配：Canvas 的 resize 依赖 cameraComponent

          var canvas = this.canvasNode.addComponent(Canvas);
          this.canvasComp = canvas;
          canvas.cameraComponent = uiCam;
          canvas.alignCanvasWithScreen = true;
          var uiNode = new Node('UI');
          uiNode.layer = Layers.Enum.UI_2D;
          uiNode.parent = this.canvasNode;
          this.ui = uiNode.addComponent(_crd && UIManager === void 0 ? (_reportPossibleCrUseOfUIManager({
            error: Error()
          }), UIManager) : UIManager); // 名牌层：独立的 UI 层，由 UI 相机最后绘制，永远盖在 3D 模型之上

          this.canvasNode.addComponent(_crd && NameTagSystem === void 0 ? (_reportPossibleCrUseOfNameTagSystem({
            error: Error()
          }), NameTagSystem) : NameTagSystem).init(this.canvasNode, this.cam3d);
          var v = cc.view;
          if (v && typeof v.on === 'function') v.on('canvas-resize', this.onViewResize, this);
        }
        /** 把 Canvas 铺满可视区域并居中（3D→UI 投影也依赖这个约定） */


        layoutCanvas() {
          var w = _crd && DESIGN_W === void 0 ? (_reportPossibleCrUseOfDESIGN_W({
            error: Error()
          }), DESIGN_W) : DESIGN_W;
          var h = _crd && DESIGN_H === void 0 ? (_reportPossibleCrUseOfDESIGN_H({
            error: Error()
          }), DESIGN_H) : DESIGN_H;
          var v = cc.view;

          if (v && typeof v.getVisibleSize === 'function') {
            var vs = v.getVisibleSize();

            if (vs.width > 0 && vs.height > 0) {
              w = vs.width;
              h = vs.height;
            }
          }

          this.ensureUITransform(this.canvasNode).setContentSize(w, h);
          this.canvasNode.setPosition(w / 2, h / 2, 0);
        }

        onViewResize() {
          if (!this.canvasNode || !this.canvasNode.isValid) return;
          this.layoutCanvas(); // setter 内部会重新把 UI 相机摆到画布中心

          if (this.canvasComp) this.canvasComp.alignCanvasWithScreen = true;
          if (this.ui) this.ui.relayout();
        }

        ensureUITransform(node) {
          return node.getComponent(UITransform) || node.addComponent(UITransform);
        }

        wireWorld() {
          (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
            error: Error()
          }), world) : world).hitPlayer = dmg => {
            if (this.state === (_crd && GameState === void 0 ? (_reportPossibleCrUseOfGameState({
              error: Error()
            }), GameState) : GameState).Playing) this.player.takeDamage(dmg);
          };

          (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
            error: Error()
          }), world) : world).chargeSkill = v => this.player.addSkill(v);

          (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
            error: Error()
          }), world) : world).onKill = headshot => {
            this.kills++;
            if (headshot) this.headshots++;
            this.player.addSkill((_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
              error: Error()
            }), CFG) : CFG).skillGainKill);
            (_crd && bus === void 0 ? (_reportPossibleCrUseOfbus({
              error: Error()
            }), bus) : bus).emit((_crd && EV === void 0 ? (_reportPossibleCrUseOfEV({
              error: Error()
            }), EV) : EV).KILL, this.kills);
          };

          (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
            error: Error()
          }), world) : world).onBossKilled = () => {
            this.bossKilled = true;
            this.player.addSkill((_crd && CFG === void 0 ? (_reportPossibleCrUseOfCFG({
              error: Error()
            }), CFG) : CFG).skillMax * 0.6);
          };

          (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
            error: Error()
          }), world) : world).onGoal = () => this.endRun(true);

          (_crd && bus === void 0 ? (_reportPossibleCrUseOfbus({
            error: Error()
          }), bus) : bus).on((_crd && EV === void 0 ? (_reportPossibleCrUseOfEV({
            error: Error()
          }), EV) : EV).RUN_END, this.onRunEnd, this);
          (_crd && bus === void 0 ? (_reportPossibleCrUseOfbus({
            error: Error()
          }), bus) : bus).on((_crd && EV === void 0 ? (_reportPossibleCrUseOfEV({
            error: Error()
          }), EV) : EV).GATE_DONE, this.onGateDone, this);
        }

        onDestroy() {
          (_crd && bus === void 0 ? (_reportPossibleCrUseOfbus({
            error: Error()
          }), bus) : bus).off((_crd && EV === void 0 ? (_reportPossibleCrUseOfEV({
            error: Error()
          }), EV) : EV).RUN_END, this.onRunEnd, this);
          (_crd && bus === void 0 ? (_reportPossibleCrUseOfbus({
            error: Error()
          }), bus) : bus).off((_crd && EV === void 0 ? (_reportPossibleCrUseOfEV({
            error: Error()
          }), EV) : EV).GATE_DONE, this.onGateDone, this);
          var v = cc.view;
          if (v && typeof v.off === 'function') v.off('canvas-resize', this.onViewResize, this);
          GameController.instance = null;
        }

        onRunEnd(data) {
          this.endRun(data && data.win === true);
        }

        onGateDone(text) {
          if (text && text.indexOf('数字门') >= 0) this.gateBroken = true;
        } // ------------------------------------------------------------ 输入


        bindInput() {
          input.on(Input.EventType.TOUCH_START, this.onTouch, this);
          input.on(Input.EventType.TOUCH_MOVE, this.onPointerMove, this);
          input.on(Input.EventType.MOUSE_DOWN, this.onMouse, this);
          input.on(Input.EventType.MOUSE_MOVE, this.onPointerMove, this);
          input.on(Input.EventType.KEY_DOWN, this.onKey, this);
        }

        onTouch(e) {
          var p = e.getLocation();
          this.handleTap(p.x, p.y);
        }

        onMouse(e) {
          var p = e.getLocation();
          this.handleTap(p.x, p.y);
        }
        /** 鼠标/手指移动：角色横向位置连续跟随指针，不再「滑一下就换一条道」 */


        onPointerMove(e) {
          if (this.state !== (_crd && GameState === void 0 ? (_reportPossibleCrUseOfGameState({
            error: Error()
          }), GameState) : GameState).Playing) return;
          var p = e.getLocation();
          this.pointerWorldX = this.screenToWorldX(p.x, p.y);
          this.player.setTargetX(this.pointerWorldX);
        }
        /** 屏幕坐标 → 角色所在高度平面上的世界 X */


        screenToWorldX(sx, sy) {
          this.cam3d.screenPointToRay(sx, sy, this.pointerRay);
          var o = this.pointerRay.o;
          var d = this.pointerRay.d;
          if (Math.abs(d.y) < 1e-5) return o.x;
          var t = (1.1 - o.y) / d.y;
          return o.x + d.x * t;
        }
        /** 点击 / 按下：开始、结算重开、底部区域放技能；其余位置顺带把角色拉过去 */


        handleTap(x, y) {
          var now = performance.now();
          if (now - this.lastInputAt < 60) return; // 触摸与鼠标事件去重

          this.lastInputAt = now;

          if (this.state === (_crd && GameState === void 0 ? (_reportPossibleCrUseOfGameState({
            error: Error()
          }), GameState) : GameState).Ready || this.state === (_crd && GameState === void 0 ? (_reportPossibleCrUseOfGameState({
            error: Error()
          }), GameState) : GameState).Result) {
            this.startRun();
            return;
          }

          var win = screen.windowSize;

          if (y / win.height < 0.22) {
            this.player.castSkill();
            return;
          }

          this.pointerWorldX = this.screenToWorldX(x, y);
          this.player.setTargetX(this.pointerWorldX);
        }

        onKey(e) {
          if (this.state !== (_crd && GameState === void 0 ? (_reportPossibleCrUseOfGameState({
            error: Error()
          }), GameState) : GameState).Playing) {
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
        } // ------------------------------------------------------------ 状态机


        toReady() {
          this.state = (_crd && GameState === void 0 ? (_reportPossibleCrUseOfGameState({
            error: Error()
          }), GameState) : GameState).Ready;
          this.player.alive = false; // 未开局时不要空放子弹

          (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
            error: Error()
          }), world) : world).travelSpeed = 0;
          this.spawner.clearWorld();
          this.ui.showReady();
          (_crd && bus === void 0 ? (_reportPossibleCrUseOfbus({
            error: Error()
          }), bus) : bus).emit((_crd && EV === void 0 ? (_reportPossibleCrUseOfEV({
            error: Error()
          }), EV) : EV).HP, 1);
          (_crd && bus === void 0 ? (_reportPossibleCrUseOfbus({
            error: Error()
          }), bus) : bus).emit((_crd && EV === void 0 ? (_reportPossibleCrUseOfEV({
            error: Error()
          }), EV) : EV).SKILL, 0);
          (_crd && bus === void 0 ? (_reportPossibleCrUseOfbus({
            error: Error()
          }), bus) : bus).emit((_crd && EV === void 0 ? (_reportPossibleCrUseOfEV({
            error: Error()
          }), EV) : EV).PROGRESS, 0);
          (_crd && bus === void 0 ? (_reportPossibleCrUseOfbus({
            error: Error()
          }), bus) : bus).emit((_crd && EV === void 0 ? (_reportPossibleCrUseOfEV({
            error: Error()
          }), EV) : EV).BUFF, '');
          (_crd && bus === void 0 ? (_reportPossibleCrUseOfbus({
            error: Error()
          }), bus) : bus).emit((_crd && EV === void 0 ? (_reportPossibleCrUseOfEV({
            error: Error()
          }), EV) : EV).GATE_PROMPT, '');
        }

        startRun() {
          this.kills = 0;
          this.headshots = 0;
          this.bossKilled = false;
          this.gateBroken = false;
          this.buffs.clear();
          this.player.reset();
          this.spawner.startRun();
          this.state = (_crd && GameState === void 0 ? (_reportPossibleCrUseOfGameState({
            error: Error()
          }), GameState) : GameState).Playing;
          this.ui.showPlaying();
          this.ui.setStat(0, 0);
          (_crd && bus === void 0 ? (_reportPossibleCrUseOfbus({
            error: Error()
          }), bus) : bus).emit((_crd && EV === void 0 ? (_reportPossibleCrUseOfEV({
            error: Error()
          }), EV) : EV).HP, 1);
          (_crd && bus === void 0 ? (_reportPossibleCrUseOfbus({
            error: Error()
          }), bus) : bus).emit((_crd && EV === void 0 ? (_reportPossibleCrUseOfEV({
            error: Error()
          }), EV) : EV).SKILL, 0);
          (_crd && bus === void 0 ? (_reportPossibleCrUseOfbus({
            error: Error()
          }), bus) : bus).emit((_crd && EV === void 0 ? (_reportPossibleCrUseOfEV({
            error: Error()
          }), EV) : EV).PROGRESS, 0);
          (_crd && bus === void 0 ? (_reportPossibleCrUseOfbus({
            error: Error()
          }), bus) : bus).emit((_crd && EV === void 0 ? (_reportPossibleCrUseOfEV({
            error: Error()
          }), EV) : EV).RUN_START, 0);
        }

        endRun(win) {
          if (this.state !== (_crd && GameState === void 0 ? (_reportPossibleCrUseOfGameState({
            error: Error()
          }), GameState) : GameState).Playing) return;
          this.state = (_crd && GameState === void 0 ? (_reportPossibleCrUseOfGameState({
            error: Error()
          }), GameState) : GameState).Result;
          var progress = this.spawner.progress();
          var xp = this.kills * 10 + this.headshots * 4 + Math.round(progress * 220) + (win ? 300 : 0) + (this.bossKilled ? 400 : 0) + (this.gateBroken ? 150 : 0);
          this.player.alive = false; // 结算页停止开火

          (_crd && world === void 0 ? (_reportPossibleCrUseOfworld({
            error: Error()
          }), world) : world).travelSpeed = 0;
          this.spawner.clearWorld();
          this.ui.showResult(win, {
            progress,
            kills: this.kills,
            headshots: this.headshots,
            xp,
            bossKilled: this.bossKilled,
            gateBroken: this.gateBroken
          });
          (_crd && bus === void 0 ? (_reportPossibleCrUseOfbus({
            error: Error()
          }), bus) : bus).emit((_crd && EV === void 0 ? (_reportPossibleCrUseOfEV({
            error: Error()
          }), EV) : EV).RUN_END, {
            win,
            xp
          });
        }

      }, _class2.instance = null, _class2)) || _class));
      /**
       * 兜底自举：只要脚本被加载，即使忘了手动挂组件，预览时也会自动创建入口节点。
       * 不依赖编辑器「添加组件」菜单，用空场景直接点预览就能跑。
       */


      if (!EDITOR) {
        director.on(Director.EVENT_AFTER_SCENE_LAUNCH, () => {
          var scene = director.getScene();
          if (!scene || scene.getComponentInChildren(GameController)) return;
          var root = new Node('LastZGame');
          scene.addChild(root);
          root.addComponent(GameController);
        });
      }

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=da48725133d56ccbb589bbac63a2e69bda12fed5.js.map