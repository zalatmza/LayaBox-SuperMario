/**
 * Created by wconisan on 2018/2/5.
 */
import Base from './base'
import { playerSize, playerProp, crashDir } from '../../enginer/const'
import { gameSize, key, stageSize } from '../const'
import { gameMain } from '../../index'

export default class Player extends Base {
  // 身体动画
  private body: Laya.Animation
  // 移动方向1 往右， -1 往左
  private runDir: 1 | -1 = 1
  // 移动速度
  public speedX: number = playerProp.speedX
  // 跳跃中
  private jumping: boolean = false
  // 跳跃速度
  private speedY: number = 0
  private initSpeedY = playerProp.initSpeedY
  // 重力加速度
  private acce: number = playerProp.acce
  // 键盘事件状态
  private keyState = Object.create(null)

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

  private crashLeft (item) {
    // 和固定障碍物碰撞
    this.x = item.x - this.width
  }

  private crashRight (item) {
    // 和固定障碍物碰撞
    this.x = item.x + item.width
  }

  private crashDown (item) {
    const newHeight = item.y - this.height
    this.y = Math.max(0, Math.min(this.y, newHeight))
    if (this.y === newHeight) {
      this.jumping = false
      this.speedY = 0
    }
  }

  private crashUp (item) {
    console.log(111)
    this.y = item.y + item.height
    this.speedY = 0
  }

  public playerMove () {
    const left: boolean = this.keyState[key.left]
    const right: boolean = this.keyState[key.right]
    const up: boolean = this.keyState[key.up]
    if (up && !this.jumping) {
      this.jumping = true
      this.speedY = this.initSpeedY
    }

    this.speedY += this.acce
    this.y += this.speedY

    if (left && right || !left && !right) {
      this.initAction()
    } else if (right) {
      // 在stage中的位置
      if (gameMain.stageX >= gameSize.width) {
        gameMain.stageX = Math.min(gameMain.stageX, gameSize.width)
        this.x = Math.min(this.x + this.speedX, stageSize.width - this.width)
      } else {
        if (this.x === stageSize.width / 2) {
          gameMain.stageX = Math.min(gameMain.stageX + this.speedX, gameSize.width)
        }
        this.x = Math.min(this.x + this.speedX, stageSize.width / 2)
      }
      this.runDir = 1
      // 播放动画
      if (!(this.body.isPlaying && this.body._actionName === playerProp.action.right)) {
        this.playAnimation(playerProp.action.right)
      }
    } else if (left) {
      this.x -= this.speedX
      this.x = Math.max(this.x, 0)
      this.runDir = -1
      // 播放动画
      if (!(this.body.isPlaying && this.body._actionName === playerProp.action.left)) {
        this.playAnimation(playerProp.action.left)
      }
    }
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
    Laya.Animation.createFrames(['player/player0.png', 'player/player1.png', 'player/player2.png'],
      playerProp.action.right)
    Laya.Animation.createFrames(['player/player3.png', 'player/player4.png', 'player/player5.png'],
      playerProp.action.left)
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
