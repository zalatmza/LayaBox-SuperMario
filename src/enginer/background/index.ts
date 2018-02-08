/**
 * Created by wconisan on 2018/2/6.
 * Modified by Harry on 2018/2/8.
 */
import { gameSize } from '../const'

export default class Background extends Laya.Sprite {
  private gradient
  private imgSrc: Array<string> = ['../../../static/res/background1.png']
  constructor () {
    super()
    this.init()
  }
  init (): void {
    // 绘制渐变天空
    this.gradient = Laya.Browser.context.createLinearGradient(0, 0, 0, gameSize.height)
    this.gradient.addColorStop(0, '#1E90FF')
    this.gradient.addColorStop(0.7, '#ADD8E6')
    this.gradient.addColorStop(1, '#ffffff')
    this.graphics.drawRect(0, 0, gameSize.width, gameSize.height, this.gradient)
    // 加载图片资源
    this.loadRes()
  }
  loadRes (): void {
    for (let i = 0; i < this.imgSrc.length; i++) {
      let loaded = null
      if (i === this.imgSrc.length - 1) {
        loaded = Laya.Handler.create(this, this.fillBackground)
      }
      Laya.loader.load(this.imgSrc[i], loaded)
    }
  }
  fillBackground (): void {
    // 绘制山脉
    for (const img of this.imgSrc) {
      this.graphics.fillTexture(Laya.loader.getRes(img), 0, 0, gameSize.width, 600)
    }
  }
}
