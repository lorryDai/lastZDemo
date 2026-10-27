import { _decorator, Component } from 'cc';
import { BuffId } from './GameConfig';
import { bus, EV } from './EventBus';

const { ccclass } = _decorator;

interface BuffIns {
    id: BuffId;
    value: number;
    until: number;
    label: string;
    permanent: boolean;
}

/**
 * 局内 buff 系统（Rule.md：单局 build，通关失效）。
 * 数值采用累加后乘算：最终倍率 = 1 + Σvalue。
 */
@ccclass('BuffSystem')
export class BuffSystem extends Component {
    private list: BuffIns[] = [];
    private time = 0;

    apply(id: BuffId, value: number, duration: number, label: string): void {
        if (duration <= 0) {
            this.emit();
            return;
        }
        const found = this.list.find((b) => b.id === id);
        if (found) {
            found.value = value;
            found.until = this.time + duration;
            found.label = label;
            found.permanent = duration >= 99999;
        } else {
            this.list.push({ id, value, until: this.time + duration, label, permanent: duration >= 99999 });
        }
        this.emit();
    }

    /** 本局永久增益：数字门、增益门等 */
    applyPermanent(id: BuffId, value: number, label: string): void {
        this.apply(id, value, 99999, label);
    }

    has(id: BuffId): boolean {
        return this.list.some((b) => b.id === id);
    }

    /** 伤害 / 攻速的乘区 */
    mul(id: BuffId): number {
        let v = 0;
        for (const b of this.list) {
            if (b.id === id) v += b.value;
        }
        return 1 + v;
    }

    clear(): void {
        this.list.length = 0;
        this.emit();
    }

    update(dt: number): void {
        if (this.list.length === 0) return;
        this.time += dt;
        let changed = false;
        for (let i = this.list.length - 1; i >= 0; i--) {
            if (this.list[i].until <= this.time) {
                this.list.splice(i, 1);
                changed = true;
            }
        }
        if (changed) this.emit();
    }

    /** HUD 用文案，例如「伤害+40% 8s   攻速+30%」 */
    texts(): string {
        const parts: string[] = [];
        for (const b of this.list) {
            parts.push(b.permanent ? b.label : `${b.label} ${Math.ceil(b.until - this.time)}s`);
        }
        return parts.join('   ');
    }

    private emit(): void {
        bus.emit(EV.BUFF, this.texts());
    }
}
