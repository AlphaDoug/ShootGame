import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name","maleAction","femaleAction","weaponIcon","equipmentSlot","equipmentCameraOffset","resourcesId","useClass","equipmentCameraFov","aimCameraOffset","aimCameraFov","aimSpeed","damage","shootRange","ammoSpeed","detectRadius","gravityScale","hurtRadius","isAutoReload","isAutoLock","isDefaultUI","isWeaponHaveCasing","fireBlockDistance","totalAmmo","isEmptyToDestroy","isSupportRepAmmo","rotateSpeed","keepTime","isWeaponHaveScope","isAutoDestroy"],[100,"测试手枪",1,2,23234,"Right_Hand","0|0|0",1,"Sniper",90,"0|0|0",60,1,1,1,1,1,10,1,1,1,1,1,1,12,1,1,12,12,1,1]];
export interface IWeaponConfigElement extends IElementBase{
 	/**枪械ID*/
	id:number
	/**枪械名字*/
	name:string
	/**枪械男性动画*/
	maleAction:number
	/**枪械女性动画*/
	femaleAction:number
	/**武器图标*/
	weaponIcon:string
	/**装备插槽*/
	equipmentSlot:string
	/**装备视角偏移*/
	equipmentCameraOffset:Type.Vector
	/**枪械使用资产ID*/
	resourcesId:number
	/**枪械类*/
	useClass:string
	/**FOV*/
	equipmentCameraFov:number
	/**瞄准视角偏移*/
	aimCameraOffset:Type.Vector
	/**瞄准FOV*/
	aimCameraFov:number
	/**瞄准聚焦速度*/
	aimSpeed:number
	/**武器基础伤害*/
	damage:number
	/**最大射程*/
	shootRange:number
	/**弹药速度*/
	ammoSpeed:number
	/**碰撞半径*/
	detectRadius:number
	/**重力系数*/
	gravityScale:number
	/**伤害范围*/
	hurtRadius:number
	/**自动换弹*/
	isAutoReload:boolean
	/**辅助瞄准*/
	isAutoLock:boolean
	/**默认UI*/
	isDefaultUI:boolean
	/**弹壳弹出*/
	isWeaponHaveCasing:boolean
	/**开火阻挡距离*/
	fireBlockDistance:number
	/**弹药数量(-1为无限) */
	totalAmmo:number
	/**弹夹为空是否销毁武器*/
	isEmptyToDestroy:boolean
	/**支持替换弹夹*/
	isSupportRepAmmo:boolean
	/**模型旋转速度*/
	rotateSpeed:number
	/**持有时限（s）（-1为永久持有）*/
	keepTime:number
	/**瞄准镜*/
	isWeaponHaveScope:boolean
	/**自动销毁*/
	isAutoDestroy:boolean
 } 
export class WeaponConfigConfig extends ConfigBase<IWeaponConfigElement>{
	constructor(){
		super(EXCELDATA);
	}

}