import { stageSize } from '../const'
/* 碰撞检测，返回碰撞类型：-1 --> 没有碰撞,
                        0 --> obj1 位于 obj2下方,
                        1 --> obj1 位于 obj2左方,
                        2 --> obj1 位于 obj2上方,
                        3 --> obj1 位于 obj2右方 */
export function collisionCheck (obj1, obj2): number  {
  let cType: number = -1
  // if (obj1.y <= obj2.y + obj2.height && obj1.y < obj2.y &&
  //    (obj2.x + obj2.width - obj1.x <= obj2.width + obj1.width || obj1.x + obj1.width >= obj2.x)) {
  //   console.log('enter1')
  //   cType = 0
  //   return cType
  // }
  if (obj2.x > obj1.x && obj2.x - obj1.x <= obj1.width
      && obj2.y <= obj1.y && obj1.y - obj2.y <= obj2.height && obj2.height > stageSize.height - obj1.y - obj1.height) {
    cType = 1
    return cType
  }
  if (obj1.y < obj2.y && obj2.y - obj1.y <= obj1.height
      && obj1.x <= obj2.x + obj2.width && obj1.x >= obj2.x - obj1.width) {
    cType = 2
    return cType
  }
  if (obj2.x < obj1.x && obj1.x - obj2.x <= obj2.width
    && obj2.y <= obj1.y && obj1.y - obj2.y <= obj2.height && obj2.height > stageSize.height - obj1.y - obj1.height) {
    cType = 3
    return cType
  }
  return cType
}
