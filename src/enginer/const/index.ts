/**
 * Created by wconisan on 2018/2/6.
 */
export const stageSize = {
  width: 1000,
  height: 600
}

export const gameSize = {
  width: 5000,
  height: stageSize.height
}

// 马里奥属性
export const playerProp = {
  // 移动速度
  speedX: 8,
  // 跳跃初速度
  initSpeedY: -30,
  // （假）重力加速度
  acce: 2,
  action: {
    left: 'playerMoveLeft',
    right: 'playerMoveRight'
  }
}

// 主角尺寸
export const playerSize = {
  width: 50,
  height: 60
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
  }
}

// 怪物属性
export const monsterProperty = {
  monster1: {
    height: 63,
    width: 63,
    speedX: 1,
    // 跳跃初速度
    initSpeedY: -30,
    // （假）重力加速度
    acce: 2,
    action: {
      left: 'monsterMoveLeft',
      right: 'monsterMoveRight'
    }
  }
}

export const key = {
  left: Laya.Keyboard.LEFT,
  up: Laya.Keyboard.UP,
  right: Laya.Keyboard.RIGHT
}

export const crashDir = {
  left: 'CRASHLEFT',
  right: 'CRASHRIGHT',
  up: 'CRASHUP',
  down: 'CRASHDOWN'
}

export const marginDir = {
  left: 'MARGINLEFT',
  right: 'MARGINRIGHT',
  up: 'MARGINUP',
  down: 'MARGINDOWN'
}
