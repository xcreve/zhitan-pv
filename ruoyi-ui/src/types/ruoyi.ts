import type { Component } from 'vue'
import type { RouteRecordRaw } from 'vue-router'

export type LazyRouteComponent = () => Promise<unknown>

export interface RuoYiResponse<T = unknown> {
  code?: number
  msg?: string
  data?: T
  rows?: T[]
  total?: number
  token?: string
  img?: string
  uuid?: string
  captchaEnabled?: boolean
  [key: string]: unknown
}

export interface PageResult<T = Record<string, unknown>> {
  rows: T[]
  total: number
  data?: unknown
}

export interface QueryParams {
  pageNum?: number
  pageSize?: number
  [key: string]: string | number | boolean | null | undefined
}

export interface TableColumn {
  prop: string
  label: string
  minWidth?: number
  width?: number
  unit?: string
  type?: 'text' | 'tag' | 'date' | 'number' | 'status'
  formatter?: (row: Record<string, unknown>) => string
}

export interface SearchField {
  prop: string
  label: string
  type?: 'text' | 'select' | 'date' | 'month' | 'daterange'
  placeholder?: string
  options?: Array<{ label: string; value: string | number | boolean }>
}

export interface MenuRouteMeta {
  [key: string]: unknown
  [key: number]: unknown
  [key: symbol]: unknown
  title: string
  icon?: string
  hidden?: boolean
  affix?: boolean
}

export interface AppRouteRecord extends Omit<RouteRecordRaw, 'children' | 'component' | 'meta'> {
  name: string
  path: string
  component?: Component | LazyRouteComponent
  meta: MenuRouteMeta
  children?: AppRouteRecord[]
}

export interface BackendRoute {
  name?: string
  path?: string
  hidden?: boolean
  component?: string
  redirect?: string
  meta?: {
    title?: string
    icon?: string
    noCache?: boolean
    link?: string | null
  }
  children?: BackendRoute[]
}
