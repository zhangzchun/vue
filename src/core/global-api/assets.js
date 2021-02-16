/* @flow */

import { ASSET_TYPES } from 'shared/constants'
import { isPlainObject, validateComponentName } from '../util/index'

export function initAssetRegisters (Vue: GlobalAPI) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(type => {
      /*zzc
      * 2021年2月11日18:37:37
      * Vue[component]
      * */
    Vue[type] = function (
      id: string,
      definition: Function | Object
    ): Function | Object | void {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
          /*zzc
          * 2021年2月11日18:40:02
          * Vue.component('comp'.{...})
          * */
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'production' && type === 'component') {
          validateComponentName(id)
        }
        /*zzc
        * 2021年2月11日18:41:31
        * def 是对象
        *
        * */
        if (type === 'component' && isPlainObject(definition)) {
            /*zzc
            * 定义组件name*/
          definition.name = definition.name || id
            /*
            * extend创建组件构造函数，def 变成构造函数
            * */
          definition = this.options._base.extend(definition)
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition }
        }
        /* 注册 */
        this.options[type + 's'][id] = definition
        return definition
      }
    }
  })
}
