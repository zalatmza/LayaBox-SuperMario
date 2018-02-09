/**
 * Created by wconisan on 2018/2/5.
 */
import { blockSize, stageSize } from '../const'

export function render (item, xOffset, stageX) {
  if (item.x < stageX + blockSize.floorSize.width && !item.visible) {
    item.loadBg()
    item.visible = true
    Laya.stage.addChild(item)
  }
  if (xOffset > 0) {
    item.x -= xOffset
  }
  if (item.x < -blockSize.floorSize.width) {
    // 从舞台上移除
    item.visible = false
    item.removeSelf()
  }
}
