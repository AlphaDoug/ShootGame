import { IWeaponConfigElement, WeaponConfigConfig } from "../Config/WeaponConfig"
import { GameDef } from "../GameDef"
import Ammo from "./AmmoBaseCls"
import Casing from "./CasingBaseCls"
import WeaponUI from "./WeaponUI"
import { GameConfig } from "../Config/GameConfig"
import { PrefabEvent } from "../../prefabEvent/PrefabEvent"
import { IActionElement } from "../Config/Action"
import { IWeaponResourcesElement } from "../Config/WeaponResources"

@Core.Class
export default class WeaponDriver extends Core.Script {

	@Core.Property({ hideInEditor: true, replicated: true, onChanged: "onIdChanged" })
	private id : number
	/** */
	public config: IWeaponConfigElement
	/**是否完成初始化 */
	private hasInit: boolean = false

	@Core.Property({ hideInEditor: true, replicated: true, onChanged: "onEquipdChanged" })
	public isEquiped: boolean = false

	/* 热武器逻辑对象 */
	weaponObj: Gameplay.HotWeapon = null

	/* 动作资源 */
	weaponAction: IActionElement = null

	/**武器使用的资产配置 */
	weaponResources : IWeaponResourcesElement = null

	/* 武器UI */
	weaponUI: WeaponUI = null

	/* 当前客户端玩家 */
	player: Gameplay.Player = null

	/* 当前客户端角色 */
	chara: Gameplay.Character = null

	/* 当前客户端角色摄像机 */
	camera: Gameplay.CameraSystem = null

	/* 拾取触发器 */
	pickUpTrigger: Gameplay.Trigger = null

	/* 根武器 */
	weaponEntityRoot: Core.GameObject = null

	/* 根弹药 */
	ammoEntityRoot: Core.GameObject = null

	/* 弹药池 */
	ammoPool: GameDef.SimpleObjectPool<Core.GameObject> = null

	/* 弹药数组 */
	ammoArray: Array<Ammo> = []

	/* 弹壳 */
	casingEntity: Core.GameObject = null

	/* 弹壳池 */
	casingPool: GameDef.SimpleObjectPool<Core.GameObject> = null

	/* 弹壳数组 */
	casingArray: Array<Casing> = []

	/* 开火特效 */
	fireEffect: Gameplay.Particle = null

	/* 击中角色特效 */
	hitCharaEffect: Gameplay.Particle = null

	/* 击中角色特效池 */
	hitCharaEffectPool: GameDef.SimpleObjectPool<Gameplay.Particle> = null

	/* 击中物体特效 */
	hitEffect: Gameplay.Particle = null

	/* 击中物体特效池 */
	hitEffectPool: GameDef.SimpleObjectPool<Gameplay.Particle> = null

	/* 音效音量 */
	static soundVolume: number = 1

	/* 开火音效 */
	fireSound: Gameplay.Sound = null

	/* 换弹音效 */
	reloadSound: Gameplay.Sound = null

	/* 上膛音效 */
	loadSound: Gameplay.Sound = null

	/* 瞄准音效 */
	aimSound: Gameplay.Sound = null

	/* 击中角色音效 */
	hitCharaSound: Gameplay.Sound = null

	/* 击中角色音效池 */
	hitCharaSoundPool: GameDef.SimpleObjectPool<Gameplay.Sound> = null

	/* 击中物体音效 */
	hitSound: Gameplay.Sound = null

	/* 击中物体音效池 */
	hitSoundPool: GameDef.SimpleObjectPool<Gameplay.Sound> = null

	/* 开火状态标识， isFiring是武器持有人实际的开火状态*/
	isFiring: boolean = false

	/* bFiring是武器实际的开火状态 */
	bFiring: boolean = false

	/* 是否可以开火 */
	isCanFire: number = 0

	/* 瞄准状态标识 */
	isAimming: boolean = false

	/* 焦距变化标识 */
	isZooming: boolean = false

	/* 阻挡状态标识 */
	isBlock: boolean = false

	isAutoReload: boolean = false

	totalAmmo: number

	/** 剩余持有时间 */
	private _restTime: number
	// /* 弹药飞行方向 */
	// ammoDirection: Type.Vector = Type.Vector.zero

	private _rotateRotation: Rotation = Rotation.zero

	private preloadAssets: Array<string>

	/* 击中回调函数 */
	clientOnHit: (hitResult: Core.GameObject[] | Gameplay.HitResult[], attackPlayer: number, isObj: boolean) => void

	/* 阻挡标识变化回调函数 */
	clientOnBlockChange: (isBlock: boolean) => void
	/**枪械的初始化,服务端调用 */
	@Core.Function(Core.Server)
	public InitWeapon(id: number): void {
		this.id = id
		this.onIdChanged()
	}
	/** 当脚本被实例后，会在第一帧更新前调用此函数 */
	protected async onStart() {
		while (!this.hasInit) {
			TimeUtil.delaySecond(0.1)
		}
		this.useUpdate = true
		this.weaponObj = this.gameObject as Gameplay.HotWeapon
		//this.initAssets(this.preloadAssets)
		if (this.weaponObj) {
			if (Util.SystemUtil.isClient()) {
				this.clientInit()
			}
			if (Util.SystemUtil.isServer()) {
				this.serverInit()
			}

			if (Util.SystemUtil.isClient()) {
				this.clientOnHit = (hitResult: Core.GameObject[] | Gameplay.HitResult[], attackPlayer: number, isObj: boolean) => {
					hitResult.forEach(e => {

						if (e instanceof Gameplay.HitResult) {
							if (e.gameObject instanceof Gameplay.Character ||
								e.gameObject instanceof Core.GameObject) {
								PrefabEvent.PrefabEvtFight.hit(this.chara.guid, e.gameObject.guid, this.config.damage, e.impactPoint.clone())
								return
							}
						}

						if (e instanceof Gameplay.Character || e instanceof Core.GameObject) {
							PrefabEvent.PrefabEvtFight.hit(this.chara.guid, e.guid, this.config.damage, e.worldLocation.clone())
							return
						}

					})

				}

				PrefabEvent.PrefabEvtEquip.onEquip(async (targetGuid: string, slot: PrefabEvent.EquipSlot, equipGuid: string) => {
					//let player = await Gameplay.asyncGetCurrentPlayer()
					if (this.weaponObj && this.weaponObj.getCurrentOwner() && this.weaponObj.getCurrentOwner().guid == targetGuid && this.weaponObj.guid != equipGuid) {
						this.unEquip()
					}
				})

			}

		}
	}

