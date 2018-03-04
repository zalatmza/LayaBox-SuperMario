/**
 * Created by Harry on 2018/2/9.
 */
import { Floor, Brick, Pipe, ABlock, Block, Monster1, Grass } from '../object/block'
import { blockSize, gameSize } from '../const'

abstract class Battle {
  public body: Laya.Sprite
  public init () {
    this.body = new Laya.Sprite()
    this.body.zOrder = 10
    this.map().forEach(item => {
      this.body.addChild(item)
    })
    return this.body._childs
  }

  protected abstract map (): Block[]
}

// 生成第一关地图
class Battle1 extends Battle {
  constructor () {
    super()
    this.init()
  }

  protected map (): Block[] {
    // 地板
    const fnum = Math.floor(gameSize.width / blockSize.floorSize.width) + 1
    const fArray = []
    for (let i = 0; i < 6; i++) {
      fArray.push(new Floor(blockSize.floorSize.width * i, 460))
    }
    for (let i = 6; i < 8; i++) {
      fArray.push(new Floor(blockSize.floorSize.width * i, 360))
    }
    for (let i = 8; i < 20; i++) {
      if (i > 8 && i < 11) {
        continue
      }
      fArray.push(new Floor(blockSize.floorSize.width * i, 460))
    }
    for (let i = 20; i < fnum; i++) {
      if (i > 40 && i < 44) {
        continue
      }
      if (i > 60) {
        fArray.push(new Floor(blockSize.floorSize.width * i, 460))
      } else {
        fArray.push(new Floor(blockSize.floorSize.width * i, 360))
      }
    }

    // 砖块
    const bArray = []
    bArray.push(new Brick(500, 200, 300, 60))
    bArray.push(new Brick(1500, 150, 700, 100))

    // 草地
    const gArray = []
    gArray.push(new Grass(250, 280, 50, 50))
    gArray.push(new Grass(200, 230, 50, 50))

    // 水管
    const pArray = []
    pArray.push(new Pipe(930, 260, 200))
    pArray.push(new Pipe(1230, 210, 150))

    // 花蘑菇
    const monsterArray = []
    monsterArray.push(new Monster1(580, 100))
    monsterArray.push(new Monster1(600, 100))
    monsterArray.push(new Monster1(1110, 100))

    return [...fArray, ...bArray, ...pArray, ...gArray, ...monsterArray]
  }
}

class Battle2 extends Battle {
  constructor () {
    super()
    this.init()
  }

  protected map (): Block[] {
    // 地板
    const fnum = Math.floor(gameSize.width / blockSize.floorSize.width) + 1
    const fArray = []
    for (let i = 0; i < 6; i++) {
      fArray.push(new Floor(blockSize.floorSize.width * i, 460))
    }
    for (let i = 6; i < 8; i++) {
      fArray.push(new Floor(blockSize.floorSize.width * i, 360))
    }
    for (let i = 8; i < 20; i++) {
      if (i > 8 && i < 11) {
        continue
      }
      fArray.push(new Floor(blockSize.floorSize.width * i, 460))
    }
    for (let i = 20; i < fnum; i++) {
      if (i > 40 && i < 44) {
        continue
      }
      if (i > 60) {
        fArray.push(new Floor(blockSize.floorSize.width * i, 460))
      } else {
        fArray.push(new Floor(blockSize.floorSize.width * i, 360))
      }
    }

    // 砖块
    const bArray = []
    bArray.push(new Brick(500, 200, 300, 60))
    bArray.push(new Brick(1500, 150, 700, 100))

    // 草地
    const gArray = []
    gArray.push(new Grass(250, 280, 50, 50))
    gArray.push(new Grass(200, 230, 50, 50))

    // 水管
    const pArray = []
    pArray.push(new Pipe(930, 260, 200))
    pArray.push(new Pipe(1230, 210, 150))

    return [...fArray, ...bArray, ...pArray, ...gArray]
  }
}

export default function generateGameBattle (): Battle[] {
  return [
    new Battle1(),
    new Battle2()
  ]
}
