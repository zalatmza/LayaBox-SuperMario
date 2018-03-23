/**
 * Created by wconisan on 2018/2/5.
 */
import { Base, IAnimateBase } from './base'
import { stageSize, blockSize, monsterProperty, playerProp, crashDir, blockType } from '../const'
import { gameMain } from '../../index'

// 障碍物基类
export abstract class Block extends Base {
  // 物体的类型： 静态static 动态animation
  public type: string

  // 是否开启碰检
  public isCarsh: boolean = true
  public isCarshWithPlayer = true

  // 是否还有用
  public isUnUse: boolean = false

  constructor (x, y, w, h) {
    super(x, y, w, h)
    this.visible = false
  }
  // 物体销毁
  public remove () {
    this.x = -9999
    this.isUnUse = true
    this.visible = false
  }
}

// 静态的障碍物
abstract class SBlock extends Block {
  constructor (x, y, w, h) {
    super(x, y, w, h)
    this.type = blockType.static
  }
}

// 金币
export class Coin extends SBlock {
  private src = 'land1/coin1.png'
  constructor (x, y) {
    super(x, y, blockSize.coinSize.width, blockSize.coinSize.height)
    this.loadImage(this.src, 0, 0, this.width, this.height)
    this.bounceOut()
  }
  private bounceOut () {
    Laya.Tween.from(this, {y: this.y - 20}, 750, Laya.Ease.elasticOut, null, 0)
  }
}

// 金币砖块
export class GiftBrick extends SBlock {
  private src1 = 'land1/gift_brick1_1.png'
  private src2 = 'land1/gift_brick1_2.png'
  private hasCoin = true
  constructor (x, y, w, h) {
    super(x, y, w, h)
    this.loadImage(this.src1, 0, 0, w, h)
  }

  public popupCoin () {
    if (this.hasCoin) {
      this.loadImage(this.src2, 0, 0, this.width, this.height)
      gameMain.add(new Coin(this.x, this.y - this.halfH - blockSize.coinSize.height / 2 - 5))
      this.hasCoin = false
    }
  }
}

// 砖块
export class Cliff extends SBlock {
  private midsrc = 'land1/land1_3.png'
  private leftsrc = 'land1/land1_4.png'
  private rightsrc = 'land1/land1_5.png'
  constructor (x, y, w) {
    super(x, y, w, blockSize.cliffSize.height)
    // 创建悬崖左侧
    const leftpart= new Laya.Sprite()
    leftpart.loadImage(this.leftsrc)
    // 创建悬崖右侧
    const rightpart = new Laya.Sprite()
    rightpart.loadImage(this.rightsrc)
    // 创建悬崖中
    const midpart = new Laya.Sprite()
    midpart.graphics.fillTexture(Laya.loader.getRes(this.midsrc), 0, 0,
    this.width - blockSize.cliffSize.leftWidth - blockSize.cliffSize.rightWidth, blockSize.cliffSize.height)
    this.addChild(leftpart)
    leftpart.pos(0, 0)
    this.addChild(midpart)
    midpart.pos(blockSize.cliffSize.leftWidth, 0)
    this.addChild(rightpart)
    rightpart.pos(this.width - blockSize.cliffSize.rightWidth, 0)
  }
}

// 水管
export class Pipe extends SBlock {
  private ptsrc = 'land1/pillar1_1.png'
  private pbsrc = 'land1/pillar1_2.png'
  constructor (x, y) {
    super(x, y, blockSize.pipeSize.width1, (stageSize.height - y) * 2)
    // 创建水管顶部
    const ptop = new Laya.Sprite()
    // 创建水管底部
    const pbody = new Laya.Sprite()
    // 加载并显示图
    ptop.loadImage(this.ptsrc)
    ptop.pos(0, 0)
    // 把图显示在容器内
    this.addChild(ptop)
    pbody.graphics.fillTexture(Laya.loader.getRes(this.pbsrc), 0,  0,
      blockSize.pipeSize.width2, this.height - blockSize.pipeSize.height)
    pbody.pos(0, blockSize.pipeSize.height)
    this.addChild(pbody)
  }
}

// 地板
export class Floor extends SBlock {
  private ftsrc: string = 'land1/land1_2.png'
  private fbsrc: string = 'land1/land1_1.png'
  constructor (x, y) {
    super(x, y, blockSize.floorSize.width, (stageSize.height - y) * 2)
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
      blockSize.floorSize.width, this.height - blockSize.floorTop.height)
    fbody.pos(0, blockSize.floorTop.height)
    this.addChild(fbody)
  }
}

// 动态的障碍物
export abstract class ABlock extends Block implements IAnimateBase {
  protected body: Laya.Animation
  public runDir: 1 | -1 = 1
  public speedX: number = 0
  public speedY: number = 0
  public acce: number = 0

