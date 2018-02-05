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

export class Pipe extends Block {
  constructor (x, y, w, h, img) {
    super(x, y, w, h, img)
    console.log('这是个水管')
  }
}
