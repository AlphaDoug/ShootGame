/*
 * @Author       : xin.zhang xin.zhang@appshahe.com
 * @Date         : 2023-03-22 16:42:04
 * @LastEditors: chen.liang chen.liang@appshahe.com
 * @LastEditTime: 2023-07-18 18:41:34
 * @FilePath: \commonprefab\JavaScripts\Prefabs\prefabEvent\PrefabEvtUI.ts
 * @Description  : 
 */

import PrefabEvtUI_Generate from "../ui-generate/PrefabEvtUI_generate"


export class PrefabEvtUI extends PrefabEvtUI_Generate {
    private _char: Gameplay.Character

    private _flyMove: Vector = Vector.zero

    onStart() {
        this.layer = UI.UILayerMiddle
        Gameplay.asyncGetCurrentPlayer().then((player: Gameplay.Player) => {
            this._char = player.character
        })
        this.mFlyUpBtn.onPressed.add(() => {
            this._flyMove.z += 1
            this.canUpdate = true
        })
        this.mFlyDownBtn.onPressed.add(() => {
            this._flyMove.z -= 1
            this.canUpdate = true
        })
        this.mFlyDownBtn.onReleased.add(() => {
            this._flyMove.z += 1
            this._char.addMoveInput(Vector.zero)
            if (this._flyMove.z == 0) {
                this.canUpdate = false
            }
        })
        this.mFlyUpBtn.onReleased.add(() => {
            this._flyMove.z -= 1
            this._char.addMoveInput(Vector.zero)
            if (this._flyMove.z == 0) {
                this.canUpdate = false
            }
        })
    }

    onUpdate() {
        this._char.addMoveInput(this._flyMove)
    }


    setFlyCanvas(isShow: boolean) {
        this.mFlyCanvas.visibility = isShow ? UI.SlateVisibility.SelfHitTestInvisible : UI.SlateVisibility.Collapsed
    }
}