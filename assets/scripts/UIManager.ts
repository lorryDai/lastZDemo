import { _decorator, Color, Component, HorizontalTextAlignment, Label, Layers, Node, UITransform } from 'cc';
import { bus, EV } from './EventBus';

const { ccclass } = _decorator;

/** 竖版设计分辨率（UI 全部按这套坐标摆放） */
export const DESIGN_W = 720;
export const DESIGN_H = 1280;

interface UiSpec {
    node: Node;
    /** 相对画布中心的比例（0 = 画布中央） */
    rx: number;
    ry: number;
    /** 宽度按画布宽度比例；高度用设计像素（字号固定） */
    rw: number;
    h: number;
}

/**
 * 全部 UI：开始页 / HUD / 结算页。
 * 只用系统字体 Label + 代码定位，不依赖任何美术资源，方便直接跑起来。
 * 所有位置以「比例」记录，窗口尺寸变化时 relayout() 重排，不会挤成一团。
 */
@ccclass('UIManager')
export class UIManager extends Component {
    private hud: Node[] = [];
    private screen: Node[] = [];

    private hpL: Label = null!;
    private statL: Label = null!;
    private progL: Label = null!;
    private skillL: Label = null!;
    private buffL: Label = null!;
    private gateL: Label = null!;
    private flashL: Label = null!;
    private bossL: Label = null!;

    private titleL: Label = null!;
    private subL: Label = null!;
    private infoL: Label = null!;
    private pressL: Label = null!;

    private canvas: Node = null!;
    private specs: UiSpec[] = [];

    private flashTime = 0;
    private bossFlash = 0;

    build(canvas: Node): void {
        if (!canvas || !canvas.isValid) return;
        this.canvas = canvas;

        // ---------------- HUD
        this.hpL = this.mk('HP', -0.472, 0.469, 0.597, 44, 30, new Color(240, 250, 250), Label.HorizontalAlign.LEFT, 0, true);
        this.statL = this.mk('Stat', 0.472, 0.469, 0.597, 44, 26, new Color(200, 216, 230), Label.HorizontalAlign.RIGHT, 1, true);
        this.progL = this.mk('Prog', 0, 0.423, 0.917, 40, 26, new Color(180, 214, 196), Label.HorizontalAlign.CENTER, 0.5, true);
        this.bossL = this.mk('Boss', 0, 0.344, 0.917, 40, 30, new Color(232, 92, 82), Label.HorizontalAlign.CENTER, 0.5, true);
        this.flashL = this.mk('Flash', 0, 0.258, 0.917, 44, 34, new Color(255, 202, 42), Label.HorizontalAlign.CENTER, 0.5, true);
        this.gateL = this.mk('Gate', 0, -0.086, 0.972, 76, 26, new Color(198, 228, 255), Label.HorizontalAlign.CENTER, 0.5, true);
        this.skillL = this.mk('Skill', 0, -0.391, 0.972, 64, 32, new Color(226, 244, 255), Label.HorizontalAlign.CENTER, 0.5, true);
        this.buffL = this.mk('Buff', -0.472, -0.461, 0.903, 40, 24, new Color(150, 238, 186), Label.HorizontalAlign.LEFT, 0, true);

        // ---------------- 开始 / 结算页
        this.titleL = this.mk('Title', 0, 0.195, 0.972, 80, 56, new Color(120, 236, 190), Label.HorizontalAlign.CENTER, 0.5, false);
        this.subL = this.mk('Sub', 0, 0.109, 0.917, 80, 26, new Color(206, 222, 232), Label.HorizontalAlign.CENTER, 0.5, false);
        this.infoL = this.mk('Info', 0, -0.016, 0.917, 240, 26, new Color(226, 236, 244), Label.HorizontalAlign.CENTER, 0.5, false);
        this.pressL = this.mk('Press', 0, -0.180, 0.917, 60, 32, new Color(255, 210, 72), Label.HorizontalAlign.CENTER, 0.5, false);

        this.layout();

        bus.on(EV.HP, this.onHp, this);
        bus.on(EV.SKILL, this.onSkill, this);
        bus.on(EV.PROGRESS, this.onProgress, this);
        bus.on(EV.BUFF, this.onBuff, this);
        bus.on(EV.GATE_PROMPT, this.onGate, this);
        bus.on(EV.HEADSHOT, this.onHeadshot, this);
        bus.on(EV.GATE_DONE, this.onGateDone, this);
        bus.on(EV.BOSS_INCOMING, this.onBoss, this);
    }

    /** 画布尺寸变化后重排（窗口 resize / 旋转屏幕） */
    relayout(): void {
        this.layout();
    }

