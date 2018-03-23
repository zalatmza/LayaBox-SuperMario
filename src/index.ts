/**
 * Created by wconisan on 2018/2/1.
 */
// 对象
import Player from './enginer/object/player'
import Background from './enginer/background'
import { Block, ABlock } from './enginer/object/block'
import generateGameBattle from './enginer/game-setting'
// 常量
import { stageSize, gameSize, playerProp, key, crashDir, blockType } from './enginer/const'
// 检测工具
import { collisionCheck, marginCheck } from './enginer/common/utils'
// 渲染逻辑
import { render } from './enginer/render'
// 操作健
import OperateBtns from './enginer/handle'
// 静态资源
import { preAsset, assets as Assets, createFrames } from './enginer/common/source'

// 程序入口
class GameMain {
  // canvas宽度
  private canvasWidth = 0
  /*
  * 资源加载进度显示
  *
  */
  private curProgress: number = 0 // 已显示的加载进度
  private temProgress: number = 0 // 暂存的加载进度
  private loadingText: Laya.Text
  private loadingBar: Laya.Sprite
  private loadingIcon: Laya.Animation
  // 加载进度面板
  public loadingSprite: Laya.Sprite
  /*
  * 关卡界面
  *
  */
  public battleSprite: Laya.Sprite
  // 选择关卡界面
  public selectionSprite: Laya.Sprite
  // 关卡信息
  private battleList: any[]
  // 当前关卡
  private currentSelectionIndex: number = 0
  /*
  * 游戏中
  *
  */
  // 背景偏移量
  public stageX: number = 0
  public stageY: number = 0
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

  // 游戏入口类构造函数
  constructor () {
    Laya.init(stageSize.width, stageSize.height, Laya.WebGL)
    this.initStage()
    Laya.Stat.show(200, 0)
    // 预加载进度条所需资源
    Laya.loader.load(preAsset, Laya.Handler.create(this, this.loadAssets, null, true))
  }

  // 设置画布缩放对其
  private initStage () {
    // Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_HEIGHT
    // Laya.stage.screenMode = Laya.Stage.SCREEN_HORIZONTAL
    this.canvasWidth = stageSize.width
    Laya.stage.bgColor = '#7FFFD4'
    // Math.max(Math.round(laya.utils.Browser.height * stageSize.height / laya.utils.Browser.width),
    // Math.round(laya.utils.Browser.width * stageSize.height / laya.utils.Browser.height))
  }

  // 加载游戏资源
  private loadAssets () {
    // 初始化进度加载画面
    this.initLoadingProgess()
    Laya.loader.load(Assets, null, Laya.Handler.create(this, this.onLoading, null, false),
    Laya.Loader.TEXT)
  }

  // 动画资源加载完成处理函数
  private onLoading (progress: number) {
    if (this.curProgress >= this.temProgress) {
      this.temProgress = Math.floor(progress * 100)
    }
  }

  private onLoaded () {
    // this.playMusic()
    // 缓存图集动画
    createFrames()
    Laya.Tween.to(this.loadingIcon, {x: this.loadingIcon.x + 200, alpha: 0}, 400, null,
    Laya.Handler.create(this, this.initSelection, null, true))
  }

  // 游戏开始
  private gameStart (index) {
    this.gameDestory()
    this.stageX = stageSize.width
    this.stageY = 0
    this.currentSelectionIndex = index
    // 新建关卡实例
    this.battleSprite = new Laya.Sprite()
    this.battleSprite.zOrder = 40
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
    this.player = new Player(playerProp.width / 2, 200)
    this.battleSprite.addChild(this.player)

    Laya.stage.addChild(this.battleSprite)
    Laya.timer.frameLoop(1, this, this.gameLoop)
  }

  public gameDestory () {
    this.gamePause()
    if (this.battleSprite) {
      this.battleSprite.visible = false
      this.battleSprite.destroy()
    }
  }

  // 添加新精灵
  public add (item) {
    this.blockRenderList.push(item)
  }

  // BGM
  private playMusic () {
    Laya.SoundManager.playMusic('./static/music/mxd1.mp3')
    Laya.SoundManager.autoStopMusic = false
  }

