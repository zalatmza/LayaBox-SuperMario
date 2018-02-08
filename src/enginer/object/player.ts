/**
 * Created by wconisan on 2018/2/5.
 */
import Base from './base'
import { stageSize, gameSize, playerSize } from '../../enginer/const'

const key = {
  left: Laya.Keyboard.LEFT,
  up: Laya.Keyboard.UP,
  right: Laya.Keyboard.RIGHT
}

const floorLevel = 400

export default class Player extends Base {
  // 身体动画
  private body: Laya.Animation
  // 相对舞台的位置
  private stageX: number = stageSize.width
  // 移动方向1 往右， -1 往左
  private runDir: 1 | -1 = 1
  // 移动速度
  private speedX: number = 10
  // 跳跃中
  private jumping: boolean = false
  // 跳跃速度 = 下落速度
  private speedY: number = -33
  // 重力加速度
  private acce: number = 2
  // 键盘事件状态
  private keyState = Object.create(null)

  // 每帧动作
  public getStageX (): number {
    const left: boolean = this.keyState[key.left]
    const right: boolean = this.keyState[key.right]
    const up: boolean = this.keyState[key.up]

    if (up && !this.jumping) {
      this.jumping = true
    }

    if (this.jumping) {
      const newSpeedY = this.speedY + this.acce
      this.y = Math.round(this.y + (this.speedY + newSpeedY)/2)
      this.speedY = newSpeedY
      // floor需要加入碰撞检测
      this.y = Math.max(0 ,Math.min(this.y, floorLevel))
      if (this.y === floorLevel) {
        this.jumping = false
        this.speedY = -33
      }
    }

    if (left && right || !left && !right) {
      this.initAction()
    } else if (right) {
      if (this.stageX >= gameSize.width - stageSize.width / 2) {
        this.stageX = Math.min(this.stageX, gameSize.width - stageSize.width / 2)
        this.x = Math.min(this.x + this.speedX, stageSize.width - playerSize.width)
      } else {
        this.x = Math.min(this.x + this.speedX, stageSize.width / 2)
        if (this.x === stageSize.width / 2) {
          this.stageX += this.speedX
        }
      }
      this.runDir = 1
      if (!(this.body.isPlaying && this.body._actionName === 'moveRight')) {
        this.playAnimation('moveRight')
      }
    } else if (left) {
      this.x -= this.speedX
      this.x = Math.max(this.x, 0)
      this.runDir = -1
      if (!(this.body.isPlaying && this.body._actionName === 'moveLeft')) {
        this.playAnimation('moveLeft')
      }
    }
    return this.stageX
  }

  // 初始化键盘事件
  private initEvent () {
    document.addEventListener('keydown', e => {
      this.keyState[e.keyCode] = true
    })
    document.addEventListener('keyup', e => {
      this.keyState[e.keyCode] = false
      this.initAction()
    })
  }

  // 初始化角色动作
  private initAction (): void {
    this.body.clear()
    this.graphics.clear()
    if (this.runDir === 1) {
      this.loadImage('player/player0.png')
    } else if (this.runDir === -1) {
      this.loadImage('player/player3.png')
    }
  }

  private initAnimation (): void {
    Laya.Animation.createFrames(['player/player0.png', 'player/player1.png', 'player/player2.png'], 'moveRight')
    Laya.Animation.createFrames(['player/player3.png', 'player/player4.png', 'player/player5.png'], 'moveLeft')
    this.body = new Laya.Animation()
    this.addChild(this.body)
  }

  private playAnimation (actionName) {
    this.graphics.clear()
    this.body.clear()
    this.body.play(0, true, actionName)
    this.body.pos(0, 0)
  }

  constructor (x, y) {
    super(x, y, playerSize.width, playerSize.height)
    this.zOrder = 11
    this.initAnimation()
    this.loadImage('player/player0.png')
    this.initEvent()
  }
}
