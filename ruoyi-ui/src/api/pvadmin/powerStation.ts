import request from '@/utils/request'
import type { AjaxResult } from '@/types'
import type { PvQueryParams, PvRecord, PvTableResponse } from '@/api/pvadmin/types/common'

export interface PowerStation extends PvRecord {
  id?: string
  code?: string
  name?: string
  lon?: number
  lat?: number
  subsidizedPrices?: number
  installedCapacity?: number
  gridVoltage?: number
  createTime?: string
}

export interface PowerStationQuery extends PvQueryParams {
  powerStationId?: string
  code?: string
  name?: string
}

export interface PowerStationForm {
  id?: string
  code?: string
  name?: string
  lon?: number
  lat?: number
  subsidizedPrices?: number
  installedCapacity?: number
  gridVoltage?: number
}

export function listPowerStation(query: PowerStationQuery): Promise<PvTableResponse<PowerStation>> {
  return request({
    url: '/powerStation/list',
    method: 'get',
    params: query
  })
}

export function getPowerStation(id: string): Promise<AjaxResult<PowerStation>> {
  return request({
    url: `/powerStation/${id}`,
    method: 'get'
  })
}

export function addPowerStation(data: PowerStationForm): Promise<AjaxResult> {
  return request({
    url: '/powerStation',
    method: 'post',
    data
  })
}

export function updatePowerStation(data: PowerStationForm): Promise<AjaxResult> {
  return request({
    url: '/powerStation',
    method: 'put',
    data
  })
}

export function delPowerStation(id: string): Promise<AjaxResult> {
  return request({
    url: `/powerStation/${id}`,
    method: 'delete'
  })
}
