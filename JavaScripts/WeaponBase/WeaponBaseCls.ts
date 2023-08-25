import { GameDef } from "../GameDef";
import Ammo from "./AmmoBaseCls";
import Casing from "./CasingBaseCls";

@Core.Class
export default class WeaponDriver extends Core.Script {
    @Core.Property({ hideInEditor: true, replicated: true, onChanged: "onEquipdChanged" })
	public isEquiped: boolean = false;

    /* 热武器逻辑对象 */
	weaponObj: Gameplay.HotWeapon = null;

	/* 动作资源 */
	weaponAction: GameDef.WeaponAction = null;

	/* 武器UI */
	weaponUI: WeaponUI = null;

	/* 当前客户端玩家 */
	player: Gameplay.Player = null;

	/* 当前客户端角色 */
	chara: Gameplay.Character = null;

	/* 当前客户端角色摄像机 */
	camera: Gameplay.CameraSystem = null;

	/* 拾取触发器 */
	pickUpTrigger: Gameplay.Trigger = null;

	/* 根武器 */
	weaponEntityRoot: Core.GameObject = null;

	/* 根弹药 */
	ammoEntityRoot: Core.GameObject = null;

	/* 弹药池 */
	ammoPool: GameDef.SimpleObjectPool<Core.GameObject> = null;

	/* 弹药数组 */
	ammoArray: Array<Ammo> = [];

	/* 弹壳 */
	casingEntity: Core.GameObject = null;

	/* 弹壳池 */
	casingPool: GameDef.SimpleObjectPool<Core.GameObject> = null;

	/* 弹壳数组 */
	casingArray: Array<Casing> = [];

	/* 开火特效 */
	fireEffect: Gameplay.Particle = null;

	/* 击中角色特效 */
	hitCharaEffect: Gameplay.Particle = null;

	/* 击中角色特效池 */
	hitCharaEffectPool: GameDef.SimpleObjectPool<Gameplay.Particle> = null;

	/* 击中物体特效 */
	hitEffect: Gameplay.Particle = null;

	/* 击中物体特效池 */
	hitEffectPool: GameDef.SimpleObjectPool<Gameplay.Particle> = null;

	/* 音效音量 */
	static soundVolume: number = 1;

	/* 开火音效 */
	fireSound: Gameplay.Sound = null;

	/* 换弹音效 */
	reloadSound: Gameplay.Sound = null;

	/* 上膛音效 */
	loadSound: Gameplay.Sound = null;

	/* 瞄准音效 */
	aimSound: Gameplay.Sound = null;

	/* 击中角色音效 */
	hitCharaSound: Gameplay.Sound = null;

	/* 击中角色音效池 */
	hitCharaSoundPool: GameDef.SimpleObjectPool<Gameplay.Sound> = null;

	/* 击中物体音效 */
	hitSound: Gameplay.Sound = null;

	/* 击中物体音效池 */
	hitSoundPool: GameDef.SimpleObjectPool<Gameplay.Sound> = null;

	/* 开火状态标识， isFiring是武器持有人实际的开火状态*/
	isFiring: boolean = false;

	/* bFiring是武器实际的开火状态 */
	bFiring: boolean = false;

	/* 是否可以开火 */
	isCanFire: number = 0;

	/* 瞄准状态标识 */
	isAimming: boolean = false;

	/* 焦距变化标识 */
	isZooming: boolean = false;

	/* 阻挡状态标识 */
	isBlock: boolean = false;

	/** 剩余持有时间 */
	private _restTime: number;
	// /* 弹药飞行方向 */
	// ammoDirection: Type.Vector = Type.Vector.zero;

	/* 击中回调函数 */
	clientOnHit: (hitResult: Core.GameObject[] | Gameplay.HitResult[], attackPlayer: number, isObj: boolean) => void;

	/* 阻挡标识变化回调函数 */
	clientOnBlockChange: (isBlock: boolean) => void;

}