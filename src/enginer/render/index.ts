/**
 * Created by wconisan on 2018/2/5.
 */
import { Floor, Block } from '../object/block'
import { blockSize, stageSize } from '../const'

export function render (item, xOffset, stageX) {
  if (item.x < stageX && !item.visible) {
    item.loadBg()
    item.visible = true
    Laya.stage.addChild(item)
  }
  if (xOffset > 0) {
    item.x -= xOffset
  }
  if (item.x < -item.width) {
    // 从舞台上移除
    item.visible = false
    item.removeSelf()
  }
}