  // 是否边缘检测
  public marginCheck: boolean = true

  constructor (x, y, w, h) {
    super(x, y, w, h)
    this.type = blockType.animation
  }

  protected abstract initAnimation (): void
  abstract crashLeft (item)
  abstract crashUp (item)
  abstract crashRight (item)
  abstract crashDown (item)
  abstract move ()

  protected initBody (interval = 120) {
    this.body = new Laya.Animation()
    this.body.interval = interval
    this.body.pos(0, 0)
    this.addChild(this.body)
  }

  protected playAnimation (actionName, loop = true): void {
    this.graphics.clear()
    this.body.play(0, loop, actionName)
  }

  public crashHandle (type, item) {
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
}

// 怪物
abstract class AMBlock extends ABlock {
  public isMonster = true
  constructor (x, y, w, h) {
    super (x, y, w, h)
  }
}

// 怪物1
export class Monster1 extends AMBlock {
  constructor (x, y) {
    super (x, y, monsterProperty.monster1.width, monsterProperty.monster1.height)
    this.speedX = monsterProperty.monster1.speedX
    this.acce = monsterProperty.monster1.acce
    this.initAnimation()
    this.playAnimation(monsterProperty.monster1.action.right)
  }

  protected initAnimation () {
    this.initBody()
  }
  move () {
    this.x += this.speedX * this.runDir
    this.speedY += this.acce
    this.y += this.speedY
  }

  crashRight (item) {
    if (item.type === blockType.static) {
      // 和固定障碍物碰撞
      this.x = item.x - item.halfW - this.halfW
      this.runDir = -1
    }
  }

  crashLeft (item) {
    if (item.type === blockType.static) {
      // 和固定障碍物碰撞
      this.x = item.x + item.halfW + this.halfW
      this.runDir = 1
    }
  }

  crashDown (item) {
    if (item.type === blockType.static) {
      const newY = item.y - item.halfH - this.halfH
      this.y = Math.max(0, Math.min(this.y, newY))
      if (this.y === newY) {
        this.speedY = 0
      }
    }
  }

  crashUp (item) {
    // console.log('MONSTER1 up')
  }
}

// 子弹
export class Bullet extends ABlock {
  private runDistance: number = 0
  constructor (x, y, dir) {
    super (x, y, playerProp.bulletSize.width, playerProp.bulletSize.height)
    this.speedX = playerProp.bulletSize.speedX
    this.marginCheck = false
    this.isCarshWithPlayer = false
    this.runDir = dir
    this.initAnimation()
    this.playAnimation(playerProp.bulletSize.action.right)
  }
  protected initAnimation () {
    this.initBody()
    if (this.runDir === -1) {
      this.scaleX = this.runDir
    }
  }

  move () {
    this.x += this.speedX * this.runDir
    this.runDistance += this.speedX
    if (this.runDistance > playerProp.bulletSize.maxX) {
      this.remove()
    }
  }

  boom () {
    gameMain.add(new Boom(this.x + this.halfW * this.runDir, this.y))
    this.remove()
  }

  crashRight (item) {
    if (item.constructorName !== this.constructorName && item.constructorName !== 'Boom') {
      this.x = item.x - item.halfW - this.halfW
      this.boom()
      this.remove()
    }
  }

  crashLeft (item) {
    if (item.constructorName !== this.constructorName && item.constructorName !== 'Boom') {
      this.x = item.x + item.halfW + this.halfW
      this.boom()
      this.remove()
    }
  }

  crashDown (item) {
    //
  }

  crashUp (item) {
    //
  }
}

export class Boom extends ABlock {
  constructor (x, y) {
    super (x, y, playerProp.bulletSize.boomWidth,  playerProp.bulletSize.boomHeight)
    this.marginCheck = false
    this.isCarshWithPlayer = false
    this.initAnimation()
    this.body.pos((playerProp.bulletSize.boomWidth - playerProp.bulletSize.boomImgWidth) / 2, (playerProp.bulletSize.boomHeight - playerProp.bulletSize.boomImgHeight) / 2)
    this.body.on(Laya.Event.COMPLETE, this, () => {
      this.remove()
    })
    this.playAnimation(playerProp.bulletSize.action.boom, false)
  }
  protected initAnimation () {
    this.initBody()
  }
  move () {
    //
  }

  crashLeft (item) {
    if (item.isMonster) {
      item.remove()
    }
  }
  crashRight (item) {
    if (item.isMonster) {
      item.remove()
    }
  }
  crashDown (item) {
    if (item.isMonster) {
      item.remove()
    }
  }
  crashUp (item) {
    if (item.isMonster) {
      item.remove()
    }
  }
}
