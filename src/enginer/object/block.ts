/**
 * Created by wconisan on 2018/2/5.
 */
import Base from './base'
import { stageSize, blockSize } from '../const'

// 障碍物基类
export abstract class Block extends Base {
  public preX: number = stageSize.width
  constructor (x, y, w, h) {
    super(x, y, w, h)
    this.visible = false
  }
  abstract loadBg (): void
}
// 水管
export class Pipe extends Block {
  private h: number
  constructor (x, y, h) {
    super(x, y, blockSize.pipeSize.width, h)
    this.h = h
  }
  public loadBg () {
    this.graphics.drawRect(0, 0, blockSize.pipeSize.width, this.h, '#DDD')
  }
}

// 地板
export class Floor extends Block {
  constructor (x, y) {
    super(x, y, blockSize.floorSize.width, blockSize.floorSize.height)
  }
  public loadBg () {
    this.graphics.drawRect(0, 0, blockSize.floorSize.width, blockSize.floorSize.height, '#f00')
  }
}
