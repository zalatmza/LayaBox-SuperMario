/**
 * Created by wconisan on 2018/2/6.
 * Modified by Harry on 2018/2/8.
 */
import { stageSize, gameSize } from '../const'

export class Background extends Laya.Sprite {
  private skySrc: string = '../../../static/res/bg_sky.png'
  constructor () {
    super()
    this.init()
  }
  init (): void {
    Laya.loader.load(this.skySrc, Laya.Handler.create(this, this.fillBackground))
  }
  fillBackground (): void {
    this.graphics.drawTexture(Laya.loader.getRes(this.skySrc), 0, 0, gameSize.width, gameSize.height)
  }
}
