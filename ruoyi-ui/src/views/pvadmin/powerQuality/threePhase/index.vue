<script setup lang="ts">
import AnalysisPage from '@/components/pvadmin/AnalysisPage.vue'
import { qualitySearchFields } from '@/config/pvadmin/pageConfigs'
import { today } from '@/utils/pvadmin/format'
import { listThreePhaseUnbalanceAnalysis } from '@/api/pvadmin/powerQuality/threePhase'
import type { PvSearchField, PvTableColumn } from '@/api/pvadmin/types/common'

const searchFields: PvSearchField[] = [
  ...qualitySearchFields,
  {
    prop: 'requestType',
    label: '请求类型',
    type: 'select',
    options: [
      { label: '电压', value: '0' },
      { label: '电流', value: '1' }
    ]
  }
]

const columns: PvTableColumn[] = [
  { prop: 'time', label: '时间', minWidth: 130 },
  { prop: 'value', label: '不平衡率', minWidth: 130 },
  { prop: 'aValue', label: 'A相', minWidth: 100 },
  { prop: 'bValue', label: 'B相', minWidth: 100 },
  { prop: 'cValue', label: 'C相', minWidth: 100 }
]
</script>

<template>
  <AnalysisPage
    title="三相不平衡分析"
    subtitle="按电压或电流类型查询三相不平衡趋势。"
    mode="quality"
    :list-api="listThreePhaseUnbalanceAnalysis"
    :default-params="{ powerStationId: '-1', deviceId: '-1', timeType: 'DAY', timeCode: today(), requestType: '0' }"
    :search-fields="searchFields"
    :columns="columns"
  />
</template>
