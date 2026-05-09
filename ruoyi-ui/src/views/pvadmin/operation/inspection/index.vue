<script setup lang="ts">
import DataTablePage from '@/components/pvadmin/DataTablePage.vue'
import { inspectionColumns } from '@/config/pvadmin/pageConfigs'
import { getInspection, listInspection } from '@/api/pvadmin/inspection'
</script>

<template>
  <DataTablePage
    title="设备点检"
    subtitle="点检、维修与停机记录查询。"
    :list-api="listInspection"
    :detail-api="getInspection"
    :columns="inspectionColumns"
    :search-fields="[
      { prop: 'powerStationName', label: '电站名称' },
      { prop: 'deviceName', label: '设备名称' },
      { prop: 'inspectionType', label: '类型', type: 'select', options: [{ label: '设备点检', value: '0' }, { label: '设备维修', value: '1' }, { label: '甲方停机', value: '2' }] }
    ]"
    permission="pvadmin:inspection:list"
    readonly-reason="点检新增/编辑涉及附件和备件联动，本轮只读呈现。"
  />
</template>
