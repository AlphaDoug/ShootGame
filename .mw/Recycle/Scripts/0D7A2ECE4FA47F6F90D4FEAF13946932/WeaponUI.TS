import WeaponUI_Generate from "../ui-generate/WeaponUI_generate";
import WeaponDriver from "./WeaponBaseCls";

export default class WeaponUI extends WeaponUI_Generate{
    curWeapon: WeaponDriver = null;

    upPosition: Type.Vector2 = Type.Vector2.zero;
    downPosition: Type.Vector2 = Type.Vector2.zero;
    leftPosition: Type.Vector2 = Type.Vector2.zero;
    rightPosition: Type.Vector2 = Type.Vector2.zero;

    upCurPosition: Type.Vector2 = Type.Vector2.zero;
    downCurPosition: Type.Vector2 = Type.Vector2.zero;
    leftCurPosition: Type.Vector2 = Type.Vector2.zero;
    rightCurPosition: Type.Vector2 = Type.Vector2.zero;

    protected onStart() {

        this.right_fire.onJoyStickDown.add(() => {
            console.error("right_fire onJoyStickDown");
            if (!this.curWeapon) return;
            this.curWeapon.startFire();
        });

        this.right_fire.onJoyStickUp.add(() => {
            console.error("right_fire onJoyStickUp");
            if (!this.curWeapon) return;
            this.curWeapon.stopFire();
        });

        this.left_fire.onPressed.add(() => {
            console.error("left_fire onPressed");
            if (!this.curWeapon) return;
            this.curWeapon.startFire();
        });
 
        this.left_fire.onReleased.add(() => {
            console.error("left_fire onReleased");
            if (!this.curWeapon) return;
            this.curWeapon.stopFire();
        });

        this.reload.onClicked.add(() => {
            console.error("reload onClicked");
            if (!this.curWeapon) return;
            this.curWeapon.startReload();
        });

        this.aim.onClicked.add(() => {
            console.error("aim onClicked");
            if (!this.curWeapon) return;
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
        })
    }

    protected onShow(weapon: WeaponDriver, crossValue: number, iconId: string, weaponName: string) {
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

    protected onHide() {
        console.error("hide");
        this.changeCross(0);
    }

    changeBullet(bullet: number, ammo: number) {
        if (ammo == -1) {
            this.bullet.text = `${bullet} / NAN`;
        }
        else {
            this.bullet.text = `${bullet} / ${ammo}`;
        }
    }

    changeCross(value: number) {
        this.up.position = this.upCurPosition.set(this.upPosition.x, this.upPosition.y - value);
        this.down.position = this.downCurPosition.set(this.downPosition.x, this.downPosition.y + value);
        this.left.position = this.leftCurPosition.set(this.leftPosition.x - value, this.leftPosition.y);
        this.right.position = this.rightCurPosition.set(this.rightPosition.x + value, this.rightPosition.y);
    }

    public setTimeText(restTime: number, keepTime: number) {
        if (restTime <= 0) {
            this.mKeepTimeCanvas.visibility = UI.SlateVisibility.Collapsed;
        }
        else {
            this.mKeepTimeCanvas.visibility = UI.SlateVisibility.SelfHitTestInvisible;
            let percent = restTime / keepTime;
            this.keepTimeBar.percent = percent;
            this.keepTimeTxt.text = `${restTime.toFixed(1)}s`
        }
    }

    public setReloadBtn(enable: boolean) {
        this.reload.visibility = enable ? UI.SlateVisibility.Visible : UI.SlateVisibility.Collapsed;
    }
}