<script setup lang="ts">
import AnalysisPage from '@/components/AnalysisPage.vue'
import { monthField, peakColumns } from '@/config/pageConfigs'
</script>

<template>
  <AnalysisPage
    title="图表统计"
    subtitle="展示尖、峰、平、谷、深谷时段耗电量和费用占比。"
    endpoint="/peakValley/segment"
    mode="peak"
    :columns="peakColumns"
    :search-fields="[monthField, { prop: 'powerStationId', label: '电站ID' }, { prop: 'deviceId', label: '设备ID' }]"
  />
</template>
