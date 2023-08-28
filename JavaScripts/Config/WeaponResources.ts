import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","weaponMesh","hitRoleEffect","hitOtherEffect","fireEffect","ammo","casing","fireSound","reloadSound","loadSound","aimSound","hitRoleSound","hitOtherSound"],["","","","","","","","","","","","",""],[1,"43704","1","2","3","4","2","5","6","7","8","9","10"]];
export interface IWeaponResourcesElement extends IElementBase{
 	/**资产ID*/
	id:number
	/**武器模型*/
	weaponMesh:string
	/**命中角色特效*/
	hitRoleEffect:string
	/**命中物体特效*/
	hitOtherEffect:string
	/**开火特效*/
	fireEffect:string
	/**弹药*/
	ammo:string
	/**弹壳*/
	casing:string
	/**开火音效*/
	fireSound:string
	/**换弹音效*/
	reloadSound:string
	/**上膛音效*/
	loadSound:string
	/**瞄准音效*/
	aimSound:string
	/**命中角色音效*/
	hitRoleSound:string
	/**命中物体音效*/
	hitOtherSound:string
 } 
export class WeaponResourcesConfig extends ConfigBase<IWeaponResourcesElement>{
	constructor(){
		super(EXCELDATA);
	}

}