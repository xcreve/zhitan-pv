import request from '@/utils/request'
import type { PvRecord, PvTableResponse } from '@/api/pvadmin/types/common'
import type { PeakValleyQuery } from '@/api/pvadmin/peakValley/chart'

export interface PeakValleyReportRecord extends PvRecord {
  timeNameCN?: string
  timePeriod?: string
  sumValue?: number
  timeList?: PvRecord[]
}

export function listPeakValleyReport(query: PeakValleyQuery): Promise<PvTableResponse<PeakValleyReportRecord>> {
  return request({
    url: '/peakValley/report',
    method: 'get',
    params: query
  })
}
