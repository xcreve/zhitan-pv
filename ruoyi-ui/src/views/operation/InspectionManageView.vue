<script setup lang="ts">
import DataTablePage from '@/components/DataTablePage.vue'
import { inspectionColumns } from '@/config/pageConfigs'
</script>

<template>
  <DataTablePage
    title="设备点检"
    subtitle="点检、维修与停机记录查询。"
    endpoint="/inspection/list"
    detail-endpoint="/inspection"
    :columns="inspectionColumns"
    :search-fields="[
      { prop: 'powerStationId', label: '电站ID' },
      { prop: 'deviceName', label: '设备名称' },
      { prop: 'inspectionType', label: '类型', type: 'select', options: [{ label: '设备点检', value: '0' }, { label: '设备维修', value: '1' }, { label: '甲方停机', value: '2' }] }
    ]"
    readonly-reason="点检新增/编辑涉及附件和备件联动，本轮只读呈现。"
  />
</template>
