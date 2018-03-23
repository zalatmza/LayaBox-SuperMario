/**
 * Created by wconisan on 2018/2/5.
 */
import { Base, IAnimateBase } from './base'
import { playerProp, crashDir } from '../../enginer/const'
import { blockType, gameSize, key, stageSize } from '../const'
import { gameMain } from '../../index'
import { Bullet, Boom } from './block'
import { collisionCheck } from '../common/utils'

export default class Player extends Base implements IAnimateBase {
  // 身体动画
  private body: Laya.Animation

  // 当前播放的动画名称
  private get actionName (): string {
    return this.body._actionName || ''
  }

  // 当前人物的身份
  private togging: boolean = false
  private status: string = playerProp.status.normal

  // 移动方向1 往右， -1 往左
  public runDir: 1 | -1 = 1

  // 移动速度
  public speedX: number = playerProp.speedX

  // 跳跃中
  public jumping: boolean = false

  // 射击
  public shooting: boolean = false

  // 空中速度
  public speedY: number = 0

  // 起跳初速度
  private initSpeedY: number = playerProp.initSpeedY

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
      if (!this.shooting && !this.jumping && !this.togging) {
        this.initAction()
      }
    })
  }

  // 处理碰撞检测
  public crashHandle (type, item) {
    if (!item.isCarshWithPlayer) { return }
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
  public crashRight (item) {
    if (item.constructorName === 'Coin') {
      (this.x + this.halfW > item.x - item.halfW) && item.remove()
    } else {
      // 和固定障碍物碰撞
      if (item.isMonster) {
        this.die()
      } else {
        this.x = item.x - item.halfW - this.halfW
      }
    }
  }

  // 左边撞到障碍物
  public crashLeft (item) {
    if (item.constructorName === 'Coin') {
      (this.x - this.halfW < item.x + item.halfW) && item.remove()
    } else {
      // 和固定障碍物碰撞
      if (item.isMonster) {
        this.die()
      } else {
        this.x = item.x + item.halfW + this.halfW
      }
    }
  }

  // 下边撞到障碍物
  public crashDown (item) {
    if (item.constructorName === 'Coin') {
      item.remove()
    } else {
      const newY = item.y - item.halfH - this.halfH
      this.y = Math.max(0, Math.min(this.y , newY))

      if (this.y === newY) {
        this.jumping = false
        this.speedY = 0
        if (!this.keyState[key.left] && !this.keyState[key.right] && !this.togging && !this.shooting) {
          this.initAction()
        }
      }

      if (item.isMonster) {
        // 消灭怪物
        item.remove()
      }
    }
  }

  // 上面撞到障碍物
  public crashUp (item) {
    if (item.constructorName === 'Coin') {
      (this.y + this.halfH > item.y + item.halfH) && item.remove()
    } else {
      this.y = item.y + item.halfH + this.halfH
      this.speedY = 0
      if (item.constructorName === 'GiftBrick') {
        item.popupCoin()
      }
    }
  }

  // 动感光波射击
  private shoot () {
    this.shooting = true
    let boomMoving = true
    let bitem = null
    // 检测发射时会不会撞到墙
    const gblength = gameMain.blockRenderList.length
    for (let i = this.runDir === 1 ? 0 : gblength - 1; this.runDir === 1 ? (i < gblength): (i >= 0); this.runDir === 1 ? (i++) : (i--)) {
      const item = gameMain.blockRenderList[i]
      let tBullet = new Bullet(this.x + this.runDir * (this.halfW + playerProp.bulletSize.width / 2 + this.speedX), this.y, this.runDir)
      const hitTpye = collisionCheck(tBullet, item)
      if (hitTpye !== -1 && item.constructorName !== tBullet.constructorName && item.constructorName !== 'Boom') {
        boomMoving = false
        tBullet = null
        bitem = item
        break
      }
    }

    if (this.runDir === 1) {
      this.playAnimation(playerProp.action.attackRight, false)
    }
    if (this.runDir === -1) {
      this.playAnimation(playerProp.action.attackLeft, false)
    }
    if (boomMoving) {
      gameMain.add(new Bullet(this.x + this.runDir * (this.halfW + playerProp.bulletSize.width / 2 + this.speedX), this.y, this.runDir))
    } else {
      gameMain.add(new Boom(bitem.x - bitem.halfW * this.runDir, this.y))
      bitem = null
    }
    this.body.interval = playerProp.animationInterval / 2
  }

  // 切换主角身份
  public toggleStatus () {
    this.togging = true
    switch (this.status) {
      case playerProp.status.normal:
        this.playAnimation(playerProp.action.toggleToAdvanced, false)
        break
      case playerProp.status.advanced:
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
    let left: boolean = this.keyState[key.left]
    let right: boolean = this.keyState[key.right]
    let up: boolean = this.keyState[key.up]
    let down: boolean = this.keyState[key.down]
    let space: boolean = this.keyState[key.space]

    // 变身状态禁止操作
    if (this.togging) {
      left = false
      right = false
      up = false
      space = false
      down = false
    }

    // 变身动作
    if (down && !left && !right && !this.togging) {
      this.toggleStatus()
    }

    // 起跳
    if (up && !this.jumping) {
      this.jumping = true
      this.speedY = this.initSpeedY
      this.status === playerProp.status.normal ? this.playAnimation(playerProp.action.jump1) :
                                            this.playAnimation(playerProp.action.jump2, false)
    }

    // y轴位移
    this.speedY += this.acce
    this.y += this.speedY

    this.speedY !== 0 && (this.jumping = true)

    // 狗带
    this.y >= stageSize.height && this.die()

    // 射击
    if (space) {
      !this.shooting && this.status === playerProp.status.advanced && this.shoot()
    } else {
      this.shooting = false
    }

    // 左右移
    if ((left && right || !left && !right) && !this.shooting && !this.jumping && !this.togging) {
      this.initAction()
    } else if (right) {
      this.x = Math.min(this.x + this.speedX, stageSize.width - this.width)
      this.runDir = 1
      // 播放动画
      this.status === playerProp.status.normal ? this.playAnimation(playerProp.action.right1) :
                                            this.playAnimation(playerProp.action.right2)
    } else if (left) {
      this.x = Math.max(this.x - this.speedX, 0)
      this.runDir = -1
      // 播放动画
      this.status === playerProp.status.normal ? this.playAnimation(playerProp.action.left1) :
                                            this.playAnimation(playerProp.action.left2)
      }
  }

  // 初始化角色动作
  public initAction (): void {
    this.playAnimation('')
    this.body.clear()
    this.togging = false
    this.graphics.clear()
    if (this.runDir === 1) {
      this.status === playerProp.status.normal ? this.loadImage('character2/character2_run1_0.png') :
                                          this.loadImage('character1/character1_run1_0.png')
    } else if (this.runDir === -1) {
      this.status === playerProp.status.normal ? this.loadImage('character2/character2_run2_0.png') :
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
    if (this.actionName !== actionName || this.actionName === playerProp.action.attackRight ||
        this.actionName === playerProp.action.attackLeft) {
      this.graphics.clear()
      this.body.play(0, loop, actionName)
      this.body.pos(0, 0)
    }
  }

  // 动画播放完成处理
  private afterAnimation (): void {
    if (this.actionName === playerProp.action.toggleToNormal ||
        this.actionName === playerProp.action.toggleToAdvanced) {
      this.togging = false
      this.status = this.status === playerProp.status.normal ? playerProp.status.advanced : playerProp.status.normal
    }
    this.shooting = false
    this.body.interval = playerProp.animationInterval
  }

  constructor (x, y) {
    super(x, y, playerProp.width, playerProp.height)
    this.zOrder = 11
    this.initAnimation()
    this.initEvent()
    this.loadImage('character2/character2_run1_0.png')
  }
}
