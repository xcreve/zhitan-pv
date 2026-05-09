import type { AjaxResult, PageDomain, TableDataInfo } from '@/types'

export type PvValue = string | number | boolean | null | undefined
export type PvRecord = Record<string, unknown>

export interface PvQueryParams extends PageDomain {
  [key: string]: PvValue
}

export interface PvPagePayload<T extends PvRecord = PvRecord> {
  rows?: T[]
  list?: T[]
  records?: T[]
  total?: number
}

export type PvTableResponse<T extends PvRecord = PvRecord> =
  | TableDataInfo<T[]>
  | AjaxResult<T[] | PvPagePayload<T>>
  | T[]

export interface PvPageResult<T extends PvRecord = PvRecord> {
  rows: T[]
  total: number
  data?: unknown
}

export interface PvTableColumn<T extends PvRecord = PvRecord> {
  prop: string
  label: string
  minWidth?: number
  width?: number
  unit?: string
  type?: 'text' | 'tag' | 'date' | 'number' | 'status'
  formatter?: (row: T) => string
}

export interface PvSearchField {
  prop: string
  label: string
  type?: 'text' | 'select' | 'date' | 'month' | 'daterange'
  placeholder?: string
  options?: Array<{ label: string; value: string | number | boolean }>
}

export type PvListApi<T extends PvRecord = PvRecord> = (query: PvQueryParams) => Promise<PvTableResponse<T> | unknown>
export type PvDetailApi<T extends PvRecord = PvRecord> = (id: string) => Promise<AjaxResult<T> | T | unknown>
