import request from '@/utils/request'
import type { AjaxResult } from '@/types'
import type { PvQueryParams, PvRecord, PvTableResponse } from '@/api/pvadmin/types/common'
import type { PowerStation } from '@/api/pvadmin/powerStation'

export interface StationRealtimeQuery extends PvQueryParams {
  code?: string
  name?: string
  powerStationId?: string
}

export function listStationRealtime(query: StationRealtimeQuery): Promise<PvTableResponse<PowerStation>> {
  return request({
    url: '/powerStation/list',
    method: 'get',
    params: query
  })
}

export function getStationRealtime(id: string): Promise<AjaxResult<PowerStation>> {
  return request({
    url: `/powerStation/${id}`,
    method: 'get'
  })
}

export function getPowerStationInfoById(id: string): Promise<AjaxResult<PvRecord>> {
  return request({
    url: '/powerStation/getPowerStationInfoById',
    method: 'get',
    params: { id }
  })
}

export function getStationPowerGenerationInfo(id: string): Promise<AjaxResult<PvRecord>> {
  return request({
    url: '/powerStation/getPowerGenerationInfo',
    method: 'get',
    params: { id }
  })
}
