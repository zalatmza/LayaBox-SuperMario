/**
 * Created by wconisan on 2018/2/5.
 */
import Base from './base'
import { stageSize, blockSize, monsterProperty, playerProp, crashDir, BlockType } from '../const'
import { gameMain } from '../../index'

// 障碍物基类
export abstract class Block extends Base {
  public type: string
  constructor (x, y, w, h) {
    super(x, y, w, h)
    this.visible = false
  }
  public remove () {
    this.x = -9999
  }
}

// 静态的障碍物
abstract class SBlock extends Block {
  constructor (x, y, w, h) {
    super(x, y, w, h)
    this.type = BlockType.static
  }
  protected abstract loadImg (): void
  protected abstract onLoaded (): void
}

// 金币
export class Coin extends SBlock {
  private src = '../../../static/res/coin.png'
  private hasCoin = true
  constructor (x, y,) {
    super(x, y, blockSize.coinSize.width, blockSize.coinSize.height)
    this.loadImg()
  }
  protected loadImg () {
    Laya.loader.load(this.src, Laya.Handler.create(this, this.onLoaded, null, false))
  }
  protected onLoaded () {
    const img = Laya.loader.getRes(this.src)
    this.graphics.fillTexture(img, 0, 0, this.width, this.height)
  }
}

// 金币方块
export class Grass extends SBlock {
  private src = '../../../static/res/grass.jpg'
  private hasCoin = true
  constructor (x, y, w, h) {
    super(x, y, w, h)
    this.loadImg()
  }
  protected loadImg () {
    Laya.loader.load(this.src, Laya.Handler.create(this, this.onLoaded, null, false))
  }
  protected onLoaded () {
    const img = Laya.loader.getRes(this.src)
    this.graphics.fillTexture(img, 0, 0, this.width, this.height)
  }

  public popupCoin () {
    if (this.hasCoin) {
      gameMain.blockRenderList.push(new Coin(this.x, this.y - blockSize.coinSize.height))
      this.hasCoin = false
    }
  }
}

// 砖块
export class Brick extends SBlock {
  private brickSrc = '../../../static/res/brick1.png'
  constructor (x, y, w, h) {
    super(x, y, w, h)
    this.loadImg()
  }
  protected loadImg () {
    Laya.loader.load(this.brickSrc, Laya.Handler.create(this, this.onLoaded, null, false))
  }
  protected onLoaded () {
    const img = Laya.loader.getRes(this.brickSrc)
    this.graphics.fillTexture(img, 0, 0, this.width, this.height)
  }
}

// 水管
export class Pipe extends SBlock {
  private ptop: Laya.Sprite
  private pbody: Laya.Sprite
  private ptsrc = '../../../static/res/pipe1.png'
  private pbsrc = '../../../static/res/pipe2.png'
  constructor (x, y, h) {
    super(x, y, blockSize.pipeSize.width1, h)
    this.loadImg()
  }
  protected loadImg () {
    // 创建水管顶部
    this.ptop = new Laya.Sprite()
    // 创建水管底部
    this.pbody = new Laya.Sprite()
    // 加载并显示图
    this.ptop.loadImage(this.ptsrc)
    this.ptop.pos(0, 0)
    // 把图显示在容器内
    this.addChild(this.ptop)
    Laya.loader.load(this.pbsrc, Laya.Handler.create(this, this.onLoaded))
  }
  protected onLoaded () {
    const img = Laya.loader.getRes(this.pbsrc)
    this.pbody.graphics.fillTexture(img, 4,  0,
                                    blockSize.pipeSize.width2, this.height - blockSize.pipeSize.height)
    this.pbody.pos(0, blockSize.pipeSize.height)
    this.addChild(this.pbody)
  }
}

// 地板
export class Floor extends SBlock {
  private ftop: Laya.Sprite
  private fbody: Laya.Sprite
  private ftsrc: string = '../../../static/res/land2.png'
  private fbsrc: string = '../../../static/res/land1.png'
  constructor (x, y) {
    super(x, y, blockSize.floorSize.width, stageSize.height - y)
    this.loadImg()
  }
  protected loadImg () {
    // 创建土地顶部
    this.ftop = new Laya.Sprite()
    // 创建土地底部
    this.fbody = new Laya.Sprite()
    // 加载并显示图
    this.ftop.loadImage(this.ftsrc)
    this.ftop.pos(0, 0)
    // 把图显示在容器内
    this.addChild(this.ftop)
    Laya.loader.load(this.fbsrc, Laya.Handler.create(this, this.onLoaded))
  }
  protected onLoaded (): void {
    const img = Laya.loader.getRes(this.fbsrc)
    this.fbody.graphics.fillTexture(img, 0, 0,
                                    blockSize.floorSize.width, this.height - blockSize.floorSize.height)
    this.fbody.pos(0, blockSize.floorSize.height)
    this.addChild(this.fbody)
  }
}

// 动态的障碍物
export abstract class ABlock extends Block {
  protected body: Laya.Animation
  protected runDir: 1 | -1 = 1
  protected speedX: number
  protected speedY: number = 0
  protected acce: number

  constructor (x, y, w, h) {
    super(x, y, w, h)
    this.type = BlockType.animation

  }

  protected abstract initAnimation (): void

  protected playAnimation (actionName): void {
    this.graphics.clear()
    this.body.play(0, true, actionName)
    this.body.pos(0, 0)
  }

  protected crashHandle (type, item) {
    if (type === crashDir.left) {
      this.crashLeft(item)
    } else if (type === crashDir.right) {
      this.crashRight(item)
    } else if (type === crashDir.down) {
      this.crashDown(item)
    } else if (type === crashDir.up) {
      this.crashUp(item)
    }
  }

  protected move () {
    this.x += this.speedX * this.runDir
    this.speedY += this.acce
    this.y += this.speedY
    if (this.y >= stageSize.height) {
      this.remove()
    }
  }

  protected crashLeft (item) {
    // 和固定障碍物碰撞
    this.x = item.x - this.width
    this.runDir = -1
  }

  protected crashRight (item) {
    // 和固定障碍物碰撞
    this.x = item.x + item.width
    this.runDir = 1
  }

  protected crashDown (item) {
    const newHeight = item.y - this.height
    this.y = Math.max(0, Math.min(this.y, newHeight))
    if (this.y === newHeight) {
      this.speedY = 0
    }
  }

  protected crashUp (item) {
    // console.log('MONSTER1 up')
  }
}

// 怪物1
export class Monster1 extends ABlock {
  constructor (x, y) {
    super (x, y, monsterProperty.monster1.width, monsterProperty.monster1.height)
    this.speedX = monsterProperty.monster1.speedX
    this.acce = monsterProperty.monster1.acce
    this.initAnimation()
    this.loadImage('pp/pp001.png')
    this.playAnimation(monsterProperty.monster1.action.right)
  }

  protected initAnimation () {
    Laya.Animation.createFrames(['pp/pp001.png', 'pp/pp002.png', 'pp/pp003.png'],
      monsterProperty.monster1.action.right)
    Laya.Animation.createFrames(['pp/pp004.png', 'pp/pp005.png', 'pp/pp006.png'],
      monsterProperty.monster1.action.left)
    this.body = new Laya.Animation()
    this.body.interval = 120
    this.addChild(this.body)
  }
}