	private onEquipdChanged() {
		this.weaponEntityRoot.relativeRotation = Rotation.zero
	}
	/**
	 * 周期函数 每帧执行
	 * 此函数执行需要将this.bUseUpdate赋值为true
	 * @param dt 当前帧与上一帧的延迟 / 秒
	 */
	protected onUpdate(dt: number): void {
		if (Util.SystemUtil.isServer()) return
		if (this.weaponObj == null) {
			this.weaponObj = this.gameObject as Gameplay.HotWeapon
			if (this.weaponObj == null) return
			this.clientInit()
		}

		if (!this.isEquiped && this.weaponEntityRoot) {
			this._rotateRotation.z = this.config.rotateSpeed * dt
			this.weaponEntityRoot.worldRotation = this.weaponEntityRoot.worldRotation.add(this._rotateRotation)
			return
		}

		for (let i = 0; i < this.ammoArray.length; i++) {
			if (this.ammoArray[i].update(dt)) {
				if (this.ammoArray[i].owner == this.chara) {
					this.serverDestroyAmmo(i)
					this.hit(this.ammoArray[i].hitResult)
					this.ammoArray[i].destroy()
					this.ammoArray.splice(i, 1)
					i--
				}
			}
		}

		for (let i = 0; i < this.casingArray.length; i++) {
			if (this.casingArray[i].update(dt)) {
				this.casingArray[i].destroy()
				this.casingArray.splice(i, 1)
				i--
			}
		}

		if (this.weaponObj.getCurrentOwner() !== this.chara) return

		if (this.isCanFire != 0) {
			this.isCanFire -= dt
			if (this.isCanFire < 0) {
				this.isCanFire = 0
			}
		}

		this.cameraUpdate(dt)

		if (!this.updatebFiring()) {
			if (!this.bFiring && this.fireEffect.loop && this.fireSound.loop) {
				this.fireEffect.stop()
				this.fireSound.stop()
				if (!this.isAimming) {
					this.weaponObj.aimComponent.enableAiming(false)
				}
			}
		}

		if (!this.updateBlockFire()) {
			this.clientOnBlockChange(this.isBlock)
		}

		switch (this.weaponObj.getCurrentState()) {
			case Gameplay.HotWeaponState.Idle:
				if (this.weaponObj.fireComponent.currentBulletSize < 1) {
					if (this.isAutoReload) {
						this.startReload()
						this.isAutoReload = false
						setTimeout(() => {
							this.isAutoReload = true
						}, this.weaponObj.reloadComponent.reloadDuration * 1000)
					}
				} else {
					if (this.isFiring && !this.bFiring && this.weaponObj.fireComponent.currentFireModel == 2) {
						this.startFire()
					}
				}

				break

			case Gameplay.HotWeaponState.Reloading:

				break

			case Gameplay.HotWeaponState.Loading:

				break

			case Gameplay.HotWeaponState.Firing:
				if (this.config.isEmptyToDestroy && this.config.totalAmmo == 0 && this.weaponObj.fireComponent.currentBulletSize == 0) {
					this.unEquip()
				}
				break

			default:
				break
		}

		if (this.weaponUI) {
			this.weaponUI.changeBullet(this.weaponObj.fireComponent.currentBulletSize, this.config.totalAmmo)
			if (this.config.keepTime != -1) {
				this._restTime -= dt
				this.weaponUI.setTimeText(this._restTime, this.config.keepTime)
				if (this._restTime <= 0) {
					this.unEquip()
				}
			}
		}
	}
	/** 脚本被销毁时最后一帧执行完调用此函数 */
	protected onDestroy(): void {
		this.clientDestroy()
	}
	/* 击中对象函数 */
	protected hit(hitResult: Core.GameObject[] | Gameplay.HitResult[]) {
		if (!(hitResult.length > 0)) return
		if (this.config.detectRadius > 10) { // 矩形检测结果
			for (let element of hitResult) {
				let temp = element as Core.GameObject
				if (temp instanceof Gameplay.CharacterBase) {
					this.hitCharacterMulticast(temp.worldLocation, temp.worldRotation)
				} else {
					this.hitObjectMulticast(temp.worldLocation, temp.worldRotation)
				}
			}
			if (this.config.hurtRadius > 10) {
				let sphereResult = Gameplay.sphereOverlap((hitResult[0] as Core.GameObject).worldLocation, this.config.hurtRadius, GameDef.DEBUG_FLAG)
				this.clientOnHit(sphereResult, this.player.getPlayerID(), true)
			} else {
				this.clientOnHit(hitResult, this.player.getPlayerID(), true)
			}
		} else { // 射线检测结果
			for (let element of hitResult) {
				let temp = element as Gameplay.HitResult
				let rot = temp.impactNormal.toRotation()
				rot.y -= 90
				if (temp.gameObject instanceof Gameplay.CharacterBase) {
					this.hitCharacterMulticast(temp.impactPoint, rot)
				} else {
					this.hitObjectMulticast(temp.impactPoint, rot)
				}
			}
			if (this.config.hurtRadius > 10) {
				let sphereResult = Gameplay.sphereOverlap((hitResult[0] as Gameplay.HitResult).impactPoint, this.config.hurtRadius, GameDef.DEBUG_FLAG)
				this.clientOnHit(sphereResult, this.player.getPlayerID(), true)
			} else {
				this.clientOnHit(hitResult, this.player.getPlayerID(), false)
			}
		}
	}

	/* 广播击中角色 */
	@Core.Function(Core.Server)
	private hitCharacterMulticast(loc: Type.Vector, rot: Type.Rotation) {
		this.hitCharaPerformance(loc, rot)
	}

	/* 广播击中普通对象 */
	@Core.Function(Core.Server)
	private hitObjectMulticast(loc: Type.Vector, rot: Type.Rotation) {
		this.hitObjectPerformance(loc, rot)
	}

	@Core.Function(Core.Client, Core.Multicast)
	private hitCharaPerformance(loc: Type.Vector, rot: Type.Rotation) {
		EffectService.getInstance().playEffectAtLocation(this.hitCharaEffect.getSourceAssetGuid(), loc, 1, rot, this.hitCharaEffect.worldScale)
		SoundService.getInstance().play3DSound(this.hitCharaSound.getSourceAssetGuid(), loc, 1, 1, { maxDistance: 3000 })
	}

