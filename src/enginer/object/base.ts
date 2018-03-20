/**
 * Created by wconisan on 2018/2/5.
 */

// https://layaair.ldc.layabox.com/api/?category=Core&class=laya.display.Sprite
export abstract class Base extends Laya.Sprite {
  public halfH: number = 0
  public halfW: number = 0

  constructor (x, y, w, h) {
    super()
    this.x = x
    this.y = y
    // 宽高
    this.width = w
    this.halfW = this.width /2
    this.height = h
    this.halfH = this.height / 2
    // other
    this.zOrder = 10
    this.pivot(this.halfW, this.halfH)
  }
  get constructorName (): string {
    return this.constructor.name || ''
  }
}

// 会动的东西实现这个接口
export interface IAnimateBase {
  runDir: 1 | -1
  speedX: number
  speedY: number
  acce: number

  move ()
  crashHandle (type, item)
  crashLeft (item)
  crashRight (item)
  crashDown (item)
  crashUp (item)
}
