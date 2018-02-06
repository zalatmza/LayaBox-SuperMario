/**
 * Created by wconisan on 2018/2/5.
 */

// https://layaair.ldc.layabox.com/api/?category=Core&class=laya.display.Sprite
export default abstract class Base extends Laya.Sprite {
  private img: string
  constructor (x, y, w, h, img) {
    super()
    this.x = x
    this.y = y
    this.width = w
    this.height = h
    this.img = img
    // this.loadImage(img)
  }
}
