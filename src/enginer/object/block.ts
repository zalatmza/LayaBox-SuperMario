/**
 * Created by wconisan on 2018/2/5.
 */
import Base from './base'
// 障碍物基类
class Block extends Base {
  constructor (x, y, w, h, img) {
    super(x, y, w, h, img)
  }
}
// 水管
export class Pipe extends Block {
  constructor (x, y, w, h) {
    super(x, y, w, h, require(''))
    console.log('这是个水管')
  }
}

// 地板
export class Floor extends Block {
  constructor (x, y, w, h) {
    super(x, y, w, h, require(''))
    console.log('这是个土块')
  }
}