  // 游戏主循环
  private gameLoop () {
    const prePlayerX = this.player.x
    const prePlayerY = this.player.y
    // 获取舞台相对于背景的x坐标
    this.player.move()
    this.blockRenderList.forEach(item => {
      item.type === blockType.animation && item.visible === true && item.move()
    })
    // 进行碰撞检测
    this.blockRenderList.forEach((item, index) => {
      if (item.isUnUse) {
        this.blockRenderList.splice(index, 1)
      }
      if (item.visible && item.isCarsh) {
        const hitType = collisionCheck(this.player, item)
        switch (hitType) {
          case 3:
            this.player.crashHandle(crashDir.down, item)
            break
          case 2:
            this.player.crashHandle(crashDir.up, item)
            break
          case 1:
            this.player.crashHandle(crashDir.right, item)
            break
          case 0:
            this.player.crashHandle(crashDir.left, item)
            break
        }
        // 怪物碰撞检测
        if (item.type === blockType.animation) {
          let isTurn = false
          this.blockRenderList.forEach((citem, cindex) => {
            if (index !== cindex && citem.isCarsh) {
              // 边缘检测，到边缘就扭头
              if (marginCheck(item, citem) === 3) {
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
                  item.crashHandle(crashDir.right, citem)
                  break
                case 0:
                  item.crashHandle(crashDir.left, citem)
                  break
              }
            }
          })
          if (item.marginCheck) {
            item.runDir *= isTurn ? -1 : 1
          }
        }
      }
    })
    this.gameStageMove(prePlayerX, prePlayerY)
  }

