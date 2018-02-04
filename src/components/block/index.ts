/**
 * Created by wconisan on 2018/2/4.
 */

// 抽象父类
abstract class Block {
  // 坐标x, y
  public x: number = 0
  public y: number = 0
  // 宽高w, h
  public h: number = 0
  public w: number = 0

  // 贴图
  private img

  constructor (x, y, w, h, img) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.img = img
  }
}

// 水管
export class Pipe extends Block {
  constructor (x, y, h) {
    super(x, y, 50 ,h , '')
    console.log('A pipe has been build.')
  }
}
