import request from '@/utils/request'
import type { PvQueryParams, PvRecord, PvTableResponse } from '@/api/pvadmin/types/common'

export interface SameCompareQuery extends PvQueryParams {
  powerStationId?: string
  queryTime?: string
  timeType?: string
}

export interface CompareRecord extends PvRecord {
  powerStationName?: string
  deviceName?: string
  currentTime?: string
  currentValue?: number
  compareTime?: string
  contrastValues?: number
  ratio?: number
}

export function listSameCompare(query: SameCompareQuery): Promise<PvTableResponse<CompareRecord>> {
  return request({
    url: '/statisticsAnalysis/querySameCompareList',
    method: 'get',
    params: query
  })
}
