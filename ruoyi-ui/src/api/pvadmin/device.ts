import request from '@/utils/request'
import type { AjaxResult } from '@/types'
import type { PvQueryParams, PvRecord, PvTableResponse } from '@/api/pvadmin/types/common'

export interface Device extends PvRecord {
  id?: string
  powerStationId?: string
  powerStationName?: string
  code?: string
  name?: string
  deviceTypeId?: string
  deviceType?: string
  capacity?: number
  factory?: string
  ratedAcPower?: number
  ammeter?: boolean
}

export interface DeviceQuery extends PvQueryParams {
  code?: string
  name?: string
  deviceTypeId?: string
  powerStationId?: string
}

export interface DeviceForm extends PvRecord {
  id?: string
  powerStationId?: string
  code?: string
  name?: string
  deviceTypeId?: string
}

export function listDevice(query: DeviceQuery): Promise<PvTableResponse<Device>> {
  return request({
    url: '/device/list',
    method: 'get',
    params: query
  })
}

export function getDevice(id: string): Promise<AjaxResult<Device>> {
  return request({
    url: `/device/${id}`,
    method: 'get'
  })
}

export function addDevice(data: DeviceForm): Promise<AjaxResult> {
  return request({
    url: '/device',
    method: 'post',
    data
  })
}

export function updateDevice(data: DeviceForm): Promise<AjaxResult> {
  return request({
    url: '/device',
    method: 'put',
    data
  })
}

export function delDevice(id: string): Promise<AjaxResult> {
  return request({
    url: `/device/${id}`,
    method: 'delete'
  })
}
