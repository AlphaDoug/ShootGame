import { GameDef } from "../GameDef";

// 弹壳类
export default class Casing {
	private casingPool: GameDef.SimpleObjectPool<Core.GameObject>; // 弹壳对象池
	private entity: Core.GameObject; // 弹壳实体
	private displacement: Type.Vector; // 位移
	private loc: Type.Vector; // 当前位置
	private gravity: number; // 重力
	private lifeTime: number; // 生命周期
	private stride: Type.Vector; // 步长

	constructor(casingPool: GameDef.SimpleObjectPool<Core.GameObject>, casing: Core.GameObject, direction: Type.Vector) {
		this.casingPool = casingPool;
		this.loc = Type.Vector.add(casing.worldLocation, casing.worldRotation.rotateVector(GameDef.CASING_OFFSET));
		this.entity = this.casingPool.allocate();
		this.entity.worldLocation = this.loc;
		this.entity.worldRotation = new Type.Rotation(Util.MathUtil.randomFloat(0, 180), Util.MathUtil.randomFloat(0, 180), Util.MathUtil.randomFloat(0, 180));
		this.entity.setVisibility(Type.PropertyStatus.On);
		this.displacement = direction.multiply(100);
		this.gravity = Util.MathUtil.randomFloat(1, 3);
		this.lifeTime = GameDef.CASING_LIFE;
		this.stride = Type.Vector.zero;
	}

	// 更新弹壳位置
	update(dt: number) {
		this.stride = Type.Vector.multiply(this.displacement, dt, this.stride);
		this.loc.x += this.stride.x;
		this.loc.y += this.stride.y;
		this.loc.z += this.stride.z + this.gravity;
		this.gravity -= dt * 20;
		this.entity.worldLocation = this.loc;
		this.lifeTime -= dt;
		return this.lifeTime <= 0;
	}

	// 销毁弹壳方法，对象池回收弹壳实体
	destroy() {
		this.casingPool.recycle(this.entity);

	}
}