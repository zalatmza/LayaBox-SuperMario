/**
 * Created by wconisan on 2018/2/26.
 */
import { handleSize, key, gameToolBarConfig, stageSize } from '../const'
import { gameMain } from '../../index'

abstract class BaseBtn extends Laya.Sprite {
  protected touchWidth: number = 0
  protected touchHeight: number = 0
  protected r: number = 0
  constructor () {
    super()
    this.mouseEnabled = true
    this.alpha = 0.5
  }
}

class ToolBtn extends BaseBtn {
  public isClick: boolean = false
  constructor () {
    super()
    this.touchWidth = gameToolBarConfig.btnSize.touchWidth
    this.touchHeight = gameToolBarConfig.btnSize.touchHeight
    this.r = gameToolBarConfig.btnSize.radius
    this.size(this.touchWidth, this.touchHeight)
    this.graphics.drawCircle(this.touchWidth / 2, this.touchHeight / 2, this.r, '#000')
  }
}

class HandleBtn extends BaseBtn {
  private keyCode: number = 0
  constructor (x, y, keyCode) {
    super()
    this.touchWidth = handleSize.touchWidth
    this.touchHeight = handleSize.touchHeight
    this.r = handleSize.radius
    this.pos(x, y)
    this.size(handleSize.touchWidth, handleSize.touchHeight)
    // this.graphics.drawRect(0, 0, this.touchWidth, this.touchHeight, 'FF0')
    this.graphics.drawCircle(this.touchWidth / 2, 130, this.r, '#fff')
    this.keyCode = keyCode
    this.on(Laya.Event.MOUSE_DOWN, this, () => {
      gameMain.player.keyState[keyCode] = true
      this.alpha = 0.75
    })
    this.on(Laya.Event.MOUSE_UP, this, this.bindKeyCode)
    this.on(Laya.Event.MOUSE_OUT, this, this.bindKeyCode)
  }
  public bindKeyCode (e: Laya.Event) {
    gameMain.player.keyState[this.keyCode] = false
    gameMain.player.initAction()
    this.alpha = 0.5
    e.stopPropagation()
  }
}

class OperateBtns extends  Laya.Sprite {
  private exitBtn: ToolBtn
  private pauseBtn: ToolBtn
  constructor () {
    super()
    this.zOrder = 12
    this.init()
    this.pos(0, 0)
  }
  // 退出按钮
  private initExitBtn () {
    this.exitBtn = new ToolBtn()
    this.exitBtn.pos(0, 0)
    this.exitBtn.on(Laya.Event.MOUSE_UP, this, e => {
      gameMain.gamePause()
      gameMain.battleSprite.visible = false
      gameMain.battleSprite = null
      gameMain.selectLevelSprite.visible = true
    })
    this.addChild(this.exitBtn)
  }
  // 暂停按钮
  private initPauseBtn () {
    this.pauseBtn = new ToolBtn()
    this.pauseBtn.pos(gameToolBarConfig.btnSize.touchWidth, 0)

    this.pauseBtn.on(Laya.Event.MOUSE_UP, this, e => {
      if (!this.pauseBtn.isClick) {
        gameMain.gamePause()
        this.pauseBtn.isClick = true
      } else {
        gameMain.gameContinue()
        this.pauseBtn.isClick = false
      }
      e.stopPropagation()
    })
    this.addChild(this.pauseBtn)
  }
  // 操作按钮
  private initHandleBtn () {
    this.addChild(new HandleBtn(0, 400, key.left))
    this.addChild(new HandleBtn(150, 400, key.right))
    this.addChild(new HandleBtn(810, 400, key.up))
  }
  public init () {
    this.initExitBtn()
    this.initPauseBtn()
    this.initHandleBtn()
  }
}

export default OperateBtns
