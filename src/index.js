
import observe from './observe.js'

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
obj.arr.push([22, 33])
obj.arr[5].splice(0, 0, 'haha')
console.log(obj)