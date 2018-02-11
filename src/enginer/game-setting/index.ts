/**
 * Created by Harry on 2018/2/9.
 */
import { Floor, Brick, Pipe } from '../object/block'
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
    fArray.push(new Floor(blockSize.floorSize.width * i, 460))
  }
  for (let i = 20; i < fnum; i++) {
    fArray.push(new Floor(blockSize.floorSize.width * i, 360))
  }
  return fArray
}

function initBrickArray (): Array<Brick> {
  const bArray = []
  bArray.push(new Brick(500, 200, 300, 60))
  return bArray
}

function initPipeArray (): Array<Pipe> {
  const pArray = []
  pArray.push(new Pipe(930, 260, 200))
  pArray.push(new Pipe(1130, 210, 150))
  return pArray
}

export function initGameContent (): Array<any> {
  let objArray = []
  const fArray = initFloorArray()
  const bArray = initBrickArray()
  const pArray = initPipeArray()
  objArray = objArray.concat(fArray, bArray, pArray)
  return objArray
}
