/**
 * Created by wconisan on 2018/2/1.
 */
import { Background } from './enginer/background'
import Player from './enginer/object/player'
import { stageSize } from './enginer/const'
import { preRender } from './enginer/render'

// 桢率
const FPS = 60
// 程序入口
class GameMain {
  // 主角
  private player: Player
  // 背景
  private background: Background
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
    preRender()
    Laya.timer.frameLoop(1, this, this.onLoop)
  }
  // 游戏主循环
  private onLoop () {
    this.player.action()
    this.background.x -= 10
    if (this.background.x <= -4000) {
      this.background.x = -4000
    }
  }
}
// 启动游戏
new GameMain()
