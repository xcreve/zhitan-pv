<script setup lang="ts">
import AnalysisPage from '@/components/AnalysisPage.vue'
import { monthField } from '@/config/pageConfigs'
</script>

<template>
  <AnalysisPage
    title="报表统计"
    subtitle="按月份查询尖峰平谷报表数据。"
    endpoint="/peakValley/report"
    mode="generation"
    :columns="[
      { prop: 'timeNameCN', label: '用电类型', minWidth: 120 },
      { prop: 'timePeriod', label: '时段', minWidth: 140 },
      { prop: 'sumValue', label: '合计', minWidth: 120 },
      { prop: 'timeList', label: '明细数', minWidth: 100, formatter: row => String(Array.isArray(row.timeList) ? row.timeList.length : 0) }
    ]"
    :search-fields="[monthField, { prop: 'powerStationId', label: '电站ID' }, { prop: 'deviceId', label: '设备ID' }]"
  />
</template>
