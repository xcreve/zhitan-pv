import request from '@/utils/request'
import type { PvTableResponse } from '@/api/pvadmin/types/common'
import type { PowerQualityQuery, PowerQualityRecord } from '@/api/pvadmin/powerQuality/load'

export interface ThreePhaseQuery extends PowerQualityQuery {
  requestType?: string
}

export interface ThreePhaseRecord extends PowerQualityRecord {
  aValue?: number
  bValue?: number
  cValue?: number
}

export function listThreePhaseUnbalanceAnalysis(query: ThreePhaseQuery): Promise<PvTableResponse<ThreePhaseRecord>> {
  return request({
    url: '/realTime/listThreePhaseUnbalanceAnalysis',
    method: 'get',
    params: query
  })
}
