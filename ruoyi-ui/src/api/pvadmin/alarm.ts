import request from '@/utils/request'
import type { AjaxResult } from '@/types'
import type { PvQueryParams, PvRecord, PvTableResponse } from '@/api/pvadmin/types/common'

export interface Alarm extends PvRecord {
  id?: string
  powerStationName?: string
  deviceCode?: string
  deviceName?: string
  dataTime?: string
  errCode?: string
  errorDescription?: string
  level?: number
  status?: string
}

export interface AlarmQuery extends PvQueryParams {
  powerStationName?: string
  deviceName?: string
  status?: string
  level?: number
}

export interface AlarmHandlingForm extends PvRecord {
  id?: string
  alarmId?: string
  processingOpinions?: string
}

export function listAlarm(query: AlarmQuery): Promise<PvTableResponse<Alarm>> {
  return request({
    url: '/alarm/list',
    method: 'get',
    params: query
  })
}

export function getAlarm(id: string): Promise<AjaxResult<Alarm>> {
  return request({
    url: `/alarm/${id}`,
    method: 'get'
  })
}

export function updateAlarm(data: AlarmHandlingForm): Promise<AjaxResult> {
  return request({
    url: '/alarm/alarmHandling',
    method: 'post',
    data
  })
}

export function listHomeAlarm(): Promise<AjaxResult<Alarm[]>> {
  return request({
    url: '/alarm/listHomeAlarm',
    method: 'get'
  })
}

export function getAlarmLevelAnalysis(): Promise<AjaxResult<PvRecord>> {
  return request({
    url: '/alarm/getAlarmLevelAnalysis',
    method: 'get'
  })
}
