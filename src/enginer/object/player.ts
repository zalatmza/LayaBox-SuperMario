/**
 * Created by wconisan on 2018/2/5.
 */
import Base from './base'
import render from '../render'
const key = {
  left: 37,
  right: 39
}

export default class Player extends Base {
  private runDir: 1 | -1 = 1 // 1 往右， -1 往左
  private speed: number = 10
  // private isRunning: boolean = false
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

  private keyState = Object.create(null)

  // 每帧动作
  private action (): void {
    const left: boolean = this.keyState[key.left]
    const right: boolean = this.keyState[key.right]

    if (left && right) {
      this.graphics.clear()
      this.initAction()
    } else if (right) {
      this.graphics.clear()
      this.x += this.speed
      this.runDir = 1
      this.loadImage(this.rightFrameList[this.currentFrameIndex % this.rightFrameList.length])
      this.currentFrameIndex ++
    } else if (left) {
      this.graphics.clear()
      this.x -= this.speed
      this.runDir = -1
      this.loadImage(this.leftFrameList[this.currentFrameIndex % this.leftFrameList.length])
      this.currentFrameIndex ++
    }
  }

  // 初始化键盘事件
  private initEvent () {
    document.addEventListener('keydown', e => {
      this.keyState[e.keyCode] = true
    })

    document.addEventListener('keyup', e => {
      this.keyState[e.keyCode] = false
      this.graphics.clear()
      this.currentFrameIndex = 0
      this.initAction()
    })
  }

  // 初始化角色动作
  private initAction (): void {
    if (this.runDir === 1) {
      this.loadImage(this.rightFrameList[3])
    } else if (this.runDir === -1) {
      this.loadImage(this.leftFrameList[3])
    }
  }

  constructor (x, y) {
    super(x, y, 50, 30, require('./assets/player0.png'))
    this.loadImage(this.rightFrameList[3])
    this.initEvent()
    render(1, this, this.action)
  }
}
