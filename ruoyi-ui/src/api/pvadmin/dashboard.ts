import request from '@/utils/request'
import type { AjaxResult } from '@/types'
import type { PvQueryParams, PvRecord, PvTableResponse } from '@/api/pvadmin/types/common'
import type { Device } from '@/api/pvadmin/device'

export interface DashboardQuery extends PvQueryParams {
  timeType?: string
  queryTime?: string
}

export function getHomePowerStationInfo(): Promise<AjaxResult<PvRecord>> {
  return request({
    url: '/powerStation/getHomePowerStationInfo',
    method: 'get'
  })
}

export function listPowerStationRank(): Promise<AjaxResult<PvRecord[]>> {
  return request({
    url: '/powerStation/listPowerStationRank',
    method: 'get'
  })
}

export function listHomeAlarm(): Promise<AjaxResult<PvRecord[]>> {
  return request({
    url: '/alarm/listHomeAlarm',
    method: 'get'
  })
}

export function getHomepageGenerationStats(query: DashboardQuery): Promise<AjaxResult<PvRecord[]>> {
  return request({
    url: '/statisticsAnalysis/getHomepageGenerationStats',
    method: 'get',
    params: query
  })
}

export function getPeriodGenerationPercentage(query: DashboardQuery): Promise<AjaxResult<PvRecord[]>> {
  return request({
    url: '/peakValley/getPeriodGenerationPercentage',
    method: 'get',
    params: query
  })
}

export function listDashboardDevices(query: PvQueryParams): Promise<PvTableResponse<Device>> {
  return request({
    url: '/device/list',
    method: 'get',
    params: query
  })
}
