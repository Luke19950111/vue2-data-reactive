
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
  }
}

observe(obj)
