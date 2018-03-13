/**
 * Created by Harry on 2018/2/9.
 */
import { Floor, Brick, Pipe, ABlock, Block, Monster1, Grass } from '../object/block'
import { blockSize, gameSize } from '../const'

function map1 () {
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

  const monsterArray = []
  monsterArray.push(new Monster1(600, 100))
  monsterArray.push(new Monster1(1110, 100))

  return [...fArray, ...bArray, ...pArray, ...gArray, ...monsterArray]
}
function map2 () {
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
function map3 () {
  // 地板
  const fnum = Math.floor(gameSize.width / blockSize.floorSize.width) + 1
  const fArray = []
  for (let i = 0; i < 30; i++) {
    fArray.push(new Floor(blockSize.floorSize.width * i, 460))
  }

  // 砖块
  const bArray = []
  bArray.push(new Brick(500, 200, 150, 150))

  return [...fArray, ...bArray]
}

class Battle {
  constructor (map) {
    this._map = map
  }
  public body: Laya.Sprite
  private _map // function
  public init () {
    this.body = new Laya.Sprite()
    this.body.zOrder = 10
    this._map().forEach(item => {
      this.body.addChild(item)
    })
    return this.body._childs
  }
}

export default function generateGameBattle (): Battle[] {
  return [
    new Battle(map1),
    new Battle(map2),
    new Battle(map3)
  ]
}
