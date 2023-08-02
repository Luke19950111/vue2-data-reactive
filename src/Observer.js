import { def } from './utils.js'
import defineReactive from './defineReactive.js'

export default class Observer {
  constructor (value) {
    // 将 Observer 实例设为 value 的 __ob__ 属性
    def(value, '__ob__', this, false)
    // Observer 类的目的是：将一个普通的 object 每个层级的属性都变为响应式
    this.walk(value)
  }
  walk (value) {
    for (let k in value) {
      defineReactive(value, k)
    }
  }
}