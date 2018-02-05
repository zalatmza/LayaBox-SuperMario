/**
 * Created by wconisan on 2018/2/5.
 */
import Base from './base'
export class Player extends Base {
  public checkBlock () {
    console.log('碰撞检测。')
  }
  constructor (x, y, w, h, img) {
    super(x, y, w, h, img)
  }
}
