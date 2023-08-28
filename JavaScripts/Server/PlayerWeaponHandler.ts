import WeaponDriver from "../WeaponBase/WeaponBaseCls";

@Core.Class
export default class PlayerWeaponHandler extends Core.Script {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected async onStart() {
        TimeUtil.delaySecond(10)
        let HotWeapon = await GameObject.asyncSpawn({ guid : "HotWeapon", replicates : true})
        let ins = await Script.spawnScript(WeaponDriver, true, HotWeapon)
        ins.InitWeapon(100)
    }

    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    protected onUpdate(dt: number): void {

    }

    /** 脚本被销毁时最后一帧执行完调用此函数 */
    protected onDestroy(): void {

    }
}