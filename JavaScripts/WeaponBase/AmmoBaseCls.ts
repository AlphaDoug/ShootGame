import { GameDef } from "../GameDef";

export default class Ammo {
    owner: Gameplay.Character; // 弹药所属角色
    hitResult: Core.GameObject[] | Gameplay.HitResult[]; // 击中结果

    private ammoPool: GameDef.SimpleObjectPool<Core.GameObject>; // 弹药对象池
    private entity: Core.GameObject; // 弹药实体
    private displacement: Type.Vector; // 每秒位移
    private currentLocation: Type.Vector; // 当前位置
    private gravityScale: number; // 重力系数
    private lifeTime: number; // 生命周期
    private currentTime: number; // 当前运动时间
    private stride: Type.Vector; // 步长
    private detectRadius: number; // 碰撞检测半径	

    constructor(owner: Gameplay.Character, ammoPool: GameDef.SimpleObjectPool<Core.GameObject>, startLoc: Type.Vector, direction: Type.Vector, shootRange: number, ammoSpeed: number, gravityScale: number, detectRadius: number, hitResult: Core.GameObject[] | Gameplay.HitResult[] = []) {
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

    // 更新弹药位置，发射客户端承担检测
    public update(dt: number): boolean {
        // 计算当前帧弹药移动步长
        this.stride = Type.Vector.multiply(this.displacement, dt, this.stride);
        // 如果重力系数不为0则对z轴坐标和旋转进行进一步计算
        if (this.gravityScale) {
            this.stride.z -= (50 * this.gravityScale * GameDef.GRAVITAIONAL_ACCELERATION * (Math.pow(this.currentTime + dt, 2) - Math.pow(this.currentTime, 2)));
            this.entity.worldRotation = this.stride.toRotation();
            this.currentTime += dt;
        }
        // 计算出当前更新位置
        this.currentLocation.x += this.stride.x;
        this.currentLocation.y += this.stride.y;
        this.currentLocation.z += this.stride.z;

        // 如果检测范围大于0，每帧检测碰撞（只有武器持有人客户端子弹进行检测，其余客户端只是模拟）
        if (this.detectRadius) {
            // 如果检测范围小于10，射线检测，返回Gameplay.HitResult数组
            if (this.detectRadius < 10) {
                let lineResult = Gameplay.lineTrace(this.entity.worldLocation, this.currentLocation, true, GameDef.DEBUG_FLAG);
                lineResult = lineResult.filter(e => {
                    return !(e.gameObject instanceof Gameplay.Trigger)
                })
                // 射线检测结果不为0，即有碰撞对象
                if (lineResult.length > 0) {
                    // 终结弹药生命，获取检测结果
                    this.lifeTime = -1;
                    let temp = new Array<Gameplay.HitResult>();
                    for (let element of lineResult) {
                        temp.push(element);
                    }
                    this.hitResult = temp;
                }
            } else { // 如果检测范围大于等于10，矩形检测，返回Core.GameObject数组
                let boxResult = Gameplay.boxOverlapInLevel(this.entity.worldLocation, this.currentLocation, this.detectRadius, this.detectRadius, GameDef.DEBUG_FLAG);
                // 射线检测结果不为0，即有碰撞对象
                if (boxResult.length > 0) {
                    // 终结弹药生命，获取检测结果
                    this.lifeTime = -1;
                    this.hitResult = boxResult;
                }

            }
        }
        // 更新弹药实体位置，弹药生命-=当前帧时间，返回弹药生命<0的Boolean值
        this.entity.worldLocation = this.currentLocation;
        this.lifeTime -= dt;
        return this.lifeTime <= 0;
    }

    // 销毁弹药方法，对象池回收弹药实体
    public destroy(): void {
        this.ammoPool.recycle(this.entity);
    }

}