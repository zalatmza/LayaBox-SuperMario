/**
 * Created by wconisan on 2018/2/1.
 */
import Player from './enginer/object/player'
import Background from './enginer/background'

import { stageSize, gameSize, playerProp, key, crashDir, BlockType } from './enginer/const'
import { generateGameBattle } from './enginer/game-setting'
import { collisionCheck, marginCheck } from './enginer/common/utils'
import { render } from './enginer/render'
import { Block } from './enginer/object/block'
import initHandle from './enginer/handle'

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
  // 背景偏移量
  public stageX: number = 0
  // 主角
  public player: Player
  // 背景
  private background: Background
  // 其他碰撞体
  public blockRenderList: any[]
  // 加载进度
  private loadingText: Laya.Text
  // 选择关卡界面
  private selectLevelStage: Laya.Sprite
  // 关卡信息
  private battleList: any[]
  // 当前关卡
  private currentBattleIndex: number = 0
  // 游戏入口类构造函数
  constructor () {
    Laya.init(stageSize.width, stageSize.height , Laya.WebGL)
    this.setStage()
    this.initLoadingProgess()
    Laya.Stat.show(200, 0)
    Laya.loader.load(assets, Laya.Handler.create(this, this.onLoaded),
                    Laya.Handler.create(this, this.onLoading, null, false),
                    Laya.Loader.TEXT)
  }

  // 设置画布缩放对其
  private setStage () {
    Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_AUTO
    Laya.stage.screenMode = Laya.Stage.SCREEN_HORIZONTAL
    this.stageX = stageSize.width
    // Math.round(laya.utils.Browser.height * stageSize.height / laya.utils.Browser.width)
  }

  // 动画资源加载完成处理函数
  private onLoaded (): void {
    this.playMusic()
    this.battleList = generateGameBattle()
    this.initSelectBattle()
  }

  // 游戏开始
  private gameStart (index) {
    this.currentBattleIndex = index
    this.blockRenderList = this.battleList[index]
    this.background = new Background()
    Laya.stage.addChild(this.background)
    this.player = new Player(0, 0)
    Laya.stage.addChild(this.player)
    initHandle()
    Laya.timer.frameLoop(1, this, this.onLoop)
  }

  // BGM
  private playMusic () {
    Laya.SoundManager.playMusic('./static/music/mxd1.mp3')
    Laya.SoundManager.autoStopMusic = false
  }

  // 游戏主循环
  private onLoop () {
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
            let isTurn = false
            this.blockRenderList.forEach((citem, cindex) => {
              if (item !== citem) {
                // 边缘检测，到边缘就扭头
                if (marginCheck(item, citem) !== -1) {
                  isTurn = true
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
            item.runDir *= isTurn === false ? -1 : 1
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
  public loopPause () {
    Laya.timer.clear(this, this.onLoop)
  }

  // 初始化加载进度条
  private initLoadingProgess () {
    this.loadingText = new Laya.Text()
    this.loadingText.pos(350, 100)
    this.loadingText.zOrder = 21
    this.loadingText.fontSize = 24
    this.loadingText.color = '#fff'
    Laya.stage.addChild(this.loadingText)
  }

  // 资源加载
  private onLoading (progress: number) {
    this.loadingText.text = '资源已加载：' + Math.floor(progress * 100) + '%'
    if (progress === 1) {
      this.loadingText.visible = false
    }
  }

  private initSelectBattle () {
    this.selectLevelStage = new Laya.Sprite()
    this.selectLevelStage.width = stageSize.width
    this.selectLevelStage.height = stageSize.height
    this.selectLevelStage.graphics.drawRect(0, 0, stageSize.width, stageSize.height, '#FF0')
    const title = new Laya.Text()
    title.text = '选择关卡'
    title.width = stageSize.width
    title.align = 'center'
    title.color = '#000'
    title.fontSize = 36
    this.selectLevelStage.addChild(title)
    Laya.stage.addChild(this.selectLevelStage)

    this.battleList.forEach((item, index) => {
      const battle = new Laya.Text()
      battle.text = '第' + (index + 1) + '关'
      battle.height = 100
      battle.width = stageSize.width
      battle.y = 50 + (index + 1) * 100
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
        this.selectLevelStage.visible = false
      })
      this.selectLevelStage.addChild(battle)
    })
  }
}
// 启动游戏
export const gameMain = new GameMain()
