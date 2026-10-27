import { EventTarget } from 'cc';

/** 事件名常量 */
export const EV = {
    RUN_START: 'run-start',
    RUN_END: 'run-end',
    HP: 'hp',
    SKILL: 'skill',
    KILL: 'kill',
    HEADSHOT: 'headshot',
    PROGRESS: 'progress',
    BUFF: 'buff',
    GATE_PROMPT: 'gate-prompt',
    GATE_DONE: 'gate-done',
    BOSS_INCOMING: 'boss-incoming',
};

/** 全局事件总线（UI 与玩法解耦） */
export const bus = new EventTarget();
