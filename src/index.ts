/**
 * Created by wconisan on 2018/2/1.
 */
import Player from './enginer/object/player'
import Background from './enginer/background'

import { stageSize, gameSize, playerSize, playerProp, key, crashDir } from './enginer/const'
import { initGameContent } from './enginer/game-setting'
import { collisionCheck } from './enginer/common/utils'
import { render } from './enginer/render'
import { Block } from './enginer/object/block'
import { checkCrash } from './enginer/utils'

const floorLevel = 400

// 程序入口
class GameMain {
  // 背景偏移量
  public stageX: number = stageSize.width
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

  // 游戏主循环
  private onLoop () {
    const preStageX = this.stageX
    const prePlayX = this.player.x
    const prePlayY = this.player.y
    // 获取舞台相对于背景的x坐标
    this.player.playerMove()
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
              this.player.crashHandle(crashDir.left, item)
            case 2:
              console.log('')
              this.player.crashHandle(crashDir.up, item)
              break
            case 3:
              console.log('right')
              this.player.crashHandle(crashDir.right, item)
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
export const gameMain = new GameMain()
