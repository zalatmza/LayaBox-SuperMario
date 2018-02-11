/**
 * Created by wconisan on 2018/2/1.
 */
import Player from './enginer/object/player'
import Background from './enginer/background'

import { stageSize, gameSize, playerSize, playerProp, key } from './enginer/const'
import { initGameContent } from './enginer/game-setting'
import { collisionCheck } from './enginer/common/utils'
import { render } from './enginer/render'
import { Block } from './enginer/object/block'

const floorLevel = 400
// 程序入口
class GameMain {
  // 背景偏移量
  private stageX: number = stageSize.width
  // 主角
  private player: Player
  // 背景
  private background: Background
  // 其他碰撞体
  private blockRenderList: Block[]
  // 游戏入口类构造函数
  constructor () {
    Laya.init(stageSize.width, stageSize.height)
    Laya.loader.load('./static/res/player.json',
                    Laya.Handler.create(this, this.onLoaded),
                    null,
                    Laya.Loader.ATLAS)
  }
  // 动画资源加载完成处理函数
  private onLoaded (): void {
    this.background = new Background()
    Laya.stage.addChild(this.background)
    this.player = new Player(0, 400)
    Laya.stage.addChild(this.player)
    this.blockRenderList = initGameContent()
    Laya.timer.frameLoop(1, this, this.onLoop)
  }
  // 碰撞检测
  // private checkCrash () {
  //   let crash: boolean = false
  //   this.blockRenderList.forEach(item => {
  //     if (item.visible === true) {
  //       const { x, y, width, height } = this.player
  //       const nextX: number = x + this.player.runDir * this.player.speedX
  //       const nextY: number = y + this.player.speedY
  //       // 下一帧y轴是否碰到
  //       const nextCrashY = nextY + height > item. y || nextY < item.y + item.height
  //       // 当前帧y轴是否碰到
  //       const currentCrashY = (y + height < item. y + item.height && y + height > item.y)
  //                             || (y > item.y && y < item.y + item.height)
  //       // 下一帧x轴是否碰到
  //       const nextCrashX = nextX + width > item.x || nextX > item.x + item.width
  //       // 当前帧x轴是否碰到
  //       const currentCrashX = x + width > item.x || x < item.x + item.width
  //       // y上是否碰撞
  //       const top = y + height < item.y && nextY + height > item.y
  //       // y下是否碰撞
  //       const down = y > item.y + item.height && nextY < item.y + item.height
  //       const left = x + width <= item.x && nextX + width >= item.x
  //       const right = x >= item.x + item.width && nextX <= item.x + item.width
  //       if (left && currentCrashY) {
  //         console.log('left')
  //         crash = true
  //         this.player.x = item.x - width
  //       } else if (right && currentCrashY) {
  //         console.log('right')
  //         crash = true
  //         this.player.x = item.x + item.width
  //       }
  //     }
  //   })
  //   if (!crash) {
  //     this.player.x += this.player.runDir * this.player.speedX
  //   }
  // }

  private playerMove () {
    const left: boolean = this.player.keyState[key.left]
    const right: boolean = this.player.keyState[key.right]
    const up: boolean = this.player.keyState[key.up]
    if (up && !this.player.jumping) {
      this.player.jumping = true
    }

    if (this.player.jumping) {
      const newSpeedY = this.player.speedY + this.player.acce
      this.player.y = Math.round(this.player.y + (this.player.speedY + newSpeedY)/2)
      this.player.speedY = newSpeedY
      // floor需要加入碰撞检测
      this.player.y = Math.max(0 ,Math.min(this.player.y, floorLevel))
      if (this.player.y === floorLevel) {
        this.player.jumping = false
        this.player.speedY = playerProp.speedY
      }
    }

    if (left && right || !left && !right) {
      this.player.initAction()
    } else if (right) {
      // 在stage中的位置
      if (this.stageX >= gameSize.width) {
        this.stageX = Math.min(this.stageX, gameSize.width)
        // this.checkCrash()
        this.player.x = Math.min(this.player.x + this.player.speedX, stageSize.width - this.player.width)
        // this.player.x = Math.min(this.player.x, stageSize.width - this.player.width)
      } else {
        // this.checkCrash()
        // this.player.x = Math.min(this.player.x, stageSize.width / 2)
        this.player.x = Math.min(this.player.x + this.player.speedX, stageSize.width / 2)
        if (this.player.x === stageSize.width / 2) {
          this.stageX = Math.min(this.stageX + this.player.speedX, gameSize.width)
        }
      }
      this.player.runDir = 1
      if (!(this.player.body.isPlaying && this.player.body._actionName === playerProp.action.right)) {
        this.player.playAnimation(playerProp.action.right)
      }
    } else if (left) {
      this.player.x -= this.player.speedX
      // this.checkCrash()
      // this.player.x = Math.max(this.player.x, 0)
      this.player.runDir = -1
      if (!(this.player.body.isPlaying && this.player.body._actionName === playerProp.action.left)) {
        this.player.playAnimation(playerProp.action.left)
      }
    }
  }
  // 游戏主循环
  private onLoop () {
    const preStageX = this.stageX
    const prePlayX = this.player.x
    const prePlayY = this.player.y
    // 获取舞台相对于背景的x坐标
    this.playerMove()
    // 获取主角x位移
    const playerXOffset = this.player.x - prePlayX
    const playerYOffset = this.player.y - prePlayY
    // 获取背景x方向位移
    let bgXOffset = this.stageX - preStageX
    if (playerXOffset !== 0 || playerYOffset !== 0 || bgXOffset > 0) {
      // 进行碰撞检测
      this.blockRenderList.forEach((item, index) => {
        if (item.visible) {
          const cType = collisionCheck(this.player, item)
          switch (cType) {
            case 1:
              console.log('left')
              this.player.x = item.x - this.player.width
              bgXOffset = 0
              break
            case 2:
              console.log('top')
              this.player.y = item.y - this.player.height
              break
            case 3:
              console.log('right')
              this.player.x = item.x + item.width
              bgXOffset = 0
              break
          }
        }
      })
    }
    // 背景移动
    if (bgXOffset > 0) {
      this.background.x -= bgXOffset
    }
    // 处理其他碰撞体的渲染
    this.blockRenderList.forEach((item, index) => {
      render(item, bgXOffset, this.stageX)
    })
  }
}
// 启动游戏
new GameMain()
