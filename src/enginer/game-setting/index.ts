/**
 * Created by Harry on 2018/2/9.
 */
import { Floor, Brick } from '../object/block'
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
  for (let i = 0; i < 6; i++) {
    bArray.push(new Brick(500, 200, 300, 60))
  }
  return bArray
}

export function initGameContent (): Array<any> {
  let objArray = []
  const fArray = initFloorArray()
  const bArray = initBrickArray()
  objArray = objArray.concat(fArray, bArray)
  return objArray
}
