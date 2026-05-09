<script setup lang="ts">
import AnalysisPage from '@/components/pvadmin/AnalysisPage.vue'
import { compareColumns, dateField, timeTypeField } from '@/config/pvadmin/pageConfigs'
import { listLoopCompare } from '@/api/pvadmin/analysis/loopCompare'
</script>

<template>
  <AnalysisPage
    title="环比分析"
    subtitle="同一对象与上一周期对比。"
    mode="compare"
    :list-api="listLoopCompare"
    :columns="compareColumns"
    :search-fields="[timeTypeField, dateField, { prop: 'powerStationId', label: '电站ID' }]"
  />
</template>
