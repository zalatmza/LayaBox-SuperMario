/**
 * Created by wconisan on 2018/2/5.
 */
import Base from './base'
import { stageSize, gameSize } from '../../enginer/const'
import { render } from '../render'

const key = {
  left: 37,
  up: 38,
  right: 39
}

const imgSize = {
  width: 50,
  height: 30
}

const floorLevel = 400

export default class Player extends Base {
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
  // 当前帧
  private currentFrameIndex: number = 0

  private rightFrameList = [
    require('./assets/player1.png'),
    require('./assets/player2.png'),
    require('./assets/player1.png'),
    require('./assets/player0.png')
  ]
  private leftFrameList = [
    require('./assets/player4.png'),
    require('./assets/player5.png'),
    require('./assets/player4.png'),
    require('./assets/player3.png')
  ]

  // 键盘事件状态
  private keyState = Object.create(null)

  // 每帧动作
  public action (): void {
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
      this.graphics.clear()

      if (this.stageX >= gameSize.width - stageSize.width / 2) {
        this.stageX = Math.min(this.stageX, gameSize.width - stageSize.width / 2)
        this.x = Math.min(this.x + this.speedX, stageSize.width - imgSize.width)
      } else {
        this.x = Math.min(this.x + this.speedX, stageSize.width / 2)
        if (this.x === stageSize.width / 2) {
          this.stageX += this.speedX
        }
      }
      this.runDir = 1
      this.loadImage(this.rightFrameList[this.currentFrameIndex % this.rightFrameList.length])
      this.currentFrameIndex ++
    } else if (left) {
      this.graphics.clear()
      this.x -= this.speedX
      this.x = Math.max(this.x, 0)
      this.runDir = -1
      this.loadImage(this.leftFrameList[this.currentFrameIndex % this.leftFrameList.length])
      this.currentFrameIndex ++
    }
    render(this.stageX)
  }

  // 初始化键盘事件
  private initEvent () {
    document.addEventListener('keydown', e => {
      this.keyState[e.keyCode] = true
    })
    document.addEventListener('keyup', e => {
      this.keyState[e.keyCode] = false
      this.currentFrameIndex = 0
      this.initAction()
    })
  }

  // 初始化角色动作
  private initAction (): void {
    this.graphics.clear()
    if (this.runDir === 1) {
      this.loadImage(this.rightFrameList[3])
    } else if (this.runDir === -1) {
      this.loadImage(this.leftFrameList[3])
    }
  }

  constructor (x, y) {
    super(x, y, imgSize.width, imgSize.height, require('./assets/player0.png'))
    this.loadImage(this.rightFrameList[3])
    this.initEvent()
  }
}
