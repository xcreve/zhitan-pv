import request from '@/utils/request'
import type { PvQueryParams, PvTableResponse } from '@/api/pvadmin/types/common'
import type { CompareRecord } from '@/api/pvadmin/analysis/sameCompare'

export interface LoopCompareQuery extends PvQueryParams {
  powerStationId?: string
  queryTime?: string
  timeType?: string
}

export function listLoopCompare(query: LoopCompareQuery): Promise<PvTableResponse<CompareRecord>> {
  return request({
    url: '/statisticsAnalysis/queryLoopCompareList',
    method: 'get',
    params: query
  })
}
