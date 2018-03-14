/**
 * Created by wconisan on 2018/2/5.
 */

// https://layaair.ldc.layabox.com/api/?category=Core&class=laya.display.Sprite
export abstract class Base extends Laya.Sprite {
  public getMidX () {
    return (this.x + this.width) / 2
  }

  public getMidY () {
    return (this.y + this.height) / 2
  }

  constructor (x, y, w, h) {
    super()
    this.x = x
    this.y = y
    this.width = w
    this.height = h
    this.zOrder = 10
  }
}

// 会动的东西实现这个接口
export interface IAnimateBase {
  runDir: 1 | -1
  speedX: number
  speedY: number
  acce: number

  crashHandle (type, item)
  crashLeft (item)
  crashRight (item)
  crashDown (item)
  crashUp (item)
}
