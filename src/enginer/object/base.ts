/**
 * Created by wconisan on 2018/2/5.
 */

// https://layaair.ldc.layabox.com/api/?category=Core&class=laya.display.Sprite
export default abstract class Base extends Laya.Sprite {
  constructor (x, y, w, h) {
    super()
    this.x = x
    this.y = y
    this.width = w
    this.height = h
    this.zOrder = 10
  }
}
