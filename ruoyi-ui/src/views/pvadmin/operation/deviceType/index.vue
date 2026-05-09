<script setup lang="ts">
import DataTablePage from '@/components/pvadmin/DataTablePage.vue'
import { deviceTypeColumns } from '@/config/pvadmin/pageConfigs'
import { getDeviceType, listDeviceType } from '@/api/pvadmin/deviceType'
</script>

<template>
  <DataTablePage
    title="设备类型管理"
    subtitle="设备类型与点位模板配置列表。"
    :list-api="listDeviceType"
    :detail-api="getDeviceType"
    :columns="deviceTypeColumns"
    :search-fields="[{ prop: 'name', label: '类型名称' }]"
    permission="pvadmin:deviceType:list"
    readonly-reason="设备类型创建与点位模板编辑保留后续表单实现，本轮只读。"
  />
</template>
