<script setup lang="ts">
import AnalysisPage from '@/components/pvadmin/AnalysisPage.vue'
import { monthField, peakColumns } from '@/config/pvadmin/pageConfigs'
import { listPeakValleyChart } from '@/api/pvadmin/peakValley/chart'
</script>

<template>
  <AnalysisPage
    title="图表统计"
    subtitle="展示尖、峰、平、谷、深谷时段耗电量和费用占比。"
    mode="peak"
    :list-api="listPeakValleyChart"
    :columns="peakColumns"
    :search-fields="[monthField, { prop: 'powerStationId', label: '电站ID' }, { prop: 'deviceId', label: '设备ID' }]"
  />
</template>
