/**
 * Created by wconisan on 2018/2/6.
 */
import { stageSize } from '../const'

export abstract class Bgbase extends Laya.Sprite {
  private img
  public preX: number = stageSize.width
  constructor (x, y, w, h, img) {
    super()
    this.x = x
    this.y = y
    this.width = w
    this.height = h
    this.img = img
    this.visible = false
  }
  public loadBg () {
    this.loadImage(this.img)
  }
}

export class BStar extends Bgbase {
  constructor (x, y) {
    super (x, y, 128, 128, require('./assets/star.png'))
  }
}
