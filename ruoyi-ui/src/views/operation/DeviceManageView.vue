<script setup lang="ts">
import DataTablePage from '@/components/DataTablePage.vue'
import { deviceColumns, deviceSearchFields } from '@/config/pageConfigs'
</script>

<template>
  <DataTablePage
    title="设备管理"
    subtitle="逆变器、电表和反送表统一设备列表。"
    endpoint="/device/list"
    detail-endpoint="/device"
    :columns="deviceColumns"
    :search-fields="deviceSearchFields"
    readonly-reason="设备写接口存在但表单契约复杂，本轮只启用只读详情入口。"
  />
</template>
