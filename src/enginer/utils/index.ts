/**
 * Created by wconisan on 2018/2/9.
 */
import Base from '../object/base'
import Player from '../object/player'

interface ICrashRes {
  crashDir: 'RIGHT' | 'LEFT' | 'DOWN' | 'UP' | ''
  crashed: boolean
}

export function checkCrash (obj1: Player, obj2: Base): ICrashRes {
  let crashed: boolean = false
  let crashDir
  const { x, y, width, height } = obj1
  const nextX: number = x + obj1.runDir * obj1.speedX
  const nextY: number = y + obj1.speedY
  // 下一帧y轴是否碰到
  const nextCrashY = nextY + height > obj2. y || nextY < obj2.y + obj2.height
  // 当前帧y轴是否碰到
  const currentCrashY = y + height > obj2. y || y > obj2.y + obj2.height
  // 下一帧x轴是否碰到
  const nextCrashX = nextX + width > obj2.x || nextX > obj2.x + obj2.width
  // 当前帧y轴是否碰到
  const currentCrashX = x + width > obj2.x || x < obj2.x + obj2.width
  // y上是否碰撞
  const top = y + height < obj2.y && nextY + height > obj2.y
  // y下是否碰撞
  const down = y > obj2.y + obj2.height && nextY < obj2.y + obj2.height
  const left = x + width <= obj2.x && nextX + width > obj2.x
  const right = x >= obj2.x + obj2.width && nextX < obj2.x + obj2.width

  if (left && currentCrashY) {
    crashDir = 'LEFT'
    crashed = true
  } else if (right && currentCrashY) {
    crashDir = 'RIGHT'
    crashed = true
  } else {
    crashDir = ''
  }

  return {
    crashDir,
    crashed
  }
}
