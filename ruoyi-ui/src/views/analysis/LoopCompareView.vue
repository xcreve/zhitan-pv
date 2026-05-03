<script setup lang="ts">
import AnalysisPage from '@/components/AnalysisPage.vue'
import { compareColumns, dateField, timeTypeField } from '@/config/pageConfigs'
</script>

<template>
  <AnalysisPage
    title="环比分析"
    subtitle="同一对象与上一周期对比。"
    endpoint="/statisticsAnalysis/queryLoopCompareList"
    mode="compare"
    :columns="compareColumns"
    :search-fields="[timeTypeField, dateField, { prop: 'powerStationId', label: '电站ID' }]"
  />
</template>
