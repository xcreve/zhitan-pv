import { describe, expect, it } from 'vitest'
import { formatApiErrorMessage, normalizePage, unwrapData } from '@/utils/ruoyi'

describe('RuoYi response helpers', () => {
  it('normalizes TableDataInfo rows and total', () => {
    const page = normalizePage({ code: 200, rows: [{ id: '1' }, { id: '2' }], total: 8 })
    expect(page.rows).toHaveLength(2)
    expect(page.total).toBe(8)
  })

  it('normalizes AjaxResult array data', () => {
    const page = normalizePage({ code: 200, data: [{ name: 'A' }] })
    expect(page.rows).toEqual([{ name: 'A' }])
    expect(page.total).toBe(1)
  })

  it('unwraps AjaxResult data while preserving direct values', () => {
    expect(unwrapData({ code: 200, data: { generation: '12' } })).toEqual({ generation: '12' })
    expect(unwrapData(['direct'])).toEqual(['direct'])
  })

  it('summarizes backend SQL table-missing errors for UI messages', () => {
    const message =
      '### Error querying database. Cause: org.h2.jdbc.JdbcSQLSyntaxErrorException: Table "device" not found; SQL statement: SELECT id FROM device [42102-200]'

    expect(formatApiErrorMessage(message)).toBe('后端数据表缺失：device。请检查 dev 数据库初始化脚本。')
  })
})
