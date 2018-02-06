/**
 * Created by wconisan on 2018/2/6.
 */
abstract class Bgbase extends Laya.Sprite {
  constructor (x, y, w, h, img) {
    super()
    this.x = x
    this.y = y
    this.width = w
    this.height = h
    this.loadImage(img)
  }
}

export class BStar extends Bgbase {
  constructor (x, y) {
    super (x, y, 128, 128, require('./assets/star.png'))
  }
}
