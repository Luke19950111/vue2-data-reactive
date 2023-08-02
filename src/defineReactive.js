import observe from './observe.js'
 export default function defineReactive (data, key, val) {
  console.log('defineReactive', key)
  if (arguments.length == 2) {
    val = data[key]
  }

  // 对子元素调用 observe，形成递归。这个递归不是自己调用自己，而是多个函数、类循环调用形成（observe => Observer => definReactive => observe...）
  let childOb = observe(val)

  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get() {
      return val
    },
    set(newValue) {
      if (val === newValue) {
        return
      }
      val = newValue
      // 当设置了新值，新值也要被 observe，新值可能也是一个对象
      childOb = observe(newValue)
    }
  })
 }