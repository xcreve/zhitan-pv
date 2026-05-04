import request from '@/utils/request'
import type { AjaxResult } from '@/types'
import type { PvQueryParams, PvRecord, PvTableResponse } from '@/api/pvadmin/types/common'

export interface ElectricityTypeSetting extends PvRecord {
  id?: string
  beginTime?: string
  endTime?: string
  remark?: string
  createTime?: string
}

export interface ElectricityTypeSettingQuery extends PvQueryParams {
  remark?: string
}

export interface ElectricityTypeSettingForm extends PvRecord {
  id?: string
  beginTime?: string
  endTime?: string
  remark?: string
}

export function listElectricityTypeSetting(query: ElectricityTypeSettingQuery): Promise<PvTableResponse<ElectricityTypeSetting>> {
  return request({
    url: '/electricityTypeSetting/list',
    method: 'get',
    params: query
  })
}

export function getElectricityTypeSetting(id: string): Promise<AjaxResult<ElectricityTypeSetting>> {
  return request({
    url: `/electricityTypeSetting/${id}`,
    method: 'get'
  })
}

export function addElectricityTypeSetting(data: ElectricityTypeSettingForm): Promise<AjaxResult> {
  return request({
    url: '/electricityTypeSetting',
    method: 'post',
    data
  })
}

export function updateElectricityTypeSetting(data: ElectricityTypeSettingForm): Promise<AjaxResult> {
  return request({
    url: '/electricityTypeSetting',
    method: 'put',
    data
  })
}

export function delElectricityTypeSetting(id: string): Promise<AjaxResult> {
  return request({
    url: `/electricityTypeSetting/${id}`,
    method: 'delete'
  })
}

export function listElectricityTypeSettingItems(settingId: string): Promise<AjaxResult<PvRecord[]>> {
  return request({
    url: `/electricityTypeSetting/listBySettingId/${settingId}`,
    method: 'get'
  })
}
