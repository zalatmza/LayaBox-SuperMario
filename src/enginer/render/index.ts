/**
 * Created by wconisan on 2018/2/5.
 */
export default function render (delay, scope, cb) {
  Laya.timer.frameLoop(1, scope, cb)
}
