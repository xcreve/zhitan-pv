<script setup lang="ts">
import AnalysisPage from '@/components/AnalysisPage.vue'
import { dataTimeField, generationColumns, timeTypeEnumField } from '@/config/pageConfigs'
</script>

<template>
  <AnalysisPage
    title="电站发电统计"
    subtitle="按日、月、年查询电站发电统计。"
    endpoint="/powerStation/listGenerationStatistics"
    mode="generation"
    :columns="generationColumns"
    :search-fields="[timeTypeEnumField, dataTimeField, { prop: 'powerStationId', label: '电站ID' }]"
  />
</template>
