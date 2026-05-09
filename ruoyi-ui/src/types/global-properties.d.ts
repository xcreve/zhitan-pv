/**
 * Vue 全局属性类型扩展
 *
 * 通过 `declare module 'vue'` 扩展 `ComponentCustomProperties`，
 * 让 `proxy.$modal` / `proxy.$tab` 等在 IDE 中获得类型提示与跳转。
 *
 * 注意：本声明不改变运行时行为，也不强制 useProxy() 返回精确类型；
 * 在 useProxy() 仍返回 any 的情况下，提示生效需配合 IDE 主动推导（如 (proxy as ComponentPublicInstance).$modal）。
 *
 * 注入点：
 *   - main.ts 第 50-58 行（useDict / download / parseTime 等 9 项）
 *   - plugins/index.ts 第 11-19 行（$tab / $auth / $cache / $modal / $download）
 */
import 'vue'

declare module 'vue' {
  interface ComponentCustomProperties {
    // ===== main.ts 直接挂载（9 项）=====
    useDict: typeof import('@/utils/dict')['useDict']
    download: typeof import('@/utils/request')['download']
    parseTime: typeof import('@/utils/ruoyi')['parseTime']
    resetForm: typeof import('@/utils/ruoyi')['resetForm']
    addDateRange: typeof import('@/utils/ruoyi')['addDateRange']
    handleTree: typeof import('@/utils/ruoyi')['handleTree']
    selectDictLabel: typeof import('@/utils/ruoyi')['selectDictLabel']
    selectDictLabels: typeof import('@/utils/ruoyi')['selectDictLabels']
    getConfigKey: typeof import('@/api/system/config')['getConfigKey']

    // ===== plugins/index.ts 挂载（5 项，全部 default export）=====
    $tab: typeof import('@/plugins/tab')['default']
    $auth: typeof import('@/plugins/auth')['default']
    $cache: typeof import('@/plugins/cache')['default']
    $modal: typeof import('@/plugins/modal')['default']
    $download: typeof import('@/plugins/download')['default']
  }
}

export {}
