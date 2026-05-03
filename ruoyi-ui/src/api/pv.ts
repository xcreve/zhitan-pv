import request from '@/utils/request'
import type { QueryParams, RuoYiResponse } from '@/types/ruoyi'

export function getList<T = Record<string, unknown>>(url: string, params?: QueryParams): Promise<RuoYiResponse<T[]>> {
  return request.get(url, { params })
}

export function getDetail<T = Record<string, unknown>>(url: string, id: string): Promise<RuoYiResponse<T>> {
  return request.get(`${url}/${id}`)
}

export function getHomePowerStationInfo(): Promise<RuoYiResponse> {
  return request.get('/powerStation/getHomePowerStationInfo')
}

export function listPowerStationRank(): Promise<RuoYiResponse> {
  return request.get('/powerStation/listPowerStationRank')
}

export function listHomeAlarm(): Promise<RuoYiResponse> {
  return request.get('/alarm/listHomeAlarm')
}

export function getAlarmLevelAnalysis(): Promise<RuoYiResponse> {
  return request.get('/alarm/getAlarmLevelAnalysis')
}

export function getHomepageGenerationStats(params: QueryParams): Promise<RuoYiResponse> {
  return request.get('/statisticsAnalysis/getHomepageGenerationStats', { params })
}

export function getPeriodGenerationPercentage(params: QueryParams): Promise<RuoYiResponse> {
  return request.get('/peakValley/getPeriodGenerationPercentage', { params })
}
