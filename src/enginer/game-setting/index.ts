/**
 * Created by Harry on 2018/2/9.
 */
import { Floor, Brick, Pipe, ABlock, Block, Monster1 } from '../object/block'
import { blockSize, gameSize } from '../const'

function initFloorArray (): Array<Floor> {
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
  return fArray
}

function initBrickArray (): Array<Brick> {
  const bArray = []
  bArray.push(new Brick(500, 200, 300, 60))
  bArray.push(new Brick(1500, 150, 700, 100))
  return bArray
}

function initPipeArray (): Array<Pipe> {
  const pArray = []
  pArray.push(new Pipe(930, 260, 200))
  pArray.push(new Pipe(1230, 210, 150))
  return pArray
}

function initMonstersArray (): ABlock[] {
  const monsterArray = []
  monsterArray.push(new Monster1(550, 100))
  monsterArray.push(new Monster1(200, 100))
  monsterArray.push(new Monster1(1000, 100))
  return monsterArray
}

export function initGameContent (): Block[] {
  let objArray = []
  objArray = objArray.concat(initFloorArray(), initBrickArray(), initPipeArray(), initMonstersArray())
  return objArray
}
