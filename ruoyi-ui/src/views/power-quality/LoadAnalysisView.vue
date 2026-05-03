<script setup lang="ts">
import AnalysisPage from '@/components/AnalysisPage.vue'
import { qualitySearchFields } from '@/config/pageConfigs'
import { today } from '@/utils/format'
</script>

<template>
  <AnalysisPage
    title="负荷分析"
    subtitle="按电表和时间维度查询负荷曲线。"
    endpoint="/realTime/listLoadAnalysis"
    mode="quality"
    :default-params="{ powerStationId: '-1', deviceId: '-1', timeType: 'DAY', timeCode: today() }"
    :search-fields="qualitySearchFields"
    :columns="[
      { prop: 'time', label: '时间', minWidth: 130 },
      { prop: 'value', label: '负荷值', minWidth: 120 },
      { prop: 'maxValue', label: '最大值', minWidth: 120 },
      { prop: 'minValue', label: '最小值', minWidth: 120 }
    ]"
  />
</template>