	@Core.Function(Core.Client, Core.Multicast)
	private hitObjectPerformance(loc: Type.Vector, rot: Type.Rotation) {
		EffectService.getInstance().playEffectAtLocation(this.hitEffect.getSourceAssetGuid(), loc, 1, rot, this.hitEffect.worldScale)
		SoundService.getInstance().play3DSound(this.hitSound.getSourceAssetGuid(), loc, 1, 1, { maxDistance: 3000 })
	}

	/* 播放特效 */
	private playEffect(particle: Gameplay.Particle): void {

	}
	/* 播放音效 */
	private playSound(sound: Gameplay.Sound): void {
		sound.volume = WeaponDriver.soundVolume
		sound.play()
	}

	@Core.Function(Core.Server)
	private serverDestroyAmmo(index: number) {
		this.clientDestroyAmmo(index)
	}

	@Core.Function(Core.Client, Core.Multicast)
	private clientDestroyAmmo(index: number) {
		if (!this.weaponObj) {
			return
		}
		if (this.weaponObj.getCurrentOwner() == this.chara) {
			return
		} else if (this.ammoArray.length != 0) {
			this.ammoArray[index].destroy()
			this.ammoArray.splice(index, 1)
		}
	}

	/**
	 * 客户端调用直接装备
	 */
	public equip() {
		// 如果当前角色为空且在客户端，重新获取一次角色
		if (!this.chara && Util.SystemUtil.isClient()) {
			this.chara = Gameplay.getCurrentPlayer().character
		}
		this.serverEquip(this.chara.player.getPlayerID())
	}
	/**
	 * unEquip
	 */
	public unEquip() {
		if (this.chara !== this.weaponObj.getCurrentOwner()) return
		if (!this.weaponObj) {
			return
		}
		if (this.isAimming) {
			this.weaponObj.accuracyOfFireComponent.maxDispersionHalfAngle = this.tempDispersionMax
			this.weaponObj.accuracyOfFireComponent.defaultDispersionHalfAngle = this.tempDispersionDefault
			this.isAimming = false
		}
		this.weaponObj.stopFire()
		this.weaponObj.breakLoad()
		this.weaponObj.breakReload()
		this.weaponObj.destroy()
		this.weaponObj.unequipHotWeapon()
		UI.UIManager.instance.hide(WeaponUI)
		this.weaponUI = null
		this.chara.animationStance = this.tempanimationStance
		this.chara.playAnimation(this.weaponAction.unequipAnimation)
		this.chara.moveFacingDirection = this.tempMoveFacingDirection
		this.camera.cameraRelativeTransform = new Type.Transform(this.tempcameraOffset, this.camera.cameraRelativeTransform.rotation, this.camera.cameraRelativeTransform.scale)
		this.camera.cameraSystemRelativeTransform = new Type.Transform(this.temptargetArmOffset, this.camera.cameraRelativeTransform.rotation, this.camera.cameraRelativeTransform.scale)
		this.camera.cameraFOV = this.tempcameraFOV
		this.camera.targetArmLength = this.temptargetArmLength
		if (this.config.isAutoDestroy) {
			UI.UIManager.instance.destroyUI(WeaponUI)
			this.weaponObj = null
			let destroyInterval = setInterval(() => {
				if (this.ammoArray.length == 0 && this.casingArray.length == 0) {
					this.serverDestroy()
					clearInterval(destroyInterval)
				}
			}, 100)
		}
	}
	@Core.Function(Core.Server)
	private serverHideWeaponEntity(playerID: number): void {
		// 如果卸载的是当前武器，先隐藏武器，等待子弹销毁完毕后卸载并销毁武器，删除map中对应键值
		this.hideWeaponEntity()
	}

	@Core.Function(Core.Client, Core.Multicast)
	private hideWeaponEntity() {
		if (!this.weaponEntityRoot) return
		this.weaponEntityRoot.setVisibility(Type.PropertyStatus.Off)
	}
	@Core.Function(Core.Server)
	private serverDestroy(): void {
		this.destroy()
	}
	/**
		 * startFire
		 */
	public startFire() {
		if (this.weaponObj == null || this.isCanFire != 0) return
		this.weaponObj.startFire()
		this.isFiring = true
		if (!this.isAimming) {
			this.weaponObj.aimComponent.enableAiming(true)
		}
	}

	/**
	 * stopFire
	 */
	public stopFire() {
		if (this.weaponObj == null) return
		this.weaponObj.stopFire()
		this.isFiring = false
		if (!this.isAimming) {
			this.weaponObj.aimComponent.enableAiming(false)
		}
	}

	/**
	 * startReload
	 */
	public startReload() {
		if (this.weaponObj == null || !this.weaponObj.reloadEnable || this.weaponObj.fireComponent.currentBulletSize == this.weaponObj.fireComponent.currentClipSize) return
		let ammoGap = this.weaponObj.fireComponent.currentClipSize - this.weaponObj.fireComponent.currentBulletSize

		if (this.totalAmmo == -1) {
			this.weaponObj.reload(ammoGap)
		}
		if (this.totalAmmo <= 0) {
			return
		}
		if (this.totalAmmo < ammoGap) {
			this.weaponObj.reload(this.totalAmmo)
			this.totalAmmo = 0
		} else {
			this.weaponObj.reload(ammoGap)
			this.totalAmmo -= ammoGap
		}
	}

	/**
	 * stopReload
	 */
	public stopReload() {
		if (this.weaponObj == null) return
		this.weaponObj.breakReload()
		this.weaponObj.breakLoad()
	}

	private tempDispersionMax = 0
	private tempDispersionDefault = 0



	/**
	 * startAim
	 */
	public startAim() {
		console.error("startAim")
		this.aimSound.stop()
		this.aimSound.play()
		this.chara.animationStance = this.weaponAction.aimStance
		this.weaponObj.fireComponent.animationGuid = this.weaponAction.aimShootAnimation
		this.tempDispersionDefault = this.weaponObj.accuracyOfFireComponent.defaultDispersionHalfAngle
		this.tempDispersionMax = this.weaponObj.accuracyOfFireComponent.maxDispersionHalfAngle
		this.weaponObj.accuracyOfFireComponent.defaultDispersionHalfAngle = this.weaponObj.accuracyOfFireComponent.minDispersionHalfAngle
		this.weaponObj.accuracyOfFireComponent.maxDispersionHalfAngle = this.weaponObj.accuracyOfFireComponent.minDispersionHalfAngle
		this.isZooming = true
		this.zoomIn()
		if (this.config.isWeaponHaveScope) {
			this.camera.targetArmLength = 0
		}
	}

