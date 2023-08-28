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
var EXCELDATA = [["id", "sex", "shootAnimation", "aimShootAnimation", "reloadAnimation", "loadAnimation", "equipAnimation", "unequipAnimation", "holdStance", "aimStance"], ["", "", "", "", "", "", "", "", "", ""], [1, "male", "80484", "80483", "80479", "80482", "80585", "80481", "94258", "94261"], [2, "female", "49094", "49095", "80479", "80482", "80585", "80481", "49096", "49098"]];
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
var EXCELDATA2 = [["id", "name", "maleAction", "femaleAction", "weaponIcon", "equipmentSlot", "equipmentCameraOffset", "resourcesId", "useClass", "equipmentCameraFov", "aimCameraOffset", "aimCameraFov", "aimSpeed", "damage", "shootRange", "ammoSpeed", "detectRadius", "gravityScale", "hurtRadius", "isAutoReload", "isAutoLock", "isDefaultUI", "isWeaponHaveCasing", "fireBlockDistance", "totalAmmo", "isEmptyToDestroy", "isSupportRepAmmo", "rotateSpeed", "keepTime", "isWeaponHaveScope", "isAutoDestroy"], ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""], [100, "\u6D4B\u8BD5\u6B65\u67AA", 1, 2, "101168", "Right_Hand", new Type.Vector(0, 0, 0), 1, "Sniper", 90, new Type.Vector(0, 0, 0), 60, 90, 30, 5e3, 1e4, 1, 0, 1, true, true, true, true, 1, 100, false, true, 90, -1, false, true]];
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
var EXCELDATA3 = [["id", "weaponMesh", "hitRoleEffect", "hitOtherEffect", "fireEffect", "ammo", "casing", "fireSound", "reloadSound", "loadSound", "aimSound", "hitRoleSound", "hitOtherSound"], ["", "", "", "", "", "", "", "", "", "", "", "", ""], [1, "43704", "1", "2", "3", "4", "2", "5", "6", "7", "8", "9", "10"]];
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

// JavaScripts/Server/PlayerWeaponHandler.ts
var PlayerWeaponHandler_exports = {};
__export(PlayerWeaponHandler_exports, {
  default: () => PlayerWeaponHandler
});

// JavaScripts/WeaponBase/WeaponBaseCls.ts
var WeaponBaseCls_exports = {};
__export(WeaponBaseCls_exports, {
  default: () => WeaponDriver
});

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
  id;
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
    this.id = id;
    this.onIdChanged();
  }
  async onStart() {
    while (!this.hasInit) {
      TimeUtil.delaySecond(0.1);
    }
    this.useUpdate = true;
    this.weaponObj = this.gameObject;
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
      this.weaponUI.changeBullet(this.weaponObj.fireComponent.currentBulletSize, this.config.totalAmmo);
      if (this.config.keepTime != -1) {
        this._restTime -= dt;
        this.weaponUI.setTimeText(this._restTime, this.config.keepTime);
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
    UI.UIManager.instance.hide(WeaponUI);
    this.weaponUI = null;
    this.chara.animationStance = this.tempanimationStance;
    this.chara.playAnimation(this.weaponAction.unequipAnimation);
    this.chara.moveFacingDirection = this.tempMoveFacingDirection;
    this.camera.cameraRelativeTransform = new Type.Transform(this.tempcameraOffset, this.camera.cameraRelativeTransform.rotation, this.camera.cameraRelativeTransform.scale);
    this.camera.cameraSystemRelativeTransform = new Type.Transform(this.temptargetArmOffset, this.camera.cameraRelativeTransform.rotation, this.camera.cameraRelativeTransform.scale);
    this.camera.cameraFOV = this.tempcameraFOV;
    this.camera.targetArmLength = this.temptargetArmLength;
    if (this.config.isAutoDestroy) {
      UI.UIManager.instance.destroyUI(WeaponUI);
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
    this.clientOnIDChanged(this.id);
    this.serverInitDelegate();
    this.serverCreateMesh();
  }
  async serverCreateMesh() {
    let mesh = await GameObject.asyncSpawn({ guid: this.weaponResources.weaponMesh, replicates: true });
    mesh.parent = this.weaponObj;
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
  async clientInitPickUpTrigger() {
    this.pickUpTrigger = await GameObject.asyncSpawn({ guid: "Trigger" });
    this.pickUpTrigger.parent = this.weaponObj;
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
  clientOnIDChanged(id) {
    this.id = id;
    this.onIdChanged();
  }
  onIdChanged() {
    console.log("onIdChanged");
    this.config = GameConfig.WeaponConfig.getElement(this.id);
    this.isAutoReload = this.config.isAutoReload;
    this.totalAmmo = this.config.totalAmmo;
    this.weaponResources = GameConfig.WeaponResources.getElement(this.config.resourcesId);
    let maleAction = GameConfig.Action.getElement(this.config.maleAction);
    let femaleAction = GameConfig.Action.getElement(this.config.femaleAction);
    if (this.isRunningClient()) {
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
    this.hasInit = true;
  }
};
__publicField(WeaponDriver, "soundVolume", 1);
__decorateClass([
  Core.Property({ hideInEditor: true, replicated: true, onChanged: "onIdChanged" })
], WeaponDriver.prototype, "id", 2);
__decorateClass([
  Core.Property({ hideInEditor: true, replicated: true, onChanged: "onEquipdChanged" })
], WeaponDriver.prototype, "isEquiped", 2);
__decorateClass([
  Core.Function(Core.Server)
], WeaponDriver.prototype, "InitWeapon", 1);
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
__decorateClass([
  Core.Function(Core.Client)
], WeaponDriver.prototype, "clientOnIDChanged", 1);
WeaponDriver = __decorateClass([
  Core.Class
], WeaponDriver);

// JavaScripts/Server/PlayerWeaponHandler.ts
var PlayerWeaponHandler = class extends Core.Script {
  async onStart() {
    TimeUtil.delaySecond(10);
    let HotWeapon = await GameObject.asyncSpawn({ guid: "HotWeapon", replicates: true });
    let ins = await Script.spawnScript(WeaponDriver, true, HotWeapon);
    ins.InitWeapon(100);
  }
  onUpdate(dt) {
  }
  onDestroy() {
  }
};
PlayerWeaponHandler = __decorateClass([
  Core.Class
], PlayerWeaponHandler);

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
var foreign15 = __toESM(require_build());
var MWModuleMap = {
  "JavaScripts/Config/Action": Action_exports,
  "JavaScripts/Config/ConfigBase": ConfigBase_exports,
  "JavaScripts/Config/GameConfig": GameConfig_exports,
  "JavaScripts/Config/WeaponConfig": WeaponConfig_exports,
  "JavaScripts/Config/WeaponResources": WeaponResources_exports,
  "JavaScripts/DefaultUI": DefaultUI_exports,
  "JavaScripts/GameDef": GameDef_exports,
  "JavaScripts/Server/PlayerWeaponHandler": PlayerWeaponHandler_exports,
  "JavaScripts/WeaponBase/AmmoBaseCls": AmmoBaseCls_exports,
  "JavaScripts/WeaponBase/CasingBaseCls": CasingBaseCls_exports,
  "JavaScripts/WeaponBase/WeaponBaseCls": WeaponBaseCls_exports,
  "JavaScripts/WeaponBase/WeaponUI": WeaponUI_exports,
  "JavaScripts/ui-generate/DefaultUI_generate": DefaultUI_generate_exports,
  "JavaScripts/ui-generate/WeaponUI_generate": WeaponUI_generate_exports,
  "build": foreign15,
  "prefabEvent/PrefabEvent": PrefabEvent_exports,
  "prefabEvent/PrefabEventModule": PrefabEventModule_exports
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYnVpbGQudHMiLCAiPHN0ZGluPiIsICJKYXZhU2NyaXB0cy9Db25maWcvQWN0aW9uLnRzIiwgIkphdmFTY3JpcHRzL0NvbmZpZy9Db25maWdCYXNlLnRzIiwgIkphdmFTY3JpcHRzL0NvbmZpZy9HYW1lQ29uZmlnLnRzIiwgIkphdmFTY3JpcHRzL0NvbmZpZy9XZWFwb25Db25maWcudHMiLCAiSmF2YVNjcmlwdHMvQ29uZmlnL1dlYXBvblJlc291cmNlcy50cyIsICJKYXZhU2NyaXB0cy9EZWZhdWx0VUkudHMiLCAiSmF2YVNjcmlwdHMvR2FtZURlZi50cyIsICJKYXZhU2NyaXB0cy9TZXJ2ZXIvUGxheWVyV2VhcG9uSGFuZGxlci50cyIsICJKYXZhU2NyaXB0cy9XZWFwb25CYXNlL1dlYXBvbkJhc2VDbHMudHMiLCAiSmF2YVNjcmlwdHMvV2VhcG9uQmFzZS9BbW1vQmFzZUNscy50cyIsICJKYXZhU2NyaXB0cy9XZWFwb25CYXNlL0Nhc2luZ0Jhc2VDbHMudHMiLCAiSmF2YVNjcmlwdHMvV2VhcG9uQmFzZS9XZWFwb25VSS50cyIsICJKYXZhU2NyaXB0cy91aS1nZW5lcmF0ZS9XZWFwb25VSV9nZW5lcmF0ZS50cyIsICJwcmVmYWJFdmVudC9QcmVmYWJFdmVudC50cyIsICJwcmVmYWJFdmVudC9QcmVmYWJFdmVudE1vZHVsZS50cyIsICJKYXZhU2NyaXB0cy91aS1nZW5lcmF0ZS9EZWZhdWx0VUlfZ2VuZXJhdGUudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIiIsICJpbXBvcnQgKiBhcyBmb3JlaWduMSBmcm9tICcuL0phdmFTY3JpcHRzL0NvbmZpZy9BY3Rpb24nO1xuaW1wb3J0ICogYXMgZm9yZWlnbjIgZnJvbSAnLi9KYXZhU2NyaXB0cy9Db25maWcvQ29uZmlnQmFzZSc7XG5pbXBvcnQgKiBhcyBmb3JlaWduMyBmcm9tICcuL0phdmFTY3JpcHRzL0NvbmZpZy9HYW1lQ29uZmlnJztcbmltcG9ydCAqIGFzIGZvcmVpZ240IGZyb20gJy4vSmF2YVNjcmlwdHMvQ29uZmlnL1dlYXBvbkNvbmZpZyc7XG5pbXBvcnQgKiBhcyBmb3JlaWduNSBmcm9tICcuL0phdmFTY3JpcHRzL0NvbmZpZy9XZWFwb25SZXNvdXJjZXMnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjYgZnJvbSAnLi9KYXZhU2NyaXB0cy9EZWZhdWx0VUknO1xuaW1wb3J0ICogYXMgZm9yZWlnbjcgZnJvbSAnLi9KYXZhU2NyaXB0cy9HYW1lRGVmJztcbmltcG9ydCAqIGFzIGZvcmVpZ244IGZyb20gJy4vSmF2YVNjcmlwdHMvU2VydmVyL1BsYXllcldlYXBvbkhhbmRsZXInO1xuaW1wb3J0ICogYXMgZm9yZWlnbjkgZnJvbSAnLi9KYXZhU2NyaXB0cy9XZWFwb25CYXNlL0FtbW9CYXNlQ2xzJztcbmltcG9ydCAqIGFzIGZvcmVpZ24xMCBmcm9tICcuL0phdmFTY3JpcHRzL1dlYXBvbkJhc2UvQ2FzaW5nQmFzZUNscyc7XG5pbXBvcnQgKiBhcyBmb3JlaWduMTEgZnJvbSAnLi9KYXZhU2NyaXB0cy9XZWFwb25CYXNlL1dlYXBvbkJhc2VDbHMnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjEyIGZyb20gJy4vSmF2YVNjcmlwdHMvV2VhcG9uQmFzZS9XZWFwb25VSSc7XG5pbXBvcnQgKiBhcyBmb3JlaWduMTMgZnJvbSAnLi9KYXZhU2NyaXB0cy91aS1nZW5lcmF0ZS9EZWZhdWx0VUlfZ2VuZXJhdGUnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjE0IGZyb20gJy4vSmF2YVNjcmlwdHMvdWktZ2VuZXJhdGUvV2VhcG9uVUlfZ2VuZXJhdGUnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjE1IGZyb20gJy4vYnVpbGQnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjE2IGZyb20gJy4vcHJlZmFiRXZlbnQvUHJlZmFiRXZlbnQnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjE3IGZyb20gJy4vcHJlZmFiRXZlbnQvUHJlZmFiRXZlbnRNb2R1bGUnO1xuXG5leHBvcnQgY29uc3QgTVdNb2R1bGVNYXAgPSB7IFxuICAgICAnSmF2YVNjcmlwdHMvQ29uZmlnL0FjdGlvbic6IGZvcmVpZ24xLFxuICAgICAnSmF2YVNjcmlwdHMvQ29uZmlnL0NvbmZpZ0Jhc2UnOiBmb3JlaWduMixcbiAgICAgJ0phdmFTY3JpcHRzL0NvbmZpZy9HYW1lQ29uZmlnJzogZm9yZWlnbjMsXG4gICAgICdKYXZhU2NyaXB0cy9Db25maWcvV2VhcG9uQ29uZmlnJzogZm9yZWlnbjQsXG4gICAgICdKYXZhU2NyaXB0cy9Db25maWcvV2VhcG9uUmVzb3VyY2VzJzogZm9yZWlnbjUsXG4gICAgICdKYXZhU2NyaXB0cy9EZWZhdWx0VUknOiBmb3JlaWduNixcbiAgICAgJ0phdmFTY3JpcHRzL0dhbWVEZWYnOiBmb3JlaWduNyxcbiAgICAgJ0phdmFTY3JpcHRzL1NlcnZlci9QbGF5ZXJXZWFwb25IYW5kbGVyJzogZm9yZWlnbjgsXG4gICAgICdKYXZhU2NyaXB0cy9XZWFwb25CYXNlL0FtbW9CYXNlQ2xzJzogZm9yZWlnbjksXG4gICAgICdKYXZhU2NyaXB0cy9XZWFwb25CYXNlL0Nhc2luZ0Jhc2VDbHMnOiBmb3JlaWduMTAsXG4gICAgICdKYXZhU2NyaXB0cy9XZWFwb25CYXNlL1dlYXBvbkJhc2VDbHMnOiBmb3JlaWduMTEsXG4gICAgICdKYXZhU2NyaXB0cy9XZWFwb25CYXNlL1dlYXBvblVJJzogZm9yZWlnbjEyLFxuICAgICAnSmF2YVNjcmlwdHMvdWktZ2VuZXJhdGUvRGVmYXVsdFVJX2dlbmVyYXRlJzogZm9yZWlnbjEzLFxuICAgICAnSmF2YVNjcmlwdHMvdWktZ2VuZXJhdGUvV2VhcG9uVUlfZ2VuZXJhdGUnOiBmb3JlaWduMTQsXG4gICAgICdidWlsZCc6IGZvcmVpZ24xNSxcbiAgICAgJ3ByZWZhYkV2ZW50L1ByZWZhYkV2ZW50JzogZm9yZWlnbjE2LFxuICAgICAncHJlZmFiRXZlbnQvUHJlZmFiRXZlbnRNb2R1bGUnOiBmb3JlaWduMTcsXG59XG4iLCAiaW1wb3J0IHsgQ29uZmlnQmFzZSwgSUVsZW1lbnRCYXNlIH0gZnJvbSBcIi4vQ29uZmlnQmFzZVwiO1xuY29uc3QgRVhDRUxEQVRBOkFycmF5PEFycmF5PGFueT4+ID0gW1tcImlkXCIsXCJzZXhcIixcInNob290QW5pbWF0aW9uXCIsXCJhaW1TaG9vdEFuaW1hdGlvblwiLFwicmVsb2FkQW5pbWF0aW9uXCIsXCJsb2FkQW5pbWF0aW9uXCIsXCJlcXVpcEFuaW1hdGlvblwiLFwidW5lcXVpcEFuaW1hdGlvblwiLFwiaG9sZFN0YW5jZVwiLFwiYWltU3RhbmNlXCJdLFtcIlwiLFwiXCIsXCJcIixcIlwiLFwiXCIsXCJcIixcIlwiLFwiXCIsXCJcIixcIlwiXSxbMSxcIm1hbGVcIixcIjgwNDg0XCIsXCI4MDQ4M1wiLFwiODA0NzlcIixcIjgwNDgyXCIsXCI4MDU4NVwiLFwiODA0ODFcIixcIjk0MjU4XCIsXCI5NDI2MVwiXSxbMixcImZlbWFsZVwiLFwiNDkwOTRcIixcIjQ5MDk1XCIsXCI4MDQ3OVwiLFwiODA0ODJcIixcIjgwNTg1XCIsXCI4MDQ4MVwiLFwiNDkwOTZcIixcIjQ5MDk4XCJdXTtcbmV4cG9ydCBpbnRlcmZhY2UgSUFjdGlvbkVsZW1lbnQgZXh0ZW5kcyBJRWxlbWVudEJhc2V7XG4gXHQvKipcdTUyQThcdTc1M0JJRCovXG5cdGlkOm51bWJlclxuXHQvKipcdTYwMjdcdTUyMkIqL1xuXHRzZXg6c3RyaW5nXG5cdC8qKlx1NUMwNFx1NTFGQlx1NTJBOFx1NzUzQiovXG5cdHNob290QW5pbWF0aW9uOnN0cmluZ1xuXHQvKipcdTc3ODRcdTUxQzZcdTVDMDRcdTUxRkJcdTUyQThcdTc1M0IqL1xuXHRhaW1TaG9vdEFuaW1hdGlvbjpzdHJpbmdcblx0LyoqXHU2MzYyXHU1RjM5XHU1MkE4XHU3NTNCKi9cblx0cmVsb2FkQW5pbWF0aW9uOnN0cmluZ1xuXHQvKipcdTRFMEFcdTgxOUJcdTUyQThcdTc1M0IqL1xuXHRsb2FkQW5pbWF0aW9uOnN0cmluZ1xuXHQvKipcdTg4QzVcdTU5MDdcdTZCNjZcdTU2NjhcdTUyQThcdTc1M0IqL1xuXHRlcXVpcEFuaW1hdGlvbjpzdHJpbmdcblx0LyoqXHU1Mzc4XHU4RjdEXHU2QjY2XHU1NjY4XHU1MkE4XHU3NTNCKi9cblx0dW5lcXVpcEFuaW1hdGlvbjpzdHJpbmdcblx0LyoqXHU2MzAxXHU2NzA5XHU1OUZGXHU2MDAxKi9cblx0aG9sZFN0YW5jZTpzdHJpbmdcblx0LyoqXHU3Nzg0XHU1MUM2XHU1OUZGXHU2MDAxKi9cblx0YWltU3RhbmNlOnN0cmluZ1xuIH0gXG5leHBvcnQgY2xhc3MgQWN0aW9uQ29uZmlnIGV4dGVuZHMgQ29uZmlnQmFzZTxJQWN0aW9uRWxlbWVudD57XG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0c3VwZXIoRVhDRUxEQVRBKTtcblx0fVxuXG59IiwgIlxuLy9cdTUxNDNcdTdEMjBcdTc2ODRcdTU3RkFcdTdDN0JcbmV4cG9ydCBpbnRlcmZhY2UgSUVsZW1lbnRCYXNle1xuXHRpZDpudW1iZXI7XG59XG4vL1x1OTE0RFx1N0Y2RVx1NzY4NFx1NTdGQVx1N0M3QlxuZXhwb3J0IGNsYXNzIENvbmZpZ0Jhc2U8VCBleHRlbmRzIElFbGVtZW50QmFzZT57XG5cdHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IFRBR19LRVk6c3RyaW5nID0gJ0tleSc7Ly9cdThCRkJcdTUzRDZcdTk1MkUoXHU5NjY0XHU0RTg2SURcdTRFNEJcdTU5MTZcdTc2ODRcdTUyMkJcdTU0MERcdUZGMENcdTVFMjZrZXlcdTc2ODRcdTVCNTdcdTZCQjVcdTVGQzVcdTk4N0JcdTY2MkZzdHJpbmdcdTdDN0JcdTU3OEIpXG5cdHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IFRBR19MQU5HVUFHRTpzdHJpbmcgPSAnTGFuZ3VhZ2UnOy8vXHU1MTczXHU4MDU0XHU4QkVEXHU4QTAwXHU4ODY4XHU3Njg0aWRcdTYyMTZrZXkoXHU1OTgyXHU2NzlDXHU2NzA5XHU4RkQ5XHU0RTJBdGFnXHVGRjBDXHU1QkZDXHU4ODY4XHU1REU1XHU1MTc3XHU4OTgxXHU2MjhBXHU2NTcwXHU2MzZFXHU3NTFGXHU2MjEwXHU0RTNBc3RyaW5nXHU3QzdCXHU1NzhCXHVGRjBDXHU1NkUwXHU0RTNBXHU0RjFBXHU4MUVBXHU1MkE4XHU4RkRCXHU4ODRDXHU1MDNDXHU3Njg0XHU4RjZDXHU2MzYyKVxuXHRwcml2YXRlIHN0YXRpYyByZWFkb25seSBUQUdfTUFJTkxBTkdVQUdFOnN0cmluZyA9ICdNYWluTGFuZ3VhZ2UnOy8vXHU0RTNCXHU4QkVEXHU4QTAwdGFnXG5cdHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IFRBR19DSElMRExBTkdVQUdFOnN0cmluZyA9ICdDaGlsZExhbmd1YWdlJzsvL1x1NUI1MFx1OEJFRFx1OEEwMHRhZ1xuXG5cdHByaXZhdGUgcmVhZG9ubHkgRUxFTUVOVEFSUjpBcnJheTxUPiA9IFtdO1xuXHRwcml2YXRlIHJlYWRvbmx5IEVMRU1FTlRNQVA6TWFwPG51bWJlciwgVD4gPSBuZXcgTWFwPG51bWJlciwgVD4oKTtcblx0cHJpdmF0ZSByZWFkb25seSBLRVlNQVA6TWFwPG51bWJlciB8IHN0cmluZywgbnVtYmVyPiA9IG5ldyBNYXAoKTtcblx0cHJpdmF0ZSBzdGF0aWMgbGFuZ3VhZ2VJbmRleDpudW1iZXIgPSAwXG5cdHByaXZhdGUgc3RhdGljIGdldExhbmd1YWdlOihrZXk6c3RyaW5nfG51bWJlcik9PnN0cmluZztcblxuXHRwdWJsaWMgY29uc3RydWN0b3IoZXhjZWxEYXRhOkFycmF5PEFycmF5PGFueT4+KXtcblx0XHRsZXQgaGVhZGVyTGluZTpudW1iZXIgPSAyOy8vXHU4ODY4XHU1OTM0XHU3Njg0XHU4ODRDXHU2NTcwXG5cdFx0dGhpcy5FTEVNRU5UQVJSID0gbmV3IEFycmF5KGV4Y2VsRGF0YS5sZW5ndGggLSBoZWFkZXJMaW5lKTtcblx0XHRcblx0XHRmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5FTEVNRU5UQVJSLmxlbmd0aDsgaSsrKXtcblx0XHRcdHRoaXMuRUxFTUVOVEFSUltpXSA9IHt9IGFzIFRcblx0XHR9XG5cdFx0bGV0IGNvbHVtbiA9IGV4Y2VsRGF0YVswXS5sZW5ndGg7Ly9cdTUyMTdcdTY1NzBcblx0XHRmb3IobGV0IGogPSAwOyBqIDwgY29sdW1uOyBqKyspey8vXHU5MDREXHU1Mzg2XHU1NDA0XHU1MjE3XG5cdFx0XHRsZXQgbmFtZTpzdHJpbmcgPSBleGNlbERhdGFbMF1bal07XG5cdFx0XHRsZXQgdGFnczpBcnJheTxzdHJpbmc+ID0gZXhjZWxEYXRhWzFdW2pdLnNwbGl0KCd8Jyk7XG5cdFx0XHRpZih0YWdzLmluY2x1ZGVzKENvbmZpZ0Jhc2UuVEFHX0NISUxETEFOR1VBR0UpKSBjb250aW51ZTtcblx0XHRcdGxldCBqT2ZmZWN0Om51bWJlciA9IDA7Ly9cdTUyMTdcdTUwNEZcdTc5RkJcdTkxQ0Zcblx0XHRcdGlmKHRhZ3MuaW5jbHVkZXMoQ29uZmlnQmFzZS5UQUdfTUFJTkxBTkdVQUdFKSl7XG5cdFx0XHRcdGxldCBpbmRleCA9IGogKyBDb25maWdCYXNlLmxhbmd1YWdlSW5kZXg7XG5cdFx0XHRcdGxldCB0YXJnZXRUYWdzOkFycmF5PHN0cmluZz4gPSBleGNlbERhdGFbMV1baW5kZXhdLnNwbGl0KCd8Jyk7XG5cdFx0XHRcdGlmKGluZGV4IDwgY29sdW1uICYmIHRhcmdldFRhZ3MuaW5jbHVkZXMoQ29uZmlnQmFzZS5UQUdfQ0hJTERMQU5HVUFHRSkpe1xuXHRcdFx0XHRcdGpPZmZlY3QgPSBDb25maWdCYXNlLmxhbmd1YWdlSW5kZXg7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGxldCBoYXNUYWdfS2V5OmJvb2xlYW4gPSB0YWdzLmluY2x1ZGVzKENvbmZpZ0Jhc2UuVEFHX0tFWSk7XG5cdFx0XHRsZXQgaGFzVGFnX0xhbmd1YWdlOmJvb2xlYW4gPSB0YWdzLmluY2x1ZGVzKENvbmZpZ0Jhc2UuVEFHX0xBTkdVQUdFKTtcblx0XHRcdGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLkVMRU1FTlRBUlIubGVuZ3RoOyBpKyspe1xuXHRcdFx0XHRsZXQgZWxlID0gdGhpcy5FTEVNRU5UQVJSW2ldO1xuXHRcdFx0XHRsZXQgdmFsdWUgPSBleGNlbERhdGFbaSArIGhlYWRlckxpbmVdW2ogKyBqT2ZmZWN0XTtcblx0XHRcdFx0aWYoaiA9PSAwKXsvL0lEXG5cdFx0XHRcdFx0dGhpcy5FTEVNRU5UTUFQLnNldCh2YWx1ZSwgZWxlKTtcblx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0aWYoaGFzVGFnX0tleSl7XG5cdFx0XHRcdFx0XHR0aGlzLktFWU1BUC5zZXQodmFsdWUsIGV4Y2VsRGF0YVtpICsgaGVhZGVyTGluZV1bMF0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZihoYXNUYWdfTGFuZ3VhZ2Upe1xuXHRcdFx0XHRcdFx0aWYoQ29uZmlnQmFzZS5nZXRMYW5ndWFnZSAhPSBudWxsKXtcblx0XHRcdFx0XHRcdFx0dmFsdWUgPSBDb25maWdCYXNlLmdldExhbmd1YWdlKHZhbHVlKTtcblx0XHRcdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdFx0XHR2YWx1ZSA9IFwidW5rbm93XCJcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxlW25hbWVdID0gdmFsdWU7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdC8vXHU4QkJFXHU3RjZFXHU4M0I3XHU1M0Q2XHU4QkVEXHU4QTAwXHU3Njg0XHU2NUI5XHU2Q0Q1XG5cdHB1YmxpYyBzdGF0aWMgaW5pdExhbmd1YWdlKGxhbmd1YWdlSW5kZXg6bnVtYmVyLCBnZXRMYW5ndWFnZUZ1bjooa2V5OnN0cmluZ3xudW1iZXIpPT5zdHJpbmcpe1xuXHRcdENvbmZpZ0Jhc2UubGFuZ3VhZ2VJbmRleCA9IGxhbmd1YWdlSW5kZXg7XG5cdFx0Q29uZmlnQmFzZS5nZXRMYW5ndWFnZSA9IGdldExhbmd1YWdlRnVuO1xuXHRcdGlmKENvbmZpZ0Jhc2UubGFuZ3VhZ2VJbmRleCA8IDApe1xuXHRcdFx0Q29uZmlnQmFzZS5sYW5ndWFnZUluZGV4ID0gQ29uZmlnQmFzZS5nZXRTeXN0ZW1MYW5ndWFnZUluZGV4KCk7XG5cdFx0fVxuXHR9XG5cdC8vXHU4M0I3XHU1M0Q2XHU3Q0ZCXHU3RURGXHU4QkVEXHU4QTAwXHU3RDIyXHU1RjE1XG5cdHByaXZhdGUgc3RhdGljIGdldFN5c3RlbUxhbmd1YWdlSW5kZXgoKTpudW1iZXJ7XG5cdFx0bGV0IGxhbmd1YWdlID0gVXRpbC5Mb2NhbGVVdGlsLmdldERlZmF1bHRMb2NhbGUoKS50b1N0cmluZygpLnRvTG93ZXJDYXNlKCk7XG5cdFx0aWYgKCEhbGFuZ3VhZ2UubWF0Y2goXCJlblwiKSkge1xuXHRcdFx0cmV0dXJuIDA7XG5cdFx0fVxuXHRcdGlmICghIWxhbmd1YWdlLm1hdGNoKFwiemhcIikpIHtcblx0XHRcdHJldHVybiAxO1xuXHRcdH1cblx0XHRpZiAoISFsYW5ndWFnZS5tYXRjaChcImphXCIpKSB7XG5cdFx0XHRyZXR1cm4gMjtcblx0XHR9XG5cdFx0aWYgKCEhbGFuZ3VhZ2UubWF0Y2goXCJkZVwiKSkge1xuXHRcdFx0cmV0dXJuIDM7XG5cdFx0fVxuXHRcdHJldHVybiAwO1xuXHR9XG5cdC8qKlxuXHQqIFx1NjgzOVx1NjM2RWlkXHU4M0I3XHU1M0Q2XHU0RTAwXHU0RTJBXHU1MTQzXHU3RDIwXG5cdCogQHBhcmFtIGlkIGlkfGtleVxuXHQqIEByZXR1cm5zIEVsZW1lbnRcblx0Ki9cblx0cHVibGljIGdldEVsZW1lbnQoaWQ6bnVtYmVyfHN0cmluZyk6IFQge1xuXHRcdGxldCBlbGUgPSB0aGlzLkVMRU1FTlRNQVAuZ2V0KE51bWJlcihpZCkpIHx8IHRoaXMuRUxFTUVOVE1BUC5nZXQodGhpcy5LRVlNQVAuZ2V0KGlkKSk7XG5cdFx0aWYoZWxlID09IG51bGwpe1xuXHRcdFx0Y29uc29sZS5lcnJvcih0aGlzLmNvbnN0cnVjdG9yLm5hbWUgKyBcIlx1OTE0RFx1N0Y2RVx1ODg2OFx1NEUyRFx1NjI3RVx1NEUwRFx1NTIzMFx1NTE0M1x1N0QyMCBpZDpcIiArIGlkKTtcblx0XHR9XG5cdFx0cmV0dXJuIGVsZTtcblx0fVxuXHQvKipcblx0KiBcdTY4MzlcdTYzNkVcdTVCNTdcdTZCQjVcdTU0MERcdTU0OENcdTVCNTdcdTZCQjVcdTUwM0NcdTY3RTVcdTYyN0VcdTRFMDBcdTRFMkFcdTUxNDNcdTdEMjBcblx0KiBAcGFyYW0gZmllbGROYW1lIFx1NUI1N1x1NkJCNVx1NTQwRFxuXHQqIEBwYXJhbSBmaWVsZFZhbHVlIFx1NUI1N1x1NkJCNVx1NTAzQ1xuXHQqIEByZXR1cm5zIFx1N0IyQ1x1NEUwMFx1NEUyQVx1NjI3RVx1NTIzMFx1NzY4NEVsZW1lbnRcblx0Ki9cblx0cHVibGljIGZpbmRFbGVtZW50KGZpZWxkTmFtZTpzdHJpbmcsIGZpZWxkVmFsdWU6YW55KTogVHtcblx0XHRmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5FTEVNRU5UQVJSLmxlbmd0aDsgaSsrKXtcblx0XHRcdGlmKHRoaXMuRUxFTUVOVEFSUltpXVtmaWVsZE5hbWVdID09IGZpZWxkVmFsdWUpe1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5FTEVNRU5UQVJSW2ldO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHQvKipcblx0KiBcdTY4MzlcdTYzNkVcdTVCNTdcdTZCQjVcdTU0MERcdTU0OENcdTVCNTdcdTZCQjVcdTUwM0NcdTY3RTVcdTYyN0VcdTRFMDBcdTdFQzRcdTUxNDNcdTdEMjBcblx0KiBAcGFyYW0gZmllbGROYW1lIFx1NUI1N1x1NkJCNVx1NTQwRFxuXHQqIEBwYXJhbSBmaWVsZFZhbHVlIFx1NUI1N1x1NkJCNVx1NTAzQ1xuXHQqIEByZXR1cm5zIFx1NjI0MFx1NjcwOVx1N0IyNlx1NTQwOFx1ODk4MVx1NkM0Mlx1NzY4NEVsZW1lbnRcblx0Ki9cblx0cHVibGljIGZpbmRFbGVtZW50cyhmaWVsZE5hbWU6c3RyaW5nLGZpZWxkVmFsdWU6YW55KTpBcnJheTxUPntcblx0XHRsZXQgYXJyOkFycmF5PFQ+ID0gW107XG5cdFx0Zm9yKGxldCBpID0gMDtpIDwgdGhpcy5FTEVNRU5UQVJSLmxlbmd0aDtpKyspe1xuXHRcdFx0aWYodGhpcy5FTEVNRU5UQVJSW2ldW2ZpZWxkTmFtZV0gPT0gZmllbGRWYWx1ZSl7XG5cdFx0XHRcdGFyci5wdXNoKHRoaXMuRUxFTUVOVEFSUltpXSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBhcnI7XG5cdH1cblx0LyoqXHU4M0I3XHU1M0Q2XHU2MjQwXHU2NzA5XHU1MTQzXHU3RDIwKi9cblx0cHVibGljIGdldEFsbEVsZW1lbnQoKTpBcnJheTxUPntcblx0XHRyZXR1cm4gdGhpcy5FTEVNRU5UQVJSO1xuXHR9XG59IiwgImltcG9ydCB7Q29uZmlnQmFzZSwgSUVsZW1lbnRCYXNlfSBmcm9tIFwiLi9Db25maWdCYXNlXCI7XG5pbXBvcnQge0FjdGlvbkNvbmZpZ30gZnJvbSBcIi4vQWN0aW9uXCI7XG5pbXBvcnQge1dlYXBvbkNvbmZpZ0NvbmZpZ30gZnJvbSBcIi4vV2VhcG9uQ29uZmlnXCI7XG5pbXBvcnQge1dlYXBvblJlc291cmNlc0NvbmZpZ30gZnJvbSBcIi4vV2VhcG9uUmVzb3VyY2VzXCI7XG5cbmV4cG9ydCBjbGFzcyBHYW1lQ29uZmlne1xuXHRwcml2YXRlIHN0YXRpYyBjb25maWdNYXA6TWFwPHN0cmluZywgQ29uZmlnQmFzZTxJRWxlbWVudEJhc2U+PiA9IG5ldyBNYXAoKTtcblx0LyoqXG5cdCogXHU1OTFBXHU4QkVEXHU4QTAwXHU4QkJFXHU3RjZFXG5cdCogQHBhcmFtIGxhbmd1YWdlSW5kZXggXHU4QkVEXHU4QTAwXHU3RDIyXHU1RjE1KC0xXHU0RTNBXHU3Q0ZCXHU3RURGXHU5RUQ4XHU4QkE0XHU4QkVEXHU4QTAwKVxuXHQqIEBwYXJhbSBnZXRMYW5ndWFnZUZ1biBcdTY4MzlcdTYzNkVrZXlcdTgzQjdcdTUzRDZcdThCRURcdThBMDBcdTUxODVcdTVCQjlcdTc2ODRcdTY1QjlcdTZDRDVcblx0Ki9cblx0cHVibGljIHN0YXRpYyBpbml0TGFuZ3VhZ2UobGFuZ3VhZ2VJbmRleDpudW1iZXIsIGdldExhbmd1YWdlRnVuOihrZXk6c3RyaW5nfG51bWJlcik9PnN0cmluZyl7XG5cdFx0Q29uZmlnQmFzZS5pbml0TGFuZ3VhZ2UobGFuZ3VhZ2VJbmRleCwgZ2V0TGFuZ3VhZ2VGdW4pO1xuXHRcdHRoaXMuY29uZmlnTWFwLmNsZWFyKCk7XG5cdH1cblx0cHVibGljIHN0YXRpYyBnZXRDb25maWc8VCBleHRlbmRzIENvbmZpZ0Jhc2U8SUVsZW1lbnRCYXNlPj4oQ29uZmlnQ2xhc3M6IHsgbmV3KCk6IFQgfSk6IFQge1xuXHRcdGlmICghdGhpcy5jb25maWdNYXAuaGFzKENvbmZpZ0NsYXNzLm5hbWUpKSB7XG5cdFx0XHR0aGlzLmNvbmZpZ01hcC5zZXQoQ29uZmlnQ2xhc3MubmFtZSwgbmV3IENvbmZpZ0NsYXNzKCkpO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5jb25maWdNYXAuZ2V0KENvbmZpZ0NsYXNzLm5hbWUpIGFzIFQ7XG5cdH1cblx0cHVibGljIHN0YXRpYyBnZXQgQWN0aW9uKCk6QWN0aW9uQ29uZmlneyByZXR1cm4gdGhpcy5nZXRDb25maWcoQWN0aW9uQ29uZmlnKSB9O1xuXHRwdWJsaWMgc3RhdGljIGdldCBXZWFwb25Db25maWcoKTpXZWFwb25Db25maWdDb25maWd7IHJldHVybiB0aGlzLmdldENvbmZpZyhXZWFwb25Db25maWdDb25maWcpIH07XG5cdHB1YmxpYyBzdGF0aWMgZ2V0IFdlYXBvblJlc291cmNlcygpOldlYXBvblJlc291cmNlc0NvbmZpZ3sgcmV0dXJuIHRoaXMuZ2V0Q29uZmlnKFdlYXBvblJlc291cmNlc0NvbmZpZykgfTtcbn0iLCAiaW1wb3J0IHsgQ29uZmlnQmFzZSwgSUVsZW1lbnRCYXNlIH0gZnJvbSBcIi4vQ29uZmlnQmFzZVwiO1xuY29uc3QgRVhDRUxEQVRBOkFycmF5PEFycmF5PGFueT4+ID0gW1tcImlkXCIsXCJuYW1lXCIsXCJtYWxlQWN0aW9uXCIsXCJmZW1hbGVBY3Rpb25cIixcIndlYXBvbkljb25cIixcImVxdWlwbWVudFNsb3RcIixcImVxdWlwbWVudENhbWVyYU9mZnNldFwiLFwicmVzb3VyY2VzSWRcIixcInVzZUNsYXNzXCIsXCJlcXVpcG1lbnRDYW1lcmFGb3ZcIixcImFpbUNhbWVyYU9mZnNldFwiLFwiYWltQ2FtZXJhRm92XCIsXCJhaW1TcGVlZFwiLFwiZGFtYWdlXCIsXCJzaG9vdFJhbmdlXCIsXCJhbW1vU3BlZWRcIixcImRldGVjdFJhZGl1c1wiLFwiZ3Jhdml0eVNjYWxlXCIsXCJodXJ0UmFkaXVzXCIsXCJpc0F1dG9SZWxvYWRcIixcImlzQXV0b0xvY2tcIixcImlzRGVmYXVsdFVJXCIsXCJpc1dlYXBvbkhhdmVDYXNpbmdcIixcImZpcmVCbG9ja0Rpc3RhbmNlXCIsXCJ0b3RhbEFtbW9cIixcImlzRW1wdHlUb0Rlc3Ryb3lcIixcImlzU3VwcG9ydFJlcEFtbW9cIixcInJvdGF0ZVNwZWVkXCIsXCJrZWVwVGltZVwiLFwiaXNXZWFwb25IYXZlU2NvcGVcIixcImlzQXV0b0Rlc3Ryb3lcIl0sW1wiXCIsXCJcIixcIlwiLFwiXCIsXCJcIixcIlwiLFwiXCIsXCJcIixcIlwiLFwiXCIsXCJcIixcIlwiLFwiXCIsXCJcIixcIlwiLFwiXCIsXCJcIixcIlwiLFwiXCIsXCJcIixcIlwiLFwiXCIsXCJcIixcIlwiLFwiXCIsXCJcIixcIlwiLFwiXCIsXCJcIixcIlwiLFwiXCJdLFsxMDAsXCJcdTZENEJcdThCRDVcdTZCNjVcdTY3QUFcIiwxLDIsXCIxMDExNjhcIixcIlJpZ2h0X0hhbmRcIixuZXcgVHlwZS5WZWN0b3IoMCwwLDApLDEsXCJTbmlwZXJcIiw5MCxuZXcgVHlwZS5WZWN0b3IoMCwwLDApLDYwLDkwLDMwLDUwMDAsMTAwMDAsMSwwLDEsdHJ1ZSx0cnVlLHRydWUsdHJ1ZSwxLDEwMCxmYWxzZSx0cnVlLDkwLC0xLGZhbHNlLHRydWVdXTtcbmV4cG9ydCBpbnRlcmZhY2UgSVdlYXBvbkNvbmZpZ0VsZW1lbnQgZXh0ZW5kcyBJRWxlbWVudEJhc2V7XG4gXHQvKipcdTY3QUFcdTY4QjBJRCovXG5cdGlkOm51bWJlclxuXHQvKipcdTY3QUFcdTY4QjBcdTU0MERcdTVCNTcqL1xuXHRuYW1lOnN0cmluZ1xuXHQvKipcdTY3QUFcdTY4QjBcdTc1MzdcdTYwMjdcdTUyQThcdTc1M0IqL1xuXHRtYWxlQWN0aW9uOm51bWJlclxuXHQvKipcdTY3QUFcdTY4QjBcdTU5NzNcdTYwMjdcdTUyQThcdTc1M0IqL1xuXHRmZW1hbGVBY3Rpb246bnVtYmVyXG5cdC8qKlx1NkI2Nlx1NTY2OFx1NTZGRVx1NjgwNyovXG5cdHdlYXBvbkljb246c3RyaW5nXG5cdC8qKlx1ODhDNVx1NTkwN1x1NjNEMlx1NjlGRCovXG5cdGVxdWlwbWVudFNsb3Q6c3RyaW5nXG5cdC8qKlx1ODhDNVx1NTkwN1x1ODlDNlx1ODlEMlx1NTA0Rlx1NzlGQiovXG5cdGVxdWlwbWVudENhbWVyYU9mZnNldDpUeXBlLlZlY3RvclxuXHQvKipcdTY3QUFcdTY4QjBcdTRGN0ZcdTc1MjhcdThENDRcdTRFQTdJRCovXG5cdHJlc291cmNlc0lkOm51bWJlclxuXHQvKipcdTY3QUFcdTY4QjBcdTdDN0IqL1xuXHR1c2VDbGFzczpzdHJpbmdcblx0LyoqRk9WKi9cblx0ZXF1aXBtZW50Q2FtZXJhRm92Om51bWJlclxuXHQvKipcdTc3ODRcdTUxQzZcdTg5QzZcdTg5RDJcdTUwNEZcdTc5RkIqL1xuXHRhaW1DYW1lcmFPZmZzZXQ6VHlwZS5WZWN0b3Jcblx0LyoqXHU3Nzg0XHU1MUM2Rk9WKi9cblx0YWltQ2FtZXJhRm92Om51bWJlclxuXHQvKipcdTc3ODRcdTUxQzZcdTgwNUFcdTcxMjZcdTkwMUZcdTVFQTYqL1xuXHRhaW1TcGVlZDpudW1iZXJcblx0LyoqXHU2QjY2XHU1NjY4XHU1N0ZBXHU3ODQwXHU0RjI0XHU1QkIzKi9cblx0ZGFtYWdlOm51bWJlclxuXHQvKipcdTY3MDBcdTU5MjdcdTVDMDRcdTdBMEIqL1xuXHRzaG9vdFJhbmdlOm51bWJlclxuXHQvKipcdTVGMzlcdTgzNkZcdTkwMUZcdTVFQTYqL1xuXHRhbW1vU3BlZWQ6bnVtYmVyXG5cdC8qKlx1NzhCMFx1NjQ5RVx1NTM0QVx1NUY4NCovXG5cdGRldGVjdFJhZGl1czpudW1iZXJcblx0LyoqXHU5MUNEXHU1MjlCXHU3Q0ZCXHU2NTcwKi9cblx0Z3Jhdml0eVNjYWxlOm51bWJlclxuXHQvKipcdTRGMjRcdTVCQjNcdTgzMDNcdTU2RjQqL1xuXHRodXJ0UmFkaXVzOm51bWJlclxuXHQvKipcdTgxRUFcdTUyQThcdTYzNjJcdTVGMzkqL1xuXHRpc0F1dG9SZWxvYWQ6Ym9vbGVhblxuXHQvKipcdThGODVcdTUyQTlcdTc3ODRcdTUxQzYqL1xuXHRpc0F1dG9Mb2NrOmJvb2xlYW5cblx0LyoqXHU5RUQ4XHU4QkE0VUkqL1xuXHRpc0RlZmF1bHRVSTpib29sZWFuXG5cdC8qKlx1NUYzOVx1NThGM1x1NUYzOVx1NTFGQSovXG5cdGlzV2VhcG9uSGF2ZUNhc2luZzpib29sZWFuXG5cdC8qKlx1NUYwMFx1NzA2Qlx1OTYzQlx1NjMyMVx1OERERFx1NzlCQiovXG5cdGZpcmVCbG9ja0Rpc3RhbmNlOm51bWJlclxuXHQvKipcdTVGMzlcdTgzNkZcdTY1NzBcdTkxQ0YoLTFcdTRFM0FcdTY1RTBcdTk2NTApICovXG5cdHRvdGFsQW1tbzpudW1iZXJcblx0LyoqXHU1RjM5XHU1OTM5XHU0RTNBXHU3QTdBXHU2NjJGXHU1NDI2XHU5NTAwXHU2QkMxXHU2QjY2XHU1NjY4Ki9cblx0aXNFbXB0eVRvRGVzdHJveTpib29sZWFuXG5cdC8qKlx1NjUyRlx1NjMwMVx1NjZGRlx1NjM2Mlx1NUYzOVx1NTkzOSovXG5cdGlzU3VwcG9ydFJlcEFtbW86Ym9vbGVhblxuXHQvKipcdTZBMjFcdTU3OEJcdTY1Q0JcdThGNkNcdTkwMUZcdTVFQTYqL1xuXHRyb3RhdGVTcGVlZDpudW1iZXJcblx0LyoqXHU2MzAxXHU2NzA5XHU2NUY2XHU5NjUwXHVGRjA4c1x1RkYwOVx1RkYwOC0xXHU0RTNBXHU2QzM4XHU0RTQ1XHU2MzAxXHU2NzA5XHVGRjA5Ki9cblx0a2VlcFRpbWU6bnVtYmVyXG5cdC8qKlx1Nzc4NFx1NTFDNlx1OTU1QyovXG5cdGlzV2VhcG9uSGF2ZVNjb3BlOmJvb2xlYW5cblx0LyoqXHU4MUVBXHU1MkE4XHU5NTAwXHU2QkMxKi9cblx0aXNBdXRvRGVzdHJveTpib29sZWFuXG4gfSBcbmV4cG9ydCBjbGFzcyBXZWFwb25Db25maWdDb25maWcgZXh0ZW5kcyBDb25maWdCYXNlPElXZWFwb25Db25maWdFbGVtZW50Pntcblx0Y29uc3RydWN0b3IoKXtcblx0XHRzdXBlcihFWENFTERBVEEpO1xuXHR9XG5cbn0iLCAiaW1wb3J0IHsgQ29uZmlnQmFzZSwgSUVsZW1lbnRCYXNlIH0gZnJvbSBcIi4vQ29uZmlnQmFzZVwiO1xuY29uc3QgRVhDRUxEQVRBOkFycmF5PEFycmF5PGFueT4+ID0gW1tcImlkXCIsXCJ3ZWFwb25NZXNoXCIsXCJoaXRSb2xlRWZmZWN0XCIsXCJoaXRPdGhlckVmZmVjdFwiLFwiZmlyZUVmZmVjdFwiLFwiYW1tb1wiLFwiY2FzaW5nXCIsXCJmaXJlU291bmRcIixcInJlbG9hZFNvdW5kXCIsXCJsb2FkU291bmRcIixcImFpbVNvdW5kXCIsXCJoaXRSb2xlU291bmRcIixcImhpdE90aGVyU291bmRcIl0sW1wiXCIsXCJcIixcIlwiLFwiXCIsXCJcIixcIlwiLFwiXCIsXCJcIixcIlwiLFwiXCIsXCJcIixcIlwiLFwiXCJdLFsxLFwiNDM3MDRcIixcIjFcIixcIjJcIixcIjNcIixcIjRcIixcIjJcIixcIjVcIixcIjZcIixcIjdcIixcIjhcIixcIjlcIixcIjEwXCJdXTtcbmV4cG9ydCBpbnRlcmZhY2UgSVdlYXBvblJlc291cmNlc0VsZW1lbnQgZXh0ZW5kcyBJRWxlbWVudEJhc2V7XG4gXHQvKipcdThENDRcdTRFQTdJRCovXG5cdGlkOm51bWJlclxuXHQvKipcdTZCNjZcdTU2NjhcdTZBMjFcdTU3OEIqL1xuXHR3ZWFwb25NZXNoOnN0cmluZ1xuXHQvKipcdTU0N0RcdTRFMkRcdTg5RDJcdTgyNzJcdTcyNzlcdTY1NDgqL1xuXHRoaXRSb2xlRWZmZWN0OnN0cmluZ1xuXHQvKipcdTU0N0RcdTRFMkRcdTcyNjlcdTRGNTNcdTcyNzlcdTY1NDgqL1xuXHRoaXRPdGhlckVmZmVjdDpzdHJpbmdcblx0LyoqXHU1RjAwXHU3MDZCXHU3Mjc5XHU2NTQ4Ki9cblx0ZmlyZUVmZmVjdDpzdHJpbmdcblx0LyoqXHU1RjM5XHU4MzZGKi9cblx0YW1tbzpzdHJpbmdcblx0LyoqXHU1RjM5XHU1OEYzKi9cblx0Y2FzaW5nOnN0cmluZ1xuXHQvKipcdTVGMDBcdTcwNkJcdTk3RjNcdTY1NDgqL1xuXHRmaXJlU291bmQ6c3RyaW5nXG5cdC8qKlx1NjM2Mlx1NUYzOVx1OTdGM1x1NjU0OCovXG5cdHJlbG9hZFNvdW5kOnN0cmluZ1xuXHQvKipcdTRFMEFcdTgxOUJcdTk3RjNcdTY1NDgqL1xuXHRsb2FkU291bmQ6c3RyaW5nXG5cdC8qKlx1Nzc4NFx1NTFDNlx1OTdGM1x1NjU0OCovXG5cdGFpbVNvdW5kOnN0cmluZ1xuXHQvKipcdTU0N0RcdTRFMkRcdTg5RDJcdTgyNzJcdTk3RjNcdTY1NDgqL1xuXHRoaXRSb2xlU291bmQ6c3RyaW5nXG5cdC8qKlx1NTQ3RFx1NEUyRFx1NzI2OVx1NEY1M1x1OTdGM1x1NjU0OCovXG5cdGhpdE90aGVyU291bmQ6c3RyaW5nXG4gfSBcbmV4cG9ydCBjbGFzcyBXZWFwb25SZXNvdXJjZXNDb25maWcgZXh0ZW5kcyBDb25maWdCYXNlPElXZWFwb25SZXNvdXJjZXNFbGVtZW50Pntcblx0Y29uc3RydWN0b3IoKXtcblx0XHRzdXBlcihFWENFTERBVEEpO1xuXHR9XG5cbn0iLCAiXHVGRUZGQFVJLlVJQ2FsbE9ubHkoJycpXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJRGVmYXVsdCBleHRlbmRzIFVJLlVJQmVoYXZpb3Ige1xyXG5cdENoYXJhY3RlcjogR2FtZXBsYXkuQ2hhcmFjdGVyXHJcblx0LyogXHU4OUUzXHU2NzkwXHU4RDQ0XHU2RTkwSURcdTUyMTdcdTg4NjggKi9cclxuICAgIHByaXZhdGUgcmVzb2x2ZVN0cmluZyhhc3NldElkczogc3RyaW5nKTogc3RyaW5nW10ge1xyXG4gICAgICAgIGxldCBhc3NldElkQXJyYXk6IHN0cmluZ1tdID0gbmV3IEFycmF5PHN0cmluZz4oKVxyXG4gICAgICAgIGxldCBhc3NldElkOiBzdHJpbmcgPSBcIlwiXHJcbiAgICAgICAgbGV0IHMgPSBhc3NldElkcy5zcGxpdChcIlwiKVxyXG4gICAgICAgIGZvciAobGV0IGEgb2Ygcykge1xyXG4gICAgICAgICAgICBpZiAoYSA9PSBcIixcIikge1xyXG4gICAgICAgICAgICAgICAgYXNzZXRJZEFycmF5LnB1c2goYXNzZXRJZClcclxuICAgICAgICAgICAgICAgIGFzc2V0SWQgPSBcIlwiXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBhc3NldElkICs9IGFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYXNzZXRJZCkge1xyXG4gICAgICAgICAgICBhc3NldElkQXJyYXkucHVzaChhc3NldElkKVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYXNzZXRJZEFycmF5XHJcbiAgICB9XHJcblxyXG5cdC8qIFx1NTIxRFx1NTlDQlx1NTMxNlx1OEQ0NFx1NkU5MCAqL1xyXG5cdHByaXZhdGUgaW5pdEFzc2V0cyhhc3NldElkczogc3RyaW5nKTogdm9pZCB7XHJcblx0XHRsZXQgYXNzZXRJZEFycmF5ID0gdGhpcy5yZXNvbHZlU3RyaW5nKGFzc2V0SWRzKVxyXG5cdFx0Zm9yIChsZXQgZWxlbWVudCBvZiBhc3NldElkQXJyYXkpIHtcclxuXHRcdFx0VXRpbC5Bc3NldFV0aWwuYXN5bmNEb3dubG9hZEFzc2V0KGVsZW1lbnQpXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHJcblx0LyoqIFx1NEVDNVx1NTcyOFx1NkUzOFx1NjIwRlx1NjVGNlx1OTVGNFx1NUJGOVx1OTc1RVx1NkEyMVx1Njc3Rlx1NUI5RVx1NEY4Qlx1OEMwM1x1NzUyOFx1NEUwMFx1NkIyMSAqL1xyXG4gICAgcHJvdGVjdGVkIG9uU3RhcnQoKSB7XHJcblx0XHQvL1x1NTIxRFx1NTlDQlx1NTMxNlx1NTJBOFx1NzUzQlx1OEQ0NFx1NkU5MCBcclxuXHRcdHRoaXMuaW5pdEFzc2V0cyhcIjk1Nzc3LDYxMjQ1XCIpXHJcblx0XHQvL1x1OEJCRVx1N0Y2RVx1ODBGRFx1NTQyNlx1NkJDRlx1NUUyN1x1ODlFNlx1NTNEMW9uVXBkYXRlXHJcblx0XHR0aGlzLmNhblVwZGF0ZSA9IGZhbHNlXHJcblx0XHRcclxuXHRcdC8vXHU2MjdFXHU1MjMwXHU1QkY5XHU1RTk0XHU3Njg0XHU4REYzXHU4REMzXHU2MzA5XHU5NEFFXHJcbiAgICAgICAgY29uc3QgSnVtcEJ0biA9IHRoaXMudWlXaWRnZXRCYXNlLmZpbmRDaGlsZEJ5UGF0aCgnUm9vdENhbnZhcy9CdXR0b25fSnVtcCcpIGFzIFVJLkJ1dHRvblxyXG5cdFx0Y29uc3QgQXR0YWNrQnRuID0gdGhpcy51aVdpZGdldEJhc2UuZmluZENoaWxkQnlQYXRoKCdSb290Q2FudmFzL0J1dHRvbl9BdHRhY2snKSBhcyBVSS5CdXR0b25cclxuXHRcdGNvbnN0IEludGVyYWN0QnRuID0gdGhpcy51aVdpZGdldEJhc2UuZmluZENoaWxkQnlQYXRoKCdSb290Q2FudmFzL0J1dHRvbl9JbnRlcmFjdCcpIGFzIFVJLkJ1dHRvblxyXG5cdFx0XHJcblx0XHQvL1x1NzBCOVx1NTFGQlx1OERGM1x1OERDM1x1NjMwOVx1OTRBRSxcdTVGMDJcdTZCNjVcdTgzQjdcdTUzRDZcdTRFQkFcdTcyNjlcdTU0MEVcdTYyNjdcdTg4NENcdThERjNcdThEQzNcclxuICAgICAgICBKdW1wQnRuLm9uUHJlc3NlZC5hZGQoKCk9PntcclxuXHRcdFx0aWYgKHRoaXMuQ2hhcmFjdGVyKSB7XHJcblx0XHRcdFx0dGhpcy5DaGFyYWN0ZXIuanVtcCgpXHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0R2FtZXBsYXkuYXN5bmNHZXRDdXJyZW50UGxheWVyKCkudGhlbigocGxheWVyKSA9PiB7XHJcblx0XHRcdFx0XHR0aGlzLkNoYXJhY3RlciA9IHBsYXllci5jaGFyYWN0ZXJcclxuXHRcdFx0XHRcdC8vXHU4OUQyXHU4MjcyXHU2MjY3XHU4ODRDXHU4REYzXHU4REMzXHU1MjlGXHU4MEZEXHJcblx0XHRcdFx0XHR0aGlzLkNoYXJhY3Rlci5qdW1wKClcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9XHJcblx0XHR9KVx0XHJcblxyXG5cdFx0Ly9cdTcwQjlcdTUxRkJcdTY1M0JcdTUxRkJcdTYzMDlcdTk0QUUsXHU1RjAyXHU2QjY1XHU4M0I3XHU1M0Q2XHU0RUJBXHU3MjY5XHU1NDBFXHU2MjY3XHU4ODRDXHU2NTNCXHU1MUZCXHU1MkE4XHU0RjVDXHJcbiAgICAgICAgQXR0YWNrQnRuLm9uUHJlc3NlZC5hZGQoKCk9PntcclxuXHRcdFx0XHRHYW1lcGxheS5hc3luY0dldEN1cnJlbnRQbGF5ZXIoKS50aGVuKChwbGF5ZXIpID0+IHtcclxuXHRcdFx0XHRcdHRoaXMuQ2hhcmFjdGVyID0gcGxheWVyLmNoYXJhY3RlclxyXG5cdFx0XHRcdFx0Ly9cdThCQTlcdTUyQThcdTc1M0JcdTUzRUFcdTU3MjhcdTRFMEFcdTUzNEFcdThFQUJcdTY0QURcdTY1M0VcclxuXHRcdFx0XHRcdGxldCBhbmltMSA9IHBsYXllci5jaGFyYWN0ZXIubG9hZEFuaW1hdGlvbihcIjYxMjQ1XCIpXHJcblx0XHRcdFx0XHRhbmltMS5zbG90ID0gR2FtZXBsYXkuQW5pbVNsb3QuVXBwZXJcclxuXHRcdFx0XHRcdC8vXHU4OUQyXHU4MjcyXHU2MjY3XHU4ODRDXHU2NTNCXHU1MUZCXHU1MkE4XHU0RjVDXHJcblx0XHRcdFx0XHRpZihhbmltMS5pc1BsYXlpbmcpe1xyXG5cdFx0XHRcdFx0XHRyZXR1cm5cclxuXHRcdFx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFx0XHRhbmltMS5wbGF5KClcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0fSlcdFxyXG5cclxuXHRcdC8vXHU3MEI5XHU1MUZCXHU0RUE0XHU0RTkyXHU2MzA5XHU5NEFFLFx1NUYwMlx1NkI2NVx1ODNCN1x1NTNENlx1NEVCQVx1NzI2OVx1NTQwRVx1NjI2N1x1ODg0Q1x1NEVBNFx1NEU5Mlx1NTJBOFx1NEY1Q1xyXG4gICAgICAgIEludGVyYWN0QnRuLm9uUHJlc3NlZC5hZGQoKCk9PntcclxuXHRcdFx0XHRHYW1lcGxheS5hc3luY0dldEN1cnJlbnRQbGF5ZXIoKS50aGVuKChwbGF5ZXIpID0+IHtcclxuXHRcdFx0XHRcdHRoaXMuQ2hhcmFjdGVyID0gcGxheWVyLmNoYXJhY3RlclxyXG5cdFx0XHRcdFx0Ly9cdThCQTlcdTUyQThcdTc1M0JcdTUzRUFcdTU3MjhcdTRFMEFcdTUzNEFcdThFQUJcdTY0QURcdTY1M0VcclxuXHRcdFx0XHRcdGxldCBhbmltMiA9IHBsYXllci5jaGFyYWN0ZXIubG9hZEFuaW1hdGlvbihcIjk1Nzc3XCIpXHJcblx0XHRcdFx0XHRhbmltMi5zbG90ID0gR2FtZXBsYXkuQW5pbVNsb3QuVXBwZXJcclxuXHRcdFx0XHRcdC8vXHU4OUQyXHU4MjcyXHU2MjY3XHU4ODRDXHU0RUE0XHU0RTkyXHU1MkE4XHU0RjVDXHJcblx0XHRcdFx0XHRpZihhbmltMi5pc1BsYXlpbmcpe1xyXG5cdFx0XHRcdFx0XHRyZXR1cm5cclxuXHRcdFx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFx0XHRhbmltMi5wbGF5KClcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cclxuXHRcdH0pXHRcclxuXHRcdFxyXG4gICAgfVxyXG5cclxuXHQvKiogXHJcblx0ICogXHU2Nzg0XHU5MDIwVUlcdTY1ODdcdTRFRjZcdTYyMTBcdTUyOUZcdTU0MEVcdUZGMENvblN0YXJ0XHU0RTRCXHU1NDBFIFxyXG5cdCAqIFx1NUJGOVx1NEU4RVVJXHU3Njg0XHU2ODM5XHU4MjgyXHU3MEI5XHU3Njg0XHU2REZCXHU1MkEwXHU2NENEXHU0RjVDXHVGRjBDXHU4RkRCXHU4ODRDXHU4QzAzXHU3NTI4XHJcblx0ICogXHU2Q0U4XHU2MTBGXHVGRjFBXHU4QkU1XHU0RThCXHU0RUY2XHU1M0VGXHU4MEZEXHU0RjFBXHU1OTFBXHU2QjIxXHU4QzAzXHU3NTI4XHJcblx0ICovXHJcblx0cHJvdGVjdGVkIG9uQWRkZWQoKSB7XHJcblx0fVxyXG5cclxuXHQvKiogXHJcblx0ICogXHU2Nzg0XHU5MDIwVUlcdTY1ODdcdTRFRjZcdTYyMTBcdTUyOUZcdTU0MEVcdUZGMENvbkFkZGVkXHU0RTRCXHU1NDBFXHJcblx0ICogXHU1QkY5XHU0RThFVUlcdTc2ODRcdTY4MzlcdTgyODJcdTcwQjlcdTc2ODRcdTc5RkJcdTk2NjRcdTY0Q0RcdTRGNUNcdUZGMENcdThGREJcdTg4NENcdThDMDNcdTc1MjhcclxuXHQgKiBcdTZDRThcdTYxMEZcdUZGMUFcdThCRTVcdTRFOEJcdTRFRjZcdTUzRUZcdTgwRkRcdTRGMUFcdTU5MUFcdTZCMjFcdThDMDNcdTc1MjhcclxuXHQgKi9cclxuXHRwcm90ZWN0ZWQgb25SZW1vdmVkKCkge1xyXG5cdH1cclxuXHJcblx0LyoqIFxyXG5cdCogXHU2Nzg0XHU5MDIwVUlcdTY1ODdcdTRFRjZcdTYyMTBcdTUyOUZcdTU0MEVcdUZGMENVSVx1NUJGOVx1OEM2MVx1NTE4RFx1ODhBQlx1OTUwMFx1NkJDMVx1NjVGNlx1OEMwM1x1NzUyOCBcclxuXHQqIFx1NkNFOFx1NjEwRlx1RkYxQVx1OEZEOVx1NEU0Qlx1NTQwRVVJXHU1QkY5XHU4QzYxXHU1REYyXHU3RUNGXHU4OEFCXHU5NTAwXHU2QkMxXHU0RTg2XHVGRjBDXHU5NzAwXHU4OTgxXHU3OUZCXHU5NjY0XHU2MjQwXHU2NzA5XHU1QkY5XHU4QkU1XHU2NTg3XHU0RUY2XHU1NDhDVUlcdTc2RjhcdTUxNzNcdTVCRjlcdThDNjFcdTRFRTVcdTUzQ0FcdTVCNTBcdTVCRjlcdThDNjFcdTc2ODRcdTVGMTVcdTc1MjhcclxuXHQqL1xyXG5cdHByb3RlY3RlZCBvbkRlc3Ryb3koKSB7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQqIFx1NkJDRlx1NEUwMFx1NUUyN1x1OEMwM1x1NzUyOFxyXG5cdCogXHU5MDFBXHU4RkM3Y2FuVXBkYXRlXHU1M0VGXHU0RUU1XHU1RjAwXHU1NDJGXHU1MTczXHU5NUVEXHU4QzAzXHU3NTI4XHJcblx0KiBkdCBcdTRFMjRcdTVFMjdcdThDMDNcdTc1MjhcdTc2ODRcdTY1RjZcdTk1RjRcdTVERUVcdUZGMENcdTZCRUJcdTc5RDJcclxuXHQqL1xyXG5cdC8vcHJvdGVjdGVkIG9uVXBkYXRlKGR0IDpudW1iZXIpIHtcclxuXHQvL31cclxuXHJcblx0LyoqXHJcblx0ICogXHU4QkJFXHU3RjZFXHU2NjNFXHU3OTNBXHU2NUY2XHU4OUU2XHU1M0QxXHJcblx0ICovXHJcblx0Ly9wcm90ZWN0ZWQgb25TaG93KC4uLnBhcmFtczphbnlbXSkge1xyXG5cdC8vfVxyXG5cclxuXHQvKipcclxuXHQgKiBcdThCQkVcdTdGNkVcdTRFMERcdTY2M0VcdTc5M0FcdTY1RjZcdTg5RTZcdTUzRDFcclxuXHQgKi9cclxuXHQvL3Byb3RlY3RlZCBvbkhpZGUoKSB7XHJcblx0Ly99XHJcblxyXG5cdC8qKlxyXG5cdCAqIFx1NUY1M1x1OEZEOVx1NEUyQVVJXHU3NTRDXHU5NzYyXHU2NjJGXHU1M0VGXHU0RUU1XHU2M0E1XHU2NTM2XHU0RThCXHU0RUY2XHU3Njg0XHU2NUY2XHU1MDE5XHJcblx0ICogXHU2MjRCXHU2MzA3XHU2MjE2XHU1MjE5XHU5RjIwXHU2ODA3XHU4OUU2XHU1M0QxXHU0RTAwXHU2QjIxVG91Y2hcdTY1RjZcdTg5RTZcdTUzRDFcclxuXHQgKiBcdThGRDRcdTU2REVcdTRFOEJcdTRFRjZcdTY2MkZcdTU0MjZcdTU5MDRcdTc0MDZcdTRFODZcclxuXHQgKiBcdTU5ODJcdTY3OUNcdTU5MDRcdTc0MDZcdTRFODZcdUZGMENcdTkwQTNcdTRFNDhcdThGRDlcdTRFMkFVSVx1NzU0Q1x1OTc2Mlx1NTNFRlx1NEVFNVx1NjNBNVx1NjUzNlx1OEZEOVx1NkIyMVRvdWNoXHU1NDBFXHU3RUVEXHU3Njg0TW92ZVx1NTQ4Q0VuZFx1NEU4Qlx1NEVGNlxyXG5cdCAqIFx1NTk4Mlx1Njc5Q1x1NkNBMVx1NjcwOVx1NTkwNFx1NzQwNlx1RkYwQ1x1OTBBM1x1NEU0OFx1OEZEOVx1NEUyQVVJXHU3NTRDXHU5NzYyXHU1QzMxXHU2NUUwXHU2Q0Q1XHU2M0E1XHU2NTM2XHU4RkQ5XHU2QjIxVG91Y2hcdTU0MEVcdTdFRURcdTc2ODRNb3ZlXHU1NDhDRW5kXHU0RThCXHU0RUY2XHJcblx0ICovXHJcblx0Ly9wcm90ZWN0ZWQgb25Ub3VjaFN0YXJ0ZWQoSW5HZW1vdHJ5IDpVSS5HZW9tZXRyeSxJblBvaW50ZXJFdmVudDpVSS5Qb2ludGVyRXZlbnQpIDpVSS5FdmVudFJlcGx5e1xyXG5cdC8vXHRyZXR1cm4gVUkuRXZlbnRSZXBseS51bkhhbmRsZWQgLy9VSS5FdmVudFJlcGx5LmhhbmRsZWRcclxuXHQvL31cclxuXHJcblx0LyoqXHJcblx0ICogXHU2MjRCXHU2MzA3XHU2MjE2XHU1MjE5XHU5RjIwXHU2ODA3XHU1MThEVUlcdTc1NENcdTk3NjJcdTRFMEFcdTc5RkJcdTUyQThcdTY1RjZcclxuXHQgKi9cclxuXHQvL3Byb3RlY3RlZCBvblRvdWNoTW92ZWQoSW5HZW1vdHJ5IDpVSS5HZW9tZXRyeSxJblBvaW50ZXJFdmVudDpVSS5Qb2ludGVyRXZlbnQpIDpVSS5FdmVudFJlcGx5e1xyXG5cdC8vXHRyZXR1cm4gVUkuRXZlbnRSZXBseS51bkhhbmRsZWQgLy9VSS5FdmVudFJlcGx5LmhhbmRsZWRcclxuXHQvL31cclxuXHJcblx0LyoqXHJcblx0ICogXHU2MjRCXHU2MzA3XHU2MjE2XHU1MjE5XHU5RjIwXHU2ODA3XHU3OUJCXHU1RjAwVUlcdTc1NENcdTk3NjJcdTY1RjZcclxuXHQgKi9cclxuXHQvL3Byb3RlY3RlZCBPblRvdWNoRW5kZWQoSW5HZW1vdHJ5IDpVSS5HZW9tZXRyeSxJblBvaW50ZXJFdmVudDpVSS5Qb2ludGVyRXZlbnQpIDpVSS5FdmVudFJlcGx5e1xyXG5cdC8vXHRyZXR1cm4gVUkuRXZlbnRSZXBseS51bkhhbmRsZWQgLy9VSS5FdmVudFJlcGx5LmhhbmRsZWRcclxuXHQvL31cclxuXHJcblx0LyoqXHJcblx0ICogXHU1RjUzXHU1NzI4VUlcdTc1NENcdTk3NjJcdTRFMEFcdThDMDNcdTc1MjhkZXRlY3REcmFnL2RldGVjdERyYWdJZlByZXNzZWRcdTY1RjZcdTg5RTZcdTUzRDFcdTRFMDBcdTZCMjFcclxuXHQgKiBcdTUzRUZcdTRFRTVcdTg5RTZcdTUzRDFcdTRFMDBcdTZCMjFcdTYyRDZcdTYyRkRcdTRFOEJcdTRFRjZcdTc2ODRcdTVGMDBcdTU5Q0JcdTc1MUZcdTYyMTBcclxuXHQgKiBcdThGRDRcdTU2REVcdTRFMDBcdTZCMjFcdTc1MUZcdTYyMTBcdTc2ODRcdTYyRDZcdTYyRkRcdTRFOEJcdTRFRjYgbmV3RHJhZ0Ryb3BcdTUzRUZcdTRFRTVcdTc1MUZcdTYyMTBcdTRFMDBcdTZCMjFcdTRFOEJcdTRFRjZcclxuXHQgKi9cclxuXHQvL3Byb3RlY3RlZCBvbkRyYWdEZXRlY3RlZChJbkdlbW90cnkgOlVJLkdlb21ldHJ5LEluUG9pbnRlckV2ZW50OlVJLlBvaW50ZXJFdmVudCk6VUkuRHJhZ0Ryb3BPcGVyYXRpb24ge1xyXG5cdC8vXHRyZXR1cm4gdGhpcy5uZXdEcmFnRHJvcChudWxsKVxyXG5cdC8vfVxyXG5cclxuXHQvKipcclxuXHQgKiBcdTYyRDZcdTYyRkRcdTY0Q0RcdTRGNUNcdTc1MUZcdTYyMTBcdTRFOEJcdTRFRjZcdTg5RTZcdTUzRDFcdTU0MEVcdTdFQ0ZcdThGQzdcdThGRDlcdTRFMkFVSVx1NjVGNlx1ODlFNlx1NTNEMVxyXG5cdCAqIFx1OEZENFx1NTZERXRydWVcdTc2ODRcdThCRERcdTg4NjhcdTc5M0FcdTU5MDRcdTc0MDZcdTRFODZcdThGRDlcdTZCMjFcdTRFOEJcdTRFRjZcdUZGMENcdTRFMERcdTRGMUFcdTUxOERcdTVGODBcdThGRDlcdTRFMkFVSVx1NzY4NFx1NEUwQlx1NEUwMFx1NUM0Mlx1NzY4NFVJXHU3RUU3XHU3RUVEXHU1MTkyXHU2Q0UxXHU4RkQ5XHU0RTJBXHU0RThCXHU0RUY2XHJcblx0ICovXHJcblx0Ly9wcm90ZWN0ZWQgb25EcmFnT3ZlcihJbkdlbW90cnkgOlVJLkdlb21ldHJ5LEluRHJhZ0Ryb3BFdmVudDpVSS5Qb2ludGVyRXZlbnQsSW5EcmFnRHJvcE9wZXJhdGlvbjpVSS5EcmFnRHJvcE9wZXJhdGlvbik6Ym9vbGVhbiB7XHJcblx0Ly9cdHJldHVybiB0cnVlXHJcblx0Ly99XHJcblxyXG5cdC8qKlxyXG5cdCAqIFx1NjJENlx1NjJGRFx1NjRDRFx1NEY1Q1x1NzUxRlx1NjIxMFx1NEU4Qlx1NEVGNlx1ODlFNlx1NTNEMVx1NTQwRVx1NTcyOFx1OEZEOVx1NEUyQVVJXHU5MUNBXHU2NTNFXHU1QjhDXHU2MjEwXHU2NUY2XHJcblx0ICogXHU4RkQ0XHU1NkRFdHJ1ZVx1NzY4NFx1OEJERFx1ODg2OFx1NzkzQVx1NTkwNFx1NzQwNlx1NEU4Nlx1OEZEOVx1NkIyMVx1NEU4Qlx1NEVGNlx1RkYwQ1x1NEUwRFx1NEYxQVx1NTE4RFx1NUY4MFx1OEZEOVx1NEUyQVVJXHU3Njg0XHU0RTBCXHU0RTAwXHU1QzQyXHU3Njg0VUlcdTdFRTdcdTdFRURcdTUxOTJcdTZDRTFcdThGRDlcdTRFMkFcdTRFOEJcdTRFRjZcclxuXHQgKi9cclxuXHQvL3Byb3RlY3RlZCBvbkRyb3AoSW5HZW1vdHJ5IDpVSS5HZW9tZXRyeSxJbkRyYWdEcm9wRXZlbnQ6VUkuUG9pbnRlckV2ZW50LEluRHJhZ0Ryb3BPcGVyYXRpb246VUkuRHJhZ0Ryb3BPcGVyYXRpb24pOmJvb2xlYW4ge1xyXG5cdC8vXHRyZXR1cm4gdHJ1ZVxyXG5cdC8vfVxyXG5cclxuXHQvKipcclxuXHQgKiBcdTYyRDZcdTYyRkRcdTY0Q0RcdTRGNUNcdTc1MUZcdTYyMTBcdTRFOEJcdTRFRjZcdTg5RTZcdTUzRDFcdTU0MEVcdThGREJcdTUxNjVcdThGRDlcdTRFMkFVSVx1NjVGNlx1ODlFNlx1NTNEMVxyXG5cdCAqL1xyXG5cdC8vcHJvdGVjdGVkIG9uRHJhZ0VudGVyKEluR2Vtb3RyeSA6VUkuR2VvbWV0cnksSW5EcmFnRHJvcEV2ZW50OlVJLlBvaW50ZXJFdmVudCxJbkRyYWdEcm9wT3BlcmF0aW9uOlVJLkRyYWdEcm9wT3BlcmF0aW9uKSB7XHJcblx0Ly99XHJcblxyXG5cdC8qKlxyXG5cdCAqIFx1NjJENlx1NjJGRFx1NjRDRFx1NEY1Q1x1NzUxRlx1NjIxMFx1NEU4Qlx1NEVGNlx1ODlFNlx1NTNEMVx1NTQwRVx1NzlCQlx1NUYwMFx1OEZEOVx1NEUyQVVJXHU2NUY2XHU4OUU2XHU1M0QxXHJcblx0ICovXHJcblx0Ly9wcm90ZWN0ZWQgb25EcmFnTGVhdmUoSW5HZW1vdHJ5IDpVSS5HZW9tZXRyeSxJbkRyYWdEcm9wRXZlbnQ6VUkuUG9pbnRlckV2ZW50KSB7XHJcblx0Ly99XHJcblx0XHJcblx0LyoqXHJcblx0ICogXHU2MkQ2XHU2MkZEXHU2NENEXHU0RjVDXHU3NTFGXHU2MjEwXHU0RThCXHU0RUY2XHU4OUU2XHU1M0QxXHU1NDBFXHVGRjBDXHU2Q0ExXHU2NzA5XHU1QjhDXHU2MjEwXHU1QjhDXHU2MjEwXHU3Njg0XHU2MkQ2XHU2MkZEXHU0RThCXHU0RUY2XHU4MDBDXHU1M0Q2XHU2RDg4XHU2NUY2XHU4OUU2XHU1M0QxXHJcblx0ICovXHJcblx0Ly9wcm90ZWN0ZWQgb25EcmFnQ2FuY2VsbGVkKEluR2Vtb3RyeSA6VUkuR2VvbWV0cnksSW5EcmFnRHJvcEV2ZW50OlVJLlBvaW50ZXJFdmVudCkge1xyXG5cdC8vfVxyXG5cclxufVxyXG4iLCAiZXhwb3J0IG5hbWVzcGFjZSBHYW1lRGVme1xyXG4gICAgLyogXHU1QkY5XHU4QzYxXHU2QzYwXHU2M0E1XHU1M0UzICovXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElQb29sPFQ+IHtcclxuXHJcbiAgICAgICAgYWxsb2NhdGUoKTogVFxyXG4gICAgXHJcbiAgICAgICAgcmVjeWNsZShvYmo6IFQpOiBib29sZWFuXHJcbiAgICBcclxuICAgICAgICByZWxlYXNlKCk6IHZvaWRcclxuICAgIFxyXG4gICAgfVxyXG4gICAgLyogXHU1QkY5XHU4QzYxXHU1REU1XHU1MzgyXHU2M0E1XHU1M0UzICovXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElPYmplY3RGYWN0b3J5PFQ+IHtcclxuXHJcbiAgICAgICAgY3JlYXRlKCk6IFRcclxuXHJcbiAgICAgICAgZGVzdHJveShvYmo6IFQpOiB2b2lkXHJcblxyXG4gICAgfVxyXG4gICAgLyogXHU1QkY5XHU4QzYxXHU2QzYwXHU2MkJEXHU4QzYxXHU2QTIxXHU2NzdGXHU3QzdCICovXHJcbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgUG9vbDxUPiBpbXBsZW1lbnRzIElQb29sPFQ+IHtcclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIG1DYWNoZVN0YWNrOiBBcnJheTxUPiA9IG5ldyBBcnJheTxUPigpXHJcblxyXG4gICAgICAgIG1Vc2luZ0FycmF5OiBBcnJheTxUPiA9IG5ldyBBcnJheTxUPigpXHJcblxyXG4gICAgICAgIGdldCBDYWNoZVN0YWNrQ291bnQoKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubUNhY2hlU3RhY2subGVuZ3RoXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgVXNpbmdDb3VudCgpOiBudW1iZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tVXNpbmdBcnJheS5sZW5ndGhcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBtRmFjdG9yeTogSU9iamVjdEZhY3Rvcnk8VD5cclxuXHJcbiAgICAgICAgYWxsb2NhdGUoKTogVCB7XHJcbiAgICAgICAgICAgIGxldCBvYmogPSB0aGlzLm1DYWNoZVN0YWNrLmxlbmd0aCA+IDAgPyB0aGlzLm1DYWNoZVN0YWNrLnBvcCgpIDogdGhpcy5tRmFjdG9yeS5jcmVhdGUoKVxyXG4gICAgICAgICAgICB0aGlzLm1Vc2luZ0FycmF5LnB1c2gob2JqKVxyXG4gICAgICAgICAgICByZXR1cm4gb2JqXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhYnN0cmFjdCByZWN5Y2xlKG9iajogVCk6IGJvb2xlYW5cclxuXHJcbiAgICAgICAgcmVsZWFzZSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAgO2kgPCB0aGlzLm1Vc2luZ0FycmF5Lmxlbmd0aCA7aSsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5tVXNpbmdBcnJheVtpXVxyXG4gICAgICAgICAgICAgICAgdGhpcy5tRmFjdG9yeS5kZXN0cm95KGVsZW1lbnQpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5tVXNpbmdBcnJheS5sZW5ndGggPSAwXHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCA7aSA8IHRoaXMubUNhY2hlU3RhY2subGVuZ3RoIDtpKyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLm1DYWNoZVN0YWNrW2ldXHJcbiAgICAgICAgICAgICAgICB0aGlzLm1GYWN0b3J5LmRlc3Ryb3koZWxlbWVudClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm1DYWNoZVN0YWNrLmxlbmd0aCA9IDBcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgLyogXHU4MUVBXHU1QjlBXHU0RTQ5XHU1REU1XHU1MzgyXHU2QTIxXHU2NzdGXHU3QzdCICovXHJcbiAgICBleHBvcnQgY2xhc3MgQ3VzdG9tT2JqZWN0RmFjdG9yeTxUPiBpbXBsZW1lbnRzIElPYmplY3RGYWN0b3J5PFQ+IHtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBtRmFjdG9yeUNyZWF0ZU1ldGhvZDogKCkgPT4gVFxyXG5cclxuICAgICAgICBwcml2YXRlIG1GYWN0b3J5RGVzdHJveU1ldGhvZDogKG9iajogVCkgPT4gdm9pZFxyXG5cclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IoZmFjdG9yeUNyZWF0ZU1ldGhvZDogKCkgPT4gVCwgZmFjdG9yeURlc3Ryb3lNZXRob2Q6IChvYmo6IFQpID0+IHZvaWQpIHtcclxuICAgICAgICAgICAgdGhpcy5tRmFjdG9yeUNyZWF0ZU1ldGhvZCA9IGZhY3RvcnlDcmVhdGVNZXRob2RcclxuICAgICAgICAgICAgdGhpcy5tRmFjdG9yeURlc3Ryb3lNZXRob2QgPSBmYWN0b3J5RGVzdHJveU1ldGhvZFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY3JlYXRlKCk6IFQge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tRmFjdG9yeUNyZWF0ZU1ldGhvZCgpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkZXN0cm95KG9iajogVCk6IHZvaWQge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tRmFjdG9yeURlc3Ryb3lNZXRob2Qob2JqKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICAvKiBcdTVCRjlcdThDNjFcdTZDNjBcdTZBMjFcdTY3N0ZcdTdDN0IgKi9cclxuICAgIGV4cG9ydCBjbGFzcyBTaW1wbGVPYmplY3RQb29sPFQ+IGV4dGVuZHMgUG9vbDxUPiB7XHJcblxyXG4gICAgICAgIG1SZXNldE1ldGhvZDogRnVuY3Rpb25cclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IoZmFjdG9yeUNyZWF0ZU1ldGhvZDogKCkgPT4gVCwgZmFjdG9yeURlc3Ryb3lNZXRob2Q6IChvYmo6IFQpID0+IHZvaWQsIHJlc2V0TWV0aG9kOiBGdW5jdGlvbiA9IG51bGwpIHtcclxuICAgICAgICAgICAgc3VwZXIoKVxyXG4gICAgICAgICAgICB0aGlzLm1GYWN0b3J5ID0gbmV3IEN1c3RvbU9iamVjdEZhY3Rvcnk8VD4oZmFjdG9yeUNyZWF0ZU1ldGhvZCwgZmFjdG9yeURlc3Ryb3lNZXRob2QpXHJcbiAgICAgICAgICAgIHRoaXMubVJlc2V0TWV0aG9kID0gcmVzZXRNZXRob2RcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJlY3ljbGUob2JqOiBUKTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1DYWNoZVN0YWNrLmluZGV4T2Yob2JqKSA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5tUmVzZXRNZXRob2QgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tUmVzZXRNZXRob2Qob2JqKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBpbmRleCA9IHRoaXMubVVzaW5nQXJyYXkuaW5kZXhPZihvYmopXHJcbiAgICAgICAgICAgIGlmIChpbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1Vc2luZ0FycmF5LnNwbGljZShpbmRleCwgMSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm1DYWNoZVN0YWNrLnB1c2gob2JqKVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmVjeWNsZUFsbCgpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAgO2kgPCB0aGlzLm1Vc2luZ0FycmF5Lmxlbmd0aCA7aSsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5tVXNpbmdBcnJheVtpXVxyXG4gICAgICAgICAgICAgICAgdGhpcy5tUmVzZXRNZXRob2QoZWxlbWVudClcclxuICAgICAgICAgICAgICAgIHRoaXMubUNhY2hlU3RhY2sucHVzaChlbGVtZW50KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubVVzaW5nQXJyYXkubGVuZ3RoID0gMFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpbnRUb3RhbFNpemUoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJ0b3RhbCBzaXplOiBcIiArICh0aGlzLlVzaW5nQ291bnQgKyB0aGlzLkNhY2hlU3RhY2tDb3VudCkpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyogXHU5MUNEXHU1MjlCICovXHJcbiAgICBleHBvcnQgY29uc3QgR1JBVklUQUlPTkFMX0FDQ0VMRVJBVElPTjogbnVtYmVyID0gOS44XHJcbiAgICAvKiBcdTY3MDBcdTU5MjdcdTVCNTBcdTVGMzlcdTkwMUZcdTVFQTYgKi9cclxuICAgIGV4cG9ydCBjb25zdCBNQVhfU0hPT1RTUEVFRDogbnVtYmVyID0gMTAwMDFcclxuICAgIC8qIGRlYnVnXHU2ODA3XHU4QkM2ICovXHJcbiAgICBleHBvcnQgY29uc3QgREVCVUdfRkxBRzogYm9vbGVhbiA9IGZhbHNlXHJcbiAgICAvKiBcdTc1MjhcdTRFOEVcdTgzQjdcdTUzRDZcdTUzRDFcdTVDMDRcdTY1QjlcdTU0MTFcdTc2ODRcdTVDMDRcdTdBMEJcdThERERcdTc5QkIgKi9cclxuICAgIGV4cG9ydCBjb25zdCBTSE9PVF9SQU5HRTogbnVtYmVyID0gMTAwMDAwXHJcbiAgICAvKiBcdTVGMzlcdTU4RjNcdTYyOUJcdTVDMDRcdTYzMDFcdTdFRURcdTY1RjZcdTk1RjQgKi9cclxuICAgIGV4cG9ydCBjb25zdCBDQVNJTkdfTElGRTogbnVtYmVyID0gMVxyXG4gICAgLyogXHU1RjM5XHU1OEYzXHU2MjlCXHU1QzA0XHU0RjREXHU3RjZFXHU1MDRGXHU3OUZCICovXHJcbiAgICBleHBvcnQgY29uc3QgQ0FTSU5HX09GRlNFVDogVHlwZS5WZWN0b3IgPSBuZXcgVHlwZS5WZWN0b3IoOCwgNSwgMTApXHJcbn0iLCAiXHVGRUZGaW1wb3J0IFdlYXBvbkRyaXZlciBmcm9tIFwiLi4vV2VhcG9uQmFzZS9XZWFwb25CYXNlQ2xzXCI7XHJcblxyXG5AQ29yZS5DbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZXJXZWFwb25IYW5kbGVyIGV4dGVuZHMgQ29yZS5TY3JpcHQge1xyXG5cclxuICAgIC8qKiBcdTVGNTNcdTgxMUFcdTY3MkNcdTg4QUJcdTVCOUVcdTRGOEJcdTU0MEVcdUZGMENcdTRGMUFcdTU3MjhcdTdCMkNcdTRFMDBcdTVFMjdcdTY2RjRcdTY1QjBcdTUyNERcdThDMDNcdTc1MjhcdTZCNjRcdTUxRkRcdTY1NzAgKi9cclxuICAgIHByb3RlY3RlZCBhc3luYyBvblN0YXJ0KCkge1xyXG4gICAgICAgIFRpbWVVdGlsLmRlbGF5U2Vjb25kKDEwKVxyXG4gICAgICAgIGxldCBIb3RXZWFwb24gPSBhd2FpdCBHYW1lT2JqZWN0LmFzeW5jU3Bhd24oeyBndWlkIDogXCJIb3RXZWFwb25cIiwgcmVwbGljYXRlcyA6IHRydWV9KVxyXG4gICAgICAgIGxldCBpbnMgPSBhd2FpdCBTY3JpcHQuc3Bhd25TY3JpcHQoV2VhcG9uRHJpdmVyLCB0cnVlLCBIb3RXZWFwb24pXHJcbiAgICAgICAgaW5zLkluaXRXZWFwb24oMTAwKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHU1NDY4XHU2NzFGXHU1MUZEXHU2NTcwIFx1NkJDRlx1NUUyN1x1NjI2N1x1ODg0Q1xyXG4gICAgICogXHU2QjY0XHU1MUZEXHU2NTcwXHU2MjY3XHU4ODRDXHU5NzAwXHU4OTgxXHU1QzA2dGhpcy51c2VVcGRhdGVcdThENEJcdTUwM0NcdTRFM0F0cnVlXHJcbiAgICAgKiBAcGFyYW0gZHQgXHU1RjUzXHU1MjREXHU1RTI3XHU0RTBFXHU0RTBBXHU0RTAwXHU1RTI3XHU3Njg0XHU1RUY2XHU4RkRGIC8gXHU3OUQyXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBvblVwZGF0ZShkdDogbnVtYmVyKTogdm9pZCB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKiBcdTgxMUFcdTY3MkNcdTg4QUJcdTk1MDBcdTZCQzFcdTY1RjZcdTY3MDBcdTU0MEVcdTRFMDBcdTVFMjdcdTYyNjdcdTg4NENcdTVCOENcdThDMDNcdTc1MjhcdTZCNjRcdTUxRkRcdTY1NzAgKi9cclxuICAgIHByb3RlY3RlZCBvbkRlc3Ryb3koKTogdm9pZCB7XHJcblxyXG4gICAgfVxyXG59IiwgImltcG9ydCB7IElXZWFwb25Db25maWdFbGVtZW50LCBXZWFwb25Db25maWdDb25maWcgfSBmcm9tIFwiLi4vQ29uZmlnL1dlYXBvbkNvbmZpZ1wiXHJcbmltcG9ydCB7IEdhbWVEZWYgfSBmcm9tIFwiLi4vR2FtZURlZlwiXHJcbmltcG9ydCBBbW1vIGZyb20gXCIuL0FtbW9CYXNlQ2xzXCJcclxuaW1wb3J0IENhc2luZyBmcm9tIFwiLi9DYXNpbmdCYXNlQ2xzXCJcclxuaW1wb3J0IFdlYXBvblVJIGZyb20gXCIuL1dlYXBvblVJXCJcclxuaW1wb3J0IHsgR2FtZUNvbmZpZyB9IGZyb20gXCIuLi9Db25maWcvR2FtZUNvbmZpZ1wiXHJcbmltcG9ydCB7IFByZWZhYkV2ZW50IH0gZnJvbSBcIi4uLy4uL3ByZWZhYkV2ZW50L1ByZWZhYkV2ZW50XCJcclxuaW1wb3J0IHsgSUFjdGlvbkVsZW1lbnQgfSBmcm9tIFwiLi4vQ29uZmlnL0FjdGlvblwiXHJcbmltcG9ydCB7IElXZWFwb25SZXNvdXJjZXNFbGVtZW50IH0gZnJvbSBcIi4uL0NvbmZpZy9XZWFwb25SZXNvdXJjZXNcIlxyXG5cclxuQENvcmUuQ2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2VhcG9uRHJpdmVyIGV4dGVuZHMgQ29yZS5TY3JpcHQge1xyXG5cclxuXHRAQ29yZS5Qcm9wZXJ0eSh7IGhpZGVJbkVkaXRvcjogdHJ1ZSwgcmVwbGljYXRlZDogdHJ1ZSwgb25DaGFuZ2VkOiBcIm9uSWRDaGFuZ2VkXCIgfSlcclxuXHRwcml2YXRlIGlkIDogbnVtYmVyXHJcblx0LyoqICovXHJcblx0cHVibGljIGNvbmZpZzogSVdlYXBvbkNvbmZpZ0VsZW1lbnRcclxuXHQvKipcdTY2MkZcdTU0MjZcdTVCOENcdTYyMTBcdTUyMURcdTU5Q0JcdTUzMTYgKi9cclxuXHRwcml2YXRlIGhhc0luaXQ6IGJvb2xlYW4gPSBmYWxzZVxyXG5cclxuXHRAQ29yZS5Qcm9wZXJ0eSh7IGhpZGVJbkVkaXRvcjogdHJ1ZSwgcmVwbGljYXRlZDogdHJ1ZSwgb25DaGFuZ2VkOiBcIm9uRXF1aXBkQ2hhbmdlZFwiIH0pXHJcblx0cHVibGljIGlzRXF1aXBlZDogYm9vbGVhbiA9IGZhbHNlXHJcblxyXG5cdC8qIFx1NzBFRFx1NkI2Nlx1NTY2OFx1OTAzQlx1OEY5MVx1NUJGOVx1OEM2MSAqL1xyXG5cdHdlYXBvbk9iajogR2FtZXBsYXkuSG90V2VhcG9uID0gbnVsbFxyXG5cclxuXHQvKiBcdTUyQThcdTRGNUNcdThENDRcdTZFOTAgKi9cclxuXHR3ZWFwb25BY3Rpb246IElBY3Rpb25FbGVtZW50ID0gbnVsbFxyXG5cclxuXHQvKipcdTZCNjZcdTU2NjhcdTRGN0ZcdTc1MjhcdTc2ODRcdThENDRcdTRFQTdcdTkxNERcdTdGNkUgKi9cclxuXHR3ZWFwb25SZXNvdXJjZXMgOiBJV2VhcG9uUmVzb3VyY2VzRWxlbWVudCA9IG51bGxcclxuXHJcblx0LyogXHU2QjY2XHU1NjY4VUkgKi9cclxuXHR3ZWFwb25VSTogV2VhcG9uVUkgPSBudWxsXHJcblxyXG5cdC8qIFx1NUY1M1x1NTI0RFx1NUJBMlx1NjIzN1x1N0FFRlx1NzNBOVx1NUJCNiAqL1xyXG5cdHBsYXllcjogR2FtZXBsYXkuUGxheWVyID0gbnVsbFxyXG5cclxuXHQvKiBcdTVGNTNcdTUyNERcdTVCQTJcdTYyMzdcdTdBRUZcdTg5RDJcdTgyNzIgKi9cclxuXHRjaGFyYTogR2FtZXBsYXkuQ2hhcmFjdGVyID0gbnVsbFxyXG5cclxuXHQvKiBcdTVGNTNcdTUyNERcdTVCQTJcdTYyMzdcdTdBRUZcdTg5RDJcdTgyNzJcdTY0NDRcdTUwQ0ZcdTY3M0EgKi9cclxuXHRjYW1lcmE6IEdhbWVwbGF5LkNhbWVyYVN5c3RlbSA9IG51bGxcclxuXHJcblx0LyogXHU2MkZFXHU1M0Q2XHU4OUU2XHU1M0QxXHU1NjY4ICovXHJcblx0cGlja1VwVHJpZ2dlcjogR2FtZXBsYXkuVHJpZ2dlciA9IG51bGxcclxuXHJcblx0LyogXHU2ODM5XHU2QjY2XHU1NjY4ICovXHJcblx0d2VhcG9uRW50aXR5Um9vdDogQ29yZS5HYW1lT2JqZWN0ID0gbnVsbFxyXG5cclxuXHQvKiBcdTY4MzlcdTVGMzlcdTgzNkYgKi9cclxuXHRhbW1vRW50aXR5Um9vdDogQ29yZS5HYW1lT2JqZWN0ID0gbnVsbFxyXG5cclxuXHQvKiBcdTVGMzlcdTgzNkZcdTZDNjAgKi9cclxuXHRhbW1vUG9vbDogR2FtZURlZi5TaW1wbGVPYmplY3RQb29sPENvcmUuR2FtZU9iamVjdD4gPSBudWxsXHJcblxyXG5cdC8qIFx1NUYzOVx1ODM2Rlx1NjU3MFx1N0VDNCAqL1xyXG5cdGFtbW9BcnJheTogQXJyYXk8QW1tbz4gPSBbXVxyXG5cclxuXHQvKiBcdTVGMzlcdTU4RjMgKi9cclxuXHRjYXNpbmdFbnRpdHk6IENvcmUuR2FtZU9iamVjdCA9IG51bGxcclxuXHJcblx0LyogXHU1RjM5XHU1OEYzXHU2QzYwICovXHJcblx0Y2FzaW5nUG9vbDogR2FtZURlZi5TaW1wbGVPYmplY3RQb29sPENvcmUuR2FtZU9iamVjdD4gPSBudWxsXHJcblxyXG5cdC8qIFx1NUYzOVx1NThGM1x1NjU3MFx1N0VDNCAqL1xyXG5cdGNhc2luZ0FycmF5OiBBcnJheTxDYXNpbmc+ID0gW11cclxuXHJcblx0LyogXHU1RjAwXHU3MDZCXHU3Mjc5XHU2NTQ4ICovXHJcblx0ZmlyZUVmZmVjdDogR2FtZXBsYXkuUGFydGljbGUgPSBudWxsXHJcblxyXG5cdC8qIFx1NTFGQlx1NEUyRFx1ODlEMlx1ODI3Mlx1NzI3OVx1NjU0OCAqL1xyXG5cdGhpdENoYXJhRWZmZWN0OiBHYW1lcGxheS5QYXJ0aWNsZSA9IG51bGxcclxuXHJcblx0LyogXHU1MUZCXHU0RTJEXHU4OUQyXHU4MjcyXHU3Mjc5XHU2NTQ4XHU2QzYwICovXHJcblx0aGl0Q2hhcmFFZmZlY3RQb29sOiBHYW1lRGVmLlNpbXBsZU9iamVjdFBvb2w8R2FtZXBsYXkuUGFydGljbGU+ID0gbnVsbFxyXG5cclxuXHQvKiBcdTUxRkJcdTRFMkRcdTcyNjlcdTRGNTNcdTcyNzlcdTY1NDggKi9cclxuXHRoaXRFZmZlY3Q6IEdhbWVwbGF5LlBhcnRpY2xlID0gbnVsbFxyXG5cclxuXHQvKiBcdTUxRkJcdTRFMkRcdTcyNjlcdTRGNTNcdTcyNzlcdTY1NDhcdTZDNjAgKi9cclxuXHRoaXRFZmZlY3RQb29sOiBHYW1lRGVmLlNpbXBsZU9iamVjdFBvb2w8R2FtZXBsYXkuUGFydGljbGU+ID0gbnVsbFxyXG5cclxuXHQvKiBcdTk3RjNcdTY1NDhcdTk3RjNcdTkxQ0YgKi9cclxuXHRzdGF0aWMgc291bmRWb2x1bWU6IG51bWJlciA9IDFcclxuXHJcblx0LyogXHU1RjAwXHU3MDZCXHU5N0YzXHU2NTQ4ICovXHJcblx0ZmlyZVNvdW5kOiBHYW1lcGxheS5Tb3VuZCA9IG51bGxcclxuXHJcblx0LyogXHU2MzYyXHU1RjM5XHU5N0YzXHU2NTQ4ICovXHJcblx0cmVsb2FkU291bmQ6IEdhbWVwbGF5LlNvdW5kID0gbnVsbFxyXG5cclxuXHQvKiBcdTRFMEFcdTgxOUJcdTk3RjNcdTY1NDggKi9cclxuXHRsb2FkU291bmQ6IEdhbWVwbGF5LlNvdW5kID0gbnVsbFxyXG5cclxuXHQvKiBcdTc3ODRcdTUxQzZcdTk3RjNcdTY1NDggKi9cclxuXHRhaW1Tb3VuZDogR2FtZXBsYXkuU291bmQgPSBudWxsXHJcblxyXG5cdC8qIFx1NTFGQlx1NEUyRFx1ODlEMlx1ODI3Mlx1OTdGM1x1NjU0OCAqL1xyXG5cdGhpdENoYXJhU291bmQ6IEdhbWVwbGF5LlNvdW5kID0gbnVsbFxyXG5cclxuXHQvKiBcdTUxRkJcdTRFMkRcdTg5RDJcdTgyNzJcdTk3RjNcdTY1NDhcdTZDNjAgKi9cclxuXHRoaXRDaGFyYVNvdW5kUG9vbDogR2FtZURlZi5TaW1wbGVPYmplY3RQb29sPEdhbWVwbGF5LlNvdW5kPiA9IG51bGxcclxuXHJcblx0LyogXHU1MUZCXHU0RTJEXHU3MjY5XHU0RjUzXHU5N0YzXHU2NTQ4ICovXHJcblx0aGl0U291bmQ6IEdhbWVwbGF5LlNvdW5kID0gbnVsbFxyXG5cclxuXHQvKiBcdTUxRkJcdTRFMkRcdTcyNjlcdTRGNTNcdTk3RjNcdTY1NDhcdTZDNjAgKi9cclxuXHRoaXRTb3VuZFBvb2w6IEdhbWVEZWYuU2ltcGxlT2JqZWN0UG9vbDxHYW1lcGxheS5Tb3VuZD4gPSBudWxsXHJcblxyXG5cdC8qIFx1NUYwMFx1NzA2Qlx1NzJCNlx1NjAwMVx1NjgwN1x1OEJDNlx1RkYwQyBpc0ZpcmluZ1x1NjYyRlx1NkI2Nlx1NTY2OFx1NjMwMVx1NjcwOVx1NEVCQVx1NUI5RVx1OTY0NVx1NzY4NFx1NUYwMFx1NzA2Qlx1NzJCNlx1NjAwMSovXHJcblx0aXNGaXJpbmc6IGJvb2xlYW4gPSBmYWxzZVxyXG5cclxuXHQvKiBiRmlyaW5nXHU2NjJGXHU2QjY2XHU1NjY4XHU1QjlFXHU5NjQ1XHU3Njg0XHU1RjAwXHU3MDZCXHU3MkI2XHU2MDAxICovXHJcblx0YkZpcmluZzogYm9vbGVhbiA9IGZhbHNlXHJcblxyXG5cdC8qIFx1NjYyRlx1NTQyNlx1NTNFRlx1NEVFNVx1NUYwMFx1NzA2QiAqL1xyXG5cdGlzQ2FuRmlyZTogbnVtYmVyID0gMFxyXG5cclxuXHQvKiBcdTc3ODRcdTUxQzZcdTcyQjZcdTYwMDFcdTY4MDdcdThCQzYgKi9cclxuXHRpc0FpbW1pbmc6IGJvb2xlYW4gPSBmYWxzZVxyXG5cclxuXHQvKiBcdTcxMjZcdThERERcdTUzRDhcdTUzMTZcdTY4MDdcdThCQzYgKi9cclxuXHRpc1pvb21pbmc6IGJvb2xlYW4gPSBmYWxzZVxyXG5cclxuXHQvKiBcdTk2M0JcdTYzMjFcdTcyQjZcdTYwMDFcdTY4MDdcdThCQzYgKi9cclxuXHRpc0Jsb2NrOiBib29sZWFuID0gZmFsc2VcclxuXHJcblx0aXNBdXRvUmVsb2FkOiBib29sZWFuID0gZmFsc2VcclxuXHJcblx0dG90YWxBbW1vOiBudW1iZXJcclxuXHJcblx0LyoqIFx1NTI2OVx1NEY1OVx1NjMwMVx1NjcwOVx1NjVGNlx1OTVGNCAqL1xyXG5cdHByaXZhdGUgX3Jlc3RUaW1lOiBudW1iZXJcclxuXHQvLyAvKiBcdTVGMzlcdTgzNkZcdTk4REVcdTg4NENcdTY1QjlcdTU0MTEgKi9cclxuXHQvLyBhbW1vRGlyZWN0aW9uOiBUeXBlLlZlY3RvciA9IFR5cGUuVmVjdG9yLnplcm9cclxuXHJcblx0cHJpdmF0ZSBfcm90YXRlUm90YXRpb246IFJvdGF0aW9uID0gUm90YXRpb24uemVyb1xyXG5cclxuXHRwcml2YXRlIHByZWxvYWRBc3NldHM6IEFycmF5PHN0cmluZz5cclxuXHJcblx0LyogXHU1MUZCXHU0RTJEXHU1NkRFXHU4QzAzXHU1MUZEXHU2NTcwICovXHJcblx0Y2xpZW50T25IaXQ6IChoaXRSZXN1bHQ6IENvcmUuR2FtZU9iamVjdFtdIHwgR2FtZXBsYXkuSGl0UmVzdWx0W10sIGF0dGFja1BsYXllcjogbnVtYmVyLCBpc09iajogYm9vbGVhbikgPT4gdm9pZFxyXG5cclxuXHQvKiBcdTk2M0JcdTYzMjFcdTY4MDdcdThCQzZcdTUzRDhcdTUzMTZcdTU2REVcdThDMDNcdTUxRkRcdTY1NzAgKi9cclxuXHRjbGllbnRPbkJsb2NrQ2hhbmdlOiAoaXNCbG9jazogYm9vbGVhbikgPT4gdm9pZFxyXG5cdC8qKlx1NjdBQVx1NjhCMFx1NzY4NFx1NTIxRFx1NTlDQlx1NTMxNixcdTY3MERcdTUyQTFcdTdBRUZcdThDMDNcdTc1MjggKi9cclxuXHRAQ29yZS5GdW5jdGlvbihDb3JlLlNlcnZlcilcclxuXHRwdWJsaWMgSW5pdFdlYXBvbihpZDogbnVtYmVyKTogdm9pZCB7XHJcblx0XHR0aGlzLmlkID0gaWRcclxuXHRcdHRoaXMub25JZENoYW5nZWQoKVxyXG5cdH1cclxuXHQvKiogXHU1RjUzXHU4MTFBXHU2NzJDXHU4OEFCXHU1QjlFXHU0RjhCXHU1NDBFXHVGRjBDXHU0RjFBXHU1NzI4XHU3QjJDXHU0RTAwXHU1RTI3XHU2NkY0XHU2NUIwXHU1MjREXHU4QzAzXHU3NTI4XHU2QjY0XHU1MUZEXHU2NTcwICovXHJcblx0cHJvdGVjdGVkIGFzeW5jIG9uU3RhcnQoKSB7XHJcblx0XHR3aGlsZSAoIXRoaXMuaGFzSW5pdCkge1xyXG5cdFx0XHRUaW1lVXRpbC5kZWxheVNlY29uZCgwLjEpXHJcblx0XHR9XHJcblx0XHR0aGlzLnVzZVVwZGF0ZSA9IHRydWVcclxuXHRcdHRoaXMud2VhcG9uT2JqID0gdGhpcy5nYW1lT2JqZWN0IGFzIEdhbWVwbGF5LkhvdFdlYXBvblxyXG5cdFx0Ly90aGlzLmluaXRBc3NldHModGhpcy5wcmVsb2FkQXNzZXRzKVxyXG5cdFx0aWYgKHRoaXMud2VhcG9uT2JqKSB7XHJcblx0XHRcdGlmIChVdGlsLlN5c3RlbVV0aWwuaXNDbGllbnQoKSkge1xyXG5cdFx0XHRcdHRoaXMuY2xpZW50SW5pdCgpXHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKFV0aWwuU3lzdGVtVXRpbC5pc1NlcnZlcigpKSB7XHJcblx0XHRcdFx0dGhpcy5zZXJ2ZXJJbml0KClcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKFV0aWwuU3lzdGVtVXRpbC5pc0NsaWVudCgpKSB7XHJcblx0XHRcdFx0dGhpcy5jbGllbnRPbkhpdCA9IChoaXRSZXN1bHQ6IENvcmUuR2FtZU9iamVjdFtdIHwgR2FtZXBsYXkuSGl0UmVzdWx0W10sIGF0dGFja1BsYXllcjogbnVtYmVyLCBpc09iajogYm9vbGVhbikgPT4ge1xyXG5cdFx0XHRcdFx0aGl0UmVzdWx0LmZvckVhY2goZSA9PiB7XHJcblxyXG5cdFx0XHRcdFx0XHRpZiAoZSBpbnN0YW5jZW9mIEdhbWVwbGF5LkhpdFJlc3VsdCkge1xyXG5cdFx0XHRcdFx0XHRcdGlmIChlLmdhbWVPYmplY3QgaW5zdGFuY2VvZiBHYW1lcGxheS5DaGFyYWN0ZXIgfHxcclxuXHRcdFx0XHRcdFx0XHRcdGUuZ2FtZU9iamVjdCBpbnN0YW5jZW9mIENvcmUuR2FtZU9iamVjdCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0UHJlZmFiRXZlbnQuUHJlZmFiRXZ0RmlnaHQuaGl0KHRoaXMuY2hhcmEuZ3VpZCwgZS5nYW1lT2JqZWN0Lmd1aWQsIHRoaXMuY29uZmlnLmRhbWFnZSwgZS5pbXBhY3RQb2ludC5jbG9uZSgpKVxyXG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuXHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRpZiAoZSBpbnN0YW5jZW9mIEdhbWVwbGF5LkNoYXJhY3RlciB8fCBlIGluc3RhbmNlb2YgQ29yZS5HYW1lT2JqZWN0KSB7XHJcblx0XHRcdFx0XHRcdFx0UHJlZmFiRXZlbnQuUHJlZmFiRXZ0RmlnaHQuaGl0KHRoaXMuY2hhcmEuZ3VpZCwgZS5ndWlkLCB0aGlzLmNvbmZpZy5kYW1hZ2UsIGUud29ybGRMb2NhdGlvbi5jbG9uZSgpKVxyXG5cdFx0XHRcdFx0XHRcdHJldHVyblxyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0fSlcclxuXHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRQcmVmYWJFdmVudC5QcmVmYWJFdnRFcXVpcC5vbkVxdWlwKGFzeW5jICh0YXJnZXRHdWlkOiBzdHJpbmcsIHNsb3Q6IFByZWZhYkV2ZW50LkVxdWlwU2xvdCwgZXF1aXBHdWlkOiBzdHJpbmcpID0+IHtcclxuXHRcdFx0XHRcdC8vbGV0IHBsYXllciA9IGF3YWl0IEdhbWVwbGF5LmFzeW5jR2V0Q3VycmVudFBsYXllcigpXHJcblx0XHRcdFx0XHRpZiAodGhpcy53ZWFwb25PYmogJiYgdGhpcy53ZWFwb25PYmouZ2V0Q3VycmVudE93bmVyKCkgJiYgdGhpcy53ZWFwb25PYmouZ2V0Q3VycmVudE93bmVyKCkuZ3VpZCA9PSB0YXJnZXRHdWlkICYmIHRoaXMud2VhcG9uT2JqLmd1aWQgIT0gZXF1aXBHdWlkKSB7XHJcblx0XHRcdFx0XHRcdHRoaXMudW5FcXVpcCgpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIG9uRXF1aXBkQ2hhbmdlZCgpIHtcclxuXHRcdHRoaXMud2VhcG9uRW50aXR5Um9vdC5yZWxhdGl2ZVJvdGF0aW9uID0gUm90YXRpb24uemVyb1xyXG5cdH1cclxuXHQvKipcclxuXHQgKiBcdTU0NjhcdTY3MUZcdTUxRkRcdTY1NzAgXHU2QkNGXHU1RTI3XHU2MjY3XHU4ODRDXHJcblx0ICogXHU2QjY0XHU1MUZEXHU2NTcwXHU2MjY3XHU4ODRDXHU5NzAwXHU4OTgxXHU1QzA2dGhpcy5iVXNlVXBkYXRlXHU4RDRCXHU1MDNDXHU0RTNBdHJ1ZVxyXG5cdCAqIEBwYXJhbSBkdCBcdTVGNTNcdTUyNERcdTVFMjdcdTRFMEVcdTRFMEFcdTRFMDBcdTVFMjdcdTc2ODRcdTVFRjZcdThGREYgLyBcdTc5RDJcclxuXHQgKi9cclxuXHRwcm90ZWN0ZWQgb25VcGRhdGUoZHQ6IG51bWJlcik6IHZvaWQge1xyXG5cdFx0aWYgKFV0aWwuU3lzdGVtVXRpbC5pc1NlcnZlcigpKSByZXR1cm5cclxuXHRcdGlmICh0aGlzLndlYXBvbk9iaiA9PSBudWxsKSB7XHJcblx0XHRcdHRoaXMud2VhcG9uT2JqID0gdGhpcy5nYW1lT2JqZWN0IGFzIEdhbWVwbGF5LkhvdFdlYXBvblxyXG5cdFx0XHRpZiAodGhpcy53ZWFwb25PYmogPT0gbnVsbCkgcmV0dXJuXHJcblx0XHRcdHRoaXMuY2xpZW50SW5pdCgpXHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCF0aGlzLmlzRXF1aXBlZCAmJiB0aGlzLndlYXBvbkVudGl0eVJvb3QpIHtcclxuXHRcdFx0dGhpcy5fcm90YXRlUm90YXRpb24ueiA9IHRoaXMuY29uZmlnLnJvdGF0ZVNwZWVkICogZHRcclxuXHRcdFx0dGhpcy53ZWFwb25FbnRpdHlSb290LndvcmxkUm90YXRpb24gPSB0aGlzLndlYXBvbkVudGl0eVJvb3Qud29ybGRSb3RhdGlvbi5hZGQodGhpcy5fcm90YXRlUm90YXRpb24pXHJcblx0XHRcdHJldHVyblxyXG5cdFx0fVxyXG5cclxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5hbW1vQXJyYXkubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0aWYgKHRoaXMuYW1tb0FycmF5W2ldLnVwZGF0ZShkdCkpIHtcclxuXHRcdFx0XHRpZiAodGhpcy5hbW1vQXJyYXlbaV0ub3duZXIgPT0gdGhpcy5jaGFyYSkge1xyXG5cdFx0XHRcdFx0dGhpcy5zZXJ2ZXJEZXN0cm95QW1tbyhpKVxyXG5cdFx0XHRcdFx0dGhpcy5oaXQodGhpcy5hbW1vQXJyYXlbaV0uaGl0UmVzdWx0KVxyXG5cdFx0XHRcdFx0dGhpcy5hbW1vQXJyYXlbaV0uZGVzdHJveSgpXHJcblx0XHRcdFx0XHR0aGlzLmFtbW9BcnJheS5zcGxpY2UoaSwgMSlcclxuXHRcdFx0XHRcdGktLVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jYXNpbmdBcnJheS5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRpZiAodGhpcy5jYXNpbmdBcnJheVtpXS51cGRhdGUoZHQpKSB7XHJcblx0XHRcdFx0dGhpcy5jYXNpbmdBcnJheVtpXS5kZXN0cm95KClcclxuXHRcdFx0XHR0aGlzLmNhc2luZ0FycmF5LnNwbGljZShpLCAxKVxyXG5cdFx0XHRcdGktLVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMud2VhcG9uT2JqLmdldEN1cnJlbnRPd25lcigpICE9PSB0aGlzLmNoYXJhKSByZXR1cm5cclxuXHJcblx0XHRpZiAodGhpcy5pc0NhbkZpcmUgIT0gMCkge1xyXG5cdFx0XHR0aGlzLmlzQ2FuRmlyZSAtPSBkdFxyXG5cdFx0XHRpZiAodGhpcy5pc0NhbkZpcmUgPCAwKSB7XHJcblx0XHRcdFx0dGhpcy5pc0NhbkZpcmUgPSAwXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmNhbWVyYVVwZGF0ZShkdClcclxuXHJcblx0XHRpZiAoIXRoaXMudXBkYXRlYkZpcmluZygpKSB7XHJcblx0XHRcdGlmICghdGhpcy5iRmlyaW5nICYmIHRoaXMuZmlyZUVmZmVjdC5sb29wICYmIHRoaXMuZmlyZVNvdW5kLmxvb3ApIHtcclxuXHRcdFx0XHR0aGlzLmZpcmVFZmZlY3Quc3RvcCgpXHJcblx0XHRcdFx0dGhpcy5maXJlU291bmQuc3RvcCgpXHJcblx0XHRcdFx0aWYgKCF0aGlzLmlzQWltbWluZykge1xyXG5cdFx0XHRcdFx0dGhpcy53ZWFwb25PYmouYWltQ29tcG9uZW50LmVuYWJsZUFpbWluZyhmYWxzZSlcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIXRoaXMudXBkYXRlQmxvY2tGaXJlKCkpIHtcclxuXHRcdFx0dGhpcy5jbGllbnRPbkJsb2NrQ2hhbmdlKHRoaXMuaXNCbG9jaylcclxuXHRcdH1cclxuXHJcblx0XHRzd2l0Y2ggKHRoaXMud2VhcG9uT2JqLmdldEN1cnJlbnRTdGF0ZSgpKSB7XHJcblx0XHRcdGNhc2UgR2FtZXBsYXkuSG90V2VhcG9uU3RhdGUuSWRsZTpcclxuXHRcdFx0XHRpZiAodGhpcy53ZWFwb25PYmouZmlyZUNvbXBvbmVudC5jdXJyZW50QnVsbGV0U2l6ZSA8IDEpIHtcclxuXHRcdFx0XHRcdGlmICh0aGlzLmlzQXV0b1JlbG9hZCkge1xyXG5cdFx0XHRcdFx0XHR0aGlzLnN0YXJ0UmVsb2FkKClcclxuXHRcdFx0XHRcdFx0dGhpcy5pc0F1dG9SZWxvYWQgPSBmYWxzZVxyXG5cdFx0XHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdFx0XHRcdFx0XHR0aGlzLmlzQXV0b1JlbG9hZCA9IHRydWVcclxuXHRcdFx0XHRcdFx0fSwgdGhpcy53ZWFwb25PYmoucmVsb2FkQ29tcG9uZW50LnJlbG9hZER1cmF0aW9uICogMTAwMClcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0aWYgKHRoaXMuaXNGaXJpbmcgJiYgIXRoaXMuYkZpcmluZyAmJiB0aGlzLndlYXBvbk9iai5maXJlQ29tcG9uZW50LmN1cnJlbnRGaXJlTW9kZWwgPT0gMikge1xyXG5cdFx0XHRcdFx0XHR0aGlzLnN0YXJ0RmlyZSgpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRicmVha1xyXG5cclxuXHRcdFx0Y2FzZSBHYW1lcGxheS5Ib3RXZWFwb25TdGF0ZS5SZWxvYWRpbmc6XHJcblxyXG5cdFx0XHRcdGJyZWFrXHJcblxyXG5cdFx0XHRjYXNlIEdhbWVwbGF5LkhvdFdlYXBvblN0YXRlLkxvYWRpbmc6XHJcblxyXG5cdFx0XHRcdGJyZWFrXHJcblxyXG5cdFx0XHRjYXNlIEdhbWVwbGF5LkhvdFdlYXBvblN0YXRlLkZpcmluZzpcclxuXHRcdFx0XHRpZiAodGhpcy5jb25maWcuaXNFbXB0eVRvRGVzdHJveSAmJiB0aGlzLmNvbmZpZy50b3RhbEFtbW8gPT0gMCAmJiB0aGlzLndlYXBvbk9iai5maXJlQ29tcG9uZW50LmN1cnJlbnRCdWxsZXRTaXplID09IDApIHtcclxuXHRcdFx0XHRcdHRoaXMudW5FcXVpcCgpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGJyZWFrXHJcblxyXG5cdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdGJyZWFrXHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMud2VhcG9uVUkpIHtcclxuXHRcdFx0dGhpcy53ZWFwb25VSS5jaGFuZ2VCdWxsZXQodGhpcy53ZWFwb25PYmouZmlyZUNvbXBvbmVudC5jdXJyZW50QnVsbGV0U2l6ZSwgdGhpcy5jb25maWcudG90YWxBbW1vKVxyXG5cdFx0XHRpZiAodGhpcy5jb25maWcua2VlcFRpbWUgIT0gLTEpIHtcclxuXHRcdFx0XHR0aGlzLl9yZXN0VGltZSAtPSBkdFxyXG5cdFx0XHRcdHRoaXMud2VhcG9uVUkuc2V0VGltZVRleHQodGhpcy5fcmVzdFRpbWUsIHRoaXMuY29uZmlnLmtlZXBUaW1lKVxyXG5cdFx0XHRcdGlmICh0aGlzLl9yZXN0VGltZSA8PSAwKSB7XHJcblx0XHRcdFx0XHR0aGlzLnVuRXF1aXAoKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHQvKiogXHU4MTFBXHU2NzJDXHU4OEFCXHU5NTAwXHU2QkMxXHU2NUY2XHU2NzAwXHU1NDBFXHU0RTAwXHU1RTI3XHU2MjY3XHU4ODRDXHU1QjhDXHU4QzAzXHU3NTI4XHU2QjY0XHU1MUZEXHU2NTcwICovXHJcblx0cHJvdGVjdGVkIG9uRGVzdHJveSgpOiB2b2lkIHtcclxuXHRcdHRoaXMuY2xpZW50RGVzdHJveSgpXHJcblx0fVxyXG5cdC8qIFx1NTFGQlx1NEUyRFx1NUJGOVx1OEM2MVx1NTFGRFx1NjU3MCAqL1xyXG5cdHByb3RlY3RlZCBoaXQoaGl0UmVzdWx0OiBDb3JlLkdhbWVPYmplY3RbXSB8IEdhbWVwbGF5LkhpdFJlc3VsdFtdKSB7XHJcblx0XHRpZiAoIShoaXRSZXN1bHQubGVuZ3RoID4gMCkpIHJldHVyblxyXG5cdFx0aWYgKHRoaXMuY29uZmlnLmRldGVjdFJhZGl1cyA+IDEwKSB7IC8vIFx1NzdFOVx1NUY2Mlx1NjhDMFx1NkQ0Qlx1N0VEM1x1Njc5Q1xyXG5cdFx0XHRmb3IgKGxldCBlbGVtZW50IG9mIGhpdFJlc3VsdCkge1xyXG5cdFx0XHRcdGxldCB0ZW1wID0gZWxlbWVudCBhcyBDb3JlLkdhbWVPYmplY3RcclxuXHRcdFx0XHRpZiAodGVtcCBpbnN0YW5jZW9mIEdhbWVwbGF5LkNoYXJhY3RlckJhc2UpIHtcclxuXHRcdFx0XHRcdHRoaXMuaGl0Q2hhcmFjdGVyTXVsdGljYXN0KHRlbXAud29ybGRMb2NhdGlvbiwgdGVtcC53b3JsZFJvdGF0aW9uKVxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHR0aGlzLmhpdE9iamVjdE11bHRpY2FzdCh0ZW1wLndvcmxkTG9jYXRpb24sIHRlbXAud29ybGRSb3RhdGlvbilcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKHRoaXMuY29uZmlnLmh1cnRSYWRpdXMgPiAxMCkge1xyXG5cdFx0XHRcdGxldCBzcGhlcmVSZXN1bHQgPSBHYW1lcGxheS5zcGhlcmVPdmVybGFwKChoaXRSZXN1bHRbMF0gYXMgQ29yZS5HYW1lT2JqZWN0KS53b3JsZExvY2F0aW9uLCB0aGlzLmNvbmZpZy5odXJ0UmFkaXVzLCBHYW1lRGVmLkRFQlVHX0ZMQUcpXHJcblx0XHRcdFx0dGhpcy5jbGllbnRPbkhpdChzcGhlcmVSZXN1bHQsIHRoaXMucGxheWVyLmdldFBsYXllcklEKCksIHRydWUpXHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5jbGllbnRPbkhpdChoaXRSZXN1bHQsIHRoaXMucGxheWVyLmdldFBsYXllcklEKCksIHRydWUpXHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7IC8vIFx1NUMwNFx1N0VCRlx1NjhDMFx1NkQ0Qlx1N0VEM1x1Njc5Q1xyXG5cdFx0XHRmb3IgKGxldCBlbGVtZW50IG9mIGhpdFJlc3VsdCkge1xyXG5cdFx0XHRcdGxldCB0ZW1wID0gZWxlbWVudCBhcyBHYW1lcGxheS5IaXRSZXN1bHRcclxuXHRcdFx0XHRsZXQgcm90ID0gdGVtcC5pbXBhY3ROb3JtYWwudG9Sb3RhdGlvbigpXHJcblx0XHRcdFx0cm90LnkgLT0gOTBcclxuXHRcdFx0XHRpZiAodGVtcC5nYW1lT2JqZWN0IGluc3RhbmNlb2YgR2FtZXBsYXkuQ2hhcmFjdGVyQmFzZSkge1xyXG5cdFx0XHRcdFx0dGhpcy5oaXRDaGFyYWN0ZXJNdWx0aWNhc3QodGVtcC5pbXBhY3RQb2ludCwgcm90KVxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHR0aGlzLmhpdE9iamVjdE11bHRpY2FzdCh0ZW1wLmltcGFjdFBvaW50LCByb3QpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdGlmICh0aGlzLmNvbmZpZy5odXJ0UmFkaXVzID4gMTApIHtcclxuXHRcdFx0XHRsZXQgc3BoZXJlUmVzdWx0ID0gR2FtZXBsYXkuc3BoZXJlT3ZlcmxhcCgoaGl0UmVzdWx0WzBdIGFzIEdhbWVwbGF5LkhpdFJlc3VsdCkuaW1wYWN0UG9pbnQsIHRoaXMuY29uZmlnLmh1cnRSYWRpdXMsIEdhbWVEZWYuREVCVUdfRkxBRylcclxuXHRcdFx0XHR0aGlzLmNsaWVudE9uSGl0KHNwaGVyZVJlc3VsdCwgdGhpcy5wbGF5ZXIuZ2V0UGxheWVySUQoKSwgdHJ1ZSlcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLmNsaWVudE9uSGl0KGhpdFJlc3VsdCwgdGhpcy5wbGF5ZXIuZ2V0UGxheWVySUQoKSwgZmFsc2UpXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qIFx1NUU3Rlx1NjRBRFx1NTFGQlx1NEUyRFx1ODlEMlx1ODI3MiAqL1xyXG5cdEBDb3JlLkZ1bmN0aW9uKENvcmUuU2VydmVyKVxyXG5cdHByaXZhdGUgaGl0Q2hhcmFjdGVyTXVsdGljYXN0KGxvYzogVHlwZS5WZWN0b3IsIHJvdDogVHlwZS5Sb3RhdGlvbikge1xyXG5cdFx0dGhpcy5oaXRDaGFyYVBlcmZvcm1hbmNlKGxvYywgcm90KVxyXG5cdH1cclxuXHJcblx0LyogXHU1RTdGXHU2NEFEXHU1MUZCXHU0RTJEXHU2NjZFXHU5MDFBXHU1QkY5XHU4QzYxICovXHJcblx0QENvcmUuRnVuY3Rpb24oQ29yZS5TZXJ2ZXIpXHJcblx0cHJpdmF0ZSBoaXRPYmplY3RNdWx0aWNhc3QobG9jOiBUeXBlLlZlY3Rvciwgcm90OiBUeXBlLlJvdGF0aW9uKSB7XHJcblx0XHR0aGlzLmhpdE9iamVjdFBlcmZvcm1hbmNlKGxvYywgcm90KVxyXG5cdH1cclxuXHJcblx0QENvcmUuRnVuY3Rpb24oQ29yZS5DbGllbnQsIENvcmUuTXVsdGljYXN0KVxyXG5cdHByaXZhdGUgaGl0Q2hhcmFQZXJmb3JtYW5jZShsb2M6IFR5cGUuVmVjdG9yLCByb3Q6IFR5cGUuUm90YXRpb24pIHtcclxuXHRcdEVmZmVjdFNlcnZpY2UuZ2V0SW5zdGFuY2UoKS5wbGF5RWZmZWN0QXRMb2NhdGlvbih0aGlzLmhpdENoYXJhRWZmZWN0LmdldFNvdXJjZUFzc2V0R3VpZCgpLCBsb2MsIDEsIHJvdCwgdGhpcy5oaXRDaGFyYUVmZmVjdC53b3JsZFNjYWxlKVxyXG5cdFx0U291bmRTZXJ2aWNlLmdldEluc3RhbmNlKCkucGxheTNEU291bmQodGhpcy5oaXRDaGFyYVNvdW5kLmdldFNvdXJjZUFzc2V0R3VpZCgpLCBsb2MsIDEsIDEsIHsgbWF4RGlzdGFuY2U6IDMwMDAgfSlcclxuXHR9XHJcblxyXG5cdEBDb3JlLkZ1bmN0aW9uKENvcmUuQ2xpZW50LCBDb3JlLk11bHRpY2FzdClcclxuXHRwcml2YXRlIGhpdE9iamVjdFBlcmZvcm1hbmNlKGxvYzogVHlwZS5WZWN0b3IsIHJvdDogVHlwZS5Sb3RhdGlvbikge1xyXG5cdFx0RWZmZWN0U2VydmljZS5nZXRJbnN0YW5jZSgpLnBsYXlFZmZlY3RBdExvY2F0aW9uKHRoaXMuaGl0RWZmZWN0LmdldFNvdXJjZUFzc2V0R3VpZCgpLCBsb2MsIDEsIHJvdCwgdGhpcy5oaXRFZmZlY3Qud29ybGRTY2FsZSlcclxuXHRcdFNvdW5kU2VydmljZS5nZXRJbnN0YW5jZSgpLnBsYXkzRFNvdW5kKHRoaXMuaGl0U291bmQuZ2V0U291cmNlQXNzZXRHdWlkKCksIGxvYywgMSwgMSwgeyBtYXhEaXN0YW5jZTogMzAwMCB9KVxyXG5cdH1cclxuXHJcblx0LyogXHU2NEFEXHU2NTNFXHU3Mjc5XHU2NTQ4ICovXHJcblx0cHJpdmF0ZSBwbGF5RWZmZWN0KHBhcnRpY2xlOiBHYW1lcGxheS5QYXJ0aWNsZSk6IHZvaWQge1xyXG5cclxuXHR9XHJcblx0LyogXHU2NEFEXHU2NTNFXHU5N0YzXHU2NTQ4ICovXHJcblx0cHJpdmF0ZSBwbGF5U291bmQoc291bmQ6IEdhbWVwbGF5LlNvdW5kKTogdm9pZCB7XHJcblx0XHRzb3VuZC52b2x1bWUgPSBXZWFwb25Ecml2ZXIuc291bmRWb2x1bWVcclxuXHRcdHNvdW5kLnBsYXkoKVxyXG5cdH1cclxuXHJcblx0QENvcmUuRnVuY3Rpb24oQ29yZS5TZXJ2ZXIpXHJcblx0cHJpdmF0ZSBzZXJ2ZXJEZXN0cm95QW1tbyhpbmRleDogbnVtYmVyKSB7XHJcblx0XHR0aGlzLmNsaWVudERlc3Ryb3lBbW1vKGluZGV4KVxyXG5cdH1cclxuXHJcblx0QENvcmUuRnVuY3Rpb24oQ29yZS5DbGllbnQsIENvcmUuTXVsdGljYXN0KVxyXG5cdHByaXZhdGUgY2xpZW50RGVzdHJveUFtbW8oaW5kZXg6IG51bWJlcikge1xyXG5cdFx0aWYgKCF0aGlzLndlYXBvbk9iaikge1xyXG5cdFx0XHRyZXR1cm5cclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLndlYXBvbk9iai5nZXRDdXJyZW50T3duZXIoKSA9PSB0aGlzLmNoYXJhKSB7XHJcblx0XHRcdHJldHVyblxyXG5cdFx0fSBlbHNlIGlmICh0aGlzLmFtbW9BcnJheS5sZW5ndGggIT0gMCkge1xyXG5cdFx0XHR0aGlzLmFtbW9BcnJheVtpbmRleF0uZGVzdHJveSgpXHJcblx0XHRcdHRoaXMuYW1tb0FycmF5LnNwbGljZShpbmRleCwgMSlcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFx1NUJBMlx1NjIzN1x1N0FFRlx1OEMwM1x1NzUyOFx1NzZGNFx1NjNBNVx1ODhDNVx1NTkwN1xyXG5cdCAqL1xyXG5cdHB1YmxpYyBlcXVpcCgpIHtcclxuXHRcdC8vIFx1NTk4Mlx1Njc5Q1x1NUY1M1x1NTI0RFx1ODlEMlx1ODI3Mlx1NEUzQVx1N0E3QVx1NEUxNFx1NTcyOFx1NUJBMlx1NjIzN1x1N0FFRlx1RkYwQ1x1OTFDRFx1NjVCMFx1ODNCN1x1NTNENlx1NEUwMFx1NkIyMVx1ODlEMlx1ODI3MlxyXG5cdFx0aWYgKCF0aGlzLmNoYXJhICYmIFV0aWwuU3lzdGVtVXRpbC5pc0NsaWVudCgpKSB7XHJcblx0XHRcdHRoaXMuY2hhcmEgPSBHYW1lcGxheS5nZXRDdXJyZW50UGxheWVyKCkuY2hhcmFjdGVyXHJcblx0XHR9XHJcblx0XHR0aGlzLnNlcnZlckVxdWlwKHRoaXMuY2hhcmEucGxheWVyLmdldFBsYXllcklEKCkpXHJcblx0fVxyXG5cdC8qKlxyXG5cdCAqIHVuRXF1aXBcclxuXHQgKi9cclxuXHRwdWJsaWMgdW5FcXVpcCgpIHtcclxuXHRcdGlmICh0aGlzLmNoYXJhICE9PSB0aGlzLndlYXBvbk9iai5nZXRDdXJyZW50T3duZXIoKSkgcmV0dXJuXHJcblx0XHRpZiAoIXRoaXMud2VhcG9uT2JqKSB7XHJcblx0XHRcdHJldHVyblxyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMuaXNBaW1taW5nKSB7XHJcblx0XHRcdHRoaXMud2VhcG9uT2JqLmFjY3VyYWN5T2ZGaXJlQ29tcG9uZW50Lm1heERpc3BlcnNpb25IYWxmQW5nbGUgPSB0aGlzLnRlbXBEaXNwZXJzaW9uTWF4XHJcblx0XHRcdHRoaXMud2VhcG9uT2JqLmFjY3VyYWN5T2ZGaXJlQ29tcG9uZW50LmRlZmF1bHREaXNwZXJzaW9uSGFsZkFuZ2xlID0gdGhpcy50ZW1wRGlzcGVyc2lvbkRlZmF1bHRcclxuXHRcdFx0dGhpcy5pc0FpbW1pbmcgPSBmYWxzZVxyXG5cdFx0fVxyXG5cdFx0dGhpcy53ZWFwb25PYmouc3RvcEZpcmUoKVxyXG5cdFx0dGhpcy53ZWFwb25PYmouYnJlYWtMb2FkKClcclxuXHRcdHRoaXMud2VhcG9uT2JqLmJyZWFrUmVsb2FkKClcclxuXHRcdHRoaXMud2VhcG9uT2JqLmRlc3Ryb3koKVxyXG5cdFx0dGhpcy53ZWFwb25PYmoudW5lcXVpcEhvdFdlYXBvbigpXHJcblx0XHRVSS5VSU1hbmFnZXIuaW5zdGFuY2UuaGlkZShXZWFwb25VSSlcclxuXHRcdHRoaXMud2VhcG9uVUkgPSBudWxsXHJcblx0XHR0aGlzLmNoYXJhLmFuaW1hdGlvblN0YW5jZSA9IHRoaXMudGVtcGFuaW1hdGlvblN0YW5jZVxyXG5cdFx0dGhpcy5jaGFyYS5wbGF5QW5pbWF0aW9uKHRoaXMud2VhcG9uQWN0aW9uLnVuZXF1aXBBbmltYXRpb24pXHJcblx0XHR0aGlzLmNoYXJhLm1vdmVGYWNpbmdEaXJlY3Rpb24gPSB0aGlzLnRlbXBNb3ZlRmFjaW5nRGlyZWN0aW9uXHJcblx0XHR0aGlzLmNhbWVyYS5jYW1lcmFSZWxhdGl2ZVRyYW5zZm9ybSA9IG5ldyBUeXBlLlRyYW5zZm9ybSh0aGlzLnRlbXBjYW1lcmFPZmZzZXQsIHRoaXMuY2FtZXJhLmNhbWVyYVJlbGF0aXZlVHJhbnNmb3JtLnJvdGF0aW9uLCB0aGlzLmNhbWVyYS5jYW1lcmFSZWxhdGl2ZVRyYW5zZm9ybS5zY2FsZSlcclxuXHRcdHRoaXMuY2FtZXJhLmNhbWVyYVN5c3RlbVJlbGF0aXZlVHJhbnNmb3JtID0gbmV3IFR5cGUuVHJhbnNmb3JtKHRoaXMudGVtcHRhcmdldEFybU9mZnNldCwgdGhpcy5jYW1lcmEuY2FtZXJhUmVsYXRpdmVUcmFuc2Zvcm0ucm90YXRpb24sIHRoaXMuY2FtZXJhLmNhbWVyYVJlbGF0aXZlVHJhbnNmb3JtLnNjYWxlKVxyXG5cdFx0dGhpcy5jYW1lcmEuY2FtZXJhRk9WID0gdGhpcy50ZW1wY2FtZXJhRk9WXHJcblx0XHR0aGlzLmNhbWVyYS50YXJnZXRBcm1MZW5ndGggPSB0aGlzLnRlbXB0YXJnZXRBcm1MZW5ndGhcclxuXHRcdGlmICh0aGlzLmNvbmZpZy5pc0F1dG9EZXN0cm95KSB7XHJcblx0XHRcdFVJLlVJTWFuYWdlci5pbnN0YW5jZS5kZXN0cm95VUkoV2VhcG9uVUkpXHJcblx0XHRcdHRoaXMud2VhcG9uT2JqID0gbnVsbFxyXG5cdFx0XHRsZXQgZGVzdHJveUludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG5cdFx0XHRcdGlmICh0aGlzLmFtbW9BcnJheS5sZW5ndGggPT0gMCAmJiB0aGlzLmNhc2luZ0FycmF5Lmxlbmd0aCA9PSAwKSB7XHJcblx0XHRcdFx0XHR0aGlzLnNlcnZlckRlc3Ryb3koKVxyXG5cdFx0XHRcdFx0Y2xlYXJJbnRlcnZhbChkZXN0cm95SW50ZXJ2YWwpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LCAxMDApXHJcblx0XHR9XHJcblx0fVxyXG5cdEBDb3JlLkZ1bmN0aW9uKENvcmUuU2VydmVyKVxyXG5cdHByaXZhdGUgc2VydmVySGlkZVdlYXBvbkVudGl0eShwbGF5ZXJJRDogbnVtYmVyKTogdm9pZCB7XHJcblx0XHQvLyBcdTU5ODJcdTY3OUNcdTUzNzhcdThGN0RcdTc2ODRcdTY2MkZcdTVGNTNcdTUyNERcdTZCNjZcdTU2NjhcdUZGMENcdTUxNDhcdTk2OTBcdTg1Q0ZcdTZCNjZcdTU2NjhcdUZGMENcdTdCNDlcdTVGODVcdTVCNTBcdTVGMzlcdTk1MDBcdTZCQzFcdTVCOENcdTZCRDVcdTU0MEVcdTUzNzhcdThGN0RcdTVFNzZcdTk1MDBcdTZCQzFcdTZCNjZcdTU2NjhcdUZGMENcdTUyMjBcdTk2NjRtYXBcdTRFMkRcdTVCRjlcdTVFOTRcdTk1MkVcdTUwM0NcclxuXHRcdHRoaXMuaGlkZVdlYXBvbkVudGl0eSgpXHJcblx0fVxyXG5cclxuXHRAQ29yZS5GdW5jdGlvbihDb3JlLkNsaWVudCwgQ29yZS5NdWx0aWNhc3QpXHJcblx0cHJpdmF0ZSBoaWRlV2VhcG9uRW50aXR5KCkge1xyXG5cdFx0aWYgKCF0aGlzLndlYXBvbkVudGl0eVJvb3QpIHJldHVyblxyXG5cdFx0dGhpcy53ZWFwb25FbnRpdHlSb290LnNldFZpc2liaWxpdHkoVHlwZS5Qcm9wZXJ0eVN0YXR1cy5PZmYpXHJcblx0fVxyXG5cdEBDb3JlLkZ1bmN0aW9uKENvcmUuU2VydmVyKVxyXG5cdHByaXZhdGUgc2VydmVyRGVzdHJveSgpOiB2b2lkIHtcclxuXHRcdHRoaXMuZGVzdHJveSgpXHJcblx0fVxyXG5cdC8qKlxyXG5cdFx0ICogc3RhcnRGaXJlXHJcblx0XHQgKi9cclxuXHRwdWJsaWMgc3RhcnRGaXJlKCkge1xyXG5cdFx0aWYgKHRoaXMud2VhcG9uT2JqID09IG51bGwgfHwgdGhpcy5pc0NhbkZpcmUgIT0gMCkgcmV0dXJuXHJcblx0XHR0aGlzLndlYXBvbk9iai5zdGFydEZpcmUoKVxyXG5cdFx0dGhpcy5pc0ZpcmluZyA9IHRydWVcclxuXHRcdGlmICghdGhpcy5pc0FpbW1pbmcpIHtcclxuXHRcdFx0dGhpcy53ZWFwb25PYmouYWltQ29tcG9uZW50LmVuYWJsZUFpbWluZyh0cnVlKVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogc3RvcEZpcmVcclxuXHQgKi9cclxuXHRwdWJsaWMgc3RvcEZpcmUoKSB7XHJcblx0XHRpZiAodGhpcy53ZWFwb25PYmogPT0gbnVsbCkgcmV0dXJuXHJcblx0XHR0aGlzLndlYXBvbk9iai5zdG9wRmlyZSgpXHJcblx0XHR0aGlzLmlzRmlyaW5nID0gZmFsc2VcclxuXHRcdGlmICghdGhpcy5pc0FpbW1pbmcpIHtcclxuXHRcdFx0dGhpcy53ZWFwb25PYmouYWltQ29tcG9uZW50LmVuYWJsZUFpbWluZyhmYWxzZSlcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIHN0YXJ0UmVsb2FkXHJcblx0ICovXHJcblx0cHVibGljIHN0YXJ0UmVsb2FkKCkge1xyXG5cdFx0aWYgKHRoaXMud2VhcG9uT2JqID09IG51bGwgfHwgIXRoaXMud2VhcG9uT2JqLnJlbG9hZEVuYWJsZSB8fCB0aGlzLndlYXBvbk9iai5maXJlQ29tcG9uZW50LmN1cnJlbnRCdWxsZXRTaXplID09IHRoaXMud2VhcG9uT2JqLmZpcmVDb21wb25lbnQuY3VycmVudENsaXBTaXplKSByZXR1cm5cclxuXHRcdGxldCBhbW1vR2FwID0gdGhpcy53ZWFwb25PYmouZmlyZUNvbXBvbmVudC5jdXJyZW50Q2xpcFNpemUgLSB0aGlzLndlYXBvbk9iai5maXJlQ29tcG9uZW50LmN1cnJlbnRCdWxsZXRTaXplXHJcblxyXG5cdFx0aWYgKHRoaXMudG90YWxBbW1vID09IC0xKSB7XHJcblx0XHRcdHRoaXMud2VhcG9uT2JqLnJlbG9hZChhbW1vR2FwKVxyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMudG90YWxBbW1vIDw9IDApIHtcclxuXHRcdFx0cmV0dXJuXHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy50b3RhbEFtbW8gPCBhbW1vR2FwKSB7XHJcblx0XHRcdHRoaXMud2VhcG9uT2JqLnJlbG9hZCh0aGlzLnRvdGFsQW1tbylcclxuXHRcdFx0dGhpcy50b3RhbEFtbW8gPSAwXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLndlYXBvbk9iai5yZWxvYWQoYW1tb0dhcClcclxuXHRcdFx0dGhpcy50b3RhbEFtbW8gLT0gYW1tb0dhcFxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogc3RvcFJlbG9hZFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBzdG9wUmVsb2FkKCkge1xyXG5cdFx0aWYgKHRoaXMud2VhcG9uT2JqID09IG51bGwpIHJldHVyblxyXG5cdFx0dGhpcy53ZWFwb25PYmouYnJlYWtSZWxvYWQoKVxyXG5cdFx0dGhpcy53ZWFwb25PYmouYnJlYWtMb2FkKClcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgdGVtcERpc3BlcnNpb25NYXggPSAwXHJcblx0cHJpdmF0ZSB0ZW1wRGlzcGVyc2lvbkRlZmF1bHQgPSAwXHJcblxyXG5cclxuXHJcblx0LyoqXHJcblx0ICogc3RhcnRBaW1cclxuXHQgKi9cclxuXHRwdWJsaWMgc3RhcnRBaW0oKSB7XHJcblx0XHRjb25zb2xlLmVycm9yKFwic3RhcnRBaW1cIilcclxuXHRcdHRoaXMuYWltU291bmQuc3RvcCgpXHJcblx0XHR0aGlzLmFpbVNvdW5kLnBsYXkoKVxyXG5cdFx0dGhpcy5jaGFyYS5hbmltYXRpb25TdGFuY2UgPSB0aGlzLndlYXBvbkFjdGlvbi5haW1TdGFuY2VcclxuXHRcdHRoaXMud2VhcG9uT2JqLmZpcmVDb21wb25lbnQuYW5pbWF0aW9uR3VpZCA9IHRoaXMud2VhcG9uQWN0aW9uLmFpbVNob290QW5pbWF0aW9uXHJcblx0XHR0aGlzLnRlbXBEaXNwZXJzaW9uRGVmYXVsdCA9IHRoaXMud2VhcG9uT2JqLmFjY3VyYWN5T2ZGaXJlQ29tcG9uZW50LmRlZmF1bHREaXNwZXJzaW9uSGFsZkFuZ2xlXHJcblx0XHR0aGlzLnRlbXBEaXNwZXJzaW9uTWF4ID0gdGhpcy53ZWFwb25PYmouYWNjdXJhY3lPZkZpcmVDb21wb25lbnQubWF4RGlzcGVyc2lvbkhhbGZBbmdsZVxyXG5cdFx0dGhpcy53ZWFwb25PYmouYWNjdXJhY3lPZkZpcmVDb21wb25lbnQuZGVmYXVsdERpc3BlcnNpb25IYWxmQW5nbGUgPSB0aGlzLndlYXBvbk9iai5hY2N1cmFjeU9mRmlyZUNvbXBvbmVudC5taW5EaXNwZXJzaW9uSGFsZkFuZ2xlXHJcblx0XHR0aGlzLndlYXBvbk9iai5hY2N1cmFjeU9mRmlyZUNvbXBvbmVudC5tYXhEaXNwZXJzaW9uSGFsZkFuZ2xlID0gdGhpcy53ZWFwb25PYmouYWNjdXJhY3lPZkZpcmVDb21wb25lbnQubWluRGlzcGVyc2lvbkhhbGZBbmdsZVxyXG5cdFx0dGhpcy5pc1pvb21pbmcgPSB0cnVlXHJcblx0XHR0aGlzLnpvb21JbigpXHJcblx0XHRpZiAodGhpcy5jb25maWcuaXNXZWFwb25IYXZlU2NvcGUpIHtcclxuXHRcdFx0dGhpcy5jYW1lcmEudGFyZ2V0QXJtTGVuZ3RoID0gMFxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogc3RvcEFpbVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBzdG9wQWltKCkge1xyXG5cdFx0Y29uc29sZS5lcnJvcihcInN0b3BBaW1cIilcclxuXHRcdHRoaXMud2VhcG9uT2JqLmFjY3VyYWN5T2ZGaXJlQ29tcG9uZW50Lm1heERpc3BlcnNpb25IYWxmQW5nbGUgPSB0aGlzLnRlbXBEaXNwZXJzaW9uTWF4XHJcblx0XHR0aGlzLndlYXBvbk9iai5hY2N1cmFjeU9mRmlyZUNvbXBvbmVudC5kZWZhdWx0RGlzcGVyc2lvbkhhbGZBbmdsZSA9IHRoaXMudGVtcERpc3BlcnNpb25EZWZhdWx0XHJcblx0XHR0aGlzLmNoYXJhLmFuaW1hdGlvblN0YW5jZSA9IHRoaXMud2VhcG9uQWN0aW9uLmhvbGRTdGFuY2VcclxuXHRcdHRoaXMud2VhcG9uT2JqLmZpcmVDb21wb25lbnQuYW5pbWF0aW9uR3VpZCA9IHRoaXMud2VhcG9uQWN0aW9uLnNob290QW5pbWF0aW9uXHJcblx0XHR0aGlzLmlzWm9vbWluZyA9IHRydWVcclxuXHRcdHRoaXMuem9vbU91dCgpXHJcblx0XHRpZiAodGhpcy5jb25maWcuaXNXZWFwb25IYXZlU2NvcGUpIHtcclxuXHRcdFx0dGhpcy5jYW1lcmEudGFyZ2V0QXJtTGVuZ3RoID0gNDAwXHJcblx0XHR9XHJcblx0XHR0aGlzLmFpbVNvdW5kLnN0b3AoKVxyXG5cdFx0dGhpcy5haW1Tb3VuZC5wbGF5KClcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIHN0YXJ0TG9hZFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBzdGFydExvYWQoKSB7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogZW5kTG9hZFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBlbmRMb2FkKCkge1xyXG5cclxuXHR9XHJcblxyXG5cdC8qIGdldEJ1bGxldFNpemUgKi9cclxuXHRwdWJsaWMgZ2V0QnVsbGV0U2l6ZSgpOiBudW1iZXIge1xyXG5cdFx0aWYgKHRoaXMud2VhcG9uT2JqID09IG51bGwpIHJldHVyblxyXG5cdFx0cmV0dXJuIHRoaXMud2VhcG9uT2JqLmZpcmVDb21wb25lbnQuY3VycmVudEJ1bGxldFNpemVcclxuXHR9XHJcblxyXG5cdC8qIFx1NUJBMlx1NjIzN1x1N0FFRlx1OTUwMFx1NkJDMVx1NjVCOVx1NkNENSAqL1xyXG5cdHByaXZhdGUgY2xpZW50RGVzdHJveSgpIHtcclxuXHRcdGlmICh0aGlzLnBpY2tVcFRyaWdnZXIpIHtcclxuXHRcdFx0dGhpcy5waWNrVXBUcmlnZ2VyLmRlc3Ryb3koKVxyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMud2VhcG9uRW50aXR5Um9vdCkge1xyXG5cdFx0XHR0aGlzLndlYXBvbkVudGl0eVJvb3QuZGVzdHJveSgpXHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5hbW1vRW50aXR5Um9vdCkge1xyXG5cdFx0XHR0aGlzLmFtbW9FbnRpdHlSb290LmRlc3Ryb3koKVxyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMuY2FzaW5nRW50aXR5KSB7XHJcblx0XHRcdHRoaXMuY2FzaW5nRW50aXR5LmRlc3Ryb3koKVxyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMuZmlyZUVmZmVjdCkge1xyXG5cdFx0XHR0aGlzLmZpcmVFZmZlY3QuZGVzdHJveSgpXHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5maXJlU291bmQpIHtcclxuXHRcdFx0dGhpcy5maXJlU291bmQuZGVzdHJveSgpXHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5oaXRDaGFyYUVmZmVjdCkge1xyXG5cdFx0XHR0aGlzLmhpdENoYXJhRWZmZWN0LmRlc3Ryb3koKVxyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMuaGl0Q2hhcmFTb3VuZCkge1xyXG5cdFx0XHR0aGlzLmhpdENoYXJhU291bmQuZGVzdHJveSgpXHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5oaXRFZmZlY3QpIHtcclxuXHRcdFx0dGhpcy5oaXRFZmZlY3QuZGVzdHJveSgpXHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5oaXRTb3VuZCkge1xyXG5cdFx0XHR0aGlzLmhpdFNvdW5kLmRlc3Ryb3koKVxyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMucmVsb2FkU291bmQpIHtcclxuXHRcdFx0dGhpcy5yZWxvYWRTb3VuZC5kZXN0cm95KClcclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLmFpbVNvdW5kKSB7XHJcblx0XHRcdHRoaXMuYWltU291bmQuZGVzdHJveSgpXHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5sb2FkU291bmQpIHtcclxuXHRcdFx0dGhpcy5sb2FkU291bmQuZGVzdHJveSgpXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKiBcdTRFMEJcdThGN0RcdTVFNzZcdTUyMURcdTU5Q0JcdTUzMTZcdThENDRcdTZFOTAgKi9cclxuXHRwcml2YXRlIGluaXRBc3NldHMoYXNzZXRJZHM6IEFycmF5PHN0cmluZz4pOiB2b2lkIHtcclxuXHRcdGZvciAobGV0IGVsZW1lbnQgb2YgYXNzZXRJZHMpIHtcclxuXHRcdFx0VXRpbC5Bc3NldFV0aWwuYXN5bmNEb3dubG9hZEFzc2V0KGVsZW1lbnQpXHJcblx0XHR9XHJcblx0fVxyXG5cdC8qIFx1NjcwRFx1NTJBMVx1N0FFRlx1NTIxRFx1NTlDQlx1NTMxNlx1NjVCOVx1NkNENSAqL1xyXG5cdHByaXZhdGUgc2VydmVySW5pdCgpIHtcclxuXHRcdHRoaXMuY2xpZW50T25JRENoYW5nZWQodGhpcy5pZClcclxuXHRcdHRoaXMuc2VydmVySW5pdERlbGVnYXRlKClcclxuXHRcdHRoaXMuc2VydmVyQ3JlYXRlTWVzaCgpXHJcblx0fVxyXG5cdC8qKlx1NjcwRFx1NTJBMVx1N0FFRlx1NjgzOVx1NjM2RVx1OTE0RFx1N0Y2RVx1NTIxQlx1NUVGQVx1NjdBQVx1NjhCMFx1NzY4NFx1NkEyMVx1NTc4QiAqL1xyXG5cdHByaXZhdGUgYXN5bmMgc2VydmVyQ3JlYXRlTWVzaCgpe1xyXG5cdFx0bGV0IG1lc2ggPSBhd2FpdCBHYW1lT2JqZWN0LmFzeW5jU3Bhd24oeyBndWlkIDogdGhpcy53ZWFwb25SZXNvdXJjZXMud2VhcG9uTWVzaCwgcmVwbGljYXRlcyA6IHRydWV9KVxyXG5cdFx0bWVzaC5wYXJlbnQgPSB0aGlzLndlYXBvbk9ialxyXG5cdH1cclxuXHJcblx0LyogXHU2NzBEXHU1MkExXHU3QUVGXHU1MjFEXHU1OUNCXHU1MzE2XHU1NkRFXHU4QzAzXHU1MUZEXHU2NTcwICovXHJcblx0cHJpdmF0ZSBzZXJ2ZXJJbml0RGVsZWdhdGUoKTogdm9pZCB7XHJcblx0XHR0aGlzLndlYXBvbk9iai5vbkVxdWlwcGVkU2VydmVyLmFkZCh0aGlzLm9uU2VydmVyRXF1aXAuYmluZCh0aGlzKSlcclxuXHRcdHRoaXMud2VhcG9uT2JqLm9uVW5lcXVpcHBlZFNlcnZlci5hZGQodGhpcy5vblNlcnZlclVuZXF1aXAuYmluZCh0aGlzKSlcclxuXHJcblx0XHR0aGlzLndlYXBvbk9iai5maXJlQ29tcG9uZW50Lm9uU3RhcnRGaXJlU2VydmVyLmFkZCh0aGlzLm9uU2VydmVyU3RhcnRGaXJlLmJpbmQodGhpcykpXHJcblx0XHR0aGlzLndlYXBvbk9iai5maXJlQ29tcG9uZW50Lm9uRW5kRmlyZVNlcnZlci5hZGQodGhpcy5vblNlcnZlckVuZEZpcmUuYmluZCh0aGlzKSlcclxuXHRcdGlmICh0aGlzLndlYXBvbk9iai5yZWxvYWRDb21wb25lbnQpIHtcclxuXHRcdFx0dGhpcy53ZWFwb25PYmoucmVsb2FkQ29tcG9uZW50Lm9uU3RhcnRSZWxvYWRTZXJ2ZXIuYWRkKHRoaXMub25TZXJ2ZXJTdGFydFJlbG9hZC5iaW5kKHRoaXMpKVxyXG5cdFx0XHR0aGlzLndlYXBvbk9iai5yZWxvYWRDb21wb25lbnQub25FbmRSZWxvYWRTZXJ2ZXIuYWRkKHRoaXMub25TZXJ2ZXJFbmRSZWxvYWQuYmluZCh0aGlzKSlcclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLndlYXBvbk9iai5sb2FkQ29tcG9uZW50KSB7XHJcblx0XHRcdHRoaXMud2VhcG9uT2JqLmxvYWRDb21wb25lbnQub25TdGFydExvYWRTZXJ2ZXIuYWRkKHRoaXMub25TZXJ2ZXJTdGFydExvYWQuYmluZCh0aGlzKSlcclxuXHRcdFx0dGhpcy53ZWFwb25PYmoubG9hZENvbXBvbmVudC5vbkVuZExvYWRTZXJ2ZXIuYWRkKHRoaXMub25TZXJ2ZXJFbmRMb2FkLmJpbmQodGhpcykpXHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy53ZWFwb25PYmouYWltQ29tcG9uZW50KSB7XHJcblx0XHRcdHRoaXMud2VhcG9uT2JqLmFpbUNvbXBvbmVudC5vbkFpbVN0YXJ0U2VydmVyLmFkZCh0aGlzLm9uU2VydmVyU3RhcnRBaW0uYmluZCh0aGlzKSlcclxuXHRcdFx0dGhpcy53ZWFwb25PYmouYWltQ29tcG9uZW50Lm9uQWltRW5kU2VydmVyLmFkZCh0aGlzLm9uU2VydmVyRW5kQWltLmJpbmQodGhpcykpXHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy53ZWFwb25PYmoucmVjb2lsRm9yY2VDb21wb25lbnQpIHtcclxuXHRcdFx0dGhpcy53ZWFwb25PYmoucmVjb2lsRm9yY2VDb21wb25lbnQub25TdGFydFJlY29pbEZvcmNlU2VydmVyLmFkZCh0aGlzLm9uU2VydmVyU3RhcnRSZWNvaWwuYmluZCh0aGlzKSlcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qIFx1NjcwRFx1NTJBMVx1N0FFRlx1NUYwMFx1NTlDQlx1NUYwMFx1NzA2Qlx1NTZERVx1OEMwMyAqL1xyXG5cdHByaXZhdGUgb25TZXJ2ZXJFcXVpcCgpIHtcclxuXHRcdGNvbnNvbGUuZXJyb3IoXCJTZXJ2ZXJFcXVpcCBcIiArIHRoaXMud2VhcG9uT2JqLmdldEN1cnJlbnRPd25lcigpLmNoYXJhY3Rlck5hbWUpXHJcblx0XHRpZiAoIXRoaXMud2VhcG9uT2JqLmdldEN1cnJlbnRPd25lcigpKSByZXR1cm5cclxuXHRcdGxldCB2MiA9IHRoaXMud2VhcG9uT2JqLmdldEN1cnJlbnRPd25lcigpLnNldEFwcGVhcmFuY2UoR2FtZXBsYXkuSHVtYW5vaWRWMilcclxuXHRcdGlmICgodjIuZ2V0U29tYXRvdHlwZSgpICUgMikgPT0gMCkge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKFwiZmVtYWxlXCIpXHJcblx0XHRcdHRoaXMuY2hhbmdlV2VhcG9uQWN0aW9uKDApXHJcblx0XHRcdHRoaXMuY2xpZW50RXF1aXAodGhpcy53ZWFwb25PYmouZ2V0Q3VycmVudE93bmVyKCkucGxheWVyLCAwKVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Y29uc29sZS5lcnJvcihcIm1hbGVcIilcclxuXHRcdFx0dGhpcy5jaGFuZ2VXZWFwb25BY3Rpb24oMSlcclxuXHRcdFx0dGhpcy5jbGllbnRFcXVpcCh0aGlzLndlYXBvbk9iai5nZXRDdXJyZW50T3duZXIoKS5wbGF5ZXIsIDEpXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKiBcdTY3MERcdTUyQTFcdTdBRUZcdTUzNzhcdThGN0RcdTg4QzVcdTU5MDdcdTVCOENcdTYyMTBcdTU2REVcdThDMDMgKi9cclxuXHRwcml2YXRlIG9uU2VydmVyVW5lcXVpcCgpIHtcclxuXHRcdGNvbnNvbGUuZXJyb3IoXCJvblNlcnZlclVuZXF1aXBcIilcclxuXHJcblx0fVxyXG5cclxuXHQvKiBcdTY3MERcdTUyQTFcdTdBRUZcdTVGMDBcdTU5Q0JcdTVGMDBcdTcwNkJcdTU2REVcdThDMDMgKi9cclxuXHRwcml2YXRlIG9uU2VydmVyU3RhcnRGaXJlKCkge1xyXG5cclxuXHR9XHJcblxyXG5cdC8qIFx1NjcwRFx1NTJBMVx1N0FFRlx1N0VEM1x1Njc1Rlx1NUYwMFx1NzA2Qlx1NTZERVx1OEMwMyAqL1xyXG5cdHByaXZhdGUgb25TZXJ2ZXJFbmRGaXJlKCkge1xyXG5cclxuXHR9XHJcblxyXG5cdC8qIFx1NjcwRFx1NTJBMVx1N0FFRlx1NUYwMFx1NTlDQlx1NjM2Mlx1NUYzOVx1NTZERVx1OEMwMyAqL1xyXG5cdHByaXZhdGUgb25TZXJ2ZXJTdGFydFJlbG9hZCgpIHtcclxuXHJcblx0fVxyXG5cclxuXHQvKiBcdTY3MERcdTUyQTFcdTdBRUZcdTdFRDNcdTY3NUZcdTYzNjJcdTVGMzlcdTU2REVcdThDMDMgKi9cclxuXHRwcml2YXRlIG9uU2VydmVyRW5kUmVsb2FkKCkge1xyXG5cclxuXHR9XHJcblxyXG5cdC8qIFx1NjcwRFx1NTJBMVx1N0FFRlx1NUYwMFx1NTlDQlx1NEUwQVx1ODE5Qlx1NTZERVx1OEMwMyAqL1xyXG5cdHByaXZhdGUgb25TZXJ2ZXJTdGFydExvYWQoKSB7XHJcblxyXG5cdH1cclxuXHJcblx0LyogXHU2NzBEXHU1MkExXHU3QUVGXHU3RUQzXHU2NzVGXHU0RTBBXHU4MTlCXHU1NkRFXHU4QzAzICovXHJcblx0cHJpdmF0ZSBvblNlcnZlckVuZExvYWQoKSB7XHJcblxyXG5cdH1cclxuXHJcblx0LyogXHU2NzBEXHU1MkExXHU3QUVGXHU1RjAwXHU1OUNCXHU3Nzg0XHU1MUM2XHU1NkRFXHU4QzAzICovXHJcblx0cHJpdmF0ZSBvblNlcnZlclN0YXJ0QWltKCkge1xyXG5cclxuXHR9XHJcblxyXG5cdC8qIFx1NjcwRFx1NTJBMVx1N0FFRlx1N0VEM1x1Njc1Rlx1Nzc4NFx1NTFDNlx1NTZERVx1OEMwMyAqL1xyXG5cdHByaXZhdGUgb25TZXJ2ZXJFbmRBaW0oKSB7XHJcblxyXG5cdH1cclxuXHJcblx0LyogXHU2NzBEXHU1MkExXHU3QUVGXHU1RjAwXHU1OUNCXHU1NDBFXHU1NzUwXHU1MjlCXHU1NkRFXHU4QzAzICovXHJcblx0cHJpdmF0ZSBvblNlcnZlclN0YXJ0UmVjb2lsKCkge1xyXG5cclxuXHR9XHJcblxyXG5cdHByaXZhdGUgX2lzSW5pdGVkOiBib29sZWFuID0gZmFsc2VcclxuXHJcblx0LyogXHU1QkEyXHU2MjM3XHU3QUVGXHU1MjFEXHU1OUNCXHU1MzE2XHU2NUI5XHU2Q0Q1ICovXHJcblx0cHJpdmF0ZSBjbGllbnRJbml0KCkge1xyXG5cdFx0aWYgKHRoaXMuX2lzSW5pdGVkKSB7XHJcblx0XHRcdHJldHVyblxyXG5cdFx0fVxyXG5cdFx0dGhpcy5faXNJbml0ZWQgPSB0cnVlXHJcblx0XHQvKiBcdTgzQjdcdTUzRDZcdTczQTlcdTVCQjZcdTc2RjhcdTUxNzNcdTVCRjlcdThDNjEgKi9cclxuXHRcdEdhbWVwbGF5LmFzeW5jR2V0Q3VycmVudFBsYXllcigpLnRoZW4oKHBsYXllcjogR2FtZXBsYXkuUGxheWVyKSA9PiB7XHJcblx0XHRcdHRoaXMucGxheWVyID0gcGxheWVyXHJcblx0XHRcdHRoaXMuY2hhcmEgPSB0aGlzLnBsYXllci5jaGFyYWN0ZXJcclxuXHRcdFx0dGhpcy5jYW1lcmEgPSB0aGlzLmNoYXJhLmNhbWVyYVN5c3RlbVxyXG5cdFx0XHRcclxuXHRcdFx0dGhpcy5jbGllbnRJbml0V2VhcG9uRW50aXR5Um9vdCgpXHJcblx0XHRcdHRoaXMuY2xpZW50SW5pdFBpY2tVcFRyaWdnZXIoKVxyXG5cdFx0XHR0aGlzLmNsaWVudEluaXRBbW1vRW50aXR5Um9vdCgpXHJcblx0XHRcdHRoaXMuY2xpZW50SW5pdENhc2luZ0VudGl0eSgpXHJcblx0XHRcdHRoaXMuY2xpZW50SW5pdEhpdENoYXJhRWZmZWN0KClcclxuXHRcdFx0dGhpcy5jbGllbnRJbml0SGl0RWZmZWN0KClcclxuXHRcdFx0dGhpcy5jbGllbnRJbml0RmlyZUVmZmVjdCgpXHJcblx0XHRcdHRoaXMuY2xpZW50SW5pdEZpcmVTb3VuZCgpXHJcblx0XHRcdHRoaXMuY2xpZW50SW5pdFJlbG9hZFNvdW5kKClcclxuXHRcdFx0dGhpcy5jbGllbnRJbml0TG9hZFNvdW5kKClcclxuXHRcdFx0dGhpcy5jbGllbnRJbml0QWltU291bmQoKVxyXG5cdFx0XHR0aGlzLmNsaWVudEluaXRIaXRDaGFyYVNvdW5kKClcclxuXHRcdFx0dGhpcy5jbGllbnRJbml0SGl0U291bmQoKVxyXG5cdFx0XHR0aGlzLmNsaWVudEluaXREZWxlZ2F0ZSgpXHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0LyogXHU1QkEyXHU2MjM3XHU3QUVGXHU1MjFEXHU1OUNCXHU1MzE2XHU2ODM5XHU2QjY2XHU1NjY4XHU1QjlFXHU0RjUzICovXHJcblx0cHJpdmF0ZSBjbGllbnRJbml0V2VhcG9uRW50aXR5Um9vdCgpOiB2b2lkIHtcclxuXHRcdHRoaXMud2VhcG9uRW50aXR5Um9vdCA9IHRoaXMud2VhcG9uT2JqLmdldENoaWxkQnlOYW1lKFwid2VhcG9uRW50aXR5Um9vdFwiKSBhcyBDb3JlLkdhbWVPYmplY3RcclxuXHR9XHJcblxyXG5cdC8qIFx1NUJBMlx1NjIzN1x1N0FFRlx1NTIxRFx1NTlDQlx1NTMxNlx1NjJGRVx1NTNENlx1ODlFNlx1NTNEMVx1NTY2OCAqL1xyXG5cdHByaXZhdGUgYXN5bmMgY2xpZW50SW5pdFBpY2tVcFRyaWdnZXIoKSB7XHJcblx0XHR0aGlzLnBpY2tVcFRyaWdnZXIgPSBhd2FpdCBHYW1lT2JqZWN0LmFzeW5jU3Bhd24oe2d1aWQgOiBcIlRyaWdnZXJcIn0pXHJcblx0XHR0aGlzLnBpY2tVcFRyaWdnZXIucGFyZW50ID0gdGhpcy53ZWFwb25PYmpcclxuXHRcdGlmICh0aGlzLnBpY2tVcFRyaWdnZXIpIHtcclxuXHRcdFx0dGhpcy5waWNrVXBUcmlnZ2VyLm9uRW50ZXIuYWRkKChjaGFyYTogR2FtZXBsYXkuQ2hhcmFjdGVyKSA9PiB7XHJcblx0XHRcdFx0Ly8gXHU1OTgyXHU2NzlDXHU2NjJGXHU4OUQyXHU4MjcyXHVGRjBDXHU5NTAwXHU2QkMxXHU4OUU2XHU1M0QxXHU1NjY4XHVGRjBDXHU4OEM1XHU1OTA3XHU2QjY2XHU1NjY4XHVGRjBDXHU2MzYyXHU1RjM5XHVGRjBDXHU0RkVFXHU2NTM5XHU1OUZGXHU2MDAxXHVGRjBDXHU4QkJFXHU3RjZFXHU3M0E5XHU1QkI2XHU2QjY2XHU1NjY4bWFwXHVGRjBDXHU2RDNFXHU1M0QxXHU4OEM1XHU1OTA3XHU0RThCXHU0RUY2XHJcblx0XHRcdFx0aWYgKCEoY2hhcmEgaW5zdGFuY2VvZiBHYW1lcGxheS5DaGFyYWN0ZXIpKSByZXR1cm5cclxuXHRcdFx0XHRpZiAoY2hhcmEgPT09IHRoaXMuY2hhcmEpIHtcclxuXHRcdFx0XHRcdHRoaXMuc2VydmVyRXF1aXAodGhpcy5wbGF5ZXIuZ2V0UGxheWVySUQoKSlcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKiBcdTY3MERcdTUyQTFcdTdBRUZcdTg4QzVcdTU5MDcgKi9cclxuXHRAQ29yZS5GdW5jdGlvbihDb3JlLlNlcnZlcilcclxuXHRwdWJsaWMgc2VydmVyRXF1aXAocGxheWVySUQ6IG51bWJlcik6IHZvaWQge1xyXG5cdFx0bGV0IHBsYXllciA9IEdhbWVwbGF5LmdldFBsYXllcihwbGF5ZXJJRClcclxuXHRcdC8vIFx1NTk4Mlx1Njc5Q1x1ODhDNVx1NTkwN1x1NjVGNlx1NzNBOVx1NUJCNlx1NEUzQVx1N0E3QVx1NTIxOVx1OEZENFx1NTZERVxyXG5cdFx0aWYgKHBsYXllciA9PSBudWxsIHx8ICF0aGlzLndlYXBvbk9iaikgcmV0dXJuXHJcblx0XHR0aGlzLndlYXBvbk9iai5lcXVpcG1lbnQocGxheWVyLmNoYXJhY3RlciwgdGhpcy5jb25maWcuZXF1aXBtZW50U2xvdClcclxuXHRcdHRoaXMuaXNFcXVpcGVkID0gdHJ1ZVxyXG5cdFx0UHJlZmFiRXZlbnQuUHJlZmFiRXZ0RXF1aXAuZXF1aXAocGxheWVyLmNoYXJhY3Rlci5ndWlkLCBQcmVmYWJFdmVudC5FcXVpcFNsb3QuV2VhcG9uLCB0aGlzLndlYXBvbk9iai5ndWlkKVxyXG5cdH1cclxuXHJcblxyXG5cclxuXHQvKiBcdTRGRUVcdTY1MzlcdTk4ODRcdTUyMzZcdTRGNTNcdTUyQThcdTRGNUNcdThENDRcdTZFOTAgKi9cclxuXHRwcml2YXRlIGNoYW5nZVdlYXBvbkFjdGlvbihzZXg6IG51bWJlcikge1xyXG5cdFx0Y29uc29sZS5lcnJvcihcImNoYW5nZVdlYXBvbkFjdGlvbiBcIiArIHNleClcclxuXHRcdHNleCA9PSAwID8gdGhpcy53ZWFwb25BY3Rpb24gPSBHYW1lQ29uZmlnLkFjdGlvbi5nZXRFbGVtZW50KHRoaXMuY29uZmlnLmZlbWFsZUFjdGlvbikgOiB0aGlzLndlYXBvbkFjdGlvbiA9IEdhbWVDb25maWcuQWN0aW9uLmdldEVsZW1lbnQodGhpcy5jb25maWcubWFsZUFjdGlvbilcclxuXHRcdGlmICh0aGlzLndlYXBvbk9iaikge1xyXG5cdFx0XHR0aGlzLndlYXBvbk9iai5maXJlQ29tcG9uZW50LmFuaW1hdGlvbkd1aWQgPSB0aGlzLndlYXBvbkFjdGlvbi5zaG9vdEFuaW1hdGlvblxyXG5cdFx0XHRpZiAodGhpcy53ZWFwb25PYmoucmVsb2FkRW5hYmxlKSB7XHJcblx0XHRcdFx0dGhpcy53ZWFwb25PYmoucmVsb2FkQ29tcG9uZW50LmFuaW1hdGlvbkd1aWQgPSB0aGlzLndlYXBvbkFjdGlvbi5yZWxvYWRBbmltYXRpb25cclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAodGhpcy53ZWFwb25PYmoubG9hZEVuYWJsZSkge1xyXG5cdFx0XHRcdHRoaXMud2VhcG9uT2JqLmxvYWRDb21wb25lbnQuYW5pbWF0aW9uR3VpZCA9IHRoaXMud2VhcG9uQWN0aW9uLmxvYWRBbmltYXRpb25cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSB0ZW1wTW92ZUZhY2luZ0RpcmVjdGlvbjogbnVtYmVyXHJcblx0cHJpdmF0ZSB0ZW1wdGFyZ2V0QXJtTGVuZ3RoOiBudW1iZXJcclxuXHRwcml2YXRlIHRlbXBjYW1lcmFGT1Y6IG51bWJlclxyXG5cdHByaXZhdGUgdGVtcGNhbWVyYU9mZnNldDogVHlwZS5WZWN0b3JcclxuXHRwcml2YXRlIHRlbXB0YXJnZXRBcm1PZmZzZXQ6IFR5cGUuVmVjdG9yXHJcblx0cHJpdmF0ZSB0ZW1wYW5pbWF0aW9uU3RhbmNlOiBzdHJpbmdcclxuXHJcblx0LyogXHU1QkEyXHU2MjM3XHU3QUVGXHU4OEM1XHU1OTA3ICovXHJcblx0QENvcmUuRnVuY3Rpb24oQ29yZS5DbGllbnQpXHJcblx0cHJpdmF0ZSBjbGllbnRFcXVpcChwaWNrUGxheWVyOiBHYW1lcGxheS5QbGF5ZXIsIGdlbmRlcjogbnVtYmVyKTogdm9pZCB7XHJcblx0XHRpZiAoIXRoaXMuY2FtZXJhKSB7XHJcblx0XHRcdHRoaXMuY2FtZXJhID0gR2FtZXBsYXkuZ2V0Q3VycmVudFBsYXllcigpLmNoYXJhY3Rlci5jYW1lcmFTeXN0ZW1cclxuXHRcdH1cclxuXHRcdGlmICghdGhpcy53ZWFwb25PYmopIHtcclxuXHRcdFx0dGhpcy53ZWFwb25PYmogPSB0aGlzLmdhbWVPYmplY3QgYXMgR2FtZXBsYXkuSG90V2VhcG9uXHJcblx0XHR9XHJcblx0XHR0aGlzLndlYXBvbk9iai5lcXVpcG1lbnQodGhpcy5jaGFyYSwgdGhpcy5jb25maWcuZXF1aXBtZW50U2xvdClcclxuXHRcdC8vRXZlbnRzLmRpc3BhdGNoTG9jYWwoVU5FUVVJUF9FVkVOVClcclxuXHRcdHRoaXMuY2hhbmdlV2VhcG9uQWN0aW9uKGdlbmRlcilcclxuXHRcdC8vIHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0Ly8gXHRFdmVudHMuZGlzcGF0Y2hMb2NhbChFUVVJUF9FVkVOVCwgdGhpcylcclxuXHRcdHRoaXMudGVtcE1vdmVGYWNpbmdEaXJlY3Rpb24gPSB0aGlzLmNoYXJhLm1vdmVGYWNpbmdEaXJlY3Rpb25cclxuXHRcdHRoaXMudGVtcGFuaW1hdGlvblN0YW5jZSA9IHRoaXMuY2hhcmEuYW5pbWF0aW9uU3RhbmNlXHJcblx0XHR0aGlzLnRlbXB0YXJnZXRBcm1MZW5ndGggPSB0aGlzLmNhbWVyYS50YXJnZXRBcm1MZW5ndGhcclxuXHRcdHRoaXMudGVtcHRhcmdldEFybU9mZnNldCA9IHRoaXMuY2FtZXJhLmNhbWVyYVN5c3RlbVJlbGF0aXZlVHJhbnNmb3JtLmxvY2F0aW9uXHJcblx0XHR0aGlzLnRlbXBjYW1lcmFGT1YgPSB0aGlzLmNhbWVyYS5jYW1lcmFGT1ZcclxuXHRcdHRoaXMudGVtcGNhbWVyYU9mZnNldCA9IHRoaXMuY2FtZXJhLmNhbWVyYVJlbGF0aXZlVHJhbnNmb3JtLmxvY2F0aW9uXHJcblx0XHR0aGlzLmNoYXJhLmFuaW1hdGlvblN0YW5jZSA9IHRoaXMud2VhcG9uQWN0aW9uLmhvbGRTdGFuY2VcclxuXHRcdHRoaXMuY2hhcmEucGxheUFuaW1hdGlvbih0aGlzLndlYXBvbkFjdGlvbi5lcXVpcEFuaW1hdGlvbilcclxuXHRcdHRoaXMuY2hhcmEubW92ZUZhY2luZ0RpcmVjdGlvbiA9IEdhbWVwbGF5Lk1vdmVGYWNpbmdEaXJlY3Rpb24uQ29udHJvbGxlckRpcmVjdGlvblxyXG5cdFx0dGhpcy5jYW1lcmEudGFyZ2V0QXJtTGVuZ3RoID0gNDAwXHJcblx0XHR0aGlzLmNhbWVyYS5jYW1lcmFGT1YgPSB0aGlzLmNvbmZpZy5lcXVpcG1lbnRDYW1lcmFGb3ZcclxuXHRcdHRoaXMuY2FtZXJhLmNhbWVyYVJlbGF0aXZlVHJhbnNmb3JtID0gbmV3IFR5cGUuVHJhbnNmb3JtKHRoaXMuY29uZmlnLmVxdWlwbWVudENhbWVyYU9mZnNldCwgdGhpcy5jYW1lcmEuY2FtZXJhUmVsYXRpdmVUcmFuc2Zvcm0ucm90YXRpb24sIHRoaXMuY2FtZXJhLmNhbWVyYVJlbGF0aXZlVHJhbnNmb3JtLnNjYWxlKVxyXG5cdFx0dGhpcy5jYW1lcmEuY2FtZXJhU3lzdGVtUmVsYXRpdmVUcmFuc2Zvcm0gPSBuZXcgVHlwZS5UcmFuc2Zvcm0obmV3IFR5cGUuVmVjdG9yKDAsIDAsIDYwKSwgdGhpcy5jYW1lcmEuY2FtZXJhUmVsYXRpdmVUcmFuc2Zvcm0ucm90YXRpb24sIHRoaXMuY2FtZXJhLmNhbWVyYVJlbGF0aXZlVHJhbnNmb3JtLnNjYWxlKVxyXG5cdFx0dGhpcy53ZWFwb25VSSA9IFVJLlVJTWFuYWdlci5pbnN0YW5jZS5zaG93KFdlYXBvblVJLCB0aGlzLCB0aGlzLndlYXBvbk9iai5hY2N1cmFjeU9mRmlyZUVuYWJsZSA/IHRoaXMud2VhcG9uT2JqLmFjY3VyYWN5T2ZGaXJlQ29tcG9uZW50LmRlZmF1bHREaXNwZXJzaW9uSGFsZkFuZ2xlIDogMCwgdGhpcy5jb25maWcud2VhcG9uSWNvbiwgdGhpcy5jb25maWcubmFtZSlcclxuXHRcdHRoaXMud2VhcG9uVUkuc2V0VGltZVRleHQodGhpcy5jb25maWcua2VlcFRpbWUsIHRoaXMuY29uZmlnLmtlZXBUaW1lKVxyXG5cdFx0dGhpcy53ZWFwb25VSS5zZXRSZWxvYWRCdG4oIXRoaXMuY29uZmlnLmlzU3VwcG9ydFJlcEFtbW8pXHJcblx0XHRpZiAodGhpcy5jb25maWcuaXNTdXBwb3J0UmVwQW1tbykge1xyXG5cdFx0XHR0aGlzLndlYXBvbk9iai5yZWxvYWRDb21wb25lbnQuYW5pbWF0aW9uR3VpZCA9IHRoaXMud2VhcG9uQWN0aW9uLmFpbVNob290QW5pbWF0aW9uXHJcblx0XHRcdHRoaXMud2VhcG9uT2JqLmxvYWRDb21wb25lbnQuYW5pbWF0aW9uR3VpZCA9IHRoaXMud2VhcG9uQWN0aW9uLmFpbVNob290QW5pbWF0aW9uXHJcblx0XHR9XHJcblx0XHR0aGlzLl9yZXN0VGltZSA9IHRoaXMuY29uZmlnLmtlZXBUaW1lXHJcblx0XHQvLyB9LCAxMDApXHJcblx0fVxyXG5cdC8qIFx1NEZFRVx1NjUzOUZPViAqL1xyXG5cdHB1YmxpYyBjaGFuZ2VGb3YodmFsdWU6IG51bWJlcikge1xyXG5cdFx0dGhpcy5jYW1lcmEuY2FtZXJhRk9WID0gdmFsdWVcclxuXHR9XHJcblxyXG5cclxuXHQvKiBcdTVCQTJcdTYyMzdcdTdBRUZcdTUyMURcdTU5Q0JcdTUzMTZcdTY4MzlcdTVGMzlcdTgzNkZcdTVCOUVcdTRGNTMgKi9cclxuXHRwcml2YXRlIGFzeW5jIGNsaWVudEluaXRBbW1vRW50aXR5Um9vdCgpIHtcclxuXHRcdHRoaXMuYW1tb0VudGl0eVJvb3QgPSBhd2FpdCBHYW1lT2JqZWN0LmFzeW5jU3Bhd24oeyBndWlkIDogdGhpcy53ZWFwb25SZXNvdXJjZXMuYW1tbyB9KVxyXG5cdFx0dGhpcy5hbW1vRW50aXR5Um9vdC5wYXJlbnQgPSB0aGlzLndlYXBvbk9ialxyXG5cdFx0dGhpcy5hbW1vUG9vbCA9IG5ldyBHYW1lRGVmLlNpbXBsZU9iamVjdFBvb2w8Q29yZS5HYW1lT2JqZWN0Pih0aGlzLmluc3RhbmNlQW1tby5iaW5kKHRoaXMpLCAob2JqOiBDb3JlLkdhbWVPYmplY3QpID0+IHsgb2JqLmRlc3Ryb3koKSB9LCAob2JqOiBDb3JlLkdhbWVPYmplY3QpID0+IHsgb2JqLnNldFZpc2liaWxpdHkoVHlwZS5Qcm9wZXJ0eVN0YXR1cy5PZmYpIH0pXHJcblx0fVxyXG5cclxuXHQvKiBcdTVCQTJcdTYyMzdcdTdBRUZcdTUyMURcdTU5Q0JcdTUzMTZcdTVGMzlcdTU4RjNcdTVCOUVcdTRGNTMgKi9cclxuXHRwcml2YXRlIGFzeW5jIGNsaWVudEluaXRDYXNpbmdFbnRpdHkoKSB7XHJcblx0XHR0aGlzLmNhc2luZ0VudGl0eSA9IGF3YWl0IEdhbWVPYmplY3QuYXN5bmNTcGF3bih7IGd1aWQgOiB0aGlzLndlYXBvblJlc291cmNlcy5jYXNpbmcgfSlcclxuXHRcdHRoaXMuY2FzaW5nRW50aXR5LnBhcmVudCA9IHRoaXMud2VhcG9uT2JqXHJcblx0XHR0aGlzLmNhc2luZ1Bvb2wgPSBuZXcgR2FtZURlZi5TaW1wbGVPYmplY3RQb29sPENvcmUuR2FtZU9iamVjdD4odGhpcy5pbnN0YW5jZUNhc2luZy5iaW5kKHRoaXMpLCAob2JqOiBDb3JlLkdhbWVPYmplY3QpID0+IHsgb2JqLmRlc3Ryb3koKSB9LCAob2JqOiBDb3JlLkdhbWVPYmplY3QpID0+IHsgb2JqLnNldFZpc2liaWxpdHkoVHlwZS5Qcm9wZXJ0eVN0YXR1cy5PZmYpIH0pXHJcblx0fVxyXG5cclxuXHQvKiBcdTVCQTJcdTYyMzdcdTdBRUZcdTUyMURcdTU5Q0JcdTUzMTZcdTUxRkJcdTRFMkRcdTg5RDJcdTgyNzJcdTcyNzlcdTY1NDggKi9cclxuXHRwcml2YXRlIGFzeW5jIGNsaWVudEluaXRIaXRDaGFyYUVmZmVjdCgpIHtcclxuXHRcdHRoaXMuaGl0Q2hhcmFFZmZlY3QgPSBhd2FpdCBHYW1lT2JqZWN0LmFzeW5jU3Bhd24oeyBndWlkIDogdGhpcy53ZWFwb25SZXNvdXJjZXMuaGl0Um9sZUVmZmVjdCB9KVxyXG5cdFx0dGhpcy5oaXRDaGFyYUVmZmVjdC5wYXJlbnQgPSB0aGlzLndlYXBvbk9ialxyXG5cdFx0dGhpcy5oaXRDaGFyYUVmZmVjdFBvb2wgPSBuZXcgR2FtZURlZi5TaW1wbGVPYmplY3RQb29sPEdhbWVwbGF5LlBhcnRpY2xlPih0aGlzLmluc3RhbmNlSGl0Q2hhcmFFZmZlY3QuYmluZCh0aGlzKSwgKHBhcnRpY2xlOiBHYW1lcGxheS5QYXJ0aWNsZSkgPT4geyBwYXJ0aWNsZS5kZXN0cm95KCkgfSwgKHBhcnRpY2xlOiBHYW1lcGxheS5QYXJ0aWNsZSkgPT4geyBwYXJ0aWNsZS5kZXRhY2hGcm9tR2FtZU9iamVjdCgpOyBwYXJ0aWNsZS5mb3JjZVN0b3AoKSB9KVxyXG5cdH1cclxuXHJcblx0LyogXHU1QkEyXHU2MjM3XHU3QUVGXHU1MjFEXHU1OUNCXHU1MzE2XHU1MUZCXHU0RTJEXHU3MjY5XHU0RjUzXHU3Mjc5XHU2NTQ4ICovXHJcblx0cHJpdmF0ZSBhc3luYyBjbGllbnRJbml0SGl0RWZmZWN0KCkge1xyXG5cdFx0dGhpcy5oaXRFZmZlY3QgPSBhd2FpdCBHYW1lT2JqZWN0LmFzeW5jU3Bhd24oeyBndWlkIDogdGhpcy53ZWFwb25SZXNvdXJjZXMuaGl0T3RoZXJFZmZlY3QgfSlcclxuXHRcdHRoaXMuaGl0RWZmZWN0LnBhcmVudCA9IHRoaXMud2VhcG9uT2JqXHJcblx0XHR0aGlzLmhpdEVmZmVjdFBvb2wgPSBuZXcgR2FtZURlZi5TaW1wbGVPYmplY3RQb29sPEdhbWVwbGF5LlBhcnRpY2xlPih0aGlzLmluc3RhbmNlSGl0RWZmZWN0LmJpbmQodGhpcyksIChwYXJ0aWNsZTogR2FtZXBsYXkuUGFydGljbGUpID0+IHsgcGFydGljbGUuZGVzdHJveSgpIH0sIChwYXJ0aWNsZTogR2FtZXBsYXkuUGFydGljbGUpID0+IHsgcGFydGljbGUuZGV0YWNoRnJvbUdhbWVPYmplY3QoKTsgcGFydGljbGUuZm9yY2VTdG9wKCkgfSlcclxuXHR9XHJcblxyXG5cdC8qIFx1NUJBMlx1NjIzN1x1N0FFRlx1NTIxRFx1NTlDQlx1NTMxNlx1NUYwMFx1NzA2Qlx1NzI3OVx1NjU0OCAqL1xyXG5cdHByaXZhdGUgYXN5bmMgY2xpZW50SW5pdEZpcmVFZmZlY3QoKSB7XHJcblx0XHR0aGlzLmZpcmVFZmZlY3QgPSBhd2FpdCBHYW1lT2JqZWN0LmFzeW5jU3Bhd24oeyBndWlkIDogdGhpcy53ZWFwb25SZXNvdXJjZXMuZmlyZUVmZmVjdCB9KVxyXG5cdFx0dGhpcy5maXJlRWZmZWN0LnBhcmVudCA9IHRoaXMud2VhcG9uT2JqXHJcblx0fVxyXG5cclxuXHQvKiBcdTVCQTJcdTYyMzdcdTdBRUZcdTUyMURcdTU5Q0JcdTUzMTZcdTVGMDBcdTcwNkJcdTk3RjNcdTY1NDggKi9cclxuXHRwcml2YXRlIGFzeW5jIGNsaWVudEluaXRGaXJlU291bmQoKSB7XHJcblx0XHR0aGlzLmZpcmVTb3VuZCA9IGF3YWl0IEdhbWVPYmplY3QuYXN5bmNTcGF3bih7IGd1aWQgOiB0aGlzLndlYXBvblJlc291cmNlcy5maXJlU291bmQgfSlcclxuXHRcdHRoaXMuZmlyZVNvdW5kLnBhcmVudCA9IHRoaXMud2VhcG9uT2JqXHJcblx0fVxyXG5cclxuXHQvKiBcdTVCQTJcdTYyMzdcdTdBRUZcdTUyMURcdTU5Q0JcdTUzMTZcdTYzNjJcdTVGMzlcdTk3RjNcdTY1NDggKi9cclxuXHRwcml2YXRlIGFzeW5jIGNsaWVudEluaXRSZWxvYWRTb3VuZCgpIHtcclxuXHRcdHRoaXMucmVsb2FkU291bmQgPSBhd2FpdCBHYW1lT2JqZWN0LmFzeW5jU3Bhd24oeyBndWlkIDogdGhpcy53ZWFwb25SZXNvdXJjZXMucmVsb2FkU291bmQgfSlcclxuXHRcdHRoaXMucmVsb2FkU291bmQucGFyZW50ID0gdGhpcy53ZWFwb25PYmpcclxuXHR9XHJcblxyXG5cdC8qIFx1NUJBMlx1NjIzN1x1N0FFRlx1NTIxRFx1NTlDQlx1NTMxNlx1NEUwQVx1ODE5Qlx1OTdGM1x1NjU0OCAqL1xyXG5cdHByaXZhdGUgYXN5bmMgY2xpZW50SW5pdExvYWRTb3VuZCgpIHtcclxuXHRcdHRoaXMubG9hZFNvdW5kID0gYXdhaXQgR2FtZU9iamVjdC5hc3luY1NwYXduKHsgZ3VpZCA6IHRoaXMud2VhcG9uUmVzb3VyY2VzLmxvYWRTb3VuZCB9KVxyXG5cdFx0dGhpcy5sb2FkU291bmQucGFyZW50ID0gdGhpcy53ZWFwb25PYmpcclxuXHR9XHJcblxyXG5cdC8qIFx1NUJBMlx1NjIzN1x1N0FFRlx1NTIxRFx1NTlDQlx1NTMxNlx1Nzc4NFx1NTFDNlx1OTdGM1x1NjU0OCAqL1xyXG5cdHByaXZhdGUgYXN5bmMgY2xpZW50SW5pdEFpbVNvdW5kKCkge1xyXG5cdFx0dGhpcy5haW1Tb3VuZCA9IGF3YWl0IEdhbWVPYmplY3QuYXN5bmNTcGF3bih7IGd1aWQgOiB0aGlzLndlYXBvblJlc291cmNlcy5haW1Tb3VuZCB9KVxyXG5cdFx0dGhpcy5haW1Tb3VuZC5wYXJlbnQgPSB0aGlzLndlYXBvbk9ialxyXG5cdH1cclxuXHJcblx0LyogXHU1QkEyXHU2MjM3XHU3QUVGXHU1MjFEXHU1OUNCXHU1MzE2XHU2ODM5XHU1MUZCXHU0RTJEXHU4OUQyXHU4MjcyXHU5N0YzXHU2NTQ4ICovXHJcblx0cHJpdmF0ZSBhc3luYyBjbGllbnRJbml0SGl0Q2hhcmFTb3VuZCgpIHtcclxuXHRcdHRoaXMuaGl0Q2hhcmFTb3VuZCA9IGF3YWl0IEdhbWVPYmplY3QuYXN5bmNTcGF3bih7IGd1aWQgOiB0aGlzLndlYXBvblJlc291cmNlcy5oaXRSb2xlU291bmQgfSlcclxuXHRcdHRoaXMuaGl0Q2hhcmFTb3VuZC5wYXJlbnQgPSB0aGlzLndlYXBvbk9ialxyXG5cdFx0dGhpcy5oaXRDaGFyYVNvdW5kUG9vbCA9IG5ldyBHYW1lRGVmLlNpbXBsZU9iamVjdFBvb2w8R2FtZXBsYXkuU291bmQ+KHRoaXMuaW5zdGFuY2VIaXRDaGFyYVNvdW5kLmJpbmQodGhpcyksIChzb3VuZDogR2FtZXBsYXkuU291bmQpID0+IHsgc291bmQuZGVzdHJveSgpIH0sIChzb3VuZDogR2FtZXBsYXkuU291bmQpID0+IHsgc291bmQuc3RvcCgpIH0pXHJcblx0fVxyXG5cclxuXHQvKiBcdTVCQTJcdTYyMzdcdTdBRUZcdTUyMURcdTU5Q0JcdTUzMTZcdTY4MzlcdTUxRkJcdTRFMkRcdTcyNjlcdTRGNTNcdTk3RjNcdTY1NDggKi9cclxuXHRwcml2YXRlIGFzeW5jIGNsaWVudEluaXRIaXRTb3VuZCgpIHtcclxuXHRcdHRoaXMuaGl0U291bmQgPSBhd2FpdCBHYW1lT2JqZWN0LmFzeW5jU3Bhd24oeyBndWlkIDogdGhpcy53ZWFwb25SZXNvdXJjZXMuaGl0T3RoZXJTb3VuZCB9KVxyXG5cdFx0dGhpcy5oaXRTb3VuZC5wYXJlbnQgPSB0aGlzLndlYXBvbk9ialxyXG5cdFx0dGhpcy5oaXRTb3VuZFBvb2wgPSBuZXcgR2FtZURlZi5TaW1wbGVPYmplY3RQb29sPEdhbWVwbGF5LlNvdW5kPih0aGlzLmluc3RhbmNlSGl0U291bmQuYmluZCh0aGlzKSwgKHNvdW5kOiBHYW1lcGxheS5Tb3VuZCkgPT4geyBzb3VuZC5kZXN0cm95KCkgfSwgKHNvdW5kOiBHYW1lcGxheS5Tb3VuZCkgPT4geyBzb3VuZC5zdG9wKCkgfSlcclxuXHR9XHJcblxyXG5cdC8qIFx1OEZENFx1NTZERVx1NEUwMFx1NEUyQVx1NUYzOVx1ODM2Rlx1NUI5RVx1NEY4QiAqL1xyXG5cdHByaXZhdGUgaW5zdGFuY2VBbW1vKCkge1xyXG5cdFx0bGV0IGFtbW8gPSB0aGlzLmFtbW9FbnRpdHlSb290LmNsb25lKGZhbHNlKVxyXG5cdFx0YW1tby5kZXRhY2hGcm9tR2FtZU9iamVjdCgpXHJcblx0XHRhbW1vLnNldFZpc2liaWxpdHkoVHlwZS5Qcm9wZXJ0eVN0YXR1cy5PbilcclxuXHRcdHJldHVybiBhbW1vXHJcblx0fVxyXG5cclxuXHQvKiBcdThGRDRcdTU2REVcdTRFMDBcdTRFMkFcdTVGMzlcdTU4RjNcdTVCOUVcdTRGOEIgKi9cclxuXHRwcml2YXRlIGluc3RhbmNlQ2FzaW5nKCkge1xyXG5cdFx0bGV0IGNhc2luZyA9IHRoaXMuY2FzaW5nRW50aXR5LmNsb25lKGZhbHNlKVxyXG5cdFx0Y2FzaW5nLmRldGFjaEZyb21HYW1lT2JqZWN0KClcclxuXHRcdGNhc2luZy5zZXRWaXNpYmlsaXR5KFR5cGUuUHJvcGVydHlTdGF0dXMuT24pXHJcblx0XHRyZXR1cm4gY2FzaW5nXHJcblx0fVxyXG5cclxuXHQvKiBcdThGRDRcdTU2REVcdTRFMDBcdTRFMkFcdTUxRkJcdTRFMkRcdTg5RDJcdTgyNzJcdTcyNzlcdTY1NDhcdTVCOUVcdTRGOEIgKi9cclxuXHRwcml2YXRlIGluc3RhbmNlSGl0Q2hhcmFFZmZlY3QoKSB7XHJcblx0XHRsZXQgaGl0Q2hhcmEgPSB0aGlzLmhpdENoYXJhRWZmZWN0LmNsb25lKGZhbHNlKSBhcyBHYW1lcGxheS5QYXJ0aWNsZVxyXG5cdFx0aGl0Q2hhcmEuZGV0YWNoRnJvbUdhbWVPYmplY3QoKVxyXG5cdFx0cmV0dXJuIGhpdENoYXJhXHJcblx0fVxyXG5cclxuXHQvKiBcdThGRDRcdTU2REVcdTRFMDBcdTRFMkFcdTUxRkJcdTRFMkRcdTcyNjlcdTRGNTNcdTcyNzlcdTY1NDhcdTVCOUVcdTRGOEIgKi9cclxuXHRwcml2YXRlIGluc3RhbmNlSGl0RWZmZWN0KCkge1xyXG5cdFx0bGV0IGhpdCA9IHRoaXMuaGl0RWZmZWN0LmNsb25lKGZhbHNlKSBhcyBHYW1lcGxheS5QYXJ0aWNsZVxyXG5cdFx0aGl0LmRldGFjaEZyb21HYW1lT2JqZWN0KClcclxuXHRcdHJldHVybiBoaXRcclxuXHR9XHJcblxyXG5cdC8qIFx1OEZENFx1NTZERVx1NEUwMFx1NEUyQVx1NTFGQlx1NEUyRFx1ODlEMlx1ODI3Mlx1OTdGM1x1NjU0OFx1NUI5RVx1NEY4QiAqL1xyXG5cdHByaXZhdGUgaW5zdGFuY2VIaXRDaGFyYVNvdW5kKCkge1xyXG5cdFx0bGV0IGhpdENoYXJhID0gdGhpcy5oaXRDaGFyYVNvdW5kLmNsb25lKGZhbHNlKSBhcyBHYW1lcGxheS5Tb3VuZFxyXG5cdFx0aGl0Q2hhcmEuZGV0YWNoRnJvbUdhbWVPYmplY3QoKVxyXG5cdFx0cmV0dXJuIGhpdENoYXJhXHJcblx0fVxyXG5cclxuXHQvKiBcdThGRDRcdTU2REVcdTRFMDBcdTRFMkFcdTUxRkJcdTRFMkRcdTk3RjNcdTY1NDhcdTVCOUVcdTRGOEIgKi9cclxuXHRwcml2YXRlIGluc3RhbmNlSGl0U291bmQoKSB7XHJcblx0XHRsZXQgaGl0ID0gdGhpcy5oaXRTb3VuZC5jbG9uZShmYWxzZSkgYXMgR2FtZXBsYXkuU291bmRcclxuXHRcdGhpdC5kZXRhY2hGcm9tR2FtZU9iamVjdCgpXHJcblx0XHRyZXR1cm4gaGl0XHJcblx0fVxyXG5cclxuXHJcblxyXG5cdC8qIFx1NUJBMlx1NjIzN1x1N0FFRlx1NTIxRFx1NTlDQlx1NTMxNlx1NTZERVx1OEMwM1x1NTFGRFx1NjU3MCAqL1xyXG5cdHByaXZhdGUgY2xpZW50SW5pdERlbGVnYXRlKCk6IHZvaWQge1xyXG5cdFx0dGhpcy53ZWFwb25PYmoub25FcXVpcHBlZENsaWVudC5hZGQodGhpcy5vbkNsaWVudEVxdWlwLmJpbmQodGhpcykpXHJcblx0XHR0aGlzLndlYXBvbk9iai5vblVuZXF1aXBwZWRDbGllbnQuYWRkKHRoaXMub25DbGllbnRVbmVxdWlwLmJpbmQodGhpcykpXHJcblxyXG5cdFx0dGhpcy53ZWFwb25PYmouZmlyZUNvbXBvbmVudC5vblN0YXJ0RmlyZUNsaWVudC5hZGQodGhpcy5vbkNsaWVudFN0YXJ0RmlyZS5iaW5kKHRoaXMpKVxyXG5cdFx0dGhpcy53ZWFwb25PYmouZmlyZUNvbXBvbmVudC5vbkVuZEZpcmVDbGllbnQuYWRkKHRoaXMub25DbGllbnRFbmRGaXJlLmJpbmQodGhpcykpXHJcblx0XHRpZiAodGhpcy53ZWFwb25PYmoucmVsb2FkRW5hYmxlKSB7XHJcblx0XHRcdHRoaXMud2VhcG9uT2JqLnJlbG9hZENvbXBvbmVudC5vblN0YXJ0UmVsb2FkQ2xpZW50LmFkZCh0aGlzLm9uQ2xpZW50U3RhcnRSZWxvYWQuYmluZCh0aGlzKSlcclxuXHRcdFx0dGhpcy53ZWFwb25PYmoucmVsb2FkQ29tcG9uZW50Lm9uRW5kUmVsb2FkQ2xpZW50LmFkZCh0aGlzLm9uQ2xpZW50RW5kUmVsb2FkLmJpbmQodGhpcykpXHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy53ZWFwb25PYmoubG9hZEVuYWJsZSkge1xyXG5cdFx0XHR0aGlzLndlYXBvbk9iai5sb2FkQ29tcG9uZW50Lm9uU3RhcnRMb2FkQ2xpZW50LmFkZCh0aGlzLm9uQ2xpZW50U3RhcnRMb2FkLmJpbmQodGhpcykpXHJcblx0XHRcdHRoaXMud2VhcG9uT2JqLmxvYWRDb21wb25lbnQub25FbmRMb2FkQ2xpZW50LmFkZCh0aGlzLm9uQ2xpZW50RW5kTG9hZC5iaW5kKHRoaXMpKVxyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMud2VhcG9uT2JqLmFpbUVuYWJsZSkge1xyXG5cdFx0XHR0aGlzLndlYXBvbk9iai5haW1Db21wb25lbnQub25BaW1TdGFydENsaWVudC5hZGQodGhpcy5vbkNsaWVudFN0YXJ0QWltLmJpbmQodGhpcykpXHJcblx0XHRcdHRoaXMud2VhcG9uT2JqLmFpbUNvbXBvbmVudC5vbkFpbUVuZENsaWVudC5hZGQodGhpcy5vbkNsaWVudEVuZEFpbS5iaW5kKHRoaXMpKVxyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMud2VhcG9uT2JqLnJlY29pbEZvcmNlRW5hYmxlKSB7XHJcblx0XHRcdHRoaXMud2VhcG9uT2JqLnJlY29pbEZvcmNlQ29tcG9uZW50Lm9uU3RhcnRSZWNvaWxGb3JjZUNsaWVudC5hZGQodGhpcy5vbkNsaWVudFN0YXJ0UmVjb2lsLmJpbmQodGhpcykpXHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy53ZWFwb25PYmouYWNjdXJhY3lPZkZpcmVFbmFibGUpIHtcclxuXHRcdFx0dGhpcy53ZWFwb25PYmouYWNjdXJhY3lPZkZpcmVDb21wb25lbnQub25DdXJyZW50RGlzcGVyc2lvbkNoYW5nZWRDbGllbnQuYWRkKHRoaXMub25DbGllbnRDdXJyZW50RGlzcGVyc2lvbkNoYW5nZWQuYmluZCh0aGlzKSlcclxuXHRcdH1cclxuXHJcblx0XHQvLyB0aGlzLmNsaWVudE9uSGl0ID0gKChoaXRSZXN1bHQ6IENvcmUuR2FtZU9iamVjdFtdIHwgR2FtZXBsYXkuSGl0UmVzdWx0W10sIGF0dGFja1BsYXllcjogbnVtYmVyLCBpc09iajogYm9vbGVhbikgPT4ge1xyXG5cdFx0Ly8gXHRpZiAoaXNPYmopIHtcclxuXHRcdC8vIFx0XHRmb3IgKGNvbnN0IGVsZW1lbnQgb2YgaGl0UmVzdWx0KSB7XHJcblx0XHQvLyBcdFx0XHRjb25zb2xlLmVycm9yKFwiaGl0IFwiICsgKGVsZW1lbnQgYXMgQ29yZS5HYW1lT2JqZWN0KS5ndWlkKVxyXG5cdFx0Ly8gXHRcdH1cclxuXHRcdC8vIFx0fSBlbHNlIHtcclxuXHRcdC8vIFx0XHRmb3IgKGNvbnN0IGVsZW1lbnQgb2YgaGl0UmVzdWx0KSB7XHJcblx0XHQvLyBcdFx0XHRjb25zb2xlLmVycm9yKFwiaGl0IFwiICsgKGVsZW1lbnQgYXMgR2FtZXBsYXkuSGl0UmVzdWx0KS5nYW1lT2JqZWN0Lmd1aWQpXHJcblx0XHQvLyBcdFx0fVxyXG5cdFx0Ly8gXHR9XHJcblx0XHQvLyB9KVxyXG5cclxuXHRcdHRoaXMuY2xpZW50T25CbG9ja0NoYW5nZSA9ICgoaXNCbG9jazogYm9vbGVhbikgPT4ge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKFwiaXNCbG9jayBcIiArIGlzQmxvY2spXHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0LyogXHU1QkEyXHU2MjM3XHU3QUVGXHU1RjAwXHU1OUNCXHU4OEM1XHU1OTA3XHU1QjhDXHU2MjEwXHU1NkRFXHU4QzAzICovXHJcblx0cHJpdmF0ZSBvbkNsaWVudEVxdWlwKCkge1xyXG5cdFx0Y29uc29sZS5lcnJvcihcIkNsaWVudEVxdWlwXCIpXHJcblx0XHQvLyBcdTg4QzVcdTU5MDdcdTc2ODRcdTZCNjZcdTU2NjhcdTU5ODJcdTY3OUNcdTY3MDlcdTYyRkVcdTUzRDZcdTg5RTZcdTUzRDFcdTU2NjhcclxuXHRcdGlmICh0aGlzLnBpY2tVcFRyaWdnZXIpIHtcclxuXHRcdFx0Y29uc29sZS5lcnJvcihcImRlc3Ryb3kgdHJpZ2dlclwiKVxyXG5cdFx0XHR0aGlzLnBpY2tVcFRyaWdnZXIuc2V0Q29sbGlzaW9uRW5hYmxlZChmYWxzZSlcclxuXHRcdH1cclxuXHJcblx0XHQvLyBcdTg4QzVcdTU5MDdcdTc2ODRcdTZCNjZcdTU2NjhcdTVCRjlcdThDNjFcdTU5ODJcdTY3OUNcdTY3MDlcdTZCNjZcdTU2NjhcdTVCOUVcdTRGNTNcdUZGMENcdTUyMTlcdTYyOEFcdTUzRUZcdTg5QzFcdTYwMjdcdTYyNTNcdTVGMDBcclxuXHRcdGlmICghdGhpcy53ZWFwb25FbnRpdHlSb290KSB7XHJcblx0XHRcdHRoaXMud2VhcG9uRW50aXR5Um9vdC5zZXRWaXNpYmlsaXR5KFR5cGUuUHJvcGVydHlTdGF0dXMuT24pXHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcblxyXG5cdC8qIFx1NUJBMlx1NjIzN1x1N0FFRlx1NTM3OFx1OEY3RFx1ODhDNVx1NTkwN1x1NUI4Q1x1NjIxMFx1NTZERVx1OEMwMyAqL1xyXG5cdHByaXZhdGUgb25DbGllbnRVbmVxdWlwKCkge1xyXG5cdFx0Y29uc29sZS5lcnJvcihcIm9uQ2xpZW50VW5lcXVpcFwiKVxyXG5cdFx0aWYgKCF0aGlzLndlYXBvbk9iaikgcmV0dXJuXHJcblx0XHRpZiAodGhpcy5jb25maWcuaXNBdXRvRGVzdHJveSkge1xyXG5cdFx0XHR0aGlzLndlYXBvbk9iai5zZXRWaXNpYmlsaXR5KFR5cGUuUHJvcGVydHlTdGF0dXMuT2ZmKVxyXG5cdFx0XHR0aGlzLndlYXBvbk9iaiA9IG51bGxcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGlmICh0aGlzLnBpY2tVcFRyaWdnZXIpIHtcclxuXHRcdFx0XHR0aGlzLndlYXBvbk9iai53b3JsZFJvdGF0aW9uID0gbmV3IFR5cGUuUm90YXRpb24oMCwgMCwgMSlcclxuXHRcdFx0XHR0aGlzLndlYXBvbk9iai53b3JsZExvY2F0aW9uID0gVHlwZS5WZWN0b3IuYWRkKHRoaXMud2VhcG9uT2JqLmdldFJpZ2h0VmVjdG9yKCkubXVsdGlwbHkoMTAwKSwgdGhpcy53ZWFwb25PYmoud29ybGRMb2NhdGlvbiwgdGhpcy53ZWFwb25PYmoud29ybGRMb2NhdGlvbilcclxuXHRcdFx0XHR0aGlzLnBpY2tVcFRyaWdnZXIuc2V0Q29sbGlzaW9uRW5hYmxlZCh0cnVlKVxyXG5cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG5cdC8qIFx1NUJBMlx1NjIzN1x1N0FFRlx1NUYwMFx1NTlDQlx1NUYwMFx1NzA2Qlx1NTZERVx1OEMwMyAqL1xyXG5cdHByaXZhdGUgb25DbGllbnRTdGFydEZpcmUoKSB7XHJcblx0XHRpZiAoIXRoaXMud2VhcG9uT2JqKSB7XHJcblx0XHRcdHJldHVyblxyXG5cdFx0fVxyXG5cdFx0dGhpcy5pc0NhbkZpcmUgPSB0aGlzLndlYXBvbk9iai5maXJlQ29tcG9uZW50LmN1cnJlbnRGaXJlSW50ZXJ2YWxcclxuXHRcdGlmICghdGhpcy5maXJlRWZmZWN0Lmxvb3ApIHtcclxuXHRcdFx0dGhpcy5maXJlRWZmZWN0LnN0b3AoKVxyXG5cdFx0fVxyXG5cdFx0dGhpcy5maXJlRWZmZWN0LnBsYXkoKVxyXG5cdFx0aWYgKCF0aGlzLmZpcmVTb3VuZC5sb29wKSB7XHJcblx0XHRcdHRoaXMuZmlyZVNvdW5kLnN0b3AoKVxyXG5cdFx0fVxyXG5cdFx0dGhpcy5maXJlU291bmQucGxheSgpXHJcblx0XHQvLyBcdTZCNjZcdTU2NjhcdTYzMDFcdTY3MDlcdTRFQkFcdTVCQTJcdTYyMzdcdTdBRUZcdTYyNjdcdTg4NENcclxuXHRcdGlmICh0aGlzLndlYXBvbk9iai5nZXRDdXJyZW50T3duZXIoKSA9PSB0aGlzLmNoYXJhKSB7XHJcblx0XHRcdC8vIFx1NTk4Mlx1Njc5Q1x1NUYzOVx1ODM2Rlx1NUI5RVx1NEY1M1x1NEUwRFx1NEUzQVx1N0E3QVx1RkYwOFx1NjcwOVx1NUYzOVx1OTA1M1x1ODg2OFx1NzNCMFx1RkYwOVxyXG5cdFx0XHRpZiAodGhpcy5hbW1vRW50aXR5Um9vdC5nZXRDaGlsZHJlbigpLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHQvLyBcdTY4MzlcdTYzNkVcdTU5MUFcdTkxQ0RcdTVGMzlcdTgzNkZcdTY1NzBcdTVCRjlcdTY3MkNcdTZCMjFcdTUzRDFcdTVDMDRcdTc2ODRcdTYyNDBcdTY3MDlcdTVCNTBcdTVGMzlcdTVCRjlcdThDNjFcdTRGMjBcdTUzQzJcclxuXHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8dGhpcy53ZWFwb25PYmouZmlyZUNvbXBvbmVudC5jdXJyZW50TXVsdGlwbGVTaG90OyBpKyspIHtcclxuXHJcblx0XHRcdFx0XHRsZXQgY2FtZXJhU2hvb3REaXIgPSB0aGlzLmNhbWVyYS5jYW1lcmFXb3JsZFRyYW5zZm9ybS5nZXRGb3J3YXJkVmVjdG9yKCkuY2xvbmUoKVxyXG5cdFx0XHRcdFx0aWYgKHRoaXMud2VhcG9uT2JqLmFjY3VyYWN5T2ZGaXJlRW5hYmxlKSB7XHJcblx0XHRcdFx0XHRcdGNhbWVyYVNob290RGlyID0gdGhpcy53ZWFwb25PYmouYWNjdXJhY3lPZkZpcmVDb21wb25lbnQuZ2V0UmFuZG9tU2hvb3REaXIoY2FtZXJhU2hvb3REaXIpLmNsb25lKClcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGxldCBlbmRMb2MgPSBjYW1lcmFTaG9vdERpci5tdWx0aXBseShHYW1lRGVmLlNIT09UX1JBTkdFKS5hZGQodGhpcy5jYW1lcmEuY2FtZXJhV29ybGRUcmFuc2Zvcm0ubG9jYXRpb24pXHJcblx0XHRcdFx0XHRsZXQgc2hvb3REaXIgPSBlbmRMb2MuY2xvbmUoKS5zdWJ0cmFjdCh0aGlzLmFtbW9FbnRpdHlSb290LndvcmxkTG9jYXRpb24pXHJcblx0XHRcdFx0XHRsZXQgaGl0UmVzID0gR2FtZXBsYXkubGluZVRyYWNlKHRoaXMuY2FtZXJhLmNhbWVyYVdvcmxkVHJhbnNmb3JtLmxvY2F0aW9uLCBlbmRMb2MsIHRydWUsIEdhbWVEZWYuREVCVUdfRkxBRylcclxuXHRcdFx0XHRcdGhpdFJlcyA9IGhpdFJlcy5maWx0ZXIoZSA9PiB7XHJcblx0XHRcdFx0XHRcdHJldHVybiAhKGUuZ2FtZU9iamVjdCBpbnN0YW5jZW9mIEdhbWVwbGF5LlRyaWdnZXIpXHJcblx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0aWYgKGhpdFJlcyAmJiBoaXRSZXMubGVuZ3RoID4gMCAmJiBUeXBlLlZlY3Rvci5kb3QoaGl0UmVzWzBdLmxvY2F0aW9uLmNsb25lKCkuc3VidHJhY3QodGhpcy5hbW1vRW50aXR5Um9vdC53b3JsZExvY2F0aW9uKSwgc2hvb3REaXIpID4gMCkge1xyXG5cdFx0XHRcdFx0XHRzaG9vdERpciA9IGhpdFJlc1swXS5pbXBhY3RQb2ludC5jbG9uZSgpLnN1YnRyYWN0KHRoaXMuYW1tb0VudGl0eVJvb3Qud29ybGRMb2NhdGlvbilcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGxldCBhbW1vRGlyZWN0aW9uID0gc2hvb3REaXIubm9ybWFsaXplZFxyXG5cdFx0XHRcdFx0aWYgKHRoaXMuY29uZmlnLmFtbW9TcGVlZCA8IEdhbWVEZWYuTUFYX1NIT09UU1BFRUQgfHwgdGhpcy5pc0Jsb2NrKSB7IC8vIFx1NTk4Mlx1Njc5Q1x1NUYzOVx1ODM2Rlx1OTAxRlx1NUVBNlx1NUMwRlx1NEU4RVx1NjcwMFx1NTkyN1x1OThERVx1ODg0Q1x1OTAxRlx1NUVBNlx1NTAzQ1x1NjIxNlx1ODAwNVx1NUYzOVx1OTA1M1x1NjcwOVx1NjYwRVx1NjYzRVx1OTYzQlx1NjMyMVx1NjBDNVx1NTFCNVx1NEUwQlx1RkYwQ1x1NUYzOVx1ODM2Rlx1OEQ3MFx1NzcxRlx1NUI5RVx1NUYzOVx1OTA1M1xyXG5cdFx0XHRcdFx0XHR0aGlzLnNlcnZlckZpcmUodGhpcy5hbW1vRW50aXR5Um9vdC53b3JsZExvY2F0aW9uLmNsb25lKCksIGFtbW9EaXJlY3Rpb24pXHJcblx0XHRcdFx0XHRcdGlmICh0aGlzLmFtbW9BcnJheS5sZW5ndGggPiB0aGlzLndlYXBvbk9iai5maXJlQ29tcG9uZW50LmN1cnJlbnRDbGlwU2l6ZSkge1xyXG5cdFx0XHRcdFx0XHRcdGxldCBkaXNjYXJkQW1tbyA9IHRoaXMuYW1tb0FycmF5LnNoaWZ0KClcclxuXHRcdFx0XHRcdFx0XHRkaXNjYXJkQW1tby5kZXN0cm95KClcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR0aGlzLmFtbW9BcnJheS5wdXNoKG5ldyBBbW1vKHRoaXMuY2hhcmEsIHRoaXMuYW1tb1Bvb2wsIHRoaXMuYW1tb0VudGl0eVJvb3Qud29ybGRMb2NhdGlvbiwgYW1tb0RpcmVjdGlvbiwgdGhpcy5jb25maWcuc2hvb3RSYW5nZSwgdGhpcy5jb25maWcuYW1tb1NwZWVkLCB0aGlzLmNvbmZpZy5ncmF2aXR5U2NhbGUsIHRoaXMuY29uZmlnLmRldGVjdFJhZGl1cykpXHJcblx0XHRcdFx0XHR9IGVsc2UgeyAvLyBcdTUxNzZcdTRGNTlcdTYwQzVcdTUxQjVcdTVGMzlcdTgzNkZcdThENzBcdTg2NUFcdTUwNDdcdTVGMzlcdTkwNTNcdUZGMDhcdTVCNTBcdTVGMzlcdThGNjhcdThGRjlcdTU0OENcdTY4QzBcdTZENEJcdThGNjhcdThGRjlcdTRFMERcdTU0MENcdUZGMENcdTUzRUFcdTY2MkZcdTdFQzhcdTcwQjlcdTc2RjhcdTU0MENcdUZGMDlcclxuXHRcdFx0XHRcdFx0dGhpcy5zZXJ2ZXJGaXJlKHRoaXMuYW1tb0VudGl0eVJvb3Qud29ybGRMb2NhdGlvbi5jbG9uZSgpLCBhbW1vRGlyZWN0aW9uKVxyXG5cdFx0XHRcdFx0XHRpZiAodGhpcy5hbW1vQXJyYXkubGVuZ3RoID4gdGhpcy53ZWFwb25PYmouZmlyZUNvbXBvbmVudC5jdXJyZW50Q2xpcFNpemUpIHtcclxuXHRcdFx0XHRcdFx0XHRsZXQgZGlzY2FyZEFtbW8gPSB0aGlzLmFtbW9BcnJheS5zaGlmdCgpXHJcblx0XHRcdFx0XHRcdFx0ZGlzY2FyZEFtbW8uZGVzdHJveSgpXHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0aWYgKGhpdFJlcy5sZW5ndGggPiAwKSB7IC8vIFx1NUM0Rlx1NUU1NVx1NEUyRFx1NUZDM1x1NUMwNFx1N0VCRlx1NTFGQlx1NEUyRFxyXG5cdFx0XHRcdFx0XHRcdHRoaXMuYW1tb0FycmF5LnB1c2gobmV3IEFtbW8odGhpcy5jaGFyYSwgdGhpcy5hbW1vUG9vbCwgdGhpcy5hbW1vRW50aXR5Um9vdC53b3JsZExvY2F0aW9uLCBhbW1vRGlyZWN0aW9uLCBzaG9vdERpci5sZW5ndGgsIHRoaXMuY29uZmlnLmFtbW9TcGVlZCwgdGhpcy5jb25maWcuZ3Jhdml0eVNjYWxlLCAwLCBoaXRSZXMpKVxyXG5cdFx0XHRcdFx0XHR9IGVsc2UgeyAvLyBcdTVDNEZcdTVFNTVcdTRFMkRcdTVGQzNcdTVDMDRcdTdFQkZcdTY3MkFcdTUxRkJcdTRFMkRcclxuXHRcdFx0XHRcdFx0XHR0aGlzLmFtbW9BcnJheS5wdXNoKG5ldyBBbW1vKHRoaXMuY2hhcmEsIHRoaXMuYW1tb1Bvb2wsIHRoaXMuYW1tb0VudGl0eVJvb3Qud29ybGRMb2NhdGlvbiwgYW1tb0RpcmVjdGlvbiwgc2hvb3REaXIubGVuZ3RoLCB0aGlzLmNvbmZpZy5hbW1vU3BlZWQsIHRoaXMuY29uZmlnLmdyYXZpdHlTY2FsZSwgMCkpXHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdC8vIFx1NTk4Mlx1Njc5Q1x1NTJGRVx1OTAwOVx1NUYzOVx1NThGM1x1ODg2OFx1NzNCMFx1RkYwQ1x1NTIxOVx1NTNEMVx1NUMwNFx1NUJBMlx1NjIzN1x1N0FFRlx1NjNEMFx1NEY5Qlx1NUYzOVx1NThGM1x1NUYzOVx1NTFGQVx1ODg2OFx1NzNCMFxyXG5cdFx0XHRcdGlmICh0aGlzLmNvbmZpZy5pc1dlYXBvbkhhdmVDYXNpbmcpIHtcclxuXHRcdFx0XHRcdHRoaXMuY2FzaW5nQXJyYXkucHVzaChuZXcgQ2FzaW5nKHRoaXMuY2FzaW5nUG9vbCwgdGhpcy5jYXNpbmdFbnRpdHksIHRoaXMud2VhcG9uRW50aXR5Um9vdC5nZXRSaWdodFZlY3RvcigpLmNsb25lKCkpKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBlbHNlIHsgLy8gXHU1OTgyXHU2NzlDXHU1RjM5XHU4MzZGXHU1QjlFXHU0RjUzXHU0RTNBXHU3QTdBXHVGRjA4XHU2NUUwXHU1RjM5XHU5MDUzXHU4ODY4XHU3M0IwXHVGRjA5XHJcblx0XHRcdFx0bGV0IGNhbWVyYVNob290RGlyID0gdGhpcy5jYW1lcmEuY2FtZXJhV29ybGRUcmFuc2Zvcm0uZ2V0Rm9yd2FyZFZlY3RvcigpLmNsb25lKClcclxuXHRcdFx0XHRpZiAodGhpcy53ZWFwb25PYmouYWNjdXJhY3lPZkZpcmVFbmFibGUpIHtcclxuXHRcdFx0XHRcdGNhbWVyYVNob290RGlyID0gdGhpcy53ZWFwb25PYmouYWNjdXJhY3lPZkZpcmVDb21wb25lbnQuZ2V0UmFuZG9tU2hvb3REaXIoY2FtZXJhU2hvb3REaXIpLmNsb25lKClcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0bGV0IGVuZExvYyA9IGNhbWVyYVNob290RGlyLm11bHRpcGx5KEdhbWVEZWYuU0hPT1RfUkFOR0UpLmFkZCh0aGlzLmNhbWVyYS5jYW1lcmFXb3JsZFRyYW5zZm9ybS5sb2NhdGlvbilcclxuXHRcdFx0XHRsZXQgc2hvb3REaXIgPSBlbmRMb2MuY2xvbmUoKS5zdWJ0cmFjdCh0aGlzLmFtbW9FbnRpdHlSb290LndvcmxkTG9jYXRpb24pXHJcblx0XHRcdFx0bGV0IGhpdFJlcyA9IEdhbWVwbGF5LmxpbmVUcmFjZSh0aGlzLmNhbWVyYS5jYW1lcmFXb3JsZFRyYW5zZm9ybS5sb2NhdGlvbiwgZW5kTG9jLCB0cnVlLCBHYW1lRGVmLkRFQlVHX0ZMQUcpXHJcblx0XHRcdFx0aGl0UmVzID0gaGl0UmVzLmZpbHRlcihlID0+IHtcclxuXHRcdFx0XHRcdHJldHVybiAhKGUuZ2FtZU9iamVjdCBpbnN0YW5jZW9mIEdhbWVwbGF5LlRyaWdnZXIpXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0XHRpZiAoaGl0UmVzICYmIGhpdFJlcy5sZW5ndGggPiAwICYmIFR5cGUuVmVjdG9yLmRvdChoaXRSZXNbMF0ubG9jYXRpb24uY2xvbmUoKS5zdWJ0cmFjdCh0aGlzLmFtbW9FbnRpdHlSb290LndvcmxkTG9jYXRpb24pLCBzaG9vdERpcikgPiAwKSB7XHJcblx0XHRcdFx0XHRzaG9vdERpciA9IGhpdFJlc1swXS5pbXBhY3RQb2ludC5jbG9uZSgpLnN1YnRyYWN0KHRoaXMuYW1tb0VudGl0eVJvb3Qud29ybGRMb2NhdGlvbilcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0bGV0IGFtbW9EaXJlY3Rpb24gPSBzaG9vdERpci5ub3JtYWxpemVkXHJcblx0XHRcdFx0dGhpcy53ZWFwb25PYmoud29ybGRSb3RhdGlvbiA9IGFtbW9EaXJlY3Rpb24udG9Sb3RhdGlvbigpXHJcblx0XHRcdFx0bGV0IGVuZCA9IGFtbW9EaXJlY3Rpb24uY2xvbmUoKS5tdWx0aXBseSh0aGlzLmNvbmZpZy5zaG9vdFJhbmdlKS5hZGQodGhpcy5hbW1vRW50aXR5Um9vdC53b3JsZExvY2F0aW9uKVxyXG5cdFx0XHRcdGlmICh0aGlzLmNvbmZpZy5kZXRlY3RSYWRpdXMgPCAxMCkge1xyXG5cdFx0XHRcdFx0bGV0IGxpbmVSZXN1bHQgPSBHYW1lcGxheS5saW5lVHJhY2UodGhpcy5hbW1vRW50aXR5Um9vdC53b3JsZExvY2F0aW9uLCBlbmQsIHRydWUsIEdhbWVEZWYuREVCVUdfRkxBRylcclxuXHRcdFx0XHRcdGxpbmVSZXN1bHQgPSBsaW5lUmVzdWx0LmZpbHRlcihlID0+IHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuICEoZS5nYW1lT2JqZWN0IGluc3RhbmNlb2YgR2FtZXBsYXkuVHJpZ2dlcilcclxuXHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHR0aGlzLmhpdChsaW5lUmVzdWx0KVxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRsZXQgYm94UmVzdWx0ID0gR2FtZXBsYXkuYm94T3ZlcmxhcEluTGV2ZWwodGhpcy5hbW1vRW50aXR5Um9vdC53b3JsZExvY2F0aW9uLCBlbmQsIHRoaXMuY29uZmlnLmRldGVjdFJhZGl1cywgdGhpcy5jb25maWcuZGV0ZWN0UmFkaXVzLCBHYW1lRGVmLkRFQlVHX0ZMQUcpXHJcblx0XHRcdFx0XHR0aGlzLmhpdChib3hSZXN1bHQpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIHVwZGF0ZUJsb2NrRmlyZSgpOiBib29sZWFuIHtcclxuXHRcdGxldCBmbGFnID0gdGhpcy5pc0Jsb2NrXHJcblx0XHRsZXQgbGluZVJlc3VsdE11enpsZSA9IEdhbWVwbGF5LmxpbmVUcmFjZSh0aGlzLmFtbW9FbnRpdHlSb290LndvcmxkTG9jYXRpb24sXHJcblx0XHRcdHRoaXMuYW1tb0VudGl0eVJvb3QuZ2V0Rm9yd2FyZFZlY3RvcigpLm11bHRpcGx5KHRoaXMuY29uZmlnLmZpcmVCbG9ja0Rpc3RhbmNlKS5hZGQodGhpcy5hbW1vRW50aXR5Um9vdC53b3JsZExvY2F0aW9uKSxcclxuXHRcdFx0dHJ1ZSwgR2FtZURlZi5ERUJVR19GTEFHKVxyXG5cdFx0bGluZVJlc3VsdE11enpsZSA9IGxpbmVSZXN1bHRNdXp6bGUuZmlsdGVyKGUgPT4ge1xyXG5cdFx0XHRyZXR1cm4gIShlLmdhbWVPYmplY3QgaW5zdGFuY2VvZiBHYW1lcGxheS5UcmlnZ2VyKVxyXG5cdFx0fSlcclxuXHRcdGlmIChsaW5lUmVzdWx0TXV6emxlLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0dGhpcy5pc0Jsb2NrID0gdHJ1ZVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5pc0Jsb2NrID0gZmFsc2VcclxuXHRcdH1cclxuXHRcdHJldHVybiAodGhpcy5pc0Jsb2NrID09IGZsYWcpXHJcblx0fVxyXG5cclxuXHRwcml2YXRlIHVwZGF0ZWJGaXJpbmcoKTogYm9vbGVhbiB7XHJcblx0XHRsZXQgZmxhZyA9IHRoaXMuYkZpcmluZ1xyXG5cdFx0dGhpcy5iRmlyaW5nID0gdGhpcy53ZWFwb25PYmouZmlyZUNvbXBvbmVudC5pc0ZpcmluZygpXHJcblx0XHRyZXR1cm4gKHRoaXMuYkZpcmluZyA9PSBmbGFnKVxyXG5cdH1cclxuXHJcblx0QENvcmUuRnVuY3Rpb24oQ29yZS5TZXJ2ZXIpXHJcblx0cHJpdmF0ZSBzZXJ2ZXJGaXJlKHN0YXJ0TG9jOiBUeXBlLlZlY3RvciwgZGlyZWN0aW9uOiBUeXBlLlZlY3Rvcik6IHZvaWQge1xyXG5cdFx0dGhpcy5jbGllbnRNdWx0aWNhc3RMYXVuY2goc3RhcnRMb2MsIGRpcmVjdGlvbilcclxuXHR9XHJcblxyXG5cdEBDb3JlLkZ1bmN0aW9uKENvcmUuQ2xpZW50LCBDb3JlLk11bHRpY2FzdClcclxuXHRwcml2YXRlIGNsaWVudE11bHRpY2FzdExhdW5jaChzdGFydExvYzogVHlwZS5WZWN0b3IsIGRpcmVjdGlvbjogVHlwZS5WZWN0b3IpOiB2b2lkIHtcclxuXHRcdGlmICh0aGlzLndlYXBvbk9iai5nZXRDdXJyZW50T3duZXIoKSA9PSB0aGlzLmNoYXJhKSB7XHJcblx0XHRcdHJldHVyblxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0aWYgKHRoaXMuYW1tb0FycmF5Lmxlbmd0aCA+IHRoaXMud2VhcG9uT2JqLmZpcmVDb21wb25lbnQuY3VycmVudENsaXBTaXplKSB7XHJcblx0XHRcdFx0bGV0IGRpc2NhcmRBbW1vID0gdGhpcy5hbW1vQXJyYXkuc2hpZnQoKVxyXG5cdFx0XHRcdGRpc2NhcmRBbW1vLmRlc3Ryb3koKVxyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuYW1tb0FycmF5LnB1c2gobmV3IEFtbW8obnVsbCwgdGhpcy5hbW1vUG9vbCwgc3RhcnRMb2MsIGRpcmVjdGlvbiwgdGhpcy5jb25maWcuc2hvb3RSYW5nZSwgdGhpcy5jb25maWcuYW1tb1NwZWVkLCB0aGlzLmNvbmZpZy5ncmF2aXR5U2NhbGUsIDApKVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyogXHU1QkEyXHU2MjM3XHU3QUVGXHU3RUQzXHU2NzVGXHU1RjAwXHU3MDZCXHU1NkRFXHU4QzAzICovXHJcblx0cHJpdmF0ZSBvbkNsaWVudEVuZEZpcmUoKSB7XHJcblxyXG5cdH1cclxuXHJcblx0LyogXHU1QkEyXHU2MjM3XHU3QUVGXHU1RjAwXHU1OUNCXHU2MzYyXHU1RjM5XHU1NkRFXHU4QzAzICovXHJcblx0cHJpdmF0ZSBvbkNsaWVudFN0YXJ0UmVsb2FkKCkge1xyXG5cdFx0dGhpcy5yZWxvYWRTb3VuZC5wbGF5KClcclxuXHR9XHJcblxyXG5cdC8qIFx1NUJBMlx1NjIzN1x1N0FFRlx1N0VEM1x1Njc1Rlx1NjM2Mlx1NUYzOVx1NTZERVx1OEMwMyAqL1xyXG5cdHByaXZhdGUgb25DbGllbnRFbmRSZWxvYWQoKSB7XHJcblx0XHR0aGlzLnJlbG9hZFNvdW5kLnN0b3AoKVxyXG5cdH1cclxuXHJcblx0LyogXHU1QkEyXHU2MjM3XHU3QUVGXHU1RjAwXHU1OUNCXHU0RTBBXHU4MTlCXHU1NkRFXHU4QzAzICovXHJcblx0cHJpdmF0ZSBvbkNsaWVudFN0YXJ0TG9hZCgpIHtcclxuXHRcdHRoaXMubG9hZFNvdW5kLnBsYXkoKVxyXG5cdH1cclxuXHJcblx0LyogXHU1QkEyXHU2MjM3XHU3QUVGXHU3RUQzXHU2NzVGXHU0RTBBXHU4MTlCXHU1NkRFXHU4QzAzICovXHJcblx0cHJpdmF0ZSBvbkNsaWVudEVuZExvYWQoKSB7XHJcblx0XHR0aGlzLmxvYWRTb3VuZC5zdG9wKClcclxuXHR9XHJcblxyXG5cdC8qIFx1NUJBMlx1NjIzN1x1N0FFRlx1NUYwMFx1NTlDQlx1Nzc4NFx1NTFDNlx1NTZERVx1OEMwMyAqL1xyXG5cdHByaXZhdGUgb25DbGllbnRTdGFydEFpbSgpIHtcclxuXHR9XHJcblxyXG5cdC8qIFx1NUJBMlx1NjIzN1x1N0FFRlx1N0VEM1x1Njc1Rlx1Nzc4NFx1NTFDNlx1NTZERVx1OEMwMyAqL1xyXG5cdHByaXZhdGUgb25DbGllbnRFbmRBaW0oKSB7XHJcblx0fVxyXG5cclxuXHQvKiBcdTVCQTJcdTYyMzdcdTdBRUZcdTVGMDBcdTU5Q0JcdTU0MEVcdTU3NTBcdTUyOUJcdTU2REVcdThDMDMgKi9cclxuXHRwcml2YXRlIG9uQ2xpZW50U3RhcnRSZWNvaWwoKSB7XHJcblxyXG5cdH1cclxuXHJcblx0LyogXHU1QkEyXHU2MjM3XHU3QUVGXHU3Nzg0XHU1MUM2XHU3Q0JFXHU1RUE2XHU1M0Q4XHU1MzE2XHU1NkRFXHU4QzAzICovXHJcblx0cHJpdmF0ZSBvbkNsaWVudEN1cnJlbnREaXNwZXJzaW9uQ2hhbmdlZCgpIHtcclxuXHRcdGlmICh0aGlzLndlYXBvblVJKSB7XHJcblx0XHRcdHRoaXMud2VhcG9uVUkuY2hhbmdlQ3Jvc3ModGhpcy53ZWFwb25PYmouYWNjdXJhY3lPZkZpcmVDb21wb25lbnQuZ2V0Q3VycmVudERpc3BlcnNpb25IYWxmQW5nbGUoKSAqIDEwKVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Ly8gXHU4OUM2XHU4OUQyXHU2NTNFXHU1OTI3XHJcblx0cHJpdmF0ZSB6b29tSW4oKSB7XHJcblx0XHRpZiAodGhpcy5jYW1lcmEgPT0gbnVsbCkgcmV0dXJuXHJcblx0XHRjb25zb2xlLmVycm9yKFwiem9vbWluXCIpXHJcblx0XHR0aGlzLmlzQWltbWluZyA9IHRydWVcclxuXHJcblx0fVxyXG5cclxuXHQvLyBcdTg5QzZcdTg5RDJcdTdGMjlcdTVDMEZcclxuXHRwcml2YXRlIHpvb21PdXQoKSB7XHJcblx0XHRpZiAodGhpcy5jYW1lcmEgPT0gbnVsbCkgcmV0dXJuXHJcblx0XHRjb25zb2xlLmVycm9yKFwiem9vbU91dFwiKVxyXG5cdFx0dGhpcy5pc0FpbW1pbmcgPSBmYWxzZVxyXG5cdH1cclxuXHJcblx0LyogXHU2NDQ0XHU1MENGXHU2NzNBdXBkYXRlICovXHJcblx0cHJpdmF0ZSBjYW1lcmFVcGRhdGUoZHQ6IG51bWJlcikge1xyXG5cdFx0aWYgKCF0aGlzLmlzWm9vbWluZykgcmV0dXJuXHJcblx0XHRpZiAodGhpcy5pc0FpbW1pbmcpIHtcclxuXHRcdFx0dGhpcy5jYW1lcmEuY2FtZXJhRk9WIC09IGR0ICogdGhpcy5jb25maWcuYWltU3BlZWRcclxuXHRcdFx0aWYgKHRoaXMuY2FtZXJhLmNhbWVyYUZPViA8IHRoaXMuY29uZmlnLmFpbUNhbWVyYUZvdikge1xyXG5cdFx0XHRcdHRoaXMuY2FtZXJhLmNhbWVyYUZPViA9IHRoaXMuY29uZmlnLmFpbUNhbWVyYUZvdlxyXG5cdFx0XHRcdHRoaXMuaXNab29taW5nID0gZmFsc2VcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5jYW1lcmEuY2FtZXJhRk9WICs9IGR0ICogdGhpcy5jb25maWcuYWltU3BlZWRcclxuXHRcdFx0aWYgKHRoaXMuY2FtZXJhLmNhbWVyYUZPViA+IHRoaXMuY29uZmlnLmVxdWlwbWVudENhbWVyYUZvdikge1xyXG5cdFx0XHRcdHRoaXMuY2FtZXJhLmNhbWVyYUZPViA9IHRoaXMuY29uZmlnLmVxdWlwbWVudENhbWVyYUZvdlxyXG5cdFx0XHRcdHRoaXMuaXNab29taW5nID0gZmFsc2VcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyogXHU4OUUzXHU2NzkwXHU4RDQ0XHU2RTkwSURcdTUyMTdcdTg4NjggKi9cclxuXHRwcml2YXRlIHJlc29sdmVTdHJpbmcoYXNzZXRJZHM6IHN0cmluZyk6IHN0cmluZ1tdIHtcclxuXHRcdGxldCBhc3NldElkQXJyYXk6IHN0cmluZ1tdID0gbmV3IEFycmF5PHN0cmluZz4oKVxyXG5cdFx0bGV0IGFzc2V0SWQ6IHN0cmluZyA9IFwiXCJcclxuXHRcdGxldCBzID0gYXNzZXRJZHMuc3BsaXQoXCJcIilcclxuXHRcdGZvciAobGV0IGEgb2Ygcykge1xyXG5cdFx0XHRpZiAoYSA9PSBcIixcIikge1xyXG5cdFx0XHRcdGFzc2V0SWRBcnJheS5wdXNoKGFzc2V0SWQpXHJcblx0XHRcdFx0YXNzZXRJZCA9IFwiXCJcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRhc3NldElkICs9IGFcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0aWYgKGFzc2V0SWQpIHtcclxuXHRcdFx0YXNzZXRJZEFycmF5LnB1c2goYXNzZXRJZClcclxuXHRcdH1cclxuXHRcdHJldHVybiBhc3NldElkQXJyYXlcclxuXHR9XHJcblxyXG5cdEBDb3JlLkZ1bmN0aW9uKENvcmUuQ2xpZW50KVxyXG5cdHByaXZhdGUgY2xpZW50T25JRENoYW5nZWQoaWQ6bnVtYmVyKXtcclxuXHRcdHRoaXMuaWQgPSBpZDtcclxuXHRcdHRoaXMub25JZENoYW5nZWQoKVxyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBvbklkQ2hhbmdlZCgpe1xyXG5cdFx0Y29uc29sZS5sb2coJ29uSWRDaGFuZ2VkJylcclxuXHRcdHRoaXMuY29uZmlnID0gR2FtZUNvbmZpZy5XZWFwb25Db25maWcuZ2V0RWxlbWVudCh0aGlzLmlkKVxyXG5cdFx0dGhpcy5pc0F1dG9SZWxvYWQgPSB0aGlzLmNvbmZpZy5pc0F1dG9SZWxvYWRcclxuXHRcdHRoaXMudG90YWxBbW1vID0gdGhpcy5jb25maWcudG90YWxBbW1vXHJcblx0XHR0aGlzLndlYXBvblJlc291cmNlcyA9IEdhbWVDb25maWcuV2VhcG9uUmVzb3VyY2VzLmdldEVsZW1lbnQodGhpcy5jb25maWcucmVzb3VyY2VzSWQpXHRcclxuXHRcdGxldCBtYWxlQWN0aW9uID0gR2FtZUNvbmZpZy5BY3Rpb24uZ2V0RWxlbWVudCh0aGlzLmNvbmZpZy5tYWxlQWN0aW9uKVxyXG5cdFx0bGV0IGZlbWFsZUFjdGlvbiA9IEdhbWVDb25maWcuQWN0aW9uLmdldEVsZW1lbnQodGhpcy5jb25maWcuZmVtYWxlQWN0aW9uKVxyXG5cdFx0aWYodGhpcy5pc1J1bm5pbmdDbGllbnQoKSl7XHJcblx0XHRcdGZvciAoY29uc3Qga2V5IGluIG1hbGVBY3Rpb24pIHtcclxuXHRcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1hbGVBY3Rpb24sIGtleSkpIHtcclxuXHRcdFx0XHRcdGNvbnN0IGVsZW1lbnQgPSBtYWxlQWN0aW9uW2tleV07XHJcblx0XHRcdFx0XHRpZiAoa2V5ICE9IFwiaWRcIikge1xyXG5cdFx0XHRcdFx0XHRVdGlsLkFzc2V0VXRpbC5hc3luY0Rvd25sb2FkQXNzZXQoZWxlbWVudClcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0Zm9yIChjb25zdCBrZXkgaW4gZmVtYWxlQWN0aW9uKSB7XHJcblx0XHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtYWxlQWN0aW9uLCBrZXkpKSB7XHJcblx0XHRcdFx0XHRjb25zdCBlbGVtZW50ID0gbWFsZUFjdGlvbltrZXldO1xyXG5cdFx0XHRcdFx0aWYgKGtleSAhPSBcImlkXCIpIHtcclxuXHRcdFx0XHRcdFx0VXRpbC5Bc3NldFV0aWwuYXN5bmNEb3dubG9hZEFzc2V0KGVsZW1lbnQpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdGZvciAoY29uc3Qga2V5IGluIHRoaXMud2VhcG9uUmVzb3VyY2VzKSB7XHJcblx0XHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtYWxlQWN0aW9uLCBrZXkpKSB7XHJcblx0XHRcdFx0XHRjb25zdCBlbGVtZW50ID0gbWFsZUFjdGlvbltrZXldO1xyXG5cdFx0XHRcdFx0aWYgKGtleSAhPSBcImlkXCIpIHtcclxuXHRcdFx0XHRcdFx0VXRpbC5Bc3NldFV0aWwuYXN5bmNEb3dubG9hZEFzc2V0KGVsZW1lbnQpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHR0aGlzLmhhc0luaXQgPSB0cnVlXHJcblx0fVxyXG59IiwgImltcG9ydCB7IEdhbWVEZWYgfSBmcm9tIFwiLi4vR2FtZURlZlwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBbW1vIHtcclxuICAgIG93bmVyOiBHYW1lcGxheS5DaGFyYWN0ZXIgLy8gXHU1RjM5XHU4MzZGXHU2MjQwXHU1QzVFXHU4OUQyXHU4MjcyXHJcbiAgICBoaXRSZXN1bHQ6IENvcmUuR2FtZU9iamVjdFtdIHwgR2FtZXBsYXkuSGl0UmVzdWx0W10gLy8gXHU1MUZCXHU0RTJEXHU3RUQzXHU2NzlDXHJcblxyXG4gICAgcHJpdmF0ZSBhbW1vUG9vbDogR2FtZURlZi5TaW1wbGVPYmplY3RQb29sPENvcmUuR2FtZU9iamVjdD4gLy8gXHU1RjM5XHU4MzZGXHU1QkY5XHU4QzYxXHU2QzYwXHJcbiAgICBwcml2YXRlIGVudGl0eTogQ29yZS5HYW1lT2JqZWN0IC8vIFx1NUYzOVx1ODM2Rlx1NUI5RVx1NEY1M1xyXG4gICAgcHJpdmF0ZSBkaXNwbGFjZW1lbnQ6IFR5cGUuVmVjdG9yIC8vIFx1NkJDRlx1NzlEMlx1NEY0RFx1NzlGQlxyXG4gICAgcHJpdmF0ZSBjdXJyZW50TG9jYXRpb246IFR5cGUuVmVjdG9yIC8vIFx1NUY1M1x1NTI0RFx1NEY0RFx1N0Y2RVxyXG4gICAgcHJpdmF0ZSBncmF2aXR5U2NhbGU6IG51bWJlciAvLyBcdTkxQ0RcdTUyOUJcdTdDRkJcdTY1NzBcclxuICAgIHByaXZhdGUgbGlmZVRpbWU6IG51bWJlciAvLyBcdTc1MUZcdTU0N0RcdTU0NjhcdTY3MUZcclxuICAgIHByaXZhdGUgY3VycmVudFRpbWU6IG51bWJlciAvLyBcdTVGNTNcdTUyNERcdThGRDBcdTUyQThcdTY1RjZcdTk1RjRcclxuICAgIHByaXZhdGUgc3RyaWRlOiBUeXBlLlZlY3RvciAvLyBcdTZCNjVcdTk1N0ZcclxuICAgIHByaXZhdGUgZGV0ZWN0UmFkaXVzOiBudW1iZXIgLy8gXHU3OEIwXHU2NDlFXHU2OEMwXHU2RDRCXHU1MzRBXHU1Rjg0XHRcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihvd25lcjogR2FtZXBsYXkuQ2hhcmFjdGVyLCBhbW1vUG9vbDogR2FtZURlZi5TaW1wbGVPYmplY3RQb29sPENvcmUuR2FtZU9iamVjdD4sIHN0YXJ0TG9jOiBUeXBlLlZlY3RvciwgZGlyZWN0aW9uOiBUeXBlLlZlY3Rvciwgc2hvb3RSYW5nZTogbnVtYmVyLCBhbW1vU3BlZWQ6IG51bWJlciwgZ3Jhdml0eVNjYWxlOiBudW1iZXIsIGRldGVjdFJhZGl1czogbnVtYmVyLCBoaXRSZXN1bHQ6IENvcmUuR2FtZU9iamVjdFtdIHwgR2FtZXBsYXkuSGl0UmVzdWx0W10gPSBbXSkge1xyXG4gICAgICAgIHRoaXMub3duZXIgPSBvd25lclxyXG4gICAgICAgIHRoaXMuYW1tb1Bvb2wgPSBhbW1vUG9vbFxyXG4gICAgICAgIHRoaXMuZW50aXR5ID0gdGhpcy5hbW1vUG9vbC5hbGxvY2F0ZSgpXHJcbiAgICAgICAgdGhpcy5lbnRpdHkuZGV0YWNoRnJvbUdhbWVPYmplY3QoKVxyXG4gICAgICAgIHRoaXMuY3VycmVudExvY2F0aW9uID0gc3RhcnRMb2MuY2xvbmUoKVxyXG4gICAgICAgIHRoaXMuZW50aXR5LndvcmxkTG9jYXRpb24gPSB0aGlzLmN1cnJlbnRMb2NhdGlvblxyXG4gICAgICAgIHRoaXMuZW50aXR5LndvcmxkUm90YXRpb24gPSBkaXJlY3Rpb24udG9Sb3RhdGlvbigpXHJcbiAgICAgICAgdGhpcy5lbnRpdHkuc2V0VmlzaWJpbGl0eShUeXBlLlByb3BlcnR5U3RhdHVzLk9uKVxyXG4gICAgICAgIHRoaXMuZGlzcGxhY2VtZW50ID0gVHlwZS5WZWN0b3IubXVsdGlwbHkoZGlyZWN0aW9uLCBhbW1vU3BlZWQsIHRoaXMuZGlzcGxhY2VtZW50KVxyXG4gICAgICAgIHRoaXMubGlmZVRpbWUgPSBzaG9vdFJhbmdlIC8gYW1tb1NwZWVkXHJcbiAgICAgICAgdGhpcy5jdXJyZW50VGltZSA9IDBcclxuICAgICAgICB0aGlzLmdyYXZpdHlTY2FsZSA9IGdyYXZpdHlTY2FsZVxyXG4gICAgICAgIHRoaXMuc3RyaWRlID0gVHlwZS5WZWN0b3IuemVyb1xyXG4gICAgICAgIHRoaXMuZGV0ZWN0UmFkaXVzID0gZGV0ZWN0UmFkaXVzXHJcbiAgICAgICAgdGhpcy5oaXRSZXN1bHQgPSBoaXRSZXN1bHRcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy8gXHU2NkY0XHU2NUIwXHU1RjM5XHU4MzZGXHU0RjREXHU3RjZFXHVGRjBDXHU1M0QxXHU1QzA0XHU1QkEyXHU2MjM3XHU3QUVGXHU2MjdGXHU2MkM1XHU2OEMwXHU2RDRCXHJcbiAgICBwdWJsaWMgdXBkYXRlKGR0OiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICAvLyBcdThCQTFcdTdCOTdcdTVGNTNcdTUyNERcdTVFMjdcdTVGMzlcdTgzNkZcdTc5RkJcdTUyQThcdTZCNjVcdTk1N0ZcclxuICAgICAgICB0aGlzLnN0cmlkZSA9IFR5cGUuVmVjdG9yLm11bHRpcGx5KHRoaXMuZGlzcGxhY2VtZW50LCBkdCwgdGhpcy5zdHJpZGUpXHJcbiAgICAgICAgLy8gXHU1OTgyXHU2NzlDXHU5MUNEXHU1MjlCXHU3Q0ZCXHU2NTcwXHU0RTBEXHU0RTNBMFx1NTIxOVx1NUJGOXpcdThGNzRcdTU3NTBcdTY4MDdcdTU0OENcdTY1Q0JcdThGNkNcdThGREJcdTg4NENcdThGREJcdTRFMDBcdTZCNjVcdThCQTFcdTdCOTdcclxuICAgICAgICBpZiAodGhpcy5ncmF2aXR5U2NhbGUpIHtcclxuICAgICAgICAgICAgdGhpcy5zdHJpZGUueiAtPSAoNTAgKiB0aGlzLmdyYXZpdHlTY2FsZSAqIEdhbWVEZWYuR1JBVklUQUlPTkFMX0FDQ0VMRVJBVElPTiAqIChNYXRoLnBvdyh0aGlzLmN1cnJlbnRUaW1lICsgZHQsIDIpIC0gTWF0aC5wb3codGhpcy5jdXJyZW50VGltZSwgMikpKVxyXG4gICAgICAgICAgICB0aGlzLmVudGl0eS53b3JsZFJvdGF0aW9uID0gdGhpcy5zdHJpZGUudG9Sb3RhdGlvbigpXHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFRpbWUgKz0gZHRcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gXHU4QkExXHU3Qjk3XHU1MUZBXHU1RjUzXHU1MjREXHU2NkY0XHU2NUIwXHU0RjREXHU3RjZFXHJcbiAgICAgICAgdGhpcy5jdXJyZW50TG9jYXRpb24ueCArPSB0aGlzLnN0cmlkZS54XHJcbiAgICAgICAgdGhpcy5jdXJyZW50TG9jYXRpb24ueSArPSB0aGlzLnN0cmlkZS55XHJcbiAgICAgICAgdGhpcy5jdXJyZW50TG9jYXRpb24ueiArPSB0aGlzLnN0cmlkZS56XHJcblxyXG4gICAgICAgIC8vIFx1NTk4Mlx1Njc5Q1x1NjhDMFx1NkQ0Qlx1ODMwM1x1NTZGNFx1NTkyN1x1NEU4RTBcdUZGMENcdTZCQ0ZcdTVFMjdcdTY4QzBcdTZENEJcdTc4QjBcdTY0OUVcdUZGMDhcdTUzRUFcdTY3MDlcdTZCNjZcdTU2NjhcdTYzMDFcdTY3MDlcdTRFQkFcdTVCQTJcdTYyMzdcdTdBRUZcdTVCNTBcdTVGMzlcdThGREJcdTg4NENcdTY4QzBcdTZENEJcdUZGMENcdTUxNzZcdTRGNTlcdTVCQTJcdTYyMzdcdTdBRUZcdTUzRUFcdTY2MkZcdTZBMjFcdTYyREZcdUZGMDlcclxuICAgICAgICBpZiAodGhpcy5kZXRlY3RSYWRpdXMpIHtcclxuICAgICAgICAgICAgLy8gXHU1OTgyXHU2NzlDXHU2OEMwXHU2RDRCXHU4MzAzXHU1NkY0XHU1QzBGXHU0RThFMTBcdUZGMENcdTVDMDRcdTdFQkZcdTY4QzBcdTZENEJcdUZGMENcdThGRDRcdTU2REVHYW1lcGxheS5IaXRSZXN1bHRcdTY1NzBcdTdFQzRcclxuICAgICAgICAgICAgaWYgKHRoaXMuZGV0ZWN0UmFkaXVzIDwgMTApIHtcclxuICAgICAgICAgICAgICAgIGxldCBsaW5lUmVzdWx0ID0gR2FtZXBsYXkubGluZVRyYWNlKHRoaXMuZW50aXR5LndvcmxkTG9jYXRpb24sIHRoaXMuY3VycmVudExvY2F0aW9uLCB0cnVlLCBHYW1lRGVmLkRFQlVHX0ZMQUcpXHJcbiAgICAgICAgICAgICAgICBsaW5lUmVzdWx0ID0gbGluZVJlc3VsdC5maWx0ZXIoZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICEoZS5nYW1lT2JqZWN0IGluc3RhbmNlb2YgR2FtZXBsYXkuVHJpZ2dlcilcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvLyBcdTVDMDRcdTdFQkZcdTY4QzBcdTZENEJcdTdFRDNcdTY3OUNcdTRFMERcdTRFM0EwXHVGRjBDXHU1MzczXHU2NzA5XHU3OEIwXHU2NDlFXHU1QkY5XHU4QzYxXHJcbiAgICAgICAgICAgICAgICBpZiAobGluZVJlc3VsdC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gXHU3RUM4XHU3RUQzXHU1RjM5XHU4MzZGXHU3NTFGXHU1NDdEXHVGRjBDXHU4M0I3XHU1M0Q2XHU2OEMwXHU2RDRCXHU3RUQzXHU2NzlDXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saWZlVGltZSA9IC0xXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXAgPSBuZXcgQXJyYXk8R2FtZXBsYXkuSGl0UmVzdWx0PigpXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgZWxlbWVudCBvZiBsaW5lUmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXAucHVzaChlbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpdFJlc3VsdCA9IHRlbXBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHsgLy8gXHU1OTgyXHU2NzlDXHU2OEMwXHU2RDRCXHU4MzAzXHU1NkY0XHU1OTI3XHU0RThFXHU3QjQ5XHU0RThFMTBcdUZGMENcdTc3RTlcdTVGNjJcdTY4QzBcdTZENEJcdUZGMENcdThGRDRcdTU2REVDb3JlLkdhbWVPYmplY3RcdTY1NzBcdTdFQzRcclxuICAgICAgICAgICAgICAgIGxldCBib3hSZXN1bHQgPSBHYW1lcGxheS5ib3hPdmVybGFwSW5MZXZlbCh0aGlzLmVudGl0eS53b3JsZExvY2F0aW9uLCB0aGlzLmN1cnJlbnRMb2NhdGlvbiwgdGhpcy5kZXRlY3RSYWRpdXMsIHRoaXMuZGV0ZWN0UmFkaXVzLCBHYW1lRGVmLkRFQlVHX0ZMQUcpXHJcbiAgICAgICAgICAgICAgICAvLyBcdTVDMDRcdTdFQkZcdTY4QzBcdTZENEJcdTdFRDNcdTY3OUNcdTRFMERcdTRFM0EwXHVGRjBDXHU1MzczXHU2NzA5XHU3OEIwXHU2NDlFXHU1QkY5XHU4QzYxXHJcbiAgICAgICAgICAgICAgICBpZiAoYm94UmVzdWx0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBcdTdFQzhcdTdFRDNcdTVGMzlcdTgzNkZcdTc1MUZcdTU0N0RcdUZGMENcdTgzQjdcdTUzRDZcdTY4QzBcdTZENEJcdTdFRDNcdTY3OUNcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxpZmVUaW1lID0gLTFcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpdFJlc3VsdCA9IGJveFJlc3VsdFxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBcdTY2RjRcdTY1QjBcdTVGMzlcdTgzNkZcdTVCOUVcdTRGNTNcdTRGNERcdTdGNkVcdUZGMENcdTVGMzlcdTgzNkZcdTc1MUZcdTU0N0QtPVx1NUY1M1x1NTI0RFx1NUUyN1x1NjVGNlx1OTVGNFx1RkYwQ1x1OEZENFx1NTZERVx1NUYzOVx1ODM2Rlx1NzUxRlx1NTQ3RDwwXHU3Njg0Qm9vbGVhblx1NTAzQ1xyXG4gICAgICAgIHRoaXMuZW50aXR5LndvcmxkTG9jYXRpb24gPSB0aGlzLmN1cnJlbnRMb2NhdGlvblxyXG4gICAgICAgIHRoaXMubGlmZVRpbWUgLT0gZHRcclxuICAgICAgICByZXR1cm4gdGhpcy5saWZlVGltZSA8PSAwXHJcbiAgICB9XHJcblxyXG4gICAgLy8gXHU5NTAwXHU2QkMxXHU1RjM5XHU4MzZGXHU2NUI5XHU2Q0Q1XHVGRjBDXHU1QkY5XHU4QzYxXHU2QzYwXHU1NkRFXHU2NTM2XHU1RjM5XHU4MzZGXHU1QjlFXHU0RjUzXHJcbiAgICBwdWJsaWMgZGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmFtbW9Qb29sLnJlY3ljbGUodGhpcy5lbnRpdHkpXHJcbiAgICB9XHJcblxyXG59IiwgImltcG9ydCB7IEdhbWVEZWYgfSBmcm9tIFwiLi4vR2FtZURlZlwiXHJcblxyXG4vLyBcdTVGMzlcdTU4RjNcdTdDN0JcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FzaW5nIHtcclxuXHRwcml2YXRlIGNhc2luZ1Bvb2w6IEdhbWVEZWYuU2ltcGxlT2JqZWN0UG9vbDxDb3JlLkdhbWVPYmplY3Q+IC8vIFx1NUYzOVx1NThGM1x1NUJGOVx1OEM2MVx1NkM2MFxyXG5cdHByaXZhdGUgZW50aXR5OiBDb3JlLkdhbWVPYmplY3QgLy8gXHU1RjM5XHU1OEYzXHU1QjlFXHU0RjUzXHJcblx0cHJpdmF0ZSBkaXNwbGFjZW1lbnQ6IFR5cGUuVmVjdG9yIC8vIFx1NEY0RFx1NzlGQlxyXG5cdHByaXZhdGUgbG9jOiBUeXBlLlZlY3RvciAvLyBcdTVGNTNcdTUyNERcdTRGNERcdTdGNkVcclxuXHRwcml2YXRlIGdyYXZpdHk6IG51bWJlciAvLyBcdTkxQ0RcdTUyOUJcclxuXHRwcml2YXRlIGxpZmVUaW1lOiBudW1iZXIgLy8gXHU3NTFGXHU1NDdEXHU1NDY4XHU2NzFGXHJcblx0cHJpdmF0ZSBzdHJpZGU6IFR5cGUuVmVjdG9yIC8vIFx1NkI2NVx1OTU3RlxyXG5cclxuXHRjb25zdHJ1Y3RvcihjYXNpbmdQb29sOiBHYW1lRGVmLlNpbXBsZU9iamVjdFBvb2w8Q29yZS5HYW1lT2JqZWN0PiwgY2FzaW5nOiBDb3JlLkdhbWVPYmplY3QsIGRpcmVjdGlvbjogVHlwZS5WZWN0b3IpIHtcclxuXHRcdHRoaXMuY2FzaW5nUG9vbCA9IGNhc2luZ1Bvb2xcclxuXHRcdHRoaXMubG9jID0gVHlwZS5WZWN0b3IuYWRkKGNhc2luZy53b3JsZExvY2F0aW9uLCBjYXNpbmcud29ybGRSb3RhdGlvbi5yb3RhdGVWZWN0b3IoR2FtZURlZi5DQVNJTkdfT0ZGU0VUKSlcclxuXHRcdHRoaXMuZW50aXR5ID0gdGhpcy5jYXNpbmdQb29sLmFsbG9jYXRlKClcclxuXHRcdHRoaXMuZW50aXR5LndvcmxkTG9jYXRpb24gPSB0aGlzLmxvY1xyXG5cdFx0dGhpcy5lbnRpdHkud29ybGRSb3RhdGlvbiA9IG5ldyBUeXBlLlJvdGF0aW9uKFV0aWwuTWF0aFV0aWwucmFuZG9tRmxvYXQoMCwgMTgwKSwgVXRpbC5NYXRoVXRpbC5yYW5kb21GbG9hdCgwLCAxODApLCBVdGlsLk1hdGhVdGlsLnJhbmRvbUZsb2F0KDAsIDE4MCkpXHJcblx0XHR0aGlzLmVudGl0eS5zZXRWaXNpYmlsaXR5KFR5cGUuUHJvcGVydHlTdGF0dXMuT24pXHJcblx0XHR0aGlzLmRpc3BsYWNlbWVudCA9IGRpcmVjdGlvbi5tdWx0aXBseSgxMDApXHJcblx0XHR0aGlzLmdyYXZpdHkgPSBVdGlsLk1hdGhVdGlsLnJhbmRvbUZsb2F0KDEsIDMpXHJcblx0XHR0aGlzLmxpZmVUaW1lID0gR2FtZURlZi5DQVNJTkdfTElGRVxyXG5cdFx0dGhpcy5zdHJpZGUgPSBUeXBlLlZlY3Rvci56ZXJvXHJcblx0fVxyXG5cclxuXHQvLyBcdTY2RjRcdTY1QjBcdTVGMzlcdTU4RjNcdTRGNERcdTdGNkVcclxuXHR1cGRhdGUoZHQ6IG51bWJlcikge1xyXG5cdFx0dGhpcy5zdHJpZGUgPSBUeXBlLlZlY3Rvci5tdWx0aXBseSh0aGlzLmRpc3BsYWNlbWVudCwgZHQsIHRoaXMuc3RyaWRlKVxyXG5cdFx0dGhpcy5sb2MueCArPSB0aGlzLnN0cmlkZS54XHJcblx0XHR0aGlzLmxvYy55ICs9IHRoaXMuc3RyaWRlLnlcclxuXHRcdHRoaXMubG9jLnogKz0gdGhpcy5zdHJpZGUueiArIHRoaXMuZ3Jhdml0eVxyXG5cdFx0dGhpcy5ncmF2aXR5IC09IGR0ICogMjBcclxuXHRcdHRoaXMuZW50aXR5LndvcmxkTG9jYXRpb24gPSB0aGlzLmxvY1xyXG5cdFx0dGhpcy5saWZlVGltZSAtPSBkdFxyXG5cdFx0cmV0dXJuIHRoaXMubGlmZVRpbWUgPD0gMFxyXG5cdH1cclxuXHJcblx0Ly8gXHU5NTAwXHU2QkMxXHU1RjM5XHU1OEYzXHU2NUI5XHU2Q0Q1XHVGRjBDXHU1QkY5XHU4QzYxXHU2QzYwXHU1NkRFXHU2NTM2XHU1RjM5XHU1OEYzXHU1QjlFXHU0RjUzXHJcblx0ZGVzdHJveSgpIHtcclxuXHRcdHRoaXMuY2FzaW5nUG9vbC5yZWN5Y2xlKHRoaXMuZW50aXR5KVxyXG5cclxuXHR9XHJcbn0iLCAiXHVGRUZGaW1wb3J0IFdlYXBvblVJX0dlbmVyYXRlIGZyb20gXCIuLi91aS1nZW5lcmF0ZS9XZWFwb25VSV9nZW5lcmF0ZVwiO1xyXG5pbXBvcnQgV2VhcG9uRHJpdmVyIGZyb20gXCIuL1dlYXBvbkJhc2VDbHNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdlYXBvblVJIGV4dGVuZHMgV2VhcG9uVUlfR2VuZXJhdGV7XHJcbiAgICBjdXJXZWFwb246IFdlYXBvbkRyaXZlciA9IG51bGw7XHJcblxyXG4gICAgdXBQb3NpdGlvbjogVHlwZS5WZWN0b3IyID0gVHlwZS5WZWN0b3IyLnplcm87XHJcbiAgICBkb3duUG9zaXRpb246IFR5cGUuVmVjdG9yMiA9IFR5cGUuVmVjdG9yMi56ZXJvO1xyXG4gICAgbGVmdFBvc2l0aW9uOiBUeXBlLlZlY3RvcjIgPSBUeXBlLlZlY3RvcjIuemVybztcclxuICAgIHJpZ2h0UG9zaXRpb246IFR5cGUuVmVjdG9yMiA9IFR5cGUuVmVjdG9yMi56ZXJvO1xyXG5cclxuICAgIHVwQ3VyUG9zaXRpb246IFR5cGUuVmVjdG9yMiA9IFR5cGUuVmVjdG9yMi56ZXJvO1xyXG4gICAgZG93bkN1clBvc2l0aW9uOiBUeXBlLlZlY3RvcjIgPSBUeXBlLlZlY3RvcjIuemVybztcclxuICAgIGxlZnRDdXJQb3NpdGlvbjogVHlwZS5WZWN0b3IyID0gVHlwZS5WZWN0b3IyLnplcm87XHJcbiAgICByaWdodEN1clBvc2l0aW9uOiBUeXBlLlZlY3RvcjIgPSBUeXBlLlZlY3RvcjIuemVybztcclxuXHJcbiAgICBwcm90ZWN0ZWQgb25TdGFydCgpIHtcclxuXHJcbiAgICAgICAgdGhpcy5yaWdodF9maXJlLm9uSm95U3RpY2tEb3duLmFkZCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJyaWdodF9maXJlIG9uSm95U3RpY2tEb3duXCIpO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuY3VyV2VhcG9uKSByZXR1cm47XHJcbiAgICAgICAgICAgIHRoaXMuY3VyV2VhcG9uLnN0YXJ0RmlyZSgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnJpZ2h0X2ZpcmUub25Kb3lTdGlja1VwLmFkZCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJyaWdodF9maXJlIG9uSm95U3RpY2tVcFwiKTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmN1cldlYXBvbikgcmV0dXJuO1xyXG4gICAgICAgICAgICB0aGlzLmN1cldlYXBvbi5zdG9wRmlyZSgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmxlZnRfZmlyZS5vblByZXNzZWQuYWRkKCgpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcImxlZnRfZmlyZSBvblByZXNzZWRcIik7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5jdXJXZWFwb24pIHJldHVybjtcclxuICAgICAgICAgICAgdGhpcy5jdXJXZWFwb24uc3RhcnRGaXJlKCk7XHJcbiAgICAgICAgfSk7XHJcbiBcclxuICAgICAgICB0aGlzLmxlZnRfZmlyZS5vblJlbGVhc2VkLmFkZCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJsZWZ0X2ZpcmUgb25SZWxlYXNlZFwiKTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmN1cldlYXBvbikgcmV0dXJuO1xyXG4gICAgICAgICAgICB0aGlzLmN1cldlYXBvbi5zdG9wRmlyZSgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnJlbG9hZC5vbkNsaWNrZWQuYWRkKCgpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcInJlbG9hZCBvbkNsaWNrZWRcIik7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5jdXJXZWFwb24pIHJldHVybjtcclxuICAgICAgICAgICAgdGhpcy5jdXJXZWFwb24uc3RhcnRSZWxvYWQoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5haW0ub25DbGlja2VkLmFkZCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJhaW0gb25DbGlja2VkXCIpO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuY3VyV2VhcG9uKSByZXR1cm47XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmN1cldlYXBvbi5pc0FpbW1pbmcpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VyV2VhcG9uLnN0b3BBaW0oKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VyV2VhcG9uLnN0YXJ0QWltKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5jcm91Y2gub25DbGlja2VkLmFkZCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJjcm91Y2ggb25DbGlja2VkXCIpO1xyXG4gICAgICAgICAgICBsZXQgcGxheWVyID0gR2FtZXBsYXkuZ2V0Q3VycmVudFBsYXllcigpO1xyXG4gICAgICAgICAgICBpZiAocGxheWVyKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocGxheWVyLmNoYXJhY3Rlci5pc0Nyb3VjaGluZykge1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYXllci5jaGFyYWN0ZXIuY3JvdWNoKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyLmNoYXJhY3Rlci5jcm91Y2godHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuanVtcC5vbkNsaWNrZWQuYWRkKCgpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcImp1bXAgb25DbGlja2VkXCIpO1xyXG4gICAgICAgICAgICBsZXQgcGxheWVyID0gR2FtZXBsYXkuZ2V0Q3VycmVudFBsYXllcigpO1xyXG4gICAgICAgICAgICBpZiAocGxheWVyKSB7XHJcbiAgICAgICAgICAgICAgICBwbGF5ZXIuY2hhcmFjdGVyLmp1bXAoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBFdmVudHMuYWRkTG9jYWxMaXN0ZW5lcihcIkhvdFdlYXBvbi1VbmVxdWlwZWRcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jdXJXZWFwb24gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJXZWFwb24udW5FcXVpcCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJXZWFwb24gPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25TaG93KHdlYXBvbjogV2VhcG9uRHJpdmVyLCBjcm9zc1ZhbHVlOiBudW1iZXIsIGljb25JZDogc3RyaW5nLCB3ZWFwb25OYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwic2hvd1wiKTtcclxuICAgICAgICB0aGlzLmN1cldlYXBvbiA9IHdlYXBvbjtcclxuICAgICAgICB0aGlzLmljb24uaW1hZ2VHdWlkID0gaWNvbklkO1xyXG4gICAgICAgIHRoaXMubmFtZS50ZXh0ID0gd2VhcG9uTmFtZTtcclxuICAgICAgICB0aGlzLnVwUG9zaXRpb24gPSB0aGlzLnVwUG9zaXRpb24uc2V0KHRoaXMudXAucG9zaXRpb24pO1xyXG4gICAgICAgIHRoaXMuZG93blBvc2l0aW9uID0gdGhpcy5kb3duUG9zaXRpb24uc2V0KHRoaXMuZG93bi5wb3NpdGlvbik7XHJcbiAgICAgICAgdGhpcy5sZWZ0UG9zaXRpb24gPSB0aGlzLmxlZnRQb3NpdGlvbi5zZXQodGhpcy5sZWZ0LnBvc2l0aW9uKTtcclxuICAgICAgICB0aGlzLnJpZ2h0UG9zaXRpb24gPSB0aGlzLnJpZ2h0UG9zaXRpb24uc2V0KHRoaXMucmlnaHQucG9zaXRpb24pO1xyXG4gICAgICAgIHRoaXMuY2hhbmdlQ3Jvc3MoY3Jvc3NWYWx1ZSAqIDEwKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25IaWRlKCkge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJoaWRlXCIpO1xyXG4gICAgICAgIHRoaXMuY2hhbmdlQ3Jvc3MoMCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2hhbmdlQnVsbGV0KGJ1bGxldDogbnVtYmVyLCBhbW1vOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAoYW1tbyA9PSAtMSkge1xyXG4gICAgICAgICAgICB0aGlzLmJ1bGxldC50ZXh0ID0gYCR7YnVsbGV0fSAvIE5BTmA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmJ1bGxldC50ZXh0ID0gYCR7YnVsbGV0fSAvICR7YW1tb31gO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjaGFuZ2VDcm9zcyh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy51cC5wb3NpdGlvbiA9IHRoaXMudXBDdXJQb3NpdGlvbi5zZXQodGhpcy51cFBvc2l0aW9uLngsIHRoaXMudXBQb3NpdGlvbi55IC0gdmFsdWUpO1xyXG4gICAgICAgIHRoaXMuZG93bi5wb3NpdGlvbiA9IHRoaXMuZG93bkN1clBvc2l0aW9uLnNldCh0aGlzLmRvd25Qb3NpdGlvbi54LCB0aGlzLmRvd25Qb3NpdGlvbi55ICsgdmFsdWUpO1xyXG4gICAgICAgIHRoaXMubGVmdC5wb3NpdGlvbiA9IHRoaXMubGVmdEN1clBvc2l0aW9uLnNldCh0aGlzLmxlZnRQb3NpdGlvbi54IC0gdmFsdWUsIHRoaXMubGVmdFBvc2l0aW9uLnkpO1xyXG4gICAgICAgIHRoaXMucmlnaHQucG9zaXRpb24gPSB0aGlzLnJpZ2h0Q3VyUG9zaXRpb24uc2V0KHRoaXMucmlnaHRQb3NpdGlvbi54ICsgdmFsdWUsIHRoaXMucmlnaHRQb3NpdGlvbi55KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0VGltZVRleHQocmVzdFRpbWU6IG51bWJlciwga2VlcFRpbWU6IG51bWJlcikge1xyXG4gICAgICAgIGlmIChyZXN0VGltZSA8PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMubUtlZXBUaW1lQ2FudmFzLnZpc2liaWxpdHkgPSBVSS5TbGF0ZVZpc2liaWxpdHkuQ29sbGFwc2VkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5tS2VlcFRpbWVDYW52YXMudmlzaWJpbGl0eSA9IFVJLlNsYXRlVmlzaWJpbGl0eS5TZWxmSGl0VGVzdEludmlzaWJsZTtcclxuICAgICAgICAgICAgbGV0IHBlcmNlbnQgPSByZXN0VGltZSAvIGtlZXBUaW1lO1xyXG4gICAgICAgICAgICB0aGlzLmtlZXBUaW1lQmFyLnBlcmNlbnQgPSBwZXJjZW50O1xyXG4gICAgICAgICAgICB0aGlzLmtlZXBUaW1lVHh0LnRleHQgPSBgJHtyZXN0VGltZS50b0ZpeGVkKDEpfXNgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRSZWxvYWRCdG4oZW5hYmxlOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5yZWxvYWQudmlzaWJpbGl0eSA9IGVuYWJsZSA/IFVJLlNsYXRlVmlzaWJpbGl0eS5WaXNpYmxlIDogVUkuU2xhdGVWaXNpYmlsaXR5LkNvbGxhcHNlZDtcclxuICAgIH1cclxufSIsICJcdUZFRkZcclxuLyoqXHJcbiAqIEFVVE8gR0VORVJBVEUgQlkgVUkgRURJVE9SLlxyXG4gKiBXQVJOSU5HOiBETyBOT1QgTU9ESUZZIFRISVMgRklMRSxNQVkgQ0FVU0UgQ09ERSBMT1NULlxyXG4gKiBBVVRIT1I6IFx1NjI2N1x1N0IxNFx1N0VDRlx1NUU3NFxyXG4gKiBVSTogVUkvV2VhcG9uVUkudWlcclxuICogVElNRTogMjAyMy4wOC4yOC0xMi4yMS41N1xyXG4qL1xyXG5cclxuXHJcblxyXG5AVUkuVUlDYWxsT25seSgnVUkvV2VhcG9uVUkudWknKVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXZWFwb25VSV9HZW5lcmF0ZSBleHRlbmRzIFVJLlVJQmVoYXZpb3Ige1xyXG5cdEBVSS5VSU1hcmtQYXRoKCdSb290Q2FudmFzL3BvaW50JylcclxuICAgIHB1YmxpYyBwb2ludDogVUkuSW1hZ2U9dW5kZWZpbmVkO1xyXG4gICAgQFVJLlVJTWFya1BhdGgoJ1Jvb3RDYW52YXMvdXAnKVxyXG4gICAgcHVibGljIHVwOiBVSS5JbWFnZT11bmRlZmluZWQ7XHJcbiAgICBAVUkuVUlNYXJrUGF0aCgnUm9vdENhbnZhcy9kb3duJylcclxuICAgIHB1YmxpYyBkb3duOiBVSS5JbWFnZT11bmRlZmluZWQ7XHJcbiAgICBAVUkuVUlNYXJrUGF0aCgnUm9vdENhbnZhcy9sZWZ0JylcclxuICAgIHB1YmxpYyBsZWZ0OiBVSS5JbWFnZT11bmRlZmluZWQ7XHJcbiAgICBAVUkuVUlNYXJrUGF0aCgnUm9vdENhbnZhcy9yaWdodCcpXHJcbiAgICBwdWJsaWMgcmlnaHQ6IFVJLkltYWdlPXVuZGVmaW5lZDtcclxuICAgIEBVSS5VSU1hcmtQYXRoKCdSb290Q2FudmFzL21vdmUnKVxyXG4gICAgcHVibGljIG1vdmU6IFVJLlZpcnR1YWxKb3lzdGlja1BhbmVsPXVuZGVmaW5lZDtcclxuICAgIEBVSS5VSU1hcmtQYXRoKCdSb290Q2FudmFzL3JpZ2h0X2ZpcmUnKVxyXG4gICAgcHVibGljIHJpZ2h0X2ZpcmU6IFVJLlZpcnR1YWxKb3lzdGlja1BhbmVsPXVuZGVmaW5lZDtcclxuICAgIEBVSS5VSU1hcmtQYXRoKCdSb290Q2FudmFzL3JlbG9hZCcpXHJcbiAgICBwdWJsaWMgcmVsb2FkOiBVSS5CdXR0b249dW5kZWZpbmVkO1xyXG4gICAgQFVJLlVJTWFya1BhdGgoJ1Jvb3RDYW52YXMvY3JvdWNoJylcclxuICAgIHB1YmxpYyBjcm91Y2g6IFVJLkJ1dHRvbj11bmRlZmluZWQ7XHJcbiAgICBAVUkuVUlNYXJrUGF0aCgnUm9vdENhbnZhcy9qdW1wJylcclxuICAgIHB1YmxpYyBqdW1wOiBVSS5CdXR0b249dW5kZWZpbmVkO1xyXG4gICAgQFVJLlVJTWFya1BhdGgoJ1Jvb3RDYW52YXMvYWltJylcclxuICAgIHB1YmxpYyBhaW06IFVJLkJ1dHRvbj11bmRlZmluZWQ7XHJcbiAgICBAVUkuVUlNYXJrUGF0aCgnUm9vdENhbnZhcy9sZWZ0X2ZpcmUnKVxyXG4gICAgcHVibGljIGxlZnRfZmlyZTogVUkuQnV0dG9uPXVuZGVmaW5lZDtcclxuICAgIEBVSS5VSU1hcmtQYXRoKCdSb290Q2FudmFzL2ljb24nKVxyXG4gICAgcHVibGljIGljb246IFVJLkltYWdlPXVuZGVmaW5lZDtcclxuICAgIEBVSS5VSU1hcmtQYXRoKCdSb290Q2FudmFzL25hbWUnKVxyXG4gICAgcHVibGljIG5hbWU6IFVJLlRleHRCbG9jaz11bmRlZmluZWQ7XHJcbiAgICBAVUkuVUlNYXJrUGF0aCgnUm9vdENhbnZhcy9idWxsZXQnKVxyXG4gICAgcHVibGljIGJ1bGxldDogVUkuVGV4dEJsb2NrPXVuZGVmaW5lZDtcclxuICAgIEBVSS5VSU1hcmtQYXRoKCdSb290Q2FudmFzL21LZWVwVGltZUNhbnZhcycpXHJcbiAgICBwdWJsaWMgbUtlZXBUaW1lQ2FudmFzOiBVSS5DYW52YXM9dW5kZWZpbmVkO1xyXG4gICAgQFVJLlVJTWFya1BhdGgoJ1Jvb3RDYW52YXMvbUtlZXBUaW1lQ2FudmFzL2tlZXBUaW1lQmFyJylcclxuICAgIHB1YmxpYyBrZWVwVGltZUJhcjogVUkuUHJvZ3Jlc3NCYXI9dW5kZWZpbmVkO1xyXG4gICAgQFVJLlVJTWFya1BhdGgoJ1Jvb3RDYW52YXMvbUtlZXBUaW1lQ2FudmFzL2tlZXBUaW1lVHh0JylcclxuICAgIHB1YmxpYyBrZWVwVGltZVR4dDogVUkuVGV4dEJsb2NrPXVuZGVmaW5lZDtcclxuICAgIFxyXG5cclxuIFxyXG5cdC8qKlxyXG5cdCogb25TdGFydCBcdTRFNEJcdTUyNERcdTg5RTZcdTUzRDFcdTRFMDBcdTZCMjFcclxuXHQqL1xyXG5cdHByb3RlY3RlZCBvbkF3YWtlKCkge1xyXG5cdH1cclxuXHQgXHJcbn1cclxuICIsICJcclxuXHJcbmltcG9ydCB7IFByZWZhYkV2ZW50TW9kdWxlQywgUHJlZmFiRXZlbnRNb2R1bGVEYXRhLCBQcmVmYWJFdmVudE1vZHVsZVMgfSBmcm9tIFwiLi9QcmVmYWJFdmVudE1vZHVsZVwiXHJcblxyXG5leHBvcnQgbmFtZXNwYWNlIFByZWZhYkV2ZW50IHtcclxuXHJcbiAgICAvKipcclxuICogXHU2QTIxXHU2NzdGXHU1N0NCXHU3MEI5XHU2Q0U4XHU4OUUzKFx1NEVDNVx1NUJBMlx1NjIzN1x1N0FFRlx1NzUxRlx1NjU0OClcclxuICogQHBhcmFtIHJlcG9ydElkIFx1NkEyMVx1Njc3RmlkXHJcbiAqIEByZXR1cm5zIFxyXG4gKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBQcmVmYWJSZXBvcnQocmVwb3J0SWQ6IG51bWJlciA9IG51bGwpIHtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldDogYW55LCBwcm9wZXJ0eUtleTogc3RyaW5nLCBkZXNjcmlwdG9yOiBQcm9wZXJ0eURlc2NyaXB0b3IpIHtcclxuICAgICAgICAgICAgY29uc3QgbWV0aG9kID0gZGVzY3JpcHRvci52YWx1ZVxyXG4gICAgICAgICAgICBkZXNjcmlwdG9yLnZhbHVlID0gZnVuY3Rpb24gKC4uLmFyZ3M6IGFueVtdKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoU3lzdGVtVXRpbC5pc0NsaWVudCgpICYmIHJlcG9ydElkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJcdTZBMjFcdTY3N0ZcIiwgdGFyZ2V0LmNvbnN0cnVjdG9yLm5hbWUsIFwiXHU1N0NCXHU3MEI5XCIsIHJlcG9ydElkKVxyXG4gICAgICAgICAgICAgICAgICAgIFNlcnZpY2UuUm9vbVNlcnZpY2UuZ2V0SW5zdGFuY2UoKS5yZXBvcnRMb2dJbmZvKFwidHNfYWN0aW9uX2ZpcnN0ZG9cIiwgXCJcdTZBMjFcdTY3N0ZcdTU3Q0JcdTcwQjlcIiwgSlNPTi5zdHJpbmdpZnkoeyByZWNvcmQ6IFwiVGVtcGxhdGVQcmVmYWJcIiwgbGlmZXRpbWU6IHJlcG9ydElkIH0pKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gbWV0aG9kLmFwcGx5KHRoaXMsIGFyZ3MpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcdTdGNTFcdTdFRENcdTRFOEJcdTRFRjZrZXlcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IHZhciBfb25FdmVudE5ldEtleSA9IFwiUHJlZmFiRXZlbnRFeE5leUtleVwiXHJcbiAgICAvKipcclxuICAgICAqIFx1NjcyQ1x1NTczMFx1NEU4Qlx1NEVGNmtleVxyXG4gICAgICovXHJcbiAgICBleHBvcnQgdmFyIF9vbkV2ZW50S2V5ID0gXCJQcmVmYWJFdmVudEV4S2V5XCJcclxuXHJcbiAgICBmdW5jdGlvbiBjYWxsUmVtb3RlRnVuYyhjbGF6ek5hbWUsIGZ1bmNOYW1lLCAuLi5wYXJhbXMpIHtcclxuICAgICAgICBpZiAoIVByZWZhYkV2ZW50W2NsYXp6TmFtZV0gfHwgIVByZWZhYkV2ZW50W2NsYXp6TmFtZV1bZnVuY05hbWVdKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJcdTY1RTBcdTY1NDhcdTUzNEZcdThCQUUgXCIgKyBjbGF6ek5hbWUgKyBcIiA6IFwiICsgZnVuY05hbWUpXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBjYWxsRnVuYyhjbGF6ek5hbWUsIGZ1bmNOYW1lLCAuLi5wYXJhbXMpXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYWRkRXZlbnRMaXN0ZW5lcnMoKSB7XHJcbiAgICAgICAgaWYgKFV0aWwuU3lzdGVtVXRpbC5pc1NlcnZlcigpKSB7XHJcbiAgICAgICAgICAgIEV2ZW50cy5hZGRDbGllbnRMaXN0ZW5lcihfb25FdmVudE5ldEtleSwgKHBsYXllciwgY2xhenpOYW1lLCBmdW5jTmFtZSwgLi4ucGFyYW1zKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjYWxsUmVtb3RlRnVuYyhjbGF6ek5hbWUsIGZ1bmNOYW1lLCAuLi5wYXJhbXMpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChVdGlsLlN5c3RlbVV0aWwuaXNDbGllbnQoKSkge1xyXG4gICAgICAgICAgICBFdmVudHMuYWRkU2VydmVyTGlzdGVuZXIoX29uRXZlbnROZXRLZXksIChjbGF6ek5hbWU6IHN0cmluZywgZnVuY05hbWU6IHN0cmluZywgLi4ucGFyYW1zKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjYWxsTG9jYWxGdW5jKGNsYXp6TmFtZSwgZnVuY05hbWUsIC4uLnBhcmFtcylcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaW5pdEV2ZW50KCkge1xyXG4gICAgICAgIGFkZEV2ZW50TGlzdGVuZXJzKClcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFx1NTZERVx1OEMwM1x1NUJBMlx1NjIzN1x1N0FFRlx1NEU4Qlx1NEVGNlxyXG4gICAgICogQHBhcmFtIGNsYXp6TmFtZSBcclxuICAgICAqIEBwYXJhbSBmdW5jTmFtZSBcclxuICAgICAqIEBwYXJhbSBwYXJhbXMgXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGNhbGxMb2NhbEZ1bmMoY2xhenpOYW1lOiBzdHJpbmcsIGZ1bmNOYW1lOiBzdHJpbmcsIC4uLnBhcmFtczogYW55W10pIHtcclxuICAgICAgICBFdmVudHMuZGlzcGF0Y2hMb2NhbChfb25FdmVudEtleSArIFwiOlwiICsgY2xhenpOYW1lICsgXCI6XCIgKyBmdW5jTmFtZSwgLi4ucGFyYW1zKVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFx1NTZERVx1OEMwM1x1NEU4Qlx1NEVGNlxyXG4gICAgICogQHBhcmFtIGNsYXp6TmFtZSBcclxuICAgICAqIEBwYXJhbSBmdW5jTmFtZSBcclxuICAgICAqIEBwYXJhbSBwYXJhbXMgXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGNhbGxGdW5jKGNsYXp6TmFtZTogc3RyaW5nLCBmdW5jTmFtZTogc3RyaW5nLCAuLi5wYXJhbXM6IGFueVtdKSB7XHJcblxyXG4gICAgICAgIGlmIChVdGlsLlN5c3RlbVV0aWwuaXNDbGllbnQoKSkge1xyXG4gICAgICAgICAgICAvKiogXHU5MDBGXHU0RjIwXHU1MjMwXHU2NzBEXHU1MkExXHU3QUVGXHU1M0JCIFx1NjI2N1x1ODg0QyAqL1xyXG4gICAgICAgICAgICBFdmVudHMuZGlzcGF0Y2hUb1NlcnZlcihfb25FdmVudE5ldEtleSwgY2xhenpOYW1lLCBmdW5jTmFtZSwgLi4ucGFyYW1zKVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoVXRpbC5TeXN0ZW1VdGlsLmlzU2VydmVyKCkpIHtcclxuXHJcbiAgICAgICAgICAgIC8qKiBcdThDMDNcdTc1MjhcdTUxRkRcdTY1NzAgXHU1Rjk3XHU1MjMwXHU3RUQzXHU2NzlDIFx1NTcyOFx1NUU3Rlx1NjRBRFx1NTFGQVx1NTNCQiAqL1xyXG4gICAgICAgICAgICBpZiAoTW9kdWxlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1vZHVsZShQcmVmYWJFdmVudE1vZHVsZVMpW2Z1bmNOYW1lXSkge1xyXG4gICAgICAgICAgICAgICAgTW9kdWxlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1vZHVsZShQcmVmYWJFdmVudE1vZHVsZVMpW2Z1bmNOYW1lXShjbGF6ek5hbWUsIC4uLnBhcmFtcylcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIE1vZHVsZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNb2R1bGUoUHJlZmFiRXZlbnRNb2R1bGVTKS5ub3RpZnkoY2xhenpOYW1lLCBmdW5jTmFtZSwgLi4ucGFyYW1zKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFx1NTZERVx1OEMwM1x1NEU4Qlx1NEVGNlxyXG4gICAgICogQHBhcmFtIGNsYXp6TmFtZSBcclxuICAgICAqIEBwYXJhbSBmdW5jTmFtZSBcclxuICAgICAqIEBwYXJhbSBwYXJhbXMgXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGNhbGxGdW5jUmVzKGNsYXp6TmFtZTogc3RyaW5nLCBmdW5jTmFtZTogc3RyaW5nLCAuLi5wYXJhbXM6IGFueVtdKTogYW55IHtcclxuXHJcblxyXG4gICAgICAgIGlmIChVdGlsLlN5c3RlbVV0aWwuaXNDbGllbnQoKSkge1xyXG4gICAgICAgICAgICAvKiogXHU5MDBGXHU0RjIwXHU1MjMwXHU2NzBEXHU1MkExXHU3QUVGXHU1M0JCIFx1NjI2N1x1ODg0QyAqL1xyXG5cclxuICAgICAgICAgICAgaWYgKCFNb2R1bGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TW9kdWxlKFByZWZhYkV2ZW50TW9kdWxlQylbZnVuY05hbWVdKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiZmluZCBlcnJvciBQcmVmYWJFdmVudE1vZHVsZUM6IFwiICsgZnVuY05hbWUpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gTW9kdWxlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1vZHVsZShQcmVmYWJFdmVudE1vZHVsZUMpW2Z1bmNOYW1lXShjbGF6ek5hbWUsIC4uLnBhcmFtcylcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKFV0aWwuU3lzdGVtVXRpbC5pc1NlcnZlcigpKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoIU1vZHVsZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNb2R1bGUoUHJlZmFiRXZlbnRNb2R1bGVTKVtmdW5jTmFtZV0pIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJmaW5kIGVycm9yIFByZWZhYkV2ZW50TW9kdWxlUzogXCIgKyBmdW5jTmFtZSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8qKiBcdThDMDNcdTc1MjhcdTUxRkRcdTY1NzAgXHU1Rjk3XHU1MjMwXHU3RUQzXHU2NzlDIFx1NTcyOFx1NUU3Rlx1NjRBRFx1NTFGQVx1NTNCQiAqL1xyXG4gICAgICAgICAgICByZXR1cm4gTW9kdWxlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1vZHVsZShQcmVmYWJFdmVudE1vZHVsZVMpW2Z1bmNOYW1lXShjbGF6ek5hbWUsIC4uLnBhcmFtcylcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHU3NkQxXHU1NDJDXHU0RThCXHU0RUY2XHJcbiAgICAgKiBAcGFyYW0gY2xhenpOYW1lIFxyXG4gICAgICogQHBhcmFtIGZ1bmNOYW1lIFxyXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIFxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBvbkZ1bmMoY2xhenpOYW1lOiBzdHJpbmcsIGZ1bmNOYW1lOiBzdHJpbmcsIGNhbGxiYWNrOiBhbnkpOiBFdmVudHMuRXZlbnRMaXN0ZW5lciB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJyZWdpc3RlciA6IFwiICsgX29uRXZlbnRLZXkgKyBcIjpcIiArIGNsYXp6TmFtZSArIFwiOlwiICsgZnVuY05hbWUpXHJcbiAgICAgICAgcmV0dXJuIEV2ZW50cy5hZGRMb2NhbExpc3RlbmVyKF9vbkV2ZW50S2V5ICsgXCI6XCIgKyBjbGF6ek5hbWUgKyBcIjpcIiArIGZ1bmNOYW1lLCBjYWxsYmFjaylcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICogXHU1QzVFXHU2MDI3XHU3QzdCXHU1NzhCXHJcbiAgICAqL1xyXG4gICAgZXhwb3J0IGVudW0gQXR0clR5cGUge1xyXG5cclxuICAgICAgICAvKiogXHU2NzAwXHU1OTI3XHU4ODQwXHU5MUNGICAqL1xyXG4gICAgICAgIE1heEhwLFxyXG4gICAgICAgIC8qKiBcdTVGNTNcdTUyNERIcCAqL1xyXG4gICAgICAgIEN1ckhwLFxyXG4gICAgICAgIC8qKiBcdTY3MDBcdTU5MjdcdTg0RERcdTkxQ0YgKi9cclxuICAgICAgICBNYXhNcCxcclxuICAgICAgICAvKiogXHU2NTNCXHU1MUZCXHU1MjlCICovXHJcbiAgICAgICAgQXR0YWNrLFxyXG4gICAgICAgIC8qKiBcdTlCNTRcdTZDRDVcdTUyOUIgKi9cclxuICAgICAgICBNYWdpYyxcclxuICAgICAgICAvKiogXHU5NjMyXHU1RkExXHU1MjlCICovXHJcbiAgICAgICAgRGVmLFxyXG4gICAgICAgIC8qKiBcdTlCNTRcdTZDRDVcdTk2MzJcdTVGQTFcdTUyOUIgKi9cclxuICAgICAgICBNRGVmLFxyXG4gICAgICAgIC8qKiBcdTkwMUZcdTVFQTYgKi9cclxuICAgICAgICBTcGVlZCxcclxuICAgICAgICAvKiogXHU4REYzXHU4REMzXHU1MjlCICovXHJcbiAgICAgICAgSnVtcCxcclxuICAgICAgICAvKiogXHU2NTNCXHU1MUZCXHU5MDFGXHU1RUE2ICovXHJcbiAgICAgICAgQXR0YWNrU3BlZWQsXHJcbiAgICAgICAgLyoqIFx1NjUzQlx1NTFGQlx1OERERFx1NzlCQiAqL1xyXG4gICAgICAgIEF0dGFja0Rpc3RhbmNlLFxyXG4gICAgICAgIC8qKiBcdTY2MkZcdTU0MjZcdTY2MkZcdTY1RTBcdTY1NEMgKi9cclxuICAgICAgICBJc0ludmluY2libGVcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcdTVDNUVcdTYwMjdcdTUzNEZcdThCQUVcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGNsYXNzIFByZWZhYkV2dEF0dHIge1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAoXHU1M0NDXHU3QUVGKVx1NkRGQlx1NTJBMFx1NUM1RVx1NjAyN1xyXG4gICAgICAgICAqIEBwYXJhbSBzZW5kZXJHdWlkIFx1NTNEMVx1OEQ3N1x1NUJGOVx1OEM2MUd1aWRcclxuICAgICAgICAgKiBAcGFyYW0gdGFyZ2V0R3VpZCBcdTc2RUVcdTY4MDdcdTVCRjlcdThDNjFHdWlkXHJcbiAgICAgICAgICogQHBhcmFtIHZhbCBcdTUwM0NcclxuICAgICAgICAgKiBAcGFyYW0gYXR0clR5cGUgXHU1QzVFXHU2MDI3XHU3QzdCXHU1NzhCXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBzZXRBdHRyVmFsKHNlbmRlckd1aWQ6IHN0cmluZywgdGFyZ2V0R3VpZDogc3RyaW5nLCB2YWw6IG51bWJlciwgYXR0clR5cGU6IEF0dHJUeXBlKSB7XHJcbiAgICAgICAgICAgIGNhbGxGdW5jKHRoaXMubmFtZSwgdGhpcy5vblNldEF0dHJWYWwubmFtZSwgc2VuZGVyR3VpZCwgdGFyZ2V0R3VpZCwgdmFsLCBhdHRyVHlwZSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIChcdTUzQ0NcdTdBRUYpXHU3NkQxXHU1NDJDXHU1QzVFXHU2MDI3XHU2NTM5XHU1M0Q4XHJcbiAgICAgICAgICogQHBhcmFtIGNhbGxiYWNrIFx1NTZERVx1OEMwM1xyXG4gICAgICAgICAqIEByZXR1cm5zIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgb25TZXRBdHRyVmFsKGNhbGxiYWNrOiAoc2VuZGVyR3VpZDogc3RyaW5nLCB0YXJnZXRHdWlkOiBzdHJpbmcsIHZhbDogbnVtYmVyLCBhdHRyVHlwZTogQXR0clR5cGUpID0+IHZvaWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMub25DaGFuZ2VBdHRyVmFsKGNhbGxiYWNrKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogKFx1NTNDQ1x1N0FFRilcdTZERkJcdTUyQTBcdTVDNUVcdTYwMjdcclxuICAgICAgICAgKiBAcGFyYW0gc2VuZGVyR3VpZCBcdTUzRDFcdThENzdcdTVCRjlcdThDNjFHdWlkXHJcbiAgICAgICAgICogQHBhcmFtIHRhcmdldEd1aWQgXHU3NkVFXHU2ODA3XHU1QkY5XHU4QzYxR3VpZFxyXG4gICAgICAgICAqIEBwYXJhbSB2YWwgXHU1MDNDXHJcbiAgICAgICAgICogQHBhcmFtIGF0dHJUeXBlIFx1NUM1RVx1NjAyN1x1N0M3Qlx1NTc4QlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgYWRkQXR0clZhbChzZW5kZXJHdWlkOiBzdHJpbmcsIHRhcmdldEd1aWQ6IHN0cmluZywgdmFsOiBudW1iZXIsIGF0dHJUeXBlOiBBdHRyVHlwZSkge1xyXG4gICAgICAgICAgICBjYWxsRnVuYyh0aGlzLm5hbWUsIHRoaXMub25BZGRBdHRyVmFsLm5hbWUsIHNlbmRlckd1aWQsIHRhcmdldEd1aWQsIHZhbCwgYXR0clR5cGUpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIG9uQWRkQXR0clZhbChjYWxsYmFjazogKHNlbmRlckd1aWQ6IHN0cmluZywgdGFyZ2V0R3VpZDogc3RyaW5nLCB2YWw6IG51bWJlciwgYXR0clR5cGU6IEF0dHJUeXBlKSA9PiB2b2lkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9uQ2hhbmdlQXR0clZhbChjYWxsYmFjaylcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIChcdTUzQ0NcdTdBRUYpXHU4M0I3XHU1M0Q2XHU1QzVFXHU2MDI3XHJcbiAgICAgICAgICogQHBhcmFtIHRhcmdldEd1aWQgXHJcbiAgICAgICAgICogQHBhcmFtIHZhbCBcclxuICAgICAgICAgKiBAcGFyYW0gYXR0clR5cGUgXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBnZXRBdHRyVmFsKHRhcmdldEd1aWQ6IHN0cmluZywgYXR0clR5cGU6IEF0dHJUeXBlKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgbGV0IHJlcyA9IGNhbGxGdW5jUmVzKHRoaXMubmFtZSwgdGhpcy5nZXRBdHRyVmFsLm5hbWUsIHRhcmdldEd1aWQsIGF0dHJUeXBlKVxyXG4gICAgICAgICAgICByZXR1cm4gcmVzXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAoXHU1M0NDXHU3QUVGKVx1NzZEMVx1NTQyQ1x1NUM1RVx1NjAyN1x1NjUzOVx1NTNEOFxyXG4gICAgICAgICAqIEBwYXJhbSBjYWxsYmFjayBcdTU2REVcdThDMDNcclxuICAgICAgICAgKiBAcmV0dXJucyBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgc3RhdGljIG9uQ2hhbmdlQXR0clZhbChjYWxsYmFjazogKHNlbmRlckd1aWQ6IHN0cmluZywgdGFyZ2V0R3VpZDogc3RyaW5nLCB2YWw6IG51bWJlciwgYXR0clR5cGU6IEF0dHJUeXBlKSA9PiB2b2lkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBvbkZ1bmModGhpcy5uYW1lLCB0aGlzLm9uQ2hhbmdlQXR0clZhbC5uYW1lLCBjYWxsYmFjaylcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHU4OEM1XHU1OTA3XHU2OUZEXHU0RjREXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBlbnVtIEVxdWlwU2xvdCB7XHJcblxyXG4gICAgICAgIC8qKiBcdTZCNjZcdTU2NjggKi9cclxuICAgICAgICBXZWFwb24gPSAxLFxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFx1ODhDNVx1NTkwN1x1NTM0Rlx1OEJBRVxyXG4gICAgICovXHJcbiAgICBleHBvcnQgY2xhc3MgUHJlZmFiRXZ0RXF1aXAge1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAoXHU1M0NDXHU3QUVGKSBcdTdBN0ZcdTYyMzRcdTg4QzVcdTU5MDdcclxuICAgICAgICAgKiBAcGFyYW0gdGFyZ2V0R3VpZCBcdTVCRjlcdThDNjFHdWlkXHJcbiAgICAgICAgICogQHBhcmFtIHNsb3QgXHU2OUZEXHU0RjREXHJcbiAgICAgICAgICogQHBhcmFtIGVxdWlwR3VpZCBcdTg4QzVcdTU5MDdHdWlkXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBlcXVpcCh0YXJnZXRHdWlkOiBzdHJpbmcsIHNsb3Q6IEVxdWlwU2xvdCwgZXF1aXBHdWlkOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgY2FsbEZ1bmModGhpcy5uYW1lLCB0aGlzLm9uRXF1aXAubmFtZSwgdGFyZ2V0R3VpZCwgc2xvdCwgZXF1aXBHdWlkKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogKFx1NTNDQ1x1N0FFRilcdTc2RDFcdTU0MkNcdTg4QzVcdTU5MDdcdTY1MzlcdTUzRDhcclxuICAgICAgICAgKiBAcGFyYW0gY2FsbGJhY2sgXHJcbiAgICAgICAgICogQHJldHVybnMgXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBvbkVxdWlwKGNhbGxiYWNrOiAodGFyZ2V0R3VpZDogc3RyaW5nLCBzbG90OiBFcXVpcFNsb3QsIGVxdWlwR3VpZDogc3RyaW5nKSA9PiB2b2lkKTogRXZlbnRzLkV2ZW50TGlzdGVuZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gb25GdW5jKHRoaXMubmFtZSwgdGhpcy5vbkVxdWlwLm5hbWUsIGNhbGxiYWNrKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcdTczQTlcdTVCQjZcdTRGRTFcdTYwNkZcdTdDN0JcdTU3OEJcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGVudW0gUGxheWVySW5mb1R5cGUge1xyXG5cclxuICAgICAgICAvKiogXHU1NDBEXHU1QjU3ICovXHJcbiAgICAgICAgTmFtZSxcclxuICAgICAgICAvKiogXHU3QjQ5XHU3RUE3ICovXHJcbiAgICAgICAgTGV2ZWwsXHJcbiAgICAgICAgLyoqIFx1N0VDRlx1OUE4QyAqL1xyXG4gICAgICAgIEV4cCxcclxuICAgICAgICAvKiogXHU5MUQxXHU1RTAxICovXHJcbiAgICAgICAgR29sZCxcclxuICAgICAgICAvKiogXHU3OUVGXHU1MjA2ICovXHJcbiAgICAgICAgU2NvcmUsXHJcbiAgICAgICAgLyoqIFx1NTE3M1x1NTM2MSAqL1xyXG4gICAgICAgIFN0YWdlLFxyXG4gICAgICAgIC8qKiBcdTRFQkFcdTZDMTQgKi9cclxuICAgICAgICBQb3B1bGFyaXR5LFxyXG4gICAgICAgIC8qKiBcdTY2MkZcdTU0MjZcdTRFMERcdTU3MjhcdTU5MjdcdTUzODVcdTRFMkQgKi9cclxuICAgICAgICBJc05vdEluTG9iYnksXHJcbiAgICAgICAgLyoqIFx1NkI3Qlx1NEVBMVx1NkIyMVx1NjU3MCAqL1xyXG4gICAgICAgIERlYXRoQ291bnRcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFx1NzNBOVx1NUJCNlx1NEZFMVx1NjA2Rlx1NTM0Rlx1OEJBRVxyXG4gICAgICovXHJcbiAgICBleHBvcnQgY2xhc3MgUHJlZmFiRXZ0UGxheWVySW5mbyB7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIChcdTUzQ0NcdTdBRUYpXHU4M0I3XHU1M0Q2XHU3M0E5XHU1QkI2XHU0RkUxXHU2MDZGXHJcbiAgICAgICAgICogQHBhcmFtIHRhcmdldEd1aWQgXHU3NkVFXHU2ODA3XHU1QkY5XHU4QzYxR3VpZFxyXG4gICAgICAgICAqIEBwYXJhbSB2YWwgXHU1MDNDXHJcbiAgICAgICAgICogQHBhcmFtIGluZm9UeXBlIFx1NEZFMVx1NjA2Rlx1N0M3Qlx1NTc4QlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZ2V0UGxheWVySW5mbyh0YXJnZXRHdWlkOiBzdHJpbmcsIGluZm9UeXBlOiBQbGF5ZXJJbmZvVHlwZSB8IHN0cmluZyk6IGFueSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjYWxsRnVuY1Jlcyh0aGlzLm5hbWUsIHRoaXMuZ2V0UGxheWVySW5mby5uYW1lLCB0YXJnZXRHdWlkLCBpbmZvVHlwZSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIChcdTUzQ0NcdTdBRUYpXHU4QkJFXHU3RjZFXHU3M0E5XHU1QkI2XHU0RkUxXHU2MDZGXHJcbiAgICAgICAgICogQHBhcmFtIHNlbmRlckd1aWQgXHU1M0QxXHU4RDc3XHU1QkY5XHU4QzYxR3VpZFxyXG4gICAgICAgICAqIEBwYXJhbSB0YXJnZXRHdWlkIFx1NzZFRVx1NjgwN1x1NUJGOVx1OEM2MUd1aWRcclxuICAgICAgICAgKiBAcGFyYW0gdmFsIFx1NTAzQ1xyXG4gICAgICAgICAqIEBwYXJhbSBpbmZvVHlwZSBcdTRGRTFcdTYwNkZcdTdDN0JcdTU3OEJcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHNldFBsYXllckluZm8oc2VuZGVyR3VpZDogc3RyaW5nLCB0YXJnZXRHdWlkOiBzdHJpbmcsIHZhbDogYW55LCBpbmZvVHlwZTogUGxheWVySW5mb1R5cGUgfCBzdHJpbmcpIHtcclxuICAgICAgICAgICAgY2FsbEZ1bmModGhpcy5uYW1lLCB0aGlzLm9uU2V0UGxheWVySW5mby5uYW1lLCBzZW5kZXJHdWlkLCB0YXJnZXRHdWlkLCB2YWwsIGluZm9UeXBlKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogKFx1NTNDQ1x1N0FFRilcdTc2RDFcdTU0MkNcdTRGRTFcdTYwNkZcdTY1MzlcdTUzRDhcclxuICAgICAgICAgKiBAcGFyYW0gY2FsbGJhY2sgXHU1NkRFXHU4QzAzXHJcbiAgICAgICAgICogQHJldHVybnMgXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBvblNldFBsYXllckluZm8oY2FsbGJhY2s6IChzZW5kZXJHdWlkOiBzdHJpbmcsIHRhcmdldEd1aWQ6IHN0cmluZywgdmFsOiBhbnksIGluZm9UeXBlOiBQbGF5ZXJJbmZvVHlwZSB8IHN0cmluZykgPT4gdm9pZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gb25GdW5jKHRoaXMubmFtZSwgdGhpcy5vblNldFBsYXllckluZm8ubmFtZSwgY2FsbGJhY2spXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAoXHU1M0NDXHU3QUVGKVx1NkRGQlx1NTJBMFx1NEZFMVx1NjA2RlxyXG4gICAgICAgICAqIEBwYXJhbSBzZW5kZXJHdWlkIFx1NTNEMVx1OEQ3N1x1NUJGOVx1OEM2MUd1aWRcclxuICAgICAgICAgKiBAcGFyYW0gdGFyZ2V0R3VpZCBcdTc2RUVcdTY4MDdcdTVCRjlcdThDNjFHdWlkXHJcbiAgICAgICAgICogQHBhcmFtIHZhbCBcdTUwM0NcclxuICAgICAgICAgKiBAcGFyYW0gaW5mb1R5cGUgXHU0RkUxXHU2MDZGXHU3QzdCXHU1NzhCXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBhZGRQbGF5ZXJJbmZvKHNlbmRlckd1aWQ6IHN0cmluZywgdGFyZ2V0R3VpZDogc3RyaW5nLCB2YWw6IG51bWJlciwgYXR0clR5cGU6IFBsYXllckluZm9UeXBlIHwgc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIGNhbGxGdW5jKHRoaXMubmFtZSwgdGhpcy5vbkFkZFBsYXllckluZm8ubmFtZSwgc2VuZGVyR3VpZCwgdGFyZ2V0R3VpZCwgdmFsLCBhdHRyVHlwZSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIChcdTUzQ0NcdTdBRUYpXHU3NkQxXHU1NDJDXHU0RkUxXHU2MDZGXHU2NTM5XHU1M0Q4XHJcbiAgICAgICAgICogQHBhcmFtIGNhbGxiYWNrIFx1NTZERVx1OEMwM1xyXG4gICAgICAgICAqIEByZXR1cm5zIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgb25BZGRQbGF5ZXJJbmZvKGNhbGxiYWNrOiAoc2VuZGVyR3VpZDogc3RyaW5nLCB0YXJnZXRHdWlkOiBzdHJpbmcsIHZhbDogbnVtYmVyLCBpbmZvVHlwZTogUGxheWVySW5mb1R5cGUgfCBzdHJpbmcpID0+IHZvaWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG9uRnVuYyh0aGlzLm5hbWUsIHRoaXMub25BZGRQbGF5ZXJJbmZvLm5hbWUsIGNhbGxiYWNrKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGVudW0gUGxheWVyU3RhdFR5cGUge1xyXG4gICAgICAgIC8qKiBcdTg4NENcdThENzAgKi9cclxuICAgICAgICBXYWxraW5nLFxyXG4gICAgICAgIC8qKiBcdTk4REVcdTg4NEMgKi9cclxuICAgICAgICBGbHlpbmdcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgUHJlZmFiRXZ0UGxheWVyU3RhdCB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogKFx1NTNDQ1x1N0FFRilcdTY2RjRcdTY1MzlcdTczQTlcdTVCQjZcdTcyQjZcdTYwMDFcclxuICAgICAgICAgKiBAcGFyYW0gc2VuZGVyR3VpZCBcdTUzRDFcdThENzdcdTVCRjlcdThDNjFndWlkXHJcbiAgICAgICAgICogQHBhcmFtIHRhcmdldEd1aWQgXHU3NkVFXHU2ODA3XHU1QkY5XHU4QzYxZ3VpZFxyXG4gICAgICAgICAqIEBwYXJhbSBzdGF0VHlwZSBcdTczQTlcdTVCQjZcdTcyQjZcdTYwMDFcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHNldFBsYXllclN0YXQoc2VuZGVyR3VpZDogc3RyaW5nLCB0YXJnZXRHdWlkOiBzdHJpbmcsIHN0YXRUeXBlOiBQbGF5ZXJTdGF0VHlwZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gY2FsbEZ1bmModGhpcy5uYW1lLCB0aGlzLm9uU2V0UGxheWVyU3RhdC5uYW1lLCBzZW5kZXJHdWlkLCB0YXJnZXRHdWlkLCBzdGF0VHlwZSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIChcdTUzQ0NcdTdBRUYpXHU3NkQxXHU1NDJDXHU3M0E5XHU1QkI2XHU3MkI2XHU2MDAxXHU2NkY0XHU2NTM5XHJcbiAgICAgICAgICogQHBhcmFtIGNhbGxiYWNrIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgb25TZXRQbGF5ZXJTdGF0KGNhbGxiYWNrOiAoc2VuZGVyR3VpZDogc3RyaW5nLCB0YXJnZXRHdWlkOiBzdHJpbmcsIHN0YXRUeXBlOiBQbGF5ZXJTdGF0VHlwZSkgPT4gdm9pZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gb25GdW5jKHRoaXMubmFtZSwgdGhpcy5vblNldFBsYXllclN0YXQubmFtZSwgY2FsbGJhY2spXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAoXHU1M0NDXHU3QUVGKVx1ODNCN1x1NUY5N1x1NzNBOVx1NUJCNlx1NUY1M1x1NTI0RFx1NzJCNlx1NjAwMVxyXG4gICAgICAgICAqIEBwYXJhbSB0YXJnZXRHdWlkIFx1NzZFRVx1NjgwN1x1NUJGOVx1OEM2MWd1aWRcclxuICAgICAgICAgKiBAcmV0dXJucyBcdTczQTlcdTVCQjZcdTVGNTNcdTUyNERcdTcyQjZcdTYwMDFcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGdldFBsYXllclN0YXQodGFyZ2V0R3VpZDogc3RyaW5nKTogUGxheWVyU3RhdFR5cGUge1xyXG4gICAgICAgICAgICByZXR1cm4gY2FsbEZ1bmNSZXModGhpcy5uYW1lLCB0aGlzLmdldFBsYXllclN0YXQubmFtZSwgdGFyZ2V0R3VpZClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIFx1NjUzQlx1NTFGQlx1NTM0Rlx1OEJBRVxyXG4gICAgKi9cclxuICAgIGV4cG9ydCBjbGFzcyBQcmVmYWJFdnRGaWdodCB7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIChcdTUzQ0NcdTdBRUYpXHU1MUZCXHU0RTJEXHU3NkVFXHU2ODA3XHJcbiAgICAgICAgICogQHBhcmFtIGF0dGFja2VyR3VpZCBcdTUzRDFcdThENzdcdTVCRjlcdThDNjFHdWlkXHJcbiAgICAgICAgICogQHBhcmFtIHRhcmdldEd1aWQgXHU3NkVFXHU2ODA3XHU1QkY5XHU4QzYxR3VpZFxyXG4gICAgICAgICAqIEBwYXJhbSBkYW1hZ2UgXHU0RjI0XHU1QkIzXHJcbiAgICAgICAgICogQHBhcmFtIGhpdFBvaW50IFx1NTFGQlx1NEUyRFx1NzBCOVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgaGl0KHNlbmRlckd1aWQ6IHN0cmluZywgdGFyZ2V0R3VpZDogc3RyaW5nLCBkYW1hZ2U6IG51bWJlciwgaGl0UG9pbnQ6IFR5cGUuVmVjdG9yKSB7XHJcbiAgICAgICAgICAgIGNhbGxGdW5jKHRoaXMubmFtZSwgdGhpcy5vbkhpdC5uYW1lLCBzZW5kZXJHdWlkLCB0YXJnZXRHdWlkLCBkYW1hZ2UsIGhpdFBvaW50KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogKFx1NTNDQ1x1N0FFRilcdTc2RDFcdTU0MkNcdTUxRkJcdTRFMkRcdTc2RUVcdTY4MDdcclxuICAgICAgICAgKiBAcGFyYW0gY2FsbGJhY2sgXHU1NkRFXHU4QzAzXHJcbiAgICAgICAgICogQHJldHVybnMgXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBvbkhpdChjYWxsYmFjazogKHNlbmRlckd1aWQ6IHN0cmluZywgdGFyZ2V0R3VpZDogc3RyaW5nLCBkYW1hZ2U6IG51bWJlciwgaGl0UG9pbnQ6IFR5cGUuVmVjdG9yKSA9PiB2b2lkKTogRXZlbnRzLkV2ZW50TGlzdGVuZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gb25GdW5jKHRoaXMubmFtZSwgdGhpcy5vbkhpdC5uYW1lLCBjYWxsYmFjaylcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIChcdTUzQ0NcdTdBRUYpXHU1M0QxXHU4RDc3XHU0RjI0XHU1QkIzXHJcbiAgICAgICAgICogQHBhcmFtIGF0dGFja2VyR3VpZCBcdTUzRDFcdThENzdcdTVCRjlcdThDNjFHdWlkXHJcbiAgICAgICAgICogQHBhcmFtIHRhcmdldEd1aWQgXHU3NkVFXHU2ODA3XHU1QkY5XHU4QzYxR3VpZFxyXG4gICAgICAgICAqIEBwYXJhbSBkYW1hZ2UgXHU0RjI0XHU1QkIzXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBodXJ0KHNlbmRlckd1aWQ6IHN0cmluZywgdGFyZ2V0R3VpZDogc3RyaW5nLCBkYW1hZ2U6IG51bWJlcikge1xyXG4gICAgICAgICAgICBjYWxsRnVuYyh0aGlzLm5hbWUsIHRoaXMub25IdXJ0Lm5hbWUsIHNlbmRlckd1aWQsIHRhcmdldEd1aWQsIGRhbWFnZSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIChcdTUzQ0NcdTdBRUYpXHU3NkQxXHU1NDJDXHU1M0Q3XHU1MjMwXHU0RjI0XHU1QkIzXHJcbiAgICAgICAgICogQHBhcmFtIGNhbGxiYWNrIFx1NTZERVx1OEMwM1xyXG4gICAgICAgICAqIEByZXR1cm5zIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgb25IdXJ0KGNhbGxiYWNrOiAoc2VuZGVyR3VpZDogc3RyaW5nLCB0YXJnZXRHdWlkOiBzdHJpbmcsIGRhbWFnZTogbnVtYmVyKSA9PiB2b2lkKTogRXZlbnRzLkV2ZW50TGlzdGVuZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gb25GdW5jKHRoaXMubmFtZSwgdGhpcy5vbkh1cnQubmFtZSwgY2FsbGJhY2spXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAoXHU1M0NDXHU3QUVGKVx1NTNEMVx1OEQ3N1x1NkNCQlx1NzU5N1xyXG4gICAgICAgICAqIEBwYXJhbSBhdHRhY2tlckd1aWQgXHU1M0QxXHU4RDc3XHU1QkY5XHU4QzYxR3VpZFxyXG4gICAgICAgICAqIEBwYXJhbSB0YXJnZXRHdWlkIFx1NzZFRVx1NjgwN1x1NUJGOVx1OEM2MUd1aWRcclxuICAgICAgICAgKiBAcGFyYW0gY3VyZVZhbCBcdTZDQkJcdTc1OTdcdTY1NzBcdTUwM0NcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGN1cmUoc2VuZGVyR3VpZDogc3RyaW5nLCB0YXJnZXRHdWlkOiBzdHJpbmcsIGN1cmVWYWw6IG51bWJlcikge1xyXG4gICAgICAgICAgICBjYWxsRnVuYyh0aGlzLm5hbWUsIHRoaXMub25DdXJlLm5hbWUsIHNlbmRlckd1aWQsIHRhcmdldEd1aWQsIGN1cmVWYWwpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAoXHU1M0NDXHU3QUVGKVx1NzZEMVx1NTQyQ1x1NTNEN1x1NTIzMFx1NkNCQlx1NzU5N1xyXG4gICAgICAgICAqIEBwYXJhbSBjYWxsYmFjayBcdTU2REVcdThDMDNcclxuICAgICAgICAgKiBAcmV0dXJucyBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgc3RhdGljIG9uQ3VyZShjYWxsYmFjazogKHNlbmRlckd1aWQ6IHN0cmluZywgdGFyZ2V0R3VpZDogc3RyaW5nLCBjdXJlVmFsOiBudW1iZXIpID0+IHZvaWQpOiBFdmVudHMuRXZlbnRMaXN0ZW5lciB7XHJcbiAgICAgICAgICAgIHJldHVybiBvbkZ1bmModGhpcy5uYW1lLCB0aGlzLm9uQ3VyZS5uYW1lLCBjYWxsYmFjaylcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIChcdTUzQ0NcdTdBRUYpXHU1M0QxXHU4RDc3XHU2QjdCXHU0RUExXHJcbiAgICAgICAgICogQHBhcmFtIHRhcmdldEd1aWQgXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBkaWUodGFyZ2V0R3VpZDogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIGNhbGxGdW5jKHRoaXMubmFtZSwgdGhpcy5vbkRpZS5uYW1lLCB0YXJnZXRHdWlkKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogKFx1NTNDQ1x1N0FFRilcdTc2RDFcdTU0MkNcdTVCRjlcdThDNjFcdTZCN0JcdTRFQTFcclxuICAgICAgICAgKiBAcGFyYW0gY2FsbGJhY2sgXHJcbiAgICAgICAgICogQHJldHVybnMgXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBvbkRpZShjYWxsYmFjazogKHRhcmdldEd1aWQ6IHN0cmluZykgPT4gdm9pZCk6IEV2ZW50cy5FdmVudExpc3RlbmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIG9uRnVuYyh0aGlzLm5hbWUsIHRoaXMub25EaWUubmFtZSwgY2FsbGJhY2spXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAoXHU1M0NDXHU3QUVGKVx1OTAxQVx1NzdFNVx1NTkwRFx1NkQzQlxyXG4gICAgICAgICAqIEBwYXJhbSB0YXJnZXRHdWlkIFx1NUJGOVx1OEM2MWlkXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyByZXZpdmUodGFyZ2V0R3VpZDogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIGNhbGxGdW5jKHRoaXMubmFtZSwgdGhpcy5vblJldml2ZS5uYW1lLCB0YXJnZXRHdWlkKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogKFx1NTNDQ1x1N0FFRilcdTc2RDFcdTU0MkNcdTU5MERcdTZEM0JcclxuICAgICAgICAgKiBAcGFyYW0gY2FsbGJhY2sgXHU1NkRFXHU4QzAzXHJcbiAgICAgICAgICogQHJldHVybnMgXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBvblJldml2ZShjYWxsYmFjazogKHRhcmdldEd1aWQ6IHN0cmluZykgPT4gdm9pZCk6IEV2ZW50cy5FdmVudExpc3RlbmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIG9uRnVuYyh0aGlzLm5hbWUsIHRoaXMub25SZXZpdmUubmFtZSwgY2FsbGJhY2spXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFx1OEJCMFx1NUY1NVx1NzBCOVx1NTM0Rlx1OEJBRVxyXG4gICAgICovXHJcbiAgICBleHBvcnQgY2xhc3MgUHJlZmFiRXZ0UmVjb3JkUG9pbnQge1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAoXHU1M0NDXHU3QUVGKVx1OEJCRVx1N0Y2RVx1NTE3M1x1NTM2MVxyXG4gICAgICAgICAqIEBwYXJhbSBzZW5kZXJHdWlkIFx1NTNEMVx1OTAwMVx1ODAwNUd1aWRcclxuICAgICAgICAgKiBAcGFyYW0gdGFyZ2V0R3VpZCBcdTc2RUVcdTY4MDdHdWlkXHJcbiAgICAgICAgICogQHBhcmFtIHJlY29yZFBvaW50SWQgXHU4QkIwXHU1RjU1XHU3MEI5aWRcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHNldFJlY29yZFBvaW50KHNlbmRlckd1aWQ6IHN0cmluZywgdGFyZ2V0R3VpZDogc3RyaW5nLCByZWNvcmRQb2ludElkOiBudW1iZXIsIHNhdmVEQjogYm9vbGVhbikge1xyXG4gICAgICAgICAgICBjYWxsRnVuYyh0aGlzLm5hbWUsIHRoaXMub25TZXRSZWNvcmRQb2ludC5uYW1lLCBzZW5kZXJHdWlkLCB0YXJnZXRHdWlkLCByZWNvcmRQb2ludElkLCBzYXZlREIpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAoXHU1M0NDXHU3QUVGKVx1ODNCN1x1NTNENlx1NTE3M1x1NTM2MVxyXG4gICAgICAgICAqIEBwYXJhbSB0YXJnZXRHdWlkIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZ2V0UmVjb3JkUG9pbnQodGFyZ2V0R3VpZDogc3RyaW5nKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIGNhbGxGdW5jUmVzKHRoaXMubmFtZSwgdGhpcy5nZXRSZWNvcmRQb2ludC5uYW1lLCB0YXJnZXRHdWlkKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogKFx1NTNDQ1x1N0FFRilcdTc2RDFcdTU0MkNcdThCQkVcdTdGNkVcdTUxNzNcdTUzNjFcclxuICAgICAgICAgKiBAcGFyYW0gY2FsbGJhY2sgXHU1NkRFXHU4QzAzXHJcbiAgICAgICAgICogQHJldHVybnMgXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBvblNldFJlY29yZFBvaW50KGNhbGxiYWNrOiAoc2VuZGVyR3VpZDogc3RyaW5nLCB0YXJnZXRHdWlkOiBzdHJpbmcsIHJlY29yZFBvaW50SWQ6IG51bWJlcikgPT4gdm9pZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gb25GdW5jKHRoaXMubmFtZSwgdGhpcy5vblNldFJlY29yZFBvaW50Lm5hbWUsIGNhbGxiYWNrKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogKFx1NTNDQ1x1N0FFRilcdThGRDRcdTU2REVcdTVCNThcdTY4NjNcdThCQjBcdTVGNTVcdTcwQjlcclxuICAgICAgICAgKiBAcGFyYW0gc2VuZGVyR3VpZCBcdTUzRDFcdTkwMDFcdTgwMDVndWlkIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgYmFja0N1cnJlbnRSZWNvcmRQb2ludChzZW5kZXJHdWlkOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgY2FsbEZ1bmModGhpcy5uYW1lLCB0aGlzLm9uQmFja0N1cnJlbnRSZWNvcmRQb2ludC5uYW1lLCBzZW5kZXJHdWlkKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogKFx1NTNDQ1x1N0FFRilcdTc2RDFcdTU0MkNcdTU2REVcdTUyMzBcdTVCNThcdTY4NjNcdThCQjBcdTVGNTVcdTcwQjlcclxuICAgICAgICAgKiBAcGFyYW0gY2FsbGJhY2sgXHU1NkRFXHU4QzAzXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBvbkJhY2tDdXJyZW50UmVjb3JkUG9pbnQoY2FsbGJhY2s6IChzZW5kZXJHdWlkOiBzdHJpbmcpID0+IHZvaWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG9uRnVuYyh0aGlzLm5hbWUsIHRoaXMub25CYWNrQ3VycmVudFJlY29yZFBvaW50Lm5hbWUsIGNhbGxiYWNrKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogKFx1NTNDQ1x1N0FFRilcdThGRDRcdTU2REVcdThCQjBcdTVGNTVcdTcwQjlcclxuICAgICAgICAgKiBAcGFyYW0gc2VuZGVyR3VpZCBcdTUzRDFcdTkwMDFcdTgwMDVndWlkIFxyXG4gICAgICAgICAqIEBwYXJhbSByZWNvcmRQb2ludElkIFx1OEJCMFx1NUY1NVx1NzBCOWlkXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBiYWNrUmVjb3JkUG9pbnQoc2VuZGVyR3VpZDogc3RyaW5nLCByZWNvcmRQb2ludElkOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgY2FsbEZ1bmModGhpcy5uYW1lLCB0aGlzLm9uQmFja1JlY29yZFBvaW50Lm5hbWUsIHNlbmRlckd1aWQsIHJlY29yZFBvaW50SWQpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAoXHU1M0NDXHU3QUVGKVx1NzZEMVx1NTQyQ1x1NTZERVx1NTIzMFx1OEJCMFx1NUY1NVx1NzBCOVxyXG4gICAgICAgICAqIEBwYXJhbSBjYWxsYmFjayBcdTU2REVcdThDMDNcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgc3RhdGljIG9uQmFja1JlY29yZFBvaW50KGNhbGxiYWNrOiAoc2VuZGVyR3VpZDogc3RyaW5nLCByZWNvcmRQb2ludElkOiBudW1iZXIpID0+IHZvaWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG9uRnVuYyh0aGlzLm5hbWUsIHRoaXMub25CYWNrUmVjb3JkUG9pbnQubmFtZSwgY2FsbGJhY2spXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFx1OTAxQVx1NzdFNVx1NTM0Rlx1OEJBRVxyXG4gICAgICovXHJcbiAgICBleHBvcnQgY2xhc3MgUHJlZmFiRXZ0Tm90aWZ5IHtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogKFx1NUJBMlx1NjIzN1x1N0FFRilcdTY3MkNcdTU3MzBcdTkwMUFcdTc3RTVcclxuICAgICAgICAgKiBAcGFyYW0gdGV4dCBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgc3RhdGljIG5vdGlmeUxvY2FsKHRleHQ6IHN0cmluZykge1xyXG4gICAgICAgICAgICBjYWxsTG9jYWxGdW5jKHRoaXMubmFtZSwgdGhpcy5vbk5vdGlmeS5uYW1lLCB0ZXh0KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogKFx1NTNDQ1x1N0FFRilcdTUxNjhcdTVDNDBcdTkwMUFcdTc3RTVcclxuICAgICAgICAgKiBAcGFyYW0gdGV4dCBcdTRGRTFcdTYwNkZcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgc3RhdGljIG5vdGlmeSh0ZXh0OiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgY2FsbEZ1bmModGhpcy5uYW1lLCB0aGlzLm9uTm90aWZ5Lm5hbWUsIHRleHQpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAoXHU1M0NDXHU3QUVGKVx1NzZEMVx1NTQyQ1x1OTAxQVx1NzdFNVxyXG4gICAgICAgICAqIEBwYXJhbSBjYWxsYmFjayBcclxuICAgICAgICAgKiBAcmV0dXJucyBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgc3RhdGljIG9uTm90aWZ5KGNhbGxiYWNrOiAodGV4dDogc3RyaW5nKSA9PiB2b2lkKTogRXZlbnRzLkV2ZW50TGlzdGVuZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gb25GdW5jKHRoaXMubmFtZSwgdGhpcy5vbk5vdGlmeS5uYW1lLCBjYWxsYmFjaylcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHU2MzkyXHU4ODRDXHU2OTlDXHU1MzRGXHU4QkFFXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBjbGFzcyBQcmVmYWJFdnRSYW5rIHtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogKFx1NUJBMlx1NjIzN1x1N0FFRilcdTYyNTNcdTVGMDBcdTYzOTJcdTg4NENcdTY5OUNVSVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgb3BlblJhbmsoKSB7XHJcbiAgICAgICAgICAgIGNhbGxMb2NhbEZ1bmModGhpcy5uYW1lLCB0aGlzLm9uT3BlblJhbmsubmFtZSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIChcdTVCQTJcdTYyMzdcdTdBRUYpXHU3NkQxXHU1NDJDXHU2MjUzXHU1RjAwXHU2MzkyXHU4ODRDXHU2OTlDVUlcclxuICAgICAgICAgKiBAcGFyYW0gY2FsbGJhY2sgXHU1NkRFXHU4QzAzXHJcbiAgICAgICAgICogQHJldHVybnMgXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBvbk9wZW5SYW5rKGNhbGxiYWNrOiAoKSA9PiB2b2lkKTogRXZlbnRzLkV2ZW50TGlzdGVuZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gb25GdW5jKHRoaXMubmFtZSwgdGhpcy5vbk9wZW5SYW5rLm5hbWUsIGNhbGxiYWNrKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogKFx1NTNDQ1x1N0FFRilcdThCQkVcdTdGNkVcdTYzOTJcdTg4NENcdTY5OUNcdTY1NzBcdTYzNkVcclxuICAgICAgICAgKiBAcGFyYW0gc2VuZGVyR3VpZCBcclxuICAgICAgICAgKiBAcGFyYW0gc2NvcmUgXHJcbiAgICAgICAgICogQHBhcmFtIHR5cGVOYW1lIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgc2V0UmFua0RhdGEoc2VuZGVyR3VpZDogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIHNjb3JlOiBudW1iZXIsIHR5cGVOYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgY2FsbEZ1bmModGhpcy5uYW1lLCB0aGlzLm9uU2V0UmFua0RhdGEubmFtZSwgc2VuZGVyR3VpZCwgbmFtZSwgc2NvcmUsIHR5cGVOYW1lKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogKFx1NTNDQ1x1N0FFRilcdTc2RDFcdTU0MkNcdThCQkVcdTdGNkVcdTYzOTJcdTg4NENcdTY5OUNcdTY1NzBcdTYzNkVcclxuICAgICAgICAgKiBAcGFyYW0gY2FsbGJhY2sgXHJcbiAgICAgICAgICogQHJldHVybnMgXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBvblNldFJhbmtEYXRhKGNhbGxiYWNrOiAoc2VuZGVyR3VpZDogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIHNjb3JlOiBudW1iZXIsIHR5cGVOYW1lOiBzdHJpbmcpID0+IHZvaWQpOiBFdmVudHMuRXZlbnRMaXN0ZW5lciB7XHJcbiAgICAgICAgICAgIHJldHVybiBvbkZ1bmModGhpcy5uYW1lLCB0aGlzLm9uU2V0UmFua0RhdGEubmFtZSwgY2FsbGJhY2spXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAoXHU1M0NDXHU3QUVGKVx1NTIyMFx1OTY2NFx1NjM5Mlx1ODg0Q1x1Njk5Q1x1NjU3MFx1NjM2RVxyXG4gICAgICAgICAqIEBwYXJhbSBzZW5kZXJHdWlkIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZGVsUmFua0RhdGEoc2VuZGVyR3VpZDogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIGNhbGxGdW5jKHRoaXMubmFtZSwgdGhpcy5vbkRlbFJhbmtEYXRhLm5hbWUsIHNlbmRlckd1aWQpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAoXHU1M0NDXHU3QUVGKVx1NzZEMVx1NTQyQ1x1NTIyMFx1OTY2NFx1NjM5Mlx1ODg0Q1x1Njk5Q1x1NjU3MFx1NjM2RVxyXG4gICAgICAgICAqIEBwYXJhbSBjYWxsYmFjayBcclxuICAgICAgICAgKiBAcmV0dXJucyBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgc3RhdGljIG9uRGVsUmFua0RhdGEoY2FsbGJhY2s6IChzZW5kZXJHdWlkOiBzdHJpbmcpID0+IHZvaWQpOiBFdmVudHMuRXZlbnRMaXN0ZW5lciB7XHJcbiAgICAgICAgICAgIHJldHVybiBvbkZ1bmModGhpcy5uYW1lLCB0aGlzLm9uRGVsUmFua0RhdGEubmFtZSwgY2FsbGJhY2spXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFx1NjM2Mlx1ODhDNVx1NTM0Rlx1OEJBRVxyXG4gICAgICovXHJcbiAgICBleHBvcnQgY2xhc3MgUHJlZmFiRXZ0Q2xvdGgge1xyXG5cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogKFx1NUJBMlx1NjIzN1x1N0FFRilcdTUyQTBcdThGN0RcdTg5RDJcdTgyNzJcdTRGNTNcdTU3OEJcclxuICAgICAgICAgKiBAcGFyYW0gc2VuZGVyR3VpZCBcdTUzRDFcdTkwMDFcdTgwMDVHdWlkXHJcbiAgICAgICAgICogQHBhcmFtIHRhcmdldEd1aWQgXHU3NkVFXHU2ODA3XHU1QkY5XHU4QzYxR3VpZFxyXG4gICAgICAgICAqIEBwYXJhbSBkcmVzc1Jlc0d1aWQgXHU4OEM1XHU2MjZFXHU4RDQ0XHU2RTkwR3VpZFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgbG9hZFJvbGUoc2VuZGVyR3VpZDogc3RyaW5nLCB0YXJnZXRHdWlkOiBzdHJpbmcsIGRyZXNzUmVzR3VpZDogc3RyaW5nW10pIHtcclxuICAgICAgICAgICAgY2FsbExvY2FsRnVuYyh0aGlzLm5hbWUsIHRoaXMub25Mb2FkUm9sZS5uYW1lLCBzZW5kZXJHdWlkLCB0YXJnZXRHdWlkLCBkcmVzc1Jlc0d1aWQpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAoXHU1QkEyXHU2MjM3XHU3QUVGKVx1NzZEMVx1NTQyQ1x1NTJBMFx1OEY3RFx1ODlEMlx1ODI3Mlx1NEY1M1x1NTc4Qlx1NTM0Rlx1OEJBRVxyXG4gICAgICAgICAqIEBwYXJhbSBjYWxsYmFjayBcdTU2REVcdThDMDNcclxuICAgICAgICAgKiBAcmV0dXJucyBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgc3RhdGljIG9uTG9hZFJvbGUoY2FsbGJhY2s6IChzZW5kZXJHdWlkOiBzdHJpbmcsIHRhcmdldEd1aWQ6IHN0cmluZywgZHJlc3NSZXNHdWlkOiBzdHJpbmdbXSkgPT4gdm9pZCk6IEV2ZW50cy5FdmVudExpc3RlbmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIG9uRnVuYyh0aGlzLm5hbWUsIHRoaXMub25Mb2FkUm9sZS5uYW1lLCBjYWxsYmFjaylcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIChcdTVCQTJcdTYyMzdcdTdBRUYpXHU1MkEwXHU4RjdEXHU4OEM1XHU2MjZFXHJcbiAgICAgICAgICogQHBhcmFtIHNlbmRlckd1aWQgXHU1M0QxXHU5MDAxXHU4MDA1R3VpZFxyXG4gICAgICAgICAqIEBwYXJhbSB0YXJnZXRHdWlkIFx1NzZFRVx1NjgwN1x1NUJGOVx1OEM2MUd1aWRcclxuICAgICAgICAgKiBAcGFyYW0gZHJlc3NSZXNHdWlkIFx1ODhDNVx1NjI2RVx1OEQ0NFx1NkU5MEd1aWRcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGxvYWRDbG90aChzZW5kZXJHdWlkOiBzdHJpbmcsIHRhcmdldEd1aWQ6IHN0cmluZywgZHJlc3NSZXNHdWlkOiBzdHJpbmdbXSkge1xyXG4gICAgICAgICAgICBjYWxsTG9jYWxGdW5jKHRoaXMubmFtZSwgdGhpcy5vbkxvYWRDbG90aC5uYW1lLCBzZW5kZXJHdWlkLCB0YXJnZXRHdWlkLCBkcmVzc1Jlc0d1aWQpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAoXHU1QkEyXHU2MjM3XHU3QUVGKVx1NzZEMVx1NTQyQ1x1NTJBMFx1OEY3RFx1ODhDNVx1NjI2RVxyXG4gICAgICAgICAqIEBwYXJhbSBjYWxsYmFjayBcclxuICAgICAgICAgKiBAcmV0dXJucyBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgc3RhdGljIG9uTG9hZENsb3RoKGNhbGxiYWNrOiAoc2VuZGVyR3VpZDogc3RyaW5nLCB0YXJnZXRHdWlkOiBzdHJpbmcsIGRyZXNzUmVzR3VpZDogc3RyaW5nW10pID0+IHZvaWQpOiBFdmVudHMuRXZlbnRMaXN0ZW5lciB7XHJcbiAgICAgICAgICAgIHJldHVybiBvbkZ1bmModGhpcy5uYW1lLCB0aGlzLm9uTG9hZENsb3RoLm5hbWUsIGNhbGxiYWNrKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogKFx1NUJBMlx1NjIzN1x1N0FFRilcdTUyQTBcdThGN0RcdTYzRDJcdTY5RkRcdThENDRcdTZFOTBcclxuICAgICAgICAgKiBAcGFyYW0gc2VuZGVyR3VpZCBcdTUzRDFcdTkwMDFcdTgwMDVHdWlkXHJcbiAgICAgICAgICogQHBhcmFtIHRhcmdldEd1aWQgXHU3NkVFXHU2ODA3XHU1QkY5XHU4QzYxR3VpZFxyXG4gICAgICAgICAqIEBwYXJhbSBzbG90UmVzR3VpZCBcdTYzRDJcdTY5RkRcdThENDRcdTZFOTBHdWlkXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBsb2FkU2xvdChzZW5kZXJHdWlkOiBzdHJpbmcsIHRhcmdldEd1aWQ6IHN0cmluZywgc2xvdFJlc0d1aWQ6IHN0cmluZykge1xyXG4gICAgICAgICAgICBjYWxsTG9jYWxGdW5jKHRoaXMubmFtZSwgdGhpcy5vbkxvYWRTbG90Lm5hbWUsIHNlbmRlckd1aWQsIHRhcmdldEd1aWQsIHNsb3RSZXNHdWlkKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogKFx1NUJBMlx1NjIzN1x1N0FFRilcdTc2RDFcdTU0MkNcdTUyQTBcdThGN0RcdTYzRDJcdTY5RkRcdThENDRcdTZFOTBcclxuICAgICAgICAgKiBAcGFyYW0gY2FsbGJhY2sgXHJcbiAgICAgICAgICogQHJldHVybnMgXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBvbkxvYWRTbG90KGNhbGxiYWNrOiAoc2VuZGVyR3VpZDogc3RyaW5nLCB0YXJnZXRHdWlkOiBzdHJpbmcsIHNsb3RSZXNHdWlkOiBzdHJpbmcpID0+IHZvaWQpOiBFdmVudHMuRXZlbnRMaXN0ZW5lciB7XHJcbiAgICAgICAgICAgIHJldHVybiBvbkZ1bmModGhpcy5uYW1lLCB0aGlzLm9uTG9hZFNsb3QubmFtZSwgY2FsbGJhY2spXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcdTY1MzZcdTk2QzZcdTcyNjlcdTUzNEZcdThCQUVcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGNsYXNzIFByZWZhYkV2dENvbGxlY3Rpb24ge1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAoXHU1QkEyXHU2MjM3XHU3QUVGKVx1NjI1M1x1NUYwMFx1NjUzNlx1OTZDNlx1NzI2OVVJXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBvcGVuQ29sbGVjdGlvblVJKCkge1xyXG4gICAgICAgICAgICBjYWxsTG9jYWxGdW5jKHRoaXMubmFtZSwgdGhpcy5vbk9wZW5Db2xsZWN0aW9uVUkubmFtZSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIChcdTVCQTJcdTYyMzdcdTdBRUYpXHU3NkQxXHU1NDJDXHU2NTM2XHU5NkM2XHU3MjY5VUlcdTg4QUJcdTYyNTNcdTVGMDBcclxuICAgICAgICAgKiBAcGFyYW0gY2FsbGJhY2sgXHJcbiAgICAgICAgICogQHJldHVybnMgXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBvbk9wZW5Db2xsZWN0aW9uVUkoY2FsbGJhY2s6ICgpID0+IHZvaWQpOiBFdmVudHMuRXZlbnRMaXN0ZW5lciB7XHJcbiAgICAgICAgICAgIHJldHVybiBvbkZ1bmModGhpcy5uYW1lLCB0aGlzLm9uT3BlbkNvbGxlY3Rpb25VSS5uYW1lLCBjYWxsYmFjaylcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIChcdTUzQ0NcdTdBRUYpXHU4M0I3XHU1Rjk3XHU2NTM2XHU5NkM2XHU3MjY5XHJcbiAgICAgICAgICogQHBhcmFtIHNlbmRlckd1aWQgXHJcbiAgICAgICAgICogQHBhcmFtIHRhcmdldEd1aWQgXHJcbiAgICAgICAgICogQHBhcmFtIGF0bGFzSWQgXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBhZGRDb2xsZWN0aW9uKGF0bGFzSWQ6IHN0cmluZywgY2hhckd1aWQ6IHN0cmluZykge1xyXG4gICAgICAgICAgICBjYWxsRnVuYyh0aGlzLm5hbWUsIHRoaXMub25BZGRDb2xsZWN0aW9uLm5hbWUsIGF0bGFzSWQsIGNoYXJHdWlkKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogKFx1NTNDQ1x1N0FFRilcdTgzQjdcdTUzRDZcdTYyNDBcdTY3MDlcdTVERjJcdTdFQ0ZcdTY1MzZcdTk2QzZcdTc2ODRcdTcyNjlcdTU0QzFcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGdldEFsbENvbGxlY3Rpb24oY2hhckd1aWQ6IHN0cmluZyk6IHN0cmluZ1tdIHtcclxuICAgICAgICAgICAgcmV0dXJuIGNhbGxGdW5jUmVzKHRoaXMubmFtZSwgdGhpcy5nZXRBbGxDb2xsZWN0aW9uLm5hbWUsIGNoYXJHdWlkKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogKFx1NTNDQ1x1N0FFRilcdTc2RDFcdTU0MkNcdTgzQjdcdTVGOTdcdTY1MzZcdTk2QzZcdTcyNjlcclxuICAgICAgICAgKiBAcGFyYW0gY2FsbGJhY2sgXHU1NkRFXHU4QzAzXHJcbiAgICAgICAgICogQHJldHVybnMgXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBvbkFkZENvbGxlY3Rpb24oY2FsbGJhY2s6IChhdGxhc0lkOiBzdHJpbmcsIGNoYXJHdWlkOiBzdHJpbmcpID0+IHZvaWQpOiBFdmVudHMuRXZlbnRMaXN0ZW5lciB7XHJcbiAgICAgICAgICAgIHJldHVybiBvbkZ1bmModGhpcy5uYW1lLCB0aGlzLm9uQWRkQ29sbGVjdGlvbi5uYW1lLCBjYWxsYmFjaylcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgUHJlZmFiRXZ0Q3VycmVuY3kge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIChcdTUzQ0NcdTdBRUYpXHU2NTM5XHU1M0Q4XHU4RDI3XHU1RTAxXHU3Njg0XHU1MDNDXHJcbiAgICAgICAgICogQHBhcmFtIHRhcmdldEd1aWQgXHU2NTM5XHU1M0Q4XHU3Njg0XHU1QkY5XHU4QzYxXHJcbiAgICAgICAgICogQHBhcmFtIGN1cnJlbmN5SWQgXHU4RDI3XHU1RTAxSWRcclxuICAgICAgICAgKiBAcGFyYW0gY2hhbmdlTnVtIFx1NjUzOVx1NTNEOFx1NzY4NFx1NjU3MFx1NzZFRVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgY2hhbmdlQ3VycmVuY3kodGFyZ2V0R3VpZDogc3RyaW5nLCBjdXJyZW5jeUlkOiBudW1iZXIsIGNoYW5nZU51bTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIGNhbGxGdW5jKHRoaXMubmFtZSwgdGhpcy5vbkNoYW5nZUN1cnJlbmN5Lm5hbWUsIHRhcmdldEd1aWQsIGN1cnJlbmN5SWQsIGNoYW5nZU51bSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIChcdTUzQ0NcdTdBRUYpXHU3NkQxXHU1NDJDXHU2NTM5XHU1M0Q4XHU4RDI3XHU1RTAxXHU3Njg0XHU1MDNDXHJcbiAgICAgICAgICogQHBhcmFtIHRhcmdldEd1aWQgXHU2NTM5XHU1M0Q4XHU3Njg0XHU1QkY5XHU4QzYxXHJcbiAgICAgICAgICogQHBhcmFtIGN1cnJlbmN5SWQgXHU4RDI3XHU1RTAxSWRcclxuICAgICAgICAgKiBAcGFyYW0gY2hhbmdlTnVtIFx1NjUzOVx1NTNEOFx1NzY4NFx1NjU3MFx1NzZFRVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgb25DaGFuZ2VDdXJyZW5jeShjYWxsYmFjazogKHRhcmdldEd1aWQ6IHN0cmluZywgY3VycmVuY3lJZDogbnVtYmVyLCBjaGFuZ2VOdW06IG51bWJlciwgcmVzTnVtOiBudW1iZXIpID0+IHZvaWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG9uRnVuYyh0aGlzLm5hbWUsIHRoaXMub25DaGFuZ2VDdXJyZW5jeS5uYW1lLCBjYWxsYmFjaylcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFx1RkYwOFx1NTNDQ1x1N0FFRlx1RkYwOVx1NkQ4OFx1OEQzOVxyXG4gICAgICAgICAqIEBwYXJhbSB0YXJnZXRHdWlkIFx1NzZFRVx1NjgwN2d1aWRcclxuICAgICAgICAgKiBAcGFyYW0gY3VycmVuY3lJZCBcdThEMjdcdTVFMDFJZFxyXG4gICAgICAgICAqIEBwYXJhbSBwcmljZSBcdTRFRjdcdTRGNERcclxuICAgICAgICAgKiBAcmV0dXJucyBcdTY2MkZcdTU0MjZcdTZEODhcdThEMzlcdTYyMTBcdTUyOUZcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGFzeW5jIGJ1eVdpdGhDdXJyZW5jeSh0YXJnZXRHdWlkOiBzdHJpbmcsIGN1cnJlbmN5SWQ6IG51bWJlciwgcHJpY2U6IG51bWJlcik6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG4gICAgICAgICAgICBpZiAoU3lzdGVtVXRpbC5pc0NsaWVudCgpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYXdhaXQgTW9kdWxlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1vZHVsZShQcmVmYWJFdmVudE1vZHVsZUMpLmJ1eVdpdGhDdXJyZW5jeSh0YXJnZXRHdWlkLCBjdXJyZW5jeUlkLCBwcmljZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBhd2FpdCBNb2R1bGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TW9kdWxlKFByZWZhYkV2ZW50TW9kdWxlUykubmV0X0J1eVdpdGhDdXJyZW5jeSh0YXJnZXRHdWlkLCBjdXJyZW5jeUlkLCBwcmljZSlcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIChcdTUzQ0NcdTdBRUYpXHJcbiAgICAgICAgICogQHBhcmFtIHRhcmdldEd1aWQgXHU3NkVFXHU2ODA3Z3VpZCBcclxuICAgICAgICAgKiBAcGFyYW0gY3VycmVuY3lJZCBcdThEMjdcdTVFMDFpZFxyXG4gICAgICAgICAqIEByZXR1cm5zIFx1OEQyN1x1NUUwMVx1NTAzQ1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZ2V0Q3VycmVuY3lOdW0odGFyZ2V0R3VpZDogc3RyaW5nLCBjdXJyZW5jeUlkOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gY2FsbEZ1bmNSZXModGhpcy5uYW1lLCB0aGlzLmdldEN1cnJlbmN5TnVtLm5hbWUsIHRhcmdldEd1aWQsIGN1cnJlbmN5SWQpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiBcdTVCQTBcdTcyNjlcdTc2RjhcdTUxNzNcdTRFOEJcdTRFRjYgKi9cclxuICAgIGV4cG9ydCBjbGFzcyBQcmVmYWJFdnRQZXQge1xyXG4gICAgICAgIC8qKiBcdTYyNTNcdTVGMDBcdTVCQTBcdTcyNjlcdTc1NENcdTk3NjIgKi9cclxuICAgICAgICBwdWJsaWMgc3RhdGljIG9wZW5VSSgpIHtcclxuICAgICAgICAgICAgY2FsbExvY2FsRnVuYyh0aGlzLm5hbWUsIHRoaXMub3BlblVJLm5hbWUpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFx1NkRGQlx1NTJBMFx1NUJBMFx1NzI2OVxyXG4gICAgICAgICAqIEBwYXJhbSB0YXJnZXRHdWlkIFx1NzNBOVx1NUJCNlx1ODlEMlx1ODI3Mmd1aWRcclxuICAgICAgICAgKiBAcGFyYW0gcGV0Q2ZnSWQgXHU1QkEwXHU3MjY5XHU5MTREXHU3RjZFXHU4ODY4aWQgXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBhZGRQZXQodGFyZ2V0R3VpZDogc3RyaW5nLCBwZXRDZmdJZDogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlcyA9IGNhbGxGdW5jKHRoaXMubmFtZSwgdGhpcy5hZGRQZXQubmFtZSwgdGFyZ2V0R3VpZCwgcGV0Q2ZnSWQpXHJcbiAgICAgICAgICAgIHJldHVybiByZXNcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogIFx1NzlGQlx1OTY2NFx1NUJBMFx1NzI2OVxyXG4gICAgICAgICAqIEBwYXJhbSB0YXJnZXRHdWlkICAgIFx1NzNBOVx1NUJCNlx1ODlEMlx1ODI3Mmd1aWRcclxuICAgICAgICAgKiBAcGFyYW0gcGV0SWQgICAgICAgXHU1QkEwXHU3MjY5Z3VpZFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgcmVtb3ZlUGV0KHRhcmdldEd1aWQ6IHN0cmluZywgcGV0SWQ6IHN0cmluZykge1xyXG4gICAgICAgICAgICBjb25zdCByZXMgPSBjYWxsRnVuYyh0aGlzLm5hbWUsIHRoaXMucmVtb3ZlUGV0Lm5hbWUsIHRhcmdldEd1aWQsIHBldElkKVxyXG4gICAgICAgICAgICByZXR1cm4gcmVzXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFx1OTA0N1x1NTIzMFx1NzBCOVx1OTVFRVx1OTg5OFx1NEUwRFx1NzdFNVx1OTA1M1x1NjAwRVx1NEU0OFx1ODNCN1x1NTNENlx1NUJBMFx1NzI2OVx1NTIxN1x1ODg2OFxyXG4gICAgICAgIC8vIHB1YmxpYyBzdGF0aWMgZ2V0UGV0cyh0YXJnZXRHdWlkOiBzdHJpbmcpOiBzdHJpbmdbXSB7XHJcbiAgICAgICAgLy8gICAgIGNvbnN0IHJlcyA9IGNhbGxGdW5jUmVzKHRoaXMubmFtZSwgdGhpcy5nZXRQZXRzLm5hbWUsIHRhcmdldEd1aWQpXHJcbiAgICAgICAgLy8gICAgIHJldHVybiByZXNcclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIFx1ODhDNVx1NjI2RVx1NzZGOFx1NTE3M1x1NEU4Qlx1NEVGNiAqL1xyXG4gICAgZXhwb3J0IGNsYXNzIFByZWZhYkV2dERyZXNzIHtcclxuICAgICAgICAvKiogXHU2MjUzXHU1RjAwXHU4OEM1XHU2MjZFXHU3NTRDXHU5NzYyICovXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBvcGVuVUkoKSB7XHJcbiAgICAgICAgICAgIGNhbGxMb2NhbEZ1bmModGhpcy5uYW1lLCB0aGlzLm9wZW5VSS5uYW1lKVxyXG4gICAgICAgIH1cclxuICAgICAgICAvKiogXHU2REZCXHU1MkEwXHU4OEM1XHU2MjZFICovXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBhZGREcmVzcyh0YXJnZXRHdWlkOiBzdHJpbmcsIGRyZXNzQ2ZnSWQ6IG51bWJlcikge1xyXG4gICAgICAgICAgICBjb25zdCByZXMgPSBjYWxsRnVuYyh0aGlzLm5hbWUsIHRoaXMuYWRkRHJlc3MubmFtZSwgdGFyZ2V0R3VpZCwgZHJlc3NDZmdJZClcclxuICAgICAgICAgICAgcmV0dXJuIHJlc1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGluaXRFdmVudCgpXHJcblxyXG59XHJcbiIsICIvKlxyXG4qIEBBdXRob3I6IGNoZW4ubGlhbmcgY2hlbi5saWFuZ0BhcHBzaGFoZS5jb21cclxuKiBARGF0ZTogMjAyMy0wNS0wNCAxNDoxNzoyNVxyXG4qIEBMYXN0RWRpdG9yczogY2hlbi5saWFuZyBjaGVuLmxpYW5nQGFwcHNoYWhlLmNvbVxyXG4qIEBMYXN0RWRpdFRpbWU6IDIwMjMtMDctMTggMTg6NDM6MjFcclxuKiBARmlsZVBhdGg6IFxcY29tbW9ucHJlZmFiXFxKYXZhU2NyaXB0c1xcUHJlZmFic1xccHJlZmFiRXZlbnRcXFV0aWxzXFxNYXBFeC50c1xyXG4qIEBEZXNjcmlwdGlvbjogXHJcbiovXHJcblxyXG5pbXBvcnQgeyBQcmVmYWJFdmVudCB9IGZyb20gXCIuL1ByZWZhYkV2ZW50XCJcclxuLyoqXHJcbiAqIE1hcEV4KFx1NTNFRlx1NUU4Rlx1NTIxN1x1NTMxNilcclxuKi9cclxuZXhwb3J0IG5hbWVzcGFjZSBNYXBFeCB7XHJcblxyXG4gICAgZXhwb3J0IHR5cGUgTWFwRXhDbGFzczxUPiA9IHtcclxuICAgICAgICBba2V5OiBzdHJpbmcgfCBudW1iZXJdOiBUXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcdTY2MkZcdTU0MjZcdTRFM0FcdTdBN0FcclxuICAgICAqIEBwYXJhbSBtYXAgXHJcbiAgICAgKiBAcmV0dXJucyBcdTY2MkYvXHU1NDI2IFxyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gaXNOdWxsPFQ+KG1hcDogTWFwRXhDbGFzczxUPik6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiAhbWFwIHx8IG1hcCA9PSBudWxsIHx8IG1hcCA9PSB1bmRlZmluZWRcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFx1ODNCN1x1NTNENlx1NUJGOVx1OEM2MVxyXG4gICAgICogQHBhcmFtIG1hcCBcclxuICAgICAqIEBwYXJhbSBrZXkgXHJcbiAgICAgKiBAcmV0dXJucyBcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGdldDxUPihtYXA6IE1hcEV4Q2xhc3M8VD4sIGtleTogc3RyaW5nIHwgbnVtYmVyKTogVCB7XHJcblxyXG4gICAgICAgIGlmIChtYXBba2V5XSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbWFwW2tleV1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBoYXMgPSBmYWxzZVxyXG4gICAgICAgIGxldCBrZXlzID0gT2JqZWN0LmtleXMobWFwKVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoIDsrK2kpIHtcclxuICAgICAgICAgICAgaWYgKGtleXNbaV0gPT0ga2V5KSB7XHJcbiAgICAgICAgICAgICAgICBoYXMgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaGFzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtYXBba2V5XVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbFxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFx1OEJCRVx1N0Y2RVx1NUJGOVx1OEM2MVxyXG4gICAgICogQHBhcmFtIG1hcCBcclxuICAgICAqIEBwYXJhbSBrZXkgXHJcbiAgICAgKiBAcGFyYW0gdmFsIFxyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gc2V0PFQ+KG1hcDogTWFwRXhDbGFzczxUPiwga2V5OiBzdHJpbmcgfCBudW1iZXIsIHZhbDogVCkge1xyXG5cclxuICAgICAgICBtYXBba2V5XSA9IHZhbFxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFx1NTIyMFx1OTY2NFx1NUJGOVx1OEM2MVxyXG4gICAgICogQHBhcmFtIG1hcCBcclxuICAgICAqIEBwYXJhbSBrZXkgXHJcbiAgICAgKiBAcmV0dXJucyBcdTYyMTBcdTUyOUYvXHU1OTMxXHU4RDI1XHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBkZWw8VD4obWFwOiBNYXBFeENsYXNzPFQ+LCBrZXk6IHN0cmluZyB8IG51bWJlcik6IGJvb2xlYW4ge1xyXG5cclxuICAgICAgICBpZiAobWFwW2tleV0pIHtcclxuICAgICAgICAgICAgZGVsZXRlIG1hcFtrZXldXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgaGFzID0gZmFsc2VcclxuICAgICAgICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKG1hcClcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgIGlmIChrZXlzW2ldID09IGtleSkge1xyXG4gICAgICAgICAgICAgICAgaGFzID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGhhcykge1xyXG4gICAgICAgICAgICBkZWxldGUgbWFwW2tleV1cclxuICAgICAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcdTY2MkZcdTU0MjZcdTY3MDlcdTYzMDdcdTVCOUFcdTVCRjlcdThDNjFcclxuICAgICAqIEBwYXJhbSBtYXAgXHJcbiAgICAgKiBAcGFyYW0ga2V5IFxyXG4gICAgICogQHJldHVybnMgXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBoYXM8VD4obWFwOiBNYXBFeENsYXNzPFQ+LCBrZXk6IHN0cmluZyB8IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChtYXBba2V5XSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGhhcyA9IGZhbHNlXHJcbiAgICAgICAgbGV0IGtleXMgPSBPYmplY3Qua2V5cyhtYXApXHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwIDtpIDwga2V5cy5sZW5ndGggOysraSkge1xyXG4gICAgICAgICAgICBpZiAoa2V5c1tpXSA9PSBrZXkpIHtcclxuICAgICAgICAgICAgICAgIGhhcyA9IHRydWVcclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChoYXMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcdTgzQjdcdTUzRDZjb3VudFx1NjU3MFx1OTFDRlxyXG4gICAgICogQHBhcmFtIG1hcCBcclxuICAgICAqIEBwYXJhbSBrZXkgXHJcbiAgICAgKiBAcmV0dXJucyBcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGNvdW50PFQ+KG1hcDogTWFwRXhDbGFzczxUPik6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IHJlcyA9IDBcclxuICAgICAgICBmb3JFYWNoKG1hcCwgZSA9PiB7XHJcbiAgICAgICAgICAgICsrcmVzXHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gcmVzXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcdTkwNERcdTUzODZtYXBcclxuICAgICAqIEBwYXJhbSBtYXAgXHJcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sgXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBmb3JFYWNoPFQ+KG1hcDogTWFwRXhDbGFzczxUPiwgY2FsbGJhY2s6IChrZXk6IHN0cmluZyB8IG51bWJlciwgZWxlbWVudDogVCkgPT4gdm9pZCkge1xyXG4gICAgICAgIGZvciAobGV0IGtleSBpbiBtYXApIHtcclxuICAgICAgICAgICAgaWYgKG1hcFtrZXldKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhrZXksIG1hcFtrZXldKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHU2MkY3XHU4RDFEXHVGRjBDVmFsXHU4RkQ4XHU2NjJGXHU1RjE1XHU3NTI4XHU1MUZBXHU2NzY1XHU3Njg0XHVGRjBDXHU1M0VBXHU2NjJGTWFwXHU2MzYyXHU0RTg2XHJcbiAgICAgKiBAcGFyYW0gbWFwIFxyXG4gICAgICogQHJldHVybnMgXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBjb3B5PFQ+KG1hcDogTWFwRXhDbGFzczxUPik6IE1hcEV4Q2xhc3M8VD4ge1xyXG4gICAgICAgIGxldCByZXMgPSB7fVxyXG4gICAgICAgIGZvciAobGV0IGtleSBpbiBtYXApIHtcclxuICAgICAgICAgICAgcmVzW2tleV0gPSBtYXBba2V5XVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzXHJcbiAgICB9XHJcblxyXG59XHJcbmNsYXNzIERCU2F2ZUJhc2Uge1xyXG4gICAgcHVibGljIHZhbHVlOiBhbnlcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFByZWZhYkV2ZW50TW9kdWxlRGF0YSBleHRlbmRzIFN1YmRhdGEge1xyXG5cclxuICAgIEBEZWNvcmF0b3Iuc2F2ZVByb3BlcnR5XHJcbiAgICBwdWJsaWMgY2FjaGVEYXRhOiBNYXBFeC5NYXBFeENsYXNzPHN0cmluZz4gPSBudWxsXHJcblxyXG4gICAgcHJvdGVjdGVkIGluaXREZWZhdWx0RGF0YSgpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuY2FjaGVEYXRhID09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5jYWNoZURhdGEgPSB7fVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcdThCQkVcdTdGNkVWYWx1ZVxyXG4gICAgICogQHBhcmFtIGtleSBcclxuICAgICAqIEBwYXJhbSB2YWwgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRWYWx1ZShrZXk6IHN0cmluZywgdmFsOiBhbnkpIHtcclxuICAgICAgICBsZXQgZGF0YSA9IG5ldyBEQlNhdmVCYXNlKClcclxuICAgICAgICBkYXRhLnZhbHVlID0gdmFsXHJcbiAgICAgICAgbGV0IGRhdGFTdHIgPSBKU09OLnN0cmluZ2lmeShkYXRhKVxyXG4gICAgICAgIE1hcEV4LnNldCh0aGlzLmNhY2hlRGF0YSwga2V5LCBkYXRhU3RyKVxyXG4gICAgICAgIHRoaXMuc2F2ZSh0cnVlKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHU4M0I3XHU1M0Q2VmFsdWVcclxuICAgICAqIEBwYXJhbSBrZXkgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRWYWx1ZTxUPihrZXk6IHN0cmluZyk6IFQge1xyXG4gICAgICAgIGlmICghTWFwRXguaGFzKHRoaXMuY2FjaGVEYXRhLCBrZXkpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCB2YWx1ZSA9IE1hcEV4LmdldCh0aGlzLmNhY2hlRGF0YSwga2V5KVxyXG4gICAgICAgIGxldCByZXMgPSBKU09OLnBhcnNlKHZhbHVlKSBhcyBEQlNhdmVCYXNlXHJcbiAgICAgICAgcmV0dXJuIHJlcy52YWx1ZVxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuQENvcmUuVHlwZVxyXG5jbGFzcyBQcmVmYWJFdmVudEFpcnBvcnREYXRhIHtcclxuXHJcbiAgICBwdWJsaWMgY2FjaGVEYXRhOiBNYXBFeC5NYXBFeENsYXNzPHN0cmluZz4gPSB7fVxyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihfY2FjaGVEYXRhPzogYW55KSB7XHJcbiAgICAgICAgaWYgKF9jYWNoZURhdGEgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLmNhY2hlRGF0YSA9IF9jYWNoZURhdGFcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcdThCQkVcdTdGNkVWYWx1ZVxyXG4gICAgICogQHBhcmFtIGtleSBcclxuICAgICAqIEBwYXJhbSB2YWwgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRWYWx1ZShrZXk6IHN0cmluZywgdmFsOiBhbnkpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIltQRl1zZXQgVmFsZSA6IFwiICsga2V5ICsgXCIgPT4gXCIgKyB2YWwpXHJcbiAgICAgICAgbGV0IGRhdGEgPSBuZXcgREJTYXZlQmFzZSgpXHJcbiAgICAgICAgZGF0YS52YWx1ZSA9IHZhbFxyXG4gICAgICAgIGxldCBkYXRhU3RyID0gSlNPTi5zdHJpbmdpZnkoZGF0YSlcclxuICAgICAgICBNYXBFeC5zZXQodGhpcy5jYWNoZURhdGEsIGtleSwgZGF0YVN0cilcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFx1ODNCN1x1NTNENlZhbHVlXHJcbiAgICAgKiBAcGFyYW0ga2V5IFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0VmFsdWU8VD4oa2V5OiBzdHJpbmcpOiBUIHtcclxuICAgICAgICBpZiAoIU1hcEV4Lmhhcyh0aGlzLmNhY2hlRGF0YSwga2V5KSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbFxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgdmFsdWUgPSBNYXBFeC5nZXQodGhpcy5jYWNoZURhdGEsIGtleSlcclxuICAgICAgICBsZXQgcmVzID0gSlNPTi5wYXJzZSh2YWx1ZSkgYXMgREJTYXZlQmFzZVxyXG4gICAgICAgIHJldHVybiByZXMudmFsdWVcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBQcmVmYWJFdmVudE1vZHVsZUMgZXh0ZW5kcyBNb2R1bGVDPFByZWZhYkV2ZW50TW9kdWxlUywgUHJlZmFiRXZlbnRNb2R1bGVEYXRhPiB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcdTdBN0FcdTRFMkRcdTY1NzBcdTYzNkVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFpckRhdGE6IE1hcEV4Lk1hcEV4Q2xhc3M8UHJlZmFiRXZlbnRBaXJwb3J0RGF0YT4gPSB7fVxyXG5cclxuICAgIG9uU3RhcnQoKSB7XHJcbiAgICAgICAgUHJlZmFiRXZlbnQuUHJlZmFiRXZ0UGxheWVyU3RhdC5vblNldFBsYXllclN0YXQoKHNlbmRlckd1aWQ6IHN0cmluZywgdGFyZ2V0R3VpZDogc3RyaW5nLCBzdGF0OiBQcmVmYWJFdmVudC5QbGF5ZXJTdGF0VHlwZSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgY2hhciA9IEdhbWVwbGF5LmdldEN1cnJlbnRQbGF5ZXIoKS5jaGFyYWN0ZXJcclxuICAgICAgICAgICAgaWYgKHRhcmdldEd1aWQgPT0gY2hhci5ndWlkKSB7XHJcbiAgICAgICAgICAgICAgICAvL2xldCBwcmVmYWJFdmVVSSA9IFVJLlVJTWFuYWdlci5pbnN0YW5jZS5nZXRVSShQcmVmYWJFdnRVSSlcclxuICAgICAgICAgICAgICAgIGlmIChzdGF0ID09IFByZWZhYkV2ZW50LlBsYXllclN0YXRUeXBlLkZseWluZykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNoYXIuc3dpdGNoVG9GbHlpbmcoKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vVUkuVUlNYW5hZ2VyLmluc3RhbmNlLnNob3dVSShwcmVmYWJFdmVVSSlcclxuICAgICAgICAgICAgICAgICAgICAvL3ByZWZhYkV2ZVVJLnNldEZseUNhbnZhcyh0cnVlKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoc3RhdCA9PSBQcmVmYWJFdmVudC5QbGF5ZXJTdGF0VHlwZS5XYWxraW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hhci5zd2l0Y2hUb1dhbGtpbmcoKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vVUkuVUlNYW5hZ2VyLmluc3RhbmNlLmhpZGVVSShwcmVmYWJFdmVVSSlcclxuICAgICAgICAgICAgICAgICAgICAvL3ByZWZhYkV2ZVVJLnNldEZseUNhbnZhcyhmYWxzZSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcdTU0MENcdTZCNjVcdTdBN0FcdTRFMkRcdTY1NzBcdTYzNkVcclxuICAgICAqIEBwYXJhbSBkYXRhIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbmV0X1N5bmNBaXJEYXRhKGRhdGE6IHN0cmluZykge1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIltQRl0gc3luYyBhaXIgZGF0YSA6IFwiICsgZGF0YSlcclxuICAgICAgICB0aGlzLmFpckRhdGEgPSBKU09OLnBhcnNlKGRhdGEpXHJcbiAgICAgICAgTWFwRXguZm9yRWFjaCh0aGlzLmFpckRhdGEsIChrLCB2KSA9PiB7XHJcblxyXG4gICAgICAgICAgICBNYXBFeC5zZXQodGhpcy5haXJEYXRhLCBrLCBuZXcgUHJlZmFiRXZlbnRBaXJwb3J0RGF0YSh2LmNhY2hlRGF0YSkpXHJcblxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHU1NDBDXHU2QjY1XHU2NzBEXHU1MkExXHU1NjY4XHU3QTdBXHU0RTJEXHU2NTcwXHU2MzZFXHJcbiAgICAgKiBAcGFyYW0gdGFyZ2V0R3VpZCBcclxuICAgICAqIEBwYXJhbSBrZXkgXHJcbiAgICAgKiBAcGFyYW0gZGF0YSBcclxuICAgICAqL1xyXG4gICAgcHVibGljIG5ldF9TZXREYXRhKHRhcmdldEd1aWQ6IHN0cmluZywga2V5OiBzdHJpbmcsIGRhdGE6IGFueSkge1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIlx1NUJBMlx1NjIzN1x1N0FFRiBuZXRfU2V0RGF0YSA6IFwiICsga2V5ICsgXCIgPT4gXCIgKyBkYXRhKVxyXG5cclxuICAgICAgICBpZiAoIU1hcEV4Lmhhcyh0aGlzLmFpckRhdGEsIHRhcmdldEd1aWQpKSB7XHJcbiAgICAgICAgICAgIE1hcEV4LnNldCh0aGlzLmFpckRhdGEsIHRhcmdldEd1aWQsIG5ldyBQcmVmYWJFdmVudEFpcnBvcnREYXRhKG51bGwpKVxyXG4gICAgICAgIH1cclxuICAgICAgICBNYXBFeC5nZXQodGhpcy5haXJEYXRhLCB0YXJnZXRHdWlkKS5zZXRWYWx1ZShrZXksIGRhdGEpXHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHU4M0I3XHU1M0Q2XHU3QTdBXHU0RTJEXHU2NTcwXHU2MzZFXHJcbiAgICAgKiBAcGFyYW0gdGFyZ2V0R3VpZCBcclxuICAgICAqIEBwYXJhbSBrZXkgXHJcbiAgICAgKiBAcmV0dXJucyBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldERhdGE8VD4odGFyZ2V0R3VpZDogc3RyaW5nLCBrZXk6IHN0cmluZyk6IFQge1xyXG4gICAgICAgIGxldCByZXM6IFQgPSBudWxsXHJcblxyXG4gICAgICAgIGlmICghTWFwRXguZ2V0KHRoaXMuYWlyRGF0YSwgdGFyZ2V0R3VpZCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXMgPSBNYXBFeC5nZXQodGhpcy5haXJEYXRhLCB0YXJnZXRHdWlkKS5nZXRWYWx1ZShrZXkpIGFzIFRcclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogKFx1NTNDQ1x1N0FFRilcdTgzQjdcdTUzRDZcdTczQTlcdTVCQjZcdTRGRTFcdTYwNkZcclxuICAgICAqIEBwYXJhbSBzZW5kZXJHdWlkIFx1NTNEMVx1OEQ3N1x1NUJGOVx1OEM2MUd1aWRcclxuICAgICAqIEBwYXJhbSB0YXJnZXRHdWlkIFx1NzZFRVx1NjgwN1x1NUJGOVx1OEM2MUd1aWRcclxuICAgICAqIEBwYXJhbSB2YWwgXHU1MDNDXHJcbiAgICAgKiBAcGFyYW0gaW5mb1R5cGUgXHU0RkUxXHU2MDZGXHU3QzdCXHU1NzhCXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRQbGF5ZXJJbmZvKGNsYXp6TmFtZTogc3RyaW5nLCB0YXJnZXRHdWlkOiBzdHJpbmcsIGluZm9UeXBlOiBQcmVmYWJFdmVudC5QbGF5ZXJJbmZvVHlwZSB8IHN0cmluZykge1xyXG4gICAgICAgIGxldCBjaGFyID0gQ29yZS5HYW1lT2JqZWN0LmZpbmQodGFyZ2V0R3VpZClcclxuICAgICAgICBpZiAoY2hhciBpbnN0YW5jZW9mIEdhbWVwbGF5LkNoYXJhY3Rlcikge1xyXG4gICAgICAgICAgICBpZiAoY2hhci5wbGF5ZXIpIHtcclxuICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9IHRoaXMuZGF0YT8uZ2V0VmFsdWUoY2xhenpOYW1lICsgaW5mb1R5cGUpXHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKHZhbHVlICsgXCI6XCIgKyBjbGF6ek5hbWUgKyBpbmZvVHlwZSlcclxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PSBudWxsKSB2YWx1ZSA9IDBcclxuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcdTgzQjdcdTUzRDZcdTczQTlcdTVCQjZcdTVDNUVcdTYwMjdcclxuICAgICAqIEBwYXJhbSB0YXJnZXRHdWlkIFxyXG4gICAgICogQHBhcmFtIHZhbCBcclxuICAgICAqIEBwYXJhbSBhdHRyVHlwZSBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldEF0dHJWYWwoY2xhenpOYW1lOiBzdHJpbmcsIHRhcmdldEd1aWQ6IHN0cmluZywgYXR0clR5cGU6IFByZWZhYkV2ZW50LkF0dHJUeXBlKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgY3VyVmFsID0gdGhpcy5nZXREYXRhPG51bWJlcj4odGFyZ2V0R3VpZCwgY2xhenpOYW1lICsgYXR0clR5cGUpXHJcbiAgICAgICAgaWYgKGN1clZhbCA9PSBudWxsKSBjdXJWYWwgPSAwXHJcbiAgICAgICAgLy9jb25zb2xlLmVycm9yKFwiXHU4M0I3XHU1M0Q2XHU3M0E5XHU1QkI2XHU1QzVFXHU2MDI3IDogXCIgKyBhdHRyVHlwZSArIFwiIDogXCIgKyBjdXJWYWwpXHJcbiAgICAgICAgcmV0dXJuIGN1clZhbFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBcdTgzQjdcdTUzRDZcdTczQTlcdTVCQjZcdTcyQjZcdTYwMDFcclxuICAgICogQHBhcmFtIGNsYXp6TmFtZSBcclxuICAgICogQHBhcmFtIHRhcmdldEd1aWQgXHJcbiAgICAqIEByZXR1cm5zIFxyXG4gICAgKi9cclxuICAgIHB1YmxpYyBnZXRQbGF5ZXJTdGF0KGNsYXp6TmFtZTogc3RyaW5nLCB0YXJnZXRHdWlkOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgY3VyVmFsID0gdGhpcy5nZXREYXRhKGNsYXp6TmFtZSwgdGFyZ2V0R3VpZClcclxuICAgICAgICBpZiAoY3VyVmFsID09IG51bGwpIGN1clZhbCA9IDBcclxuICAgICAgICAvL2NvbnNvbGUuZXJyb3IoXCJcdTgzQjdcdTUzRDZcdTczQTlcdTVCQjZcdTcyQjZcdTYwMDEgOiBcIiArIGN1clZhbClcclxuICAgICAgICByZXR1cm4gY3VyVmFsXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAoXHU1M0NDXHU3QUVGKVx1ODNCN1x1NTNENlx1NTE3M1x1NTM2MVxyXG4gICAgICogQHBhcmFtIHRhcmdldEd1aWQgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRSZWNvcmRQb2ludChjbGF6ek5hbWU6IHN0cmluZywgdGFyZ2V0R3VpZDogc3RyaW5nKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgY2hhciA9IENvcmUuR2FtZU9iamVjdC5maW5kKHRhcmdldEd1aWQpXHJcbiAgICAgICAgaWYgKGNoYXIgaW5zdGFuY2VvZiBHYW1lcGxheS5DaGFyYWN0ZXIpIHtcclxuICAgICAgICAgICAgaWYgKGNoYXIucGxheWVyKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGJ2YWwgPSB0aGlzLmRhdGE/LmdldFZhbHVlKGNsYXp6TmFtZSArIFwicmVjb3JkXCIpIGFzIG51bWJlclxyXG4gICAgICAgICAgICAgICAgaWYgKGRidmFsID09IG51bGwpIGRidmFsID0gMFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRidmFsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcdTgzQjdcdTUzRDZcdTVGNTNcdTUyNERcdTc2ODRcdThEMjdcdTVFMDFcdTY1NzBcdTc2RUVcclxuICAgICAqIEBwYXJhbSBjbGF6ek5hbWUgXHJcbiAgICAgKiBAcGFyYW0gdGFyZ2V0R3VpZCBcclxuICAgICAqIEBwYXJhbSBjdXJyZW5jeUlkIFxyXG4gICAgICogQHJldHVybnMgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRDdXJyZW5jeU51bShjbGF6ek5hbWU6IHN0cmluZywgdGFyZ2V0R3VpZDogc3RyaW5nLCBjdXJyZW5jeUlkOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBjaGFyID0gQ29yZS5HYW1lT2JqZWN0LmZpbmQodGFyZ2V0R3VpZClcclxuICAgICAgICBpZiAoY2hhciBpbnN0YW5jZW9mIEdhbWVwbGF5LkNoYXJhY3Rlcikge1xyXG4gICAgICAgICAgICBpZiAoY2hhci5wbGF5ZXIpIHtcclxuICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9IHRoaXMuZGF0YT8uZ2V0VmFsdWUoY2xhenpOYW1lICsgY3VycmVuY3lJZCkgYXMgbnVtYmVyXHJcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT0gbnVsbCkgdmFsdWUgPSAwXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHU3NTI4XHU4RDI3XHU1RTAxXHU0RTcwXHU0RTFDXHU4OTdGXHJcbiAgICAgKiBAcGFyYW0gdGFyZ2V0R3VpZCBcdThEMkRcdTRFNzBcdTgwMDVcclxuICAgICAqIEBwYXJhbSBjdXJyZW5jeUlkIFx1OEQyN1x1NUUwMWlkXHJcbiAgICAgKiBAcGFyYW0gcHJpY2UgXHU0RUY3XHU2ODNDXHJcbiAgICAgKiBAcmV0dXJucyBcdTY2MkZcdTU0MjZcdThEMkRcdTRFNzBcdTYyMTBcdTUyOUZcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFzeW5jIGJ1eVdpdGhDdXJyZW5jeSh0YXJnZXRHdWlkOiBzdHJpbmcsIGN1cnJlbmN5SWQ6IG51bWJlciwgcHJpY2U6IG51bWJlcik6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLnNlcnZlci5uZXRfQnV5V2l0aEN1cnJlbmN5KHRhcmdldEd1aWQsIGN1cnJlbmN5SWQsIHByaWNlKVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUHJlZmFiRXZlbnRNb2R1bGVTIGV4dGVuZHMgTW9kdWxlUzxQcmVmYWJFdmVudE1vZHVsZUMsIFByZWZhYkV2ZW50TW9kdWxlRGF0YT4ge1xyXG5cclxuICAgIHB1YmxpYyBhaXJEYXRhOiBNYXBFeC5NYXBFeENsYXNzPFByZWZhYkV2ZW50QWlycG9ydERhdGE+ID0ge31cclxuXHJcbiAgICAvKipcclxuICAgICAqIFx1NzNBOVx1NUJCNlx1OEZEQlx1NTE2NVx1NkUzOFx1NjIwRlxyXG4gICAgICogQHBhcmFtIHBsYXllciBcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIG9uUGxheWVyRW50ZXJHYW1lKHBsYXllcjogR2FtZXBsYXkuUGxheWVyKTogdm9pZCB7XHJcbiAgICAgICAgLy8gXHU1NDBDXHU2QjY1XHU0RTAwXHU2QjIxXHU3QTdBXHU0RTJEXHU2NTcwXHU2MzZFXHJcbiAgICAgICAgdGhpcy5nZXRDbGllbnQocGxheWVyKS5uZXRfU3luY0FpckRhdGEoSlNPTi5zdHJpbmdpZnkodGhpcy5haXJEYXRhKSlcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25QbGF5ZXJMZWZ0KHBsYXllcjogR2FtZXBsYXkuUGxheWVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKE1hcEV4Lmhhcyh0aGlzLmFpckRhdGEsIHBsYXllci5jaGFyYWN0ZXIuZ3VpZCkpIHtcclxuICAgICAgICAgICAgTWFwRXguZGVsKHRoaXMuYWlyRGF0YSwgcGxheWVyLmNoYXJhY3Rlci5ndWlkKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcdThCQkVcdTdGNkVcdTczQTlcdTVCQjZcdTdBN0FcdTRFMkRcdTY1NzBcdTYzNkVcclxuICAgICAqIEBwYXJhbSB0YXJnZXRHdWlkIFxyXG4gICAgICogQHBhcmFtIGtleSBcclxuICAgICAqIEBwYXJhbSBkYXRhIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0RGF0YTxUPih0YXJnZXRHdWlkOiBzdHJpbmcsIGtleTogc3RyaW5nLCBkYXRhOiBUKSB7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiW1BGOl1uZXRfU2V0RGF0YVwiKVxyXG4gICAgICAgIHRoaXMuZ2V0QWxsQ2xpZW50KCkubmV0X1NldERhdGEodGFyZ2V0R3VpZCwga2V5LCBkYXRhKVxyXG5cclxuICAgICAgICBpZiAoIU1hcEV4Lmhhcyh0aGlzLmFpckRhdGEsIHRhcmdldEd1aWQpKSB7XHJcbiAgICAgICAgICAgIE1hcEV4LnNldCh0aGlzLmFpckRhdGEsIHRhcmdldEd1aWQsIG5ldyBQcmVmYWJFdmVudEFpcnBvcnREYXRhKCkpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIE1hcEV4LmdldCh0aGlzLmFpckRhdGEsIHRhcmdldEd1aWQpLnNldFZhbHVlKGtleSwgZGF0YSlcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcdTgzQjdcdTUzRDZcdTczQTlcdTVCQjZcdTdBN0FcdTRFMkRcdTY1NzBcdTYzNkVcclxuICAgICAqIEBwYXJhbSB0YXJnZXRHdWlkIFxyXG4gICAgICogQHBhcmFtIGtleSBcclxuICAgICAqIEByZXR1cm5zIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0RGF0YTxUPih0YXJnZXRHdWlkOiBzdHJpbmcsIGtleTogc3RyaW5nKTogVCB7XHJcbiAgICAgICAgbGV0IHJlczogVCA9IG51bGxcclxuXHJcbiAgICAgICAgaWYgKCFNYXBFeC5nZXQodGhpcy5haXJEYXRhLCB0YXJnZXRHdWlkKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJlcyA9IE1hcEV4LmdldCh0aGlzLmFpckRhdGEsIHRhcmdldEd1aWQpLmdldFZhbHVlKGtleSkgYXMgVFxyXG5cclxuICAgICAgICByZXR1cm4gcmVzXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcdTVFN0ZcdTY0QURcdTRFOEJcdTRFRjZcclxuICAgICAqIEBwYXJhbSBjbGF6ek5hbWUgXHJcbiAgICAgKiBAcGFyYW0gZnVuY05hbWUgXHJcbiAgICAgKiBAcGFyYW0gcGFyYW1zIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbm90aWZ5KGNsYXp6TmFtZTogc3RyaW5nLCBmdW5jTmFtZTogc3RyaW5nLCAuLi5wYXJhbXM6IGFueVtdKSB7XHJcbiAgICAgICAgRXZlbnRzLmRpc3BhdGNoVG9BbGxDbGllbnQoUHJlZmFiRXZlbnQuX29uRXZlbnROZXRLZXksIGNsYXp6TmFtZSwgZnVuY05hbWUsIC4uLnBhcmFtcylcclxuICAgICAgICBFdmVudHMuZGlzcGF0Y2hMb2NhbChQcmVmYWJFdmVudC5fb25FdmVudEtleSArIFwiOlwiICsgY2xhenpOYW1lICsgXCI6XCIgKyBmdW5jTmFtZSwgLi4ucGFyYW1zKVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFByZWZhYkV2ZW50Ll9vbkV2ZW50S2V5ICsgXCI6XCIgKyBjbGF6ek5hbWUgKyBcIjpcIiArIGZ1bmNOYW1lLCAuLi5wYXJhbXMpXHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogKFx1NTNDQ1x1N0FFRilcdTZERkJcdTUyQTBcdTVDNUVcdTYwMjdcclxuICAgICAqIEBwYXJhbSBzZW5kZXJHdWlkIFx1NTNEMVx1OEQ3N1x1NUJGOVx1OEM2MUd1aWRcclxuICAgICAqIEBwYXJhbSB0YXJnZXRHdWlkIFx1NzZFRVx1NjgwN1x1NUJGOVx1OEM2MUd1aWRcclxuICAgICAqIEBwYXJhbSB2YWwgXHU1MDNDXHJcbiAgICAgKiBAcGFyYW0gYXR0clR5cGUgXHU1QzVFXHU2MDI3XHU3QzdCXHU1NzhCXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvblNldEF0dHJWYWwoY2xhenpOYW1lOiBzdHJpbmcsIHNlbmRlckd1aWQ6IHN0cmluZywgdGFyZ2V0R3VpZDogc3RyaW5nLCB2YWw6IG51bWJlciwgYXR0clR5cGU6IFByZWZhYkV2ZW50LkF0dHJUeXBlKSB7XHJcbiAgICAgICAgbGV0IGN1clZhbCA9IDBcclxuXHJcbiAgICAgICAgY3VyVmFsID0gdmFsXHJcblxyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh0YXJnZXRHdWlkLCBjbGF6ek5hbWUgKyBhdHRyVHlwZSwgY3VyVmFsKVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiW1BGOl1cdThCQkVcdTdGNkVcdTczQTlcdTVCQjZcdTVDNUVcdTYwMjcgOiBcIiArIGF0dHJUeXBlICsgXCIgOiBcIiArIGN1clZhbClcclxuICAgICAgICBsZXQgY2hhciA9IENvcmUuR2FtZU9iamVjdC5maW5kKHRhcmdldEd1aWQpXHJcblxyXG4gICAgICAgIGlmIChjaGFyIGluc3RhbmNlb2YgR2FtZXBsYXkuQ2hhcmFjdGVyKSB7XHJcbiAgICAgICAgICAgIGlmIChhdHRyVHlwZSA9PSBQcmVmYWJFdmVudC5BdHRyVHlwZS5KdW1wKSB7XHJcbiAgICAgICAgICAgICAgICBjaGFyLm1heEp1bXBIZWlnaHQgPSBjdXJWYWxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoYXR0clR5cGUgPT0gUHJlZmFiRXZlbnQuQXR0clR5cGUuU3BlZWQpIHtcclxuICAgICAgICAgICAgICAgIGNoYXIubWF4V2Fsa1NwZWVkID0gY3VyVmFsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubm90aWZ5KGNsYXp6TmFtZSwgUHJlZmFiRXZlbnQuUHJlZmFiRXZ0QXR0ci5vbkNoYW5nZUF0dHJWYWwubmFtZSwgc2VuZGVyR3VpZCwgdGFyZ2V0R3VpZCwgY3VyVmFsLCBhdHRyVHlwZSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFx1NkRGQlx1NTJBMFx1NUM1RVx1NjAyN1xyXG4gICAgICogQHBhcmFtIHNlbmRlckd1aWQgXHU1M0QxXHU4RDc3XHU1QkY5XHU4QzYxR3VpZFxyXG4gICAgICogQHBhcmFtIHRhcmdldEd1aWQgXHU3NkVFXHU2ODA3XHU1QkY5XHU4QzYxR3VpZFxyXG4gICAgICogQHBhcmFtIHZhbCBcdTUwM0NcclxuICAgICAqIEBwYXJhbSBhdHRyVHlwZSBcdTVDNUVcdTYwMjdcdTdDN0JcdTU3OEJcclxuICAgICAqL1xyXG4gICAgcHVibGljIG9uQWRkQXR0clZhbChjbGF6ek5hbWU6IHN0cmluZywgc2VuZGVyR3VpZDogc3RyaW5nLCB0YXJnZXRHdWlkOiBzdHJpbmcsIHZhbDogbnVtYmVyLCBhdHRyVHlwZTogUHJlZmFiRXZlbnQuQXR0clR5cGUpIHtcclxuXHJcbiAgICAgICAgbGV0IGN1clZhbCA9IHRoaXMuZ2V0RGF0YTxudW1iZXI+KHRhcmdldEd1aWQsIGNsYXp6TmFtZSArIGF0dHJUeXBlKVxyXG4gICAgICAgIGlmIChjdXJWYWwgPT0gbnVsbCkgY3VyVmFsID0gMFxyXG5cclxuICAgICAgICBjdXJWYWwgKz0gdmFsXHJcblxyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh0YXJnZXRHdWlkLCBjbGF6ek5hbWUgKyBhdHRyVHlwZSwgY3VyVmFsKVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiW1BGOl1cdThCQkVcdTdGNkVcdTczQTlcdTVCQjZcdTVDNUVcdTYwMjcgOiBcIiArIGF0dHJUeXBlICsgXCIgOiBcIiArIGN1clZhbClcclxuICAgICAgICBsZXQgY2hhciA9IENvcmUuR2FtZU9iamVjdC5maW5kKHRhcmdldEd1aWQpXHJcblxyXG4gICAgICAgIGlmIChjaGFyIGluc3RhbmNlb2YgR2FtZXBsYXkuQ2hhcmFjdGVyKSB7XHJcbiAgICAgICAgICAgIGlmIChhdHRyVHlwZSA9PSBQcmVmYWJFdmVudC5BdHRyVHlwZS5KdW1wKSB7XHJcbiAgICAgICAgICAgICAgICBjaGFyLm1heEp1bXBIZWlnaHQgPSBjdXJWYWxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoYXR0clR5cGUgPT0gUHJlZmFiRXZlbnQuQXR0clR5cGUuU3BlZWQpIHtcclxuICAgICAgICAgICAgICAgIGNoYXIubWF4V2Fsa1NwZWVkID0gY3VyVmFsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubm90aWZ5KGNsYXp6TmFtZSwgUHJlZmFiRXZlbnQuUHJlZmFiRXZ0QXR0ci5vbkNoYW5nZUF0dHJWYWwubmFtZSwgc2VuZGVyR3VpZCwgdGFyZ2V0R3VpZCwgY3VyVmFsLCBhdHRyVHlwZSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFx1ODNCN1x1NTNENlx1NUM1RVx1NjAyN1xyXG4gICAgICogQHBhcmFtIHRhcmdldEd1aWQgXHJcbiAgICAgKiBAcGFyYW0gdmFsIFxyXG4gICAgICogQHBhcmFtIGF0dHJUeXBlIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0QXR0clZhbChjbGF6ek5hbWU6IHN0cmluZywgdGFyZ2V0R3VpZDogc3RyaW5nLCBhdHRyVHlwZTogUHJlZmFiRXZlbnQuQXR0clR5cGUpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBjdXJWYWwgPSB0aGlzLmdldERhdGE8bnVtYmVyPih0YXJnZXRHdWlkLCBjbGF6ek5hbWUgKyBhdHRyVHlwZSlcclxuICAgICAgICBpZiAoY3VyVmFsID09IG51bGwpIGN1clZhbCA9IDBcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiW1BGOl1cdTgzQjdcdTUzRDZcdTczQTlcdTVCQjZcdTVDNUVcdTYwMjcgOiBcIiArIGF0dHJUeXBlICsgXCIgOiBcIiArIGN1clZhbClcclxuICAgICAgICByZXR1cm4gY3VyVmFsXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAoXHU1M0NDXHU3QUVGKSBcdTdBN0ZcdTYyMzRcdTg4QzVcdTU5MDdcclxuICAgICAqIEBwYXJhbSB0YXJnZXRHdWlkIFx1NUJGOVx1OEM2MUd1aWRcclxuICAgICAqIEBwYXJhbSBzbG90IFx1NjlGRFx1NEY0RFxyXG4gICAgICogQHBhcmFtIGVxdWlwR3VpZCBcdTg4QzVcdTU5MDdHdWlkXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvbkVxdWlwKGNsYXp6TmFtZTogc3RyaW5nLCB0YXJnZXRHdWlkOiBzdHJpbmcsIHNsb3Q6IFByZWZhYkV2ZW50LkVxdWlwU2xvdCwgZXF1aXBHdWlkOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLnNldERhdGEodGFyZ2V0R3VpZCwgY2xhenpOYW1lICsgc2xvdCwgZXF1aXBHdWlkKVxyXG4gICAgICAgIHRoaXMubm90aWZ5KGNsYXp6TmFtZSwgdGhpcy5vbkVxdWlwLm5hbWUsIHRhcmdldEd1aWQsIHNsb3QsIGVxdWlwR3VpZClcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIChcdTUzQ0NcdTdBRUYpXHU4QkJFXHU3RjZFXHU1QzVFXHU2MDI3XHJcbiAgICAgKiBAcGFyYW0gc2VuZGVyR3VpZCBcdTUzRDFcdThENzdcdTVCRjlcdThDNjFHdWlkXHJcbiAgICAgKiBAcGFyYW0gdGFyZ2V0R3VpZCBcdTc2RUVcdTY4MDdcdTVCRjlcdThDNjFHdWlkXHJcbiAgICAgKiBAcGFyYW0gdmFsIFx1NTAzQ1xyXG4gICAgICogQHBhcmFtIGluZm9UeXBlIFx1NEZFMVx1NjA2Rlx1N0M3Qlx1NTc4QlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb25TZXRQbGF5ZXJJbmZvKGNsYXp6TmFtZTogc3RyaW5nLCBzZW5kZXJHdWlkOiBzdHJpbmcsIHRhcmdldEd1aWQ6IHN0cmluZywgdmFsOiBudW1iZXIsIGluZm9UeXBlOiBQcmVmYWJFdmVudC5QbGF5ZXJJbmZvVHlwZSB8IHN0cmluZykge1xyXG4gICAgICAgIGxldCBjaGFyID0gQ29yZS5HYW1lT2JqZWN0LmZpbmQodGFyZ2V0R3VpZClcclxuICAgICAgICBpZiAoY2hhciBpbnN0YW5jZW9mIEdhbWVwbGF5LkNoYXJhY3Rlcikge1xyXG4gICAgICAgICAgICBpZiAoY2hhci5wbGF5ZXIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0UGxheWVyRGF0YShjaGFyLnBsYXllci5nZXRQbGF5ZXJJRCgpKS5zZXRWYWx1ZShjbGF6ek5hbWUgKyBpbmZvVHlwZSwgdmFsKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5ub3RpZnkoY2xhenpOYW1lLCB0aGlzLm9uU2V0UGxheWVySW5mby5uYW1lLCBzZW5kZXJHdWlkLCB0YXJnZXRHdWlkLCB2YWwsIGluZm9UeXBlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogKFx1NTNDQ1x1N0FFRilcdTgzQjdcdTUzRDZcdTVDNUVcdTYwMjdcclxuICAgICAqIEBwYXJhbSBzZW5kZXJHdWlkIFx1NTNEMVx1OEQ3N1x1NUJGOVx1OEM2MUd1aWRcclxuICAgICAqIEBwYXJhbSB0YXJnZXRHdWlkIFx1NzZFRVx1NjgwN1x1NUJGOVx1OEM2MUd1aWRcclxuICAgICAqIEBwYXJhbSB2YWwgXHU1MDNDXHJcbiAgICAgKiBAcGFyYW0gaW5mb1R5cGUgXHU0RkUxXHU2MDZGXHU3QzdCXHU1NzhCXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRQbGF5ZXJJbmZvKGNsYXp6TmFtZTogc3RyaW5nLCB0YXJnZXRHdWlkOiBzdHJpbmcsIGluZm9UeXBlOiBQcmVmYWJFdmVudC5QbGF5ZXJJbmZvVHlwZSB8IHN0cmluZykge1xyXG4gICAgICAgIGxldCBjaGFyID0gQ29yZS5HYW1lT2JqZWN0LmZpbmQodGFyZ2V0R3VpZClcclxuICAgICAgICBpZiAoY2hhciBpbnN0YW5jZW9mIEdhbWVwbGF5LkNoYXJhY3Rlcikge1xyXG4gICAgICAgICAgICBpZiAoY2hhci5wbGF5ZXIpIHtcclxuICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9IHRoaXMuZ2V0UGxheWVyRGF0YShjaGFyLnBsYXllci5nZXRQbGF5ZXJJRCgpKS5nZXRWYWx1ZShjbGF6ek5hbWUgKyBpbmZvVHlwZSlcclxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PSBudWxsKSB2YWx1ZSA9IDBcclxuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAoXHU1M0NDXHU3QUVGKVx1NkRGQlx1NTJBMFx1NUM1RVx1NjAyN1xyXG4gICAgICogQHBhcmFtIHNlbmRlckd1aWQgXHU1M0QxXHU4RDc3XHU1QkY5XHU4QzYxR3VpZFxyXG4gICAgICogQHBhcmFtIHRhcmdldEd1aWQgXHU3NkVFXHU2ODA3XHU1QkY5XHU4QzYxR3VpZFxyXG4gICAgICogQHBhcmFtIHZhbCBcdTUwM0NcclxuICAgICAqIEBwYXJhbSBpbmZvVHlwZSBcdTRGRTFcdTYwNkZcdTdDN0JcdTU3OEJcclxuICAgICAqL1xyXG4gICAgcHVibGljIG9uQWRkUGxheWVySW5mbyhjbGF6ek5hbWU6IHN0cmluZywgc2VuZGVyR3VpZDogc3RyaW5nLCB0YXJnZXRHdWlkOiBzdHJpbmcsIHZhbDogbnVtYmVyLCBpbmZvVHlwZTogUHJlZmFiRXZlbnQuUGxheWVySW5mb1R5cGUgfCBzdHJpbmcpIHtcclxuXHJcbiAgICAgICAgbGV0IGNoYXIgPSBDb3JlLkdhbWVPYmplY3QuZmluZCh0YXJnZXRHdWlkKVxyXG4gICAgICAgIGlmIChjaGFyIGluc3RhbmNlb2YgR2FtZXBsYXkuQ2hhcmFjdGVyKSB7XHJcbiAgICAgICAgICAgIGlmIChjaGFyLnBsYXllcikge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRidmFsID0gdGhpcy5nZXRQbGF5ZXJJbmZvKGNsYXp6TmFtZSwgdGFyZ2V0R3VpZCwgaW5mb1R5cGUpXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGRidmFsID09IG51bGwgfHwgIU51bWJlci5pc05hTihkYnZhbCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgblZhbCA9IGRidmFsIGFzIHVua25vd24gYXMgbnVtYmVyXHJcbiAgICAgICAgICAgICAgICAgICAgblZhbCArPSB2YWxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uU2V0UGxheWVySW5mbyhjbGF6ek5hbWUsIHNlbmRlckd1aWQsIHRhcmdldEd1aWQsIG5WYWwsIGluZm9UeXBlKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZ5KGNsYXp6TmFtZSwgdGhpcy5vbkFkZFBsYXllckluZm8ubmFtZSwgc2VuZGVyR3VpZCwgdGFyZ2V0R3VpZCwgdmFsLCBpbmZvVHlwZSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIChcdTUzQ0NcdTdBRUYpXHU4QkJFXHU3RjZFXHU1MTczXHU1MzYxXHJcbiAgICAgKiBAcGFyYW0gc2VuZGVyR3VpZCBcdTUzRDFcdTkwMDFcdTgwMDVHdWlkXHJcbiAgICAgKiBAcGFyYW0gdGFyZ2V0R3VpZCBcdTc2RUVcdTY4MDdHdWlkXHJcbiAgICAgKiBAcGFyYW0gcmVjb3JkUG9pbnRJZCBcdThCQjBcdTVGNTVcdTcwQjlpZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb25TZXRSZWNvcmRQb2ludChjbGF6ek5hbWU6IHN0cmluZywgc2VuZGVyR3VpZDogc3RyaW5nLCB0YXJnZXRHdWlkOiBzdHJpbmcsIHJlY29yZFBvaW50SWQ6IG51bWJlciwgc2F2ZURCOiBib29sZWFuKSB7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiW1BGOl1vblNldFJlY29yZFBvaW50IDogXCIgKyBjbGF6ek5hbWUgKyBcIl9cIiArIHNlbmRlckd1aWQpXHJcblxyXG4gICAgICAgIGxldCBjaGFyID0gQ29yZS5HYW1lT2JqZWN0LmZpbmQodGFyZ2V0R3VpZClcclxuICAgICAgICBpZiAoY2hhciBpbnN0YW5jZW9mIEdhbWVwbGF5LkNoYXJhY3Rlcikge1xyXG4gICAgICAgICAgICBpZiAoY2hhci5wbGF5ZXIpIHtcclxuICAgICAgICAgICAgICAgIGlmIChzYXZlREIpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRQbGF5ZXJEYXRhKGNoYXIucGxheWVyLmdldFBsYXllcklEKCkpPy5zZXRWYWx1ZShjbGF6ek5hbWUgKyBcInJlY29yZFwiLCByZWNvcmRQb2ludElkKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5ub3RpZnkoY2xhenpOYW1lLCB0aGlzLm9uU2V0UmVjb3JkUG9pbnQubmFtZSwgc2VuZGVyR3VpZCwgdGFyZ2V0R3VpZCwgcmVjb3JkUG9pbnRJZClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAoXHU1M0NDXHU3QUVGKVx1ODNCN1x1NTNENlx1NTE3M1x1NTM2MVxyXG4gICAgICogQHBhcmFtIHRhcmdldEd1aWQgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRSZWNvcmRQb2ludChjbGF6ek5hbWU6IHN0cmluZywgdGFyZ2V0R3VpZDogc3RyaW5nKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgY2hhciA9IENvcmUuR2FtZU9iamVjdC5maW5kKHRhcmdldEd1aWQpXHJcbiAgICAgICAgaWYgKGNoYXIgaW5zdGFuY2VvZiBHYW1lcGxheS5DaGFyYWN0ZXIpIHtcclxuICAgICAgICAgICAgaWYgKGNoYXIucGxheWVyKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGJ2YWwgPSB0aGlzLmdldFBsYXllckRhdGEoY2hhci5wbGF5ZXIuZ2V0UGxheWVySUQoKSk/LmdldFZhbHVlKGNsYXp6TmFtZSArIFwicmVjb3JkXCIpIGFzIG51bWJlclxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRidmFsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAoXHU1M0NDXHU3QUVGKVx1ODNCN1x1NUY5N1x1NjUzNlx1OTZDNlx1NzI2OVxyXG4gICAgICogQHBhcmFtIHNlbmRlckd1aWQgXHJcbiAgICAgKiBAcGFyYW0gdGFyZ2V0R3VpZCBcclxuICAgICAqIEBwYXJhbSBhdGxhc0lkIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb25BZGRDb2xsZWN0aW9uKGNsYXp6TmFtZTogc3RyaW5nLCBhdGxhc0lkOiBzdHJpbmcsIGNoYXJHdWlkOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgY2hhciA9IENvcmUuR2FtZU9iamVjdC5maW5kKGNoYXJHdWlkKVxyXG4gICAgICAgIGlmIChjaGFyIGluc3RhbmNlb2YgR2FtZXBsYXkuQ2hhcmFjdGVyKSB7XHJcbiAgICAgICAgICAgIGlmIChjaGFyLnBsYXllcikge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRiID0gdGhpcy5nZXRQbGF5ZXJEYXRhKGNoYXIucGxheWVyLmdldFBsYXllcklEKCkpXHJcbiAgICAgICAgICAgICAgICBpZiAoZGIpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZGJ2YWwgPSBkYi5nZXRWYWx1ZShjbGF6ek5hbWUgKyBcImF0bGFzSXRlbVwiKSBhcyBzdHJpbmdbXVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghZGJ2YWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGJ2YWwgPSBbXVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGJ2YWwuaW5kZXhPZihhdGxhc0lkKSA9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYnZhbC5wdXNoKGF0bGFzSWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRiLnNldFZhbHVlKGNsYXp6TmFtZSArIFwiYXRsYXNJdGVtXCIsIGRidmFsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmeShjbGF6ek5hbWUsIHRoaXMub25BZGRDb2xsZWN0aW9uLm5hbWUsIGF0bGFzSWQsIGNoYXJHdWlkKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFx1ODNCN1x1NTNENlx1NjI0MFx1NjcwOVx1NjUzNlx1OTZDNlx1NzI2OVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0QWxsQ29sbGVjdGlvbihjbGF6ek5hbWU6IHN0cmluZywgY2hhckd1aWQ6IHN0cmluZyk6IHN0cmluZ1tdIHtcclxuXHJcbiAgICAgICAgbGV0IGNoYXIgPSBDb3JlLkdhbWVPYmplY3QuZmluZChjaGFyR3VpZClcclxuICAgICAgICBpZiAoY2hhciBpbnN0YW5jZW9mIEdhbWVwbGF5LkNoYXJhY3Rlcikge1xyXG4gICAgICAgICAgICBpZiAoY2hhci5wbGF5ZXIpIHtcclxuICAgICAgICAgICAgICAgIGxldCBkYnZhbCA9IHRoaXMuZ2V0UGxheWVyRGF0YShjaGFyLnBsYXllci5nZXRQbGF5ZXJJRCgpKT8uZ2V0VmFsdWUoY2xhenpOYW1lICsgXCJhdGxhc0l0ZW1cIikgYXMgc3RyaW5nW11cclxuICAgICAgICAgICAgICAgIGxldCByZXMgPSBbXVxyXG4gICAgICAgICAgICAgICAgaWYgKGRidmFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzLnB1c2goLi4uZGJ2YWwpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcdTgzQjdcdTUzRDZcdTczQTlcdTVCQjZcdTcyQjZcdTYwMDFcclxuICAgICAqIEBwYXJhbSBjbGF6ek5hbWUgXHJcbiAgICAgKiBAcGFyYW0gdGFyZ2V0R3VpZCBcclxuICAgICAqIEByZXR1cm5zIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0UGxheWVyU3RhdChjbGF6ek5hbWU6IHN0cmluZywgdGFyZ2V0R3VpZDogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IGN1clZhbCA9IHRoaXMuZ2V0RGF0YShjbGF6ek5hbWUsIHRhcmdldEd1aWQpXHJcbiAgICAgICAgaWYgKGN1clZhbCA9PSBudWxsKSBjdXJWYWwgPSAwXHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIltQRjpdXHU4M0I3XHU1M0Q2XHU3M0E5XHU1QkI2XHU3MkI2XHU2MDAxIDogXCIgKyBjdXJWYWwpXHJcbiAgICAgICAgcmV0dXJuIGN1clZhbFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogKFx1NTNDQ1x1N0FFRilcdThCQkVcdTdGNkVcdTVDNUVcdTYwMjdcclxuICAgICAqIEBwYXJhbSBzZW5kZXJHdWlkIFx1NTNEMVx1OEQ3N1x1NUJGOVx1OEM2MUd1aWRcclxuICAgICAqIEBwYXJhbSB0YXJnZXRHdWlkIFx1NzZFRVx1NjgwN1x1NUJGOVx1OEM2MUd1aWRcclxuICAgICAqIEBwYXJhbSB2YWwgXHU1MDNDXHJcbiAgICAgKiBAcGFyYW0gaW5mb1R5cGUgXHU0RkUxXHU2MDZGXHU3QzdCXHU1NzhCXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvblNldFBsYXllclN0YXQoY2xhenpOYW1lOiBzdHJpbmcsIHNlbmRlckd1aWQ6IHN0cmluZywgdGFyZ2V0R3VpZDogc3RyaW5nLCBzdGF0VHlwZTogUHJlZmFiRXZlbnQuUGxheWVyU3RhdFR5cGUpIHtcclxuICAgICAgICB0aGlzLnNldERhdGEodGFyZ2V0R3VpZCwgY2xhenpOYW1lLCBzdGF0VHlwZSlcclxuICAgICAgICB0aGlzLm5vdGlmeShjbGF6ek5hbWUsIHRoaXMub25TZXRQbGF5ZXJTdGF0Lm5hbWUsIHNlbmRlckd1aWQsIHRhcmdldEd1aWQsIHN0YXRUeXBlKVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRDdXJyZW5jeU51bShjbGF6ek5hbWU6IHN0cmluZywgdGFyZ2V0R3VpZDogc3RyaW5nLCBjdXJyZW5jeUlkOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBjaGFyID0gQ29yZS5HYW1lT2JqZWN0LmZpbmQodGFyZ2V0R3VpZClcclxuICAgICAgICBpZiAoY2hhciBpbnN0YW5jZW9mIEdhbWVwbGF5LkNoYXJhY3Rlcikge1xyXG4gICAgICAgICAgICBpZiAoY2hhci5wbGF5ZXIpIHtcclxuICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9IHRoaXMuZ2V0UGxheWVyRGF0YShjaGFyLnBsYXllci5nZXRQbGF5ZXJJRCgpKS5nZXRWYWx1ZShjbGF6ek5hbWUgKyBjdXJyZW5jeUlkKSBhcyBudW1iZXJcclxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PSBudWxsKSB2YWx1ZSA9IDBcclxuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBjbGF6ek5hbWUgXHJcbiAgICAgKiBAcGFyYW0gc2VuZGVyR3VpZCBcclxuICAgICAqIEBwYXJhbSB0YXJnZXRHdWlkIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb25DaGFuZ2VDdXJyZW5jeShjbGF6ek5hbWU6IHN0cmluZywgdGFyZ2V0R3VpZDogc3RyaW5nLCBjdXJyZW5jeUlkOiBudW1iZXIsIGN1cnJlbmN5TnVtOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgY2hhciA9IENvcmUuR2FtZU9iamVjdC5maW5kKHRhcmdldEd1aWQpXHJcbiAgICAgICAgaWYgKGNoYXIgaW5zdGFuY2VvZiBHYW1lcGxheS5DaGFyYWN0ZXIpIHtcclxuICAgICAgICAgICAgaWYgKGNoYXIucGxheWVyKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGJ2YWwgPSB0aGlzLmdldEN1cnJlbmN5TnVtKGNsYXp6TmFtZSwgdGFyZ2V0R3VpZCwgY3VycmVuY3lJZClcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZGJ2YWwgPT0gbnVsbCB8fCAhTnVtYmVyLmlzTmFOKGRidmFsKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBuVmFsID0gZGJ2YWwgYXMgbnVtYmVyXHJcbiAgICAgICAgICAgICAgICAgICAgblZhbCArPSBjdXJyZW5jeU51bVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFBsYXllckRhdGEoY2hhci5wbGF5ZXIuZ2V0UGxheWVySUQoKSkuc2V0VmFsdWUoY2xhenpOYW1lICsgY3VycmVuY3lJZCwgblZhbClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmeShjbGF6ek5hbWUsIHRoaXMub25DaGFuZ2VDdXJyZW5jeS5uYW1lLCB0YXJnZXRHdWlkLCBjdXJyZW5jeUlkLCBjdXJyZW5jeU51bSwgblZhbClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHRhcmdldEd1aWQgXHJcbiAgICAgKiBAcGFyYW0gY3VycmVuY3lJZCBcclxuICAgICAqIEBwYXJhbSBwcmljZSBcclxuICAgICAqIEByZXR1cm5zIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbmV0X0J1eVdpdGhDdXJyZW5jeSh0YXJnZXRHdWlkOiBzdHJpbmcsIGN1cnJlbmN5SWQ6IG51bWJlciwgcHJpY2U6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCBjdXJOdW0gPSB0aGlzLmdldEN1cnJlbmN5TnVtKFByZWZhYkV2ZW50LlByZWZhYkV2dEN1cnJlbmN5Lm5hbWUsIHRhcmdldEd1aWQsIGN1cnJlbmN5SWQpXHJcbiAgICAgICAgaWYgKGN1ck51bSA8IHByaWNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5vbkNoYW5nZUN1cnJlbmN5KFByZWZhYkV2ZW50LlByZWZhYkV2dEN1cnJlbmN5Lm5hbWUsIHRhcmdldEd1aWQsIGN1cnJlbmN5SWQsIC1wcmljZSlcclxuICAgICAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcbk1vZHVsZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5yZWdpc3Rlck1vZHVsZShQcmVmYWJFdmVudE1vZHVsZVMsIFByZWZhYkV2ZW50TW9kdWxlQywgUHJlZmFiRXZlbnRNb2R1bGVEYXRhKVxyXG4iLCAiXHVGRUZGXHJcbi8qKlxyXG4gKiBBVVRPIEdFTkVSQVRFIEJZIFVJIEVESVRPUi5cclxuICogV0FSTklORzogRE8gTk9UIE1PRElGWSBUSElTIEZJTEUsTUFZIENBVVNFIENPREUgTE9TVC5cclxuICogQVVUSE9SOiBcdTYyNjdcdTdCMTRcdTdFQ0ZcdTVFNzRcclxuICogVUk6IFVJL0RlZmF1bHRVSS51aVxyXG4gKiBUSU1FOiAyMDIzLjA4LjI4LTEyLjIxLjU3XHJcbiovXHJcblxyXG5cclxuXHJcbkBVSS5VSUNhbGxPbmx5KCdVSS9EZWZhdWx0VUkudWknKVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEZWZhdWx0VUlfR2VuZXJhdGUgZXh0ZW5kcyBVSS5VSUJlaGF2aW9yIHtcclxuXHRcclxuXHJcbiBcclxuXHQvKipcclxuXHQqIG9uU3RhcnQgXHU0RTRCXHU1MjREXHU4OUU2XHU1M0QxXHU0RTAwXHU2QjIxXHJcblx0Ki9cclxuXHRwcm90ZWN0ZWQgb25Bd2FrZSgpIHtcclxuXHR9XHJcblx0IFxyXG59XHJcbiAiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTs7O0FDQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7O0FDQUE7QUFBQTtBQUFBO0FBQUE7OztBQ0FBO0FBQUE7QUFBQTtBQUFBO0FBTU8sSUFBTSxjQUFOLE1BQXdDO0FBQUEsRUFNN0IsYUFBc0IsQ0FBQztBQUFBLEVBQ3ZCLGFBQTRCLG9CQUFJLElBQWU7QUFBQSxFQUMvQyxTQUFzQyxvQkFBSSxJQUFJO0FBQUEsRUFJeEQsWUFBWSxXQUE0QjtBQUM5QyxRQUFJLGFBQW9CO0FBQ3hCLFNBQUssYUFBYSxJQUFJLE1BQU0sVUFBVSxTQUFTLFVBQVU7QUFFekQsYUFBUSxJQUFJLEdBQUcsSUFBSSxLQUFLLFdBQVcsUUFBUSxLQUFJO0FBQzlDLFdBQUssV0FBVyxLQUFLLENBQUM7QUFBQSxJQUN2QjtBQUNBLFFBQUksU0FBUyxVQUFVLEdBQUc7QUFDMUIsYUFBUSxJQUFJLEdBQUcsSUFBSSxRQUFRLEtBQUk7QUFDOUIsVUFBSSxPQUFjLFVBQVUsR0FBRztBQUMvQixVQUFJLE9BQXFCLFVBQVUsR0FBRyxHQUFHLE1BQU0sR0FBRztBQUNsRCxVQUFHLEtBQUssU0FBUyxZQUFXLGlCQUFpQjtBQUFHO0FBQ2hELFVBQUksVUFBaUI7QUFDckIsVUFBRyxLQUFLLFNBQVMsWUFBVyxnQkFBZ0IsR0FBRTtBQUM3QyxZQUFJLFFBQVEsSUFBSSxZQUFXO0FBQzNCLFlBQUksYUFBMkIsVUFBVSxHQUFHLE9BQU8sTUFBTSxHQUFHO0FBQzVELFlBQUcsUUFBUSxVQUFVLFdBQVcsU0FB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
