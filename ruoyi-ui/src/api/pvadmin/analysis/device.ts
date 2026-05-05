import request from '@/utils/request'
import type { PvQueryParams, PvRecord, PvTableResponse } from '@/api/pvadmin/types/common'

export interface DeviceGenerationQuery extends PvQueryParams {
  powerStationId?: string
  deviceId?: string
  dataTime?: string
  timeTypeEnum?: string
}

export interface DeviceGenerationRecord extends PvRecord {
  powerStationName?: string
  deviceName?: string
  sumValue?: number
  timeList?: PvRecord[]
}

export function listDeviceGenerationStatistics(query: DeviceGenerationQuery): Promise<PvTableResponse<DeviceGenerationRecord>> {
  return request({
    url: '/device/getInverterGenerationStats',
    method: 'get',
    params: query
  })
}
