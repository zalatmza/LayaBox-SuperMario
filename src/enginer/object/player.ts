/**
 * Created by wconisan on 2018/2/5.
 */
import Base from './base'

export default class Player extends Base {
  private speed: number = 10
  private isRunning: boolean = false

  public checkBlock () {
    console.log('碰撞检测。')
  }

  initAction () {
    document.addEventListener('keydown', (e) => {
      if (e.keyCode === 39) {
        this.x += this.speed
        this.isRunning = true
      } else if (e.keyCode === 37) {
        this.x -= this.speed
        this.isRunning = true
      }
    })
    document.addEventListener('keyup', (e) => {
      this.isRunning = false
    })
  }

  constructor (x, y, w, h, img) {
    super(x, y, w, h, img)
    console.log(this)
    this.loadImage(require('./assets/test.jpg'))
    this.initAction()
  }
}
