import { def } from './utils.js'
import defineReactive from './defineReactive.js'
import { arrayMethods } from './array.js'
import observe from './observe.js'
import Dep from './Dep.js'
export default class Observer {
  constructor (value) {
    // 每个 Observer 实例，都有一个属性是 Dep 的实例
    this.dep = new Dep()
    // 将 Observer 实例设为 value 的 __ob__ 属性
    def(value, '__ob__', this, false)
    // Observer 类的目的是：将一个普通的 object 每个层级的属性都变为响应式
    if (Array.isArray(value)) {
      // 如果是数组，将数组原型指向改写数组方法后的 arrayMethods
      Object.setPrototypeOf(value, arrayMethods)
      this.observeArray(value)
    } else {
      this.walk(value)
    }
  }
  // 遍历对象属性
  walk (value) {
    for (let k in value) {
      defineReactive(value, k)
    }
  }
  // 遍历数组元素
  observeArray (arr) {
    // 不直接写 i < arr.length，避免特殊情况遍历过程中数组长度变化
    for (let i = 0, l = arr.length; i < l; i++) {
      observe(arr[i])
    }

  }
}