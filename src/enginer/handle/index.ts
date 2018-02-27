/**
 * Created by wconisan on 2018/2/26.
 */
import { key } from '../const'
import { gameMain } from '../../index'

class HandleBtn extends Laya.Sprite {
  private r: number = 50
  private keyCode: number = 0

  private unbindKeyCode (e: Laya.Event) {
    gameMain.player.keyState[this.keyCode] = false
    gameMain.player.initAction()
    this.alpha = 0.5
    e.stopPropagation()
  }
  constructor (x, y, keyCode) {
    super()
    this.x = x
    this.y = y
    this.zOrder = 20
    this.size(this.r * 2, this.r * 2)
    this.graphics.drawCircle(this.r, this.r, this.r, '#fff')
    this.alpha = 0.5
    this.mouseEnabled = true
    this.keyCode = keyCode
    this.on(Laya.Event.MOUSE_DOWN, this, () => {
      gameMain.player.keyState[keyCode] = true
      this.alpha = 0.75
    })
    this.on(Laya.Event.MOUSE_UP, this, this.unbindKeyCode)
    this.on(Laya.Event.MOUSE_OUT, this, this.unbindKeyCode)
  }
}

export default function initHandle () {
  const leftBtn = new HandleBtn(25, 480, key.left)
  const rightBtn = new HandleBtn(150, 480, key.right)
  const upBtn = new HandleBtn(850, 480, key.up)
  Laya.stage.on(Laya.Event.MOUSE_UP, this, () => {
    gameMain.player.keyState[key.left] = false
    gameMain.player.keyState[key.right] = false
    gameMain.player.keyState[key.up] = false
    this.alpha = 0.5
  })
  Laya.stage.addChild(leftBtn)
  Laya.stage.addChild(rightBtn)
  Laya.stage.addChild(upBtn)
}
