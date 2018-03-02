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
}

// 金币
export class Coin extends SBlock {
  private src = 'block/coin.png'
  private hasCoin = true
  constructor (x, y,) {
    super(x, y, blockSize.coinSize.width, blockSize.coinSize.height)
    this.loadImage(this.src, 0, 0, this.width, this.height)
  }
}

// 金币方块
export class Grass extends SBlock {
  private src = 'block/grass.png'
  private hasCoin = true
  constructor (x, y, w, h) {
    super(x, y, w, h)
    this.loadImage(this.src, 0, 0, this.width, this.height)
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
  private src = 'block/brick1.png'
  constructor (x, y, w, h) {
    super(x, y, w, h)
    this.graphics.fillTexture(Laya.loader.getRes(this.src), 0, 0, this.width, this.height)
  }
}

// 水管
export class Pipe extends SBlock {
  private ptsrc = 'block/pipe1.png'
  private pbsrc = 'block/pipe2.png'
  constructor (x, y, h) {
    super(x, y, blockSize.pipeSize.width1, h)
    // 创建水管顶部
    const ptop = new Laya.Sprite()
    // 创建水管底部
    const pbody = new Laya.Sprite()
    // 加载并显示图
    ptop.loadImage(this.ptsrc)
    ptop.pos(0, 0)
    // 把图显示在容器内
    this.addChild(ptop)
    pbody.graphics.fillTexture(Laya.loader.getRes(this.pbsrc), 4,  0,
      blockSize.pipeSize.width2, this.height - blockSize.pipeSize.height)
    pbody.pos(0, blockSize.pipeSize.height)
    this.addChild(pbody)
  }
}

// 地板
export class Floor extends SBlock {
  private ftsrc: string = 'block/land2.png'
  private fbsrc: string = 'block/land1.png'
  constructor (x, y) {
    super(x, y, blockSize.floorSize.width, stageSize.height - y)
    // 创建土地顶部
    const ftop = new Laya.Sprite()
    // 创建土地底部
    const fbody = new Laya.Sprite()
    // 加载并显示图
    ftop.loadImage(this.ftsrc)
    ftop.pos(0, 0)
    // 把图显示在容器内
    this.addChild(ftop)
    fbody.graphics.fillTexture(Laya.loader.getRes(this.fbsrc), 0, 0,
      blockSize.floorSize.width, this.height - blockSize.floorSize.height)
    fbody.pos(0, blockSize.floorSize.height)
    this.addChild(fbody)
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
    if (item.constructor.__proto__.name !== 'ABlock') {
      // 和固定障碍物碰撞
      this.x = item.x - this.width
      this.runDir = -1
    }
  }

  protected crashRight (item) {
    if (item.constructor.__proto__.name !== 'ABlock') {
      // 和固定障碍物碰撞
      this.x = item.x + item.width
      this.runDir = 1
    }
  }

  protected crashDown (item) {
    if (item.constructor.__proto__.name !== 'ABlock') {
      const newHeight = item.y - this.height
      this.y = Math.max(0, Math.min(this.y, newHeight))
      if (this.y === newHeight) {
        this.speedY = 0
      }
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
    this.playAnimation(monsterProperty.monster1.action.right)
  }

  protected initAnimation () {
    Laya.Animation.createFrames(['pp/pp001.png', 'pp/pp002.png', 'pp/pp003.png'],
      monsterProperty.monster1.action.right)
    Laya.Animation.createFrames(['pp/pp004.png', 'pp/pp005.png', 'pp/pp006.png'],
      monsterProperty.monster1.action.left)
    this.body = new Laya.Animation()
    this.body.interval = 120
    this.body.pos(0, 0)
    this.addChild(this.body)
  }
}
