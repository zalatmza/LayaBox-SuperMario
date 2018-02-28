/**
 * Created by wconisan on 2018/2/26.
 */
import { key } from '../const'
import { gameMain } from '../../index'

class HandleBtn extends Laya.Sprite {
  private touchWidth: number = 150
  private touchHeight: number = 200
  private r: number = 50
  private keyCode: number = 0

  public unbindKeyCode (e: Laya.Event) {
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
    this.size(this.touchWidth, this.touchHeight)
    // this.graphics.drawRect(0, 0, this.touchWidth, this.touchHeight, 'FF0')
    this.graphics.drawCircle(this.touchWidth / 2, 130, this.r, '#fff')
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
  Laya.stage.addChild(new HandleBtn(0, 400, key.left))
  Laya.stage.addChild(new HandleBtn(150, 400, key.right))
  Laya.stage.addChild(new HandleBtn(810, 400, key.up))
}
