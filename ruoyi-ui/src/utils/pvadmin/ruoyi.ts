import type { PvPagePayload, PvPageResult, PvRecord } from '@/api/pvadmin/types/common'

export function normalizePage<T extends PvRecord = PvRecord>(response: unknown): PvPageResult<T> {
  if (Array.isArray(response)) {
    return { rows: response as T[], total: response.length }
  }

  if (!response || typeof response !== 'object') {
    return { rows: [], total: 0 }
  }

  const payload = response as PvPagePayload<T> & { data?: unknown; rows?: T[]; total?: number }
  if (Array.isArray(payload.rows)) {
    return { rows: payload.rows, total: Number(payload.total || payload.rows.length), data: payload.data }
  }

  if (Array.isArray(payload.data)) {
    return { rows: payload.data as T[], total: Number(payload.total || payload.data.length), data: payload.data }
  }

  if (payload.data && typeof payload.data === 'object') {
    const data = payload.data as PvPagePayload<T>
    if (Array.isArray(data.rows)) {
      return { rows: data.rows, total: Number(data.total || data.rows.length), data }
    }
    if (Array.isArray(data.list)) {
      return { rows: data.list, total: Number(data.total || data.list.length), data }
    }
    if (Array.isArray(data.records)) {
      return { rows: data.records, total: Number(data.total || data.records.length), data }
    }
  }

  return { rows: [], total: Number(payload.total || 0), data: payload.data }
}

export function unwrapData<T = unknown>(response: unknown): T {
  if (response && typeof response === 'object' && 'data' in response) {
    return (response as { data?: T }).data as T
  }
  return response as T
}
