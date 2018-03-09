/**
 * Created by wconisan on 2018/2/1.
 */
import Player from './enginer/object/player'
import Background from './enginer/background'
import { stageSize, gameSize, playerProp, key, crashDir, BlockType } from './enginer/const'
import generateGameBattle from './enginer/game-setting'
import { collisionCheck, marginCheck } from './enginer/common/utils'
import { render } from './enginer/render'
import { Block, ABlock } from './enginer/object/block'
import OperateBtns from './enginer/handle'

// 带加载的资源
const Loader = Laya.Loader
const assets = [
  {
    url: './static/res/pp.json',
    type: Loader.ATLAS
  },
  {
    url: './static/res/player.json',
    type: Loader.ATLAS
  },
  {
    url: './static/res/background1.png',
    type: Loader.IMAGE
  },
  {
    url: './static/res/block.json',
    type: Loader.ATLAS
  },
  {
    url: './static/music/mxd1.mp3',
    type: Loader.SOUND
  }
]

// 程序入口
class GameMain {
  // canvas宽度
  private canvasWidth = 0
  /*
  * 资源加载
  *
  */
  // 加载进度
  private loadingText: Laya.Text

  /*
  * 游戏中
  *
  */
  // 背景偏移量
  public stageX: number = 0
  // 主角
  public player: Player
  // 背景
  private background: Background
  // 其他碰撞体
  public blockRenderList: any[]
  /*
  * 所有按钮
  * */
  // 工具条
  private operationBtnsSprite: OperateBtns

  /*
  * 关卡界面
  *`
  */
  public battleSprite: Laya.Sprite
  // 选择关卡界面
  public selectionSprite: Laya.Sprite
  // 关卡信息
  private battleList: any[]
  // 当前关卡
  private currentSelectionIndex: number = 0

  // 游戏入口类构造函数
  constructor () {
    Laya.init(stageSize.width, stageSize.height, Laya.WebGL)
    this.initStage()
    this.initLoadingProgess()
    Laya.Stat.show(200, 0)
    Laya.loader.load(assets, Laya.Handler.create(this, this.onLoaded),
                    Laya.Handler.create(this, this.onLoading, null, false),
                    Laya.Loader.TEXT)
  }

  // 设置画布缩放对其
  private initStage () {
    Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_HEIGHT
    Laya.stage.screenMode = Laya.Stage.SCREEN_HORIZONTAL
    this.canvasWidth = Math.max(Math.round(laya.utils.Browser.height * stageSize.height / laya.utils.Browser.width),
                                Math.round(laya.utils.Browser.width * stageSize.height / laya.utils.Browser.height))
  }

  // 动画资源加载完成处理函数
  private onLoaded () {
    this.playMusic()
    this.battleList = generateGameBattle()
    this.initSelection()
  }

  // 游戏开始
  private gameStart (index) {
    this.stageX = this.canvasWidth
    this.currentSelectionIndex = index
    // 新建关卡实例
    this.battleSprite = new Laya.Sprite()
    this.battleSprite.zOrder = 20
    // 按钮组
    this.operationBtnsSprite = new OperateBtns()
    this.battleSprite.addChild(this.operationBtnsSprite)
    // 障碍物
    this.blockRenderList = this.battleList[index].init()
    this.battleSprite.addChild(this.battleList[index].body)
    // 背景
    this.background = new Background()
    this.battleSprite.addChild(this.background)
    // 玩家
    this.player = new Player(0, 0)
    this.battleSprite.addChild(this.player)

    Laya.stage.addChild(this.battleSprite)
    Laya.timer.frameLoop(1, this, this.gameLoop)
  }

  // BGM
  private playMusic () {
    Laya.SoundManager.playMusic('./static/music/mxd1.mp3')
    Laya.SoundManager.autoStopMusic = false
  }

