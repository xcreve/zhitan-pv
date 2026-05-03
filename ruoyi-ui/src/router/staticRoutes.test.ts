import { describe, expect, it } from 'vitest'
import { effectiveMenuRoutes, flatStaticRoutes, staticMenuRoutes } from '@/router/staticRoutes'

describe('static PV menu routes', () => {
  it('covers every required first-level module and child page', () => {
    const routeTitles = flatStaticRoutes().map(route => String(route.meta?.title))
    expect(routeTitles).toEqual(
      expect.arrayContaining([
        '首页总览',
        '实时数据',
        '电站实时状态',
        '设备实时状态',
        '电站发电统计',
        '设备发电统计',
        '同比分析',
        '环比分析',
        '图表统计',
        '报表统计',
        '负荷分析',
        '三相不平衡分析',
        '功率因数分析',
        '智能报警',
        '电站管理',
        '设备管理',
        '设备类型管理',
        '设备点检',
        '备品备件',
        '峰平谷配置'
      ])
    )
  })

  it('falls back to local full menu when backend returns no routers', () => {
    expect(effectiveMenuRoutes([])).toBe(staticMenuRoutes)
  })

  it('registers parent redirect records for direct module entry', () => {
    expect(flatStaticRoutes().find(route => route.path === '/realtime')?.redirect).toBe('/realtime/data')
    expect(flatStaticRoutes().find(route => route.path === '/operation')?.redirect).toBe('/operation/power-station')
  })

  it('drops unknown backend menus and falls back to local PV modules', () => {
    const menus = effectiveMenuRoutes([
      {
        path: 'system',
        name: 'System',
        meta: { title: '系统管理', icon: 'system' },
        children: [{ path: 'user', name: 'User', meta: { title: '用户管理' } }]
      }
    ])

    expect(menus.map(route => route.meta.title)).not.toContain('系统管理')
    expect(menus.map(route => route.meta.title)).toEqual(
      expect.arrayContaining(['首页总览', '实时监测', '统计分析', '尖峰平谷', '电能质量', '智能报警', '运维管理'])
    )
  })

  it('normalizes relative backend child paths against their parent path', () => {
    const menus = effectiveMenuRoutes([
      {
        path: 'realtime',
        name: 'Realtime',
        meta: { title: '实时监测', icon: 'Monitor' },
        children: [{ path: 'data', name: 'RealTimeData', meta: { title: '实时数据' } }]
      }
    ])

    const realtime = menus.find(route => route.path === '/realtime')
    expect(realtime?.children?.some(route => route.path === '/realtime/data')).toBe(true)
  })

  it('does not append unreturned local modules when backend provides recognized PV menus', () => {
    const menus = effectiveMenuRoutes([
      {
        path: 'realtime',
        name: 'Realtime',
        meta: { title: '实时监测', icon: 'Monitor' },
        children: [{ path: 'data', name: 'RealTimeData', meta: { title: '实时数据' } }]
      }
    ])

    expect(menus.map(route => route.meta.title)).toEqual(['实时监测'])
    expect(menus.some(route => route.path === '/operation')).toBe(false)
  })
})
