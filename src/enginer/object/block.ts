/**
 * Created by wconisan on 2018/2/5.
 */
import Base from './base'
import { stageSize, blockSize } from '../const'

// 障碍物基类
class Block extends Base {
  public preX: number = stageSize.width
  constructor (x, y, w, h) {
    super(x, y, w, h)
    this.visible = false
  }
}
// 水管
export class Pipe extends Block {
  constructor (x, y, w, h) {
    super(x, y, w, h)
    console.log('这是个水管')
  }
}

// 地板
export class Floor extends Block {
  constructor (x, y) {
    super(x, y, blockSize.floorSize.width, blockSize.floorSize.height)
    console.log('这是个土块')
  }
  public loadBg () {
    this.graphics.drawRect(0, 0, blockSize.floorSize.width, blockSize.floorSize.height, '#f00')
  }
}
