import Dep from "./Dep.js"
var uid = 0
export default class Watcher {
  constructor(target, expression, callback) {
    this.id = uid++
    this.target = target
    this.getter = parsePath(expression)
    this.callback = callback
    this.value = this.get()
  }
  get() {
    // 进入依赖收集阶段。将当前 watcher 实例设置到 Dep.target，Dep.target 有值则进入依赖收集阶段
    Dep.target = this
    
    const obj = this.target
    var value
    try {
      value = this.getter(obj)
    } finally {
      Dep.target = null
    }
    return value
  }
  update() {
    this.run()
  }
  run() {
    this.getAndInvoke(this.callback)
  }
  getAndInvoke(cb) {
    const value = this.get()

    if (value !==this.value || typeof value == 'object') {
      const oldValue = this.value
      this.value = value
      cb.call(this.target, value, oldValue)
    }
  }
}

function parsePath(str) {
  // a.b.c.d
  var segments = str.split('.')

  return (obj) => {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) return
      obj = obj[segments[i]]
    }
    return obj
  }
}