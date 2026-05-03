<script setup lang="ts">
import AnalysisPage from '@/components/AnalysisPage.vue'
import { qualitySearchFields } from '@/config/pageConfigs'
import { today } from '@/utils/format'
</script>

<template>
  <AnalysisPage
    title="功率因数分析"
    subtitle="按电表和时间维度查询功率因数走势。"
    endpoint="/realTime/getPowerFactorAnalysis"
    mode="quality"
    :default-params="{ powerStationId: '-1', deviceId: '-1', timeType: 'DAY', timeCode: today() }"
    :search-fields="qualitySearchFields"
    :columns="[
      { prop: 'time', label: '时间', minWidth: 130 },
      { prop: 'value', label: '功率因数', minWidth: 120 },
      { prop: 'maxValue', label: '最大值', minWidth: 120 },
      { prop: 'minValue', label: '最小值', minWidth: 120 }
    ]"
  />
</template>
