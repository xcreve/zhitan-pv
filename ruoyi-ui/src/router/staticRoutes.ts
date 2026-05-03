import type { RouteRecordRaw } from 'vue-router'
import type { AppRouteRecord, BackendRoute } from '@/types/ruoyi'

export const staticMenuRoutes: AppRouteRecord[] = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/dashboard/HomeView.vue'),
    meta: { title: '首页总览', icon: 'DataBoard', affix: true }
  },
  {
    path: '/realtime',
    name: 'Realtime',
    meta: { title: '实时监测', icon: 'Monitor' },
    redirect: '/realtime/data',
    children: [
      { path: '/realtime/data', name: 'RealTimeData', component: () => import('@/views/realtime/RealTimeDataView.vue'), meta: { title: '实时数据', icon: 'Odometer' } },
      { path: '/realtime/station', name: 'StationRealtime', component: () => import('@/views/realtime/StationRealtimeView.vue'), meta: { title: '电站实时状态', icon: 'OfficeBuilding' } },
      { path: '/realtime/device', name: 'DeviceRealtime', component: () => import('@/views/realtime/DeviceRealtimeView.vue'), meta: { title: '设备实时状态', icon: 'Cpu' } }
    ]
  },
  {
    path: '/analysis',
    name: 'Analysis',
    meta: { title: '统计分析', icon: 'TrendCharts' },
    redirect: '/analysis/power-station',
    children: [
      { path: '/analysis/power-station', name: 'PowerStationStats', component: () => import('@/views/analysis/PowerStationStatsView.vue'), meta: { title: '电站发电统计', icon: 'Histogram' } },
      { path: '/analysis/device', name: 'DeviceStats', component: () => import('@/views/analysis/DeviceStatsView.vue'), meta: { title: '设备发电统计', icon: 'DataAnalysis' } },
      { path: '/analysis/same', name: 'SameCompare', component: () => import('@/views/analysis/SameCompareView.vue'), meta: { title: '同比分析', icon: 'SortUp' } },
      { path: '/analysis/loop', name: 'LoopCompare', component: () => import('@/views/analysis/LoopCompareView.vue'), meta: { title: '环比分析', icon: 'SortDown' } }
    ]
  },
  {
    path: '/peak-valley',
    name: 'PeakValley',
    meta: { title: '尖峰平谷', icon: 'PieChart' },
    redirect: '/peak-valley/chart',
    children: [
      { path: '/peak-valley/chart', name: 'PeakValleyChart', component: () => import('@/views/peak-valley/PeakValleyChartView.vue'), meta: { title: '图表统计', icon: 'PieChart' } },
      { path: '/peak-valley/report', name: 'PeakValleyReport', component: () => import('@/views/peak-valley/PeakValleyReportView.vue'), meta: { title: '报表统计', icon: 'Tickets' } }
    ]
  },
  {
    path: '/power-quality',
    name: 'PowerQuality',
    meta: { title: '电能质量', icon: 'Lightning' },
    redirect: '/power-quality/load',
    children: [
      { path: '/power-quality/load', name: 'LoadAnalysis', component: () => import('@/views/power-quality/LoadAnalysisView.vue'), meta: { title: '负荷分析', icon: 'Connection' } },
      { path: '/power-quality/three-phase', name: 'ThreePhase', component: () => import('@/views/power-quality/ThreePhaseView.vue'), meta: { title: '三相不平衡分析', icon: 'Operation' } },
      { path: '/power-quality/power-factor', name: 'PowerFactor', component: () => import('@/views/power-quality/PowerFactorView.vue'), meta: { title: '功率因数分析', icon: 'Gauge' } }
    ]
  },
  {
    path: '/alarm',
    name: 'Alarm',
    component: () => import('@/views/alarm/AlarmView.vue'),
    meta: { title: '智能报警', icon: 'Bell' }
  },
  {
    path: '/operation',
    name: 'Operation',
    meta: { title: '运维管理', icon: 'Tools' },
    redirect: '/operation/power-station',
    children: [
      { path: '/operation/power-station', name: 'PowerStationManage', component: () => import('@/views/operation/PowerStationManageView.vue'), meta: { title: '电站管理', icon: 'OfficeBuilding' } },
      { path: '/operation/device', name: 'DeviceManage', component: () => import('@/views/operation/DeviceManageView.vue'), meta: { title: '设备管理', icon: 'Cpu' } },
      { path: '/operation/device-type', name: 'DeviceTypeManage', component: () => import('@/views/operation/DeviceTypeManageView.vue'), meta: { title: '设备类型管理', icon: 'Grid' } },
      { path: '/operation/inspection', name: 'InspectionManage', component: () => import('@/views/operation/InspectionManageView.vue'), meta: { title: '设备点检', icon: 'Checked' } },
      { path: '/operation/spare-parts', name: 'SparePartsManage', component: () => import('@/views/operation/SparePartsManageView.vue'), meta: { title: '备品备件', icon: 'Box' } },
      { path: '/operation/electricity-type-setting', name: 'ElectricityTypeSetting', component: () => import('@/views/operation/ElectricityTypeSettingView.vue'), meta: { title: '峰平谷配置', icon: 'Setting' } }
    ]
  }
]

