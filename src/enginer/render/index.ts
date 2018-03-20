/**
 * Created by wconisan on 2018/2/5.
 */
import { blockSize, blockType, stageSize } from '../const'
import { gameMain } from '../../index'

export function render (item, xOffset, yOffset) {
  item.x < stageSize.width + item.halfW && !item.visible && (item.visible = true)
  item.x -= xOffset
  item.y -= yOffset
  // 从舞台上移除
  item.x < -item.width && (item.visible = false)
}
