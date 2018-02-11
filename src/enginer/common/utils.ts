/**
 * Created by Harry on 2018/2/11.
 */
import { stageSize, playerProp } from '../const'
/* 碰撞检测，返回碰撞类型：-1 --> 没有碰撞,
                        3 --> obj1 位于 obj2上方,
                        2 --> obj1 位于 obj2下方,
                        1 --> obj1 位于 obj2左方,
                        0 --> obj1 位于 obj2右方 */
export function collisionCheck (obj1, obj2): number  {
  let cType: number = -1
  if (obj1.y < obj2.y && obj2.y - obj1.y <= obj1.height
    && Math.min(obj1.x + obj1.width, obj2.x + obj2.width) - Math.max(obj1.x, obj2.x) > 0) {
    cType = 3
    return cType
  }
  if (obj1.y > obj2.y && obj1.y - obj2.sy <= obj2.height && obj1.y + obj1.height > obj2.y + obj2.height
    && Math.min(obj1.x + obj1.width, obj2.x + obj2.width) - Math.max(obj1.x, obj2.x) > 0) {
    cType = 2
    return cType
  }
  if (obj1.x < obj2.x && obj2.x - obj1.x <= obj1.width
      && Math.min(obj1.y + obj1.height, obj2.y + obj2.height) - Math.max(obj1.y, obj2.y) > playerProp.acce) {
    cType = 1
    return cType
  }
  if (obj1.x > obj2.x && obj1.x - obj2.x <= obj2.width
    && Math.min(obj1.y + obj1.height, obj2.y + obj2.height) - Math.max(obj1.y, obj2.y) > playerProp.acce) {
    cType = 0
    return cType
  }
  return cType
}
