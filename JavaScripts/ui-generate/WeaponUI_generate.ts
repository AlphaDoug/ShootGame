
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 执笔经年
 * UI: UI/WeaponUI.ui
 * TIME: 2023.08.28-12.21.57
*/



@UI.UICallOnly('UI/WeaponUI.ui')
export default class WeaponUI_Generate extends UI.UIBehavior {
	@UI.UIMarkPath('RootCanvas/point')
    public point: UI.Image=undefined;
    @UI.UIMarkPath('RootCanvas/up')
    public up: UI.Image=undefined;
    @UI.UIMarkPath('RootCanvas/down')
    public down: UI.Image=undefined;
    @UI.UIMarkPath('RootCanvas/left')
    public left: UI.Image=undefined;
    @UI.UIMarkPath('RootCanvas/right')
    public right: UI.Image=undefined;
    @UI.UIMarkPath('RootCanvas/move')
    public move: UI.VirtualJoystickPanel=undefined;
    @UI.UIMarkPath('RootCanvas/right_fire')
    public right_fire: UI.VirtualJoystickPanel=undefined;
    @UI.UIMarkPath('RootCanvas/reload')
    public reload: UI.Button=undefined;
    @UI.UIMarkPath('RootCanvas/crouch')
    public crouch: UI.Button=undefined;
    @UI.UIMarkPath('RootCanvas/jump')
    public jump: UI.Button=undefined;
    @UI.UIMarkPath('RootCanvas/aim')
    public aim: UI.Button=undefined;
    @UI.UIMarkPath('RootCanvas/left_fire')
    public left_fire: UI.Button=undefined;
    @UI.UIMarkPath('RootCanvas/icon')
    public icon: UI.Image=undefined;
    @UI.UIMarkPath('RootCanvas/name')
    public name: UI.TextBlock=undefined;
    @UI.UIMarkPath('RootCanvas/bullet')
    public bullet: UI.TextBlock=undefined;
    @UI.UIMarkPath('RootCanvas/mKeepTimeCanvas')
    public mKeepTimeCanvas: UI.Canvas=undefined;
    @UI.UIMarkPath('RootCanvas/mKeepTimeCanvas/keepTimeBar')
    public keepTimeBar: UI.ProgressBar=undefined;
    @UI.UIMarkPath('RootCanvas/mKeepTimeCanvas/keepTimeTxt')
    public keepTimeTxt: UI.TextBlock=undefined;
    

 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}
	 
}
 