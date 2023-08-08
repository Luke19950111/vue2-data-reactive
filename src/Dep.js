var uid = 0
export default class Dep {
  constructor() {
    this.id = uid++

    // 每个 dep 实例用数组存储自己的订阅者，每个订阅者都是 Watcher 的实例
    this.subs = []
  }
  // 添加订阅
  addSub(sub) {
    this.subs.push(sub)
  }
  // 通知更新
  notify() {
    console.log('notify')

    // 浅拷贝
    const subs = this.subs.slice()
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update()
    }
  }
  // 添加依赖
  depend() {
    // Dep.target 只是一个指定的全局位置，用 window.target 也行，只要是全局唯一
    if (Dep.target) {
      this.addSub(Dep.target)
    }
  }
}