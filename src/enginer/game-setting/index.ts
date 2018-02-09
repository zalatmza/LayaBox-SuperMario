import { Floor, Block } from '../object/block'
import { blockSize, gameSize } from '../const'

function initFloorArray (): Array<Floor> {
  const fnum = Math.floor(gameSize.width / blockSize.floorSize.width) + 1
  const fArray = []
  for (let i = 0; i < fnum; i++) {
    fArray.push(new Floor(blockSize.floorSize.width * i, 460))
  }
  return fArray
}

export function initGameContent (): Array<any> {
  let objArray = []
  const fArray = initFloorArray()
  objArray = objArray.concat(fArray)
  return objArray
}
