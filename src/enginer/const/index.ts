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
  speedY: -33,
  // （假）重力加速度
  acce: 2,
  action: {
    left: 'moveLeft',
    right: 'moveRight'
  }
}

// 主角尺寸
export const playerSize = {
  width: 50,
  height: 60
}

// 障碍物尺寸
export const blockSize = {
  floorSize: {
    width: 60,
    height: 60
  },
  pipeSize: {
    width: 70
  }
}

export const key = {
  left: Laya.Keyboard.LEFT,
  up: Laya.Keyboard.UP,
  right: Laya.Keyboard.RIGHT
}
