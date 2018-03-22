import { Base } from '../object/base'
import { stageSize, playerProp } from '../const'

export class GameLoader extends Laya.Sprite {
  /*
  * 资源加载进度显示
  *
  */
  public curProgress: number = 0 // 已显示的加载进度
  public temProgress: number = 0 // 暂存的加载进度
  private loadingText: Laya.Text
  private loadingBar: Laya.Sprite

  constructor (w, h) {
    super()
    this.width = w
    this.height = h
    this.graphics.drawRect(0, 0, this.width, this.height, '#7FFFD4')
    // 初始化进度文字
    this.loadingText = new Laya.Text()
    this.loadingText.zOrder = 21
    this.loadingText.fontSize = 24
    this.loadingText.color = '#00868B'
    // 初始化进度条
    this.loadingBar = new Laya.Sprite()
    this.loadingBar.zOrder = 21
    // 加入舞台
    this.addChild(this.loadingText)
    this.addChild(this.loadingBar)
  }

  // 更新暂存进度
  public onLoading (progress: number) {
    if (this.curProgress >= this.temProgress) {
      this.temProgress = Math.floor(progress * 100)
    }
  }

  // 资源加载
  public update () {
    this.loadingText.text = 'Loading ' + this.curProgress + '%'
    this.loadingText.pos(this.width / 2 - this.loadingText.width / 2,
    this.height / 2 - this.loadingText.height / 2)
    this.loadingBar.graphics.clear()
    this.loadingBar.graphics.drawRect(300, 320, 400 * this.curProgress * 0.01, 20, '#00868B')
  }
}

export class LoadingIcon extends Base {

  private icon: Laya.Animation

  constructor () {
    super(0, 0, playerProp.width, playerProp.height)
    this.zOrder = 30
    this.icon = new Laya.Animation()
    this.icon.interval = playerProp.animationInterval
    this.addChild(this.icon)
  }

  // 显示人物动画1
  public character1 () {
    // 初始化跑步人物
    Laya.Animation.createFrames([
      'character1/character1_run1_1.png', 'character1/character1_run1_2.png',
      'character1/character1_run1_3.png', 'character1/character1_run1_4.png',
      'character1/character1_run1_5.png', 'character1/character1_run1_6.png'], playerProp.action.right2)
    this.icon.play(0, true, playerProp.action.right2)
    this.x = stageSize.width / 2 - this.width / 2 + 55
    this.y = stageSize.height / 2 - this.height / 2 - 30
    this.scaleX = 1
  }

  // 显示人物动画2
  public character2 () {
    this.icon.clear()
    this.alpha = 0
    this.x = stageSize.width / 2 + 300
    this.y = stageSize.height / 2 + 70
    this.scaleX = -1
    this.icon.play(0, true, playerProp.action.right1)
  }

  // 人物动画结束
  public end () {
    this.icon.clear()
    this.scaleX = -1
    this.icon.loadImage('character2/character2_run1_0.png')
  }
}
