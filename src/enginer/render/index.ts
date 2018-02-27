/**
 * Created by wconisan on 2018/2/5.
 */
import { blockSize, BlockType, stageSize } from '../const'

export function render (item, xOffset, stageX) {
  if (item.x < stageX && !item.visible) {
    item.visible = true
    Laya.stage.addChild(item)
  }

  if (xOffset > 0) {
    item.x -= xOffset
  }
  if (item.x < -item.width) {
    // 从舞台上移除
    item.visible = false
    Laya.stage.removeChild(item)
  }
}
