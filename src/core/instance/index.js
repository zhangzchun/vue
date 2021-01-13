import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

/* 2021年1月5日08:04:57*/
//zzc 定义vue 的构造函数
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  //zzc 混入 initMixin
  this._init(options)
}

/*zzc
* 2021年1月6日21:58:09
* 混入
* initMixin通过该方法为 vue 添加 _init
* 定义实例方法
* stateMixin    $set  $delete  $watch
* eventsMixin   $on  $once
* lifecycleMixin _update  $forceUpdate
* renderMixin   _render  $nextTick
* */
initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)

export default Vue
