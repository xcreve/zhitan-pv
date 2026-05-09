export function toArray<T = Record<string, unknown>>(input: unknown): T[] {
  if (Array.isArray(input)) return input as T[]
  if (input && typeof input === 'object') {
    const value = input as Record<string, unknown>
    if (Array.isArray(value.rows)) return value.rows as T[]
    if (Array.isArray(value.list)) return value.list as T[]
    if (Array.isArray(value.records)) return value.records as T[]
  }
  return []
}

export function valueOf(row: Record<string, unknown>, prop: string): unknown {
  return prop.split('.').reduce<unknown>((current, key) => {
    if (current && typeof current === 'object') {
      return (current as Record<string, unknown>)[key]
    }
    return undefined
  }, row)
}

export function displayValue(value: unknown, unit = ''): string {
  if (value === null || value === undefined || value === '') return '--'
  if (typeof value === 'number') return `${Number.isInteger(value) ? value : value.toFixed(2)}${unit}`
  return `${value}${unit}`
}

export function numberValue(value: unknown): number {
  if (typeof value === 'number') return Number.isFinite(value) ? value : 0
  if (typeof value === 'string') {
    const parsed = Number(value.replace(/,/g, ''))
    return Number.isFinite(parsed) ? parsed : 0
  }
  return 0
}

export function today(): string {
  return new Date().toISOString().slice(0, 10)
}

export function currentMonth(): string {
  return new Date().toISOString().slice(0, 7)
}
