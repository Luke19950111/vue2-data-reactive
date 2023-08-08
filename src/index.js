
import observe from './observe.js'
import Watcher from './Watcher.js'

var obj = {
  a: {
    b: {
      c: 100
    }
  },
  m: 100,
  x: {
    y: {
      z: {
        t: 200
      }
    }
  },
  arr: [1, 2, 3, 4, 5]
}

observe(obj)
new Watcher(obj, 'a.b.c', (val, oval) => {
  console.log(val, 'nval')
  console.log(oval, 'oval')
})
obj.a.b.c = 200
obj.arr.push([22, 33])
obj.arr[5].splice(0, 0, 'haha')
console.log(obj)
