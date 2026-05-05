import request from '@/utils/request'
import type { PvQueryParams, PvRecord, PvTableResponse } from '@/api/pvadmin/types/common'

export interface PeakValleyQuery extends PvQueryParams {
  powerStationId?: string
  deviceId?: string
  dateTime?: string
}

export interface PeakValleySegmentRecord extends PvRecord {
  totalPowerConsumption?: number
  totalPowerCost?: number
  tipPowerConsumption?: number
  peakPowerConsumption?: number
  flatPowerConsumption?: number
  troughPowerConsumption?: number
  deepPowerConsumption?: number
}

export function listPeakValleyChart(query: PeakValleyQuery): Promise<PvTableResponse<PeakValleySegmentRecord>> {
  return request({
    url: '/peakValley/segment',
    method: 'get',
    params: query
  })
}