  // 游戏主循环
  private gameLoop () {
    const preStageX = this.stageX
    const prePlayX = this.player.x
    const prePlayY = this.player.y
    // 获取舞台相对于背景的x坐标
    this.player.playerMove()
    this.blockRenderList.forEach(item => {
        item.type === BlockType.animation && item.visible === true && item.move()
    })
    // 获取主角x位移
    const playerXOffset = this.player.x - prePlayX
    const playerYOffset = this.player.y - prePlayY
    // 获取背景x方向位移
    let bgXOffset = this.stageX - preStageX
    if (playerXOffset !== 0 || playerYOffset !== 0 || bgXOffset > 0) {
      // 进行碰撞检测
      this.blockRenderList.forEach((item, index) => {
        if (item.visible) {
          switch (collisionCheck(this.player, item)) {
            case 3:
              this.player.crashHandle(crashDir.down, item)
              break
            case 2:
              this.player.crashHandle(crashDir.up, item)
              break
            case 1:
              this.player.crashHandle(crashDir.left, item)
              bgXOffset = 0
              break
            case 0:
              this.player.crashHandle(crashDir.right, item)
              break
          }
          // 怪物碰撞检测
          if (item.type === BlockType.animation) {
            let isTurn = true
            this.blockRenderList.forEach((citem, cindex) => {
              if (index !== cindex) {
                // 边缘检测，到边缘就扭头
                if (marginCheck(item, citem) === 3) {
                  isTurn = false
                }
                switch (collisionCheck(item, citem)) {
                  case 3:
                    item.crashHandle(crashDir.down, citem)
                    break
                  case 2:
                    item.crashHandle(crashDir.up, citem)
                    break
                  case 1:
                    item.crashHandle(crashDir.left, citem)
                    break
                  case 0:
                    item.crashHandle(crashDir.right, citem)
                    break
                }
              }
            })
            item.runDir *= isTurn ? -1 : 1
          }
        }
      })
    }
    // 背景移动
    if (bgXOffset > 0) {
      this.background.x -= bgXOffset
    }
    // 处理其他碰撞体的渲染
    this.blockRenderList.forEach((item, index) => {
      render(item, bgXOffset, this.stageX)
    })
  }

  // 循环暂停
  public gamePause () {
    Laya.timer.clear(this, this.gameLoop)
  }

  // 循环继续
  public gameContinue () {
    Laya.timer.frameLoop(1, this, this.gameLoop)
  }

  // 初始化加载进度条
  private initLoadingProgess () {
    this.loadingText = new Laya.Text()
    this.loadingText.pos(350, 100)
    this.loadingText.zOrder = 21
    this.loadingText.fontSize = 24
    this.loadingText.color = '#FFF'
    Laya.stage.addChild(this.loadingText)
  }

  // 资源加载
  private onLoading (progress: number) {
    this.loadingText.text = '资源已加载：' + Math.floor(progress * 100) + '%'
    if (progress === 1) {
      this.loadingText.visible = false
    }
  }

  // 选择关卡界面
  private initSelection () {
    this.selectionSprite = new Laya.Sprite()
    this.selectionSprite.width = this.canvasWidth
    this.selectionSprite.height = stageSize.height
    this.selectionSprite.graphics.drawRect(0, 0, this.canvasWidth, stageSize.height, '#FF0')
    const title = new Laya.Text()
    title.text = '选择关卡'
    title.y = 100
    title.width = stageSize.width
    title.align = 'center'
    title.color = '#000'
    title.fontSize = 36
    this.selectionSprite.addChild(title)
    Laya.stage.addChild(this.selectionSprite)

    this.battleList.forEach((item, index) => {
      const battle = new Laya.Text()
      battle.text = '第' + (index + 1) + '关'
      battle.height = 100
      battle.width = stageSize.width
      battle.y = 100 + (index + 1) * 100
      battle.align = 'center'
      battle.valign = 'middle'
      battle.color = '#000'
      battle.fontSize = 30
      battle.on(Laya.Event.MOUSE_DOWN, this, () => {
        battle.color = '#DDD'
      })
      battle.on(Laya.Event.MOUSE_UP, this, () => {
        battle.color = '#000'
        this.gameStart(index)
        this.selectionSprite.visible = false
      })
      this.selectionSprite.addChild(battle)
    })
  }
}

// 启动游戏
export const gameMain = new GameMain()
