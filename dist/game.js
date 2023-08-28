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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYnVpbGQudHMiLCAiPHN0ZGluPiIsICJKYXZhU2NyaXB0cy9Db25maWcvQWN0aW9uLnRzIiwgIkphdmFTY3JpcHRzL0NvbmZpZy9Db25maWdCYXNlLnRzIiwgIkphdmFTY3JpcHRzL0NvbmZpZy9HYW1lQ29uZmlnLnRzIiwgIkphdmFTY3JpcHRzL0NvbmZpZy9XZWFwb25Db25maWcudHMiLCAiSmF2YVNjcmlwdHMvQ29uZmlnL1dlYXBvblJlc291cmNlcy50cyIsICJKYXZhU2NyaXB0cy9EZWZhdWx0VUkudHMiLCAiSmF2YVNjcmlwdHMvR2FtZURlZi50cyIsICJKYXZhU2NyaXB0cy9XZWFwb25CYXNlL0FtbW9CYXNlQ2xzLnRzIiwgIkphdmFTY3JpcHRzL1dlYXBvbkJhc2UvQ2FzaW5nQmFzZUNscy50cyIsICJKYXZhU2NyaXB0cy9XZWFwb25CYXNlL1dlYXBvbkJhc2VDbHMudHMiLCAiSmF2YVNjcmlwdHMvV2VhcG9uQmFzZS9XZWFwb25VSS50cyIsICJKYXZhU2NyaXB0cy91aS1nZW5lcmF0ZS9XZWFwb25VSV9nZW5lcmF0ZS50cyIsICJwcmVmYWJFdmVudC9QcmVmYWJFdmVudC50cyIsICJwcmVmYWJFdmVudC9QcmVmYWJFdmVudE1vZHVsZS50cyIsICJKYXZhU2NyaXB0cy91aS1nZW5lcmF0ZS9EZWZhdWx0VUlfZ2VuZXJhdGUudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIiIsICJpbXBvcnQgKiBhcyBmb3JlaWduMSBmcm9tICcuL0phdmFTY3JpcHRzL0NvbmZpZy9BY3Rpb24nO1xuaW1wb3J0ICogYXMgZm9yZWlnbjIgZnJvbSAnLi9KYXZhU2NyaXB0cy9Db25maWcvQ29uZmlnQmFzZSc7XG5pbXBvcnQgKiBhcyBmb3JlaWduMyBmcm9tICcuL0phdmFTY3JpcHRzL0NvbmZpZy9HYW1lQ29uZmlnJztcbmltcG9ydCAqIGFzIGZvcmVpZ240IGZyb20gJy4vSmF2YVNjcmlwdHMvQ29uZmlnL1dlYXBvbkNvbmZpZyc7XG5pbXBvcnQgKiBhcyBmb3JlaWduNSBmcm9tICcuL0phdmFTY3JpcHRzL0NvbmZpZy9XZWFwb25SZXNvdXJjZXMnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjYgZnJvbSAnLi9KYXZhU2NyaXB0cy9EZWZhdWx0VUknO1xuaW1wb3J0ICogYXMgZm9yZWlnbjcgZnJvbSAnLi9KYXZhU2NyaXB0cy9HYW1lRGVmJztcbmltcG9ydCAqIGFzIGZvcmVpZ244IGZyb20gJy4vSmF2YVNjcmlwdHMvV2VhcG9uQmFzZS9BbW1vQmFzZUNscyc7XG5pbXBvcnQgKiBhcyBmb3JlaWduOSBmcm9tICcuL0phdmFTY3JpcHRzL1dlYXBvbkJhc2UvQ2FzaW5nQmFzZUNscyc7XG5pbXBvcnQgKiBhcyBmb3JlaWduMTAgZnJvbSAnLi9KYXZhU2NyaXB0cy9XZWFwb25CYXNlL1dlYXBvbkJhc2VDbHMnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjExIGZyb20gJy4vSmF2YVNjcmlwdHMvV2VhcG9uQmFzZS9XZWFwb25VSSc7XG5pbXBvcnQgKiBhcyBmb3JlaWduMTIgZnJvbSAnLi9KYXZhU2NyaXB0cy91aS1nZW5lcmF0ZS9EZWZhdWx0VUlfZ2VuZXJhdGUnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjEzIGZyb20gJy4vSmF2YVNjcmlwdHMvdWktZ2VuZXJhdGUvV2VhcG9uVUlfZ2VuZXJhdGUnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjE0IGZyb20gJy4vYnVpbGQnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjE1IGZyb20gJy4vcHJlZmFiRXZlbnQvUHJlZmFiRXZlbnQnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjE2IGZyb20gJy4vcHJlZmFiRXZlbnQvUHJlZmFiRXZlbnRNb2R1bGUnO1xuXG5leHBvcnQgY29uc3QgTVdNb2R1bGVNYXAgPSB7IFxuICAgICAnSmF2YVNjcmlwdHMvQ29uZmlnL0FjdGlvbic6IGZvcmVpZ24xLFxuICAgICAnSmF2YVNjcmlwdHMvQ29uZmlnL0NvbmZpZ0Jhc2UnOiBmb3JlaWduMixcbiAgICAgJ0phdmFTY3JpcHRzL0NvbmZpZy9HYW1lQ29uZmlnJzogZm9yZWlnbjMsXG4gICAgICdKYXZhU2NyaXB0cy9Db25maWcvV2VhcG9uQ29uZmlnJzogZm9yZWlnbjQsXG4gICAgICdKYXZhU2NyaXB0cy9Db25maWcvV2VhcG9uUmVzb3VyY2VzJzogZm9yZWlnbjUsXG4gICAgICdKYXZhU2NyaXB0cy9EZWZhdWx0VUknOiBmb3JlaWduNixcbiAgICAgJ0phdmFTY3JpcHRzL0dhbWVEZWYnOiBmb3JlaWduNyxcbiAgICAgJ0phdmFTY3JpcHRzL1dlYXBvbkJhc2UvQW1tb0Jhc2VDbHMnOiBmb3JlaWduOCxcbiAgICAgJ0phdmFTY3JpcHRzL1dlYXBvbkJhc2UvQ2FzaW5nQmFzZUNscyc6IGZvcmVpZ245LFxuICAgICAnSmF2YVNjcmlwdHMvV2VhcG9uQmFzZS9XZWFwb25CYXNlQ2xzJzogZm9yZWlnbjEwLFxuICAgICAnSmF2YVNjcmlwdHMvV2VhcG9uQmFzZS9XZWFwb25VSSc6IGZvcmVpZ24xMSxcbiAgICAgJ0phdmFTY3JpcHRzL3VpLWdlbmVyYXRlL0RlZmF1bHRVSV9nZW5lcmF0ZSc6IGZvcmVpZ24xMixcbiAgICAgJ0phdmFTY3JpcHRzL3VpLWdlbmVyYXRlL1dlYXBvblVJX2dlbmVyYXRlJzogZm9yZWlnbjEzLFxuICAgICAnYnVpbGQnOiBmb3JlaWduMTQsXG4gICAgICdwcmVmYWJFdmVudC9QcmVmYWJFdmVudCc6IGZvcmVpZ24xNSxcbiAgICAgJ3ByZWZhYkV2ZW50L1ByZWZhYkV2ZW50TW9kdWxlJzogZm9yZWlnbjE2LFxufVxuIiwgImltcG9ydCB7IENvbmZpZ0Jhc2UsIElFbGVtZW50QmFzZSB9IGZyb20gXCIuL0NvbmZpZ0Jhc2VcIjtcclxuY29uc3QgRVhDRUxEQVRBOkFycmF5PEFycmF5PGFueT4+ID0gW1tcImlkXCIsXCJzZXhcIixcInNob290QW5pbWF0aW9uXCIsXCJhaW1TaG9vdEFuaW1hdGlvblwiLFwicmVsb2FkQW5pbWF0aW9uXCIsXCJsb2FkQW5pbWF0aW9uXCIsXCJlcXVpcEFuaW1hdGlvblwiLFwidW5lcXVpcEFuaW1hdGlvblwiLFwiaG9sZFN0YW5jZVwiLFwiYWltU3RhbmNlXCJdLFsxLFwibWFsZVwiLDgwNDg0LDgwNDgzLDgwNDc5LDgwNDgyLDgwNTg1LDgwNDgxLDk0MjU4LDk0MjYxXSxbMixcImZlbWFsZVwiLFwiNDkwOTRcIixcIjQ5MDk1XCIsXCI4MDQ3OVwiLFwiODA0ODJcIixcIjgwNTg1XCIsXCI4MDQ4MVwiLFwiNDkwOTZcIixcIjQ5MDk4XCJdXTtcclxuZXhwb3J0IGludGVyZmFjZSBJQWN0aW9uRWxlbWVudCBleHRlbmRzIElFbGVtZW50QmFzZXtcclxuIFx0LyoqXHU1MkE4XHU3NTNCSUQqL1xyXG5cdGlkOm51bWJlclxyXG5cdC8qKlx1NjAyN1x1NTIyQiovXHJcblx0c2V4OnN0cmluZ1xyXG5cdC8qKlx1NUMwNFx1NTFGQlx1NTJBOFx1NzUzQiovXHJcblx0c2hvb3RBbmltYXRpb246c3RyaW5nXHJcblx0LyoqXHU3Nzg0XHU1MUM2XHU1QzA0XHU1MUZCXHU1MkE4XHU3NTNCKi9cclxuXHRhaW1TaG9vdEFuaW1hdGlvbjpzdHJpbmdcclxuXHQvKipcdTYzNjJcdTVGMzlcdTUyQThcdTc1M0IqL1xyXG5cdHJlbG9hZEFuaW1hdGlvbjpzdHJpbmdcclxuXHQvKipcdTRFMEFcdTgxOUJcdTUyQThcdTc1M0IqL1xyXG5cdGxvYWRBbmltYXRpb246c3RyaW5nXHJcblx0LyoqXHU4OEM1XHU1OTA3XHU2QjY2XHU1NjY4XHU1MkE4XHU3NTNCKi9cclxuXHRlcXVpcEFuaW1hdGlvbjpzdHJpbmdcclxuXHQvKipcdTUzNzhcdThGN0RcdTZCNjZcdTU2NjhcdTUyQThcdTc1M0IqL1xyXG5cdHVuZXF1aXBBbmltYXRpb246c3RyaW5nXHJcblx0LyoqXHU2MzAxXHU2NzA5XHU1OUZGXHU2MDAxKi9cclxuXHRob2xkU3RhbmNlOnN0cmluZ1xyXG5cdC8qKlx1Nzc4NFx1NTFDNlx1NTlGRlx1NjAwMSovXHJcblx0YWltU3RhbmNlOnN0cmluZ1xyXG4gfSBcclxuZXhwb3J0IGNsYXNzIEFjdGlvbkNvbmZpZyBleHRlbmRzIENvbmZpZ0Jhc2U8SUFjdGlvbkVsZW1lbnQ+e1xyXG5cdGNvbnN0cnVjdG9yKCl7XHJcblx0XHRzdXBlcihFWENFTERBVEEpO1xyXG5cdH1cclxuXHJcbn0iLCAiXG4vL1x1NTE0M1x1N0QyMFx1NzY4NFx1NTdGQVx1N0M3QlxuZXhwb3J0IGludGVyZmFjZSBJRWxlbWVudEJhc2V7XG5cdGlkOm51bWJlcjtcbn1cbi8vXHU5MTREXHU3RjZFXHU3Njg0XHU1N0ZBXHU3QzdCXG5leHBvcnQgY2xhc3MgQ29uZmlnQmFzZTxUIGV4dGVuZHMgSUVsZW1lbnRCYXNlPntcblx0cHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgVEFHX0tFWTpzdHJpbmcgPSAnS2V5JzsvL1x1OEJGQlx1NTNENlx1OTUyRShcdTk2NjRcdTRFODZJRFx1NEU0Qlx1NTkxNlx1NzY4NFx1NTIyQlx1NTQwRFx1RkYwQ1x1NUUyNmtleVx1NzY4NFx1NUI1N1x1NkJCNVx1NUZDNVx1OTg3Qlx1NjYyRnN0cmluZ1x1N0M3Qlx1NTc4Qilcblx0cHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgVEFHX0xBTkdVQUdFOnN0cmluZyA9ICdMYW5ndWFnZSc7Ly9cdTUxNzNcdTgwNTRcdThCRURcdThBMDBcdTg4NjhcdTc2ODRpZFx1NjIxNmtleShcdTU5ODJcdTY3OUNcdTY3MDlcdThGRDlcdTRFMkF0YWdcdUZGMENcdTVCRkNcdTg4NjhcdTVERTVcdTUxNzdcdTg5ODFcdTYyOEFcdTY1NzBcdTYzNkVcdTc1MUZcdTYyMTBcdTRFM0FzdHJpbmdcdTdDN0JcdTU3OEJcdUZGMENcdTU2RTBcdTRFM0FcdTRGMUFcdTgxRUFcdTUyQThcdThGREJcdTg4NENcdTUwM0NcdTc2ODRcdThGNkNcdTYzNjIpXG5cdHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IFRBR19NQUlOTEFOR1VBR0U6c3RyaW5nID0gJ01haW5MYW5ndWFnZSc7Ly9cdTRFM0JcdThCRURcdThBMDB0YWdcblx0cHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgVEFHX0NISUxETEFOR1VBR0U6c3RyaW5nID0gJ0NoaWxkTGFuZ3VhZ2UnOy8vXHU1QjUwXHU4QkVEXHU4QTAwdGFnXG5cblx0cHJpdmF0ZSByZWFkb25seSBFTEVNRU5UQVJSOkFycmF5PFQ+ID0gW107XG5cdHByaXZhdGUgcmVhZG9ubHkgRUxFTUVOVE1BUDpNYXA8bnVtYmVyLCBUPiA9IG5ldyBNYXA8bnVtYmVyLCBUPigpO1xuXHRwcml2YXRlIHJlYWRvbmx5IEtFWU1BUDpNYXA8bnVtYmVyIHwgc3RyaW5nLCBudW1iZXI+ID0gbmV3IE1hcCgpO1xuXHRwcml2YXRlIHN0YXRpYyBsYW5ndWFnZUluZGV4Om51bWJlciA9IDBcblx0cHJpdmF0ZSBzdGF0aWMgZ2V0TGFuZ3VhZ2U6KGtleTpzdHJpbmd8bnVtYmVyKT0+c3RyaW5nO1xuXG5cdHB1YmxpYyBjb25zdHJ1Y3RvcihleGNlbERhdGE6QXJyYXk8QXJyYXk8YW55Pj4pe1xuXHRcdGxldCBoZWFkZXJMaW5lOm51bWJlciA9IDI7Ly9cdTg4NjhcdTU5MzRcdTc2ODRcdTg4NENcdTY1NzBcblx0XHR0aGlzLkVMRU1FTlRBUlIgPSBuZXcgQXJyYXkoZXhjZWxEYXRhLmxlbmd0aCAtIGhlYWRlckxpbmUpO1xuXHRcdFxuXHRcdGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLkVMRU1FTlRBUlIubGVuZ3RoOyBpKyspe1xuXHRcdFx0dGhpcy5FTEVNRU5UQVJSW2ldID0ge30gYXMgVFxuXHRcdH1cblx0XHRsZXQgY29sdW1uID0gZXhjZWxEYXRhWzBdLmxlbmd0aDsvL1x1NTIxN1x1NjU3MFxuXHRcdGZvcihsZXQgaiA9IDA7IGogPCBjb2x1bW47IGorKyl7Ly9cdTkwNERcdTUzODZcdTU0MDRcdTUyMTdcblx0XHRcdGxldCBuYW1lOnN0cmluZyA9IGV4Y2VsRGF0YVswXVtqXTtcblx0XHRcdGxldCB0YWdzOkFycmF5PHN0cmluZz4gPSBleGNlbERhdGFbMV1bal0uc3BsaXQoJ3wnKTtcblx0XHRcdGlmKHRhZ3MuaW5jbHVkZXMoQ29uZmlnQmFzZS5UQUdfQ0hJTERMQU5HVUFHRSkpIGNvbnRpbnVlO1xuXHRcdFx0bGV0IGpPZmZlY3Q6bnVtYmVyID0gMDsvL1x1NTIxN1x1NTA0Rlx1NzlGQlx1OTFDRlxuXHRcdFx0aWYodGFncy5pbmNsdWRlcyhDb25maWdCYXNlLlRBR19NQUlOTEFOR1VBR0UpKXtcblx0XHRcdFx0bGV0IGluZGV4ID0gaiArIENvbmZpZ0Jhc2UubGFuZ3VhZ2VJbmRleDtcblx0XHRcdFx0bGV0IHRhcmdldFRhZ3M6QXJyYXk8c3RyaW5nPiA9IGV4Y2VsRGF0YVsxXVtpbmRleF0uc3BsaXQoJ3wnKTtcblx0XHRcdFx0aWYoaW5kZXggPCBjb2x1bW4gJiYgdGFyZ2V0VGFncy5pbmNsdWRlcyhDb25maWdCYXNlLlRBR19DSElMRExBTkdVQUdFKSl7XG5cdFx0XHRcdFx0ak9mZmVjdCA9IENvbmZpZ0Jhc2UubGFuZ3VhZ2VJbmRleDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0bGV0IGhhc1RhZ19LZXk6Ym9vbGVhbiA9IHRhZ3MuaW5jbHVkZXMoQ29uZmlnQmFzZS5UQUdfS0VZKTtcblx0XHRcdGxldCBoYXNUYWdfTGFuZ3VhZ2U6Ym9vbGVhbiA9IHRhZ3MuaW5jbHVkZXMoQ29uZmlnQmFzZS5UQUdfTEFOR1VBR0UpO1xuXHRcdFx0Zm9yKGxldCBpID0gMDsgaSA8IHRoaXMuRUxFTUVOVEFSUi5sZW5ndGg7IGkrKyl7XG5cdFx0XHRcdGxldCBlbGUgPSB0aGlzLkVMRU1FTlRBUlJbaV07XG5cdFx0XHRcdGxldCB2YWx1ZSA9IGV4Y2VsRGF0YVtpICsgaGVhZGVyTGluZV1baiArIGpPZmZlY3RdO1xuXHRcdFx0XHRpZihqID09IDApey8vSURcblx0XHRcdFx0XHR0aGlzLkVMRU1FTlRNQVAuc2V0KHZhbHVlLCBlbGUpO1xuXHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRpZihoYXNUYWdfS2V5KXtcblx0XHRcdFx0XHRcdHRoaXMuS0VZTUFQLnNldCh2YWx1ZSwgZXhjZWxEYXRhW2kgKyBoZWFkZXJMaW5lXVswXSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmKGhhc1RhZ19MYW5ndWFnZSl7XG5cdFx0XHRcdFx0XHRpZihDb25maWdCYXNlLmdldExhbmd1YWdlICE9IG51bGwpe1xuXHRcdFx0XHRcdFx0XHR2YWx1ZSA9IENvbmZpZ0Jhc2UuZ2V0TGFuZ3VhZ2UodmFsdWUpO1xuXHRcdFx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0XHRcdHZhbHVlID0gXCJ1bmtub3dcIlxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRlbGVbbmFtZV0gPSB2YWx1ZTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0Ly9cdThCQkVcdTdGNkVcdTgzQjdcdTUzRDZcdThCRURcdThBMDBcdTc2ODRcdTY1QjlcdTZDRDVcblx0cHVibGljIHN0YXRpYyBpbml0TGFuZ3VhZ2UobGFuZ3VhZ2VJbmRleDpudW1iZXIsIGdldExhbmd1YWdlRnVuOihrZXk6c3RyaW5nfG51bWJlcik9PnN0cmluZyl7XG5cdFx0Q29uZmlnQmFzZS5sYW5ndWFnZUluZGV4ID0gbGFuZ3VhZ2VJbmRleDtcblx0XHRDb25maWdCYXNlLmdldExhbmd1YWdlID0gZ2V0TGFuZ3VhZ2VGdW47XG5cdFx0aWYoQ29uZmlnQmFzZS5sYW5ndWFnZUluZGV4IDwgMCl7XG5cdFx0XHRDb25maWdCYXNlLmxhbmd1YWdlSW5kZXggPSBDb25maWdCYXNlLmdldFN5c3RlbUxhbmd1YWdlSW5kZXgoKTtcblx0XHR9XG5cdH1cblx0Ly9cdTgzQjdcdTUzRDZcdTdDRkJcdTdFREZcdThCRURcdThBMDBcdTdEMjJcdTVGMTVcblx0cHJpdmF0ZSBzdGF0aWMgZ2V0U3lzdGVtTGFuZ3VhZ2VJbmRleCgpOm51bWJlcntcblx0XHRsZXQgbGFuZ3VhZ2UgPSBVdGlsLkxvY2FsZVV0aWwuZ2V0RGVmYXVsdExvY2FsZSgpLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKTtcblx0XHRpZiAoISFsYW5ndWFnZS5tYXRjaChcImVuXCIpKSB7XG5cdFx0XHRyZXR1cm4gMDtcblx0XHR9XG5cdFx0aWYgKCEhbGFuZ3VhZ2UubWF0Y2goXCJ6aFwiKSkge1xuXHRcdFx0cmV0dXJuIDE7XG5cdFx0fVxuXHRcdGlmICghIWxhbmd1YWdlLm1hdGNoKFwiamFcIikpIHtcblx0XHRcdHJldHVybiAyO1xuXHRcdH1cblx0XHRpZiAoISFsYW5ndWFnZS5tYXRjaChcImRlXCIpKSB7XG5cdFx0XHRyZXR1cm4gMztcblx0XHR9XG5cdFx0cmV0dXJuIDA7XG5cdH1cblx0LyoqXG5cdCogXHU2ODM5XHU2MzZFaWRcdTgzQjdcdTUzRDZcdTRFMDBcdTRFMkFcdTUxNDNcdTdEMjBcblx0KiBAcGFyYW0gaWQgaWR8a2V5XG5cdCogQHJldHVybnMgRWxlbWVudFxuXHQqL1xuXHRwdWJsaWMgZ2V0RWxlbWVudChpZDpudW1iZXJ8c3RyaW5nKTogVCB7XG5cdFx0bGV0IGVsZSA9IHRoaXMuRUxFTUVOVE1BUC5nZXQoTnVtYmVyKGlkKSkgfHwgdGhpcy5FTEVNRU5UTUFQLmdldCh0aGlzLktFWU1BUC5nZXQoaWQpKTtcblx0XHRpZihlbGUgPT0gbnVsbCl7XG5cdFx0XHRjb25zb2xlLmVycm9yKHRoaXMuY29uc3RydWN0b3IubmFtZSArIFwiXHU5MTREXHU3RjZFXHU4ODY4XHU0RTJEXHU2MjdFXHU0RTBEXHU1MjMwXHU1MTQzXHU3RDIwIGlkOlwiICsgaWQpO1xuXHRcdH1cblx0XHRyZXR1cm4gZWxlO1xuXHR9XG5cdC8qKlxuXHQqIFx1NjgzOVx1NjM2RVx1NUI1N1x1NkJCNVx1NTQwRFx1NTQ4Q1x1NUI1N1x1NkJCNVx1NTAzQ1x1NjdFNVx1NjI3RVx1NEUwMFx1NEUyQVx1NTE0M1x1N0QyMFxuXHQqIEBwYXJhbSBmaWVsZE5hbWUgXHU1QjU3XHU2QkI1XHU1NDBEXG5cdCogQHBhcmFtIGZpZWxkVmFsdWUgXHU1QjU3XHU2QkI1XHU1MDNDXG5cdCogQHJldHVybnMgXHU3QjJDXHU0RTAwXHU0RTJBXHU2MjdFXHU1MjMwXHU3Njg0RWxlbWVudFxuXHQqL1xuXHRwdWJsaWMgZmluZEVsZW1lbnQoZmllbGROYW1lOnN0cmluZywgZmllbGRWYWx1ZTphbnkpOiBUe1xuXHRcdGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLkVMRU1FTlRBUlIubGVuZ3RoOyBpKyspe1xuXHRcdFx0aWYodGhpcy5FTEVNRU5UQVJSW2ldW2ZpZWxkTmFtZV0gPT0gZmllbGRWYWx1ZSl7XG5cdFx0XHRcdHJldHVybiB0aGlzLkVMRU1FTlRBUlJbaV07XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdC8qKlxuXHQqIFx1NjgzOVx1NjM2RVx1NUI1N1x1NkJCNVx1NTQwRFx1NTQ4Q1x1NUI1N1x1NkJCNVx1NTAzQ1x1NjdFNVx1NjI3RVx1NEUwMFx1N0VDNFx1NTE0M1x1N0QyMFxuXHQqIEBwYXJhbSBmaWVsZE5hbWUgXHU1QjU3XHU2QkI1XHU1NDBEXG5cdCogQHBhcmFtIGZpZWxkVmFsdWUgXHU1QjU3XHU2QkI1XHU1MDNDXG5cdCogQHJldHVybnMgXHU2MjQwXHU2NzA5XHU3QjI2XHU1NDA4XHU4OTgxXHU2QzQyXHU3Njg0RWxlbWVudFxuXHQqL1xuXHRwdWJsaWMgZmluZEVsZW1lbnRzKGZpZWxkTmFtZTpzdHJpbmcsZmllbGRWYWx1ZTphbnkpOkFycmF5PFQ+e1xuXHRcdGxldCBhcnI6QXJyYXk8VD4gPSBbXTtcblx0XHRmb3IobGV0IGkgPSAwO2kgPCB0aGlzLkVMRU1FTlRBUlIubGVuZ3RoO2krKyl7XG5cdFx0XHRpZih0aGlzLkVMRU1FTlRBUlJbaV1bZmllbGROYW1lXSA9PSBmaWVsZFZhbHVlKXtcblx0XHRcdFx0YXJyLnB1c2godGhpcy5FTEVNRU5UQVJSW2ldKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGFycjtcblx0fVxuXHQvKipcdTgzQjdcdTUzRDZcdTYyNDBcdTY3MDlcdTUxNDNcdTdEMjAqL1xuXHRwdWJsaWMgZ2V0QWxsRWxlbWVudCgpOkFycmF5PFQ+e1xuXHRcdHJldHVybiB0aGlzLkVMRU1FTlRBUlI7XG5cdH1cbn0iLCAiaW1wb3J0IHtDb25maWdCYXNlLCBJRWxlbWVudEJhc2V9IGZyb20gXCIuL0NvbmZpZ0Jhc2VcIjtcbmltcG9ydCB7QWN0aW9uQ29uZmlnfSBmcm9tIFwiLi9BY3Rpb25cIjtcbmltcG9ydCB7V2VhcG9uQ29uZmlnQ29uZmlnfSBmcm9tIFwiLi9XZWFwb25Db25maWdcIjtcbmltcG9ydCB7V2VhcG9uUmVzb3VyY2VzQ29uZmlnfSBmcm9tIFwiLi9XZWFwb25SZXNvdXJjZXNcIjtcblxuZXhwb3J0IGNsYXNzIEdhbWVDb25maWd7XG5cdHByaXZhdGUgc3RhdGljIGNvbmZpZ01hcDpNYXA8c3RyaW5nLCBDb25maWdCYXNlPElFbGVtZW50QmFzZT4+ID0gbmV3IE1hcCgpO1xuXHQvKipcblx0KiBcdTU5MUFcdThCRURcdThBMDBcdThCQkVcdTdGNkVcblx0KiBAcGFyYW0gbGFuZ3VhZ2VJbmRleCBcdThCRURcdThBMDBcdTdEMjJcdTVGMTUoLTFcdTRFM0FcdTdDRkJcdTdFREZcdTlFRDhcdThCQTRcdThCRURcdThBMDApXG5cdCogQHBhcmFtIGdldExhbmd1YWdlRnVuIFx1NjgzOVx1NjM2RWtleVx1ODNCN1x1NTNENlx1OEJFRFx1OEEwMFx1NTE4NVx1NUJCOVx1NzY4NFx1NjVCOVx1NkNENVxuXHQqL1xuXHRwdWJsaWMgc3RhdGljIGluaXRMYW5ndWFnZShsYW5ndWFnZUluZGV4Om51bWJlciwgZ2V0TGFuZ3VhZ2VGdW46KGtleTpzdHJpbmd8bnVtYmVyKT0+c3RyaW5nKXtcblx0XHRDb25maWdCYXNlLmluaXRMYW5ndWFnZShsYW5ndWFnZUluZGV4LCBnZXRMYW5ndWFnZUZ1bik7XG5cdFx0dGhpcy5jb25maWdNYXAuY2xlYXIoKTtcblx0fVxuXHRwdWJsaWMgc3RhdGljIGdldENvbmZpZzxUIGV4dGVuZHMgQ29uZmlnQmFzZTxJRWxlbWVudEJhc2U+PihDb25maWdDbGFzczogeyBuZXcoKTogVCB9KTogVCB7XG5cdFx0aWYgKCF0aGlzLmNvbmZpZ01hcC5oYXMoQ29uZmlnQ2xhc3MubmFtZSkpIHtcblx0XHRcdHRoaXMuY29uZmlnTWFwLnNldChDb25maWdDbGFzcy5uYW1lLCBuZXcgQ29uZmlnQ2xhc3MoKSk7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLmNvbmZpZ01hcC5nZXQoQ29uZmlnQ2xhc3MubmFtZSkgYXMgVDtcblx0fVxuXHRwdWJsaWMgc3RhdGljIGdldCBBY3Rpb24oKTpBY3Rpb25Db25maWd7IHJldHVybiB0aGlzLmdldENvbmZpZyhBY3Rpb25Db25maWcpIH07XG5cdHB1YmxpYyBzdGF0aWMgZ2V0IFdlYXBvbkNvbmZpZygpOldlYXBvbkNvbmZpZ0NvbmZpZ3sgcmV0dXJuIHRoaXMuZ2V0Q29uZmlnKFdlYXBvbkNvbmZpZ0NvbmZpZykgfTtcblx0cHVibGljIHN0YXRpYyBnZXQgV2VhcG9uUmVzb3VyY2VzKCk6V2VhcG9uUmVzb3VyY2VzQ29uZmlneyByZXR1cm4gdGhpcy5nZXRDb25maWcoV2VhcG9uUmVzb3VyY2VzQ29uZmlnKSB9O1xufSIsICJpbXBvcnQgeyBDb25maWdCYXNlLCBJRWxlbWVudEJhc2UgfSBmcm9tIFwiLi9Db25maWdCYXNlXCI7XHJcbmNvbnN0IEVYQ0VMREFUQTpBcnJheTxBcnJheTxhbnk+PiA9IFtbXCJpZFwiLFwibmFtZVwiLFwibWFsZUFjdGlvblwiLFwiZmVtYWxlQWN0aW9uXCIsXCJ3ZWFwb25JY29uXCIsXCJlcXVpcG1lbnRTbG90XCIsXCJlcXVpcG1lbnRDYW1lcmFPZmZzZXRcIixcInJlc291cmNlc0lkXCIsXCJ1c2VDbGFzc1wiLFwiZXF1aXBtZW50Q2FtZXJhRm92XCIsXCJhaW1DYW1lcmFPZmZzZXRcIixcImFpbUNhbWVyYUZvdlwiLFwiYWltU3BlZWRcIixcImRhbWFnZVwiLFwic2hvb3RSYW5nZVwiLFwiYW1tb1NwZWVkXCIsXCJkZXRlY3RSYWRpdXNcIixcImdyYXZpdHlTY2FsZVwiLFwiaHVydFJhZGl1c1wiLFwiaXNBdXRvUmVsb2FkXCIsXCJpc0F1dG9Mb2NrXCIsXCJpc0RlZmF1bHRVSVwiLFwiaXNXZWFwb25IYXZlQ2FzaW5nXCIsXCJmaXJlQmxvY2tEaXN0YW5jZVwiLFwidG90YWxBbW1vXCIsXCJpc0VtcHR5VG9EZXN0cm95XCIsXCJpc1N1cHBvcnRSZXBBbW1vXCIsXCJyb3RhdGVTcGVlZFwiLFwia2VlcFRpbWVcIixcImlzV2VhcG9uSGF2ZVNjb3BlXCIsXCJpc0F1dG9EZXN0cm95XCJdLFsxMDAsXCJcdTZENEJcdThCRDVcdTZCNjVcdTY3QUFcIiwxLDIsMTAxMTY4LFwiUmlnaHRfSGFuZFwiLFwiMHwwfDBcIiwxLFwiU25pcGVyXCIsOTAsXCIwfDB8MFwiLDYwLDkwLDMwLDUwMDAsMTAwMDAsMSxcIlwiLDEsMSwxLDEsMSwxLDEwMCxcIlwiLDEsOTAsLTEsXCJcIiwxXV07XHJcbmV4cG9ydCBpbnRlcmZhY2UgSVdlYXBvbkNvbmZpZ0VsZW1lbnQgZXh0ZW5kcyBJRWxlbWVudEJhc2V7XHJcbiBcdC8qKlx1NjdBQVx1NjhCMElEKi9cclxuXHRpZDpudW1iZXJcclxuXHQvKipcdTY3QUFcdTY4QjBcdTU0MERcdTVCNTcqL1xyXG5cdG5hbWU6c3RyaW5nXHJcblx0LyoqXHU2N0FBXHU2OEIwXHU3NTM3XHU2MDI3XHU1MkE4XHU3NTNCKi9cclxuXHRtYWxlQWN0aW9uOm51bWJlclxyXG5cdC8qKlx1NjdBQVx1NjhCMFx1NTk3M1x1NjAyN1x1NTJBOFx1NzUzQiovXHJcblx0ZmVtYWxlQWN0aW9uOm51bWJlclxyXG5cdC8qKlx1NkI2Nlx1NTY2OFx1NTZGRVx1NjgwNyovXHJcblx0d2VhcG9uSWNvbjpzdHJpbmdcclxuXHQvKipcdTg4QzVcdTU5MDdcdTYzRDJcdTY5RkQqL1xyXG5cdGVxdWlwbWVudFNsb3Q6c3RyaW5nXHJcblx0LyoqXHU4OEM1XHU1OTA3XHU4OUM2XHU4OUQyXHU1MDRGXHU3OUZCKi9cclxuXHRlcXVpcG1lbnRDYW1lcmFPZmZzZXQ6VHlwZS5WZWN0b3JcclxuXHQvKipcdTY3QUFcdTY4QjBcdTRGN0ZcdTc1MjhcdThENDRcdTRFQTdJRCovXHJcblx0cmVzb3VyY2VzSWQ6bnVtYmVyXHJcblx0LyoqXHU2N0FBXHU2OEIwXHU3QzdCKi9cclxuXHR1c2VDbGFzczpzdHJpbmdcclxuXHQvKipGT1YqL1xyXG5cdGVxdWlwbWVudENhbWVyYUZvdjpudW1iZXJcclxuXHQvKipcdTc3ODRcdTUxQzZcdTg5QzZcdTg5RDJcdTUwNEZcdTc5RkIqL1xyXG5cdGFpbUNhbWVyYU9mZnNldDpUeXBlLlZlY3RvclxyXG5cdC8qKlx1Nzc4NFx1NTFDNkZPViovXHJcblx0YWltQ2FtZXJhRm92Om51bWJlclxyXG5cdC8qKlx1Nzc4NFx1NTFDNlx1ODA1QVx1NzEyNlx1OTAxRlx1NUVBNiovXHJcblx0YWltU3BlZWQ6bnVtYmVyXHJcblx0LyoqXHU2QjY2XHU1NjY4XHU1N0ZBXHU3ODQwXHU0RjI0XHU1QkIzKi9cclxuXHRkYW1hZ2U6bnVtYmVyXHJcblx0LyoqXHU2NzAwXHU1OTI3XHU1QzA0XHU3QTBCKi9cclxuXHRzaG9vdFJhbmdlOm51bWJlclxyXG5cdC8qKlx1NUYzOVx1ODM2Rlx1OTAxRlx1NUVBNiovXHJcblx0YW1tb1NwZWVkOm51bWJlclxyXG5cdC8qKlx1NzhCMFx1NjQ5RVx1NTM0QVx1NUY4NCovXHJcblx0ZGV0ZWN0UmFkaXVzOm51bWJlclxyXG5cdC8qKlx1OTFDRFx1NTI5Qlx1N0NGQlx1NjU3MCovXHJcblx0Z3Jhdml0eVNjYWxlOm51bWJlclxyXG5cdC8qKlx1NEYyNFx1NUJCM1x1ODMwM1x1NTZGNCovXHJcblx0aHVydFJhZGl1czpudW1iZXJcclxuXHQvKipcdTgxRUFcdTUyQThcdTYzNjJcdTVGMzkqL1xyXG5cdGlzQXV0b1JlbG9hZDpib29sZWFuXHJcblx0LyoqXHU4Rjg1XHU1MkE5XHU3Nzg0XHU1MUM2Ki9cclxuXHRpc0F1dG9Mb2NrOmJvb2xlYW5cclxuXHQvKipcdTlFRDhcdThCQTRVSSovXHJcblx0aXNEZWZhdWx0VUk6Ym9vbGVhblxyXG5cdC8qKlx1NUYzOVx1NThGM1x1NUYzOVx1NTFGQSovXHJcblx0aXNXZWFwb25IYXZlQ2FzaW5nOmJvb2xlYW5cclxuXHQvKipcdTVGMDBcdTcwNkJcdTk2M0JcdTYzMjFcdThERERcdTc5QkIqL1xyXG5cdGZpcmVCbG9ja0Rpc3RhbmNlOm51bWJlclxyXG5cdC8qKlx1NUYzOVx1ODM2Rlx1NjU3MFx1OTFDRigtMVx1NEUzQVx1NjVFMFx1OTY1MCkgKi9cclxuXHR0b3RhbEFtbW86bnVtYmVyXHJcblx0LyoqXHU1RjM5XHU1OTM5XHU0RTNBXHU3QTdBXHU2NjJGXHU1NDI2XHU5NTAwXHU2QkMxXHU2QjY2XHU1NjY4Ki9cclxuXHRpc0VtcHR5VG9EZXN0cm95OmJvb2xlYW5cclxuXHQvKipcdTY1MkZcdTYzMDFcdTY2RkZcdTYzNjJcdTVGMzlcdTU5MzkqL1xyXG5cdGlzU3VwcG9ydFJlcEFtbW86Ym9vbGVhblxyXG5cdC8qKlx1NkEyMVx1NTc4Qlx1NjVDQlx1OEY2Q1x1OTAxRlx1NUVBNiovXHJcblx0cm90YXRlU3BlZWQ6bnVtYmVyXHJcblx0LyoqXHU2MzAxXHU2NzA5XHU2NUY2XHU5NjUwXHVGRjA4c1x1RkYwOVx1RkYwOC0xXHU0RTNBXHU2QzM4XHU0RTQ1XHU2MzAxXHU2NzA5XHVGRjA5Ki9cclxuXHRrZWVwVGltZTpudW1iZXJcclxuXHQvKipcdTc3ODRcdTUxQzZcdTk1NUMqL1xyXG5cdGlzV2VhcG9uSGF2ZVNjb3BlOmJvb2xlYW5cclxuXHQvKipcdTgxRUFcdTUyQThcdTk1MDBcdTZCQzEqL1xyXG5cdGlzQXV0b0Rlc3Ryb3k6Ym9vbGVhblxyXG4gfSBcclxuZXhwb3J0IGNsYXNzIFdlYXBvbkNvbmZpZ0NvbmZpZyBleHRlbmRzIENvbmZpZ0Jhc2U8SVdlYXBvbkNvbmZpZ0VsZW1lbnQ+e1xyXG5cdGNvbnN0cnVjdG9yKCl7XHJcblx0XHRzdXBlcihFWENFTERBVEEpO1xyXG5cdH1cclxuXHJcbn0iLCAiaW1wb3J0IHsgQ29uZmlnQmFzZSwgSUVsZW1lbnRCYXNlIH0gZnJvbSBcIi4vQ29uZmlnQmFzZVwiO1xuY29uc3QgRVhDRUxEQVRBOkFycmF5PEFycmF5PGFueT4+ID0gW1tcImlkXCIsXCJoaXRSb2xlRWZmZWN0XCIsXCJoaXRPdGhlckVmZmVjdFwiLFwiZmlyZUVmZmVjdFwiLFwiYW1tb1wiLFwiY2FzaW5nXCIsXCJmaXJlU291bmRcIixcInJlbG9hZFNvdW5kXCIsXCJsb2FkU291bmRcIixcImFpbVNvdW5kXCIsXCJoaXRSb2xlU291bmRcIixcImhpdE90aGVyU291bmRcIl0sWzEsMSwyLDMsNCwyLDUsNiw3LDgsOSwxMF1dO1xuZXhwb3J0IGludGVyZmFjZSBJV2VhcG9uUmVzb3VyY2VzRWxlbWVudCBleHRlbmRzIElFbGVtZW50QmFzZXtcbiBcdC8qKlx1OEQ0NFx1NEVBN0lEKi9cblx0aWQ6bnVtYmVyXG5cdC8qKlx1NTQ3RFx1NEUyRFx1ODlEMlx1ODI3Mlx1NzI3OVx1NjU0OCovXG5cdGhpdFJvbGVFZmZlY3Q6c3RyaW5nXG5cdC8qKlx1NTQ3RFx1NEUyRFx1NzI2OVx1NEY1M1x1NzI3OVx1NjU0OCovXG5cdGhpdE90aGVyRWZmZWN0OnN0cmluZ1xuXHQvKipcdTVGMDBcdTcwNkJcdTcyNzlcdTY1NDgqL1xuXHRmaXJlRWZmZWN0OnN0cmluZ1xuXHQvKipcdTVGMzlcdTgzNkYqL1xuXHRhbW1vOnN0cmluZ1xuXHQvKipcdTVGMzlcdTU4RjMqL1xuXHRjYXNpbmc6c3RyaW5nXG5cdC8qKlx1NUYwMFx1NzA2Qlx1OTdGM1x1NjU0OCovXG5cdGZpcmVTb3VuZDpzdHJpbmdcblx0LyoqXHU2MzYyXHU1RjM5XHU5N0YzXHU2NTQ4Ki9cblx0cmVsb2FkU291bmQ6c3RyaW5nXG5cdC8qKlx1NEUwQVx1ODE5Qlx1OTdGM1x1NjU0OCovXG5cdGxvYWRTb3VuZDpzdHJpbmdcblx0LyoqXHU3Nzg0XHU1MUM2XHU5N0YzXHU2NTQ4Ki9cblx0YWltU291bmQ6c3RyaW5nXG5cdC8qKlx1NTQ3RFx1NEUyRFx1ODlEMlx1ODI3Mlx1OTdGM1x1NjU0OCovXG5cdGhpdFJvbGVTb3VuZDpzdHJpbmdcblx0LyoqXHU1NDdEXHU0RTJEXHU3MjY5XHU0RjUzXHU5N0YzXHU2NTQ4Ki9cblx0aGl0T3RoZXJTb3VuZDpzdHJpbmdcbiB9IFxuZXhwb3J0IGNsYXNzIFdlYXBvblJlc291cmNlc0NvbmZpZyBleHRlbmRzIENvbmZpZ0Jhc2U8SVdlYXBvblJlc291cmNlc0VsZW1lbnQ+e1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHN1cGVyKEVYQ0VMREFUQSk7XG5cdH1cblxufSIsICJcdUZFRkZAVUkuVUlDYWxsT25seSgnJylcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlEZWZhdWx0IGV4dGVuZHMgVUkuVUlCZWhhdmlvciB7XHJcblx0Q2hhcmFjdGVyOiBHYW1lcGxheS5DaGFyYWN0ZXJcclxuXHQvKiBcdTg5RTNcdTY3OTBcdThENDRcdTZFOTBJRFx1NTIxN1x1ODg2OCAqL1xyXG4gICAgcHJpdmF0ZSByZXNvbHZlU3RyaW5nKGFzc2V0SWRzOiBzdHJpbmcpOiBzdHJpbmdbXSB7XHJcbiAgICAgICAgbGV0IGFzc2V0SWRBcnJheTogc3RyaW5nW10gPSBuZXcgQXJyYXk8c3RyaW5nPigpXHJcbiAgICAgICAgbGV0IGFzc2V0SWQ6IHN0cmluZyA9IFwiXCJcclxuICAgICAgICBsZXQgcyA9IGFzc2V0SWRzLnNwbGl0KFwiXCIpXHJcbiAgICAgICAgZm9yIChsZXQgYSBvZiBzKSB7XHJcbiAgICAgICAgICAgIGlmIChhID09IFwiLFwiKSB7XHJcbiAgICAgICAgICAgICAgICBhc3NldElkQXJyYXkucHVzaChhc3NldElkKVxyXG4gICAgICAgICAgICAgICAgYXNzZXRJZCA9IFwiXCJcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGFzc2V0SWQgKz0gYVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChhc3NldElkKSB7XHJcbiAgICAgICAgICAgIGFzc2V0SWRBcnJheS5wdXNoKGFzc2V0SWQpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhc3NldElkQXJyYXlcclxuICAgIH1cclxuXHJcblx0LyogXHU1MjFEXHU1OUNCXHU1MzE2XHU4RDQ0XHU2RTkwICovXHJcblx0cHJpdmF0ZSBpbml0QXNzZXRzKGFzc2V0SWRzOiBzdHJpbmcpOiB2b2lkIHtcclxuXHRcdGxldCBhc3NldElkQXJyYXkgPSB0aGlzLnJlc29sdmVTdHJpbmcoYXNzZXRJZHMpXHJcblx0XHRmb3IgKGxldCBlbGVtZW50IG9mIGFzc2V0SWRBcnJheSkge1xyXG5cdFx0XHRVdGlsLkFzc2V0VXRpbC5hc3luY0Rvd25sb2FkQXNzZXQoZWxlbWVudClcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cclxuXHQvKiogXHU0RUM1XHU1NzI4XHU2RTM4XHU2MjBGXHU2NUY2XHU5NUY0XHU1QkY5XHU5NzVFXHU2QTIxXHU2NzdGXHU1QjlFXHU0RjhCXHU4QzAzXHU3NTI4XHU0RTAwXHU2QjIxICovXHJcbiAgICBwcm90ZWN0ZWQgb25TdGFydCgpIHtcclxuXHRcdC8vXHU1MjFEXHU1OUNCXHU1MzE2XHU1MkE4XHU3NTNCXHU4RDQ0XHU2RTkwIFxyXG5cdFx0dGhpcy5pbml0QXNzZXRzKFwiOTU3NzcsNjEyNDVcIilcclxuXHRcdC8vXHU4QkJFXHU3RjZFXHU4MEZEXHU1NDI2XHU2QkNGXHU1RTI3XHU4OUU2XHU1M0Qxb25VcGRhdGVcclxuXHRcdHRoaXMuY2FuVXBkYXRlID0gZmFsc2VcclxuXHRcdFxyXG5cdFx0Ly9cdTYyN0VcdTUyMzBcdTVCRjlcdTVFOTRcdTc2ODRcdThERjNcdThEQzNcdTYzMDlcdTk0QUVcclxuICAgICAgICBjb25zdCBKdW1wQnRuID0gdGhpcy51aVdpZGdldEJhc2UuZmluZENoaWxkQnlQYXRoKCdSb290Q2FudmFzL0J1dHRvbl9KdW1wJykgYXMgVUkuQnV0dG9uXHJcblx0XHRjb25zdCBBdHRhY2tCdG4gPSB0aGlzLnVpV2lkZ2V0QmFzZS5maW5kQ2hpbGRCeVBhdGgoJ1Jvb3RDYW52YXMvQnV0dG9uX0F0dGFjaycpIGFzIFVJLkJ1dHRvblxyXG5cdFx0Y29uc3QgSW50ZXJhY3RCdG4gPSB0aGlzLnVpV2lkZ2V0QmFzZS5maW5kQ2hpbGRCeVBhdGgoJ1Jvb3RDYW52YXMvQnV0dG9uX0ludGVyYWN0JykgYXMgVUkuQnV0dG9uXHJcblx0XHRcclxuXHRcdC8vXHU3MEI5XHU1MUZCXHU4REYzXHU4REMzXHU2MzA5XHU5NEFFLFx1NUYwMlx1NkI2NVx1ODNCN1x1NTNENlx1NEVCQVx1NzI2OVx1NTQwRVx1NjI2N1x1ODg0Q1x1OERGM1x1OERDM1xyXG4gICAgICAgIEp1bXBCdG4ub25QcmVzc2VkLmFkZCgoKT0+e1xyXG5cdFx0XHRpZiAodGhpcy5DaGFyYWN0ZXIpIHtcclxuXHRcdFx0XHR0aGlzLkNoYXJhY3Rlci5qdW1wKClcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRHYW1lcGxheS5hc3luY0dldEN1cnJlbnRQbGF5ZXIoKS50aGVuKChwbGF5ZXIpID0+IHtcclxuXHRcdFx0XHRcdHRoaXMuQ2hhcmFjdGVyID0gcGxheWVyLmNoYXJhY3RlclxyXG5cdFx0XHRcdFx0Ly9cdTg5RDJcdTgyNzJcdTYyNjdcdTg4NENcdThERjNcdThEQzNcdTUyOUZcdTgwRkRcclxuXHRcdFx0XHRcdHRoaXMuQ2hhcmFjdGVyLmp1bXAoKVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH1cclxuXHRcdH0pXHRcclxuXHJcblx0XHQvL1x1NzBCOVx1NTFGQlx1NjUzQlx1NTFGQlx1NjMwOVx1OTRBRSxcdTVGMDJcdTZCNjVcdTgzQjdcdTUzRDZcdTRFQkFcdTcyNjlcdTU0MEVcdTYyNjdcdTg4NENcdTY1M0JcdTUxRkJcdTUyQThcdTRGNUNcclxuICAgICAgICBBdHRhY2tCdG4ub25QcmVzc2VkLmFkZCgoKT0+e1xyXG5cdFx0XHRcdEdhbWVwbGF5LmFzeW5jR2V0Q3VycmVudFBsYXllcigpLnRoZW4oKHBsYXllcikgPT4ge1xyXG5cdFx0XHRcdFx0dGhpcy5DaGFyYWN0ZXIgPSBwbGF5ZXIuY2hhcmFjdGVyXHJcblx0XHRcdFx0XHQvL1x1OEJBOVx1NTJBOFx1NzUzQlx1NTNFQVx1NTcyOFx1NEUwQVx1NTM0QVx1OEVBQlx1NjRBRFx1NjUzRVxyXG5cdFx0XHRcdFx0bGV0IGFuaW0xID0gcGxheWVyLmNoYXJhY3Rlci5sb2FkQW5pbWF0aW9uKFwiNjEyNDVcIilcclxuXHRcdFx0XHRcdGFuaW0xLnNsb3QgPSBHYW1lcGxheS5BbmltU2xvdC5VcHBlclxyXG5cdFx0XHRcdFx0Ly9cdTg5RDJcdTgyNzJcdTYyNjdcdTg4NENcdTY1M0JcdTUxRkJcdTUyQThcdTRGNUNcclxuXHRcdFx0XHRcdGlmKGFuaW0xLmlzUGxheWluZyl7XHJcblx0XHRcdFx0XHRcdHJldHVyblxyXG5cdFx0XHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0XHRcdGFuaW0xLnBsYXkoKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHR9KVx0XHJcblxyXG5cdFx0Ly9cdTcwQjlcdTUxRkJcdTRFQTRcdTRFOTJcdTYzMDlcdTk0QUUsXHU1RjAyXHU2QjY1XHU4M0I3XHU1M0Q2XHU0RUJBXHU3MjY5XHU1NDBFXHU2MjY3XHU4ODRDXHU0RUE0XHU0RTkyXHU1MkE4XHU0RjVDXHJcbiAgICAgICAgSW50ZXJhY3RCdG4ub25QcmVzc2VkLmFkZCgoKT0+e1xyXG5cdFx0XHRcdEdhbWVwbGF5LmFzeW5jR2V0Q3VycmVudFBsYXllcigpLnRoZW4oKHBsYXllcikgPT4ge1xyXG5cdFx0XHRcdFx0dGhpcy5DaGFyYWN0ZXIgPSBwbGF5ZXIuY2hhcmFjdGVyXHJcblx0XHRcdFx0XHQvL1x1OEJBOVx1NTJBOFx1NzUzQlx1NTNFQVx1NTcyOFx1NEUwQVx1NTM0QVx1OEVBQlx1NjRBRFx1NjUzRVxyXG5cdFx0XHRcdFx0bGV0IGFuaW0yID0gcGxheWVyLmNoYXJhY3Rlci5sb2FkQW5pbWF0aW9uKFwiOTU3NzdcIilcclxuXHRcdFx0XHRcdGFuaW0yLnNsb3QgPSBHYW1lcGxheS5BbmltU2xvdC5VcHBlclxyXG5cdFx0XHRcdFx0Ly9cdTg5RDJcdTgyNzJcdTYyNjdcdTg4NENcdTRFQTRcdTRFOTJcdTUyQThcdTRGNUNcclxuXHRcdFx0XHRcdGlmKGFuaW0yLmlzUGxheWluZyl7XHJcblx0XHRcdFx0XHRcdHJldHVyblxyXG5cdFx0XHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0XHRcdGFuaW0yLnBsYXkoKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblxyXG5cdFx0fSlcdFxyXG5cdFx0XHJcbiAgICB9XHJcblxyXG5cdC8qKiBcclxuXHQgKiBcdTY3ODRcdTkwMjBVSVx1NjU4N1x1NEVGNlx1NjIxMFx1NTI5Rlx1NTQwRVx1RkYwQ29uU3RhcnRcdTRFNEJcdTU0MEUgXHJcblx0ICogXHU1QkY5XHU0RThFVUlcdTc2ODRcdTY4MzlcdTgyODJcdTcwQjlcdTc2ODRcdTZERkJcdTUyQTBcdTY0Q0RcdTRGNUNcdUZGMENcdThGREJcdTg4NENcdThDMDNcdTc1MjhcclxuXHQgKiBcdTZDRThcdTYxMEZcdUZGMUFcdThCRTVcdTRFOEJcdTRFRjZcdTUzRUZcdTgwRkRcdTRGMUFcdTU5MUFcdTZCMjFcdThDMDNcdTc1MjhcclxuXHQgKi9cclxuXHRwcm90ZWN0ZWQgb25BZGRlZCgpIHtcclxuXHR9XHJcblxyXG5cdC8qKiBcclxuXHQgKiBcdTY3ODRcdTkwMjBVSVx1NjU4N1x1NEVGNlx1NjIxMFx1NTI5Rlx1NTQwRVx1RkYwQ29uQWRkZWRcdTRFNEJcdTU0MEVcclxuXHQgKiBcdTVCRjlcdTRFOEVVSVx1NzY4NFx1NjgzOVx1ODI4Mlx1NzBCOVx1NzY4NFx1NzlGQlx1OTY2NFx1NjRDRFx1NEY1Q1x1RkYwQ1x1OEZEQlx1ODg0Q1x1OEMwM1x1NzUyOFxyXG5cdCAqIFx1NkNFOFx1NjEwRlx1RkYxQVx1OEJFNVx1NEU4Qlx1NEVGNlx1NTNFRlx1ODBGRFx1NEYxQVx1NTkxQVx1NkIyMVx1OEMwM1x1NzUyOFxyXG5cdCAqL1xyXG5cdHByb3RlY3RlZCBvblJlbW92ZWQoKSB7XHJcblx0fVxyXG5cclxuXHQvKiogXHJcblx0KiBcdTY3ODRcdTkwMjBVSVx1NjU4N1x1NEVGNlx1NjIxMFx1NTI5Rlx1NTQwRVx1RkYwQ1VJXHU1QkY5XHU4QzYxXHU1MThEXHU4OEFCXHU5NTAwXHU2QkMxXHU2NUY2XHU4QzAzXHU3NTI4IFxyXG5cdCogXHU2Q0U4XHU2MTBGXHVGRjFBXHU4RkQ5XHU0RTRCXHU1NDBFVUlcdTVCRjlcdThDNjFcdTVERjJcdTdFQ0ZcdTg4QUJcdTk1MDBcdTZCQzFcdTRFODZcdUZGMENcdTk3MDBcdTg5ODFcdTc5RkJcdTk2NjRcdTYyNDBcdTY3MDlcdTVCRjlcdThCRTVcdTY1ODdcdTRFRjZcdTU0OENVSVx1NzZGOFx1NTE3M1x1NUJGOVx1OEM2MVx1NEVFNVx1NTNDQVx1NUI1MFx1NUJGOVx1OEM2MVx1NzY4NFx1NUYxNVx1NzUyOFxyXG5cdCovXHJcblx0cHJvdGVjdGVkIG9uRGVzdHJveSgpIHtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCogXHU2QkNGXHU0RTAwXHU1RTI3XHU4QzAzXHU3NTI4XHJcblx0KiBcdTkwMUFcdThGQzdjYW5VcGRhdGVcdTUzRUZcdTRFRTVcdTVGMDBcdTU0MkZcdTUxNzNcdTk1RURcdThDMDNcdTc1MjhcclxuXHQqIGR0IFx1NEUyNFx1NUUyN1x1OEMwM1x1NzUyOFx1NzY4NFx1NjVGNlx1OTVGNFx1NURFRVx1RkYwQ1x1NkJFQlx1NzlEMlxyXG5cdCovXHJcblx0Ly9wcm90ZWN0ZWQgb25VcGRhdGUoZHQgOm51bWJlcikge1xyXG5cdC8vfVxyXG5cclxuXHQvKipcclxuXHQgKiBcdThCQkVcdTdGNkVcdTY2M0VcdTc5M0FcdTY1RjZcdTg5RTZcdTUzRDFcclxuXHQgKi9cclxuXHQvL3Byb3RlY3RlZCBvblNob3coLi4ucGFyYW1zOmFueVtdKSB7XHJcblx0Ly99XHJcblxyXG5cdC8qKlxyXG5cdCAqIFx1OEJCRVx1N0Y2RVx1NEUwRFx1NjYzRVx1NzkzQVx1NjVGNlx1ODlFNlx1NTNEMVxyXG5cdCAqL1xyXG5cdC8vcHJvdGVjdGVkIG9uSGlkZSgpIHtcclxuXHQvL31cclxuXHJcblx0LyoqXHJcblx0ICogXHU1RjUzXHU4RkQ5XHU0RTJBVUlcdTc1NENcdTk3NjJcdTY2MkZcdTUzRUZcdTRFRTVcdTYzQTVcdTY1MzZcdTRFOEJcdTRFRjZcdTc2ODRcdTY1RjZcdTUwMTlcclxuXHQgKiBcdTYyNEJcdTYzMDdcdTYyMTZcdTUyMTlcdTlGMjBcdTY4MDdcdTg5RTZcdTUzRDFcdTRFMDBcdTZCMjFUb3VjaFx1NjVGNlx1ODlFNlx1NTNEMVxyXG5cdCAqIFx1OEZENFx1NTZERVx1NEU4Qlx1NEVGNlx1NjYyRlx1NTQyNlx1NTkwNFx1NzQwNlx1NEU4NlxyXG5cdCAqIFx1NTk4Mlx1Njc5Q1x1NTkwNFx1NzQwNlx1NEU4Nlx1RkYwQ1x1OTBBM1x1NEU0OFx1OEZEOVx1NEUyQVVJXHU3NTRDXHU5NzYyXHU1M0VGXHU0RUU1XHU2M0E1XHU2NTM2XHU4RkQ5XHU2QjIxVG91Y2hcdTU0MEVcdTdFRURcdTc2ODRNb3ZlXHU1NDhDRW5kXHU0RThCXHU0RUY2XHJcblx0ICogXHU1OTgyXHU2NzlDXHU2Q0ExXHU2NzA5XHU1OTA0XHU3NDA2XHVGRjBDXHU5MEEzXHU0RTQ4XHU4RkQ5XHU0RTJBVUlcdTc1NENcdTk3NjJcdTVDMzFcdTY1RTBcdTZDRDVcdTYzQTVcdTY1MzZcdThGRDlcdTZCMjFUb3VjaFx1NTQwRVx1N0VFRFx1NzY4NE1vdmVcdTU0OENFbmRcdTRFOEJcdTRFRjZcclxuXHQgKi9cclxuXHQvL3Byb3RlY3RlZCBvblRvdWNoU3RhcnRlZChJbkdlbW90cnkgOlVJLkdlb21ldHJ5LEluUG9pbnRlckV2ZW50OlVJLlBvaW50ZXJFdmVudCkgOlVJLkV2ZW50UmVwbHl7XHJcblx0Ly9cdHJldHVybiBVSS5FdmVudFJlcGx5LnVuSGFuZGxlZCAvL1VJLkV2ZW50UmVwbHkuaGFuZGxlZFxyXG5cdC8vfVxyXG5cclxuXHQvKipcclxuXHQgKiBcdTYyNEJcdTYzMDdcdTYyMTZcdTUyMTlcdTlGMjBcdTY4MDdcdTUxOERVSVx1NzU0Q1x1OTc2Mlx1NEUwQVx1NzlGQlx1NTJBOFx1NjVGNlxyXG5cdCAqL1xyXG5cdC8vcHJvdGVjdGVkIG9uVG91Y2hNb3ZlZChJbkdlbW90cnkgOlVJLkdlb21ldHJ5LEluUG9pbnRlckV2ZW50OlVJLlBvaW50ZXJFdmVudCkgOlVJLkV2ZW50UmVwbHl7XHJcblx0Ly9cdHJldHVybiBVSS5FdmVudFJlcGx5LnVuSGFuZGxlZCAvL1VJLkV2ZW50UmVwbHkuaGFuZGxlZFxyXG5cdC8vfVxyXG5cclxuXHQvKipcclxuXHQgKiBcdTYyNEJcdTYzMDdcdTYyMTZcdTUyMTlcdTlGMjBcdTY4MDdcdTc5QkJcdTVGMDBVSVx1NzU0Q1x1OTc2Mlx1NjVGNlxyXG5cdCAqL1xyXG5cdC8vcHJvdGVjdGVkIE9uVG91Y2hFbmRlZChJbkdlbW90cnkgOlVJLkdlb21ldHJ5LEluUG9pbnRlckV2ZW50OlVJLlBvaW50ZXJFdmVudCkgOlVJLkV2ZW50UmVwbHl7XHJcblx0Ly9cdHJldHVybiBVSS5FdmVudFJlcGx5LnVuSGFuZGxlZCAvL1VJLkV2ZW50UmVwbHkuaGFuZGxlZFxyXG5cdC8vfVxyXG5cclxuXHQvKipcclxuXHQgKiBcdTVGNTNcdTU3MjhVSVx1NzU0Q1x1OTc2Mlx1NEUwQVx1OEMwM1x1NzUyOGRldGVjdERyYWcvZGV0ZWN0RHJhZ0lmUHJlc3NlZFx1NjVGNlx1ODlFNlx1NTNEMVx1NEUwMFx1NkIyMVxyXG5cdCAqIFx1NTNFRlx1NEVFNVx1ODlFNlx1NTNEMVx1NEUwMFx1NkIyMVx1NjJENlx1NjJGRFx1NEU4Qlx1NEVGNlx1NzY4NFx1NUYwMFx1NTlDQlx1NzUxRlx1NjIxMFxyXG5cdCAqIFx1OEZENFx1NTZERVx1NEUwMFx1NkIyMVx1NzUxRlx1NjIxMFx1NzY4NFx1NjJENlx1NjJGRFx1NEU4Qlx1NEVGNiBuZXdEcmFnRHJvcFx1NTNFRlx1NEVFNVx1NzUxRlx1NjIxMFx1NEUwMFx1NkIyMVx1NEU4Qlx1NEVGNlxyXG5cdCAqL1xyXG5cdC8vcHJvdGVjdGVkIG9uRHJhZ0RldGVjdGVkKEluR2Vtb3RyeSA6VUkuR2VvbWV0cnksSW5Qb2ludGVyRXZlbnQ6VUkuUG9pbnRlckV2ZW50KTpVSS5EcmFnRHJvcE9wZXJhdGlvbiB7XHJcblx0Ly9cdHJldHVybiB0aGlzLm5ld0RyYWdEcm9wKG51bGwpXHJcblx0Ly99XHJcblxyXG5cdC8qKlxyXG5cdCAqIFx1NjJENlx1NjJGRFx1NjRDRFx1NEY1Q1x1NzUxRlx1NjIxMFx1NEU4Qlx1NEVGNlx1ODlFNlx1NTNEMVx1NTQwRVx1N0VDRlx1OEZDN1x1OEZEOVx1NEUyQVVJXHU2NUY2XHU4OUU2XHU1M0QxXHJcblx0ICogXHU4RkQ0XHU1NkRFdHJ1ZVx1NzY4NFx1OEJERFx1ODg2OFx1NzkzQVx1NTkwNFx1NzQwNlx1NEU4Nlx1OEZEOVx1NkIyMVx1NEU4Qlx1NEVGNlx1RkYwQ1x1NEUwRFx1NEYxQVx1NTE4RFx1NUY4MFx1OEZEOVx1NEUyQVVJXHU3Njg0XHU0RTBCXHU0RTAwXHU1QzQyXHU3Njg0VUlcdTdFRTdcdTdFRURcdTUxOTJcdTZDRTFcdThGRDlcdTRFMkFcdTRFOEJcdTRFRjZcclxuXHQgKi9cclxuXHQvL3Byb3RlY3RlZCBvbkRyYWdPdmVyKEluR2Vtb3RyeSA6VUkuR2VvbWV0cnksSW5EcmFnRHJvcEV2ZW50OlVJLlBvaW50ZXJFdmVudCxJbkRyYWdEcm9wT3BlcmF0aW9uOlVJLkRyYWdEcm9wT3BlcmF0aW9uKTpib29sZWFuIHtcclxuXHQvL1x0cmV0dXJuIHRydWVcclxuXHQvL31cclxuXHJcblx0LyoqXHJcblx0ICogXHU2MkQ2XHU2MkZEXHU2NENEXHU0RjVDXHU3NTFGXHU2MjEwXHU0RThCXHU0RUY2XHU4OUU2XHU1M0QxXHU1NDBFXHU1NzI4XHU4RkQ5XHU0RTJBVUlcdTkxQ0FcdTY1M0VcdTVCOENcdTYyMTBcdTY1RjZcclxuXHQgKiBcdThGRDRcdTU2REV0cnVlXHU3Njg0XHU4QkREXHU4ODY4XHU3OTNBXHU1OTA0XHU3NDA2XHU0RTg2XHU4RkQ5XHU2QjIxXHU0RThCXHU0RUY2XHVGRjBDXHU0RTBEXHU0RjFBXHU1MThEXHU1RjgwXHU4RkQ5XHU0RTJBVUlcdTc2ODRcdTRFMEJcdTRFMDBcdTVDNDJcdTc2ODRVSVx1N0VFN1x1N0VFRFx1NTE5Mlx1NkNFMVx1OEZEOVx1NEUyQVx1NEU4Qlx1NEVGNlxyXG5cdCAqL1xyXG5cdC8vcHJvdGVjdGVkIG9uRHJvcChJbkdlbW90cnkgOlVJLkdlb21ldHJ5LEluRHJhZ0Ryb3BFdmVudDpVSS5Qb2ludGVyRXZlbnQsSW5EcmFnRHJvcE9wZXJhdGlvbjpVSS5EcmFnRHJvcE9wZXJhdGlvbik6Ym9vbGVhbiB7XHJcblx0Ly9cdHJldHVybiB0cnVlXHJcblx0Ly99XHJcblxyXG5cdC8qKlxyXG5cdCAqIFx1NjJENlx1NjJGRFx1NjRDRFx1NEY1Q1x1NzUxRlx1NjIxMFx1NEU4Qlx1NEVGNlx1ODlFNlx1NTNEMVx1NTQwRVx1OEZEQlx1NTE2NVx1OEZEOVx1NEUyQVVJXHU2NUY2XHU4OUU2XHU1M0QxXHJcblx0ICovXHJcblx0Ly9wcm90ZWN0ZWQgb25EcmFnRW50ZXIoSW5HZW1vdHJ5IDpVSS5HZW9tZXRyeSxJbkRyYWdEcm9wRXZlbnQ6VUkuUG9pbnRlckV2ZW50LEluRHJhZ0Ryb3BPcGVyYXRpb246VUkuRHJhZ0Ryb3BPcGVyYXRpb24pIHtcclxuXHQvL31cclxuXHJcblx0LyoqXHJcblx0ICogXHU2MkQ2XHU2MkZEXHU2NENEXHU0RjVDXHU3NTFGXHU2MjEwXHU0RThCXHU0RUY2XHU4OUU2XHU1M0QxXHU1NDBFXHU3OUJCXHU1RjAwXHU4RkQ5XHU0RTJBVUlcdTY1RjZcdTg5RTZcdTUzRDFcclxuXHQgKi9cclxuXHQvL3Byb3RlY3RlZCBvbkRyYWdMZWF2ZShJbkdlbW90cnkgOlVJLkdlb21ldHJ5LEluRHJhZ0Ryb3BFdmVudDpVSS5Qb2ludGVyRXZlbnQpIHtcclxuXHQvL31cclxuXHRcclxuXHQvKipcclxuXHQgKiBcdTYyRDZcdTYyRkRcdTY0Q0RcdTRGNUNcdTc1MUZcdTYyMTBcdTRFOEJcdTRFRjZcdTg5RTZcdTUzRDFcdTU0MEVcdUZGMENcdTZDQTFcdTY3MDlcdTVCOENcdTYyMTBcdTVCOENcdTYyMTBcdTc2ODRcdTYyRDZcdTYyRkRcdTRFOEJcdTRFRjZcdTgwMENcdTUzRDZcdTZEODhcdTY1RjZcdTg5RTZcdTUzRDFcclxuXHQgKi9cclxuXHQvL3Byb3RlY3RlZCBvbkRyYWdDYW5jZWxsZWQoSW5HZW1vdHJ5IDpVSS5HZW9tZXRyeSxJbkRyYWdEcm9wRXZlbnQ6VUkuUG9pbnRlckV2ZW50KSB7XHJcblx0Ly99XHJcblxyXG59XHJcbiIsICJleHBvcnQgbmFtZXNwYWNlIEdhbWVEZWZ7XHJcbiAgICAvKiBcdTVCRjlcdThDNjFcdTZDNjBcdTYzQTVcdTUzRTMgKi9cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSVBvb2w8VD4ge1xyXG5cclxuICAgICAgICBhbGxvY2F0ZSgpOiBUXHJcbiAgICBcclxuICAgICAgICByZWN5Y2xlKG9iajogVCk6IGJvb2xlYW5cclxuICAgIFxyXG4gICAgICAgIHJlbGVhc2UoKTogdm9pZFxyXG4gICAgXHJcbiAgICB9XHJcbiAgICAvKiBcdTVCRjlcdThDNjFcdTVERTVcdTUzODJcdTYzQTVcdTUzRTMgKi9cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSU9iamVjdEZhY3Rvcnk8VD4ge1xyXG5cclxuICAgICAgICBjcmVhdGUoKTogVFxyXG5cclxuICAgICAgICBkZXN0cm95KG9iajogVCk6IHZvaWRcclxuXHJcbiAgICB9XHJcbiAgICAvKiBcdTVCRjlcdThDNjFcdTZDNjBcdTYyQkRcdThDNjFcdTZBMjFcdTY3N0ZcdTdDN0IgKi9cclxuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBQb29sPFQ+IGltcGxlbWVudHMgSVBvb2w8VD4ge1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgbUNhY2hlU3RhY2s6IEFycmF5PFQ+ID0gbmV3IEFycmF5PFQ+KClcclxuXHJcbiAgICAgICAgbVVzaW5nQXJyYXk6IEFycmF5PFQ+ID0gbmV3IEFycmF5PFQ+KClcclxuXHJcbiAgICAgICAgZ2V0IENhY2hlU3RhY2tDb3VudCgpOiBudW1iZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tQ2FjaGVTdGFjay5sZW5ndGhcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBVc2luZ0NvdW50KCk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1Vc2luZ0FycmF5Lmxlbmd0aFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIG1GYWN0b3J5OiBJT2JqZWN0RmFjdG9yeTxUPlxyXG5cclxuICAgICAgICBhbGxvY2F0ZSgpOiBUIHtcclxuICAgICAgICAgICAgbGV0IG9iaiA9IHRoaXMubUNhY2hlU3RhY2subGVuZ3RoID4gMCA/IHRoaXMubUNhY2hlU3RhY2sucG9wKCkgOiB0aGlzLm1GYWN0b3J5LmNyZWF0ZSgpXHJcbiAgICAgICAgICAgIHRoaXMubVVzaW5nQXJyYXkucHVzaChvYmopXHJcbiAgICAgICAgICAgIHJldHVybiBvYmpcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGFic3RyYWN0IHJlY3ljbGUob2JqOiBUKTogYm9vbGVhblxyXG5cclxuICAgICAgICByZWxlYXNlKCk6IHZvaWQge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCA7aSA8IHRoaXMubVVzaW5nQXJyYXkubGVuZ3RoIDtpKyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLm1Vc2luZ0FycmF5W2ldXHJcbiAgICAgICAgICAgICAgICB0aGlzLm1GYWN0b3J5LmRlc3Ryb3koZWxlbWVudClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm1Vc2luZ0FycmF5Lmxlbmd0aCA9IDBcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwIDtpIDwgdGhpcy5tQ2FjaGVTdGFjay5sZW5ndGggO2krKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMubUNhY2hlU3RhY2tbaV1cclxuICAgICAgICAgICAgICAgIHRoaXMubUZhY3RvcnkuZGVzdHJveShlbGVtZW50KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubUNhY2hlU3RhY2subGVuZ3RoID0gMFxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICAvKiBcdTgxRUFcdTVCOUFcdTRFNDlcdTVERTVcdTUzODJcdTZBMjFcdTY3N0ZcdTdDN0IgKi9cclxuICAgIGV4cG9ydCBjbGFzcyBDdXN0b21PYmplY3RGYWN0b3J5PFQ+IGltcGxlbWVudHMgSU9iamVjdEZhY3Rvcnk8VD4ge1xyXG5cclxuICAgICAgICBwcml2YXRlIG1GYWN0b3J5Q3JlYXRlTWV0aG9kOiAoKSA9PiBUXHJcblxyXG4gICAgICAgIHByaXZhdGUgbUZhY3RvcnlEZXN0cm95TWV0aG9kOiAob2JqOiBUKSA9PiB2b2lkXHJcblxyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcihmYWN0b3J5Q3JlYXRlTWV0aG9kOiAoKSA9PiBULCBmYWN0b3J5RGVzdHJveU1ldGhvZDogKG9iajogVCkgPT4gdm9pZCkge1xyXG4gICAgICAgICAgICB0aGlzLm1GYWN0b3J5Q3JlYXRlTWV0aG9kID0gZmFjdG9yeUNyZWF0ZU1ldGhvZFxyXG4gICAgICAgICAgICB0aGlzLm1GYWN0b3J5RGVzdHJveU1ldGhvZCA9IGZhY3RvcnlEZXN0cm95TWV0aG9kXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjcmVhdGUoKTogVCB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1GYWN0b3J5Q3JlYXRlTWV0aG9kKClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRlc3Ryb3kob2JqOiBUKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1GYWN0b3J5RGVzdHJveU1ldGhvZChvYmopXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuICAgIC8qIFx1NUJGOVx1OEM2MVx1NkM2MFx1NkEyMVx1Njc3Rlx1N0M3QiAqL1xyXG4gICAgZXhwb3J0IGNsYXNzIFNpbXBsZU9iamVjdFBvb2w8VD4gZXh0ZW5kcyBQb29sPFQ+IHtcclxuXHJcbiAgICAgICAgbVJlc2V0TWV0aG9kOiBGdW5jdGlvblxyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcihmYWN0b3J5Q3JlYXRlTWV0aG9kOiAoKSA9PiBULCBmYWN0b3J5RGVzdHJveU1ldGhvZDogKG9iajogVCkgPT4gdm9pZCwgcmVzZXRNZXRob2Q6IEZ1bmN0aW9uID0gbnVsbCkge1xyXG4gICAgICAgICAgICBzdXBlcigpXHJcbiAgICAgICAgICAgIHRoaXMubUZhY3RvcnkgPSBuZXcgQ3VzdG9tT2JqZWN0RmFjdG9yeTxUPihmYWN0b3J5Q3JlYXRlTWV0aG9kLCBmYWN0b3J5RGVzdHJveU1ldGhvZClcclxuICAgICAgICAgICAgdGhpcy5tUmVzZXRNZXRob2QgPSByZXNldE1ldGhvZFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmVjeWNsZShvYmo6IFQpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubUNhY2hlU3RhY2suaW5kZXhPZihvYmopID4gLTEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1SZXNldE1ldGhvZCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1SZXNldE1ldGhvZChvYmopXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5tVXNpbmdBcnJheS5pbmRleE9mKG9iailcclxuICAgICAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubVVzaW5nQXJyYXkuc3BsaWNlKGluZGV4LCAxKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubUNhY2hlU3RhY2sucHVzaChvYmopXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZWN5Y2xlQWxsKCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCA7aSA8IHRoaXMubVVzaW5nQXJyYXkubGVuZ3RoIDtpKyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLm1Vc2luZ0FycmF5W2ldXHJcbiAgICAgICAgICAgICAgICB0aGlzLm1SZXNldE1ldGhvZChlbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5tQ2FjaGVTdGFjay5wdXNoKGVsZW1lbnQpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5tVXNpbmdBcnJheS5sZW5ndGggPSAwXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcmludFRvdGFsU2l6ZSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcInRvdGFsIHNpemU6IFwiICsgKHRoaXMuVXNpbmdDb3VudCArIHRoaXMuQ2FjaGVTdGFja0NvdW50KSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKiBcdTkxQ0RcdTUyOUIgKi9cclxuICAgIGV4cG9ydCBjb25zdCBHUkFWSVRBSU9OQUxfQUNDRUxFUkFUSU9OOiBudW1iZXIgPSA5LjhcclxuICAgIC8qIFx1NjcwMFx1NTkyN1x1NUI1MFx1NUYzOVx1OTAxRlx1NUVBNiAqL1xyXG4gICAgZXhwb3J0IGNvbnN0IE1BWF9TSE9PVFNQRUVEOiBudW1iZXIgPSAxMDAwMVxyXG4gICAgLyogZGVidWdcdTY4MDdcdThCQzYgKi9cclxuICAgIGV4cG9ydCBjb25zdCBERUJVR19GTEFHOiBib29sZWFuID0gZmFsc2VcclxuICAgIC8qIFx1NzUyOFx1NEU4RVx1ODNCN1x1NTNENlx1NTNEMVx1NUMwNFx1NjVCOVx1NTQxMVx1NzY4NFx1NUMwNFx1N0EwQlx1OERERFx1NzlCQiAqL1xyXG4gICAgZXhwb3J0IGNvbnN0IFNIT09UX1JBTkdFOiBudW1iZXIgPSAxMDAwMDBcclxuICAgIC8qIFx1NUYzOVx1NThGM1x1NjI5Qlx1NUMwNFx1NjMwMVx1N0VFRFx1NjVGNlx1OTVGNCAqL1xyXG4gICAgZXhwb3J0IGNvbnN0IENBU0lOR19MSUZFOiBudW1iZXIgPSAxXHJcbiAgICAvKiBcdTVGMzlcdTU4RjNcdTYyOUJcdTVDMDRcdTRGNERcdTdGNkVcdTUwNEZcdTc5RkIgKi9cclxuICAgIGV4cG9ydCBjb25zdCBDQVNJTkdfT0ZGU0VUOiBUeXBlLlZlY3RvciA9IG5ldyBUeXBlLlZlY3Rvcig4LCA1LCAxMClcclxufSIsICJpbXBvcnQgeyBHYW1lRGVmIH0gZnJvbSBcIi4uL0dhbWVEZWZcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQW1tbyB7XHJcbiAgICBvd25lcjogR2FtZXBsYXkuQ2hhcmFjdGVyIC8vIFx1NUYzOVx1ODM2Rlx1NjI0MFx1NUM1RVx1ODlEMlx1ODI3MlxyXG4gICAgaGl0UmVzdWx0OiBDb3JlLkdhbWVPYmplY3RbXSB8IEdhbWVwbGF5LkhpdFJlc3VsdFtdIC8vIFx1NTFGQlx1NEUyRFx1N0VEM1x1Njc5Q1xyXG5cclxuICAgIHByaXZhdGUgYW1tb1Bvb2w6IEdhbWVEZWYuU2ltcGxlT2JqZWN0UG9vbDxDb3JlLkdhbWVPYmplY3Q+IC8vIFx1NUYzOVx1ODM2Rlx1NUJGOVx1OEM2MVx1NkM2MFxyXG4gICAgcHJpdmF0ZSBlbnRpdHk6IENvcmUuR2FtZU9iamVjdCAvLyBcdTVGMzlcdTgzNkZcdTVCOUVcdTRGNTNcclxuICAgIHByaXZhdGUgZGlzcGxhY2VtZW50OiBUeXBlLlZlY3RvciAvLyBcdTZCQ0ZcdTc5RDJcdTRGNERcdTc5RkJcclxuICAgIHByaXZhdGUgY3VycmVudExvY2F0aW9uOiBUeXBlLlZlY3RvciAvLyBcdTVGNTNcdTUyNERcdTRGNERcdTdGNkVcclxuICAgIHByaXZhdGUgZ3Jhdml0eVNjYWxlOiBudW1iZXIgLy8gXHU5MUNEXHU1MjlCXHU3Q0ZCXHU2NTcwXHJcbiAgICBwcml2YXRlIGxpZmVUaW1lOiBudW1iZXIgLy8gXHU3NTFGXHU1NDdEXHU1NDY4XHU2NzFGXHJcbiAgICBwcml2YXRlIGN1cnJlbnRUaW1lOiBudW1iZXIgLy8gXHU1RjUzXHU1MjREXHU4RkQwXHU1MkE4XHU2NUY2XHU5NUY0XHJcbiAgICBwcml2YXRlIHN0cmlkZTogVHlwZS5WZWN0b3IgLy8gXHU2QjY1XHU5NTdGXHJcbiAgICBwcml2YXRlIGRldGVjdFJhZGl1czogbnVtYmVyIC8vIFx1NzhCMFx1NjQ5RVx1NjhDMFx1NkQ0Qlx1NTM0QVx1NUY4NFx0XHJcblxyXG4gICAgY29uc3RydWN0b3Iob3duZXI6IEdhbWVwbGF5LkNoYXJhY3RlciwgYW1tb1Bvb2w6IEdhbWVEZWYuU2ltcGxlT2JqZWN0UG9vbDxDb3JlLkdhbWVPYmplY3Q+LCBzdGFydExvYzogVHlwZS5WZWN0b3IsIGRpcmVjdGlvbjogVHlwZS5WZWN0b3IsIHNob290UmFuZ2U6IG51bWJlciwgYW1tb1NwZWVkOiBudW1iZXIsIGdyYXZpdHlTY2FsZTogbnVtYmVyLCBkZXRlY3RSYWRpdXM6IG51bWJlciwgaGl0UmVzdWx0OiBDb3JlLkdhbWVPYmplY3RbXSB8IEdhbWVwbGF5LkhpdFJlc3VsdFtdID0gW10pIHtcclxuICAgICAgICB0aGlzLm93bmVyID0gb3duZXJcclxuICAgICAgICB0aGlzLmFtbW9Qb29sID0gYW1tb1Bvb2xcclxuICAgICAgICB0aGlzLmVudGl0eSA9IHRoaXMuYW1tb1Bvb2wuYWxsb2NhdGUoKVxyXG4gICAgICAgIHRoaXMuZW50aXR5LmRldGFjaEZyb21HYW1lT2JqZWN0KClcclxuICAgICAgICB0aGlzLmN1cnJlbnRMb2NhdGlvbiA9IHN0YXJ0TG9jLmNsb25lKClcclxuICAgICAgICB0aGlzLmVudGl0eS53b3JsZExvY2F0aW9uID0gdGhpcy5jdXJyZW50TG9jYXRpb25cclxuICAgICAgICB0aGlzLmVudGl0eS53b3JsZFJvdGF0aW9uID0gZGlyZWN0aW9uLnRvUm90YXRpb24oKVxyXG4gICAgICAgIHRoaXMuZW50aXR5LnNldFZpc2liaWxpdHkoVHlwZS5Qcm9wZXJ0eVN0YXR1cy5PbilcclxuICAgICAgICB0aGlzLmRpc3BsYWNlbWVudCA9IFR5cGUuVmVjdG9yLm11bHRpcGx5KGRpcmVjdGlvbiwgYW1tb1NwZWVkLCB0aGlzLmRpc3BsYWNlbWVudClcclxuICAgICAgICB0aGlzLmxpZmVUaW1lID0gc2hvb3RSYW5nZSAvIGFtbW9TcGVlZFxyXG4gICAgICAgIHRoaXMuY3VycmVudFRpbWUgPSAwXHJcbiAgICAgICAgdGhpcy5ncmF2aXR5U2NhbGUgPSBncmF2aXR5U2NhbGVcclxuICAgICAgICB0aGlzLnN0cmlkZSA9IFR5cGUuVmVjdG9yLnplcm9cclxuICAgICAgICB0aGlzLmRldGVjdFJhZGl1cyA9IGRldGVjdFJhZGl1c1xyXG4gICAgICAgIHRoaXMuaGl0UmVzdWx0ID0gaGl0UmVzdWx0XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8vIFx1NjZGNFx1NjVCMFx1NUYzOVx1ODM2Rlx1NEY0RFx1N0Y2RVx1RkYwQ1x1NTNEMVx1NUMwNFx1NUJBMlx1NjIzN1x1N0FFRlx1NjI3Rlx1NjJDNVx1NjhDMFx1NkQ0QlxyXG4gICAgcHVibGljIHVwZGF0ZShkdDogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgLy8gXHU4QkExXHU3Qjk3XHU1RjUzXHU1MjREXHU1RTI3XHU1RjM5XHU4MzZGXHU3OUZCXHU1MkE4XHU2QjY1XHU5NTdGXHJcbiAgICAgICAgdGhpcy5zdHJpZGUgPSBUeXBlLlZlY3Rvci5tdWx0aXBseSh0aGlzLmRpc3BsYWNlbWVudCwgZHQsIHRoaXMuc3RyaWRlKVxyXG4gICAgICAgIC8vIFx1NTk4Mlx1Njc5Q1x1OTFDRFx1NTI5Qlx1N0NGQlx1NjU3MFx1NEUwRFx1NEUzQTBcdTUyMTlcdTVCRjl6XHU4Rjc0XHU1NzUwXHU2ODA3XHU1NDhDXHU2NUNCXHU4RjZDXHU4RkRCXHU4ODRDXHU4RkRCXHU0RTAwXHU2QjY1XHU4QkExXHU3Qjk3XHJcbiAgICAgICAgaWYgKHRoaXMuZ3Jhdml0eVNjYWxlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RyaWRlLnogLT0gKDUwICogdGhpcy5ncmF2aXR5U2NhbGUgKiBHYW1lRGVmLkdSQVZJVEFJT05BTF9BQ0NFTEVSQVRJT04gKiAoTWF0aC5wb3codGhpcy5jdXJyZW50VGltZSArIGR0LCAyKSAtIE1hdGgucG93KHRoaXMuY3VycmVudFRpbWUsIDIpKSlcclxuICAgICAgICAgICAgdGhpcy5lbnRpdHkud29ybGRSb3RhdGlvbiA9IHRoaXMuc3RyaWRlLnRvUm90YXRpb24oKVxyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRUaW1lICs9IGR0XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFx1OEJBMVx1N0I5N1x1NTFGQVx1NUY1M1x1NTI0RFx1NjZGNFx1NjVCMFx1NEY0RFx1N0Y2RVxyXG4gICAgICAgIHRoaXMuY3VycmVudExvY2F0aW9uLnggKz0gdGhpcy5zdHJpZGUueFxyXG4gICAgICAgIHRoaXMuY3VycmVudExvY2F0aW9uLnkgKz0gdGhpcy5zdHJpZGUueVxyXG4gICAgICAgIHRoaXMuY3VycmVudExvY2F0aW9uLnogKz0gdGhpcy5zdHJpZGUuelxyXG5cclxuICAgICAgICAvLyBcdTU5ODJcdTY3OUNcdTY4QzBcdTZENEJcdTgzMDNcdTU2RjRcdTU5MjdcdTRFOEUwXHVGRjBDXHU2QkNGXHU1RTI3XHU2OEMwXHU2RDRCXHU3OEIwXHU2NDlFXHVGRjA4XHU1M0VBXHU2NzA5XHU2QjY2XHU1NjY4XHU2MzAxXHU2NzA5XHU0RUJBXHU1QkEyXHU2MjM3XHU3QUVGXHU1QjUwXHU1RjM5XHU4RkRCXHU4ODRDXHU2OEMwXHU2RDRCXHVGRjBDXHU1MTc2XHU0RjU5XHU1QkEyXHU2MjM3XHU3QUVGXHU1M0VBXHU2NjJGXHU2QTIxXHU2MkRGXHVGRjA5XHJcbiAgICAgICAgaWYgKHRoaXMuZGV0ZWN0UmFkaXVzKSB7XHJcbiAgICAgICAgICAgIC8vIFx1NTk4Mlx1Njc5Q1x1NjhDMFx1NkQ0Qlx1ODMwM1x1NTZGNFx1NUMwRlx1NEU4RTEwXHVGRjBDXHU1QzA0XHU3RUJGXHU2OEMwXHU2RDRCXHVGRjBDXHU4RkQ0XHU1NkRFR2FtZXBsYXkuSGl0UmVzdWx0XHU2NTcwXHU3RUM0XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmRldGVjdFJhZGl1cyA8IDEwKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbGluZVJlc3VsdCA9IEdhbWVwbGF5LmxpbmVUcmFjZSh0aGlzLmVudGl0eS53b3JsZExvY2F0aW9uLCB0aGlzLmN1cnJlbnRMb2NhdGlvbiwgdHJ1ZSwgR2FtZURlZi5ERUJVR19GTEFHKVxyXG4gICAgICAgICAgICAgICAgbGluZVJlc3VsdCA9IGxpbmVSZXN1bHQuZmlsdGVyKGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAhKGUuZ2FtZU9iamVjdCBpbnN0YW5jZW9mIEdhbWVwbGF5LlRyaWdnZXIpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLy8gXHU1QzA0XHU3RUJGXHU2OEMwXHU2RDRCXHU3RUQzXHU2NzlDXHU0RTBEXHU0RTNBMFx1RkYwQ1x1NTM3M1x1NjcwOVx1NzhCMFx1NjQ5RVx1NUJGOVx1OEM2MVxyXG4gICAgICAgICAgICAgICAgaWYgKGxpbmVSZXN1bHQubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFx1N0VDOFx1N0VEM1x1NUYzOVx1ODM2Rlx1NzUxRlx1NTQ3RFx1RkYwQ1x1ODNCN1x1NTNENlx1NjhDMFx1NkQ0Qlx1N0VEM1x1Njc5Q1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGlmZVRpbWUgPSAtMVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wID0gbmV3IEFycmF5PEdhbWVwbGF5LkhpdFJlc3VsdD4oKVxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGVsZW1lbnQgb2YgbGluZVJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wLnB1c2goZWxlbWVudClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaXRSZXN1bHQgPSB0ZW1wXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7IC8vIFx1NTk4Mlx1Njc5Q1x1NjhDMFx1NkQ0Qlx1ODMwM1x1NTZGNFx1NTkyN1x1NEU4RVx1N0I0OVx1NEU4RTEwXHVGRjBDXHU3N0U5XHU1RjYyXHU2OEMwXHU2RDRCXHVGRjBDXHU4RkQ0XHU1NkRFQ29yZS5HYW1lT2JqZWN0XHU2NTcwXHU3RUM0XHJcbiAgICAgICAgICAgICAgICBsZXQgYm94UmVzdWx0ID0gR2FtZXBsYXkuYm94T3ZlcmxhcEluTGV2ZWwodGhpcy5lbnRpdHkud29ybGRMb2NhdGlvbiwgdGhpcy5jdXJyZW50TG9jYXRpb24sIHRoaXMuZGV0ZWN0UmFkaXVzLCB0aGlzLmRldGVjdFJhZGl1cywgR2FtZURlZi5ERUJVR19GTEFHKVxyXG4gICAgICAgICAgICAgICAgLy8gXHU1QzA0XHU3RUJGXHU2OEMwXHU2RDRCXHU3RUQzXHU2NzlDXHU0RTBEXHU0RTNBMFx1RkYwQ1x1NTM3M1x1NjcwOVx1NzhCMFx1NjQ5RVx1NUJGOVx1OEM2MVxyXG4gICAgICAgICAgICAgICAgaWYgKGJveFJlc3VsdC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gXHU3RUM4XHU3RUQzXHU1RjM5XHU4MzZGXHU3NTFGXHU1NDdEXHVGRjBDXHU4M0I3XHU1M0Q2XHU2OEMwXHU2RDRCXHU3RUQzXHU2NzlDXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saWZlVGltZSA9IC0xXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaXRSZXN1bHQgPSBib3hSZXN1bHRcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gXHU2NkY0XHU2NUIwXHU1RjM5XHU4MzZGXHU1QjlFXHU0RjUzXHU0RjREXHU3RjZFXHVGRjBDXHU1RjM5XHU4MzZGXHU3NTFGXHU1NDdELT1cdTVGNTNcdTUyNERcdTVFMjdcdTY1RjZcdTk1RjRcdUZGMENcdThGRDRcdTU2REVcdTVGMzlcdTgzNkZcdTc1MUZcdTU0N0Q8MFx1NzY4NEJvb2xlYW5cdTUwM0NcclxuICAgICAgICB0aGlzLmVudGl0eS53b3JsZExvY2F0aW9uID0gdGhpcy5jdXJyZW50TG9jYXRpb25cclxuICAgICAgICB0aGlzLmxpZmVUaW1lIC09IGR0XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubGlmZVRpbWUgPD0gMFxyXG4gICAgfVxyXG5cclxuICAgIC8vIFx1OTUwMFx1NkJDMVx1NUYzOVx1ODM2Rlx1NjVCOVx1NkNENVx1RkYwQ1x1NUJGOVx1OEM2MVx1NkM2MFx1NTZERVx1NjUzNlx1NUYzOVx1ODM2Rlx1NUI5RVx1NEY1M1xyXG4gICAgcHVibGljIGRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5hbW1vUG9vbC5yZWN5Y2xlKHRoaXMuZW50aXR5KVxyXG4gICAgfVxyXG5cclxufSIsICJpbXBvcnQgeyBHYW1lRGVmIH0gZnJvbSBcIi4uL0dhbWVEZWZcIlxyXG5cclxuLy8gXHU1RjM5XHU1OEYzXHU3QzdCXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhc2luZyB7XHJcblx0cHJpdmF0ZSBjYXNpbmdQb29sOiBHYW1lRGVmLlNpbXBsZU9iamVjdFBvb2w8Q29yZS5HYW1lT2JqZWN0PiAvLyBcdTVGMzlcdTU4RjNcdTVCRjlcdThDNjFcdTZDNjBcclxuXHRwcml2YXRlIGVudGl0eTogQ29yZS5HYW1lT2JqZWN0IC8vIFx1NUYzOVx1NThGM1x1NUI5RVx1NEY1M1xyXG5cdHByaXZhdGUgZGlzcGxhY2VtZW50OiBUeXBlLlZlY3RvciAvLyBcdTRGNERcdTc5RkJcclxuXHRwcml2YXRlIGxvYzogVHlwZS5WZWN0b3IgLy8gXHU1RjUzXHU1MjREXHU0RjREXHU3RjZFXHJcblx0cHJpdmF0ZSBncmF2aXR5OiBudW1iZXIgLy8gXHU5MUNEXHU1MjlCXHJcblx0cHJpdmF0ZSBsaWZlVGltZTogbnVtYmVyIC8vIFx1NzUxRlx1NTQ3RFx1NTQ2OFx1NjcxRlxyXG5cdHByaXZhdGUgc3RyaWRlOiBUeXBlLlZlY3RvciAvLyBcdTZCNjVcdTk1N0ZcclxuXHJcblx0Y29uc3RydWN0b3IoY2FzaW5nUG9vbDogR2FtZURlZi5TaW1wbGVPYmplY3RQb29sPENvcmUuR2FtZU9iamVjdD4sIGNhc2luZzogQ29yZS5HYW1lT2JqZWN0LCBkaXJlY3Rpb246IFR5cGUuVmVjdG9yKSB7XHJcblx0XHR0aGlzLmNhc2luZ1Bvb2wgPSBjYXNpbmdQb29sXHJcblx0XHR0aGlzLmxvYyA9IFR5cGUuVmVjdG9yLmFkZChjYXNpbmcud29ybGRMb2NhdGlvbiwgY2FzaW5nLndvcmxkUm90YXRpb24ucm90YXRlVmVjdG9yKEdhbWVEZWYuQ0FTSU5HX09GRlNFVCkpXHJcblx0XHR0aGlzLmVudGl0eSA9IHRoaXMuY2FzaW5nUG9vbC5hbGxvY2F0ZSgpXHJcblx0XHR0aGlzLmVudGl0eS53b3JsZExvY2F0aW9uID0gdGhpcy5sb2NcclxuXHRcdHRoaXMuZW50aXR5LndvcmxkUm90YXRpb24gPSBuZXcgVHlwZS5Sb3RhdGlvbihVdGlsLk1hdGhVdGlsLnJhbmRvbUZsb2F0KDAsIDE4MCksIFV0aWwuTWF0aFV0aWwucmFuZG9tRmxvYXQoMCwgMTgwKSwgVXRpbC5NYXRoVXRpbC5yYW5kb21GbG9hdCgwLCAxODApKVxyXG5cdFx0dGhpcy5lbnRpdHkuc2V0VmlzaWJpbGl0eShUeXBlLlByb3BlcnR5U3RhdHVzLk9uKVxyXG5cdFx0dGhpcy5kaXNwbGFjZW1lbnQgPSBkaXJlY3Rpb24ubXVsdGlwbHkoMTAwKVxyXG5cdFx0dGhpcy5ncmF2aXR5ID0gVXRpbC5NYXRoVXRpbC5yYW5kb21GbG9hdCgxLCAzKVxyXG5cdFx0dGhpcy5saWZlVGltZSA9IEdhbWVEZWYuQ0FTSU5HX0xJRkVcclxuXHRcdHRoaXMuc3RyaWRlID0gVHlwZS5WZWN0b3IuemVyb1xyXG5cdH1cclxuXHJcblx0Ly8gXHU2NkY0XHU2NUIwXHU1RjM5XHU1OEYzXHU0RjREXHU3RjZFXHJcblx0dXBkYXRlKGR0OiBudW1iZXIpIHtcclxuXHRcdHRoaXMuc3RyaWRlID0gVHlwZS5WZWN0b3IubXVsdGlwbHkodGhpcy5kaXNwbGFjZW1lbnQsIGR0LCB0aGlzLnN0cmlkZSlcclxuXHRcdHRoaXMubG9jLnggKz0gdGhpcy5zdHJpZGUueFxyXG5cdFx0dGhpcy5sb2MueSArPSB0aGlzLnN0cmlkZS55XHJcblx0XHR0aGlzLmxvYy56ICs9IHRoaXMuc3RyaWRlLnogKyB0aGlzLmdyYXZpdHlcclxuXHRcdHRoaXMuZ3Jhdml0eSAtPSBkdCAqIDIwXHJcblx0XHR0aGlzLmVudGl0eS53b3JsZExvY2F0aW9uID0gdGhpcy5sb2NcclxuXHRcdHRoaXMubGlmZVRpbWUgLT0gZHRcclxuXHRcdHJldHVybiB0aGlzLmxpZmVUaW1lIDw9IDBcclxuXHR9XHJcblxyXG5cdC8vIFx1OTUwMFx1NkJDMVx1NUYzOVx1NThGM1x1NjVCOVx1NkNENVx1RkYwQ1x1NUJGOVx1OEM2MVx1NkM2MFx1NTZERVx1NjUzNlx1NUYzOVx1NThGM1x1NUI5RVx1NEY1M1xyXG5cdGRlc3Ryb3koKSB7XHJcblx0XHR0aGlzLmNhc2luZ1Bvb2wucmVjeWNsZSh0aGlzLmVudGl0eSlcclxuXHJcblx0fVxyXG59IiwgImltcG9ydCB7IElXZWFwb25Db25maWdFbGVtZW50LCBXZWFwb25Db25maWdDb25maWcgfSBmcm9tIFwiLi4vQ29uZmlnL1dlYXBvbkNvbmZpZ1wiXHJcbmltcG9ydCB7IEdhbWVEZWYgfSBmcm9tIFwiLi4vR2FtZURlZlwiXHJcbmltcG9ydCBBbW1vIGZyb20gXCIuL0FtbW9CYXNlQ2xzXCJcclxuaW1wb3J0IENhc2luZyBmcm9tIFwiLi9DYXNpbmdCYXNlQ2xzXCJcclxuaW1wb3J0IFdlYXBvblVJIGZyb20gXCIuL1dlYXBvblVJXCJcclxuaW1wb3J0IHsgR2FtZUNvbmZpZyB9IGZyb20gXCIuLi9Db25maWcvR2FtZUNvbmZpZ1wiXHJcbmltcG9ydCB7IFByZWZhYkV2ZW50IH0gZnJvbSBcIi4uLy4uL3ByZWZhYkV2ZW50L1ByZWZhYkV2ZW50XCJcclxuaW1wb3J0IHsgSUFjdGlvbkVsZW1lbnQgfSBmcm9tIFwiLi4vQ29uZmlnL0FjdGlvblwiXHJcbmltcG9ydCB7IElXZWFwb25SZXNvdXJjZXNFbGVtZW50IH0gZnJvbSBcIi4uL0NvbmZpZy9XZWFwb25SZXNvdXJjZXNcIlxyXG5cclxuQENvcmUuQ2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2VhcG9uRHJpdmVyIGV4dGVuZHMgQ29yZS5TY3JpcHQge1xyXG5cdC8qKiAqL1xyXG5cdHB1YmxpYyBjb25maWc6IElXZWFwb25Db25maWdFbGVtZW50XHJcblx0LyoqXHU2NjJGXHU1NDI2XHU1QjhDXHU2MjEwXHU1MjFEXHU1OUNCXHU1MzE2ICovXHJcblx0cHJpdmF0ZSBoYXNJbml0OiBib29sZWFuID0gZmFsc2VcclxuXHJcblx0QENvcmUuUHJvcGVydHkoeyBoaWRlSW5FZGl0b3I6IHRydWUsIHJlcGxpY2F0ZWQ6IHRydWUsIG9uQ2hhbmdlZDogXCJvbkVxdWlwZENoYW5nZWRcIiB9KVxyXG5cdHB1YmxpYyBpc0VxdWlwZWQ6IGJvb2xlYW4gPSBmYWxzZVxyXG5cclxuXHQvKiBcdTcwRURcdTZCNjZcdTU2NjhcdTkwM0JcdThGOTFcdTVCRjlcdThDNjEgKi9cclxuXHR3ZWFwb25PYmo6IEdhbWVwbGF5LkhvdFdlYXBvbiA9IG51bGxcclxuXHJcblx0LyogXHU1MkE4XHU0RjVDXHU4RDQ0XHU2RTkwICovXHJcblx0d2VhcG9uQWN0aW9uOiBJQWN0aW9uRWxlbWVudCA9IG51bGxcclxuXHJcblx0LyoqXHU2QjY2XHU1NjY4XHU0RjdGXHU3NTI4XHU3Njg0XHU4RDQ0XHU0RUE3XHU5MTREXHU3RjZFICovXHJcblx0d2VhcG9uUmVzb3VyY2VzIDogSVdlYXBvblJlc291cmNlc0VsZW1lbnQgPSBudWxsXHJcblxyXG5cdC8qIFx1NkI2Nlx1NTY2OFVJICovXHJcblx0d2VhcG9uVUk6IFdlYXBvblVJID0gbnVsbFxyXG5cclxuXHQvKiBcdTVGNTNcdTUyNERcdTVCQTJcdTYyMzdcdTdBRUZcdTczQTlcdTVCQjYgKi9cclxuXHRwbGF5ZXI6IEdhbWVwbGF5LlBsYXllciA9IG51bGxcclxuXHJcblx0LyogXHU1RjUzXHU1MjREXHU1QkEyXHU2MjM3XHU3QUVGXHU4OUQyXHU4MjcyICovXHJcblx0Y2hhcmE6IEdhbWVwbGF5LkNoYXJhY3RlciA9IG51bGxcclxuXHJcblx0LyogXHU1RjUzXHU1MjREXHU1QkEyXHU2MjM3XHU3QUVGXHU4OUQyXHU4MjcyXHU2NDQ0XHU1MENGXHU2NzNBICovXHJcblx0Y2FtZXJhOiBHYW1lcGxheS5DYW1lcmFTeXN0ZW0gPSBudWxsXHJcblxyXG5cdC8qIFx1NjJGRVx1NTNENlx1ODlFNlx1NTNEMVx1NTY2OCAqL1xyXG5cdHBpY2tVcFRyaWdnZXI6IEdhbWVwbGF5LlRyaWdnZXIgPSBudWxsXHJcblxyXG5cdC8qIFx1NjgzOVx1NkI2Nlx1NTY2OCAqL1xyXG5cdHdlYXBvbkVudGl0eVJvb3Q6IENvcmUuR2FtZU9iamVjdCA9IG51bGxcclxuXHJcblx0LyogXHU2ODM5XHU1RjM5XHU4MzZGICovXHJcblx0YW1tb0VudGl0eVJvb3Q6IENvcmUuR2FtZU9iamVjdCA9IG51bGxcclxuXHJcblx0LyogXHU1RjM5XHU4MzZGXHU2QzYwICovXHJcblx0YW1tb1Bvb2w6IEdhbWVEZWYuU2ltcGxlT2JqZWN0UG9vbDxDb3JlLkdhbWVPYmplY3Q+ID0gbnVsbFxyXG5cclxuXHQvKiBcdTVGMzlcdTgzNkZcdTY1NzBcdTdFQzQgKi9cclxuXHRhbW1vQXJyYXk6IEFycmF5PEFtbW8+ID0gW11cclxuXHJcblx0LyogXHU1RjM5XHU1OEYzICovXHJcblx0Y2FzaW5nRW50aXR5OiBDb3JlLkdhbWVPYmplY3QgPSBudWxsXHJcblxyXG5cdC8qIFx1NUYzOVx1NThGM1x1NkM2MCAqL1xyXG5cdGNhc2luZ1Bvb2w6IEdhbWVEZWYuU2ltcGxlT2JqZWN0UG9vbDxDb3JlLkdhbWVPYmplY3Q+ID0gbnVsbFxyXG5cclxuXHQvKiBcdTVGMzlcdTU4RjNcdTY1NzBcdTdFQzQgKi9cclxuXHRjYXNpbmdBcnJheTogQXJyYXk8Q2FzaW5nPiA9IFtdXHJcblxyXG5cdC8qIFx1NUYwMFx1NzA2Qlx1NzI3OVx1NjU0OCAqL1xyXG5cdGZpcmVFZmZlY3Q6IEdhbWVwbGF5LlBhcnRpY2xlID0gbnVsbFxyXG5cclxuXHQvKiBcdTUxRkJcdTRFMkRcdTg5RDJcdTgyNzJcdTcyNzlcdTY1NDggKi9cclxuXHRoaXRDaGFyYUVmZmVjdDogR2FtZXBsYXkuUGFydGljbGUgPSBudWxsXHJcblxyXG5cdC8qIFx1NTFGQlx1NEUyRFx1ODlEMlx1ODI3Mlx1NzI3OVx1NjU0OFx1NkM2MCAqL1xyXG5cdGhpdENoYXJhRWZmZWN0UG9vbDogR2FtZURlZi5TaW1wbGVPYmplY3RQb29sPEdhbWVwbGF5LlBhcnRpY2xlPiA9IG51bGxcclxuXHJcblx0LyogXHU1MUZCXHU0RTJEXHU3MjY5XHU0RjUzXHU3Mjc5XHU2NTQ4ICovXHJcblx0aGl0RWZmZWN0OiBHYW1lcGxheS5QYXJ0aWNsZSA9IG51bGxcclxuXHJcblx0LyogXHU1MUZCXHU0RTJEXHU3MjY5XHU0RjUzXHU3Mjc5XHU2NTQ4XHU2QzYwICovXHJcblx0aGl0RWZmZWN0UG9vbDogR2FtZURlZi5TaW1wbGVPYmplY3RQb29sPEdhbWVwbGF5LlBhcnRpY2xlPiA9IG51bGxcclxuXHJcblx0LyogXHU5N0YzXHU2NTQ4XHU5N0YzXHU5MUNGICovXHJcblx0c3RhdGljIHNvdW5kVm9sdW1lOiBudW1iZXIgPSAxXHJcblxyXG5cdC8qIFx1NUYwMFx1NzA2Qlx1OTdGM1x1NjU0OCAqL1xyXG5cdGZpcmVTb3VuZDogR2FtZXBsYXkuU291bmQgPSBudWxsXHJcblxyXG5cdC8qIFx1NjM2Mlx1NUYzOVx1OTdGM1x1NjU0OCAqL1xyXG5cdHJlbG9hZFNvdW5kOiBHYW1lcGxheS5Tb3VuZCA9IG51bGxcclxuXHJcblx0LyogXHU0RTBBXHU4MTlCXHU5N0YzXHU2NTQ4ICovXHJcblx0bG9hZFNvdW5kOiBHYW1lcGxheS5Tb3VuZCA9IG51bGxcclxuXHJcblx0LyogXHU3Nzg0XHU1MUM2XHU5N0YzXHU2NTQ4ICovXHJcblx0YWltU291bmQ6IEdhbWVwbGF5LlNvdW5kID0gbnVsbFxyXG5cclxuXHQvKiBcdTUxRkJcdTRFMkRcdTg5RDJcdTgyNzJcdTk3RjNcdTY1NDggKi9cclxuXHRoaXRDaGFyYVNvdW5kOiBHYW1lcGxheS5Tb3VuZCA9IG51bGxcclxuXHJcblx0LyogXHU1MUZCXHU0RTJEXHU4OUQyXHU4MjcyXHU5N0YzXHU2NTQ4XHU2QzYwICovXHJcblx0aGl0Q2hhcmFTb3VuZFBvb2w6IEdhbWVEZWYuU2ltcGxlT2JqZWN0UG9vbDxHYW1lcGxheS5Tb3VuZD4gPSBudWxsXHJcblxyXG5cdC8qIFx1NTFGQlx1NEUyRFx1NzI2OVx1NEY1M1x1OTdGM1x1NjU0OCAqL1xyXG5cdGhpdFNvdW5kOiBHYW1lcGxheS5Tb3VuZCA9IG51bGxcclxuXHJcblx0LyogXHU1MUZCXHU0RTJEXHU3MjY5XHU0RjUzXHU5N0YzXHU2NTQ4XHU2QzYwICovXHJcblx0aGl0U291bmRQb29sOiBHYW1lRGVmLlNpbXBsZU9iamVjdFBvb2w8R2FtZXBsYXkuU291bmQ+ID0gbnVsbFxyXG5cclxuXHQvKiBcdTVGMDBcdTcwNkJcdTcyQjZcdTYwMDFcdTY4MDdcdThCQzZcdUZGMEMgaXNGaXJpbmdcdTY2MkZcdTZCNjZcdTU2NjhcdTYzMDFcdTY3MDlcdTRFQkFcdTVCOUVcdTk2NDVcdTc2ODRcdTVGMDBcdTcwNkJcdTcyQjZcdTYwMDEqL1xyXG5cdGlzRmlyaW5nOiBib29sZWFuID0gZmFsc2VcclxuXHJcblx0LyogYkZpcmluZ1x1NjYyRlx1NkI2Nlx1NTY2OFx1NUI5RVx1OTY0NVx1NzY4NFx1NUYwMFx1NzA2Qlx1NzJCNlx1NjAwMSAqL1xyXG5cdGJGaXJpbmc6IGJvb2xlYW4gPSBmYWxzZVxyXG5cclxuXHQvKiBcdTY2MkZcdTU0MjZcdTUzRUZcdTRFRTVcdTVGMDBcdTcwNkIgKi9cclxuXHRpc0NhbkZpcmU6IG51bWJlciA9IDBcclxuXHJcblx0LyogXHU3Nzg0XHU1MUM2XHU3MkI2XHU2MDAxXHU2ODA3XHU4QkM2ICovXHJcblx0aXNBaW1taW5nOiBib29sZWFuID0gZmFsc2VcclxuXHJcblx0LyogXHU3MTI2XHU4REREXHU1M0Q4XHU1MzE2XHU2ODA3XHU4QkM2ICovXHJcblx0aXNab29taW5nOiBib29sZWFuID0gZmFsc2VcclxuXHJcblx0LyogXHU5NjNCXHU2MzIxXHU3MkI2XHU2MDAxXHU2ODA3XHU4QkM2ICovXHJcblx0aXNCbG9jazogYm9vbGVhbiA9IGZhbHNlXHJcblxyXG5cdGlzQXV0b1JlbG9hZDogYm9vbGVhbiA9IGZhbHNlXHJcblxyXG5cdHRvdGFsQW1tbzogbnVtYmVyXHJcblxyXG5cdC8qKiBcdTUyNjlcdTRGNTlcdTYzMDFcdTY3MDlcdTY1RjZcdTk1RjQgKi9cclxuXHRwcml2YXRlIF9yZXN0VGltZTogbnVtYmVyXHJcblx0Ly8gLyogXHU1RjM5XHU4MzZGXHU5OERFXHU4ODRDXHU2NUI5XHU1NDExICovXHJcblx0Ly8gYW1tb0RpcmVjdGlvbjogVHlwZS5WZWN0b3IgPSBUeXBlLlZlY3Rvci56ZXJvXHJcblxyXG5cdHByaXZhdGUgX3JvdGF0ZVJvdGF0aW9uOiBSb3RhdGlvbiA9IFJvdGF0aW9uLnplcm9cclxuXHJcblx0cHJpdmF0ZSBwcmVsb2FkQXNzZXRzOiBBcnJheTxzdHJpbmc+XHJcblxyXG5cdC8qIFx1NTFGQlx1NEUyRFx1NTZERVx1OEMwM1x1NTFGRFx1NjU3MCAqL1xyXG5cdGNsaWVudE9uSGl0OiAoaGl0UmVzdWx0OiBDb3JlLkdhbWVPYmplY3RbXSB8IEdhbWVwbGF5LkhpdFJlc3VsdFtdLCBhdHRhY2tQbGF5ZXI6IG51bWJlciwgaXNPYmo6IGJvb2xlYW4pID0+IHZvaWRcclxuXHJcblx0LyogXHU5NjNCXHU2MzIxXHU2ODA3XHU4QkM2XHU1M0Q4XHU1MzE2XHU1NkRFXHU4QzAzXHU1MUZEXHU2NTcwICovXHJcblx0Y2xpZW50T25CbG9ja0NoYW5nZTogKGlzQmxvY2s6IGJvb2xlYW4pID0+IHZvaWRcclxuXHQvKipcdTY3QUFcdTY4QjBcdTc2ODRcdTUyMURcdTU5Q0JcdTUzMTYgKi9cclxuXHRwdWJsaWMgSW5pdFdlYXBvbihpZDogbnVtYmVyKTogdm9pZCB7XHJcblx0XHR0aGlzLmNvbmZpZyA9IEdhbWVDb25maWcuV2VhcG9uQ29uZmlnLmdldEVsZW1lbnQoaWQpXHJcblx0XHR0aGlzLmlzQXV0b1JlbG9hZCA9IHRoaXMuY29uZmlnLmlzQXV0b1JlbG9hZFxyXG5cdFx0dGhpcy50b3RhbEFtbW8gPSB0aGlzLmNvbmZpZy50b3RhbEFtbW9cclxuXHRcdHRoaXMud2VhcG9uUmVzb3VyY2VzID0gR2FtZUNvbmZpZy5XZWFwb25SZXNvdXJjZXMuZ2V0RWxlbWVudCh0aGlzLmNvbmZpZy5yZXNvdXJjZXNJZClcdFxyXG5cdFx0bGV0IG1hbGVBY3Rpb24gPSBHYW1lQ29uZmlnLkFjdGlvbi5nZXRFbGVtZW50KHRoaXMuY29uZmlnLm1hbGVBY3Rpb24pXHJcblx0XHRsZXQgZmVtYWxlQWN0aW9uID0gR2FtZUNvbmZpZy5BY3Rpb24uZ2V0RWxlbWVudCh0aGlzLmNvbmZpZy5mZW1hbGVBY3Rpb24pXHJcblxyXG5cdFx0Zm9yIChjb25zdCBrZXkgaW4gbWFsZUFjdGlvbikge1xyXG5cdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1hbGVBY3Rpb24sIGtleSkpIHtcclxuXHRcdFx0XHRjb25zdCBlbGVtZW50ID0gbWFsZUFjdGlvbltrZXldO1xyXG5cdFx0XHRcdGlmIChrZXkgIT0gXCJpZFwiKSB7XHJcblx0XHRcdFx0XHRVdGlsLkFzc2V0VXRpbC5hc3luY0Rvd25sb2FkQXNzZXQoZWxlbWVudClcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGZvciAoY29uc3Qga2V5IGluIGZlbWFsZUFjdGlvbikge1xyXG5cdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1hbGVBY3Rpb24sIGtleSkpIHtcclxuXHRcdFx0XHRjb25zdCBlbGVtZW50ID0gbWFsZUFjdGlvbltrZXldO1xyXG5cdFx0XHRcdGlmIChrZXkgIT0gXCJpZFwiKSB7XHJcblx0XHRcdFx0XHRVdGlsLkFzc2V0VXRpbC5hc3luY0Rvd25sb2FkQXNzZXQoZWxlbWVudClcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGZvciAoY29uc3Qga2V5IGluIHRoaXMud2VhcG9uUmVzb3VyY2VzKSB7XHJcblx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobWFsZUFjdGlvbiwga2V5KSkge1xyXG5cdFx0XHRcdGNvbnN0IGVsZW1lbnQgPSBtYWxlQWN0aW9uW2tleV07XHJcblx0XHRcdFx0aWYgKGtleSAhPSBcImlkXCIpIHtcclxuXHRcdFx0XHRcdFV0aWwuQXNzZXRVdGlsLmFzeW5jRG93bmxvYWRBc3NldChlbGVtZW50KVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHQvKiogXHU1RjUzXHU4MTFBXHU2NzJDXHU4OEFCXHU1QjlFXHU0RjhCXHU1NDBFXHVGRjBDXHU0RjFBXHU1NzI4XHU3QjJDXHU0RTAwXHU1RTI3XHU2NkY0XHU2NUIwXHU1MjREXHU4QzAzXHU3NTI4XHU2QjY0XHU1MUZEXHU2NTcwICovXHJcblx0cHJvdGVjdGVkIGFzeW5jIG9uU3RhcnQoKSB7XHJcblx0XHR3aGlsZSAoIXRoaXMuaGFzSW5pdCkge1xyXG5cdFx0XHRUaW1lVXRpbC5kZWxheVNlY29uZCgwLjEpXHJcblx0XHR9XHJcblx0XHR0aGlzLnVzZVVwZGF0ZSA9IHRydWVcclxuXHRcdHRoaXMud2VhcG9uT2JqID0gdGhpcy5nYW1lT2JqZWN0IGFzIEdhbWVwbGF5LkhvdFdlYXBvblxyXG5cdFx0dGhpcy5pbml0QXNzZXRzKHRoaXMucHJlbG9hZEFzc2V0cylcclxuXHRcdGlmICh0aGlzLndlYXBvbk9iaikge1xyXG5cdFx0XHRpZiAoVXRpbC5TeXN0ZW1VdGlsLmlzQ2xpZW50KCkpIHtcclxuXHRcdFx0XHR0aGlzLmNsaWVudEluaXQoKVxyXG5cdFx0XHR9XHJcblx0XHRcdGlmIChVdGlsLlN5c3RlbVV0aWwuaXNTZXJ2ZXIoKSkge1xyXG5cdFx0XHRcdHRoaXMuc2VydmVySW5pdCgpXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChVdGlsLlN5c3RlbVV0aWwuaXNDbGllbnQoKSkge1xyXG5cdFx0XHRcdHRoaXMuY2xpZW50T25IaXQgPSAoaGl0UmVzdWx0OiBDb3JlLkdhbWVPYmplY3RbXSB8IEdhbWVwbGF5LkhpdFJlc3VsdFtdLCBhdHRhY2tQbGF5ZXI6IG51bWJlciwgaXNPYmo6IGJvb2xlYW4pID0+IHtcclxuXHRcdFx0XHRcdGhpdFJlc3VsdC5mb3JFYWNoKGUgPT4ge1xyXG5cclxuXHRcdFx0XHRcdFx0aWYgKGUgaW5zdGFuY2VvZiBHYW1lcGxheS5IaXRSZXN1bHQpIHtcclxuXHRcdFx0XHRcdFx0XHRpZiAoZS5nYW1lT2JqZWN0IGluc3RhbmNlb2YgR2FtZXBsYXkuQ2hhcmFjdGVyIHx8XHJcblx0XHRcdFx0XHRcdFx0XHRlLmdhbWVPYmplY3QgaW5zdGFuY2VvZiBDb3JlLkdhbWVPYmplY3QpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFByZWZhYkV2ZW50LlByZWZhYkV2dEZpZ2h0LmhpdCh0aGlzLmNoYXJhLmd1aWQsIGUuZ2FtZU9iamVjdC5ndWlkLCB0aGlzLmNvbmZpZy5kYW1hZ2UsIGUuaW1wYWN0UG9pbnQuY2xvbmUoKSlcclxuXHRcdFx0XHRcdFx0XHRcdHJldHVyblxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0aWYgKGUgaW5zdGFuY2VvZiBHYW1lcGxheS5DaGFyYWN0ZXIgfHwgZSBpbnN0YW5jZW9mIENvcmUuR2FtZU9iamVjdCkge1xyXG5cdFx0XHRcdFx0XHRcdFByZWZhYkV2ZW50LlByZWZhYkV2dEZpZ2h0LmhpdCh0aGlzLmNoYXJhLmd1aWQsIGUuZ3VpZCwgdGhpcy5jb25maWcuZGFtYWdlLCBlLndvcmxkTG9jYXRpb24uY2xvbmUoKSlcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm5cclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdH0pXHJcblxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0UHJlZmFiRXZlbnQuUHJlZmFiRXZ0RXF1aXAub25FcXVpcChhc3luYyAodGFyZ2V0R3VpZDogc3RyaW5nLCBzbG90OiBQcmVmYWJFdmVudC5FcXVpcFNsb3QsIGVxdWlwR3VpZDogc3RyaW5nKSA9PiB7XHJcblx0XHRcdFx0XHQvL2xldCBwbGF5ZXIgPSBhd2FpdCBHYW1lcGxheS5hc3luY0dldEN1cnJlbnRQbGF5ZXIoKVxyXG5cdFx0XHRcdFx0aWYgKHRoaXMud2VhcG9uT2JqICYmIHRoaXMud2VhcG9uT2JqLmdldEN1cnJlbnRPd25lcigpICYmIHRoaXMud2VhcG9uT2JqLmdldEN1cnJlbnRPd25lcigpLmd1aWQgPT0gdGFyZ2V0R3VpZCAmJiB0aGlzLndlYXBvbk9iai5ndWlkICE9IGVxdWlwR3VpZCkge1xyXG5cdFx0XHRcdFx0XHR0aGlzLnVuRXF1aXAoKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBvbkVxdWlwZENoYW5nZWQoKSB7XHJcblx0XHR0aGlzLndlYXBvbkVudGl0eVJvb3QucmVsYXRpdmVSb3RhdGlvbiA9IFJvdGF0aW9uLnplcm9cclxuXHR9XHJcblx0LyoqXHJcblx0ICogXHU1NDY4XHU2NzFGXHU1MUZEXHU2NTcwIFx1NkJDRlx1NUUyN1x1NjI2N1x1ODg0Q1xyXG5cdCAqIFx1NkI2NFx1NTFGRFx1NjU3MFx1NjI2N1x1ODg0Q1x1OTcwMFx1ODk4MVx1NUMwNnRoaXMuYlVzZVVwZGF0ZVx1OEQ0Qlx1NTAzQ1x1NEUzQXRydWVcclxuXHQgKiBAcGFyYW0gZHQgXHU1RjUzXHU1MjREXHU1RTI3XHU0RTBFXHU0RTBBXHU0RTAwXHU1RTI3XHU3Njg0XHU1RUY2XHU4RkRGIC8gXHU3OUQyXHJcblx0ICovXHJcblx0cHJvdGVjdGVkIG9uVXBkYXRlKGR0OiBudW1iZXIpOiB2b2lkIHtcclxuXHRcdGlmIChVdGlsLlN5c3RlbVV0aWwuaXNTZXJ2ZXIoKSkgcmV0dXJuXHJcblx0XHRpZiAodGhpcy53ZWFwb25PYmogPT0gbnVsbCkge1xyXG5cdFx0XHR0aGlzLndlYXBvbk9iaiA9IHRoaXMuZ2FtZU9iamVjdCBhcyBHYW1lcGxheS5Ib3RXZWFwb25cclxuXHRcdFx0aWYgKHRoaXMud2VhcG9uT2JqID09IG51bGwpIHJldHVyblxyXG5cdFx0XHR0aGlzLmNsaWVudEluaXQoKVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmICghdGhpcy5pc0VxdWlwZWQgJiYgdGhpcy53ZWFwb25FbnRpdHlSb290KSB7XHJcblx0XHRcdHRoaXMuX3JvdGF0ZVJvdGF0aW9uLnogPSB0aGlzLmNvbmZpZy5yb3RhdGVTcGVlZCAqIGR0XHJcblx0XHRcdHRoaXMud2VhcG9uRW50aXR5Um9vdC53b3JsZFJvdGF0aW9uID0gdGhpcy53ZWFwb25FbnRpdHlSb290LndvcmxkUm90YXRpb24uYWRkKHRoaXMuX3JvdGF0ZVJvdGF0aW9uKVxyXG5cdFx0XHRyZXR1cm5cclxuXHRcdH1cclxuXHJcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYW1tb0FycmF5Lmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGlmICh0aGlzLmFtbW9BcnJheVtpXS51cGRhdGUoZHQpKSB7XHJcblx0XHRcdFx0aWYgKHRoaXMuYW1tb0FycmF5W2ldLm93bmVyID09IHRoaXMuY2hhcmEpIHtcclxuXHRcdFx0XHRcdHRoaXMuc2VydmVyRGVzdHJveUFtbW8oaSlcclxuXHRcdFx0XHRcdHRoaXMuaGl0KHRoaXMuYW1tb0FycmF5W2ldLmhpdFJlc3VsdClcclxuXHRcdFx0XHRcdHRoaXMuYW1tb0FycmF5W2ldLmRlc3Ryb3koKVxyXG5cdFx0XHRcdFx0dGhpcy5hbW1vQXJyYXkuc3BsaWNlKGksIDEpXHJcblx0XHRcdFx0XHRpLS1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY2FzaW5nQXJyYXkubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0aWYgKHRoaXMuY2FzaW5nQXJyYXlbaV0udXBkYXRlKGR0KSkge1xyXG5cdFx0XHRcdHRoaXMuY2FzaW5nQXJyYXlbaV0uZGVzdHJveSgpXHJcblx0XHRcdFx0dGhpcy5jYXNpbmdBcnJheS5zcGxpY2UoaSwgMSlcclxuXHRcdFx0XHRpLS1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0aGlzLndlYXBvbk9iai5nZXRDdXJyZW50T3duZXIoKSAhPT0gdGhpcy5jaGFyYSkgcmV0dXJuXHJcblxyXG5cdFx0aWYgKHRoaXMuaXNDYW5GaXJlICE9IDApIHtcclxuXHRcdFx0dGhpcy5pc0NhbkZpcmUgLT0gZHRcclxuXHRcdFx0aWYgKHRoaXMuaXNDYW5GaXJlIDwgMCkge1xyXG5cdFx0XHRcdHRoaXMuaXNDYW5GaXJlID0gMFxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5jYW1lcmFVcGRhdGUoZHQpXHJcblxyXG5cdFx0aWYgKCF0aGlzLnVwZGF0ZWJGaXJpbmcoKSkge1xyXG5cdFx0XHRpZiAoIXRoaXMuYkZpcmluZyAmJiB0aGlzLmZpcmVFZmZlY3QubG9vcCAmJiB0aGlzLmZpcmVTb3VuZC5sb29wKSB7XHJcblx0XHRcdFx0dGhpcy5maXJlRWZmZWN0LnN0b3AoKVxyXG5cdFx0XHRcdHRoaXMuZmlyZVNvdW5kLnN0b3AoKVxyXG5cdFx0XHRcdGlmICghdGhpcy5pc0FpbW1pbmcpIHtcclxuXHRcdFx0XHRcdHRoaXMud2VhcG9uT2JqLmFpbUNvbXBvbmVudC5lbmFibGVBaW1pbmcoZmFsc2UpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCF0aGlzLnVwZGF0ZUJsb2NrRmlyZSgpKSB7XHJcblx0XHRcdHRoaXMuY2xpZW50T25CbG9ja0NoYW5nZSh0aGlzLmlzQmxvY2spXHJcblx0XHR9XHJcblxyXG5cdFx0c3dpdGNoICh0aGlzLndlYXBvbk9iai5nZXRDdXJyZW50U3RhdGUoKSkge1xyXG5cdFx0XHRjYXNlIEdhbWVwbGF5LkhvdFdlYXBvblN0YXRlLklkbGU6XHJcblx0XHRcdFx0aWYgKHRoaXMud2VhcG9uT2JqLmZpcmVDb21wb25lbnQuY3VycmVudEJ1bGxldFNpemUgPCAxKSB7XHJcblx0XHRcdFx0XHRpZiAodGhpcy5pc0F1dG9SZWxvYWQpIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5zdGFydFJlbG9hZCgpXHJcblx0XHRcdFx0XHRcdHRoaXMuaXNBdXRvUmVsb2FkID0gZmFsc2VcclxuXHRcdFx0XHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XHJcblx0XHRcdFx0XHRcdFx0dGhpcy5pc0F1dG9SZWxvYWQgPSB0cnVlXHJcblx0XHRcdFx0XHRcdH0sIHRoaXMud2VhcG9uT2JqLnJlbG9hZENvbXBvbmVudC5yZWxvYWREdXJhdGlvbiAqIDEwMDApXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGlmICh0aGlzLmlzRmlyaW5nICYmICF0aGlzLmJGaXJpbmcgJiYgdGhpcy53ZWFwb25PYmouZmlyZUNvbXBvbmVudC5jdXJyZW50RmlyZU1vZGVsID09IDIpIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5zdGFydEZpcmUoKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0YnJlYWtcclxuXHJcblx0XHRcdGNhc2UgR2FtZXBsYXkuSG90V2VhcG9uU3RhdGUuUmVsb2FkaW5nOlxyXG5cclxuXHRcdFx0XHRicmVha1xyXG5cclxuXHRcdFx0Y2FzZSBHYW1lcGxheS5Ib3RXZWFwb25TdGF0ZS5Mb2FkaW5nOlxyXG5cclxuXHRcdFx0XHRicmVha1xyXG5cclxuXHRcdFx0Y2FzZSBHYW1lcGxheS5Ib3RXZWFwb25TdGF0ZS5GaXJpbmc6XHJcblx0XHRcdFx0aWYgKHRoaXMuY29uZmlnLmlzRW1wdHlUb0Rlc3Ryb3kgJiYgdGhpcy5jb25maWcudG90YWxBbW1vID09IDAgJiYgdGhpcy53ZWFwb25PYmouZmlyZUNvbXBvbmVudC5jdXJyZW50QnVsbGV0U2l6ZSA9PSAwKSB7XHJcblx0XHRcdFx0XHR0aGlzLnVuRXF1aXAoKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRicmVha1xyXG5cclxuXHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRicmVha1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0aGlzLndlYXBvblVJKSB7XHJcblx0XHRcdC8vdGhpcy53ZWFwb25VSS5jaGFuZ2VCdWxsZXQodGhpcy53ZWFwb25PYmouZmlyZUNvbXBvbmVudC5jdXJyZW50QnVsbGV0U2l6ZSwgdGhpcy5jb25maWcudG90YWxBbW1vKVxyXG5cdFx0XHRpZiAodGhpcy5jb25maWcua2VlcFRpbWUgIT0gLTEpIHtcclxuXHRcdFx0XHR0aGlzLl9yZXN0VGltZSAtPSBkdFxyXG5cdFx0XHRcdC8vdGhpcy53ZWFwb25VSS5zZXRUaW1lVGV4dCh0aGlzLl9yZXN0VGltZSwgdGhpcy5jb25maWcua2VlcFRpbWUpXHJcblx0XHRcdFx0aWYgKHRoaXMuX3Jlc3RUaW1lIDw9IDApIHtcclxuXHRcdFx0XHRcdHRoaXMudW5FcXVpcCgpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cdC8qKiBcdTgxMUFcdTY3MkNcdTg4QUJcdTk1MDBcdTZCQzFcdTY1RjZcdTY3MDBcdTU0MEVcdTRFMDBcdTVFMjdcdTYyNjdcdTg4NENcdTVCOENcdThDMDNcdTc1MjhcdTZCNjRcdTUxRkRcdTY1NzAgKi9cclxuXHRwcm90ZWN0ZWQgb25EZXN0cm95KCk6IHZvaWQge1xyXG5cdFx0dGhpcy5jbGllbnREZXN0cm95KClcclxuXHR9XHJcblx0LyogXHU1MUZCXHU0RTJEXHU1QkY5XHU4QzYxXHU1MUZEXHU2NTcwICovXHJcblx0cHJvdGVjdGVkIGhpdChoaXRSZXN1bHQ6IENvcmUuR2FtZU9iamVjdFtdIHwgR2FtZXBsYXkuSGl0UmVzdWx0W10pIHtcclxuXHRcdGlmICghKGhpdFJlc3VsdC5sZW5ndGggPiAwKSkgcmV0dXJuXHJcblx0XHRpZiAodGhpcy5jb25maWcuZGV0ZWN0UmFkaXVzID4gMTApIHsgLy8gXHU3N0U5XHU1RjYyXHU2OEMwXHU2RDRCXHU3RUQzXHU2NzlDXHJcblx0XHRcdGZvciAobGV0IGVsZW1lbnQgb2YgaGl0UmVzdWx0KSB7XHJcblx0XHRcdFx0bGV0IHRlbXAgPSBlbGVtZW50IGFzIENvcmUuR2FtZU9iamVjdFxyXG5cdFx0XHRcdGlmICh0ZW1wIGluc3RhbmNlb2YgR2FtZXBsYXkuQ2hhcmFjdGVyQmFzZSkge1xyXG5cdFx0XHRcdFx0dGhpcy5oaXRDaGFyYWN0ZXJNdWx0aWNhc3QodGVtcC53b3JsZExvY2F0aW9uLCB0ZW1wLndvcmxkUm90YXRpb24pXHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHRoaXMuaGl0T2JqZWN0TXVsdGljYXN0KHRlbXAud29ybGRMb2NhdGlvbiwgdGVtcC53b3JsZFJvdGF0aW9uKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAodGhpcy5jb25maWcuaHVydFJhZGl1cyA+IDEwKSB7XHJcblx0XHRcdFx0bGV0IHNwaGVyZVJlc3VsdCA9IEdhbWVwbGF5LnNwaGVyZU92ZXJsYXAoKGhpdFJlc3VsdFswXSBhcyBDb3JlLkdhbWVPYmplY3QpLndvcmxkTG9jYXRpb24sIHRoaXMuY29uZmlnLmh1cnRSYWRpdXMsIEdhbWVEZWYuREVCVUdfRkxBRylcclxuXHRcdFx0XHR0aGlzLmNsaWVudE9uSGl0KHNwaGVyZVJlc3VsdCwgdGhpcy5wbGF5ZXIuZ2V0UGxheWVySUQoKSwgdHJ1ZSlcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLmNsaWVudE9uSGl0KGhpdFJlc3VsdCwgdGhpcy5wbGF5ZXIuZ2V0UGxheWVySUQoKSwgdHJ1ZSlcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHsgLy8gXHU1QzA0XHU3RUJGXHU2OEMwXHU2RDRCXHU3RUQzXHU2NzlDXHJcblx0XHRcdGZvciAobGV0IGVsZW1lbnQgb2YgaGl0UmVzdWx0KSB7XHJcblx0XHRcdFx0bGV0IHRlbXAgPSBlbGVtZW50IGFzIEdhbWVwbGF5LkhpdFJlc3VsdFxyXG5cdFx0XHRcdGxldCByb3QgPSB0ZW1wLmltcGFjdE5vcm1hbC50b1JvdGF0aW9uKClcclxuXHRcdFx0XHRyb3QueSAtPSA5MFxyXG5cdFx0XHRcdGlmICh0ZW1wLmdhbWVPYmplY3QgaW5zdGFuY2VvZiBHYW1lcGxheS5DaGFyYWN0ZXJCYXNlKSB7XHJcblx0XHRcdFx0XHR0aGlzLmhpdENoYXJhY3Rlck11bHRpY2FzdCh0ZW1wLmltcGFjdFBvaW50LCByb3QpXHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHRoaXMuaGl0T2JqZWN0TXVsdGljYXN0KHRlbXAuaW1wYWN0UG9pbnQsIHJvdClcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKHRoaXMuY29uZmlnLmh1cnRSYWRpdXMgPiAxMCkge1xyXG5cdFx0XHRcdGxldCBzcGhlcmVSZXN1bHQgPSBHYW1lcGxheS5zcGhlcmVPdmVybGFwKChoaXRSZXN1bHRbMF0gYXMgR2FtZXBsYXkuSGl0UmVzdWx0KS5pbXBhY3RQb2ludCwgdGhpcy5jb25maWcuaHVydFJhZGl1cywgR2FtZURlZi5ERUJVR19GTEFHKVxyXG5cdFx0XHRcdHRoaXMuY2xpZW50T25IaXQoc3BoZXJlUmVzdWx0LCB0aGlzLnBsYXllci5nZXRQbGF5ZXJJRCgpLCB0cnVlKVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuY2xpZW50T25IaXQoaGl0UmVzdWx0LCB0aGlzLnBsYXllci5nZXRQbGF5ZXJJRCgpLCBmYWxzZSlcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyogXHU1RTdGXHU2NEFEXHU1MUZCXHU0RTJEXHU4OUQyXHU4MjcyICovXHJcblx0QENvcmUuRnVuY3Rpb24oQ29yZS5TZXJ2ZXIpXHJcblx0cHJpdmF0ZSBoaXRDaGFyYWN0ZXJNdWx0aWNhc3QobG9jOiBUeXBlLlZlY3Rvciwgcm90OiBUeXBlLlJvdGF0aW9uKSB7XHJcblx0XHR0aGlzLmhpdENoYXJhUGVyZm9ybWFuY2UobG9jLCByb3QpXHJcblx0fVxyXG5cclxuXHQvKiBcdTVFN0ZcdTY0QURcdTUxRkJcdTRFMkRcdTY2NkVcdTkwMUFcdTVCRjlcdThDNjEgKi9cclxuXHRAQ29yZS5GdW5jdGlvbihDb3JlLlNlcnZlcilcclxuXHRwcml2YXRlIGhpdE9iamVjdE11bHRpY2FzdChsb2M6IFR5cGUuVmVjdG9yLCByb3Q6IFR5cGUuUm90YXRpb24pIHtcclxuXHRcdHRoaXMuaGl0T2JqZWN0UGVyZm9ybWFuY2UobG9jLCByb3QpXHJcblx0fVxyXG5cclxuXHRAQ29yZS5GdW5jdGlvbihDb3JlLkNsaWVudCwgQ29yZS5NdWx0aWNhc3QpXHJcblx0cHJpdmF0ZSBoaXRDaGFyYVBlcmZvcm1hbmNlKGxvYzogVHlwZS5WZWN0b3IsIHJvdDogVHlwZS5Sb3RhdGlvbikge1xyXG5cdFx0RWZmZWN0U2VydmljZS5nZXRJbnN0YW5jZSgpLnBsYXlFZmZlY3RBdExvY2F0aW9uKHRoaXMuaGl0Q2hhcmFFZmZlY3QuZ2V0U291cmNlQXNzZXRHdWlkKCksIGxvYywgMSwgcm90LCB0aGlzLmhpdENoYXJhRWZmZWN0LndvcmxkU2NhbGUpXHJcblx0XHRTb3VuZFNlcnZpY2UuZ2V0SW5zdGFuY2UoKS5wbGF5M0RTb3VuZCh0aGlzLmhpdENoYXJhU291bmQuZ2V0U291cmNlQXNzZXRHdWlkKCksIGxvYywgMSwgMSwgeyBtYXhEaXN0YW5jZTogMzAwMCB9KVxyXG5cdH1cclxuXHJcblx0QENvcmUuRnVuY3Rpb24oQ29yZS5DbGllbnQsIENvcmUuTXVsdGljYXN0KVxyXG5cdHByaXZhdGUgaGl0T2JqZWN0UGVyZm9ybWFuY2UobG9jOiBUeXBlLlZlY3Rvciwgcm90OiBUeXBlLlJvdGF0aW9uKSB7XHJcblx0XHRFZmZlY3RTZXJ2aWNlLmdldEluc3RhbmNlKCkucGxheUVmZmVjdEF0TG9jYXRpb24odGhpcy5oaXRFZmZlY3QuZ2V0U291cmNlQXNzZXRHdWlkKCksIGxvYywgMSwgcm90LCB0aGlzLmhpdEVmZmVjdC53b3JsZFNjYWxlKVxyXG5cdFx0U291bmRTZXJ2aWNlLmdldEluc3RhbmNlKCkucGxheTNEU291bmQodGhpcy5oaXRTb3VuZC5nZXRTb3VyY2VBc3NldEd1aWQoKSwgbG9jLCAxLCAxLCB7IG1heERpc3RhbmNlOiAzMDAwIH0pXHJcblx0fVxyXG5cclxuXHQvKiBcdTY0QURcdTY1M0VcdTcyNzlcdTY1NDggKi9cclxuXHRwcml2YXRlIHBsYXlFZmZlY3QocGFydGljbGU6IEdhbWVwbGF5LlBhcnRpY2xlKTogdm9pZCB7XHJcblxyXG5cdH1cclxuXHQvKiBcdTY0QURcdTY1M0VcdTk3RjNcdTY1NDggKi9cclxuXHRwcml2YXRlIHBsYXlTb3VuZChzb3VuZDogR2FtZXBsYXkuU291bmQpOiB2b2lkIHtcclxuXHRcdHNvdW5kLnZvbHVtZSA9IFdlYXBvbkRyaXZlci5zb3VuZFZvbHVtZVxyXG5cdFx0c291bmQucGxheSgpXHJcblx0fVxyXG5cclxuXHRAQ29yZS5GdW5jdGlvbihDb3JlLlNlcnZlcilcclxuXHRwcml2YXRlIHNlcnZlckRlc3Ryb3lBbW1vKGluZGV4OiBudW1iZXIpIHtcclxuXHRcdHRoaXMuY2xpZW50RGVzdHJveUFtbW8oaW5kZXgpXHJcblx0fVxyXG5cclxuXHRAQ29yZS5GdW5jdGlvbihDb3JlLkNsaWVudCwgQ29yZS5NdWx0aWNhc3QpXHJcblx0cHJpdmF0ZSBjbGllbnREZXN0cm95QW1tbyhpbmRleDogbnVtYmVyKSB7XHJcblx0XHRpZiAoIXRoaXMud2VhcG9uT2JqKSB7XHJcblx0XHRcdHJldHVyblxyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMud2VhcG9uT2JqLmdldEN1cnJlbnRPd25lcigpID09IHRoaXMuY2hhcmEpIHtcclxuXHRcdFx0cmV0dXJuXHJcblx0XHR9IGVsc2UgaWYgKHRoaXMuYW1tb0FycmF5Lmxlbmd0aCAhPSAwKSB7XHJcblx0XHRcdHRoaXMuYW1tb0FycmF5W2luZGV4XS5kZXN0cm95KClcclxuXHRcdFx0dGhpcy5hbW1vQXJyYXkuc3BsaWNlKGluZGV4LCAxKVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogXHU1QkEyXHU2MjM3XHU3QUVGXHU4QzAzXHU3NTI4XHU3NkY0XHU2M0E1XHU4OEM1XHU1OTA3XHJcblx0ICovXHJcblx0cHVibGljIGVxdWlwKCkge1xyXG5cdFx0Ly8gXHU1OTgyXHU2NzlDXHU1RjUzXHU1MjREXHU4OUQyXHU4MjcyXHU0RTNBXHU3QTdBXHU0RTE0XHU1NzI4XHU1QkEyXHU2MjM3XHU3QUVGXHVGRjBDXHU5MUNEXHU2NUIwXHU4M0I3XHU1M0Q2XHU0RTAwXHU2QjIxXHU4OUQyXHU4MjcyXHJcblx0XHRpZiAoIXRoaXMuY2hhcmEgJiYgVXRpbC5TeXN0ZW1VdGlsLmlzQ2xpZW50KCkpIHtcclxuXHRcdFx0dGhpcy5jaGFyYSA9IEdhbWVwbGF5LmdldEN1cnJlbnRQbGF5ZXIoKS5jaGFyYWN0ZXJcclxuXHRcdH1cclxuXHRcdHRoaXMuc2VydmVyRXF1aXAodGhpcy5jaGFyYS5wbGF5ZXIuZ2V0UGxheWVySUQoKSlcclxuXHR9XHJcblx0LyoqXHJcblx0ICogdW5FcXVpcFxyXG5cdCAqL1xyXG5cdHB1YmxpYyB1bkVxdWlwKCkge1xyXG5cdFx0aWYgKHRoaXMuY2hhcmEgIT09IHRoaXMud2VhcG9uT2JqLmdldEN1cnJlbnRPd25lcigpKSByZXR1cm5cclxuXHRcdGlmICghdGhpcy53ZWFwb25PYmopIHtcclxuXHRcdFx0cmV0dXJuXHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5pc0FpbW1pbmcpIHtcclxuXHRcdFx0dGhpcy53ZWFwb25PYmouYWNjdXJhY3lPZkZpcmVDb21wb25lbnQubWF4RGlzcGVyc2lvbkhhbGZBbmdsZSA9IHRoaXMudGVtcERpc3BlcnNpb25NYXhcclxuXHRcdFx0dGhpcy53ZWFwb25PYmouYWNjdXJhY3lPZkZpcmVDb21wb25lbnQuZGVmYXVsdERpc3BlcnNpb25IYWxmQW5nbGUgPSB0aGlzLnRlbXBEaXNwZXJzaW9uRGVmYXVsdFxyXG5cdFx0XHR0aGlzLmlzQWltbWluZyA9IGZhbHNlXHJcblx0XHR9XHJcblx0XHR0aGlzLndlYXBvbk9iai5zdG9wRmlyZSgpXHJcblx0XHR0aGlzLndlYXBvbk9iai5icmVha0xvYWQoKVxyXG5cdFx0dGhpcy53ZWFwb25PYmouYnJlYWtSZWxvYWQoKVxyXG5cdFx0dGhpcy53ZWFwb25PYmouZGVzdHJveSgpXHJcblx0XHR0aGlzLndlYXBvbk9iai51bmVxdWlwSG90V2VhcG9uKClcclxuXHRcdC8vVUkuVUlNYW5hZ2VyLmluc3RhbmNlLmhpZGUoV2VhcG9uVUkpXHJcblx0XHR0aGlzLndlYXBvblVJID0gbnVsbFxyXG5cdFx0dGhpcy5jaGFyYS5hbmltYXRpb25TdGFuY2UgPSB0aGlzLnRlbXBhbmltYXRpb25TdGFuY2VcclxuXHRcdHRoaXMuY2hhcmEucGxheUFuaW1hdGlvbih0aGlzLndlYXBvbkFjdGlvbi51bmVxdWlwQW5pbWF0aW9uKVxyXG5cdFx0dGhpcy5jaGFyYS5tb3ZlRmFjaW5nRGlyZWN0aW9uID0gdGhpcy50ZW1wTW92ZUZhY2luZ0RpcmVjdGlvblxyXG5cdFx0dGhpcy5jYW1lcmEuY2FtZXJhUmVsYXRpdmVUcmFuc2Zvcm0gPSBuZXcgVHlwZS5UcmFuc2Zvcm0odGhpcy50ZW1wY2FtZXJhT2Zmc2V0LCB0aGlzLmNhbWVyYS5jYW1lcmFSZWxhdGl2ZVRyYW5zZm9ybS5yb3RhdGlvbiwgdGhpcy5jYW1lcmEuY2FtZXJhUmVsYXRpdmVUcmFuc2Zvcm0uc2NhbGUpXHJcblx0XHR0aGlzLmNhbWVyYS5jYW1lcmFTeXN0ZW1SZWxhdGl2ZVRyYW5zZm9ybSA9IG5ldyBUeXBlLlRyYW5zZm9ybSh0aGlzLnRlbXB0YXJnZXRBcm1PZmZzZXQsIHRoaXMuY2FtZXJhLmNhbWVyYVJlbGF0aXZlVHJhbnNmb3JtLnJvdGF0aW9uLCB0aGlzLmNhbWVyYS5jYW1lcmFSZWxhdGl2ZVRyYW5zZm9ybS5zY2FsZSlcclxuXHRcdHRoaXMuY2FtZXJhLmNhbWVyYUZPViA9IHRoaXMudGVtcGNhbWVyYUZPVlxyXG5cdFx0dGhpcy5jYW1lcmEudGFyZ2V0QXJtTGVuZ3RoID0gdGhpcy50ZW1wdGFyZ2V0QXJtTGVuZ3RoXHJcblx0XHRpZiAodGhpcy5jb25maWcuaXNBdXRvRGVzdHJveSkge1xyXG5cdFx0XHQvL1VJLlVJTWFuYWdlci5pbnN0YW5jZS5kZXN0cm95VUkoV2VhcG9uVUkpXHJcblx0XHRcdHRoaXMud2VhcG9uT2JqID0gbnVsbFxyXG5cdFx0XHRsZXQgZGVzdHJveUludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG5cdFx0XHRcdGlmICh0aGlzLmFtbW9BcnJheS5sZW5ndGggPT0gMCAmJiB0aGlzLmNhc2luZ0FycmF5Lmxlbmd0aCA9PSAwKSB7XHJcblx0XHRcdFx0XHR0aGlzLnNlcnZlckRlc3Ryb3koKVxyXG5cdFx0XHRcdFx0Y2xlYXJJbnRlcnZhbChkZXN0cm95SW50ZXJ2YWwpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LCAxMDApXHJcblx0XHR9XHJcblx0fVxyXG5cdEBDb3JlLkZ1bmN0aW9uKENvcmUuU2VydmVyKVxyXG5cdHByaXZhdGUgc2VydmVySGlkZVdlYXBvbkVudGl0eShwbGF5ZXJJRDogbnVtYmVyKTogdm9pZCB7XHJcblx0XHQvLyBcdTU5ODJcdTY3OUNcdTUzNzhcdThGN0RcdTc2ODRcdTY2MkZcdTVGNTNcdTUyNERcdTZCNjZcdTU2NjhcdUZGMENcdTUxNDhcdTk2OTBcdTg1Q0ZcdTZCNjZcdTU2NjhcdUZGMENcdTdCNDlcdTVGODVcdTVCNTBcdTVGMzlcdTk1MDBcdTZCQzFcdTVCOENcdTZCRDVcdTU0MEVcdTUzNzhcdThGN0RcdTVFNzZcdTk1MDBcdTZCQzFcdTZCNjZcdTU2NjhcdUZGMENcdTUyMjBcdTk2NjRtYXBcdTRFMkRcdTVCRjlcdTVFOTRcdTk1MkVcdTUwM0NcclxuXHRcdHRoaXMuaGlkZVdlYXBvbkVudGl0eSgpXHJcblx0fVxyXG5cclxuXHRAQ29yZS5GdW5jdGlvbihDb3JlLkNsaWVudCwgQ29yZS5NdWx0aWNhc3QpXHJcblx0cHJpdmF0ZSBoaWRlV2VhcG9uRW50aXR5KCkge1xyXG5cdFx0aWYgKCF0aGlzLndlYXBvbkVudGl0eVJvb3QpIHJldHVyblxyXG5cdFx0dGhpcy53ZWFwb25FbnRpdHlSb290LnNldFZpc2liaWxpdHkoVHlwZS5Qcm9wZXJ0eVN0YXR1cy5PZmYpXHJcblx0fVxyXG5cdEBDb3JlLkZ1bmN0aW9uKENvcmUuU2VydmVyKVxyXG5cdHByaXZhdGUgc2VydmVyRGVzdHJveSgpOiB2b2lkIHtcclxuXHRcdHRoaXMuZGVzdHJveSgpXHJcblx0fVxyXG5cdC8qKlxyXG5cdFx0ICogc3RhcnRGaXJlXHJcblx0XHQgKi9cclxuXHRwdWJsaWMgc3RhcnRGaXJlKCkge1xyXG5cdFx0aWYgKHRoaXMud2VhcG9uT2JqID09IG51bGwgfHwgdGhpcy5pc0NhbkZpcmUgIT0gMCkgcmV0dXJuXHJcblx0XHR0aGlzLndlYXBvbk9iai5zdGFydEZpcmUoKVxyXG5cdFx0dGhpcy5pc0ZpcmluZyA9IHRydWVcclxuXHRcdGlmICghdGhpcy5pc0FpbW1pbmcpIHtcclxuXHRcdFx0dGhpcy53ZWFwb25PYmouYWltQ29tcG9uZW50LmVuYWJsZUFpbWluZyh0cnVlKVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogc3RvcEZpcmVcclxuXHQgKi9cclxuXHRwdWJsaWMgc3RvcEZpcmUoKSB7XHJcblx0XHRpZiAodGhpcy53ZWFwb25PYmogPT0gbnVsbCkgcmV0dXJuXHJcblx0XHR0aGlzLndlYXBvbk9iai5zdG9wRmlyZSgpXHJcblx0XHR0aGlzLmlzRmlyaW5nID0gZmFsc2VcclxuXHRcdGlmICghdGhpcy5pc0FpbW1pbmcpIHtcclxuXHRcdFx0dGhpcy53ZWFwb25PYmouYWltQ29tcG9uZW50LmVuYWJsZUFpbWluZyhmYWxzZSlcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIHN0YXJ0UmVsb2FkXHJcblx0ICovXHJcblx0cHVibGljIHN0YXJ0UmVsb2FkKCkge1xyXG5cdFx0aWYgKHRoaXMud2VhcG9uT2JqID09IG51bGwgfHwgIXRoaXMud2VhcG9uT2JqLnJlbG9hZEVuYWJsZSB8fCB0aGlzLndlYXBvbk9iai5maXJlQ29tcG9uZW50LmN1cnJlbnRCdWxsZXRTaXplID09IHRoaXMud2VhcG9uT2JqLmZpcmVDb21wb25lbnQuY3VycmVudENsaXBTaXplKSByZXR1cm5cclxuXHRcdGxldCBhbW1vR2FwID0gdGhpcy53ZWFwb25PYmouZmlyZUNvbXBvbmVudC5jdXJyZW50Q2xpcFNpemUgLSB0aGlzLndlYXBvbk9iai5maXJlQ29tcG9uZW50LmN1cnJlbnRCdWxsZXRTaXplXHJcblxyXG5cdFx0aWYgKHRoaXMudG90YWxBbW1vID09IC0xKSB7XHJcblx0XHRcdHRoaXMud2VhcG9uT2JqLnJlbG9hZChhbW1vR2FwKVxyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMudG90YWxBbW1vIDw9IDApIHtcclxuXHRcdFx0cmV0dXJuXHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy50b3RhbEFtbW8gPCBhbW1vR2FwKSB7XHJcblx0XHRcdHRoaXMud2VhcG9uT2JqLnJlbG9hZCh0aGlzLnRvdGFsQW1tbylcclxuXHRcdFx0dGhpcy50b3RhbEFtbW8gPSAwXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLndlYXBvbk9iai5yZWxvYWQoYW1tb0dhcClcclxuXHRcdFx0dGhpcy50b3RhbEFtbW8gLT0gYW1tb0dhcFxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogc3RvcFJlbG9hZFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBzdG9wUmVsb2FkKCkge1xyXG5cdFx0aWYgKHRoaXMud2VhcG9uT2JqID09IG51bGwpIHJldHVyblxyXG5cdFx0dGhpcy53ZWFwb25PYmouYnJlYWtSZWxvYWQoKVxyXG5cdFx0dGhpcy53ZWFwb25PYmouYnJlYWtMb2FkKClcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgdGVtcERpc3BlcnNpb25NYXggPSAwXHJcblx0cHJpdmF0ZSB0ZW1wRGlzcGVyc2lvbkRlZmF1bHQgPSAwXHJcblxyXG5cclxuXHJcblx0LyoqXHJcblx0ICogc3RhcnRBaW1cclxuXHQgKi9cclxuXHRwdWJsaWMgc3RhcnRBaW0oKSB7XHJcblx0XHRjb25zb2xlLmVycm9yKFwic3RhcnRBaW1cIilcclxuXHRcdHRoaXMuYWltU291bmQuc3RvcCgpXHJcblx0XHR0aGlzLmFpbVNvdW5kLnBsYXkoKVxyXG5cdFx0dGhpcy5jaGFyYS5hbmltYXRpb25TdGFuY2UgPSB0aGlzLndlYXBvbkFjdGlvbi5haW1TdGFuY2VcclxuXHRcdHRoaXMud2VhcG9uT2JqLmZpcmVDb21wb25lbnQuYW5pbWF0aW9uR3VpZCA9IHRoaXMud2VhcG9uQWN0aW9uLmFpbVNob290QW5pbWF0aW9uXHJcblx0XHR0aGlzLnRlbXBEaXNwZXJzaW9uRGVmYXVsdCA9IHRoaXMud2VhcG9uT2JqLmFjY3VyYWN5T2ZGaXJlQ29tcG9uZW50LmRlZmF1bHREaXNwZXJzaW9uSGFsZkFuZ2xlXHJcblx0XHR0aGlzLnRlbXBEaXNwZXJzaW9uTWF4ID0gdGhpcy53ZWFwb25PYmouYWNjdXJhY3lPZkZpcmVDb21wb25lbnQubWF4RGlzcGVyc2lvbkhhbGZBbmdsZVxyXG5cdFx0dGhpcy53ZWFwb25PYmouYWNjdXJhY3lPZkZpcmVDb21wb25lbnQuZGVmYXVsdERpc3BlcnNpb25IYWxmQW5nbGUgPSB0aGlzLndlYXBvbk9iai5hY2N1cmFjeU9mRmlyZUNvbXBvbmVudC5taW5EaXNwZXJzaW9uSGFsZkFuZ2xlXHJcblx0XHR0aGlzLndlYXBvbk9iai5hY2N1cmFjeU9mRmlyZUNvbXBvbmVudC5tYXhEaXNwZXJzaW9uSGFsZkFuZ2xlID0gdGhpcy53ZWFwb25PYmouYWNjdXJhY3lPZkZpcmVDb21wb25lbnQubWluRGlzcGVyc2lvbkhhbGZBbmdsZVxyXG5cdFx0dGhpcy5pc1pvb21pbmcgPSB0cnVlXHJcblx0XHR0aGlzLnpvb21JbigpXHJcblx0XHRpZiAodGhpcy5jb25maWcuaXNXZWFwb25IYXZlU2NvcGUpIHtcclxuXHRcdFx0dGhpcy5jYW1lcmEudGFyZ2V0QXJtTGVuZ3RoID0gMFxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogc3RvcEFpbVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBzdG9wQWltKCkge1xyXG5cdFx0Y29uc29sZS5lcnJvcihcInN0b3BBaW1cIilcclxuXHRcdHRoaXMud2VhcG9uT2JqLmFjY3VyYWN5T2ZGaXJlQ29tcG9uZW50Lm1heERpc3BlcnNpb25IYWxmQW5nbGUgPSB0aGlzLnRlbXBEaXNwZXJzaW9uTWF4XHJcblx0XHR0aGlzLndlYXBvbk9iai5hY2N1cmFjeU9mRmlyZUNvbXBvbmVudC5kZWZhdWx0RGlzcGVyc2lvbkhhbGZBbmdsZSA9IHRoaXMudGVtcERpc3BlcnNpb25EZWZhdWx0XHJcblx0XHR0aGlzLmNoYXJhLmFuaW1hdGlvblN0YW5jZSA9IHRoaXMud2VhcG9uQWN0aW9uLmhvbGRTdGFuY2VcclxuXHRcdHRoaXMud2VhcG9uT2JqLmZpcmVDb21wb25lbnQuYW5pbWF0aW9uR3VpZCA9IHRoaXMud2VhcG9uQWN0aW9uLnNob290QW5pbWF0aW9uXHJcblx0XHR0aGlzLmlzWm9vbWluZyA9IHRydWVcclxuXHRcdHRoaXMuem9vbU91dCgpXHJcblx0XHRpZiAodGhpcy5jb25maWcuaXNXZWFwb25IYXZlU2NvcGUpIHtcclxuXHRcdFx0dGhpcy5jYW1lcmEudGFyZ2V0QXJtTGVuZ3RoID0gNDAwXHJcblx0XHR9XHJcblx0XHR0aGlzLmFpbVNvdW5kLnN0b3AoKVxyXG5cdFx0dGhpcy5haW1Tb3VuZC5wbGF5KClcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIHN0YXJ0TG9hZFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBzdGFydExvYWQoKSB7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogZW5kTG9hZFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBlbmRMb2FkKCkge1xyXG5cclxuXHR9XHJcblxyXG5cdC8qIGdldEJ1bGxldFNpemUgKi9cclxuXHRwdWJsaWMgZ2V0QnVsbGV0U2l6ZSgpOiBudW1iZXIge1xyXG5cdFx0aWYgKHRoaXMud2VhcG9uT2JqID09IG51bGwpIHJldHVyblxyXG5cdFx0cmV0dXJuIHRoaXMud2VhcG9uT2JqLmZpcmVDb21wb25lbnQuY3VycmVudEJ1bGxldFNpemVcclxuXHR9XHJcblxyXG5cdC8qIFx1NUJBMlx1NjIzN1x1N0FFRlx1OTUwMFx1NkJDMVx1NjVCOVx1NkNENSAqL1xyXG5cdHByaXZhdGUgY2xpZW50RGVzdHJveSgpIHtcclxuXHRcdGlmICh0aGlzLnBpY2tVcFRyaWdnZXIpIHtcclxuXHRcdFx0dGhpcy5waWNrVXBUcmlnZ2VyLmRlc3Ryb3koKVxyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMud2VhcG9uRW50aXR5Um9vdCkge1xyXG5cdFx0XHR0aGlzLndlYXBvbkVudGl0eVJvb3QuZGVzdHJveSgpXHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5hbW1vRW50aXR5Um9vdCkge1xyXG5cdFx0XHR0aGlzLmFtbW9FbnRpdHlSb290LmRlc3Ryb3koKVxyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMuY2FzaW5nRW50aXR5KSB7XHJcblx0XHRcdHRoaXMuY2FzaW5nRW50aXR5LmRlc3Ryb3koKVxyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMuZmlyZUVmZmVjdCkge1xyXG5cdFx0XHR0aGlzLmZpcmVFZmZlY3QuZGVzdHJveSgpXHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5maXJlU291bmQpIHtcclxuXHRcdFx0dGhpcy5maXJlU291bmQuZGVzdHJveSgpXHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5oaXRDaGFyYUVmZmVjdCkge1xyXG5cdFx0XHR0aGlzLmhpdENoYXJhRWZmZWN0LmRlc3Ryb3koKVxyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMuaGl0Q2hhcmFTb3VuZCkge1xyXG5cdFx0XHR0aGlzLmhpdENoYXJhU291bmQuZGVzdHJveSgpXHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5oaXRFZmZlY3QpIHtcclxuXHRcdFx0dGhpcy5oaXRFZmZlY3QuZGVzdHJveSgpXHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5oaXRTb3VuZCkge1xyXG5cdFx0XHR0aGlzLmhpdFNvdW5kLmRlc3Ryb3koKVxyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMucmVsb2FkU291bmQpIHtcclxuXHRcdFx0dGhpcy5yZWxvYWRTb3VuZC5kZXN0cm95KClcclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLmFpbVNvdW5kKSB7XHJcblx0XHRcdHRoaXMuYWltU291bmQuZGVzdHJveSgpXHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5sb2FkU291bmQpIHtcclxuXHRcdFx0dGhpcy5sb2FkU291bmQuZGVzdHJveSgpXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKiBcdTRFMEJcdThGN0RcdTVFNzZcdTUyMURcdTU5Q0JcdTUzMTZcdThENDRcdTZFOTAgKi9cclxuXHRwcml2YXRlIGluaXRBc3NldHMoYXNzZXRJZHM6IEFycmF5PHN0cmluZz4pOiB2b2lkIHtcclxuXHRcdGZvciAobGV0IGVsZW1lbnQgb2YgYXNzZXRJZHMpIHtcclxuXHRcdFx0VXRpbC5Bc3NldFV0aWwuYXN5bmNEb3dubG9hZEFzc2V0KGVsZW1lbnQpXHJcblx0XHR9XHJcblx0fVxyXG5cdC8qIFx1NjcwRFx1NTJBMVx1N0FFRlx1NTIxRFx1NTlDQlx1NTMxNlx1NjVCOVx1NkNENSAqL1xyXG5cdHByaXZhdGUgc2VydmVySW5pdCgpIHtcclxuXHRcdHRoaXMuc2VydmVySW5pdERlbGVnYXRlKClcclxuXHJcblx0fVxyXG5cclxuXHQvKiBcdTY3MERcdTUyQTFcdTdBRUZcdTUyMURcdTU5Q0JcdTUzMTZcdTU2REVcdThDMDNcdTUxRkRcdTY1NzAgKi9cclxuXHRwcml2YXRlIHNlcnZlckluaXREZWxlZ2F0ZSgpOiB2b2lkIHtcclxuXHRcdHRoaXMud2VhcG9uT2JqLm9uRXF1aXBwZWRTZXJ2ZXIuYWRkKHRoaXMub25TZXJ2ZXJFcXVpcC5iaW5kKHRoaXMpKVxyXG5cdFx0dGhpcy53ZWFwb25PYmoub25VbmVxdWlwcGVkU2VydmVyLmFkZCh0aGlzLm9uU2VydmVyVW5lcXVpcC5iaW5kKHRoaXMpKVxyXG5cclxuXHRcdHRoaXMud2VhcG9uT2JqLmZpcmVDb21wb25lbnQub25TdGFydEZpcmVTZXJ2ZXIuYWRkKHRoaXMub25TZXJ2ZXJTdGFydEZpcmUuYmluZCh0aGlzKSlcclxuXHRcdHRoaXMud2VhcG9uT2JqLmZpcmVDb21wb25lbnQub25FbmRGaXJlU2VydmVyLmFkZCh0aGlzLm9uU2VydmVyRW5kRmlyZS5iaW5kKHRoaXMpKVxyXG5cdFx0aWYgKHRoaXMud2VhcG9uT2JqLnJlbG9hZENvbXBvbmVudCkge1xyXG5cdFx0XHR0aGlzLndlYXBvbk9iai5yZWxvYWRDb21wb25lbnQub25TdGFydFJlbG9hZFNlcnZlci5hZGQodGhpcy5vblNlcnZlclN0YXJ0UmVsb2FkLmJpbmQodGhpcykpXHJcblx0XHRcdHRoaXMud2VhcG9uT2JqLnJlbG9hZENvbXBvbmVudC5vbkVuZFJlbG9hZFNlcnZlci5hZGQodGhpcy5vblNlcnZlckVuZFJlbG9hZC5iaW5kKHRoaXMpKVxyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMud2VhcG9uT2JqLmxvYWRDb21wb25lbnQpIHtcclxuXHRcdFx0dGhpcy53ZWFwb25PYmoubG9hZENvbXBvbmVudC5vblN0YXJ0TG9hZFNlcnZlci5hZGQodGhpcy5vblNlcnZlclN0YXJ0TG9hZC5iaW5kKHRoaXMpKVxyXG5cdFx0XHR0aGlzLndlYXBvbk9iai5sb2FkQ29tcG9uZW50Lm9uRW5kTG9hZFNlcnZlci5hZGQodGhpcy5vblNlcnZlckVuZExvYWQuYmluZCh0aGlzKSlcclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLndlYXBvbk9iai5haW1Db21wb25lbnQpIHtcclxuXHRcdFx0dGhpcy53ZWFwb25PYmouYWltQ29tcG9uZW50Lm9uQWltU3RhcnRTZXJ2ZXIuYWRkKHRoaXMub25TZXJ2ZXJTdGFydEFpbS5iaW5kKHRoaXMpKVxyXG5cdFx0XHR0aGlzLndlYXBvbk9iai5haW1Db21wb25lbnQub25BaW1FbmRTZXJ2ZXIuYWRkKHRoaXMub25TZXJ2ZXJFbmRBaW0uYmluZCh0aGlzKSlcclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLndlYXBvbk9iai5yZWNvaWxGb3JjZUNvbXBvbmVudCkge1xyXG5cdFx0XHR0aGlzLndlYXBvbk9iai5yZWNvaWxGb3JjZUNvbXBvbmVudC5vblN0YXJ0UmVjb2lsRm9yY2VTZXJ2ZXIuYWRkKHRoaXMub25TZXJ2ZXJTdGFydFJlY29pbC5iaW5kKHRoaXMpKVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyogXHU2NzBEXHU1MkExXHU3QUVGXHU1RjAwXHU1OUNCXHU1RjAwXHU3MDZCXHU1NkRFXHU4QzAzICovXHJcblx0cHJpdmF0ZSBvblNlcnZlckVxdWlwKCkge1xyXG5cdFx0Y29uc29sZS5lcnJvcihcIlNlcnZlckVxdWlwIFwiICsgdGhpcy53ZWFwb25PYmouZ2V0Q3VycmVudE93bmVyKCkuY2hhcmFjdGVyTmFtZSlcclxuXHRcdGlmICghdGhpcy53ZWFwb25PYmouZ2V0Q3VycmVudE93bmVyKCkpIHJldHVyblxyXG5cdFx0bGV0IHYyID0gdGhpcy53ZWFwb25PYmouZ2V0Q3VycmVudE93bmVyKCkuc2V0QXBwZWFyYW5jZShHYW1lcGxheS5IdW1hbm9pZFYyKVxyXG5cdFx0aWYgKCh2Mi5nZXRTb21hdG90eXBlKCkgJSAyKSA9PSAwKSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoXCJmZW1hbGVcIilcclxuXHRcdFx0dGhpcy5jaGFuZ2VXZWFwb25BY3Rpb24oMClcclxuXHRcdFx0dGhpcy5jbGllbnRFcXVpcCh0aGlzLndlYXBvbk9iai5nZXRDdXJyZW50T3duZXIoKS5wbGF5ZXIsIDApXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKFwibWFsZVwiKVxyXG5cdFx0XHR0aGlzLmNoYW5nZVdlYXBvbkFjdGlvbigxKVxyXG5cdFx0XHR0aGlzLmNsaWVudEVxdWlwKHRoaXMud2VhcG9uT2JqLmdldEN1cnJlbnRPd25lcigpLnBsYXllciwgMSlcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qIFx1NjcwRFx1NTJBMVx1N0FFRlx1NTM3OFx1OEY3RFx1ODhDNVx1NTkwN1x1NUI4Q1x1NjIxMFx1NTZERVx1OEMwMyAqL1xyXG5cdHByaXZhdGUgb25TZXJ2ZXJVbmVxdWlwKCkge1xyXG5cdFx0Y29uc29sZS5lcnJvcihcIm9uU2VydmVyVW5lcXVpcFwiKVxyXG5cclxuXHR9XHJcblxyXG5cdC8qIFx1NjcwRFx1NTJBMVx1N0FFRlx1NUYwMFx1NTlDQlx1NUYwMFx1NzA2Qlx1NTZERVx1OEMwMyAqL1xyXG5cdHByaXZhdGUgb25TZXJ2ZXJTdGFydEZpcmUoKSB7XHJcblxyXG5cdH1cclxuXHJcblx0LyogXHU2NzBEXHU1MkExXHU3QUVGXHU3RUQzXHU2NzVGXHU1RjAwXHU3MDZCXHU1NkRFXHU4QzAzICovXHJcblx0cHJpdmF0ZSBvblNlcnZlckVuZEZpcmUoKSB7XHJcblxyXG5cdH1cclxuXHJcblx0LyogXHU2NzBEXHU1MkExXHU3QUVGXHU1RjAwXHU1OUNCXHU2MzYyXHU1RjM5XHU1NkRFXHU4QzAzICovXHJcblx0cHJpdmF0ZSBvblNlcnZlclN0YXJ0UmVsb2FkKCkge1xyXG5cclxuXHR9XHJcblxyXG5cdC8qIFx1NjcwRFx1NTJBMVx1N0FFRlx1N0VEM1x1Njc1Rlx1NjM2Mlx1NUYzOVx1NTZERVx1OEMwMyAqL1xyXG5cdHByaXZhdGUgb25TZXJ2ZXJFbmRSZWxvYWQoKSB7XHJcblxyXG5cdH1cclxuXHJcblx0LyogXHU2NzBEXHU1MkExXHU3QUVGXHU1RjAwXHU1OUNCXHU0RTBBXHU4MTlCXHU1NkRFXHU4QzAzICovXHJcblx0cHJpdmF0ZSBvblNlcnZlclN0YXJ0TG9hZCgpIHtcclxuXHJcblx0fVxyXG5cclxuXHQvKiBcdTY3MERcdTUyQTFcdTdBRUZcdTdFRDNcdTY3NUZcdTRFMEFcdTgxOUJcdTU2REVcdThDMDMgKi9cclxuXHRwcml2YXRlIG9uU2VydmVyRW5kTG9hZCgpIHtcclxuXHJcblx0fVxyXG5cclxuXHQvKiBcdTY3MERcdTUyQTFcdTdBRUZcdTVGMDBcdTU5Q0JcdTc3ODRcdTUxQzZcdTU2REVcdThDMDMgKi9cclxuXHRwcml2YXRlIG9uU2VydmVyU3RhcnRBaW0oKSB7XHJcblxyXG5cdH1cclxuXHJcblx0LyogXHU2NzBEXHU1MkExXHU3QUVGXHU3RUQzXHU2NzVGXHU3Nzg0XHU1MUM2XHU1NkRFXHU4QzAzICovXHJcblx0cHJpdmF0ZSBvblNlcnZlckVuZEFpbSgpIHtcclxuXHJcblx0fVxyXG5cclxuXHQvKiBcdTY3MERcdTUyQTFcdTdBRUZcdTVGMDBcdTU5Q0JcdTU0MEVcdTU3NTBcdTUyOUJcdTU2REVcdThDMDMgKi9cclxuXHRwcml2YXRlIG9uU2VydmVyU3RhcnRSZWNvaWwoKSB7XHJcblxyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBfaXNJbml0ZWQ6IGJvb2xlYW4gPSBmYWxzZVxyXG5cclxuXHQvKiBcdTVCQTJcdTYyMzdcdTdBRUZcdTUyMURcdTU5Q0JcdTUzMTZcdTY1QjlcdTZDRDUgKi9cclxuXHRwcml2YXRlIGNsaWVudEluaXQoKSB7XHJcblx0XHRpZiAodGhpcy5faXNJbml0ZWQpIHtcclxuXHRcdFx0cmV0dXJuXHJcblx0XHR9XHJcblx0XHR0aGlzLl9pc0luaXRlZCA9IHRydWVcclxuXHRcdC8qIFx1ODNCN1x1NTNENlx1NzNBOVx1NUJCNlx1NzZGOFx1NTE3M1x1NUJGOVx1OEM2MSAqL1xyXG5cdFx0R2FtZXBsYXkuYXN5bmNHZXRDdXJyZW50UGxheWVyKCkudGhlbigocGxheWVyOiBHYW1lcGxheS5QbGF5ZXIpID0+IHtcclxuXHRcdFx0dGhpcy5wbGF5ZXIgPSBwbGF5ZXJcclxuXHRcdFx0dGhpcy5jaGFyYSA9IHRoaXMucGxheWVyLmNoYXJhY3RlclxyXG5cdFx0XHR0aGlzLmNhbWVyYSA9IHRoaXMuY2hhcmEuY2FtZXJhU3lzdGVtXHJcblx0XHRcdHRoaXMuY2xpZW50SW5pdFdlYXBvbkVudGl0eVJvb3QoKVxyXG5cdFx0XHR0aGlzLmNsaWVudEluaXRQaWNrVXBUcmlnZ2VyKClcclxuXHRcdFx0dGhpcy5jbGllbnRJbml0QW1tb0VudGl0eVJvb3QoKVxyXG5cdFx0XHR0aGlzLmNsaWVudEluaXRDYXNpbmdFbnRpdHkoKVxyXG5cdFx0XHR0aGlzLmNsaWVudEluaXRIaXRDaGFyYUVmZmVjdCgpXHJcblx0XHRcdHRoaXMuY2xpZW50SW5pdEhpdEVmZmVjdCgpXHJcblx0XHRcdHRoaXMuY2xpZW50SW5pdEZpcmVFZmZlY3QoKVxyXG5cdFx0XHR0aGlzLmNsaWVudEluaXRGaXJlU291bmQoKVxyXG5cdFx0XHR0aGlzLmNsaWVudEluaXRSZWxvYWRTb3VuZCgpXHJcblx0XHRcdHRoaXMuY2xpZW50SW5pdExvYWRTb3VuZCgpXHJcblx0XHRcdHRoaXMuY2xpZW50SW5pdEFpbVNvdW5kKClcclxuXHRcdFx0dGhpcy5jbGllbnRJbml0SGl0Q2hhcmFTb3VuZCgpXHJcblx0XHRcdHRoaXMuY2xpZW50SW5pdEhpdFNvdW5kKClcclxuXHRcdFx0dGhpcy5jbGllbnRJbml0RGVsZWdhdGUoKVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdC8qIFx1NUJBMlx1NjIzN1x1N0FFRlx1NTIxRFx1NTlDQlx1NTMxNlx1NjgzOVx1NkI2Nlx1NTY2OFx1NUI5RVx1NEY1MyAqL1xyXG5cdHByaXZhdGUgY2xpZW50SW5pdFdlYXBvbkVudGl0eVJvb3QoKTogdm9pZCB7XHJcblx0XHR0aGlzLndlYXBvbkVudGl0eVJvb3QgPSB0aGlzLndlYXBvbk9iai5nZXRDaGlsZEJ5TmFtZShcIndlYXBvbkVudGl0eVJvb3RcIikgYXMgQ29yZS5HYW1lT2JqZWN0XHJcblx0fVxyXG5cclxuXHQvKiBcdTVCQTJcdTYyMzdcdTdBRUZcdTUyMURcdTU5Q0JcdTUzMTZcdTYyRkVcdTUzRDZcdTg5RTZcdTUzRDFcdTU2NjggKi9cclxuXHRwcml2YXRlIGNsaWVudEluaXRQaWNrVXBUcmlnZ2VyKCk6IHZvaWQge1xyXG5cdFx0dGhpcy5waWNrVXBUcmlnZ2VyID0gdGhpcy53ZWFwb25PYmouZ2V0Q2hpbGRCeU5hbWUoXCJwaWNrVXBUcmlnZ2VyXCIpIGFzIEdhbWVwbGF5LlRyaWdnZXJcclxuXHRcdGlmICh0aGlzLnBpY2tVcFRyaWdnZXIpIHtcclxuXHRcdFx0dGhpcy5waWNrVXBUcmlnZ2VyLm9uRW50ZXIuYWRkKChjaGFyYTogR2FtZXBsYXkuQ2hhcmFjdGVyKSA9PiB7XHJcblx0XHRcdFx0Ly8gXHU1OTgyXHU2NzlDXHU2NjJGXHU4OUQyXHU4MjcyXHVGRjBDXHU5NTAwXHU2QkMxXHU4OUU2XHU1M0QxXHU1NjY4XHVGRjBDXHU4OEM1XHU1OTA3XHU2QjY2XHU1NjY4XHVGRjBDXHU2MzYyXHU1RjM5XHVGRjBDXHU0RkVFXHU2NTM5XHU1OUZGXHU2MDAxXHVGRjBDXHU4QkJFXHU3RjZFXHU3M0E5XHU1QkI2XHU2QjY2XHU1NjY4bWFwXHVGRjBDXHU2RDNFXHU1M0QxXHU4OEM1XHU1OTA3XHU0RThCXHU0RUY2XHJcblx0XHRcdFx0aWYgKCEoY2hhcmEgaW5zdGFuY2VvZiBHYW1lcGxheS5DaGFyYWN0ZXIpKSByZXR1cm5cclxuXHRcdFx0XHRpZiAoY2hhcmEgPT09IHRoaXMuY2hhcmEpIHtcclxuXHRcdFx0XHRcdHRoaXMuc2VydmVyRXF1aXAodGhpcy5wbGF5ZXIuZ2V0UGxheWVySUQoKSlcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKiBcdTY3MERcdTUyQTFcdTdBRUZcdTg4QzVcdTU5MDcgKi9cclxuXHRAQ29yZS5GdW5jdGlvbihDb3JlLlNlcnZlcilcclxuXHRwcml2YXRlIHNlcnZlckVxdWlwKHBsYXllcklEOiBudW1iZXIpOiB2b2lkIHtcclxuXHRcdGxldCBwbGF5ZXIgPSBHYW1lcGxheS5nZXRQbGF5ZXIocGxheWVySUQpXHJcblx0XHQvLyBcdTU5ODJcdTY3OUNcdTg4QzVcdTU5MDdcdTY1RjZcdTczQTlcdTVCQjZcdTRFM0FcdTdBN0FcdTUyMTlcdThGRDRcdTU2REVcclxuXHRcdGlmIChwbGF5ZXIgPT0gbnVsbCB8fCAhdGhpcy53ZWFwb25PYmopIHJldHVyblxyXG5cdFx0dGhpcy53ZWFwb25PYmouZXF1aXBtZW50KHBsYXllci5jaGFyYWN0ZXIsIHRoaXMuY29uZmlnLmVxdWlwbWVudFNsb3QpXHJcblx0XHR0aGlzLmlzRXF1aXBlZCA9IHRydWVcclxuXHRcdFByZWZhYkV2ZW50LlByZWZhYkV2dEVxdWlwLmVxdWlwKHBsYXllci5jaGFyYWN0ZXIuZ3VpZCwgUHJlZmFiRXZlbnQuRXF1aXBTbG90LldlYXBvbiwgdGhpcy53ZWFwb25PYmouZ3VpZClcclxuXHR9XHJcblxyXG5cclxuXHJcblx0LyogXHU0RkVFXHU2NTM5XHU5ODg0XHU1MjM2XHU0RjUzXHU1MkE4XHU0RjVDXHU4RDQ0XHU2RTkwICovXHJcblx0cHJpdmF0ZSBjaGFuZ2VXZWFwb25BY3Rpb24oc2V4OiBudW1iZXIpIHtcclxuXHRcdGNvbnNvbGUuZXJyb3IoXCJjaGFuZ2VXZWFwb25BY3Rpb24gXCIgKyBzZXgpXHJcblx0XHRzZXggPT0gMCA/IHRoaXMud2VhcG9uQWN0aW9uID0gR2FtZUNvbmZpZy5BY3Rpb24uZ2V0RWxlbWVudCh0aGlzLmNvbmZpZy5mZW1hbGVBY3Rpb24pIDogdGhpcy53ZWFwb25BY3Rpb24gPSBHYW1lQ29uZmlnLkFjdGlvbi5nZXRFbGVtZW50KHRoaXMuY29uZmlnLm1hbGVBY3Rpb24pXHJcblx0XHRpZiAodGhpcy53ZWFwb25PYmopIHtcclxuXHRcdFx0dGhpcy53ZWFwb25PYmouZmlyZUNvbXBvbmVudC5hbmltYXRpb25HdWlkID0gdGhpcy53ZWFwb25BY3Rpb24uc2hvb3RBbmltYXRpb25cclxuXHRcdFx0aWYgKHRoaXMud2VhcG9uT2JqLnJlbG9hZEVuYWJsZSkge1xyXG5cdFx0XHRcdHRoaXMud2VhcG9uT2JqLnJlbG9hZENvbXBvbmVudC5hbmltYXRpb25HdWlkID0gdGhpcy53ZWFwb25BY3Rpb24ucmVsb2FkQW5pbWF0aW9uXHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKHRoaXMud2VhcG9uT2JqLmxvYWRFbmFibGUpIHtcclxuXHRcdFx0XHR0aGlzLndlYXBvbk9iai5sb2FkQ29tcG9uZW50LmFuaW1hdGlvbkd1aWQgPSB0aGlzLndlYXBvbkFjdGlvbi5sb2FkQW5pbWF0aW9uXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHByaXZhdGUgdGVtcE1vdmVGYWNpbmdEaXJlY3Rpb246IG51bWJlclxyXG5cdHByaXZhdGUgdGVtcHRhcmdldEFybUxlbmd0aDogbnVtYmVyXHJcblx0cHJpdmF0ZSB0ZW1wY2FtZXJhRk9WOiBudW1iZXJcclxuXHRwcml2YXRlIHRlbXBjYW1lcmFPZmZzZXQ6IFR5cGUuVmVjdG9yXHJcblx0cHJpdmF0ZSB0ZW1wdGFyZ2V0QXJtT2Zmc2V0OiBUeXBlLlZlY3RvclxyXG5cdHByaXZhdGUgdGVtcGFuaW1hdGlvblN0YW5jZTogc3RyaW5nXHJcblxyXG5cdC8qIFx1NUJBMlx1NjIzN1x1N0FFRlx1ODhDNVx1NTkwNyAqL1xyXG5cdEBDb3JlLkZ1bmN0aW9uKENvcmUuQ2xpZW50KVxyXG5cdHByaXZhdGUgY2xpZW50RXF1aXAocGlja1BsYXllcjogR2FtZXBsYXkuUGxheWVyLCBnZW5kZXI6IG51bWJlcik6IHZvaWQge1xyXG5cdFx0aWYgKCF0aGlzLmNhbWVyYSkge1xyXG5cdFx0XHR0aGlzLmNhbWVyYSA9IEdhbWVwbGF5LmdldEN1cnJlbnRQbGF5ZXIoKS5jaGFyYWN0ZXIuY2FtZXJhU3lzdGVtXHJcblx0XHR9XHJcblx0XHRpZiAoIXRoaXMud2VhcG9uT2JqKSB7XHJcblx0XHRcdHRoaXMud2VhcG9uT2JqID0gdGhpcy5nYW1lT2JqZWN0IGFzIEdhbWVwbGF5LkhvdFdlYXBvblxyXG5cdFx0fVxyXG5cdFx0dGhpcy53ZWFwb25PYmouZXF1aXBtZW50KHRoaXMuY2hhcmEsIHRoaXMuY29uZmlnLmVxdWlwbWVudFNsb3QpXHJcblx0XHQvL0V2ZW50cy5kaXNwYXRjaExvY2FsKFVORVFVSVBfRVZFTlQpXHJcblx0XHR0aGlzLmNoYW5nZVdlYXBvbkFjdGlvbihnZW5kZXIpXHJcblx0XHQvLyBzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdC8vIFx0RXZlbnRzLmRpc3BhdGNoTG9jYWwoRVFVSVBfRVZFTlQsIHRoaXMpXHJcblx0XHR0aGlzLnRlbXBNb3ZlRmFjaW5nRGlyZWN0aW9uID0gdGhpcy5jaGFyYS5tb3ZlRmFjaW5nRGlyZWN0aW9uXHJcblx0XHR0aGlzLnRlbXBhbmltYXRpb25TdGFuY2UgPSB0aGlzLmNoYXJhLmFuaW1hdGlvblN0YW5jZVxyXG5cdFx0dGhpcy50ZW1wdGFyZ2V0QXJtTGVuZ3RoID0gdGhpcy5jYW1lcmEudGFyZ2V0QXJtTGVuZ3RoXHJcblx0XHR0aGlzLnRlbXB0YXJnZXRBcm1PZmZzZXQgPSB0aGlzLmNhbWVyYS5jYW1lcmFTeXN0ZW1SZWxhdGl2ZVRyYW5zZm9ybS5sb2NhdGlvblxyXG5cdFx0dGhpcy50ZW1wY2FtZXJhRk9WID0gdGhpcy5jYW1lcmEuY2FtZXJhRk9WXHJcblx0XHR0aGlzLnRlbXBjYW1lcmFPZmZzZXQgPSB0aGlzLmNhbWVyYS5jYW1lcmFSZWxhdGl2ZVRyYW5zZm9ybS5sb2NhdGlvblxyXG5cdFx0dGhpcy5jaGFyYS5hbmltYXRpb25TdGFuY2UgPSB0aGlzLndlYXBvbkFjdGlvbi5ob2xkU3RhbmNlXHJcblx0XHR0aGlzLmNoYXJhLnBsYXlBbmltYXRpb24odGhpcy53ZWFwb25BY3Rpb24uZXF1aXBBbmltYXRpb24pXHJcblx0XHR0aGlzLmNoYXJhLm1vdmVGYWNpbmdEaXJlY3Rpb24gPSBHYW1lcGxheS5Nb3ZlRmFjaW5nRGlyZWN0aW9uLkNvbnRyb2xsZXJEaXJlY3Rpb25cclxuXHRcdHRoaXMuY2FtZXJhLnRhcmdldEFybUxlbmd0aCA9IDQwMFxyXG5cdFx0dGhpcy5jYW1lcmEuY2FtZXJhRk9WID0gdGhpcy5jb25maWcuZXF1aXBtZW50Q2FtZXJhRm92XHJcblx0XHR0aGlzLmNhbWVyYS5jYW1lcmFSZWxhdGl2ZVRyYW5zZm9ybSA9IG5ldyBUeXBlLlRyYW5zZm9ybSh0aGlzLmNvbmZpZy5lcXVpcG1lbnRDYW1lcmFPZmZzZXQsIHRoaXMuY2FtZXJhLmNhbWVyYVJlbGF0aXZlVHJhbnNmb3JtLnJvdGF0aW9uLCB0aGlzLmNhbWVyYS5jYW1lcmFSZWxhdGl2ZVRyYW5zZm9ybS5zY2FsZSlcclxuXHRcdHRoaXMuY2FtZXJhLmNhbWVyYVN5c3RlbVJlbGF0aXZlVHJhbnNmb3JtID0gbmV3IFR5cGUuVHJhbnNmb3JtKG5ldyBUeXBlLlZlY3RvcigwLCAwLCA2MCksIHRoaXMuY2FtZXJhLmNhbWVyYVJlbGF0aXZlVHJhbnNmb3JtLnJvdGF0aW9uLCB0aGlzLmNhbWVyYS5jYW1lcmFSZWxhdGl2ZVRyYW5zZm9ybS5zY2FsZSlcclxuXHRcdHRoaXMud2VhcG9uVUkgPSBVSS5VSU1hbmFnZXIuaW5zdGFuY2Uuc2hvdyhXZWFwb25VSSwgdGhpcywgdGhpcy53ZWFwb25PYmouYWNjdXJhY3lPZkZpcmVFbmFibGUgPyB0aGlzLndlYXBvbk9iai5hY2N1cmFjeU9mRmlyZUNvbXBvbmVudC5kZWZhdWx0RGlzcGVyc2lvbkhhbGZBbmdsZSA6IDAsIHRoaXMuY29uZmlnLndlYXBvbkljb24sIHRoaXMuY29uZmlnLm5hbWUpXHJcblx0XHR0aGlzLndlYXBvblVJLnNldFRpbWVUZXh0KHRoaXMuY29uZmlnLmtlZXBUaW1lLCB0aGlzLmNvbmZpZy5rZWVwVGltZSlcclxuXHRcdHRoaXMud2VhcG9uVUkuc2V0UmVsb2FkQnRuKCF0aGlzLmNvbmZpZy5pc1N1cHBvcnRSZXBBbW1vKVxyXG5cdFx0aWYgKHRoaXMuY29uZmlnLmlzU3VwcG9ydFJlcEFtbW8pIHtcclxuXHRcdFx0dGhpcy53ZWFwb25PYmoucmVsb2FkQ29tcG9uZW50LmFuaW1hdGlvbkd1aWQgPSB0aGlzLndlYXBvbkFjdGlvbi5haW1TaG9vdEFuaW1hdGlvblxyXG5cdFx0XHR0aGlzLndlYXBvbk9iai5sb2FkQ29tcG9uZW50LmFuaW1hdGlvbkd1aWQgPSB0aGlzLndlYXBvbkFjdGlvbi5haW1TaG9vdEFuaW1hdGlvblxyXG5cdFx0fVxyXG5cdFx0dGhpcy5fcmVzdFRpbWUgPSB0aGlzLmNvbmZpZy5rZWVwVGltZVxyXG5cdFx0Ly8gfSwgMTAwKVxyXG5cdH1cclxuXHQvKiBcdTRGRUVcdTY1MzlGT1YgKi9cclxuXHRwdWJsaWMgY2hhbmdlRm92KHZhbHVlOiBudW1iZXIpIHtcclxuXHRcdHRoaXMuY2FtZXJhLmNhbWVyYUZPViA9IHZhbHVlXHJcblx0fVxyXG5cclxuXHJcblx0LyogXHU1QkEyXHU2MjM3XHU3QUVGXHU1MjFEXHU1OUNCXHU1MzE2XHU2ODM5XHU1RjM5XHU4MzZGXHU1QjlFXHU0RjUzICovXHJcblx0cHJpdmF0ZSBhc3luYyBjbGllbnRJbml0QW1tb0VudGl0eVJvb3QoKSB7XHJcblx0XHR0aGlzLmFtbW9FbnRpdHlSb290ID0gYXdhaXQgR2FtZU9iamVjdC5hc3luY1NwYXduKHsgZ3VpZCA6IHRoaXMud2VhcG9uUmVzb3VyY2VzLmFtbW8gfSlcclxuXHRcdHRoaXMuYW1tb0VudGl0eVJvb3QucGFyZW50ID0gdGhpcy53ZWFwb25PYmpcclxuXHRcdHRoaXMuYW1tb1Bvb2wgPSBuZXcgR2FtZURlZi5TaW1wbGVPYmplY3RQb29sPENvcmUuR2FtZU9iamVjdD4odGhpcy5pbnN0YW5jZUFtbW8uYmluZCh0aGlzKSwgKG9iajogQ29yZS5HYW1lT2JqZWN0KSA9PiB7IG9iai5kZXN0cm95KCkgfSwgKG9iajogQ29yZS5HYW1lT2JqZWN0KSA9PiB7IG9iai5zZXRWaXNpYmlsaXR5KFR5cGUuUHJvcGVydHlTdGF0dXMuT2ZmKSB9KVxyXG5cdH1cclxuXHJcblx0LyogXHU1QkEyXHU2MjM3XHU3QUVGXHU1MjFEXHU1OUNCXHU1MzE2XHU1RjM5XHU1OEYzXHU1QjlFXHU0RjUzICovXHJcblx0cHJpdmF0ZSBhc3luYyBjbGllbnRJbml0Q2FzaW5nRW50aXR5KCkge1xyXG5cdFx0dGhpcy5jYXNpbmdFbnRpdHkgPSBhd2FpdCBHYW1lT2JqZWN0LmFzeW5jU3Bhd24oeyBndWlkIDogdGhpcy53ZWFwb25SZXNvdXJjZXMuY2FzaW5nIH0pXHJcblx0XHR0aGlzLmNhc2luZ0VudGl0eS5wYXJlbnQgPSB0aGlzLndlYXBvbk9ialxyXG5cdFx0dGhpcy5jYXNpbmdQb29sID0gbmV3IEdhbWVEZWYuU2ltcGxlT2JqZWN0UG9vbDxDb3JlLkdhbWVPYmplY3Q+KHRoaXMuaW5zdGFuY2VDYXNpbmcuYmluZCh0aGlzKSwgKG9iajogQ29yZS5HYW1lT2JqZWN0KSA9PiB7IG9iai5kZXN0cm95KCkgfSwgKG9iajogQ29yZS5HYW1lT2JqZWN0KSA9PiB7IG9iai5zZXRWaXNpYmlsaXR5KFR5cGUuUHJvcGVydHlTdGF0dXMuT2ZmKSB9KVxyXG5cdH1cclxuXHJcblx0LyogXHU1QkEyXHU2MjM3XHU3QUVGXHU1MjFEXHU1OUNCXHU1MzE2XHU1MUZCXHU0RTJEXHU4OUQyXHU4MjcyXHU3Mjc5XHU2NTQ4ICovXHJcblx0cHJpdmF0ZSBhc3luYyBjbGllbnRJbml0SGl0Q2hhcmFFZmZlY3QoKSB7XHJcblx0XHR0aGlzLmhpdENoYXJhRWZmZWN0ID0gYXdhaXQgR2FtZU9iamVjdC5hc3luY1NwYXduKHsgZ3VpZCA6IHRoaXMud2VhcG9uUmVzb3VyY2VzLmhpdFJvbGVFZmZlY3QgfSlcclxuXHRcdHRoaXMuaGl0Q2hhcmFFZmZlY3QucGFyZW50ID0gdGhpcy53ZWFwb25PYmpcclxuXHRcdHRoaXMuaGl0Q2hhcmFFZmZlY3RQb29sID0gbmV3IEdhbWVEZWYuU2ltcGxlT2JqZWN0UG9vbDxHYW1lcGxheS5QYXJ0aWNsZT4odGhpcy5pbnN0YW5jZUhpdENoYXJhRWZmZWN0LmJpbmQodGhpcyksIChwYXJ0aWNsZTogR2FtZXBsYXkuUGFydGljbGUpID0+IHsgcGFydGljbGUuZGVzdHJveSgpIH0sIChwYXJ0aWNsZTogR2FtZXBsYXkuUGFydGljbGUpID0+IHsgcGFydGljbGUuZGV0YWNoRnJvbUdhbWVPYmplY3QoKTsgcGFydGljbGUuZm9yY2VTdG9wKCkgfSlcclxuXHR9XHJcblxyXG5cdC8qIFx1NUJBMlx1NjIzN1x1N0FFRlx1NTIxRFx1NTlDQlx1NTMxNlx1NTFGQlx1NEUyRFx1NzI2OVx1NEY1M1x1NzI3OVx1NjU0OCAqL1xyXG5cdHByaXZhdGUgYXN5bmMgY2xpZW50SW5pdEhpdEVmZmVjdCgpIHtcclxuXHRcdHRoaXMuaGl0RWZmZWN0ID0gYXdhaXQgR2FtZU9iamVjdC5hc3luY1NwYXduKHsgZ3VpZCA6IHRoaXMud2VhcG9uUmVzb3VyY2VzLmhpdE90aGVyRWZmZWN0IH0pXHJcblx0XHR0aGlzLmhpdEVmZmVjdC5wYXJlbnQgPSB0aGlzLndlYXBvbk9ialxyXG5cdFx0dGhpcy5oaXRFZmZlY3RQb29sID0gbmV3IEdhbWVEZWYuU2ltcGxlT2JqZWN0UG9vbDxHYW1lcGxheS5QYXJ0aWNsZT4odGhpcy5pbnN0YW5jZUhpdEVmZmVjdC5iaW5kKHRoaXMpLCAocGFydGljbGU6IEdhbWVwbGF5LlBhcnRpY2xlKSA9PiB7IHBhcnRpY2xlLmRlc3Ryb3koKSB9LCAocGFydGljbGU6IEdhbWVwbGF5LlBhcnRpY2xlKSA9PiB7IHBhcnRpY2xlLmRldGFjaEZyb21HYW1lT2JqZWN0KCk7IHBhcnRpY2xlLmZvcmNlU3RvcCgpIH0pXHJcblx0fVxyXG5cclxuXHQvKiBcdTVCQTJcdTYyMzdcdTdBRUZcdTUyMURcdTU5Q0JcdTUzMTZcdTVGMDBcdTcwNkJcdTcyNzlcdTY1NDggKi9cclxuXHRwcml2YXRlIGFzeW5jIGNsaWVudEluaXRGaXJlRWZmZWN0KCkge1xyXG5cdFx0dGhpcy5maXJlRWZmZWN0ID0gYXdhaXQgR2FtZU9iamVjdC5hc3luY1NwYXduKHsgZ3VpZCA6IHRoaXMud2VhcG9uUmVzb3VyY2VzLmZpcmVFZmZlY3QgfSlcclxuXHRcdHRoaXMuZmlyZUVmZmVjdC5wYXJlbnQgPSB0aGlzLndlYXBvbk9ialxyXG5cdH1cclxuXHJcblx0LyogXHU1QkEyXHU2MjM3XHU3QUVGXHU1MjFEXHU1OUNCXHU1MzE2XHU1RjAwXHU3MDZCXHU5N0YzXHU2NTQ4ICovXHJcblx0cHJpdmF0ZSBhc3luYyBjbGllbnRJbml0RmlyZVNvdW5kKCkge1xyXG5cdFx0dGhpcy5maXJlU291bmQgPSBhd2FpdCBHYW1lT2JqZWN0LmFzeW5jU3Bhd24oeyBndWlkIDogdGhpcy53ZWFwb25SZXNvdXJjZXMuZmlyZVNvdW5kIH0pXHJcblx0XHR0aGlzLmZpcmVTb3VuZC5wYXJlbnQgPSB0aGlzLndlYXBvbk9ialxyXG5cdH1cclxuXHJcblx0LyogXHU1QkEyXHU2MjM3XHU3QUVGXHU1MjFEXHU1OUNCXHU1MzE2XHU2MzYyXHU1RjM5XHU5N0YzXHU2NTQ4ICovXHJcblx0cHJpdmF0ZSBhc3luYyBjbGllbnRJbml0UmVsb2FkU291bmQoKSB7XHJcblx0XHR0aGlzLnJlbG9hZFNvdW5kID0gYXdhaXQgR2FtZU9iamVjdC5hc3luY1NwYXduKHsgZ3VpZCA6IHRoaXMud2VhcG9uUmVzb3VyY2VzLnJlbG9hZFNvdW5kIH0pXHJcblx0XHR0aGlzLnJlbG9hZFNvdW5kLnBhcmVudCA9IHRoaXMud2VhcG9uT2JqXHJcblx0fVxyXG5cclxuXHQvKiBcdTVCQTJcdTYyMzdcdTdBRUZcdTUyMURcdTU5Q0JcdTUzMTZcdTRFMEFcdTgxOUJcdTk3RjNcdTY1NDggKi9cclxuXHRwcml2YXRlIGFzeW5jIGNsaWVudEluaXRMb2FkU291bmQoKSB7XHJcblx0XHR0aGlzLmxvYWRTb3VuZCA9IGF3YWl0IEdhbWVPYmplY3QuYXN5bmNTcGF3bih7IGd1aWQgOiB0aGlzLndlYXBvblJlc291cmNlcy5sb2FkU291bmQgfSlcclxuXHRcdHRoaXMubG9hZFNvdW5kLnBhcmVudCA9IHRoaXMud2VhcG9uT2JqXHJcblx0fVxyXG5cclxuXHQvKiBcdTVCQTJcdTYyMzdcdTdBRUZcdTUyMURcdTU5Q0JcdTUzMTZcdTc3ODRcdTUxQzZcdTk3RjNcdTY1NDggKi9cclxuXHRwcml2YXRlIGFzeW5jIGNsaWVudEluaXRBaW1Tb3VuZCgpIHtcclxuXHRcdHRoaXMuYWltU291bmQgPSBhd2FpdCBHYW1lT2JqZWN0LmFzeW5jU3Bhd24oeyBndWlkIDogdGhpcy53ZWFwb25SZXNvdXJjZXMuYWltU291bmQgfSlcclxuXHRcdHRoaXMuYWltU291bmQucGFyZW50ID0gdGhpcy53ZWFwb25PYmpcclxuXHR9XHJcblxyXG5cdC8qIFx1NUJBMlx1NjIzN1x1N0FFRlx1NTIxRFx1NTlDQlx1NTMxNlx1NjgzOVx1NTFGQlx1NEUyRFx1ODlEMlx1ODI3Mlx1OTdGM1x1NjU0OCAqL1xyXG5cdHByaXZhdGUgYXN5bmMgY2xpZW50SW5pdEhpdENoYXJhU291bmQoKSB7XHJcblx0XHR0aGlzLmhpdENoYXJhU291bmQgPSBhd2FpdCBHYW1lT2JqZWN0LmFzeW5jU3Bhd24oeyBndWlkIDogdGhpcy53ZWFwb25SZXNvdXJjZXMuaGl0Um9sZVNvdW5kIH0pXHJcblx0XHR0aGlzLmhpdENoYXJhU291bmQucGFyZW50ID0gdGhpcy53ZWFwb25PYmpcclxuXHRcdHRoaXMuaGl0Q2hhcmFTb3VuZFBvb2wgPSBuZXcgR2FtZURlZi5TaW1wbGVPYmplY3RQb29sPEdhbWVwbGF5LlNvdW5kPih0aGlzLmluc3RhbmNlSGl0Q2hhcmFTb3VuZC5iaW5kKHRoaXMpLCAoc291bmQ6IEdhbWVwbGF5LlNvdW5kKSA9PiB7IHNvdW5kLmRlc3Ryb3koKSB9LCAoc291bmQ6IEdhbWVwbGF5LlNvdW5kKSA9PiB7IHNvdW5kLnN0b3AoKSB9KVxyXG5cdH1cclxuXHJcblx0LyogXHU1QkEyXHU2MjM3XHU3QUVGXHU1MjFEXHU1OUNCXHU1MzE2XHU2ODM5XHU1MUZCXHU0RTJEXHU3MjY5XHU0RjUzXHU5N0YzXHU2NTQ4ICovXHJcblx0cHJpdmF0ZSBhc3luYyBjbGllbnRJbml0SGl0U291bmQoKSB7XHJcblx0XHR0aGlzLmhpdFNvdW5kID0gYXdhaXQgR2FtZU9iamVjdC5hc3luY1NwYXduKHsgZ3VpZCA6IHRoaXMud2VhcG9uUmVzb3VyY2VzLmhpdE90aGVyU291bmQgfSlcclxuXHRcdHRoaXMuaGl0U291bmQucGFyZW50ID0gdGhpcy53ZWFwb25PYmpcclxuXHRcdHRoaXMuaGl0U291bmRQb29sID0gbmV3IEdhbWVEZWYuU2ltcGxlT2JqZWN0UG9vbDxHYW1lcGxheS5Tb3VuZD4odGhpcy5pbnN0YW5jZUhpdFNvdW5kLmJpbmQodGhpcyksIChzb3VuZDogR2FtZXBsYXkuU291bmQpID0+IHsgc291bmQuZGVzdHJveSgpIH0sIChzb3VuZDogR2FtZXBsYXkuU291bmQpID0+IHsgc291bmQuc3RvcCgpIH0pXHJcblx0fVxyXG5cclxuXHQvKiBcdThGRDRcdTU2REVcdTRFMDBcdTRFMkFcdTVGMzlcdTgzNkZcdTVCOUVcdTRGOEIgKi9cclxuXHRwcml2YXRlIGluc3RhbmNlQW1tbygpIHtcclxuXHRcdGxldCBhbW1vID0gdGhpcy5hbW1vRW50aXR5Um9vdC5jbG9uZShmYWxzZSlcclxuXHRcdGFtbW8uZGV0YWNoRnJvbUdhbWVPYmplY3QoKVxyXG5cdFx0YW1tby5zZXRWaXNpYmlsaXR5KFR5cGUuUHJvcGVydHlTdGF0dXMuT24pXHJcblx0XHRyZXR1cm4gYW1tb1xyXG5cdH1cclxuXHJcblx0LyogXHU4RkQ0XHU1NkRFXHU0RTAwXHU0RTJBXHU1RjM5XHU1OEYzXHU1QjlFXHU0RjhCICovXHJcblx0cHJpdmF0ZSBpbnN0YW5jZUNhc2luZygpIHtcclxuXHRcdGxldCBjYXNpbmcgPSB0aGlzLmNhc2luZ0VudGl0eS5jbG9uZShmYWxzZSlcclxuXHRcdGNhc2luZy5kZXRhY2hGcm9tR2FtZU9iamVjdCgpXHJcblx0XHRjYXNpbmcuc2V0VmlzaWJpbGl0eShUeXBlLlByb3BlcnR5U3RhdHVzLk9uKVxyXG5cdFx0cmV0dXJuIGNhc2luZ1xyXG5cdH1cclxuXHJcblx0LyogXHU4RkQ0XHU1NkRFXHU0RTAwXHU0RTJBXHU1MUZCXHU0RTJEXHU4OUQyXHU4MjcyXHU3Mjc5XHU2NTQ4XHU1QjlFXHU0RjhCICovXHJcblx0cHJpdmF0ZSBpbnN0YW5jZUhpdENoYXJhRWZmZWN0KCkge1xyXG5cdFx0bGV0IGhpdENoYXJhID0gdGhpcy5oaXRDaGFyYUVmZmVjdC5jbG9uZShmYWxzZSkgYXMgR2FtZXBsYXkuUGFydGljbGVcclxuXHRcdGhpdENoYXJhLmRldGFjaEZyb21HYW1lT2JqZWN0KClcclxuXHRcdHJldHVybiBoaXRDaGFyYVxyXG5cdH1cclxuXHJcblx0LyogXHU4RkQ0XHU1NkRFXHU0RTAwXHU0RTJBXHU1MUZCXHU0RTJEXHU3MjY5XHU0RjUzXHU3Mjc5XHU2NTQ4XHU1QjlFXHU0RjhCICovXHJcblx0cHJpdmF0ZSBpbnN0YW5jZUhpdEVmZmVjdCgpIHtcclxuXHRcdGxldCBoaXQgPSB0aGlzLmhpdEVmZmVjdC5jbG9uZShmYWxzZSkgYXMgR2FtZXBsYXkuUGFydGljbGVcclxuXHRcdGhpdC5kZXRhY2hGcm9tR2FtZU9iamVjdCgpXHJcblx0XHRyZXR1cm4gaGl0XHJcblx0fVxyXG5cclxuXHQvKiBcdThGRDRcdTU2REVcdTRFMDBcdTRFMkFcdTUxRkJcdTRFMkRcdTg5RDJcdTgyNzJcdTk3RjNcdTY1NDhcdTVCOUVcdTRGOEIgKi9cclxuXHRwcml2YXRlIGluc3RhbmNlSGl0Q2hhcmFTb3VuZCgpIHtcclxuXHRcdGxldCBoaXRDaGFyYSA9IHRoaXMuaGl0Q2hhcmFTb3VuZC5jbG9uZShmYWxzZSkgYXMgR2FtZXBsYXkuU291bmRcclxuXHRcdGhpdENoYXJhLmRldGFjaEZyb21HYW1lT2JqZWN0KClcclxuXHRcdHJldHVybiBoaXRDaGFyYVxyXG5cdH1cclxuXHJcblx0LyogXHU4RkQ0XHU1NkRFXHU0RTAwXHU0RTJBXHU1MUZCXHU0RTJEXHU5N0YzXHU2NTQ4XHU1QjlFXHU0RjhCICovXHJcblx0cHJpdmF0ZSBpbnN0YW5jZUhpdFNvdW5kKCkge1xyXG5cdFx0bGV0IGhpdCA9IHRoaXMuaGl0U291bmQuY2xvbmUoZmFsc2UpIGFzIEdhbWVwbGF5LlNvdW5kXHJcblx0XHRoaXQuZGV0YWNoRnJvbUdhbWVPYmplY3QoKVxyXG5cdFx0cmV0dXJuIGhpdFxyXG5cdH1cclxuXHJcblxyXG5cclxuXHQvKiBcdTVCQTJcdTYyMzdcdTdBRUZcdTUyMURcdTU5Q0JcdTUzMTZcdTU2REVcdThDMDNcdTUxRkRcdTY1NzAgKi9cclxuXHRwcml2YXRlIGNsaWVudEluaXREZWxlZ2F0ZSgpOiB2b2lkIHtcclxuXHRcdHRoaXMud2VhcG9uT2JqLm9uRXF1aXBwZWRDbGllbnQuYWRkKHRoaXMub25DbGllbnRFcXVpcC5iaW5kKHRoaXMpKVxyXG5cdFx0dGhpcy53ZWFwb25PYmoub25VbmVxdWlwcGVkQ2xpZW50LmFkZCh0aGlzLm9uQ2xpZW50VW5lcXVpcC5iaW5kKHRoaXMpKVxyXG5cclxuXHRcdHRoaXMud2VhcG9uT2JqLmZpcmVDb21wb25lbnQub25TdGFydEZpcmVDbGllbnQuYWRkKHRoaXMub25DbGllbnRTdGFydEZpcmUuYmluZCh0aGlzKSlcclxuXHRcdHRoaXMud2VhcG9uT2JqLmZpcmVDb21wb25lbnQub25FbmRGaXJlQ2xpZW50LmFkZCh0aGlzLm9uQ2xpZW50RW5kRmlyZS5iaW5kKHRoaXMpKVxyXG5cdFx0aWYgKHRoaXMud2VhcG9uT2JqLnJlbG9hZEVuYWJsZSkge1xyXG5cdFx0XHR0aGlzLndlYXBvbk9iai5yZWxvYWRDb21wb25lbnQub25TdGFydFJlbG9hZENsaWVudC5hZGQodGhpcy5vbkNsaWVudFN0YXJ0UmVsb2FkLmJpbmQodGhpcykpXHJcblx0XHRcdHRoaXMud2VhcG9uT2JqLnJlbG9hZENvbXBvbmVudC5vbkVuZFJlbG9hZENsaWVudC5hZGQodGhpcy5vbkNsaWVudEVuZFJlbG9hZC5iaW5kKHRoaXMpKVxyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMud2VhcG9uT2JqLmxvYWRFbmFibGUpIHtcclxuXHRcdFx0dGhpcy53ZWFwb25PYmoubG9hZENvbXBvbmVudC5vblN0YXJ0TG9hZENsaWVudC5hZGQodGhpcy5vbkNsaWVudFN0YXJ0TG9hZC5iaW5kKHRoaXMpKVxyXG5cdFx0XHR0aGlzLndlYXBvbk9iai5sb2FkQ29tcG9uZW50Lm9uRW5kTG9hZENsaWVudC5hZGQodGhpcy5vbkNsaWVudEVuZExvYWQuYmluZCh0aGlzKSlcclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLndlYXBvbk9iai5haW1FbmFibGUpIHtcclxuXHRcdFx0dGhpcy53ZWFwb25PYmouYWltQ29tcG9uZW50Lm9uQWltU3RhcnRDbGllbnQuYWRkKHRoaXMub25DbGllbnRTdGFydEFpbS5iaW5kKHRoaXMpKVxyXG5cdFx0XHR0aGlzLndlYXBvbk9iai5haW1Db21wb25lbnQub25BaW1FbmRDbGllbnQuYWRkKHRoaXMub25DbGllbnRFbmRBaW0uYmluZCh0aGlzKSlcclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLndlYXBvbk9iai5yZWNvaWxGb3JjZUVuYWJsZSkge1xyXG5cdFx0XHR0aGlzLndlYXBvbk9iai5yZWNvaWxGb3JjZUNvbXBvbmVudC5vblN0YXJ0UmVjb2lsRm9yY2VDbGllbnQuYWRkKHRoaXMub25DbGllbnRTdGFydFJlY29pbC5iaW5kKHRoaXMpKVxyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMud2VhcG9uT2JqLmFjY3VyYWN5T2ZGaXJlRW5hYmxlKSB7XHJcblx0XHRcdHRoaXMud2VhcG9uT2JqLmFjY3VyYWN5T2ZGaXJlQ29tcG9uZW50Lm9uQ3VycmVudERpc3BlcnNpb25DaGFuZ2VkQ2xpZW50LmFkZCh0aGlzLm9uQ2xpZW50Q3VycmVudERpc3BlcnNpb25DaGFuZ2VkLmJpbmQodGhpcykpXHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gdGhpcy5jbGllbnRPbkhpdCA9ICgoaGl0UmVzdWx0OiBDb3JlLkdhbWVPYmplY3RbXSB8IEdhbWVwbGF5LkhpdFJlc3VsdFtdLCBhdHRhY2tQbGF5ZXI6IG51bWJlciwgaXNPYmo6IGJvb2xlYW4pID0+IHtcclxuXHRcdC8vIFx0aWYgKGlzT2JqKSB7XHJcblx0XHQvLyBcdFx0Zm9yIChjb25zdCBlbGVtZW50IG9mIGhpdFJlc3VsdCkge1xyXG5cdFx0Ly8gXHRcdFx0Y29uc29sZS5lcnJvcihcImhpdCBcIiArIChlbGVtZW50IGFzIENvcmUuR2FtZU9iamVjdCkuZ3VpZClcclxuXHRcdC8vIFx0XHR9XHJcblx0XHQvLyBcdH0gZWxzZSB7XHJcblx0XHQvLyBcdFx0Zm9yIChjb25zdCBlbGVtZW50IG9mIGhpdFJlc3VsdCkge1xyXG5cdFx0Ly8gXHRcdFx0Y29uc29sZS5lcnJvcihcImhpdCBcIiArIChlbGVtZW50IGFzIEdhbWVwbGF5LkhpdFJlc3VsdCkuZ2FtZU9iamVjdC5ndWlkKVxyXG5cdFx0Ly8gXHRcdH1cclxuXHRcdC8vIFx0fVxyXG5cdFx0Ly8gfSlcclxuXHJcblx0XHR0aGlzLmNsaWVudE9uQmxvY2tDaGFuZ2UgPSAoKGlzQmxvY2s6IGJvb2xlYW4pID0+IHtcclxuXHRcdFx0Y29uc29sZS5lcnJvcihcImlzQmxvY2sgXCIgKyBpc0Jsb2NrKVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdC8qIFx1NUJBMlx1NjIzN1x1N0FFRlx1NUYwMFx1NTlDQlx1ODhDNVx1NTkwN1x1NUI4Q1x1NjIxMFx1NTZERVx1OEMwMyAqL1xyXG5cdHByaXZhdGUgb25DbGllbnRFcXVpcCgpIHtcclxuXHRcdGNvbnNvbGUuZXJyb3IoXCJDbGllbnRFcXVpcFwiKVxyXG5cdFx0Ly8gXHU4OEM1XHU1OTA3XHU3Njg0XHU2QjY2XHU1NjY4XHU1OTgyXHU2NzlDXHU2NzA5XHU2MkZFXHU1M0Q2XHU4OUU2XHU1M0QxXHU1NjY4XHJcblx0XHRpZiAodGhpcy5waWNrVXBUcmlnZ2VyKSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoXCJkZXN0cm95IHRyaWdnZXJcIilcclxuXHRcdFx0dGhpcy5waWNrVXBUcmlnZ2VyLnNldENvbGxpc2lvbkVuYWJsZWQoZmFsc2UpXHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gXHU4OEM1XHU1OTA3XHU3Njg0XHU2QjY2XHU1NjY4XHU1QkY5XHU4QzYxXHU1OTgyXHU2NzlDXHU2NzA5XHU2QjY2XHU1NjY4XHU1QjlFXHU0RjUzXHVGRjBDXHU1MjE5XHU2MjhBXHU1M0VGXHU4OUMxXHU2MDI3XHU2MjUzXHU1RjAwXHJcblx0XHRpZiAoIXRoaXMud2VhcG9uRW50aXR5Um9vdCkge1xyXG5cdFx0XHR0aGlzLndlYXBvbkVudGl0eVJvb3Quc2V0VmlzaWJpbGl0eShUeXBlLlByb3BlcnR5U3RhdHVzLk9uKVxyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG5cclxuXHQvKiBcdTVCQTJcdTYyMzdcdTdBRUZcdTUzNzhcdThGN0RcdTg4QzVcdTU5MDdcdTVCOENcdTYyMTBcdTU2REVcdThDMDMgKi9cclxuXHRwcml2YXRlIG9uQ2xpZW50VW5lcXVpcCgpIHtcclxuXHRcdGNvbnNvbGUuZXJyb3IoXCJvbkNsaWVudFVuZXF1aXBcIilcclxuXHRcdGlmICghdGhpcy53ZWFwb25PYmopIHJldHVyblxyXG5cdFx0aWYgKHRoaXMuY29uZmlnLmlzQXV0b0Rlc3Ryb3kpIHtcclxuXHRcdFx0dGhpcy53ZWFwb25PYmouc2V0VmlzaWJpbGl0eShUeXBlLlByb3BlcnR5U3RhdHVzLk9mZilcclxuXHRcdFx0dGhpcy53ZWFwb25PYmogPSBudWxsXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRpZiAodGhpcy5waWNrVXBUcmlnZ2VyKSB7XHJcblx0XHRcdFx0dGhpcy53ZWFwb25PYmoud29ybGRSb3RhdGlvbiA9IG5ldyBUeXBlLlJvdGF0aW9uKDAsIDAsIDEpXHJcblx0XHRcdFx0dGhpcy53ZWFwb25PYmoud29ybGRMb2NhdGlvbiA9IFR5cGUuVmVjdG9yLmFkZCh0aGlzLndlYXBvbk9iai5nZXRSaWdodFZlY3RvcigpLm11bHRpcGx5KDEwMCksIHRoaXMud2VhcG9uT2JqLndvcmxkTG9jYXRpb24sIHRoaXMud2VhcG9uT2JqLndvcmxkTG9jYXRpb24pXHJcblx0XHRcdFx0dGhpcy5waWNrVXBUcmlnZ2VyLnNldENvbGxpc2lvbkVuYWJsZWQodHJ1ZSlcclxuXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxuXHQvKiBcdTVCQTJcdTYyMzdcdTdBRUZcdTVGMDBcdTU5Q0JcdTVGMDBcdTcwNkJcdTU2REVcdThDMDMgKi9cclxuXHRwcml2YXRlIG9uQ2xpZW50U3RhcnRGaXJlKCkge1xyXG5cdFx0aWYgKCF0aGlzLndlYXBvbk9iaikge1xyXG5cdFx0XHRyZXR1cm5cclxuXHRcdH1cclxuXHRcdHRoaXMuaXNDYW5GaXJlID0gdGhpcy53ZWFwb25PYmouZmlyZUNvbXBvbmVudC5jdXJyZW50RmlyZUludGVydmFsXHJcblx0XHRpZiAoIXRoaXMuZmlyZUVmZmVjdC5sb29wKSB7XHJcblx0XHRcdHRoaXMuZmlyZUVmZmVjdC5zdG9wKClcclxuXHRcdH1cclxuXHRcdHRoaXMuZmlyZUVmZmVjdC5wbGF5KClcclxuXHRcdGlmICghdGhpcy5maXJlU291bmQubG9vcCkge1xyXG5cdFx0XHR0aGlzLmZpcmVTb3VuZC5zdG9wKClcclxuXHRcdH1cclxuXHRcdHRoaXMuZmlyZVNvdW5kLnBsYXkoKVxyXG5cdFx0Ly8gXHU2QjY2XHU1NjY4XHU2MzAxXHU2NzA5XHU0RUJBXHU1QkEyXHU2MjM3XHU3QUVGXHU2MjY3XHU4ODRDXHJcblx0XHRpZiAodGhpcy53ZWFwb25PYmouZ2V0Q3VycmVudE93bmVyKCkgPT0gdGhpcy5jaGFyYSkge1xyXG5cdFx0XHQvLyBcdTU5ODJcdTY3OUNcdTVGMzlcdTgzNkZcdTVCOUVcdTRGNTNcdTRFMERcdTRFM0FcdTdBN0FcdUZGMDhcdTY3MDlcdTVGMzlcdTkwNTNcdTg4NjhcdTczQjBcdUZGMDlcclxuXHRcdFx0aWYgKHRoaXMuYW1tb0VudGl0eVJvb3QuZ2V0Q2hpbGRyZW4oKS5sZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0Ly8gXHU2ODM5XHU2MzZFXHU1OTFBXHU5MUNEXHU1RjM5XHU4MzZGXHU2NTcwXHU1QkY5XHU2NzJDXHU2QjIxXHU1M0QxXHU1QzA0XHU3Njg0XHU2MjQwXHU2NzA5XHU1QjUwXHU1RjM5XHU1QkY5XHU4QzYxXHU0RjIwXHU1M0MyXHJcblx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPHRoaXMud2VhcG9uT2JqLmZpcmVDb21wb25lbnQuY3VycmVudE11bHRpcGxlU2hvdDsgaSsrKSB7XHJcblxyXG5cdFx0XHRcdFx0bGV0IGNhbWVyYVNob290RGlyID0gdGhpcy5jYW1lcmEuY2FtZXJhV29ybGRUcmFuc2Zvcm0uZ2V0Rm9yd2FyZFZlY3RvcigpLmNsb25lKClcclxuXHRcdFx0XHRcdGlmICh0aGlzLndlYXBvbk9iai5hY2N1cmFjeU9mRmlyZUVuYWJsZSkge1xyXG5cdFx0XHRcdFx0XHRjYW1lcmFTaG9vdERpciA9IHRoaXMud2VhcG9uT2JqLmFjY3VyYWN5T2ZGaXJlQ29tcG9uZW50LmdldFJhbmRvbVNob290RGlyKGNhbWVyYVNob290RGlyKS5jbG9uZSgpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRsZXQgZW5kTG9jID0gY2FtZXJhU2hvb3REaXIubXVsdGlwbHkoR2FtZURlZi5TSE9PVF9SQU5HRSkuYWRkKHRoaXMuY2FtZXJhLmNhbWVyYVdvcmxkVHJhbnNmb3JtLmxvY2F0aW9uKVxyXG5cdFx0XHRcdFx0bGV0IHNob290RGlyID0gZW5kTG9jLmNsb25lKCkuc3VidHJhY3QodGhpcy5hbW1vRW50aXR5Um9vdC53b3JsZExvY2F0aW9uKVxyXG5cdFx0XHRcdFx0bGV0IGhpdFJlcyA9IEdhbWVwbGF5LmxpbmVUcmFjZSh0aGlzLmNhbWVyYS5jYW1lcmFXb3JsZFRyYW5zZm9ybS5sb2NhdGlvbiwgZW5kTG9jLCB0cnVlLCBHYW1lRGVmLkRFQlVHX0ZMQUcpXHJcblx0XHRcdFx0XHRoaXRSZXMgPSBoaXRSZXMuZmlsdGVyKGUgPT4ge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gIShlLmdhbWVPYmplY3QgaW5zdGFuY2VvZiBHYW1lcGxheS5UcmlnZ2VyKVxyXG5cdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdGlmIChoaXRSZXMgJiYgaGl0UmVzLmxlbmd0aCA+IDAgJiYgVHlwZS5WZWN0b3IuZG90KGhpdFJlc1swXS5sb2NhdGlvbi5jbG9uZSgpLnN1YnRyYWN0KHRoaXMuYW1tb0VudGl0eVJvb3Qud29ybGRMb2NhdGlvbiksIHNob290RGlyKSA+IDApIHtcclxuXHRcdFx0XHRcdFx0c2hvb3REaXIgPSBoaXRSZXNbMF0uaW1wYWN0UG9pbnQuY2xvbmUoKS5zdWJ0cmFjdCh0aGlzLmFtbW9FbnRpdHlSb290LndvcmxkTG9jYXRpb24pXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRsZXQgYW1tb0RpcmVjdGlvbiA9IHNob290RGlyLm5vcm1hbGl6ZWRcclxuXHRcdFx0XHRcdGlmICh0aGlzLmNvbmZpZy5hbW1vU3BlZWQgPCBHYW1lRGVmLk1BWF9TSE9PVFNQRUVEIHx8IHRoaXMuaXNCbG9jaykgeyAvLyBcdTU5ODJcdTY3OUNcdTVGMzlcdTgzNkZcdTkwMUZcdTVFQTZcdTVDMEZcdTRFOEVcdTY3MDBcdTU5MjdcdTk4REVcdTg4NENcdTkwMUZcdTVFQTZcdTUwM0NcdTYyMTZcdTgwMDVcdTVGMzlcdTkwNTNcdTY3MDlcdTY2MEVcdTY2M0VcdTk2M0JcdTYzMjFcdTYwQzVcdTUxQjVcdTRFMEJcdUZGMENcdTVGMzlcdTgzNkZcdThENzBcdTc3MUZcdTVCOUVcdTVGMzlcdTkwNTNcclxuXHRcdFx0XHRcdFx0dGhpcy5zZXJ2ZXJGaXJlKHRoaXMuYW1tb0VudGl0eVJvb3Qud29ybGRMb2NhdGlvbi5jbG9uZSgpLCBhbW1vRGlyZWN0aW9uKVxyXG5cdFx0XHRcdFx0XHRpZiAodGhpcy5hbW1vQXJyYXkubGVuZ3RoID4gdGhpcy53ZWFwb25PYmouZmlyZUNvbXBvbmVudC5jdXJyZW50Q2xpcFNpemUpIHtcclxuXHRcdFx0XHRcdFx0XHRsZXQgZGlzY2FyZEFtbW8gPSB0aGlzLmFtbW9BcnJheS5zaGlmdCgpXHJcblx0XHRcdFx0XHRcdFx0ZGlzY2FyZEFtbW8uZGVzdHJveSgpXHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0dGhpcy5hbW1vQXJyYXkucHVzaChuZXcgQW1tbyh0aGlzLmNoYXJhLCB0aGlzLmFtbW9Qb29sLCB0aGlzLmFtbW9FbnRpdHlSb290LndvcmxkTG9jYXRpb24sIGFtbW9EaXJlY3Rpb24sIHRoaXMuY29uZmlnLnNob290UmFuZ2UsIHRoaXMuY29uZmlnLmFtbW9TcGVlZCwgdGhpcy5jb25maWcuZ3Jhdml0eVNjYWxlLCB0aGlzLmNvbmZpZy5kZXRlY3RSYWRpdXMpKVxyXG5cdFx0XHRcdFx0fSBlbHNlIHsgLy8gXHU1MTc2XHU0RjU5XHU2MEM1XHU1MUI1XHU1RjM5XHU4MzZGXHU4RDcwXHU4NjVBXHU1MDQ3XHU1RjM5XHU5MDUzXHVGRjA4XHU1QjUwXHU1RjM5XHU4RjY4XHU4RkY5XHU1NDhDXHU2OEMwXHU2RDRCXHU4RjY4XHU4RkY5XHU0RTBEXHU1NDBDXHVGRjBDXHU1M0VBXHU2NjJGXHU3RUM4XHU3MEI5XHU3NkY4XHU1NDBDXHVGRjA5XHJcblx0XHRcdFx0XHRcdHRoaXMuc2VydmVyRmlyZSh0aGlzLmFtbW9FbnRpdHlSb290LndvcmxkTG9jYXRpb24uY2xvbmUoKSwgYW1tb0RpcmVjdGlvbilcclxuXHRcdFx0XHRcdFx0aWYgKHRoaXMuYW1tb0FycmF5Lmxlbmd0aCA+IHRoaXMud2VhcG9uT2JqLmZpcmVDb21wb25lbnQuY3VycmVudENsaXBTaXplKSB7XHJcblx0XHRcdFx0XHRcdFx0bGV0IGRpc2NhcmRBbW1vID0gdGhpcy5hbW1vQXJyYXkuc2hpZnQoKVxyXG5cdFx0XHRcdFx0XHRcdGRpc2NhcmRBbW1vLmRlc3Ryb3koKVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdGlmIChoaXRSZXMubGVuZ3RoID4gMCkgeyAvLyBcdTVDNEZcdTVFNTVcdTRFMkRcdTVGQzNcdTVDMDRcdTdFQkZcdTUxRkJcdTRFMkRcclxuXHRcdFx0XHRcdFx0XHR0aGlzLmFtbW9BcnJheS5wdXNoKG5ldyBBbW1vKHRoaXMuY2hhcmEsIHRoaXMuYW1tb1Bvb2wsIHRoaXMuYW1tb0VudGl0eVJvb3Qud29ybGRMb2NhdGlvbiwgYW1tb0RpcmVjdGlvbiwgc2hvb3REaXIubGVuZ3RoLCB0aGlzLmNvbmZpZy5hbW1vU3BlZWQsIHRoaXMuY29uZmlnLmdyYXZpdHlTY2FsZSwgMCwgaGl0UmVzKSlcclxuXHRcdFx0XHRcdFx0fSBlbHNlIHsgLy8gXHU1QzRGXHU1RTU1XHU0RTJEXHU1RkMzXHU1QzA0XHU3RUJGXHU2NzJBXHU1MUZCXHU0RTJEXHJcblx0XHRcdFx0XHRcdFx0dGhpcy5hbW1vQXJyYXkucHVzaChuZXcgQW1tbyh0aGlzLmNoYXJhLCB0aGlzLmFtbW9Qb29sLCB0aGlzLmFtbW9FbnRpdHlSb290LndvcmxkTG9jYXRpb24sIGFtbW9EaXJlY3Rpb24sIHNob290RGlyLmxlbmd0aCwgdGhpcy5jb25maWcuYW1tb1NwZWVkLCB0aGlzLmNvbmZpZy5ncmF2aXR5U2NhbGUsIDApKVxyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQvLyBcdTU5ODJcdTY3OUNcdTUyRkVcdTkwMDlcdTVGMzlcdTU4RjNcdTg4NjhcdTczQjBcdUZGMENcdTUyMTlcdTUzRDFcdTVDMDRcdTVCQTJcdTYyMzdcdTdBRUZcdTYzRDBcdTRGOUJcdTVGMzlcdTU4RjNcdTVGMzlcdTUxRkFcdTg4NjhcdTczQjBcclxuXHRcdFx0XHRpZiAodGhpcy5jb25maWcuaXNXZWFwb25IYXZlQ2FzaW5nKSB7XHJcblx0XHRcdFx0XHR0aGlzLmNhc2luZ0FycmF5LnB1c2gobmV3IENhc2luZyh0aGlzLmNhc2luZ1Bvb2wsIHRoaXMuY2FzaW5nRW50aXR5LCB0aGlzLndlYXBvbkVudGl0eVJvb3QuZ2V0UmlnaHRWZWN0b3IoKS5jbG9uZSgpKSlcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0gZWxzZSB7IC8vIFx1NTk4Mlx1Njc5Q1x1NUYzOVx1ODM2Rlx1NUI5RVx1NEY1M1x1NEUzQVx1N0E3QVx1RkYwOFx1NjVFMFx1NUYzOVx1OTA1M1x1ODg2OFx1NzNCMFx1RkYwOVxyXG5cdFx0XHRcdGxldCBjYW1lcmFTaG9vdERpciA9IHRoaXMuY2FtZXJhLmNhbWVyYVdvcmxkVHJhbnNmb3JtLmdldEZvcndhcmRWZWN0b3IoKS5jbG9uZSgpXHJcblx0XHRcdFx0aWYgKHRoaXMud2VhcG9uT2JqLmFjY3VyYWN5T2ZGaXJlRW5hYmxlKSB7XHJcblx0XHRcdFx0XHRjYW1lcmFTaG9vdERpciA9IHRoaXMud2VhcG9uT2JqLmFjY3VyYWN5T2ZGaXJlQ29tcG9uZW50LmdldFJhbmRvbVNob290RGlyKGNhbWVyYVNob290RGlyKS5jbG9uZSgpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGxldCBlbmRMb2MgPSBjYW1lcmFTaG9vdERpci5tdWx0aXBseShHYW1lRGVmLlNIT09UX1JBTkdFKS5hZGQodGhpcy5jYW1lcmEuY2FtZXJhV29ybGRUcmFuc2Zvcm0ubG9jYXRpb24pXHJcblx0XHRcdFx0bGV0IHNob290RGlyID0gZW5kTG9jLmNsb25lKCkuc3VidHJhY3QodGhpcy5hbW1vRW50aXR5Um9vdC53b3JsZExvY2F0aW9uKVxyXG5cdFx0XHRcdGxldCBoaXRSZXMgPSBHYW1lcGxheS5saW5lVHJhY2UodGhpcy5jYW1lcmEuY2FtZXJhV29ybGRUcmFuc2Zvcm0ubG9jYXRpb24sIGVuZExvYywgdHJ1ZSwgR2FtZURlZi5ERUJVR19GTEFHKVxyXG5cdFx0XHRcdGhpdFJlcyA9IGhpdFJlcy5maWx0ZXIoZSA9PiB7XHJcblx0XHRcdFx0XHRyZXR1cm4gIShlLmdhbWVPYmplY3QgaW5zdGFuY2VvZiBHYW1lcGxheS5UcmlnZ2VyKVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0aWYgKGhpdFJlcyAmJiBoaXRSZXMubGVuZ3RoID4gMCAmJiBUeXBlLlZlY3Rvci5kb3QoaGl0UmVzWzBdLmxvY2F0aW9uLmNsb25lKCkuc3VidHJhY3QodGhpcy5hbW1vRW50aXR5Um9vdC53b3JsZExvY2F0aW9uKSwgc2hvb3REaXIpID4gMCkge1xyXG5cdFx0XHRcdFx0c2hvb3REaXIgPSBoaXRSZXNbMF0uaW1wYWN0UG9pbnQuY2xvbmUoKS5zdWJ0cmFjdCh0aGlzLmFtbW9FbnRpdHlSb290LndvcmxkTG9jYXRpb24pXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGxldCBhbW1vRGlyZWN0aW9uID0gc2hvb3REaXIubm9ybWFsaXplZFxyXG5cdFx0XHRcdHRoaXMud2VhcG9uT2JqLndvcmxkUm90YXRpb24gPSBhbW1vRGlyZWN0aW9uLnRvUm90YXRpb24oKVxyXG5cdFx0XHRcdGxldCBlbmQgPSBhbW1vRGlyZWN0aW9uLmNsb25lKCkubXVsdGlwbHkodGhpcy5jb25maWcuc2hvb3RSYW5nZSkuYWRkKHRoaXMuYW1tb0VudGl0eVJvb3Qud29ybGRMb2NhdGlvbilcclxuXHRcdFx0XHRpZiAodGhpcy5jb25maWcuZGV0ZWN0UmFkaXVzIDwgMTApIHtcclxuXHRcdFx0XHRcdGxldCBsaW5lUmVzdWx0ID0gR2FtZXBsYXkubGluZVRyYWNlKHRoaXMuYW1tb0VudGl0eVJvb3Qud29ybGRMb2NhdGlvbiwgZW5kLCB0cnVlLCBHYW1lRGVmLkRFQlVHX0ZMQUcpXHJcblx0XHRcdFx0XHRsaW5lUmVzdWx0ID0gbGluZVJlc3VsdC5maWx0ZXIoZSA9PiB7XHJcblx0XHRcdFx0XHRcdHJldHVybiAhKGUuZ2FtZU9iamVjdCBpbnN0YW5jZW9mIEdhbWVwbGF5LlRyaWdnZXIpXHJcblx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0dGhpcy5oaXQobGluZVJlc3VsdClcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0bGV0IGJveFJlc3VsdCA9IEdhbWVwbGF5LmJveE92ZXJsYXBJbkxldmVsKHRoaXMuYW1tb0VudGl0eVJvb3Qud29ybGRMb2NhdGlvbiwgZW5kLCB0aGlzLmNvbmZpZy5kZXRlY3RSYWRpdXMsIHRoaXMuY29uZmlnLmRldGVjdFJhZGl1cywgR2FtZURlZi5ERUJVR19GTEFHKVxyXG5cdFx0XHRcdFx0dGhpcy5oaXQoYm94UmVzdWx0KVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSB1cGRhdGVCbG9ja0ZpcmUoKTogYm9vbGVhbiB7XHJcblx0XHRsZXQgZmxhZyA9IHRoaXMuaXNCbG9ja1xyXG5cdFx0bGV0IGxpbmVSZXN1bHRNdXp6bGUgPSBHYW1lcGxheS5saW5lVHJhY2UodGhpcy5hbW1vRW50aXR5Um9vdC53b3JsZExvY2F0aW9uLFxyXG5cdFx0XHR0aGlzLmFtbW9FbnRpdHlSb290LmdldEZvcndhcmRWZWN0b3IoKS5tdWx0aXBseSh0aGlzLmNvbmZpZy5maXJlQmxvY2tEaXN0YW5jZSkuYWRkKHRoaXMuYW1tb0VudGl0eVJvb3Qud29ybGRMb2NhdGlvbiksXHJcblx0XHRcdHRydWUsIEdhbWVEZWYuREVCVUdfRkxBRylcclxuXHRcdGxpbmVSZXN1bHRNdXp6bGUgPSBsaW5lUmVzdWx0TXV6emxlLmZpbHRlcihlID0+IHtcclxuXHRcdFx0cmV0dXJuICEoZS5nYW1lT2JqZWN0IGluc3RhbmNlb2YgR2FtZXBsYXkuVHJpZ2dlcilcclxuXHRcdH0pXHJcblx0XHRpZiAobGluZVJlc3VsdE11enpsZS5sZW5ndGggPiAwKSB7XHJcblx0XHRcdHRoaXMuaXNCbG9jayA9IHRydWVcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMuaXNCbG9jayA9IGZhbHNlXHJcblx0XHR9XHJcblx0XHRyZXR1cm4gKHRoaXMuaXNCbG9jayA9PSBmbGFnKVxyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSB1cGRhdGViRmlyaW5nKCk6IGJvb2xlYW4ge1xyXG5cdFx0bGV0IGZsYWcgPSB0aGlzLmJGaXJpbmdcclxuXHRcdHRoaXMuYkZpcmluZyA9IHRoaXMud2VhcG9uT2JqLmZpcmVDb21wb25lbnQuaXNGaXJpbmcoKVxyXG5cdFx0cmV0dXJuICh0aGlzLmJGaXJpbmcgPT0gZmxhZylcclxuXHR9XHJcblxyXG5cdEBDb3JlLkZ1bmN0aW9uKENvcmUuU2VydmVyKVxyXG5cdHByaXZhdGUgc2VydmVyRmlyZShzdGFydExvYzogVHlwZS5WZWN0b3IsIGRpcmVjdGlvbjogVHlwZS5WZWN0b3IpOiB2b2lkIHtcclxuXHRcdHRoaXMuY2xpZW50TXVsdGljYXN0TGF1bmNoKHN0YXJ0TG9jLCBkaXJlY3Rpb24pXHJcblx0fVxyXG5cclxuXHRAQ29yZS5GdW5jdGlvbihDb3JlLkNsaWVudCwgQ29yZS5NdWx0aWNhc3QpXHJcblx0cHJpdmF0ZSBjbGllbnRNdWx0aWNhc3RMYXVuY2goc3RhcnRMb2M6IFR5cGUuVmVjdG9yLCBkaXJlY3Rpb246IFR5cGUuVmVjdG9yKTogdm9pZCB7XHJcblx0XHRpZiAodGhpcy53ZWFwb25PYmouZ2V0Q3VycmVudE93bmVyKCkgPT0gdGhpcy5jaGFyYSkge1xyXG5cdFx0XHRyZXR1cm5cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGlmICh0aGlzLmFtbW9BcnJheS5sZW5ndGggPiB0aGlzLndlYXBvbk9iai5maXJlQ29tcG9uZW50LmN1cnJlbnRDbGlwU2l6ZSkge1xyXG5cdFx0XHRcdGxldCBkaXNjYXJkQW1tbyA9IHRoaXMuYW1tb0FycmF5LnNoaWZ0KClcclxuXHRcdFx0XHRkaXNjYXJkQW1tby5kZXN0cm95KClcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLmFtbW9BcnJheS5wdXNoKG5ldyBBbW1vKG51bGwsIHRoaXMuYW1tb1Bvb2wsIHN0YXJ0TG9jLCBkaXJlY3Rpb24sIHRoaXMuY29uZmlnLnNob290UmFuZ2UsIHRoaXMuY29uZmlnLmFtbW9TcGVlZCwgdGhpcy5jb25maWcuZ3Jhdml0eVNjYWxlLCAwKSlcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qIFx1NUJBMlx1NjIzN1x1N0FFRlx1N0VEM1x1Njc1Rlx1NUYwMFx1NzA2Qlx1NTZERVx1OEMwMyAqL1xyXG5cdHByaXZhdGUgb25DbGllbnRFbmRGaXJlKCkge1xyXG5cclxuXHR9XHJcblxyXG5cdC8qIFx1NUJBMlx1NjIzN1x1N0FFRlx1NUYwMFx1NTlDQlx1NjM2Mlx1NUYzOVx1NTZERVx1OEMwMyAqL1xyXG5cdHByaXZhdGUgb25DbGllbnRTdGFydFJlbG9hZCgpIHtcclxuXHRcdHRoaXMucmVsb2FkU291bmQucGxheSgpXHJcblx0fVxyXG5cclxuXHQvKiBcdTVCQTJcdTYyMzdcdTdBRUZcdTdFRDNcdTY3NUZcdTYzNjJcdTVGMzlcdTU2REVcdThDMDMgKi9cclxuXHRwcml2YXRlIG9uQ2xpZW50RW5kUmVsb2FkKCkge1xyXG5cdFx0dGhpcy5yZWxvYWRTb3VuZC5zdG9wKClcclxuXHR9XHJcblxyXG5cdC8qIFx1NUJBMlx1NjIzN1x1N0FFRlx1NUYwMFx1NTlDQlx1NEUwQVx1ODE5Qlx1NTZERVx1OEMwMyAqL1xyXG5cdHByaXZhdGUgb25DbGllbnRTdGFydExvYWQoKSB7XHJcblx0XHR0aGlzLmxvYWRTb3VuZC5wbGF5KClcclxuXHR9XHJcblxyXG5cdC8qIFx1NUJBMlx1NjIzN1x1N0FFRlx1N0VEM1x1Njc1Rlx1NEUwQVx1ODE5Qlx1NTZERVx1OEMwMyAqL1xyXG5cdHByaXZhdGUgb25DbGllbnRFbmRMb2FkKCkge1xyXG5cdFx0dGhpcy5sb2FkU291bmQuc3RvcCgpXHJcblx0fVxyXG5cclxuXHQvKiBcdTVCQTJcdTYyMzdcdTdBRUZcdTVGMDBcdTU5Q0JcdTc3ODRcdTUxQzZcdTU2REVcdThDMDMgKi9cclxuXHRwcml2YXRlIG9uQ2xpZW50U3RhcnRBaW0oKSB7XHJcblx0fVxyXG5cclxuXHQvKiBcdTVCQTJcdTYyMzdcdTdBRUZcdTdFRDNcdTY3NUZcdTc3ODRcdTUxQzZcdTU2REVcdThDMDMgKi9cclxuXHRwcml2YXRlIG9uQ2xpZW50RW5kQWltKCkge1xyXG5cdH1cclxuXHJcblx0LyogXHU1QkEyXHU2MjM3XHU3QUVGXHU1RjAwXHU1OUNCXHU1NDBFXHU1NzUwXHU1MjlCXHU1NkRFXHU4QzAzICovXHJcblx0cHJpdmF0ZSBvbkNsaWVudFN0YXJ0UmVjb2lsKCkge1xyXG5cclxuXHR9XHJcblxyXG5cdC8qIFx1NUJBMlx1NjIzN1x1N0FFRlx1Nzc4NFx1NTFDNlx1N0NCRVx1NUVBNlx1NTNEOFx1NTMxNlx1NTZERVx1OEMwMyAqL1xyXG5cdHByaXZhdGUgb25DbGllbnRDdXJyZW50RGlzcGVyc2lvbkNoYW5nZWQoKSB7XHJcblx0XHRpZiAodGhpcy53ZWFwb25VSSkge1xyXG5cdFx0XHR0aGlzLndlYXBvblVJLmNoYW5nZUNyb3NzKHRoaXMud2VhcG9uT2JqLmFjY3VyYWN5T2ZGaXJlQ29tcG9uZW50LmdldEN1cnJlbnREaXNwZXJzaW9uSGFsZkFuZ2xlKCkgKiAxMClcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8vIFx1ODlDNlx1ODlEMlx1NjUzRVx1NTkyN1xyXG5cdHByaXZhdGUgem9vbUluKCkge1xyXG5cdFx0aWYgKHRoaXMuY2FtZXJhID09IG51bGwpIHJldHVyblxyXG5cdFx0Y29uc29sZS5lcnJvcihcInpvb21pblwiKVxyXG5cdFx0dGhpcy5pc0FpbW1pbmcgPSB0cnVlXHJcblxyXG5cdH1cclxuXHJcblx0Ly8gXHU4OUM2XHU4OUQyXHU3RjI5XHU1QzBGXHJcblx0cHJpdmF0ZSB6b29tT3V0KCkge1xyXG5cdFx0aWYgKHRoaXMuY2FtZXJhID09IG51bGwpIHJldHVyblxyXG5cdFx0Y29uc29sZS5lcnJvcihcInpvb21PdXRcIilcclxuXHRcdHRoaXMuaXNBaW1taW5nID0gZmFsc2VcclxuXHR9XHJcblxyXG5cdC8qIFx1NjQ0NFx1NTBDRlx1NjczQXVwZGF0ZSAqL1xyXG5cdHByaXZhdGUgY2FtZXJhVXBkYXRlKGR0OiBudW1iZXIpIHtcclxuXHRcdGlmICghdGhpcy5pc1pvb21pbmcpIHJldHVyblxyXG5cdFx0aWYgKHRoaXMuaXNBaW1taW5nKSB7XHJcblx0XHRcdHRoaXMuY2FtZXJhLmNhbWVyYUZPViAtPSBkdCAqIHRoaXMuY29uZmlnLmFpbVNwZWVkXHJcblx0XHRcdGlmICh0aGlzLmNhbWVyYS5jYW1lcmFGT1YgPCB0aGlzLmNvbmZpZy5haW1DYW1lcmFGb3YpIHtcclxuXHRcdFx0XHR0aGlzLmNhbWVyYS5jYW1lcmFGT1YgPSB0aGlzLmNvbmZpZy5haW1DYW1lcmFGb3ZcclxuXHRcdFx0XHR0aGlzLmlzWm9vbWluZyA9IGZhbHNlXHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMuY2FtZXJhLmNhbWVyYUZPViArPSBkdCAqIHRoaXMuY29uZmlnLmFpbVNwZWVkXHJcblx0XHRcdGlmICh0aGlzLmNhbWVyYS5jYW1lcmFGT1YgPiB0aGlzLmNvbmZpZy5lcXVpcG1lbnRDYW1lcmFGb3YpIHtcclxuXHRcdFx0XHR0aGlzLmNhbWVyYS5jYW1lcmFGT1YgPSB0aGlzLmNvbmZpZy5lcXVpcG1lbnRDYW1lcmFGb3ZcclxuXHRcdFx0XHR0aGlzLmlzWm9vbWluZyA9IGZhbHNlXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qIFx1ODlFM1x1Njc5MFx1OEQ0NFx1NkU5MElEXHU1MjE3XHU4ODY4ICovXHJcblx0cHJpdmF0ZSByZXNvbHZlU3RyaW5nKGFzc2V0SWRzOiBzdHJpbmcpOiBzdHJpbmdbXSB7XHJcblx0XHRsZXQgYXNzZXRJZEFycmF5OiBzdHJpbmdbXSA9IG5ldyBBcnJheTxzdHJpbmc+KClcclxuXHRcdGxldCBhc3NldElkOiBzdHJpbmcgPSBcIlwiXHJcblx0XHRsZXQgcyA9IGFzc2V0SWRzLnNwbGl0KFwiXCIpXHJcblx0XHRmb3IgKGxldCBhIG9mIHMpIHtcclxuXHRcdFx0aWYgKGEgPT0gXCIsXCIpIHtcclxuXHRcdFx0XHRhc3NldElkQXJyYXkucHVzaChhc3NldElkKVxyXG5cdFx0XHRcdGFzc2V0SWQgPSBcIlwiXHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0YXNzZXRJZCArPSBhXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGlmIChhc3NldElkKSB7XHJcblx0XHRcdGFzc2V0SWRBcnJheS5wdXNoKGFzc2V0SWQpXHJcblx0XHR9XHJcblx0XHRyZXR1cm4gYXNzZXRJZEFycmF5XHJcblx0fVxyXG5cclxufSIsICJcdUZFRkZpbXBvcnQgV2VhcG9uVUlfR2VuZXJhdGUgZnJvbSBcIi4uL3VpLWdlbmVyYXRlL1dlYXBvblVJX2dlbmVyYXRlXCI7XHJcbmltcG9ydCBXZWFwb25Ecml2ZXIgZnJvbSBcIi4vV2VhcG9uQmFzZUNsc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2VhcG9uVUkgZXh0ZW5kcyBXZWFwb25VSV9HZW5lcmF0ZXtcclxuICAgIGN1cldlYXBvbjogV2VhcG9uRHJpdmVyID0gbnVsbDtcclxuXHJcbiAgICB1cFBvc2l0aW9uOiBUeXBlLlZlY3RvcjIgPSBUeXBlLlZlY3RvcjIuemVybztcclxuICAgIGRvd25Qb3NpdGlvbjogVHlwZS5WZWN0b3IyID0gVHlwZS5WZWN0b3IyLnplcm87XHJcbiAgICBsZWZ0UG9zaXRpb246IFR5cGUuVmVjdG9yMiA9IFR5cGUuVmVjdG9yMi56ZXJvO1xyXG4gICAgcmlnaHRQb3NpdGlvbjogVHlwZS5WZWN0b3IyID0gVHlwZS5WZWN0b3IyLnplcm87XHJcblxyXG4gICAgdXBDdXJQb3NpdGlvbjogVHlwZS5WZWN0b3IyID0gVHlwZS5WZWN0b3IyLnplcm87XHJcbiAgICBkb3duQ3VyUG9zaXRpb246IFR5cGUuVmVjdG9yMiA9IFR5cGUuVmVjdG9yMi56ZXJvO1xyXG4gICAgbGVmdEN1clBvc2l0aW9uOiBUeXBlLlZlY3RvcjIgPSBUeXBlLlZlY3RvcjIuemVybztcclxuICAgIHJpZ2h0Q3VyUG9zaXRpb246IFR5cGUuVmVjdG9yMiA9IFR5cGUuVmVjdG9yMi56ZXJvO1xyXG5cclxuICAgIHByb3RlY3RlZCBvblN0YXJ0KCkge1xyXG5cclxuICAgICAgICB0aGlzLnJpZ2h0X2ZpcmUub25Kb3lTdGlja0Rvd24uYWRkKCgpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcInJpZ2h0X2ZpcmUgb25Kb3lTdGlja0Rvd25cIik7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5jdXJXZWFwb24pIHJldHVybjtcclxuICAgICAgICAgICAgdGhpcy5jdXJXZWFwb24uc3RhcnRGaXJlKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMucmlnaHRfZmlyZS5vbkpveVN0aWNrVXAuYWRkKCgpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcInJpZ2h0X2ZpcmUgb25Kb3lTdGlja1VwXCIpO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuY3VyV2VhcG9uKSByZXR1cm47XHJcbiAgICAgICAgICAgIHRoaXMuY3VyV2VhcG9uLnN0b3BGaXJlKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMubGVmdF9maXJlLm9uUHJlc3NlZC5hZGQoKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwibGVmdF9maXJlIG9uUHJlc3NlZFwiKTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmN1cldlYXBvbikgcmV0dXJuO1xyXG4gICAgICAgICAgICB0aGlzLmN1cldlYXBvbi5zdGFydEZpcmUoKTtcclxuICAgICAgICB9KTtcclxuIFxyXG4gICAgICAgIHRoaXMubGVmdF9maXJlLm9uUmVsZWFzZWQuYWRkKCgpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcImxlZnRfZmlyZSBvblJlbGVhc2VkXCIpO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuY3VyV2VhcG9uKSByZXR1cm47XHJcbiAgICAgICAgICAgIHRoaXMuY3VyV2VhcG9uLnN0b3BGaXJlKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMucmVsb2FkLm9uQ2xpY2tlZC5hZGQoKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwicmVsb2FkIG9uQ2xpY2tlZFwiKTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmN1cldlYXBvbikgcmV0dXJuO1xyXG4gICAgICAgICAgICB0aGlzLmN1cldlYXBvbi5zdGFydFJlbG9hZCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmFpbS5vbkNsaWNrZWQuYWRkKCgpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcImFpbSBvbkNsaWNrZWRcIik7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5jdXJXZWFwb24pIHJldHVybjtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY3VyV2VhcG9uLmlzQWltbWluZykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJXZWFwb24uc3RvcEFpbSgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJXZWFwb24uc3RhcnRBaW0oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmNyb3VjaC5vbkNsaWNrZWQuYWRkKCgpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcImNyb3VjaCBvbkNsaWNrZWRcIik7XHJcbiAgICAgICAgICAgIGxldCBwbGF5ZXIgPSBHYW1lcGxheS5nZXRDdXJyZW50UGxheWVyKCk7XHJcbiAgICAgICAgICAgIGlmIChwbGF5ZXIpIHtcclxuICAgICAgICAgICAgICAgIGlmIChwbGF5ZXIuY2hhcmFjdGVyLmlzQ3JvdWNoaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyLmNoYXJhY3Rlci5jcm91Y2goZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBwbGF5ZXIuY2hhcmFjdGVyLmNyb3VjaCh0cnVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5qdW1wLm9uQ2xpY2tlZC5hZGQoKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwianVtcCBvbkNsaWNrZWRcIik7XHJcbiAgICAgICAgICAgIGxldCBwbGF5ZXIgPSBHYW1lcGxheS5nZXRDdXJyZW50UGxheWVyKCk7XHJcbiAgICAgICAgICAgIGlmIChwbGF5ZXIpIHtcclxuICAgICAgICAgICAgICAgIHBsYXllci5jaGFyYWN0ZXIuanVtcCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIEV2ZW50cy5hZGRMb2NhbExpc3RlbmVyKFwiSG90V2VhcG9uLVVuZXF1aXBlZFwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmN1cldlYXBvbiAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cldlYXBvbi51bkVxdWlwKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cldlYXBvbiA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvblNob3cod2VhcG9uOiBXZWFwb25Ecml2ZXIsIGNyb3NzVmFsdWU6IG51bWJlciwgaWNvbklkOiBzdHJpbmcsIHdlYXBvbk5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJzaG93XCIpO1xyXG4gICAgICAgIHRoaXMuY3VyV2VhcG9uID0gd2VhcG9uO1xyXG4gICAgICAgIHRoaXMuaWNvbi5pbWFnZUd1aWQgPSBpY29uSWQ7XHJcbiAgICAgICAgdGhpcy5uYW1lLnRleHQgPSB3ZWFwb25OYW1lO1xyXG4gICAgICAgIHRoaXMudXBQb3NpdGlvbiA9IHRoaXMudXBQb3NpdGlvbi5zZXQodGhpcy51cC5wb3NpdGlvbik7XHJcbiAgICAgICAgdGhpcy5kb3duUG9zaXRpb24gPSB0aGlzLmRvd25Qb3NpdGlvbi5zZXQodGhpcy5kb3duLnBvc2l0aW9uKTtcclxuICAgICAgICB0aGlzLmxlZnRQb3NpdGlvbiA9IHRoaXMubGVmdFBvc2l0aW9uLnNldCh0aGlzLmxlZnQucG9zaXRpb24pO1xyXG4gICAgICAgIHRoaXMucmlnaHRQb3NpdGlvbiA9IHRoaXMucmlnaHRQb3NpdGlvbi5zZXQodGhpcy5yaWdodC5wb3NpdGlvbik7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VDcm9zcyhjcm9zc1ZhbHVlICogMTApO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkhpZGUoKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcImhpZGVcIik7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VDcm9zcygwKTtcclxuICAgIH1cclxuXHJcbiAgICBjaGFuZ2VCdWxsZXQoYnVsbGV0OiBudW1iZXIsIGFtbW86IG51bWJlcikge1xyXG4gICAgICAgIGlmIChhbW1vID09IC0xKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYnVsbGV0LnRleHQgPSBgJHtidWxsZXR9IC8gTkFOYDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuYnVsbGV0LnRleHQgPSBgJHtidWxsZXR9IC8gJHthbW1vfWA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNoYW5nZUNyb3NzKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnVwLnBvc2l0aW9uID0gdGhpcy51cEN1clBvc2l0aW9uLnNldCh0aGlzLnVwUG9zaXRpb24ueCwgdGhpcy51cFBvc2l0aW9uLnkgLSB2YWx1ZSk7XHJcbiAgICAgICAgdGhpcy5kb3duLnBvc2l0aW9uID0gdGhpcy5kb3duQ3VyUG9zaXRpb24uc2V0KHRoaXMuZG93blBvc2l0aW9uLngsIHRoaXMuZG93blBvc2l0aW9uLnkgKyB2YWx1ZSk7XHJcbiAgICAgICAgdGhpcy5sZWZ0LnBvc2l0aW9uID0gdGhpcy5sZWZ0Q3VyUG9zaXRpb24uc2V0KHRoaXMubGVmdFBvc2l0aW9uLnggLSB2YWx1ZSwgdGhpcy5sZWZ0UG9zaXRpb24ueSk7XHJcbiAgICAgICAgdGhpcy5yaWdodC5wb3NpdGlvbiA9IHRoaXMucmlnaHRDdXJQb3NpdGlvbi5zZXQodGhpcy5yaWdodFBvc2l0aW9uLnggKyB2YWx1ZSwgdGhpcy5yaWdodFBvc2l0aW9uLnkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRUaW1lVGV4dChyZXN0VGltZTogbnVtYmVyLCBrZWVwVGltZTogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHJlc3RUaW1lIDw9IDApIHtcclxuICAgICAgICAgICAgdGhpcy5tS2VlcFRpbWVDYW52YXMudmlzaWJpbGl0eSA9IFVJLlNsYXRlVmlzaWJpbGl0eS5Db2xsYXBzZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm1LZWVwVGltZUNhbnZhcy52aXNpYmlsaXR5ID0gVUkuU2xhdGVWaXNpYmlsaXR5LlNlbGZIaXRUZXN0SW52aXNpYmxlO1xyXG4gICAgICAgICAgICBsZXQgcGVyY2VudCA9IHJlc3RUaW1lIC8ga2VlcFRpbWU7XHJcbiAgICAgICAgICAgIHRoaXMua2VlcFRpbWVCYXIucGVyY2VudCA9IHBlcmNlbnQ7XHJcbiAgICAgICAgICAgIHRoaXMua2VlcFRpbWVUeHQudGV4dCA9IGAke3Jlc3RUaW1lLnRvRml4ZWQoMSl9c2BcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFJlbG9hZEJ0bihlbmFibGU6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLnJlbG9hZC52aXNpYmlsaXR5ID0gZW5hYmxlID8gVUkuU2xhdGVWaXNpYmlsaXR5LlZpc2libGUgOiBVSS5TbGF0ZVZpc2liaWxpdHkuQ29sbGFwc2VkO1xyXG4gICAgfVxyXG59IiwgIlx1RkVGRlxyXG4vKipcclxuICogQVVUTyBHRU5FUkFURSBCWSBVSSBFRElUT1IuXHJcbiAqIFdBUk5JTkc6IERPIE5PVCBNT0RJRlkgVEhJUyBGSUxFLE1BWSBDQVVTRSBDT0RFIExPU1QuXHJcbiAqIEFVVEhPUjogXHU2MjY3XHU3QjE0XHU3RUNGXHU1RTc0XHJcbiAqIFVJOiBVSS9XZWFwb25VSS51aVxyXG4gKiBUSU1FOiAyMDIzLjA4LjI4LTEyLjIxLjU3XHJcbiovXHJcblxyXG5cclxuXHJcbkBVSS5VSUNhbGxPbmx5KCdVSS9XZWFwb25VSS51aScpXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdlYXBvblVJX0dlbmVyYXRlIGV4dGVuZHMgVUkuVUlCZWhhdmlvciB7XHJcblx0QFVJLlVJTWFya1BhdGgoJ1Jvb3RDYW52YXMvcG9pbnQnKVxyXG4gICAgcHVibGljIHBvaW50OiBVSS5JbWFnZT11bmRlZmluZWQ7XHJcbiAgICBAVUkuVUlNYXJrUGF0aCgnUm9vdENhbnZhcy91cCcpXHJcbiAgICBwdWJsaWMgdXA6IFVJLkltYWdlPXVuZGVmaW5lZDtcclxuICAgIEBVSS5VSU1hcmtQYXRoKCdSb290Q2FudmFzL2Rvd24nKVxyXG4gICAgcHVibGljIGRvd246IFVJLkltYWdlPXVuZGVmaW5lZDtcclxuICAgIEBVSS5VSU1hcmtQYXRoKCdSb290Q2FudmFzL2xlZnQnKVxyXG4gICAgcHVibGljIGxlZnQ6IFVJLkltYWdlPXVuZGVmaW5lZDtcclxuICAgIEBVSS5VSU1hcmtQYXRoKCdSb290Q2FudmFzL3JpZ2h0JylcclxuICAgIHB1YmxpYyByaWdodDogVUkuSW1hZ2U9dW5kZWZpbmVkO1xyXG4gICAgQFVJLlVJTWFya1BhdGgoJ1Jvb3RDYW52YXMvbW92ZScpXHJcbiAgICBwdWJsaWMgbW92ZTogVUkuVmlydHVhbEpveXN0aWNrUGFuZWw9dW5kZWZpbmVkO1xyXG4gICAgQFVJLlVJTWFya1BhdGgoJ1Jvb3RDYW52YXMvcmlnaHRfZmlyZScpXHJcbiAgICBwdWJsaWMgcmlnaHRfZmlyZTogVUkuVmlydHVhbEpveXN0aWNrUGFuZWw9dW5kZWZpbmVkO1xyXG4gICAgQFVJLlVJTWFya1BhdGgoJ1Jvb3RDYW52YXMvcmVsb2FkJylcclxuICAgIHB1YmxpYyByZWxvYWQ6IFVJLkJ1dHRvbj11bmRlZmluZWQ7XHJcbiAgICBAVUkuVUlNYXJrUGF0aCgnUm9vdENhbnZhcy9jcm91Y2gnKVxyXG4gICAgcHVibGljIGNyb3VjaDogVUkuQnV0dG9uPXVuZGVmaW5lZDtcclxuICAgIEBVSS5VSU1hcmtQYXRoKCdSb290Q2FudmFzL2p1bXAnKVxyXG4gICAgcHVibGljIGp1bXA6IFVJLkJ1dHRvbj11bmRlZmluZWQ7XHJcbiAgICBAVUkuVUlNYXJrUGF0aCgnUm9vdENhbnZhcy9haW0nKVxyXG4gICAgcHVibGljIGFpbTogVUkuQnV0dG9uPXVuZGVmaW5lZDtcclxuICAgIEBVSS5VSU1hcmtQYXRoKCdSb290Q2FudmFzL2xlZnRfZmlyZScpXHJcbiAgICBwdWJsaWMgbGVmdF9maXJlOiBVSS5CdXR0b249dW5kZWZpbmVkO1xyXG4gICAgQFVJLlVJTWFya1BhdGgoJ1Jvb3RDYW52YXMvaWNvbicpXHJcbiAgICBwdWJsaWMgaWNvbjogVUkuSW1hZ2U9dW5kZWZpbmVkO1xyXG4gICAgQFVJLlVJTWFya1BhdGgoJ1Jvb3RDYW52YXMvbmFtZScpXHJcbiAgICBwdWJsaWMgbmFtZTogVUkuVGV4dEJsb2NrPXVuZGVmaW5lZDtcclxuICAgIEBVSS5VSU1hcmtQYXRoKCdSb290Q2FudmFzL2J1bGxldCcpXHJcbiAgICBwdWJsaWMgYnVsbGV0OiBVSS5UZXh0QmxvY2s9dW5kZWZpbmVkO1xyXG4gICAgQFVJLlVJTWFya1BhdGgoJ1Jvb3RDYW52YXMvbUtlZXBUaW1lQ2FudmFzJylcclxuICAgIHB1YmxpYyBtS2VlcFRpbWVDYW52YXM6IFVJLkNhbnZhcz11bmRlZmluZWQ7XHJcbiAgICBAVUkuVUlNYXJrUGF0aCgnUm9vdENhbnZhcy9tS2VlcFRpbWVDYW52YXMva2VlcFRpbWVCYXInKVxyXG4gICAgcHVibGljIGtlZXBUaW1lQmFyOiBVSS5Qcm9ncmVzc0Jhcj11bmRlZmluZWQ7XHJcbiAgICBAVUkuVUlNYXJrUGF0aCgnUm9vdENhbnZhcy9tS2VlcFRpbWVDYW52YXMva2VlcFRpbWVUeHQnKVxyXG4gICAgcHVibGljIGtlZXBUaW1lVHh0OiBVSS5UZXh0QmxvY2s9dW5kZWZpbmVkO1xyXG4gICAgXHJcblxyXG4gXHJcblx0LyoqXHJcblx0KiBvblN0YXJ0IFx1NEU0Qlx1NTI0RFx1ODlFNlx1NTNEMVx1NEUwMFx1NkIyMVxyXG5cdCovXHJcblx0cHJvdGVjdGVkIG9uQXdha2UoKSB7XHJcblx0fVxyXG5cdCBcclxufVxyXG4gIiwgIlxyXG5cclxuaW1wb3J0IHsgUHJlZmFiRXZlbnRNb2R1bGVDLCBQcmVmYWJFdmVudE1vZHVsZURhdGEsIFByZWZhYkV2ZW50TW9kdWxlUyB9IGZyb20gXCIuL1ByZWZhYkV2ZW50TW9kdWxlXCJcclxuXHJcbmV4cG9ydCBuYW1lc3BhY2UgUHJlZmFiRXZlbnQge1xyXG5cclxuICAgIC8qKlxyXG4gKiBcdTZBMjFcdTY3N0ZcdTU3Q0JcdTcwQjlcdTZDRThcdTg5RTMoXHU0RUM1XHU1QkEyXHU2MjM3XHU3QUVGXHU3NTFGXHU2NTQ4KVxyXG4gKiBAcGFyYW0gcmVwb3J0SWQgXHU2QTIxXHU2NzdGaWRcclxuICogQHJldHVybnMgXHJcbiAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIFByZWZhYlJlcG9ydChyZXBvcnRJZDogbnVtYmVyID0gbnVsbCkge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0OiBhbnksIHByb3BlcnR5S2V5OiBzdHJpbmcsIGRlc2NyaXB0b3I6IFByb3BlcnR5RGVzY3JpcHRvcikge1xyXG4gICAgICAgICAgICBjb25zdCBtZXRob2QgPSBkZXNjcmlwdG9yLnZhbHVlXHJcbiAgICAgICAgICAgIGRlc2NyaXB0b3IudmFsdWUgPSBmdW5jdGlvbiAoLi4uYXJnczogYW55W10pIHtcclxuICAgICAgICAgICAgICAgIGlmIChTeXN0ZW1VdGlsLmlzQ2xpZW50KCkgJiYgcmVwb3J0SWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlx1NkEyMVx1Njc3RlwiLCB0YXJnZXQuY29uc3RydWN0b3IubmFtZSwgXCJcdTU3Q0JcdTcwQjlcIiwgcmVwb3J0SWQpXHJcbiAgICAgICAgICAgICAgICAgICAgU2VydmljZS5Sb29tU2VydmljZS5nZXRJbnN0YW5jZSgpLnJlcG9ydExvZ0luZm8oXCJ0c19hY3Rpb25fZmlyc3Rkb1wiLCBcIlx1NkEyMVx1Njc3Rlx1NTdDQlx1NzBCOVwiLCBKU09OLnN0cmluZ2lmeSh7IHJlY29yZDogXCJUZW1wbGF0ZVByZWZhYlwiLCBsaWZldGltZTogcmVwb3J0SWQgfSkpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBtZXRob2QuYXBwbHkodGhpcywgYXJncylcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFx1N0Y1MVx1N0VEQ1x1NEU4Qlx1NEVGNmtleVxyXG4gICAgICovXHJcbiAgICBleHBvcnQgdmFyIF9vbkV2ZW50TmV0S2V5ID0gXCJQcmVmYWJFdmVudEV4TmV5S2V5XCJcclxuICAgIC8qKlxyXG4gICAgICogXHU2NzJDXHU1NzMwXHU0RThCXHU0RUY2a2V5XHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCB2YXIgX29uRXZlbnRLZXkgPSBcIlByZWZhYkV2ZW50RXhLZXlcIlxyXG5cclxuICAgIGZ1bmN0aW9uIGNhbGxSZW1vdGVGdW5jKGNsYXp6TmFtZSwgZnVuY05hbWUsIC4uLnBhcmFtcykge1xyXG4gICAgICAgIGlmICghUHJlZmFiRXZlbnRbY2xhenpOYW1lXSB8fCAhUHJlZmFiRXZlbnRbY2xhenpOYW1lXVtmdW5jTmFtZV0pIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlx1NjVFMFx1NjU0OFx1NTM0Rlx1OEJBRSBcIiArIGNsYXp6TmFtZSArIFwiIDogXCIgKyBmdW5jTmFtZSlcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhbGxGdW5jKGNsYXp6TmFtZSwgZnVuY05hbWUsIC4uLnBhcmFtcylcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhZGRFdmVudExpc3RlbmVycygpIHtcclxuICAgICAgICBpZiAoVXRpbC5TeXN0ZW1VdGlsLmlzU2VydmVyKCkpIHtcclxuICAgICAgICAgICAgRXZlbnRzLmFkZENsaWVudExpc3RlbmVyKF9vbkV2ZW50TmV0S2V5LCAocGxheWVyLCBjbGF6ek5hbWUsIGZ1bmNOYW1lLCAuLi5wYXJhbXMpID0+IHtcclxuICAgICAgICAgICAgICAgIGNhbGxSZW1vdGVGdW5jKGNsYXp6TmFtZSwgZnVuY05hbWUsIC4uLnBhcmFtcylcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKFV0aWwuU3lzdGVtVXRpbC5pc0NsaWVudCgpKSB7XHJcbiAgICAgICAgICAgIEV2ZW50cy5hZGRTZXJ2ZXJMaXN0ZW5lcihfb25FdmVudE5ldEtleSwgKGNsYXp6TmFtZTogc3RyaW5nLCBmdW5jTmFtZTogc3RyaW5nLCAuLi5wYXJhbXMpID0+IHtcclxuICAgICAgICAgICAgICAgIGNhbGxMb2NhbEZ1bmMoY2xhenpOYW1lLCBmdW5jTmFtZSwgLi4ucGFyYW1zKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpbml0RXZlbnQoKSB7XHJcbiAgICAgICAgYWRkRXZlbnRMaXN0ZW5lcnMoKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHU1NkRFXHU4QzAzXHU1QkEyXHU2MjM3XHU3QUVGXHU0RThCXHU0RUY2XHJcbiAgICAgKiBAcGFyYW0gY2xhenpOYW1lIFxyXG4gICAgICogQHBhcmFtIGZ1bmNOYW1lIFxyXG4gICAgICogQHBhcmFtIHBhcmFtcyBcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gY2FsbExvY2FsRnVuYyhjbGF6ek5hbWU6IHN0cmluZywgZnVuY05hbWU6IHN0cmluZywgLi4ucGFyYW1zOiBhbnlbXSkge1xyXG4gICAgICAgIEV2ZW50cy5kaXNwYXRjaExvY2FsKF9vbkV2ZW50S2V5ICsgXCI6XCIgKyBjbGF6ek5hbWUgKyBcIjpcIiArIGZ1bmNOYW1lLCAuLi5wYXJhbXMpXHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHU1NkRFXHU4QzAzXHU0RThCXHU0RUY2XHJcbiAgICAgKiBAcGFyYW0gY2xhenpOYW1lIFxyXG4gICAgICogQHBhcmFtIGZ1bmNOYW1lIFxyXG4gICAgICogQHBhcmFtIHBhcmFtcyBcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gY2FsbEZ1bmMoY2xhenpOYW1lOiBzdHJpbmcsIGZ1bmNOYW1lOiBzdHJpbmcsIC4uLnBhcmFtczogYW55W10pIHtcclxuXHJcbiAgICAgICAgaWYgKFV0aWwuU3lzdGVtVXRpbC5pc0NsaWVudCgpKSB7XHJcbiAgICAgICAgICAgIC8qKiBcdTkwMEZcdTRGMjBcdTUyMzBcdTY3MERcdTUyQTFcdTdBRUZcdTUzQkIgXHU2MjY3XHU4ODRDICovXHJcbiAgICAgICAgICAgIEV2ZW50cy5kaXNwYXRjaFRvU2VydmVyKF9vbkV2ZW50TmV0S2V5LCBjbGF6ek5hbWUsIGZ1bmNOYW1lLCAuLi5wYXJhbXMpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChVdGlsLlN5c3RlbVV0aWwuaXNTZXJ2ZXIoKSkge1xyXG5cclxuICAgICAgICAgICAgLyoqIFx1OEMwM1x1NzUyOFx1NTFGRFx1NjU3MCBcdTVGOTdcdTUyMzBcdTdFRDNcdTY3OUMgXHU1NzI4XHU1RTdGXHU2NEFEXHU1MUZBXHU1M0JCICovXHJcbiAgICAgICAgICAgIGlmIChNb2R1bGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TW9kdWxlKFByZWZhYkV2ZW50TW9kdWxlUylbZnVuY05hbWVdKSB7XHJcbiAgICAgICAgICAgICAgICBNb2R1bGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TW9kdWxlKFByZWZhYkV2ZW50TW9kdWxlUylbZnVuY05hbWVdKGNsYXp6TmFtZSwgLi4ucGFyYW1zKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgTW9kdWxlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1vZHVsZShQcmVmYWJFdmVudE1vZHVsZVMpLm5vdGlmeShjbGF6ek5hbWUsIGZ1bmNOYW1lLCAuLi5wYXJhbXMpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHU1NkRFXHU4QzAzXHU0RThCXHU0RUY2XHJcbiAgICAgKiBAcGFyYW0gY2xhenpOYW1lIFxyXG4gICAgICogQHBhcmFtIGZ1bmNOYW1lIFxyXG4gICAgICogQHBhcmFtIHBhcmFtcyBcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gY2FsbEZ1bmNSZXMoY2xhenpOYW1lOiBzdHJpbmcsIGZ1bmNOYW1lOiBzdHJpbmcsIC4uLnBhcmFtczogYW55W10pOiBhbnkge1xyXG5cclxuXHJcbiAgICAgICAgaWYgKFV0aWwuU3lzdGVtVXRpbC5pc0NsaWVudCgpKSB7XHJcbiAgICAgICAgICAgIC8qKiBcdTkwMEZcdTRGMjBcdTUyMzBcdTY3MERcdTUyQTFcdTdBRUZcdTUzQkIgXHU2MjY3XHU4ODRDICovXHJcblxyXG4gICAgICAgICAgICBpZiAoIU1vZHVsZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNb2R1bGUoUHJlZmFiRXZlbnRNb2R1bGVDKVtmdW5jTmFtZV0pIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJmaW5kIGVycm9yIFByZWZhYkV2ZW50TW9kdWxlQzogXCIgKyBmdW5jTmFtZSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBNb2R1bGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TW9kdWxlKFByZWZhYkV2ZW50TW9kdWxlQylbZnVuY05hbWVdKGNsYXp6TmFtZSwgLi4ucGFyYW1zKVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoVXRpbC5TeXN0ZW1VdGlsLmlzU2VydmVyKCkpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICghTW9kdWxlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1vZHVsZShQcmVmYWJFdmVudE1vZHVsZVMpW2Z1bmNOYW1lXSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcImZpbmQgZXJyb3IgUHJlZmFiRXZlbnRNb2R1bGVTOiBcIiArIGZ1bmNOYW1lKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGxcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLyoqIFx1OEMwM1x1NzUyOFx1NTFGRFx1NjU3MCBcdTVGOTdcdTUyMzBcdTdFRDNcdTY3OUMgXHU1NzI4XHU1RTdGXHU2NEFEXHU1MUZBXHU1M0JCICovXHJcbiAgICAgICAgICAgIHJldHVybiBNb2R1bGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TW9kdWxlKFByZWZhYkV2ZW50TW9kdWxlUylbZnVuY05hbWVdKGNsYXp6TmFtZSwgLi4ucGFyYW1zKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcdTc2RDFcdTU0MkNcdTRFOEJcdTRFRjZcclxuICAgICAqIEBwYXJhbSBjbGF6ek5hbWUgXHJcbiAgICAgKiBAcGFyYW0gZnVuY05hbWUgXHJcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sgXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIG9uRnVuYyhjbGF6ek5hbWU6IHN0cmluZywgZnVuY05hbWU6IHN0cmluZywgY2FsbGJhY2s6IGFueSk6IEV2ZW50cy5FdmVudExpc3RlbmVyIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcInJlZ2lzdGVyIDogXCIgKyBfb25FdmVudEtleSArIFwiOlwiICsgY2xhenpOYW1lICsgXCI6XCIgKyBmdW5jTmFtZSlcclxuICAgICAgICByZXR1cm4gRXZlbnRzLmFkZExvY2FsTGlzdGVuZXIoX29uRXZlbnRLZXkgKyBcIjpcIiArIGNsYXp6TmFtZSArIFwiOlwiICsgZnVuY05hbWUsIGNhbGxiYWNrKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBcdTVDNUVcdTYwMjdcdTdDN0JcdTU3OEJcclxuICAgICovXHJcbiAgICBleHBvcnQgZW51bSBBdHRyVHlwZSB7XHJcblxyXG4gICAgICAgIC8qKiBcdTY3MDBcdTU5MjdcdTg4NDBcdTkxQ0YgICovXHJcbiAgICAgICAgTWF4SHAsXHJcbiAgICAgICAgLyoqIFx1NUY1M1x1NTI0REhwICovXHJcbiAgICAgICAgQ3VySHAsXHJcbiAgICAgICAgLyoqIFx1NjcwMFx1NTkyN1x1ODRERFx1OTFDRiAqL1xyXG4gICAgICAgIE1heE1wLFxyXG4gICAgICAgIC8qKiBcdTY1M0JcdTUxRkJcdTUyOUIgKi9cclxuICAgICAgICBBdHRhY2ssXHJcbiAgICAgICAgLyoqIFx1OUI1NFx1NkNENVx1NTI5QiAqL1xyXG4gICAgICAgIE1hZ2ljLFxyXG4gICAgICAgIC8qKiBcdTk2MzJcdTVGQTFcdTUyOUIgKi9cclxuICAgICAgICBEZWYsXHJcbiAgICAgICAgLyoqIFx1OUI1NFx1NkNENVx1OTYzMlx1NUZBMVx1NTI5QiAqL1xyXG4gICAgICAgIE1EZWYsXHJcbiAgICAgICAgLyoqIFx1OTAxRlx1NUVBNiAqL1xyXG4gICAgICAgIFNwZWVkLFxyXG4gICAgICAgIC8qKiBcdThERjNcdThEQzNcdTUyOUIgKi9cclxuICAgICAgICBKdW1wLFxyXG4gICAgICAgIC8qKiBcdTY1M0JcdTUxRkJcdTkwMUZcdTVFQTYgKi9cclxuICAgICAgICBBdHRhY2tTcGVlZCxcclxuICAgICAgICAvKiogXHU2NTNCXHU1MUZCXHU4REREXHU3OUJCICovXHJcbiAgICAgICAgQXR0YWNrRGlzdGFuY2UsXHJcbiAgICAgICAgLyoqIFx1NjYyRlx1NTQyNlx1NjYyRlx1NjVFMFx1NjU0QyAqL1xyXG4gICAgICAgIElzSW52aW5jaWJsZVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFx1NUM1RVx1NjAyN1x1NTM0Rlx1OEJBRVxyXG4gICAgICovXHJcbiAgICBleHBvcnQgY2xhc3MgUHJlZmFiRXZ0QXR0ciB7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIChcdTUzQ0NcdTdBRUYpXHU2REZCXHU1MkEwXHU1QzVFXHU2MDI3XHJcbiAgICAgICAgICogQHBhcmFtIHNlbmRlckd1aWQgXHU1M0QxXHU4RDc3XHU1QkY5XHU4QzYxR3VpZFxyXG4gICAgICAgICAqIEBwYXJhbSB0YXJnZXRHdWlkIFx1NzZFRVx1NjgwN1x1NUJGOVx1OEM2MUd1aWRcclxuICAgICAgICAgKiBAcGFyYW0gdmFsIFx1NTAzQ1xyXG4gICAgICAgICAqIEBwYXJhbSBhdHRyVHlwZSBcdTVDNUVcdTYwMjdcdTdDN0JcdTU3OEJcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHNldEF0dHJWYWwoc2VuZGVyR3VpZDogc3RyaW5nLCB0YXJnZXRHdWlkOiBzdHJpbmcsIHZhbDogbnVtYmVyLCBhdHRyVHlwZTogQXR0clR5cGUpIHtcclxuICAgICAgICAgICAgY2FsbEZ1bmModGhpcy5uYW1lLCB0aGlzLm9uU2V0QXR0clZhbC5uYW1lLCBzZW5kZXJHdWlkLCB0YXJnZXRHdWlkLCB2YWwsIGF0dHJUeXBlKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogKFx1NTNDQ1x1N0FFRilcdTc2RDFcdTU0MkNcdTVDNUVcdTYwMjdcdTY1MzlcdTUzRDhcclxuICAgICAgICAgKiBAcGFyYW0gY2FsbGJhY2sgXHU1NkRFXHU4QzAzXHJcbiAgICAgICAgICogQHJldHVybnMgXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBvblNldEF0dHJWYWwoY2FsbGJhY2s6IChzZW5kZXJHdWlkOiBzdHJpbmcsIHRhcmdldEd1aWQ6IHN0cmluZywgdmFsOiBudW1iZXIsIGF0dHJUeXBlOiBBdHRyVHlwZSkgPT4gdm9pZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vbkNoYW5nZUF0dHJWYWwoY2FsbGJhY2spXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAoXHU1M0NDXHU3QUVGKVx1NkRGQlx1NTJBMFx1NUM1RVx1NjAyN1xyXG4gICAgICAgICAqIEBwYXJhbSBzZW5kZXJHdWlkIFx1NTNEMVx1OEQ3N1x1NUJGOVx1OEM2MUd1aWRcclxuICAgICAgICAgKiBAcGFyYW0gdGFyZ2V0R3VpZCBcdTc2RUVcdTY4MDdcdTVCRjlcdThDNjFHdWlkXHJcbiAgICAgICAgICogQHBhcmFtIHZhbCBcdTUwM0NcclxuICAgICAgICAgKiBAcGFyYW0gYXR0clR5cGUgXHU1QzVFXHU2MDI3XHU3QzdCXHU1NzhCXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBhZGRBdHRyVmFsKHNlbmRlckd1aWQ6IHN0cmluZywgdGFyZ2V0R3VpZDogc3RyaW5nLCB2YWw6IG51bWJlciwgYXR0clR5cGU6IEF0dHJUeXBlKSB7XHJcbiAgICAgICAgICAgIGNhbGxGdW5jKHRoaXMubmFtZSwgdGhpcy5vbkFkZEF0dHJWYWwubmFtZSwgc2VuZGVyR3VpZCwgdGFyZ2V0R3VpZCwgdmFsLCBhdHRyVHlwZSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgb25BZGRBdHRyVmFsKGNhbGxiYWNrOiAoc2VuZGVyR3VpZDogc3RyaW5nLCB0YXJnZXRHdWlkOiBzdHJpbmcsIHZhbDogbnVtYmVyLCBhdHRyVHlwZTogQXR0clR5cGUpID0+IHZvaWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMub25DaGFuZ2VBdHRyVmFsKGNhbGxiYWNrKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogKFx1NTNDQ1x1N0FFRilcdTgzQjdcdTUzRDZcdTVDNUVcdTYwMjdcclxuICAgICAgICAgKiBAcGFyYW0gdGFyZ2V0R3VpZCBcclxuICAgICAgICAgKiBAcGFyYW0gdmFsIFxyXG4gICAgICAgICAqIEBwYXJhbSBhdHRyVHlwZSBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGdldEF0dHJWYWwodGFyZ2V0R3VpZDogc3RyaW5nLCBhdHRyVHlwZTogQXR0clR5cGUpOiBudW1iZXIge1xyXG4gICAgICAgICAgICBsZXQgcmVzID0gY2FsbEZ1bmNSZXModGhpcy5uYW1lLCB0aGlzLmdldEF0dHJWYWwubmFtZSwgdGFyZ2V0R3VpZCwgYXR0clR5cGUpXHJcbiAgICAgICAgICAgIHJldHVybiByZXNcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIChcdTUzQ0NcdTdBRUYpXHU3NkQxXHU1NDJDXHU1QzVFXHU2MDI3XHU2NTM5XHU1M0Q4XHJcbiAgICAgICAgICogQHBhcmFtIGNhbGxiYWNrIFx1NTZERVx1OEMwM1xyXG4gICAgICAgICAqIEByZXR1cm5zIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgb25DaGFuZ2VBdHRyVmFsKGNhbGxiYWNrOiAoc2VuZGVyR3VpZDogc3RyaW5nLCB0YXJnZXRHdWlkOiBzdHJpbmcsIHZhbDogbnVtYmVyLCBhdHRyVHlwZTogQXR0clR5cGUpID0+IHZvaWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG9uRnVuYyh0aGlzLm5hbWUsIHRoaXMub25DaGFuZ2VBdHRyVmFsLm5hbWUsIGNhbGxiYWNrKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcdTg4QzVcdTU5MDdcdTY5RkRcdTRGNERcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGVudW0gRXF1aXBTbG90IHtcclxuXHJcbiAgICAgICAgLyoqIFx1NkI2Nlx1NTY2OCAqL1xyXG4gICAgICAgIFdlYXBvbiA9IDEsXHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHU4OEM1XHU1OTA3XHU1MzRGXHU4QkFFXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBjbGFzcyBQcmVmYWJFdnRFcXVpcCB7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIChcdTUzQ0NcdTdBRUYpIFx1N0E3Rlx1NjIzNFx1ODhDNVx1NTkwN1xyXG4gICAgICAgICAqIEBwYXJhbSB0YXJnZXRHdWlkIFx1NUJGOVx1OEM2MUd1aWRcclxuICAgICAgICAgKiBAcGFyYW0gc2xvdCBcdTY5RkRcdTRGNERcclxuICAgICAgICAgKiBAcGFyYW0gZXF1aXBHdWlkIFx1ODhDNVx1NTkwN0d1aWRcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGVxdWlwKHRhcmdldEd1aWQ6IHN0cmluZywgc2xvdDogRXF1aXBTbG90LCBlcXVpcEd1aWQ6IHN0cmluZykge1xyXG4gICAgICAgICAgICBjYWxsRnVuYyh0aGlzLm5hbWUsIHRoaXMub25FcXVpcC5uYW1lLCB0YXJnZXRHdWlkLCBzbG90LCBlcXVpcEd1aWQpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAoXHU1M0NDXHU3QUVGKVx1NzZEMVx1NTQyQ1x1ODhDNVx1NTkwN1x1NjUzOVx1NTNEOFxyXG4gICAgICAgICAqIEBwYXJhbSBjYWxsYmFjayBcclxuICAgICAgICAgKiBAcmV0dXJucyBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgc3RhdGljIG9uRXF1aXAoY2FsbGJhY2s6ICh0YXJnZXRHdWlkOiBzdHJpbmcsIHNsb3Q6IEVxdWlwU2xvdCwgZXF1aXBHdWlkOiBzdHJpbmcpID0+IHZvaWQpOiBFdmVudHMuRXZlbnRMaXN0ZW5lciB7XHJcbiAgICAgICAgICAgIHJldHVybiBvbkZ1bmModGhpcy5uYW1lLCB0aGlzLm9uRXF1aXAubmFtZSwgY2FsbGJhY2spXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFx1NzNBOVx1NUJCNlx1NEZFMVx1NjA2Rlx1N0M3Qlx1NTc4QlxyXG4gICAgICovXHJcbiAgICBleHBvcnQgZW51bSBQbGF5ZXJJbmZvVHlwZSB7XHJcblxyXG4gICAgICAgIC8qKiBcdTU0MERcdTVCNTcgKi9cclxuICAgICAgICBOYW1lLFxyXG4gICAgICAgIC8qKiBcdTdCNDlcdTdFQTcgKi9cclxuICAgICAgICBMZXZlbCxcclxuICAgICAgICAvKiogXHU3RUNGXHU5QThDICovXHJcbiAgICAgICAgRXhwLFxyXG4gICAgICAgIC8qKiBcdTkxRDFcdTVFMDEgKi9cclxuICAgICAgICBHb2xkLFxyXG4gICAgICAgIC8qKiBcdTc5RUZcdTUyMDYgKi9cclxuICAgICAgICBTY29yZSxcclxuICAgICAgICAvKiogXHU1MTczXHU1MzYxICovXHJcbiAgICAgICAgU3RhZ2UsXHJcbiAgICAgICAgLyoqIFx1NEVCQVx1NkMxNCAqL1xyXG4gICAgICAgIFBvcHVsYXJpdHksXHJcbiAgICAgICAgLyoqIFx1NjYyRlx1NTQyNlx1NEUwRFx1NTcyOFx1NTkyN1x1NTM4NVx1NEUyRCAqL1xyXG4gICAgICAgIElzTm90SW5Mb2JieSxcclxuICAgICAgICAvKiogXHU2QjdCXHU0RUExXHU2QjIxXHU2NTcwICovXHJcbiAgICAgICAgRGVhdGhDb3VudFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHU3M0E5XHU1QkI2XHU0RkUxXHU2MDZGXHU1MzRGXHU4QkFFXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBjbGFzcyBQcmVmYWJFdnRQbGF5ZXJJbmZvIHtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogKFx1NTNDQ1x1N0FFRilcdTgzQjdcdTUzRDZcdTczQTlcdTVCQjZcdTRGRTFcdTYwNkZcclxuICAgICAgICAgKiBAcGFyYW0gdGFyZ2V0R3VpZCBcdTc2RUVcdTY4MDdcdTVCRjlcdThDNjFHdWlkXHJcbiAgICAgICAgICogQHBhcmFtIHZhbCBcdTUwM0NcclxuICAgICAgICAgKiBAcGFyYW0gaW5mb1R5cGUgXHU0RkUxXHU2MDZGXHU3QzdCXHU1NzhCXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBnZXRQbGF5ZXJJbmZvKHRhcmdldEd1aWQ6IHN0cmluZywgaW5mb1R5cGU6IFBsYXllckluZm9UeXBlIHwgc3RyaW5nKTogYW55IHtcclxuICAgICAgICAgICAgcmV0dXJuIGNhbGxGdW5jUmVzKHRoaXMubmFtZSwgdGhpcy5nZXRQbGF5ZXJJbmZvLm5hbWUsIHRhcmdldEd1aWQsIGluZm9UeXBlKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogKFx1NTNDQ1x1N0FFRilcdThCQkVcdTdGNkVcdTczQTlcdTVCQjZcdTRGRTFcdTYwNkZcclxuICAgICAgICAgKiBAcGFyYW0gc2VuZGVyR3VpZCBcdTUzRDFcdThENzdcdTVCRjlcdThDNjFHdWlkXHJcbiAgICAgICAgICogQHBhcmFtIHRhcmdldEd1aWQgXHU3NkVFXHU2ODA3XHU1QkY5XHU4QzYxR3VpZFxyXG4gICAgICAgICAqIEBwYXJhbSB2YWwgXHU1MDNDXHJcbiAgICAgICAgICogQHBhcmFtIGluZm9UeXBlIFx1NEZFMVx1NjA2Rlx1N0M3Qlx1NTc4QlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgc2V0UGxheWVySW5mbyhzZW5kZXJHdWlkOiBzdHJpbmcsIHRhcmdldEd1aWQ6IHN0cmluZywgdmFsOiBhbnksIGluZm9UeXBlOiBQbGF5ZXJJbmZvVHlwZSB8IHN0cmluZykge1xyXG4gICAgICAgICAgICBjYWxsRnVuYyh0aGlzLm5hbWUsIHRoaXMub25TZXRQbGF5ZXJJbmZvLm5hbWUsIHNlbmRlckd1aWQsIHRhcmdldEd1aWQsIHZhbCwgaW5mb1R5cGUpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAoXHU1M0NDXHU3QUVGKVx1NzZEMVx1NTQyQ1x1NEZFMVx1NjA2Rlx1NjUzOVx1NTNEOFxyXG4gICAgICAgICAqIEBwYXJhbSBjYWxsYmFjayBcdTU2REVcdThDMDNcclxuICAgICAgICAgKiBAcmV0dXJucyBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgc3RhdGljIG9uU2V0UGxheWVySW5mbyhjYWxsYmFjazogKHNlbmRlckd1aWQ6IHN0cmluZywgdGFyZ2V0R3VpZDogc3RyaW5nLCB2YWw6IGFueSwgaW5mb1R5cGU6IFBsYXllckluZm9UeXBlIHwgc3RyaW5nKSA9PiB2b2lkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBvbkZ1bmModGhpcy5uYW1lLCB0aGlzLm9uU2V0UGxheWVySW5mby5uYW1lLCBjYWxsYmFjaylcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIChcdTUzQ0NcdTdBRUYpXHU2REZCXHU1MkEwXHU0RkUxXHU2MDZGXHJcbiAgICAgICAgICogQHBhcmFtIHNlbmRlckd1aWQgXHU1M0QxXHU4RDc3XHU1QkY5XHU4QzYxR3VpZFxyXG4gICAgICAgICAqIEBwYXJhbSB0YXJnZXRHdWlkIFx1NzZFRVx1NjgwN1x1NUJGOVx1OEM2MUd1aWRcclxuICAgICAgICAgKiBAcGFyYW0gdmFsIFx1NTAzQ1xyXG4gICAgICAgICAqIEBwYXJhbSBpbmZvVHlwZSBcdTRGRTFcdTYwNkZcdTdDN0JcdTU3OEJcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGFkZFBsYXllckluZm8oc2VuZGVyR3VpZDogc3RyaW5nLCB0YXJnZXRHdWlkOiBzdHJpbmcsIHZhbDogbnVtYmVyLCBhdHRyVHlwZTogUGxheWVySW5mb1R5cGUgfCBzdHJpbmcpIHtcclxuICAgICAgICAgICAgY2FsbEZ1bmModGhpcy5uYW1lLCB0aGlzLm9uQWRkUGxheWVySW5mby5uYW1lLCBzZW5kZXJHdWlkLCB0YXJnZXRHdWlkLCB2YWwsIGF0dHJUeXBlKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogKFx1NTNDQ1x1N0FFRilcdTc2RDFcdTU0MkNcdTRGRTFcdTYwNkZcdTY1MzlcdTUzRDhcclxuICAgICAgICAgKiBAcGFyYW0gY2FsbGJhY2sgXHU1NkRFXHU4QzAzXHJcbiAgICAgICAgICogQHJldHVybnMgXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBvbkFkZFBsYXllckluZm8oY2FsbGJhY2s6IChzZW5kZXJHdWlkOiBzdHJpbmcsIHRhcmdldEd1aWQ6IHN0cmluZywgdmFsOiBudW1iZXIsIGluZm9UeXBlOiBQbGF5ZXJJbmZvVHlwZSB8IHN0cmluZykgPT4gdm9pZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gb25GdW5jKHRoaXMubmFtZSwgdGhpcy5vbkFkZFBsYXllckluZm8ubmFtZSwgY2FsbGJhY2spXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgZW51bSBQbGF5ZXJTdGF0VHlwZSB7XHJcbiAgICAgICAgLyoqIFx1ODg0Q1x1OEQ3MCAqL1xyXG4gICAgICAgIFdhbGtpbmcsXHJcbiAgICAgICAgLyoqIFx1OThERVx1ODg0QyAqL1xyXG4gICAgICAgIEZseWluZ1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBQcmVmYWJFdnRQbGF5ZXJTdGF0IHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAoXHU1M0NDXHU3QUVGKVx1NjZGNFx1NjUzOVx1NzNBOVx1NUJCNlx1NzJCNlx1NjAwMVxyXG4gICAgICAgICAqIEBwYXJhbSBzZW5kZXJHdWlkIFx1NTNEMVx1OEQ3N1x1NUJGOVx1OEM2MWd1aWRcclxuICAgICAgICAgKiBAcGFyYW0gdGFyZ2V0R3VpZCBcdTc2RUVcdTY4MDdcdTVCRjlcdThDNjFndWlkXHJcbiAgICAgICAgICogQHBhcmFtIHN0YXRUeXBlIFx1NzNBOVx1NUJCNlx1NzJCNlx1NjAwMVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgc2V0UGxheWVyU3RhdChzZW5kZXJHdWlkOiBzdHJpbmcsIHRhcmdldEd1aWQ6IHN0cmluZywgc3RhdFR5cGU6IFBsYXllclN0YXRUeXBlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjYWxsRnVuYyh0aGlzLm5hbWUsIHRoaXMub25TZXRQbGF5ZXJTdGF0Lm5hbWUsIHNlbmRlckd1aWQsIHRhcmdldEd1aWQsIHN0YXRUeXBlKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogKFx1NTNDQ1x1N0FFRilcdTc2RDFcdTU0MkNcdTczQTlcdTVCQjZcdTcyQjZcdTYwMDFcdTY2RjRcdTY1MzlcclxuICAgICAgICAgKiBAcGFyYW0gY2FsbGJhY2sgXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBvblNldFBsYXllclN0YXQoY2FsbGJhY2s6IChzZW5kZXJHdWlkOiBzdHJpbmcsIHRhcmdldEd1aWQ6IHN0cmluZywgc3RhdFR5cGU6IFBsYXllclN0YXRUeXBlKSA9PiB2b2lkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBvbkZ1bmModGhpcy5uYW1lLCB0aGlzLm9uU2V0UGxheWVyU3RhdC5uYW1lLCBjYWxsYmFjaylcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIChcdTUzQ0NcdTdBRUYpXHU4M0I3XHU1Rjk3XHU3M0E5XHU1QkI2XHU1RjUzXHU1MjREXHU3MkI2XHU2MDAxXHJcbiAgICAgICAgICogQHBhcmFtIHRhcmdldEd1aWQgXHU3NkVFXHU2ODA3XHU1QkY5XHU4QzYxZ3VpZFxyXG4gICAgICAgICAqIEByZXR1cm5zIFx1NzNBOVx1NUJCNlx1NUY1M1x1NTI0RFx1NzJCNlx1NjAwMVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZ2V0UGxheWVyU3RhdCh0YXJnZXRHdWlkOiBzdHJpbmcpOiBQbGF5ZXJTdGF0VHlwZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjYWxsRnVuY1Jlcyh0aGlzLm5hbWUsIHRoaXMuZ2V0UGxheWVyU3RhdC5uYW1lLCB0YXJnZXRHdWlkKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICogXHU2NTNCXHU1MUZCXHU1MzRGXHU4QkFFXHJcbiAgICAqL1xyXG4gICAgZXhwb3J0IGNsYXNzIFByZWZhYkV2dEZpZ2h0IHtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogKFx1NTNDQ1x1N0FFRilcdTUxRkJcdTRFMkRcdTc2RUVcdTY4MDdcclxuICAgICAgICAgKiBAcGFyYW0gYXR0YWNrZXJHdWlkIFx1NTNEMVx1OEQ3N1x1NUJGOVx1OEM2MUd1aWRcclxuICAgICAgICAgKiBAcGFyYW0gdGFyZ2V0R3VpZCBcdTc2RUVcdTY4MDdcdTVCRjlcdThDNjFHdWlkXHJcbiAgICAgICAgICogQHBhcmFtIGRhbWFnZSBcdTRGMjRcdTVCQjNcclxuICAgICAgICAgKiBAcGFyYW0gaGl0UG9pbnQgXHU1MUZCXHU0RTJEXHU3MEI5XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBoaXQoc2VuZGVyR3VpZDogc3RyaW5nLCB0YXJnZXRHdWlkOiBzdHJpbmcsIGRhbWFnZTogbnVtYmVyLCBoaXRQb2ludDogVHlwZS5WZWN0b3IpIHtcclxuICAgICAgICAgICAgY2FsbEZ1bmModGhpcy5uYW1lLCB0aGlzLm9uSGl0Lm5hbWUsIHNlbmRlckd1aWQsIHRhcmdldEd1aWQsIGRhbWFnZSwgaGl0UG9pbnQpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAoXHU1M0NDXHU3QUVGKVx1NzZEMVx1NTQyQ1x1NTFGQlx1NEUyRFx1NzZFRVx1NjgwN1xyXG4gICAgICAgICAqIEBwYXJhbSBjYWxsYmFjayBcdTU2REVcdThDMDNcclxuICAgICAgICAgKiBAcmV0dXJucyBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgc3RhdGljIG9uSGl0KGNhbGxiYWNrOiAoc2VuZGVyR3VpZDogc3RyaW5nLCB0YXJnZXRHdWlkOiBzdHJpbmcsIGRhbWFnZTogbnVtYmVyLCBoaXRQb2ludDogVHlwZS5WZWN0b3IpID0+IHZvaWQpOiBFdmVudHMuRXZlbnRMaXN0ZW5lciB7XHJcbiAgICAgICAgICAgIHJldHVybiBvbkZ1bmModGhpcy5uYW1lLCB0aGlzLm9uSGl0Lm5hbWUsIGNhbGxiYWNrKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogKFx1NTNDQ1x1N0FFRilcdTUzRDFcdThENzdcdTRGMjRcdTVCQjNcclxuICAgICAgICAgKiBAcGFyYW0gYXR0YWNrZXJHdWlkIFx1NTNEMVx1OEQ3N1x1NUJGOVx1OEM2MUd1aWRcclxuICAgICAgICAgKiBAcGFyYW0gdGFyZ2V0R3VpZCBcdTc2RUVcdTY4MDdcdTVCRjlcdThDNjFHdWlkXHJcbiAgICAgICAgICogQHBhcmFtIGRhbWFnZSBcdTRGMjRcdTVCQjNcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGh1cnQoc2VuZGVyR3VpZDogc3RyaW5nLCB0YXJnZXRHdWlkOiBzdHJpbmcsIGRhbWFnZTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIGNhbGxGdW5jKHRoaXMubmFtZSwgdGhpcy5vbkh1cnQubmFtZSwgc2VuZGVyR3VpZCwgdGFyZ2V0R3VpZCwgZGFtYWdlKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogKFx1NTNDQ1x1N0FFRilcdTc2RDFcdTU0MkNcdTUzRDdcdTUyMzBcdTRGMjRcdTVCQjNcclxuICAgICAgICAgKiBAcGFyYW0gY2FsbGJhY2sgXHU1NkRFXHU4QzAzXHJcbiAgICAgICAgICogQHJldHVybnMgXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBvbkh1cnQoY2FsbGJhY2s6IChzZW5kZXJHdWlkOiBzdHJpbmcsIHRhcmdldEd1aWQ6IHN0cmluZywgZGFtYWdlOiBudW1iZXIpID0+IHZvaWQpOiBFdmVudHMuRXZlbnRMaXN0ZW5lciB7XHJcbiAgICAgICAgICAgIHJldHVybiBvbkZ1bmModGhpcy5uYW1lLCB0aGlzLm9uSHVydC5uYW1lLCBjYWxsYmFjaylcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIChcdTUzQ0NcdTdBRUYpXHU1M0QxXHU4RDc3XHU2Q0JCXHU3NTk3XHJcbiAgICAgICAgICogQHBhcmFtIGF0dGFja2VyR3VpZCBcdTUzRDFcdThENzdcdTVCRjlcdThDNjFHdWlkXHJcbiAgICAgICAgICogQHBhcmFtIHRhcmdldEd1aWQgXHU3NkVFXHU2ODA3XHU1QkY5XHU4QzYxR3VpZFxyXG4gICAgICAgICAqIEBwYXJhbSBjdXJlVmFsIFx1NkNCQlx1NzU5N1x1NjU3MFx1NTAzQ1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgY3VyZShzZW5kZXJHdWlkOiBzdHJpbmcsIHRhcmdldEd1aWQ6IHN0cmluZywgY3VyZVZhbDogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIGNhbGxGdW5jKHRoaXMubmFtZSwgdGhpcy5vbkN1cmUubmFtZSwgc2VuZGVyR3VpZCwgdGFyZ2V0R3VpZCwgY3VyZVZhbClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIChcdTUzQ0NcdTdBRUYpXHU3NkQxXHU1NDJDXHU1M0Q3XHU1MjMwXHU2Q0JCXHU3NTk3XHJcbiAgICAgICAgICogQHBhcmFtIGNhbGxiYWNrIFx1NTZERVx1OEMwM1xyXG4gICAgICAgICAqIEByZXR1cm5zIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgb25DdXJlKGNhbGxiYWNrOiAoc2VuZGVyR3VpZDogc3RyaW5nLCB0YXJnZXRHdWlkOiBzdHJpbmcsIGN1cmVWYWw6IG51bWJlcikgPT4gdm9pZCk6IEV2ZW50cy5FdmVudExpc3RlbmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIG9uRnVuYyh0aGlzLm5hbWUsIHRoaXMub25DdXJlLm5hbWUsIGNhbGxiYWNrKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogKFx1NTNDQ1x1N0FFRilcdTUzRDFcdThENzdcdTZCN0JcdTRFQTFcclxuICAgICAgICAgKiBAcGFyYW0gdGFyZ2V0R3VpZCBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGRpZSh0YXJnZXRHdWlkOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgY2FsbEZ1bmModGhpcy5uYW1lLCB0aGlzLm9uRGllLm5hbWUsIHRhcmdldEd1aWQpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAoXHU1M0NDXHU3QUVGKVx1NzZEMVx1NTQyQ1x1NUJGOVx1OEM2MVx1NkI3Qlx1NEVBMVxyXG4gICAgICAgICAqIEBwYXJhbSBjYWxsYmFjayBcclxuICAgICAgICAgKiBAcmV0dXJucyBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgc3RhdGljIG9uRGllKGNhbGxiYWNrOiAodGFyZ2V0R3VpZDogc3RyaW5nKSA9PiB2b2lkKTogRXZlbnRzLkV2ZW50TGlzdGVuZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gb25GdW5jKHRoaXMubmFtZSwgdGhpcy5vbkRpZS5uYW1lLCBjYWxsYmFjaylcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIChcdTUzQ0NcdTdBRUYpXHU5MDFBXHU3N0U1XHU1OTBEXHU2RDNCXHJcbiAgICAgICAgICogQHBhcmFtIHRhcmdldEd1aWQgXHU1QkY5XHU4QzYxaWRcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHJldml2ZSh0YXJnZXRHdWlkOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgY2FsbEZ1bmModGhpcy5uYW1lLCB0aGlzLm9uUmV2aXZlLm5hbWUsIHRhcmdldEd1aWQpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAoXHU1M0NDXHU3QUVGKVx1NzZEMVx1NTQyQ1x1NTkwRFx1NkQzQlxyXG4gICAgICAgICAqIEBwYXJhbSBjYWxsYmFjayBcdTU2REVcdThDMDNcclxuICAgICAgICAgKiBAcmV0dXJucyBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgc3RhdGljIG9uUmV2aXZlKGNhbGxiYWNrOiAodGFyZ2V0R3VpZDogc3RyaW5nKSA9PiB2b2lkKTogRXZlbnRzLkV2ZW50TGlzdGVuZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gb25GdW5jKHRoaXMubmFtZSwgdGhpcy5vblJldml2ZS5uYW1lLCBjYWxsYmFjaylcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHU4QkIwXHU1RjU1XHU3MEI5XHU1MzRGXHU4QkFFXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBjbGFzcyBQcmVmYWJFdnRSZWNvcmRQb2ludCB7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIChcdTUzQ0NcdTdBRUYpXHU4QkJFXHU3RjZFXHU1MTczXHU1MzYxXHJcbiAgICAgICAgICogQHBhcmFtIHNlbmRlckd1aWQgXHU1M0QxXHU5MDAxXHU4MDA1R3VpZFxyXG4gICAgICAgICAqIEBwYXJhbSB0YXJnZXRHdWlkIFx1NzZFRVx1NjgwN0d1aWRcclxuICAgICAgICAgKiBAcGFyYW0gcmVjb3JkUG9pbnRJZCBcdThCQjBcdTVGNTVcdTcwQjlpZFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgc2V0UmVjb3JkUG9pbnQoc2VuZGVyR3VpZDogc3RyaW5nLCB0YXJnZXRHdWlkOiBzdHJpbmcsIHJlY29yZFBvaW50SWQ6IG51bWJlciwgc2F2ZURCOiBib29sZWFuKSB7XHJcbiAgICAgICAgICAgIGNhbGxGdW5jKHRoaXMubmFtZSwgdGhpcy5vblNldFJlY29yZFBvaW50Lm5hbWUsIHNlbmRlckd1aWQsIHRhcmdldEd1aWQsIHJlY29yZFBvaW50SWQsIHNhdmVEQilcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIChcdTUzQ0NcdTdBRUYpXHU4M0I3XHU1M0Q2XHU1MTczXHU1MzYxXHJcbiAgICAgICAgICogQHBhcmFtIHRhcmdldEd1aWQgXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBnZXRSZWNvcmRQb2ludCh0YXJnZXRHdWlkOiBzdHJpbmcpOiBudW1iZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gY2FsbEZ1bmNSZXModGhpcy5uYW1lLCB0aGlzLmdldFJlY29yZFBvaW50Lm5hbWUsIHRhcmdldEd1aWQpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAoXHU1M0NDXHU3QUVGKVx1NzZEMVx1NTQyQ1x1OEJCRVx1N0Y2RVx1NTE3M1x1NTM2MVxyXG4gICAgICAgICAqIEBwYXJhbSBjYWxsYmFjayBcdTU2REVcdThDMDNcclxuICAgICAgICAgKiBAcmV0dXJucyBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgc3RhdGljIG9uU2V0UmVjb3JkUG9pbnQoY2FsbGJhY2s6IChzZW5kZXJHdWlkOiBzdHJpbmcsIHRhcmdldEd1aWQ6IHN0cmluZywgcmVjb3JkUG9pbnRJZDogbnVtYmVyKSA9PiB2b2lkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBvbkZ1bmModGhpcy5uYW1lLCB0aGlzLm9uU2V0UmVjb3JkUG9pbnQubmFtZSwgY2FsbGJhY2spXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAoXHU1M0NDXHU3QUVGKVx1OEZENFx1NTZERVx1NUI1OFx1Njg2M1x1OEJCMFx1NUY1NVx1NzBCOVxyXG4gICAgICAgICAqIEBwYXJhbSBzZW5kZXJHdWlkIFx1NTNEMVx1OTAwMVx1ODAwNWd1aWQgXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBiYWNrQ3VycmVudFJlY29yZFBvaW50KHNlbmRlckd1aWQ6IHN0cmluZykge1xyXG4gICAgICAgICAgICBjYWxsRnVuYyh0aGlzLm5hbWUsIHRoaXMub25CYWNrQ3VycmVudFJlY29yZFBvaW50Lm5hbWUsIHNlbmRlckd1aWQpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAoXHU1M0NDXHU3QUVGKVx1NzZEMVx1NTQyQ1x1NTZERVx1NTIzMFx1NUI1OFx1Njg2M1x1OEJCMFx1NUY1NVx1NzBCOVxyXG4gICAgICAgICAqIEBwYXJhbSBjYWxsYmFjayBcdTU2REVcdThDMDNcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgc3RhdGljIG9uQmFja0N1cnJlbnRSZWNvcmRQb2ludChjYWxsYmFjazogKHNlbmRlckd1aWQ6IHN0cmluZykgPT4gdm9pZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gb25GdW5jKHRoaXMubmFtZSwgdGhpcy5vbkJhY2tDdXJyZW50UmVjb3JkUG9pbnQubmFtZSwgY2FsbGJhY2spXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAoXHU1M0NDXHU3QUVGKVx1OEZENFx1NTZERVx1OEJCMFx1NUY1NVx1NzBCOVxyXG4gICAgICAgICAqIEBwYXJhbSBzZW5kZXJHdWlkIFx1NTNEMVx1OTAwMVx1ODAwNWd1aWQgXHJcbiAgICAgICAgICogQHBhcmFtIHJlY29yZFBvaW50SWQgXHU4QkIwXHU1RjU1XHU3MEI5aWRcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGJhY2tSZWNvcmRQb2ludChzZW5kZXJHdWlkOiBzdHJpbmcsIHJlY29yZFBvaW50SWQ6IG51bWJlcikge1xyXG4gICAgICAgICAgICBjYWxsRnVuYyh0aGlzLm5hbWUsIHRoaXMub25CYWNrUmVjb3JkUG9pbnQubmFtZSwgc2VuZGVyR3VpZCwgcmVjb3JkUG9pbnRJZClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIChcdTUzQ0NcdTdBRUYpXHU3NkQxXHU1NDJDXHU1NkRFXHU1MjMwXHU4QkIwXHU1RjU1XHU3MEI5XHJcbiAgICAgICAgICogQHBhcmFtIGNhbGxiYWNrIFx1NTZERVx1OEMwM1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgb25CYWNrUmVjb3JkUG9pbnQoY2FsbGJhY2s6IChzZW5kZXJHdWlkOiBzdHJpbmcsIHJlY29yZFBvaW50SWQ6IG51bWJlcikgPT4gdm9pZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gb25GdW5jKHRoaXMubmFtZSwgdGhpcy5vbkJhY2tSZWNvcmRQb2ludC5uYW1lLCBjYWxsYmFjaylcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHU5MDFBXHU3N0U1XHU1MzRGXHU4QkFFXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBjbGFzcyBQcmVmYWJFdnROb3RpZnkge1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAoXHU1QkEyXHU2MjM3XHU3QUVGKVx1NjcyQ1x1NTczMFx1OTAxQVx1NzdFNVxyXG4gICAgICAgICAqIEBwYXJhbSB0ZXh0IFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgbm90aWZ5TG9jYWwodGV4dDogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIGNhbGxMb2NhbEZ1bmModGhpcy5uYW1lLCB0aGlzLm9uTm90aWZ5Lm5hbWUsIHRleHQpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAoXHU1M0NDXHU3QUVGKVx1NTE2OFx1NUM0MFx1OTAxQVx1NzdFNVxyXG4gICAgICAgICAqIEBwYXJhbSB0ZXh0IFx1NEZFMVx1NjA2RlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgbm90aWZ5KHRleHQ6IHN0cmluZykge1xyXG4gICAgICAgICAgICBjYWxsRnVuYyh0aGlzLm5hbWUsIHRoaXMub25Ob3RpZnkubmFtZSwgdGV4dClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIChcdTUzQ0NcdTdBRUYpXHU3NkQxXHU1NDJDXHU5MDFBXHU3N0U1XHJcbiAgICAgICAgICogQHBhcmFtIGNhbGxiYWNrIFxyXG4gICAgICAgICAqIEByZXR1cm5zIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgb25Ob3RpZnkoY2FsbGJhY2s6ICh0ZXh0OiBzdHJpbmcpID0+IHZvaWQpOiBFdmVudHMuRXZlbnRMaXN0ZW5lciB7XHJcbiAgICAgICAgICAgIHJldHVybiBvbkZ1bmModGhpcy5uYW1lLCB0aGlzLm9uTm90aWZ5Lm5hbWUsIGNhbGxiYWNrKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcdTYzOTJcdTg4NENcdTY5OUNcdTUzNEZcdThCQUVcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGNsYXNzIFByZWZhYkV2dFJhbmsge1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAoXHU1QkEyXHU2MjM3XHU3QUVGKVx1NjI1M1x1NUYwMFx1NjM5Mlx1ODg0Q1x1Njk5Q1VJXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBvcGVuUmFuaygpIHtcclxuICAgICAgICAgICAgY2FsbExvY2FsRnVuYyh0aGlzLm5hbWUsIHRoaXMub25PcGVuUmFuay5uYW1lKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogKFx1NUJBMlx1NjIzN1x1N0FFRilcdTc2RDFcdTU0MkNcdTYyNTNcdTVGMDBcdTYzOTJcdTg4NENcdTY5OUNVSVxyXG4gICAgICAgICAqIEBwYXJhbSBjYWxsYmFjayBcdTU2REVcdThDMDNcclxuICAgICAgICAgKiBAcmV0dXJucyBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgc3RhdGljIG9uT3BlblJhbmsoY2FsbGJhY2s6ICgpID0+IHZvaWQpOiBFdmVudHMuRXZlbnRMaXN0ZW5lciB7XHJcbiAgICAgICAgICAgIHJldHVybiBvbkZ1bmModGhpcy5uYW1lLCB0aGlzLm9uT3BlblJhbmsubmFtZSwgY2FsbGJhY2spXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAoXHU1M0NDXHU3QUVGKVx1OEJCRVx1N0Y2RVx1NjM5Mlx1ODg0Q1x1Njk5Q1x1NjU3MFx1NjM2RVxyXG4gICAgICAgICAqIEBwYXJhbSBzZW5kZXJHdWlkIFxyXG4gICAgICAgICAqIEBwYXJhbSBzY29yZSBcclxuICAgICAgICAgKiBAcGFyYW0gdHlwZU5hbWUgXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBzZXRSYW5rRGF0YShzZW5kZXJHdWlkOiBzdHJpbmcsIG5hbWU6IHN0cmluZywgc2NvcmU6IG51bWJlciwgdHlwZU5hbWU6IHN0cmluZykge1xyXG4gICAgICAgICAgICBjYWxsRnVuYyh0aGlzLm5hbWUsIHRoaXMub25TZXRSYW5rRGF0YS5uYW1lLCBzZW5kZXJHdWlkLCBuYW1lLCBzY29yZSwgdHlwZU5hbWUpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAoXHU1M0NDXHU3QUVGKVx1NzZEMVx1NTQyQ1x1OEJCRVx1N0Y2RVx1NjM5Mlx1ODg0Q1x1Njk5Q1x1NjU3MFx1NjM2RVxyXG4gICAgICAgICAqIEBwYXJhbSBjYWxsYmFjayBcclxuICAgICAgICAgKiBAcmV0dXJucyBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgc3RhdGljIG9uU2V0UmFua0RhdGEoY2FsbGJhY2s6IChzZW5kZXJHdWlkOiBzdHJpbmcsIG5hbWU6IHN0cmluZywgc2NvcmU6IG51bWJlciwgdHlwZU5hbWU6IHN0cmluZykgPT4gdm9pZCk6IEV2ZW50cy5FdmVudExpc3RlbmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIG9uRnVuYyh0aGlzLm5hbWUsIHRoaXMub25TZXRSYW5rRGF0YS5uYW1lLCBjYWxsYmFjaylcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIChcdTUzQ0NcdTdBRUYpXHU1MjIwXHU5NjY0XHU2MzkyXHU4ODRDXHU2OTlDXHU2NTcwXHU2MzZFXHJcbiAgICAgICAgICogQHBhcmFtIHNlbmRlckd1aWQgXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBkZWxSYW5rRGF0YShzZW5kZXJHdWlkOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgY2FsbEZ1bmModGhpcy5uYW1lLCB0aGlzLm9uRGVsUmFua0RhdGEubmFtZSwgc2VuZGVyR3VpZClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIChcdTUzQ0NcdTdBRUYpXHU3NkQxXHU1NDJDXHU1MjIwXHU5NjY0XHU2MzkyXHU4ODRDXHU2OTlDXHU2NTcwXHU2MzZFXHJcbiAgICAgICAgICogQHBhcmFtIGNhbGxiYWNrIFxyXG4gICAgICAgICAqIEByZXR1cm5zIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgb25EZWxSYW5rRGF0YShjYWxsYmFjazogKHNlbmRlckd1aWQ6IHN0cmluZykgPT4gdm9pZCk6IEV2ZW50cy5FdmVudExpc3RlbmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIG9uRnVuYyh0aGlzLm5hbWUsIHRoaXMub25EZWxSYW5rRGF0YS5uYW1lLCBjYWxsYmFjaylcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHU2MzYyXHU4OEM1XHU1MzRGXHU4QkFFXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBjbGFzcyBQcmVmYWJFdnRDbG90aCB7XHJcblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAoXHU1QkEyXHU2MjM3XHU3QUVGKVx1NTJBMFx1OEY3RFx1ODlEMlx1ODI3Mlx1NEY1M1x1NTc4QlxyXG4gICAgICAgICAqIEBwYXJhbSBzZW5kZXJHdWlkIFx1NTNEMVx1OTAwMVx1ODAwNUd1aWRcclxuICAgICAgICAgKiBAcGFyYW0gdGFyZ2V0R3VpZCBcdTc2RUVcdTY4MDdcdTVCRjlcdThDNjFHdWlkXHJcbiAgICAgICAgICogQHBhcmFtIGRyZXNzUmVzR3VpZCBcdTg4QzVcdTYyNkVcdThENDRcdTZFOTBHdWlkXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBsb2FkUm9sZShzZW5kZXJHdWlkOiBzdHJpbmcsIHRhcmdldEd1aWQ6IHN0cmluZywgZHJlc3NSZXNHdWlkOiBzdHJpbmdbXSkge1xyXG4gICAgICAgICAgICBjYWxsTG9jYWxGdW5jKHRoaXMubmFtZSwgdGhpcy5vbkxvYWRSb2xlLm5hbWUsIHNlbmRlckd1aWQsIHRhcmdldEd1aWQsIGRyZXNzUmVzR3VpZClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIChcdTVCQTJcdTYyMzdcdTdBRUYpXHU3NkQxXHU1NDJDXHU1MkEwXHU4RjdEXHU4OUQyXHU4MjcyXHU0RjUzXHU1NzhCXHU1MzRGXHU4QkFFXHJcbiAgICAgICAgICogQHBhcmFtIGNhbGxiYWNrIFx1NTZERVx1OEMwM1xyXG4gICAgICAgICAqIEByZXR1cm5zIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgb25Mb2FkUm9sZShjYWxsYmFjazogKHNlbmRlckd1aWQ6IHN0cmluZywgdGFyZ2V0R3VpZDogc3RyaW5nLCBkcmVzc1Jlc0d1aWQ6IHN0cmluZ1tdKSA9PiB2b2lkKTogRXZlbnRzLkV2ZW50TGlzdGVuZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gb25GdW5jKHRoaXMubmFtZSwgdGhpcy5vbkxvYWRSb2xlLm5hbWUsIGNhbGxiYWNrKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogKFx1NUJBMlx1NjIzN1x1N0FFRilcdTUyQTBcdThGN0RcdTg4QzVcdTYyNkVcclxuICAgICAgICAgKiBAcGFyYW0gc2VuZGVyR3VpZCBcdTUzRDFcdTkwMDFcdTgwMDVHdWlkXHJcbiAgICAgICAgICogQHBhcmFtIHRhcmdldEd1aWQgXHU3NkVFXHU2ODA3XHU1QkY5XHU4QzYxR3VpZFxyXG4gICAgICAgICAqIEBwYXJhbSBkcmVzc1Jlc0d1aWQgXHU4OEM1XHU2MjZFXHU4RDQ0XHU2RTkwR3VpZFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgbG9hZENsb3RoKHNlbmRlckd1aWQ6IHN0cmluZywgdGFyZ2V0R3VpZDogc3RyaW5nLCBkcmVzc1Jlc0d1aWQ6IHN0cmluZ1tdKSB7XHJcbiAgICAgICAgICAgIGNhbGxMb2NhbEZ1bmModGhpcy5uYW1lLCB0aGlzLm9uTG9hZENsb3RoLm5hbWUsIHNlbmRlckd1aWQsIHRhcmdldEd1aWQsIGRyZXNzUmVzR3VpZClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIChcdTVCQTJcdTYyMzdcdTdBRUYpXHU3NkQxXHU1NDJDXHU1MkEwXHU4RjdEXHU4OEM1XHU2MjZFXHJcbiAgICAgICAgICogQHBhcmFtIGNhbGxiYWNrIFxyXG4gICAgICAgICAqIEByZXR1cm5zIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgb25Mb2FkQ2xvdGgoY2FsbGJhY2s6IChzZW5kZXJHdWlkOiBzdHJpbmcsIHRhcmdldEd1aWQ6IHN0cmluZywgZHJlc3NSZXNHdWlkOiBzdHJpbmdbXSkgPT4gdm9pZCk6IEV2ZW50cy5FdmVudExpc3RlbmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIG9uRnVuYyh0aGlzLm5hbWUsIHRoaXMub25Mb2FkQ2xvdGgubmFtZSwgY2FsbGJhY2spXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAoXHU1QkEyXHU2MjM3XHU3QUVGKVx1NTJBMFx1OEY3RFx1NjNEMlx1NjlGRFx1OEQ0NFx1NkU5MFxyXG4gICAgICAgICAqIEBwYXJhbSBzZW5kZXJHdWlkIFx1NTNEMVx1OTAwMVx1ODAwNUd1aWRcclxuICAgICAgICAgKiBAcGFyYW0gdGFyZ2V0R3VpZCBcdTc2RUVcdTY4MDdcdTVCRjlcdThDNjFHdWlkXHJcbiAgICAgICAgICogQHBhcmFtIHNsb3RSZXNHdWlkIFx1NjNEMlx1NjlGRFx1OEQ0NFx1NkU5MEd1aWRcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGxvYWRTbG90KHNlbmRlckd1aWQ6IHN0cmluZywgdGFyZ2V0R3VpZDogc3RyaW5nLCBzbG90UmVzR3VpZDogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIGNhbGxMb2NhbEZ1bmModGhpcy5uYW1lLCB0aGlzLm9uTG9hZFNsb3QubmFtZSwgc2VuZGVyR3VpZCwgdGFyZ2V0R3VpZCwgc2xvdFJlc0d1aWQpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAoXHU1QkEyXHU2MjM3XHU3QUVGKVx1NzZEMVx1NTQyQ1x1NTJBMFx1OEY3RFx1NjNEMlx1NjlGRFx1OEQ0NFx1NkU5MFxyXG4gICAgICAgICAqIEBwYXJhbSBjYWxsYmFjayBcclxuICAgICAgICAgKiBAcmV0dXJucyBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgc3RhdGljIG9uTG9hZFNsb3QoY2FsbGJhY2s6IChzZW5kZXJHdWlkOiBzdHJpbmcsIHRhcmdldEd1aWQ6IHN0cmluZywgc2xvdFJlc0d1aWQ6IHN0cmluZykgPT4gdm9pZCk6IEV2ZW50cy5FdmVudExpc3RlbmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIG9uRnVuYyh0aGlzLm5hbWUsIHRoaXMub25Mb2FkU2xvdC5uYW1lLCBjYWxsYmFjaylcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFx1NjUzNlx1OTZDNlx1NzI2OVx1NTM0Rlx1OEJBRVxyXG4gICAgICovXHJcbiAgICBleHBvcnQgY2xhc3MgUHJlZmFiRXZ0Q29sbGVjdGlvbiB7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIChcdTVCQTJcdTYyMzdcdTdBRUYpXHU2MjUzXHU1RjAwXHU2NTM2XHU5NkM2XHU3MjY5VUlcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgc3RhdGljIG9wZW5Db2xsZWN0aW9uVUkoKSB7XHJcbiAgICAgICAgICAgIGNhbGxMb2NhbEZ1bmModGhpcy5uYW1lLCB0aGlzLm9uT3BlbkNvbGxlY3Rpb25VSS5uYW1lKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogKFx1NUJBMlx1NjIzN1x1N0FFRilcdTc2RDFcdTU0MkNcdTY1MzZcdTk2QzZcdTcyNjlVSVx1ODhBQlx1NjI1M1x1NUYwMFxyXG4gICAgICAgICAqIEBwYXJhbSBjYWxsYmFjayBcclxuICAgICAgICAgKiBAcmV0dXJucyBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgc3RhdGljIG9uT3BlbkNvbGxlY3Rpb25VSShjYWxsYmFjazogKCkgPT4gdm9pZCk6IEV2ZW50cy5FdmVudExpc3RlbmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIG9uRnVuYyh0aGlzLm5hbWUsIHRoaXMub25PcGVuQ29sbGVjdGlvblVJLm5hbWUsIGNhbGxiYWNrKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogKFx1NTNDQ1x1N0FFRilcdTgzQjdcdTVGOTdcdTY1MzZcdTk2QzZcdTcyNjlcclxuICAgICAgICAgKiBAcGFyYW0gc2VuZGVyR3VpZCBcclxuICAgICAgICAgKiBAcGFyYW0gdGFyZ2V0R3VpZCBcclxuICAgICAgICAgKiBAcGFyYW0gYXRsYXNJZCBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGFkZENvbGxlY3Rpb24oYXRsYXNJZDogc3RyaW5nLCBjaGFyR3VpZDogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIGNhbGxGdW5jKHRoaXMubmFtZSwgdGhpcy5vbkFkZENvbGxlY3Rpb24ubmFtZSwgYXRsYXNJZCwgY2hhckd1aWQpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAoXHU1M0NDXHU3QUVGKVx1ODNCN1x1NTNENlx1NjI0MFx1NjcwOVx1NURGMlx1N0VDRlx1NjUzNlx1OTZDNlx1NzY4NFx1NzI2OVx1NTRDMVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZ2V0QWxsQ29sbGVjdGlvbihjaGFyR3VpZDogc3RyaW5nKTogc3RyaW5nW10ge1xyXG4gICAgICAgICAgICByZXR1cm4gY2FsbEZ1bmNSZXModGhpcy5uYW1lLCB0aGlzLmdldEFsbENvbGxlY3Rpb24ubmFtZSwgY2hhckd1aWQpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAoXHU1M0NDXHU3QUVGKVx1NzZEMVx1NTQyQ1x1ODNCN1x1NUY5N1x1NjUzNlx1OTZDNlx1NzI2OVxyXG4gICAgICAgICAqIEBwYXJhbSBjYWxsYmFjayBcdTU2REVcdThDMDNcclxuICAgICAgICAgKiBAcmV0dXJucyBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgc3RhdGljIG9uQWRkQ29sbGVjdGlvbihjYWxsYmFjazogKGF0bGFzSWQ6IHN0cmluZywgY2hhckd1aWQ6IHN0cmluZykgPT4gdm9pZCk6IEV2ZW50cy5FdmVudExpc3RlbmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIG9uRnVuYyh0aGlzLm5hbWUsIHRoaXMub25BZGRDb2xsZWN0aW9uLm5hbWUsIGNhbGxiYWNrKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBQcmVmYWJFdnRDdXJyZW5jeSB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogKFx1NTNDQ1x1N0FFRilcdTY1MzlcdTUzRDhcdThEMjdcdTVFMDFcdTc2ODRcdTUwM0NcclxuICAgICAgICAgKiBAcGFyYW0gdGFyZ2V0R3VpZCBcdTY1MzlcdTUzRDhcdTc2ODRcdTVCRjlcdThDNjFcclxuICAgICAgICAgKiBAcGFyYW0gY3VycmVuY3lJZCBcdThEMjdcdTVFMDFJZFxyXG4gICAgICAgICAqIEBwYXJhbSBjaGFuZ2VOdW0gXHU2NTM5XHU1M0Q4XHU3Njg0XHU2NTcwXHU3NkVFXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBjaGFuZ2VDdXJyZW5jeSh0YXJnZXRHdWlkOiBzdHJpbmcsIGN1cnJlbmN5SWQ6IG51bWJlciwgY2hhbmdlTnVtOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgY2FsbEZ1bmModGhpcy5uYW1lLCB0aGlzLm9uQ2hhbmdlQ3VycmVuY3kubmFtZSwgdGFyZ2V0R3VpZCwgY3VycmVuY3lJZCwgY2hhbmdlTnVtKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogKFx1NTNDQ1x1N0FFRilcdTc2RDFcdTU0MkNcdTY1MzlcdTUzRDhcdThEMjdcdTVFMDFcdTc2ODRcdTUwM0NcclxuICAgICAgICAgKiBAcGFyYW0gdGFyZ2V0R3VpZCBcdTY1MzlcdTUzRDhcdTc2ODRcdTVCRjlcdThDNjFcclxuICAgICAgICAgKiBAcGFyYW0gY3VycmVuY3lJZCBcdThEMjdcdTVFMDFJZFxyXG4gICAgICAgICAqIEBwYXJhbSBjaGFuZ2VOdW0gXHU2NTM5XHU1M0Q4XHU3Njg0XHU2NTcwXHU3NkVFXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBvbkNoYW5nZUN1cnJlbmN5KGNhbGxiYWNrOiAodGFyZ2V0R3VpZDogc3RyaW5nLCBjdXJyZW5jeUlkOiBudW1iZXIsIGNoYW5nZU51bTogbnVtYmVyLCByZXNOdW06IG51bWJlcikgPT4gdm9pZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gb25GdW5jKHRoaXMubmFtZSwgdGhpcy5vbkNoYW5nZUN1cnJlbmN5Lm5hbWUsIGNhbGxiYWNrKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogXHVGRjA4XHU1M0NDXHU3QUVGXHVGRjA5XHU2RDg4XHU4RDM5XHJcbiAgICAgICAgICogQHBhcmFtIHRhcmdldEd1aWQgXHU3NkVFXHU2ODA3Z3VpZFxyXG4gICAgICAgICAqIEBwYXJhbSBjdXJyZW5jeUlkIFx1OEQyN1x1NUUwMUlkXHJcbiAgICAgICAgICogQHBhcmFtIHByaWNlIFx1NEVGN1x1NEY0RFxyXG4gICAgICAgICAqIEByZXR1cm5zIFx1NjYyRlx1NTQyNlx1NkQ4OFx1OEQzOVx1NjIxMFx1NTI5RlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgYXN5bmMgYnV5V2l0aEN1cnJlbmN5KHRhcmdldEd1aWQ6IHN0cmluZywgY3VycmVuY3lJZDogbnVtYmVyLCBwcmljZTogbnVtYmVyKTogUHJvbWlzZTxib29sZWFuPiB7XHJcbiAgICAgICAgICAgIGlmIChTeXN0ZW1VdGlsLmlzQ2xpZW50KCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBhd2FpdCBNb2R1bGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TW9kdWxlKFByZWZhYkV2ZW50TW9kdWxlQykuYnV5V2l0aEN1cnJlbmN5KHRhcmdldEd1aWQsIGN1cnJlbmN5SWQsIHByaWNlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGF3YWl0IE1vZHVsZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNb2R1bGUoUHJlZmFiRXZlbnRNb2R1bGVTKS5uZXRfQnV5V2l0aEN1cnJlbmN5KHRhcmdldEd1aWQsIGN1cnJlbmN5SWQsIHByaWNlKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogKFx1NTNDQ1x1N0FFRilcclxuICAgICAgICAgKiBAcGFyYW0gdGFyZ2V0R3VpZCBcdTc2RUVcdTY4MDdndWlkIFxyXG4gICAgICAgICAqIEBwYXJhbSBjdXJyZW5jeUlkIFx1OEQyN1x1NUUwMWlkXHJcbiAgICAgICAgICogQHJldHVybnMgXHU4RDI3XHU1RTAxXHU1MDNDXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBnZXRDdXJyZW5jeU51bSh0YXJnZXRHdWlkOiBzdHJpbmcsIGN1cnJlbmN5SWQ6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgICAgIHJldHVybiBjYWxsRnVuY1Jlcyh0aGlzLm5hbWUsIHRoaXMuZ2V0Q3VycmVuY3lOdW0ubmFtZSwgdGFyZ2V0R3VpZCwgY3VycmVuY3lJZClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIFx1NUJBMFx1NzI2OVx1NzZGOFx1NTE3M1x1NEU4Qlx1NEVGNiAqL1xyXG4gICAgZXhwb3J0IGNsYXNzIFByZWZhYkV2dFBldCB7XHJcbiAgICAgICAgLyoqIFx1NjI1M1x1NUYwMFx1NUJBMFx1NzI2OVx1NzU0Q1x1OTc2MiAqL1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgb3BlblVJKCkge1xyXG4gICAgICAgICAgICBjYWxsTG9jYWxGdW5jKHRoaXMubmFtZSwgdGhpcy5vcGVuVUkubmFtZSlcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogXHU2REZCXHU1MkEwXHU1QkEwXHU3MjY5XHJcbiAgICAgICAgICogQHBhcmFtIHRhcmdldEd1aWQgXHU3M0E5XHU1QkI2XHU4OUQyXHU4MjcyZ3VpZFxyXG4gICAgICAgICAqIEBwYXJhbSBwZXRDZmdJZCBcdTVCQTBcdTcyNjlcdTkxNERcdTdGNkVcdTg4NjhpZCBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGFkZFBldCh0YXJnZXRHdWlkOiBzdHJpbmcsIHBldENmZ0lkOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgY29uc3QgcmVzID0gY2FsbEZ1bmModGhpcy5uYW1lLCB0aGlzLmFkZFBldC5uYW1lLCB0YXJnZXRHdWlkLCBwZXRDZmdJZClcclxuICAgICAgICAgICAgcmV0dXJuIHJlc1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAgXHU3OUZCXHU5NjY0XHU1QkEwXHU3MjY5XHJcbiAgICAgICAgICogQHBhcmFtIHRhcmdldEd1aWQgICAgXHU3M0E5XHU1QkI2XHU4OUQyXHU4MjcyZ3VpZFxyXG4gICAgICAgICAqIEBwYXJhbSBwZXRJZCAgICAgICBcdTVCQTBcdTcyNjlndWlkXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyByZW1vdmVQZXQodGFyZ2V0R3VpZDogc3RyaW5nLCBwZXRJZDogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlcyA9IGNhbGxGdW5jKHRoaXMubmFtZSwgdGhpcy5yZW1vdmVQZXQubmFtZSwgdGFyZ2V0R3VpZCwgcGV0SWQpXHJcbiAgICAgICAgICAgIHJldHVybiByZXNcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gXHU5MDQ3XHU1MjMwXHU3MEI5XHU5NUVFXHU5ODk4XHU0RTBEXHU3N0U1XHU5MDUzXHU2MDBFXHU0RTQ4XHU4M0I3XHU1M0Q2XHU1QkEwXHU3MjY5XHU1MjE3XHU4ODY4XHJcbiAgICAgICAgLy8gcHVibGljIHN0YXRpYyBnZXRQZXRzKHRhcmdldEd1aWQ6IHN0cmluZyk6IHN0cmluZ1tdIHtcclxuICAgICAgICAvLyAgICAgY29uc3QgcmVzID0gY2FsbEZ1bmNSZXModGhpcy5uYW1lLCB0aGlzLmdldFBldHMubmFtZSwgdGFyZ2V0R3VpZClcclxuICAgICAgICAvLyAgICAgcmV0dXJuIHJlc1xyXG4gICAgICAgIC8vIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiogXHU4OEM1XHU2MjZFXHU3NkY4XHU1MTczXHU0RThCXHU0RUY2ICovXHJcbiAgICBleHBvcnQgY2xhc3MgUHJlZmFiRXZ0RHJlc3Mge1xyXG4gICAgICAgIC8qKiBcdTYyNTNcdTVGMDBcdTg4QzVcdTYyNkVcdTc1NENcdTk3NjIgKi9cclxuICAgICAgICBwdWJsaWMgc3RhdGljIG9wZW5VSSgpIHtcclxuICAgICAgICAgICAgY2FsbExvY2FsRnVuYyh0aGlzLm5hbWUsIHRoaXMub3BlblVJLm5hbWUpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKiBcdTZERkJcdTUyQTBcdTg4QzVcdTYyNkUgKi9cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGFkZERyZXNzKHRhcmdldEd1aWQ6IHN0cmluZywgZHJlc3NDZmdJZDogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlcyA9IGNhbGxGdW5jKHRoaXMubmFtZSwgdGhpcy5hZGREcmVzcy5uYW1lLCB0YXJnZXRHdWlkLCBkcmVzc0NmZ0lkKVxyXG4gICAgICAgICAgICByZXR1cm4gcmVzXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaW5pdEV2ZW50KClcclxuXHJcbn1cclxuIiwgIi8qXHJcbiogQEF1dGhvcjogY2hlbi5saWFuZyBjaGVuLmxpYW5nQGFwcHNoYWhlLmNvbVxyXG4qIEBEYXRlOiAyMDIzLTA1LTA0IDE0OjE3OjI1XHJcbiogQExhc3RFZGl0b3JzOiBjaGVuLmxpYW5nIGNoZW4ubGlhbmdAYXBwc2hhaGUuY29tXHJcbiogQExhc3RFZGl0VGltZTogMjAyMy0wNy0xOCAxODo0MzoyMVxyXG4qIEBGaWxlUGF0aDogXFxjb21tb25wcmVmYWJcXEphdmFTY3JpcHRzXFxQcmVmYWJzXFxwcmVmYWJFdmVudFxcVXRpbHNcXE1hcEV4LnRzXHJcbiogQERlc2NyaXB0aW9uOiBcclxuKi9cclxuXHJcbmltcG9ydCB7IFByZWZhYkV2ZW50IH0gZnJvbSBcIi4vUHJlZmFiRXZlbnRcIlxyXG4vKipcclxuICogTWFwRXgoXHU1M0VGXHU1RThGXHU1MjE3XHU1MzE2KVxyXG4qL1xyXG5leHBvcnQgbmFtZXNwYWNlIE1hcEV4IHtcclxuXHJcbiAgICBleHBvcnQgdHlwZSBNYXBFeENsYXNzPFQ+ID0ge1xyXG4gICAgICAgIFtrZXk6IHN0cmluZyB8IG51bWJlcl06IFRcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFx1NjYyRlx1NTQyNlx1NEUzQVx1N0E3QVxyXG4gICAgICogQHBhcmFtIG1hcCBcclxuICAgICAqIEByZXR1cm5zIFx1NjYyRi9cdTU0MjYgXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBpc051bGw8VD4obWFwOiBNYXBFeENsYXNzPFQ+KTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuICFtYXAgfHwgbWFwID09IG51bGwgfHwgbWFwID09IHVuZGVmaW5lZFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHU4M0I3XHU1M0Q2XHU1QkY5XHU4QzYxXHJcbiAgICAgKiBAcGFyYW0gbWFwIFxyXG4gICAgICogQHBhcmFtIGtleSBcclxuICAgICAqIEByZXR1cm5zIFxyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gZ2V0PFQ+KG1hcDogTWFwRXhDbGFzczxUPiwga2V5OiBzdHJpbmcgfCBudW1iZXIpOiBUIHtcclxuXHJcbiAgICAgICAgaWYgKG1hcFtrZXldKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtYXBba2V5XVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGhhcyA9IGZhbHNlXHJcbiAgICAgICAgbGV0IGtleXMgPSBPYmplY3Qua2V5cyhtYXApXHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGggOysraSkge1xyXG4gICAgICAgICAgICBpZiAoa2V5c1tpXSA9PSBrZXkpIHtcclxuICAgICAgICAgICAgICAgIGhhcyA9IHRydWVcclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChoYXMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG1hcFtrZXldXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsXHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHU4QkJFXHU3RjZFXHU1QkY5XHU4QzYxXHJcbiAgICAgKiBAcGFyYW0gbWFwIFxyXG4gICAgICogQHBhcmFtIGtleSBcclxuICAgICAqIEBwYXJhbSB2YWwgXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBzZXQ8VD4obWFwOiBNYXBFeENsYXNzPFQ+LCBrZXk6IHN0cmluZyB8IG51bWJlciwgdmFsOiBUKSB7XHJcblxyXG4gICAgICAgIG1hcFtrZXldID0gdmFsXHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHU1MjIwXHU5NjY0XHU1QkY5XHU4QzYxXHJcbiAgICAgKiBAcGFyYW0gbWFwIFxyXG4gICAgICogQHBhcmFtIGtleSBcclxuICAgICAqIEByZXR1cm5zIFx1NjIxMFx1NTI5Ri9cdTU5MzFcdThEMjVcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGRlbDxUPihtYXA6IE1hcEV4Q2xhc3M8VD4sIGtleTogc3RyaW5nIHwgbnVtYmVyKTogYm9vbGVhbiB7XHJcblxyXG4gICAgICAgIGlmIChtYXBba2V5XSkge1xyXG4gICAgICAgICAgICBkZWxldGUgbWFwW2tleV1cclxuICAgICAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBoYXMgPSBmYWxzZVxyXG4gICAgICAgIGxldCBrZXlzID0gT2JqZWN0LmtleXMobWFwKVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgaWYgKGtleXNbaV0gPT0ga2V5KSB7XHJcbiAgICAgICAgICAgICAgICBoYXMgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaGFzKSB7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBtYXBba2V5XVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFx1NjYyRlx1NTQyNlx1NjcwOVx1NjMwN1x1NUI5QVx1NUJGOVx1OEM2MVxyXG4gICAgICogQHBhcmFtIG1hcCBcclxuICAgICAqIEBwYXJhbSBrZXkgXHJcbiAgICAgKiBAcmV0dXJucyBcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGhhczxUPihtYXA6IE1hcEV4Q2xhc3M8VD4sIGtleTogc3RyaW5nIHwgbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKG1hcFtrZXldKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgaGFzID0gZmFsc2VcclxuICAgICAgICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKG1hcClcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAgO2kgPCBrZXlzLmxlbmd0aCA7KytpKSB7XHJcbiAgICAgICAgICAgIGlmIChrZXlzW2ldID09IGtleSkge1xyXG4gICAgICAgICAgICAgICAgaGFzID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGhhcykge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFx1ODNCN1x1NTNENmNvdW50XHU2NTcwXHU5MUNGXHJcbiAgICAgKiBAcGFyYW0gbWFwIFxyXG4gICAgICogQHBhcmFtIGtleSBcclxuICAgICAqIEByZXR1cm5zIFxyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gY291bnQ8VD4obWFwOiBNYXBFeENsYXNzPFQ+KTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgcmVzID0gMFxyXG4gICAgICAgIGZvckVhY2gobWFwLCBlID0+IHtcclxuICAgICAgICAgICAgKytyZXNcclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiByZXNcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFx1OTA0RFx1NTM4Nm1hcFxyXG4gICAgICogQHBhcmFtIG1hcCBcclxuICAgICAqIEBwYXJhbSBjYWxsYmFjayBcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGZvckVhY2g8VD4obWFwOiBNYXBFeENsYXNzPFQ+LCBjYWxsYmFjazogKGtleTogc3RyaW5nIHwgbnVtYmVyLCBlbGVtZW50OiBUKSA9PiB2b2lkKSB7XHJcbiAgICAgICAgZm9yIChsZXQga2V5IGluIG1hcCkge1xyXG4gICAgICAgICAgICBpZiAobWFwW2tleV0pIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGtleSwgbWFwW2tleV0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcdTYyRjdcdThEMURcdUZGMENWYWxcdThGRDhcdTY2MkZcdTVGMTVcdTc1MjhcdTUxRkFcdTY3NjVcdTc2ODRcdUZGMENcdTUzRUFcdTY2MkZNYXBcdTYzNjJcdTRFODZcclxuICAgICAqIEBwYXJhbSBtYXAgXHJcbiAgICAgKiBAcmV0dXJucyBcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGNvcHk8VD4obWFwOiBNYXBFeENsYXNzPFQ+KTogTWFwRXhDbGFzczxUPiB7XHJcbiAgICAgICAgbGV0IHJlcyA9IHt9XHJcbiAgICAgICAgZm9yIChsZXQga2V5IGluIG1hcCkge1xyXG4gICAgICAgICAgICByZXNba2V5XSA9IG1hcFtrZXldXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXNcclxuICAgIH1cclxuXHJcbn1cclxuY2xhc3MgREJTYXZlQmFzZSB7XHJcbiAgICBwdWJsaWMgdmFsdWU6IGFueVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUHJlZmFiRXZlbnRNb2R1bGVEYXRhIGV4dGVuZHMgU3ViZGF0YSB7XHJcblxyXG4gICAgQERlY29yYXRvci5zYXZlUHJvcGVydHlcclxuICAgIHB1YmxpYyBjYWNoZURhdGE6IE1hcEV4Lk1hcEV4Q2xhc3M8c3RyaW5nPiA9IG51bGxcclxuXHJcbiAgICBwcm90ZWN0ZWQgaW5pdERlZmF1bHREYXRhKCk6IHZvaWQge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5jYWNoZURhdGEgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLmNhY2hlRGF0YSA9IHt9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFx1OEJCRVx1N0Y2RVZhbHVlXHJcbiAgICAgKiBAcGFyYW0ga2V5IFxyXG4gICAgICogQHBhcmFtIHZhbCBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldFZhbHVlKGtleTogc3RyaW5nLCB2YWw6IGFueSkge1xyXG4gICAgICAgIGxldCBkYXRhID0gbmV3IERCU2F2ZUJhc2UoKVxyXG4gICAgICAgIGRhdGEudmFsdWUgPSB2YWxcclxuICAgICAgICBsZXQgZGF0YVN0ciA9IEpTT04uc3RyaW5naWZ5KGRhdGEpXHJcbiAgICAgICAgTWFwRXguc2V0KHRoaXMuY2FjaGVEYXRhLCBrZXksIGRhdGFTdHIpXHJcbiAgICAgICAgdGhpcy5zYXZlKHRydWUpXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcdTgzQjdcdTUzRDZWYWx1ZVxyXG4gICAgICogQHBhcmFtIGtleSBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFZhbHVlPFQ+KGtleTogc3RyaW5nKTogVCB7XHJcbiAgICAgICAgaWYgKCFNYXBFeC5oYXModGhpcy5jYWNoZURhdGEsIGtleSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGxcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHZhbHVlID0gTWFwRXguZ2V0KHRoaXMuY2FjaGVEYXRhLCBrZXkpXHJcbiAgICAgICAgbGV0IHJlcyA9IEpTT04ucGFyc2UodmFsdWUpIGFzIERCU2F2ZUJhc2VcclxuICAgICAgICByZXR1cm4gcmVzLnZhbHVlXHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5AQ29yZS5UeXBlXHJcbmNsYXNzIFByZWZhYkV2ZW50QWlycG9ydERhdGEge1xyXG5cclxuICAgIHB1YmxpYyBjYWNoZURhdGE6IE1hcEV4Lk1hcEV4Q2xhc3M8c3RyaW5nPiA9IHt9XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKF9jYWNoZURhdGE/OiBhbnkpIHtcclxuICAgICAgICBpZiAoX2NhY2hlRGF0YSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FjaGVEYXRhID0gX2NhY2hlRGF0YVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFx1OEJCRVx1N0Y2RVZhbHVlXHJcbiAgICAgKiBAcGFyYW0ga2V5IFxyXG4gICAgICogQHBhcmFtIHZhbCBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldFZhbHVlKGtleTogc3RyaW5nLCB2YWw6IGFueSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiW1BGXXNldCBWYWxlIDogXCIgKyBrZXkgKyBcIiA9PiBcIiArIHZhbClcclxuICAgICAgICBsZXQgZGF0YSA9IG5ldyBEQlNhdmVCYXNlKClcclxuICAgICAgICBkYXRhLnZhbHVlID0gdmFsXHJcbiAgICAgICAgbGV0IGRhdGFTdHIgPSBKU09OLnN0cmluZ2lmeShkYXRhKVxyXG4gICAgICAgIE1hcEV4LnNldCh0aGlzLmNhY2hlRGF0YSwga2V5LCBkYXRhU3RyKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHU4M0I3XHU1M0Q2VmFsdWVcclxuICAgICAqIEBwYXJhbSBrZXkgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRWYWx1ZTxUPihrZXk6IHN0cmluZyk6IFQge1xyXG4gICAgICAgIGlmICghTWFwRXguaGFzKHRoaXMuY2FjaGVEYXRhLCBrZXkpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCB2YWx1ZSA9IE1hcEV4LmdldCh0aGlzLmNhY2hlRGF0YSwga2V5KVxyXG4gICAgICAgIGxldCByZXMgPSBKU09OLnBhcnNlKHZhbHVlKSBhcyBEQlNhdmVCYXNlXHJcbiAgICAgICAgcmV0dXJuIHJlcy52YWx1ZVxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFByZWZhYkV2ZW50TW9kdWxlQyBleHRlbmRzIE1vZHVsZUM8UHJlZmFiRXZlbnRNb2R1bGVTLCBQcmVmYWJFdmVudE1vZHVsZURhdGE+IHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFx1N0E3QVx1NEUyRFx1NjU3MFx1NjM2RVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWlyRGF0YTogTWFwRXguTWFwRXhDbGFzczxQcmVmYWJFdmVudEFpcnBvcnREYXRhPiA9IHt9XHJcblxyXG4gICAgb25TdGFydCgpIHtcclxuICAgICAgICBQcmVmYWJFdmVudC5QcmVmYWJFdnRQbGF5ZXJTdGF0Lm9uU2V0UGxheWVyU3RhdCgoc2VuZGVyR3VpZDogc3RyaW5nLCB0YXJnZXRHdWlkOiBzdHJpbmcsIHN0YXQ6IFByZWZhYkV2ZW50LlBsYXllclN0YXRUeXBlKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBjaGFyID0gR2FtZXBsYXkuZ2V0Q3VycmVudFBsYXllcigpLmNoYXJhY3RlclxyXG4gICAgICAgICAgICBpZiAodGFyZ2V0R3VpZCA9PSBjaGFyLmd1aWQpIHtcclxuICAgICAgICAgICAgICAgIC8vbGV0IHByZWZhYkV2ZVVJID0gVUkuVUlNYW5hZ2VyLmluc3RhbmNlLmdldFVJKFByZWZhYkV2dFVJKVxyXG4gICAgICAgICAgICAgICAgaWYgKHN0YXQgPT0gUHJlZmFiRXZlbnQuUGxheWVyU3RhdFR5cGUuRmx5aW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hhci5zd2l0Y2hUb0ZseWluZygpXHJcbiAgICAgICAgICAgICAgICAgICAgLy9VSS5VSU1hbmFnZXIuaW5zdGFuY2Uuc2hvd1VJKHByZWZhYkV2ZVVJKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vcHJlZmFiRXZlVUkuc2V0Rmx5Q2FudmFzKHRydWUpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChzdGF0ID09IFByZWZhYkV2ZW50LlBsYXllclN0YXRUeXBlLldhbGtpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICBjaGFyLnN3aXRjaFRvV2Fsa2luZygpXHJcbiAgICAgICAgICAgICAgICAgICAgLy9VSS5VSU1hbmFnZXIuaW5zdGFuY2UuaGlkZVVJKHByZWZhYkV2ZVVJKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vcHJlZmFiRXZlVUkuc2V0Rmx5Q2FudmFzKGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFx1NTQwQ1x1NkI2NVx1N0E3QVx1NEUyRFx1NjU3MFx1NjM2RVxyXG4gICAgICogQHBhcmFtIGRhdGEgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBuZXRfU3luY0FpckRhdGEoZGF0YTogc3RyaW5nKSB7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiW1BGXSBzeW5jIGFpciBkYXRhIDogXCIgKyBkYXRhKVxyXG4gICAgICAgIHRoaXMuYWlyRGF0YSA9IEpTT04ucGFyc2UoZGF0YSlcclxuICAgICAgICBNYXBFeC5mb3JFYWNoKHRoaXMuYWlyRGF0YSwgKGssIHYpID0+IHtcclxuXHJcbiAgICAgICAgICAgIE1hcEV4LnNldCh0aGlzLmFpckRhdGEsIGssIG5ldyBQcmVmYWJFdmVudEFpcnBvcnREYXRhKHYuY2FjaGVEYXRhKSlcclxuXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcdTU0MENcdTZCNjVcdTY3MERcdTUyQTFcdTU2NjhcdTdBN0FcdTRFMkRcdTY1NzBcdTYzNkVcclxuICAgICAqIEBwYXJhbSB0YXJnZXRHdWlkIFxyXG4gICAgICogQHBhcmFtIGtleSBcclxuICAgICAqIEBwYXJhbSBkYXRhIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbmV0X1NldERhdGEodGFyZ2V0R3VpZDogc3RyaW5nLCBrZXk6IHN0cmluZywgZGF0YTogYW55KSB7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiXHU1QkEyXHU2MjM3XHU3QUVGIG5ldF9TZXREYXRhIDogXCIgKyBrZXkgKyBcIiA9PiBcIiArIGRhdGEpXHJcblxyXG4gICAgICAgIGlmICghTWFwRXguaGFzKHRoaXMuYWlyRGF0YSwgdGFyZ2V0R3VpZCkpIHtcclxuICAgICAgICAgICAgTWFwRXguc2V0KHRoaXMuYWlyRGF0YSwgdGFyZ2V0R3VpZCwgbmV3IFByZWZhYkV2ZW50QWlycG9ydERhdGEobnVsbCkpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIE1hcEV4LmdldCh0aGlzLmFpckRhdGEsIHRhcmdldEd1aWQpLnNldFZhbHVlKGtleSwgZGF0YSlcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcdTgzQjdcdTUzRDZcdTdBN0FcdTRFMkRcdTY1NzBcdTYzNkVcclxuICAgICAqIEBwYXJhbSB0YXJnZXRHdWlkIFxyXG4gICAgICogQHBhcmFtIGtleSBcclxuICAgICAqIEByZXR1cm5zIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0RGF0YTxUPih0YXJnZXRHdWlkOiBzdHJpbmcsIGtleTogc3RyaW5nKTogVCB7XHJcbiAgICAgICAgbGV0IHJlczogVCA9IG51bGxcclxuXHJcbiAgICAgICAgaWYgKCFNYXBFeC5nZXQodGhpcy5haXJEYXRhLCB0YXJnZXRHdWlkKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJlcyA9IE1hcEV4LmdldCh0aGlzLmFpckRhdGEsIHRhcmdldEd1aWQpLmdldFZhbHVlKGtleSkgYXMgVFxyXG5cclxuICAgICAgICByZXR1cm4gcmVzXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAoXHU1M0NDXHU3QUVGKVx1ODNCN1x1NTNENlx1NzNBOVx1NUJCNlx1NEZFMVx1NjA2RlxyXG4gICAgICogQHBhcmFtIHNlbmRlckd1aWQgXHU1M0QxXHU4RDc3XHU1QkY5XHU4QzYxR3VpZFxyXG4gICAgICogQHBhcmFtIHRhcmdldEd1aWQgXHU3NkVFXHU2ODA3XHU1QkY5XHU4QzYxR3VpZFxyXG4gICAgICogQHBhcmFtIHZhbCBcdTUwM0NcclxuICAgICAqIEBwYXJhbSBpbmZvVHlwZSBcdTRGRTFcdTYwNkZcdTdDN0JcdTU3OEJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFBsYXllckluZm8oY2xhenpOYW1lOiBzdHJpbmcsIHRhcmdldEd1aWQ6IHN0cmluZywgaW5mb1R5cGU6IFByZWZhYkV2ZW50LlBsYXllckluZm9UeXBlIHwgc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IGNoYXIgPSBDb3JlLkdhbWVPYmplY3QuZmluZCh0YXJnZXRHdWlkKVxyXG4gICAgICAgIGlmIChjaGFyIGluc3RhbmNlb2YgR2FtZXBsYXkuQ2hhcmFjdGVyKSB7XHJcbiAgICAgICAgICAgIGlmIChjaGFyLnBsYXllcikge1xyXG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gdGhpcy5kYXRhPy5nZXRWYWx1ZShjbGF6ek5hbWUgKyBpbmZvVHlwZSlcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2codmFsdWUgKyBcIjpcIiArIGNsYXp6TmFtZSArIGluZm9UeXBlKVxyXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlID09IG51bGwpIHZhbHVlID0gMFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGxcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFx1ODNCN1x1NTNENlx1NzNBOVx1NUJCNlx1NUM1RVx1NjAyN1xyXG4gICAgICogQHBhcmFtIHRhcmdldEd1aWQgXHJcbiAgICAgKiBAcGFyYW0gdmFsIFxyXG4gICAgICogQHBhcmFtIGF0dHJUeXBlIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0QXR0clZhbChjbGF6ek5hbWU6IHN0cmluZywgdGFyZ2V0R3VpZDogc3RyaW5nLCBhdHRyVHlwZTogUHJlZmFiRXZlbnQuQXR0clR5cGUpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBjdXJWYWwgPSB0aGlzLmdldERhdGE8bnVtYmVyPih0YXJnZXRHdWlkLCBjbGF6ek5hbWUgKyBhdHRyVHlwZSlcclxuICAgICAgICBpZiAoY3VyVmFsID09IG51bGwpIGN1clZhbCA9IDBcclxuICAgICAgICAvL2NvbnNvbGUuZXJyb3IoXCJcdTgzQjdcdTUzRDZcdTczQTlcdTVCQjZcdTVDNUVcdTYwMjcgOiBcIiArIGF0dHJUeXBlICsgXCIgOiBcIiArIGN1clZhbClcclxuICAgICAgICByZXR1cm4gY3VyVmFsXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIFx1ODNCN1x1NTNENlx1NzNBOVx1NUJCNlx1NzJCNlx1NjAwMVxyXG4gICAgKiBAcGFyYW0gY2xhenpOYW1lIFxyXG4gICAgKiBAcGFyYW0gdGFyZ2V0R3VpZCBcclxuICAgICogQHJldHVybnMgXHJcbiAgICAqL1xyXG4gICAgcHVibGljIGdldFBsYXllclN0YXQoY2xhenpOYW1lOiBzdHJpbmcsIHRhcmdldEd1aWQ6IHN0cmluZykge1xyXG4gICAgICAgIGxldCBjdXJWYWwgPSB0aGlzLmdldERhdGEoY2xhenpOYW1lLCB0YXJnZXRHdWlkKVxyXG4gICAgICAgIGlmIChjdXJWYWwgPT0gbnVsbCkgY3VyVmFsID0gMFxyXG4gICAgICAgIC8vY29uc29sZS5lcnJvcihcIlx1ODNCN1x1NTNENlx1NzNBOVx1NUJCNlx1NzJCNlx1NjAwMSA6IFwiICsgY3VyVmFsKVxyXG4gICAgICAgIHJldHVybiBjdXJWYWxcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIChcdTUzQ0NcdTdBRUYpXHU4M0I3XHU1M0Q2XHU1MTczXHU1MzYxXHJcbiAgICAgKiBAcGFyYW0gdGFyZ2V0R3VpZCBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFJlY29yZFBvaW50KGNsYXp6TmFtZTogc3RyaW5nLCB0YXJnZXRHdWlkOiBzdHJpbmcpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBjaGFyID0gQ29yZS5HYW1lT2JqZWN0LmZpbmQodGFyZ2V0R3VpZClcclxuICAgICAgICBpZiAoY2hhciBpbnN0YW5jZW9mIEdhbWVwbGF5LkNoYXJhY3Rlcikge1xyXG4gICAgICAgICAgICBpZiAoY2hhci5wbGF5ZXIpIHtcclxuICAgICAgICAgICAgICAgIGxldCBkYnZhbCA9IHRoaXMuZGF0YT8uZ2V0VmFsdWUoY2xhenpOYW1lICsgXCJyZWNvcmRcIikgYXMgbnVtYmVyXHJcbiAgICAgICAgICAgICAgICBpZiAoZGJ2YWwgPT0gbnVsbCkgZGJ2YWwgPSAwXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGJ2YWxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFx1ODNCN1x1NTNENlx1NUY1M1x1NTI0RFx1NzY4NFx1OEQyN1x1NUUwMVx1NjU3MFx1NzZFRVxyXG4gICAgICogQHBhcmFtIGNsYXp6TmFtZSBcclxuICAgICAqIEBwYXJhbSB0YXJnZXRHdWlkIFxyXG4gICAgICogQHBhcmFtIGN1cnJlbmN5SWQgXHJcbiAgICAgKiBAcmV0dXJucyBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldEN1cnJlbmN5TnVtKGNsYXp6TmFtZTogc3RyaW5nLCB0YXJnZXRHdWlkOiBzdHJpbmcsIGN1cnJlbmN5SWQ6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IGNoYXIgPSBDb3JlLkdhbWVPYmplY3QuZmluZCh0YXJnZXRHdWlkKVxyXG4gICAgICAgIGlmIChjaGFyIGluc3RhbmNlb2YgR2FtZXBsYXkuQ2hhcmFjdGVyKSB7XHJcbiAgICAgICAgICAgIGlmIChjaGFyLnBsYXllcikge1xyXG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gdGhpcy5kYXRhPy5nZXRWYWx1ZShjbGF6ek5hbWUgKyBjdXJyZW5jeUlkKSBhcyBudW1iZXJcclxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PSBudWxsKSB2YWx1ZSA9IDBcclxuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcdTc1MjhcdThEMjdcdTVFMDFcdTRFNzBcdTRFMUNcdTg5N0ZcclxuICAgICAqIEBwYXJhbSB0YXJnZXRHdWlkIFx1OEQyRFx1NEU3MFx1ODAwNVxyXG4gICAgICogQHBhcmFtIGN1cnJlbmN5SWQgXHU4RDI3XHU1RTAxaWRcclxuICAgICAqIEBwYXJhbSBwcmljZSBcdTRFRjdcdTY4M0NcclxuICAgICAqIEByZXR1cm5zIFx1NjYyRlx1NTQyNlx1OEQyRFx1NEU3MFx1NjIxMFx1NTI5RlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXN5bmMgYnV5V2l0aEN1cnJlbmN5KHRhcmdldEd1aWQ6IHN0cmluZywgY3VycmVuY3lJZDogbnVtYmVyLCBwcmljZTogbnVtYmVyKTogUHJvbWlzZTxib29sZWFuPiB7XHJcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuc2VydmVyLm5ldF9CdXlXaXRoQ3VycmVuY3kodGFyZ2V0R3VpZCwgY3VycmVuY3lJZCwgcHJpY2UpXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBQcmVmYWJFdmVudE1vZHVsZVMgZXh0ZW5kcyBNb2R1bGVTPFByZWZhYkV2ZW50TW9kdWxlQywgUHJlZmFiRXZlbnRNb2R1bGVEYXRhPiB7XHJcblxyXG4gICAgcHVibGljIGFpckRhdGE6IE1hcEV4Lk1hcEV4Q2xhc3M8UHJlZmFiRXZlbnRBaXJwb3J0RGF0YT4gPSB7fVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHU3M0E5XHU1QkI2XHU4RkRCXHU1MTY1XHU2RTM4XHU2MjBGXHJcbiAgICAgKiBAcGFyYW0gcGxheWVyIFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgb25QbGF5ZXJFbnRlckdhbWUocGxheWVyOiBHYW1lcGxheS5QbGF5ZXIpOiB2b2lkIHtcclxuICAgICAgICAvLyBcdTU0MENcdTZCNjVcdTRFMDBcdTZCMjFcdTdBN0FcdTRFMkRcdTY1NzBcdTYzNkVcclxuICAgICAgICB0aGlzLmdldENsaWVudChwbGF5ZXIpLm5ldF9TeW5jQWlyRGF0YShKU09OLnN0cmluZ2lmeSh0aGlzLmFpckRhdGEpKVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvblBsYXllckxlZnQocGxheWVyOiBHYW1lcGxheS5QbGF5ZXIpOiB2b2lkIHtcclxuICAgICAgICBpZiAoTWFwRXguaGFzKHRoaXMuYWlyRGF0YSwgcGxheWVyLmNoYXJhY3Rlci5ndWlkKSkge1xyXG4gICAgICAgICAgICBNYXBFeC5kZWwodGhpcy5haXJEYXRhLCBwbGF5ZXIuY2hhcmFjdGVyLmd1aWQpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFx1OEJCRVx1N0Y2RVx1NzNBOVx1NUJCNlx1N0E3QVx1NEUyRFx1NjU3MFx1NjM2RVxyXG4gICAgICogQHBhcmFtIHRhcmdldEd1aWQgXHJcbiAgICAgKiBAcGFyYW0ga2V5IFxyXG4gICAgICogQHBhcmFtIGRhdGEgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXREYXRhPFQ+KHRhcmdldEd1aWQ6IHN0cmluZywga2V5OiBzdHJpbmcsIGRhdGE6IFQpIHtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJbUEY6XW5ldF9TZXREYXRhXCIpXHJcbiAgICAgICAgdGhpcy5nZXRBbGxDbGllbnQoKS5uZXRfU2V0RGF0YSh0YXJnZXRHdWlkLCBrZXksIGRhdGEpXHJcblxyXG4gICAgICAgIGlmICghTWFwRXguaGFzKHRoaXMuYWlyRGF0YSwgdGFyZ2V0R3VpZCkpIHtcclxuICAgICAgICAgICAgTWFwRXguc2V0KHRoaXMuYWlyRGF0YSwgdGFyZ2V0R3VpZCwgbmV3IFByZWZhYkV2ZW50QWlycG9ydERhdGEoKSlcclxuICAgICAgICB9XHJcbiAgICAgICAgTWFwRXguZ2V0KHRoaXMuYWlyRGF0YSwgdGFyZ2V0R3VpZCkuc2V0VmFsdWUoa2V5LCBkYXRhKVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFx1ODNCN1x1NTNENlx1NzNBOVx1NUJCNlx1N0E3QVx1NEUyRFx1NjU3MFx1NjM2RVxyXG4gICAgICogQHBhcmFtIHRhcmdldEd1aWQgXHJcbiAgICAgKiBAcGFyYW0ga2V5IFxyXG4gICAgICogQHJldHVybnMgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXREYXRhPFQ+KHRhcmdldEd1aWQ6IHN0cmluZywga2V5OiBzdHJpbmcpOiBUIHtcclxuICAgICAgICBsZXQgcmVzOiBUID0gbnVsbFxyXG5cclxuICAgICAgICBpZiAoIU1hcEV4LmdldCh0aGlzLmFpckRhdGEsIHRhcmdldEd1aWQpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZXNcclxuICAgICAgICB9XHJcbiAgICAgICAgcmVzID0gTWFwRXguZ2V0KHRoaXMuYWlyRGF0YSwgdGFyZ2V0R3VpZCkuZ2V0VmFsdWUoa2V5KSBhcyBUXHJcblxyXG4gICAgICAgIHJldHVybiByZXNcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFx1NUU3Rlx1NjRBRFx1NEU4Qlx1NEVGNlxyXG4gICAgICogQHBhcmFtIGNsYXp6TmFtZSBcclxuICAgICAqIEBwYXJhbSBmdW5jTmFtZSBcclxuICAgICAqIEBwYXJhbSBwYXJhbXMgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBub3RpZnkoY2xhenpOYW1lOiBzdHJpbmcsIGZ1bmNOYW1lOiBzdHJpbmcsIC4uLnBhcmFtczogYW55W10pIHtcclxuICAgICAgICBFdmVudHMuZGlzcGF0Y2hUb0FsbENsaWVudChQcmVmYWJFdmVudC5fb25FdmVudE5ldEtleSwgY2xhenpOYW1lLCBmdW5jTmFtZSwgLi4ucGFyYW1zKVxyXG4gICAgICAgIEV2ZW50cy5kaXNwYXRjaExvY2FsKFByZWZhYkV2ZW50Ll9vbkV2ZW50S2V5ICsgXCI6XCIgKyBjbGF6ek5hbWUgKyBcIjpcIiArIGZ1bmNOYW1lLCAuLi5wYXJhbXMpXHJcbiAgICAgICAgY29uc29sZS5sb2coUHJlZmFiRXZlbnQuX29uRXZlbnRLZXkgKyBcIjpcIiArIGNsYXp6TmFtZSArIFwiOlwiICsgZnVuY05hbWUsIC4uLnBhcmFtcylcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAoXHU1M0NDXHU3QUVGKVx1NkRGQlx1NTJBMFx1NUM1RVx1NjAyN1xyXG4gICAgICogQHBhcmFtIHNlbmRlckd1aWQgXHU1M0QxXHU4RDc3XHU1QkY5XHU4QzYxR3VpZFxyXG4gICAgICogQHBhcmFtIHRhcmdldEd1aWQgXHU3NkVFXHU2ODA3XHU1QkY5XHU4QzYxR3VpZFxyXG4gICAgICogQHBhcmFtIHZhbCBcdTUwM0NcclxuICAgICAqIEBwYXJhbSBhdHRyVHlwZSBcdTVDNUVcdTYwMjdcdTdDN0JcdTU3OEJcclxuICAgICAqL1xyXG4gICAgcHVibGljIG9uU2V0QXR0clZhbChjbGF6ek5hbWU6IHN0cmluZywgc2VuZGVyR3VpZDogc3RyaW5nLCB0YXJnZXRHdWlkOiBzdHJpbmcsIHZhbDogbnVtYmVyLCBhdHRyVHlwZTogUHJlZmFiRXZlbnQuQXR0clR5cGUpIHtcclxuICAgICAgICBsZXQgY3VyVmFsID0gMFxyXG5cclxuICAgICAgICBjdXJWYWwgPSB2YWxcclxuXHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHRhcmdldEd1aWQsIGNsYXp6TmFtZSArIGF0dHJUeXBlLCBjdXJWYWwpXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJbUEY6XVx1OEJCRVx1N0Y2RVx1NzNBOVx1NUJCNlx1NUM1RVx1NjAyNyA6IFwiICsgYXR0clR5cGUgKyBcIiA6IFwiICsgY3VyVmFsKVxyXG4gICAgICAgIGxldCBjaGFyID0gQ29yZS5HYW1lT2JqZWN0LmZpbmQodGFyZ2V0R3VpZClcclxuXHJcbiAgICAgICAgaWYgKGNoYXIgaW5zdGFuY2VvZiBHYW1lcGxheS5DaGFyYWN0ZXIpIHtcclxuICAgICAgICAgICAgaWYgKGF0dHJUeXBlID09IFByZWZhYkV2ZW50LkF0dHJUeXBlLkp1bXApIHtcclxuICAgICAgICAgICAgICAgIGNoYXIubWF4SnVtcEhlaWdodCA9IGN1clZhbFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChhdHRyVHlwZSA9PSBQcmVmYWJFdmVudC5BdHRyVHlwZS5TcGVlZCkge1xyXG4gICAgICAgICAgICAgICAgY2hhci5tYXhXYWxrU3BlZWQgPSBjdXJWYWxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5ub3RpZnkoY2xhenpOYW1lLCBQcmVmYWJFdmVudC5QcmVmYWJFdnRBdHRyLm9uQ2hhbmdlQXR0clZhbC5uYW1lLCBzZW5kZXJHdWlkLCB0YXJnZXRHdWlkLCBjdXJWYWwsIGF0dHJUeXBlKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHU2REZCXHU1MkEwXHU1QzVFXHU2MDI3XHJcbiAgICAgKiBAcGFyYW0gc2VuZGVyR3VpZCBcdTUzRDFcdThENzdcdTVCRjlcdThDNjFHdWlkXHJcbiAgICAgKiBAcGFyYW0gdGFyZ2V0R3VpZCBcdTc2RUVcdTY4MDdcdTVCRjlcdThDNjFHdWlkXHJcbiAgICAgKiBAcGFyYW0gdmFsIFx1NTAzQ1xyXG4gICAgICogQHBhcmFtIGF0dHJUeXBlIFx1NUM1RVx1NjAyN1x1N0M3Qlx1NTc4QlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb25BZGRBdHRyVmFsKGNsYXp6TmFtZTogc3RyaW5nLCBzZW5kZXJHdWlkOiBzdHJpbmcsIHRhcmdldEd1aWQ6IHN0cmluZywgdmFsOiBudW1iZXIsIGF0dHJUeXBlOiBQcmVmYWJFdmVudC5BdHRyVHlwZSkge1xyXG5cclxuICAgICAgICBsZXQgY3VyVmFsID0gdGhpcy5nZXREYXRhPG51bWJlcj4odGFyZ2V0R3VpZCwgY2xhenpOYW1lICsgYXR0clR5cGUpXHJcbiAgICAgICAgaWYgKGN1clZhbCA9PSBudWxsKSBjdXJWYWwgPSAwXHJcblxyXG4gICAgICAgIGN1clZhbCArPSB2YWxcclxuXHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHRhcmdldEd1aWQsIGNsYXp6TmFtZSArIGF0dHJUeXBlLCBjdXJWYWwpXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJbUEY6XVx1OEJCRVx1N0Y2RVx1NzNBOVx1NUJCNlx1NUM1RVx1NjAyNyA6IFwiICsgYXR0clR5cGUgKyBcIiA6IFwiICsgY3VyVmFsKVxyXG4gICAgICAgIGxldCBjaGFyID0gQ29yZS5HYW1lT2JqZWN0LmZpbmQodGFyZ2V0R3VpZClcclxuXHJcbiAgICAgICAgaWYgKGNoYXIgaW5zdGFuY2VvZiBHYW1lcGxheS5DaGFyYWN0ZXIpIHtcclxuICAgICAgICAgICAgaWYgKGF0dHJUeXBlID09IFByZWZhYkV2ZW50LkF0dHJUeXBlLkp1bXApIHtcclxuICAgICAgICAgICAgICAgIGNoYXIubWF4SnVtcEhlaWdodCA9IGN1clZhbFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChhdHRyVHlwZSA9PSBQcmVmYWJFdmVudC5BdHRyVHlwZS5TcGVlZCkge1xyXG4gICAgICAgICAgICAgICAgY2hhci5tYXhXYWxrU3BlZWQgPSBjdXJWYWxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5ub3RpZnkoY2xhenpOYW1lLCBQcmVmYWJFdmVudC5QcmVmYWJFdnRBdHRyLm9uQ2hhbmdlQXR0clZhbC5uYW1lLCBzZW5kZXJHdWlkLCB0YXJnZXRHdWlkLCBjdXJWYWwsIGF0dHJUeXBlKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHU4M0I3XHU1M0Q2XHU1QzVFXHU2MDI3XHJcbiAgICAgKiBAcGFyYW0gdGFyZ2V0R3VpZCBcclxuICAgICAqIEBwYXJhbSB2YWwgXHJcbiAgICAgKiBAcGFyYW0gYXR0clR5cGUgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRBdHRyVmFsKGNsYXp6TmFtZTogc3RyaW5nLCB0YXJnZXRHdWlkOiBzdHJpbmcsIGF0dHJUeXBlOiBQcmVmYWJFdmVudC5BdHRyVHlwZSk6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IGN1clZhbCA9IHRoaXMuZ2V0RGF0YTxudW1iZXI+KHRhcmdldEd1aWQsIGNsYXp6TmFtZSArIGF0dHJUeXBlKVxyXG4gICAgICAgIGlmIChjdXJWYWwgPT0gbnVsbCkgY3VyVmFsID0gMFxyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJbUEY6XVx1ODNCN1x1NTNENlx1NzNBOVx1NUJCNlx1NUM1RVx1NjAyNyA6IFwiICsgYXR0clR5cGUgKyBcIiA6IFwiICsgY3VyVmFsKVxyXG4gICAgICAgIHJldHVybiBjdXJWYWxcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIChcdTUzQ0NcdTdBRUYpIFx1N0E3Rlx1NjIzNFx1ODhDNVx1NTkwN1xyXG4gICAgICogQHBhcmFtIHRhcmdldEd1aWQgXHU1QkY5XHU4QzYxR3VpZFxyXG4gICAgICogQHBhcmFtIHNsb3QgXHU2OUZEXHU0RjREXHJcbiAgICAgKiBAcGFyYW0gZXF1aXBHdWlkIFx1ODhDNVx1NTkwN0d1aWRcclxuICAgICAqL1xyXG4gICAgcHVibGljIG9uRXF1aXAoY2xhenpOYW1lOiBzdHJpbmcsIHRhcmdldEd1aWQ6IHN0cmluZywgc2xvdDogUHJlZmFiRXZlbnQuRXF1aXBTbG90LCBlcXVpcEd1aWQ6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh0YXJnZXRHdWlkLCBjbGF6ek5hbWUgKyBzbG90LCBlcXVpcEd1aWQpXHJcbiAgICAgICAgdGhpcy5ub3RpZnkoY2xhenpOYW1lLCB0aGlzLm9uRXF1aXAubmFtZSwgdGFyZ2V0R3VpZCwgc2xvdCwgZXF1aXBHdWlkKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogKFx1NTNDQ1x1N0FFRilcdThCQkVcdTdGNkVcdTVDNUVcdTYwMjdcclxuICAgICAqIEBwYXJhbSBzZW5kZXJHdWlkIFx1NTNEMVx1OEQ3N1x1NUJGOVx1OEM2MUd1aWRcclxuICAgICAqIEBwYXJhbSB0YXJnZXRHdWlkIFx1NzZFRVx1NjgwN1x1NUJGOVx1OEM2MUd1aWRcclxuICAgICAqIEBwYXJhbSB2YWwgXHU1MDNDXHJcbiAgICAgKiBAcGFyYW0gaW5mb1R5cGUgXHU0RkUxXHU2MDZGXHU3QzdCXHU1NzhCXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvblNldFBsYXllckluZm8oY2xhenpOYW1lOiBzdHJpbmcsIHNlbmRlckd1aWQ6IHN0cmluZywgdGFyZ2V0R3VpZDogc3RyaW5nLCB2YWw6IG51bWJlciwgaW5mb1R5cGU6IFByZWZhYkV2ZW50LlBsYXllckluZm9UeXBlIHwgc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IGNoYXIgPSBDb3JlLkdhbWVPYmplY3QuZmluZCh0YXJnZXRHdWlkKVxyXG4gICAgICAgIGlmIChjaGFyIGluc3RhbmNlb2YgR2FtZXBsYXkuQ2hhcmFjdGVyKSB7XHJcbiAgICAgICAgICAgIGlmIChjaGFyLnBsYXllcikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRQbGF5ZXJEYXRhKGNoYXIucGxheWVyLmdldFBsYXllcklEKCkpLnNldFZhbHVlKGNsYXp6TmFtZSArIGluZm9UeXBlLCB2YWwpXHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vdGlmeShjbGF6ek5hbWUsIHRoaXMub25TZXRQbGF5ZXJJbmZvLm5hbWUsIHNlbmRlckd1aWQsIHRhcmdldEd1aWQsIHZhbCwgaW5mb1R5cGUpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAoXHU1M0NDXHU3QUVGKVx1ODNCN1x1NTNENlx1NUM1RVx1NjAyN1xyXG4gICAgICogQHBhcmFtIHNlbmRlckd1aWQgXHU1M0QxXHU4RDc3XHU1QkY5XHU4QzYxR3VpZFxyXG4gICAgICogQHBhcmFtIHRhcmdldEd1aWQgXHU3NkVFXHU2ODA3XHU1QkY5XHU4QzYxR3VpZFxyXG4gICAgICogQHBhcmFtIHZhbCBcdTUwM0NcclxuICAgICAqIEBwYXJhbSBpbmZvVHlwZSBcdTRGRTFcdTYwNkZcdTdDN0JcdTU3OEJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFBsYXllckluZm8oY2xhenpOYW1lOiBzdHJpbmcsIHRhcmdldEd1aWQ6IHN0cmluZywgaW5mb1R5cGU6IFByZWZhYkV2ZW50LlBsYXllckluZm9UeXBlIHwgc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IGNoYXIgPSBDb3JlLkdhbWVPYmplY3QuZmluZCh0YXJnZXRHdWlkKVxyXG4gICAgICAgIGlmIChjaGFyIGluc3RhbmNlb2YgR2FtZXBsYXkuQ2hhcmFjdGVyKSB7XHJcbiAgICAgICAgICAgIGlmIChjaGFyLnBsYXllcikge1xyXG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gdGhpcy5nZXRQbGF5ZXJEYXRhKGNoYXIucGxheWVyLmdldFBsYXllcklEKCkpLmdldFZhbHVlKGNsYXp6TmFtZSArIGluZm9UeXBlKVxyXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlID09IG51bGwpIHZhbHVlID0gMFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGxcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIChcdTUzQ0NcdTdBRUYpXHU2REZCXHU1MkEwXHU1QzVFXHU2MDI3XHJcbiAgICAgKiBAcGFyYW0gc2VuZGVyR3VpZCBcdTUzRDFcdThENzdcdTVCRjlcdThDNjFHdWlkXHJcbiAgICAgKiBAcGFyYW0gdGFyZ2V0R3VpZCBcdTc2RUVcdTY4MDdcdTVCRjlcdThDNjFHdWlkXHJcbiAgICAgKiBAcGFyYW0gdmFsIFx1NTAzQ1xyXG4gICAgICogQHBhcmFtIGluZm9UeXBlIFx1NEZFMVx1NjA2Rlx1N0M3Qlx1NTc4QlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb25BZGRQbGF5ZXJJbmZvKGNsYXp6TmFtZTogc3RyaW5nLCBzZW5kZXJHdWlkOiBzdHJpbmcsIHRhcmdldEd1aWQ6IHN0cmluZywgdmFsOiBudW1iZXIsIGluZm9UeXBlOiBQcmVmYWJFdmVudC5QbGF5ZXJJbmZvVHlwZSB8IHN0cmluZykge1xyXG5cclxuICAgICAgICBsZXQgY2hhciA9IENvcmUuR2FtZU9iamVjdC5maW5kKHRhcmdldEd1aWQpXHJcbiAgICAgICAgaWYgKGNoYXIgaW5zdGFuY2VvZiBHYW1lcGxheS5DaGFyYWN0ZXIpIHtcclxuICAgICAgICAgICAgaWYgKGNoYXIucGxheWVyKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGJ2YWwgPSB0aGlzLmdldFBsYXllckluZm8oY2xhenpOYW1lLCB0YXJnZXRHdWlkLCBpbmZvVHlwZSlcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZGJ2YWwgPT0gbnVsbCB8fCAhTnVtYmVyLmlzTmFOKGRidmFsKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBuVmFsID0gZGJ2YWwgYXMgdW5rbm93biBhcyBudW1iZXJcclxuICAgICAgICAgICAgICAgICAgICBuVmFsICs9IHZhbFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25TZXRQbGF5ZXJJbmZvKGNsYXp6TmFtZSwgc2VuZGVyR3VpZCwgdGFyZ2V0R3VpZCwgblZhbCwgaW5mb1R5cGUpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZnkoY2xhenpOYW1lLCB0aGlzLm9uQWRkUGxheWVySW5mby5uYW1lLCBzZW5kZXJHdWlkLCB0YXJnZXRHdWlkLCB2YWwsIGluZm9UeXBlKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogKFx1NTNDQ1x1N0FFRilcdThCQkVcdTdGNkVcdTUxNzNcdTUzNjFcclxuICAgICAqIEBwYXJhbSBzZW5kZXJHdWlkIFx1NTNEMVx1OTAwMVx1ODAwNUd1aWRcclxuICAgICAqIEBwYXJhbSB0YXJnZXRHdWlkIFx1NzZFRVx1NjgwN0d1aWRcclxuICAgICAqIEBwYXJhbSByZWNvcmRQb2ludElkIFx1OEJCMFx1NUY1NVx1NzBCOWlkXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvblNldFJlY29yZFBvaW50KGNsYXp6TmFtZTogc3RyaW5nLCBzZW5kZXJHdWlkOiBzdHJpbmcsIHRhcmdldEd1aWQ6IHN0cmluZywgcmVjb3JkUG9pbnRJZDogbnVtYmVyLCBzYXZlREI6IGJvb2xlYW4pIHtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJbUEY6XW9uU2V0UmVjb3JkUG9pbnQgOiBcIiArIGNsYXp6TmFtZSArIFwiX1wiICsgc2VuZGVyR3VpZClcclxuXHJcbiAgICAgICAgbGV0IGNoYXIgPSBDb3JlLkdhbWVPYmplY3QuZmluZCh0YXJnZXRHdWlkKVxyXG4gICAgICAgIGlmIChjaGFyIGluc3RhbmNlb2YgR2FtZXBsYXkuQ2hhcmFjdGVyKSB7XHJcbiAgICAgICAgICAgIGlmIChjaGFyLnBsYXllcikge1xyXG4gICAgICAgICAgICAgICAgaWYgKHNhdmVEQilcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFBsYXllckRhdGEoY2hhci5wbGF5ZXIuZ2V0UGxheWVySUQoKSk/LnNldFZhbHVlKGNsYXp6TmFtZSArIFwicmVjb3JkXCIsIHJlY29yZFBvaW50SWQpXHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vdGlmeShjbGF6ek5hbWUsIHRoaXMub25TZXRSZWNvcmRQb2ludC5uYW1lLCBzZW5kZXJHdWlkLCB0YXJnZXRHdWlkLCByZWNvcmRQb2ludElkKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIChcdTUzQ0NcdTdBRUYpXHU4M0I3XHU1M0Q2XHU1MTczXHU1MzYxXHJcbiAgICAgKiBAcGFyYW0gdGFyZ2V0R3VpZCBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFJlY29yZFBvaW50KGNsYXp6TmFtZTogc3RyaW5nLCB0YXJnZXRHdWlkOiBzdHJpbmcpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBjaGFyID0gQ29yZS5HYW1lT2JqZWN0LmZpbmQodGFyZ2V0R3VpZClcclxuICAgICAgICBpZiAoY2hhciBpbnN0YW5jZW9mIEdhbWVwbGF5LkNoYXJhY3Rlcikge1xyXG4gICAgICAgICAgICBpZiAoY2hhci5wbGF5ZXIpIHtcclxuICAgICAgICAgICAgICAgIGxldCBkYnZhbCA9IHRoaXMuZ2V0UGxheWVyRGF0YShjaGFyLnBsYXllci5nZXRQbGF5ZXJJRCgpKT8uZ2V0VmFsdWUoY2xhenpOYW1lICsgXCJyZWNvcmRcIikgYXMgbnVtYmVyXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGJ2YWxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIChcdTUzQ0NcdTdBRUYpXHU4M0I3XHU1Rjk3XHU2NTM2XHU5NkM2XHU3MjY5XHJcbiAgICAgKiBAcGFyYW0gc2VuZGVyR3VpZCBcclxuICAgICAqIEBwYXJhbSB0YXJnZXRHdWlkIFxyXG4gICAgICogQHBhcmFtIGF0bGFzSWQgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvbkFkZENvbGxlY3Rpb24oY2xhenpOYW1lOiBzdHJpbmcsIGF0bGFzSWQ6IHN0cmluZywgY2hhckd1aWQ6IHN0cmluZykge1xyXG4gICAgICAgIGxldCBjaGFyID0gQ29yZS5HYW1lT2JqZWN0LmZpbmQoY2hhckd1aWQpXHJcbiAgICAgICAgaWYgKGNoYXIgaW5zdGFuY2VvZiBHYW1lcGxheS5DaGFyYWN0ZXIpIHtcclxuICAgICAgICAgICAgaWYgKGNoYXIucGxheWVyKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGIgPSB0aGlzLmdldFBsYXllckRhdGEoY2hhci5wbGF5ZXIuZ2V0UGxheWVySUQoKSlcclxuICAgICAgICAgICAgICAgIGlmIChkYikge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkYnZhbCA9IGRiLmdldFZhbHVlKGNsYXp6TmFtZSArIFwiYXRsYXNJdGVtXCIpIGFzIHN0cmluZ1tdXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFkYnZhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYnZhbCA9IFtdXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYnZhbC5pbmRleE9mKGF0bGFzSWQpID09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRidmFsLnB1c2goYXRsYXNJZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGIuc2V0VmFsdWUoY2xhenpOYW1lICsgXCJhdGxhc0l0ZW1cIiwgZGJ2YWwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZ5KGNsYXp6TmFtZSwgdGhpcy5vbkFkZENvbGxlY3Rpb24ubmFtZSwgYXRsYXNJZCwgY2hhckd1aWQpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHU4M0I3XHU1M0Q2XHU2MjQwXHU2NzA5XHU2NTM2XHU5NkM2XHU3MjY5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRBbGxDb2xsZWN0aW9uKGNsYXp6TmFtZTogc3RyaW5nLCBjaGFyR3VpZDogc3RyaW5nKTogc3RyaW5nW10ge1xyXG5cclxuICAgICAgICBsZXQgY2hhciA9IENvcmUuR2FtZU9iamVjdC5maW5kKGNoYXJHdWlkKVxyXG4gICAgICAgIGlmIChjaGFyIGluc3RhbmNlb2YgR2FtZXBsYXkuQ2hhcmFjdGVyKSB7XHJcbiAgICAgICAgICAgIGlmIChjaGFyLnBsYXllcikge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRidmFsID0gdGhpcy5nZXRQbGF5ZXJEYXRhKGNoYXIucGxheWVyLmdldFBsYXllcklEKCkpPy5nZXRWYWx1ZShjbGF6ek5hbWUgKyBcImF0bGFzSXRlbVwiKSBhcyBzdHJpbmdbXVxyXG4gICAgICAgICAgICAgICAgbGV0IHJlcyA9IFtdXHJcbiAgICAgICAgICAgICAgICBpZiAoZGJ2YWwpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXMucHVzaCguLi5kYnZhbClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiByZXNcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFx1ODNCN1x1NTNENlx1NzNBOVx1NUJCNlx1NzJCNlx1NjAwMVxyXG4gICAgICogQHBhcmFtIGNsYXp6TmFtZSBcclxuICAgICAqIEBwYXJhbSB0YXJnZXRHdWlkIFxyXG4gICAgICogQHJldHVybnMgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRQbGF5ZXJTdGF0KGNsYXp6TmFtZTogc3RyaW5nLCB0YXJnZXRHdWlkOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgY3VyVmFsID0gdGhpcy5nZXREYXRhKGNsYXp6TmFtZSwgdGFyZ2V0R3VpZClcclxuICAgICAgICBpZiAoY3VyVmFsID09IG51bGwpIGN1clZhbCA9IDBcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiW1BGOl1cdTgzQjdcdTUzRDZcdTczQTlcdTVCQjZcdTcyQjZcdTYwMDEgOiBcIiArIGN1clZhbClcclxuICAgICAgICByZXR1cm4gY3VyVmFsXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAoXHU1M0NDXHU3QUVGKVx1OEJCRVx1N0Y2RVx1NUM1RVx1NjAyN1xyXG4gICAgICogQHBhcmFtIHNlbmRlckd1aWQgXHU1M0QxXHU4RDc3XHU1QkY5XHU4QzYxR3VpZFxyXG4gICAgICogQHBhcmFtIHRhcmdldEd1aWQgXHU3NkVFXHU2ODA3XHU1QkY5XHU4QzYxR3VpZFxyXG4gICAgICogQHBhcmFtIHZhbCBcdTUwM0NcclxuICAgICAqIEBwYXJhbSBpbmZvVHlwZSBcdTRGRTFcdTYwNkZcdTdDN0JcdTU3OEJcclxuICAgICAqL1xyXG4gICAgcHVibGljIG9uU2V0UGxheWVyU3RhdChjbGF6ek5hbWU6IHN0cmluZywgc2VuZGVyR3VpZDogc3RyaW5nLCB0YXJnZXRHdWlkOiBzdHJpbmcsIHN0YXRUeXBlOiBQcmVmYWJFdmVudC5QbGF5ZXJTdGF0VHlwZSkge1xyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh0YXJnZXRHdWlkLCBjbGF6ek5hbWUsIHN0YXRUeXBlKVxyXG4gICAgICAgIHRoaXMubm90aWZ5KGNsYXp6TmFtZSwgdGhpcy5vblNldFBsYXllclN0YXQubmFtZSwgc2VuZGVyR3VpZCwgdGFyZ2V0R3VpZCwgc3RhdFR5cGUpXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEN1cnJlbmN5TnVtKGNsYXp6TmFtZTogc3RyaW5nLCB0YXJnZXRHdWlkOiBzdHJpbmcsIGN1cnJlbmN5SWQ6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IGNoYXIgPSBDb3JlLkdhbWVPYmplY3QuZmluZCh0YXJnZXRHdWlkKVxyXG4gICAgICAgIGlmIChjaGFyIGluc3RhbmNlb2YgR2FtZXBsYXkuQ2hhcmFjdGVyKSB7XHJcbiAgICAgICAgICAgIGlmIChjaGFyLnBsYXllcikge1xyXG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gdGhpcy5nZXRQbGF5ZXJEYXRhKGNoYXIucGxheWVyLmdldFBsYXllcklEKCkpLmdldFZhbHVlKGNsYXp6TmFtZSArIGN1cnJlbmN5SWQpIGFzIG51bWJlclxyXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlID09IG51bGwpIHZhbHVlID0gMFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGxcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIGNsYXp6TmFtZSBcclxuICAgICAqIEBwYXJhbSBzZW5kZXJHdWlkIFxyXG4gICAgICogQHBhcmFtIHRhcmdldEd1aWQgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvbkNoYW5nZUN1cnJlbmN5KGNsYXp6TmFtZTogc3RyaW5nLCB0YXJnZXRHdWlkOiBzdHJpbmcsIGN1cnJlbmN5SWQ6IG51bWJlciwgY3VycmVuY3lOdW06IG51bWJlcikge1xyXG4gICAgICAgIGxldCBjaGFyID0gQ29yZS5HYW1lT2JqZWN0LmZpbmQodGFyZ2V0R3VpZClcclxuICAgICAgICBpZiAoY2hhciBpbnN0YW5jZW9mIEdhbWVwbGF5LkNoYXJhY3Rlcikge1xyXG4gICAgICAgICAgICBpZiAoY2hhci5wbGF5ZXIpIHtcclxuICAgICAgICAgICAgICAgIGxldCBkYnZhbCA9IHRoaXMuZ2V0Q3VycmVuY3lOdW0oY2xhenpOYW1lLCB0YXJnZXRHdWlkLCBjdXJyZW5jeUlkKVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChkYnZhbCA9PSBudWxsIHx8ICFOdW1iZXIuaXNOYU4oZGJ2YWwpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5WYWwgPSBkYnZhbCBhcyBudW1iZXJcclxuICAgICAgICAgICAgICAgICAgICBuVmFsICs9IGN1cnJlbmN5TnVtXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0UGxheWVyRGF0YShjaGFyLnBsYXllci5nZXRQbGF5ZXJJRCgpKS5zZXRWYWx1ZShjbGF6ek5hbWUgKyBjdXJyZW5jeUlkLCBuVmFsKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZ5KGNsYXp6TmFtZSwgdGhpcy5vbkNoYW5nZUN1cnJlbmN5Lm5hbWUsIHRhcmdldEd1aWQsIGN1cnJlbmN5SWQsIGN1cnJlbmN5TnVtLCBuVmFsKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gdGFyZ2V0R3VpZCBcclxuICAgICAqIEBwYXJhbSBjdXJyZW5jeUlkIFxyXG4gICAgICogQHBhcmFtIHByaWNlIFxyXG4gICAgICogQHJldHVybnMgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBuZXRfQnV5V2l0aEN1cnJlbmN5KHRhcmdldEd1aWQ6IHN0cmluZywgY3VycmVuY3lJZDogbnVtYmVyLCBwcmljZTogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IGN1ck51bSA9IHRoaXMuZ2V0Q3VycmVuY3lOdW0oUHJlZmFiRXZlbnQuUHJlZmFiRXZ0Q3VycmVuY3kubmFtZSwgdGFyZ2V0R3VpZCwgY3VycmVuY3lJZClcclxuICAgICAgICBpZiAoY3VyTnVtIDwgcHJpY2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm9uQ2hhbmdlQ3VycmVuY3koUHJlZmFiRXZlbnQuUHJlZmFiRXZ0Q3VycmVuY3kubmFtZSwgdGFyZ2V0R3VpZCwgY3VycmVuY3lJZCwgLXByaWNlKVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn1cclxuTW9kdWxlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlZ2lzdGVyTW9kdWxlKFByZWZhYkV2ZW50TW9kdWxlUywgUHJlZmFiRXZlbnRNb2R1bGVDLCBQcmVmYWJFdmVudE1vZHVsZURhdGEpXHJcbiIsICJcdUZFRkZcclxuLyoqXHJcbiAqIEFVVE8gR0VORVJBVEUgQlkgVUkgRURJVE9SLlxyXG4gKiBXQVJOSU5HOiBETyBOT1QgTU9ESUZZIFRISVMgRklMRSxNQVkgQ0FVU0UgQ09ERSBMT1NULlxyXG4gKiBBVVRIT1I6IFx1NjI2N1x1N0IxNFx1N0VDRlx1NUU3NFxyXG4gKiBVSTogVUkvRGVmYXVsdFVJLnVpXHJcbiAqIFRJTUU6IDIwMjMuMDguMjgtMTIuMjEuNTdcclxuKi9cclxuXHJcblxyXG5cclxuQFVJLlVJQ2FsbE9ubHkoJ1VJL0RlZmF1bHRVSS51aScpXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERlZmF1bHRVSV9HZW5lcmF0ZSBleHRlbmRzIFVJLlVJQmVoYXZpb3Ige1xyXG5cdFxyXG5cclxuIFxyXG5cdC8qKlxyXG5cdCogb25TdGFydCBcdTRFNEJcdTUyNERcdTg5RTZcdTUzRDFcdTRFMDBcdTZCMjFcclxuXHQqL1xyXG5cdHByb3RlY3RlZCBvbkF3YWtlKCkge1xyXG5cdH1cclxuXHQgXHJcbn1cclxuICJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBOzs7QUNBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7QUNBQTtBQUFBO0FBQUE7QUFBQTs7O0FDQUE7QUFBQTtBQUFBO0FBQUE7QUFNTyxJQUFNLGNBQU4sTUFBd0M7QUFBQSxFQU03QixhQUFzQixDQUFDO0FBQUEsRUFDdkIsYUFBNEIsb0JBQUksSUFBZTtBQUFBLEVBQy9DLFNBQXNDLG9CQUFJLElBQUk7QUFBQSxFQUl4RCxZQUFZLFdBQTRCO0FBQzlDLFFBQUksYUFBb0I7QUFDeEIsU0FBSyxhQUFhLElBQUksTUFBTSxVQUFVLFNBQVMsVUFBVTtBQUV6RCxhQUFRLElBQUksR0FBRyxJQUFJLEtBQUssV0FBVyxRQUFRLEtBQUk7QUFDOUMsV0FBSyxXQUFXLEtBQUssQ0FBQztBQUFBLElBQ3ZCO0FBQ0EsUUFBSSxTQUFTLFVBQVUsR0FBRztBQUMxQixhQUFRLElBQUksR0FBRyxJQUFJLFFBQVEsS0FBSTtBQUM5QixVQUFJLE9BQWMsVUFBVSxHQUFHO0FBQy9CLFVBQUksT0FBcUIsVUFB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O0FBQUEsR0FDZTs7O0FLWHJCO0FBQUE7QUFBQTtBQUFBO0FBWUEsSUFBcUIscUJBQXJCLGNBQWdELEdBQUcsV0FBVztBQUFBLEVBT25ELFVBQVU7QUFBQSxFQUNwQjtBQUVEO0FBVnFCLHFCQUFyQjtBQUFBLEVBREMsR0FBRyxXQUFXLGlCQUFpQjtBQUFBLEdBQ1g7OztBZkNyQixnQkFBMkI7QUFJcEIsSUFBTSxjQUFjO0FBQUEsRUFDdEIsNkJBQTZCO0FBQUEsRUFDN0IsaUNBQWlDO0FBQUEsRUFDakMsaUNBQWlDO0FBQUEsRUFDakMsbUNBQW1DO0FBQUEsRUFDbkMsc0NBQXNDO0FBQUEsRUFDdEMseUJBQXlCO0FBQUEsRUFDekIsdUJBQXVCO0FBQUEsRUFDdkIsc0NBQXNDO0FBQUEsRUFDdEMsd0NBQXdDO0FBQUEsRUFDeEMsd0NBQXdDO0FBQUEsRUFDeEMsbUNBQW1DO0FBQUEsRUFDbkMsOENBQThDO0FBQUEsRUFDOUMsNkNBQTZDO0FBQUEsRUFDN0MsU0FBUztBQUFBLEVBQ1QsMkJBQTJCO0FBQUEsRUFDM0IsaUNBQWlDO0FBQ3RDOyIsCiAgIm5hbWVzIjogWyJFWENFTERBVEEiLCAiRVhDRUxEQVRBIiwgIkdhbWVEZWYiLCAiTWFwRXgiLCAiaGFzIiwgIlByZWZhYkV2ZW50IiwgIkF0dHJUeXBlIiwgIkVxdWlwU2xvdCIsICJQbGF5ZXJJbmZvVHlwZSIsICJQbGF5ZXJTdGF0VHlwZSJdCn0K
