<script setup lang="ts">
import DataTablePage from '@/components/pvadmin/DataTablePage.vue'
import { stationColumns, stationSearchFields } from '@/config/pvadmin/pageConfigs'
import { getStationRealtime, listStationRealtime } from '@/api/pvadmin/realtime/station'
</script>

<template>
  <DataTablePage
    title="电站实时状态"
    subtitle="先展示电站列表，详情入口可查看电站基础状态；趋势数据由统计页按电站查询。"
    :list-api="listStationRealtime"
    :detail-api="getStationRealtime"
    :columns="stationColumns"
    :search-fields="stationSearchFields"
    permission="pvadmin:realtime:station"
    readonly-reason="电站实时详情相关接口需要选择具体 id，本页保留只读详情入口。"
  />
</template>
