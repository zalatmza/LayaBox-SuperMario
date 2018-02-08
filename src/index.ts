/**
 * Created by wconisan on 2018/2/1.
 */
import Player from './enginer/object/player'
import { stageSize } from './enginer/const'
import { preRender } from './enginer/render'
// 桢率
const FPS = 60
// 程序入口
class GameMain {
  private player: Player
  constructor () {
    Laya.init(stageSize.width, stageSize.height)
    Laya.loader.load('./static/res/player.json',
                    Laya.Handler.create(this, this.onLoaded),
                    null,
                    Laya.Loader.ATLAS)
  }
  private onLoaded (): void {
    this.player = new Player(0, 400)
    Laya.stage.addChild(this.player)
    preRender()
    Laya.timer.frameLoop(1, this, this.onLoop)
  }
  private onLoop () {
    this.player.action()
  }
}
new GameMain()
