/**
 * Created by wconisan on 2018/2/6.
 */
// 画布尺寸
export const stageSize = {
  width: 1000, // laya.utils.Browser.width,
  height: 600 // laya.utils.Browser.height
}

// 整个游戏尺寸
export const gameSize = {
  width: 5000,
  height: stageSize.height
}

// 马里奥属性
export const playerProp = {
  width: 90,
  height: 110,
  // 移动速度
  speedX: 8,
  // 跳跃初速度
  initSpeedY: -35,
  // （假）重力加速度
  acce: 2,
  action: {
    left: 'playerMoveLeft',
    right: 'playerMoveRight',
    attackLeft: 'playerAttackLeft',
    attackRight: 'playerAttackRight'
  }
}

// 障碍物尺寸
export const blockSize = {
  // 地面基本图尺寸
  floorSize: {
    width: 60,
    height: 60
  },
  // 水管基本图尺寸
  pipeSize: {
    width1: 113,
    width2: 107,
    height: 112
  },
  // 金币基本图尺寸
  coinSize: {
    width: 29,
    height: 19
  }
}

// 怪物属性
export const monsterProperty = {
  monster1: {
    height: 63,
    width: 63,
    speedX: 1,
    // 跳跃初速度
    initSpeedY: -25,
    // （假）重力加速度
    acce: 2,
    action: {
      left: 'monsterMoveLeft',
      right: 'monsterMoveRight'
    }
  }
}

// 键盘事件名
export const key = {
  left: Laya.Keyboard.LEFT,
  up: Laya.Keyboard.UP,
  right: Laya.Keyboard.RIGHT,
  space: Laya.Keyboard.SPACE
}

// 碰撞方向
export const crashDir = {
  left: 'CRASHLEFT',
  right: 'CRASHRIGHT',
  up: 'CRASHUP',
  down: 'CRASHDOWN'
}

// 障碍物类型
export const blockType = {
  animation: 'ANIMATION',
  static: 'STATIC'
}

// 操作按钮
export const handleSize = {
  touchWidth: 150,
  touchHeight: 200,
  radius: 50
}

// 游戏工具栏
export const gameToolBarConfig = {
  btnSize: {
    touchWidth: 60,
    touchHeight: 60,
    radius: 20
  }
}
