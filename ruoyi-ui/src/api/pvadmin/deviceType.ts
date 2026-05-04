import request from '@/utils/request'
import type { AjaxResult } from '@/types'
import type { PvQueryParams, PvRecord, PvTableResponse } from '@/api/pvadmin/types/common'

export interface DeviceType extends PvRecord {
  id?: string
  name?: string
  description?: string
  indexTemplateItems?: PvRecord[]
}

export interface DeviceTypeQuery extends PvQueryParams {
  name?: string
}

export interface DeviceTypeForm {
  id?: string
  name?: string
  description?: string
}

export function listDeviceType(query: DeviceTypeQuery): Promise<PvTableResponse<DeviceType>> {
  return request({
    url: '/deviceType/list',
    method: 'get',
    params: query
  })
}

export function getDeviceType(id: string): Promise<AjaxResult<PvRecord[]>> {
  return request({
    url: `/deviceType/index/${id}`,
    method: 'get'
  })
}

export function addDeviceType(data: DeviceTypeForm): Promise<AjaxResult> {
  return request({
    url: '/deviceType/create',
    method: 'post',
    data
  })
}

export function updateDeviceType(data: DeviceTypeForm): Promise<AjaxResult> {
  return request({
    url: '/deviceType/edit',
    method: 'post',
    data
  })
}

export function delDeviceType(id: string): Promise<AjaxResult> {
  return request({
    url: `/deviceType/${id}`,
    method: 'delete'
  })
}
