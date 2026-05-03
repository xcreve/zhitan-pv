<script setup lang="ts">
import DataTablePage from '@/components/DataTablePage.vue'
import { deviceColumns, deviceSearchFields } from '@/config/pageConfigs'
</script>

<template>
  <DataTablePage
    title="设备实时状态"
    subtitle="设备基础状态列表，结合实时数据页查看点位值。"
    endpoint="/device/list"
    detail-endpoint="/device"
    :columns="deviceColumns"
    :search-fields="deviceSearchFields"
    readonly-reason="设备实时状态扩展接口需要指定设备 id，本页只读展示设备入口。"
  />
</template>