	/**
	 * stopAim
	 */
	public stopAim() {
		console.error("stopAim")
		this.weaponObj.accuracyOfFireComponent.maxDispersionHalfAngle = this.tempDispersionMax
		this.weaponObj.accuracyOfFireComponent.defaultDispersionHalfAngle = this.tempDispersionDefault
		this.chara.animationStance = this.weaponAction.holdStance
		this.weaponObj.fireComponent.animationGuid = this.weaponAction.shootAnimation
		this.isZooming = true
		this.zoomOut()
		if (this.config.isWeaponHaveScope) {
			this.camera.targetArmLength = 400
		}
		this.aimSound.stop()
		this.aimSound.play()
	}

	/**
	 * startLoad
	 */
	public startLoad() {

	}

	/**
	 * endLoad
	 */
	public endLoad() {

	}

	/* getBulletSize */
	public getBulletSize(): number {
		if (this.weaponObj == null) return
		return this.weaponObj.fireComponent.currentBulletSize
	}

	/* 客户端销毁方法 */
	private clientDestroy() {
		if (this.pickUpTrigger) {
			this.pickUpTrigger.destroy()
		}
		if (this.weaponEntityRoot) {
			this.weaponEntityRoot.destroy()
		}
		if (this.ammoEntityRoot) {
			this.ammoEntityRoot.destroy()
		}
		if (this.casingEntity) {
			this.casingEntity.destroy()
		}
		if (this.fireEffect) {
			this.fireEffect.destroy()
		}
		if (this.fireSound) {
			this.fireSound.destroy()
		}
		if (this.hitCharaEffect) {
			this.hitCharaEffect.destroy()
		}
		if (this.hitCharaSound) {
			this.hitCharaSound.destroy()
		}
		if (this.hitEffect) {
			this.hitEffect.destroy()
		}
		if (this.hitSound) {
			this.hitSound.destroy()
		}
		if (this.reloadSound) {
			this.reloadSound.destroy()
		}
		if (this.aimSound) {
			this.aimSound.destroy()
		}
		if (this.loadSound) {
			this.loadSound.destroy()
		}
	}

	/* 下载并初始化资源 */
	private initAssets(assetIds: Array<string>): void {
		for (let element of assetIds) {
			Util.AssetUtil.asyncDownloadAsset(element)
		}
	}
	/* 服务端初始化方法 */
	private serverInit() {
		this.clientOnIDChanged(this.id)
		this.serverInitDelegate()
		this.serverCreateMesh()
	}
	/**服务端根据配置创建枪械的模型 */
	private async serverCreateMesh(){
		let mesh = await GameObject.asyncSpawn({ guid : this.weaponResources.weaponMesh, replicates : true})
		mesh.parent = this.weaponObj
	}

	/* 服务端初始化回调函数 */
	private serverInitDelegate(): void {
		this.weaponObj.onEquippedServer.add(this.onServerEquip.bind(this))
		this.weaponObj.onUnequippedServer.add(this.onServerUnequip.bind(this))

		this.weaponObj.fireComponent.onStartFireServer.add(this.onServerStartFire.bind(this))
		this.weaponObj.fireComponent.onEndFireServer.add(this.onServerEndFire.bind(this))
		if (this.weaponObj.reloadComponent) {
			this.weaponObj.reloadComponent.onStartReloadServer.add(this.onServerStartReload.bind(this))
			this.weaponObj.reloadComponent.onEndReloadServer.add(this.onServerEndReload.bind(this))
		}
		if (this.weaponObj.loadComponent) {
			this.weaponObj.loadComponent.onStartLoadServer.add(this.onServerStartLoad.bind(this))
			this.weaponObj.loadComponent.onEndLoadServer.add(this.onServerEndLoad.bind(this))
		}
		if (this.weaponObj.aimComponent) {
			this.weaponObj.aimComponent.onAimStartServer.add(this.onServerStartAim.bind(this))
			this.weaponObj.aimComponent.onAimEndServer.add(this.onServerEndAim.bind(this))
		}
		if (this.weaponObj.recoilForceComponent) {
			this.weaponObj.recoilForceComponent.onStartRecoilForceServer.add(this.onServerStartRecoil.bind(this))
		}
	}

	/* 服务端开始开火回调 */
	private onServerEquip() {
		console.error("ServerEquip " + this.weaponObj.getCurrentOwner().characterName)
		if (!this.weaponObj.getCurrentOwner()) return
		let v2 = this.weaponObj.getCurrentOwner().setAppearance(Gameplay.HumanoidV2)
		if ((v2.getSomatotype() % 2) == 0) {
			console.error("female")
			this.changeWeaponAction(0)
			this.clientEquip(this.weaponObj.getCurrentOwner().player, 0)
		} else {
			console.error("male")
			this.changeWeaponAction(1)
			this.clientEquip(this.weaponObj.getCurrentOwner().player, 1)
		}
	}

	/* 服务端卸载装备完成回调 */
	private onServerUnequip() {
		console.error("onServerUnequip")

	}

	/* 服务端开始开火回调 */
	private onServerStartFire() {

	}

	/* 服务端结束开火回调 */
	private onServerEndFire() {

	}

	/* 服务端开始换弹回调 */
	private onServerStartReload() {

	}

	/* 服务端结束换弹回调 */
	private onServerEndReload() {

	}

	/* 服务端开始上膛回调 */
	private onServerStartLoad() {

	}

	/* 服务端结束上膛回调 */
	private onServerEndLoad() {

	}

	/* 服务端开始瞄准回调 */
	private onServerStartAim() {

	}

	/* 服务端结束瞄准回调 */
	private onServerEndAim() {

	}

	/* 服务端开始后坐力回调 */
	private onServerStartRecoil() {

	}

	private _isInited: boolean = false

	/* 客户端初始化方法 */
	private clientInit() {
		if (this._isInited) {
			return
		}
		this._isInited = true
		/* 获取玩家相关对象 */
		Gameplay.asyncGetCurrentPlayer().then((player: Gameplay.Player) => {
			this.player = player
			this.chara = this.player.character
			this.camera = this.chara.cameraSystem
			
			this.clientInitWeaponEntityRoot()
			this.clientInitPickUpTrigger()
			this.clientInitAmmoEntityRoot()
			this.clientInitCasingEntity()
			this.clientInitHitCharaEffect()
			this.clientInitHitEffect()
			this.clientInitFireEffect()
			this.clientInitFireSound()
			this.clientInitReloadSound()
			this.clientInitLoadSound()
			this.clientInitAimSound()
			this.clientInitHitCharaSound()
			this.clientInitHitSound()
			this.clientInitDelegate()
		})
	}

