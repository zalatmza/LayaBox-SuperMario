/**
 * Created by wconisan on 2018/2/1.
 */
import Player from './enginer/object/player'
import { stageSize } from './enginer/const'
// 桢率
const FPS = 60
// 程序入口
class GameMain {
  constructor () {
    Laya.init(stageSize.width, stageSize.height)
    const player = new Player(150, 400)
    Laya.stage.addChild(player)
  }
}
new GameMain()
