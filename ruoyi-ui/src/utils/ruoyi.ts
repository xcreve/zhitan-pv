import type { PageResult, RuoYiResponse } from '@/types/ruoyi'

export function isSuccessCode(code: unknown): boolean {
  return code === 200 || code === 0 || code === undefined
}

export function normalizePage<T = Record<string, unknown>>(response: RuoYiResponse<T[]> | T[] | unknown): PageResult<T> {
  if (Array.isArray(response)) {
    return { rows: response as T[], total: response.length }
  }

  if (!response || typeof response !== 'object') {
    return { rows: [], total: 0 }
  }

  const payload = response as RuoYiResponse<T[]>
  if (Array.isArray(payload.rows)) {
    return { rows: payload.rows as T[], total: Number(payload.total || payload.rows.length), data: payload.data }
  }

  if (Array.isArray(payload.data)) {
    return { rows: payload.data as T[], total: Number(payload.total || payload.data.length), data: payload.data }
  }

  if (payload.data && typeof payload.data === 'object') {
    const data = payload.data as Record<string, unknown>
    if (Array.isArray(data.rows)) {
      return { rows: data.rows as T[], total: Number(data.total || data.rows.length), data }
    }
    if (Array.isArray(data.list)) {
      return { rows: data.list as T[], total: Number(data.total || data.list.length), data }
    }
  }

  return { rows: [], total: Number(payload.total || 0), data: payload.data }
}

export function unwrapData<T = unknown>(response: RuoYiResponse<T> | T): T {
  if (response && typeof response === 'object' && 'data' in response) {
    return (response as RuoYiResponse<T>).data as T
  }
  return response as T
}

export function formatApiErrorMessage(message: unknown, fallback = '接口请求失败'): string {
  const raw = typeof message === 'string' ? message.trim() : ''
  if (!raw) return fallback

  const h2MissingTable = raw.match(/Table\s+"([^"]+)"\s+not found/i)
  if (h2MissingTable?.[1]) {
    return `后端数据表缺失：${h2MissingTable[1]}。请检查 dev 数据库初始化脚本。`
  }

  const mysqlMissingTable = raw.match(/Table\s+'[^']*\.?([^'.]+)'\s+doesn't exist/i)
  if (mysqlMissingTable?.[1]) {
    return `后端数据表缺失：${mysqlMissingTable[1]}。请检查数据库初始化脚本。`
  }

  if (/Error querying database|JdbcSQLSyntaxErrorException|bad SQL grammar/i.test(raw)) {
    return '后端数据库查询失败，请检查数据库表结构或接口参数。'
  }

  const compact = raw.replace(/\s+/g, ' ')
  return compact.length > 180 ? `${compact.slice(0, 180)}...` : compact
}
