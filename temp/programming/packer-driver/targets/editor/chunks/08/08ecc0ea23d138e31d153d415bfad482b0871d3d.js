System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, Color, Material, MeshRenderer, Node, primitives, utils, _crd, GameState, ZombieType, HazardType, BuffId, COLORS, CFG, meshCache, matCache;

  /** 车道序号 → 世界 X 坐标 */
  function laneX(lane) {
    return (lane - (CFG.laneCount - 1) / 2) * CFG.laneWidth;
  }
  /** X 坐标 → 最近的车道序号 */


  function x2Lane(x) {
    return Math.max(0, Math.min(CFG.laneCount - 1, Math.round(x / CFG.laneWidth + (CFG.laneCount - 1) / 2)));
  } // ---------------------------------------------------------------- 共享材质 / 网格


  function unlitMaterial(color) {
    const key = color.toHEX();
    let mat = matCache.get(key);

    if (!mat) {
      mat = new Material();
      mat.initialize({
        effectName: 'builtin-unlit'
      });
      mat.setProperty('mainColor', color);
      matCache.set(key, mat);
    }

    return mat;
  }

  function cachedMesh(key, build) {
    let mesh = meshCache.get(key);

    if (!mesh) {
      mesh = build();
      meshCache.set(key, mesh);
    }

    return mesh;
  }

  function boxMesh(w, h, l) {
    return cachedMesh(`b${w}_${h}_${l}`, () => utils.createMesh(primitives.box({
      width: w,
      height: h,
      length: l
    })));
  }

  function cylMesh(r, h) {
    // 3.8 的 cylinder 是 (radiusTop, radiusBottom, height, opts) 数值签名，不能传对象
    return cachedMesh(`c${r}_${h}`, () => utils.createMesh(primitives.cylinder(r, r, h, {
      radialSegments: 14,
      heightSegments: 1
    })));
  }

  function planeMesh(w, l) {
    return cachedMesh(`p${w}_${l}`, () => utils.createMesh(primitives.plane({
      width: w,
      length: l,
      widthSegments: 1,
      lengthSegments: 1
    })));
  } // ---------------------------------------------------------------- 节点工厂


  function attach(node, mesh, color, parent) {
    const mr = node.addComponent(MeshRenderer);
    mr.mesh = mesh;
    mr.setMaterial(unlitMaterial(color), 0);
    if (parent) parent.addChild(node);
    return node;
  }

  function makeBox(name, w, h, l, color, parent = null) {
    return attach(new Node(name), boxMesh(w, h, l), color, parent);
  }

  function makeCylinder(name, r, h, color, parent = null) {
    return attach(new Node(name), cylMesh(r, h), color, parent);
  }

  function makePlane(name, w, l, color, parent = null) {
    return attach(new Node(name), planeMesh(w, l), color, parent);
  }
  /**
   * 沿 Z 轴平移。必须走 setPosition：
   * 3.x 里直接改 node.position.z 不会把变换标脏，物体会在画面上原地不动。
   */


  function advanceZ(node, dz) {
    const p = node.position;
    node.setPosition(p.x, p.y, p.z + dz);
  }

  _export({
    laneX: laneX,
    x2Lane: x2Lane,
    unlitMaterial: unlitMaterial,
    boxMesh: boxMesh,
    cylMesh: cylMesh,
    planeMesh: planeMesh,
    makeBox: makeBox,
    makeCylinder: makeCylinder,
    makePlane: makePlane,
    advanceZ: advanceZ
  });

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      Color = _cc.Color;
      Material = _cc.Material;
      MeshRenderer = _cc.MeshRenderer;
      Node = _cc.Node;
      primitives = _cc.primitives;
      utils = _cc.utils;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "75eaajw0AZKv4/g6bLdBuMc", "GameConfig", undefined);

      /** 全局游戏状态：开始页 → 战斗中 → 结算页 */
      __checkObsolete__(['Color', 'Material', 'Mesh', 'MeshRenderer', 'Node', 'primitives', 'utils']);

      _export("GameState", GameState = /*#__PURE__*/function (GameState) {
        GameState[GameState["Ready"] = 0] = "Ready";
        GameState[GameState["Playing"] = 1] = "Playing";
        GameState[GameState["Result"] = 2] = "Result";
        return GameState;
      }({}));
      /** 敌人体系（对应 Rule.md「敌人体系设计」） */


      _export("ZombieType", ZombieType = /*#__PURE__*/function (ZombieType) {
        ZombieType[ZombieType["Normal"] = 0] = "Normal";
        ZombieType[ZombieType["Runner"] = 1] = "Runner";
        ZombieType[ZombieType["Bomber"] = 2] = "Bomber";
        ZombieType[ZombieType["Tank"] = 3] = "Tank";
        ZombieType[ZombieType["Boss"] = 4] = "Boss";
        return ZombieType;
      }({}));
      /** 不可破坏危险体：打不掉，碰到直接扣大量血 */


      _export("HazardType", HazardType = /*#__PURE__*/function (HazardType) {
        HazardType[HazardType["Spike"] = 0] = "Spike";
        HazardType[HazardType["Roller"] = 1] = "Roller";
        HazardType[HazardType["Charger"] = 2] = "Charger";
        return HazardType;
      }({}));
      /** 局内增益（单局 build，通关失效） */


      _export("BuffId", BuffId = /*#__PURE__*/function (BuffId) {
        BuffId["FireRate"] = "fireRate";
        BuffId["Damage"] = "damage";
        BuffId["Escort"] = "escort";
        return BuffId;
      }({}));

      _export("COLORS", COLORS = {
        sky: new Color(16, 20, 26),
        ground: new Color(44, 52, 62),
        laneLine: new Color(88, 132, 110),
        wall: new Color(70, 84, 100),
        dash: new Color(120, 140, 165),
        player: new Color(86, 226, 190),
        playerGun: new Color(240, 248, 255),
        shield: new Color(90, 200, 255),
        normal: new Color(120, 152, 92),
        runner: new Color(214, 84, 72),
        bomber: new Color(240, 150, 60),
        tank: new Color(96, 118, 140),
        boss: new Color(150, 82, 200),
        hazard: new Color(226, 62, 62),
        barrel: new Color(206, 124, 42),
        gate: new Color(84, 158, 226),
        buffGate: new Color(120, 230, 150),
        goal: new Color(255, 208, 72),
        bullet: new Color(226, 244, 255),
        bulletHead: new Color(255, 200, 40),
        hitFlash: new Color(255, 255, 255),
        trail: new Color(150, 232, 255),
        tagMob: new Color(255, 255, 255),
        tagItem: new Color(255, 214, 92),
        tagDanger: new Color(255, 138, 128),
        tagShadow: new Color(0, 0, 0, 170)
      });
      /** 全部可调数值集中在这里，方便按手感调参 */


      _export("CFG", CFG = {
        // 视角与轨道（Rule.md：竖版向上卷轴 + 3~5 条平行车道）
        laneCount: 3,
        laneWidth: 3,
        playerZ: 0,
        spawnZ: -62,
        despawnZ: 3.5,
        // 关卡
        stageLength: 300,
        // 单局推进距离
        baseSpeed: 7,
        // 世界推进速度（单位/秒）
        speedGain: 0.5,
        // 关卡末段的速度增幅比例
        // 英雄
        playerMaxHp: 100,
        fireInterval: 0.18,
        bulletSpeed: 55,
        bulletDespawnZ: -70,
        baseDamage: 10,
        headshotMul: 2.5,
        // 同轨命中 = 爆头倍率
        laneLerp: 12,
        // 换道插值速度
        // 技能（独立充能：击杀 / 受击 / 时间）
        skillMax: 100,
        skillGainKill: 7,
        skillGainHit: 12,
        skillGainPerSec: 3,
        skillDamage: 60,
        skillHeal: 15,
        skillShieldTime: 3,
        // 危险体与自爆伤害
        hazardDamage: 25,
        hitInvincible: 0.8,
        // BOSS
        bossHp: 620,
        bossHoldZ: -20,
        bossAoeDamage: 25
      });

      meshCache = new Map();
      matCache = new Map();

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=08ecc0ea23d138e31d153d415bfad482b0871d3d.js.map