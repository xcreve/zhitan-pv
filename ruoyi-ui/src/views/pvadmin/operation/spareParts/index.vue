<script setup lang="ts">
import DataTablePage from '@/components/pvadmin/DataTablePage.vue'
import { sparePartsColumns } from '@/config/pvadmin/pageConfigs'
import { getSpareParts, listSpareParts } from '@/api/pvadmin/spareParts'
</script>

<template>
  <DataTablePage
    title="备品备件"
    subtitle="备件库存、地点与出入库信息。"
    :list-api="listSpareParts"
    :detail-api="getSpareParts"
    :columns="sparePartsColumns"
    :search-fields="[
      { prop: 'code', label: '编号' },
      { prop: 'name', label: '名称' },
      { prop: 'location', label: '库存地点' }
    ]"
    permission="pvadmin:spareParts:list"
    readonly-reason="备件出入库动作需后端写接口校验，本轮只启用查询和详情。"
  />
</template>
