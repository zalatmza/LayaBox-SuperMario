/**
 * Created by wconisan on 2018/2/5.
 */
import Base from './base'
import { playerProp, crashDir } from '../../enginer/const'
import { BlockType, gameSize, key, stageSize } from '../const'
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
  // 空中速度
  private speedY: number = 0
  // 起跳初速度
  private initSpeedY = playerProp.initSpeedY
  // 重力加速度
  private acce: number = playerProp.acce
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

  // 左边撞到障碍物
  private crashLeft (item) {
    if (item.constructor.name === 'Coin') {
      (this.x + this.width > item.x) && item.remove()
    } else {
      // 和固定障碍物碰撞
      if (item.constructor.__proto__.name === 'ABlock') {
        this.playDie()
      } else {
        this.x = item.x - this.width
      }
    }
  }

  // 右边撞到障碍物
  private crashRight (item) {
    if (item.constructor.name === 'Coin') {
      (this.x < item.x + item.width) && item.remove()
    } else {
      // 和固定障碍物碰撞
      if (item.constructor.__proto__.name === 'ABlock') {
        this.playDie()
      } else {
        this.x = item.x + item.width
      }
    }
  }

  // 下边撞到障碍物
  private crashDown (item) {
    if (item.constructor.name === 'Coin') {
      item.remove()
    } else {
      const newHeight = item.y - this.height
      this.y = Math.max(0, Math.min(this.y, newHeight))

      if (this.y === newHeight) {
        this.jumping = false
        this.speedY = 0
      }

      if (item.type === BlockType.animation) {
        // 消灭怪物
        item.remove()
      }
    }
  }

  // 上面撞到障碍物
  private crashUp (item) {
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

  private playDie () {
    this.x = 100
    this.y = 50
  }

  // 玩家动作
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
    if (this.y >= stageSize.height) {
      // gameMain.gamePause()
      this.playDie()
    }
    if (this.speedY !== 0) {
      this.jumping = true
    }

    if (left && right || !left && !right) {
      this.initAction()
    } else if (right) {
      const screenWidth = Math.round(laya.utils.Browser.width * stageSize.height / laya.utils.Browser.height)
      // 在stage中的位置
      if (gameMain.stageX >= gameSize.width) {
        gameMain.stageX = Math.min(gameMain.stageX, gameSize.width)
        this.x = Math.min(this.x + this.speedX, screenWidth - this.width)
      } else {
        if (this.x === screenWidth / 2) {
          gameMain.stageX = Math.min(gameMain.stageX + this.speedX, gameSize.width)
        }
        this.x = Math.min(this.x + this.speedX, screenWidth / 2)
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
  public initAction (): void {
    this.body.clear()
    this.graphics.clear()
    if (this.runDir === 1) {
      this.loadImage('player/player0.png')
    } else if (this.runDir === -1) {
      this.loadImage('player/player3.png')
    }
  }

  // 初始化动效
  private initAnimation (): void {
    Laya.Animation.createFrames(['player/player0.png', 'player/player1.png', 'player/player2.png'],
      playerProp.action.right)
    Laya.Animation.createFrames(['player/player3.png', 'player/player4.png', 'player/player5.png'],
      playerProp.action.left)
    this.body = new Laya.Animation()
    this.body.interval = 120
    this.addChild(this.body)
  }

  // 播放动画
  private playAnimation (actionName) {
    this.graphics.clear()
    this.body.play(0, true, actionName)
    this.body.pos(0, 0)
  }

  constructor (x, y) {
    super(x, y, playerProp.width, playerProp.height)
    this.zOrder = 11
    this.initAnimation()
    this.initEvent()
    this.loadImage('player/player0.png')
  }
}
