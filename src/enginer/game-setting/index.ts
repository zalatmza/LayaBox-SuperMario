/**
 * Created by Harry on 2018/2/9.
 */
import { Floor, Cliff, Pipe, ABlock, Block, Monster1, GiftBrick, Bullet } from '../object/block'
import { blockSize, gameSize } from '../const'

function map1 () {
  // 地板
  const fnum = Math.floor(gameSize.width / blockSize.floorSize.width) + 1
  const fArray = []
  for (let i = 0; i < 6; i++) {
    fArray.push(new Floor(blockSize.floorSize.width * i, 550))
  }
  for (let i = 6; i < 8; i++) {
    fArray.push(new Floor(blockSize.floorSize.width * i, 500))
  }
  for (let i = 8; i < 20; i++) {
    if (i > 8 && i < 11) {
      continue
    }
    fArray.push(new Floor(blockSize.floorSize.width * i, 550))
  }
  for (let i = 20; i < fnum; i++) {
    if (i > 40 && i < 44) {
      continue
    }
    if (i > 60) {
      fArray.push(new Floor(blockSize.floorSize.width * i, 550))
    } else {
      fArray.push(new Floor(blockSize.floorSize.width * i, 500))
    }
  }

  // 砖块
  const bArray = []
  bArray.push(new Cliff(600, 120, 300))
  bArray.push(new Cliff(700, -100, 300))
  bArray.push(new Cliff(800, -300, 300))
  bArray.push(new Cliff(2200, 150, 700))

  // 金币砖块
  const gArray = []
  gArray.push(new GiftBrick(275, 220, blockSize.giftBrick.width, blockSize.giftBrick.height))
  gArray.push(new GiftBrick(200, 220, blockSize.giftBrick.width, blockSize.giftBrick.height))

  // 水管
  const pArray = []
  pArray.push(new Pipe(930, 450))
  pArray.push(new Pipe(1230, 400))

  const monsterArray = []
  monsterArray.push(new Monster1(2000, 100))
  // monsterArray.push(new Monster1(3500, 100))
  // monsterArray.push(new Monster1(1110, 100))

  return [...pArray, ...fArray, ...bArray, ...gArray, ...monsterArray]
}
function map2 () {
  // 地板
  const fnum = Math.floor(gameSize.width / blockSize.floorSize.width) + 1
  const fArray = []
  for (let i = 0; i < 20; i++) {
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
  bArray.push(new Cliff(500, 200, 300))
  bArray.push(new Cliff(1500, 150, 700))

  // 草地
  const gArray = []
  gArray.push(new GiftBrick(250, 280, blockSize.giftBrick.width, blockSize.giftBrick.height))
  gArray.push(new GiftBrick(200, 230, blockSize.giftBrick.width, blockSize.giftBrick.height))

  // 水管
  const pArray = []
  pArray.push(new Pipe(930, 260))
  pArray.push(new Pipe(1230, 210))

  // zidan
  const bulletArray = []
  bulletArray.push(new Bullet(400, 150, 1))
  bulletArray.push(new Bullet(800, 450, -1))

  return [...fArray, ...bArray, ...pArray, ...gArray]
}
function map3 () {
  // 地板
  const fArray = []
  for (let i = 0; i < 3; i++) {
    fArray.push(new Floor(blockSize.floorSize.width * i, 500))
  }
  fArray.push(new Floor(blockSize.floorSize.width * 3, 450))
  // 水管
  const pArray = []
  pArray.push(new Pipe(500, 0))

  const monsterArray = []
  // monsterArray.push(new Monster1(600, 100))
  monsterArray.push(new Monster1(500, 100))

  // 砖块
  const bArray = []
  bArray.push(new Cliff(0, 0, 150))

  return [...fArray, ...monsterArray]
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
