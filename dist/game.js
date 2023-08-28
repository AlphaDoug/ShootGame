var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// build.ts
var require_build = __commonJS({
  "build.ts"() {
  }
});

// <stdin>
var stdin_exports = {};
__export(stdin_exports, {
  MWModuleMap: () => MWModuleMap
});
module.exports = __toCommonJS(stdin_exports);

// JavaScripts/Config/Action.ts
var Action_exports = {};
__export(Action_exports, {
  ActionConfig: () => ActionConfig
});

// JavaScripts/Config/ConfigBase.ts
var ConfigBase_exports = {};
__export(ConfigBase_exports, {
  ConfigBase: () => ConfigBase
});
var _ConfigBase = class {
  ELEMENTARR = [];
  ELEMENTMAP = /* @__PURE__ */ new Map();
  KEYMAP = /* @__PURE__ */ new Map();
  constructor(excelData) {
    let headerLine = 2;
    this.ELEMENTARR = new Array(excelData.length - headerLine);
    for (let i = 0; i < this.ELEMENTARR.length; i++) {
      this.ELEMENTARR[i] = {};
    }
    let column = excelData[0].length;
    for (let j = 0; j < column; j++) {
      let name = excelData[0][j];
      let tags = excelData[1][j].split("|");
      if (tags.includes(_ConfigBase.TAG_CHILDLANGUAGE))
        continue;
      let jOffect = 0;
      if (tags.includes(_ConfigBase.TAG_MAINLANGUAGE)) {
        let index = j + _ConfigBase.languageIndex;
        let targetTags = excelData[1][index].split("|");
        if (index < column && targetTags.includes(_ConfigBase.TAG_CHILDLANGUAGE)) {
          jOffect = _ConfigBase.languageIndex;
        }
      }
      let hasTag_Key = tags.includes(_ConfigBase.TAG_KEY);
      let hasTag_Language = tags.includes(_ConfigBase.TAG_LANGUAGE);
      for (let i = 0; i < this.ELEMENTARR.length; i++) {
        let ele = this.ELEMENTARR[i];
        let value = excelData[i + headerLine][j + jOffect];
        if (j == 0) {
          this.ELEMENTMAP.set(value, ele);
        } else {
          if (hasTag_Key) {
            this.KEYMAP.set(value, excelData[i + headerLine][0]);
          }
          if (hasTag_Language) {
            if (_ConfigBase.getLanguage != null) {
              value = _ConfigBase.getLanguage(value);
            } else {
              value = "unknow";
            }
          }
        }
        ele[name] = value;
      }
    }
  }
  static initLanguage(languageIndex, getLanguageFun) {
    _ConfigBase.languageIndex = languageIndex;
    _ConfigBase.getLanguage = getLanguageFun;
    if (_ConfigBase.languageIndex < 0) {
      _ConfigBase.languageIndex = _ConfigBase.getSystemLanguageIndex();
    }
  }
  static getSystemLanguageIndex() {
    let language = Util.LocaleUtil.getDefaultLocale().toString().toLowerCase();
    if (!!language.match("en")) {
      return 0;
    }
    if (!!language.match("zh")) {
      return 1;
    }
    if (!!language.match("ja")) {
      return 2;
    }
    if (!!language.match("de")) {
      return 3;
    }
    return 0;
  }
  getElement(id) {
    let ele = this.ELEMENTMAP.get(Number(id)) || this.ELEMENTMAP.get(this.KEYMAP.get(id));
    if (ele == null) {
      console.error(this.constructor.name + "\u914D\u7F6E\u8868\u4E2D\u627E\u4E0D\u5230\u5143\u7D20 id:" + id);
    }
    return ele;
  }
  findElement(fieldName, fieldValue) {
    for (let i = 0; i < this.ELEMENTARR.length; i++) {
      if (this.ELEMENTARR[i][fieldName] == fieldValue) {
        return this.ELEMENTARR[i];
      }
    }
  }
  findElements(fieldName, fieldValue) {
    let arr = [];
    for (let i = 0; i < this.ELEMENTARR.length; i++) {
      if (this.ELEMENTARR[i][fieldName] == fieldValue) {
        arr.push(this.ELEMENTARR[i]);
      }
    }
    return arr;
  }
  getAllElement() {
    return this.ELEMENTARR;
  }
};
var ConfigBase = _ConfigBase;
__publicField(ConfigBase, "TAG_KEY", "Key");
__publicField(ConfigBase, "TAG_LANGUAGE", "Language");
__publicField(ConfigBase, "TAG_MAINLANGUAGE", "MainLanguage");
__publicField(ConfigBase, "TAG_CHILDLANGUAGE", "ChildLanguage");
__publicField(ConfigBase, "languageIndex", 0);
__publicField(ConfigBase, "getLanguage");

// JavaScripts/Config/Action.ts
var EXCELDATA = [["id", "sex", "shootAnimation", "aimShootAnimation", "reloadAnimation", "loadAnimation", "equipAnimation", "unequipAnimation", "holdStance", "aimStance"], [1, "male", 80484, 80483, 80479, 80482, 80585, 80481, 94258, 94261], [2, "female", "49094", "49095", "80479", "80482", "80585", "80481", "49096", "49098"]];
var ActionConfig = class extends ConfigBase {
  constructor() {
    super(EXCELDATA);
  }
};

// JavaScripts/Config/GameConfig.ts
var GameConfig_exports = {};
__export(GameConfig_exports, {
  GameConfig: () => GameConfig
});

// JavaScripts/Config/WeaponConfig.ts
var WeaponConfig_exports = {};
__export(WeaponConfig_exports, {
  WeaponConfigConfig: () => WeaponConfigConfig
});
var EXCELDATA2 = [["id", "name", "maleAction", "femaleAction", "weaponIcon", "equipmentSlot", "equipmentCameraOffset", "resourcesId", "useClass", "equipmentCameraFov", "aimCameraOffset", "aimCameraFov", "aimSpeed", "damage", "shootRange", "ammoSpeed", "detectRadius", "gravityScale", "hurtRadius", "isAutoReload", "isAutoLock", "isDefaultUI", "isWeaponHaveCasing", "fireBlockDistance", "totalAmmo", "isEmptyToDestroy", "isSupportRepAmmo", "rotateSpeed", "keepTime", "isWeaponHaveScope", "isAutoDestroy"], [100, "\u6D4B\u8BD5\u6B65\u67AA", 1, 2, 101168, "Right_Hand", "0|0|0", 1, "Sniper", 90, "0|0|0", 60, 90, 30, 5e3, 1e4, 1, "", 1, 1, 1, 1, 1, 1, 100, "", 1, 90, -1, "", 1]];
var WeaponConfigConfig = class extends ConfigBase {
  constructor() {
    super(EXCELDATA2);
  }
};

// JavaScripts/Config/WeaponResources.ts
var WeaponResources_exports = {};
__export(WeaponResources_exports, {
  WeaponResourcesConfig: () => WeaponResourcesConfig
});
var EXCELDATA3 = [["id", "hitRoleEffect", "hitOtherEffect", "fireEffect", "ammo", "casing", "fireSound", "reloadSound", "loadSound", "aimSound", "hitRoleSound", "hitOtherSound"], [1, 1, 2, 3, 4, 2, 5, 6, 7, 8, 9, 10]];
var WeaponResourcesConfig = class extends ConfigBase {
  constructor() {
    super(EXCELDATA3);
  }
};

// JavaScripts/Config/GameConfig.ts
var GameConfig = class {
  static initLanguage(languageIndex, getLanguageFun) {
    ConfigBase.initLanguage(languageIndex, getLanguageFun);
    this.configMap.clear();
  }
  static getConfig(ConfigClass) {
    if (!this.configMap.has(ConfigClass.name)) {
      this.configMap.set(ConfigClass.name, new ConfigClass());
    }
    return this.configMap.get(ConfigClass.name);
  }
  static get Action() {
    return this.getConfig(ActionConfig);
  }
  static get WeaponConfig() {
    return this.getConfig(WeaponConfigConfig);
  }
  static get WeaponResources() {
    return this.getConfig(WeaponResourcesConfig);
  }
};
__publicField(GameConfig, "configMap", /* @__PURE__ */ new Map());

// JavaScripts/DefaultUI.ts
var DefaultUI_exports = {};
__export(DefaultUI_exports, {
  default: () => UIDefault
});
var UIDefault = class extends UI.UIBehavior {
  Character;
  resolveString(assetIds) {
    let assetIdArray = new Array();
    let assetId = "";
    let s = assetIds.split("");
    for (let a of s) {
      if (a == ",") {
        assetIdArray.push(assetId);
        assetId = "";
      } else {
        assetId += a;
      }
    }
    if (assetId) {
      assetIdArray.push(assetId);
    }
    return assetIdArray;
  }
  initAssets(assetIds) {
    let assetIdArray = this.resolveString(assetIds);
    for (let element of assetIdArray) {
      Util.AssetUtil.asyncDownloadAsset(element);
    }
  }
  onStart() {
    this.initAssets("95777,61245");
    this.canUpdate = false;
    const JumpBtn = this.uiWidgetBase.findChildByPath("RootCanvas/Button_Jump");
    const AttackBtn = this.uiWidgetBase.findChildByPath("RootCanvas/Button_Attack");
    const InteractBtn = this.uiWidgetBase.findChildByPath("RootCanvas/Button_Interact");
    JumpBtn.onPressed.add(() => {
      if (this.Character) {
        this.Character.jump();
      } else {
        Gameplay.asyncGetCurrentPlayer().then((player) => {
          this.Character = player.character;
          this.Character.jump();
        });
      }
    });
    AttackBtn.onPressed.add(() => {
      Gameplay.asyncGetCurrentPlayer().then((player) => {
        this.Character = player.character;
        let anim1 = player.character.loadAnimation("61245");
        anim1.slot = Gameplay.AnimSlot.Upper;
        if (anim1.isPlaying) {
          return;
        } else {
          anim1.play();
        }
      });
    });
    InteractBtn.onPressed.add(() => {
      Gameplay.asyncGetCurrentPlayer().then((player) => {
        this.Character = player.character;
        let anim2 = player.character.loadAnimation("95777");
        anim2.slot = Gameplay.AnimSlot.Upper;
        if (anim2.isPlaying) {
          return;
        } else {
          anim2.play();
        }
      });
    });
  }
  onAdded() {
  }
  onRemoved() {
  }
  onDestroy() {
  }
};
UIDefault = __decorateClass([
  UI.UICallOnly("")
], UIDefault);

// JavaScripts/GameDef.ts
var GameDef_exports = {};
__export(GameDef_exports, {
  GameDef: () => GameDef
});
var GameDef;
((GameDef2) => {
  class Pool {
    mCacheStack = new Array();
    mUsingArray = new Array();
    get CacheStackCount() {
      return this.mCacheStack.length;
    }
    get UsingCount() {
      return this.mUsingArray.length;
    }
    mFactory;
    allocate() {
      let obj = this.mCacheStack.length > 0 ? this.mCacheStack.pop() : this.mFactory.create();
      this.mUsingArray.push(obj);
      return obj;
    }
    release() {
      for (let i = 0; i < this.mUsingArray.length; i++) {
        const element = this.mUsingArray[i];
        this.mFactory.destroy(element);
      }
      this.mUsingArray.length = 0;
      for (let i = 0; i < this.mCacheStack.length; i++) {
        const element = this.mCacheStack[i];
        this.mFactory.destroy(element);
      }
      this.mCacheStack.length = 0;
    }
  }
  GameDef2.Pool = Pool;
  class CustomObjectFactory {
    mFactoryCreateMethod;
    mFactoryDestroyMethod;
    constructor(factoryCreateMethod, factoryDestroyMethod) {
      this.mFactoryCreateMethod = factoryCreateMethod;
      this.mFactoryDestroyMethod = factoryDestroyMethod;
    }
    create() {
      return this.mFactoryCreateMethod();
    }
    destroy(obj) {
      return this.mFactoryDestroyMethod(obj);
    }
  }
  GameDef2.CustomObjectFactory = CustomObjectFactory;
  class SimpleObjectPool extends Pool {
    mResetMethod;
    constructor(factoryCreateMethod, factoryDestroyMethod, resetMethod = null) {
      super();
      this.mFactory = new CustomObjectFactory(factoryCreateMethod, factoryDestroyMethod);
      this.mResetMethod = resetMethod;
    }
    recycle(obj) {
      if (this.mCacheStack.indexOf(obj) > -1) {
        return;
      }
      if (this.mResetMethod != null) {
        this.mResetMethod(obj);
      }
      let index = this.mUsingArray.indexOf(obj);
      if (index > -1) {
        this.mUsingArray.splice(index, 1);
      }
      this.mCacheStack.push(obj);
      return true;
    }
    recycleAll() {
      for (let i = 0; i < this.mUsingArray.length; i++) {
        const element = this.mUsingArray[i];
        this.mResetMethod(element);
        this.mCacheStack.push(element);
      }
      this.mUsingArray.length = 0;
    }
    printTotalSize() {
      console.error("total size: " + (this.UsingCount + this.CacheStackCount));
    }
  }
  GameDef2.SimpleObjectPool = SimpleObjectPool;
  GameDef2.GRAVITAIONAL_ACCELERATION = 9.8;
  GameDef2.MAX_SHOOTSPEED = 10001;
  GameDef2.DEBUG_FLAG = false;
  GameDef2.SHOOT_RANGE = 1e5;
  GameDef2.CASING_LIFE = 1;
  GameDef2.CASING_OFFSET = new Type.Vector(8, 5, 10);
})(GameDef || (GameDef = {}));

// JavaScripts/WeaponBase/AmmoBaseCls.ts
var AmmoBaseCls_exports = {};
__export(AmmoBaseCls_exports, {
  default: () => Ammo
});
var Ammo = class {
  owner;
  hitResult;
  ammoPool;
  entity;
  displacement;
  currentLocation;
  gravityScale;
  lifeTime;
  currentTime;
  stride;
  detectRadius;
  constructor(owner, ammoPool, startLoc, direction, shootRange, ammoSpeed, gravityScale, detectRadius, hitResult = []) {
    this.owner = owner;
    this.ammoPool = ammoPool;
    this.entity = this.ammoPool.allocate();
    this.entity.detachFromGameObject();
    this.currentLocation = startLoc.clone();
    this.entity.worldLocation = this.currentLocation;
    this.entity.worldRotation = direction.toRotation();
    this.entity.setVisibility(Type.PropertyStatus.On);
    this.displacement = Type.Vector.multiply(direction, ammoSpeed, this.displacement);
    this.lifeTime = shootRange / ammoSpeed;
    this.currentTime = 0;
    this.gravityScale = gravityScale;
    this.stride = Type.Vector.zero;
    this.detectRadius = detectRadius;
    this.hitResult = hitResult;
  }
  update(dt) {
    this.stride = Type.Vector.multiply(this.displacement, dt, this.stride);
    if (this.gravityScale) {
      this.stride.z -= 50 * this.gravityScale * GameDef.GRAVITAIONAL_ACCELERATION * (Math.pow(this.currentTime + dt, 2) - Math.pow(this.currentTime, 2));
      this.entity.worldRotation = this.stride.toRotation();
      this.currentTime += dt;
    }
    this.currentLocation.x += this.stride.x;
    this.currentLocation.y += this.stride.y;
    this.currentLocation.z += this.stride.z;
    if (this.detectRadius) {
      if (this.detectRadius < 10) {
        let lineResult = Gameplay.lineTrace(this.entity.worldLocation, this.currentLocation, true, GameDef.DEBUG_FLAG);
        lineResult = lineResult.filter((e) => {
          return !(e.gameObject instanceof Gameplay.Trigger);
        });
        if (lineResult.length > 0) {
          this.lifeTime = -1;
          let temp = new Array();
          for (let element of lineResult) {
            temp.push(element);
          }
          this.hitResult = temp;
        }
      } else {
        let boxResult = Gameplay.boxOverlapInLevel(this.entity.worldLocation, this.currentLocation, this.detectRadius, this.detectRadius, GameDef.DEBUG_FLAG);
        if (boxResult.length > 0) {
          this.lifeTime = -1;
          this.hitResult = boxResult;
        }
      }
    }
    this.entity.worldLocation = this.currentLocation;
    this.lifeTime -= dt;
    return this.lifeTime <= 0;
  }
  destroy() {
    this.ammoPool.recycle(this.entity);
  }
};

// JavaScripts/WeaponBase/CasingBaseCls.ts
var CasingBaseCls_exports = {};
__export(CasingBaseCls_exports, {
  default: () => Casing
});
var Casing = class {
  casingPool;
  entity;
  displacement;
  loc;
  gravity;
  lifeTime;
  stride;
  constructor(casingPool, casing, direction) {
    this.casingPool = casingPool;
    this.loc = Type.Vector.add(casing.worldLocation, casing.worldRotation.rotateVector(GameDef.CASING_OFFSET));
    this.entity = this.casingPool.allocate();
    this.entity.worldLocation = this.loc;
    this.entity.worldRotation = new Type.Rotation(Util.MathUtil.randomFloat(0, 180), Util.MathUtil.randomFloat(0, 180), Util.MathUtil.randomFloat(0, 180));
    this.entity.setVisibility(Type.PropertyStatus.On);
    this.displacement = direction.multiply(100);
    this.gravity = Util.MathUtil.randomFloat(1, 3);
    this.lifeTime = GameDef.CASING_LIFE;
    this.stride = Type.Vector.zero;
  }
  update(dt) {
    this.stride = Type.Vector.multiply(this.displacement, dt, this.stride);
    this.loc.x += this.stride.x;
    this.loc.y += this.stride.y;
    this.loc.z += this.stride.z + this.gravity;
    this.gravity -= dt * 20;
    this.entity.worldLocation = this.loc;
    this.lifeTime -= dt;
    return this.lifeTime <= 0;
  }
  destroy() {
    this.casingPool.recycle(this.entity);
  }
};

// JavaScripts/WeaponBase/WeaponBaseCls.ts
var WeaponBaseCls_exports = {};
__export(WeaponBaseCls_exports, {
  default: () => WeaponDriver
});

// JavaScripts/WeaponBase/WeaponUI.ts
var WeaponUI_exports = {};
__export(WeaponUI_exports, {
  default: () => WeaponUI
});

// JavaScripts/ui-generate/WeaponUI_generate.ts
var WeaponUI_generate_exports = {};
__export(WeaponUI_generate_exports, {
  default: () => WeaponUI_Generate
});
var WeaponUI_Generate = class extends UI.UIBehavior {
  point = void 0;
  up = void 0;
  down = void 0;
  left = void 0;
  right = void 0;
  move = void 0;
  right_fire = void 0;
  reload = void 0;
  crouch = void 0;
  jump = void 0;
  aim = void 0;
  left_fire = void 0;
  icon = void 0;
  name = void 0;
  bullet = void 0;
  mKeepTimeCanvas = void 0;
  keepTimeBar = void 0;
  keepTimeTxt = void 0;
  onAwake() {
  }
};
__decorateClass([
  UI.UIMarkPath("RootCanvas/point")
], WeaponUI_Generate.prototype, "point", 2);
__decorateClass([
  UI.UIMarkPath("RootCanvas/up")
], WeaponUI_Generate.prototype, "up", 2);
__decorateClass([
  UI.UIMarkPath("RootCanvas/down")
], WeaponUI_Generate.prototype, "down", 2);
__decorateClass([
  UI.UIMarkPath("RootCanvas/left")
], WeaponUI_Generate.prototype, "left", 2);
__decorateClass([
  UI.UIMarkPath("RootCanvas/right")
], WeaponUI_Generate.prototype, "right", 2);
__decorateClass([
  UI.UIMarkPath("RootCanvas/move")
], WeaponUI_Generate.prototype, "move", 2);
__decorateClass([
  UI.UIMarkPath("RootCanvas/right_fire")
], WeaponUI_Generate.prototype, "right_fire", 2);
__decorateClass([
  UI.UIMarkPath("RootCanvas/reload")
], WeaponUI_Generate.prototype, "reload", 2);
__decorateClass([
  UI.UIMarkPath("RootCanvas/crouch")
], WeaponUI_Generate.prototype, "crouch", 2);
__decorateClass([
  UI.UIMarkPath("RootCanvas/jump")
], WeaponUI_Generate.prototype, "jump", 2);
__decorateClass([
  UI.UIMarkPath("RootCanvas/aim")
], WeaponUI_Generate.prototype, "aim", 2);
__decorateClass([
  UI.UIMarkPath("RootCanvas/left_fire")
], WeaponUI_Generate.prototype, "left_fire", 2);
__decorateClass([
  UI.UIMarkPath("RootCanvas/icon")
], WeaponUI_Generate.prototype, "icon", 2);
__decorateClass([
  UI.UIMarkPath("RootCanvas/name")
], WeaponUI_Generate.prototype, "name", 2);
__decorateClass([
  UI.UIMarkPath("RootCanvas/bullet")
], WeaponUI_Generate.prototype, "bullet", 2);
__decorateClass([
  UI.UIMarkPath("RootCanvas/mKeepTimeCanvas")
], WeaponUI_Generate.prototype, "mKeepTimeCanvas", 2);
__decorateClass([
  UI.UIMarkPath("RootCanvas/mKeepTimeCanvas/keepTimeBar")
], WeaponUI_Generate.prototype, "keepTimeBar", 2);
__decorateClass([
  UI.UIMarkPath("RootCanvas/mKeepTimeCanvas/keepTimeTxt")
], WeaponUI_Generate.prototype, "keepTimeTxt", 2);
WeaponUI_Generate = __decorateClass([
  UI.UICallOnly("UI/WeaponUI.ui")
], WeaponUI_Generate);

// JavaScripts/WeaponBase/WeaponUI.ts
var WeaponUI = class extends WeaponUI_Generate {
  curWeapon = null;
  upPosition = Type.Vector2.zero;
  downPosition = Type.Vector2.zero;
  leftPosition = Type.Vector2.zero;
  rightPosition = Type.Vector2.zero;
  upCurPosition = Type.Vector2.zero;
  downCurPosition = Type.Vector2.zero;
  leftCurPosition = Type.Vector2.zero;
  rightCurPosition = Type.Vector2.zero;
  onStart() {
    this.right_fire.onJoyStickDown.add(() => {
      console.error("right_fire onJoyStickDown");
      if (!this.curWeapon)
        return;
      this.curWeapon.startFire();
    });
    this.right_fire.onJoyStickUp.add(() => {
      console.error("right_fire onJoyStickUp");
      if (!this.curWeapon)
        return;
      this.curWeapon.stopFire();
    });
    this.left_fire.onPressed.add(() => {
      console.error("left_fire onPressed");
      if (!this.curWeapon)
        return;
      this.curWeapon.startFire();
    });
    this.left_fire.onReleased.add(() => {
      console.error("left_fire onReleased");
      if (!this.curWeapon)
        return;
      this.curWeapon.stopFire();
    });
    this.reload.onClicked.add(() => {
      console.error("reload onClicked");
      if (!this.curWeapon)
        return;
      this.curWeapon.startReload();
    });
    this.aim.onClicked.add(() => {
      console.error("aim onClicked");
      if (!this.curWeapon)
        return;
      if (this.curWeapon.isAimming) {
        this.curWeapon.stopAim();
      } else {
        this.curWeapon.startAim();
      }
    });
    this.crouch.onClicked.add(() => {
      console.error("crouch onClicked");
      let player = Gameplay.getCurrentPlayer();
      if (player) {
        if (player.character.isCrouching) {
          player.character.crouch(false);
        } else {
          player.character.crouch(true);
        }
      }
    });
    this.jump.onClicked.add(() => {
      console.error("jump onClicked");
      let player = Gameplay.getCurrentPlayer();
      if (player) {
        player.character.jump();
      }
    });
    Events.addLocalListener("HotWeapon-Unequiped", () => {
      if (this.curWeapon != null) {
        this.curWeapon.unEquip();
        this.curWeapon = null;
      }
    });
  }
  onShow(weapon, crossValue, iconId, weaponName) {
    console.error("show");
    this.curWeapon = weapon;
    this.icon.imageGuid = iconId;
    this.name.text = weaponName;
    this.upPosition = this.upPosition.set(this.up.position);
    this.downPosition = this.downPosition.set(this.down.position);
    this.leftPosition = this.leftPosition.set(this.left.position);
    this.rightPosition = this.rightPosition.set(this.right.position);
    this.changeCross(crossValue * 10);
  }
  onHide() {
    console.error("hide");
    this.changeCross(0);
  }
  changeBullet(bullet, ammo) {
    if (ammo == -1) {
      this.bullet.text = `${bullet} / NAN`;
    } else {
      this.bullet.text = `${bullet} / ${ammo}`;
    }
  }
  changeCross(value) {
    this.up.position = this.upCurPosition.set(this.upPosition.x, this.upPosition.y - value);
    this.down.position = this.downCurPosition.set(this.downPosition.x, this.downPosition.y + value);
    this.left.position = this.leftCurPosition.set(this.leftPosition.x - value, this.leftPosition.y);
    this.right.position = this.rightCurPosition.set(this.rightPosition.x + value, this.rightPosition.y);
  }
  setTimeText(restTime, keepTime) {
    if (restTime <= 0) {
      this.mKeepTimeCanvas.visibility = UI.SlateVisibility.Collapsed;
    } else {
      this.mKeepTimeCanvas.visibility = UI.SlateVisibility.SelfHitTestInvisible;
      let percent = restTime / keepTime;
      this.keepTimeBar.percent = percent;
      this.keepTimeTxt.text = `${restTime.toFixed(1)}s`;
    }
  }
  setReloadBtn(enable) {
    this.reload.visibility = enable ? UI.SlateVisibility.Visible : UI.SlateVisibility.Collapsed;
  }
};

// prefabEvent/PrefabEvent.ts
var PrefabEvent_exports = {};
__export(PrefabEvent_exports, {
  PrefabEvent: () => PrefabEvent
});

// prefabEvent/PrefabEventModule.ts
var PrefabEventModule_exports = {};
__export(PrefabEventModule_exports, {
  MapEx: () => MapEx,
  PrefabEventModuleC: () => PrefabEventModuleC,
  PrefabEventModuleData: () => PrefabEventModuleData,
  PrefabEventModuleS: () => PrefabEventModuleS
});
var MapEx;
((MapEx2) => {
  function isNull(map) {
    return !map || map == null || map == void 0;
  }
  MapEx2.isNull = isNull;
  function get(map, key) {
    if (map[key]) {
      return map[key];
    }
    let has2 = false;
    let keys = Object.keys(map);
    for (let i = 0; i < keys.length; ++i) {
      if (keys[i] == key) {
        has2 = true;
        break;
      }
    }
    if (has2) {
      return map[key];
    }
    return null;
  }
  MapEx2.get = get;
  function set(map, key, val) {
    map[key] = val;
  }
  MapEx2.set = set;
  function del(map, key) {
    if (map[key]) {
      delete map[key];
      return true;
    }
    let has2 = false;
    let keys = Object.keys(map);
    for (let i = 0; i < keys.length; ++i) {
      if (keys[i] == key) {
        has2 = true;
        break;
      }
    }
    if (has2) {
      delete map[key];
      return true;
    }
    return false;
  }
  MapEx2.del = del;
  function has(map, key) {
    if (map[key]) {
      return true;
    }
    let has2 = false;
    let keys = Object.keys(map);
    for (let i = 0; i < keys.length; ++i) {
      if (keys[i] == key) {
        has2 = true;
        break;
      }
    }
    if (has2) {
      return true;
    }
    return false;
  }
  MapEx2.has = has;
  function count(map) {
    let res = 0;
    forEach(map, (e) => {
      ++res;
    });
    return res;
  }
  MapEx2.count = count;
  function forEach(map, callback) {
    for (let key in map) {
      if (map[key]) {
        callback(key, map[key]);
      }
    }
  }
  MapEx2.forEach = forEach;
  function copy(map) {
    let res = {};
    for (let key in map) {
      res[key] = map[key];
    }
    return res;
  }
  MapEx2.copy = copy;
})(MapEx || (MapEx = {}));
var DBSaveBase = class {
  value;
};
var PrefabEventModuleData = class extends Subdata {
  cacheData = null;
  initDefaultData() {
    if (this.cacheData == null) {
      this.cacheData = {};
    }
  }
  setValue(key, val) {
    let data = new DBSaveBase();
    data.value = val;
    let dataStr = JSON.stringify(data);
    MapEx.set(this.cacheData, key, dataStr);
    this.save(true);
  }
  getValue(key) {
    if (!MapEx.has(this.cacheData, key)) {
      return null;
    }
    let value = MapEx.get(this.cacheData, key);
    let res = JSON.parse(value);
    return res.value;
  }
};
__decorateClass([
  Decorator.saveProperty
], PrefabEventModuleData.prototype, "cacheData", 2);
var PrefabEventAirportData = class {
  cacheData = {};
  constructor(_cacheData) {
    if (_cacheData != null) {
      this.cacheData = _cacheData;
    }
  }
  setValue(key, val) {
    console.log("[PF]set Vale : " + key + " => " + val);
    let data = new DBSaveBase();
    data.value = val;
    let dataStr = JSON.stringify(data);
    MapEx.set(this.cacheData, key, dataStr);
  }
  getValue(key) {
    if (!MapEx.has(this.cacheData, key)) {
      return null;
    }
    let value = MapEx.get(this.cacheData, key);
    let res = JSON.parse(value);
    return res.value;
  }
};
PrefabEventAirportData = __decorateClass([
  Core.Type
], PrefabEventAirportData);
var PrefabEventModuleC = class extends ModuleC {
  airData = {};
  onStart() {
    PrefabEvent.PrefabEvtPlayerStat.onSetPlayerStat((senderGuid, targetGuid, stat) => {
      let char = Gameplay.getCurrentPlayer().character;
      if (targetGuid == char.guid) {
        if (stat == PrefabEvent.PlayerStatType.Flying) {
          char.switchToFlying();
        } else if (stat == PrefabEvent.PlayerStatType.Walking) {
          char.switchToWalking();
        }
      }
    });
  }
  net_SyncAirData(data) {
    console.log("[PF] sync air data : " + data);
    this.airData = JSON.parse(data);
    MapEx.forEach(this.airData, (k, v) => {
      MapEx.set(this.airData, k, new PrefabEventAirportData(v.cacheData));
    });
  }
  net_SetData(targetGuid, key, data) {
    console.log("\u5BA2\u6237\u7AEF net_SetData : " + key + " => " + data);
    if (!MapEx.has(this.airData, targetGuid)) {
      MapEx.set(this.airData, targetGuid, new PrefabEventAirportData(null));
    }
    MapEx.get(this.airData, targetGuid).setValue(key, data);
  }
  getData(targetGuid, key) {
    let res = null;
    if (!MapEx.get(this.airData, targetGuid)) {
      return res;
    }
    res = MapEx.get(this.airData, targetGuid).getValue(key);
    return res;
  }
  getPlayerInfo(clazzName, targetGuid, infoType) {
    let char = Core.GameObject.find(targetGuid);
    if (char instanceof Gameplay.Character) {
      if (char.player) {
        let value = this.data?.getValue(clazzName + infoType);
        if (value == null)
          value = 0;
        return value;
      }
    }
    return null;
  }
  getAttrVal(clazzName, targetGuid, attrType) {
    let curVal = this.getData(targetGuid, clazzName + attrType);
    if (curVal == null)
      curVal = 0;
    return curVal;
  }
  getPlayerStat(clazzName, targetGuid) {
    let curVal = this.getData(clazzName, targetGuid);
    if (curVal == null)
      curVal = 0;
    return curVal;
  }
  getRecordPoint(clazzName, targetGuid) {
    let char = Core.GameObject.find(targetGuid);
    if (char instanceof Gameplay.Character) {
      if (char.player) {
        let dbval = this.data?.getValue(clazzName + "record");
        if (dbval == null)
          dbval = 0;
        return dbval;
      }
    }
  }
  getCurrencyNum(clazzName, targetGuid, currencyId) {
    let char = Core.GameObject.find(targetGuid);
    if (char instanceof Gameplay.Character) {
      if (char.player) {
        let value = this.data?.getValue(clazzName + currencyId);
        if (value == null)
          value = 0;
        return value;
      }
    }
    return null;
  }
  async buyWithCurrency(targetGuid, currencyId, price) {
    return await this.server.net_BuyWithCurrency(targetGuid, currencyId, price);
  }
};
var PrefabEventModuleS = class extends ModuleS {
  airData = {};
  onPlayerEnterGame(player) {
    this.getClient(player).net_SyncAirData(JSON.stringify(this.airData));
  }
  onPlayerLeft(player) {
    if (MapEx.has(this.airData, player.character.guid)) {
      MapEx.del(this.airData, player.character.guid);
    }
  }
  setData(targetGuid, key, data) {
    console.log("[PF:]net_SetData");
    this.getAllClient().net_SetData(targetGuid, key, data);
    if (!MapEx.has(this.airData, targetGuid)) {
      MapEx.set(this.airData, targetGuid, new PrefabEventAirportData());
    }
    MapEx.get(this.airData, targetGuid).setValue(key, data);
  }
  getData(targetGuid, key) {
    let res = null;
    if (!MapEx.get(this.airData, targetGuid)) {
      return res;
    }
    res = MapEx.get(this.airData, targetGuid).getValue(key);
    return res;
  }
  notify(clazzName, funcName, ...params) {
    Events.dispatchToAllClient(PrefabEvent._onEventNetKey, clazzName, funcName, ...params);
    Events.dispatchLocal(PrefabEvent._onEventKey + ":" + clazzName + ":" + funcName, ...params);
    console.log(PrefabEvent._onEventKey + ":" + clazzName + ":" + funcName, ...params);
  }
  onSetAttrVal(clazzName, senderGuid, targetGuid, val, attrType) {
    let curVal = 0;
    curVal = val;
    this.setData(targetGuid, clazzName + attrType, curVal);
    console.log("[PF:]\u8BBE\u7F6E\u73A9\u5BB6\u5C5E\u6027 : " + attrType + " : " + curVal);
    let char = Core.GameObject.find(targetGuid);
    if (char instanceof Gameplay.Character) {
      if (attrType == PrefabEvent.AttrType.Jump) {
        char.maxJumpHeight = curVal;
      }
      if (attrType == PrefabEvent.AttrType.Speed) {
        char.maxWalkSpeed = curVal;
      }
    }
    this.notify(clazzName, PrefabEvent.PrefabEvtAttr.onChangeAttrVal.name, senderGuid, targetGuid, curVal, attrType);
  }
  onAddAttrVal(clazzName, senderGuid, targetGuid, val, attrType) {
    let curVal = this.getData(targetGuid, clazzName + attrType);
    if (curVal == null)
      curVal = 0;
    curVal += val;
    this.setData(targetGuid, clazzName + attrType, curVal);
    console.log("[PF:]\u8BBE\u7F6E\u73A9\u5BB6\u5C5E\u6027 : " + attrType + " : " + curVal);
    let char = Core.GameObject.find(targetGuid);
    if (char instanceof Gameplay.Character) {
      if (attrType == PrefabEvent.AttrType.Jump) {
        char.maxJumpHeight = curVal;
      }
      if (attrType == PrefabEvent.AttrType.Speed) {
        char.maxWalkSpeed = curVal;
      }
    }
    this.notify(clazzName, PrefabEvent.PrefabEvtAttr.onChangeAttrVal.name, senderGuid, targetGuid, curVal, attrType);
  }
  getAttrVal(clazzName, targetGuid, attrType) {
    let curVal = this.getData(targetGuid, clazzName + attrType);
    if (curVal == null)
      curVal = 0;
    return curVal;
  }
  onEquip(clazzName, targetGuid, slot, equipGuid) {
    this.setData(targetGuid, clazzName + slot, equipGuid);
    this.notify(clazzName, this.onEquip.name, targetGuid, slot, equipGuid);
  }
  onSetPlayerInfo(clazzName, senderGuid, targetGuid, val, infoType) {
    let char = Core.GameObject.find(targetGuid);
    if (char instanceof Gameplay.Character) {
      if (char.player) {
        this.getPlayerData(char.player.getPlayerID()).setValue(clazzName + infoType, val);
        this.notify(clazzName, this.onSetPlayerInfo.name, senderGuid, targetGuid, val, infoType);
      }
    }
  }
  getPlayerInfo(clazzName, targetGuid, infoType) {
    let char = Core.GameObject.find(targetGuid);
    if (char instanceof Gameplay.Character) {
      if (char.player) {
        let value = this.getPlayerData(char.player.getPlayerID()).getValue(clazzName + infoType);
        if (value == null)
          value = 0;
        return value;
      }
    }
    return null;
  }
  onAddPlayerInfo(clazzName, senderGuid, targetGuid, val, infoType) {
    let char = Core.GameObject.find(targetGuid);
    if (char instanceof Gameplay.Character) {
      if (char.player) {
        let dbval = this.getPlayerInfo(clazzName, targetGuid, infoType);
        if (dbval == null || !Number.isNaN(dbval)) {
          let nVal = dbval;
          nVal += val;
          this.onSetPlayerInfo(clazzName, senderGuid, targetGuid, nVal, infoType);
          this.notify(clazzName, this.onAddPlayerInfo.name, senderGuid, targetGuid, val, infoType);
        }
      }
    }
  }
  onSetRecordPoint(clazzName, senderGuid, targetGuid, recordPointId, saveDB) {
    console.log("[PF:]onSetRecordPoint : " + clazzName + "_" + senderGuid);
    let char = Core.GameObject.find(targetGuid);
    if (char instanceof Gameplay.Character) {
      if (char.player) {
        if (saveDB)
          this.getPlayerData(char.player.getPlayerID())?.setValue(clazzName + "record", recordPointId);
        this.notify(clazzName, this.onSetRecordPoint.name, senderGuid, targetGuid, recordPointId);
      }
    }
  }
  getRecordPoint(clazzName, targetGuid) {
    let char = Core.GameObject.find(targetGuid);
    if (char instanceof Gameplay.Character) {
      if (char.player) {
        let dbval = this.getPlayerData(char.player.getPlayerID())?.getValue(clazzName + "record");
        return dbval;
      }
    }
  }
  onAddCollection(clazzName, atlasId, charGuid) {
    let char = Core.GameObject.find(charGuid);
    if (char instanceof Gameplay.Character) {
      if (char.player) {
        let db = this.getPlayerData(char.player.getPlayerID());
        if (db) {
          let dbval = db.getValue(clazzName + "atlasItem");
          if (!dbval) {
            dbval = [];
          }
          if (dbval.indexOf(atlasId) == -1) {
            dbval.push(atlasId);
            db.setValue(clazzName + "atlasItem", dbval);
            this.notify(clazzName, this.onAddCollection.name, atlasId, charGuid);
          }
        }
      }
    }
  }
  getAllCollection(clazzName, charGuid) {
    let char = Core.GameObject.find(charGuid);
    if (char instanceof Gameplay.Character) {
      if (char.player) {
        let dbval = this.getPlayerData(char.player.getPlayerID())?.getValue(clazzName + "atlasItem");
        let res = [];
        if (dbval) {
          res.push(...dbval);
        }
        return res;
      }
    }
  }
  getPlayerStat(clazzName, targetGuid) {
    let curVal = this.getData(clazzName, targetGuid);
    if (curVal == null)
      curVal = 0;
    return curVal;
  }
  onSetPlayerStat(clazzName, senderGuid, targetGuid, statType) {
    this.setData(targetGuid, clazzName, statType);
    this.notify(clazzName, this.onSetPlayerStat.name, senderGuid, targetGuid, statType);
  }
  getCurrencyNum(clazzName, targetGuid, currencyId) {
    let char = Core.GameObject.find(targetGuid);
    if (char instanceof Gameplay.Character) {
      if (char.player) {
        let value = this.getPlayerData(char.player.getPlayerID()).getValue(clazzName + currencyId);
        if (value == null)
          value = 0;
        return value;
      }
    }
    return null;
  }
  onChangeCurrency(clazzName, targetGuid, currencyId, currencyNum) {
    let char = Core.GameObject.find(targetGuid);
    if (char instanceof Gameplay.Character) {
      if (char.player) {
        let dbval = this.getCurrencyNum(clazzName, targetGuid, currencyId);
        if (dbval == null || !Number.isNaN(dbval)) {
          let nVal = dbval;
          nVal += currencyNum;
          this.getPlayerData(char.player.getPlayerID()).setValue(clazzName + currencyId, nVal);
          this.notify(clazzName, this.onChangeCurrency.name, targetGuid, currencyId, currencyNum, nVal);
        }
      }
    }
  }
  net_BuyWithCurrency(targetGuid, currencyId, price) {
    let curNum = this.getCurrencyNum(PrefabEvent.PrefabEvtCurrency.name, targetGuid, currencyId);
    if (curNum < price) {
      return false;
    } else {
      this.onChangeCurrency(PrefabEvent.PrefabEvtCurrency.name, targetGuid, currencyId, -price);
      return true;
    }
  }
};
ModuleManager.getInstance().registerModule(PrefabEventModuleS, PrefabEventModuleC, PrefabEventModuleData);

// prefabEvent/PrefabEvent.ts
var PrefabEvent;
((PrefabEvent2) => {
  function PrefabReport(reportId = null) {
    return function(target, propertyKey, descriptor) {
      const method = descriptor.value;
      descriptor.value = function(...args) {
        if (SystemUtil.isClient() && reportId) {
          console.log("\u6A21\u677F", target.constructor.name, "\u57CB\u70B9", reportId);
          Service.RoomService.getInstance().reportLogInfo("ts_action_firstdo", "\u6A21\u677F\u57CB\u70B9", JSON.stringify({ record: "TemplatePrefab", lifetime: reportId }));
        }
        const result = method.apply(this, args);
        return result;
      };
    };
  }
  PrefabEvent2.PrefabReport = PrefabReport;
  PrefabEvent2._onEventNetKey = "PrefabEventExNeyKey";
  PrefabEvent2._onEventKey = "PrefabEventExKey";
  function callRemoteFunc(clazzName, funcName, ...params) {
    if (!PrefabEvent2[clazzName] || !PrefabEvent2[clazzName][funcName]) {
      console.error("\u65E0\u6548\u534F\u8BAE " + clazzName + " : " + funcName);
      return;
    }
    callFunc(clazzName, funcName, ...params);
  }
  function addEventListeners() {
    if (Util.SystemUtil.isServer()) {
      Events.addClientListener(PrefabEvent2._onEventNetKey, (player, clazzName, funcName, ...params) => {
        callRemoteFunc(clazzName, funcName, ...params);
      });
    }
    if (Util.SystemUtil.isClient()) {
      Events.addServerListener(PrefabEvent2._onEventNetKey, (clazzName, funcName, ...params) => {
        callLocalFunc(clazzName, funcName, ...params);
      });
    }
  }
  function initEvent() {
    addEventListeners();
  }
  function callLocalFunc(clazzName, funcName, ...params) {
    Events.dispatchLocal(PrefabEvent2._onEventKey + ":" + clazzName + ":" + funcName, ...params);
  }
  function callFunc(clazzName, funcName, ...params) {
    if (Util.SystemUtil.isClient()) {
      Events.dispatchToServer(PrefabEvent2._onEventNetKey, clazzName, funcName, ...params);
    }
    if (Util.SystemUtil.isServer()) {
      if (ModuleManager.getInstance().getModule(PrefabEventModuleS)[funcName]) {
        ModuleManager.getInstance().getModule(PrefabEventModuleS)[funcName](clazzName, ...params);
      } else {
        ModuleManager.getInstance().getModule(PrefabEventModuleS).notify(clazzName, funcName, ...params);
      }
    }
  }
  function callFuncRes(clazzName, funcName, ...params) {
    if (Util.SystemUtil.isClient()) {
      if (!ModuleManager.getInstance().getModule(PrefabEventModuleC)[funcName]) {
        console.error("find error PrefabEventModuleC: " + funcName);
        return null;
      }
      return ModuleManager.getInstance().getModule(PrefabEventModuleC)[funcName](clazzName, ...params);
    }
    if (Util.SystemUtil.isServer()) {
      if (!ModuleManager.getInstance().getModule(PrefabEventModuleS)[funcName]) {
        console.error("find error PrefabEventModuleS: " + funcName);
        return null;
      }
      return ModuleManager.getInstance().getModule(PrefabEventModuleS)[funcName](clazzName, ...params);
    }
  }
  function onFunc(clazzName, funcName, callback) {
    return Events.addLocalListener(PrefabEvent2._onEventKey + ":" + clazzName + ":" + funcName, callback);
  }
  let AttrType;
  ((AttrType2) => {
    AttrType2[AttrType2["MaxHp"] = 0] = "MaxHp";
    AttrType2[AttrType2["CurHp"] = 1] = "CurHp";
    AttrType2[AttrType2["MaxMp"] = 2] = "MaxMp";
    AttrType2[AttrType2["Attack"] = 3] = "Attack";
    AttrType2[AttrType2["Magic"] = 4] = "Magic";
    AttrType2[AttrType2["Def"] = 5] = "Def";
    AttrType2[AttrType2["MDef"] = 6] = "MDef";
    AttrType2[AttrType2["Speed"] = 7] = "Speed";
    AttrType2[AttrType2["Jump"] = 8] = "Jump";
    AttrType2[AttrType2["AttackSpeed"] = 9] = "AttackSpeed";
    AttrType2[AttrType2["AttackDistance"] = 10] = "AttackDistance";
    AttrType2[AttrType2["IsInvincible"] = 11] = "IsInvincible";
  })(AttrType = PrefabEvent2.AttrType || (PrefabEvent2.AttrType = {}));
  class PrefabEvtAttr {
    static setAttrVal(senderGuid, targetGuid, val, attrType) {
      callFunc(this.name, this.onSetAttrVal.name, senderGuid, targetGuid, val, attrType);
    }
    static onSetAttrVal(callback) {
      return this.onChangeAttrVal(callback);
    }
    static addAttrVal(senderGuid, targetGuid, val, attrType) {
      callFunc(this.name, this.onAddAttrVal.name, senderGuid, targetGuid, val, attrType);
    }
    static onAddAttrVal(callback) {
      return this.onChangeAttrVal(callback);
    }
    static getAttrVal(targetGuid, attrType) {
      let res = callFuncRes(this.name, this.getAttrVal.name, targetGuid, attrType);
      return res;
    }
    static onChangeAttrVal(callback) {
      return onFunc(this.name, this.onChangeAttrVal.name, callback);
    }
  }
  PrefabEvent2.PrefabEvtAttr = PrefabEvtAttr;
  let EquipSlot;
  ((EquipSlot2) => {
    EquipSlot2[EquipSlot2["Weapon"] = 1] = "Weapon";
  })(EquipSlot = PrefabEvent2.EquipSlot || (PrefabEvent2.EquipSlot = {}));
  class PrefabEvtEquip {
    static equip(targetGuid, slot, equipGuid) {
      callFunc(this.name, this.onEquip.name, targetGuid, slot, equipGuid);
    }
    static onEquip(callback) {
      return onFunc(this.name, this.onEquip.name, callback);
    }
  }
  PrefabEvent2.PrefabEvtEquip = PrefabEvtEquip;
  let PlayerInfoType;
  ((PlayerInfoType2) => {
    PlayerInfoType2[PlayerInfoType2["Name"] = 0] = "Name";
    PlayerInfoType2[PlayerInfoType2["Level"] = 1] = "Level";
    PlayerInfoType2[PlayerInfoType2["Exp"] = 2] = "Exp";
    PlayerInfoType2[PlayerInfoType2["Gold"] = 3] = "Gold";
    PlayerInfoType2[PlayerInfoType2["Score"] = 4] = "Score";
    PlayerInfoType2[PlayerInfoType2["Stage"] = 5] = "Stage";
    PlayerInfoType2[PlayerInfoType2["Popularity"] = 6] = "Popularity";
    PlayerInfoType2[PlayerInfoType2["IsNotInLobby"] = 7] = "IsNotInLobby";
    PlayerInfoType2[PlayerInfoType2["DeathCount"] = 8] = "DeathCount";
  })(PlayerInfoType = PrefabEvent2.PlayerInfoType || (PrefabEvent2.PlayerInfoType = {}));
  class PrefabEvtPlayerInfo {
    static getPlayerInfo(targetGuid, infoType) {
      return callFuncRes(this.name, this.getPlayerInfo.name, targetGuid, infoType);
    }
    static setPlayerInfo(senderGuid, targetGuid, val, infoType) {
      callFunc(this.name, this.onSetPlayerInfo.name, senderGuid, targetGuid, val, infoType);
    }
    static onSetPlayerInfo(callback) {
      return onFunc(this.name, this.onSetPlayerInfo.name, callback);
    }
    static addPlayerInfo(senderGuid, targetGuid, val, attrType) {
      callFunc(this.name, this.onAddPlayerInfo.name, senderGuid, targetGuid, val, attrType);
    }
    static onAddPlayerInfo(callback) {
      return onFunc(this.name, this.onAddPlayerInfo.name, callback);
    }
  }
  PrefabEvent2.PrefabEvtPlayerInfo = PrefabEvtPlayerInfo;
  let PlayerStatType;
  ((PlayerStatType2) => {
    PlayerStatType2[PlayerStatType2["Walking"] = 0] = "Walking";
    PlayerStatType2[PlayerStatType2["Flying"] = 1] = "Flying";
  })(PlayerStatType = PrefabEvent2.PlayerStatType || (PrefabEvent2.PlayerStatType = {}));
  class PrefabEvtPlayerStat {
    static setPlayerStat(senderGuid, targetGuid, statType) {
      return callFunc(this.name, this.onSetPlayerStat.name, senderGuid, targetGuid, statType);
    }
    static onSetPlayerStat(callback) {
      return onFunc(this.name, this.onSetPlayerStat.name, callback);
    }
    static getPlayerStat(targetGuid) {
      return callFuncRes(this.name, this.getPlayerStat.name, targetGuid);
    }
  }
  PrefabEvent2.PrefabEvtPlayerStat = PrefabEvtPlayerStat;
  class PrefabEvtFight {
    static hit(senderGuid, targetGuid, damage, hitPoint) {
      callFunc(this.name, this.onHit.name, senderGuid, targetGuid, damage, hitPoint);
    }
    static onHit(callback) {
      return onFunc(this.name, this.onHit.name, callback);
    }
    static hurt(senderGuid, targetGuid, damage) {
      callFunc(this.name, this.onHurt.name, senderGuid, targetGuid, damage);
    }
    static onHurt(callback) {
      return onFunc(this.name, this.onHurt.name, callback);
    }
    static cure(senderGuid, targetGuid, cureVal) {
      callFunc(this.name, this.onCure.name, senderGuid, targetGuid, cureVal);
    }
    static onCure(callback) {
      return onFunc(this.name, this.onCure.name, callback);
    }
    static die(targetGuid) {
      callFunc(this.name, this.onDie.name, targetGuid);
    }
    static onDie(callback) {
      return onFunc(this.name, this.onDie.name, callback);
    }
    static revive(targetGuid) {
      callFunc(this.name, this.onRevive.name, targetGuid);
    }
    static onRevive(callback) {
      return onFunc(this.name, this.onRevive.name, callback);
    }
  }
  PrefabEvent2.PrefabEvtFight = PrefabEvtFight;
  class PrefabEvtRecordPoint {
    static setRecordPoint(senderGuid, targetGuid, recordPointId, saveDB) {
      callFunc(this.name, this.onSetRecordPoint.name, senderGuid, targetGuid, recordPointId, saveDB);
    }
    static getRecordPoint(targetGuid) {
      return callFuncRes(this.name, this.getRecordPoint.name, targetGuid);
    }
    static onSetRecordPoint(callback) {
      return onFunc(this.name, this.onSetRecordPoint.name, callback);
    }
    static backCurrentRecordPoint(senderGuid) {
      callFunc(this.name, this.onBackCurrentRecordPoint.name, senderGuid);
    }
    static onBackCurrentRecordPoint(callback) {
      return onFunc(this.name, this.onBackCurrentRecordPoint.name, callback);
    }
    static backRecordPoint(senderGuid, recordPointId) {
      callFunc(this.name, this.onBackRecordPoint.name, senderGuid, recordPointId);
    }
    static onBackRecordPoint(callback) {
      return onFunc(this.name, this.onBackRecordPoint.name, callback);
    }
  }
  PrefabEvent2.PrefabEvtRecordPoint = PrefabEvtRecordPoint;
  class PrefabEvtNotify {
    static notifyLocal(text) {
      callLocalFunc(this.name, this.onNotify.name, text);
    }
    static notify(text) {
      callFunc(this.name, this.onNotify.name, text);
    }
    static onNotify(callback) {
      return onFunc(this.name, this.onNotify.name, callback);
    }
  }
  PrefabEvent2.PrefabEvtNotify = PrefabEvtNotify;
  class PrefabEvtRank {
    static openRank() {
      callLocalFunc(this.name, this.onOpenRank.name);
    }
    static onOpenRank(callback) {
      return onFunc(this.name, this.onOpenRank.name, callback);
    }
    static setRankData(senderGuid, name, score, typeName) {
      callFunc(this.name, this.onSetRankData.name, senderGuid, name, score, typeName);
    }
    static onSetRankData(callback) {
      return onFunc(this.name, this.onSetRankData.name, callback);
    }
    static delRankData(senderGuid) {
      callFunc(this.name, this.onDelRankData.name, senderGuid);
    }
    static onDelRankData(callback) {
      return onFunc(this.name, this.onDelRankData.name, callback);
    }
  }
  PrefabEvent2.PrefabEvtRank = PrefabEvtRank;
  class PrefabEvtCloth {
    static loadRole(senderGuid, targetGuid, dressResGuid) {
      callLocalFunc(this.name, this.onLoadRole.name, senderGuid, targetGuid, dressResGuid);
    }
    static onLoadRole(callback) {
      return onFunc(this.name, this.onLoadRole.name, callback);
    }
    static loadCloth(senderGuid, targetGuid, dressResGuid) {
      callLocalFunc(this.name, this.onLoadCloth.name, senderGuid, targetGuid, dressResGuid);
    }
    static onLoadCloth(callback) {
      return onFunc(this.name, this.onLoadCloth.name, callback);
    }
    static loadSlot(senderGuid, targetGuid, slotResGuid) {
      callLocalFunc(this.name, this.onLoadSlot.name, senderGuid, targetGuid, slotResGuid);
    }
    static onLoadSlot(callback) {
      return onFunc(this.name, this.onLoadSlot.name, callback);
    }
  }
  PrefabEvent2.PrefabEvtCloth = PrefabEvtCloth;
  class PrefabEvtCollection {
    static openCollectionUI() {
      callLocalFunc(this.name, this.onOpenCollectionUI.name);
    }
    static onOpenCollectionUI(callback) {
      return onFunc(this.name, this.onOpenCollectionUI.name, callback);
    }
    static addCollection(atlasId, charGuid) {
      callFunc(this.name, this.onAddCollection.name, atlasId, charGuid);
    }
    static getAllCollection(charGuid) {
      return callFuncRes(this.name, this.getAllCollection.name, charGuid);
    }
    static onAddCollection(callback) {
      return onFunc(this.name, this.onAddCollection.name, callback);
    }
  }
  PrefabEvent2.PrefabEvtCollection = PrefabEvtCollection;
  class PrefabEvtCurrency {
    static changeCurrency(targetGuid, currencyId, changeNum) {
      callFunc(this.name, this.onChangeCurrency.name, targetGuid, currencyId, changeNum);
    }
    static onChangeCurrency(callback) {
      return onFunc(this.name, this.onChangeCurrency.name, callback);
    }
    static async buyWithCurrency(targetGuid, currencyId, price) {
      if (SystemUtil.isClient()) {
        return await ModuleManager.getInstance().getModule(PrefabEventModuleC).buyWithCurrency(targetGuid, currencyId, price);
      } else {
        return await ModuleManager.getInstance().getModule(PrefabEventModuleS).net_BuyWithCurrency(targetGuid, currencyId, price);
      }
    }
    static getCurrencyNum(targetGuid, currencyId) {
      return callFuncRes(this.name, this.getCurrencyNum.name, targetGuid, currencyId);
    }
  }
  PrefabEvent2.PrefabEvtCurrency = PrefabEvtCurrency;
  class PrefabEvtPet {
    static openUI() {
      callLocalFunc(this.name, this.openUI.name);
    }
    static addPet(targetGuid, petCfgId) {
      const res = callFunc(this.name, this.addPet.name, targetGuid, petCfgId);
      return res;
    }
    static removePet(targetGuid, petId) {
      const res = callFunc(this.name, this.removePet.name, targetGuid, petId);
      return res;
    }
  }
  PrefabEvent2.PrefabEvtPet = PrefabEvtPet;
  class PrefabEvtDress {
    static openUI() {
      callLocalFunc(this.name, this.openUI.name);
    }
    static addDress(targetGuid, dressCfgId) {
      const res = callFunc(this.name, this.addDress.name, targetGuid, dressCfgId);
      return res;
    }
  }
  PrefabEvent2.PrefabEvtDress = PrefabEvtDress;
  initEvent();
})(PrefabEvent || (PrefabEvent = {}));

// JavaScripts/WeaponBase/WeaponBaseCls.ts
var WeaponDriver = class extends Core.Script {
  config;
  hasInit = false;
  isEquiped = false;
  weaponObj = null;
  weaponAction = null;
  weaponResources = null;
  weaponUI = null;
  player = null;
  chara = null;
  camera = null;
  pickUpTrigger = null;
  weaponEntityRoot = null;
  ammoEntityRoot = null;
  ammoPool = null;
  ammoArray = [];
  casingEntity = null;
  casingPool = null;
  casingArray = [];
  fireEffect = null;
  hitCharaEffect = null;
  hitCharaEffectPool = null;
  hitEffect = null;
  hitEffectPool = null;
  fireSound = null;
  reloadSound = null;
  loadSound = null;
  aimSound = null;
  hitCharaSound = null;
  hitCharaSoundPool = null;
  hitSound = null;
  hitSoundPool = null;
  isFiring = false;
  bFiring = false;
  isCanFire = 0;
  isAimming = false;
  isZooming = false;
  isBlock = false;
  isAutoReload = false;
  totalAmmo;
  _restTime;
  _rotateRotation = Rotation.zero;
  preloadAssets;
  clientOnHit;
  clientOnBlockChange;
  InitWeapon(id) {
    this.config = GameConfig.WeaponConfig.getElement(id);
    this.isAutoReload = this.config.isAutoReload;
    this.totalAmmo = this.config.totalAmmo;
    this.weaponResources = GameConfig.WeaponResources.getElement(this.config.resourcesId);
    let maleAction = GameConfig.Action.getElement(this.config.maleAction);
    let femaleAction = GameConfig.Action.getElement(this.config.femaleAction);
    for (const key in maleAction) {
      if (Object.prototype.hasOwnProperty.call(maleAction, key)) {
        const element = maleAction[key];
        if (key != "id") {
          Util.AssetUtil.asyncDownloadAsset(element);
        }
      }
    }
    for (const key in femaleAction) {
      if (Object.prototype.hasOwnProperty.call(maleAction, key)) {
        const element = maleAction[key];
        if (key != "id") {
          Util.AssetUtil.asyncDownloadAsset(element);
        }
      }
    }
    for (const key in this.weaponResources) {
      if (Object.prototype.hasOwnProperty.call(maleAction, key)) {
        const element = maleAction[key];
        if (key != "id") {
          Util.AssetUtil.asyncDownloadAsset(element);
        }
      }
    }
  }
  async onStart() {
    while (!this.hasInit) {
      TimeUtil.delaySecond(0.1);
    }
    this.useUpdate = true;
    this.weaponObj = this.gameObject;
    this.initAssets(this.preloadAssets);
    if (this.weaponObj) {
      if (Util.SystemUtil.isClient()) {
        this.clientInit();
      }
      if (Util.SystemUtil.isServer()) {
        this.serverInit();
      }
      if (Util.SystemUtil.isClient()) {
        this.clientOnHit = (hitResult, attackPlayer, isObj) => {
          hitResult.forEach((e) => {
            if (e instanceof Gameplay.HitResult) {
              if (e.gameObject instanceof Gameplay.Character || e.gameObject instanceof Core.GameObject) {
                PrefabEvent.PrefabEvtFight.hit(this.chara.guid, e.gameObject.guid, this.config.damage, e.impactPoint.clone());
                return;
              }
            }
            if (e instanceof Gameplay.Character || e instanceof Core.GameObject) {
              PrefabEvent.PrefabEvtFight.hit(this.chara.guid, e.guid, this.config.damage, e.worldLocation.clone());
              return;
            }
          });
        };
        PrefabEvent.PrefabEvtEquip.onEquip(async (targetGuid, slot, equipGuid) => {
          if (this.weaponObj && this.weaponObj.getCurrentOwner() && this.weaponObj.getCurrentOwner().guid == targetGuid && this.weaponObj.guid != equipGuid) {
            this.unEquip();
          }
        });
      }
    }
  }
  onEquipdChanged() {
    this.weaponEntityRoot.relativeRotation = Rotation.zero;
  }
  onUpdate(dt) {
    if (Util.SystemUtil.isServer())
      return;
    if (this.weaponObj == null) {
      this.weaponObj = this.gameObject;
      if (this.weaponObj == null)
        return;
      this.clientInit();
    }
    if (!this.isEquiped && this.weaponEntityRoot) {
      this._rotateRotation.z = this.config.rotateSpeed * dt;
      this.weaponEntityRoot.worldRotation = this.weaponEntityRoot.worldRotation.add(this._rotateRotation);
      return;
    }
    for (let i = 0; i < this.ammoArray.length; i++) {
      if (this.ammoArray[i].update(dt)) {
        if (this.ammoArray[i].owner == this.chara) {
          this.serverDestroyAmmo(i);
          this.hit(this.ammoArray[i].hitResult);
          this.ammoArray[i].destroy();
          this.ammoArray.splice(i, 1);
          i--;
        }
      }
    }
    for (let i = 0; i < this.casingArray.length; i++) {
      if (this.casingArray[i].update(dt)) {
        this.casingArray[i].destroy();
        this.casingArray.splice(i, 1);
        i--;
      }
    }
    if (this.weaponObj.getCurrentOwner() !== this.chara)
      return;
    if (this.isCanFire != 0) {
      this.isCanFire -= dt;
      if (this.isCanFire < 0) {
        this.isCanFire = 0;
      }
    }
    this.cameraUpdate(dt);
    if (!this.updatebFiring()) {
      if (!this.bFiring && this.fireEffect.loop && this.fireSound.loop) {
        this.fireEffect.stop();
        this.fireSound.stop();
        if (!this.isAimming) {
          this.weaponObj.aimComponent.enableAiming(false);
        }
      }
    }
    if (!this.updateBlockFire()) {
      this.clientOnBlockChange(this.isBlock);
    }
    switch (this.weaponObj.getCurrentState()) {
      case Gameplay.HotWeaponState.Idle:
        if (this.weaponObj.fireComponent.currentBulletSize < 1) {
          if (this.isAutoReload) {
            this.startReload();
            this.isAutoReload = false;
            setTimeout(() => {
              this.isAutoReload = true;
            }, this.weaponObj.reloadComponent.reloadDuration * 1e3);
          }
        } else {
          if (this.isFiring && !this.bFiring && this.weaponObj.fireComponent.currentFireModel == 2) {
            this.startFire();
          }
        }
        break;
      case Gameplay.HotWeaponState.Reloading:
        break;
      case Gameplay.HotWeaponState.Loading:
        break;
      case Gameplay.HotWeaponState.Firing:
        if (this.config.isEmptyToDestroy && this.config.totalAmmo == 0 && this.weaponObj.fireComponent.currentBulletSize == 0) {
          this.unEquip();
        }
        break;
      default:
        break;
    }
    if (this.weaponUI) {
      if (this.config.keepTime != -1) {
        this._restTime -= dt;
        if (this._restTime <= 0) {
          this.unEquip();
        }
      }
    }
  }
  onDestroy() {
    this.clientDestroy();
  }
  hit(hitResult) {
    if (!(hitResult.length > 0))
      return;
    if (this.config.detectRadius > 10) {
      for (let element of hitResult) {
        let temp = element;
        if (temp instanceof Gameplay.CharacterBase) {
          this.hitCharacterMulticast(temp.worldLocation, temp.worldRotation);
        } else {
          this.hitObjectMulticast(temp.worldLocation, temp.worldRotation);
        }
      }
      if (this.config.hurtRadius > 10) {
        let sphereResult = Gameplay.sphereOverlap(hitResult[0].worldLocation, this.config.hurtRadius, GameDef.DEBUG_FLAG);
        this.clientOnHit(sphereResult, this.player.getPlayerID(), true);
      } else {
        this.clientOnHit(hitResult, this.player.getPlayerID(), true);
      }
    } else {
      for (let element of hitResult) {
        let temp = element;
        let rot = temp.impactNormal.toRotation();
        rot.y -= 90;
        if (temp.gameObject instanceof Gameplay.CharacterBase) {
          this.hitCharacterMulticast(temp.impactPoint, rot);
        } else {
          this.hitObjectMulticast(temp.impactPoint, rot);
        }
      }
      if (this.config.hurtRadius > 10) {
        let sphereResult = Gameplay.sphereOverlap(hitResult[0].impactPoint, this.config.hurtRadius, GameDef.DEBUG_FLAG);
        this.clientOnHit(sphereResult, this.player.getPlayerID(), true);
      } else {
        this.clientOnHit(hitResult, this.player.getPlayerID(), false);
      }
    }
  }
  hitCharacterMulticast(loc, rot) {
    this.hitCharaPerformance(loc, rot);
  }
  hitObjectMulticast(loc, rot) {
    this.hitObjectPerformance(loc, rot);
  }
  hitCharaPerformance(loc, rot) {
    EffectService.getInstance().playEffectAtLocation(this.hitCharaEffect.getSourceAssetGuid(), loc, 1, rot, this.hitCharaEffect.worldScale);
    SoundService.getInstance().play3DSound(this.hitCharaSound.getSourceAssetGuid(), loc, 1, 1, { maxDistance: 3e3 });
  }
  hitObjectPerformance(loc, rot) {
    EffectService.getInstance().playEffectAtLocation(this.hitEffect.getSourceAssetGuid(), loc, 1, rot, this.hitEffect.worldScale);
    SoundService.getInstance().play3DSound(this.hitSound.getSourceAssetGuid(), loc, 1, 1, { maxDistance: 3e3 });
  }
  playEffect(particle) {
  }
  playSound(sound) {
    sound.volume = WeaponDriver.soundVolume;
    sound.play();
  }
  serverDestroyAmmo(index) {
    this.clientDestroyAmmo(index);
  }
  clientDestroyAmmo(index) {
    if (!this.weaponObj) {
      return;
    }
    if (this.weaponObj.getCurrentOwner() == this.chara) {
      return;
    } else if (this.ammoArray.length != 0) {
      this.ammoArray[index].destroy();
      this.ammoArray.splice(index, 1);
    }
  }
  equip() {
    if (!this.chara && Util.SystemUtil.isClient()) {
      this.chara = Gameplay.getCurrentPlayer().character;
    }
    this.serverEquip(this.chara.player.getPlayerID());
  }
  unEquip() {
    if (this.chara !== this.weaponObj.getCurrentOwner())
      return;
    if (!this.weaponObj) {
      return;
    }
    if (this.isAimming) {
      this.weaponObj.accuracyOfFireComponent.maxDispersionHalfAngle = this.tempDispersionMax;
      this.weaponObj.accuracyOfFireComponent.defaultDispersionHalfAngle = this.tempDispersionDefault;
      this.isAimming = false;
    }
    this.weaponObj.stopFire();
    this.weaponObj.breakLoad();
    this.weaponObj.breakReload();
    this.weaponObj.destroy();
    this.weaponObj.unequipHotWeapon();
    this.weaponUI = null;
    this.chara.animationStance = this.tempanimationStance;
    this.chara.playAnimation(this.weaponAction.unequipAnimation);
    this.chara.moveFacingDirection = this.tempMoveFacingDirection;
    this.camera.cameraRelativeTransform = new Type.Transform(this.tempcameraOffset, this.camera.cameraRelativeTransform.rotation, this.camera.cameraRelativeTransform.scale);
    this.camera.cameraSystemRelativeTransform = new Type.Transform(this.temptargetArmOffset, this.camera.cameraRelativeTransform.rotation, this.camera.cameraRelativeTransform.scale);
    this.camera.cameraFOV = this.tempcameraFOV;
    this.camera.targetArmLength = this.temptargetArmLength;
    if (this.config.isAutoDestroy) {
      this.weaponObj = null;
      let destroyInterval = setInterval(() => {
        if (this.ammoArray.length == 0 && this.casingArray.length == 0) {
          this.serverDestroy();
          clearInterval(destroyInterval);
        }
      }, 100);
    }
  }
  serverHideWeaponEntity(playerID) {
    this.hideWeaponEntity();
  }
  hideWeaponEntity() {
    if (!this.weaponEntityRoot)
      return;
    this.weaponEntityRoot.setVisibility(Type.PropertyStatus.Off);
  }
  serverDestroy() {
    this.destroy();
  }
  startFire() {
    if (this.weaponObj == null || this.isCanFire != 0)
      return;
    this.weaponObj.startFire();
    this.isFiring = true;
    if (!this.isAimming) {
      this.weaponObj.aimComponent.enableAiming(true);
    }
  }
  stopFire() {
    if (this.weaponObj == null)
      return;
    this.weaponObj.stopFire();
    this.isFiring = false;
    if (!this.isAimming) {
      this.weaponObj.aimComponent.enableAiming(false);
    }
  }
  startReload() {
    if (this.weaponObj == null || !this.weaponObj.reloadEnable || this.weaponObj.fireComponent.currentBulletSize == this.weaponObj.fireComponent.currentClipSize)
      return;
    let ammoGap = this.weaponObj.fireComponent.currentClipSize - this.weaponObj.fireComponent.currentBulletSize;
    if (this.totalAmmo == -1) {
      this.weaponObj.reload(ammoGap);
    }
    if (this.totalAmmo <= 0) {
      return;
    }
    if (this.totalAmmo < ammoGap) {
      this.weaponObj.reload(this.totalAmmo);
      this.totalAmmo = 0;
    } else {
      this.weaponObj.reload(ammoGap);
      this.totalAmmo -= ammoGap;
    }
  }
  stopReload() {
    if (this.weaponObj == null)
      return;
    this.weaponObj.breakReload();
    this.weaponObj.breakLoad();
  }
  tempDispersionMax = 0;
  tempDispersionDefault = 0;
  startAim() {
    console.error("startAim");
    this.aimSound.stop();
    this.aimSound.play();
    this.chara.animationStance = this.weaponAction.aimStance;
    this.weaponObj.fireComponent.animationGuid = this.weaponAction.aimShootAnimation;
    this.tempDispersionDefault = this.weaponObj.accuracyOfFireComponent.defaultDispersionHalfAngle;
    this.tempDispersionMax = this.weaponObj.accuracyOfFireComponent.maxDispersionHalfAngle;
    this.weaponObj.accuracyOfFireComponent.defaultDispersionHalfAngle = this.weaponObj.accuracyOfFireComponent.minDispersionHalfAngle;
    this.weaponObj.accuracyOfFireComponent.maxDispersionHalfAngle = this.weaponObj.accuracyOfFireComponent.minDispersionHalfAngle;
    this.isZooming = true;
    this.zoomIn();
    if (this.config.isWeaponHaveScope) {
      this.camera.targetArmLength = 0;
    }
  }
  stopAim() {
    console.error("stopAim");
    this.weaponObj.accuracyOfFireComponent.maxDispersionHalfAngle = this.tempDispersionMax;
    this.weaponObj.accuracyOfFireComponent.defaultDispersionHalfAngle = this.tempDispersionDefault;
    this.chara.animationStance = this.weaponAction.holdStance;
    this.weaponObj.fireComponent.animationGuid = this.weaponAction.shootAnimation;
    this.isZooming = true;
    this.zoomOut();
    if (this.config.isWeaponHaveScope) {
      this.camera.targetArmLength = 400;
    }
    this.aimSound.stop();
    this.aimSound.play();
  }
  startLoad() {
  }
  endLoad() {
  }
  getBulletSize() {
    if (this.weaponObj == null)
      return;
    return this.weaponObj.fireComponent.currentBulletSize;
  }
  clientDestroy() {
    if (this.pickUpTrigger) {
      this.pickUpTrigger.destroy();
    }
    if (this.weaponEntityRoot) {
      this.weaponEntityRoot.destroy();
    }
    if (this.ammoEntityRoot) {
      this.ammoEntityRoot.destroy();
    }
    if (this.casingEntity) {
      this.casingEntity.destroy();
    }
    if (this.fireEffect) {
      this.fireEffect.destroy();
    }
    if (this.fireSound) {
      this.fireSound.destroy();
    }
    if (this.hitCharaEffect) {
      this.hitCharaEffect.destroy();
    }
    if (this.hitCharaSound) {
      this.hitCharaSound.destroy();
    }
    if (this.hitEffect) {
      this.hitEffect.destroy();
    }
    if (this.hitSound) {
      this.hitSound.destroy();
    }
    if (this.reloadSound) {
      this.reloadSound.destroy();
    }
    if (this.aimSound) {
      this.aimSound.destroy();
    }
    if (this.loadSound) {
      this.loadSound.destroy();
    }
  }
  initAssets(assetIds) {
    for (let element of assetIds) {
      Util.AssetUtil.asyncDownloadAsset(element);
    }
  }
  serverInit() {
    this.serverInitDelegate();
  }
  serverInitDelegate() {
    this.weaponObj.onEquippedServer.add(this.onServerEquip.bind(this));
    this.weaponObj.onUnequippedServer.add(this.onServerUnequip.bind(this));
    this.weaponObj.fireComponent.onStartFireServer.add(this.onServerStartFire.bind(this));
    this.weaponObj.fireComponent.onEndFireServer.add(this.onServerEndFire.bind(this));
    if (this.weaponObj.reloadComponent) {
      this.weaponObj.reloadComponent.onStartReloadServer.add(this.onServerStartReload.bind(this));
      this.weaponObj.reloadComponent.onEndReloadServer.add(this.onServerEndReload.bind(this));
    }
    if (this.weaponObj.loadComponent) {
      this.weaponObj.loadComponent.onStartLoadServer.add(this.onServerStartLoad.bind(this));
      this.weaponObj.loadComponent.onEndLoadServer.add(this.onServerEndLoad.bind(this));
    }
    if (this.weaponObj.aimComponent) {
      this.weaponObj.aimComponent.onAimStartServer.add(this.onServerStartAim.bind(this));
      this.weaponObj.aimComponent.onAimEndServer.add(this.onServerEndAim.bind(this));
    }
    if (this.weaponObj.recoilForceComponent) {
      this.weaponObj.recoilForceComponent.onStartRecoilForceServer.add(this.onServerStartRecoil.bind(this));
    }
  }
  onServerEquip() {
    console.error("ServerEquip " + this.weaponObj.getCurrentOwner().characterName);
    if (!this.weaponObj.getCurrentOwner())
      return;
    let v2 = this.weaponObj.getCurrentOwner().setAppearance(Gameplay.HumanoidV2);
    if (v2.getSomatotype() % 2 == 0) {
      console.error("female");
      this.changeWeaponAction(0);
      this.clientEquip(this.weaponObj.getCurrentOwner().player, 0);
    } else {
      console.error("male");
      this.changeWeaponAction(1);
      this.clientEquip(this.weaponObj.getCurrentOwner().player, 1);
    }
  }
  onServerUnequip() {
    console.error("onServerUnequip");
  }
  onServerStartFire() {
  }
  onServerEndFire() {
  }
  onServerStartReload() {
  }
  onServerEndReload() {
  }
  onServerStartLoad() {
  }
  onServerEndLoad() {
  }
  onServerStartAim() {
  }
  onServerEndAim() {
  }
  onServerStartRecoil() {
  }
  _isInited = false;
  clientInit() {
    if (this._isInited) {
      return;
    }
    this._isInited = true;
    Gameplay.asyncGetCurrentPlayer().then((player) => {
      this.player = player;
      this.chara = this.player.character;
      this.camera = this.chara.cameraSystem;
      this.clientInitWeaponEntityRoot();
      this.clientInitPickUpTrigger();
      this.clientInitAmmoEntityRoot();
      this.clientInitCasingEntity();
      this.clientInitHitCharaEffect();
      this.clientInitHitEffect();
      this.clientInitFireEffect();
      this.clientInitFireSound();
      this.clientInitReloadSound();
      this.clientInitLoadSound();
      this.clientInitAimSound();
      this.clientInitHitCharaSound();
      this.clientInitHitSound();
      this.clientInitDelegate();
    });
  }
  clientInitWeaponEntityRoot() {
    this.weaponEntityRoot = this.weaponObj.getChildByName("weaponEntityRoot");
  }
  clientInitPickUpTrigger() {
    this.pickUpTrigger = this.weaponObj.getChildByName("pickUpTrigger");
    if (this.pickUpTrigger) {
      this.pickUpTrigger.onEnter.add((chara) => {
        if (!(chara instanceof Gameplay.Character))
          return;
        if (chara === this.chara) {
          this.serverEquip(this.player.getPlayerID());
        }
      });
    }
  }
  serverEquip(playerID) {
    let player = Gameplay.getPlayer(playerID);
    if (player == null || !this.weaponObj)
      return;
    this.weaponObj.equipment(player.character, this.config.equipmentSlot);
    this.isEquiped = true;
    PrefabEvent.PrefabEvtEquip.equip(player.character.guid, PrefabEvent.EquipSlot.Weapon, this.weaponObj.guid);
  }
  changeWeaponAction(sex) {
    console.error("changeWeaponAction " + sex);
    sex == 0 ? this.weaponAction = GameConfig.Action.getElement(this.config.femaleAction) : this.weaponAction = GameConfig.Action.getElement(this.config.maleAction);
    if (this.weaponObj) {
      this.weaponObj.fireComponent.animationGuid = this.weaponAction.shootAnimation;
      if (this.weaponObj.reloadEnable) {
        this.weaponObj.reloadComponent.animationGuid = this.weaponAction.reloadAnimation;
      }
      if (this.weaponObj.loadEnable) {
        this.weaponObj.loadComponent.animationGuid = this.weaponAction.loadAnimation;
      }
    }
  }
  tempMoveFacingDirection;
  temptargetArmLength;
  tempcameraFOV;
  tempcameraOffset;
  temptargetArmOffset;
  tempanimationStance;
  clientEquip(pickPlayer, gender) {
    if (!this.camera) {
      this.camera = Gameplay.getCurrentPlayer().character.cameraSystem;
    }
    if (!this.weaponObj) {
      this.weaponObj = this.gameObject;
    }
    this.weaponObj.equipment(this.chara, this.config.equipmentSlot);
    this.changeWeaponAction(gender);
    this.tempMoveFacingDirection = this.chara.moveFacingDirection;
    this.tempanimationStance = this.chara.animationStance;
    this.temptargetArmLength = this.camera.targetArmLength;
    this.temptargetArmOffset = this.camera.cameraSystemRelativeTransform.location;
    this.tempcameraFOV = this.camera.cameraFOV;
    this.tempcameraOffset = this.camera.cameraRelativeTransform.location;
    this.chara.animationStance = this.weaponAction.holdStance;
    this.chara.playAnimation(this.weaponAction.equipAnimation);
    this.chara.moveFacingDirection = Gameplay.MoveFacingDirection.ControllerDirection;
    this.camera.targetArmLength = 400;
    this.camera.cameraFOV = this.config.equipmentCameraFov;
    this.camera.cameraRelativeTransform = new Type.Transform(this.config.equipmentCameraOffset, this.camera.cameraRelativeTransform.rotation, this.camera.cameraRelativeTransform.scale);
    this.camera.cameraSystemRelativeTransform = new Type.Transform(new Type.Vector(0, 0, 60), this.camera.cameraRelativeTransform.rotation, this.camera.cameraRelativeTransform.scale);
    this.weaponUI = UI.UIManager.instance.show(WeaponUI, this, this.weaponObj.accuracyOfFireEnable ? this.weaponObj.accuracyOfFireComponent.defaultDispersionHalfAngle : 0, this.config.weaponIcon, this.config.name);
    this.weaponUI.setTimeText(this.config.keepTime, this.config.keepTime);
    this.weaponUI.setReloadBtn(!this.config.isSupportRepAmmo);
    if (this.config.isSupportRepAmmo) {
      this.weaponObj.reloadComponent.animationGuid = this.weaponAction.aimShootAnimation;
      this.weaponObj.loadComponent.animationGuid = this.weaponAction.aimShootAnimation;
    }
    this._restTime = this.config.keepTime;
  }
  changeFov(value) {
    this.camera.cameraFOV = value;
  }
  async clientInitAmmoEntityRoot() {
    this.ammoEntityRoot = await GameObject.asyncSpawn({ guid: this.weaponResources.ammo });
    this.ammoEntityRoot.parent = this.weaponObj;
    this.ammoPool = new GameDef.SimpleObjectPool(this.instanceAmmo.bind(this), (obj) => {
      obj.destroy();
    }, (obj) => {
      obj.setVisibility(Type.PropertyStatus.Off);
    });
  }
  async clientInitCasingEntity() {
    this.casingEntity = await GameObject.asyncSpawn({ guid: this.weaponResources.casing });
    this.casingEntity.parent = this.weaponObj;
    this.casingPool = new GameDef.SimpleObjectPool(this.instanceCasing.bind(this), (obj) => {
      obj.destroy();
    }, (obj) => {
      obj.setVisibility(Type.PropertyStatus.Off);
    });
  }
  async clientInitHitCharaEffect() {
    this.hitCharaEffect = await GameObject.asyncSpawn({ guid: this.weaponResources.hitRoleEffect });
    this.hitCharaEffect.parent = this.weaponObj;
    this.hitCharaEffectPool = new GameDef.SimpleObjectPool(this.instanceHitCharaEffect.bind(this), (particle) => {
      particle.destroy();
    }, (particle) => {
      particle.detachFromGameObject();
      particle.forceStop();
    });
  }
  async clientInitHitEffect() {
    this.hitEffect = await GameObject.asyncSpawn({ guid: this.weaponResources.hitOtherEffect });
    this.hitEffect.parent = this.weaponObj;
    this.hitEffectPool = new GameDef.SimpleObjectPool(this.instanceHitEffect.bind(this), (particle) => {
      particle.destroy();
    }, (particle) => {
      particle.detachFromGameObject();
      particle.forceStop();
    });
  }
  async clientInitFireEffect() {
    this.fireEffect = await GameObject.asyncSpawn({ guid: this.weaponResources.fireEffect });
    this.fireEffect.parent = this.weaponObj;
  }
  async clientInitFireSound() {
    this.fireSound = await GameObject.asyncSpawn({ guid: this.weaponResources.fireSound });
    this.fireSound.parent = this.weaponObj;
  }
  async clientInitReloadSound() {
    this.reloadSound = await GameObject.asyncSpawn({ guid: this.weaponResources.reloadSound });
    this.reloadSound.parent = this.weaponObj;
  }
  async clientInitLoadSound() {
    this.loadSound = await GameObject.asyncSpawn({ guid: this.weaponResources.loadSound });
    this.loadSound.parent = this.weaponObj;
  }
  async clientInitAimSound() {
    this.aimSound = await GameObject.asyncSpawn({ guid: this.weaponResources.aimSound });
    this.aimSound.parent = this.weaponObj;
  }
  async clientInitHitCharaSound() {
    this.hitCharaSound = await GameObject.asyncSpawn({ guid: this.weaponResources.hitRoleSound });
    this.hitCharaSound.parent = this.weaponObj;
    this.hitCharaSoundPool = new GameDef.SimpleObjectPool(this.instanceHitCharaSound.bind(this), (sound) => {
      sound.destroy();
    }, (sound) => {
      sound.stop();
    });
  }
  async clientInitHitSound() {
    this.hitSound = await GameObject.asyncSpawn({ guid: this.weaponResources.hitOtherSound });
    this.hitSound.parent = this.weaponObj;
    this.hitSoundPool = new GameDef.SimpleObjectPool(this.instanceHitSound.bind(this), (sound) => {
      sound.destroy();
    }, (sound) => {
      sound.stop();
    });
  }
  instanceAmmo() {
    let ammo = this.ammoEntityRoot.clone(false);
    ammo.detachFromGameObject();
    ammo.setVisibility(Type.PropertyStatus.On);
    return ammo;
  }
  instanceCasing() {
    let casing = this.casingEntity.clone(false);
    casing.detachFromGameObject();
    casing.setVisibility(Type.PropertyStatus.On);
    return casing;
  }
  instanceHitCharaEffect() {
    let hitChara = this.hitCharaEffect.clone(false);
    hitChara.detachFromGameObject();
    return hitChara;
  }
  instanceHitEffect() {
    let hit = this.hitEffect.clone(false);
    hit.detachFromGameObject();
    return hit;
  }
  instanceHitCharaSound() {
    let hitChara = this.hitCharaSound.clone(false);
    hitChara.detachFromGameObject();
    return hitChara;
  }
  instanceHitSound() {
    let hit = this.hitSound.clone(false);
    hit.detachFromGameObject();
    return hit;
  }
  clientInitDelegate() {
    this.weaponObj.onEquippedClient.add(this.onClientEquip.bind(this));
    this.weaponObj.onUnequippedClient.add(this.onClientUnequip.bind(this));
    this.weaponObj.fireComponent.onStartFireClient.add(this.onClientStartFire.bind(this));
    this.weaponObj.fireComponent.onEndFireClient.add(this.onClientEndFire.bind(this));
    if (this.weaponObj.reloadEnable) {
      this.weaponObj.reloadComponent.onStartReloadClient.add(this.onClientStartReload.bind(this));
      this.weaponObj.reloadComponent.onEndReloadClient.add(this.onClientEndReload.bind(this));
    }
    if (this.weaponObj.loadEnable) {
      this.weaponObj.loadComponent.onStartLoadClient.add(this.onClientStartLoad.bind(this));
      this.weaponObj.loadComponent.onEndLoadClient.add(this.onClientEndLoad.bind(this));
    }
    if (this.weaponObj.aimEnable) {
      this.weaponObj.aimComponent.onAimStartClient.add(this.onClientStartAim.bind(this));
      this.weaponObj.aimComponent.onAimEndClient.add(this.onClientEndAim.bind(this));
    }
    if (this.weaponObj.recoilForceEnable) {
      this.weaponObj.recoilForceComponent.onStartRecoilForceClient.add(this.onClientStartRecoil.bind(this));
    }
    if (this.weaponObj.accuracyOfFireEnable) {
      this.weaponObj.accuracyOfFireComponent.onCurrentDispersionChangedClient.add(this.onClientCurrentDispersionChanged.bind(this));
    }
    this.clientOnBlockChange = (isBlock) => {
      console.error("isBlock " + isBlock);
    };
  }
  onClientEquip() {
    console.error("ClientEquip");
    if (this.pickUpTrigger) {
      console.error("destroy trigger");
      this.pickUpTrigger.setCollisionEnabled(false);
    }
    if (!this.weaponEntityRoot) {
      this.weaponEntityRoot.setVisibility(Type.PropertyStatus.On);
    }
  }
  onClientUnequip() {
    console.error("onClientUnequip");
    if (!this.weaponObj)
      return;
    if (this.config.isAutoDestroy) {
      this.weaponObj.setVisibility(Type.PropertyStatus.Off);
      this.weaponObj = null;
    } else {
      if (this.pickUpTrigger) {
        this.weaponObj.worldRotation = new Type.Rotation(0, 0, 1);
        this.weaponObj.worldLocation = Type.Vector.add(this.weaponObj.getRightVector().multiply(100), this.weaponObj.worldLocation, this.weaponObj.worldLocation);
        this.pickUpTrigger.setCollisionEnabled(true);
      }
    }
  }
  onClientStartFire() {
    if (!this.weaponObj) {
      return;
    }
    this.isCanFire = this.weaponObj.fireComponent.currentFireInterval;
    if (!this.fireEffect.loop) {
      this.fireEffect.stop();
    }
    this.fireEffect.play();
    if (!this.fireSound.loop) {
      this.fireSound.stop();
    }
    this.fireSound.play();
    if (this.weaponObj.getCurrentOwner() == this.chara) {
      if (this.ammoEntityRoot.getChildren().length > 0) {
        for (let i = 0; i < this.weaponObj.fireComponent.currentMultipleShot; i++) {
          let cameraShootDir = this.camera.cameraWorldTransform.getForwardVector().clone();
          if (this.weaponObj.accuracyOfFireEnable) {
            cameraShootDir = this.weaponObj.accuracyOfFireComponent.getRandomShootDir(cameraShootDir).clone();
          }
          let endLoc = cameraShootDir.multiply(GameDef.SHOOT_RANGE).add(this.camera.cameraWorldTransform.location);
          let shootDir = endLoc.clone().subtract(this.ammoEntityRoot.worldLocation);
          let hitRes = Gameplay.lineTrace(this.camera.cameraWorldTransform.location, endLoc, true, GameDef.DEBUG_FLAG);
          hitRes = hitRes.filter((e) => {
            return !(e.gameObject instanceof Gameplay.Trigger);
          });
          if (hitRes && hitRes.length > 0 && Type.Vector.dot(hitRes[0].location.clone().subtract(this.ammoEntityRoot.worldLocation), shootDir) > 0) {
            shootDir = hitRes[0].impactPoint.clone().subtract(this.ammoEntityRoot.worldLocation);
          }
          let ammoDirection = shootDir.normalized;
          if (this.config.ammoSpeed < GameDef.MAX_SHOOTSPEED || this.isBlock) {
            this.serverFire(this.ammoEntityRoot.worldLocation.clone(), ammoDirection);
            if (this.ammoArray.length > this.weaponObj.fireComponent.currentClipSize) {
              let discardAmmo = this.ammoArray.shift();
              discardAmmo.destroy();
            }
            this.ammoArray.push(new Ammo(this.chara, this.ammoPool, this.ammoEntityRoot.worldLocation, ammoDirection, this.config.shootRange, this.config.ammoSpeed, this.config.gravityScale, this.config.detectRadius));
          } else {
            this.serverFire(this.ammoEntityRoot.worldLocation.clone(), ammoDirection);
            if (this.ammoArray.length > this.weaponObj.fireComponent.currentClipSize) {
              let discardAmmo = this.ammoArray.shift();
              discardAmmo.destroy();
            }
            if (hitRes.length > 0) {
              this.ammoArray.push(new Ammo(this.chara, this.ammoPool, this.ammoEntityRoot.worldLocation, ammoDirection, shootDir.length, this.config.ammoSpeed, this.config.gravityScale, 0, hitRes));
            } else {
              this.ammoArray.push(new Ammo(this.chara, this.ammoPool, this.ammoEntityRoot.worldLocation, ammoDirection, shootDir.length, this.config.ammoSpeed, this.config.gravityScale, 0));
            }
          }
        }
        if (this.config.isWeaponHaveCasing) {
          this.casingArray.push(new Casing(this.casingPool, this.casingEntity, this.weaponEntityRoot.getRightVector().clone()));
        }
      } else {
        let cameraShootDir = this.camera.cameraWorldTransform.getForwardVector().clone();
        if (this.weaponObj.accuracyOfFireEnable) {
          cameraShootDir = this.weaponObj.accuracyOfFireComponent.getRandomShootDir(cameraShootDir).clone();
        }
        let endLoc = cameraShootDir.multiply(GameDef.SHOOT_RANGE).add(this.camera.cameraWorldTransform.location);
        let shootDir = endLoc.clone().subtract(this.ammoEntityRoot.worldLocation);
        let hitRes = Gameplay.lineTrace(this.camera.cameraWorldTransform.location, endLoc, true, GameDef.DEBUG_FLAG);
        hitRes = hitRes.filter((e) => {
          return !(e.gameObject instanceof Gameplay.Trigger);
        });
        if (hitRes && hitRes.length > 0 && Type.Vector.dot(hitRes[0].location.clone().subtract(this.ammoEntityRoot.worldLocation), shootDir) > 0) {
          shootDir = hitRes[0].impactPoint.clone().subtract(this.ammoEntityRoot.worldLocation);
        }
        let ammoDirection = shootDir.normalized;
        this.weaponObj.worldRotation = ammoDirection.toRotation();
        let end = ammoDirection.clone().multiply(this.config.shootRange).add(this.ammoEntityRoot.worldLocation);
        if (this.config.detectRadius < 10) {
          let lineResult = Gameplay.lineTrace(this.ammoEntityRoot.worldLocation, end, true, GameDef.DEBUG_FLAG);
          lineResult = lineResult.filter((e) => {
            return !(e.gameObject instanceof Gameplay.Trigger);
          });
          this.hit(lineResult);
        } else {
          let boxResult = Gameplay.boxOverlapInLevel(this.ammoEntityRoot.worldLocation, end, this.config.detectRadius, this.config.detectRadius, GameDef.DEBUG_FLAG);
          this.hit(boxResult);
        }
      }
    }
  }
  updateBlockFire() {
    let flag = this.isBlock;
    let lineResultMuzzle = Gameplay.lineTrace(
      this.ammoEntityRoot.worldLocation,
      this.ammoEntityRoot.getForwardVector().multiply(this.config.fireBlockDistance).add(this.ammoEntityRoot.worldLocation),
      true,
      GameDef.DEBUG_FLAG
    );
    lineResultMuzzle = lineResultMuzzle.filter((e) => {
      return !(e.gameObject instanceof Gameplay.Trigger);
    });
    if (lineResultMuzzle.length > 0) {
      this.isBlock = true;
    } else {
      this.isBlock = false;
    }
    return this.isBlock == flag;
  }
  updatebFiring() {
    let flag = this.bFiring;
    this.bFiring = this.weaponObj.fireComponent.isFiring();
    return this.bFiring == flag;
  }
  serverFire(startLoc, direction) {
    this.clientMulticastLaunch(startLoc, direction);
  }
  clientMulticastLaunch(startLoc, direction) {
    if (this.weaponObj.getCurrentOwner() == this.chara) {
      return;
    } else {
      if (this.ammoArray.length > this.weaponObj.fireComponent.currentClipSize) {
        let discardAmmo = this.ammoArray.shift();
        discardAmmo.destroy();
      }
      this.ammoArray.push(new Ammo(null, this.ammoPool, startLoc, direction, this.config.shootRange, this.config.ammoSpeed, this.config.gravityScale, 0));
    }
  }
  onClientEndFire() {
  }
  onClientStartReload() {
    this.reloadSound.play();
  }
  onClientEndReload() {
    this.reloadSound.stop();
  }
  onClientStartLoad() {
    this.loadSound.play();
  }
  onClientEndLoad() {
    this.loadSound.stop();
  }
  onClientStartAim() {
  }
  onClientEndAim() {
  }
  onClientStartRecoil() {
  }
  onClientCurrentDispersionChanged() {
    if (this.weaponUI) {
      this.weaponUI.changeCross(this.weaponObj.accuracyOfFireComponent.getCurrentDispersionHalfAngle() * 10);
    }
  }
  zoomIn() {
    if (this.camera == null)
      return;
    console.error("zoomin");
    this.isAimming = true;
  }
  zoomOut() {
    if (this.camera == null)
      return;
    console.error("zoomOut");
    this.isAimming = false;
  }
  cameraUpdate(dt) {
    if (!this.isZooming)
      return;
    if (this.isAimming) {
      this.camera.cameraFOV -= dt * this.config.aimSpeed;
      if (this.camera.cameraFOV < this.config.aimCameraFov) {
        this.camera.cameraFOV = this.config.aimCameraFov;
        this.isZooming = false;
      }
    } else {
      this.camera.cameraFOV += dt * this.config.aimSpeed;
      if (this.camera.cameraFOV > this.config.equipmentCameraFov) {
        this.camera.cameraFOV = this.config.equipmentCameraFov;
        this.isZooming = false;
      }
    }
  }
  resolveString(assetIds) {
    let assetIdArray = new Array();
    let assetId = "";
    let s = assetIds.split("");
    for (let a of s) {
      if (a == ",") {
        assetIdArray.push(assetId);
        assetId = "";
      } else {
        assetId += a;
      }
    }
    if (assetId) {
      assetIdArray.push(assetId);
    }
    return assetIdArray;
  }
};
__publicField(WeaponDriver, "soundVolume", 1);
__decorateClass([
  Core.Property({ hideInEditor: true, replicated: true, onChanged: "onEquipdChanged" })
], WeaponDriver.prototype, "isEquiped", 2);
__decorateClass([
  Core.Function(Core.Server)
], WeaponDriver.prototype, "hitCharacterMulticast", 1);
__decorateClass([
  Core.Function(Core.Server)
], WeaponDriver.prototype, "hitObjectMulticast", 1);
__decorateClass([
  Core.Function(Core.Client, Core.Multicast)
], WeaponDriver.prototype, "hitCharaPerformance", 1);
__decorateClass([
  Core.Function(Core.Client, Core.Multicast)
], WeaponDriver.prototype, "hitObjectPerformance", 1);
__decorateClass([
  Core.Function(Core.Server)
], WeaponDriver.prototype, "serverDestroyAmmo", 1);
__decorateClass([
  Core.Function(Core.Client, Core.Multicast)
], WeaponDriver.prototype, "clientDestroyAmmo", 1);
__decorateClass([
  Core.Function(Core.Server)
], WeaponDriver.prototype, "serverHideWeaponEntity", 1);
__decorateClass([
  Core.Function(Core.Client, Core.Multicast)
], WeaponDriver.prototype, "hideWeaponEntity", 1);
__decorateClass([
  Core.Function(Core.Server)
], WeaponDriver.prototype, "serverDestroy", 1);
__decorateClass([
  Core.Function(Core.Server)
], WeaponDriver.prototype, "serverEquip", 1);
__decorateClass([
  Core.Function(Core.Client)
], WeaponDriver.prototype, "clientEquip", 1);
__decorateClass([
  Core.Function(Core.Server)
], WeaponDriver.prototype, "serverFire", 1);
__decorateClass([
  Core.Function(Core.Client, Core.Multicast)
], WeaponDriver.prototype, "clientMulticastLaunch", 1);
WeaponDriver = __decorateClass([
  Core.Class
], WeaponDriver);

// JavaScripts/ui-generate/DefaultUI_generate.ts
var DefaultUI_generate_exports = {};
__export(DefaultUI_generate_exports, {
  default: () => DefaultUI_Generate
});
var DefaultUI_Generate = class extends UI.UIBehavior {
  onAwake() {
  }
};
DefaultUI_Generate = __decorateClass([
  UI.UICallOnly("UI/DefaultUI.ui")
], DefaultUI_Generate);

// <stdin>
var foreign14 = __toESM(require_build());
var MWModuleMap = {
  "JavaScripts/Config/Action": Action_exports,
  "JavaScripts/Config/ConfigBase": ConfigBase_exports,
  "JavaScripts/Config/GameConfig": GameConfig_exports,
  "JavaScripts/Config/WeaponConfig": WeaponConfig_exports,
  "JavaScripts/Config/WeaponResources": WeaponResources_exports,
  "JavaScripts/DefaultUI": DefaultUI_exports,
  "JavaScripts/GameDef": GameDef_exports,
  "JavaScripts/WeaponBase/AmmoBaseCls": AmmoBaseCls_exports,
  "JavaScripts/WeaponBase/CasingBaseCls": CasingBaseCls_exports,
  "JavaScripts/WeaponBase/WeaponBaseCls": WeaponBaseCls_exports,
  "JavaScripts/WeaponBase/WeaponUI": WeaponUI_exports,
  "JavaScripts/ui-generate/DefaultUI_generate": DefaultUI_generate_exports,
  "JavaScripts/ui-generate/WeaponUI_generate": WeaponUI_generate_exports,
  "build": foreign14,
  "prefabEvent/PrefabEvent": PrefabEvent_exports,
  "prefabEvent/PrefabEventModule": PrefabEventModule_exports
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYnVpbGQudHMiLCAiPHN0ZGluPiIsICJKYXZhU2NyaXB0cy9Db25maWcvQWN0aW9uLnRzIiwgIkphdmFTY3JpcHRzL0NvbmZpZy9Db25maWdCYXNlLnRzIiwgIkphdmFTY3JpcHRzL0NvbmZpZy9HYW1lQ29uZmlnLnRzIiwgIkphdmFTY3JpcHRzL0NvbmZpZy9XZWFwb25Db25maWcudHMiLCAiSmF2YVNjcmlwdHMvQ29uZmlnL1dlYXBvblJlc291cmNlcy50cyIsICJKYXZhU2NyaXB0cy9EZWZhdWx0VUkudHMiLCAiSmF2YVNjcmlwdHMvR2FtZURlZi50cyIsICJKYXZhU2NyaXB0cy9XZWFwb25CYXNlL0FtbW9CYXNlQ2xzLnRzIiwgIkphdmFTY3JpcHRzL1dlYXBvbkJhc2UvQ2FzaW5nQmFzZUNscy50cyIsICJKYXZhU2NyaXB0cy9XZWFwb25CYXNlL1dlYXBvbkJhc2VDbHMudHMiLCAiSmF2YVNjcmlwdHMvV2VhcG9uQmFzZS9XZWFwb25VSS50cyIsICJKYXZhU2NyaXB0cy91aS1nZW5lcmF0ZS9XZWFwb25VSV9nZW5lcmF0ZS50cyIsICJwcmVmYWJFdmVudC9QcmVmYWJFdmVudC50cyIsICJwcmVmYWJFdmVudC9QcmVmYWJFdmVudE1vZHVsZS50cyIsICJKYXZhU2NyaXB0cy91aS1nZW5lcmF0ZS9EZWZhdWx0VUlfZ2VuZXJhdGUudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIiIsICJpbXBvcnQgKiBhcyBmb3JlaWduMSBmcm9tICcuL0phdmFTY3JpcHRzL0NvbmZpZy9BY3Rpb24nO1xuaW1wb3J0ICogYXMgZm9yZWlnbjIgZnJvbSAnLi9KYXZhU2NyaXB0cy9Db25maWcvQ29uZmlnQmFzZSc7XG5pbXBvcnQgKiBhcyBmb3JlaWduMyBmcm9tICcuL0phdmFTY3JpcHRzL0NvbmZpZy9HYW1lQ29uZmlnJztcbmltcG9ydCAqIGFzIGZvcmVpZ240IGZyb20gJy4vSmF2YVNjcmlwdHMvQ29uZmlnL1dlYXBvbkNvbmZpZyc7XG5pbXBvcnQgKiBhcyBmb3JlaWduNSBmcm9tICcuL0phdmFTY3JpcHRzL0NvbmZpZy9XZWFwb25SZXNvdXJjZXMnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjYgZnJvbSAnLi9KYXZhU2NyaXB0cy9EZWZhdWx0VUknO1xuaW1wb3J0ICogYXMgZm9yZWlnbjcgZnJvbSAnLi9KYXZhU2NyaXB0cy9HYW1lRGVmJztcbmltcG9ydCAqIGFzIGZvcmVpZ244IGZyb20gJy4vSmF2YVNjcmlwdHMvV2VhcG9uQmFzZS9BbW1vQmFzZUNscyc7XG5pbXBvcnQgKiBhcyBmb3JlaWduOSBmcm9tICcuL0phdmFTY3JpcHRzL1dlYXBvbkJhc2UvQ2FzaW5nQmFzZUNscyc7XG5pbXBvcnQgKiBhcyBmb3JlaWduMTAgZnJvbSAnLi9KYXZhU2NyaXB0cy9XZWFwb25CYXNlL1dlYXBvbkJhc2VDbHMnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjExIGZyb20gJy4vSmF2YVNjcmlwdHMvV2VhcG9uQmFzZS9XZWFwb25VSSc7XG5pbXBvcnQgKiBhcyBmb3JlaWduMTIgZnJvbSAnLi9KYXZhU2NyaXB0cy91aS1nZW5lcmF0ZS9EZWZhdWx0VUlfZ2VuZXJhdGUnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjEzIGZyb20gJy4vSmF2YVNjcmlwdHMvdWktZ2VuZXJhdGUvV2VhcG9uVUlfZ2VuZXJhdGUnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjE0IGZyb20gJy4vYnVpbGQnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjE1IGZyb20gJy4vcHJlZmFiRXZlbnQvUHJlZmFiRXZlbnQnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjE2IGZyb20gJy4vcHJlZmFiRXZlbnQvUHJlZmFiRXZlbnRNb2R1bGUnO1xuXG5leHBvcnQgY29uc3QgTVdNb2R1bGVNYXAgPSB7IFxuICAgICAnSmF2YVNjcmlwdHMvQ29uZmlnL0FjdGlvbic6IGZvcmVpZ24xLFxuICAgICAnSmF2YVNjcmlwdHMvQ29uZmlnL0NvbmZpZ0Jhc2UnOiBmb3JlaWduMixcbiAgICAgJ0phdmFTY3JpcHRzL0NvbmZpZy9HYW1lQ29uZmlnJzogZm9yZWlnbjMsXG4gICAgICdKYXZhU2NyaXB0cy9Db25maWcvV2VhcG9uQ29uZmlnJzogZm9yZWlnbjQsXG4gICAgICdKYXZhU2NyaXB0cy9Db25maWcvV2VhcG9uUmVzb3VyY2VzJzogZm9yZWlnbjUsXG4gICAgICdKYXZhU2NyaXB0cy9EZWZhdWx0VUknOiBmb3JlaWduNixcbiAgICAgJ0phdmFTY3JpcHRzL0dhbWVEZWYnOiBmb3JlaWduNyxcbiAgICAgJ0phdmFTY3JpcHRzL1dlYXBvbkJhc2UvQW1tb0Jhc2VDbHMnOiBmb3JlaWduOCxcbiAgICAgJ0phdmFTY3JpcHRzL1dlYXBvbkJhc2UvQ2FzaW5nQmFzZUNscyc6IGZvcmVpZ245LFxuICAgICAnSmF2YVNjcmlwdHMvV2VhcG9uQmFzZS9XZWFwb25CYXNlQ2xzJzogZm9yZWlnbjEwLFxuICAgICAnSmF2YVNjcmlwdHMvV2VhcG9uQmFzZS9XZWFwb25VSSc6IGZvcmVpZ24xMSxcbiAgICAgJ0phdmFTY3JpcHRzL3VpLWdlbmVyYXRlL0RlZmF1bHRVSV9nZW5lcmF0ZSc6IGZvcmVpZ24xMixcbiAgICAgJ0phdmFTY3JpcHRzL3VpLWdlbmVyYXRlL1dlYXBvblVJX2dlbmVyYXRlJzogZm9yZWlnbjEzLFxuICAgICAnYnVpbGQnOiBmb3JlaWduMTQsXG4gICAgICdwcmVmYWJFdmVudC9QcmVmYWJFdmVudCc6IGZvcmVpZ24xNSxcbiAgICAgJ3ByZWZhYkV2ZW50L1ByZWZhYkV2ZW50TW9kdWxlJzogZm9yZWlnbjE2LFxufVxuIiwgImltcG9ydCB7IENvbmZpZ0Jhc2UsIElFbGVtZW50QmFzZSB9IGZyb20gXCIuL0NvbmZpZ0Jhc2VcIjtcbmNvbnN0IEVYQ0VMREFUQTpBcnJheTxBcnJheTxhbnk+PiA9IFtbXCJpZFwiLFwic2V4XCIsXCJzaG9vdEFuaW1hdGlvblwiLFwiYWltU2hvb3RBbmltYXRpb25cIixcInJlbG9hZEFuaW1hdGlvblwiLFwibG9hZEFuaW1hdGlvblwiLFwiZXF1aXBBbmltYXRpb25cIixcInVuZXF1aXBBbmltYXRpb25cIixcImhvbGRTdGFuY2VcIixcImFpbVN0YW5jZVwiXSxbMSxcIm1hbGVcIiw4MDQ4NCw4MDQ4Myw4MDQ3OSw4MDQ4Miw4MDU4NSw4MDQ4MSw5NDI1OCw5NDI2MV0sWzIsXCJmZW1hbGVcIixcIjQ5MDk0XCIsXCI0OTA5NVwiLFwiODA0NzlcIixcIjgwNDgyXCIsXCI4MDU4NVwiLFwiODA0ODFcIixcIjQ5MDk2XCIsXCI0OTA5OFwiXV07XG5leHBvcnQgaW50ZXJmYWNlIElBY3Rpb25FbGVtZW50IGV4dGVuZHMgSUVsZW1lbnRCYXNle1xuIFx0LyoqXHU1MkE4XHU3NTNCSUQqL1xuXHRpZDpudW1iZXJcblx0LyoqXHU2MDI3XHU1MjJCKi9cblx0c2V4OnN0cmluZ1xuXHQvKipcdTVDMDRcdTUxRkJcdTUyQThcdTc1M0IqL1xuXHRzaG9vdEFuaW1hdGlvbjpzdHJpbmdcblx0LyoqXHU3Nzg0XHU1MUM2XHU1QzA0XHU1MUZCXHU1MkE4XHU3NTNCKi9cblx0YWltU2hvb3RBbmltYXRpb246c3RyaW5nXG5cdC8qKlx1NjM2Mlx1NUYzOVx1NTJBOFx1NzUzQiovXG5cdHJlbG9hZEFuaW1hdGlvbjpzdHJpbmdcblx0LyoqXHU0RTBBXHU4MTlCXHU1MkE4XHU3NTNCKi9cblx0bG9hZEFuaW1hdGlvbjpzdHJpbmdcblx0LyoqXHU4OEM1XHU1OTA3XHU2QjY2XHU1NjY4XHU1MkE4XHU3NTNCKi9cblx0ZXF1aXBBbmltYXRpb246c3RyaW5nXG5cdC8qKlx1NTM3OFx1OEY3RFx1NkI2Nlx1NTY2OFx1NTJBOFx1NzUzQiovXG5cdHVuZXF1aXBBbmltYXRpb246c3RyaW5nXG5cdC8qKlx1NjMwMVx1NjcwOVx1NTlGRlx1NjAwMSovXG5cdGhvbGRTdGFuY2U6c3RyaW5nXG5cdC8qKlx1Nzc4NFx1NTFDNlx1NTlGRlx1NjAwMSovXG5cdGFpbVN0YW5jZTpzdHJpbmdcbiB9IFxuZXhwb3J0IGNsYXNzIEFjdGlvbkNvbmZpZyBleHRlbmRzIENvbmZpZ0Jhc2U8SUFjdGlvbkVsZW1lbnQ+e1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHN1cGVyKEVYQ0VMREFUQSk7XG5cdH1cblxufSIsICJcbi8vXHU1MTQzXHU3RDIwXHU3Njg0XHU1N0ZBXHU3QzdCXG5leHBvcnQgaW50ZXJmYWNlIElFbGVtZW50QmFzZXtcblx0aWQ6bnVtYmVyO1xufVxuLy9cdTkxNERcdTdGNkVcdTc2ODRcdTU3RkFcdTdDN0JcbmV4cG9ydCBjbGFzcyBDb25maWdCYXNlPFQgZXh0ZW5kcyBJRWxlbWVudEJhc2U+e1xuXHRwcml2YXRlIHN0YXRpYyByZWFkb25seSBUQUdfS0VZOnN0cmluZyA9ICdLZXknOy8vXHU4QkZCXHU1M0Q2XHU5NTJFKFx1OTY2NFx1NEU4NklEXHU0RTRCXHU1OTE2XHU3Njg0XHU1MjJCXHU1NDBEXHVGRjBDXHU1RTI2a2V5XHU3Njg0XHU1QjU3XHU2QkI1XHU1RkM1XHU5ODdCXHU2NjJGc3RyaW5nXHU3QzdCXHU1NzhCKVxuXHRwcml2YXRlIHN0YXRpYyByZWFkb25seSBUQUdfTEFOR1VBR0U6c3RyaW5nID0gJ0xhbmd1YWdlJzsvL1x1NTE3M1x1ODA1NFx1OEJFRFx1OEEwMFx1ODg2OFx1NzY4NGlkXHU2MjE2a2V5KFx1NTk4Mlx1Njc5Q1x1NjcwOVx1OEZEOVx1NEUyQXRhZ1x1RkYwQ1x1NUJGQ1x1ODg2OFx1NURFNVx1NTE3N1x1ODk4MVx1NjI4QVx1NjU3MFx1NjM2RVx1NzUxRlx1NjIxMFx1NEUzQXN0cmluZ1x1N0M3Qlx1NTc4Qlx1RkYwQ1x1NTZFMFx1NEUzQVx1NEYxQVx1ODFFQVx1NTJBOFx1OEZEQlx1ODg0Q1x1NTAzQ1x1NzY4NFx1OEY2Q1x1NjM2Milcblx0cHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgVEFHX01BSU5MQU5HVUFHRTpzdHJpbmcgPSAnTWFpbkxhbmd1YWdlJzsvL1x1NEUzQlx1OEJFRFx1OEEwMHRhZ1xuXHRwcml2YXRlIHN0YXRpYyByZWFkb25seSBUQUdfQ0hJTERMQU5HVUFHRTpzdHJpbmcgPSAnQ2hpbGRMYW5ndWFnZSc7Ly9cdTVCNTBcdThCRURcdThBMDB0YWdcblxuXHRwcml2YXRlIHJlYWRvbmx5IEVMRU1FTlRBUlI6QXJyYXk8VD4gPSBbXTtcblx0cHJpdmF0ZSByZWFkb25seSBFTEVNRU5UTUFQOk1hcDxudW1iZXIsIFQ+ID0gbmV3IE1hcDxudW1iZXIsIFQ+KCk7XG5cdHByaXZhdGUgcmVhZG9ubHkgS0VZTUFQOk1hcDxudW1iZXIgfCBzdHJpbmcsIG51bWJlcj4gPSBuZXcgTWFwKCk7XG5cdHByaXZhdGUgc3RhdGljIGxhbmd1YWdlSW5kZXg6bnVtYmVyID0gMFxuXHRwcml2YXRlIHN0YXRpYyBnZXRMYW5ndWFnZTooa2V5OnN0cmluZ3xudW1iZXIpPT5zdHJpbmc7XG5cblx0cHVibGljIGNvbnN0cnVjdG9yKGV4Y2VsRGF0YTpBcnJheTxBcnJheTxhbnk+Pil7XG5cdFx0bGV0IGhlYWRlckxpbmU6bnVtYmVyID0gMjsvL1x1ODg2OFx1NTkzNFx1NzY4NFx1ODg0Q1x1NjU3MFxuXHRcdHRoaXMuRUxFTUVOVEFSUiA9IG5ldyBBcnJheShleGNlbERhdGEubGVuZ3RoIC0gaGVhZGVyTGluZSk7XG5cdFx0XG5cdFx0Zm9yKGxldCBpID0gMDsgaSA8IHRoaXMuRUxFTUVOVEFSUi5sZW5ndGg7IGkrKyl7XG5cdFx0XHR0aGlzLkVMRU1FTlRBUlJbaV0gPSB7fSBhcyBUXG5cdFx0fVxuXHRcdGxldCBjb2x1bW4gPSBleGNlbERhdGFbMF0ubGVuZ3RoOy8vXHU1MjE3XHU2NTcwXG5cdFx0Zm9yKGxldCBqID0gMDsgaiA8IGNvbHVtbjsgaisrKXsvL1x1OTA0RFx1NTM4Nlx1NTQwNFx1NTIxN1xuXHRcdFx0bGV0IG5hbWU6c3RyaW5nID0gZXhjZWxEYXRhWzBdW2pdO1xuXHRcdFx0bGV0IHRhZ3M6QXJyYXk8c3RyaW5nPiA9IGV4Y2VsRGF0YVsxXVtqXS5zcGxpdCgnfCcpO1xuXHRcdFx0aWYodGFncy5pbmNsdWRlcyhDb25maWdCYXNlLlRBR19DSElMRExBTkdVQUdFKSkgY29udGludWU7XG5cdFx0XHRsZXQgak9mZmVjdDpudW1iZXIgPSAwOy8vXHU1MjE3XHU1MDRGXHU3OUZCXHU5MUNGXG5cdFx0XHRpZih0YWdzLmluY2x1ZGVzKENvbmZpZ0Jhc2UuVEFHX01BSU5MQU5HVUFHRSkpe1xuXHRcdFx0XHRsZXQgaW5kZXggPSBqICsgQ29uZmlnQmFzZS5sYW5ndWFnZUluZGV4O1xuXHRcdFx0XHRsZXQgdGFyZ2V0VGFnczpBcnJheTxzdHJpbmc+ID0gZXhjZWxEYXRhWzFdW2luZGV4XS5zcGxpdCgnfCcpO1xuXHRcdFx0XHRpZihpbmRleCA8IGNvbHVtbiAmJiB0YXJnZXRUYWdzLmluY2x1ZGVzKENvbmZpZ0Jhc2UuVEFHX0NISUxETEFOR1VBR0UpKXtcblx0XHRcdFx0XHRqT2ZmZWN0ID0gQ29uZmlnQmFzZS5sYW5ndWFnZUluZGV4O1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRsZXQgaGFzVGFnX0tleTpib29sZWFuID0gdGFncy5pbmNsdWRlcyhDb25maWdCYXNlLlRBR19LRVkpO1xuXHRcdFx0bGV0IGhhc1RhZ19MYW5ndWFnZTpib29sZWFuID0gdGFncy5pbmNsdWRlcyhDb25maWdCYXNlLlRBR19MQU5HVUFHRSk7XG5cdFx0XHRmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5FTEVNRU5UQVJSLmxlbmd0aDsgaSsrKXtcblx0XHRcdFx0bGV0IGVsZSA9IHRoaXMuRUxFTUVOVEFSUltpXTtcblx0XHRcdFx0bGV0IHZhbHVlID0gZXhjZWxEYXRhW2kgKyBoZWFkZXJMaW5lXVtqICsgak9mZmVjdF07XG5cdFx0XHRcdGlmKGogPT0gMCl7Ly9JRFxuXHRcdFx0XHRcdHRoaXMuRUxFTUVOVE1BUC5zZXQodmFsdWUsIGVsZSk7XG5cdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdGlmKGhhc1RhZ19LZXkpe1xuXHRcdFx0XHRcdFx0dGhpcy5LRVlNQVAuc2V0KHZhbHVlLCBleGNlbERhdGFbaSArIGhlYWRlckxpbmVdWzBdKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYoaGFzVGFnX0xhbmd1YWdlKXtcblx0XHRcdFx0XHRcdGlmKENvbmZpZ0Jhc2UuZ2V0TGFuZ3VhZ2UgIT0gbnVsbCl7XG5cdFx0XHRcdFx0XHRcdHZhbHVlID0gQ29uZmlnQmFzZS5nZXRMYW5ndWFnZSh2YWx1ZSk7XG5cdFx0XHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRcdFx0dmFsdWUgPSBcInVua25vd1wiXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGVsZVtuYW1lXSA9IHZhbHVlO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHQvL1x1OEJCRVx1N0Y2RVx1ODNCN1x1NTNENlx1OEJFRFx1OEEwMFx1NzY4NFx1NjVCOVx1NkNENVxuXHRwdWJsaWMgc3RhdGljIGluaXRMYW5ndWFnZShsYW5ndWFnZUluZGV4Om51bWJlciwgZ2V0TGFuZ3VhZ2VGdW46KGtleTpzdHJpbmd8bnVtYmVyKT0+c3RyaW5nKXtcblx0XHRDb25maWdCYXNlLmxhbmd1YWdlSW5kZXggPSBsYW5ndWFnZUluZGV4O1xuXHRcdENvbmZpZ0Jhc2UuZ2V0TGFuZ3VhZ2UgPSBnZXRMYW5ndWFnZUZ1bjtcblx0XHRpZihDb25maWdCYXNlLmxhbmd1YWdlSW5kZXggPCAwKXtcblx0XHRcdENvbmZpZ0Jhc2UubGFuZ3VhZ2VJbmRleCA9IENvbmZpZ0Jhc2UuZ2V0U3lzdGVtTGFuZ3VhZ2VJbmRleCgpO1xuXHRcdH1cblx0fVxuXHQvL1x1ODNCN1x1NTNENlx1N0NGQlx1N0VERlx1OEJFRFx1OEEwMFx1N0QyMlx1NUYxNVxuXHRwcml2YXRlIHN0YXRpYyBnZXRTeXN0ZW1MYW5ndWFnZUluZGV4KCk6bnVtYmVye1xuXHRcdGxldCBsYW5ndWFnZSA9IFV0aWwuTG9jYWxlVXRpbC5nZXREZWZhdWx0TG9jYWxlKCkudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpO1xuXHRcdGlmICghIWxhbmd1YWdlLm1hdGNoKFwiZW5cIikpIHtcblx0XHRcdHJldHVybiAwO1xuXHRcdH1cblx0XHRpZiAoISFsYW5ndWFnZS5tYXRjaChcInpoXCIpKSB7XG5cdFx0XHRyZXR1cm4gMTtcblx0XHR9XG5cdFx0aWYgKCEhbGFuZ3VhZ2UubWF0Y2goXCJqYVwiKSkge1xuXHRcdFx0cmV0dXJuIDI7XG5cdFx0fVxuXHRcdGlmICghIWxhbmd1YWdlLm1hdGNoKFwiZGVcIikpIHtcblx0XHRcdHJldHVybiAzO1xuXHRcdH1cblx0XHRyZXR1cm4gMDtcblx0fVxuXHQvKipcblx0KiBcdTY4MzlcdTYzNkVpZFx1ODNCN1x1NTNENlx1NEUwMFx1NEUyQVx1NTE0M1x1N0QyMFxuXHQqIEBwYXJhbSBpZCBpZHxrZXlcblx0KiBAcmV0dXJucyBFbGVtZW50XG5cdCovXG5cdHB1YmxpYyBnZXRFbGVtZW50KGlkOm51bWJlcnxzdHJpbmcpOiBUIHtcblx0XHRsZXQgZWxlID0gdGhpcy5FTEVNRU5UTUFQLmdldChOdW1iZXIoaWQpKSB8fCB0aGlzLkVMRU1FTlRNQVAuZ2V0KHRoaXMuS0VZTUFQLmdldChpZCkpO1xuXHRcdGlmKGVsZSA9PSBudWxsKXtcblx0XHRcdGNvbnNvbGUuZXJyb3IodGhpcy5jb25zdHJ1Y3Rvci5uYW1lICsgXCJcdTkxNERcdTdGNkVcdTg4NjhcdTRFMkRcdTYyN0VcdTRFMERcdTUyMzBcdTUxNDNcdTdEMjAgaWQ6XCIgKyBpZCk7XG5cdFx0fVxuXHRcdHJldHVybiBlbGU7XG5cdH1cblx0LyoqXG5cdCogXHU2ODM5XHU2MzZFXHU1QjU3XHU2QkI1XHU1NDBEXHU1NDhDXHU1QjU3XHU2QkI1XHU1MDNDXHU2N0U1XHU2MjdFXHU0RTAwXHU0RTJBXHU1MTQzXHU3RDIwXG5cdCogQHBhcmFtIGZpZWxkTmFtZSBcdTVCNTdcdTZCQjVcdTU0MERcblx0KiBAcGFyYW0gZmllbGRWYWx1ZSBcdTVCNTdcdTZCQjVcdTUwM0Ncblx0KiBAcmV0dXJucyBcdTdCMkNcdTRFMDBcdTRFMkFcdTYyN0VcdTUyMzBcdTc2ODRFbGVtZW50XG5cdCovXG5cdHB1YmxpYyBmaW5kRWxlbWVudChmaWVsZE5hbWU6c3RyaW5nLCBmaWVsZFZhbHVlOmFueSk6IFR7XG5cdFx0Zm9yKGxldCBpID0gMDsgaSA8IHRoaXMuRUxFTUVOVEFSUi5sZW5ndGg7IGkrKyl7XG5cdFx0XHRpZih0aGlzLkVMRU1FTlRBUlJbaV1bZmllbGROYW1lXSA9PSBmaWVsZFZhbHVlKXtcblx0XHRcdFx0cmV0dXJuIHRoaXMuRUxFTUVOVEFSUltpXTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0LyoqXG5cdCogXHU2ODM5XHU2MzZFXHU1QjU3XHU2QkI1XHU1NDBEXHU1NDhDXHU1QjU3XHU2QkI1XHU1MDNDXHU2N0U1XHU2MjdFXHU0RTAwXHU3RUM0XHU1MTQzXHU3RDIwXG5cdCogQHBhcmFtIGZpZWxkTmFtZSBcdTVCNTdcdTZCQjVcdTU0MERcblx0KiBAcGFyYW0gZmllbGRWYWx1ZSBcdTVCNTdcdTZCQjVcdTUwM0Ncblx0KiBAcmV0dXJucyBcdTYyNDBcdTY3MDlcdTdCMjZcdTU0MDhcdTg5ODFcdTZDNDJcdTc2ODRFbGVtZW50XG5cdCovXG5cdHB1YmxpYyBmaW5kRWxlbWVudHMoZmllbGROYW1lOnN0cmluZyxmaWVsZFZhbHVlOmFueSk6QXJyYXk8VD57XG5cdFx0bGV0IGFycjpBcnJheTxUPiA9IFtdO1xuXHRcdGZvcihsZXQgaSA9IDA7aSA8IHRoaXMuRUxFTUVOVEFSUi5sZW5ndGg7aSsrKXtcblx0XHRcdGlmKHRoaXMuRUxFTUVOVEFSUltpXVtmaWVsZE5hbWVdID09IGZpZWxkVmFsdWUpe1xuXHRcdFx0XHRhcnIucHVzaCh0aGlzLkVMRU1FTlRBUlJbaV0pO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gYXJyO1xuXHR9XG5cdC8qKlx1ODNCN1x1NTNENlx1NjI0MFx1NjcwOVx1NTE0M1x1N0QyMCovXG5cdHB1YmxpYyBnZXRBbGxFbGVtZW50KCk6QXJyYXk8VD57XG5cdFx0cmV0dXJuIHRoaXMuRUxFTUVOVEFSUjtcblx0fVxufSIsICJpbXBvcnQge0NvbmZpZ0Jhc2UsIElFbGVtZW50QmFzZX0gZnJvbSBcIi4vQ29uZmlnQmFzZVwiO1xuaW1wb3J0IHtBY3Rpb25Db25maWd9IGZyb20gXCIuL0FjdGlvblwiO1xuaW1wb3J0IHtXZWFwb25Db25maWdDb25maWd9IGZyb20gXCIuL1dlYXBvbkNvbmZpZ1wiO1xuaW1wb3J0IHtXZWFwb25SZXNvdXJjZXNDb25maWd9IGZyb20gXCIuL1dlYXBvblJlc291cmNlc1wiO1xuXG5leHBvcnQgY2xhc3MgR2FtZUNvbmZpZ3tcblx0cHJpdmF0ZSBzdGF0aWMgY29uZmlnTWFwOk1hcDxzdHJpbmcsIENvbmZpZ0Jhc2U8SUVsZW1lbnRCYXNlPj4gPSBuZXcgTWFwKCk7XG5cdC8qKlxuXHQqIFx1NTkxQVx1OEJFRFx1OEEwMFx1OEJCRVx1N0Y2RVxuXHQqIEBwYXJhbSBsYW5ndWFnZUluZGV4IFx1OEJFRFx1OEEwMFx1N0QyMlx1NUYxNSgtMVx1NEUzQVx1N0NGQlx1N0VERlx1OUVEOFx1OEJBNFx1OEJFRFx1OEEwMClcblx0KiBAcGFyYW0gZ2V0TGFuZ3VhZ2VGdW4gXHU2ODM5XHU2MzZFa2V5XHU4M0I3XHU1M0Q2XHU4QkVEXHU4QTAwXHU1MTg1XHU1QkI5XHU3Njg0XHU2NUI5XHU2Q0Q1XG5cdCovXG5cdHB1YmxpYyBzdGF0aWMgaW5pdExhbmd1YWdlKGxhbmd1YWdlSW5kZXg6bnVtYmVyLCBnZXRMYW5ndWFnZUZ1bjooa2V5OnN0cmluZ3xudW1iZXIpPT5zdHJpbmcpe1xuXHRcdENvbmZpZ0Jhc2UuaW5pdExhbmd1YWdlKGxhbmd1YWdlSW5kZXgsIGdldExhbmd1YWdlRnVuKTtcblx0XHR0aGlzLmNvbmZpZ01hcC5jbGVhcigpO1xuXHR9XG5cdHB1YmxpYyBzdGF0aWMgZ2V0Q29uZmlnPFQgZXh0ZW5kcyBDb25maWdCYXNlPElFbGVtZW50QmFzZT4+KENvbmZpZ0NsYXNzOiB7IG5ldygpOiBUIH0pOiBUIHtcblx0XHRpZiAoIXRoaXMuY29uZmlnTWFwLmhhcyhDb25maWdDbGFzcy5uYW1lKSkge1xuXHRcdFx0dGhpcy5jb25maWdNYXAuc2V0KENvbmZpZ0NsYXNzLm5hbWUsIG5ldyBDb25maWdDbGFzcygpKTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMuY29uZmlnTWFwLmdldChDb25maWdDbGFzcy5uYW1lKSBhcyBUO1xuXHR9XG5cdHB1YmxpYyBzdGF0aWMgZ2V0IEFjdGlvbigpOkFjdGlvbkNvbmZpZ3sgcmV0dXJuIHRoaXMuZ2V0Q29uZmlnKEFjdGlvbkNvbmZpZykgfTtcblx0cHVibGljIHN0YXRpYyBnZXQgV2VhcG9uQ29uZmlnKCk6V2VhcG9uQ29uZmlnQ29uZmlneyByZXR1cm4gdGhpcy5nZXRDb25maWcoV2VhcG9uQ29uZmlnQ29uZmlnKSB9O1xuXHRwdWJsaWMgc3RhdGljIGdldCBXZWFwb25SZXNvdXJjZXMoKTpXZWFwb25SZXNvdXJjZXNDb25maWd7IHJldHVybiB0aGlzLmdldENvbmZpZyhXZWFwb25SZXNvdXJjZXNDb25maWcpIH07XG59IiwgImltcG9ydCB7IENvbmZpZ0Jhc2UsIElFbGVtZW50QmFzZSB9IGZyb20gXCIuL0NvbmZpZ0Jhc2VcIjtcbmNvbnN0IEVYQ0VMREFUQTpBcnJheTxBcnJheTxhbnk+PiA9IFtbXCJpZFwiLFwibmFtZVwiLFwibWFsZUFjdGlvblwiLFwiZmVtYWxlQWN0aW9uXCIsXCJ3ZWFwb25JY29uXCIsXCJlcXVpcG1lbnRTbG90XCIsXCJlcXVpcG1lbnRDYW1lcmFPZmZzZXRcIixcInJlc291cmNlc0lkXCIsXCJ1c2VDbGFzc1wiLFwiZXF1aXBtZW50Q2FtZXJhRm92XCIsXCJhaW1DYW1lcmFPZmZzZXRcIixcImFpbUNhbWVyYUZvdlwiLFwiYWltU3BlZWRcIixcImRhbWFnZVwiLFwic2hvb3RSYW5nZVwiLFwiYW1tb1NwZWVkXCIsXCJkZXRlY3RSYWRpdXNcIixcImdyYXZpdHlTY2FsZVwiLFwiaHVydFJhZGl1c1wiLFwiaXNBdXRvUmVsb2FkXCIsXCJpc0F1dG9Mb2NrXCIsXCJpc0RlZmF1bHRVSVwiLFwiaXNXZWFwb25IYXZlQ2FzaW5nXCIsXCJmaXJlQmxvY2tEaXN0YW5jZVwiLFwidG90YWxBbW1vXCIsXCJpc0VtcHR5VG9EZXN0cm95XCIsXCJpc1N1cHBvcnRSZXBBbW1vXCIsXCJyb3RhdGVTcGVlZFwiLFwia2VlcFRpbWVcIixcImlzV2VhcG9uSGF2ZVNjb3BlXCIsXCJpc0F1dG9EZXN0cm95XCJdLFsxMDAsXCJcdTZENEJcdThCRDVcdTZCNjVcdTY3QUFcIiwxLDIsMTAxMTY4LFwiUmlnaHRfSGFuZFwiLFwiMHwwfDBcIiwxLFwiU25pcGVyXCIsOTAsXCIwfDB8MFwiLDYwLDkwLDMwLDUwMDAsMTAwMDAsMSxcIlwiLDEsMSwxLDEsMSwxLDEwMCxcIlwiLDEsOTAsLTEsXCJcIiwxXV07XG5leHBvcnQgaW50ZXJmYWNlIElXZWFwb25Db25maWdFbGVtZW50IGV4dGVuZHMgSUVsZW1lbnRCYXNle1xuIFx0LyoqXHU2N0FBXHU2OEIwSUQqL1xuXHRpZDpudW1iZXJcblx0LyoqXHU2N0FBXHU2OEIwXHU1NDBEXHU1QjU3Ki9cblx0bmFtZTpzdHJpbmdcblx0LyoqXHU2N0FBXHU2OEIwXHU3NTM3XHU2MDI3XHU1MkE4XHU3NTNCKi9cblx0bWFsZUFjdGlvbjpudW1iZXJcblx0LyoqXHU2N0FBXHU2OEIwXHU1OTczXHU2MDI3XHU1MkE4XHU3NTNCKi9cblx0ZmVtYWxlQWN0aW9uOm51bWJlclxuXHQvKipcdTZCNjZcdTU2NjhcdTU2RkVcdTY4MDcqL1xuXHR3ZWFwb25JY29uOnN0cmluZ1xuXHQvKipcdTg4QzVcdTU5MDdcdTYzRDJcdTY5RkQqL1xuXHRlcXVpcG1lbnRTbG90OnN0cmluZ1xuXHQvKipcdTg4QzVcdTU5MDdcdTg5QzZcdTg5RDJcdTUwNEZcdTc5RkIqL1xuXHRlcXVpcG1lbnRDYW1lcmFPZmZzZXQ6VHlwZS5WZWN0b3Jcblx0LyoqXHU2N0FBXHU2OEIwXHU0RjdGXHU3NTI4XHU4RDQ0XHU0RUE3SUQqL1xuXHRyZXNvdXJjZXNJZDpudW1iZXJcblx0LyoqXHU2N0FBXHU2OEIwXHU3QzdCKi9cblx0dXNlQ2xhc3M6c3RyaW5nXG5cdC8qKkZPViovXG5cdGVxdWlwbWVudENhbWVyYUZvdjpudW1iZXJcblx0LyoqXHU3Nzg0XHU1MUM2XHU4OUM2XHU4OUQyXHU1MDRGXHU3OUZCKi9cblx0YWltQ2FtZXJhT2Zmc2V0OlR5cGUuVmVjdG9yXG5cdC8qKlx1Nzc4NFx1NTFDNkZPViovXG5cdGFpbUNhbWVyYUZvdjpudW1iZXJcblx0LyoqXHU3Nzg0XHU1MUM2XHU4MDVBXHU3MTI2XHU5MDFGXHU1RUE2Ki9cblx0YWltU3BlZWQ6bnVtYmVyXG5cdC8qKlx1NkI2Nlx1NTY2OFx1NTdGQVx1Nzg0MFx1NEYyNFx1NUJCMyovXG5cdGRhbWFnZTpudW1iZXJcblx0LyoqXHU2NzAwXHU1OTI3XHU1QzA0XHU3QTBCKi9cblx0c2hvb3RSYW5nZTpudW1iZXJcblx0LyoqXHU1RjM5XHU4MzZGXHU5MDFGXHU1RUE2Ki9cblx0YW1tb1NwZWVkOm51bWJlclxuXHQvKipcdTc4QjBcdTY0OUVcdTUzNEFcdTVGODQqL1xuXHRkZXRlY3RSYWRpdXM6bnVtYmVyXG5cdC8qKlx1OTFDRFx1NTI5Qlx1N0NGQlx1NjU3MCovXG5cdGdyYXZpdHlTY2FsZTpudW1iZXJcblx0LyoqXHU0RjI0XHU1QkIzXHU4MzAzXHU1NkY0Ki9cblx0aHVydFJhZGl1czpudW1iZXJcblx0LyoqXHU4MUVBXHU1MkE4XHU2MzYyXHU1RjM5Ki9cblx0aXNBdXRvUmVsb2FkOmJvb2xlYW5cblx0LyoqXHU4Rjg1XHU1MkE5XHU3Nzg0XHU1MUM2Ki9cblx0aXNBdXRvTG9jazpib29sZWFuXG5cdC8qKlx1OUVEOFx1OEJBNFVJKi9cblx0aXNEZWZhdWx0VUk6Ym9vbGVhblxuXHQvKipcdTVGMzlcdTU4RjNcdTVGMzlcdTUxRkEqL1xuXHRpc1dlYXBvbkhhdmVDYXNpbmc6Ym9vbGVhblxuXHQvKipcdTVGMDBcdTcwNkJcdTk2M0JcdTYzMjFcdThERERcdTc5QkIqL1xuXHRmaXJlQmxvY2tEaXN0YW5jZTpudW1iZXJcblx0LyoqXHU1RjM5XHU4MzZGXHU2NTcwXHU5MUNGKC0xXHU0RTNBXHU2NUUwXHU5NjUwKSAqL1xuXHR0b3RhbEFtbW86bnVtYmVyXG5cdC8qKlx1NUYzOVx1NTkzOVx1NEUzQVx1N0E3QVx1NjYyRlx1NTQyNlx1OTUwMFx1NkJDMVx1NkI2Nlx1NTY2OCovXG5cdGlzRW1wdHlUb0Rlc3Ryb3k6Ym9vbGVhblxuXHQvKipcdTY1MkZcdTYzMDFcdTY2RkZcdTYzNjJcdTVGMzlcdTU5MzkqL1xuXHRpc1N1cHBvcnRSZXBBbW1vOmJvb2xlYW5cblx0LyoqXHU2QTIxXHU1NzhCXHU2NUNCXHU4RjZDXHU5MDFGXHU1RUE2Ki9cblx0cm90YXRlU3BlZWQ6bnVtYmVyXG5cdC8qKlx1NjMwMVx1NjcwOVx1NjVGNlx1OTY1MFx1RkYwOHNcdUZGMDlcdUZGMDgtMVx1NEUzQVx1NkMzOFx1NEU0NVx1NjMwMVx1NjcwOVx1RkYwOSovXG5cdGtlZXBUaW1lOm51bWJlclxuXHQvKipcdTc3ODRcdTUxQzZcdTk1NUMqL1xuXHRpc1dlYXBvbkhhdmVTY29wZTpib29sZWFuXG5cdC8qKlx1ODFFQVx1NTJBOFx1OTUwMFx1NkJDMSovXG5cdGlzQXV0b0Rlc3Ryb3k6Ym9vbGVhblxuIH0gXG5leHBvcnQgY2xhc3MgV2VhcG9uQ29uZmlnQ29uZmlnIGV4dGVuZHMgQ29uZmlnQmFzZTxJV2VhcG9uQ29uZmlnRWxlbWVudD57XG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0c3VwZXIoRVhDRUxEQVRBKTtcblx0fVxuXG59IiwgImltcG9ydCB7IENvbmZpZ0Jhc2UsIElFbGVtZW50QmFzZSB9IGZyb20gXCIuL0NvbmZpZ0Jhc2VcIjtcbmNvbnN0IEVYQ0VMREFUQTpBcnJheTxBcnJheTxhbnk+PiA9IFtbXCJpZFwiLFwiaGl0Um9sZUVmZmVjdFwiLFwiaGl0T3RoZXJFZmZlY3RcIixcImZpcmVFZmZlY3RcIixcImFtbW9cIixcImNhc2luZ1wiLFwiZmlyZVNvdW5kXCIsXCJyZWxvYWRTb3VuZFwiLFwibG9hZFNvdW5kXCIsXCJhaW1Tb3VuZFwiLFwiaGl0Um9sZVNvdW5kXCIsXCJoaXRPdGhlclNvdW5kXCJdLFsxLDEsMiwzLDQsMiw1LDYsNyw4LDksMTBdXTtcbmV4cG9ydCBpbnRlcmZhY2UgSVdlYXBvblJlc291cmNlc0VsZW1lbnQgZXh0ZW5kcyBJRWxlbWVudEJhc2V7XG4gXHQvKipcdThENDRcdTRFQTdJRCovXG5cdGlkOm51bWJlclxuXHQvKipcdTU0N0RcdTRFMkRcdTg5RDJcdTgyNzJcdTcyNzlcdTY1NDgqL1xuXHRoaXRSb2xlRWZmZWN0OnN0cmluZ1xuXHQvKipcdTU0N0RcdTRFMkRcdTcyNjlcdTRGNTNcdTcyNzlcdTY1NDgqL1xuXHRoaXRPdGhlckVmZmVjdDpzdHJpbmdcblx0LyoqXHU1RjAwXHU3MDZCXHU3Mjc5XHU2NTQ4Ki9cblx0ZmlyZUVmZmVjdDpzdHJpbmdcblx0LyoqXHU1RjM5XHU4MzZGKi9cblx0YW1tbzpzdHJpbmdcblx0LyoqXHU1RjM5XHU1OEYzKi9cblx0Y2FzaW5nOnN0cmluZ1xuXHQvKipcdTVGMDBcdTcwNkJcdTk3RjNcdTY1NDgqL1xuXHRmaXJlU291bmQ6c3RyaW5nXG5cdC8qKlx1NjM2Mlx1NUYzOVx1OTdGM1x1NjU0OCovXG5cdHJlbG9hZFNvdW5kOnN0cmluZ1xuXHQvKipcdTRFMEFcdTgxOUJcdTk3RjNcdTY1NDgqL1xuXHRsb2FkU291bmQ6c3RyaW5nXG5cdC8qKlx1Nzc4NFx1NTFDNlx1OTdGM1x1NjU0OCovXG5cdGFpbVNvdW5kOnN0cmluZ1xuXHQvKipcdTU0N0RcdTRFMkRcdTg5RDJcdTgyNzJcdTk3RjNcdTY1NDgqL1xuXHRoaXRSb2xlU291bmQ6c3RyaW5nXG5cdC8qKlx1NTQ3RFx1NEUyRFx1NzI2OVx1NEY1M1x1OTdGM1x1NjU0OCovXG5cdGhpdE90aGVyU291bmQ6c3RyaW5nXG4gfSBcbmV4cG9ydCBjbGFzcyBXZWFwb25SZXNvdXJjZXNDb25maWcgZXh0ZW5kcyBDb25maWdCYXNlPElXZWFwb25SZXNvdXJjZXNFbGVtZW50Pntcblx0Y29uc3RydWN0b3IoKXtcblx0XHRzdXBlcihFWENFTERBVEEpO1xuXHR9XG5cbn0iLCAiXHVGRUZGQFVJLlVJQ2FsbE9ubHkoJycpXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJRGVmYXVsdCBleHRlbmRzIFVJLlVJQmVoYXZpb3Ige1xyXG5cdENoYXJhY3RlcjogR2FtZXBsYXkuQ2hhcmFjdGVyXHJcblx0LyogXHU4OUUzXHU2NzkwXHU4RDQ0XHU2RTkwSURcdTUyMTdcdTg4NjggKi9cclxuICAgIHByaXZhdGUgcmVzb2x2ZVN0cmluZyhhc3NldElkczogc3RyaW5nKTogc3RyaW5nW10ge1xyXG4gICAgICAgIGxldCBhc3NldElkQXJyYXk6IHN0cmluZ1tdID0gbmV3IEFycmF5PHN0cmluZz4oKVxyXG4gICAgICAgIGxldCBhc3NldElkOiBzdHJpbmcgPSBcIlwiXHJcbiAgICAgICAgbGV0IHMgPSBhc3NldElkcy5zcGxpdChcIlwiKVxyXG4gICAgICAgIGZvciAobGV0IGEgb2Ygcykge1xyXG4gICAgICAgICAgICBpZiAoYSA9PSBcIixcIikge1xyXG4gICAgICAgICAgICAgICAgYXNzZXRJZEFycmF5LnB1c2goYXNzZXRJZClcclxuICAgICAgICAgICAgICAgIGFzc2V0SWQgPSBcIlwiXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBhc3NldElkICs9IGFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYXNzZXRJZCkge1xyXG4gICAgICAgICAgICBhc3NldElkQXJyYXkucHVzaChhc3NldElkKVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYXNzZXRJZEFycmF5XHJcbiAgICB9XHJcblxyXG5cdC8qIFx1NTIxRFx1NTlDQlx1NTMxNlx1OEQ0NFx1NkU5MCAqL1xyXG5cdHByaXZhdGUgaW5pdEFzc2V0cyhhc3NldElkczogc3RyaW5nKTogdm9pZCB7XHJcblx0XHRsZXQgYXNzZXRJZEFycmF5ID0gdGhpcy5yZXNvbHZlU3RyaW5nKGFzc2V0SWRzKVxyXG5cdFx0Zm9yIChsZXQgZWxlbWVudCBvZiBhc3NldElkQXJyYXkpIHtcclxuXHRcdFx0VXRpbC5Bc3NldFV0aWwuYXN5bmNEb3dubG9hZEFzc2V0KGVsZW1lbnQpXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHJcblx0LyoqIFx1NEVDNVx1NTcyOFx1NkUzOFx1NjIwRlx1NjVGNlx1OTVGNFx1NUJGOVx1OTc1RVx1NkEyMVx1Njc3Rlx1NUI5RVx1NEY4Qlx1OEMwM1x1NzUyOFx1NEUwMFx1NkIyMSAqL1xyXG4gICAgcHJvdGVjdGVkIG9uU3RhcnQoKSB7XHJcblx0XHQvL1x1NTIxRFx1NTlDQlx1NTMxNlx1NTJBOFx1NzUzQlx1OEQ0NFx1NkU5MCBcclxuXHRcdHRoaXMuaW5pdEFzc2V0cyhcIjk1Nzc3LDYxMjQ1XCIpXHJcblx0XHQvL1x1OEJCRVx1N0Y2RVx1ODBGRFx1NTQyNlx1NkJDRlx1NUUyN1x1ODlFNlx1NTNEMW9uVXBkYXRlXHJcblx0XHR0aGlzLmNhblVwZGF0ZSA9IGZhbHNlXHJcblx0XHRcclxuXHRcdC8vXHU2MjdFXHU1MjMwXHU1QkY5XHU1RTk0XHU3Njg0XHU4REYzXHU4REMzXHU2MzA5XHU5NEFFXHJcbiAgICAgICAgY29uc3QgSnVtcEJ0biA9IHRoaXMudWlXaWRnZXRCYXNlLmZpbmRDaGlsZEJ5UGF0aCgnUm9vdENhbnZhcy9CdXR0b25fSnVtcCcpIGFzIFVJLkJ1dHRvblxyXG5cdFx0Y29uc3QgQXR0YWNrQnRuID0gdGhpcy51aVdpZGdldEJhc2UuZmluZENoaWxkQnlQYXRoKCdSb290Q2FudmFzL0J1dHRvbl9BdHRhY2snKSBhcyBVSS5CdXR0b25cclxuXHRcdGNvbnN0IEludGVyYWN0QnRuID0gdGhpcy51aVdpZGdldEJhc2UuZmluZENoaWxkQnlQYXRoKCdSb290Q2FudmFzL0J1dHRvbl9JbnRlcmFjdCcpIGFzIFVJLkJ1dHRvblxyXG5cdFx0XHJcblx0XHQvL1x1NzBCOVx1NTFGQlx1OERGM1x1OERDM1x1NjMwOVx1OTRBRSxcdTVGMDJcdTZCNjVcdTgzQjdcdTUzRDZcdTRFQkFcdTcyNjlcdTU0MEVcdTYyNjdcdTg4NENcdThERjNcdThEQzNcclxuICAgICAgICBKdW1wQnRuLm9uUHJlc3NlZC5hZGQoKCk9PntcclxuXHRcdFx0aWYgKHRoaXMuQ2hhcmFjdGVyKSB7XHJcblx0XHRcdFx0dGhpcy5DaGFyYWN0ZXIuanVtcCgpXHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0R2FtZXBsYXkuYXN5bmNHZXRDdXJyZW50UGxheWVyKCkudGhlbigocGxheWVyKSA9PiB7XHJcblx0XHRcdFx0XHR0aGlzLkNoYXJhY3RlciA9IHBsYXllci5jaGFyYWN0ZXJcclxuXHRcdFx0XHRcdC8vXHU4OUQyXHU4MjcyXHU2MjY3XHU4ODRDXHU4REYzXHU4REMzXHU1MjlGXHU4MEZEXHJcblx0XHRcdFx0XHR0aGlzLkNoYXJhY3Rlci5qdW1wKClcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9XHJcblx0XHR9KVx0XHJcblxyXG5cdFx0Ly9cdTcwQjlcdTUxRkJcdTY1M0JcdTUxRkJcdTYzMDlcdTk0QUUsXHU1RjAyXHU2QjY1XHU4M0I3XHU1M0Q2XHU0RUJBXHU3MjY5XHU1NDBFXHU2MjY3XHU4ODRDXHU2NTNCXHU1MUZCXHU1MkE4XHU0RjVDXHJcbiAgICAgICAgQXR0YWNrQnRuLm9uUHJlc3NlZC5hZGQoKCk9PntcclxuXHRcdFx0XHRHYW1lcGxheS5hc3luY0dldEN1cnJlbnRQbGF5ZXIoKS50aGVuKChwbGF5ZXIpID0+IHtcclxuXHRcdFx0XHRcdHRoaXMuQ2hhcmFjdGVyID0gcGxheWVyLmNoYXJhY3RlclxyXG5cdFx0XHRcdFx0Ly9cdThCQTlcdTUyQThcdTc1M0JcdTUzRUFcdTU3MjhcdTRFMEFcdTUzNEFcdThFQUJcdTY0QURcdTY1M0VcclxuXHRcdFx0XHRcdGxldCBhbmltMSA9IHBsYXllci5jaGFyYWN0ZXIubG9hZEFuaW1hdGlvbihcIjYxMjQ1XCIpXHJcblx0XHRcdFx0XHRhbmltMS5zbG90ID0gR2FtZXBsYXkuQW5pbVNsb3QuVXBwZXJcclxuXHRcdFx0XHRcdC8vXHU4OUQyXHU4MjcyXHU2MjY3XHU4ODRDXHU2NTNCXHU1MUZCXHU1MkE4XHU0RjVDXHJcblx0XHRcdFx0XHRpZihhbmltMS5pc1BsYXlpbmcpe1xyXG5cdFx0XHRcdFx0XHRyZXR1cm5cclxuXHRcdFx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFx0XHRhbmltMS5wbGF5KClcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0fSlcdFxyXG5cclxuXHRcdC8vXHU3MEI5XHU1MUZCXHU0RUE0XHU0RTkyXHU2MzA5XHU5NEFFLFx1NUYwMlx1NkI2NVx1ODNCN1x1NTNENlx1NEVCQVx1NzI2OVx1NTQwRVx1NjI2N1x1ODg0Q1x1NEVBNFx1NEU5Mlx1NTJBOFx1NEY1Q1xyXG4gICAgICAgIEludGVyYWN0QnRuLm9uUHJlc3NlZC5hZGQoKCk9PntcclxuXHRcdFx0XHRHYW1lcGxheS5hc3luY0dldEN1cnJlbnRQbGF5ZXIoKS50aGVuKChwbGF5ZXIpID0+IHtcclxuXHRcdFx0XHRcdHRoaXMuQ2hhcmFjdGVyID0gcGxheWVyLmNoYXJhY3RlclxyXG5cdFx0XHRcdFx0Ly9cdThCQTlcdTUyQThcdTc1M0JcdTUzRUFcdTU3MjhcdTRFMEFcdTUzNEFcdThFQUJcdTY0QURcdTY1M0VcclxuXHRcdFx0XHRcdGxldCBhbmltMiA9IHBsYXllci5jaGFyYWN0ZXIubG9hZEFuaW1hdGlvbihcIjk1Nzc3XCIpXHJcblx0XHRcdFx0XHRhbmltMi5zbG90ID0gR2FtZXBsYXkuQW5pbVNsb3QuVXBwZXJcclxuXHRcdFx0XHRcdC8vXHU4OUQyXHU4MjcyXHU2MjY3XHU4ODRDXHU0RUE0XHU0RTkyXHU1MkE4XHU0RjVDXHJcblx0XHRcdFx0XHRpZihhbmltMi5pc1BsYXlpbmcpe1xyXG5cdFx0XHRcdFx0XHRyZXR1cm5cclxuXHRcdFx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFx0XHRhbmltMi5wbGF5KClcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cclxuXHRcdH0pXHRcclxuXHRcdFxyXG4gICAgfVxyXG5cclxuXHQvKiogXHJcblx0ICogXHU2Nzg0XHU5MDIwVUlcdTY1ODdcdTRFRjZcdTYyMTBcdTUyOUZcdTU0MEVcdUZGMENvblN0YXJ0XHU0RTRCXHU1NDBFIFxyXG5cdCAqIFx1NUJGOVx1NEU4RVVJXHU3Njg0XHU2ODM5XHU4MjgyXHU3MEI5XHU3Njg0XHU2REZCXHU1MkEwXHU2NENEXHU0RjVDXHVGRjBDXHU4RkRCXHU4ODRDXHU4QzAzXHU3NTI4XHJcblx0ICogXHU2Q0U4XHU2MTBGXHVGRjFBXHU4QkU1XHU0RThCXHU0RUY2XHU1M0VGXHU4MEZEXHU0RjFBXHU1OTFBXHU2QjIxXHU4QzAzXHU3NTI4XHJcblx0ICovXHJcblx0cHJvdGVjdGVkIG9uQWRkZWQoKSB7XHJcblx0fVxyXG5cclxuXHQvKiogXHJcblx0ICogXHU2Nzg0XHU5MDIwVUlcdTY1ODdcdTRFRjZcdTYyMTBcdTUyOUZcdTU0MEVcdUZGMENvbkFkZGVkXHU0RTRCXHU1NDBFXHJcblx0ICogXHU1QkY5XHU0RThFVUlcdTc2ODRcdTY4MzlcdTgyODJcdTcwQjlcdTc2ODRcdTc5RkJcdTk2NjRcdTY0Q0RcdTRGNUNcdUZGMENcdThGREJcdTg4NENcdThDMDNcdTc1MjhcclxuXHQgKiBcdTZDRThcdTYxMEZcdUZGMUFcdThCRTVcdTRFOEJcdTRFRjZcdTUzRUZcdTgwRkRcdTRGMUFcdTU5MUFcdTZCMjFcdThDMDNcdTc1MjhcclxuXHQgKi9cclxuXHRwcm90ZWN0ZWQgb25SZW1vdmVkKCkge1xyXG5cdH1cclxuXHJcblx0LyoqIFxyXG5cdCogXHU2Nzg0XHU5MDIwVUlcdTY1ODdcdTRFRjZcdTYyMTBcdTUyOUZcdTU0MEVcdUZGMENVSVx1NUJGOVx1OEM2MVx1NTE4RFx1ODhBQlx1OTUwMFx1NkJDMVx1NjVGNlx1OEMwM1x1NzUyOCBcclxuXHQqIFx1NkNFOFx1NjEwRlx1RkYxQVx1OEZEOVx1NEU0Qlx1NTQwRVVJXHU1QkY5XHU4QzYxXHU1REYyXHU3RUNGXHU4OEFCXHU5NTAwXHU2QkMxXHU0RTg2XHVGRjBDXHU5NzAwXHU4OTgxXHU3OUZCXHU5NjY0XHU2MjQwXHU2NzA5XHU1QkY5XHU4QkU1XHU2NTg3XHU0RUY2XHU1NDhDVUlcdTc2RjhcdTUxNzNcdTVCRjlcdThDNjFcdTRFRTVcdTUzQ0FcdTVCNTBcdTVCRjlcdThDNjFcdTc2ODRcdTVGMTVcdTc1MjhcclxuXHQqL1xyXG5cdHByb3RlY3RlZCBvbkRlc3Ryb3koKSB7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQqIFx1NkJDRlx1NEUwMFx1NUUyN1x1OEMwM1x1NzUyOFxyXG5cdCogXHU5MDFBXHU4RkM3Y2FuVXBkYXRlXHU1M0VGXHU0RUU1XHU1RjAwXHU1NDJGXHU1MTczXHU5NUVEXHU4QzAzXHU3NTI4XHJcblx0KiBkdCBcdTRFMjRcdTVFMjdcdThDMDNcdTc1MjhcdTc2ODRcdTY1RjZcdTk1RjRcdTVERUVcdUZGMENcdTZCRUJcdTc5RDJcclxuXHQqL1xyXG5cdC8vcHJvdGVjdGVkIG9uVXBkYXRlKGR0IDpudW1iZXIpIHtcclxuXHQvL31cclxuXHJcblx0LyoqXHJcblx0ICogXHU4QkJFXHU3RjZFXHU2NjNFXHU3OTNBXHU2NUY2XHU4OUU2XHU1M0QxXHJcblx0ICovXHJcblx0Ly9wcm90ZWN0ZWQgb25TaG93KC4uLnBhcmFtczphbnlbXSkge1xyXG5cdC8vfVxyXG5cclxuXHQvKipcclxuXHQgKiBcdThCQkVcdTdGNkVcdTRFMERcdTY2M0VcdTc5M0FcdTY1RjZcdTg5RTZcdTUzRDFcclxuXHQgKi9cclxuXHQvL3Byb3RlY3RlZCBvbkhpZGUoKSB7XHJcblx0Ly99XHJcblxyXG5cdC8qKlxyXG5cdCAqIFx1NUY1M1x1OEZEOVx1NEUyQVVJXHU3NTRDXHU5NzYyXHU2NjJGXHU1M0VGXHU0RUU1XHU2M0E1XHU2NTM2XHU0RThCXHU0RUY2XHU3Njg0XHU2NUY2XHU1MDE5XHJcblx0ICogXHU2MjRCXHU2MzA3XHU2MjE2XHU1MjE5XHU5RjIwXHU2ODA3XHU4OUU2XHU1M0QxXHU0RTAwXHU2QjIxVG91Y2hcdTY1RjZcdTg5RTZcdTUzRDFcclxuXHQgKiBcdThGRDRcdTU2REVcdTRFOEJcdTRFRjZcdTY2MkZcdTU0MjZcdTU5MDRcdTc0MDZcdTRFODZcclxuXHQgKiBcdTU5ODJcdTY3OUNcdTU5MDRcdTc0MDZcdTRFODZcdUZGMENcdTkwQTNcdTRFNDhcdThGRDlcdTRFMkFVSVx1NzU0Q1x1OTc2Mlx1NTNFRlx1NEVFNVx1NjNBNVx1NjUzNlx1OEZEOVx1NkIyMVRvdWNoXHU1NDBFXHU3RUVEXHU3Njg0TW92ZVx1NTQ4Q0VuZFx1NEU4Qlx1NEVGNlxyXG5cdCAqIFx1NTk4Mlx1Njc5Q1x1NkNBMVx1NjcwOVx1NTkwNFx1NzQwNlx1RkYwQ1x1OTBBM1x1NEU0OFx1OEZEOVx1NEUyQVVJXHU3NTRDXHU5NzYyXHU1QzMxXHU2NUUwXHU2Q0Q1XHU2M0E1XHU2NTM2XHU4RkQ5XHU2QjIxVG91Y2hcdTU0MEVcdTdFRURcdTc2ODRNb3ZlXHU1NDhDRW5kXHU0RThCXHU0RUY2XHJcblx0ICovXHJcblx0Ly9wcm90ZWN0ZWQgb25Ub3VjaFN0YXJ0ZWQoSW5HZW1vdHJ5IDpVSS5HZW9tZXRyeSxJblBvaW50ZXJFdmVudDpVSS5Qb2ludGVyRXZlbnQpIDpVSS5FdmVudFJlcGx5e1xyXG5cdC8vXHRyZXR1cm4gVUkuRXZlbnRSZXBseS51bkhhbmRsZWQgLy9VSS5FdmVudFJlcGx5LmhhbmRsZWRcclxuXHQvL31cclxuXHJcblx0LyoqXHJcblx0ICogXHU2MjRCXHU2MzA3XHU2MjE2XHU1MjE5XHU5RjIwXHU2ODA3XHU1MThEVUlcdTc1NENcdTk3NjJcdTRFMEFcdTc5RkJcdTUyQThcdTY1RjZcclxuXHQgKi9cclxuXHQvL3Byb3RlY3RlZCBvblRvdWNoTW92ZWQoSW5HZW1vdHJ5IDpVSS5HZW9tZXRyeSxJblBvaW50ZXJFdmVudDpVSS5Qb2ludGVyRXZlbnQpIDpVSS5FdmVudFJlcGx5e1xyXG5cdC8vXHRyZXR1cm4gVUkuRXZlbnRSZXBseS51bkhhbmRsZWQgLy9VSS5FdmVudFJlcGx5LmhhbmRsZWRcclxuXHQvL31cclxuXHJcblx0LyoqXHJcblx0ICogXHU2MjRCXHU2MzA3XHU2MjE2XHU1MjE5XHU5RjIwXHU2ODA3XHU3OUJCXHU1RjAwVUlcdTc1NENcdTk3NjJcdTY1RjZcclxuXHQgKi9cclxuXHQvL3Byb3RlY3RlZCBPblRvdWNoRW5kZWQoSW5HZW1vdHJ5IDpVSS5HZW9tZXRyeSxJblBvaW50ZXJFdmVudDpVSS5Qb2ludGVyRXZlbnQpIDpVSS5FdmVudFJlcGx5e1xyXG5cdC8vXHRyZXR1cm4gVUkuRXZlbnRSZXBseS51bkhhbmRsZWQgLy9VSS5FdmVudFJlcGx5LmhhbmRsZWRcclxuXHQvL31cclxuXHJcblx0LyoqXHJcblx0ICogXHU1RjUzXHU1NzI4VUlcdTc1NENcdTk3NjJcdTRFMEFcdThDMDNcdTc1MjhkZXRlY3REcmFnL2RldGVjdERyYWdJZlByZXNzZWRcdTY1RjZcdTg5RTZcdTUzRDFcdTRFMDBcdTZCMjFcclxuXHQgKiBcdTUzRUZcdTRFRTVcdTg5RTZcdTUzRDFcdTRFMDBcdTZCMjFcdTYyRDZcdTYyRkRcdTRFOEJcdTRFRjZcdTc2ODRcdTVGMDBcdTU5Q0JcdTc1MUZcdTYyMTBcclxuXHQgKiBcdThGRDRcdTU2REVcdTRFMDBcdTZCMjFcdTc1MUZcdTYyMTBcdTc2ODRcdTYyRDZcdTYyRkRcdTRFOEJcdTRFRjYgbmV3RHJhZ0Ryb3BcdTUzRUZcdTRFRTVcdTc1MUZcdTYyMTBcdTRFMDBcdTZCMjFcdTRFOEJcdTRFRjZcclxuXHQgKi9cclxuXHQvL3Byb3RlY3RlZCBvbkRyYWdEZXRlY3RlZChJbkdlbW90cnkgOlVJLkdlb21ldHJ5LEluUG9pbnRlckV2ZW50OlVJLlBvaW50ZXJFdmVudCk6VUkuRHJhZ0Ryb3BPcGVyYXRpb24ge1xyXG5cdC8vXHRyZXR1cm4gdGhpcy5uZXdEcmFnRHJvcChudWxsKVxyXG5cdC8vfVxyXG5cclxuXHQvKipcclxuXHQgKiBcdTYyRDZcdTYyRkRcdTY0Q0RcdTRGNUNcdTc1MUZcdTYyMTBcdTRFOEJcdTRFRjZcdTg5RTZcdTUzRDFcdTU0MEVcdTdFQ0ZcdThGQzdcdThGRDlcdTRFMkFVSVx1NjVGNlx1ODlFNlx1NTNEMVxyXG5cdCAqIFx1OEZENFx1NTZERXRydWVcdTc2ODRcdThCRERcdTg4NjhcdTc5M0FcdTU5MDRcdTc0MDZcdTRFODZcdThGRDlcdTZCMjFcdTRFOEJcdTRFRjZcdUZGMENcdTRFMERcdTRGMUFcdTUxOERcdTVGODBcdThGRDlcdTRFMkFVSVx1NzY4NFx1NEUwQlx1NEUwMFx1NUM0Mlx1NzY4NFVJXHU3RUU3XHU3RUVEXHU1MTkyXHU2Q0UxXHU4RkQ5XHU0RTJBXHU0RThCXHU0RUY2XHJcblx0ICovXHJcblx0Ly9wcm90ZWN0ZWQgb25EcmFnT3ZlcihJbkdlbW90cnkgOlVJLkdlb21ldHJ5LEluRHJhZ0Ryb3BFdmVudDpVSS5Qb2ludGVyRXZlbnQsSW5EcmFnRHJvcE9wZXJhdGlvbjpVSS5EcmFnRHJvcE9wZXJhdGlvbik6Ym9vbGVhbiB7XHJcblx0Ly9cdHJldHVybiB0cnVlXHJcblx0Ly99XHJcblxyXG5cdC8qKlxyXG5cdCAqIFx1NjJENlx1NjJGRFx1NjRDRFx1NEY1Q1x1NzUxRlx1NjIxMFx1NEU4Qlx1NEVGNlx1ODlFNlx1NTNEMVx1NTQwRVx1NTcyOFx1OEZEOVx1NEUyQVVJXHU5MUNBXHU2NTNFXHU1QjhDXHU2MjEwXHU2NUY2XHJcblx0ICogXHU4RkQ0XHU1NkRFdHJ1ZVx1NzY4NFx1OEJERFx1ODg2OFx1NzkzQVx1NTkwNFx1NzQwNlx1NEU4Nlx1OEZEOVx1NkIyMVx1NEU4Qlx1NEVGNlx1RkYwQ1x1NEUwRFx1NEYxQVx1NTE4RFx1NUY4MFx1OEZEOVx1NEUyQVVJXHU3Njg0XHU0RTBCXHU0RTAwXHU1QzQyXHU3Njg0VUlcdTdFRTdcdTdFRURcdTUxOTJcdTZDRTFcdThGRDlcdTRFMkFcdTRFOEJcdTRFRjZcclxuXHQgKi9cclxuXHQvL3Byb3RlY3RlZCBvbkRyb3AoSW5HZW1vdHJ5IDpVSS5HZW9tZXRyeSxJbkRyYWdEcm9wRXZlbnQ6VUkuUG9pbnRlckV2ZW50LEluRHJhZ0Ryb3BPcGVyYXRpb246VUkuRHJhZ0Ryb3BPcGVyYXRpb24pOmJvb2xlYW4ge1xyXG5cdC8vXHRyZXR1cm4gdHJ1ZVxyXG5cdC8vfVxyXG5cclxuXHQvKipcclxuXHQgKiBcdTYyRDZcdTYyRkRcdTY0Q0RcdTRGNUNcdTc1MUZcdTYyMTBcdTRFOEJcdTRFRjZcdTg5RTZcdTUzRDFcdTU0MEVcdThGREJcdTUxNjVcdThGRDlcdTRFMkFVSVx1NjVGNlx1ODlFNlx1NTNEMVxyXG5cdCAqL1xyXG5cdC8vcHJvdGVjdGVkIG9uRHJhZ0VudGVyKEluR2Vtb3RyeSA6VUkuR2VvbWV0cnksSW5EcmFnRHJvcEV2ZW50OlVJLlBvaW50ZXJFdmVudCxJbkRyYWdEcm9wT3BlcmF0aW9uOlVJLkRyYWdEcm9wT3BlcmF0aW9uKSB7XHJcblx0Ly99XHJcblxyXG5cdC8qKlxyXG5cdCAqIFx1NjJENlx1NjJGRFx1NjRDRFx1NEY1Q1x1NzUxRlx1NjIxMFx1NEU4Qlx1NEVGNlx1ODlFNlx1NTNEMVx1NTQwRVx1NzlCQlx1NUYwMFx1OEZEOVx1NEUyQVVJXHU2NUY2XHU4OUU2XHU1M0QxXHJcblx0ICovXHJcblx0Ly9wcm90ZWN0ZWQgb25EcmFnTGVhdmUoSW5HZW1vdHJ5IDpVSS5HZW9tZXRyeSxJbkRyYWdEcm9wRXZlbnQ6VUkuUG9pbnRlckV2ZW50KSB7XHJcblx0Ly99XHJcblx0XHJcblx0LyoqXHJcblx0ICogXHU2MkQ2XHU2MkZEXHU2NENEXHU0RjVDXHU3NTFGXHU2MjEwXHU0RThCXHU0RUY2XHU4OUU2XHU1M0QxXHU1NDBFXHVGRjBDXHU2Q0ExXHU2NzA5XHU1QjhDXHU2MjEwXHU1QjhDXHU2MjEwXHU3Njg0XHU2MkQ2XHU2MkZEXHU0RThCXHU0RUY2XHU4MDBDXHU1M0Q2XHU2RDg4XHU2NUY2XHU4OUU2XHU1M0QxXHJcblx0ICovXHJcblx0Ly9wcm90ZWN0ZWQgb25EcmFnQ2FuY2VsbGVkKEluR2Vtb3RyeSA6VUkuR2VvbWV0cnksSW5EcmFnRHJvcEV2ZW50OlVJLlBvaW50ZXJFdmVudCkge1xyXG5cdC8vfVxyXG5cclxufVxyXG4iLCAiZXhwb3J0IG5hbWVzcGFjZSBHYW1lRGVme1xyXG4gICAgLyogXHU1QkY5XHU4QzYxXHU2QzYwXHU2M0E1XHU1M0UzICovXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElQb29sPFQ+IHtcclxuXHJcbiAgICAgICAgYWxsb2NhdGUoKTogVFxyXG4gICAgXHJcbiAgICAgICAgcmVjeWNsZShvYmo6IFQpOiBib29sZWFuXHJcbiAgICBcclxuICAgICAgICByZWxlYXNlKCk6IHZvaWRcclxuICAgIFxyXG4gICAgfVxyXG4gICAgLyogXHU1QkY5XHU4QzYxXHU1REU1XHU1MzgyXHU2M0E1XHU1M0UzICovXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElPYmplY3RGYWN0b3J5PFQ+IHtcclxuXHJcbiAgICAgICAgY3JlYXRlKCk6IFRcclxuXHJcbiAgICAgICAgZGVzdHJveShvYmo6IFQpOiB2b2lkXHJcblxyXG4gICAgfVxyXG4gICAgLyogXHU1QkY5XHU4QzYxXHU2QzYwXHU2MkJEXHU4QzYxXHU2QTIxXHU2NzdGXHU3QzdCICovXHJcbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgUG9vbDxUPiBpbXBsZW1lbnRzIElQb29sPFQ+IHtcclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIG1DYWNoZVN0YWNrOiBBcnJheTxUPiA9IG5ldyBBcnJheTxUPigpXHJcblxyXG4gICAgICAgIG1Vc2luZ0FycmF5OiBBcnJheTxUPiA9IG5ldyBBcnJheTxUPigpXHJcblxyXG4gICAgICAgIGdldCBDYWNoZVN0YWNrQ291bnQoKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubUNhY2hlU3RhY2subGVuZ3RoXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgVXNpbmdDb3VudCgpOiBudW1iZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tVXNpbmdBcnJheS5sZW5ndGhcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBtRmFjdG9yeTogSU9iamVjdEZhY3Rvcnk8VD5cclxuXHJcbiAgICAgICAgYWxsb2NhdGUoKTogVCB7XHJcbiAgICAgICAgICAgIGxldCBvYmogPSB0aGlzLm1DYWNoZVN0YWNrLmxlbmd0aCA+IDAgPyB0aGlzLm1DYWNoZVN0YWNrLnBvcCgpIDogdGhpcy5tRmFjdG9yeS5jcmVhdGUoKVxyXG4gICAgICAgICAgICB0aGlzLm1Vc2luZ0FycmF5LnB1c2gob2JqKVxyXG4gICAgICAgICAgICByZXR1cm4gb2JqXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhYnN0cmFjdCByZWN5Y2xlKG9iajogVCk6IGJvb2xlYW5cclxuXHJcbiAgICAgICAgcmVsZWFzZSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAgO2kgPCB0aGlzLm1Vc2luZ0FycmF5Lmxlbmd0aCA7aSsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5tVXNpbmdBcnJheVtpXVxyXG4gICAgICAgICAgICAgICAgdGhpcy5tRmFjdG9yeS5kZXN0cm95KGVsZW1lbnQpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5tVXNpbmdBcnJheS5sZW5ndGggPSAwXHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCA7aSA8IHRoaXMubUNhY2hlU3RhY2subGVuZ3RoIDtpKyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLm1DYWNoZVN0YWNrW2ldXHJcbiAgICAgICAgICAgICAgICB0aGlzLm1GYWN0b3J5LmRlc3Ryb3koZWxlbWVudClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm1DYWNoZVN0YWNrLmxlbmd0aCA9IDBcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgLyogXHU4MUVBXHU1QjlBXHU0RTQ5XHU1REU1XHU1MzgyXHU2QTIxXHU2NzdGXHU3QzdCICovXHJcbiAgICBleHBvcnQgY2xhc3MgQ3VzdG9tT2JqZWN0RmFjdG9yeTxUPiBpbXBsZW1lbnRzIElPYmplY3RGYWN0b3J5PFQ+IHtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBtRmFjdG9yeUNyZWF0ZU1ldGhvZDogKCkgPT4gVFxyXG5cclxuICAgICAgICBwcml2YXRlIG1GYWN0b3J5RGVzdHJveU1ldGhvZDogKG9iajogVCkgPT4gdm9pZFxyXG5cclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IoZmFjdG9yeUNyZWF0ZU1ldGhvZDogKCkgPT4gVCwgZmFjdG9yeURlc3Ryb3lNZXRob2Q6IChvYmo6IFQpID0+IHZvaWQpIHtcclxuICAgICAgICAgICAgdGhpcy5tRmFjdG9yeUNyZWF0ZU1ldGhvZCA9IGZhY3RvcnlDcmVhdGVNZXRob2RcclxuICAgICAgICAgICAgdGhpcy5tRmFjdG9yeURlc3Ryb3lNZXRob2QgPSBmYWN0b3J5RGVzdHJveU1ldGhvZFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY3JlYXRlKCk6IFQge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tRmFjdG9yeUNyZWF0ZU1ldGhvZCgpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkZXN0cm95KG9iajogVCk6IHZvaWQge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tRmFjdG9yeURlc3Ryb3lNZXRob2Qob2JqKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICAvKiBcdTVCRjlcdThDNjFcdTZDNjBcdTZBMjFcdTY3N0ZcdTdDN0IgKi9cclxuICAgIGV4cG9ydCBjbGFzcyBTaW1wbGVPYmplY3RQb29sPFQ+IGV4dGVuZHMgUG9vbDxUPiB7XHJcblxyXG4gICAgICAgIG1SZXNldE1ldGhvZDogRnVuY3Rpb25cclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IoZmFjdG9yeUNyZWF0ZU1ldGhvZDogKCkgPT4gVCwgZmFjdG9yeURlc3Ryb3lNZXRob2Q6IChvYmo6IFQpID0+IHZvaWQsIHJlc2V0TWV0aG9kOiBGdW5jdGlvbiA9IG51bGwpIHtcclxuICAgICAgICAgICAgc3VwZXIoKVxyXG4gICAgICAgICAgICB0aGlzLm1GYWN0b3J5ID0gbmV3IEN1c3RvbU9iamVjdEZhY3Rvcnk8VD4oZmFjdG9yeUNyZWF0ZU1ldGhvZCwgZmFjdG9yeURlc3Ryb3lNZXRob2QpXHJcbiAgICAgICAgICAgIHRoaXMubVJlc2V0TWV0aG9kID0gcmVzZXRNZXRob2RcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJlY3ljbGUob2JqOiBUKTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1DYWNoZVN0YWNrLmluZGV4T2Yob2JqKSA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5tUmVzZXRNZXRob2QgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tUmVzZXRNZXRob2Qob2JqKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBpbmRleCA9IHRoaXMubVVzaW5nQXJyYXkuaW5kZXhPZihvYmopXHJcbiAgICAgICAgICAgIGlmIChpbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1Vc2luZ0FycmF5LnNwbGljZShpbmRleCwgMSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm1DYWNoZVN0YWNrLnB1c2gob2JqKVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmVjeWNsZUFsbCgpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAgO2kgPCB0aGlzLm1Vc2luZ0FycmF5Lmxlbmd0aCA7aSsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5tVXNpbmdBcnJheVtpXVxyXG4gICAgICAgICAgICAgICAgdGhpcy5tUmVzZXRNZXRob2QoZWxlbWVudClcclxuICAgICAgICAgICAgICAgIHRoaXMubUNhY2hlU3RhY2sucHVzaChlbGVtZW50KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubVVzaW5nQXJyYXkubGVuZ3RoID0gMFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpbnRUb3RhbFNpemUoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJ0b3RhbCBzaXplOiBcIiArICh0aGlzLlVzaW5nQ291bnQgKyB0aGlzLkNhY2hlU3RhY2tDb3VudCkpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyogXHU5MUNEXHU1MjlCICovXHJcbiAgICBleHBvcnQgY29uc3QgR1JBVklUQUlPTkFMX0FDQ0VMRVJBVElPTjogbnVtYmVyID0gOS44XHJcbiAgICAvKiBcdTY3MDBcdTU5MjdcdTVCNTBcdTVGMzlcdTkwMUZcdTVFQTYgKi9cclxuICAgIGV4cG9ydCBjb25zdCBNQVhfU0hPT1RTUEVFRDogbnVtYmVyID0gMTAwMDFcclxuICAgIC8qIGRlYnVnXHU2ODA3XHU4QkM2ICovXHJcbiAgICBleHBvcnQgY29uc3QgREVCVUdfRkxBRzogYm9vbGVhbiA9IGZhbHNlXHJcbiAgICAvKiBcdTc1MjhcdTRFOEVcdTgzQjdcdTUzRDZcdTUzRDFcdTVDMDRcdTY1QjlcdTU0MTFcdTc2ODRcdTVDMDRcdTdBMEJcdThERERcdTc5QkIgKi9cclxuICAgIGV4cG9ydCBjb25zdCBTSE9PVF9SQU5HRTogbnVtYmVyID0gMTAwMDAwXHJcbiAgICAvKiBcdTVGMzlcdTU4RjNcdTYyOUJcdTVDMDRcdTYzMDFcdTdFRURcdTY1RjZcdTk1RjQgKi9cclxuICAgIGV4cG9ydCBjb25zdCBDQVNJTkdfTElGRTogbnVtYmVyID0gMVxyXG4gICAgLyogXHU1RjM5XHU1OEYzXHU2MjlCXHU1QzA0XHU0RjREXHU3RjZFXHU1MDRGXHU3OUZCICovXHJcbiAgICBleHBvcnQgY29uc3QgQ0FTSU5HX09GRlNFVDogVHlwZS5WZWN0b3IgPSBuZXcgVHlwZS5WZWN0b3IoOCwgNSwgMTApXHJcbn0iLCAiaW1wb3J0IHsgR2FtZURlZiB9IGZyb20gXCIuLi9HYW1lRGVmXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFtbW8ge1xyXG4gICAgb3duZXI6IEdhbWVwbGF5LkNoYXJhY3RlciAvLyBcdTVGMzlcdTgzNkZcdTYyNDBcdTVDNUVcdTg5RDJcdTgyNzJcclxuICAgIGhpdFJlc3VsdDogQ29yZS5HYW1lT2JqZWN0W10gfCBHYW1lcGxheS5IaXRSZXN1bHRbXSAvLyBcdTUxRkJcdTRFMkRcdTdFRDNcdTY3OUNcclxuXHJcbiAgICBwcml2YXRlIGFtbW9Qb29sOiBHYW1lRGVmLlNpbXBsZU9iamVjdFBvb2w8Q29yZS5HYW1lT2JqZWN0PiAvLyBcdTVGMzlcdTgzNkZcdTVCRjlcdThDNjFcdTZDNjBcclxuICAgIHByaXZhdGUgZW50aXR5OiBDb3JlLkdhbWVPYmplY3QgLy8gXHU1RjM5XHU4MzZGXHU1QjlFXHU0RjUzXHJcbiAgICBwcml2YXRlIGRpc3BsYWNlbWVudDogVHlwZS5WZWN0b3IgLy8gXHU2QkNGXHU3OUQyXHU0RjREXHU3OUZCXHJcbiAgICBwcml2YXRlIGN1cnJlbnRMb2NhdGlvbjogVHlwZS5WZWN0b3IgLy8gXHU1RjUzXHU1MjREXHU0RjREXHU3RjZFXHJcbiAgICBwcml2YXRlIGdyYXZpdHlTY2FsZTogbnVtYmVyIC8vIFx1OTFDRFx1NTI5Qlx1N0NGQlx1NjU3MFxyXG4gICAgcHJpdmF0ZSBsaWZlVGltZTogbnVtYmVyIC8vIFx1NzUxRlx1NTQ3RFx1NTQ2OFx1NjcxRlxyXG4gICAgcHJpdmF0ZSBjdXJyZW50VGltZTogbnVtYmVyIC8vIFx1NUY1M1x1NTI0RFx1OEZEMFx1NTJBOFx1NjVGNlx1OTVGNFxyXG4gICAgcHJpdmF0ZSBzdHJpZGU6IFR5cGUuVmVjdG9yIC8vIFx1NkI2NVx1OTU3RlxyXG4gICAgcHJpdmF0ZSBkZXRlY3RSYWRpdXM6IG51bWJlciAvLyBcdTc4QjBcdTY0OUVcdTY4QzBcdTZENEJcdTUzNEFcdTVGODRcdFxyXG5cclxuICAgIGNvbnN0cnVjdG9yKG93bmVyOiBHYW1lcGxheS5DaGFyYWN0ZXIsIGFtbW9Qb29sOiBHYW1lRGVmLlNpbXBsZU9iamVjdFBvb2w8Q29yZS5HYW1lT2JqZWN0Piwgc3RhcnRMb2M6IFR5cGUuVmVjdG9yLCBkaXJlY3Rpb246IFR5cGUuVmVjdG9yLCBzaG9vdFJhbmdlOiBudW1iZXIsIGFtbW9TcGVlZDogbnVtYmVyLCBncmF2aXR5U2NhbGU6IG51bWJlciwgZGV0ZWN0UmFkaXVzOiBudW1iZXIsIGhpdFJlc3VsdDogQ29yZS5HYW1lT2JqZWN0W10gfCBHYW1lcGxheS5IaXRSZXN1bHRbXSA9IFtdKSB7XHJcbiAgICAgICAgdGhpcy5vd25lciA9IG93bmVyXHJcbiAgICAgICAgdGhpcy5hbW1vUG9vbCA9IGFtbW9Qb29sXHJcbiAgICAgICAgdGhpcy5lbnRpdHkgPSB0aGlzLmFtbW9Qb29sLmFsbG9jYXRlKClcclxuICAgICAgICB0aGlzLmVudGl0eS5kZXRhY2hGcm9tR2FtZU9iamVjdCgpXHJcbiAgICAgICAgdGhpcy5jdXJyZW50TG9jYXRpb24gPSBzdGFydExvYy5jbG9uZSgpXHJcbiAgICAgICAgdGhpcy5lbnRpdHkud29ybGRMb2NhdGlvbiA9IHRoaXMuY3VycmVudExvY2F0aW9uXHJcbiAgICAgICAgdGhpcy5lbnRpdHkud29ybGRSb3RhdGlvbiA9IGRpcmVjdGlvbi50b1JvdGF0aW9uKClcclxuICAgICAgICB0aGlzLmVudGl0eS5zZXRWaXNpYmlsaXR5KFR5cGUuUHJvcGVydHlTdGF0dXMuT24pXHJcbiAgICAgICAgdGhpcy5kaXNwbGFjZW1lbnQgPSBUeXBlLlZlY3Rvci5tdWx0aXBseShkaXJlY3Rpb24sIGFtbW9TcGVlZCwgdGhpcy5kaXNwbGFjZW1lbnQpXHJcbiAgICAgICAgdGhpcy5saWZlVGltZSA9IHNob290UmFuZ2UgLyBhbW1vU3BlZWRcclxuICAgICAgICB0aGlzLmN1cnJlbnRUaW1lID0gMFxyXG4gICAgICAgIHRoaXMuZ3Jhdml0eVNjYWxlID0gZ3Jhdml0eVNjYWxlXHJcbiAgICAgICAgdGhpcy5zdHJpZGUgPSBUeXBlLlZlY3Rvci56ZXJvXHJcbiAgICAgICAgdGhpcy5kZXRlY3RSYWRpdXMgPSBkZXRlY3RSYWRpdXNcclxuICAgICAgICB0aGlzLmhpdFJlc3VsdCA9IGhpdFJlc3VsdFxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvLyBcdTY2RjRcdTY1QjBcdTVGMzlcdTgzNkZcdTRGNERcdTdGNkVcdUZGMENcdTUzRDFcdTVDMDRcdTVCQTJcdTYyMzdcdTdBRUZcdTYyN0ZcdTYyQzVcdTY4QzBcdTZENEJcclxuICAgIHB1YmxpYyB1cGRhdGUoZHQ6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIC8vIFx1OEJBMVx1N0I5N1x1NUY1M1x1NTI0RFx1NUUyN1x1NUYzOVx1ODM2Rlx1NzlGQlx1NTJBOFx1NkI2NVx1OTU3RlxyXG4gICAgICAgIHRoaXMuc3RyaWRlID0gVHlwZS5WZWN0b3IubXVsdGlwbHkodGhpcy5kaXNwbGFjZW1lbnQsIGR0LCB0aGlzLnN0cmlkZSlcclxuICAgICAgICAvLyBcdTU5ODJcdTY3OUNcdTkxQ0RcdTUyOUJcdTdDRkJcdTY1NzBcdTRFMERcdTRFM0EwXHU1MjE5XHU1QkY5elx1OEY3NFx1NTc1MFx1NjgwN1x1NTQ4Q1x1NjVDQlx1OEY2Q1x1OEZEQlx1ODg0Q1x1OEZEQlx1NEUwMFx1NkI2NVx1OEJBMVx1N0I5N1xyXG4gICAgICAgIGlmICh0aGlzLmdyYXZpdHlTY2FsZSkge1xyXG4gICAgICAgICAgICB0aGlzLnN0cmlkZS56IC09ICg1MCAqIHRoaXMuZ3Jhdml0eVNjYWxlICogR2FtZURlZi5HUkFWSVRBSU9OQUxfQUNDRUxFUkFUSU9OICogKE1hdGgucG93KHRoaXMuY3VycmVudFRpbWUgKyBkdCwgMikgLSBNYXRoLnBvdyh0aGlzLmN1cnJlbnRUaW1lLCAyKSkpXHJcbiAgICAgICAgICAgIHRoaXMuZW50aXR5LndvcmxkUm90YXRpb24gPSB0aGlzLnN0cmlkZS50b1JvdGF0aW9uKClcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50VGltZSArPSBkdFxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBcdThCQTFcdTdCOTdcdTUxRkFcdTVGNTNcdTUyNERcdTY2RjRcdTY1QjBcdTRGNERcdTdGNkVcclxuICAgICAgICB0aGlzLmN1cnJlbnRMb2NhdGlvbi54ICs9IHRoaXMuc3RyaWRlLnhcclxuICAgICAgICB0aGlzLmN1cnJlbnRMb2NhdGlvbi55ICs9IHRoaXMuc3RyaWRlLnlcclxuICAgICAgICB0aGlzLmN1cnJlbnRMb2NhdGlvbi56ICs9IHRoaXMuc3RyaWRlLnpcclxuXHJcbiAgICAgICAgLy8gXHU1OTgyXHU2NzlDXHU2OEMwXHU2RDRCXHU4MzAzXHU1NkY0XHU1OTI3XHU0RThFMFx1RkYwQ1x1NkJDRlx1NUUyN1x1NjhDMFx1NkQ0Qlx1NzhCMFx1NjQ5RVx1RkYwOFx1NTNFQVx1NjcwOVx1NkI2Nlx1NTY2OFx1NjMwMVx1NjcwOVx1NEVCQVx1NUJBMlx1NjIzN1x1N0FFRlx1NUI1MFx1NUYzOVx1OEZEQlx1ODg0Q1x1NjhDMFx1NkQ0Qlx1RkYwQ1x1NTE3Nlx1NEY1OVx1NUJBMlx1NjIzN1x1N0FFRlx1NTNFQVx1NjYyRlx1NkEyMVx1NjJERlx1RkYwOVxyXG4gICAgICAgIGlmICh0aGlzLmRldGVjdFJhZGl1cykge1xyXG4gICAgICAgICAgICAvLyBcdTU5ODJcdTY3OUNcdTY4QzBcdTZENEJcdTgzMDNcdTU2RjRcdTVDMEZcdTRFOEUxMFx1RkYwQ1x1NUMwNFx1N0VCRlx1NjhDMFx1NkQ0Qlx1RkYwQ1x1OEZENFx1NTZERUdhbWVwbGF5LkhpdFJlc3VsdFx1NjU3MFx1N0VDNFxyXG4gICAgICAgICAgICBpZiAodGhpcy5kZXRlY3RSYWRpdXMgPCAxMCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGxpbmVSZXN1bHQgPSBHYW1lcGxheS5saW5lVHJhY2UodGhpcy5lbnRpdHkud29ybGRMb2NhdGlvbiwgdGhpcy5jdXJyZW50TG9jYXRpb24sIHRydWUsIEdhbWVEZWYuREVCVUdfRkxBRylcclxuICAgICAgICAgICAgICAgIGxpbmVSZXN1bHQgPSBsaW5lUmVzdWx0LmZpbHRlcihlID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gIShlLmdhbWVPYmplY3QgaW5zdGFuY2VvZiBHYW1lcGxheS5UcmlnZ2VyKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC8vIFx1NUMwNFx1N0VCRlx1NjhDMFx1NkQ0Qlx1N0VEM1x1Njc5Q1x1NEUwRFx1NEUzQTBcdUZGMENcdTUzNzNcdTY3MDlcdTc4QjBcdTY0OUVcdTVCRjlcdThDNjFcclxuICAgICAgICAgICAgICAgIGlmIChsaW5lUmVzdWx0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBcdTdFQzhcdTdFRDNcdTVGMzlcdTgzNkZcdTc1MUZcdTU0N0RcdUZGMENcdTgzQjdcdTUzRDZcdTY4QzBcdTZENEJcdTdFRDNcdTY3OUNcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxpZmVUaW1lID0gLTFcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcCA9IG5ldyBBcnJheTxHYW1lcGxheS5IaXRSZXN1bHQ+KClcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBlbGVtZW50IG9mIGxpbmVSZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcC5wdXNoKGVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGl0UmVzdWx0ID0gdGVtcFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgeyAvLyBcdTU5ODJcdTY3OUNcdTY4QzBcdTZENEJcdTgzMDNcdTU2RjRcdTU5MjdcdTRFOEVcdTdCNDlcdTRFOEUxMFx1RkYwQ1x1NzdFOVx1NUY2Mlx1NjhDMFx1NkQ0Qlx1RkYwQ1x1OEZENFx1NTZERUNvcmUuR2FtZU9iamVjdFx1NjU3MFx1N0VDNFxyXG4gICAgICAgICAgICAgICAgbGV0IGJveFJlc3VsdCA9IEdhbWVwbGF5LmJveE92ZXJsYXBJbkxldmVsKHRoaXMuZW50aXR5LndvcmxkTG9jYXRpb24sIHRoaXMuY3VycmVudExvY2F0aW9uLCB0aGlzLmRldGVjdFJhZGl1cywgdGhpcy5kZXRlY3RSYWRpdXMsIEdhbWVEZWYuREVCVUdfRkxBRylcclxuICAgICAgICAgICAgICAgIC8vIFx1NUMwNFx1N0VCRlx1NjhDMFx1NkQ0Qlx1N0VEM1x1Njc5Q1x1NEUwRFx1NEUzQTBcdUZGMENcdTUzNzNcdTY3MDlcdTc4QjBcdTY0OUVcdTVCRjlcdThDNjFcclxuICAgICAgICAgICAgICAgIGlmIChib3hSZXN1bHQubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFx1N0VDOFx1N0VEM1x1NUYzOVx1ODM2Rlx1NzUxRlx1NTQ3RFx1RkYwQ1x1ODNCN1x1NTNENlx1NjhDMFx1NkQ0Qlx1N0VEM1x1Njc5Q1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGlmZVRpbWUgPSAtMVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGl0UmVzdWx0ID0gYm94UmVzdWx0XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFx1NjZGNFx1NjVCMFx1NUYzOVx1ODM2Rlx1NUI5RVx1NEY1M1x1NEY0RFx1N0Y2RVx1RkYwQ1x1NUYzOVx1ODM2Rlx1NzUxRlx1NTQ3RC09XHU1RjUzXHU1MjREXHU1RTI3XHU2NUY2XHU5NUY0XHVGRjBDXHU4RkQ0XHU1NkRFXHU1RjM5XHU4MzZGXHU3NTFGXHU1NDdEPDBcdTc2ODRCb29sZWFuXHU1MDNDXHJcbiAgICAgICAgdGhpcy5lbnRpdHkud29ybGRMb2NhdGlvbiA9IHRoaXMuY3VycmVudExvY2F0aW9uXHJcbiAgICAgICAgdGhpcy5saWZlVGltZSAtPSBkdFxyXG4gICAgICAgIHJldHVybiB0aGlzLmxpZmVUaW1lIDw9IDBcclxuICAgIH1cclxuXHJcbiAgICAvLyBcdTk1MDBcdTZCQzFcdTVGMzlcdTgzNkZcdTY1QjlcdTZDRDVcdUZGMENcdTVCRjlcdThDNjFcdTZDNjBcdTU2REVcdTY1MzZcdTVGMzlcdTgzNkZcdTVCOUVcdTRGNTNcclxuICAgIHB1YmxpYyBkZXN0cm95KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuYW1tb1Bvb2wucmVjeWNsZSh0aGlzLmVudGl0eSlcclxuICAgIH1cclxuXHJcbn0iLCAiaW1wb3J0IHsgR2FtZURlZiB9IGZyb20gXCIuLi9HYW1lRGVmXCJcclxuXHJcbi8vIFx1NUYzOVx1NThGM1x1N0M3QlxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYXNpbmcge1xyXG5cdHByaXZhdGUgY2FzaW5nUG9vbDogR2FtZURlZi5TaW1wbGVPYmplY3RQb29sPENvcmUuR2FtZU9iamVjdD4gLy8gXHU1RjM5XHU1OEYzXHU1QkY5XHU4QzYxXHU2QzYwXHJcblx0cHJpdmF0ZSBlbnRpdHk6IENvcmUuR2FtZU9iamVjdCAvLyBcdTVGMzlcdTU4RjNcdTVCOUVcdTRGNTNcclxuXHRwcml2YXRlIGRpc3BsYWNlbWVudDogVHlwZS5WZWN0b3IgLy8gXHU0RjREXHU3OUZCXHJcblx0cHJpdmF0ZSBsb2M6IFR5cGUuVmVjdG9yIC8vIFx1NUY1M1x1NTI0RFx1NEY0RFx1N0Y2RVxyXG5cdHByaXZhdGUgZ3Jhdml0eTogbnVtYmVyIC8vIFx1OTFDRFx1NTI5QlxyXG5cdHByaXZhdGUgbGlmZVRpbWU6IG51bWJlciAvLyBcdTc1MUZcdTU0N0RcdTU0NjhcdTY3MUZcclxuXHRwcml2YXRlIHN0cmlkZTogVHlwZS5WZWN0b3IgLy8gXHU2QjY1XHU5NTdGXHJcblxyXG5cdGNvbnN0cnVjdG9yKGNhc2luZ1Bvb2w6IEdhbWVEZWYuU2ltcGxlT2JqZWN0UG9vbDxDb3JlLkdhbWVPYmplY3Q+LCBjYXNpbmc6IENvcmUuR2FtZU9iamVjdCwgZGlyZWN0aW9uOiBUeXBlLlZlY3Rvcikge1xyXG5cdFx0dGhpcy5jYXNpbmdQb29sID0gY2FzaW5nUG9vbFxyXG5cdFx0dGhpcy5sb2MgPSBUeXBlLlZlY3Rvci5hZGQoY2FzaW5nLndvcmxkTG9jYXRpb24sIGNhc2luZy53b3JsZFJvdGF0aW9uLnJvdGF0ZVZlY3RvcihHYW1lRGVmLkNBU0lOR19PRkZTRVQpKVxyXG5cdFx0dGhpcy5lbnRpdHkgPSB0aGlzLmNhc2luZ1Bvb2wuYWxsb2NhdGUoKVxyXG5cdFx0dGhpcy5lbnRpdHkud29ybGRMb2NhdGlvbiA9IHRoaXMubG9jXHJcblx0XHR0aGlzLmVudGl0eS53b3JsZFJvdGF0aW9uID0gbmV3IFR5cGUuUm90YXRpb24oVXRpbC5NYXRoVXRpbC5yYW5kb21GbG9hdCgwLCAxODApLCBVdGlsLk1hdGhVdGlsLnJhbmRvbUZsb2F0KDAsIDE4MCksIFV0aWwuTWF0aFV0aWwucmFuZG9tRmxvYXQoMCwgMTgwKSlcclxuXHRcdHRoaXMuZW50aXR5LnNldFZpc2liaWxpdHkoVHlwZS5Qcm9wZXJ0eVN0YXR1cy5PbilcclxuXHRcdHRoaXMuZGlzcGxhY2VtZW50ID0gZGlyZWN0aW9uLm11bHRpcGx5KDEwMClcclxuXHRcdHRoaXMuZ3Jhdml0eSA9IFV0aWwuTWF0aFV0aWwucmFuZG9tRmxvYXQoMSwgMylcclxuXHRcdHRoaXMubGlmZVRpbWUgPSBHYW1lRGVmLkNBU0lOR19MSUZFXHJcblx0XHR0aGlzLnN0cmlkZSA9IFR5cGUuVmVjdG9yLnplcm9cclxuXHR9XHJcblxyXG5cdC8vIFx1NjZGNFx1NjVCMFx1NUYzOVx1NThGM1x1NEY0RFx1N0Y2RVxyXG5cdHVwZGF0ZShkdDogbnVtYmVyKSB7XHJcblx0XHR0aGlzLnN0cmlkZSA9IFR5cGUuVmVjdG9yLm11bHRpcGx5KHRoaXMuZGlzcGxhY2VtZW50LCBkdCwgdGhpcy5zdHJpZGUpXHJcblx0XHR0aGlzLmxvYy54ICs9IHRoaXMuc3RyaWRlLnhcclxuXHRcdHRoaXMubG9jLnkgKz0gdGhpcy5zdHJpZGUueVxyXG5cdFx0dGhpcy5sb2MueiArPSB0aGlzLnN0cmlkZS56ICsgdGhpcy5ncmF2aXR5XHJcblx0XHR0aGlzLmdyYXZpdHkgLT0gZHQgKiAyMFxyXG5cdFx0dGhpcy5lbnRpdHkud29ybGRMb2NhdGlvbiA9IHRoaXMubG9jXHJcblx0XHR0aGlzLmxpZmVUaW1lIC09IGR0XHJcblx0XHRyZXR1cm4gdGhpcy5saWZlVGltZSA8PSAwXHJcblx0fVxyXG5cclxuXHQvLyBcdTk1MDBcdTZCQzFcdTVGMzlcdTU4RjNcdTY1QjlcdTZDRDVcdUZGMENcdTVCRjlcdThDNjFcdTZDNjBcdTU2REVcdTY1MzZcdTVGMzlcdTU4RjNcdTVCOUVcdTRGNTNcclxuXHRkZXN0cm95KCkge1xyXG5cdFx0dGhpcy5jYXNpbmdQb29sLnJlY3ljbGUodGhpcy5lbnRpdHkpXHJcblxyXG5cdH1cclxufSIsICJpbXBvcnQgeyBJV2VhcG9uQ29uZmlnRWxlbWVudCwgV2VhcG9uQ29uZmlnQ29uZmlnIH0gZnJvbSBcIi4uL0NvbmZpZy9XZWFwb25Db25maWdcIlxyXG5pbXBvcnQgeyBHYW1lRGVmIH0gZnJvbSBcIi4uL0dhbWVEZWZcIlxyXG5pbXBvcnQgQW1tbyBmcm9tIFwiLi9BbW1vQmFzZUNsc1wiXHJcbmltcG9ydCBDYXNpbmcgZnJvbSBcIi4vQ2FzaW5nQmFzZUNsc1wiXHJcbmltcG9ydCBXZWFwb25VSSBmcm9tIFwiLi9XZWFwb25VSVwiXHJcbmltcG9ydCB7IEdhbWVDb25maWcgfSBmcm9tIFwiLi4vQ29uZmlnL0dhbWVDb25maWdcIlxyXG5pbXBvcnQgeyBQcmVmYWJFdmVudCB9IGZyb20gXCIuLi8uLi9wcmVmYWJFdmVudC9QcmVmYWJFdmVudFwiXHJcbmltcG9ydCB7IElBY3Rpb25FbGVtZW50IH0gZnJvbSBcIi4uL0NvbmZpZy9BY3Rpb25cIlxyXG5pbXBvcnQgeyBJV2VhcG9uUmVzb3VyY2VzRWxlbWVudCB9IGZyb20gXCIuLi9Db25maWcvV2VhcG9uUmVzb3VyY2VzXCJcclxuXHJcbkBDb3JlLkNsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdlYXBvbkRyaXZlciBleHRlbmRzIENvcmUuU2NyaXB0IHtcclxuXHQvKiogKi9cclxuXHRwdWJsaWMgY29uZmlnOiBJV2VhcG9uQ29uZmlnRWxlbWVudFxyXG5cdC8qKlx1NjYyRlx1NTQyNlx1NUI4Q1x1NjIxMFx1NTIxRFx1NTlDQlx1NTMxNiAqL1xyXG5cdHByaXZhdGUgaGFzSW5pdDogYm9vbGVhbiA9IGZhbHNlXHJcblxyXG5cdEBDb3JlLlByb3BlcnR5KHsgaGlkZUluRWRpdG9yOiB0cnVlLCByZXBsaWNhdGVkOiB0cnVlLCBvbkNoYW5nZWQ6IFwib25FcXVpcGRDaGFuZ2VkXCIgfSlcclxuXHRwdWJsaWMgaXNFcXVpcGVkOiBib29sZWFuID0gZmFsc2VcclxuXHJcblx0LyogXHU3MEVEXHU2QjY2XHU1NjY4XHU5MDNCXHU4RjkxXHU1QkY5XHU4QzYxICovXHJcblx0d2VhcG9uT2JqOiBHYW1lcGxheS5Ib3RXZWFwb24gPSBudWxsXHJcblxyXG5cdC8qIFx1NTJBOFx1NEY1Q1x1OEQ0NFx1NkU5MCAqL1xyXG5cdHdlYXBvbkFjdGlvbjogSUFjdGlvbkVsZW1lbnQgPSBudWxsXHJcblxyXG5cdC8qKlx1NkI2Nlx1NTY2OFx1NEY3Rlx1NzUyOFx1NzY4NFx1OEQ0NFx1NEVBN1x1OTE0RFx1N0Y2RSAqL1xyXG5cdHdlYXBvblJlc291cmNlcyA6IElXZWFwb25SZXNvdXJjZXNFbGVtZW50ID0gbnVsbFxyXG5cclxuXHQvKiBcdTZCNjZcdTU2NjhVSSAqL1xyXG5cdHdlYXBvblVJOiBXZWFwb25VSSA9IG51bGxcclxuXHJcblx0LyogXHU1RjUzXHU1MjREXHU1QkEyXHU2MjM3XHU3QUVGXHU3M0E5XHU1QkI2ICovXHJcblx0cGxheWVyOiBHYW1lcGxheS5QbGF5ZXIgPSBudWxsXHJcblxyXG5cdC8qIFx1NUY1M1x1NTI0RFx1NUJBMlx1NjIzN1x1N0FFRlx1ODlEMlx1ODI3MiAqL1xyXG5cdGNoYXJhOiBHYW1lcGxheS5DaGFyYWN0ZXIgPSBudWxsXHJcblxyXG5cdC8qIFx1NUY1M1x1NTI0RFx1NUJBMlx1NjIzN1x1N0FFRlx1ODlEMlx1ODI3Mlx1NjQ0NFx1NTBDRlx1NjczQSAqL1xyXG5cdGNhbWVyYTogR2FtZXBsYXkuQ2FtZXJhU3lzdGVtID0gbnVsbFxyXG5cclxuXHQvKiBcdTYyRkVcdTUzRDZcdTg5RTZcdTUzRDFcdTU2NjggKi9cclxuXHRwaWNrVXBUcmlnZ2VyOiBHYW1lcGxheS5UcmlnZ2VyID0gbnVsbFxyXG5cclxuXHQvKiBcdTY4MzlcdTZCNjZcdTU2NjggKi9cclxuXHR3ZWFwb25FbnRpdHlSb290OiBDb3JlLkdhbWVPYmplY3QgPSBudWxsXHJcblxyXG5cdC8qIFx1NjgzOVx1NUYzOVx1ODM2RiAqL1xyXG5cdGFtbW9FbnRpdHlSb290OiBDb3JlLkdhbWVPYmplY3QgPSBudWxsXHJcblxyXG5cdC8qIFx1NUYzOVx1ODM2Rlx1NkM2MCAqL1xyXG5cdGFtbW9Qb29sOiBHYW1lRGVmLlNpbXBsZU9iamVjdFBvb2w8Q29yZS5HYW1lT2JqZWN0PiA9IG51bGxcclxuXHJcblx0LyogXHU1RjM5XHU4MzZGXHU2NTcwXHU3RUM0ICovXHJcblx0YW1tb0FycmF5OiBBcnJheTxBbW1vPiA9IFtdXHJcblxyXG5cdC8qIFx1NUYzOVx1NThGMyAqL1xyXG5cdGNhc2luZ0VudGl0eTogQ29yZS5HYW1lT2JqZWN0ID0gbnVsbFxyXG5cclxuXHQvKiBcdTVGMzlcdTU4RjNcdTZDNjAgKi9cclxuXHRjYXNpbmdQb29sOiBHYW1lRGVmLlNpbXBsZU9iamVjdFBvb2w8Q29yZS5HYW1lT2JqZWN0PiA9IG51bGxcclxuXHJcblx0LyogXHU1RjM5XHU1OEYzXHU2NTcwXHU3RUM0ICovXHJcblx0Y2FzaW5nQXJyYXk6IEFycmF5PENhc2luZz4gPSBbXVxyXG5cclxuXHQvKiBcdTVGMDBcdTcwNkJcdTcyNzlcdTY1NDggKi9cclxuXHRmaXJlRWZmZWN0OiBHYW1lcGxheS5QYXJ0aWNsZSA9IG51bGxcclxuXHJcblx0LyogXHU1MUZCXHU0RTJEXHU4OUQyXHU4MjcyXHU3Mjc5XHU2NTQ4ICovXHJcblx0aGl0Q2hhcmFFZmZlY3Q6IEdhbWVwbGF5LlBhcnRpY2xlID0gbnVsbFxyXG5cclxuXHQvKiBcdTUxRkJcdTRFMkRcdTg5RDJcdTgyNzJcdTcyNzlcdTY1NDhcdTZDNjAgKi9cclxuXHRoaXRDaGFyYUVmZmVjdFBvb2w6IEdhbWVEZWYuU2ltcGxlT2JqZWN0UG9vbDxHYW1lcGxheS5QYXJ0aWNsZT4gPSBudWxsXHJcblxyXG5cdC8qIFx1NTFGQlx1NEUyRFx1NzI2OVx1NEY1M1x1NzI3OVx1NjU0OCAqL1xyXG5cdGhpdEVmZmVjdDogR2FtZXBsYXkuUGFydGljbGUgPSBudWxsXHJcblxyXG5cdC8qIFx1NTFGQlx1NEUyRFx1NzI2OVx1NEY1M1x1NzI3OVx1NjU0OFx1NkM2MCAqL1xyXG5cdGhpdEVmZmVjdFBvb2w6IEdhbWVEZWYuU2ltcGxlT2JqZWN0UG9vbDxHYW1lcGxheS5QYXJ0aWNsZT4gPSBudWxsXHJcblxyXG5cdC8qIFx1OTdGM1x1NjU0OFx1OTdGM1x1OTFDRiAqL1xyXG5cdHN0YXRpYyBzb3VuZFZvbHVtZTogbnVtYmVyID0gMVxyXG5cclxuXHQvKiBcdTVGMDBcdTcwNkJcdTk3RjNcdTY1NDggKi9cclxuXHRmaXJlU291bmQ6IEdhbWVwbGF5LlNvdW5kID0gbnVsbFxyXG5cclxuXHQvKiBcdTYzNjJcdTVGMzlcdTk3RjNcdTY1NDggKi9cclxuXHRyZWxvYWRTb3VuZDogR2FtZXBsYXkuU291bmQgPSBudWxsXHJcblxyXG5cdC8qIFx1NEUwQVx1ODE5Qlx1OTdGM1x1NjU0OCAqL1xyXG5cdGxvYWRTb3VuZDogR2FtZXBsYXkuU291bmQgPSBudWxsXHJcblxyXG5cdC8qIFx1Nzc4NFx1NTFDNlx1OTdGM1x1NjU0OCAqL1xyXG5cdGFpbVNvdW5kOiBHYW1lcGxheS5Tb3VuZCA9IG51bGxcclxuXHJcblx0LyogXHU1MUZCXHU0RTJEXHU4OUQyXHU4MjcyXHU5N0YzXHU2NTQ4ICovXHJcblx0aGl0Q2hhcmFTb3VuZDogR2FtZXBsYXkuU291bmQgPSBudWxsXHJcblxyXG5cdC8qIFx1NTFGQlx1NEUyRFx1ODlEMlx1ODI3Mlx1OTdGM1x1NjU0OFx1NkM2MCAqL1xyXG5cdGhpdENoYXJhU291bmRQb29sOiBHYW1lRGVmLlNpbXBsZU9iamVjdFBvb2w8R2FtZXBsYXkuU291bmQ+ID0gbnVsbFxyXG5cclxuXHQvKiBcdTUxRkJcdTRFMkRcdTcyNjlcdTRGNTNcdTk3RjNcdTY1NDggKi9cclxuXHRoaXRTb3VuZDogR2FtZXBsYXkuU291bmQgPSBudWxsXHJcblxyXG5cdC8qIFx1NTFGQlx1NEUyRFx1NzI2OVx1NEY1M1x1OTdGM1x1NjU0OFx1NkM2MCAqL1xyXG5cdGhpdFNvdW5kUG9vbDogR2FtZURlZi5TaW1wbGVPYmplY3RQb29sPEdhbWVwbGF5LlNvdW5kPiA9IG51bGxcclxuXHJcblx0LyogXHU1RjAwXHU3MDZCXHU3MkI2XHU2MDAxXHU2ODA3XHU4QkM2XHVGRjBDIGlzRmlyaW5nXHU2NjJGXHU2QjY2XHU1NjY4XHU2MzAxXHU2NzA5XHU0RUJBXHU1QjlFXHU5NjQ1XHU3Njg0XHU1RjAwXHU3MDZCXHU3MkI2XHU2MDAxKi9cclxuXHRpc0ZpcmluZzogYm9vbGVhbiA9IGZhbHNlXHJcblxyXG5cdC8qIGJGaXJpbmdcdTY2MkZcdTZCNjZcdTU2NjhcdTVCOUVcdTk2NDVcdTc2ODRcdTVGMDBcdTcwNkJcdTcyQjZcdTYwMDEgKi9cclxuXHRiRmlyaW5nOiBib29sZWFuID0gZmFsc2VcclxuXHJcblx0LyogXHU2NjJGXHU1NDI2XHU1M0VGXHU0RUU1XHU1RjAwXHU3MDZCICovXHJcblx0aXNDYW5GaXJlOiBudW1iZXIgPSAwXHJcblxyXG5cdC8qIFx1Nzc4NFx1NTFDNlx1NzJCNlx1NjAwMVx1NjgwN1x1OEJDNiAqL1xyXG5cdGlzQWltbWluZzogYm9vbGVhbiA9IGZhbHNlXHJcblxyXG5cdC8qIFx1NzEyNlx1OERERFx1NTNEOFx1NTMxNlx1NjgwN1x1OEJDNiAqL1xyXG5cdGlzWm9vbWluZzogYm9vbGVhbiA9IGZhbHNlXHJcblxyXG5cdC8qIFx1OTYzQlx1NjMyMVx1NzJCNlx1NjAwMVx1NjgwN1x1OEJDNiAqL1xyXG5cdGlzQmxvY2s6IGJvb2xlYW4gPSBmYWxzZVxyXG5cclxuXHRpc0F1dG9SZWxvYWQ6IGJvb2xlYW4gPSBmYWxzZVxyXG5cclxuXHR0b3RhbEFtbW86IG51bWJlclxyXG5cclxuXHQvKiogXHU1MjY5XHU0RjU5XHU2MzAxXHU2NzA5XHU2NUY2XHU5NUY0ICovXHJcblx0cHJpdmF0ZSBfcmVzdFRpbWU6IG51bWJlclxyXG5cdC8vIC8qIFx1NUYzOVx1ODM2Rlx1OThERVx1ODg0Q1x1NjVCOVx1NTQxMSAqL1xyXG5cdC8vIGFtbW9EaXJlY3Rpb246IFR5cGUuVmVjdG9yID0gVHlwZS5WZWN0b3IuemVyb1xyXG5cclxuXHRwcml2YXRlIF9yb3RhdGVSb3RhdGlvbjogUm90YXRpb24gPSBSb3RhdGlvbi56ZXJvXHJcblxyXG5cdHByaXZhdGUgcHJlbG9hZEFzc2V0czogQXJyYXk8c3RyaW5nPlxyXG5cclxuXHQvKiBcdTUxRkJcdTRFMkRcdTU2REVcdThDMDNcdTUxRkRcdTY1NzAgKi9cclxuXHRjbGllbnRPbkhpdDogKGhpdFJlc3VsdDogQ29yZS5HYW1lT2JqZWN0W10gfCBHYW1lcGxheS5IaXRSZXN1bHRbXSwgYXR0YWNrUGxheWVyOiBudW1iZXIsIGlzT2JqOiBib29sZWFuKSA9PiB2b2lkXHJcblxyXG5cdC8qIFx1OTYzQlx1NjMyMVx1NjgwN1x1OEJDNlx1NTNEOFx1NTMxNlx1NTZERVx1OEMwM1x1NTFGRFx1NjU3MCAqL1xyXG5cdGNsaWVudE9uQmxvY2tDaGFuZ2U6IChpc0Jsb2NrOiBib29sZWFuKSA9PiB2b2lkXHJcblx0LyoqXHU2N0FBXHU2OEIwXHU3Njg0XHU1MjFEXHU1OUNCXHU1MzE2ICovXHJcblx0cHVibGljIEluaXRXZWFwb24oaWQ6IG51bWJlcik6IHZvaWQge1xyXG5cdFx0dGhpcy5jb25maWcgPSBHYW1lQ29uZmlnLldlYXBvbkNvbmZpZy5nZXRFbGVtZW50KGlkKVxyXG5cdFx0dGhpcy5pc0F1dG9SZWxvYWQgPSB0aGlzLmNvbmZpZy5pc0F1dG9SZWxvYWRcclxuXHRcdHRoaXMudG90YWxBbW1vID0gdGhpcy5jb25maWcudG90YWxBbW1vXHJcblx0XHR0aGlzLndlYXBvblJlc291cmNlcyA9IEdhbWVDb25maWcuV2VhcG9uUmVzb3VyY2VzLmdldEVsZW1lbnQodGhpcy5jb25maWcucmVzb3VyY2VzSWQpXHRcclxuXHRcdGxldCBtYWxlQWN0aW9uID0gR2FtZUNvbmZpZy5BY3Rpb24uZ2V0RWxlbWVudCh0aGlzLmNvbmZpZy5tYWxlQWN0aW9uKVxyXG5cdFx0bGV0IGZlbWFsZUFjdGlvbiA9IEdhbWVDb25maWcuQWN0aW9uLmdldEVsZW1lbnQodGhpcy5jb25maWcuZmVtYWxlQWN0aW9uKVxyXG5cclxuXHRcdGZvciAoY29uc3Qga2V5IGluIG1hbGVBY3Rpb24pIHtcclxuXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtYWxlQWN0aW9uLCBrZXkpKSB7XHJcblx0XHRcdFx0Y29uc3QgZWxlbWVudCA9IG1hbGVBY3Rpb25ba2V5XTtcclxuXHRcdFx0XHRpZiAoa2V5ICE9IFwiaWRcIikge1xyXG5cdFx0XHRcdFx0VXRpbC5Bc3NldFV0aWwuYXN5bmNEb3dubG9hZEFzc2V0KGVsZW1lbnQpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRmb3IgKGNvbnN0IGtleSBpbiBmZW1hbGVBY3Rpb24pIHtcclxuXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtYWxlQWN0aW9uLCBrZXkpKSB7XHJcblx0XHRcdFx0Y29uc3QgZWxlbWVudCA9IG1hbGVBY3Rpb25ba2V5XTtcclxuXHRcdFx0XHRpZiAoa2V5ICE9IFwiaWRcIikge1xyXG5cdFx0XHRcdFx0VXRpbC5Bc3NldFV0aWwuYXN5bmNEb3dubG9hZEFzc2V0KGVsZW1lbnQpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRmb3IgKGNvbnN0IGtleSBpbiB0aGlzLndlYXBvblJlc291cmNlcykge1xyXG5cdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1hbGVBY3Rpb24sIGtleSkpIHtcclxuXHRcdFx0XHRjb25zdCBlbGVtZW50ID0gbWFsZUFjdGlvbltrZXldO1xyXG5cdFx0XHRcdGlmIChrZXkgIT0gXCJpZFwiKSB7XHJcblx0XHRcdFx0XHRVdGlsLkFzc2V0VXRpbC5hc3luY0Rvd25sb2FkQXNzZXQoZWxlbWVudClcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblx0LyoqIFx1NUY1M1x1ODExQVx1NjcyQ1x1ODhBQlx1NUI5RVx1NEY4Qlx1NTQwRVx1RkYwQ1x1NEYxQVx1NTcyOFx1N0IyQ1x1NEUwMFx1NUUyN1x1NjZGNFx1NjVCMFx1NTI0RFx1OEMwM1x1NzUyOFx1NkI2NFx1NTFGRFx1NjU3MCAqL1xyXG5cdHByb3RlY3RlZCBhc3luYyBvblN0YXJ0KCkge1xyXG5cdFx0d2hpbGUgKCF0aGlzLmhhc0luaXQpIHtcclxuXHRcdFx0VGltZVV0aWwuZGVsYXlTZWNvbmQoMC4xKVxyXG5cdFx0fVxyXG5cdFx0dGhpcy51c2VVcGRhdGUgPSB0cnVlXHJcblx0XHR0aGlzLndlYXBvbk9iaiA9IHRoaXMuZ2FtZU9iamVjdCBhcyBHYW1lcGxheS5Ib3RXZWFwb25cclxuXHRcdHRoaXMuaW5pdEFzc2V0cyh0aGlzLnByZWxvYWRBc3NldHMpXHJcblx0XHRpZiAodGhpcy53ZWFwb25PYmopIHtcclxuXHRcdFx0aWYgKFV0aWwuU3lzdGVtVXRpbC5pc0NsaWVudCgpKSB7XHJcblx0XHRcdFx0dGhpcy5jbGllbnRJbml0KClcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoVXRpbC5TeXN0ZW1VdGlsLmlzU2VydmVyKCkpIHtcclxuXHRcdFx0XHR0aGlzLnNlcnZlckluaXQoKVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoVXRpbC5TeXN0ZW1VdGlsLmlzQ2xpZW50KCkpIHtcclxuXHRcdFx0XHR0aGlzLmNsaWVudE9uSGl0ID0gKGhpdFJlc3VsdDogQ29yZS5HYW1lT2JqZWN0W10gfCBHYW1lcGxheS5IaXRSZXN1bHRbXSwgYXR0YWNrUGxheWVyOiBudW1iZXIsIGlzT2JqOiBib29sZWFuKSA9PiB7XHJcblx0XHRcdFx0XHRoaXRSZXN1bHQuZm9yRWFjaChlID0+IHtcclxuXHJcblx0XHRcdFx0XHRcdGlmIChlIGluc3RhbmNlb2YgR2FtZXBsYXkuSGl0UmVzdWx0KSB7XHJcblx0XHRcdFx0XHRcdFx0aWYgKGUuZ2FtZU9iamVjdCBpbnN0YW5jZW9mIEdhbWVwbGF5LkNoYXJhY3RlciB8fFxyXG5cdFx0XHRcdFx0XHRcdFx0ZS5nYW1lT2JqZWN0IGluc3RhbmNlb2YgQ29yZS5HYW1lT2JqZWN0KSB7XHJcblx0XHRcdFx0XHRcdFx0XHRQcmVmYWJFdmVudC5QcmVmYWJFdnRGaWdodC5oaXQodGhpcy5jaGFyYS5ndWlkLCBlLmdhbWVPYmplY3QuZ3VpZCwgdGhpcy5jb25maWcuZGFtYWdlLCBlLmltcGFjdFBvaW50LmNsb25lKCkpXHJcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm5cclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdGlmIChlIGluc3RhbmNlb2YgR2FtZXBsYXkuQ2hhcmFjdGVyIHx8IGUgaW5zdGFuY2VvZiBDb3JlLkdhbWVPYmplY3QpIHtcclxuXHRcdFx0XHRcdFx0XHRQcmVmYWJFdmVudC5QcmVmYWJFdnRGaWdodC5oaXQodGhpcy5jaGFyYS5ndWlkLCBlLmd1aWQsIHRoaXMuY29uZmlnLmRhbWFnZSwgZS53b3JsZExvY2F0aW9uLmNsb25lKCkpXHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuXHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHR9KVxyXG5cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFByZWZhYkV2ZW50LlByZWZhYkV2dEVxdWlwLm9uRXF1aXAoYXN5bmMgKHRhcmdldEd1aWQ6IHN0cmluZywgc2xvdDogUHJlZmFiRXZlbnQuRXF1aXBTbG90LCBlcXVpcEd1aWQ6IHN0cmluZykgPT4ge1xyXG5cdFx0XHRcdFx0Ly9sZXQgcGxheWVyID0gYXdhaXQgR2FtZXBsYXkuYXN5bmNHZXRDdXJyZW50UGxheWVyKClcclxuXHRcdFx0XHRcdGlmICh0aGlzLndlYXBvbk9iaiAmJiB0aGlzLndlYXBvbk9iai5nZXRDdXJyZW50T3duZXIoKSAmJiB0aGlzLndlYXBvbk9iai5nZXRDdXJyZW50T3duZXIoKS5ndWlkID09IHRhcmdldEd1aWQgJiYgdGhpcy53ZWFwb25PYmouZ3VpZCAhPSBlcXVpcEd1aWQpIHtcclxuXHRcdFx0XHRcdFx0dGhpcy51bkVxdWlwKClcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHByaXZhdGUgb25FcXVpcGRDaGFuZ2VkKCkge1xyXG5cdFx0dGhpcy53ZWFwb25FbnRpdHlSb290LnJlbGF0aXZlUm90YXRpb24gPSBSb3RhdGlvbi56ZXJvXHJcblx0fVxyXG5cdC8qKlxyXG5cdCAqIFx1NTQ2OFx1NjcxRlx1NTFGRFx1NjU3MCBcdTZCQ0ZcdTVFMjdcdTYyNjdcdTg4NENcclxuXHQgKiBcdTZCNjRcdTUxRkRcdTY1NzBcdTYyNjdcdTg4NENcdTk3MDBcdTg5ODFcdTVDMDZ0aGlzLmJVc2VVcGRhdGVcdThENEJcdTUwM0NcdTRFM0F0cnVlXHJcblx0ICogQHBhcmFtIGR0IFx1NUY1M1x1NTI0RFx1NUUyN1x1NEUwRVx1NEUwQVx1NEUwMFx1NUUyN1x1NzY4NFx1NUVGNlx1OEZERiAvIFx1NzlEMlxyXG5cdCAqL1xyXG5cdHByb3RlY3RlZCBvblVwZGF0ZShkdDogbnVtYmVyKTogdm9pZCB7XHJcblx0XHRpZiAoVXRpbC5TeXN0ZW1VdGlsLmlzU2VydmVyKCkpIHJldHVyblxyXG5cdFx0aWYgKHRoaXMud2VhcG9uT2JqID09IG51bGwpIHtcclxuXHRcdFx0dGhpcy53ZWFwb25PYmogPSB0aGlzLmdhbWVPYmplY3QgYXMgR2FtZXBsYXkuSG90V2VhcG9uXHJcblx0XHRcdGlmICh0aGlzLndlYXBvbk9iaiA9PSBudWxsKSByZXR1cm5cclxuXHRcdFx0dGhpcy5jbGllbnRJbml0KClcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIXRoaXMuaXNFcXVpcGVkICYmIHRoaXMud2VhcG9uRW50aXR5Um9vdCkge1xyXG5cdFx0XHR0aGlzLl9yb3RhdGVSb3RhdGlvbi56ID0gdGhpcy5jb25maWcucm90YXRlU3BlZWQgKiBkdFxyXG5cdFx0XHR0aGlzLndlYXBvbkVudGl0eVJvb3Qud29ybGRSb3RhdGlvbiA9IHRoaXMud2VhcG9uRW50aXR5Um9vdC53b3JsZFJvdGF0aW9uLmFkZCh0aGlzLl9yb3RhdGVSb3RhdGlvbilcclxuXHRcdFx0cmV0dXJuXHJcblx0XHR9XHJcblxyXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmFtbW9BcnJheS5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRpZiAodGhpcy5hbW1vQXJyYXlbaV0udXBkYXRlKGR0KSkge1xyXG5cdFx0XHRcdGlmICh0aGlzLmFtbW9BcnJheVtpXS5vd25lciA9PSB0aGlzLmNoYXJhKSB7XHJcblx0XHRcdFx0XHR0aGlzLnNlcnZlckRlc3Ryb3lBbW1vKGkpXHJcblx0XHRcdFx0XHR0aGlzLmhpdCh0aGlzLmFtbW9BcnJheVtpXS5oaXRSZXN1bHQpXHJcblx0XHRcdFx0XHR0aGlzLmFtbW9BcnJheVtpXS5kZXN0cm95KClcclxuXHRcdFx0XHRcdHRoaXMuYW1tb0FycmF5LnNwbGljZShpLCAxKVxyXG5cdFx0XHRcdFx0aS0tXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNhc2luZ0FycmF5Lmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGlmICh0aGlzLmNhc2luZ0FycmF5W2ldLnVwZGF0ZShkdCkpIHtcclxuXHRcdFx0XHR0aGlzLmNhc2luZ0FycmF5W2ldLmRlc3Ryb3koKVxyXG5cdFx0XHRcdHRoaXMuY2FzaW5nQXJyYXkuc3BsaWNlKGksIDEpXHJcblx0XHRcdFx0aS0tXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy53ZWFwb25PYmouZ2V0Q3VycmVudE93bmVyKCkgIT09IHRoaXMuY2hhcmEpIHJldHVyblxyXG5cclxuXHRcdGlmICh0aGlzLmlzQ2FuRmlyZSAhPSAwKSB7XHJcblx0XHRcdHRoaXMuaXNDYW5GaXJlIC09IGR0XHJcblx0XHRcdGlmICh0aGlzLmlzQ2FuRmlyZSA8IDApIHtcclxuXHRcdFx0XHR0aGlzLmlzQ2FuRmlyZSA9IDBcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuY2FtZXJhVXBkYXRlKGR0KVxyXG5cclxuXHRcdGlmICghdGhpcy51cGRhdGViRmlyaW5nKCkpIHtcclxuXHRcdFx0aWYgKCF0aGlzLmJGaXJpbmcgJiYgdGhpcy5maXJlRWZmZWN0Lmxvb3AgJiYgdGhpcy5maXJlU291bmQubG9vcCkge1xyXG5cdFx0XHRcdHRoaXMuZmlyZUVmZmVjdC5zdG9wKClcclxuXHRcdFx0XHR0aGlzLmZpcmVTb3VuZC5zdG9wKClcclxuXHRcdFx0XHRpZiAoIXRoaXMuaXNBaW1taW5nKSB7XHJcblx0XHRcdFx0XHR0aGlzLndlYXBvbk9iai5haW1Db21wb25lbnQuZW5hYmxlQWltaW5nKGZhbHNlKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmICghdGhpcy51cGRhdGVCbG9ja0ZpcmUoKSkge1xyXG5cdFx0XHR0aGlzLmNsaWVudE9uQmxvY2tDaGFuZ2UodGhpcy5pc0Jsb2NrKVxyXG5cdFx0fVxyXG5cclxuXHRcdHN3aXRjaCAodGhpcy53ZWFwb25PYmouZ2V0Q3VycmVudFN0YXRlKCkpIHtcclxuXHRcdFx0Y2FzZSBHYW1lcGxheS5Ib3RXZWFwb25TdGF0ZS5JZGxlOlxyXG5cdFx0XHRcdGlmICh0aGlzLndlYXBvbk9iai5maXJlQ29tcG9uZW50LmN1cnJlbnRCdWxsZXRTaXplIDwgMSkge1xyXG5cdFx0XHRcdFx0aWYgKHRoaXMuaXNBdXRvUmVsb2FkKSB7XHJcblx0XHRcdFx0XHRcdHRoaXMuc3RhcnRSZWxvYWQoKVxyXG5cdFx0XHRcdFx0XHR0aGlzLmlzQXV0b1JlbG9hZCA9IGZhbHNlXHJcblx0XHRcdFx0XHRcdHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0XHRcdFx0XHRcdHRoaXMuaXNBdXRvUmVsb2FkID0gdHJ1ZVxyXG5cdFx0XHRcdFx0XHR9LCB0aGlzLndlYXBvbk9iai5yZWxvYWRDb21wb25lbnQucmVsb2FkRHVyYXRpb24gKiAxMDAwKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRpZiAodGhpcy5pc0ZpcmluZyAmJiAhdGhpcy5iRmlyaW5nICYmIHRoaXMud2VhcG9uT2JqLmZpcmVDb21wb25lbnQuY3VycmVudEZpcmVNb2RlbCA9PSAyKSB7XHJcblx0XHRcdFx0XHRcdHRoaXMuc3RhcnRGaXJlKClcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGJyZWFrXHJcblxyXG5cdFx0XHRjYXNlIEdhbWVwbGF5LkhvdFdlYXBvblN0YXRlLlJlbG9hZGluZzpcclxuXHJcblx0XHRcdFx0YnJlYWtcclxuXHJcblx0XHRcdGNhc2UgR2FtZXBsYXkuSG90V2VhcG9uU3RhdGUuTG9hZGluZzpcclxuXHJcblx0XHRcdFx0YnJlYWtcclxuXHJcblx0XHRcdGNhc2UgR2FtZXBsYXkuSG90V2VhcG9uU3RhdGUuRmlyaW5nOlxyXG5cdFx0XHRcdGlmICh0aGlzLmNvbmZpZy5pc0VtcHR5VG9EZXN0cm95ICYmIHRoaXMuY29uZmlnLnRvdGFsQW1tbyA9PSAwICYmIHRoaXMud2VhcG9uT2JqLmZpcmVDb21wb25lbnQuY3VycmVudEJ1bGxldFNpemUgPT0gMCkge1xyXG5cdFx0XHRcdFx0dGhpcy51bkVxdWlwKClcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0YnJlYWtcclxuXHJcblx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0YnJlYWtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy53ZWFwb25VSSkge1xyXG5cdFx0XHQvL3RoaXMud2VhcG9uVUkuY2hhbmdlQnVsbGV0KHRoaXMud2VhcG9uT2JqLmZpcmVDb21wb25lbnQuY3VycmVudEJ1bGxldFNpemUsIHRoaXMuY29uZmlnLnRvdGFsQW1tbylcclxuXHRcdFx0aWYgKHRoaXMuY29uZmlnLmtlZXBUaW1lICE9IC0xKSB7XHJcblx0XHRcdFx0dGhpcy5fcmVzdFRpbWUgLT0gZHRcclxuXHRcdFx0XHQvL3RoaXMud2VhcG9uVUkuc2V0VGltZVRleHQodGhpcy5fcmVzdFRpbWUsIHRoaXMuY29uZmlnLmtlZXBUaW1lKVxyXG5cdFx0XHRcdGlmICh0aGlzLl9yZXN0VGltZSA8PSAwKSB7XHJcblx0XHRcdFx0XHR0aGlzLnVuRXF1aXAoKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHQvKiogXHU4MTFBXHU2NzJDXHU4OEFCXHU5NTAwXHU2QkMxXHU2NUY2XHU2NzAwXHU1NDBFXHU0RTAwXHU1RTI3XHU2MjY3XHU4ODRDXHU1QjhDXHU4QzAzXHU3NTI4XHU2QjY0XHU1MUZEXHU2NTcwICovXHJcblx0cHJvdGVjdGVkIG9uRGVzdHJveSgpOiB2b2lkIHtcclxuXHRcdHRoaXMuY2xpZW50RGVzdHJveSgpXHJcblx0fVxyXG5cdC8qIFx1NTFGQlx1NEUyRFx1NUJGOVx1OEM2MVx1NTFGRFx1NjU3MCAqL1xyXG5cdHByb3RlY3RlZCBoaXQoaGl0UmVzdWx0OiBDb3JlLkdhbWVPYmplY3RbXSB8IEdhbWVwbGF5LkhpdFJlc3VsdFtdKSB7XHJcblx0XHRpZiAoIShoaXRSZXN1bHQubGVuZ3RoID4gMCkpIHJldHVyblxyXG5cdFx0aWYgKHRoaXMuY29uZmlnLmRldGVjdFJhZGl1cyA+IDEwKSB7IC8vIFx1NzdFOVx1NUY2Mlx1NjhDMFx1NkQ0Qlx1N0VEM1x1Njc5Q1xyXG5cdFx0XHRmb3IgKGxldCBlbGVtZW50IG9mIGhpdFJlc3VsdCkge1xyXG5cdFx0XHRcdGxldCB0ZW1wID0gZWxlbWVudCBhcyBDb3JlLkdhbWVPYmplY3RcclxuXHRcdFx0XHRpZiAodGVtcCBpbnN0YW5jZW9mIEdhbWVwbGF5LkNoYXJhY3RlckJhc2UpIHtcclxuXHRcdFx0XHRcdHRoaXMuaGl0Q2hhcmFjdGVyTXVsdGljYXN0KHRlbXAud29ybGRMb2NhdGlvbiwgdGVtcC53b3JsZFJvdGF0aW9uKVxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHR0aGlzLmhpdE9iamVjdE11bHRpY2FzdCh0ZW1wLndvcmxkTG9jYXRpb24sIHRlbXAud29ybGRSb3RhdGlvbilcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKHRoaXMuY29uZmlnLmh1cnRSYWRpdXMgPiAxMCkge1xyXG5cdFx0XHRcdGxldCBzcGhlcmVSZXN1bHQgPSBHYW1lcGxheS5zcGhlcmVPdmVybGFwKChoaXRSZXN1bHRbMF0gYXMgQ29yZS5HYW1lT2JqZWN0KS53b3JsZExvY2F0aW9uLCB0aGlzLmNvbmZpZy5odXJ0UmFkaXVzLCBHYW1lRGVmLkRFQlVHX0ZMQUcpXHJcblx0XHRcdFx0dGhpcy5jbGllbnRPbkhpdChzcGhlcmVSZXN1bHQsIHRoaXMucGxheWVyLmdldFBsYXllcklEKCksIHRydWUpXHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5jbGllbnRPbkhpdChoaXRSZXN1bHQsIHRoaXMucGxheWVyLmdldFBsYXllcklEKCksIHRydWUpXHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7IC8vIFx1NUMwNFx1N0VCRlx1NjhDMFx1NkQ0Qlx1N0VEM1x1Njc5Q1xyXG5cdFx0XHRmb3IgKGxldCBlbGVtZW50IG9mIGhpdFJlc3VsdCkge1xyXG5cdFx0XHRcdGxldCB0ZW1wID0gZWxlbWVudCBhcyBHYW1lcGxheS5IaXRSZXN1bHRcclxuXHRcdFx0XHRsZXQgcm90ID0gdGVtcC5pbXBhY3ROb3JtYWwudG9Sb3RhdGlvbigpXHJcblx0XHRcdFx0cm90LnkgLT0gOTBcclxuXHRcdFx0XHRpZiAodGVtcC5nYW1lT2JqZWN0IGluc3RhbmNlb2YgR2FtZXBsYXkuQ2hhcmFjdGVyQmFzZSkge1xyXG5cdFx0XHRcdFx0dGhpcy5oaXRDaGFyYWN0ZXJNdWx0aWNhc3QodGVtcC5pbXBhY3RQb2ludCwgcm90KVxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHR0aGlzLmhpdE9iamVjdE11bHRpY2FzdCh0ZW1wLmltcGFjdFBvaW50LCByb3QpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdGlmICh0aGlzLmNvbmZpZy5odXJ0UmFkaXVzID4gMTApIHtcclxuXHRcdFx0XHRsZXQgc3BoZXJlUmVzdWx0ID0gR2FtZXBsYXkuc3BoZXJlT3ZlcmxhcCgoaGl0UmVzdWx0WzBdIGFzIEdhbWVwbGF5LkhpdFJlc3VsdCkuaW1wYWN0UG9pbnQsIHRoaXMuY29uZmlnLmh1cnRSYWRpdXMsIEdhbWVEZWYuREVCVUdfRkxBRylcclxuXHRcdFx0XHR0aGlzLmNsaWVudE9uSGl0KHNwaGVyZVJlc3VsdCwgdGhpcy5wbGF5ZXIuZ2V0UGxheWVySUQoKSwgdHJ1ZSlcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLmNsaWVudE9uSGl0KGhpdFJlc3VsdCwgdGhpcy5wbGF5ZXIuZ2V0UGxheWVySUQoKSwgZmFsc2UpXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qIFx1NUU3Rlx1NjRBRFx1NTFGQlx1NEUyRFx1ODlEMlx1ODI3MiAqL1xyXG5cdEBDb3JlLkZ1bmN0aW9uKENvcmUuU2VydmVyKVxyXG5cdHByaXZhdGUgaGl0Q2hhcmFjdGVyTXVsdGljYXN0KGxvYzogVHlwZS5WZWN0b3IsIHJvdDogVHlwZS5Sb3RhdGlvbikge1xyXG5cdFx0dGhpcy5oaXRDaGFyYVBlcmZvcm1hbmNlKGxvYywgcm90KVxyXG5cdH1cclxuXHJcblx0LyogXHU1RTdGXHU2NEFEXHU1MUZCXHU0RTJEXHU2NjZFXHU5MDFBXHU1QkY5XHU4QzYxICovXHJcblx0QENvcmUuRnVuY3Rpb24oQ29yZS5TZXJ2ZXIpXHJcblx0cHJpdmF0ZSBoaXRPYmplY3RNdWx0aWNhc3QobG9jOiBUeXBlLlZlY3Rvciwgcm90OiBUeXBlLlJvdGF0aW9uKSB7XHJcblx0XHR0aGlzLmhpdE9iamVjdFBlcmZvcm1hbmNlKGxvYywgcm90KVxyXG5cdH1cclxuXHJcblx0QENvcmUuRnVuY3Rpb24oQ29yZS5DbGllbnQsIENvcmUuTXVsdGljYXN0KVxyXG5cdHByaXZhdGUgaGl0Q2hhcmFQZXJmb3JtYW5jZShsb2M6IFR5cGUuVmVjdG9yLCByb3Q6IFR5cGUuUm90YXRpb24pIHtcclxuXHRcdEVmZmVjdFNlcnZpY2UuZ2V0SW5zdGFuY2UoKS5wbGF5RWZmZWN0QXRMb2NhdGlvbih0aGlzLmhpdENoYXJhRWZmZWN0LmdldFNvdXJjZUFzc2V0R3VpZCgpLCBsb2MsIDEsIHJvdCwgdGhpcy5oaXRDaGFyYUVmZmVjdC53b3JsZFNjYWxlKVxyXG5cdFx0U291bmRTZXJ2aWNlLmdldEluc3RhbmNlKCkucGxheTNEU291bmQodGhpcy5oaXRDaGFyYVNvdW5kLmdldFNvdXJjZUFzc2V0R3VpZCgpLCBsb2MsIDEsIDEsIHsgbWF4RGlzdGFuY2U6IDMwMDAgfSlcclxuXHR9XHJcblxyXG5cdEBDb3JlLkZ1bmN0aW9uKENvcmUuQ2xpZW50LCBDb3JlLk11bHRpY2FzdClcclxuXHRwcml2YXRlIGhpdE9iamVjdFBlcmZvcm1hbmNlKGxvYzogVHlwZS5WZWN0b3IsIHJvdDogVHlwZS5Sb3RhdGlvbikge1xyXG5cdFx0RWZmZWN0U2VydmljZS5nZXRJbnN0YW5jZSgpLnBsYXlFZmZlY3RBdExvY2F0aW9uKHRoaXMuaGl0RWZmZWN0LmdldFNvdXJjZUFzc2V0R3VpZCgpLCBsb2MsIDEsIHJvdCwgdGhpcy5oaXRFZmZlY3Qud29ybGRTY2FsZSlcclxuXHRcdFNvdW5kU2VydmljZS5nZXRJbnN0YW5jZSgpLnBsYXkzRFNvdW5kKHRoaXMuaGl0U291bmQuZ2V0U291cmNlQXNzZXRHdWlkKCksIGxvYywgMSwgMSwgeyBtYXhEaXN0YW5jZTogMzAwMCB9KVxyXG5cdH1cclxuXHJcblx0LyogXHU2NEFEXHU2NTNFXHU3Mjc5XHU2NTQ4ICovXHJcblx0cHJpdmF0ZSBwbGF5RWZmZWN0KHBhcnRpY2xlOiBHYW1lcGxheS5QYXJ0aWNsZSk6IHZvaWQge1xyXG5cclxuXHR9XHJcblx0LyogXHU2NEFEXHU2NTNFXHU5N0YzXHU2NTQ4ICovXHJcblx0cHJpdmF0ZSBwbGF5U291bmQoc291bmQ6IEdhbWVwbGF5LlNvdW5kKTogdm9pZCB7XHJcblx0XHRzb3VuZC52b2x1bWUgPSBXZWFwb25Ecml2ZXIuc291bmRWb2x1bWVcclxuXHRcdHNvdW5kLnBsYXkoKVxyXG5cdH1cclxuXHJcblx0QENvcmUuRnVuY3Rpb24oQ29yZS5TZXJ2ZXIpXHJcblx0cHJpdmF0ZSBzZXJ2ZXJEZXN0cm95QW1tbyhpbmRleDogbnVtYmVyKSB7XHJcblx0XHR0aGlzLmNsaWVudERlc3Ryb3lBbW1vKGluZGV4KVxyXG5cdH1cclxuXHJcblx0QENvcmUuRnVuY3Rpb24oQ29yZS5DbGllbnQsIENvcmUuTXVsdGljYXN0KVxyXG5cdHByaXZhdGUgY2xpZW50RGVzdHJveUFtbW8oaW5kZXg6IG51bWJlcikge1xyXG5cdFx0aWYgKCF0aGlzLndlYXBvbk9iaikge1xyXG5cdFx0XHRyZXR1cm5cclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLndlYXBvbk9iai5nZXRDdXJyZW50T3duZXIoKSA9PSB0aGlzLmNoYXJhKSB7XHJcblx0XHRcdHJldHVyblxyXG5cdFx0fSBlbHNlIGlmICh0aGlzLmFtbW9BcnJheS5sZW5ndGggIT0gMCkge1xyXG5cdFx0XHR0aGlzLmFtbW9BcnJheVtpbmRleF0uZGVzdHJveSgpXHJcblx0XHRcdHRoaXMuYW1tb0FycmF5LnNwbGljZShpbmRleCwgMSlcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFx1NUJBMlx1NjIzN1x1N0FFRlx1OEMwM1x1NzUyOFx1NzZGNFx1NjNBNVx1ODhDNVx1NTkwN1xyXG5cdCAqL1xyXG5cdHB1YmxpYyBlcXVpcCgpIHtcclxuXHRcdC8vIFx1NTk4Mlx1Njc5Q1x1NUY1M1x1NTI0RFx1ODlEMlx1ODI3Mlx1NEUzQVx1N0E3QVx1NEUxNFx1NTcyOFx1NUJBMlx1NjIzN1x1N0FFRlx1RkYwQ1x1OTFDRFx1NjVCMFx1ODNCN1x1NTNENlx1NEUwMFx1NkIyMVx1ODlEMlx1ODI3MlxyXG5cdFx0aWYgKCF0aGlzLmNoYXJhICYmIFV0aWwuU3lzdGVtVXRpbC5pc0NsaWVudCgpKSB7XHJcblx0XHRcdHRoaXMuY2hhcmEgPSBHYW1lcGxheS5nZXRDdXJyZW50UGxheWVyKCkuY2hhcmFjdGVyXHJcblx0XHR9XHJcblx0XHR0aGlzLnNlcnZlckVxdWlwKHRoaXMuY2hhcmEucGxheWVyLmdldFBsYXllcklEKCkpXHJcblx0fVxyXG5cdC8qKlxyXG5cdCAqIHVuRXF1aXBcclxuXHQgKi9cclxuXHRwdWJsaWMgdW5FcXVpcCgpIHtcclxuXHRcdGlmICh0aGlzLmNoYXJhICE9PSB0aGlzLndlYXBvbk9iai5nZXRDdXJyZW50T3duZXIoKSkgcmV0dXJuXHJcblx0XHRpZiAoIXRoaXMud2VhcG9uT2JqKSB7XHJcblx0XHRcdHJldHVyblxyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMuaXNBaW1taW5nKSB7XHJcblx0XHRcdHRoaXMud2VhcG9uT2JqLmFjY3VyYWN5T2ZGaXJlQ29tcG9uZW50Lm1heERpc3BlcnNpb25IYWxmQW5nbGUgPSB0aGlzLnRlbXBEaXNwZXJzaW9uTWF4XHJcblx0XHRcdHRoaXMud2VhcG9uT2JqLmFjY3VyYWN5T2ZGaXJlQ29tcG9uZW50LmRlZmF1bHREaXNwZXJzaW9uSGFsZkFuZ2xlID0gdGhpcy50ZW1wRGlzcGVyc2lvbkRlZmF1bHRcclxuXHRcdFx0dGhpcy5pc0FpbW1pbmcgPSBmYWxzZVxyXG5cdFx0fVxyXG5cdFx0dGhpcy53ZWFwb25PYmouc3RvcEZpcmUoKVxyXG5cdFx0dGhpcy53ZWFwb25PYmouYnJlYWtMb2FkKClcclxuXHRcdHRoaXMud2VhcG9uT2JqLmJyZWFrUmVsb2FkKClcclxuXHRcdHRoaXMud2VhcG9uT2JqLmRlc3Ryb3koKVxyXG5cdFx0dGhpcy53ZWFwb25PYmoudW5lcXVpcEhvdFdlYXBvbigpXHJcblx0XHQvL1VJLlVJTWFuYWdlci5pbnN0YW5jZS5oaWRlKFdlYXBvblVJKVxyXG5cdFx0dGhpcy53ZWFwb25VSSA9IG51bGxcclxuXHRcdHRoaXMuY2hhcmEuYW5pbWF0aW9uU3RhbmNlID0gdGhpcy50ZW1wYW5pbWF0aW9uU3RhbmNlXHJcblx0XHR0aGlzLmNoYXJhLnBsYXlBbmltYXRpb24odGhpcy53ZWFwb25BY3Rpb24udW5lcXVpcEFuaW1hdGlvbilcclxuXHRcdHRoaXMuY2hhcmEubW92ZUZhY2luZ0RpcmVjdGlvbiA9IHRoaXMudGVtcE1vdmVGYWNpbmdEaXJlY3Rpb25cclxuXHRcdHRoaXMuY2FtZXJhLmNhbWVyYVJlbGF0aXZlVHJhbnNmb3JtID0gbmV3IFR5cGUuVHJhbnNmb3JtKHRoaXMudGVtcGNhbWVyYU9mZnNldCwgdGhpcy5jYW1lcmEuY2FtZXJhUmVsYXRpdmVUcmFuc2Zvcm0ucm90YXRpb24sIHRoaXMuY2FtZXJhLmNhbWVyYVJlbGF0aXZlVHJhbnNmb3JtLnNjYWxlKVxyXG5cdFx0dGhpcy5jYW1lcmEuY2FtZXJhU3lzdGVtUmVsYXRpdmVUcmFuc2Zvcm0gPSBuZXcgVHlwZS5UcmFuc2Zvcm0odGhpcy50ZW1wdGFyZ2V0QXJtT2Zmc2V0LCB0aGlzLmNhbWVyYS5jYW1lcmFSZWxhdGl2ZVRyYW5zZm9ybS5yb3RhdGlvbiwgdGhpcy5jYW1lcmEuY2FtZXJhUmVsYXRpdmVUcmFuc2Zvcm0uc2NhbGUpXHJcblx0XHR0aGlzLmNhbWVyYS5jYW1lcmFGT1YgPSB0aGlzLnRlbXBjYW1lcmFGT1ZcclxuXHRcdHRoaXMuY2FtZXJhLnRhcmdldEFybUxlbmd0aCA9IHRoaXMudGVtcHRhcmdldEFybUxlbmd0aFxyXG5cdFx0aWYgKHRoaXMuY29uZmlnLmlzQXV0b0Rlc3Ryb3kpIHtcclxuXHRcdFx0Ly9VSS5VSU1hbmFnZXIuaW5zdGFuY2UuZGVzdHJveVVJKFdlYXBvblVJKVxyXG5cdFx0XHR0aGlzLndlYXBvbk9iaiA9IG51bGxcclxuXHRcdFx0bGV0IGRlc3Ryb3lJbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcclxuXHRcdFx0XHRpZiAodGhpcy5hbW1vQXJyYXkubGVuZ3RoID09IDAgJiYgdGhpcy5jYXNpbmdBcnJheS5sZW5ndGggPT0gMCkge1xyXG5cdFx0XHRcdFx0dGhpcy5zZXJ2ZXJEZXN0cm95KClcclxuXHRcdFx0XHRcdGNsZWFySW50ZXJ2YWwoZGVzdHJveUludGVydmFsKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSwgMTAwKVxyXG5cdFx0fVxyXG5cdH1cclxuXHRAQ29yZS5GdW5jdGlvbihDb3JlLlNlcnZlcilcclxuXHRwcml2YXRlIHNlcnZlckhpZGVXZWFwb25FbnRpdHkocGxheWVySUQ6IG51bWJlcik6IHZvaWQge1xyXG5cdFx0Ly8gXHU1OTgyXHU2NzlDXHU1Mzc4XHU4RjdEXHU3Njg0XHU2NjJGXHU1RjUzXHU1MjREXHU2QjY2XHU1NjY4XHVGRjBDXHU1MTQ4XHU5NjkwXHU4NUNGXHU2QjY2XHU1NjY4XHVGRjBDXHU3QjQ5XHU1Rjg1XHU1QjUwXHU1RjM5XHU5NTAwXHU2QkMxXHU1QjhDXHU2QkQ1XHU1NDBFXHU1Mzc4XHU4RjdEXHU1RTc2XHU5NTAwXHU2QkMxXHU2QjY2XHU1NjY4XHVGRjBDXHU1MjIwXHU5NjY0bWFwXHU0RTJEXHU1QkY5XHU1RTk0XHU5NTJFXHU1MDNDXHJcblx0XHR0aGlzLmhpZGVXZWFwb25FbnRpdHkoKVxyXG5cdH1cclxuXHJcblx0QENvcmUuRnVuY3Rpb24oQ29yZS5DbGllbnQsIENvcmUuTXVsdGljYXN0KVxyXG5cdHByaXZhdGUgaGlkZVdlYXBvbkVudGl0eSgpIHtcclxuXHRcdGlmICghdGhpcy53ZWFwb25FbnRpdHlSb290KSByZXR1cm5cclxuXHRcdHRoaXMud2VhcG9uRW50aXR5Um9vdC5zZXRWaXNpYmlsaXR5KFR5cGUuUHJvcGVydHlTdGF0dXMuT2ZmKVxyXG5cdH1cclxuXHRAQ29yZS5GdW5jdGlvbihDb3JlLlNlcnZlcilcclxuXHRwcml2YXRlIHNlcnZlckRlc3Ryb3koKTogdm9pZCB7XHJcblx0XHR0aGlzLmRlc3Ryb3koKVxyXG5cdH1cclxuXHQvKipcclxuXHRcdCAqIHN0YXJ0RmlyZVxyXG5cdFx0ICovXHJcblx0cHVibGljIHN0YXJ0RmlyZSgpIHtcclxuXHRcdGlmICh0aGlzLndlYXBvbk9iaiA9PSBudWxsIHx8IHRoaXMuaXNDYW5GaXJlICE9IDApIHJldHVyblxyXG5cdFx0dGhpcy53ZWFwb25PYmouc3RhcnRGaXJlKClcclxuXHRcdHRoaXMuaXNGaXJpbmcgPSB0cnVlXHJcblx0XHRpZiAoIXRoaXMuaXNBaW1taW5nKSB7XHJcblx0XHRcdHRoaXMud2VhcG9uT2JqLmFpbUNvbXBvbmVudC5lbmFibGVBaW1pbmcodHJ1ZSlcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIHN0b3BGaXJlXHJcblx0ICovXHJcblx0cHVibGljIHN0b3BGaXJlKCkge1xyXG5cdFx0aWYgKHRoaXMud2VhcG9uT2JqID09IG51bGwpIHJldHVyblxyXG5cdFx0dGhpcy53ZWFwb25PYmouc3RvcEZpcmUoKVxyXG5cdFx0dGhpcy5pc0ZpcmluZyA9IGZhbHNlXHJcblx0XHRpZiAoIXRoaXMuaXNBaW1taW5nKSB7XHJcblx0XHRcdHRoaXMud2VhcG9uT2JqLmFpbUNvbXBvbmVudC5lbmFibGVBaW1pbmcoZmFsc2UpXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBzdGFydFJlbG9hZFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBzdGFydFJlbG9hZCgpIHtcclxuXHRcdGlmICh0aGlzLndlYXBvbk9iaiA9PSBudWxsIHx8ICF0aGlzLndlYXBvbk9iai5yZWxvYWRFbmFibGUgfHwgdGhpcy53ZWFwb25PYmouZmlyZUNvbXBvbmVudC5jdXJyZW50QnVsbGV0U2l6ZSA9PSB0aGlzLndlYXBvbk9iai5maXJlQ29tcG9uZW50LmN1cnJlbnRDbGlwU2l6ZSkgcmV0dXJuXHJcblx0XHRsZXQgYW1tb0dhcCA9IHRoaXMud2VhcG9uT2JqLmZpcmVDb21wb25lbnQuY3VycmVudENsaXBTaXplIC0gdGhpcy53ZWFwb25PYmouZmlyZUNvbXBvbmVudC5jdXJyZW50QnVsbGV0U2l6ZVxyXG5cclxuXHRcdGlmICh0aGlzLnRvdGFsQW1tbyA9PSAtMSkge1xyXG5cdFx0XHR0aGlzLndlYXBvbk9iai5yZWxvYWQoYW1tb0dhcClcclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLnRvdGFsQW1tbyA8PSAwKSB7XHJcblx0XHRcdHJldHVyblxyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMudG90YWxBbW1vIDwgYW1tb0dhcCkge1xyXG5cdFx0XHR0aGlzLndlYXBvbk9iai5yZWxvYWQodGhpcy50b3RhbEFtbW8pXHJcblx0XHRcdHRoaXMudG90YWxBbW1vID0gMFxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy53ZWFwb25PYmoucmVsb2FkKGFtbW9HYXApXHJcblx0XHRcdHRoaXMudG90YWxBbW1vIC09IGFtbW9HYXBcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIHN0b3BSZWxvYWRcclxuXHQgKi9cclxuXHRwdWJsaWMgc3RvcFJlbG9hZCgpIHtcclxuXHRcdGlmICh0aGlzLndlYXBvbk9iaiA9PSBudWxsKSByZXR1cm5cclxuXHRcdHRoaXMud2VhcG9uT2JqLmJyZWFrUmVsb2FkKClcclxuXHRcdHRoaXMud2VhcG9uT2JqLmJyZWFrTG9hZCgpXHJcblx0fVxyXG5cclxuXHRwcml2YXRlIHRlbXBEaXNwZXJzaW9uTWF4ID0gMFxyXG5cdHByaXZhdGUgdGVtcERpc3BlcnNpb25EZWZhdWx0ID0gMFxyXG5cclxuXHJcblxyXG5cdC8qKlxyXG5cdCAqIHN0YXJ0QWltXHJcblx0ICovXHJcblx0cHVibGljIHN0YXJ0QWltKCkge1xyXG5cdFx0Y29uc29sZS5lcnJvcihcInN0YXJ0QWltXCIpXHJcblx0XHR0aGlzLmFpbVNvdW5kLnN0b3AoKVxyXG5cdFx0dGhpcy5haW1Tb3VuZC5wbGF5KClcclxuXHRcdHRoaXMuY2hhcmEuYW5pbWF0aW9uU3RhbmNlID0gdGhpcy53ZWFwb25BY3Rpb24uYWltU3RhbmNlXHJcblx0XHR0aGlzLndlYXBvbk9iai5maXJlQ29tcG9uZW50LmFuaW1hdGlvbkd1aWQgPSB0aGlzLndlYXBvbkFjdGlvbi5haW1TaG9vdEFuaW1hdGlvblxyXG5cdFx0dGhpcy50ZW1wRGlzcGVyc2lvbkRlZmF1bHQgPSB0aGlzLndlYXBvbk9iai5hY2N1cmFjeU9mRmlyZUNvbXBvbmVudC5kZWZhdWx0RGlzcGVyc2lvbkhhbGZBbmdsZVxyXG5cdFx0dGhpcy50ZW1wRGlzcGVyc2lvbk1heCA9IHRoaXMud2VhcG9uT2JqLmFjY3VyYWN5T2ZGaXJlQ29tcG9uZW50Lm1heERpc3BlcnNpb25IYWxmQW5nbGVcclxuXHRcdHRoaXMud2VhcG9uT2JqLmFjY3VyYWN5T2ZGaXJlQ29tcG9uZW50LmRlZmF1bHREaXNwZXJzaW9uSGFsZkFuZ2xlID0gdGhpcy53ZWFwb25PYmouYWNjdXJhY3lPZkZpcmVDb21wb25lbnQubWluRGlzcGVyc2lvbkhhbGZBbmdsZVxyXG5cdFx0dGhpcy53ZWFwb25PYmouYWNjdXJhY3lPZkZpcmVDb21wb25lbnQubWF4RGlzcGVyc2lvbkhhbGZBbmdsZSA9IHRoaXMud2VhcG9uT2JqLmFjY3VyYWN5T2ZGaXJlQ29tcG9uZW50Lm1pbkRpc3BlcnNpb25IYWxmQW5nbGVcclxuXHRcdHRoaXMuaXNab29taW5nID0gdHJ1ZVxyXG5cdFx0dGhpcy56b29tSW4oKVxyXG5cdFx0aWYgKHRoaXMuY29uZmlnLmlzV2VhcG9uSGF2ZVNjb3BlKSB7XHJcblx0XHRcdHRoaXMuY2FtZXJhLnRhcmdldEFybUxlbmd0aCA9IDBcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIHN0b3BBaW1cclxuXHQgKi9cclxuXHRwdWJsaWMgc3RvcEFpbSgpIHtcclxuXHRcdGNvbnNvbGUuZXJyb3IoXCJzdG9wQWltXCIpXHJcblx0XHR0aGlzLndlYXBvbk9iai5hY2N1cmFjeU9mRmlyZUNvbXBvbmVudC5tYXhEaXNwZXJzaW9uSGFsZkFuZ2xlID0gdGhpcy50ZW1wRGlzcGVyc2lvbk1heFxyXG5cdFx0dGhpcy53ZWFwb25PYmouYWNjdXJhY3lPZkZpcmVDb21wb25lbnQuZGVmYXVsdERpc3BlcnNpb25IYWxmQW5nbGUgPSB0aGlzLnRlbXBEaXNwZXJzaW9uRGVmYXVsdFxyXG5cdFx0dGhpcy5jaGFyYS5hbmltYXRpb25TdGFuY2UgPSB0aGlzLndlYXBvbkFjdGlvbi5ob2xkU3RhbmNlXHJcblx0XHR0aGlzLndlYXBvbk9iai5maXJlQ29tcG9uZW50LmFuaW1hdGlvbkd1aWQgPSB0aGlzLndlYXBvbkFjdGlvbi5zaG9vdEFuaW1hdGlvblxyXG5cdFx0dGhpcy5pc1pvb21pbmcgPSB0cnVlXHJcblx0XHR0aGlzLnpvb21PdXQoKVxyXG5cdFx0aWYgKHRoaXMuY29uZmlnLmlzV2VhcG9uSGF2ZVNjb3BlKSB7XHJcblx0XHRcdHRoaXMuY2FtZXJhLnRhcmdldEFybUxlbmd0aCA9IDQwMFxyXG5cdFx0fVxyXG5cdFx0dGhpcy5haW1Tb3VuZC5zdG9wKClcclxuXHRcdHRoaXMuYWltU291bmQucGxheSgpXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBzdGFydExvYWRcclxuXHQgKi9cclxuXHRwdWJsaWMgc3RhcnRMb2FkKCkge1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIGVuZExvYWRcclxuXHQgKi9cclxuXHRwdWJsaWMgZW5kTG9hZCgpIHtcclxuXHJcblx0fVxyXG5cclxuXHQvKiBnZXRCdWxsZXRTaXplICovXHJcblx0cHVibGljIGdldEJ1bGxldFNpemUoKTogbnVtYmVyIHtcclxuXHRcdGlmICh0aGlzLndlYXBvbk9iaiA9PSBudWxsKSByZXR1cm5cclxuXHRcdHJldHVybiB0aGlzLndlYXBvbk9iai5maXJlQ29tcG9uZW50LmN1cnJlbnRCdWxsZXRTaXplXHJcblx0fVxyXG5cclxuXHQvKiBcdTVCQTJcdTYyMzdcdTdBRUZcdTk1MDBcdTZCQzFcdTY1QjlcdTZDRDUgKi9cclxuXHRwcml2YXRlIGNsaWVudERlc3Ryb3koKSB7XHJcblx0XHRpZiAodGhpcy5waWNrVXBUcmlnZ2VyKSB7XHJcblx0XHRcdHRoaXMucGlja1VwVHJpZ2dlci5kZXN0cm95KClcclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLndlYXBvbkVudGl0eVJvb3QpIHtcclxuXHRcdFx0dGhpcy53ZWFwb25FbnRpdHlSb290LmRlc3Ryb3koKVxyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMuYW1tb0VudGl0eVJvb3QpIHtcclxuXHRcdFx0dGhpcy5hbW1vRW50aXR5Um9vdC5kZXN0cm95KClcclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLmNhc2luZ0VudGl0eSkge1xyXG5cdFx0XHR0aGlzLmNhc2luZ0VudGl0eS5kZXN0cm95KClcclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLmZpcmVFZmZlY3QpIHtcclxuXHRcdFx0dGhpcy5maXJlRWZmZWN0LmRlc3Ryb3koKVxyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMuZmlyZVNvdW5kKSB7XHJcblx0XHRcdHRoaXMuZmlyZVNvdW5kLmRlc3Ryb3koKVxyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMuaGl0Q2hhcmFFZmZlY3QpIHtcclxuXHRcdFx0dGhpcy5oaXRDaGFyYUVmZmVjdC5kZXN0cm95KClcclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLmhpdENoYXJhU291bmQpIHtcclxuXHRcdFx0dGhpcy5oaXRDaGFyYVNvdW5kLmRlc3Ryb3koKVxyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMuaGl0RWZmZWN0KSB7XHJcblx0XHRcdHRoaXMuaGl0RWZmZWN0LmRlc3Ryb3koKVxyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMuaGl0U291bmQpIHtcclxuXHRcdFx0dGhpcy5oaXRTb3VuZC5kZXN0cm95KClcclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLnJlbG9hZFNvdW5kKSB7XHJcblx0XHRcdHRoaXMucmVsb2FkU291bmQuZGVzdHJveSgpXHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5haW1Tb3VuZCkge1xyXG5cdFx0XHR0aGlzLmFpbVNvdW5kLmRlc3Ryb3koKVxyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMubG9hZFNvdW5kKSB7XHJcblx0XHRcdHRoaXMubG9hZFNvdW5kLmRlc3Ryb3koKVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyogXHU0RTBCXHU4RjdEXHU1RTc2XHU1MjFEXHU1OUNCXHU1MzE2XHU4RDQ0XHU2RTkwICovXHJcblx0cHJpdmF0ZSBpbml0QXNzZXRzKGFzc2V0SWRzOiBBcnJheTxzdHJpbmc+KTogdm9pZCB7XHJcblx0XHRmb3IgKGxldCBlbGVtZW50IG9mIGFzc2V0SWRzKSB7XHJcblx0XHRcdFV0aWwuQXNzZXRVdGlsLmFzeW5jRG93bmxvYWRBc3NldChlbGVtZW50KVxyXG5cdFx0fVxyXG5cdH1cclxuXHQvKiBcdTY3MERcdTUyQTFcdTdBRUZcdTUyMURcdTU5Q0JcdTUzMTZcdTY1QjlcdTZDRDUgKi9cclxuXHRwcml2YXRlIHNlcnZlckluaXQoKSB7XHJcblx0XHR0aGlzLnNlcnZlckluaXREZWxlZ2F0ZSgpXHJcblxyXG5cdH1cclxuXHJcblx0LyogXHU2NzBEXHU1MkExXHU3QUVGXHU1MjFEXHU1OUNCXHU1MzE2XHU1NkRFXHU4QzAzXHU1MUZEXHU2NTcwICovXHJcblx0cHJpdmF0ZSBzZXJ2ZXJJbml0RGVsZWdhdGUoKTogdm9pZCB7XHJcblx0XHR0aGlzLndlYXBvbk9iai5vbkVxdWlwcGVkU2VydmVyLmFkZCh0aGlzLm9uU2VydmVyRXF1aXAuYmluZCh0aGlzKSlcclxuXHRcdHRoaXMud2VhcG9uT2JqLm9uVW5lcXVpcHBlZFNlcnZlci5hZGQodGhpcy5vblNlcnZlclVuZXF1aXAuYmluZCh0aGlzKSlcclxuXHJcblx0XHR0aGlzLndlYXBvbk9iai5maXJlQ29tcG9uZW50Lm9uU3RhcnRGaXJlU2VydmVyLmFkZCh0aGlzLm9uU2VydmVyU3RhcnRGaXJlLmJpbmQodGhpcykpXHJcblx0XHR0aGlzLndlYXBvbk9iai5maXJlQ29tcG9uZW50Lm9uRW5kRmlyZVNlcnZlci5hZGQodGhpcy5vblNlcnZlckVuZEZpcmUuYmluZCh0aGlzKSlcclxuXHRcdGlmICh0aGlzLndlYXBvbk9iai5yZWxvYWRDb21wb25lbnQpIHtcclxuXHRcdFx0dGhpcy53ZWFwb25PYmoucmVsb2FkQ29tcG9uZW50Lm9uU3RhcnRSZWxvYWRTZXJ2ZXIuYWRkKHRoaXMub25TZXJ2ZXJTdGFydFJlbG9hZC5iaW5kKHRoaXMpKVxyXG5cdFx0XHR0aGlzLndlYXBvbk9iai5yZWxvYWRDb21wb25lbnQub25FbmRSZWxvYWRTZXJ2ZXIuYWRkKHRoaXMub25TZXJ2ZXJFbmRSZWxvYWQuYmluZCh0aGlzKSlcclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLndlYXBvbk9iai5sb2FkQ29tcG9uZW50KSB7XHJcblx0XHRcdHRoaXMud2VhcG9uT2JqLmxvYWRDb21wb25lbnQub25TdGFydExvYWRTZXJ2ZXIuYWRkKHRoaXMub25TZXJ2ZXJTdGFydExvYWQuYmluZCh0aGlzKSlcclxuXHRcdFx0dGhpcy53ZWFwb25PYmoubG9hZENvbXBvbmVudC5vbkVuZExvYWRTZXJ2ZXIuYWRkKHRoaXMub25TZXJ2ZXJFbmRMb2FkLmJpbmQodGhpcykpXHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy53ZWFwb25PYmouYWltQ29tcG9uZW50KSB7XHJcblx0XHRcdHRoaXMud2VhcG9uT2JqLmFpbUNvbXBvbmVudC5vbkFpbVN0YXJ0U2VydmVyLmFkZCh0aGlzLm9uU2VydmVyU3RhcnRBaW0uYmluZCh0aGlzKSlcclxuXHRcdFx0dGhpcy53ZWFwb25PYmouYWltQ29tcG9uZW50Lm9uQWltRW5kU2VydmVyLmFkZCh0aGlzLm9uU2VydmVyRW5kQWltLmJpbmQodGhpcykpXHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy53ZWFwb25PYmoucmVjb2lsRm9yY2VDb21wb25lbnQpIHtcclxuXHRcdFx0dGhpcy53ZWFwb25PYmoucmVjb2lsRm9yY2VDb21wb25lbnQub25TdGFydFJlY29pbEZvcmNlU2VydmVyLmFkZCh0aGlzLm9uU2VydmVyU3RhcnRSZWNvaWwuYmluZCh0aGlzKSlcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qIFx1NjcwRFx1NTJBMVx1N0FFRlx1NUYwMFx1NTlDQlx1NUYwMFx1NzA2Qlx1NTZERVx1OEMwMyAqL1xyXG5cdHByaXZhdGUgb25TZXJ2ZXJFcXVpcCgpIHtcclxuXHRcdGNvbnNvbGUuZXJyb3IoXCJTZXJ2ZXJFcXVpcCBcIiArIHRoaXMud2VhcG9uT2JqLmdldEN1cnJlbnRPd25lcigpLmNoYXJhY3Rlck5hbWUpXHJcblx0XHRpZiAoIXRoaXMud2VhcG9uT2JqLmdldEN1cnJlbnRPd25lcigpKSByZXR1cm5cclxuXHRcdGxldCB2MiA9IHRoaXMud2VhcG9uT2JqLmdldEN1cnJlbnRPd25lcigpLnNldEFwcGVhcmFuY2UoR2FtZXBsYXkuSHVtYW5vaWRWMilcclxuXHRcdGlmICgodjIuZ2V0U29tYXRvdHlwZSgpICUgMikgPT0gMCkge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKFwiZmVtYWxlXCIpXHJcblx0XHRcdHRoaXMuY2hhbmdlV2VhcG9uQWN0aW9uKDApXHJcblx0XHRcdHRoaXMuY2xpZW50RXF1aXAodGhpcy53ZWFwb25PYmouZ2V0Q3VycmVudE93bmVyKCkucGxheWVyLCAwKVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Y29uc29sZS5lcnJvcihcIm1hbGVcIilcclxuXHRcdFx0dGhpcy5jaGFuZ2VXZWFwb25BY3Rpb24oMSlcclxuXHRcdFx0dGhpcy5jbGllbnRFcXVpcCh0aGlzLndlYXBvbk9iai5nZXRDdXJyZW50T3duZXIoKS5wbGF5ZXIsIDEpXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKiBcdTY3MERcdTUyQTFcdTdBRUZcdTUzNzhcdThGN0RcdTg4QzVcdTU5MDdcdTVCOENcdTYyMTBcdTU2REVcdThDMDMgKi9cclxuXHRwcml2YXRlIG9uU2VydmVyVW5lcXVpcCgpIHtcclxuXHRcdGNvbnNvbGUuZXJyb3IoXCJvblNlcnZlclVuZXF1aXBcIilcclxuXHJcblx0fVxyXG5cclxuXHQvKiBcdTY3MERcdTUyQTFcdTdBRUZcdTVGMDBcdTU5Q0JcdTVGMDBcdTcwNkJcdTU2REVcdThDMDMgKi9cclxuXHRwcml2YXRlIG9uU2VydmVyU3RhcnRGaXJlKCkge1xyXG5cclxuXHR9XHJcblxyXG5cdC8qIFx1NjcwRFx1NTJBMVx1N0FFRlx1N0VEM1x1Njc1Rlx1NUYwMFx1NzA2Qlx1NTZERVx1OEMwMyAqL1xyXG5cdHByaXZhdGUgb25TZXJ2ZXJFbmRGaXJlKCkge1xyXG5cclxuXHR9XHJcblxyXG5cdC8qIFx1NjcwRFx1NTJBMVx1N0FFRlx1NUYwMFx1NTlDQlx1NjM2Mlx1NUYzOVx1NTZERVx1OEMwMyAqL1xyXG5cdHByaXZhdGUgb25TZXJ2ZXJTdGFydFJlbG9hZCgpIHtcclxuXHJcblx0fVxyXG5cclxuXHQvKiBcdTY3MERcdTUyQTFcdTdBRUZcdTdFRDNcdTY3NUZcdTYzNjJcdTVGMzlcdTU2REVcdThDMDMgKi9cclxuXHRwcml2YXRlIG9uU2VydmVyRW5kUmVsb2FkKCkge1xyXG5cclxuXHR9XHJcblxyXG5cdC8qIFx1NjcwRFx1NTJBMVx1N0FFRlx1NUYwMFx1NTlDQlx1NEUwQVx1ODE5Qlx1NTZERVx1OEMwMyAqL1xyXG5cdHByaXZhdGUgb25TZXJ2ZXJTdGFydExvYWQoKSB7XHJcblxyXG5cdH1cclxuXHJcblx0LyogXHU2NzBEXHU1MkExXHU3QUVGXHU3RUQzXHU2NzVGXHU0RTBBXHU4MTlCXHU1NkRFXHU4QzAzICovXHJcblx0cHJpdmF0ZSBvblNlcnZlckVuZExvYWQoKSB7XHJcblxyXG5cdH1cclxuXHJcblx0LyogXHU2NzBEXHU1MkExXHU3QUVGXHU1RjAwXHU1OUNCXHU3Nzg0XHU1MUM2XHU1NkRFXHU4QzAzICovXHJcblx0cHJpdmF0ZSBvblNlcnZlclN0YXJ0QWltKCkge1xyXG5cclxuXHR9XHJcblxyXG5cdC8qIFx1NjcwRFx1NTJBMVx1N0FFRlx1N0VEM1x1Njc1Rlx1Nzc4NFx1NTFDNlx1NTZERVx1OEMwMyAqL1xyXG5cdHByaXZhdGUgb25TZXJ2ZXJFbmRBaW0oKSB7XHJcblxyXG5cdH1cclxuXHJcblx0LyogXHU2NzBEXHU1MkExXHU3QUVGXHU1RjAwXHU1OUNCXHU1NDBFXHU1NzUwXHU1MjlCXHU1NkRFXHU4QzAzICovXHJcblx0cHJpdmF0ZSBvblNlcnZlclN0YXJ0UmVjb2lsKCkge1xyXG5cclxuXHR9XHJcblxyXG5cdHByaXZhdGUgX2lzSW5pdGVkOiBib29sZWFuID0gZmFsc2VcclxuXHJcblx0LyogXHU1QkEyXHU2MjM3XHU3QUVGXHU1MjFEXHU1OUNCXHU1MzE2XHU2NUI5XHU2Q0Q1ICovXHJcblx0cHJpdmF0ZSBjbGllbnRJbml0KCkge1xyXG5cdFx0aWYgKHRoaXMuX2lzSW5pdGVkKSB7XHJcblx0XHRcdHJldHVyblxyXG5cdFx0fVxyXG5cdFx0dGhpcy5faXNJbml0ZWQgPSB0cnVlXHJcblx0XHQvKiBcdTgzQjdcdTUzRDZcdTczQTlcdTVCQjZcdTc2RjhcdTUxNzNcdTVCRjlcdThDNjEgKi9cclxuXHRcdEdhbWVwbGF5LmFzeW5jR2V0Q3VycmVudFBsYXllcigpLnRoZW4oKHBsYXllcjogR2FtZXBsYXkuUGxheWVyKSA9PiB7XHJcblx0XHRcdHRoaXMucGxheWVyID0gcGxheWVyXHJcblx0XHRcdHRoaXMuY2hhcmEgPSB0aGlzLnBsYXllci5jaGFyYWN0ZXJcclxuXHRcdFx0dGhpcy5jYW1lcmEgPSB0aGlzLmNoYXJhLmNhbWVyYVN5c3RlbVxyXG5cdFx0XHR0aGlzLmNsaWVudEluaXRXZWFwb25FbnRpdHlSb290KClcclxuXHRcdFx0dGhpcy5jbGllbnRJbml0UGlja1VwVHJpZ2dlcigpXHJcblx0XHRcdHRoaXMuY2xpZW50SW5pdEFtbW9FbnRpdHlSb290KClcclxuXHRcdFx0dGhpcy5jbGllbnRJbml0Q2FzaW5nRW50aXR5KClcclxuXHRcdFx0dGhpcy5jbGllbnRJbml0SGl0Q2hhcmFFZmZlY3QoKVxyXG5cdFx0XHR0aGlzLmNsaWVudEluaXRIaXRFZmZlY3QoKVxyXG5cdFx0XHR0aGlzLmNsaWVudEluaXRGaXJlRWZmZWN0KClcclxuXHRcdFx0dGhpcy5jbGllbnRJbml0RmlyZVNvdW5kKClcclxuXHRcdFx0dGhpcy5jbGllbnRJbml0UmVsb2FkU291bmQoKVxyXG5cdFx0XHR0aGlzLmNsaWVudEluaXRMb2FkU291bmQoKVxyXG5cdFx0XHR0aGlzLmNsaWVudEluaXRBaW1Tb3VuZCgpXHJcblx0XHRcdHRoaXMuY2xpZW50SW5pdEhpdENoYXJhU291bmQoKVxyXG5cdFx0XHR0aGlzLmNsaWVudEluaXRIaXRTb3VuZCgpXHJcblx0XHRcdHRoaXMuY2xpZW50SW5pdERlbGVnYXRlKClcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHQvKiBcdTVCQTJcdTYyMzdcdTdBRUZcdTUyMURcdTU5Q0JcdTUzMTZcdTY4MzlcdTZCNjZcdTU2NjhcdTVCOUVcdTRGNTMgKi9cclxuXHRwcml2YXRlIGNsaWVudEluaXRXZWFwb25FbnRpdHlSb290KCk6IHZvaWQge1xyXG5cdFx0dGhpcy53ZWFwb25FbnRpdHlSb290ID0gdGhpcy53ZWFwb25PYmouZ2V0Q2hpbGRCeU5hbWUoXCJ3ZWFwb25FbnRpdHlSb290XCIpIGFzIENvcmUuR2FtZU9iamVjdFxyXG5cdH1cclxuXHJcblx0LyogXHU1QkEyXHU2MjM3XHU3QUVGXHU1MjFEXHU1OUNCXHU1MzE2XHU2MkZFXHU1M0Q2XHU4OUU2XHU1M0QxXHU1NjY4ICovXHJcblx0cHJpdmF0ZSBjbGllbnRJbml0UGlja1VwVHJpZ2dlcigpOiB2b2lkIHtcclxuXHRcdHRoaXMucGlja1VwVHJpZ2dlciA9IHRoaXMud2VhcG9uT2JqLmdldENoaWxkQnlOYW1lKFwicGlja1VwVHJpZ2dlclwiKSBhcyBHYW1lcGxheS5UcmlnZ2VyXHJcblx0XHRpZiAodGhpcy5waWNrVXBUcmlnZ2VyKSB7XHJcblx0XHRcdHRoaXMucGlja1VwVHJpZ2dlci5vbkVudGVyLmFkZCgoY2hhcmE6IEdhbWVwbGF5LkNoYXJhY3RlcikgPT4ge1xyXG5cdFx0XHRcdC8vIFx1NTk4Mlx1Njc5Q1x1NjYyRlx1ODlEMlx1ODI3Mlx1RkYwQ1x1OTUwMFx1NkJDMVx1ODlFNlx1NTNEMVx1NTY2OFx1RkYwQ1x1ODhDNVx1NTkwN1x1NkI2Nlx1NTY2OFx1RkYwQ1x1NjM2Mlx1NUYzOVx1RkYwQ1x1NEZFRVx1NjUzOVx1NTlGRlx1NjAwMVx1RkYwQ1x1OEJCRVx1N0Y2RVx1NzNBOVx1NUJCNlx1NkI2Nlx1NTY2OG1hcFx1RkYwQ1x1NkQzRVx1NTNEMVx1ODhDNVx1NTkwN1x1NEU4Qlx1NEVGNlxyXG5cdFx0XHRcdGlmICghKGNoYXJhIGluc3RhbmNlb2YgR2FtZXBsYXkuQ2hhcmFjdGVyKSkgcmV0dXJuXHJcblx0XHRcdFx0aWYgKGNoYXJhID09PSB0aGlzLmNoYXJhKSB7XHJcblx0XHRcdFx0XHR0aGlzLnNlcnZlckVxdWlwKHRoaXMucGxheWVyLmdldFBsYXllcklEKCkpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyogXHU2NzBEXHU1MkExXHU3QUVGXHU4OEM1XHU1OTA3ICovXHJcblx0QENvcmUuRnVuY3Rpb24oQ29yZS5TZXJ2ZXIpXHJcblx0cHJpdmF0ZSBzZXJ2ZXJFcXVpcChwbGF5ZXJJRDogbnVtYmVyKTogdm9pZCB7XHJcblx0XHRsZXQgcGxheWVyID0gR2FtZXBsYXkuZ2V0UGxheWVyKHBsYXllcklEKVxyXG5cdFx0Ly8gXHU1OTgyXHU2NzlDXHU4OEM1XHU1OTA3XHU2NUY2XHU3M0E5XHU1QkI2XHU0RTNBXHU3QTdBXHU1MjE5XHU4RkQ0XHU1NkRFXHJcblx0XHRpZiAocGxheWVyID09IG51bGwgfHwgIXRoaXMud2VhcG9uT2JqKSByZXR1cm5cclxuXHRcdHRoaXMud2VhcG9uT2JqLmVxdWlwbWVudChwbGF5ZXIuY2hhcmFjdGVyLCB0aGlzLmNvbmZpZy5lcXVpcG1lbnRTbG90KVxyXG5cdFx0dGhpcy5pc0VxdWlwZWQgPSB0cnVlXHJcblx0XHRQcmVmYWJFdmVudC5QcmVmYWJFdnRFcXVpcC5lcXVpcChwbGF5ZXIuY2hhcmFjdGVyLmd1aWQsIFByZWZhYkV2ZW50LkVxdWlwU2xvdC5XZWFwb24sIHRoaXMud2VhcG9uT2JqLmd1aWQpXHJcblx0fVxyXG5cclxuXHJcblxyXG5cdC8qIFx1NEZFRVx1NjUzOVx1OTg4NFx1NTIzNlx1NEY1M1x1NTJBOFx1NEY1Q1x1OEQ0NFx1NkU5MCAqL1xyXG5cdHByaXZhdGUgY2hhbmdlV2VhcG9uQWN0aW9uKHNleDogbnVtYmVyKSB7XHJcblx0XHRjb25zb2xlLmVycm9yKFwiY2hhbmdlV2VhcG9uQWN0aW9uIFwiICsgc2V4KVxyXG5cdFx0c2V4ID09IDAgPyB0aGlzLndlYXBvbkFjdGlvbiA9IEdhbWVDb25maWcuQWN0aW9uLmdldEVsZW1lbnQodGhpcy5jb25maWcuZmVtYWxlQWN0aW9uKSA6IHRoaXMud2VhcG9uQWN0aW9uID0gR2FtZUNvbmZpZy5BY3Rpb24uZ2V0RWxlbWVudCh0aGlzLmNvbmZpZy5tYWxlQWN0aW9uKVxyXG5cdFx0aWYgKHRoaXMud2VhcG9uT2JqKSB7XHJcblx0XHRcdHRoaXMud2VhcG9uT2JqLmZpcmVDb21wb25lbnQuYW5pbWF0aW9uR3VpZCA9IHRoaXMud2VhcG9uQWN0aW9uLnNob290QW5pbWF0aW9uXHJcblx0XHRcdGlmICh0aGlzLndlYXBvbk9iai5yZWxvYWRFbmFibGUpIHtcclxuXHRcdFx0XHR0aGlzLndlYXBvbk9iai5yZWxvYWRDb21wb25lbnQuYW5pbWF0aW9uR3VpZCA9IHRoaXMud2VhcG9uQWN0aW9uLnJlbG9hZEFuaW1hdGlvblxyXG5cdFx0XHR9XHJcblx0XHRcdGlmICh0aGlzLndlYXBvbk9iai5sb2FkRW5hYmxlKSB7XHJcblx0XHRcdFx0dGhpcy53ZWFwb25PYmoubG9hZENvbXBvbmVudC5hbmltYXRpb25HdWlkID0gdGhpcy53ZWFwb25BY3Rpb24ubG9hZEFuaW1hdGlvblxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIHRlbXBNb3ZlRmFjaW5nRGlyZWN0aW9uOiBudW1iZXJcclxuXHRwcml2YXRlIHRlbXB0YXJnZXRBcm1MZW5ndGg6IG51bWJlclxyXG5cdHByaXZhdGUgdGVtcGNhbWVyYUZPVjogbnVtYmVyXHJcblx0cHJpdmF0ZSB0ZW1wY2FtZXJhT2Zmc2V0OiBUeXBlLlZlY3RvclxyXG5cdHByaXZhdGUgdGVtcHRhcmdldEFybU9mZnNldDogVHlwZS5WZWN0b3JcclxuXHRwcml2YXRlIHRlbXBhbmltYXRpb25TdGFuY2U6IHN0cmluZ1xyXG5cclxuXHQvKiBcdTVCQTJcdTYyMzdcdTdBRUZcdTg4QzVcdTU5MDcgKi9cclxuXHRAQ29yZS5GdW5jdGlvbihDb3JlLkNsaWVudClcclxuXHRwcml2YXRlIGNsaWVudEVxdWlwKHBpY2tQbGF5ZXI6IEdhbWVwbGF5LlBsYXllciwgZ2VuZGVyOiBudW1iZXIpOiB2b2lkIHtcclxuXHRcdGlmICghdGhpcy5jYW1lcmEpIHtcclxuXHRcdFx0dGhpcy5jYW1lcmEgPSBHYW1lcGxheS5nZXRDdXJyZW50UGxheWVyKCkuY2hhcmFjdGVyLmNhbWVyYVN5c3RlbVxyXG5cdFx0fVxyXG5cdFx0aWYgKCF0aGlzLndlYXBvbk9iaikge1xyXG5cdFx0XHR0aGlzLndlYXBvbk9iaiA9IHRoaXMuZ2FtZU9iamVjdCBhcyBHYW1lcGxheS5Ib3RXZWFwb25cclxuXHRcdH1cclxuXHRcdHRoaXMud2VhcG9uT2JqLmVxdWlwbWVudCh0aGlzLmNoYXJhLCB0aGlzLmNvbmZpZy5lcXVpcG1lbnRTbG90KVxyXG5cdFx0Ly9FdmVudHMuZGlzcGF0Y2hMb2NhbChVTkVRVUlQX0VWRU5UKVxyXG5cdFx0dGhpcy5jaGFuZ2VXZWFwb25BY3Rpb24oZ2VuZGVyKVxyXG5cdFx0Ly8gc2V0VGltZW91dCgoKSA9PiB7XHJcblx0XHQvLyBcdEV2ZW50cy5kaXNwYXRjaExvY2FsKEVRVUlQX0VWRU5ULCB0aGlzKVxyXG5cdFx0dGhpcy50ZW1wTW92ZUZhY2luZ0RpcmVjdGlvbiA9IHRoaXMuY2hhcmEubW92ZUZhY2luZ0RpcmVjdGlvblxyXG5cdFx0dGhpcy50ZW1wYW5pbWF0aW9uU3RhbmNlID0gdGhpcy5jaGFyYS5hbmltYXRpb25TdGFuY2VcclxuXHRcdHRoaXMudGVtcHRhcmdldEFybUxlbmd0aCA9IHRoaXMuY2FtZXJhLnRhcmdldEFybUxlbmd0aFxyXG5cdFx0dGhpcy50ZW1wdGFyZ2V0QXJtT2Zmc2V0ID0gdGhpcy5jYW1lcmEuY2FtZXJhU3lzdGVtUmVsYXRpdmVUcmFuc2Zvcm0ubG9jYXRpb25cclxuXHRcdHRoaXMudGVtcGNhbWVyYUZPViA9IHRoaXMuY2FtZXJhLmNhbWVyYUZPVlxyXG5cdFx0dGhpcy50ZW1wY2FtZXJhT2Zmc2V0ID0gdGhpcy5jYW1lcmEuY2FtZXJhUmVsYXRpdmVUcmFuc2Zvcm0ubG9jYXRpb25cclxuXHRcdHRoaXMuY2hhcmEuYW5pbWF0aW9uU3RhbmNlID0gdGhpcy53ZWFwb25BY3Rpb24uaG9sZFN0YW5jZVxyXG5cdFx0dGhpcy5jaGFyYS5wbGF5QW5pbWF0aW9uKHRoaXMud2VhcG9uQWN0aW9uLmVxdWlwQW5pbWF0aW9uKVxyXG5cdFx0dGhpcy5jaGFyYS5tb3ZlRmFjaW5nRGlyZWN0aW9uID0gR2FtZXBsYXkuTW92ZUZhY2luZ0RpcmVjdGlvbi5Db250cm9sbGVyRGlyZWN0aW9uXHJcblx0XHR0aGlzLmNhbWVyYS50YXJnZXRBcm1MZW5ndGggPSA0MDBcclxuXHRcdHRoaXMuY2FtZXJhLmNhbWVyYUZPViA9IHRoaXMuY29uZmlnLmVxdWlwbWVudENhbWVyYUZvdlxyXG5cdFx0dGhpcy5jYW1lcmEuY2FtZXJhUmVsYXRpdmVUcmFuc2Zvcm0gPSBuZXcgVHlwZS5UcmFuc2Zvcm0odGhpcy5jb25maWcuZXF1aXBtZW50Q2FtZXJhT2Zmc2V0LCB0aGlzLmNhbWVyYS5jYW1lcmFSZWxhdGl2ZVRyYW5zZm9ybS5yb3RhdGlvbiwgdGhpcy5jYW1lcmEuY2FtZXJhUmVsYXRpdmVUcmFuc2Zvcm0uc2NhbGUpXHJcblx0XHR0aGlzLmNhbWVyYS5jYW1lcmFTeXN0ZW1SZWxhdGl2ZVRyYW5zZm9ybSA9IG5ldyBUeXBlLlRyYW5zZm9ybShuZXcgVHlwZS5WZWN0b3IoMCwgMCwgNjApLCB0aGlzLmNhbWVyYS5jYW1lcmFSZWxhdGl2ZVRyYW5zZm9ybS5yb3RhdGlvbiwgdGhpcy5jYW1lcmEuY2FtZXJhUmVsYXRpdmVUcmFuc2Zvcm0uc2NhbGUpXHJcblx0XHR0aGlzLndlYXBvblVJID0gVUkuVUlNYW5hZ2VyLmluc3RhbmNlLnNob3coV2VhcG9uVUksIHRoaXMsIHRoaXMud2VhcG9uT2JqLmFjY3VyYWN5T2ZGaXJlRW5hYmxlID8gdGhpcy53ZWFwb25PYmouYWNjdXJhY3lPZkZpcmVDb21wb25lbnQuZGVmYXVsdERpc3BlcnNpb25IYWxmQW5nbGUgOiAwLCB0aGlzLmNvbmZpZy53ZWFwb25JY29uLCB0aGlzLmNvbmZpZy5uYW1lKVxyXG5cdFx0dGhpcy53ZWFwb25VSS5zZXRUaW1lVGV4dCh0aGlzLmNvbmZpZy5rZWVwVGltZSwgdGhpcy5jb25maWcua2VlcFRpbWUpXHJcblx0XHR0aGlzLndlYXBvblVJLnNldFJlbG9hZEJ0bighdGhpcy5jb25maWcuaXNTdXBwb3J0UmVwQW1tbylcclxuXHRcdGlmICh0aGlzLmNvbmZpZy5pc1N1cHBvcnRSZXBBbW1vKSB7XHJcblx0XHRcdHRoaXMud2VhcG9uT2JqLnJlbG9hZENvbXBvbmVudC5hbmltYXRpb25HdWlkID0gdGhpcy53ZWFwb25BY3Rpb24uYWltU2hvb3RBbmltYXRpb25cclxuXHRcdFx0dGhpcy53ZWFwb25PYmoubG9hZENvbXBvbmVudC5hbmltYXRpb25HdWlkID0gdGhpcy53ZWFwb25BY3Rpb24uYWltU2hvb3RBbmltYXRpb25cclxuXHRcdH1cclxuXHRcdHRoaXMuX3Jlc3RUaW1lID0gdGhpcy5jb25maWcua2VlcFRpbWVcclxuXHRcdC8vIH0sIDEwMClcclxuXHR9XHJcblx0LyogXHU0RkVFXHU2NTM5Rk9WICovXHJcblx0cHVibGljIGNoYW5nZUZvdih2YWx1ZTogbnVtYmVyKSB7XHJcblx0XHR0aGlzLmNhbWVyYS5jYW1lcmFGT1YgPSB2YWx1ZVxyXG5cdH1cclxuXHJcblxyXG5cdC8qIFx1NUJBMlx1NjIzN1x1N0FFRlx1NTIxRFx1NTlDQlx1NTMxNlx1NjgzOVx1NUYzOVx1ODM2Rlx1NUI5RVx1NEY1MyAqL1xyXG5cdHByaXZhdGUgYXN5bmMgY2xpZW50SW5pdEFtbW9FbnRpdHlSb290KCkge1xyXG5cdFx0dGhpcy5hbW1vRW50aXR5Um9vdCA9IGF3YWl0IEdhbWVPYmplY3QuYXN5bmNTcGF3bih7IGd1aWQgOiB0aGlzLndlYXBvblJlc291cmNlcy5hbW1vIH0pXHJcblx0XHR0aGlzLmFtbW9FbnRpdHlSb290LnBhcmVudCA9IHRoaXMud2VhcG9uT2JqXHJcblx0XHR0aGlzLmFtbW9Qb29sID0gbmV3IEdhbWVEZWYuU2ltcGxlT2JqZWN0UG9vbDxDb3JlLkdhbWVPYmplY3Q+KHRoaXMuaW5zdGFuY2VBbW1vLmJpbmQodGhpcyksIChvYmo6IENvcmUuR2FtZU9iamVjdCkgPT4geyBvYmouZGVzdHJveSgpIH0sIChvYmo6IENvcmUuR2FtZU9iamVjdCkgPT4geyBvYmouc2V0VmlzaWJpbGl0eShUeXBlLlByb3BlcnR5U3RhdHVzLk9mZikgfSlcclxuXHR9XHJcblxyXG5cdC8qIFx1NUJBMlx1NjIzN1x1N0FFRlx1NTIxRFx1NTlDQlx1NTMxNlx1NUYzOVx1NThGM1x1NUI5RVx1NEY1MyAqL1xyXG5cdHByaXZhdGUgYXN5bmMgY2xpZW50SW5pdENhc2luZ0VudGl0eSgpIHtcclxuXHRcdHRoaXMuY2FzaW5nRW50aXR5ID0gYXdhaXQgR2FtZU9iamVjdC5hc3luY1NwYXduKHsgZ3VpZCA6IHRoaXMud2VhcG9uUmVzb3VyY2VzLmNhc2luZyB9KVxyXG5cdFx0dGhpcy5jYXNpbmdFbnRpdHkucGFyZW50ID0gdGhpcy53ZWFwb25PYmpcclxuXHRcdHRoaXMuY2FzaW5nUG9vbCA9IG5ldyBHYW1lRGVmLlNpbXBsZU9iamVjdFBvb2w8Q29yZS5HYW1lT2JqZWN0Pih0aGlzLmluc3RhbmNlQ2FzaW5nLmJpbmQodGhpcyksIChvYmo6IENvcmUuR2FtZU9iamVjdCkgPT4geyBvYmouZGVzdHJveSgpIH0sIChvYmo6IENvcmUuR2FtZU9iamVjdCkgPT4geyBvYmouc2V0VmlzaWJpbGl0eShUeXBlLlByb3BlcnR5U3RhdHVzLk9mZikgfSlcclxuXHR9XHJcblxyXG5cdC8qIFx1NUJBMlx1NjIzN1x1N0FFRlx1NTIxRFx1NTlDQlx1NTMxNlx1NTFGQlx1NEUyRFx1ODlEMlx1ODI3Mlx1NzI3OVx1NjU0OCAqL1xyXG5cdHByaXZhdGUgYXN5bmMgY2xpZW50SW5pdEhpdENoYXJhRWZmZWN0KCkge1xyXG5cdFx0dGhpcy5oaXRDaGFyYUVmZmVjdCA9IGF3YWl0IEdhbWVPYmplY3QuYXN5bmNTcGF3bih7IGd1aWQgOiB0aGlzLndlYXBvblJlc291cmNlcy5oaXRSb2xlRWZmZWN0IH0pXHJcblx0XHR0aGlzLmhpdENoYXJhRWZmZWN0LnBhcmVudCA9IHRoaXMud2VhcG9uT2JqXHJcblx0XHR0aGlzLmhpdENoYXJhRWZmZWN0UG9vbCA9IG5ldyBHYW1lRGVmLlNpbXBsZU9iamVjdFBvb2w8R2FtZXBsYXkuUGFydGljbGU+KHRoaXMuaW5zdGFuY2VIaXRDaGFyYUVmZmVjdC5iaW5kKHRoaXMpLCAocGFydGljbGU6IEdhbWVwbGF5LlBhcnRpY2xlKSA9PiB7IHBhcnRpY2xlLmRlc3Ryb3koKSB9LCAocGFydGljbGU6IEdhbWVwbGF5LlBhcnRpY2xlKSA9PiB7IHBhcnRpY2xlLmRldGFjaEZyb21HYW1lT2JqZWN0KCk7IHBhcnRpY2xlLmZvcmNlU3RvcCgpIH0pXHJcblx0fVxyXG5cclxuXHQvKiBcdTVCQTJcdTYyMzdcdTdBRUZcdTUyMURcdTU5Q0JcdTUzMTZcdTUxRkJcdTRFMkRcdTcyNjlcdTRGNTNcdTcyNzlcdTY1NDggKi9cclxuXHRwcml2YXRlIGFzeW5jIGNsaWVudEluaXRIaXRFZmZlY3QoKSB7XHJcblx0XHR0aGlzLmhpdEVmZmVjdCA9IGF3YWl0IEdhbWVPYmplY3QuYXN5bmNTcGF3bih7IGd1aWQgOiB0aGlzLndlYXBvblJlc291cmNlcy5oaXRPdGhlckVmZmVjdCB9KVxyXG5cdFx0dGhpcy5oaXRFZmZlY3QucGFyZW50ID0gdGhpcy53ZWFwb25PYmpcclxuXHRcdHRoaXMuaGl0RWZmZWN0UG9vbCA9IG5ldyBHYW1lRGVmLlNpbXBsZU9iamVjdFBvb2w8R2FtZXBsYXkuUGFydGljbGU+KHRoaXMuaW5zdGFuY2VIaXRFZmZlY3QuYmluZCh0aGlzKSwgKHBhcnRpY2xlOiBHYW1lcGxheS5QYXJ0aWNsZSkgPT4geyBwYXJ0aWNsZS5kZXN0cm95KCkgfSwgKHBhcnRpY2xlOiBHYW1lcGxheS5QYXJ0aWNsZSkgPT4geyBwYXJ0aWNsZS5kZXRhY2hGcm9tR2FtZU9iamVjdCgpOyBwYXJ0aWNsZS5mb3JjZVN0b3AoKSB9KVxyXG5cdH1cclxuXHJcblx0LyogXHU1QkEyXHU2MjM3XHU3QUVGXHU1MjFEXHU1OUNCXHU1MzE2XHU1RjAwXHU3MDZCXHU3Mjc5XHU2NTQ4ICovXHJcblx0cHJpdmF0ZSBhc3luYyBjbGllbnRJbml0RmlyZUVmZmVjdCgpIHtcclxuXHRcdHRoaXMuZmlyZUVmZmVjdCA9IGF3YWl0IEdhbWVPYmplY3QuYXN5bmNTcGF3bih7IGd1aWQgOiB0aGlzLndlYXBvblJlc291cmNlcy5maXJlRWZmZWN0IH0pXHJcblx0XHR0aGlzLmZpcmVFZmZlY3QucGFyZW50ID0gdGhpcy53ZWFwb25PYmpcclxuXHR9XHJcblxyXG5cdC8qIFx1NUJBMlx1NjIzN1x1N0FFRlx1NTIxRFx1NTlDQlx1NTMxNlx1NUYwMFx1NzA2Qlx1OTdGM1x1NjU0OCAqL1xyXG5cdHByaXZhdGUgYXN5bmMgY2xpZW50SW5pdEZpcmVTb3VuZCgpIHtcclxuXHRcdHRoaXMuZmlyZVNvdW5kID0gYXdhaXQgR2FtZU9iamVjdC5hc3luY1NwYXduKHsgZ3VpZCA6IHRoaXMud2VhcG9uUmVzb3VyY2VzLmZpcmVTb3VuZCB9KVxyXG5cdFx0dGhpcy5maXJlU291bmQucGFyZW50ID0gdGhpcy53ZWFwb25PYmpcclxuXHR9XHJcblxyXG5cdC8qIFx1NUJBMlx1NjIzN1x1N0FFRlx1NTIxRFx1NTlDQlx1NTMxNlx1NjM2Mlx1NUYzOVx1OTdGM1x1NjU0OCAqL1xyXG5cdHByaXZhdGUgYXN5bmMgY2xpZW50SW5pdFJlbG9hZFNvdW5kKCkge1xyXG5cdFx0dGhpcy5yZWxvYWRTb3VuZCA9IGF3YWl0IEdhbWVPYmplY3QuYXN5bmNTcGF3bih7IGd1aWQgOiB0aGlzLndlYXBvblJlc291cmNlcy5yZWxvYWRTb3VuZCB9KVxyXG5cdFx0dGhpcy5yZWxvYWRTb3VuZC5wYXJlbnQgPSB0aGlzLndlYXBvbk9ialxyXG5cdH1cclxuXHJcblx0LyogXHU1QkEyXHU2MjM3XHU3QUVGXHU1MjFEXHU1OUNCXHU1MzE2XHU0RTBBXHU4MTlCXHU5N0YzXHU2NTQ4ICovXHJcblx0cHJpdmF0ZSBhc3luYyBjbGllbnRJbml0TG9hZFNvdW5kKCkge1xyXG5cdFx0dGhpcy5sb2FkU291bmQgPSBhd2FpdCBHYW1lT2JqZWN0LmFzeW5jU3Bhd24oeyBndWlkIDogdGhpcy53ZWFwb25SZXNvdXJjZXMubG9hZFNvdW5kIH0pXHJcblx0XHR0aGlzLmxvYWRTb3VuZC5wYXJlbnQgPSB0aGlzLndlYXBvbk9ialxyXG5cdH1cclxuXHJcblx0LyogXHU1QkEyXHU2MjM3XHU3QUVGXHU1MjFEXHU1OUNCXHU1MzE2XHU3Nzg0XHU1MUM2XHU5N0YzXHU2NTQ4ICovXHJcblx0cHJpdmF0ZSBhc3luYyBjbGllbnRJbml0QWltU291bmQoKSB7XHJcblx0XHR0aGlzLmFpbVNvdW5kID0gYXdhaXQgR2FtZU9iamVjdC5hc3luY1NwYXduKHsgZ3VpZCA6IHRoaXMud2VhcG9uUmVzb3VyY2VzLmFpbVNvdW5kIH0pXHJcblx0XHR0aGlzLmFpbVNvdW5kLnBhcmVudCA9IHRoaXMud2VhcG9uT2JqXHJcblx0fVxyXG5cclxuXHQvKiBcdTVCQTJcdTYyMzdcdTdBRUZcdTUyMURcdTU5Q0JcdTUzMTZcdTY4MzlcdTUxRkJcdTRFMkRcdTg5RDJcdTgyNzJcdTk3RjNcdTY1NDggKi9cclxuXHRwcml2YXRlIGFzeW5jIGNsaWVudEluaXRIaXRDaGFyYVNvdW5kKCkge1xyXG5cdFx0dGhpcy5oaXRDaGFyYVNvdW5kID0gYXdhaXQgR2FtZU9iamVjdC5hc3luY1NwYXduKHsgZ3VpZCA6IHRoaXMud2VhcG9uUmVzb3VyY2VzLmhpdFJvbGVTb3VuZCB9KVxyXG5cdFx0dGhpcy5oaXRDaGFyYVNvdW5kLnBhcmVudCA9IHRoaXMud2VhcG9uT2JqXHJcblx0XHR0aGlzLmhpdENoYXJhU291bmRQb29sID0gbmV3IEdhbWVEZWYuU2ltcGxlT2JqZWN0UG9vbDxHYW1lcGxheS5Tb3VuZD4odGhpcy5pbnN0YW5jZUhpdENoYXJhU291bmQuYmluZCh0aGlzKSwgKHNvdW5kOiBHYW1lcGxheS5Tb3VuZCkgPT4geyBzb3VuZC5kZXN0cm95KCkgfSwgKHNvdW5kOiBHYW1lcGxheS5Tb3VuZCkgPT4geyBzb3VuZC5zdG9wKCkgfSlcclxuXHR9XHJcblxyXG5cdC8qIFx1NUJBMlx1NjIzN1x1N0FFRlx1NTIxRFx1NTlDQlx1NTMxNlx1NjgzOVx1NTFGQlx1NEUyRFx1NzI2OVx1NEY1M1x1OTdGM1x1NjU0OCAqL1xyXG5cdHByaXZhdGUgYXN5bmMgY2xpZW50SW5pdEhpdFNvdW5kKCkge1xyXG5cdFx0dGhpcy5oaXRTb3VuZCA9IGF3YWl0IEdhbWVPYmplY3QuYXN5bmNTcGF3bih7IGd1aWQgOiB0aGlzLndlYXBvblJlc291cmNlcy5oaXRPdGhlclNvdW5kIH0pXHJcblx0XHR0aGlzLmhpdFNvdW5kLnBhcmVudCA9IHRoaXMud2VhcG9uT2JqXHJcblx0XHR0aGlzLmhpdFNvdW5kUG9vbCA9IG5ldyBHYW1lRGVmLlNpbXBsZU9iamVjdFBvb2w8R2FtZXBsYXkuU291bmQ+KHRoaXMuaW5zdGFuY2VIaXRTb3VuZC5iaW5kKHRoaXMpLCAoc291bmQ6IEdhbWVwbGF5LlNvdW5kKSA9PiB7IHNvdW5kLmRlc3Ryb3koKSB9LCAoc291bmQ6IEdhbWVwbGF5LlNvdW5kKSA9PiB7IHNvdW5kLnN0b3AoKSB9KVxyXG5cdH1cclxuXHJcblx0LyogXHU4RkQ0XHU1NkRFXHU0RTAwXHU0RTJBXHU1RjM5XHU4MzZGXHU1QjlFXHU0RjhCICovXHJcblx0cHJpdmF0ZSBpbnN0YW5jZUFtbW8oKSB7XHJcblx0XHRsZXQgYW1tbyA9IHRoaXMuYW1tb0VudGl0eVJvb3QuY2xvbmUoZmFsc2UpXHJcblx0XHRhbW1vLmRldGFjaEZyb21HYW1lT2JqZWN0KClcclxuXHRcdGFtbW8uc2V0VmlzaWJpbGl0eShUeXBlLlByb3BlcnR5U3RhdHVzLk9uKVxyXG5cdFx0cmV0dXJuIGFtbW9cclxuXHR9XHJcblxyXG5cdC8qIFx1OEZENFx1NTZERVx1NEUwMFx1NEUyQVx1NUYzOVx1NThGM1x1NUI5RVx1NEY4QiAqL1xyXG5cdHByaXZhdGUgaW5zdGFuY2VDYXNpbmcoKSB7XHJcblx0XHRsZXQgY2FzaW5nID0gdGhpcy5jYXNpbmdFbnRpdHkuY2xvbmUoZmFsc2UpXHJcblx0XHRjYXNpbmcuZGV0YWNoRnJvbUdhbWVPYmplY3QoKVxyXG5cdFx0Y2FzaW5nLnNldFZpc2liaWxpdHkoVHlwZS5Qcm9wZXJ0eVN0YXR1cy5PbilcclxuXHRcdHJldHVybiBjYXNpbmdcclxuXHR9XHJcblxyXG5cdC8qIFx1OEZENFx1NTZERVx1NEUwMFx1NEUyQVx1NTFGQlx1NEUyRFx1ODlEMlx1ODI3Mlx1NzI3OVx1NjU0OFx1NUI5RVx1NEY4QiAqL1xyXG5cdHByaXZhdGUgaW5zdGFuY2VIaXRDaGFyYUVmZmVjdCgpIHtcclxuXHRcdGxldCBoaXRDaGFyYSA9IHRoaXMuaGl0Q2hhcmFFZmZlY3QuY2xvbmUoZmFsc2UpIGFzIEdhbWVwbGF5LlBhcnRpY2xlXHJcblx0XHRoaXRDaGFyYS5kZXRhY2hGcm9tR2FtZU9iamVjdCgpXHJcblx0XHRyZXR1cm4gaGl0Q2hhcmFcclxuXHR9XHJcblxyXG5cdC8qIFx1OEZENFx1NTZERVx1NEUwMFx1NEUyQVx1NTFGQlx1NEUyRFx1NzI2OVx1NEY1M1x1NzI3OVx1NjU0OFx1NUI5RVx1NEY4QiAqL1xyXG5cdHByaXZhdGUgaW5zdGFuY2VIaXRFZmZlY3QoKSB7XHJcblx0XHRsZXQgaGl0ID0gdGhpcy5oaXRFZmZlY3QuY2xvbmUoZmFsc2UpIGFzIEdhbWVwbGF5LlBhcnRpY2xlXHJcblx0XHRoaXQuZGV0YWNoRnJvbUdhbWVPYmplY3QoKVxyXG5cdFx0cmV0dXJuIGhpdFxyXG5cdH1cclxuXHJcblx0LyogXHU4RkQ0XHU1NkRFXHU0RTAwXHU0RTJBXHU1MUZCXHU0RTJEXHU4OUQyXHU4MjcyXHU5N0YzXHU2NTQ4XHU1QjlFXHU0RjhCICovXHJcblx0cHJpdmF0ZSBpbnN0YW5jZUhpdENoYXJhU291bmQoKSB7XHJcblx0XHRsZXQgaGl0Q2hhcmEgPSB0aGlzLmhpdENoYXJhU291bmQuY2xvbmUoZmFsc2UpIGFzIEdhbWVwbGF5LlNvdW5kXHJcblx0XHRoaXRDaGFyYS5kZXRhY2hGcm9tR2FtZU9iamVjdCgpXHJcblx0XHRyZXR1cm4gaGl0Q2hhcmFcclxuXHR9XHJcblxyXG5cdC8qIFx1OEZENFx1NTZERVx1NEUwMFx1NEUyQVx1NTFGQlx1NEUyRFx1OTdGM1x1NjU0OFx1NUI5RVx1NEY4QiAqL1xyXG5cdHByaXZhdGUgaW5zdGFuY2VIaXRTb3VuZCgpIHtcclxuXHRcdGxldCBoaXQgPSB0aGlzLmhpdFNvdW5kLmNsb25lKGZhbHNlKSBhcyBHYW1lcGxheS5Tb3VuZFxyXG5cdFx0aGl0LmRldGFjaEZyb21HYW1lT2JqZWN0KClcclxuXHRcdHJldHVybiBoaXRcclxuXHR9XHJcblxyXG5cclxuXHJcblx0LyogXHU1QkEyXHU2MjM3XHU3QUVGXHU1MjFEXHU1OUNCXHU1MzE2XHU1NkRFXHU4QzAzXHU1MUZEXHU2NTcwICovXHJcblx0cHJpdmF0ZSBjbGllbnRJbml0RGVsZWdhdGUoKTogdm9pZCB7XHJcblx0XHR0aGlzLndlYXBvbk9iai5vbkVxdWlwcGVkQ2xpZW50LmFkZCh0aGlzLm9uQ2xpZW50RXF1aXAuYmluZCh0aGlzKSlcclxuXHRcdHRoaXMud2VhcG9uT2JqLm9uVW5lcXVpcHBlZENsaWVudC5hZGQodGhpcy5vbkNsaWVudFVuZXF1aXAuYmluZCh0aGlzKSlcclxuXHJcblx0XHR0aGlzLndlYXBvbk9iai5maXJlQ29tcG9uZW50Lm9uU3RhcnRGaXJlQ2xpZW50LmFkZCh0aGlzLm9uQ2xpZW50U3RhcnRGaXJlLmJpbmQodGhpcykpXHJcblx0XHR0aGlzLndlYXBvbk9iai5maXJlQ29tcG9uZW50Lm9uRW5kRmlyZUNsaWVudC5hZGQodGhpcy5vbkNsaWVudEVuZEZpcmUuYmluZCh0aGlzKSlcclxuXHRcdGlmICh0aGlzLndlYXBvbk9iai5yZWxvYWRFbmFibGUpIHtcclxuXHRcdFx0dGhpcy53ZWFwb25PYmoucmVsb2FkQ29tcG9uZW50Lm9uU3RhcnRSZWxvYWRDbGllbnQuYWRkKHRoaXMub25DbGllbnRTdGFydFJlbG9hZC5iaW5kKHRoaXMpKVxyXG5cdFx0XHR0aGlzLndlYXBvbk9iai5yZWxvYWRDb21wb25lbnQub25FbmRSZWxvYWRDbGllbnQuYWRkKHRoaXMub25DbGllbnRFbmRSZWxvYWQuYmluZCh0aGlzKSlcclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLndlYXBvbk9iai5sb2FkRW5hYmxlKSB7XHJcblx0XHRcdHRoaXMud2VhcG9uT2JqLmxvYWRDb21wb25lbnQub25TdGFydExvYWRDbGllbnQuYWRkKHRoaXMub25DbGllbnRTdGFydExvYWQuYmluZCh0aGlzKSlcclxuXHRcdFx0dGhpcy53ZWFwb25PYmoubG9hZENvbXBvbmVudC5vbkVuZExvYWRDbGllbnQuYWRkKHRoaXMub25DbGllbnRFbmRMb2FkLmJpbmQodGhpcykpXHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy53ZWFwb25PYmouYWltRW5hYmxlKSB7XHJcblx0XHRcdHRoaXMud2VhcG9uT2JqLmFpbUNvbXBvbmVudC5vbkFpbVN0YXJ0Q2xpZW50LmFkZCh0aGlzLm9uQ2xpZW50U3RhcnRBaW0uYmluZCh0aGlzKSlcclxuXHRcdFx0dGhpcy53ZWFwb25PYmouYWltQ29tcG9uZW50Lm9uQWltRW5kQ2xpZW50LmFkZCh0aGlzLm9uQ2xpZW50RW5kQWltLmJpbmQodGhpcykpXHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy53ZWFwb25PYmoucmVjb2lsRm9yY2VFbmFibGUpIHtcclxuXHRcdFx0dGhpcy53ZWFwb25PYmoucmVjb2lsRm9yY2VDb21wb25lbnQub25TdGFydFJlY29pbEZvcmNlQ2xpZW50LmFkZCh0aGlzLm9uQ2xpZW50U3RhcnRSZWNvaWwuYmluZCh0aGlzKSlcclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLndlYXBvbk9iai5hY2N1cmFjeU9mRmlyZUVuYWJsZSkge1xyXG5cdFx0XHR0aGlzLndlYXBvbk9iai5hY2N1cmFjeU9mRmlyZUNvbXBvbmVudC5vbkN1cnJlbnREaXNwZXJzaW9uQ2hhbmdlZENsaWVudC5hZGQodGhpcy5vbkNsaWVudEN1cnJlbnREaXNwZXJzaW9uQ2hhbmdlZC5iaW5kKHRoaXMpKVxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIHRoaXMuY2xpZW50T25IaXQgPSAoKGhpdFJlc3VsdDogQ29yZS5HYW1lT2JqZWN0W10gfCBHYW1lcGxheS5IaXRSZXN1bHRbXSwgYXR0YWNrUGxheWVyOiBudW1iZXIsIGlzT2JqOiBib29sZWFuKSA9PiB7XHJcblx0XHQvLyBcdGlmIChpc09iaikge1xyXG5cdFx0Ly8gXHRcdGZvciAoY29uc3QgZWxlbWVudCBvZiBoaXRSZXN1bHQpIHtcclxuXHRcdC8vIFx0XHRcdGNvbnNvbGUuZXJyb3IoXCJoaXQgXCIgKyAoZWxlbWVudCBhcyBDb3JlLkdhbWVPYmplY3QpLmd1aWQpXHJcblx0XHQvLyBcdFx0fVxyXG5cdFx0Ly8gXHR9IGVsc2Uge1xyXG5cdFx0Ly8gXHRcdGZvciAoY29uc3QgZWxlbWVudCBvZiBoaXRSZXN1bHQpIHtcclxuXHRcdC8vIFx0XHRcdGNvbnNvbGUuZXJyb3IoXCJoaXQgXCIgKyAoZWxlbWVudCBhcyBHYW1lcGxheS5IaXRSZXN1bHQpLmdhbWVPYmplY3QuZ3VpZClcclxuXHRcdC8vIFx0XHR9XHJcblx0XHQvLyBcdH1cclxuXHRcdC8vIH0pXHJcblxyXG5cdFx0dGhpcy5jbGllbnRPbkJsb2NrQ2hhbmdlID0gKChpc0Jsb2NrOiBib29sZWFuKSA9PiB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoXCJpc0Jsb2NrIFwiICsgaXNCbG9jaylcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHQvKiBcdTVCQTJcdTYyMzdcdTdBRUZcdTVGMDBcdTU5Q0JcdTg4QzVcdTU5MDdcdTVCOENcdTYyMTBcdTU2REVcdThDMDMgKi9cclxuXHRwcml2YXRlIG9uQ2xpZW50RXF1aXAoKSB7XHJcblx0XHRjb25zb2xlLmVycm9yKFwiQ2xpZW50RXF1aXBcIilcclxuXHRcdC8vIFx1ODhDNVx1NTkwN1x1NzY4NFx1NkI2Nlx1NTY2OFx1NTk4Mlx1Njc5Q1x1NjcwOVx1NjJGRVx1NTNENlx1ODlFNlx1NTNEMVx1NTY2OFxyXG5cdFx0aWYgKHRoaXMucGlja1VwVHJpZ2dlcikge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKFwiZGVzdHJveSB0cmlnZ2VyXCIpXHJcblx0XHRcdHRoaXMucGlja1VwVHJpZ2dlci5zZXRDb2xsaXNpb25FbmFibGVkKGZhbHNlKVxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFx1ODhDNVx1NTkwN1x1NzY4NFx1NkI2Nlx1NTY2OFx1NUJGOVx1OEM2MVx1NTk4Mlx1Njc5Q1x1NjcwOVx1NkI2Nlx1NTY2OFx1NUI5RVx1NEY1M1x1RkYwQ1x1NTIxOVx1NjI4QVx1NTNFRlx1ODlDMVx1NjAyN1x1NjI1M1x1NUYwMFxyXG5cdFx0aWYgKCF0aGlzLndlYXBvbkVudGl0eVJvb3QpIHtcclxuXHRcdFx0dGhpcy53ZWFwb25FbnRpdHlSb290LnNldFZpc2liaWxpdHkoVHlwZS5Qcm9wZXJ0eVN0YXR1cy5PbilcclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxuXHJcblx0LyogXHU1QkEyXHU2MjM3XHU3QUVGXHU1Mzc4XHU4RjdEXHU4OEM1XHU1OTA3XHU1QjhDXHU2MjEwXHU1NkRFXHU4QzAzICovXHJcblx0cHJpdmF0ZSBvbkNsaWVudFVuZXF1aXAoKSB7XHJcblx0XHRjb25zb2xlLmVycm9yKFwib25DbGllbnRVbmVxdWlwXCIpXHJcblx0XHRpZiAoIXRoaXMud2VhcG9uT2JqKSByZXR1cm5cclxuXHRcdGlmICh0aGlzLmNvbmZpZy5pc0F1dG9EZXN0cm95KSB7XHJcblx0XHRcdHRoaXMud2VhcG9uT2JqLnNldFZpc2liaWxpdHkoVHlwZS5Qcm9wZXJ0eVN0YXR1cy5PZmYpXHJcblx0XHRcdHRoaXMud2VhcG9uT2JqID0gbnVsbFxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0aWYgKHRoaXMucGlja1VwVHJpZ2dlcikge1xyXG5cdFx0XHRcdHRoaXMud2VhcG9uT2JqLndvcmxkUm90YXRpb24gPSBuZXcgVHlwZS5Sb3RhdGlvbigwLCAwLCAxKVxyXG5cdFx0XHRcdHRoaXMud2VhcG9uT2JqLndvcmxkTG9jYXRpb24gPSBUeXBlLlZlY3Rvci5hZGQodGhpcy53ZWFwb25PYmouZ2V0UmlnaHRWZWN0b3IoKS5tdWx0aXBseSgxMDApLCB0aGlzLndlYXBvbk9iai53b3JsZExvY2F0aW9uLCB0aGlzLndlYXBvbk9iai53b3JsZExvY2F0aW9uKVxyXG5cdFx0XHRcdHRoaXMucGlja1VwVHJpZ2dlci5zZXRDb2xsaXNpb25FbmFibGVkKHRydWUpXHJcblxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcblx0LyogXHU1QkEyXHU2MjM3XHU3QUVGXHU1RjAwXHU1OUNCXHU1RjAwXHU3MDZCXHU1NkRFXHU4QzAzICovXHJcblx0cHJpdmF0ZSBvbkNsaWVudFN0YXJ0RmlyZSgpIHtcclxuXHRcdGlmICghdGhpcy53ZWFwb25PYmopIHtcclxuXHRcdFx0cmV0dXJuXHJcblx0XHR9XHJcblx0XHR0aGlzLmlzQ2FuRmlyZSA9IHRoaXMud2VhcG9uT2JqLmZpcmVDb21wb25lbnQuY3VycmVudEZpcmVJbnRlcnZhbFxyXG5cdFx0aWYgKCF0aGlzLmZpcmVFZmZlY3QubG9vcCkge1xyXG5cdFx0XHR0aGlzLmZpcmVFZmZlY3Quc3RvcCgpXHJcblx0XHR9XHJcblx0XHR0aGlzLmZpcmVFZmZlY3QucGxheSgpXHJcblx0XHRpZiAoIXRoaXMuZmlyZVNvdW5kLmxvb3ApIHtcclxuXHRcdFx0dGhpcy5maXJlU291bmQuc3RvcCgpXHJcblx0XHR9XHJcblx0XHR0aGlzLmZpcmVTb3VuZC5wbGF5KClcclxuXHRcdC8vIFx1NkI2Nlx1NTY2OFx1NjMwMVx1NjcwOVx1NEVCQVx1NUJBMlx1NjIzN1x1N0FFRlx1NjI2N1x1ODg0Q1xyXG5cdFx0aWYgKHRoaXMud2VhcG9uT2JqLmdldEN1cnJlbnRPd25lcigpID09IHRoaXMuY2hhcmEpIHtcclxuXHRcdFx0Ly8gXHU1OTgyXHU2NzlDXHU1RjM5XHU4MzZGXHU1QjlFXHU0RjUzXHU0RTBEXHU0RTNBXHU3QTdBXHVGRjA4XHU2NzA5XHU1RjM5XHU5MDUzXHU4ODY4XHU3M0IwXHVGRjA5XHJcblx0XHRcdGlmICh0aGlzLmFtbW9FbnRpdHlSb290LmdldENoaWxkcmVuKCkubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRcdC8vIFx1NjgzOVx1NjM2RVx1NTkxQVx1OTFDRFx1NUYzOVx1ODM2Rlx1NjU3MFx1NUJGOVx1NjcyQ1x1NkIyMVx1NTNEMVx1NUMwNFx1NzY4NFx1NjI0MFx1NjcwOVx1NUI1MFx1NUYzOVx1NUJGOVx1OEM2MVx1NEYyMFx1NTNDMlxyXG5cdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDx0aGlzLndlYXBvbk9iai5maXJlQ29tcG9uZW50LmN1cnJlbnRNdWx0aXBsZVNob3Q7IGkrKykge1xyXG5cclxuXHRcdFx0XHRcdGxldCBjYW1lcmFTaG9vdERpciA9IHRoaXMuY2FtZXJhLmNhbWVyYVdvcmxkVHJhbnNmb3JtLmdldEZvcndhcmRWZWN0b3IoKS5jbG9uZSgpXHJcblx0XHRcdFx0XHRpZiAodGhpcy53ZWFwb25PYmouYWNjdXJhY3lPZkZpcmVFbmFibGUpIHtcclxuXHRcdFx0XHRcdFx0Y2FtZXJhU2hvb3REaXIgPSB0aGlzLndlYXBvbk9iai5hY2N1cmFjeU9mRmlyZUNvbXBvbmVudC5nZXRSYW5kb21TaG9vdERpcihjYW1lcmFTaG9vdERpcikuY2xvbmUoKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0bGV0IGVuZExvYyA9IGNhbWVyYVNob290RGlyLm11bHRpcGx5KEdhbWVEZWYuU0hPT1RfUkFOR0UpLmFkZCh0aGlzLmNhbWVyYS5jYW1lcmFXb3JsZFRyYW5zZm9ybS5sb2NhdGlvbilcclxuXHRcdFx0XHRcdGxldCBzaG9vdERpciA9IGVuZExvYy5jbG9uZSgpLnN1YnRyYWN0KHRoaXMuYW1tb0VudGl0eVJvb3Qud29ybGRMb2NhdGlvbilcclxuXHRcdFx0XHRcdGxldCBoaXRSZXMgPSBHYW1lcGxheS5saW5lVHJhY2UodGhpcy5jYW1lcmEuY2FtZXJhV29ybGRUcmFuc2Zvcm0ubG9jYXRpb24sIGVuZExvYywgdHJ1ZSwgR2FtZURlZi5ERUJVR19GTEFHKVxyXG5cdFx0XHRcdFx0aGl0UmVzID0gaGl0UmVzLmZpbHRlcihlID0+IHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuICEoZS5nYW1lT2JqZWN0IGluc3RhbmNlb2YgR2FtZXBsYXkuVHJpZ2dlcilcclxuXHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHRpZiAoaGl0UmVzICYmIGhpdFJlcy5sZW5ndGggPiAwICYmIFR5cGUuVmVjdG9yLmRvdChoaXRSZXNbMF0ubG9jYXRpb24uY2xvbmUoKS5zdWJ0cmFjdCh0aGlzLmFtbW9FbnRpdHlSb290LndvcmxkTG9jYXRpb24pLCBzaG9vdERpcikgPiAwKSB7XHJcblx0XHRcdFx0XHRcdHNob290RGlyID0gaGl0UmVzWzBdLmltcGFjdFBvaW50LmNsb25lKCkuc3VidHJhY3QodGhpcy5hbW1vRW50aXR5Um9vdC53b3JsZExvY2F0aW9uKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0bGV0IGFtbW9EaXJlY3Rpb24gPSBzaG9vdERpci5ub3JtYWxpemVkXHJcblx0XHRcdFx0XHRpZiAodGhpcy5jb25maWcuYW1tb1NwZWVkIDwgR2FtZURlZi5NQVhfU0hPT1RTUEVFRCB8fCB0aGlzLmlzQmxvY2spIHsgLy8gXHU1OTgyXHU2NzlDXHU1RjM5XHU4MzZGXHU5MDFGXHU1RUE2XHU1QzBGXHU0RThFXHU2NzAwXHU1OTI3XHU5OERFXHU4ODRDXHU5MDFGXHU1RUE2XHU1MDNDXHU2MjE2XHU4MDA1XHU1RjM5XHU5MDUzXHU2NzA5XHU2NjBFXHU2NjNFXHU5NjNCXHU2MzIxXHU2MEM1XHU1MUI1XHU0RTBCXHVGRjBDXHU1RjM5XHU4MzZGXHU4RDcwXHU3NzFGXHU1QjlFXHU1RjM5XHU5MDUzXHJcblx0XHRcdFx0XHRcdHRoaXMuc2VydmVyRmlyZSh0aGlzLmFtbW9FbnRpdHlSb290LndvcmxkTG9jYXRpb24uY2xvbmUoKSwgYW1tb0RpcmVjdGlvbilcclxuXHRcdFx0XHRcdFx0aWYgKHRoaXMuYW1tb0FycmF5Lmxlbmd0aCA+IHRoaXMud2VhcG9uT2JqLmZpcmVDb21wb25lbnQuY3VycmVudENsaXBTaXplKSB7XHJcblx0XHRcdFx0XHRcdFx0bGV0IGRpc2NhcmRBbW1vID0gdGhpcy5hbW1vQXJyYXkuc2hpZnQoKVxyXG5cdFx0XHRcdFx0XHRcdGRpc2NhcmRBbW1vLmRlc3Ryb3koKVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdHRoaXMuYW1tb0FycmF5LnB1c2gobmV3IEFtbW8odGhpcy5jaGFyYSwgdGhpcy5hbW1vUG9vbCwgdGhpcy5hbW1vRW50aXR5Um9vdC53b3JsZExvY2F0aW9uLCBhbW1vRGlyZWN0aW9uLCB0aGlzLmNvbmZpZy5zaG9vdFJhbmdlLCB0aGlzLmNvbmZpZy5hbW1vU3BlZWQsIHRoaXMuY29uZmlnLmdyYXZpdHlTY2FsZSwgdGhpcy5jb25maWcuZGV0ZWN0UmFkaXVzKSlcclxuXHRcdFx0XHRcdH0gZWxzZSB7IC8vIFx1NTE3Nlx1NEY1OVx1NjBDNVx1NTFCNVx1NUYzOVx1ODM2Rlx1OEQ3MFx1ODY1QVx1NTA0N1x1NUYzOVx1OTA1M1x1RkYwOFx1NUI1MFx1NUYzOVx1OEY2OFx1OEZGOVx1NTQ4Q1x1NjhDMFx1NkQ0Qlx1OEY2OFx1OEZGOVx1NEUwRFx1NTQwQ1x1RkYwQ1x1NTNFQVx1NjYyRlx1N0VDOFx1NzBCOVx1NzZGOFx1NTQwQ1x1RkYwOVxyXG5cdFx0XHRcdFx0XHR0aGlzLnNlcnZlckZpcmUodGhpcy5hbW1vRW50aXR5Um9vdC53b3JsZExvY2F0aW9uLmNsb25lKCksIGFtbW9EaXJlY3Rpb24pXHJcblx0XHRcdFx0XHRcdGlmICh0aGlzLmFtbW9BcnJheS5sZW5ndGggPiB0aGlzLndlYXBvbk9iai5maXJlQ29tcG9uZW50LmN1cnJlbnRDbGlwU2l6ZSkge1xyXG5cdFx0XHRcdFx0XHRcdGxldCBkaXNjYXJkQW1tbyA9IHRoaXMuYW1tb0FycmF5LnNoaWZ0KClcclxuXHRcdFx0XHRcdFx0XHRkaXNjYXJkQW1tby5kZXN0cm95KClcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRpZiAoaGl0UmVzLmxlbmd0aCA+IDApIHsgLy8gXHU1QzRGXHU1RTU1XHU0RTJEXHU1RkMzXHU1QzA0XHU3RUJGXHU1MUZCXHU0RTJEXHJcblx0XHRcdFx0XHRcdFx0dGhpcy5hbW1vQXJyYXkucHVzaChuZXcgQW1tbyh0aGlzLmNoYXJhLCB0aGlzLmFtbW9Qb29sLCB0aGlzLmFtbW9FbnRpdHlSb290LndvcmxkTG9jYXRpb24sIGFtbW9EaXJlY3Rpb24sIHNob290RGlyLmxlbmd0aCwgdGhpcy5jb25maWcuYW1tb1NwZWVkLCB0aGlzLmNvbmZpZy5ncmF2aXR5U2NhbGUsIDAsIGhpdFJlcykpXHJcblx0XHRcdFx0XHRcdH0gZWxzZSB7IC8vIFx1NUM0Rlx1NUU1NVx1NEUyRFx1NUZDM1x1NUMwNFx1N0VCRlx1NjcyQVx1NTFGQlx1NEUyRFxyXG5cdFx0XHRcdFx0XHRcdHRoaXMuYW1tb0FycmF5LnB1c2gobmV3IEFtbW8odGhpcy5jaGFyYSwgdGhpcy5hbW1vUG9vbCwgdGhpcy5hbW1vRW50aXR5Um9vdC53b3JsZExvY2F0aW9uLCBhbW1vRGlyZWN0aW9uLCBzaG9vdERpci5sZW5ndGgsIHRoaXMuY29uZmlnLmFtbW9TcGVlZCwgdGhpcy5jb25maWcuZ3Jhdml0eVNjYWxlLCAwKSlcclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Ly8gXHU1OTgyXHU2NzlDXHU1MkZFXHU5MDA5XHU1RjM5XHU1OEYzXHU4ODY4XHU3M0IwXHVGRjBDXHU1MjE5XHU1M0QxXHU1QzA0XHU1QkEyXHU2MjM3XHU3QUVGXHU2M0QwXHU0RjlCXHU1RjM5XHU1OEYzXHU1RjM5XHU1MUZBXHU4ODY4XHU3M0IwXHJcblx0XHRcdFx0aWYgKHRoaXMuY29uZmlnLmlzV2VhcG9uSGF2ZUNhc2luZykge1xyXG5cdFx0XHRcdFx0dGhpcy5jYXNpbmdBcnJheS5wdXNoKG5ldyBDYXNpbmcodGhpcy5jYXNpbmdQb29sLCB0aGlzLmNhc2luZ0VudGl0eSwgdGhpcy53ZWFwb25FbnRpdHlSb290LmdldFJpZ2h0VmVjdG9yKCkuY2xvbmUoKSkpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2UgeyAvLyBcdTU5ODJcdTY3OUNcdTVGMzlcdTgzNkZcdTVCOUVcdTRGNTNcdTRFM0FcdTdBN0FcdUZGMDhcdTY1RTBcdTVGMzlcdTkwNTNcdTg4NjhcdTczQjBcdUZGMDlcclxuXHRcdFx0XHRsZXQgY2FtZXJhU2hvb3REaXIgPSB0aGlzLmNhbWVyYS5jYW1lcmFXb3JsZFRyYW5zZm9ybS5nZXRGb3J3YXJkVmVjdG9yKCkuY2xvbmUoKVxyXG5cdFx0XHRcdGlmICh0aGlzLndlYXBvbk9iai5hY2N1cmFjeU9mRmlyZUVuYWJsZSkge1xyXG5cdFx0XHRcdFx0Y2FtZXJhU2hvb3REaXIgPSB0aGlzLndlYXBvbk9iai5hY2N1cmFjeU9mRmlyZUNvbXBvbmVudC5nZXRSYW5kb21TaG9vdERpcihjYW1lcmFTaG9vdERpcikuY2xvbmUoKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRsZXQgZW5kTG9jID0gY2FtZXJhU2hvb3REaXIubXVsdGlwbHkoR2FtZURlZi5TSE9PVF9SQU5HRSkuYWRkKHRoaXMuY2FtZXJhLmNhbWVyYVdvcmxkVHJhbnNmb3JtLmxvY2F0aW9uKVxyXG5cdFx0XHRcdGxldCBzaG9vdERpciA9IGVuZExvYy5jbG9uZSgpLnN1YnRyYWN0KHRoaXMuYW1tb0VudGl0eVJvb3Qud29ybGRMb2NhdGlvbilcclxuXHRcdFx0XHRsZXQgaGl0UmVzID0gR2FtZXBsYXkubGluZVRyYWNlKHRoaXMuY2FtZXJhLmNhbWVyYVdvcmxkVHJhbnNmb3JtLmxvY2F0aW9uLCBlbmRMb2MsIHRydWUsIEdhbWVEZWYuREVCVUdfRkxBRylcclxuXHRcdFx0XHRoaXRSZXMgPSBoaXRSZXMuZmlsdGVyKGUgPT4ge1xyXG5cdFx0XHRcdFx0cmV0dXJuICEoZS5nYW1lT2JqZWN0IGluc3RhbmNlb2YgR2FtZXBsYXkuVHJpZ2dlcilcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdGlmIChoaXRSZXMgJiYgaGl0UmVzLmxlbmd0aCA+IDAgJiYgVHlwZS5WZWN0b3IuZG90KGhpdFJlc1swXS5sb2NhdGlvbi5jbG9uZSgpLnN1YnRyYWN0KHRoaXMuYW1tb0VudGl0eVJvb3Qud29ybGRMb2NhdGlvbiksIHNob290RGlyKSA+IDApIHtcclxuXHRcdFx0XHRcdHNob290RGlyID0gaGl0UmVzWzBdLmltcGFjdFBvaW50LmNsb25lKCkuc3VidHJhY3QodGhpcy5hbW1vRW50aXR5Um9vdC53b3JsZExvY2F0aW9uKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRsZXQgYW1tb0RpcmVjdGlvbiA9IHNob290RGlyLm5vcm1hbGl6ZWRcclxuXHRcdFx0XHR0aGlzLndlYXBvbk9iai53b3JsZFJvdGF0aW9uID0gYW1tb0RpcmVjdGlvbi50b1JvdGF0aW9uKClcclxuXHRcdFx0XHRsZXQgZW5kID0gYW1tb0RpcmVjdGlvbi5jbG9uZSgpLm11bHRpcGx5KHRoaXMuY29uZmlnLnNob290UmFuZ2UpLmFkZCh0aGlzLmFtbW9FbnRpdHlSb290LndvcmxkTG9jYXRpb24pXHJcblx0XHRcdFx0aWYgKHRoaXMuY29uZmlnLmRldGVjdFJhZGl1cyA8IDEwKSB7XHJcblx0XHRcdFx0XHRsZXQgbGluZVJlc3VsdCA9IEdhbWVwbGF5LmxpbmVUcmFjZSh0aGlzLmFtbW9FbnRpdHlSb290LndvcmxkTG9jYXRpb24sIGVuZCwgdHJ1ZSwgR2FtZURlZi5ERUJVR19GTEFHKVxyXG5cdFx0XHRcdFx0bGluZVJlc3VsdCA9IGxpbmVSZXN1bHQuZmlsdGVyKGUgPT4ge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gIShlLmdhbWVPYmplY3QgaW5zdGFuY2VvZiBHYW1lcGxheS5UcmlnZ2VyKVxyXG5cdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdHRoaXMuaGl0KGxpbmVSZXN1bHQpXHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGxldCBib3hSZXN1bHQgPSBHYW1lcGxheS5ib3hPdmVybGFwSW5MZXZlbCh0aGlzLmFtbW9FbnRpdHlSb290LndvcmxkTG9jYXRpb24sIGVuZCwgdGhpcy5jb25maWcuZGV0ZWN0UmFkaXVzLCB0aGlzLmNvbmZpZy5kZXRlY3RSYWRpdXMsIEdhbWVEZWYuREVCVUdfRkxBRylcclxuXHRcdFx0XHRcdHRoaXMuaGl0KGJveFJlc3VsdClcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHByaXZhdGUgdXBkYXRlQmxvY2tGaXJlKCk6IGJvb2xlYW4ge1xyXG5cdFx0bGV0IGZsYWcgPSB0aGlzLmlzQmxvY2tcclxuXHRcdGxldCBsaW5lUmVzdWx0TXV6emxlID0gR2FtZXBsYXkubGluZVRyYWNlKHRoaXMuYW1tb0VudGl0eVJvb3Qud29ybGRMb2NhdGlvbixcclxuXHRcdFx0dGhpcy5hbW1vRW50aXR5Um9vdC5nZXRGb3J3YXJkVmVjdG9yKCkubXVsdGlwbHkodGhpcy5jb25maWcuZmlyZUJsb2NrRGlzdGFuY2UpLmFkZCh0aGlzLmFtbW9FbnRpdHlSb290LndvcmxkTG9jYXRpb24pLFxyXG5cdFx0XHR0cnVlLCBHYW1lRGVmLkRFQlVHX0ZMQUcpXHJcblx0XHRsaW5lUmVzdWx0TXV6emxlID0gbGluZVJlc3VsdE11enpsZS5maWx0ZXIoZSA9PiB7XHJcblx0XHRcdHJldHVybiAhKGUuZ2FtZU9iamVjdCBpbnN0YW5jZW9mIEdhbWVwbGF5LlRyaWdnZXIpXHJcblx0XHR9KVxyXG5cdFx0aWYgKGxpbmVSZXN1bHRNdXp6bGUubGVuZ3RoID4gMCkge1xyXG5cdFx0XHR0aGlzLmlzQmxvY2sgPSB0cnVlXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLmlzQmxvY2sgPSBmYWxzZVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuICh0aGlzLmlzQmxvY2sgPT0gZmxhZylcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgdXBkYXRlYkZpcmluZygpOiBib29sZWFuIHtcclxuXHRcdGxldCBmbGFnID0gdGhpcy5iRmlyaW5nXHJcblx0XHR0aGlzLmJGaXJpbmcgPSB0aGlzLndlYXBvbk9iai5maXJlQ29tcG9uZW50LmlzRmlyaW5nKClcclxuXHRcdHJldHVybiAodGhpcy5iRmlyaW5nID09IGZsYWcpXHJcblx0fVxyXG5cclxuXHRAQ29yZS5GdW5jdGlvbihDb3JlLlNlcnZlcilcclxuXHRwcml2YXRlIHNlcnZlckZpcmUoc3RhcnRMb2M6IFR5cGUuVmVjdG9yLCBkaXJlY3Rpb246IFR5cGUuVmVjdG9yKTogdm9pZCB7XHJcblx0XHR0aGlzLmNsaWVudE11bHRpY2FzdExhdW5jaChzdGFydExvYywgZGlyZWN0aW9uKVxyXG5cdH1cclxuXHJcblx0QENvcmUuRnVuY3Rpb24oQ29yZS5DbGllbnQsIENvcmUuTXVsdGljYXN0KVxyXG5cdHByaXZhdGUgY2xpZW50TXVsdGljYXN0TGF1bmNoKHN0YXJ0TG9jOiBUeXBlLlZlY3RvciwgZGlyZWN0aW9uOiBUeXBlLlZlY3Rvcik6IHZvaWQge1xyXG5cdFx0aWYgKHRoaXMud2VhcG9uT2JqLmdldEN1cnJlbnRPd25lcigpID09IHRoaXMuY2hhcmEpIHtcclxuXHRcdFx0cmV0dXJuXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRpZiAodGhpcy5hbW1vQXJyYXkubGVuZ3RoID4gdGhpcy53ZWFwb25PYmouZmlyZUNvbXBvbmVudC5jdXJyZW50Q2xpcFNpemUpIHtcclxuXHRcdFx0XHRsZXQgZGlzY2FyZEFtbW8gPSB0aGlzLmFtbW9BcnJheS5zaGlmdCgpXHJcblx0XHRcdFx0ZGlzY2FyZEFtbW8uZGVzdHJveSgpXHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5hbW1vQXJyYXkucHVzaChuZXcgQW1tbyhudWxsLCB0aGlzLmFtbW9Qb29sLCBzdGFydExvYywgZGlyZWN0aW9uLCB0aGlzLmNvbmZpZy5zaG9vdFJhbmdlLCB0aGlzLmNvbmZpZy5hbW1vU3BlZWQsIHRoaXMuY29uZmlnLmdyYXZpdHlTY2FsZSwgMCkpXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKiBcdTVCQTJcdTYyMzdcdTdBRUZcdTdFRDNcdTY3NUZcdTVGMDBcdTcwNkJcdTU2REVcdThDMDMgKi9cclxuXHRwcml2YXRlIG9uQ2xpZW50RW5kRmlyZSgpIHtcclxuXHJcblx0fVxyXG5cclxuXHQvKiBcdTVCQTJcdTYyMzdcdTdBRUZcdTVGMDBcdTU5Q0JcdTYzNjJcdTVGMzlcdTU2REVcdThDMDMgKi9cclxuXHRwcml2YXRlIG9uQ2xpZW50U3RhcnRSZWxvYWQoKSB7XHJcblx0XHR0aGlzLnJlbG9hZFNvdW5kLnBsYXkoKVxyXG5cdH1cclxuXHJcblx0LyogXHU1QkEyXHU2MjM3XHU3QUVGXHU3RUQzXHU2NzVGXHU2MzYyXHU1RjM5XHU1NkRFXHU4QzAzICovXHJcblx0cHJpdmF0ZSBvbkNsaWVudEVuZFJlbG9hZCgpIHtcclxuXHRcdHRoaXMucmVsb2FkU291bmQuc3RvcCgpXHJcblx0fVxyXG5cclxuXHQvKiBcdTVCQTJcdTYyMzdcdTdBRUZcdTVGMDBcdTU5Q0JcdTRFMEFcdTgxOUJcdTU2REVcdThDMDMgKi9cclxuXHRwcml2YXRlIG9uQ2xpZW50U3RhcnRMb2FkKCkge1xyXG5cdFx0dGhpcy5sb2FkU291bmQucGxheSgpXHJcblx0fVxyXG5cclxuXHQvKiBcdTVCQTJcdTYyMzdcdTdBRUZcdTdFRDNcdTY3NUZcdTRFMEFcdTgxOUJcdTU2REVcdThDMDMgKi9cclxuXHRwcml2YXRlIG9uQ2xpZW50RW5kTG9hZCgpIHtcclxuXHRcdHRoaXMubG9hZFNvdW5kLnN0b3AoKVxyXG5cdH1cclxuXHJcblx0LyogXHU1QkEyXHU2MjM3XHU3QUVGXHU1RjAwXHU1OUNCXHU3Nzg0XHU1MUM2XHU1NkRFXHU4QzAzICovXHJcblx0cHJpdmF0ZSBvbkNsaWVudFN0YXJ0QWltKCkge1xyXG5cdH1cclxuXHJcblx0LyogXHU1QkEyXHU2MjM3XHU3QUVGXHU3RUQzXHU2NzVGXHU3Nzg0XHU1MUM2XHU1NkRFXHU4QzAzICovXHJcblx0cHJpdmF0ZSBvbkNsaWVudEVuZEFpbSgpIHtcclxuXHR9XHJcblxyXG5cdC8qIFx1NUJBMlx1NjIzN1x1N0FFRlx1NUYwMFx1NTlDQlx1NTQwRVx1NTc1MFx1NTI5Qlx1NTZERVx1OEMwMyAqL1xyXG5cdHByaXZhdGUgb25DbGllbnRTdGFydFJlY29pbCgpIHtcclxuXHJcblx0fVxyXG5cclxuXHQvKiBcdTVCQTJcdTYyMzdcdTdBRUZcdTc3ODRcdTUxQzZcdTdDQkVcdTVFQTZcdTUzRDhcdTUzMTZcdTU2REVcdThDMDMgKi9cclxuXHRwcml2YXRlIG9uQ2xpZW50Q3VycmVudERpc3BlcnNpb25DaGFuZ2VkKCkge1xyXG5cdFx0aWYgKHRoaXMud2VhcG9uVUkpIHtcclxuXHRcdFx0dGhpcy53ZWFwb25VSS5jaGFuZ2VDcm9zcyh0aGlzLndlYXBvbk9iai5hY2N1cmFjeU9mRmlyZUNvbXBvbmVudC5nZXRDdXJyZW50RGlzcGVyc2lvbkhhbGZBbmdsZSgpICogMTApXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvLyBcdTg5QzZcdTg5RDJcdTY1M0VcdTU5MjdcclxuXHRwcml2YXRlIHpvb21JbigpIHtcclxuXHRcdGlmICh0aGlzLmNhbWVyYSA9PSBudWxsKSByZXR1cm5cclxuXHRcdGNvbnNvbGUuZXJyb3IoXCJ6b29taW5cIilcclxuXHRcdHRoaXMuaXNBaW1taW5nID0gdHJ1ZVxyXG5cclxuXHR9XHJcblxyXG5cdC8vIFx1ODlDNlx1ODlEMlx1N0YyOVx1NUMwRlxyXG5cdHByaXZhdGUgem9vbU91dCgpIHtcclxuXHRcdGlmICh0aGlzLmNhbWVyYSA9PSBudWxsKSByZXR1cm5cclxuXHRcdGNvbnNvbGUuZXJyb3IoXCJ6b29tT3V0XCIpXHJcblx0XHR0aGlzLmlzQWltbWluZyA9IGZhbHNlXHJcblx0fVxyXG5cclxuXHQvKiBcdTY0NDRcdTUwQ0ZcdTY3M0F1cGRhdGUgKi9cclxuXHRwcml2YXRlIGNhbWVyYVVwZGF0ZShkdDogbnVtYmVyKSB7XHJcblx0XHRpZiAoIXRoaXMuaXNab29taW5nKSByZXR1cm5cclxuXHRcdGlmICh0aGlzLmlzQWltbWluZykge1xyXG5cdFx0XHR0aGlzLmNhbWVyYS5jYW1lcmFGT1YgLT0gZHQgKiB0aGlzLmNvbmZpZy5haW1TcGVlZFxyXG5cdFx0XHRpZiAodGhpcy5jYW1lcmEuY2FtZXJhRk9WIDwgdGhpcy5jb25maWcuYWltQ2FtZXJhRm92KSB7XHJcblx0XHRcdFx0dGhpcy5jYW1lcmEuY2FtZXJhRk9WID0gdGhpcy5jb25maWcuYWltQ2FtZXJhRm92XHJcblx0XHRcdFx0dGhpcy5pc1pvb21pbmcgPSBmYWxzZVxyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLmNhbWVyYS5jYW1lcmFGT1YgKz0gZHQgKiB0aGlzLmNvbmZpZy5haW1TcGVlZFxyXG5cdFx0XHRpZiAodGhpcy5jYW1lcmEuY2FtZXJhRk9WID4gdGhpcy5jb25maWcuZXF1aXBtZW50Q2FtZXJhRm92KSB7XHJcblx0XHRcdFx0dGhpcy5jYW1lcmEuY2FtZXJhRk9WID0gdGhpcy5jb25maWcuZXF1aXBtZW50Q2FtZXJhRm92XHJcblx0XHRcdFx0dGhpcy5pc1pvb21pbmcgPSBmYWxzZVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKiBcdTg5RTNcdTY3OTBcdThENDRcdTZFOTBJRFx1NTIxN1x1ODg2OCAqL1xyXG5cdHByaXZhdGUgcmVzb2x2ZVN0cmluZyhhc3NldElkczogc3RyaW5nKTogc3RyaW5nW10ge1xyXG5cdFx0bGV0IGFzc2V0SWRBcnJheTogc3RyaW5nW10gPSBuZXcgQXJyYXk8c3RyaW5nPigpXHJcblx0XHRsZXQgYXNzZXRJZDogc3RyaW5nID0gXCJcIlxyXG5cdFx0bGV0IHMgPSBhc3NldElkcy5zcGxpdChcIlwiKVxyXG5cdFx0Zm9yIChsZXQgYSBvZiBzKSB7XHJcblx0XHRcdGlmIChhID09IFwiLFwiKSB7XHJcblx0XHRcdFx0YXNzZXRJZEFycmF5LnB1c2goYXNzZXRJZClcclxuXHRcdFx0XHRhc3NldElkID0gXCJcIlxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGFzc2V0SWQgKz0gYVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRpZiAoYXNzZXRJZCkge1xyXG5cdFx0XHRhc3NldElkQXJyYXkucHVzaChhc3NldElkKVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGFzc2V0SWRBcnJheVxyXG5cdH1cclxuXHJcbn0iLCAiXHVGRUZGaW1wb3J0IFdlYXBvblVJX0dlbmVyYXRlIGZyb20gXCIuLi91aS1nZW5lcmF0ZS9XZWFwb25VSV9nZW5lcmF0ZVwiO1xyXG5pbXBvcnQgV2VhcG9uRHJpdmVyIGZyb20gXCIuL1dlYXBvbkJhc2VDbHNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdlYXBvblVJIGV4dGVuZHMgV2VhcG9uVUlfR2VuZXJhdGV7XHJcbiAgICBjdXJXZWFwb246IFdlYXBvbkRyaXZlciA9IG51bGw7XHJcblxyXG4gICAgdXBQb3NpdGlvbjogVHlwZS5WZWN0b3IyID0gVHlwZS5WZWN0b3IyLnplcm87XHJcbiAgICBkb3duUG9zaXRpb246IFR5cGUuVmVjdG9yMiA9IFR5cGUuVmVjdG9yMi56ZXJvO1xyXG4gICAgbGVmdFBvc2l0aW9uOiBUeXBlLlZlY3RvcjIgPSBUeXBlLlZlY3RvcjIuemVybztcclxuICAgIHJpZ2h0UG9zaXRpb246IFR5cGUuVmVjdG9yMiA9IFR5cGUuVmVjdG9yMi56ZXJvO1xyXG5cclxuICAgIHVwQ3VyUG9zaXRpb246IFR5cGUuVmVjdG9yMiA9IFR5cGUuVmVjdG9yMi56ZXJvO1xyXG4gICAgZG93bkN1clBvc2l0aW9uOiBUeXBlLlZlY3RvcjIgPSBUeXBlLlZlY3RvcjIuemVybztcclxuICAgIGxlZnRDdXJQb3NpdGlvbjogVHlwZS5WZWN0b3IyID0gVHlwZS5WZWN0b3IyLnplcm87XHJcbiAgICByaWdodEN1clBvc2l0aW9uOiBUeXBlLlZlY3RvcjIgPSBUeXBlLlZlY3RvcjIuemVybztcclxuXHJcbiAgICBwcm90ZWN0ZWQgb25TdGFydCgpIHtcclxuXHJcbiAgICAgICAgdGhpcy5yaWdodF9maXJlLm9uSm95U3RpY2tEb3duLmFkZCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJyaWdodF9maXJlIG9uSm95U3RpY2tEb3duXCIpO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuY3VyV2VhcG9uKSByZXR1cm47XHJcbiAgICAgICAgICAgIHRoaXMuY3VyV2VhcG9uLnN0YXJ0RmlyZSgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnJpZ2h0X2ZpcmUub25Kb3lTdGlja1VwLmFkZCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJyaWdodF9maXJlIG9uSm95U3RpY2tVcFwiKTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmN1cldlYXBvbikgcmV0dXJuO1xyXG4gICAgICAgICAgICB0aGlzLmN1cldlYXBvbi5zdG9wRmlyZSgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmxlZnRfZmlyZS5vblByZXNzZWQuYWRkKCgpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcImxlZnRfZmlyZSBvblByZXNzZWRcIik7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5jdXJXZWFwb24pIHJldHVybjtcclxuICAgICAgICAgICAgdGhpcy5jdXJXZWFwb24uc3RhcnRGaXJlKCk7XHJcbiAgICAgICAgfSk7XHJcbiBcclxuICAgICAgICB0aGlzLmxlZnRfZmlyZS5vblJlbGVhc2VkLmFkZCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJsZWZ0X2ZpcmUgb25SZWxlYXNlZFwiKTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmN1cldlYXBvbikgcmV0dXJuO1xyXG4gICAgICAgICAgICB0aGlzLmN1cldlYXBvbi5zdG9wRmlyZSgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnJlbG9hZC5vbkNsaWNrZWQuYWRkKCgpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcInJlbG9hZCBvbkNsaWNrZWRcIik7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5jdXJXZWFwb24pIHJldHVybjtcclxuICAgICAgICAgICAgdGhpcy5jdXJXZWFwb24uc3RhcnRSZWxvYWQoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5haW0ub25DbGlja2VkLmFkZCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJhaW0gb25DbGlja2VkXCIpO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuY3VyV2VhcG9uKSByZXR1cm47XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmN1cldlYXBvbi5pc0FpbW1pbmcpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VyV2VhcG9uLnN0b3BBaW0oKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VyV2VhcG9uLnN0YXJ0QWltKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5jcm91Y2gub25DbGlja2VkLmFkZCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJjcm91Y2ggb25DbGlja2VkXCIpO1xyXG4gICAgICAgICAgICBsZXQgcGxheWVyID0gR2FtZXBsYXkuZ2V0Q3VycmVudFBsYXllcigpO1xyXG4gICAgICAgICAgICBpZiAocGxheWVyKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocGxheWVyLmNoYXJhY3Rlci5pc0Nyb3VjaGluZykge1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYXllci5jaGFyYWN0ZXIuY3JvdWNoKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyLmNoYXJhY3Rlci5jcm91Y2godHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuanVtcC5vbkNsaWNrZWQuYWRkKCgpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcImp1bXAgb25DbGlja2VkXCIpO1xyXG4gICAgICAgICAgICBsZXQgcGxheWVyID0gR2FtZXBsYXkuZ2V0Q3VycmVudFBsYXllcigpO1xyXG4gICAgICAgICAgICBpZiAocGxheWVyKSB7XHJcbiAgICAgICAgICAgICAgICBwbGF5ZXIuY2hhcmFjdGVyLmp1bXAoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBFdmVudHMuYWRkTG9jYWxMaXN0ZW5lcihcIkhvdFdlYXBvbi1VbmVxdWlwZWRcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jdXJXZWFwb24gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJXZWFwb24udW5FcXVpcCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJXZWFwb24gPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25TaG93KHdlYXBvbjogV2VhcG9uRHJpdmVyLCBjcm9zc1ZhbHVlOiBudW1iZXIsIGljb25JZDogc3RyaW5nLCB3ZWFwb25OYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwic2hvd1wiKTtcclxuICAgICAgICB0aGlzLmN1cldlYXBvbiA9IHdlYXBvbjtcclxuICAgICAgICB0aGlzLmljb24uaW1hZ2VHdWlkID0gaWNvbklkO1xyXG4gICAgICAgIHRoaXMubmFtZS50ZXh0ID0gd2VhcG9uTmFtZTtcclxuICAgICAgICB0aGlzLnVwUG9zaXRpb24gPSB0aGlzLnVwUG9zaXRpb24uc2V0KHRoaXMudXAucG9zaXRpb24pO1xyXG4gICAgICAgIHRoaXMuZG93blBvc2l0aW9uID0gdGhpcy5kb3duUG9zaXRpb24uc2V0KHRoaXMuZG93bi5wb3NpdGlvbik7XHJcbiAgICAgICAgdGhpcy5sZWZ0UG9zaXRpb24gPSB0aGlzLmxlZnRQb3NpdGlvbi5zZXQodGhpcy5sZWZ0LnBvc2l0aW9uKTtcclxuICAgICAgICB0aGlzLnJpZ2h0UG9zaXRpb24gPSB0aGlzLnJpZ2h0UG9zaXRpb24uc2V0KHRoaXMucmlnaHQucG9zaXRpb24pO1xyXG4gICAgICAgIHRoaXMuY2hhbmdlQ3Jvc3MoY3Jvc3NWYWx1ZSAqIDEwKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25IaWRlKCkge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJoaWRlXCIpO1xyXG4gICAgICAgIHRoaXMuY2hhbmdlQ3Jvc3MoMCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2hhbmdlQnVsbGV0KGJ1bGxldDogbnVtYmVyLCBhbW1vOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAoYW1tbyA9PSAtMSkge1xyXG4gICAgICAgICAgICB0aGlzLmJ1bGxldC50ZXh0ID0gYCR7YnVsbGV0fSAvIE5BTmA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmJ1bGxldC50ZXh0ID0gYCR7YnVsbGV0fSAvICR7YW1tb31gO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjaGFuZ2VDcm9zcyh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy51cC5wb3NpdGlvbiA9IHRoaXMudXBDdXJQb3NpdGlvbi5zZXQodGhpcy51cFBvc2l0aW9uLngsIHRoaXMudXBQb3NpdGlvbi55IC0gdmFsdWUpO1xyXG4gICAgICAgIHRoaXMuZG93bi5wb3NpdGlvbiA9IHRoaXMuZG93bkN1clBvc2l0aW9uLnNldCh0aGlzLmRvd25Qb3NpdGlvbi54LCB0aGlzLmRvd25Qb3NpdGlvbi55ICsgdmFsdWUpO1xyXG4gICAgICAgIHRoaXMubGVmdC5wb3NpdGlvbiA9IHRoaXMubGVmdEN1clBvc2l0aW9uLnNldCh0aGlzLmxlZnRQb3NpdGlvbi54IC0gdmFsdWUsIHRoaXMubGVmdFBvc2l0aW9uLnkpO1xyXG4gICAgICAgIHRoaXMucmlnaHQucG9zaXRpb24gPSB0aGlzLnJpZ2h0Q3VyUG9zaXRpb24uc2V0KHRoaXMucmlnaHRQb3NpdGlvbi54ICsgdmFsdWUsIHRoaXMucmlnaHRQb3NpdGlvbi55KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0VGltZVRleHQocmVzdFRpbWU6IG51bWJlciwga2VlcFRpbWU6IG51bWJlcikge1xyXG4gICAgICAgIGlmIChyZXN0VGltZSA8PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMubUtlZXBUaW1lQ2FudmFzLnZpc2liaWxpdHkgPSBVSS5TbGF0ZVZpc2liaWxpdHkuQ29sbGFwc2VkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5tS2VlcFRpbWVDYW52YXMudmlzaWJpbGl0eSA9IFVJLlNsYXRlVmlzaWJpbGl0eS5TZWxmSGl0VGVzdEludmlzaWJsZTtcclxuICAgICAgICAgICAgbGV0IHBlcmNlbnQgPSByZXN0VGltZSAvIGtlZXBUaW1lO1xyXG4gICAgICAgICAgICB0aGlzLmtlZXBUaW1lQmFyLnBlcmNlbnQgPSBwZXJjZW50O1xyXG4gICAgICAgICAgICB0aGlzLmtlZXBUaW1lVHh0LnRleHQgPSBgJHtyZXN0VGltZS50b0ZpeGVkKDEpfXNgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRSZWxvYWRCdG4oZW5hYmxlOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5yZWxvYWQudmlzaWJpbGl0eSA9IGVuYWJsZSA/IFVJLlNsYXRlVmlzaWJpbGl0eS5WaXNpYmxlIDogVUkuU2xhdGVWaXNpYmlsaXR5LkNvbGxhcHNlZDtcclxuICAgIH1cclxufSIsICJcdUZFRkZcclxuLyoqXHJcbiAqIEFVVE8gR0VORVJBVEUgQlkgVUkgRURJVE9SLlxyXG4gKiBXQVJOSU5HOiBETyBOT1QgTU9ESUZZIFRISVMgRklMRSxNQVkgQ0FVU0UgQ09ERSBMT1NULlxyXG4gKiBBVVRIT1I6IFx1NjI2N1x1N0IxNFx1N0VDRlx1NUU3NFxyXG4gKiBVSTogVUkvV2VhcG9uVUkudWlcclxuICogVElNRTogMjAyMy4wOC4yOC0xMi4yMS41N1xyXG4qL1xyXG5cclxuXHJcblxyXG5AVUkuVUlDYWxsT25seSgnVUkvV2VhcG9uVUkudWknKVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXZWFwb25VSV9HZW5lcmF0ZSBleHRlbmRzIFVJLlVJQmVoYXZpb3Ige1xyXG5cdEBVSS5VSU1hcmtQYXRoKCdSb290Q2FudmFzL3BvaW50JylcbiAgICBwdWJsaWMgcG9pbnQ6IFVJLkltYWdlPXVuZGVmaW5lZDtcbiAgICBAVUkuVUlNYXJrUGF0aCgnUm9vdENhbnZhcy91cCcpXG4gICAgcHVibGljIHVwOiBVSS5JbWFnZT11bmRlZmluZWQ7XG4gICAgQFVJLlVJTWFya1BhdGgoJ1Jvb3RDYW52YXMvZG93bicpXG4gICAgcHVibGljIGRvd246IFVJLkltYWdlPXVuZGVmaW5lZDtcbiAgICBAVUkuVUlNYXJrUGF0aCgnUm9vdENhbnZhcy9sZWZ0JylcbiAgICBwdWJsaWMgbGVmdDogVUkuSW1hZ2U9dW5kZWZpbmVkO1xuICAgIEBVSS5VSU1hcmtQYXRoKCdSb290Q2FudmFzL3JpZ2h0JylcbiAgICBwdWJsaWMgcmlnaHQ6IFVJLkltYWdlPXVuZGVmaW5lZDtcbiAgICBAVUkuVUlNYXJrUGF0aCgnUm9vdENhbnZhcy9tb3ZlJylcbiAgICBwdWJsaWMgbW92ZTogVUkuVmlydHVhbEpveXN0aWNrUGFuZWw9dW5kZWZpbmVkO1xuICAgIEBVSS5VSU1hcmtQYXRoKCdSb290Q2FudmFzL3JpZ2h0X2ZpcmUnKVxuICAgIHB1YmxpYyByaWdodF9maXJlOiBVSS5WaXJ0dWFsSm95c3RpY2tQYW5lbD11bmRlZmluZWQ7XG4gICAgQFVJLlVJTWFya1BhdGgoJ1Jvb3RDYW52YXMvcmVsb2FkJylcbiAgICBwdWJsaWMgcmVsb2FkOiBVSS5CdXR0b249dW5kZWZpbmVkO1xuICAgIEBVSS5VSU1hcmtQYXRoKCdSb290Q2FudmFzL2Nyb3VjaCcpXG4gICAgcHVibGljIGNyb3VjaDogVUkuQnV0dG9uPXVuZGVmaW5lZDtcbiAgICBAVUkuVUlNYXJrUGF0aCgnUm9vdENhbnZhcy9qdW1wJylcbiAgICBwdWJsaWMganVtcDogVUkuQnV0dG9uPXVuZGVmaW5lZDtcbiAgICBAVUkuVUlNYXJrUGF0aCgnUm9vdENhbnZhcy9haW0nKVxuICAgIHB1YmxpYyBhaW06IFVJLkJ1dHRvbj11bmRlZmluZWQ7XG4gICAgQFVJLlVJTWFya1BhdGgoJ1Jvb3RDYW52YXMvbGVmdF9maXJlJylcbiAgICBwdWJsaWMgbGVmdF9maXJlOiBVSS5CdXR0b249dW5kZWZpbmVkO1xuICAgIEBVSS5VSU1hcmtQYXRoKCdSb290Q2FudmFzL2ljb24nKVxuICAgIHB1YmxpYyBpY29uOiBVSS5JbWFnZT11bmRlZmluZWQ7XG4gICAgQFVJLlVJTWFya1BhdGgoJ1Jvb3RDYW52YXMvbmFtZScpXG4gICAgcHVibGljIG5hbWU6IFVJLlRleHRCbG9jaz11bmRlZmluZWQ7XG4gICAgQFVJLlVJTWFya1BhdGgoJ1Jvb3RDYW52YXMvYnVsbGV0JylcbiAgICBwdWJsaWMgYnVsbGV0OiBVSS5UZXh0QmxvY2s9dW5kZWZpbmVkO1xuICAgIEBVSS5VSU1hcmtQYXRoKCdSb290Q2FudmFzL21LZWVwVGltZUNhbnZhcycpXG4gICAgcHVibGljIG1LZWVwVGltZUNhbnZhczogVUkuQ2FudmFzPXVuZGVmaW5lZDtcbiAgICBAVUkuVUlNYXJrUGF0aCgnUm9vdENhbnZhcy9tS2VlcFRpbWVDYW52YXMva2VlcFRpbWVCYXInKVxuICAgIHB1YmxpYyBrZWVwVGltZUJhcjogVUkuUHJvZ3Jlc3NCYXI9dW5kZWZpbmVkO1xuICAgIEBVSS5VSU1hcmtQYXRoKCdSb290Q2FudmFzL21LZWVwVGltZUNhbnZhcy9rZWVwVGltZVR4dCcpXG4gICAgcHVibGljIGtlZXBUaW1lVHh0OiBVSS5UZXh0QmxvY2s9dW5kZWZpbmVkO1xuICAgIFxuXHJcbiBcclxuXHQvKipcclxuXHQqIG9uU3RhcnQgXHU0RTRCXHU1MjREXHU4OUU2XHU1M0QxXHU0RTAwXHU2QjIxXHJcblx0Ki9cclxuXHRwcm90ZWN0ZWQgb25Bd2FrZSgpIHtcclxuXHR9XHJcblx0IFxyXG59XHJcbiAiLCAiXHJcblxyXG5pbXBvcnQgeyBQcmVmYWJFdmVudE1vZHVsZUMsIFByZWZhYkV2ZW50TW9kdWxlRGF0YSwgUHJlZmFiRXZlbnRNb2R1bGVTIH0gZnJvbSBcIi4vUHJlZmFiRXZlbnRNb2R1bGVcIlxyXG5cclxuZXhwb3J0IG5hbWVzcGFjZSBQcmVmYWJFdmVudCB7XHJcblxyXG4gICAgLyoqXHJcbiAqIFx1NkEyMVx1Njc3Rlx1NTdDQlx1NzBCOVx1NkNFOFx1ODlFMyhcdTRFQzVcdTVCQTJcdTYyMzdcdTdBRUZcdTc1MUZcdTY1NDgpXHJcbiAqIEBwYXJhbSByZXBvcnRJZCBcdTZBMjFcdTY3N0ZpZFxyXG4gKiBAcmV0dXJucyBcclxuICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gUHJlZmFiUmVwb3J0KHJlcG9ydElkOiBudW1iZXIgPSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQ6IGFueSwgcHJvcGVydHlLZXk6IHN0cmluZywgZGVzY3JpcHRvcjogUHJvcGVydHlEZXNjcmlwdG9yKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG1ldGhvZCA9IGRlc2NyaXB0b3IudmFsdWVcclxuICAgICAgICAgICAgZGVzY3JpcHRvci52YWx1ZSA9IGZ1bmN0aW9uICguLi5hcmdzOiBhbnlbXSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKFN5c3RlbVV0aWwuaXNDbGllbnQoKSAmJiByZXBvcnRJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiXHU2QTIxXHU2NzdGXCIsIHRhcmdldC5jb25zdHJ1Y3Rvci5uYW1lLCBcIlx1NTdDQlx1NzBCOVwiLCByZXBvcnRJZClcclxuICAgICAgICAgICAgICAgICAgICBTZXJ2aWNlLlJvb21TZXJ2aWNlLmdldEluc3RhbmNlKCkucmVwb3J0TG9nSW5mbyhcInRzX2FjdGlvbl9maXJzdGRvXCIsIFwiXHU2QTIxXHU2NzdGXHU1N0NCXHU3MEI5XCIsIEpTT04uc3RyaW5naWZ5KHsgcmVjb3JkOiBcIlRlbXBsYXRlUHJlZmFiXCIsIGxpZmV0aW1lOiByZXBvcnRJZCB9KSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IG1ldGhvZC5hcHBseSh0aGlzLCBhcmdzKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHU3RjUxXHU3RURDXHU0RThCXHU0RUY2a2V5XHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCB2YXIgX29uRXZlbnROZXRLZXkgPSBcIlByZWZhYkV2ZW50RXhOZXlLZXlcIlxyXG4gICAgLyoqXHJcbiAgICAgKiBcdTY3MkNcdTU3MzBcdTRFOEJcdTRFRjZrZXlcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IHZhciBfb25FdmVudEtleSA9IFwiUHJlZmFiRXZlbnRFeEtleVwiXHJcblxyXG4gICAgZnVuY3Rpb24gY2FsbFJlbW90ZUZ1bmMoY2xhenpOYW1lLCBmdW5jTmFtZSwgLi4ucGFyYW1zKSB7XHJcbiAgICAgICAgaWYgKCFQcmVmYWJFdmVudFtjbGF6ek5hbWVdIHx8ICFQcmVmYWJFdmVudFtjbGF6ek5hbWVdW2Z1bmNOYW1lXSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiXHU2NUUwXHU2NTQ4XHU1MzRGXHU4QkFFIFwiICsgY2xhenpOYW1lICsgXCIgOiBcIiArIGZ1bmNOYW1lKVxyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgY2FsbEZ1bmMoY2xhenpOYW1lLCBmdW5jTmFtZSwgLi4ucGFyYW1zKVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFkZEV2ZW50TGlzdGVuZXJzKCkge1xyXG4gICAgICAgIGlmIChVdGlsLlN5c3RlbVV0aWwuaXNTZXJ2ZXIoKSkge1xyXG4gICAgICAgICAgICBFdmVudHMuYWRkQ2xpZW50TGlzdGVuZXIoX29uRXZlbnROZXRLZXksIChwbGF5ZXIsIGNsYXp6TmFtZSwgZnVuY05hbWUsIC4uLnBhcmFtcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgY2FsbFJlbW90ZUZ1bmMoY2xhenpOYW1lLCBmdW5jTmFtZSwgLi4ucGFyYW1zKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoVXRpbC5TeXN0ZW1VdGlsLmlzQ2xpZW50KCkpIHtcclxuICAgICAgICAgICAgRXZlbnRzLmFkZFNlcnZlckxpc3RlbmVyKF9vbkV2ZW50TmV0S2V5LCAoY2xhenpOYW1lOiBzdHJpbmcsIGZ1bmNOYW1lOiBzdHJpbmcsIC4uLnBhcmFtcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgY2FsbExvY2FsRnVuYyhjbGF6ek5hbWUsIGZ1bmNOYW1lLCAuLi5wYXJhbXMpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGluaXRFdmVudCgpIHtcclxuICAgICAgICBhZGRFdmVudExpc3RlbmVycygpXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcdTU2REVcdThDMDNcdTVCQTJcdTYyMzdcdTdBRUZcdTRFOEJcdTRFRjZcclxuICAgICAqIEBwYXJhbSBjbGF6ek5hbWUgXHJcbiAgICAgKiBAcGFyYW0gZnVuY05hbWUgXHJcbiAgICAgKiBAcGFyYW0gcGFyYW1zIFxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBjYWxsTG9jYWxGdW5jKGNsYXp6TmFtZTogc3RyaW5nLCBmdW5jTmFtZTogc3RyaW5nLCAuLi5wYXJhbXM6IGFueVtdKSB7XHJcbiAgICAgICAgRXZlbnRzLmRpc3BhdGNoTG9jYWwoX29uRXZlbnRLZXkgKyBcIjpcIiArIGNsYXp6TmFtZSArIFwiOlwiICsgZnVuY05hbWUsIC4uLnBhcmFtcylcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcdTU2REVcdThDMDNcdTRFOEJcdTRFRjZcclxuICAgICAqIEBwYXJhbSBjbGF6ek5hbWUgXHJcbiAgICAgKiBAcGFyYW0gZnVuY05hbWUgXHJcbiAgICAgKiBAcGFyYW0gcGFyYW1zIFxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBjYWxsRnVuYyhjbGF6ek5hbWU6IHN0cmluZywgZnVuY05hbWU6IHN0cmluZywgLi4ucGFyYW1zOiBhbnlbXSkge1xyXG5cclxuICAgICAgICBpZiAoVXRpbC5TeXN0ZW1VdGlsLmlzQ2xpZW50KCkpIHtcclxuICAgICAgICAgICAgLyoqIFx1OTAwRlx1NEYyMFx1NTIzMFx1NjcwRFx1NTJBMVx1N0FFRlx1NTNCQiBcdTYyNjdcdTg4NEMgKi9cclxuICAgICAgICAgICAgRXZlbnRzLmRpc3BhdGNoVG9TZXJ2ZXIoX29uRXZlbnROZXRLZXksIGNsYXp6TmFtZSwgZnVuY05hbWUsIC4uLnBhcmFtcylcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKFV0aWwuU3lzdGVtVXRpbC5pc1NlcnZlcigpKSB7XHJcblxyXG4gICAgICAgICAgICAvKiogXHU4QzAzXHU3NTI4XHU1MUZEXHU2NTcwIFx1NUY5N1x1NTIzMFx1N0VEM1x1Njc5QyBcdTU3MjhcdTVFN0ZcdTY0QURcdTUxRkFcdTUzQkIgKi9cclxuICAgICAgICAgICAgaWYgKE1vZHVsZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNb2R1bGUoUHJlZmFiRXZlbnRNb2R1bGVTKVtmdW5jTmFtZV0pIHtcclxuICAgICAgICAgICAgICAgIE1vZHVsZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNb2R1bGUoUHJlZmFiRXZlbnRNb2R1bGVTKVtmdW5jTmFtZV0oY2xhenpOYW1lLCAuLi5wYXJhbXMpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBNb2R1bGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TW9kdWxlKFByZWZhYkV2ZW50TW9kdWxlUykubm90aWZ5KGNsYXp6TmFtZSwgZnVuY05hbWUsIC4uLnBhcmFtcylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcdTU2REVcdThDMDNcdTRFOEJcdTRFRjZcclxuICAgICAqIEBwYXJhbSBjbGF6ek5hbWUgXHJcbiAgICAgKiBAcGFyYW0gZnVuY05hbWUgXHJcbiAgICAgKiBAcGFyYW0gcGFyYW1zIFxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBjYWxsRnVuY1JlcyhjbGF6ek5hbWU6IHN0cmluZywgZnVuY05hbWU6IHN0cmluZywgLi4ucGFyYW1zOiBhbnlbXSk6IGFueSB7XHJcblxyXG5cclxuICAgICAgICBpZiAoVXRpbC5TeXN0ZW1VdGlsLmlzQ2xpZW50KCkpIHtcclxuICAgICAgICAgICAgLyoqIFx1OTAwRlx1NEYyMFx1NTIzMFx1NjcwRFx1NTJBMVx1N0FFRlx1NTNCQiBcdTYyNjdcdTg4NEMgKi9cclxuXHJcbiAgICAgICAgICAgIGlmICghTW9kdWxlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1vZHVsZShQcmVmYWJFdmVudE1vZHVsZUMpW2Z1bmNOYW1lXSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcImZpbmQgZXJyb3IgUHJlZmFiRXZlbnRNb2R1bGVDOiBcIiArIGZ1bmNOYW1lKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGxcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIE1vZHVsZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNb2R1bGUoUHJlZmFiRXZlbnRNb2R1bGVDKVtmdW5jTmFtZV0oY2xhenpOYW1lLCAuLi5wYXJhbXMpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChVdGlsLlN5c3RlbVV0aWwuaXNTZXJ2ZXIoKSkge1xyXG5cclxuICAgICAgICAgICAgaWYgKCFNb2R1bGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TW9kdWxlKFByZWZhYkV2ZW50TW9kdWxlUylbZnVuY05hbWVdKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiZmluZCBlcnJvciBQcmVmYWJFdmVudE1vZHVsZVM6IFwiICsgZnVuY05hbWUpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvKiogXHU4QzAzXHU3NTI4XHU1MUZEXHU2NTcwIFx1NUY5N1x1NTIzMFx1N0VEM1x1Njc5QyBcdTU3MjhcdTVFN0ZcdTY0QURcdTUxRkFcdTUzQkIgKi9cclxuICAgICAgICAgICAgcmV0dXJuIE1vZHVsZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNb2R1bGUoUHJlZmFiRXZlbnRNb2R1bGVTKVtmdW5jTmFtZV0oY2xhenpOYW1lLCAuLi5wYXJhbXMpXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFx1NzZEMVx1NTQyQ1x1NEU4Qlx1NEVGNlxyXG4gICAgICogQHBhcmFtIGNsYXp6TmFtZSBcclxuICAgICAqIEBwYXJhbSBmdW5jTmFtZSBcclxuICAgICAqIEBwYXJhbSBjYWxsYmFjayBcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gb25GdW5jKGNsYXp6TmFtZTogc3RyaW5nLCBmdW5jTmFtZTogc3RyaW5nLCBjYWxsYmFjazogYW55KTogRXZlbnRzLkV2ZW50TGlzdGVuZXIge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwicmVnaXN0ZXIgOiBcIiArIF9vbkV2ZW50S2V5ICsgXCI6XCIgKyBjbGF6ek5hbWUgKyBcIjpcIiArIGZ1bmNOYW1lKVxyXG4gICAgICAgIHJldHVybiBFdmVudHMuYWRkTG9jYWxMaXN0ZW5lcihfb25FdmVudEtleSArIFwiOlwiICsgY2xhenpOYW1lICsgXCI6XCIgKyBmdW5jTmFtZSwgY2FsbGJhY2spXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIFx1NUM1RVx1NjAyN1x1N0M3Qlx1NTc4QlxyXG4gICAgKi9cclxuICAgIGV4cG9ydCBlbnVtIEF0dHJUeXBlIHtcclxuXHJcbiAgICAgICAgLyoqIFx1NjcwMFx1NTkyN1x1ODg0MFx1OTFDRiAgKi9cclxuICAgICAgICBNYXhIcCxcclxuICAgICAgICAvKiogXHU1RjUzXHU1MjRESHAgKi9cclxuICAgICAgICBDdXJIcCxcclxuICAgICAgICAvKiogXHU2NzAwXHU1OTI3XHU4NEREXHU5MUNGICovXHJcbiAgICAgICAgTWF4TXAsXHJcbiAgICAgICAgLyoqIFx1NjUzQlx1NTFGQlx1NTI5QiAqL1xyXG4gICAgICAgIEF0dGFjayxcclxuICAgICAgICAvKiogXHU5QjU0XHU2Q0Q1XHU1MjlCICovXHJcbiAgICAgICAgTWFnaWMsXHJcbiAgICAgICAgLyoqIFx1OTYzMlx1NUZBMVx1NTI5QiAqL1xyXG4gICAgICAgIERlZixcclxuICAgICAgICAvKiogXHU5QjU0XHU2Q0Q1XHU5NjMyXHU1RkExXHU1MjlCICovXHJcbiAgICAgICAgTURlZixcclxuICAgICAgICAvKiogXHU5MDFGXHU1RUE2ICovXHJcbiAgICAgICAgU3BlZWQsXHJcbiAgICAgICAgLyoqIFx1OERGM1x1OERDM1x1NTI5QiAqL1xyXG4gICAgICAgIEp1bXAsXHJcbiAgICAgICAgLyoqIFx1NjUzQlx1NTFGQlx1OTAxRlx1NUVBNiAqL1xyXG4gICAgICAgIEF0dGFja1NwZWVkLFxyXG4gICAgICAgIC8qKiBcdTY1M0JcdTUxRkJcdThERERcdTc5QkIgKi9cclxuICAgICAgICBBdHRhY2tEaXN0YW5jZSxcclxuICAgICAgICAvKiogXHU2NjJGXHU1NDI2XHU2NjJGXHU2NUUwXHU2NTRDICovXHJcbiAgICAgICAgSXNJbnZpbmNpYmxlXHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHU1QzVFXHU2MDI3XHU1MzRGXHU4QkFFXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBjbGFzcyBQcmVmYWJFdnRBdHRyIHtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogKFx1NTNDQ1x1N0FFRilcdTZERkJcdTUyQTBcdTVDNUVcdTYwMjdcclxuICAgICAgICAgKiBAcGFyYW0gc2VuZGVyR3VpZCBcdTUzRDFcdThENzdcdTVCRjlcdThDNjFHdWlkXHJcbiAgICAgICAgICogQHBhcmFtIHRhcmdldEd1aWQgXHU3NkVFXHU2ODA3XHU1QkY5XHU4QzYxR3VpZFxyXG4gICAgICAgICAqIEBwYXJhbSB2YWwgXHU1MDNDXHJcbiAgICAgICAgICogQHBhcmFtIGF0dHJUeXBlIFx1NUM1RVx1NjAyN1x1N0M3Qlx1NTc4QlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgc2V0QXR0clZhbChzZW5kZXJHdWlkOiBzdHJpbmcsIHRhcmdldEd1aWQ6IHN0cmluZywgdmFsOiBudW1iZXIsIGF0dHJUeXBlOiBBdHRyVHlwZSkge1xyXG4gICAgICAgICAgICBjYWxsRnVuYyh0aGlzLm5hbWUsIHRoaXMub25TZXRBdHRyVmFsLm5hbWUsIHNlbmRlckd1aWQsIHRhcmdldEd1aWQsIHZhbCwgYXR0clR5cGUpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAoXHU1M0NDXHU3QUVGKVx1NzZEMVx1NTQyQ1x1NUM1RVx1NjAyN1x1NjUzOVx1NTNEOFxyXG4gICAgICAgICAqIEBwYXJhbSBjYWxsYmFjayBcdTU2REVcdThDMDNcclxuICAgICAgICAgKiBAcmV0dXJucyBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgc3RhdGljIG9uU2V0QXR0clZhbChjYWxsYmFjazogKHNlbmRlckd1aWQ6IHN0cmluZywgdGFyZ2V0R3VpZDogc3RyaW5nLCB2YWw6IG51bWJlciwgYXR0clR5cGU6IEF0dHJUeXBlKSA9PiB2b2lkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9uQ2hhbmdlQXR0clZhbChjYWxsYmFjaylcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIChcdTUzQ0NcdTdBRUYpXHU2REZCXHU1MkEwXHU1QzVFXHU2MDI3XHJcbiAgICAgICAgICogQHBhcmFtIHNlbmRlckd1aWQgXHU1M0QxXHU4RDc3XHU1QkY5XHU4QzYxR3VpZFxyXG4gICAgICAgICAqIEBwYXJhbSB0YXJnZXRHdWlkIFx1NzZFRVx1NjgwN1x1NUJGOVx1OEM2MUd1aWRcclxuICAgICAgICAgKiBAcGFyYW0gdmFsIFx1NTAzQ1xyXG4gICAgICAgICAqIEBwYXJhbSBhdHRyVHlwZSBcdTVDNUVcdTYwMjdcdTdDN0JcdTU3OEJcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGFkZEF0dHJWYWwoc2VuZGVyR3VpZDogc3RyaW5nLCB0YXJnZXRHdWlkOiBzdHJpbmcsIHZhbDogbnVtYmVyLCBhdHRyVHlwZTogQXR0clR5cGUpIHtcclxuICAgICAgICAgICAgY2FsbEZ1bmModGhpcy5uYW1lLCB0aGlzLm9uQWRkQXR0clZhbC5uYW1lLCBzZW5kZXJHdWlkLCB0YXJnZXRHdWlkLCB2YWwsIGF0dHJUeXBlKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBvbkFkZEF0dHJWYWwoY2FsbGJhY2s6IChzZW5kZXJHdWlkOiBzdHJpbmcsIHRhcmdldEd1aWQ6IHN0cmluZywgdmFsOiBudW1iZXIsIGF0dHJUeXBlOiBBdHRyVHlwZSkgPT4gdm9pZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vbkNoYW5nZUF0dHJWYWwoY2FsbGJhY2spXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAoXHU1M0NDXHU3QUVGKVx1ODNCN1x1NTNENlx1NUM1RVx1NjAyN1xyXG4gICAgICAgICAqIEBwYXJhbSB0YXJnZXRHdWlkIFxyXG4gICAgICAgICAqIEBwYXJhbSB2YWwgXHJcbiAgICAgICAgICogQHBhcmFtIGF0dHJUeXBlIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZ2V0QXR0clZhbCh0YXJnZXRHdWlkOiBzdHJpbmcsIGF0dHJUeXBlOiBBdHRyVHlwZSk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIGxldCByZXMgPSBjYWxsRnVuY1Jlcyh0aGlzLm5hbWUsIHRoaXMuZ2V0QXR0clZhbC5uYW1lLCB0YXJnZXRHdWlkLCBhdHRyVHlwZSlcclxuICAgICAgICAgICAgcmV0dXJuIHJlc1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogKFx1NTNDQ1x1N0FFRilcdTc2RDFcdTU0MkNcdTVDNUVcdTYwMjdcdTY1MzlcdTUzRDhcclxuICAgICAgICAgKiBAcGFyYW0gY2FsbGJhY2sgXHU1NkRFXHU4QzAzXHJcbiAgICAgICAgICogQHJldHVybnMgXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBvbkNoYW5nZUF0dHJWYWwoY2FsbGJhY2s6IChzZW5kZXJHdWlkOiBzdHJpbmcsIHRhcmdldEd1aWQ6IHN0cmluZywgdmFsOiBudW1iZXIsIGF0dHJUeXBlOiBBdHRyVHlwZSkgPT4gdm9pZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gb25GdW5jKHRoaXMubmFtZSwgdGhpcy5vbkNoYW5nZUF0dHJWYWwubmFtZSwgY2FsbGJhY2spXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFx1ODhDNVx1NTkwN1x1NjlGRFx1NEY0RFxyXG4gICAgICovXHJcbiAgICBleHBvcnQgZW51bSBFcXVpcFNsb3Qge1xyXG5cclxuICAgICAgICAvKiogXHU2QjY2XHU1NjY4ICovXHJcbiAgICAgICAgV2VhcG9uID0gMSxcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcdTg4QzVcdTU5MDdcdTUzNEZcdThCQUVcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGNsYXNzIFByZWZhYkV2dEVxdWlwIHtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogKFx1NTNDQ1x1N0FFRikgXHU3QTdGXHU2MjM0XHU4OEM1XHU1OTA3XHJcbiAgICAgICAgICogQHBhcmFtIHRhcmdldEd1aWQgXHU1QkY5XHU4QzYxR3VpZFxyXG4gICAgICAgICAqIEBwYXJhbSBzbG90IFx1NjlGRFx1NEY0RFxyXG4gICAgICAgICAqIEBwYXJhbSBlcXVpcEd1aWQgXHU4OEM1XHU1OTA3R3VpZFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZXF1aXAodGFyZ2V0R3VpZDogc3RyaW5nLCBzbG90OiBFcXVpcFNsb3QsIGVxdWlwR3VpZDogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIGNhbGxGdW5jKHRoaXMubmFtZSwgdGhpcy5vbkVxdWlwLm5hbWUsIHRhcmdldEd1aWQsIHNsb3QsIGVxdWlwR3VpZClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIChcdTUzQ0NcdTdBRUYpXHU3NkQxXHU1NDJDXHU4OEM1XHU1OTA3XHU2NTM5XHU1M0Q4XHJcbiAgICAgICAgICogQHBhcmFtIGNhbGxiYWNrIFxyXG4gICAgICAgICAqIEByZXR1cm5zIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgb25FcXVpcChjYWxsYmFjazogKHRhcmdldEd1aWQ6IHN0cmluZywgc2xvdDogRXF1aXBTbG90LCBlcXVpcEd1aWQ6IHN0cmluZykgPT4gdm9pZCk6IEV2ZW50cy5FdmVudExpc3RlbmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIG9uRnVuYyh0aGlzLm5hbWUsIHRoaXMub25FcXVpcC5uYW1lLCBjYWxsYmFjaylcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHU3M0E5XHU1QkI2XHU0RkUxXHU2MDZGXHU3QzdCXHU1NzhCXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBlbnVtIFBsYXllckluZm9UeXBlIHtcclxuXHJcbiAgICAgICAgLyoqIFx1NTQwRFx1NUI1NyAqL1xyXG4gICAgICAgIE5hbWUsXHJcbiAgICAgICAgLyoqIFx1N0I0OVx1N0VBNyAqL1xyXG4gICAgICAgIExldmVsLFxyXG4gICAgICAgIC8qKiBcdTdFQ0ZcdTlBOEMgKi9cclxuICAgICAgICBFeHAsXHJcbiAgICAgICAgLyoqIFx1OTFEMVx1NUUwMSAqL1xyXG4gICAgICAgIEdvbGQsXHJcbiAgICAgICAgLyoqIFx1NzlFRlx1NTIwNiAqL1xyXG4gICAgICAgIFNjb3JlLFxyXG4gICAgICAgIC8qKiBcdTUxNzNcdTUzNjEgKi9cclxuICAgICAgICBTdGFnZSxcclxuICAgICAgICAvKiogXHU0RUJBXHU2QzE0ICovXHJcbiAgICAgICAgUG9wdWxhcml0eSxcclxuICAgICAgICAvKiogXHU2NjJGXHU1NDI2XHU0RTBEXHU1NzI4XHU1OTI3XHU1Mzg1XHU0RTJEICovXHJcbiAgICAgICAgSXNOb3RJbkxvYmJ5LFxyXG4gICAgICAgIC8qKiBcdTZCN0JcdTRFQTFcdTZCMjFcdTY1NzAgKi9cclxuICAgICAgICBEZWF0aENvdW50XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcdTczQTlcdTVCQjZcdTRGRTFcdTYwNkZcdTUzNEZcdThCQUVcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGNsYXNzIFByZWZhYkV2dFBsYXllckluZm8ge1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAoXHU1M0NDXHU3QUVGKVx1ODNCN1x1NTNENlx1NzNBOVx1NUJCNlx1NEZFMVx1NjA2RlxyXG4gICAgICAgICAqIEBwYXJhbSB0YXJnZXRHdWlkIFx1NzZFRVx1NjgwN1x1NUJGOVx1OEM2MUd1aWRcclxuICAgICAgICAgKiBAcGFyYW0gdmFsIFx1NTAzQ1xyXG4gICAgICAgICAqIEBwYXJhbSBpbmZvVHlwZSBcdTRGRTFcdTYwNkZcdTdDN0JcdTU3OEJcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGdldFBsYXllckluZm8odGFyZ2V0R3VpZDogc3RyaW5nLCBpbmZvVHlwZTogUGxheWVySW5mb1R5cGUgfCBzdHJpbmcpOiBhbnkge1xyXG4gICAgICAgICAgICByZXR1cm4gY2FsbEZ1bmNSZXModGhpcy5uYW1lLCB0aGlzLmdldFBsYXllckluZm8ubmFtZSwgdGFyZ2V0R3VpZCwgaW5mb1R5cGUpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAoXHU1M0NDXHU3QUVGKVx1OEJCRVx1N0Y2RVx1NzNBOVx1NUJCNlx1NEZFMVx1NjA2RlxyXG4gICAgICAgICAqIEBwYXJhbSBzZW5kZXJHdWlkIFx1NTNEMVx1OEQ3N1x1NUJGOVx1OEM2MUd1aWRcclxuICAgICAgICAgKiBAcGFyYW0gdGFyZ2V0R3VpZCBcdTc2RUVcdTY4MDdcdTVCRjlcdThDNjFHdWlkXHJcbiAgICAgICAgICogQHBhcmFtIHZhbCBcdTUwM0NcclxuICAgICAgICAgKiBAcGFyYW0gaW5mb1R5cGUgXHU0RkUxXHU2MDZGXHU3QzdCXHU1NzhCXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBzZXRQbGF5ZXJJbmZvKHNlbmRlckd1aWQ6IHN0cmluZywgdGFyZ2V0R3VpZDogc3RyaW5nLCB2YWw6IGFueSwgaW5mb1R5cGU6IFBsYXllckluZm9UeXBlIHwgc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIGNhbGxGdW5jKHRoaXMubmFtZSwgdGhpcy5vblNldFBsYXllckluZm8ubmFtZSwgc2VuZGVyR3VpZCwgdGFyZ2V0R3VpZCwgdmFsLCBpbmZvVHlwZSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIChcdTUzQ0NcdTdBRUYpXHU3NkQxXHU1NDJDXHU0RkUxXHU2MDZGXHU2NTM5XHU1M0Q4XHJcbiAgICAgICAgICogQHBhcmFtIGNhbGxiYWNrIFx1NTZERVx1OEMwM1xyXG4gICAgICAgICAqIEByZXR1cm5zIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgb25TZXRQbGF5ZXJJbmZvKGNhbGxiYWNrOiAoc2VuZGVyR3VpZDogc3RyaW5nLCB0YXJnZXRHdWlkOiBzdHJpbmcsIHZhbDogYW55LCBpbmZvVHlwZTogUGxheWVySW5mb1R5cGUgfCBzdHJpbmcpID0+IHZvaWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG9uRnVuYyh0aGlzLm5hbWUsIHRoaXMub25TZXRQbGF5ZXJJbmZvLm5hbWUsIGNhbGxiYWNrKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogKFx1NTNDQ1x1N0FFRilcdTZERkJcdTUyQTBcdTRGRTFcdTYwNkZcclxuICAgICAgICAgKiBAcGFyYW0gc2VuZGVyR3VpZCBcdTUzRDFcdThENzdcdTVCRjlcdThDNjFHdWlkXHJcbiAgICAgICAgICogQHBhcmFtIHRhcmdldEd1aWQgXHU3NkVFXHU2ODA3XHU1QkY5XHU4QzYxR3VpZFxyXG4gICAgICAgICAqIEBwYXJhbSB2YWwgXHU1MDNDXHJcbiAgICAgICAgICogQHBhcmFtIGluZm9UeXBlIFx1NEZFMVx1NjA2Rlx1N0M3Qlx1NTc4QlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgYWRkUGxheWVySW5mbyhzZW5kZXJHdWlkOiBzdHJpbmcsIHRhcmdldEd1aWQ6IHN0cmluZywgdmFsOiBudW1iZXIsIGF0dHJUeXBlOiBQbGF5ZXJJbmZvVHlwZSB8IHN0cmluZykge1xyXG4gICAgICAgICAgICBjYWxsRnVuYyh0aGlzLm5hbWUsIHRoaXMub25BZGRQbGF5ZXJJbmZvLm5hbWUsIHNlbmRlckd1aWQsIHRhcmdldEd1aWQsIHZhbCwgYXR0clR5cGUpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAoXHU1M0NDXHU3QUVGKVx1NzZEMVx1NTQyQ1x1NEZFMVx1NjA2Rlx1NjUzOVx1NTNEOFxyXG4gICAgICAgICAqIEBwYXJhbSBjYWxsYmFjayBcdTU2REVcdThDMDNcclxuICAgICAgICAgKiBAcmV0dXJucyBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgc3RhdGljIG9uQWRkUGxheWVySW5mbyhjYWxsYmFjazogKHNlbmRlckd1aWQ6IHN0cmluZywgdGFyZ2V0R3VpZDogc3RyaW5nLCB2YWw6IG51bWJlciwgaW5mb1R5cGU6IFBsYXllckluZm9UeXBlIHwgc3RyaW5nKSA9PiB2b2lkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBvbkZ1bmModGhpcy5uYW1lLCB0aGlzLm9uQWRkUGxheWVySW5mby5uYW1lLCBjYWxsYmFjaylcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBlbnVtIFBsYXllclN0YXRUeXBlIHtcclxuICAgICAgICAvKiogXHU4ODRDXHU4RDcwICovXHJcbiAgICAgICAgV2Fsa2luZyxcclxuICAgICAgICAvKiogXHU5OERFXHU4ODRDICovXHJcbiAgICAgICAgRmx5aW5nXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFByZWZhYkV2dFBsYXllclN0YXQge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIChcdTUzQ0NcdTdBRUYpXHU2NkY0XHU2NTM5XHU3M0E5XHU1QkI2XHU3MkI2XHU2MDAxXHJcbiAgICAgICAgICogQHBhcmFtIHNlbmRlckd1aWQgXHU1M0QxXHU4RDc3XHU1QkY5XHU4QzYxZ3VpZFxyXG4gICAgICAgICAqIEBwYXJhbSB0YXJnZXRHdWlkIFx1NzZFRVx1NjgwN1x1NUJGOVx1OEM2MWd1aWRcclxuICAgICAgICAgKiBAcGFyYW0gc3RhdFR5cGUgXHU3M0E5XHU1QkI2XHU3MkI2XHU2MDAxXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBzZXRQbGF5ZXJTdGF0KHNlbmRlckd1aWQ6IHN0cmluZywgdGFyZ2V0R3VpZDogc3RyaW5nLCBzdGF0VHlwZTogUGxheWVyU3RhdFR5cGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGNhbGxGdW5jKHRoaXMubmFtZSwgdGhpcy5vblNldFBsYXllclN0YXQubmFtZSwgc2VuZGVyR3VpZCwgdGFyZ2V0R3VpZCwgc3RhdFR5cGUpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAoXHU1M0NDXHU3QUVGKVx1NzZEMVx1NTQyQ1x1NzNBOVx1NUJCNlx1NzJCNlx1NjAwMVx1NjZGNFx1NjUzOVxyXG4gICAgICAgICAqIEBwYXJhbSBjYWxsYmFjayBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgc3RhdGljIG9uU2V0UGxheWVyU3RhdChjYWxsYmFjazogKHNlbmRlckd1aWQ6IHN0cmluZywgdGFyZ2V0R3VpZDogc3RyaW5nLCBzdGF0VHlwZTogUGxheWVyU3RhdFR5cGUpID0+IHZvaWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG9uRnVuYyh0aGlzLm5hbWUsIHRoaXMub25TZXRQbGF5ZXJTdGF0Lm5hbWUsIGNhbGxiYWNrKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogKFx1NTNDQ1x1N0FFRilcdTgzQjdcdTVGOTdcdTczQTlcdTVCQjZcdTVGNTNcdTUyNERcdTcyQjZcdTYwMDFcclxuICAgICAgICAgKiBAcGFyYW0gdGFyZ2V0R3VpZCBcdTc2RUVcdTY4MDdcdTVCRjlcdThDNjFndWlkXHJcbiAgICAgICAgICogQHJldHVybnMgXHU3M0E5XHU1QkI2XHU1RjUzXHU1MjREXHU3MkI2XHU2MDAxXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBnZXRQbGF5ZXJTdGF0KHRhcmdldEd1aWQ6IHN0cmluZyk6IFBsYXllclN0YXRUeXBlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGNhbGxGdW5jUmVzKHRoaXMubmFtZSwgdGhpcy5nZXRQbGF5ZXJTdGF0Lm5hbWUsIHRhcmdldEd1aWQpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBcdTY1M0JcdTUxRkJcdTUzNEZcdThCQUVcclxuICAgICovXHJcbiAgICBleHBvcnQgY2xhc3MgUHJlZmFiRXZ0RmlnaHQge1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAoXHU1M0NDXHU3QUVGKVx1NTFGQlx1NEUyRFx1NzZFRVx1NjgwN1xyXG4gICAgICAgICAqIEBwYXJhbSBhdHRhY2tlckd1aWQgXHU1M0QxXHU4RDc3XHU1QkY5XHU4QzYxR3VpZFxyXG4gICAgICAgICAqIEBwYXJhbSB0YXJnZXRHdWlkIFx1NzZFRVx1NjgwN1x1NUJGOVx1OEM2MUd1aWRcclxuICAgICAgICAgKiBAcGFyYW0gZGFtYWdlIFx1NEYyNFx1NUJCM1xyXG4gICAgICAgICAqIEBwYXJhbSBoaXRQb2ludCBcdTUxRkJcdTRFMkRcdTcwQjlcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGhpdChzZW5kZXJHdWlkOiBzdHJpbmcsIHRhcmdldEd1aWQ6IHN0cmluZywgZGFtYWdlOiBudW1iZXIsIGhpdFBvaW50OiBUeXBlLlZlY3Rvcikge1xyXG4gICAgICAgICAgICBjYWxsRnVuYyh0aGlzLm5hbWUsIHRoaXMub25IaXQubmFtZSwgc2VuZGVyR3VpZCwgdGFyZ2V0R3VpZCwgZGFtYWdlLCBoaXRQb2ludClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIChcdTUzQ0NcdTdBRUYpXHU3NkQxXHU1NDJDXHU1MUZCXHU0RTJEXHU3NkVFXHU2ODA3XHJcbiAgICAgICAgICogQHBhcmFtIGNhbGxiYWNrIFx1NTZERVx1OEMwM1xyXG4gICAgICAgICAqIEByZXR1cm5zIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgb25IaXQoY2FsbGJhY2s6IChzZW5kZXJHdWlkOiBzdHJpbmcsIHRhcmdldEd1aWQ6IHN0cmluZywgZGFtYWdlOiBudW1iZXIsIGhpdFBvaW50OiBUeXBlLlZlY3RvcikgPT4gdm9pZCk6IEV2ZW50cy5FdmVudExpc3RlbmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIG9uRnVuYyh0aGlzLm5hbWUsIHRoaXMub25IaXQubmFtZSwgY2FsbGJhY2spXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAoXHU1M0NDXHU3QUVGKVx1NTNEMVx1OEQ3N1x1NEYyNFx1NUJCM1xyXG4gICAgICAgICAqIEBwYXJhbSBhdHRhY2tlckd1aWQgXHU1M0QxXHU4RDc3XHU1QkY5XHU4QzYxR3VpZFxyXG4gICAgICAgICAqIEBwYXJhbSB0YXJnZXRHdWlkIFx1NzZFRVx1NjgwN1x1NUJGOVx1OEM2MUd1aWRcclxuICAgICAgICAgKiBAcGFyYW0gZGFtYWdlIFx1NEYyNFx1NUJCM1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgaHVydChzZW5kZXJHdWlkOiBzdHJpbmcsIHRhcmdldEd1aWQ6IHN0cmluZywgZGFtYWdlOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgY2FsbEZ1bmModGhpcy5uYW1lLCB0aGlzLm9uSHVydC5uYW1lLCBzZW5kZXJHdWlkLCB0YXJnZXRHdWlkLCBkYW1hZ2UpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAoXHU1M0NDXHU3QUVGKVx1NzZEMVx1NTQyQ1x1NTNEN1x1NTIzMFx1NEYyNFx1NUJCM1xyXG4gICAgICAgICAqIEBwYXJhbSBjYWxsYmFjayBcdTU2REVcdThDMDNcclxuICAgICAgICAgKiBAcmV0dXJucyBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgc3RhdGljIG9uSHVydChjYWxsYmFjazogKHNlbmRlckd1aWQ6IHN0cmluZywgdGFyZ2V0R3VpZDogc3RyaW5nLCBkYW1hZ2U6IG51bWJlcikgPT4gdm9pZCk6IEV2ZW50cy5FdmVudExpc3RlbmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIG9uRnVuYyh0aGlzLm5hbWUsIHRoaXMub25IdXJ0Lm5hbWUsIGNhbGxiYWNrKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogKFx1NTNDQ1x1N0FFRilcdTUzRDFcdThENzdcdTZDQkJcdTc1OTdcclxuICAgICAgICAgKiBAcGFyYW0gYXR0YWNrZXJHdWlkIFx1NTNEMVx1OEQ3N1x1NUJGOVx1OEM2MUd1aWRcclxuICAgICAgICAgKiBAcGFyYW0gdGFyZ2V0R3VpZCBcdTc2RUVcdTY4MDdcdTVCRjlcdThDNjFHdWlkXHJcbiAgICAgICAgICogQHBhcmFtIGN1cmVWYWwgXHU2Q0JCXHU3NTk3XHU2NTcwXHU1MDNDXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBjdXJlKHNlbmRlckd1aWQ6IHN0cmluZywgdGFyZ2V0R3VpZDogc3RyaW5nLCBjdXJlVmFsOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgY2FsbEZ1bmModGhpcy5uYW1lLCB0aGlzLm9uQ3VyZS5uYW1lLCBzZW5kZXJHdWlkLCB0YXJnZXRHdWlkLCBjdXJlVmFsKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogKFx1NTNDQ1x1N0FFRilcdTc2RDFcdTU0MkNcdTUzRDdcdTUyMzBcdTZDQkJcdTc1OTdcclxuICAgICAgICAgKiBAcGFyYW0gY2FsbGJhY2sgXHU1NkRFXHU4QzAzXHJcbiAgICAgICAgICogQHJldHVybnMgXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBvbkN1cmUoY2FsbGJhY2s6IChzZW5kZXJHdWlkOiBzdHJpbmcsIHRhcmdldEd1aWQ6IHN0cmluZywgY3VyZVZhbDogbnVtYmVyKSA9PiB2b2lkKTogRXZlbnRzLkV2ZW50TGlzdGVuZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gb25GdW5jKHRoaXMubmFtZSwgdGhpcy5vbkN1cmUubmFtZSwgY2FsbGJhY2spXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAoXHU1M0NDXHU3QUVGKVx1NTNEMVx1OEQ3N1x1NkI3Qlx1NEVBMVxyXG4gICAgICAgICAqIEBwYXJhbSB0YXJnZXRHdWlkIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZGllKHRhcmdldEd1aWQ6IHN0cmluZykge1xyXG4gICAgICAgICAgICBjYWxsRnVuYyh0aGlzLm5hbWUsIHRoaXMub25EaWUubmFtZSwgdGFyZ2V0R3VpZClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIChcdTUzQ0NcdTdBRUYpXHU3NkQxXHU1NDJDXHU1QkY5XHU4QzYxXHU2QjdCXHU0RUExXHJcbiAgICAgICAgICogQHBhcmFtIGNhbGxiYWNrIFxyXG4gICAgICAgICAqIEByZXR1cm5zIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgb25EaWUoY2FsbGJhY2s6ICh0YXJnZXRHdWlkOiBzdHJpbmcpID0+IHZvaWQpOiBFdmVudHMuRXZlbnRMaXN0ZW5lciB7XHJcbiAgICAgICAgICAgIHJldHVybiBvbkZ1bmModGhpcy5uYW1lLCB0aGlzLm9uRGllLm5hbWUsIGNhbGxiYWNrKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogKFx1NTNDQ1x1N0FFRilcdTkwMUFcdTc3RTVcdTU5MERcdTZEM0JcclxuICAgICAgICAgKiBAcGFyYW0gdGFyZ2V0R3VpZCBcdTVCRjlcdThDNjFpZFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgcmV2aXZlKHRhcmdldEd1aWQ6IHN0cmluZykge1xyXG4gICAgICAgICAgICBjYWxsRnVuYyh0aGlzLm5hbWUsIHRoaXMub25SZXZpdmUubmFtZSwgdGFyZ2V0R3VpZClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIChcdTUzQ0NcdTdBRUYpXHU3NkQxXHU1NDJDXHU1OTBEXHU2RDNCXHJcbiAgICAgICAgICogQHBhcmFtIGNhbGxiYWNrIFx1NTZERVx1OEMwM1xyXG4gICAgICAgICAqIEByZXR1cm5zIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgb25SZXZpdmUoY2FsbGJhY2s6ICh0YXJnZXRHdWlkOiBzdHJpbmcpID0+IHZvaWQpOiBFdmVudHMuRXZlbnRMaXN0ZW5lciB7XHJcbiAgICAgICAgICAgIHJldHVybiBvbkZ1bmModGhpcy5uYW1lLCB0aGlzLm9uUmV2aXZlLm5hbWUsIGNhbGxiYWNrKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcdThCQjBcdTVGNTVcdTcwQjlcdTUzNEZcdThCQUVcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGNsYXNzIFByZWZhYkV2dFJlY29yZFBvaW50IHtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogKFx1NTNDQ1x1N0FFRilcdThCQkVcdTdGNkVcdTUxNzNcdTUzNjFcclxuICAgICAgICAgKiBAcGFyYW0gc2VuZGVyR3VpZCBcdTUzRDFcdTkwMDFcdTgwMDVHdWlkXHJcbiAgICAgICAgICogQHBhcmFtIHRhcmdldEd1aWQgXHU3NkVFXHU2ODA3R3VpZFxyXG4gICAgICAgICAqIEBwYXJhbSByZWNvcmRQb2ludElkIFx1OEJCMFx1NUY1NVx1NzBCOWlkXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBzZXRSZWNvcmRQb2ludChzZW5kZXJHdWlkOiBzdHJpbmcsIHRhcmdldEd1aWQ6IHN0cmluZywgcmVjb3JkUG9pbnRJZDogbnVtYmVyLCBzYXZlREI6IGJvb2xlYW4pIHtcclxuICAgICAgICAgICAgY2FsbEZ1bmModGhpcy5uYW1lLCB0aGlzLm9uU2V0UmVjb3JkUG9pbnQubmFtZSwgc2VuZGVyR3VpZCwgdGFyZ2V0R3VpZCwgcmVjb3JkUG9pbnRJZCwgc2F2ZURCKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogKFx1NTNDQ1x1N0FFRilcdTgzQjdcdTUzRDZcdTUxNzNcdTUzNjFcclxuICAgICAgICAgKiBAcGFyYW0gdGFyZ2V0R3VpZCBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGdldFJlY29yZFBvaW50KHRhcmdldEd1aWQ6IHN0cmluZyk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIHJldHVybiBjYWxsRnVuY1Jlcyh0aGlzLm5hbWUsIHRoaXMuZ2V0UmVjb3JkUG9pbnQubmFtZSwgdGFyZ2V0R3VpZClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIChcdTUzQ0NcdTdBRUYpXHU3NkQxXHU1NDJDXHU4QkJFXHU3RjZFXHU1MTczXHU1MzYxXHJcbiAgICAgICAgICogQHBhcmFtIGNhbGxiYWNrIFx1NTZERVx1OEMwM1xyXG4gICAgICAgICAqIEByZXR1cm5zIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgb25TZXRSZWNvcmRQb2ludChjYWxsYmFjazogKHNlbmRlckd1aWQ6IHN0cmluZywgdGFyZ2V0R3VpZDogc3RyaW5nLCByZWNvcmRQb2ludElkOiBudW1iZXIpID0+IHZvaWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG9uRnVuYyh0aGlzLm5hbWUsIHRoaXMub25TZXRSZWNvcmRQb2ludC5uYW1lLCBjYWxsYmFjaylcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIChcdTUzQ0NcdTdBRUYpXHU4RkQ0XHU1NkRFXHU1QjU4XHU2ODYzXHU4QkIwXHU1RjU1XHU3MEI5XHJcbiAgICAgICAgICogQHBhcmFtIHNlbmRlckd1aWQgXHU1M0QxXHU5MDAxXHU4MDA1Z3VpZCBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGJhY2tDdXJyZW50UmVjb3JkUG9pbnQoc2VuZGVyR3VpZDogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIGNhbGxGdW5jKHRoaXMubmFtZSwgdGhpcy5vbkJhY2tDdXJyZW50UmVjb3JkUG9pbnQubmFtZSwgc2VuZGVyR3VpZClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIChcdTUzQ0NcdTdBRUYpXHU3NkQxXHU1NDJDXHU1NkRFXHU1MjMwXHU1QjU4XHU2ODYzXHU4QkIwXHU1RjU1XHU3MEI5XHJcbiAgICAgICAgICogQHBhcmFtIGNhbGxiYWNrIFx1NTZERVx1OEMwM1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgb25CYWNrQ3VycmVudFJlY29yZFBvaW50KGNhbGxiYWNrOiAoc2VuZGVyR3VpZDogc3RyaW5nKSA9PiB2b2lkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBvbkZ1bmModGhpcy5uYW1lLCB0aGlzLm9uQmFja0N1cnJlbnRSZWNvcmRQb2ludC5uYW1lLCBjYWxsYmFjaylcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIChcdTUzQ0NcdTdBRUYpXHU4RkQ0XHU1NkRFXHU4QkIwXHU1RjU1XHU3MEI5XHJcbiAgICAgICAgICogQHBhcmFtIHNlbmRlckd1aWQgXHU1M0QxXHU5MDAxXHU4MDA1Z3VpZCBcclxuICAgICAgICAgKiBAcGFyYW0gcmVjb3JkUG9pbnRJZCBcdThCQjBcdTVGNTVcdTcwQjlpZFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgYmFja1JlY29yZFBvaW50KHNlbmRlckd1aWQ6IHN0cmluZywgcmVjb3JkUG9pbnRJZDogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIGNhbGxGdW5jKHRoaXMubmFtZSwgdGhpcy5vbkJhY2tSZWNvcmRQb2ludC5uYW1lLCBzZW5kZXJHdWlkLCByZWNvcmRQb2ludElkKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogKFx1NTNDQ1x1N0FFRilcdTc2RDFcdTU0MkNcdTU2REVcdTUyMzBcdThCQjBcdTVGNTVcdTcwQjlcclxuICAgICAgICAgKiBAcGFyYW0gY2FsbGJhY2sgXHU1NkRFXHU4QzAzXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBvbkJhY2tSZWNvcmRQb2ludChjYWxsYmFjazogKHNlbmRlckd1aWQ6IHN0cmluZywgcmVjb3JkUG9pbnRJZDogbnVtYmVyKSA9PiB2b2lkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBvbkZ1bmModGhpcy5uYW1lLCB0aGlzLm9uQmFja1JlY29yZFBvaW50Lm5hbWUsIGNhbGxiYWNrKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcdTkwMUFcdTc3RTVcdTUzNEZcdThCQUVcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGNsYXNzIFByZWZhYkV2dE5vdGlmeSB7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIChcdTVCQTJcdTYyMzdcdTdBRUYpXHU2NzJDXHU1NzMwXHU5MDFBXHU3N0U1XHJcbiAgICAgICAgICogQHBhcmFtIHRleHQgXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBub3RpZnlMb2NhbCh0ZXh0OiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgY2FsbExvY2FsRnVuYyh0aGlzLm5hbWUsIHRoaXMub25Ob3RpZnkubmFtZSwgdGV4dClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIChcdTUzQ0NcdTdBRUYpXHU1MTY4XHU1QzQwXHU5MDFBXHU3N0U1XHJcbiAgICAgICAgICogQHBhcmFtIHRleHQgXHU0RkUxXHU2MDZGXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBub3RpZnkodGV4dDogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIGNhbGxGdW5jKHRoaXMubmFtZSwgdGhpcy5vbk5vdGlmeS5uYW1lLCB0ZXh0KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogKFx1NTNDQ1x1N0FFRilcdTc2RDFcdTU0MkNcdTkwMUFcdTc3RTVcclxuICAgICAgICAgKiBAcGFyYW0gY2FsbGJhY2sgXHJcbiAgICAgICAgICogQHJldHVybnMgXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBvbk5vdGlmeShjYWxsYmFjazogKHRleHQ6IHN0cmluZykgPT4gdm9pZCk6IEV2ZW50cy5FdmVudExpc3RlbmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIG9uRnVuYyh0aGlzLm5hbWUsIHRoaXMub25Ob3RpZnkubmFtZSwgY2FsbGJhY2spXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFx1NjM5Mlx1ODg0Q1x1Njk5Q1x1NTM0Rlx1OEJBRVxyXG4gICAgICovXHJcbiAgICBleHBvcnQgY2xhc3MgUHJlZmFiRXZ0UmFuayB7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIChcdTVCQTJcdTYyMzdcdTdBRUYpXHU2MjUzXHU1RjAwXHU2MzkyXHU4ODRDXHU2OTlDVUlcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgc3RhdGljIG9wZW5SYW5rKCkge1xyXG4gICAgICAgICAgICBjYWxsTG9jYWxGdW5jKHRoaXMubmFtZSwgdGhpcy5vbk9wZW5SYW5rLm5hbWUpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAoXHU1QkEyXHU2MjM3XHU3QUVGKVx1NzZEMVx1NTQyQ1x1NjI1M1x1NUYwMFx1NjM5Mlx1ODg0Q1x1Njk5Q1VJXHJcbiAgICAgICAgICogQHBhcmFtIGNhbGxiYWNrIFx1NTZERVx1OEMwM1xyXG4gICAgICAgICAqIEByZXR1cm5zIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgb25PcGVuUmFuayhjYWxsYmFjazogKCkgPT4gdm9pZCk6IEV2ZW50cy5FdmVudExpc3RlbmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIG9uRnVuYyh0aGlzLm5hbWUsIHRoaXMub25PcGVuUmFuay5uYW1lLCBjYWxsYmFjaylcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIChcdTUzQ0NcdTdBRUYpXHU4QkJFXHU3RjZFXHU2MzkyXHU4ODRDXHU2OTlDXHU2NTcwXHU2MzZFXHJcbiAgICAgICAgICogQHBhcmFtIHNlbmRlckd1aWQgXHJcbiAgICAgICAgICogQHBhcmFtIHNjb3JlIFxyXG4gICAgICAgICAqIEBwYXJhbSB0eXBlTmFtZSBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHNldFJhbmtEYXRhKHNlbmRlckd1aWQ6IHN0cmluZywgbmFtZTogc3RyaW5nLCBzY29yZTogbnVtYmVyLCB0eXBlTmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIGNhbGxGdW5jKHRoaXMubmFtZSwgdGhpcy5vblNldFJhbmtEYXRhLm5hbWUsIHNlbmRlckd1aWQsIG5hbWUsIHNjb3JlLCB0eXBlTmFtZSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIChcdTUzQ0NcdTdBRUYpXHU3NkQxXHU1NDJDXHU4QkJFXHU3RjZFXHU2MzkyXHU4ODRDXHU2OTlDXHU2NTcwXHU2MzZFXHJcbiAgICAgICAgICogQHBhcmFtIGNhbGxiYWNrIFxyXG4gICAgICAgICAqIEByZXR1cm5zIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgb25TZXRSYW5rRGF0YShjYWxsYmFjazogKHNlbmRlckd1aWQ6IHN0cmluZywgbmFtZTogc3RyaW5nLCBzY29yZTogbnVtYmVyLCB0eXBlTmFtZTogc3RyaW5nKSA9PiB2b2lkKTogRXZlbnRzLkV2ZW50TGlzdGVuZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gb25GdW5jKHRoaXMubmFtZSwgdGhpcy5vblNldFJhbmtEYXRhLm5hbWUsIGNhbGxiYWNrKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogKFx1NTNDQ1x1N0FFRilcdTUyMjBcdTk2NjRcdTYzOTJcdTg4NENcdTY5OUNcdTY1NzBcdTYzNkVcclxuICAgICAgICAgKiBAcGFyYW0gc2VuZGVyR3VpZCBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGRlbFJhbmtEYXRhKHNlbmRlckd1aWQ6IHN0cmluZykge1xyXG4gICAgICAgICAgICBjYWxsRnVuYyh0aGlzLm5hbWUsIHRoaXMub25EZWxSYW5rRGF0YS5uYW1lLCBzZW5kZXJHdWlkKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogKFx1NTNDQ1x1N0FFRilcdTc2RDFcdTU0MkNcdTUyMjBcdTk2NjRcdTYzOTJcdTg4NENcdTY5OUNcdTY1NzBcdTYzNkVcclxuICAgICAgICAgKiBAcGFyYW0gY2FsbGJhY2sgXHJcbiAgICAgICAgICogQHJldHVybnMgXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBvbkRlbFJhbmtEYXRhKGNhbGxiYWNrOiAoc2VuZGVyR3VpZDogc3RyaW5nKSA9PiB2b2lkKTogRXZlbnRzLkV2ZW50TGlzdGVuZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gb25GdW5jKHRoaXMubmFtZSwgdGhpcy5vbkRlbFJhbmtEYXRhLm5hbWUsIGNhbGxiYWNrKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcdTYzNjJcdTg4QzVcdTUzNEZcdThCQUVcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGNsYXNzIFByZWZhYkV2dENsb3RoIHtcclxuXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIChcdTVCQTJcdTYyMzdcdTdBRUYpXHU1MkEwXHU4RjdEXHU4OUQyXHU4MjcyXHU0RjUzXHU1NzhCXHJcbiAgICAgICAgICogQHBhcmFtIHNlbmRlckd1aWQgXHU1M0QxXHU5MDAxXHU4MDA1R3VpZFxyXG4gICAgICAgICAqIEBwYXJhbSB0YXJnZXRHdWlkIFx1NzZFRVx1NjgwN1x1NUJGOVx1OEM2MUd1aWRcclxuICAgICAgICAgKiBAcGFyYW0gZHJlc3NSZXNHdWlkIFx1ODhDNVx1NjI2RVx1OEQ0NFx1NkU5MEd1aWRcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGxvYWRSb2xlKHNlbmRlckd1aWQ6IHN0cmluZywgdGFyZ2V0R3VpZDogc3RyaW5nLCBkcmVzc1Jlc0d1aWQ6IHN0cmluZ1tdKSB7XHJcbiAgICAgICAgICAgIGNhbGxMb2NhbEZ1bmModGhpcy5uYW1lLCB0aGlzLm9uTG9hZFJvbGUubmFtZSwgc2VuZGVyR3VpZCwgdGFyZ2V0R3VpZCwgZHJlc3NSZXNHdWlkKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogKFx1NUJBMlx1NjIzN1x1N0FFRilcdTc2RDFcdTU0MkNcdTUyQTBcdThGN0RcdTg5RDJcdTgyNzJcdTRGNTNcdTU3OEJcdTUzNEZcdThCQUVcclxuICAgICAgICAgKiBAcGFyYW0gY2FsbGJhY2sgXHU1NkRFXHU4QzAzXHJcbiAgICAgICAgICogQHJldHVybnMgXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBvbkxvYWRSb2xlKGNhbGxiYWNrOiAoc2VuZGVyR3VpZDogc3RyaW5nLCB0YXJnZXRHdWlkOiBzdHJpbmcsIGRyZXNzUmVzR3VpZDogc3RyaW5nW10pID0+IHZvaWQpOiBFdmVudHMuRXZlbnRMaXN0ZW5lciB7XHJcbiAgICAgICAgICAgIHJldHVybiBvbkZ1bmModGhpcy5uYW1lLCB0aGlzLm9uTG9hZFJvbGUubmFtZSwgY2FsbGJhY2spXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAoXHU1QkEyXHU2MjM3XHU3QUVGKVx1NTJBMFx1OEY3RFx1ODhDNVx1NjI2RVxyXG4gICAgICAgICAqIEBwYXJhbSBzZW5kZXJHdWlkIFx1NTNEMVx1OTAwMVx1ODAwNUd1aWRcclxuICAgICAgICAgKiBAcGFyYW0gdGFyZ2V0R3VpZCBcdTc2RUVcdTY4MDdcdTVCRjlcdThDNjFHdWlkXHJcbiAgICAgICAgICogQHBhcmFtIGRyZXNzUmVzR3VpZCBcdTg4QzVcdTYyNkVcdThENDRcdTZFOTBHdWlkXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBsb2FkQ2xvdGgoc2VuZGVyR3VpZDogc3RyaW5nLCB0YXJnZXRHdWlkOiBzdHJpbmcsIGRyZXNzUmVzR3VpZDogc3RyaW5nW10pIHtcclxuICAgICAgICAgICAgY2FsbExvY2FsRnVuYyh0aGlzLm5hbWUsIHRoaXMub25Mb2FkQ2xvdGgubmFtZSwgc2VuZGVyR3VpZCwgdGFyZ2V0R3VpZCwgZHJlc3NSZXNHdWlkKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogKFx1NUJBMlx1NjIzN1x1N0FFRilcdTc2RDFcdTU0MkNcdTUyQTBcdThGN0RcdTg4QzVcdTYyNkVcclxuICAgICAgICAgKiBAcGFyYW0gY2FsbGJhY2sgXHJcbiAgICAgICAgICogQHJldHVybnMgXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBvbkxvYWRDbG90aChjYWxsYmFjazogKHNlbmRlckd1aWQ6IHN0cmluZywgdGFyZ2V0R3VpZDogc3RyaW5nLCBkcmVzc1Jlc0d1aWQ6IHN0cmluZ1tdKSA9PiB2b2lkKTogRXZlbnRzLkV2ZW50TGlzdGVuZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gb25GdW5jKHRoaXMubmFtZSwgdGhpcy5vbkxvYWRDbG90aC5uYW1lLCBjYWxsYmFjaylcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIChcdTVCQTJcdTYyMzdcdTdBRUYpXHU1MkEwXHU4RjdEXHU2M0QyXHU2OUZEXHU4RDQ0XHU2RTkwXHJcbiAgICAgICAgICogQHBhcmFtIHNlbmRlckd1aWQgXHU1M0QxXHU5MDAxXHU4MDA1R3VpZFxyXG4gICAgICAgICAqIEBwYXJhbSB0YXJnZXRHdWlkIFx1NzZFRVx1NjgwN1x1NUJGOVx1OEM2MUd1aWRcclxuICAgICAgICAgKiBAcGFyYW0gc2xvdFJlc0d1aWQgXHU2M0QyXHU2OUZEXHU4RDQ0XHU2RTkwR3VpZFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgbG9hZFNsb3Qoc2VuZGVyR3VpZDogc3RyaW5nLCB0YXJnZXRHdWlkOiBzdHJpbmcsIHNsb3RSZXNHdWlkOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgY2FsbExvY2FsRnVuYyh0aGlzLm5hbWUsIHRoaXMub25Mb2FkU2xvdC5uYW1lLCBzZW5kZXJHdWlkLCB0YXJnZXRHdWlkLCBzbG90UmVzR3VpZClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIChcdTVCQTJcdTYyMzdcdTdBRUYpXHU3NkQxXHU1NDJDXHU1MkEwXHU4RjdEXHU2M0QyXHU2OUZEXHU4RDQ0XHU2RTkwXHJcbiAgICAgICAgICogQHBhcmFtIGNhbGxiYWNrIFxyXG4gICAgICAgICAqIEByZXR1cm5zIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgb25Mb2FkU2xvdChjYWxsYmFjazogKHNlbmRlckd1aWQ6IHN0cmluZywgdGFyZ2V0R3VpZDogc3RyaW5nLCBzbG90UmVzR3VpZDogc3RyaW5nKSA9PiB2b2lkKTogRXZlbnRzLkV2ZW50TGlzdGVuZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gb25GdW5jKHRoaXMubmFtZSwgdGhpcy5vbkxvYWRTbG90Lm5hbWUsIGNhbGxiYWNrKVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHU2NTM2XHU5NkM2XHU3MjY5XHU1MzRGXHU4QkFFXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBjbGFzcyBQcmVmYWJFdnRDb2xsZWN0aW9uIHtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogKFx1NUJBMlx1NjIzN1x1N0FFRilcdTYyNTNcdTVGMDBcdTY1MzZcdTk2QzZcdTcyNjlVSVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgb3BlbkNvbGxlY3Rpb25VSSgpIHtcclxuICAgICAgICAgICAgY2FsbExvY2FsRnVuYyh0aGlzLm5hbWUsIHRoaXMub25PcGVuQ29sbGVjdGlvblVJLm5hbWUpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAoXHU1QkEyXHU2MjM3XHU3QUVGKVx1NzZEMVx1NTQyQ1x1NjUzNlx1OTZDNlx1NzI2OVVJXHU4OEFCXHU2MjUzXHU1RjAwXHJcbiAgICAgICAgICogQHBhcmFtIGNhbGxiYWNrIFxyXG4gICAgICAgICAqIEByZXR1cm5zIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgb25PcGVuQ29sbGVjdGlvblVJKGNhbGxiYWNrOiAoKSA9PiB2b2lkKTogRXZlbnRzLkV2ZW50TGlzdGVuZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gb25GdW5jKHRoaXMubmFtZSwgdGhpcy5vbk9wZW5Db2xsZWN0aW9uVUkubmFtZSwgY2FsbGJhY2spXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAoXHU1M0NDXHU3QUVGKVx1ODNCN1x1NUY5N1x1NjUzNlx1OTZDNlx1NzI2OVxyXG4gICAgICAgICAqIEBwYXJhbSBzZW5kZXJHdWlkIFxyXG4gICAgICAgICAqIEBwYXJhbSB0YXJnZXRHdWlkIFxyXG4gICAgICAgICAqIEBwYXJhbSBhdGxhc0lkIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgYWRkQ29sbGVjdGlvbihhdGxhc0lkOiBzdHJpbmcsIGNoYXJHdWlkOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgY2FsbEZ1bmModGhpcy5uYW1lLCB0aGlzLm9uQWRkQ29sbGVjdGlvbi5uYW1lLCBhdGxhc0lkLCBjaGFyR3VpZClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIChcdTUzQ0NcdTdBRUYpXHU4M0I3XHU1M0Q2XHU2MjQwXHU2NzA5XHU1REYyXHU3RUNGXHU2NTM2XHU5NkM2XHU3Njg0XHU3MjY5XHU1NEMxXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBnZXRBbGxDb2xsZWN0aW9uKGNoYXJHdWlkOiBzdHJpbmcpOiBzdHJpbmdbXSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjYWxsRnVuY1Jlcyh0aGlzLm5hbWUsIHRoaXMuZ2V0QWxsQ29sbGVjdGlvbi5uYW1lLCBjaGFyR3VpZClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIChcdTUzQ0NcdTdBRUYpXHU3NkQxXHU1NDJDXHU4M0I3XHU1Rjk3XHU2NTM2XHU5NkM2XHU3MjY5XHJcbiAgICAgICAgICogQHBhcmFtIGNhbGxiYWNrIFx1NTZERVx1OEMwM1xyXG4gICAgICAgICAqIEByZXR1cm5zIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgb25BZGRDb2xsZWN0aW9uKGNhbGxiYWNrOiAoYXRsYXNJZDogc3RyaW5nLCBjaGFyR3VpZDogc3RyaW5nKSA9PiB2b2lkKTogRXZlbnRzLkV2ZW50TGlzdGVuZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gb25GdW5jKHRoaXMubmFtZSwgdGhpcy5vbkFkZENvbGxlY3Rpb24ubmFtZSwgY2FsbGJhY2spXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFByZWZhYkV2dEN1cnJlbmN5IHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAoXHU1M0NDXHU3QUVGKVx1NjUzOVx1NTNEOFx1OEQyN1x1NUUwMVx1NzY4NFx1NTAzQ1xyXG4gICAgICAgICAqIEBwYXJhbSB0YXJnZXRHdWlkIFx1NjUzOVx1NTNEOFx1NzY4NFx1NUJGOVx1OEM2MVxyXG4gICAgICAgICAqIEBwYXJhbSBjdXJyZW5jeUlkIFx1OEQyN1x1NUUwMUlkXHJcbiAgICAgICAgICogQHBhcmFtIGNoYW5nZU51bSBcdTY1MzlcdTUzRDhcdTc2ODRcdTY1NzBcdTc2RUVcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGNoYW5nZUN1cnJlbmN5KHRhcmdldEd1aWQ6IHN0cmluZywgY3VycmVuY3lJZDogbnVtYmVyLCBjaGFuZ2VOdW06IG51bWJlcikge1xyXG4gICAgICAgICAgICBjYWxsRnVuYyh0aGlzLm5hbWUsIHRoaXMub25DaGFuZ2VDdXJyZW5jeS5uYW1lLCB0YXJnZXRHdWlkLCBjdXJyZW5jeUlkLCBjaGFuZ2VOdW0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAoXHU1M0NDXHU3QUVGKVx1NzZEMVx1NTQyQ1x1NjUzOVx1NTNEOFx1OEQyN1x1NUUwMVx1NzY4NFx1NTAzQ1xyXG4gICAgICAgICAqIEBwYXJhbSB0YXJnZXRHdWlkIFx1NjUzOVx1NTNEOFx1NzY4NFx1NUJGOVx1OEM2MVxyXG4gICAgICAgICAqIEBwYXJhbSBjdXJyZW5jeUlkIFx1OEQyN1x1NUUwMUlkXHJcbiAgICAgICAgICogQHBhcmFtIGNoYW5nZU51bSBcdTY1MzlcdTUzRDhcdTc2ODRcdTY1NzBcdTc2RUVcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgc3RhdGljIG9uQ2hhbmdlQ3VycmVuY3koY2FsbGJhY2s6ICh0YXJnZXRHdWlkOiBzdHJpbmcsIGN1cnJlbmN5SWQ6IG51bWJlciwgY2hhbmdlTnVtOiBudW1iZXIsIHJlc051bTogbnVtYmVyKSA9PiB2b2lkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBvbkZ1bmModGhpcy5uYW1lLCB0aGlzLm9uQ2hhbmdlQ3VycmVuY3kubmFtZSwgY2FsbGJhY2spXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBcdUZGMDhcdTUzQ0NcdTdBRUZcdUZGMDlcdTZEODhcdThEMzlcclxuICAgICAgICAgKiBAcGFyYW0gdGFyZ2V0R3VpZCBcdTc2RUVcdTY4MDdndWlkXHJcbiAgICAgICAgICogQHBhcmFtIGN1cnJlbmN5SWQgXHU4RDI3XHU1RTAxSWRcclxuICAgICAgICAgKiBAcGFyYW0gcHJpY2UgXHU0RUY3XHU0RjREXHJcbiAgICAgICAgICogQHJldHVybnMgXHU2NjJGXHU1NDI2XHU2RDg4XHU4RDM5XHU2MjEwXHU1MjlGXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBhc3luYyBidXlXaXRoQ3VycmVuY3kodGFyZ2V0R3VpZDogc3RyaW5nLCBjdXJyZW5jeUlkOiBudW1iZXIsIHByaWNlOiBudW1iZXIpOiBQcm9taXNlPGJvb2xlYW4+IHtcclxuICAgICAgICAgICAgaWYgKFN5c3RlbVV0aWwuaXNDbGllbnQoKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGF3YWl0IE1vZHVsZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNb2R1bGUoUHJlZmFiRXZlbnRNb2R1bGVDKS5idXlXaXRoQ3VycmVuY3kodGFyZ2V0R3VpZCwgY3VycmVuY3lJZCwgcHJpY2UpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYXdhaXQgTW9kdWxlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1vZHVsZShQcmVmYWJFdmVudE1vZHVsZVMpLm5ldF9CdXlXaXRoQ3VycmVuY3kodGFyZ2V0R3VpZCwgY3VycmVuY3lJZCwgcHJpY2UpXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAoXHU1M0NDXHU3QUVGKVxyXG4gICAgICAgICAqIEBwYXJhbSB0YXJnZXRHdWlkIFx1NzZFRVx1NjgwN2d1aWQgXHJcbiAgICAgICAgICogQHBhcmFtIGN1cnJlbmN5SWQgXHU4RDI3XHU1RTAxaWRcclxuICAgICAgICAgKiBAcmV0dXJucyBcdThEMjdcdTVFMDFcdTUwM0NcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGdldEN1cnJlbmN5TnVtKHRhcmdldEd1aWQ6IHN0cmluZywgY3VycmVuY3lJZDogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIGNhbGxGdW5jUmVzKHRoaXMubmFtZSwgdGhpcy5nZXRDdXJyZW5jeU51bS5uYW1lLCB0YXJnZXRHdWlkLCBjdXJyZW5jeUlkKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiogXHU1QkEwXHU3MjY5XHU3NkY4XHU1MTczXHU0RThCXHU0RUY2ICovXHJcbiAgICBleHBvcnQgY2xhc3MgUHJlZmFiRXZ0UGV0IHtcclxuICAgICAgICAvKiogXHU2MjUzXHU1RjAwXHU1QkEwXHU3MjY5XHU3NTRDXHU5NzYyICovXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBvcGVuVUkoKSB7XHJcbiAgICAgICAgICAgIGNhbGxMb2NhbEZ1bmModGhpcy5uYW1lLCB0aGlzLm9wZW5VSS5uYW1lKVxyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBcdTZERkJcdTUyQTBcdTVCQTBcdTcyNjlcclxuICAgICAgICAgKiBAcGFyYW0gdGFyZ2V0R3VpZCBcdTczQTlcdTVCQjZcdTg5RDJcdTgyNzJndWlkXHJcbiAgICAgICAgICogQHBhcmFtIHBldENmZ0lkIFx1NUJBMFx1NzI2OVx1OTE0RFx1N0Y2RVx1ODg2OGlkIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgYWRkUGV0KHRhcmdldEd1aWQ6IHN0cmluZywgcGV0Q2ZnSWQ6IG51bWJlcikge1xyXG4gICAgICAgICAgICBjb25zdCByZXMgPSBjYWxsRnVuYyh0aGlzLm5hbWUsIHRoaXMuYWRkUGV0Lm5hbWUsIHRhcmdldEd1aWQsIHBldENmZ0lkKVxyXG4gICAgICAgICAgICByZXR1cm4gcmVzXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICBcdTc5RkJcdTk2NjRcdTVCQTBcdTcyNjlcclxuICAgICAgICAgKiBAcGFyYW0gdGFyZ2V0R3VpZCAgICBcdTczQTlcdTVCQjZcdTg5RDJcdTgyNzJndWlkXHJcbiAgICAgICAgICogQHBhcmFtIHBldElkICAgICAgIFx1NUJBMFx1NzI2OWd1aWRcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHJlbW92ZVBldCh0YXJnZXRHdWlkOiBzdHJpbmcsIHBldElkOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgY29uc3QgcmVzID0gY2FsbEZ1bmModGhpcy5uYW1lLCB0aGlzLnJlbW92ZVBldC5uYW1lLCB0YXJnZXRHdWlkLCBwZXRJZClcclxuICAgICAgICAgICAgcmV0dXJuIHJlc1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBcdTkwNDdcdTUyMzBcdTcwQjlcdTk1RUVcdTk4OThcdTRFMERcdTc3RTVcdTkwNTNcdTYwMEVcdTRFNDhcdTgzQjdcdTUzRDZcdTVCQTBcdTcyNjlcdTUyMTdcdTg4NjhcclxuICAgICAgICAvLyBwdWJsaWMgc3RhdGljIGdldFBldHModGFyZ2V0R3VpZDogc3RyaW5nKTogc3RyaW5nW10ge1xyXG4gICAgICAgIC8vICAgICBjb25zdCByZXMgPSBjYWxsRnVuY1Jlcyh0aGlzLm5hbWUsIHRoaXMuZ2V0UGV0cy5uYW1lLCB0YXJnZXRHdWlkKVxyXG4gICAgICAgIC8vICAgICByZXR1cm4gcmVzXHJcbiAgICAgICAgLy8gfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiBcdTg4QzVcdTYyNkVcdTc2RjhcdTUxNzNcdTRFOEJcdTRFRjYgKi9cclxuICAgIGV4cG9ydCBjbGFzcyBQcmVmYWJFdnREcmVzcyB7XHJcbiAgICAgICAgLyoqIFx1NjI1M1x1NUYwMFx1ODhDNVx1NjI2RVx1NzU0Q1x1OTc2MiAqL1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgb3BlblVJKCkge1xyXG4gICAgICAgICAgICBjYWxsTG9jYWxGdW5jKHRoaXMubmFtZSwgdGhpcy5vcGVuVUkubmFtZSlcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqIFx1NkRGQlx1NTJBMFx1ODhDNVx1NjI2RSAqL1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgYWRkRHJlc3ModGFyZ2V0R3VpZDogc3RyaW5nLCBkcmVzc0NmZ0lkOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgY29uc3QgcmVzID0gY2FsbEZ1bmModGhpcy5uYW1lLCB0aGlzLmFkZERyZXNzLm5hbWUsIHRhcmdldEd1aWQsIGRyZXNzQ2ZnSWQpXHJcbiAgICAgICAgICAgIHJldHVybiByZXNcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpbml0RXZlbnQoKVxyXG5cclxufVxyXG4iLCAiLypcclxuKiBAQXV0aG9yOiBjaGVuLmxpYW5nIGNoZW4ubGlhbmdAYXBwc2hhaGUuY29tXHJcbiogQERhdGU6IDIwMjMtMDUtMDQgMTQ6MTc6MjVcclxuKiBATGFzdEVkaXRvcnM6IGNoZW4ubGlhbmcgY2hlbi5saWFuZ0BhcHBzaGFoZS5jb21cclxuKiBATGFzdEVkaXRUaW1lOiAyMDIzLTA3LTE4IDE4OjQzOjIxXHJcbiogQEZpbGVQYXRoOiBcXGNvbW1vbnByZWZhYlxcSmF2YVNjcmlwdHNcXFByZWZhYnNcXHByZWZhYkV2ZW50XFxVdGlsc1xcTWFwRXgudHNcclxuKiBARGVzY3JpcHRpb246IFxyXG4qL1xyXG5cclxuaW1wb3J0IHsgUHJlZmFiRXZlbnQgfSBmcm9tIFwiLi9QcmVmYWJFdmVudFwiXHJcbi8qKlxyXG4gKiBNYXBFeChcdTUzRUZcdTVFOEZcdTUyMTdcdTUzMTYpXHJcbiovXHJcbmV4cG9ydCBuYW1lc3BhY2UgTWFwRXgge1xyXG5cclxuICAgIGV4cG9ydCB0eXBlIE1hcEV4Q2xhc3M8VD4gPSB7XHJcbiAgICAgICAgW2tleTogc3RyaW5nIHwgbnVtYmVyXTogVFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHU2NjJGXHU1NDI2XHU0RTNBXHU3QTdBXHJcbiAgICAgKiBAcGFyYW0gbWFwIFxyXG4gICAgICogQHJldHVybnMgXHU2NjJGL1x1NTQyNiBcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGlzTnVsbDxUPihtYXA6IE1hcEV4Q2xhc3M8VD4pOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gIW1hcCB8fCBtYXAgPT0gbnVsbCB8fCBtYXAgPT0gdW5kZWZpbmVkXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcdTgzQjdcdTUzRDZcdTVCRjlcdThDNjFcclxuICAgICAqIEBwYXJhbSBtYXAgXHJcbiAgICAgKiBAcGFyYW0ga2V5IFxyXG4gICAgICogQHJldHVybnMgXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBnZXQ8VD4obWFwOiBNYXBFeENsYXNzPFQ+LCBrZXk6IHN0cmluZyB8IG51bWJlcik6IFQge1xyXG5cclxuICAgICAgICBpZiAobWFwW2tleV0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIG1hcFtrZXldXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgaGFzID0gZmFsc2VcclxuICAgICAgICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKG1hcClcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aCA7KytpKSB7XHJcbiAgICAgICAgICAgIGlmIChrZXlzW2ldID09IGtleSkge1xyXG4gICAgICAgICAgICAgICAgaGFzID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGhhcykge1xyXG4gICAgICAgICAgICByZXR1cm4gbWFwW2tleV1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGxcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcdThCQkVcdTdGNkVcdTVCRjlcdThDNjFcclxuICAgICAqIEBwYXJhbSBtYXAgXHJcbiAgICAgKiBAcGFyYW0ga2V5IFxyXG4gICAgICogQHBhcmFtIHZhbCBcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIHNldDxUPihtYXA6IE1hcEV4Q2xhc3M8VD4sIGtleTogc3RyaW5nIHwgbnVtYmVyLCB2YWw6IFQpIHtcclxuXHJcbiAgICAgICAgbWFwW2tleV0gPSB2YWxcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcdTUyMjBcdTk2NjRcdTVCRjlcdThDNjFcclxuICAgICAqIEBwYXJhbSBtYXAgXHJcbiAgICAgKiBAcGFyYW0ga2V5IFxyXG4gICAgICogQHJldHVybnMgXHU2MjEwXHU1MjlGL1x1NTkzMVx1OEQyNVxyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gZGVsPFQ+KG1hcDogTWFwRXhDbGFzczxUPiwga2V5OiBzdHJpbmcgfCBudW1iZXIpOiBib29sZWFuIHtcclxuXHJcbiAgICAgICAgaWYgKG1hcFtrZXldKSB7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBtYXBba2V5XVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGhhcyA9IGZhbHNlXHJcbiAgICAgICAgbGV0IGtleXMgPSBPYmplY3Qua2V5cyhtYXApXHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICBpZiAoa2V5c1tpXSA9PSBrZXkpIHtcclxuICAgICAgICAgICAgICAgIGhhcyA9IHRydWVcclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChoYXMpIHtcclxuICAgICAgICAgICAgZGVsZXRlIG1hcFtrZXldXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHU2NjJGXHU1NDI2XHU2NzA5XHU2MzA3XHU1QjlBXHU1QkY5XHU4QzYxXHJcbiAgICAgKiBAcGFyYW0gbWFwIFxyXG4gICAgICogQHBhcmFtIGtleSBcclxuICAgICAqIEByZXR1cm5zIFxyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gaGFzPFQ+KG1hcDogTWFwRXhDbGFzczxUPiwga2V5OiBzdHJpbmcgfCBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAobWFwW2tleV0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBoYXMgPSBmYWxzZVxyXG4gICAgICAgIGxldCBrZXlzID0gT2JqZWN0LmtleXMobWFwKVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMCA7aSA8IGtleXMubGVuZ3RoIDsrK2kpIHtcclxuICAgICAgICAgICAgaWYgKGtleXNbaV0gPT0ga2V5KSB7XHJcbiAgICAgICAgICAgICAgICBoYXMgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaGFzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHU4M0I3XHU1M0Q2Y291bnRcdTY1NzBcdTkxQ0ZcclxuICAgICAqIEBwYXJhbSBtYXAgXHJcbiAgICAgKiBAcGFyYW0ga2V5IFxyXG4gICAgICogQHJldHVybnMgXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBjb3VudDxUPihtYXA6IE1hcEV4Q2xhc3M8VD4pOiBudW1iZXIge1xyXG4gICAgICAgIGxldCByZXMgPSAwXHJcbiAgICAgICAgZm9yRWFjaChtYXAsIGUgPT4ge1xyXG4gICAgICAgICAgICArK3Jlc1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIHJlc1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHU5MDREXHU1Mzg2bWFwXHJcbiAgICAgKiBAcGFyYW0gbWFwIFxyXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIFxyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gZm9yRWFjaDxUPihtYXA6IE1hcEV4Q2xhc3M8VD4sIGNhbGxiYWNrOiAoa2V5OiBzdHJpbmcgfCBudW1iZXIsIGVsZW1lbnQ6IFQpID0+IHZvaWQpIHtcclxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gbWFwKSB7XHJcbiAgICAgICAgICAgIGlmIChtYXBba2V5XSkge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soa2V5LCBtYXBba2V5XSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFx1NjJGN1x1OEQxRFx1RkYwQ1ZhbFx1OEZEOFx1NjYyRlx1NUYxNVx1NzUyOFx1NTFGQVx1Njc2NVx1NzY4NFx1RkYwQ1x1NTNFQVx1NjYyRk1hcFx1NjM2Mlx1NEU4NlxyXG4gICAgICogQHBhcmFtIG1hcCBcclxuICAgICAqIEByZXR1cm5zIFxyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gY29weTxUPihtYXA6IE1hcEV4Q2xhc3M8VD4pOiBNYXBFeENsYXNzPFQ+IHtcclxuICAgICAgICBsZXQgcmVzID0ge31cclxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gbWFwKSB7XHJcbiAgICAgICAgICAgIHJlc1trZXldID0gbWFwW2tleV1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc1xyXG4gICAgfVxyXG5cclxufVxyXG5jbGFzcyBEQlNhdmVCYXNlIHtcclxuICAgIHB1YmxpYyB2YWx1ZTogYW55XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBQcmVmYWJFdmVudE1vZHVsZURhdGEgZXh0ZW5kcyBTdWJkYXRhIHtcclxuXHJcbiAgICBARGVjb3JhdG9yLnNhdmVQcm9wZXJ0eVxyXG4gICAgcHVibGljIGNhY2hlRGF0YTogTWFwRXguTWFwRXhDbGFzczxzdHJpbmc+ID0gbnVsbFxyXG5cclxuICAgIHByb3RlY3RlZCBpbml0RGVmYXVsdERhdGEoKTogdm9pZCB7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmNhY2hlRGF0YSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FjaGVEYXRhID0ge31cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHU4QkJFXHU3RjZFVmFsdWVcclxuICAgICAqIEBwYXJhbSBrZXkgXHJcbiAgICAgKiBAcGFyYW0gdmFsIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0VmFsdWUoa2V5OiBzdHJpbmcsIHZhbDogYW55KSB7XHJcbiAgICAgICAgbGV0IGRhdGEgPSBuZXcgREJTYXZlQmFzZSgpXHJcbiAgICAgICAgZGF0YS52YWx1ZSA9IHZhbFxyXG4gICAgICAgIGxldCBkYXRhU3RyID0gSlNPTi5zdHJpbmdpZnkoZGF0YSlcclxuICAgICAgICBNYXBFeC5zZXQodGhpcy5jYWNoZURhdGEsIGtleSwgZGF0YVN0cilcclxuICAgICAgICB0aGlzLnNhdmUodHJ1ZSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFx1ODNCN1x1NTNENlZhbHVlXHJcbiAgICAgKiBAcGFyYW0ga2V5IFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0VmFsdWU8VD4oa2V5OiBzdHJpbmcpOiBUIHtcclxuICAgICAgICBpZiAoIU1hcEV4Lmhhcyh0aGlzLmNhY2hlRGF0YSwga2V5KSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbFxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgdmFsdWUgPSBNYXBFeC5nZXQodGhpcy5jYWNoZURhdGEsIGtleSlcclxuICAgICAgICBsZXQgcmVzID0gSlNPTi5wYXJzZSh2YWx1ZSkgYXMgREJTYXZlQmFzZVxyXG4gICAgICAgIHJldHVybiByZXMudmFsdWVcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbkBDb3JlLlR5cGVcclxuY2xhc3MgUHJlZmFiRXZlbnRBaXJwb3J0RGF0YSB7XHJcblxyXG4gICAgcHVibGljIGNhY2hlRGF0YTogTWFwRXguTWFwRXhDbGFzczxzdHJpbmc+ID0ge31cclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoX2NhY2hlRGF0YT86IGFueSkge1xyXG4gICAgICAgIGlmIChfY2FjaGVEYXRhICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5jYWNoZURhdGEgPSBfY2FjaGVEYXRhXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHU4QkJFXHU3RjZFVmFsdWVcclxuICAgICAqIEBwYXJhbSBrZXkgXHJcbiAgICAgKiBAcGFyYW0gdmFsIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0VmFsdWUoa2V5OiBzdHJpbmcsIHZhbDogYW55KSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJbUEZdc2V0IFZhbGUgOiBcIiArIGtleSArIFwiID0+IFwiICsgdmFsKVxyXG4gICAgICAgIGxldCBkYXRhID0gbmV3IERCU2F2ZUJhc2UoKVxyXG4gICAgICAgIGRhdGEudmFsdWUgPSB2YWxcclxuICAgICAgICBsZXQgZGF0YVN0ciA9IEpTT04uc3RyaW5naWZ5KGRhdGEpXHJcbiAgICAgICAgTWFwRXguc2V0KHRoaXMuY2FjaGVEYXRhLCBrZXksIGRhdGFTdHIpXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcdTgzQjdcdTUzRDZWYWx1ZVxyXG4gICAgICogQHBhcmFtIGtleSBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFZhbHVlPFQ+KGtleTogc3RyaW5nKTogVCB7XHJcbiAgICAgICAgaWYgKCFNYXBFeC5oYXModGhpcy5jYWNoZURhdGEsIGtleSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGxcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHZhbHVlID0gTWFwRXguZ2V0KHRoaXMuY2FjaGVEYXRhLCBrZXkpXHJcbiAgICAgICAgbGV0IHJlcyA9IEpTT04ucGFyc2UodmFsdWUpIGFzIERCU2F2ZUJhc2VcclxuICAgICAgICByZXR1cm4gcmVzLnZhbHVlXHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUHJlZmFiRXZlbnRNb2R1bGVDIGV4dGVuZHMgTW9kdWxlQzxQcmVmYWJFdmVudE1vZHVsZVMsIFByZWZhYkV2ZW50TW9kdWxlRGF0YT4ge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHU3QTdBXHU0RTJEXHU2NTcwXHU2MzZFXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhaXJEYXRhOiBNYXBFeC5NYXBFeENsYXNzPFByZWZhYkV2ZW50QWlycG9ydERhdGE+ID0ge31cclxuXHJcbiAgICBvblN0YXJ0KCkge1xyXG4gICAgICAgIFByZWZhYkV2ZW50LlByZWZhYkV2dFBsYXllclN0YXQub25TZXRQbGF5ZXJTdGF0KChzZW5kZXJHdWlkOiBzdHJpbmcsIHRhcmdldEd1aWQ6IHN0cmluZywgc3RhdDogUHJlZmFiRXZlbnQuUGxheWVyU3RhdFR5cGUpID0+IHtcclxuICAgICAgICAgICAgbGV0IGNoYXIgPSBHYW1lcGxheS5nZXRDdXJyZW50UGxheWVyKCkuY2hhcmFjdGVyXHJcbiAgICAgICAgICAgIGlmICh0YXJnZXRHdWlkID09IGNoYXIuZ3VpZCkge1xyXG4gICAgICAgICAgICAgICAgLy9sZXQgcHJlZmFiRXZlVUkgPSBVSS5VSU1hbmFnZXIuaW5zdGFuY2UuZ2V0VUkoUHJlZmFiRXZ0VUkpXHJcbiAgICAgICAgICAgICAgICBpZiAoc3RhdCA9PSBQcmVmYWJFdmVudC5QbGF5ZXJTdGF0VHlwZS5GbHlpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICBjaGFyLnN3aXRjaFRvRmx5aW5nKClcclxuICAgICAgICAgICAgICAgICAgICAvL1VJLlVJTWFuYWdlci5pbnN0YW5jZS5zaG93VUkocHJlZmFiRXZlVUkpXHJcbiAgICAgICAgICAgICAgICAgICAgLy9wcmVmYWJFdmVVSS5zZXRGbHlDYW52YXModHJ1ZSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHN0YXQgPT0gUHJlZmFiRXZlbnQuUGxheWVyU3RhdFR5cGUuV2Fsa2luZykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNoYXIuc3dpdGNoVG9XYWxraW5nKClcclxuICAgICAgICAgICAgICAgICAgICAvL1VJLlVJTWFuYWdlci5pbnN0YW5jZS5oaWRlVUkocHJlZmFiRXZlVUkpXHJcbiAgICAgICAgICAgICAgICAgICAgLy9wcmVmYWJFdmVVSS5zZXRGbHlDYW52YXMoZmFsc2UpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHU1NDBDXHU2QjY1XHU3QTdBXHU0RTJEXHU2NTcwXHU2MzZFXHJcbiAgICAgKiBAcGFyYW0gZGF0YSBcclxuICAgICAqL1xyXG4gICAgcHVibGljIG5ldF9TeW5jQWlyRGF0YShkYXRhOiBzdHJpbmcpIHtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJbUEZdIHN5bmMgYWlyIGRhdGEgOiBcIiArIGRhdGEpXHJcbiAgICAgICAgdGhpcy5haXJEYXRhID0gSlNPTi5wYXJzZShkYXRhKVxyXG4gICAgICAgIE1hcEV4LmZvckVhY2godGhpcy5haXJEYXRhLCAoaywgdikgPT4ge1xyXG5cclxuICAgICAgICAgICAgTWFwRXguc2V0KHRoaXMuYWlyRGF0YSwgaywgbmV3IFByZWZhYkV2ZW50QWlycG9ydERhdGEodi5jYWNoZURhdGEpKVxyXG5cclxuICAgICAgICB9KVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFx1NTQwQ1x1NkI2NVx1NjcwRFx1NTJBMVx1NTY2OFx1N0E3QVx1NEUyRFx1NjU3MFx1NjM2RVxyXG4gICAgICogQHBhcmFtIHRhcmdldEd1aWQgXHJcbiAgICAgKiBAcGFyYW0ga2V5IFxyXG4gICAgICogQHBhcmFtIGRhdGEgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBuZXRfU2V0RGF0YSh0YXJnZXRHdWlkOiBzdHJpbmcsIGtleTogc3RyaW5nLCBkYXRhOiBhbnkpIHtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJcdTVCQTJcdTYyMzdcdTdBRUYgbmV0X1NldERhdGEgOiBcIiArIGtleSArIFwiID0+IFwiICsgZGF0YSlcclxuXHJcbiAgICAgICAgaWYgKCFNYXBFeC5oYXModGhpcy5haXJEYXRhLCB0YXJnZXRHdWlkKSkge1xyXG4gICAgICAgICAgICBNYXBFeC5zZXQodGhpcy5haXJEYXRhLCB0YXJnZXRHdWlkLCBuZXcgUHJlZmFiRXZlbnRBaXJwb3J0RGF0YShudWxsKSlcclxuICAgICAgICB9XHJcbiAgICAgICAgTWFwRXguZ2V0KHRoaXMuYWlyRGF0YSwgdGFyZ2V0R3VpZCkuc2V0VmFsdWUoa2V5LCBkYXRhKVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFx1ODNCN1x1NTNENlx1N0E3QVx1NEUyRFx1NjU3MFx1NjM2RVxyXG4gICAgICogQHBhcmFtIHRhcmdldEd1aWQgXHJcbiAgICAgKiBAcGFyYW0ga2V5IFxyXG4gICAgICogQHJldHVybnMgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXREYXRhPFQ+KHRhcmdldEd1aWQ6IHN0cmluZywga2V5OiBzdHJpbmcpOiBUIHtcclxuICAgICAgICBsZXQgcmVzOiBUID0gbnVsbFxyXG5cclxuICAgICAgICBpZiAoIU1hcEV4LmdldCh0aGlzLmFpckRhdGEsIHRhcmdldEd1aWQpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZXNcclxuICAgICAgICB9XHJcbiAgICAgICAgcmVzID0gTWFwRXguZ2V0KHRoaXMuYWlyRGF0YSwgdGFyZ2V0R3VpZCkuZ2V0VmFsdWUoa2V5KSBhcyBUXHJcblxyXG4gICAgICAgIHJldHVybiByZXNcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIChcdTUzQ0NcdTdBRUYpXHU4M0I3XHU1M0Q2XHU3M0E5XHU1QkI2XHU0RkUxXHU2MDZGXHJcbiAgICAgKiBAcGFyYW0gc2VuZGVyR3VpZCBcdTUzRDFcdThENzdcdTVCRjlcdThDNjFHdWlkXHJcbiAgICAgKiBAcGFyYW0gdGFyZ2V0R3VpZCBcdTc2RUVcdTY4MDdcdTVCRjlcdThDNjFHdWlkXHJcbiAgICAgKiBAcGFyYW0gdmFsIFx1NTAzQ1xyXG4gICAgICogQHBhcmFtIGluZm9UeXBlIFx1NEZFMVx1NjA2Rlx1N0M3Qlx1NTc4QlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0UGxheWVySW5mbyhjbGF6ek5hbWU6IHN0cmluZywgdGFyZ2V0R3VpZDogc3RyaW5nLCBpbmZvVHlwZTogUHJlZmFiRXZlbnQuUGxheWVySW5mb1R5cGUgfCBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgY2hhciA9IENvcmUuR2FtZU9iamVjdC5maW5kKHRhcmdldEd1aWQpXHJcbiAgICAgICAgaWYgKGNoYXIgaW5zdGFuY2VvZiBHYW1lcGxheS5DaGFyYWN0ZXIpIHtcclxuICAgICAgICAgICAgaWYgKGNoYXIucGxheWVyKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLmRhdGE/LmdldFZhbHVlKGNsYXp6TmFtZSArIGluZm9UeXBlKVxyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyh2YWx1ZSArIFwiOlwiICsgY2xhenpOYW1lICsgaW5mb1R5cGUpXHJcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT0gbnVsbCkgdmFsdWUgPSAwXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHU4M0I3XHU1M0Q2XHU3M0E5XHU1QkI2XHU1QzVFXHU2MDI3XHJcbiAgICAgKiBAcGFyYW0gdGFyZ2V0R3VpZCBcclxuICAgICAqIEBwYXJhbSB2YWwgXHJcbiAgICAgKiBAcGFyYW0gYXR0clR5cGUgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRBdHRyVmFsKGNsYXp6TmFtZTogc3RyaW5nLCB0YXJnZXRHdWlkOiBzdHJpbmcsIGF0dHJUeXBlOiBQcmVmYWJFdmVudC5BdHRyVHlwZSk6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IGN1clZhbCA9IHRoaXMuZ2V0RGF0YTxudW1iZXI+KHRhcmdldEd1aWQsIGNsYXp6TmFtZSArIGF0dHJUeXBlKVxyXG4gICAgICAgIGlmIChjdXJWYWwgPT0gbnVsbCkgY3VyVmFsID0gMFxyXG4gICAgICAgIC8vY29uc29sZS5lcnJvcihcIlx1ODNCN1x1NTNENlx1NzNBOVx1NUJCNlx1NUM1RVx1NjAyNyA6IFwiICsgYXR0clR5cGUgKyBcIiA6IFwiICsgY3VyVmFsKVxyXG4gICAgICAgIHJldHVybiBjdXJWYWxcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICogXHU4M0I3XHU1M0Q2XHU3M0E5XHU1QkI2XHU3MkI2XHU2MDAxXHJcbiAgICAqIEBwYXJhbSBjbGF6ek5hbWUgXHJcbiAgICAqIEBwYXJhbSB0YXJnZXRHdWlkIFxyXG4gICAgKiBAcmV0dXJucyBcclxuICAgICovXHJcbiAgICBwdWJsaWMgZ2V0UGxheWVyU3RhdChjbGF6ek5hbWU6IHN0cmluZywgdGFyZ2V0R3VpZDogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IGN1clZhbCA9IHRoaXMuZ2V0RGF0YShjbGF6ek5hbWUsIHRhcmdldEd1aWQpXHJcbiAgICAgICAgaWYgKGN1clZhbCA9PSBudWxsKSBjdXJWYWwgPSAwXHJcbiAgICAgICAgLy9jb25zb2xlLmVycm9yKFwiXHU4M0I3XHU1M0Q2XHU3M0E5XHU1QkI2XHU3MkI2XHU2MDAxIDogXCIgKyBjdXJWYWwpXHJcbiAgICAgICAgcmV0dXJuIGN1clZhbFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogKFx1NTNDQ1x1N0FFRilcdTgzQjdcdTUzRDZcdTUxNzNcdTUzNjFcclxuICAgICAqIEBwYXJhbSB0YXJnZXRHdWlkIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0UmVjb3JkUG9pbnQoY2xhenpOYW1lOiBzdHJpbmcsIHRhcmdldEd1aWQ6IHN0cmluZyk6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IGNoYXIgPSBDb3JlLkdhbWVPYmplY3QuZmluZCh0YXJnZXRHdWlkKVxyXG4gICAgICAgIGlmIChjaGFyIGluc3RhbmNlb2YgR2FtZXBsYXkuQ2hhcmFjdGVyKSB7XHJcbiAgICAgICAgICAgIGlmIChjaGFyLnBsYXllcikge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRidmFsID0gdGhpcy5kYXRhPy5nZXRWYWx1ZShjbGF6ek5hbWUgKyBcInJlY29yZFwiKSBhcyBudW1iZXJcclxuICAgICAgICAgICAgICAgIGlmIChkYnZhbCA9PSBudWxsKSBkYnZhbCA9IDBcclxuICAgICAgICAgICAgICAgIHJldHVybiBkYnZhbFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHU4M0I3XHU1M0Q2XHU1RjUzXHU1MjREXHU3Njg0XHU4RDI3XHU1RTAxXHU2NTcwXHU3NkVFXHJcbiAgICAgKiBAcGFyYW0gY2xhenpOYW1lIFxyXG4gICAgICogQHBhcmFtIHRhcmdldEd1aWQgXHJcbiAgICAgKiBAcGFyYW0gY3VycmVuY3lJZCBcclxuICAgICAqIEByZXR1cm5zIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0Q3VycmVuY3lOdW0oY2xhenpOYW1lOiBzdHJpbmcsIHRhcmdldEd1aWQ6IHN0cmluZywgY3VycmVuY3lJZDogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgY2hhciA9IENvcmUuR2FtZU9iamVjdC5maW5kKHRhcmdldEd1aWQpXHJcbiAgICAgICAgaWYgKGNoYXIgaW5zdGFuY2VvZiBHYW1lcGxheS5DaGFyYWN0ZXIpIHtcclxuICAgICAgICAgICAgaWYgKGNoYXIucGxheWVyKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLmRhdGE/LmdldFZhbHVlKGNsYXp6TmFtZSArIGN1cnJlbmN5SWQpIGFzIG51bWJlclxyXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlID09IG51bGwpIHZhbHVlID0gMFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGxcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFx1NzUyOFx1OEQyN1x1NUUwMVx1NEU3MFx1NEUxQ1x1ODk3RlxyXG4gICAgICogQHBhcmFtIHRhcmdldEd1aWQgXHU4RDJEXHU0RTcwXHU4MDA1XHJcbiAgICAgKiBAcGFyYW0gY3VycmVuY3lJZCBcdThEMjdcdTVFMDFpZFxyXG4gICAgICogQHBhcmFtIHByaWNlIFx1NEVGN1x1NjgzQ1xyXG4gICAgICogQHJldHVybnMgXHU2NjJGXHU1NDI2XHU4RDJEXHU0RTcwXHU2MjEwXHU1MjlGXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhc3luYyBidXlXaXRoQ3VycmVuY3kodGFyZ2V0R3VpZDogc3RyaW5nLCBjdXJyZW5jeUlkOiBudW1iZXIsIHByaWNlOiBudW1iZXIpOiBQcm9taXNlPGJvb2xlYW4+IHtcclxuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5zZXJ2ZXIubmV0X0J1eVdpdGhDdXJyZW5jeSh0YXJnZXRHdWlkLCBjdXJyZW5jeUlkLCBwcmljZSlcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFByZWZhYkV2ZW50TW9kdWxlUyBleHRlbmRzIE1vZHVsZVM8UHJlZmFiRXZlbnRNb2R1bGVDLCBQcmVmYWJFdmVudE1vZHVsZURhdGE+IHtcclxuXHJcbiAgICBwdWJsaWMgYWlyRGF0YTogTWFwRXguTWFwRXhDbGFzczxQcmVmYWJFdmVudEFpcnBvcnREYXRhPiA9IHt9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcdTczQTlcdTVCQjZcdThGREJcdTUxNjVcdTZFMzhcdTYyMEZcclxuICAgICAqIEBwYXJhbSBwbGF5ZXIgXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBvblBsYXllckVudGVyR2FtZShwbGF5ZXI6IEdhbWVwbGF5LlBsYXllcik6IHZvaWQge1xyXG4gICAgICAgIC8vIFx1NTQwQ1x1NkI2NVx1NEUwMFx1NkIyMVx1N0E3QVx1NEUyRFx1NjU3MFx1NjM2RVxyXG4gICAgICAgIHRoaXMuZ2V0Q2xpZW50KHBsYXllcikubmV0X1N5bmNBaXJEYXRhKEpTT04uc3RyaW5naWZ5KHRoaXMuYWlyRGF0YSkpXHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uUGxheWVyTGVmdChwbGF5ZXI6IEdhbWVwbGF5LlBsYXllcik6IHZvaWQge1xyXG4gICAgICAgIGlmIChNYXBFeC5oYXModGhpcy5haXJEYXRhLCBwbGF5ZXIuY2hhcmFjdGVyLmd1aWQpKSB7XHJcbiAgICAgICAgICAgIE1hcEV4LmRlbCh0aGlzLmFpckRhdGEsIHBsYXllci5jaGFyYWN0ZXIuZ3VpZClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHU4QkJFXHU3RjZFXHU3M0E5XHU1QkI2XHU3QTdBXHU0RTJEXHU2NTcwXHU2MzZFXHJcbiAgICAgKiBAcGFyYW0gdGFyZ2V0R3VpZCBcclxuICAgICAqIEBwYXJhbSBrZXkgXHJcbiAgICAgKiBAcGFyYW0gZGF0YSBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldERhdGE8VD4odGFyZ2V0R3VpZDogc3RyaW5nLCBrZXk6IHN0cmluZywgZGF0YTogVCkge1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIltQRjpdbmV0X1NldERhdGFcIilcclxuICAgICAgICB0aGlzLmdldEFsbENsaWVudCgpLm5ldF9TZXREYXRhKHRhcmdldEd1aWQsIGtleSwgZGF0YSlcclxuXHJcbiAgICAgICAgaWYgKCFNYXBFeC5oYXModGhpcy5haXJEYXRhLCB0YXJnZXRHdWlkKSkge1xyXG4gICAgICAgICAgICBNYXBFeC5zZXQodGhpcy5haXJEYXRhLCB0YXJnZXRHdWlkLCBuZXcgUHJlZmFiRXZlbnRBaXJwb3J0RGF0YSgpKVxyXG4gICAgICAgIH1cclxuICAgICAgICBNYXBFeC5nZXQodGhpcy5haXJEYXRhLCB0YXJnZXRHdWlkKS5zZXRWYWx1ZShrZXksIGRhdGEpXHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHU4M0I3XHU1M0Q2XHU3M0E5XHU1QkI2XHU3QTdBXHU0RTJEXHU2NTcwXHU2MzZFXHJcbiAgICAgKiBAcGFyYW0gdGFyZ2V0R3VpZCBcclxuICAgICAqIEBwYXJhbSBrZXkgXHJcbiAgICAgKiBAcmV0dXJucyBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldERhdGE8VD4odGFyZ2V0R3VpZDogc3RyaW5nLCBrZXk6IHN0cmluZyk6IFQge1xyXG4gICAgICAgIGxldCByZXM6IFQgPSBudWxsXHJcblxyXG4gICAgICAgIGlmICghTWFwRXguZ2V0KHRoaXMuYWlyRGF0YSwgdGFyZ2V0R3VpZCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXMgPSBNYXBFeC5nZXQodGhpcy5haXJEYXRhLCB0YXJnZXRHdWlkKS5nZXRWYWx1ZShrZXkpIGFzIFRcclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHU1RTdGXHU2NEFEXHU0RThCXHU0RUY2XHJcbiAgICAgKiBAcGFyYW0gY2xhenpOYW1lIFxyXG4gICAgICogQHBhcmFtIGZ1bmNOYW1lIFxyXG4gICAgICogQHBhcmFtIHBhcmFtcyBcclxuICAgICAqL1xyXG4gICAgcHVibGljIG5vdGlmeShjbGF6ek5hbWU6IHN0cmluZywgZnVuY05hbWU6IHN0cmluZywgLi4ucGFyYW1zOiBhbnlbXSkge1xyXG4gICAgICAgIEV2ZW50cy5kaXNwYXRjaFRvQWxsQ2xpZW50KFByZWZhYkV2ZW50Ll9vbkV2ZW50TmV0S2V5LCBjbGF6ek5hbWUsIGZ1bmNOYW1lLCAuLi5wYXJhbXMpXHJcbiAgICAgICAgRXZlbnRzLmRpc3BhdGNoTG9jYWwoUHJlZmFiRXZlbnQuX29uRXZlbnRLZXkgKyBcIjpcIiArIGNsYXp6TmFtZSArIFwiOlwiICsgZnVuY05hbWUsIC4uLnBhcmFtcylcclxuICAgICAgICBjb25zb2xlLmxvZyhQcmVmYWJFdmVudC5fb25FdmVudEtleSArIFwiOlwiICsgY2xhenpOYW1lICsgXCI6XCIgKyBmdW5jTmFtZSwgLi4ucGFyYW1zKVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIChcdTUzQ0NcdTdBRUYpXHU2REZCXHU1MkEwXHU1QzVFXHU2MDI3XHJcbiAgICAgKiBAcGFyYW0gc2VuZGVyR3VpZCBcdTUzRDFcdThENzdcdTVCRjlcdThDNjFHdWlkXHJcbiAgICAgKiBAcGFyYW0gdGFyZ2V0R3VpZCBcdTc2RUVcdTY4MDdcdTVCRjlcdThDNjFHdWlkXHJcbiAgICAgKiBAcGFyYW0gdmFsIFx1NTAzQ1xyXG4gICAgICogQHBhcmFtIGF0dHJUeXBlIFx1NUM1RVx1NjAyN1x1N0M3Qlx1NTc4QlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb25TZXRBdHRyVmFsKGNsYXp6TmFtZTogc3RyaW5nLCBzZW5kZXJHdWlkOiBzdHJpbmcsIHRhcmdldEd1aWQ6IHN0cmluZywgdmFsOiBudW1iZXIsIGF0dHJUeXBlOiBQcmVmYWJFdmVudC5BdHRyVHlwZSkge1xyXG4gICAgICAgIGxldCBjdXJWYWwgPSAwXHJcblxyXG4gICAgICAgIGN1clZhbCA9IHZhbFxyXG5cclxuICAgICAgICB0aGlzLnNldERhdGEodGFyZ2V0R3VpZCwgY2xhenpOYW1lICsgYXR0clR5cGUsIGN1clZhbClcclxuICAgICAgICBjb25zb2xlLmxvZyhcIltQRjpdXHU4QkJFXHU3RjZFXHU3M0E5XHU1QkI2XHU1QzVFXHU2MDI3IDogXCIgKyBhdHRyVHlwZSArIFwiIDogXCIgKyBjdXJWYWwpXHJcbiAgICAgICAgbGV0IGNoYXIgPSBDb3JlLkdhbWVPYmplY3QuZmluZCh0YXJnZXRHdWlkKVxyXG5cclxuICAgICAgICBpZiAoY2hhciBpbnN0YW5jZW9mIEdhbWVwbGF5LkNoYXJhY3Rlcikge1xyXG4gICAgICAgICAgICBpZiAoYXR0clR5cGUgPT0gUHJlZmFiRXZlbnQuQXR0clR5cGUuSnVtcCkge1xyXG4gICAgICAgICAgICAgICAgY2hhci5tYXhKdW1wSGVpZ2h0ID0gY3VyVmFsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGF0dHJUeXBlID09IFByZWZhYkV2ZW50LkF0dHJUeXBlLlNwZWVkKSB7XHJcbiAgICAgICAgICAgICAgICBjaGFyLm1heFdhbGtTcGVlZCA9IGN1clZhbFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm5vdGlmeShjbGF6ek5hbWUsIFByZWZhYkV2ZW50LlByZWZhYkV2dEF0dHIub25DaGFuZ2VBdHRyVmFsLm5hbWUsIHNlbmRlckd1aWQsIHRhcmdldEd1aWQsIGN1clZhbCwgYXR0clR5cGUpXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcdTZERkJcdTUyQTBcdTVDNUVcdTYwMjdcclxuICAgICAqIEBwYXJhbSBzZW5kZXJHdWlkIFx1NTNEMVx1OEQ3N1x1NUJGOVx1OEM2MUd1aWRcclxuICAgICAqIEBwYXJhbSB0YXJnZXRHdWlkIFx1NzZFRVx1NjgwN1x1NUJGOVx1OEM2MUd1aWRcclxuICAgICAqIEBwYXJhbSB2YWwgXHU1MDNDXHJcbiAgICAgKiBAcGFyYW0gYXR0clR5cGUgXHU1QzVFXHU2MDI3XHU3QzdCXHU1NzhCXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvbkFkZEF0dHJWYWwoY2xhenpOYW1lOiBzdHJpbmcsIHNlbmRlckd1aWQ6IHN0cmluZywgdGFyZ2V0R3VpZDogc3RyaW5nLCB2YWw6IG51bWJlciwgYXR0clR5cGU6IFByZWZhYkV2ZW50LkF0dHJUeXBlKSB7XHJcblxyXG4gICAgICAgIGxldCBjdXJWYWwgPSB0aGlzLmdldERhdGE8bnVtYmVyPih0YXJnZXRHdWlkLCBjbGF6ek5hbWUgKyBhdHRyVHlwZSlcclxuICAgICAgICBpZiAoY3VyVmFsID09IG51bGwpIGN1clZhbCA9IDBcclxuXHJcbiAgICAgICAgY3VyVmFsICs9IHZhbFxyXG5cclxuICAgICAgICB0aGlzLnNldERhdGEodGFyZ2V0R3VpZCwgY2xhenpOYW1lICsgYXR0clR5cGUsIGN1clZhbClcclxuICAgICAgICBjb25zb2xlLmxvZyhcIltQRjpdXHU4QkJFXHU3RjZFXHU3M0E5XHU1QkI2XHU1QzVFXHU2MDI3IDogXCIgKyBhdHRyVHlwZSArIFwiIDogXCIgKyBjdXJWYWwpXHJcbiAgICAgICAgbGV0IGNoYXIgPSBDb3JlLkdhbWVPYmplY3QuZmluZCh0YXJnZXRHdWlkKVxyXG5cclxuICAgICAgICBpZiAoY2hhciBpbnN0YW5jZW9mIEdhbWVwbGF5LkNoYXJhY3Rlcikge1xyXG4gICAgICAgICAgICBpZiAoYXR0clR5cGUgPT0gUHJlZmFiRXZlbnQuQXR0clR5cGUuSnVtcCkge1xyXG4gICAgICAgICAgICAgICAgY2hhci5tYXhKdW1wSGVpZ2h0ID0gY3VyVmFsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGF0dHJUeXBlID09IFByZWZhYkV2ZW50LkF0dHJUeXBlLlNwZWVkKSB7XHJcbiAgICAgICAgICAgICAgICBjaGFyLm1heFdhbGtTcGVlZCA9IGN1clZhbFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm5vdGlmeShjbGF6ek5hbWUsIFByZWZhYkV2ZW50LlByZWZhYkV2dEF0dHIub25DaGFuZ2VBdHRyVmFsLm5hbWUsIHNlbmRlckd1aWQsIHRhcmdldEd1aWQsIGN1clZhbCwgYXR0clR5cGUpXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcdTgzQjdcdTUzRDZcdTVDNUVcdTYwMjdcclxuICAgICAqIEBwYXJhbSB0YXJnZXRHdWlkIFxyXG4gICAgICogQHBhcmFtIHZhbCBcclxuICAgICAqIEBwYXJhbSBhdHRyVHlwZSBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldEF0dHJWYWwoY2xhenpOYW1lOiBzdHJpbmcsIHRhcmdldEd1aWQ6IHN0cmluZywgYXR0clR5cGU6IFByZWZhYkV2ZW50LkF0dHJUeXBlKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgY3VyVmFsID0gdGhpcy5nZXREYXRhPG51bWJlcj4odGFyZ2V0R3VpZCwgY2xhenpOYW1lICsgYXR0clR5cGUpXHJcbiAgICAgICAgaWYgKGN1clZhbCA9PSBudWxsKSBjdXJWYWwgPSAwXHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIltQRjpdXHU4M0I3XHU1M0Q2XHU3M0E5XHU1QkI2XHU1QzVFXHU2MDI3IDogXCIgKyBhdHRyVHlwZSArIFwiIDogXCIgKyBjdXJWYWwpXHJcbiAgICAgICAgcmV0dXJuIGN1clZhbFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogKFx1NTNDQ1x1N0FFRikgXHU3QTdGXHU2MjM0XHU4OEM1XHU1OTA3XHJcbiAgICAgKiBAcGFyYW0gdGFyZ2V0R3VpZCBcdTVCRjlcdThDNjFHdWlkXHJcbiAgICAgKiBAcGFyYW0gc2xvdCBcdTY5RkRcdTRGNERcclxuICAgICAqIEBwYXJhbSBlcXVpcEd1aWQgXHU4OEM1XHU1OTA3R3VpZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb25FcXVpcChjbGF6ek5hbWU6IHN0cmluZywgdGFyZ2V0R3VpZDogc3RyaW5nLCBzbG90OiBQcmVmYWJFdmVudC5FcXVpcFNsb3QsIGVxdWlwR3VpZDogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHRhcmdldEd1aWQsIGNsYXp6TmFtZSArIHNsb3QsIGVxdWlwR3VpZClcclxuICAgICAgICB0aGlzLm5vdGlmeShjbGF6ek5hbWUsIHRoaXMub25FcXVpcC5uYW1lLCB0YXJnZXRHdWlkLCBzbG90LCBlcXVpcEd1aWQpXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAoXHU1M0NDXHU3QUVGKVx1OEJCRVx1N0Y2RVx1NUM1RVx1NjAyN1xyXG4gICAgICogQHBhcmFtIHNlbmRlckd1aWQgXHU1M0QxXHU4RDc3XHU1QkY5XHU4QzYxR3VpZFxyXG4gICAgICogQHBhcmFtIHRhcmdldEd1aWQgXHU3NkVFXHU2ODA3XHU1QkY5XHU4QzYxR3VpZFxyXG4gICAgICogQHBhcmFtIHZhbCBcdTUwM0NcclxuICAgICAqIEBwYXJhbSBpbmZvVHlwZSBcdTRGRTFcdTYwNkZcdTdDN0JcdTU3OEJcclxuICAgICAqL1xyXG4gICAgcHVibGljIG9uU2V0UGxheWVySW5mbyhjbGF6ek5hbWU6IHN0cmluZywgc2VuZGVyR3VpZDogc3RyaW5nLCB0YXJnZXRHdWlkOiBzdHJpbmcsIHZhbDogbnVtYmVyLCBpbmZvVHlwZTogUHJlZmFiRXZlbnQuUGxheWVySW5mb1R5cGUgfCBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgY2hhciA9IENvcmUuR2FtZU9iamVjdC5maW5kKHRhcmdldEd1aWQpXHJcbiAgICAgICAgaWYgKGNoYXIgaW5zdGFuY2VvZiBHYW1lcGxheS5DaGFyYWN0ZXIpIHtcclxuICAgICAgICAgICAgaWYgKGNoYXIucGxheWVyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldFBsYXllckRhdGEoY2hhci5wbGF5ZXIuZ2V0UGxheWVySUQoKSkuc2V0VmFsdWUoY2xhenpOYW1lICsgaW5mb1R5cGUsIHZhbClcclxuICAgICAgICAgICAgICAgIHRoaXMubm90aWZ5KGNsYXp6TmFtZSwgdGhpcy5vblNldFBsYXllckluZm8ubmFtZSwgc2VuZGVyR3VpZCwgdGFyZ2V0R3VpZCwgdmFsLCBpbmZvVHlwZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIChcdTUzQ0NcdTdBRUYpXHU4M0I3XHU1M0Q2XHU1QzVFXHU2MDI3XHJcbiAgICAgKiBAcGFyYW0gc2VuZGVyR3VpZCBcdTUzRDFcdThENzdcdTVCRjlcdThDNjFHdWlkXHJcbiAgICAgKiBAcGFyYW0gdGFyZ2V0R3VpZCBcdTc2RUVcdTY4MDdcdTVCRjlcdThDNjFHdWlkXHJcbiAgICAgKiBAcGFyYW0gdmFsIFx1NTAzQ1xyXG4gICAgICogQHBhcmFtIGluZm9UeXBlIFx1NEZFMVx1NjA2Rlx1N0M3Qlx1NTc4QlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0UGxheWVySW5mbyhjbGF6ek5hbWU6IHN0cmluZywgdGFyZ2V0R3VpZDogc3RyaW5nLCBpbmZvVHlwZTogUHJlZmFiRXZlbnQuUGxheWVySW5mb1R5cGUgfCBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgY2hhciA9IENvcmUuR2FtZU9iamVjdC5maW5kKHRhcmdldEd1aWQpXHJcbiAgICAgICAgaWYgKGNoYXIgaW5zdGFuY2VvZiBHYW1lcGxheS5DaGFyYWN0ZXIpIHtcclxuICAgICAgICAgICAgaWYgKGNoYXIucGxheWVyKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLmdldFBsYXllckRhdGEoY2hhci5wbGF5ZXIuZ2V0UGxheWVySUQoKSkuZ2V0VmFsdWUoY2xhenpOYW1lICsgaW5mb1R5cGUpXHJcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT0gbnVsbCkgdmFsdWUgPSAwXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogKFx1NTNDQ1x1N0FFRilcdTZERkJcdTUyQTBcdTVDNUVcdTYwMjdcclxuICAgICAqIEBwYXJhbSBzZW5kZXJHdWlkIFx1NTNEMVx1OEQ3N1x1NUJGOVx1OEM2MUd1aWRcclxuICAgICAqIEBwYXJhbSB0YXJnZXRHdWlkIFx1NzZFRVx1NjgwN1x1NUJGOVx1OEM2MUd1aWRcclxuICAgICAqIEBwYXJhbSB2YWwgXHU1MDNDXHJcbiAgICAgKiBAcGFyYW0gaW5mb1R5cGUgXHU0RkUxXHU2MDZGXHU3QzdCXHU1NzhCXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvbkFkZFBsYXllckluZm8oY2xhenpOYW1lOiBzdHJpbmcsIHNlbmRlckd1aWQ6IHN0cmluZywgdGFyZ2V0R3VpZDogc3RyaW5nLCB2YWw6IG51bWJlciwgaW5mb1R5cGU6IFByZWZhYkV2ZW50LlBsYXllckluZm9UeXBlIHwgc3RyaW5nKSB7XHJcblxyXG4gICAgICAgIGxldCBjaGFyID0gQ29yZS5HYW1lT2JqZWN0LmZpbmQodGFyZ2V0R3VpZClcclxuICAgICAgICBpZiAoY2hhciBpbnN0YW5jZW9mIEdhbWVwbGF5LkNoYXJhY3Rlcikge1xyXG4gICAgICAgICAgICBpZiAoY2hhci5wbGF5ZXIpIHtcclxuICAgICAgICAgICAgICAgIGxldCBkYnZhbCA9IHRoaXMuZ2V0UGxheWVySW5mbyhjbGF6ek5hbWUsIHRhcmdldEd1aWQsIGluZm9UeXBlKVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChkYnZhbCA9PSBudWxsIHx8ICFOdW1iZXIuaXNOYU4oZGJ2YWwpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5WYWwgPSBkYnZhbCBhcyB1bmtub3duIGFzIG51bWJlclxyXG4gICAgICAgICAgICAgICAgICAgIG5WYWwgKz0gdmFsXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vblNldFBsYXllckluZm8oY2xhenpOYW1lLCBzZW5kZXJHdWlkLCB0YXJnZXRHdWlkLCBuVmFsLCBpbmZvVHlwZSlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmeShjbGF6ek5hbWUsIHRoaXMub25BZGRQbGF5ZXJJbmZvLm5hbWUsIHNlbmRlckd1aWQsIHRhcmdldEd1aWQsIHZhbCwgaW5mb1R5cGUpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAoXHU1M0NDXHU3QUVGKVx1OEJCRVx1N0Y2RVx1NTE3M1x1NTM2MVxyXG4gICAgICogQHBhcmFtIHNlbmRlckd1aWQgXHU1M0QxXHU5MDAxXHU4MDA1R3VpZFxyXG4gICAgICogQHBhcmFtIHRhcmdldEd1aWQgXHU3NkVFXHU2ODA3R3VpZFxyXG4gICAgICogQHBhcmFtIHJlY29yZFBvaW50SWQgXHU4QkIwXHU1RjU1XHU3MEI5aWRcclxuICAgICAqL1xyXG4gICAgcHVibGljIG9uU2V0UmVjb3JkUG9pbnQoY2xhenpOYW1lOiBzdHJpbmcsIHNlbmRlckd1aWQ6IHN0cmluZywgdGFyZ2V0R3VpZDogc3RyaW5nLCByZWNvcmRQb2ludElkOiBudW1iZXIsIHNhdmVEQjogYm9vbGVhbikge1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIltQRjpdb25TZXRSZWNvcmRQb2ludCA6IFwiICsgY2xhenpOYW1lICsgXCJfXCIgKyBzZW5kZXJHdWlkKVxyXG5cclxuICAgICAgICBsZXQgY2hhciA9IENvcmUuR2FtZU9iamVjdC5maW5kKHRhcmdldEd1aWQpXHJcbiAgICAgICAgaWYgKGNoYXIgaW5zdGFuY2VvZiBHYW1lcGxheS5DaGFyYWN0ZXIpIHtcclxuICAgICAgICAgICAgaWYgKGNoYXIucGxheWVyKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2F2ZURCKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0UGxheWVyRGF0YShjaGFyLnBsYXllci5nZXRQbGF5ZXJJRCgpKT8uc2V0VmFsdWUoY2xhenpOYW1lICsgXCJyZWNvcmRcIiwgcmVjb3JkUG9pbnRJZClcclxuICAgICAgICAgICAgICAgIHRoaXMubm90aWZ5KGNsYXp6TmFtZSwgdGhpcy5vblNldFJlY29yZFBvaW50Lm5hbWUsIHNlbmRlckd1aWQsIHRhcmdldEd1aWQsIHJlY29yZFBvaW50SWQpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogKFx1NTNDQ1x1N0FFRilcdTgzQjdcdTUzRDZcdTUxNzNcdTUzNjFcclxuICAgICAqIEBwYXJhbSB0YXJnZXRHdWlkIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0UmVjb3JkUG9pbnQoY2xhenpOYW1lOiBzdHJpbmcsIHRhcmdldEd1aWQ6IHN0cmluZyk6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IGNoYXIgPSBDb3JlLkdhbWVPYmplY3QuZmluZCh0YXJnZXRHdWlkKVxyXG4gICAgICAgIGlmIChjaGFyIGluc3RhbmNlb2YgR2FtZXBsYXkuQ2hhcmFjdGVyKSB7XHJcbiAgICAgICAgICAgIGlmIChjaGFyLnBsYXllcikge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRidmFsID0gdGhpcy5nZXRQbGF5ZXJEYXRhKGNoYXIucGxheWVyLmdldFBsYXllcklEKCkpPy5nZXRWYWx1ZShjbGF6ek5hbWUgKyBcInJlY29yZFwiKSBhcyBudW1iZXJcclxuICAgICAgICAgICAgICAgIHJldHVybiBkYnZhbFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogKFx1NTNDQ1x1N0FFRilcdTgzQjdcdTVGOTdcdTY1MzZcdTk2QzZcdTcyNjlcclxuICAgICAqIEBwYXJhbSBzZW5kZXJHdWlkIFxyXG4gICAgICogQHBhcmFtIHRhcmdldEd1aWQgXHJcbiAgICAgKiBAcGFyYW0gYXRsYXNJZCBcclxuICAgICAqL1xyXG4gICAgcHVibGljIG9uQWRkQ29sbGVjdGlvbihjbGF6ek5hbWU6IHN0cmluZywgYXRsYXNJZDogc3RyaW5nLCBjaGFyR3VpZDogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IGNoYXIgPSBDb3JlLkdhbWVPYmplY3QuZmluZChjaGFyR3VpZClcclxuICAgICAgICBpZiAoY2hhciBpbnN0YW5jZW9mIEdhbWVwbGF5LkNoYXJhY3Rlcikge1xyXG4gICAgICAgICAgICBpZiAoY2hhci5wbGF5ZXIpIHtcclxuICAgICAgICAgICAgICAgIGxldCBkYiA9IHRoaXMuZ2V0UGxheWVyRGF0YShjaGFyLnBsYXllci5nZXRQbGF5ZXJJRCgpKVxyXG4gICAgICAgICAgICAgICAgaWYgKGRiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRidmFsID0gZGIuZ2V0VmFsdWUoY2xhenpOYW1lICsgXCJhdGxhc0l0ZW1cIikgYXMgc3RyaW5nW11cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWRidmFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRidmFsID0gW11cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRidmFsLmluZGV4T2YoYXRsYXNJZCkgPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGJ2YWwucHVzaChhdGxhc0lkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYi5zZXRWYWx1ZShjbGF6ek5hbWUgKyBcImF0bGFzSXRlbVwiLCBkYnZhbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZnkoY2xhenpOYW1lLCB0aGlzLm9uQWRkQ29sbGVjdGlvbi5uYW1lLCBhdGxhc0lkLCBjaGFyR3VpZClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcdTgzQjdcdTUzRDZcdTYyNDBcdTY3MDlcdTY1MzZcdTk2QzZcdTcyNjlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldEFsbENvbGxlY3Rpb24oY2xhenpOYW1lOiBzdHJpbmcsIGNoYXJHdWlkOiBzdHJpbmcpOiBzdHJpbmdbXSB7XHJcblxyXG4gICAgICAgIGxldCBjaGFyID0gQ29yZS5HYW1lT2JqZWN0LmZpbmQoY2hhckd1aWQpXHJcbiAgICAgICAgaWYgKGNoYXIgaW5zdGFuY2VvZiBHYW1lcGxheS5DaGFyYWN0ZXIpIHtcclxuICAgICAgICAgICAgaWYgKGNoYXIucGxheWVyKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGJ2YWwgPSB0aGlzLmdldFBsYXllckRhdGEoY2hhci5wbGF5ZXIuZ2V0UGxheWVySUQoKSk/LmdldFZhbHVlKGNsYXp6TmFtZSArIFwiYXRsYXNJdGVtXCIpIGFzIHN0cmluZ1tdXHJcbiAgICAgICAgICAgICAgICBsZXQgcmVzID0gW11cclxuICAgICAgICAgICAgICAgIGlmIChkYnZhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcy5wdXNoKC4uLmRidmFsKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHU4M0I3XHU1M0Q2XHU3M0E5XHU1QkI2XHU3MkI2XHU2MDAxXHJcbiAgICAgKiBAcGFyYW0gY2xhenpOYW1lIFxyXG4gICAgICogQHBhcmFtIHRhcmdldEd1aWQgXHJcbiAgICAgKiBAcmV0dXJucyBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFBsYXllclN0YXQoY2xhenpOYW1lOiBzdHJpbmcsIHRhcmdldEd1aWQ6IHN0cmluZykge1xyXG4gICAgICAgIGxldCBjdXJWYWwgPSB0aGlzLmdldERhdGEoY2xhenpOYW1lLCB0YXJnZXRHdWlkKVxyXG4gICAgICAgIGlmIChjdXJWYWwgPT0gbnVsbCkgY3VyVmFsID0gMFxyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJbUEY6XVx1ODNCN1x1NTNENlx1NzNBOVx1NUJCNlx1NzJCNlx1NjAwMSA6IFwiICsgY3VyVmFsKVxyXG4gICAgICAgIHJldHVybiBjdXJWYWxcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIChcdTUzQ0NcdTdBRUYpXHU4QkJFXHU3RjZFXHU1QzVFXHU2MDI3XHJcbiAgICAgKiBAcGFyYW0gc2VuZGVyR3VpZCBcdTUzRDFcdThENzdcdTVCRjlcdThDNjFHdWlkXHJcbiAgICAgKiBAcGFyYW0gdGFyZ2V0R3VpZCBcdTc2RUVcdTY4MDdcdTVCRjlcdThDNjFHdWlkXHJcbiAgICAgKiBAcGFyYW0gdmFsIFx1NTAzQ1xyXG4gICAgICogQHBhcmFtIGluZm9UeXBlIFx1NEZFMVx1NjA2Rlx1N0M3Qlx1NTc4QlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb25TZXRQbGF5ZXJTdGF0KGNsYXp6TmFtZTogc3RyaW5nLCBzZW5kZXJHdWlkOiBzdHJpbmcsIHRhcmdldEd1aWQ6IHN0cmluZywgc3RhdFR5cGU6IFByZWZhYkV2ZW50LlBsYXllclN0YXRUeXBlKSB7XHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHRhcmdldEd1aWQsIGNsYXp6TmFtZSwgc3RhdFR5cGUpXHJcbiAgICAgICAgdGhpcy5ub3RpZnkoY2xhenpOYW1lLCB0aGlzLm9uU2V0UGxheWVyU3RhdC5uYW1lLCBzZW5kZXJHdWlkLCB0YXJnZXRHdWlkLCBzdGF0VHlwZSlcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0Q3VycmVuY3lOdW0oY2xhenpOYW1lOiBzdHJpbmcsIHRhcmdldEd1aWQ6IHN0cmluZywgY3VycmVuY3lJZDogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgY2hhciA9IENvcmUuR2FtZU9iamVjdC5maW5kKHRhcmdldEd1aWQpXHJcbiAgICAgICAgaWYgKGNoYXIgaW5zdGFuY2VvZiBHYW1lcGxheS5DaGFyYWN0ZXIpIHtcclxuICAgICAgICAgICAgaWYgKGNoYXIucGxheWVyKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLmdldFBsYXllckRhdGEoY2hhci5wbGF5ZXIuZ2V0UGxheWVySUQoKSkuZ2V0VmFsdWUoY2xhenpOYW1lICsgY3VycmVuY3lJZCkgYXMgbnVtYmVyXHJcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT0gbnVsbCkgdmFsdWUgPSAwXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gY2xhenpOYW1lIFxyXG4gICAgICogQHBhcmFtIHNlbmRlckd1aWQgXHJcbiAgICAgKiBAcGFyYW0gdGFyZ2V0R3VpZCBcclxuICAgICAqL1xyXG4gICAgcHVibGljIG9uQ2hhbmdlQ3VycmVuY3koY2xhenpOYW1lOiBzdHJpbmcsIHRhcmdldEd1aWQ6IHN0cmluZywgY3VycmVuY3lJZDogbnVtYmVyLCBjdXJyZW5jeU51bTogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IGNoYXIgPSBDb3JlLkdhbWVPYmplY3QuZmluZCh0YXJnZXRHdWlkKVxyXG4gICAgICAgIGlmIChjaGFyIGluc3RhbmNlb2YgR2FtZXBsYXkuQ2hhcmFjdGVyKSB7XHJcbiAgICAgICAgICAgIGlmIChjaGFyLnBsYXllcikge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRidmFsID0gdGhpcy5nZXRDdXJyZW5jeU51bShjbGF6ek5hbWUsIHRhcmdldEd1aWQsIGN1cnJlbmN5SWQpXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGRidmFsID09IG51bGwgfHwgIU51bWJlci5pc05hTihkYnZhbCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgblZhbCA9IGRidmFsIGFzIG51bWJlclxyXG4gICAgICAgICAgICAgICAgICAgIG5WYWwgKz0gY3VycmVuY3lOdW1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRQbGF5ZXJEYXRhKGNoYXIucGxheWVyLmdldFBsYXllcklEKCkpLnNldFZhbHVlKGNsYXp6TmFtZSArIGN1cnJlbmN5SWQsIG5WYWwpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZnkoY2xhenpOYW1lLCB0aGlzLm9uQ2hhbmdlQ3VycmVuY3kubmFtZSwgdGFyZ2V0R3VpZCwgY3VycmVuY3lJZCwgY3VycmVuY3lOdW0sIG5WYWwpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB0YXJnZXRHdWlkIFxyXG4gICAgICogQHBhcmFtIGN1cnJlbmN5SWQgXHJcbiAgICAgKiBAcGFyYW0gcHJpY2UgXHJcbiAgICAgKiBAcmV0dXJucyBcclxuICAgICAqL1xyXG4gICAgcHVibGljIG5ldF9CdXlXaXRoQ3VycmVuY3kodGFyZ2V0R3VpZDogc3RyaW5nLCBjdXJyZW5jeUlkOiBudW1iZXIsIHByaWNlOiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICBsZXQgY3VyTnVtID0gdGhpcy5nZXRDdXJyZW5jeU51bShQcmVmYWJFdmVudC5QcmVmYWJFdnRDdXJyZW5jeS5uYW1lLCB0YXJnZXRHdWlkLCBjdXJyZW5jeUlkKVxyXG4gICAgICAgIGlmIChjdXJOdW0gPCBwcmljZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMub25DaGFuZ2VDdXJyZW5jeShQcmVmYWJFdmVudC5QcmVmYWJFdnRDdXJyZW5jeS5uYW1lLCB0YXJnZXRHdWlkLCBjdXJyZW5jeUlkLCAtcHJpY2UpXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufVxyXG5Nb2R1bGVNYW5hZ2VyLmdldEluc3RhbmNlKCkucmVnaXN0ZXJNb2R1bGUoUHJlZmFiRXZlbnRNb2R1bGVTLCBQcmVmYWJFdmVudE1vZHVsZUMsIFByZWZhYkV2ZW50TW9kdWxlRGF0YSlcclxuIiwgIlx1RkVGRlxyXG4vKipcclxuICogQVVUTyBHRU5FUkFURSBCWSBVSSBFRElUT1IuXHJcbiAqIFdBUk5JTkc6IERPIE5PVCBNT0RJRlkgVEhJUyBGSUxFLE1BWSBDQVVTRSBDT0RFIExPU1QuXHJcbiAqIEFVVEhPUjogXHU2MjY3XHU3QjE0XHU3RUNGXHU1RTc0XHJcbiAqIFVJOiBVSS9EZWZhdWx0VUkudWlcclxuICogVElNRTogMjAyMy4wOC4yOC0xMi4yMS41N1xyXG4qL1xyXG5cclxuXHJcblxyXG5AVUkuVUlDYWxsT25seSgnVUkvRGVmYXVsdFVJLnVpJylcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGVmYXVsdFVJX0dlbmVyYXRlIGV4dGVuZHMgVUkuVUlCZWhhdmlvciB7XHJcblx0XG5cclxuIFxyXG5cdC8qKlxyXG5cdCogb25TdGFydCBcdTRFNEJcdTUyNERcdTg5RTZcdTUzRDFcdTRFMDBcdTZCMjFcclxuXHQqL1xyXG5cdHByb3RlY3RlZCBvbkF3YWtlKCkge1xyXG5cdH1cclxuXHQgXHJcbn1cclxuICJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBOzs7QUNBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7QUNBQTtBQUFBO0FBQUE7QUFBQTs7O0FDQUE7QUFBQTtBQUFBO0FBQUE7QUFNTyxJQUFNLGNBQU4sTUFBd0M7QUFBQSxFQU03QixhQUFzQixDQUFDO0FBQUEsRUFDdkIsYUFBNEIsb0JBQUksSUFBZTtBQUFBLEVBQy9DLFNBQXNDLG9CQUFJLElBQUk7QUFBQSxFQUl4RCxZQUFZLFdBQTRCO0FBQzlDLFFBQUksYUFBb0I7QUFDeEIsU0FBSyxhQUFhLElBQUksTUFBTSxVQUFVLFNBQVMsVUFBVTtBQUV6RCxhQUFRLElBQUksR0FBRyxJQUFJLEtBQUssV0FBVyxRQUFRLEtBQUk7QUFDOUMsV0FBSyxXQUFXLEtBQUssQ0FBQztBQUFBLElBQ3ZCO0FBQ0EsUUFBSSxTQUFTLFVBQVUsR0FBRztBQUMxQixhQUFRLElBQUksR0FBRyxJQUFJLFFBQVEsS0FBSTtBQUM5QixVQUFJLE9BQWMsVUFBVSxHQUFHO0FBQy9CLFVBQUksT0FBcUIsVUFBVSxHQUFHLEdBQUcsTUFBTSxHQUFHO0FBQ2xELFVBQUcsS0FBSyxTQUFTLFlBQVcsaUJBQWlCO0FBQUc7QUFDaEQsVUFBSSxVQUFpQjtBQUNyQixVQUFHLEtBQUssU0FBUyxZQUFXLGdCQUFnQixHQUFFO0FBQzdDLFlBQUksUUFBUSxJQUFJLFlBQVc7QUFDM0IsWUFBSSxhQUEyQixVQUFVLEdBQUcsT0FBTyxNQUFNLEdBQUc7QUFDNUQsWUFBRyxRQUFRLFVBQVUsV0FBVyxTQUFTLFlBQVcsaUJBQWlCLEdBQUU7QUFDdEUsb0JBQVUsWUFBVztBQUFBLFFBQ3RCO0FBQUEsTUFDRDtBQUNBLFVB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UztBQUFBLEdBL1h0QixhQWdZWjtBQU1BO0FBQUEsRUFEUCxLQUFLLFNBQVMsS0FBSyxRQUFRLEtBQUssU0FBUztBQUFBLEdBcll0QixhQXNZWjtBQWdCQTtBQUFBLEVBRFAsS0FBSyxTQUFTLEtBQUssTUFBTTtBQUFBLEdBclpOLGFBc1paO0FBS0E7QUFBQSxFQURQLEtBQUssU0FBUyxLQUFLLFFBQVEsS0FBSyxTQUFTO0FBQUEsR0ExWnRCLGFBMlpaO0FBNkRBO0FBQUEsRUFEUCxLQUFLLFNBQVMsS0FBSyxNQUFNO0FBQUEsR0F2ZE4sYUF3ZFo7QUFNQTtBQUFBLEVBRFAsS0FBSyxTQUFTLEtBQUssUUFBUSxLQUFLLFNBQVM7QUFBQSxHQTdkdEIsYUE4ZFo7QUFLQTtBQUFBLEVBRFAsS0FBSyxTQUFTLEtBQUssTUFBTTtBQUFBLEdBbGVOLGFBbWVaO0FBOFRBO0FBQUEsRUFEUCxLQUFLLFNBQVMsS0FBSyxNQUFNO0FBQUEsR0FoeUJOLGFBaXlCWjtBQW1DQTtBQUFBLEVBRFAsS0FBSyxTQUFTLEtBQUssTUFBTTtBQUFBLEdBbjBCTixhQW8wQlo7QUErVkE7QUFBQSxFQURQLEtBQUssU0FBUyxLQUFLLE1BQU07QUFBQSxHQWxxQ04sYUFtcUNaO0FBS0E7QUFBQSxFQURQLEtBQUssU0FBUyxLQUFLLFFBQVEsS0FBSyxTQUFTO0FBQUEsR0F2cUN0QixhQXdxQ1o7QUF4cUNZLGVBQXJCO0FBQUEsRUFEQyxLQUFLO0FBQUEsR0FDZTs7O0FLWHJCO0FBQUE7QUFBQTtBQUFBO0FBWUEsSUFBcUIscUJBQXJCLGNBQWdELEdBQUcsV0FBVztBQUFBLEVBT25ELFVBQVU7QUFBQSxFQUNwQjtBQUVEO0FBVnFCLHFCQUFyQjtBQUFBLEVBREMsR0FBRyxXQUFXLGlCQUFpQjtBQUFBLEdBQ1g7OztBZkNyQixnQkFBMkI7QUFJcEIsSUFBTSxjQUFjO0FBQUEsRUFDdEIsNkJBQTZCO0FBQUEsRUFDN0IsaUNBQWlDO0FBQUEsRUFDakMsaUNBQWlDO0FBQUEsRUFDakMsbUNBQW1DO0FBQUEsRUFDbkMsc0NBQXNDO0FBQUEsRUFDdEMseUJBQXlCO0FBQUEsRUFDekIsdUJBQXVCO0FBQUEsRUFDdkIsc0NBQXNDO0FBQUEsRUFDdEMsd0NBQXdDO0FBQUEsRUFDeEMsd0NBQXdDO0FBQUEsRUFDeEMsbUNBQW1DO0FBQUEsRUFDbkMsOENBQThDO0FBQUEsRUFDOUMsNkNBQTZDO0FBQUEsRUFDN0MsU0FBUztBQUFBLEVBQ1QsMkJBQTJCO0FBQUEsRUFDM0IsaUNBQWlDO0FBQ3RDOyIsCiAgIm5hbWVzIjogWyJFWENFTERBVEEiLCAiRVhDRUxEQVRBIiwgIkdhbWVEZWYiLCAiTWFwRXgiLCAiaGFzIiwgIlByZWZhYkV2ZW50IiwgIkF0dHJUeXBlIiwgIkVxdWlwU2xvdCIsICJQbGF5ZXJJbmZvVHlwZSIsICJQbGF5ZXJTdGF0VHlwZSJdCn0K
