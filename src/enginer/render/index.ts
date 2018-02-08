/**
 * Created by wconisan on 2018/2/5.
 */
import { BStar, Bgbase } from '../background'

function generateRenderList () {
  return [
    new BStar(100,100),
    new BStar(500,200),
    new BStar(1200,100),
    new BStar(1400,200),
    new BStar(2000,100),
    new BStar(2600,200),
    new BStar(2700,100),
    new BStar(3000,200)
  ]
}

let renderList: Bgbase[] = []

export function preRender () {
  renderList = generateRenderList()
  renderList.forEach(item => {
    Laya.stage.addChild(item)
    item.loadBg()
  })
}

export function render (stageX) {
  renderList.forEach(item => {
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
