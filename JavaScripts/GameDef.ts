export namespace GameDef{
    /* 对象池接口 */
    export interface IPool<T> {

        allocate(): T
    
        recycle(obj: T): boolean
    
        release(): void
    
    }
    /* 对象工厂接口 */
    export interface IObjectFactory<T> {

        create(): T

        destroy(obj: T): void

    }
    /* 对象池抽象模板类 */
    export abstract class Pool<T> implements IPool<T> {

        protected mCacheStack: Array<T> = new Array<T>()

        mUsingArray: Array<T> = new Array<T>()

        get CacheStackCount(): number {
            return this.mCacheStack.length
        }

        get UsingCount(): number {
            return this.mUsingArray.length
        }

        protected mFactory: IObjectFactory<T>

        allocate(): T {
            let obj = this.mCacheStack.length > 0 ? this.mCacheStack.pop() : this.mFactory.create()
            this.mUsingArray.push(obj)
            return obj
        }

        abstract recycle(obj: T): boolean

        release(): void {
            for (let i = 0 ;i < this.mUsingArray.length ;i++) {
                const element = this.mUsingArray[i]
                this.mFactory.destroy(element)
            }
            this.mUsingArray.length = 0

            for (let i = 0 ;i < this.mCacheStack.length ;i++) {
                const element = this.mCacheStack[i]
                this.mFactory.destroy(element)
            }
            this.mCacheStack.length = 0
        }

    }
    /* 自定义工厂模板类 */
    export class CustomObjectFactory<T> implements IObjectFactory<T> {

        private mFactoryCreateMethod: () => T

        private mFactoryDestroyMethod: (obj: T) => void


        constructor(factoryCreateMethod: () => T, factoryDestroyMethod: (obj: T) => void) {
            this.mFactoryCreateMethod = factoryCreateMethod
            this.mFactoryDestroyMethod = factoryDestroyMethod
        }

        create(): T {
            return this.mFactoryCreateMethod()
        }

        destroy(obj: T): void {
            return this.mFactoryDestroyMethod(obj)
        }

    }
    /* 对象池模板类 */
    export class SimpleObjectPool<T> extends Pool<T> {

        mResetMethod: Function

        constructor(factoryCreateMethod: () => T, factoryDestroyMethod: (obj: T) => void, resetMethod: Function = null) {
            super()
            this.mFactory = new CustomObjectFactory<T>(factoryCreateMethod, factoryDestroyMethod)
            this.mResetMethod = resetMethod
        }

        recycle(obj: T): boolean {
            if (this.mCacheStack.indexOf(obj) > -1) {
                return
            }
            if (this.mResetMethod != null) {
                this.mResetMethod(obj)
            }
            let index = this.mUsingArray.indexOf(obj)
            if (index > -1) {
                this.mUsingArray.splice(index, 1)
            }
            this.mCacheStack.push(obj)
            return true
        }

        recycleAll() {
            for (let i = 0 ;i < this.mUsingArray.length ;i++) {
                const element = this.mUsingArray[i]
                this.mResetMethod(element)
                this.mCacheStack.push(element)
            }
            this.mUsingArray.length = 0
        }

        printTotalSize(): void {
            console.error("total size: " + (this.UsingCount + this.CacheStackCount))
        }
    }
    /* 重力 */
    export const GRAVITAIONAL_ACCELERATION: number = 9.8
    /* 最大子弹速度 */
    export const MAX_SHOOTSPEED: number = 10001
    /* debug标识 */
    export const DEBUG_FLAG: boolean = false
    /* 用于获取发射方向的射程距离 */
    export const SHOOT_RANGE: number = 100000
    /* 弹壳抛射持续时间 */
    export const CASING_LIFE: number = 1
    /* 弹壳抛射位置偏移 */
    export const CASING_OFFSET: Type.Vector = new Type.Vector(8, 5, 10)
}