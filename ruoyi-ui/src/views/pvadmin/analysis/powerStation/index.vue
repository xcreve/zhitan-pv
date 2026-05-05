<script setup lang="ts">
import AnalysisPage from '@/components/pvadmin/AnalysisPage.vue'
import { dataTimeField, generationColumns, timeTypeEnumField } from '@/config/pvadmin/pageConfigs'
import { listPowerStationGenerationStatistics } from '@/api/pvadmin/analysis/powerStation'
</script>

<template>
  <AnalysisPage
    title="电站发电统计"
    subtitle="按日、月、年查询电站发电统计。"
    mode="generation"
    :list-api="listPowerStationGenerationStatistics"
    :columns="generationColumns"
    :search-fields="[timeTypeEnumField, dataTimeField, { prop: 'powerStationId', label: '电站ID' }]"
  />
</template>