	/* 客户端初始化根武器实体 */
	private clientInitWeaponEntityRoot(): void {
		this.weaponEntityRoot = this.weaponObj.getChildByName("weaponEntityRoot") as Core.GameObject
	}

	/* 客户端初始化拾取触发器 */
	private async clientInitPickUpTrigger() {
		this.pickUpTrigger = await GameObject.asyncSpawn({guid : "Trigger"})
		this.pickUpTrigger.parent = this.weaponObj
		if (this.pickUpTrigger) {
			this.pickUpTrigger.onEnter.add((chara: Gameplay.Character) => {
				// 如果是角色，销毁触发器，装备武器，换弹，修改姿态，设置玩家武器map，派发装备事件
				if (!(chara instanceof Gameplay.Character)) return
				if (chara === this.chara) {
					this.serverEquip(this.player.getPlayerID())
				}
			})
		}
	}

	/* 服务端装备 */
	@Core.Function(Core.Server)
	public serverEquip(playerID: number): void {
		let player = Gameplay.getPlayer(playerID)
		// 如果装备时玩家为空则返回
		if (player == null || !this.weaponObj) return
		this.weaponObj.equipment(player.character, this.config.equipmentSlot)
		this.isEquiped = true
		PrefabEvent.PrefabEvtEquip.equip(player.character.guid, PrefabEvent.EquipSlot.Weapon, this.weaponObj.guid)
	}



	/* 修改预制体动作资源 */
	private changeWeaponAction(sex: number) {
		console.error("changeWeaponAction " + sex)
		sex == 0 ? this.weaponAction = GameConfig.Action.getElement(this.config.femaleAction) : this.weaponAction = GameConfig.Action.getElement(this.config.maleAction)
		if (this.weaponObj) {
			this.weaponObj.fireComponent.animationGuid = this.weaponAction.shootAnimation
			if (this.weaponObj.reloadEnable) {
				this.weaponObj.reloadComponent.animationGuid = this.weaponAction.reloadAnimation
			}
			if (this.weaponObj.loadEnable) {
				this.weaponObj.loadComponent.animationGuid = this.weaponAction.loadAnimation
			}
		}
	}

	private tempMoveFacingDirection: number
	private temptargetArmLength: number
	private tempcameraFOV: number
	private tempcameraOffset: Type.Vector
	private temptargetArmOffset: Type.Vector
	private tempanimationStance: string

	/* 客户端装备 */
	@Core.Function(Core.Client)
	private clientEquip(pickPlayer: Gameplay.Player, gender: number): void {
		if (!this.camera) {
			this.camera = Gameplay.getCurrentPlayer().character.cameraSystem
		}
		if (!this.weaponObj) {
			this.weaponObj = this.gameObject as Gameplay.HotWeapon
		}
		this.weaponObj.equipment(this.chara, this.config.equipmentSlot)
		//Events.dispatchLocal(UNEQUIP_EVENT)
		this.changeWeaponAction(gender)
		// setTimeout(() => {
		// 	Events.dispatchLocal(EQUIP_EVENT, this)
		this.tempMoveFacingDirection = this.chara.moveFacingDirection
		this.tempanimationStance = this.chara.animationStance
		this.temptargetArmLength = this.camera.targetArmLength
		this.temptargetArmOffset = this.camera.cameraSystemRelativeTransform.location
		this.tempcameraFOV = this.camera.cameraFOV
		this.tempcameraOffset = this.camera.cameraRelativeTransform.location
		this.chara.animationStance = this.weaponAction.holdStance
		this.chara.playAnimation(this.weaponAction.equipAnimation)
		this.chara.moveFacingDirection = Gameplay.MoveFacingDirection.ControllerDirection
		this.camera.targetArmLength = 400
		this.camera.cameraFOV = this.config.equipmentCameraFov
		this.camera.cameraRelativeTransform = new Type.Transform(this.config.equipmentCameraOffset, this.camera.cameraRelativeTransform.rotation, this.camera.cameraRelativeTransform.scale)
		this.camera.cameraSystemRelativeTransform = new Type.Transform(new Type.Vector(0, 0, 60), this.camera.cameraRelativeTransform.rotation, this.camera.cameraRelativeTransform.scale)
		this.weaponUI = UI.UIManager.instance.show(WeaponUI, this, this.weaponObj.accuracyOfFireEnable ? this.weaponObj.accuracyOfFireComponent.defaultDispersionHalfAngle : 0, this.config.weaponIcon, this.config.name)
		this.weaponUI.setTimeText(this.config.keepTime, this.config.keepTime)
		this.weaponUI.setReloadBtn(!this.config.isSupportRepAmmo)
		if (this.config.isSupportRepAmmo) {
			this.weaponObj.reloadComponent.animationGuid = this.weaponAction.aimShootAnimation
			this.weaponObj.loadComponent.animationGuid = this.weaponAction.aimShootAnimation
		}
		this._restTime = this.config.keepTime
		// }, 100)
	}
	/* 修改FOV */
	public changeFov(value: number) {
		this.camera.cameraFOV = value
	}


	/* 客户端初始化根弹药实体 */
	private async clientInitAmmoEntityRoot() {
		this.ammoEntityRoot = await GameObject.asyncSpawn({ guid : this.weaponResources.ammo })
		this.ammoEntityRoot.parent = this.weaponObj
		this.ammoPool = new GameDef.SimpleObjectPool<Core.GameObject>(this.instanceAmmo.bind(this), (obj: Core.GameObject) => { obj.destroy() }, (obj: Core.GameObject) => { obj.setVisibility(Type.PropertyStatus.Off) })
	}

	/* 客户端初始化弹壳实体 */
	private async clientInitCasingEntity() {
		this.casingEntity = await GameObject.asyncSpawn({ guid : this.weaponResources.casing })
		this.casingEntity.parent = this.weaponObj
		this.casingPool = new GameDef.SimpleObjectPool<Core.GameObject>(this.instanceCasing.bind(this), (obj: Core.GameObject) => { obj.destroy() }, (obj: Core.GameObject) => { obj.setVisibility(Type.PropertyStatus.Off) })
	}

