<script setup lang="ts">
import AnalysisPage from '@/components/pvadmin/AnalysisPage.vue'
import { qualitySearchFields } from '@/config/pvadmin/pageConfigs'
import { today } from '@/utils/pvadmin/format'
import { listLoadAnalysis } from '@/api/pvadmin/powerQuality/load'
import type { PvTableColumn } from '@/api/pvadmin/types/common'

const columns: PvTableColumn[] = [
  { prop: 'time', label: '时间', minWidth: 130 },
  { prop: 'value', label: '负荷值', minWidth: 120 },
  { prop: 'maxValue', label: '最大值', minWidth: 120 },
  { prop: 'minValue', label: '最小值', minWidth: 120 }
]
</script>

<template>
  <AnalysisPage
    title="负荷分析"
    subtitle="按电表和时间维度查询负荷曲线。"
    mode="quality"
    :list-api="listLoadAnalysis"
    :default-params="{ powerStationId: '-1', deviceId: '-1', timeType: 'DAY', timeCode: today() }"
    :search-fields="qualitySearchFields"
    :columns="columns"
  />
</template>
