import { getCurrentInstance } from 'vue'
import type { ComponentPublicInstance } from 'vue'

/**
 * 在 setup() 中获取当前组件 proxy 实例。
 * 替代 `const { proxy } = getCurrentInstance()` 的反复样板，且消除 proxy 为 null 的类型告警。
 *
 * RuoYi 项目大量依赖 globalProperties 注入的 $modal / $tab / $refs 等，
 * 这些属性类型为 any，因此返回值断言为 any 兼容现有调用方式。
 *
 * @throws 当在 setup() 之外调用时
 */
export function useProxy(): any {
  const instance = getCurrentInstance()
  if (!instance) {
    throw new Error('useProxy() must be called inside a Vue setup function')
  }
  return instance.proxy
}
