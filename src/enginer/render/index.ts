/**
 * Created by wconisan on 2018/2/5.
 */
import { blockSize, BlockType, stageSize } from '../const'
import { gameMain } from '../../index'

export function render (item, xOffset, stageX) {
  if (item.x < stageX && !item.visible) {
    item.visible = true
    gameMain.battleSprite.addChild(item)
  }

  if (xOffset > 0) {
    item.x -= xOffset
  }
  if (item.x < -item.width) {
    // 从舞台上移除
    item.visible = false
    gameMain.battleSprite.removeChild(item)
  }
}