	/* 客户端初始化击中角色特效 */
	private async clientInitHitCharaEffect() {
		this.hitCharaEffect = await GameObject.asyncSpawn({ guid : this.weaponResources.hitRoleEffect })
		this.hitCharaEffect.parent = this.weaponObj
		this.hitCharaEffectPool = new GameDef.SimpleObjectPool<Gameplay.Particle>(this.instanceHitCharaEffect.bind(this), (particle: Gameplay.Particle) => { particle.destroy() }, (particle: Gameplay.Particle) => { particle.detachFromGameObject(); particle.forceStop() })
	}

	/* 客户端初始化击中物体特效 */
	private async clientInitHitEffect() {
		this.hitEffect = await GameObject.asyncSpawn({ guid : this.weaponResources.hitOtherEffect })
		this.hitEffect.parent = this.weaponObj
		this.hitEffectPool = new GameDef.SimpleObjectPool<Gameplay.Particle>(this.instanceHitEffect.bind(this), (particle: Gameplay.Particle) => { particle.destroy() }, (particle: Gameplay.Particle) => { particle.detachFromGameObject(); particle.forceStop() })
	}

	/* 客户端初始化开火特效 */
	private async clientInitFireEffect() {
		this.fireEffect = await GameObject.asyncSpawn({ guid : this.weaponResources.fireEffect })
		this.fireEffect.parent = this.weaponObj
	}

	/* 客户端初始化开火音效 */
	private async clientInitFireSound() {
		this.fireSound = await GameObject.asyncSpawn({ guid : this.weaponResources.fireSound })
		this.fireSound.parent = this.weaponObj
	}

	/* 客户端初始化换弹音效 */
	private async clientInitReloadSound() {
		this.reloadSound = await GameObject.asyncSpawn({ guid : this.weaponResources.reloadSound })
		this.reloadSound.parent = this.weaponObj
	}

	/* 客户端初始化上膛音效 */
	private async clientInitLoadSound() {
		this.loadSound = await GameObject.asyncSpawn({ guid : this.weaponResources.loadSound })
		this.loadSound.parent = this.weaponObj
	}

	/* 客户端初始化瞄准音效 */
	private async clientInitAimSound() {
		this.aimSound = await GameObject.asyncSpawn({ guid : this.weaponResources.aimSound })
		this.aimSound.parent = this.weaponObj
	}

	/* 客户端初始化根击中角色音效 */
	private async clientInitHitCharaSound() {
		this.hitCharaSound = await GameObject.asyncSpawn({ guid : this.weaponResources.hitRoleSound })
		this.hitCharaSound.parent = this.weaponObj
		this.hitCharaSoundPool = new GameDef.SimpleObjectPool<Gameplay.Sound>(this.instanceHitCharaSound.bind(this), (sound: Gameplay.Sound) => { sound.destroy() }, (sound: Gameplay.Sound) => { sound.stop() })
	}

	/* 客户端初始化根击中物体音效 */
	private async clientInitHitSound() {
		this.hitSound = await GameObject.asyncSpawn({ guid : this.weaponResources.hitOtherSound })
		this.hitSound.parent = this.weaponObj
		this.hitSoundPool = new GameDef.SimpleObjectPool<Gameplay.Sound>(this.instanceHitSound.bind(this), (sound: Gameplay.Sound) => { sound.destroy() }, (sound: Gameplay.Sound) => { sound.stop() })
	}

	/* 返回一个弹药实例 */
	private instanceAmmo() {
		let ammo = this.ammoEntityRoot.clone(false)
		ammo.detachFromGameObject()
		ammo.setVisibility(Type.PropertyStatus.On)
		return ammo
	}

	/* 返回一个弹壳实例 */
	private instanceCasing() {
		let casing = this.casingEntity.clone(false)
		casing.detachFromGameObject()
		casing.setVisibility(Type.PropertyStatus.On)
		return casing
	}

	/* 返回一个击中角色特效实例 */
	private instanceHitCharaEffect() {
		let hitChara = this.hitCharaEffect.clone(false) as Gameplay.Particle
		hitChara.detachFromGameObject()
		return hitChara
	}

	/* 返回一个击中物体特效实例 */
	private instanceHitEffect() {
		let hit = this.hitEffect.clone(false) as Gameplay.Particle
		hit.detachFromGameObject()
		return hit
	}

	/* 返回一个击中角色音效实例 */
	private instanceHitCharaSound() {
		let hitChara = this.hitCharaSound.clone(false) as Gameplay.Sound
		hitChara.detachFromGameObject()
		return hitChara
	}

	/* 返回一个击中音效实例 */
	private instanceHitSound() {
		let hit = this.hitSound.clone(false) as Gameplay.Sound
		hit.detachFromGameObject()
		return hit
	}



	/* 客户端初始化回调函数 */
	private clientInitDelegate(): void {
		this.weaponObj.onEquippedClient.add(this.onClientEquip.bind(this))
		this.weaponObj.onUnequippedClient.add(this.onClientUnequip.bind(this))

		this.weaponObj.fireComponent.onStartFireClient.add(this.onClientStartFire.bind(this))
		this.weaponObj.fireComponent.onEndFireClient.add(this.onClientEndFire.bind(this))
		if (this.weaponObj.reloadEnable) {
			this.weaponObj.reloadComponent.onStartReloadClient.add(this.onClientStartReload.bind(this))
			this.weaponObj.reloadComponent.onEndReloadClient.add(this.onClientEndReload.bind(this))
		}
		if (this.weaponObj.loadEnable) {
			this.weaponObj.loadComponent.onStartLoadClient.add(this.onClientStartLoad.bind(this))
			this.weaponObj.loadComponent.onEndLoadClient.add(this.onClientEndLoad.bind(this))
		}
		if (this.weaponObj.aimEnable) {
			this.weaponObj.aimComponent.onAimStartClient.add(this.onClientStartAim.bind(this))
			this.weaponObj.aimComponent.onAimEndClient.add(this.onClientEndAim.bind(this))
		}
		if (this.weaponObj.recoilForceEnable) {
			this.weaponObj.recoilForceComponent.onStartRecoilForceClient.add(this.onClientStartRecoil.bind(this))
		}
		if (this.weaponObj.accuracyOfFireEnable) {
			this.weaponObj.accuracyOfFireComponent.onCurrentDispersionChangedClient.add(this.onClientCurrentDispersionChanged.bind(this))
		}

		// this.clientOnHit = ((hitResult: Core.GameObject[] | Gameplay.HitResult[], attackPlayer: number, isObj: boolean) => {
		// 	if (isObj) {
		// 		for (const element of hitResult) {
		// 			console.error("hit " + (element as Core.GameObject).guid)
		// 		}
		// 	} else {
		// 		for (const element of hitResult) {
		// 			console.error("hit " + (element as Gameplay.HitResult).gameObject.guid)
		// 		}
		// 	}
		// })

		this.clientOnBlockChange = ((isBlock: boolean) => {
			console.error("isBlock " + isBlock)
		})
	}

