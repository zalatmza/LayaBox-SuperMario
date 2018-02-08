/**
 * Created by wconisan on 2018/2/5.
 */
import Base from './base'
import { playerSize, playerProp } from '../../enginer/const'

export default class Player extends Base {
  // 身体动画
  public body: Laya.Animation
  // 移动方向1 往右， -1 往左
  public runDir: 1 | -1 = 1
  // 移动速度
  public speedX: number = playerProp.speedX
  // 跳跃中
  public jumping: boolean = false
  // 跳跃速度 = 下落速度
  public speedY: number = playerProp.speedY
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
      this.initAction()
    })
  }

  // 初始化角色动作
  public initAction (): void {
    this.body.clear()
    this.graphics.clear()
    if (this.runDir === 1) {
      this.loadImage('player/player0.png')
    } else if (this.runDir === -1) {
      this.loadImage('player/player3.png')
    }
  }

  public initAnimation (): void {
    Laya.Animation.createFrames(['player/player0.png', 'player/player1.png', 'player/player2.png'],
      playerProp.action.right)
    Laya.Animation.createFrames(['player/player3.png', 'player/player4.png', 'player/player5.png'],
      playerProp.action.left)
    this.body = new Laya.Animation()
    this.addChild(this.body)
  }

  public playAnimation (actionName) {
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
