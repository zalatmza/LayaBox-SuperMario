/**
 * Created by wconisan on 2018/3/16.
 */
import { monsterProperty, playerProp } from '../const'

const Loader = Laya.Loader

export const preAsset = [
  {
    url: './static/res/character1.json',
    type: Loader.ATLAS
  }
]

export const assets = [
  {
    url: './static/res/pp.json',
    type: Loader.ATLAS
  },
  {
    url: './static/res/bullet.json',
    type: Loader.ATLAS
  },
  {
    url: './static/res/character1_toggle.json',
    type: Loader.ATLAS
  },
  {
    url: './static/res/character1_attack.json',
    type: Loader.ATLAS
  },
  {
    url: './static/res/character1_jump.json',
    type: Loader.ATLAS
  },
  {
    url: './static/res/character1_toggle.json',
    type: Loader.ATLAS
  },
  {
    url: './static/res/character2.json',
    type: Loader.ATLAS
  },
  {
    url: './static/res/character2_jump.json',
    type: Loader.ATLAS
  },
  {
    url: './static/res/character2_toggle.json',
    type: Loader.ATLAS
  },
  {
    url: './static/res/background1.png',
    type: Loader.IMAGE
  },
  {
    url: './static/res/land1.json',
    type: Loader.ATLAS
  },
  {
    url: './static/music/mxd1.mp3',
    type: Loader.SOUND
  }
]

export function createFrames () {
  // 奔跑
  Laya.Animation.createFrames([
    'character2/character2_run1_1.png', 'character2/character2_run1_2.png',
    'character2/character2_run1_3.png', 'character2/character2_run1_4.png',
    'character2/character2_run1_5.png', 'character2/character2_run1_6.png',
    'character2/character2_run1_7.png', 'character2/character2_run1_8.png',
    'character2/character2_run1_9.png', 'character2/character2_run1_10.png',
    'character2/character2_run1_11.png', 'character2/character2_run1_12.png'], playerProp.action.right1)
  // 攻击
  Laya.Animation.createFrames([
      'character1_attack/character1_attack1_1.png', 'character1_attack/character1_attack1_2.png',
      'character1_attack/character1_attack1_3.png', 'character1_attack/character1_attack1_4.png',
      'character1_attack/character1_attack1_5.png', 'character1_attack/character1_attack1_6.png',
      'character1_attack/character1_attack1_7.png', 'character1_attack/character1_attack1_8.png',
      'character1_attack/character1_attack1_9.png', 'character1_attack/character1_attack1_10.png'],
    playerProp.action.attackRight)
  // 跳跃
  Laya.Animation.createFrames([
    'character2_jump/character2_jump1_1.png', 'character2_jump/character2_jump1_2.png',
    'character2_jump/character2_jump1_3.png'],
    playerProp.action.jump1)
  Laya.Animation.createFrames([
      'character1_jump/character1_jump1_1.png', 'character1_jump/character1_jump1_2.png',
      'character1_jump/character1_jump1_3.png', 'character1_jump/character1_jump1_4.png',
      'character1_jump/character1_jump1_5.png', 'character1_jump/character1_jump1_6.png',],
    playerProp.action.jump2)
  // 人物变身：normal --> advanced
  Laya.Animation.createFrames([
    'character2_toggle/character2_toggle1.png', 'character2_toggle/character2_toggle2.png',
    'character2_toggle/character2_toggle3.png', 'character2_toggle/character2_toggle4.png',
    'character2_toggle/character2_toggle5.png', 'character2_toggle/character2_toggle6.png',
    'character2_toggle/character2_toggle7.png', 'character2_toggle/character2_toggle8.png',
    'character2_toggle/character2_toggle9.png', 'character2_toggle/character2_toggle10.png',
    'character2_toggle/character2_toggle11.png'],
  playerProp.action.toggleToAdvanced)
  // 人物变身：advanced --> normal
  Laya.Animation.createFrames([
      'character1_toggle/character1_toggle1.png', 'character1_toggle/character1_toggle2.png',
      'character1_toggle/character1_toggle3.png', 'character1_toggle/character1_toggle4.png',
      'character1_toggle/character1_toggle5.png', 'character1_toggle/character1_toggle6.png',
      'character1_toggle/character1_toggle7.png', 'character1_toggle/character1_toggle8.png',
      'character1_toggle/character1_toggle9.png', 'character1_toggle/character1_toggle10.png',
      'character1_toggle/character1_toggle11.png', 'character1_toggle/character1_toggle12.png',
      'character1_toggle/character1_toggle13.png', 'character1_toggle/character1_toggle14.png',
      'character1_toggle/character1_toggle15.png', 'character1_toggle/character1_toggle16.png',
      'character1_toggle/character1_toggle17.png', 'character1_toggle/character1_toggle18.png'],
    playerProp.action.toggleToNormal)
  // 蘑菇移动
  Laya.Animation.createFrames(['pp/pp001.png', 'pp/pp002.png', 'pp/pp003.png'],
    monsterProperty.monster1.action.right)
  Laya.Animation.createFrames(['pp/pp004.png', 'pp/pp005.png', 'pp/pp006.png'],
    monsterProperty.monster1.action.left)
  // 子弹
  Laya.Animation.createFrames(['bullet/bullet1.png', 'bullet/bullet2.png', 'bullet/bullet3.png'],
    playerProp.bulletSize.action.right)
  // 子弹boom
  Laya.Animation.createFrames(['bullet/boom1.png', 'bullet/boom2.png', 'bullet/boom3.png', 'bullet/boom4.png'],
    playerProp.bulletSize.action.boom)
}
