import request from '@/utils/request'
import type { AjaxResult } from '@/types'
import type { PvQueryParams, PvRecord, PvTableResponse } from '@/api/pvadmin/types/common'

export interface Inspection extends PvRecord {
  id?: string
  powerStationId?: string
  powerStationName?: string
  deviceCode?: string
  deviceName?: string
  inspectionStartTime?: string
  inspectionEndTime?: string
  inspectionStaff?: string
  inspectionType?: string
}

export interface InspectionQuery extends PvQueryParams {
  powerStationName?: string
  deviceCode?: string
  deviceName?: string
  inspectionType?: string
}

export interface InspectionForm extends PvRecord {
  id?: string
  powerStationId?: string
  deviceId?: string
  inspectionType?: string
}

export function listInspection(query: InspectionQuery): Promise<PvTableResponse<Inspection>> {
  return request({
    url: '/inspection/list',
    method: 'get',
    params: query
  })
}

export function getInspection(id: string): Promise<AjaxResult<Inspection>> {
  return request({
    url: `/inspection/${id}`,
    method: 'get'
  })
}

export function addInspection(data: InspectionForm): Promise<AjaxResult> {
  return request({
    url: '/inspection',
    method: 'post',
    data
  })
}

export function updateInspection(data: InspectionForm): Promise<AjaxResult> {
  return request({
    url: '/inspection',
    method: 'put',
    data
  })
}

export function delInspection(id: string): Promise<AjaxResult> {
  return request({
    url: `/inspection/${id}`,
    method: 'delete'
  })
}

export function exportInspection(query: InspectionQuery): Promise<Blob> {
  return request({
    url: '/inspection/export',
    method: 'get',
    params: query,
    responseType: 'blob'
  })
}
