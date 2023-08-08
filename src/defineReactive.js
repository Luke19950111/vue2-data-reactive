import observe from './observe.js'
import Dep from './Dep.js'
 export default function defineReactive (data, key, val) {
  console.log('defineReactive', key)
  
  // defineReactive 闭包中的 dep，和 Observer 实例中的 dep 不是同一个
  const dep = new Dep()

  if (arguments.length == 2) {
    val = data[key]
  }

  // 对子元素调用 observe，形成递归。这个递归不是自己调用自己，而是多个函数、类循环调用形成（observe => Observer => definReactive => observe...）
  let childOb = observe(val)

  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get() {

      // 如果处于依赖收集阶段
      if (Dep.target) {
        dep.depend()
        if (childOb) {
          childOb.dep.depend()
        }
      }

      return val
    },
    set(newValue) {
      if (val === newValue) {
        return
      }
      val = newValue
      // 当设置了新值，新值也要被 observe，新值可能也是一个对象
      childOb = observe(newValue)

      // 发布订阅模式，触发 set 是通知
      dep.notify()
    }
  })
 }