<script setup lang="ts">
import AnalysisPage from '@/components/AnalysisPage.vue'
import { compareColumns, dateField, timeTypeField } from '@/config/pageConfigs'
</script>

<template>
  <AnalysisPage
    title="同比分析"
    subtitle="同一时间周期与去年同期对比。"
    endpoint="/statisticsAnalysis/querySameCompareList"
    mode="compare"
    :columns="compareColumns"
    :search-fields="[timeTypeField, dateField, { prop: 'powerStationId', label: '电站ID' }]"
  />
</template>
