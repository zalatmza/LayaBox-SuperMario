/**
 * Created by Harry on 2018/2/9.
 */
import { Floor, Brick, Pipe, ABlock, Block, Monster1, Grass } from '../object/block'
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

function initGrassArray (): Array<Grass> {
  const gArray = []
  gArray.push(new Grass(250, 280, 50, 50))
  gArray.push(new Grass(200, 230, 50, 50))
  return gArray
}

function initPipeArray (): Array<Pipe> {
  const pArray = []
  pArray.push(new Pipe(930, 260, 200))
  pArray.push(new Pipe(1230, 210, 150))
  return pArray
}

function initMonstersArray (): ABlock[] {
  const monsterArray = []
  monsterArray.push(new Monster1(380, 100))
  monsterArray.push(new Monster1(550, 100))
  monsterArray.push(new Monster1(650, 100))
  monsterArray.push(new Monster1(580, 100))
  monsterArray.push(new Monster1(600, 100))
  monsterArray.push(new Monster1(1100, 100))
  monsterArray.push(new Monster1(1110, 100))
  return monsterArray
}

export function generateGameBattle (): Block[][] {
  const battleArr = []
  battleArr.push([].concat(initFloorArray(), initBrickArray(), initPipeArray(), initMonstersArray(), initGrassArray()))
  battleArr.push([].concat(initFloorArray(), initBrickArray(), initMonstersArray(), initGrassArray()))
  return battleArr
}
