System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, EventTarget, _crd, EV, bus;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      EventTarget = _cc.EventTarget;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "cb4c5qMKnhHi6CvQ1E2a5LP", "EventBus", undefined);

      /** 事件名常量 */
      __checkObsolete__(['EventTarget']);

      _export("EV", EV = {
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
        BOSS_INCOMING: 'boss-incoming'
      });
      /** 全局事件总线（UI 与玩法解耦） */


      _export("bus", bus = new EventTarget());

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=34097bedebdad77b513a54f2b820a77409983b9b.js.map