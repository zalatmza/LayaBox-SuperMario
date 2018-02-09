/**
 * Created by Harry on 2018/2/9.
 */
import { Floor } from '../object/block'
import { blockSize, gameSize } from '../const'

function initFloorArray (): Array<Floor> {
  const fnum = Math.floor(gameSize.width / blockSize.floorSize.width) + 1
  const fArray = []
<<<<<<< HEAD
  for (let i = 0; i < fnum; i++) {
    if (i === 5) {
      fArray.push(new Floor(blockSize.floorSize.width * i, 300))
    } else {
      fArray.push(new Floor(blockSize.floorSize.width * i, 460))
    }
=======
  for (let i = 0; i < 6; i++) {
    fArray.push(new Floor(blockSize.floorSize.width * i, 460))
>>>>>>> 34468f88f96f63c446e14ac9bb048a16e305ae84
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

export function initGameContent (): Array<any> {
  let objArray = []
  const fArray = initFloorArray()
  objArray = objArray.concat(fArray)
  return objArray
}
