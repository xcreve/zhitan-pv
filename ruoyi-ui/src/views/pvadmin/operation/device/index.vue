<script setup lang="ts">
import DataTablePage from '@/components/pvadmin/DataTablePage.vue'
import { deviceColumns, deviceSearchFields } from '@/config/pvadmin/pageConfigs'
import { getDevice, listDevice } from '@/api/pvadmin/device'
</script>

<template>
  <DataTablePage
    title="设备管理"
    subtitle="逆变器、电表和反送表统一设备列表。"
    :list-api="listDevice"
    :detail-api="getDevice"
    :columns="deviceColumns"
    :search-fields="deviceSearchFields"
    permission="pvadmin:device:list"
    readonly-reason="设备写接口存在但表单契约复杂，本轮只启用只读详情入口。"
  />
</template>
