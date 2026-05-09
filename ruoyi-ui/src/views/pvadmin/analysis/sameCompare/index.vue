<script setup lang="ts">
import AnalysisPage from '@/components/pvadmin/AnalysisPage.vue'
import { compareColumns, dateField, timeTypeField } from '@/config/pvadmin/pageConfigs'
import { listSameCompare } from '@/api/pvadmin/analysis/sameCompare'
</script>

<template>
  <AnalysisPage
    title="同比分析"
    subtitle="同一时间周期与去年同期对比。"
    mode="compare"
    :list-api="listSameCompare"
    :columns="compareColumns"
    :search-fields="[timeTypeField, dateField, { prop: 'powerStationId', label: '电站ID' }]"
  />
</template>
