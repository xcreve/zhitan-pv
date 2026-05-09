import request from '@/utils/request'
import type { AjaxResult } from '@/types'
import type { PvQueryParams, PvRecord, PvTableResponse } from '@/api/pvadmin/types/common'

export interface SparePart extends PvRecord {
  id?: string
  code?: string
  name?: string
  specs?: string
  amount?: number
  location?: string
  movementDate?: string
  remark?: string
}

export interface SparePartsQuery extends PvQueryParams {
  code?: string
  name?: string
  location?: string
}

export interface SparePartsForm extends PvRecord {
  id?: string
  code?: string
  name?: string
  specs?: string
  amount?: number
  location?: string
}

export function listSpareParts(query: SparePartsQuery): Promise<PvTableResponse<SparePart>> {
  return request({
    url: '/parts/list',
    method: 'get',
    params: query
  })
}

export function getSpareParts(id: string): Promise<AjaxResult<SparePart>> {
  return request({
    url: `/parts/${id}`,
    method: 'get'
  })
}

export function addSpareParts(data: SparePartsForm): Promise<AjaxResult> {
  return request({
    url: '/parts',
    method: 'post',
    data
  })
}

export function updateSpareParts(data: SparePartsForm): Promise<AjaxResult> {
  return request({
    url: '/parts/update',
    method: 'post',
    data
  })
}

export function outBoundSpareParts(data: SparePartsForm): Promise<AjaxResult> {
  return request({
    url: '/parts',
    method: 'put',
    data
  })
}

export function delSpareParts(id: string): Promise<AjaxResult> {
  return request({
    url: '/parts/delete',
    method: 'delete',
    params: { id }
  })
}

export function listInventoryLocations(): Promise<AjaxResult<PvRecord[]>> {
  return request({
    url: '/inv-loc/list',
    method: 'get'
  })
}
