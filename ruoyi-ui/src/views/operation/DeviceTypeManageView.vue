<script setup lang="ts">
import DataTablePage from '@/components/DataTablePage.vue'
import { deviceTypeColumns } from '@/config/pageConfigs'
</script>

<template>
  <DataTablePage
    title="设备类型管理"
    subtitle="设备类型与点位模板配置列表。"
    endpoint="/deviceType/list"
    detail-endpoint="/deviceType/index"
    :columns="deviceTypeColumns"
    :search-fields="[{ prop: 'name', label: '类型名称' }]"
    readonly-reason="设备类型创建与点位模板编辑保留后续表单实现，本轮只读。"
  />
</template>
