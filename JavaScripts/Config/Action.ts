import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","sex","shootAnimation","aimShootAnimation","reloadAnimation","loadAnimation","equipAnimation","unequipAnimation","holdStance","aimStance"],[1,"male",80484,80485,80486,80487,80488,80489,80490,80491],[2,"female","80485","80486","80487","80488","80489","80490","80491","80492"]];
export interface IActionElement extends IElementBase{
 	/**动画ID*/
	id:number
	/**性别*/
	sex:string
	/**射击动画*/
	shootAnimation:string
	/**瞄准射击动画*/
	aimShootAnimation:string
	/**换弹动画*/
	reloadAnimation:string
	/**上膛动画*/
	loadAnimation:string
	/**装备武器动画*/
	equipAnimation:string
	/**卸载武器动画*/
	unequipAnimation:string
	/**持有姿态*/
	holdStance:string
	/**瞄准姿态*/
	aimStance:string
 } 
export class ActionConfig extends ConfigBase<IActionElement>{
	constructor(){
		super(EXCELDATA);
	}

}