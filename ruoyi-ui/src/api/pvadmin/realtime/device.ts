import request from '@/utils/request'
import type { AjaxResult } from '@/types'
import type { PvQueryParams, PvRecord, PvTableResponse } from '@/api/pvadmin/types/common'
import type { Device } from '@/api/pvadmin/device'

export interface DeviceRealtimeQuery extends PvQueryParams {
  code?: string
  name?: string
  deviceTypeId?: string
  powerStationId?: string
}

export function listDeviceRealtime(query: DeviceRealtimeQuery): Promise<PvTableResponse<Device>> {
  return request({
    url: '/device/list',
    method: 'get',
    params: query
  })
}

export function getDeviceRealtime(id: string): Promise<AjaxResult<Device>> {
  return request({
    url: `/device/${id}`,
    method: 'get'
  })
}

export function getInverterInfo(id: string): Promise<AjaxResult<PvRecord>> {
  return request({
    url: '/device/getInverterInfo',
    method: 'get',
    params: { id }
  })
}

export function getDevicePowerGenerationInfo(id: string): Promise<AjaxResult<PvRecord>> {
  return request({
    url: '/device/getPowerGenerationInfo',
    method: 'get',
    params: { id }
  })
}
