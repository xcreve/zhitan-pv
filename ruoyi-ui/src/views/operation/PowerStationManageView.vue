<script setup lang="ts">
import DataTablePage from '@/components/DataTablePage.vue'
import { stationColumns, stationSearchFields } from '@/config/pageConfigs'
</script>

<template>
  <DataTablePage
    title="电站管理"
    subtitle="电站基础信息维护列表，写操作入口按只读禁用展示。"
    endpoint="/powerStation/list"
    detail-endpoint="/powerStation"
    :columns="stationColumns"
    :search-fields="stationSearchFields"
    readonly-reason="当前管理端不擅自变更后端 API；新增、编辑、删除按钮保持禁用。"
  />
</template>
