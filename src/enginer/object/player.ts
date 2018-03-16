/**
 * Created by wconisan on 2018/2/5.
 */
import { Base, IAnimateBase } from './base'
import { playerProp, crashDir } from '../../enginer/const'
import { blockType, gameSize, key, stageSize } from '../const'
import { gameMain } from '../../index'
import { Bullet } from './block'

export default class Player extends Base implements IAnimateBase {
  // 身体动画
  private body: Laya.Animation

  // 当前播放的动画名称
  private aniType: string

  // 当前人物的身份
  private status: string = playerProp.status[1]

  // 移动方向1 往右， -1 往左
  public runDir: 1 | -1 = 1

  // 移动速度
  public speedX: number = playerProp.speedX

  // 跳跃中
  public jumping: boolean = false

  public shooting: boolean = false

  // 空中速度
  public speedY: number = 0

  // 起跳初速度
  private initSpeedY = playerProp.initSpeedY

  // 重力加速度
  public acce: number = playerProp.acce

  // 键盘事件状态
  public keyState = Object.create(null)

  // 初始化键盘事件
  private initEvent () {
    document.addEventListener('keydown', e => {
      this.keyState[e.keyCode] = true
    })
    document.addEventListener('keyup', e => {
      this.keyState[e.keyCode] = false
      if (!this.shooting && !this.jumping) {
        this.initAction()
      }
    })
  }

  // 处理碰撞检测
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

  // 右边撞到障碍物
  public crashLeft (item) {
    if (item.constructor.name === 'Coin') {
      (this.x + this.width > item.x) && item.remove()
    } else {
      // 和固定障碍物碰撞
      if (item.constructor.__proto__.name === 'ABlock') {
        this.die()
      } else {
        this.x = item.x - this.width
      }
    }
  }

  // 左边撞到障碍物
  public crashRight (item) {
    if (item.constructor.name === 'Coin') {
      (this.x < item.x + item.width) && item.remove()
    } else {
      // 和固定障碍物碰撞
      if (item.constructor.__proto__.name === 'ABlock') {
        this.die()
      } else {
        this.x = item.x + item.width
      }
    }
  }

  // 下边撞到障碍物
  public crashDown (item) {
    if (item.constructor.name === 'Coin') {
      item.remove()
    } else {
      const newHeight = item.y - this.height
      this.y = Math.max(0, Math.min(this.y, newHeight))

      if (this.y === newHeight) {
        this.jumping = false
        this.speedY = 0
      }

      if (item.type === blockType.animation) {
        // 消灭怪物
        item.remove()
      }
    }
  }

  // 上面撞到障碍物
  public crashUp (item) {
    if (item.constructor.name === 'Coin') {
      (this.y > item.y + item.height) && item.remove()
    } else {
      this.y = item.y + item.height
      this.speedY = 0
      if (item.constructor.name === 'Grass') {
        item.popupCoin()
      }
    }
  }

  // 动感光波射击
  private shoot () {
    this.shooting = true
    if (this.runDir === 1) {
      this.playAnimation(playerProp.action.attackRight, false)
      gameMain.add(new Bullet(this.x + this.width + this.speedX, this.y + this.height / 2, this.runDir))
    }
    if (this.runDir === -1) {
      this.playAnimation(playerProp.action.attackLeft, false)
      gameMain.add(new Bullet(this.x - playerProp.bulletSize.width - this.speedX,
        this.y + this.height / 2, this.runDir))
    }
    this.body.interval = playerProp.animationInterval / 2
  }

  // 切换主角身份
  public toggleStatus (type) {
    switch (type) {
      case playerProp.status[0]:
        console.log('normal')
        this.playAnimation(playerProp.action.toggleToNormal, false)
        break
    }
  }

  // 玩家死亡
  public die () {
    this.x = 0
    this.y = 50
  }

  // 玩家动作
  public move () {
    const left: boolean = this.keyState[key.left]
    const right: boolean = this.keyState[key.right]
    const up: boolean = this.keyState[key.up]
    const space: boolean = this.keyState[key.space]

    // 起跳
    if (up && !this.jumping) {
      this.jumping = true
      this.speedY = this.initSpeedY
      this.playAnimation(playerProp.action.jump, false)
    }

    this.speedY += this.acce
    this.y += this.speedY
    // 狗带
    this.y >= stageSize.height && this.die()

    // 射击
    space && !this.shooting && this.shoot()

    // 左右移
    if ((left && right || !left && !right) && !this.shooting && !this.jumping) {
      this.initAction()
    } else if (right) {
      this.x = Math.min(this.x + this.speedX, stageSize.width - this.width)
      this.runDir = 1
      // 播放动画
      if (!(this.body.isPlaying && this.body._actionName === playerProp.action.right)) {
        this.playAnimation(playerProp.action.right)
      }
    } else if (left) {
      this.x = Math.max(this.x - this.speedX, 0)
      this.runDir = -1
      // 播放动画
      if (!(this.body.isPlaying && this.body._actionName === playerProp.action.left)) {
        this.playAnimation(playerProp.action.left)
      }
    }
  }

  // 初始化角色动作
  public initAction (): void {
    this.body.clear()
    this.graphics.clear()
    if (this.runDir === 1) {
      this.loadImage('character1/character1_run1_0.png')
    } else if (this.runDir === -1) {
      this.loadImage('character1/character1_run2_0.png')
    }
  }

  // 初始化动效
  private initAnimation (): void {
    this.body = new Laya.Animation()
    this.body.on(Laya.Event.COMPLETE, this, this.afterAnimation)
    this.body.interval = playerProp.animationInterval
    this.addChild(this.body)
  }

  // 播放动画
  private playAnimation (actionName, loop = true) {
    this.aniType = actionName
    this.graphics.clear()
    this.body.play(0, loop, actionName)
    this.body.pos(0, 0)
  }

  // 动画播放完成处理
  private afterAnimation (): void {
    console.log(this.aniType)
    switch (this.aniType) {
      case 'playerAttackLeft':
      case 'playerAttackRight':
        this.shooting = false
        break
    }
    this.body.interval = playerProp.animationInterval
  }

  constructor (x, y) {
    super(x, y, playerProp.width, playerProp.height)
    this.zOrder = 11
    this.initAnimation()
    this.initEvent()
    this.loadImage('character1/character1_run1_0.png')
  }
}
