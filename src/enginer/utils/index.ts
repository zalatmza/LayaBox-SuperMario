/**
 * Created by wconisan on 2018/2/9.
 */
import Base from '../object/base'
import Player from '../object/player'
import { crashDir } from '../const'

export function checkCrash (obj1: Player, obj2: Base) {
  let crashDir
  const { x, y, width, height } = obj1
  const nextX: number = x + obj1.runDir * obj1.speedX
  const nextY: number = y + obj1.speedY
  // 当前帧y轴是否碰到
  const currentCrashY = y + height > obj2. y || y > obj2.y + obj2.height
  // 当前帧y轴是否碰到
  const currentCrashX = x + width > obj2.x || x < obj2.x + obj2.width
  // y上是否碰撞
  const top = y + height < obj2.y && nextY + height > obj2.y
  // y下是否碰撞
  const down = y > obj2.y + obj2.height && nextY < obj2.y + obj2.height
  const left = x + width <= obj2.x && nextX + width > obj2.x
  const right = x >= obj2.x + obj2.width && nextX < obj2.x + obj2.width

  if (left && currentCrashY) {
    crashDir = crashDir.left
  } else if (right && currentCrashY) {
    crashDir = crashDir.right
  } else {
    crashDir = ''
  }

  return crashDir
}