  private gameStageMove (prePlayerX, prePlayerY) {
    let bgXOffset = 0
    let bgYOffset = 0
    // X轴
    if (this.stageX >= gameSize.width) {
      this.stageX = gameSize.width
      this.player.x = Math.min(this.player.x, stageSize.width - this.player.width)
    } else {
      if (this.player.x > stageSize.width / 2) {
        bgXOffset = Math.min(this.player.x - prePlayerX, this.player.x - stageSize.width / 2)
        this.player.x -= bgXOffset
        this.background.x -= bgXOffset
        this.stageX += bgXOffset
      }
    }

    // Y轴
    if (this.player.y < this.player.height || this.player.y > stageSize.height * 0.7) {
      bgYOffset = this.player.y - prePlayerY
      this.player.y -= bgYOffset
      this.background.y -= bgYOffset
      this.stageY += bgYOffset
    }

    // 掉下去则暂停循环
    this.stageY > stageSize.height && this.gamePause() && console.log('game over')

    // 处理其他碰撞体的渲染
    this.blockRenderList.forEach((item, index) => {
      render(item, bgXOffset, bgYOffset)
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
    this.loadingSprite = new Laya.Sprite()
    this.loadingSprite.width = this.canvasWidth
    this.loadingSprite.height = stageSize.height
    this.loadingSprite.graphics.drawRect(0, 0, this.canvasWidth, stageSize.height, '#7FFFD4')
    // 初始化跑步人物
    Laya.Animation.createFrames([
      'character1/character1_run1_1.png', 'character1/character1_run1_2.png',
      'character1/character1_run1_3.png', 'character1/character1_run1_4.png',
      'character1/character1_run1_5.png', 'character1/character1_run1_6.png'], 'loadingAnime')
    this.loadingIcon = new Laya.Animation()
    this.loadingIcon.interval = playerProp.animationInterval
    this.loadingIcon.play(0, true, 'loadingAnime')
    this.loadingIcon.x = stageSize.width / 2 - this.loadingIcon.width / 2 - 50
    this.loadingIcon.y = stageSize.height / 2 - this.loadingIcon.height / 2 - 130
    this.loadingIcon.zOrder = 30
    // 初始化进度文字
    this.loadingText = new Laya.Text()
    this.loadingText.zOrder = 21
    this.loadingText.fontSize = 24
    this.loadingText.color = '#00868B'
    // 初始化进度条
    this.loadingBar = new Laya.Sprite()
    this.loadingBar.zOrder = 21
    // 加入舞台
    this.loadingSprite.addChild(this.loadingText)
    this.loadingSprite.addChild(this.loadingBar)
    Laya.stage.addChild(this.loadingSprite)
    Laya.stage.addChild(this.loadingIcon)
    // 进度文字渐入
    Laya.Tween.from(this.loadingSprite, {alpha: 0}, 750)
    // 启动进度循环帧
    Laya.timer.frameLoop(1, this, this.updateLoadingPanel)
  }

  // 资源加载
  private updateLoadingPanel () {
    if (this.curProgress >= 100) {
      Laya.Tween.to(this.loadingSprite, {alpha: 0}, 100)
      this.clearLoadingPanel()
    }
    this.loadingText.text = 'Loading ' + this.curProgress + '%'
    this.loadingText.pos(stageSize.width / 2 - this.loadingText.width / 2,
    stageSize.height / 2 - this.loadingText.height / 2)
    this.loadingBar.graphics.clear()
    this.loadingBar.graphics.drawRect(300, 320, 400 * this.curProgress * 0.01, 20, '#00868B')
    if (this.curProgress < this.temProgress) {
      this.curProgress++
    }
  }

  // 清除进度条，显示游戏关卡画面
  private clearLoadingPanel () {
    this.loadingSprite.visible = false
    Laya.timer.clear(this, this.updateLoadingPanel)
    this.onLoaded()
  }

  // 选择关卡界面
  private initSelection () {
    this.battleList = generateGameBattle()
    this.selectionSprite = new Laya.Sprite()
    this.selectionSprite.zOrder = 25
    this.selectionSprite.width = this.canvasWidth
    this.selectionSprite.height = stageSize.height
    this.selectionSprite.graphics.drawRect(0, 0, this.canvasWidth, stageSize.height, '#7FFFD4')
    const title = new Laya.Text()
    title.text = '新之助 大冒险'
    title.y = 100
    title.width = stageSize.width
    title.align = 'center'
    title.color = '#00868B'
    title.fontSize = 60
    title.strokeColor = '#ffffff'
    title.stroke = 10
    this.selectionSprite.addChild(title)
    Laya.Tween.from(title, {x: title.x - 200, alpha: 0}, 900, Laya.Ease.elasticInOut)
    Laya.stage.addChild(this.selectionSprite)

    this.battleList.forEach((item, index) => {
      const battle = new Laya.Text()
      battle.text = '第' + (index + 1) + '关'
      battle.height = 100
      battle.width = stageSize.width
      battle.y = 250 + index * 60
      battle.x = 250
      battle.color = '#00868B'
      battle.fontSize = 24
      battle.zOrder = 35
      battle.alpha = 0
      battle.on(Laya.Event.MOUSE_DOWN, this, () => {
        battle.color = '#DDD'
      })
      battle.on(Laya.Event.MOUSE_UP, this, () => {
        battle.color = '#00868B'
        this.gameStart(index)
        this.selectionSprite.visible = false
        this.loadingIcon.visible = false
      })
      this.selectionSprite.addChild(battle)
      Laya.Tween.to(battle, {x: battle.x + 100, alpha: 1}, 900, Laya.Ease.elasticInOut, null, 200 + index * 100)
    })

    // 小新移动出现
    this.loadingIcon.clear()
    this.loadingIcon = new Laya.Animation()
    this.loadingIcon.interval = playerProp.animationInterval
    this.loadingIcon.alpha = 0
    this.loadingIcon.zOrder = 30
    this.loadingIcon.play(0, true, playerProp.action.left1)
    this.loadingIcon.x = stageSize.width / 2 + 300
    this.loadingIcon.y = stageSize.height / 2 + 70
    Laya.stage.addChild(this.loadingIcon)
    Laya.Tween.to(this.loadingIcon, {x: this.loadingIcon.x - 300, alpha: 1}, 750, null,
    Laya.Handler.create(this, () => {
      this.loadingIcon.clear()
      this.loadingIcon.loadImage('character2/character2_run2_0.png')
    }))
  }
}

// 启动游戏
export const gameMain = new GameMain()
