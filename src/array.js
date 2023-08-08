// 1、以 Array.prototype 为原型创建对象 arrayMethods
// 2、在arrayMethods 上改写七个数组方法
// 3、在 Observer 类里判断，如果处理的属性是数组，将改数组的原型改为 arrayMethods
// Object.setPrototypeOf(arr, arrayMethods) 相当于 arr.__proto__ = arrayMethods
// 4、遍历数组元素，调用 observe，使数组的每个元素都变为响应式
// 5、push、unshift、splice 可能往数组里插入新元素，需要对新元素也 observe()

import { def } from './utils.js'

// 以 Array.prototype 为原型创建对象 arrayMethods
const arrayPrototype = Array.prototype
export const arrayMethods = Object.create(arrayPrototype)

// 要被改写的7个数组方法
const methodsNeedChange = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]

methodsNeedChange.forEach(methodName => {
  // 备份原来的方法
  const original = arrayPrototype[methodName]
  // 定义新的方法
  def(arrayMethods, methodName, function () {
    
    // 最外层传入 observe 的 data 一定是对象，第一次遍历 data 对象时给所有的第一层根属性都调用了 observe，所以数组上一定有 __ob__
    const ob = this.__ob__ // this 就是调用方法的数组
    // push、unshift、splice 能够插入新元素，要把插入的新元素也 observe
    const args = [...arguments]
    let inserted = []
    switch (methodName) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
        break
    }
    if (inserted.length) {
      ob.observeArray(inserted)
    }

    console.log(`调用改写后的数组方法${methodName}`)
    const result = original.apply(this, arguments) // this 就是调用方法的数组

    ob.dep.notify()

    return result
  }, false)
})