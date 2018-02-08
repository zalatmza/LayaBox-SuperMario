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
  private init (): void {
    const player: Player = new Player(0, 400)
    Laya.stage.addChild(player)
    preRender()
    Laya.timer.frameLoop(1, player, player.action)
  }

  constructor () {
    Laya.init(stageSize.width, stageSize.height)
    Laya.loader.load('./static/res/player.json',
                    Laya.Handler.create(this, this.init),
                    null,
                    Laya.Loader.ATLAS)
  }
}
new GameMain()
