/**
 * Created by wconisan on 2018/2/1.
 */
import Player from './enginer/object/player'
import Background from './enginer/background'

import { stageSize, gameSize, playerSize, playerProp, key, crashDir, marginDir } from './enginer/const'
import { initGameContent } from './enginer/game-setting'
import { collisionCheck, marginCheck } from './enginer/common/utils'
import { render } from './enginer/render'
import { Block } from './enginer/object/block'

// 程序入口
class GameMain {
  // 背景偏移量
  public stageX: number = stageSize.width
  // 主角
  private player: Player
  // 背景
  private background: Background
  // 其他碰撞体
  private blockRenderList: any[]
  // 游戏入口类构造函数
  constructor () {
    Laya.init(stageSize.width, stageSize.height, Laya.WebGL)
    Laya.Stat.show(0, 0)
    Laya.loader.load(['./static/res/pp.json',
                          './static/res/player.json'
                          ],
                    Laya.Handler.create(this, this.onLoaded),
                    null,
                    Laya.Loader.ATLAS)
  }
  // 动画资源加载完成处理函数
  private onLoaded (): void {
    this.playMusic()
    this.background = new Background()
    Laya.stage.addChild(this.background)
    this.player = new Player(0, 0)
    Laya.stage.addChild(this.player)
    this.blockRenderList = initGameContent()
    Laya.timer.frameLoop(1, this, this.onLoop)
  }

  private playMusic () {
    Laya.SoundManager.playMusic('./static/music/mxd1.mp3')
    Laya.SoundManager.autoStopMusic = false
  }

  // 游戏主循环
  private onLoop () {
    const preStageX = this.stageX
    const prePlayX = this.player.x
    const prePlayY = this.player.y
    // 获取舞台相对于背景的x坐标
    this.player.playerMove()
    this.blockRenderList.forEach(item => {
      if (item.type === 'animation') {
        item.move()
      }
    })
    // 获取主角x位移
    const playerXOffset = this.player.x - prePlayX
    const playerYOffset = this.player.y - prePlayY
    // 获取背景x方向位移
    let bgXOffset = this.stageX - preStageX
    if (playerXOffset !== 0 || playerYOffset !== 0 || bgXOffset > 0) {
      // 进行碰撞检测
      this.blockRenderList.forEach((item, index) => {
        if (item.visible) {
          switch (collisionCheck(this.player, item)) {
            case 3:
              this.player.crashHandle(crashDir.down, item)
              break
            case 2:
              this.player.crashHandle(crashDir.up, item)
              break
            case 1:
              this.player.crashHandle(crashDir.left, item)
              bgXOffset = 0
              break
            case 0:
              this.player.crashHandle(crashDir.right, item)
              break
          }

          // 怪物碰撞检测
          if (item.type === 'animation') {
            let isTurn = false
            this.blockRenderList.forEach((citem, cindex) => {
              if (item !== citem) {
                if (marginCheck(item, citem) !== -1) {
                  isTurn = true
                }
                switch (collisionCheck(item, citem)) {
                  case 3:
                    item.crashHandle(crashDir.down, citem)
                    break
                  case 2:
                    item.crashHandle(crashDir.up, citem)
                    break
                  case 1:
                    item.crashHandle(crashDir.left, citem)
                    break
                  case 0:
                    item.crashHandle(crashDir.right, citem)
                    break
                }
              }
            })
            if (isTurn === false) {
              item.runDir *= -1
            }
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