export function flatStaticRoutes(routes: AppRouteRecord[] = staticMenuRoutes): RouteRecordRaw[] {
  const records: RouteRecordRaw[] = []
  routes.forEach(route => {
    if (!route.component && route.redirect) {
      records.push({
        path: route.path,
        name: route.name,
        redirect: route.redirect,
        meta: route.meta
      } as RouteRecordRaw)
    }
    if (route.component) {
      records.push({
        path: route.path,
        name: route.name,
        component: route.component as RouteRecordRaw['component'],
        meta: route.meta
      } as RouteRecordRaw)
    }
    if (route.children?.length) {
      records.push(...flatStaticRoutes(route.children))
    }
  })
  return records
}

export function effectiveMenuRoutes(backendRoutes: BackendRoute[]): AppRouteRecord[] {
  const normalized = normalizeBackendRoutes(backendRoutes)
  return normalized.length ? normalized : staticMenuRoutes
}

function normalizeBackendRoutes(routes: BackendRoute[] = [], parentPath = ''): AppRouteRecord[] {
  return routes
    .filter(route => !route.hidden && route.path)
    .map<AppRouteRecord | null>(route => {
      const path = normalizePath(route.path || '', parentPath)
      const localMatch = findStaticRoute(path, route.name)
      const children = normalizeBackendRoutes(route.children || [], path)
      if (!localMatch && !children.length) return null
      if (localMatch?.children?.length && !children.length && !localMatch.component) return null
      return {
        path: localMatch?.path || path,
        name: localMatch?.name || route.name || path.replace(/\W+/g, '_'),
        component: localMatch?.component,
        redirect: localMatch?.redirect || (children[0]?.path ?? undefined),
        meta: {
          title: route.meta?.title || localMatch?.meta.title || route.name || path,
          icon: route.meta?.icon || localMatch?.meta.icon || 'Menu'
        },
        children
      }
    })
    .filter((route): route is AppRouteRecord => Boolean(route))
}

function normalizePath(path: string, parentPath = ''): string {
  if (!path) return '/'
  if (/^https?:\/\//.test(path)) return path
  if (path.startsWith('/')) return path
  const base = parentPath && parentPath !== '/' ? parentPath.replace(/\/$/, '') : ''
  return `${base}/${path}`.replace(/\/+/g, '/')
}

function findStaticRoute(path: string, name?: string): AppRouteRecord | undefined {
  const stack = [...staticMenuRoutes]
  while (stack.length) {
    const current = stack.shift()
    if (!current) continue
    if (current.path === path || (name && current.name === name)) return current
    if (current.children) stack.push(...current.children)
  }
  return undefined
}
