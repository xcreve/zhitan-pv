<script setup lang="ts">
import AnalysisPage from '@/components/AnalysisPage.vue'
import { dataTimeField, generationColumns, timeTypeEnumField } from '@/config/pageConfigs'
</script>

<template>
  <AnalysisPage
    title="设备发电统计"
    subtitle="逆变器、电表等设备发电量统计。"
    endpoint="/device/getInverterGenerationStats"
    mode="generation"
    :columns="generationColumns"
    :search-fields="[timeTypeEnumField, dataTimeField, { prop: 'powerStationId', label: '电站ID' }, { prop: 'deviceId', label: '设备ID' }]"
  />
</template>