	/* 客户端开始装备完成回调 */
	private onClientEquip() {
		console.error("ClientEquip")
		// 装备的武器如果有拾取触发器
		if (this.pickUpTrigger) {
			console.error("destroy trigger")
			this.pickUpTrigger.setCollisionEnabled(false)
		}

		// 装备的武器对象如果有武器实体，则把可见性打开
		if (!this.weaponEntityRoot) {
			this.weaponEntityRoot.setVisibility(Type.PropertyStatus.On)
		}

	}


	/* 客户端卸载装备完成回调 */
	private onClientUnequip() {
		console.error("onClientUnequip")
		if (!this.weaponObj) return
		if (this.config.isAutoDestroy) {
			this.weaponObj.setVisibility(Type.PropertyStatus.Off)
			this.weaponObj = null
		} else {
			if (this.pickUpTrigger) {
				this.weaponObj.worldRotation = new Type.Rotation(0, 0, 1)
				this.weaponObj.worldLocation = Type.Vector.add(this.weaponObj.getRightVector().multiply(100), this.weaponObj.worldLocation, this.weaponObj.worldLocation)
				this.pickUpTrigger.setCollisionEnabled(true)

			}
		}

	}

	/* 客户端开始开火回调 */
	private onClientStartFire() {
		if (!this.weaponObj) {
			return
		}
		this.isCanFire = this.weaponObj.fireComponent.currentFireInterval
		if (!this.fireEffect.loop) {
			this.fireEffect.stop()
		}
		this.fireEffect.play()
		if (!this.fireSound.loop) {
			this.fireSound.stop()
		}
		this.fireSound.play()
		// 武器持有人客户端执行
		if (this.weaponObj.getCurrentOwner() == this.chara) {
			// 如果弹药实体不为空（有弹道表现）
			if (this.ammoEntityRoot.getChildren().length > 0) {
				// 根据多重弹药数对本次发射的所有子弹对象传参
				for (let i = 0; i <this.weaponObj.fireComponent.currentMultipleShot; i++) {

					let cameraShootDir = this.camera.cameraWorldTransform.getForwardVector().clone()
					if (this.weaponObj.accuracyOfFireEnable) {
						cameraShootDir = this.weaponObj.accuracyOfFireComponent.getRandomShootDir(cameraShootDir).clone()
					}
					let endLoc = cameraShootDir.multiply(GameDef.SHOOT_RANGE).add(this.camera.cameraWorldTransform.location)
					let shootDir = endLoc.clone().subtract(this.ammoEntityRoot.worldLocation)
					let hitRes = Gameplay.lineTrace(this.camera.cameraWorldTransform.location, endLoc, true, GameDef.DEBUG_FLAG)
					hitRes = hitRes.filter(e => {
						return !(e.gameObject instanceof Gameplay.Trigger)
					})
					if (hitRes && hitRes.length > 0 && Type.Vector.dot(hitRes[0].location.clone().subtract(this.ammoEntityRoot.worldLocation), shootDir) > 0) {
						shootDir = hitRes[0].impactPoint.clone().subtract(this.ammoEntityRoot.worldLocation)
					}
					let ammoDirection = shootDir.normalized
					if (this.config.ammoSpeed < GameDef.MAX_SHOOTSPEED || this.isBlock) { // 如果弹药速度小于最大飞行速度值或者弹道有明显阻挡情况下，弹药走真实弹道
						this.serverFire(this.ammoEntityRoot.worldLocation.clone(), ammoDirection)
						if (this.ammoArray.length > this.weaponObj.fireComponent.currentClipSize) {
							let discardAmmo = this.ammoArray.shift()
							discardAmmo.destroy()
						}
						this.ammoArray.push(new Ammo(this.chara, this.ammoPool, this.ammoEntityRoot.worldLocation, ammoDirection, this.config.shootRange, this.config.ammoSpeed, this.config.gravityScale, this.config.detectRadius))
					} else { // 其余情况弹药走虚假弹道（子弹轨迹和检测轨迹不同，只是终点相同）
						this.serverFire(this.ammoEntityRoot.worldLocation.clone(), ammoDirection)
						if (this.ammoArray.length > this.weaponObj.fireComponent.currentClipSize) {
							let discardAmmo = this.ammoArray.shift()
							discardAmmo.destroy()
						}
						if (hitRes.length > 0) { // 屏幕中心射线击中
							this.ammoArray.push(new Ammo(this.chara, this.ammoPool, this.ammoEntityRoot.worldLocation, ammoDirection, shootDir.length, this.config.ammoSpeed, this.config.gravityScale, 0, hitRes))
						} else { // 屏幕中心射线未击中
							this.ammoArray.push(new Ammo(this.chara, this.ammoPool, this.ammoEntityRoot.worldLocation, ammoDirection, shootDir.length, this.config.ammoSpeed, this.config.gravityScale, 0))
						}

					}
				}
				// 如果勾选弹壳表现，则发射客户端提供弹壳弹出表现
				if (this.config.isWeaponHaveCasing) {
					this.casingArray.push(new Casing(this.casingPool, this.casingEntity, this.weaponEntityRoot.getRightVector().clone()))
				}
			} else { // 如果弹药实体为空（无弹道表现）
				let cameraShootDir = this.camera.cameraWorldTransform.getForwardVector().clone()
				if (this.weaponObj.accuracyOfFireEnable) {
					cameraShootDir = this.weaponObj.accuracyOfFireComponent.getRandomShootDir(cameraShootDir).clone()
				}
				let endLoc = cameraShootDir.multiply(GameDef.SHOOT_RANGE).add(this.camera.cameraWorldTransform.location)
				let shootDir = endLoc.clone().subtract(this.ammoEntityRoot.worldLocation)
				let hitRes = Gameplay.lineTrace(this.camera.cameraWorldTransform.location, endLoc, true, GameDef.DEBUG_FLAG)
				hitRes = hitRes.filter(e => {
					return !(e.gameObject instanceof Gameplay.Trigger)
				})
				if (hitRes && hitRes.length > 0 && Type.Vector.dot(hitRes[0].location.clone().subtract(this.ammoEntityRoot.worldLocation), shootDir) > 0) {
					shootDir = hitRes[0].impactPoint.clone().subtract(this.ammoEntityRoot.worldLocation)
				}
				let ammoDirection = shootDir.normalized
				this.weaponObj.worldRotation = ammoDirection.toRotation()
				let end = ammoDirection.clone().multiply(this.config.shootRange).add(this.ammoEntityRoot.worldLocation)
				if (this.config.detectRadius < 10) {
					let lineResult = Gameplay.lineTrace(this.ammoEntityRoot.worldLocation, end, true, GameDef.DEBUG_FLAG)
					lineResult = lineResult.filter(e => {
						return !(e.gameObject instanceof Gameplay.Trigger)
					})
					this.hit(lineResult)
				} else {
					let boxResult = Gameplay.boxOverlapInLevel(this.ammoEntityRoot.worldLocation, end, this.config.detectRadius, this.config.detectRadius, GameDef.DEBUG_FLAG)
					this.hit(boxResult)
				}
			}
		}
	}

