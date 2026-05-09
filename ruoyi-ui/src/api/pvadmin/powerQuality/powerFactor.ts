import request from '@/utils/request'
import type { PvTableResponse } from '@/api/pvadmin/types/common'
import type { PowerQualityQuery, PowerQualityRecord } from '@/api/pvadmin/powerQuality/load'

export function listPowerFactorAnalysis(query: PowerQualityQuery): Promise<PvTableResponse<PowerQualityRecord>> {
  return request({
    url: '/realTime/getPowerFactorAnalysis',
    method: 'get',
    params: query
  })
}
