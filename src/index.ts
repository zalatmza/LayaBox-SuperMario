/**
 * Created by wconisan on 2018/2/1.
 */
import 'src/libs/laya.core.js'
import 'src/libs/laya.ani.js'
import 'src/libs/laya.webgl.js'

import { Pipe } from './components/block/index'

// 程序入口
class GameMain {
  constructor () {
    Laya.init(600, 400)
    const txt: Laya.Text = new Laya.Text()
    txt.color = '#fff'
    txt.text = 'test Text Text Text Text'
    txt.fontSize = 20
    new Pipe(1,1,2)
    Laya.stage.addChild(txt)
  }
}
new GameMain()