	private updateBlockFire(): boolean {
		let flag = this.isBlock
		let lineResultMuzzle = Gameplay.lineTrace(this.ammoEntityRoot.worldLocation,
			this.ammoEntityRoot.getForwardVector().multiply(this.config.fireBlockDistance).add(this.ammoEntityRoot.worldLocation),
			true, GameDef.DEBUG_FLAG)
		lineResultMuzzle = lineResultMuzzle.filter(e => {
			return !(e.gameObject instanceof Gameplay.Trigger)
		})
		if (lineResultMuzzle.length > 0) {
			this.isBlock = true
		} else {
			this.isBlock = false
		}
		return (this.isBlock == flag)
	}

	private updatebFiring(): boolean {
		let flag = this.bFiring
		this.bFiring = this.weaponObj.fireComponent.isFiring()
		return (this.bFiring == flag)
	}

	@Core.Function(Core.Server)
	private serverFire(startLoc: Type.Vector, direction: Type.Vector): void {
		this.clientMulticastLaunch(startLoc, direction)
	}

	@Core.Function(Core.Client, Core.Multicast)
	private clientMulticastLaunch(startLoc: Type.Vector, direction: Type.Vector): void {
		if (this.weaponObj.getCurrentOwner() == this.chara) {
			return
		} else {
			if (this.ammoArray.length > this.weaponObj.fireComponent.currentClipSize) {
				let discardAmmo = this.ammoArray.shift()
				discardAmmo.destroy()
			}
			this.ammoArray.push(new Ammo(null, this.ammoPool, startLoc, direction, this.config.shootRange, this.config.ammoSpeed, this.config.gravityScale, 0))
		}
	}

	/* 客户端结束开火回调 */
	private onClientEndFire() {

	}

	/* 客户端开始换弹回调 */
	private onClientStartReload() {
		this.reloadSound.play()
	}

	/* 客户端结束换弹回调 */
	private onClientEndReload() {
		this.reloadSound.stop()
	}

	/* 客户端开始上膛回调 */
	private onClientStartLoad() {
		this.loadSound.play()
	}

	/* 客户端结束上膛回调 */
	private onClientEndLoad() {
		this.loadSound.stop()
	}

	/* 客户端开始瞄准回调 */
	private onClientStartAim() {
	}

	/* 客户端结束瞄准回调 */
	private onClientEndAim() {
	}

	/* 客户端开始后坐力回调 */
	private onClientStartRecoil() {

	}

	/* 客户端瞄准精度变化回调 */
	private onClientCurrentDispersionChanged() {
		if (this.weaponUI) {
			this.weaponUI.changeCross(this.weaponObj.accuracyOfFireComponent.getCurrentDispersionHalfAngle() * 10)
		}
	}

	// 视角放大
	private zoomIn() {
		if (this.camera == null) return
		console.error("zoomin")
		this.isAimming = true

	}

	// 视角缩小
	private zoomOut() {
		if (this.camera == null) return
		console.error("zoomOut")
		this.isAimming = false
	}

	/* 摄像机update */
	private cameraUpdate(dt: number) {
		if (!this.isZooming) return
		if (this.isAimming) {
			this.camera.cameraFOV -= dt * this.config.aimSpeed
			if (this.camera.cameraFOV < this.config.aimCameraFov) {
				this.camera.cameraFOV = this.config.aimCameraFov
				this.isZooming = false
			}
		} else {
			this.camera.cameraFOV += dt * this.config.aimSpeed
			if (this.camera.cameraFOV > this.config.equipmentCameraFov) {
				this.camera.cameraFOV = this.config.equipmentCameraFov
				this.isZooming = false
			}
		}
	}

	/* 解析资源ID列表 */
	private resolveString(assetIds: string): string[] {
		let assetIdArray: string[] = new Array<string>()
		let assetId: string = ""
		let s = assetIds.split("")
		for (let a of s) {
			if (a == ",") {
				assetIdArray.push(assetId)
				assetId = ""
			} else {
				assetId += a
			}
		}
		if (assetId) {
			assetIdArray.push(assetId)
		}
		return assetIdArray
	}

	@Core.Function(Core.Client)
	private clientOnIDChanged(id:number){
		this.id = id;
		this.onIdChanged()
	}

	private onIdChanged(){
		console.log('onIdChanged')
		this.config = GameConfig.WeaponConfig.getElement(this.id)
		this.isAutoReload = this.config.isAutoReload
		this.totalAmmo = this.config.totalAmmo
		this.weaponResources = GameConfig.WeaponResources.getElement(this.config.resourcesId)	
		let maleAction = GameConfig.Action.getElement(this.config.maleAction)
		let femaleAction = GameConfig.Action.getElement(this.config.femaleAction)
		if(this.isRunningClient()){
			for (const key in maleAction) {
				if (Object.prototype.hasOwnProperty.call(maleAction, key)) {
					const element = maleAction[key];
					if (key != "id") {
						Util.AssetUtil.asyncDownloadAsset(element)
					}
				}
			}
			for (const key in femaleAction) {
				if (Object.prototype.hasOwnProperty.call(maleAction, key)) {
					const element = maleAction[key];
					if (key != "id") {
						Util.AssetUtil.asyncDownloadAsset(element)
					}
				}
			}
			for (const key in this.weaponResources) {
				if (Object.prototype.hasOwnProperty.call(maleAction, key)) {
					const element = maleAction[key];
					if (key != "id") {
						Util.AssetUtil.asyncDownloadAsset(element)
					}
				}
			}
		}
		this.hasInit = true
	}
}