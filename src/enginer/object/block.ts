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
  private ftop: Laya.Sprite
  private fbody: Laya.Sprite
  private fbsrc: string = '../../../static/res/player.png'
  constructor (x, y) {
    super(x, y, blockSize.floorSize.width, blockSize.floorSize.height)
  }
  loadBg () {
    // 创建土地顶部
    this.ftop = new Laya.Sprite()
    // 加载并显示图
    this.ftop.loadImage('../../../static/res/land1.gif')
    this.ftop.pos(this.x, this.y)
    // 把背景图显示在容器内
    this.addChild(this.ftop)
    // 创建土地内部
    // this.fbody = new Laya.Sprite()
    // Laya.loader.load(this.fbsrc, Laya.Handler.create(this, this.onLoaded))
  }
  onLoaded () {
    console.log('hello')
    const img = Laya.loader.getRes(this.fbsrc)
    this.fbody.graphics.fillTexture(img, 0, 0,
                                    blockSize.floorSize.width, stageSize.height - this.y - 60)
    this.fbody.x = this.x
    this.fbody.y = this.y + 60
    this.addChild(this.fbody)
  }
}
