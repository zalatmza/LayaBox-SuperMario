/**
 * Created by Harry on 2018/2/11.
 */
import { playerProp } from '../const'
/* 碰撞检测，返回碰撞类型：-1 --> 没有碰撞,
                        3 --> obj1 位于 obj2上方,
                        2 --> obj1 位于 obj2下方,
                        1 --> obj1 位于 obj2左方,
                        0 --> obj1 位于 obj2右方 */
export function collisionCheck (obj1, obj2): number  {
  let cType: number = -1
  if (obj1.y < obj2.y && obj2.y - obj1.y <= obj1.height
    && Math.min(obj1.x + obj1.width, obj2.x + obj2.width) - Math.max(obj1.x, obj2.x) > playerProp.width * 0.2) {
    cType = 3
    return cType
  }
  if (obj1.y > obj2.y && obj1.y - obj2.y < obj2.height && obj1.y + obj1.height >= obj2.y + obj2.height
    && Math.min(obj1.x + obj1.width, obj2.x + obj2.width) - Math.max(obj1.x, obj2.x) > playerProp.width * 0.2) {
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

// 边缘检测
export function marginCheck (obj1, obj2) {
  return collisionCheck({
    x: obj1.x + obj1.width * obj1.runDir,
    y: obj1.y,
    width: obj1.width,
    height: obj1.height
  }, obj2)
}

function track (c1 = [0, 0], c2 = [0, 0]) {
  // y = k * x + b
  const k = (c2[1] - c1[1]) / (c2[0] - c1[0]) // 斜率
  const b = c2[1] - k * c2[0] // 常量b
  return {
    y: x => k * x + b,
    x: y => (y - b) / k
  }
}

// 碰撞检测
export function collisionCheck1 (obj1, obj2) {
  /*
  *  1      \   2   /      3
  *          \     /
  *       -------------
  *       |           |
  *       |   O   O   |
  *  4    |           |    5
  *       |     W     |
  *       -------------
  *
  *  6          7          8
  *
  * */
  // 定义基础属性
  const [ x1 = 0, y1 = 0, w1 = 0, h1 = 0, r1 = 1, sx1 = 0, sy1 = 0, a1 = 0 ] =
        [ obj1.x, obj1.y, obj1.width, obj1.height, obj1.runDir, obj1.speedX, obj1.speedY, obj1.acce ]
  const [ x2 = 0, y2 = 0, w2 = 0, h2 = 0, r2 = 1, sx2 = 0, sy2 = 0, a2 = 0 ] =
        [ obj2.x, obj2.y, obj2.width, obj2.height, obj2.runDir, obj2.speedX, obj2.speedY, obj2.acce ]

  // 下一帧物体的状态
  const [nx1, ny1] = [x1 + sx1 * r1,  y1 + sy1 + a1 / 2]
  const [nx2, ny2] = [x2 + sx2 * r2,  y2 + sy2 + a2 / 2]

  // 曲线轨迹近似看成直线方程，原理和微积分类似
  const trackFunc = track([x1, y1], [nx1, ny1])

  // 交点
  const xpoint = []
  if (trackFunc.x(nx2) <= ny2 + h2 && trackFunc.x(nx2) >= ny2) {
    xpoint.push([nx2,trackFunc.x(nx2)])
  }
  if (trackFunc.x(nx2 + w2) <= ny2 + h2 && trackFunc.x(nx2 + w2) >= ny2) {
    xpoint.push([nx2 + w2, trackFunc.x(nx2 + w2)])
  }
  if (trackFunc.y(ny2) <= nx2 + w2 && trackFunc.x(ny2) >= nx2) {
    xpoint.push([trackFunc.y(ny2), ny2])
  }
  if (trackFunc.y(ny2 + h2) <= nx2 + w2 && trackFunc.x(ny2 + h2) >= nx2) {
    xpoint.push([trackFunc.y(ny2 + h2), ny2 + h2])
  }
  if (obj2.constructor.name === 'Brick') {
    console.log(xpoint)
  }
}
