/**
 * Created by wconisan on 2018/2/5.
 */
import Base from './base'
import { stageSize, blockSize } from '../const'

// 障碍物基类
export abstract class Block extends Base {
  constructor (x, y, w, h) {
    super(x, y, w, h)
    this.visible = false
  }
  abstract loadBg (): void
}

// 砖块
export class Brick extends Block {
  private brickSrc = '../../../static/res/brick1.png'
  constructor (x, y, w, h) {
    super(x, y, w, h)
  }
  public loadBg () {
    Laya.loader.load(this.brickSrc, Laya.Handler.create(this, this.onLoaded))
  }
  onLoaded () {
    const bimg = Laya.loader.getRes(this.brickSrc)
    this.graphics.fillTexture(bimg, 0, 0, this.width, this.height)
  }
}

// 水管
export class Pipe extends Block {
  private ptop: Laya.Sprite
  private pbody: Laya.Sprite
  private ptsrc = '../../../static/res/pipe1.png'
  private pbsrc = '../../../static/res/pipe2.png'
  constructor (x, y, h) {
    super(x, y, blockSize.pipeSize.width1, h)
  }
  public loadBg () {
    // 创建水管顶部
    this.ptop = new Laya.Sprite()
    // 加载并显示图
    this.ptop.loadImage(this.ptsrc)
    this.ptop.pos(0, 0)
    // 把图显示在容器内
    this.addChild(this.ptop)
    // 创建水管底部
    this.pbody = new Laya.Sprite()
    Laya.loader.load(this.pbsrc, Laya.Handler.create(this, this.onLoaded))
  }
  onLoaded () {
    const pbimg = Laya.loader.getRes(this.pbsrc)
    this.pbody.graphics.fillTexture(pbimg, 4,  0,
                                    blockSize.pipeSize.width2, this.height - blockSize.pipeSize.height)
    this.pbody.pos(0, blockSize.pipeSize.height)
    this.addChild(this.pbody)
  }
}

// 地板
export class Floor extends Block {
  private ftop: Laya.Sprite
  private fbody: Laya.Sprite
  private ftsrc: string = '../../../static/res/land2.png'
  private fbsrc: string = '../../../static/res/land1.png'
  constructor (x, y) {
    super(x, y, blockSize.floorSize.width, stageSize.height - y)
  }
  loadBg () {
    // 创建土地顶部
    this.ftop = new Laya.Sprite()
    // 加载并显示图
    this.ftop.loadImage(this.ftsrc)
    this.ftop.pos(0, 0)
    // 把图显示在容器内
    this.addChild(this.ftop)
    // 创建土地底部
    this.fbody = new Laya.Sprite()
    Laya.loader.load(this.fbsrc, Laya.Handler.create(this, this.onLoaded))
  }
  onLoaded () {
    const fbimg = Laya.loader.getRes(this.fbsrc)
    this.fbody.graphics.fillTexture(fbimg, 0, 0,
                                    blockSize.floorSize.width, this.height - blockSize.floorSize.height)
    this.fbody.pos(0, blockSize.floorSize.height)
    this.addChild(this.fbody)
  }
}
