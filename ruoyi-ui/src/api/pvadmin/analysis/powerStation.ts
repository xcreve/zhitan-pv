import request from '@/utils/request'
import type { PvQueryParams, PvRecord, PvTableResponse } from '@/api/pvadmin/types/common'

export interface PowerStationGenerationQuery extends PvQueryParams {
  powerStationId?: string
  dataTime?: string
  timeTypeEnum?: string
}

export interface GenerationStatisticsRecord extends PvRecord {
  powerStationName?: string
  deviceName?: string
  sumValue?: number
  timeList?: PvRecord[]
}

export function listPowerStationGenerationStatistics(query: PowerStationGenerationQuery): Promise<PvTableResponse<GenerationStatisticsRecord>> {
  return request({
    url: '/powerStation/listGenerationStatistics',
    method: 'get',
    params: query
  })
}
