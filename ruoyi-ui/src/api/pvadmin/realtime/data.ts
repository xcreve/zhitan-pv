import request from '@/utils/request'
import type { PvQueryParams, PvTableResponse } from '@/api/pvadmin/types/common'

export interface RealTimeDataQuery extends PvQueryParams {
  powerStationId?: string
  ammeter?: boolean
}

export interface RealTimeDataRecord {
  id?: string | number
  deviceName?: string
  offline?: boolean
  indexArray?: unknown[]
  [key: string]: unknown
}

export function listRealTimeData(query: RealTimeDataQuery): Promise<PvTableResponse<RealTimeDataRecord>> {
  return request({
    url: '/realTime/listRealTime',
    method: 'get',
    params: query
  })
}
