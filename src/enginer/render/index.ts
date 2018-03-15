/**
 * Created by wconisan on 2018/2/5.
 */
import { blockSize, blockType, stageSize } from '../const'
import { gameMain } from '../../index'

export function render (item, xOffset, yOffset) {
  if (item.x < stageSize.width && !item.visible) {
    item.visible = true
  }
  item.x -= xOffset
  item.y -= yOffset

  if (item.x < -item.width) {
    // 从舞台上移除
    item.visible = false
  }
}
