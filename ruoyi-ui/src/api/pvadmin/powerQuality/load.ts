import request from '@/utils/request'
import type { PvQueryParams, PvRecord, PvTableResponse } from '@/api/pvadmin/types/common'

export interface PowerQualityQuery extends PvQueryParams {
  powerStationId?: string
  deviceId?: string
  timeType?: string
  timeCode?: string
}

export interface PowerQualityRecord extends PvRecord {
  time?: string
  value?: number
  maxValue?: number
  minValue?: number
}

export function listLoadAnalysis(query: PowerQualityQuery): Promise<PvTableResponse<PowerQualityRecord>> {
  return request({
    url: '/realTime/listLoadAnalysis',
    method: 'get',
    params: query
  })
}