    private layout(): void {
        if (!this.canvas || !this.canvas.isValid) return;
        const tf = this.canvas.getComponent(UITransform);
        const H = tf && tf.height > 0 ? tf.height : DESIGN_H;
        let W = tf && tf.width > 0 ? tf.width : DESIGN_W;
        // 竖版游戏放进宽屏窗口时，UI 只占中间一条竖版区域，别贴到浏览器两边
        W = Math.min(W, H * DESIGN_W / DESIGN_H);
        for (const s of this.specs) {
            if (!s.node || !s.node.isValid) continue;
            s.node.setPosition(s.rx * W, s.ry * H, 0);
            const ui = s.node.getComponent(UITransform);
            if (ui) ui.setContentSize(s.rw * W, s.h);
        }
    }

    onDestroy(): void {
        bus.off(EV.HP, this.onHp, this);
        bus.off(EV.SKILL, this.onSkill, this);
        bus.off(EV.PROGRESS, this.onProgress, this);
        bus.off(EV.BUFF, this.onBuff, this);
        bus.off(EV.GATE_PROMPT, this.onGate, this);
        bus.off(EV.HEADSHOT, this.onHeadshot, this);
        bus.off(EV.GATE_DONE, this.onGateDone, this);
        bus.off(EV.BOSS_INCOMING, this.onBoss, this);
    }

    // ------------------------------------------------------------ 页面切换
    showReady(): void {
        this.setHud(false);
        this.setScreen(true);
        this.titleL.string = 'LAST Z · 换道闪避射击';
        this.subL.string = '竖版 3D 轨道玩法 / 生存优先，击杀其次\n左滑右滑换道闪避，自动开火，躲不掉就掉血';
        this.infoL.string = '核心规则\n· 自动射击，同轨命中触发爆头 2.5 倍\n· 不可破坏的尖刺滚轮只能躲，碰到扣 25 血\n· 油桶打爆拿 buff，数字门打爆得大额奖励\n· 技能独立充能，高威胁波次留给技能';
        this.pressL.string = '点击屏幕开始';
    }

    showPlaying(): void {
        this.setScreen(false);
        this.setHud(true);
        this.flashL.string = '';
        this.gateL.string = '';
        this.bossL.string = '';
    }

    showResult(win: boolean, data: { progress: number; kills: number; headshots: number; xp: number; bossKilled: boolean; gateBroken: boolean }): void {
        this.setHud(false);
        this.setScreen(true);
        this.titleL.string = win ? '通关成功' : '英雄阵亡';
        this.subL.string = win ? '终点 XP 箱子已回收' : '血量归零，本次闯关失败（不损失部队与资源）';
        this.infoL.string = [
            `推进进度　${Math.round(data.progress * 100)}%`,
            `击杀丧尸　${data.kills}　（爆头 ${data.headshots}）`,
            `数字门击破　${data.gateBroken ? '是' : '否'}　　章节 BOSS　${data.bossKilled ? '已击破' : '未击破'}`,
            `获得英雄经验　${data.xp}`,
            '体力 -6　　部队 / 资源损失 0',
        ].join('\n');
        this.pressL.string = '点击屏幕重新挑战';
    }

    private setHud(on: boolean): void {
        for (const n of this.hud) n.active = on;
    }

    private setScreen(on: boolean): void {
        for (const n of this.screen) n.active = on;
    }

    // ------------------------------------------------------------ 事件响应
    private onHp(ratio: number): void {
        this.hpL.string = `HP ${this.bar(ratio, 12)} ${Math.ceil(ratio * 100)}%`;
    }

    private onSkill(ratio: number): void {
        this.skillL.string = ratio >= 1
            ? '【 技能就绪 · 空格 / 点击屏幕下方释放 】'
            : `技能充能 ${this.bar(ratio, 10)}`;
    }

    private onProgress(p: number): void {
        this.progL.string = `推进 ${this.bar(p, 20)} ${Math.round(p * 100)}%`;
    }

    private onBuff(text: string): void {
        this.buffL.string = text ? `局内增益：${text}` : '';
    }

    private onGate(text: string): void {
        this.gateL.string = text;
    }

    private onGateDone(text: string): void {
        this.gateL.string = text;
    }

    private onHeadshot(isHead: boolean): void {
        if (!isHead) return;
        this.flashTime = 0.28;
        this.flashL.string = '爆头 ×2.5';
    }

    private onBoss(incoming: boolean): void {
        this.bossFlash = incoming ? 3 : 0;
        this.bossL.string = incoming ? 'BOSS 已挡住去路：清理小怪并寻找输出窗口' : '';
    }

    update(dt: number): void {
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
    setStat(kills: number, headshots: number): void {
        this.statL.string = `击杀 ${kills}　爆头 ${headshots}`;
    }

    // ------------------------------------------------------------ 工具
    private bar(ratio: number, cells: number): string {
        const n = Math.max(0, Math.min(cells, Math.round(ratio * cells)));
        return '█'.repeat(n) + '░'.repeat(cells - n);
    }

    private mk(
        name: string, rx: number, ry: number, rw: number, h: number,
        fontSize: number, color: Color,
        align: HorizontalTextAlignment, anchorX: number, isHud: boolean,
    ): Label {
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
        this.specs.push({ node, rx, ry, rw, h });
        (isHud ? this.hud : this.screen).push(node);
        return label;
    }
}
