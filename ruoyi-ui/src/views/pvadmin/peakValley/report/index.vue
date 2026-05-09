<script setup lang="ts">
import AnalysisPage from '@/components/pvadmin/AnalysisPage.vue'
import { monthField } from '@/config/pvadmin/pageConfigs'
import { listPeakValleyReport } from '@/api/pvadmin/peakValley/report'
import type { PvTableColumn } from '@/api/pvadmin/types/common'

const columns: PvTableColumn[] = [
  { prop: 'timeNameCN', label: '用电类型', minWidth: 120 },
  { prop: 'timePeriod', label: '时段', minWidth: 140 },
  { prop: 'sumValue', label: '合计', minWidth: 120 },
  { prop: 'timeList', label: '明细数', minWidth: 100, formatter: row => String(Array.isArray(row.timeList) ? row.timeList.length : 0) }
]
</script>

<template>
  <AnalysisPage
    title="报表统计"
    subtitle="按月份查询尖峰平谷报表数据。"
    mode="generation"
    :list-api="listPeakValleyReport"
    :columns="columns"
    :search-fields="[monthField, { prop: 'powerStationId', label: '电站ID' }, { prop: 'deviceId', label: '设备ID' }]"
  />
</template>
