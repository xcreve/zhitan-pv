<script setup lang="ts">
import DataTablePage from '@/components/DataTablePage.vue'
</script>

<template>
  <DataTablePage
    title="实时数据"
    subtitle="按电站和电表标识查询实时点位数据。"
    endpoint="/realTime/listRealTime"
    :columns="[
      { prop: 'deviceName', label: '设备名称', minWidth: 160 },
      { prop: 'offline', label: '离线状态', type: 'tag', minWidth: 110, formatter: row => (row.offline ? '离线' : '在线') },
      { prop: 'indexArray', label: '点位数量', minWidth: 110, formatter: row => String(Array.isArray(row.indexArray) ? row.indexArray.length : 0) }
    ]"
    :search-fields="[
      { prop: 'powerStationId', label: '电站ID', placeholder: '默认 -1 查询全部' },
      { prop: 'ammeter', label: '电表', type: 'select', options: [{ label: '全部', value: '' }, { label: '是', value: true }, { label: '否', value: false }] }
    ]"
    :default-params="{ powerStationId: '-1' }"
    readonly-reason="实时点位接口为查询接口，点位编辑请在设备管理中处理。"
  />
</template>
