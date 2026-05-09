<script setup lang="ts">
import DataTablePage from '@/components/pvadmin/DataTablePage.vue'
import { stationColumns, stationSearchFields } from '@/config/pvadmin/pageConfigs'
import { getPowerStation, listPowerStation } from '@/api/pvadmin/powerStation'
</script>

<template>
  <DataTablePage
    title="电站管理"
    subtitle="电站基础信息维护列表，写操作入口按只读禁用展示。"
    :list-api="listPowerStation"
    :detail-api="getPowerStation"
    :columns="stationColumns"
    :search-fields="stationSearchFields"
    permission="pvadmin:powerStation:list"
    readonly-reason="当前管理端不擅自变更后端 API；新增、编辑、删除按钮保持禁用。"
  />
</template>
