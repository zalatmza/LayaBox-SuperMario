/**
 * Created by wconisan on 2018/2/5.
 */
import { Floor, Block, Pipe } from '../object/block'
import { blockSize } from '../const'

function generateBlockRenderList () {
  return [
    new Floor(0, 460),
    new Floor(blockSize.floorSize.width * 1, 460),
    new Floor(blockSize.floorSize.width * 2, 460),
    new Floor(blockSize.floorSize.width * 3, 460),
    new Floor(blockSize.floorSize.width * 5, 460),
    new Floor(blockSize.floorSize.width * 6, 460),
    new Floor(blockSize.floorSize.width * 7, 460),
    new Floor(blockSize.floorSize.width * 8, 460),
    new Floor(blockSize.floorSize.width * 9, 460),
    new Pipe(800, 200, 300)
  ]
}

let blockRenderList: Block[] = []

export function preRender () {
  blockRenderList = generateBlockRenderList()
  blockRenderList.forEach(item => {
    Laya.stage.addChild(item)
    item.loadBg()
  })
}

export function render (stageX) {
  blockRenderList.forEach(item => {
    if (item.x <= stageX) {
      item.visible = true
    }
    item.graphics.clear()
    item.x = item.x - stageX + item.preX
    if (item.x < -item.width) {
      item.visible = false
    }
    item.loadBg()
    item.preX = stageX
  })
}
