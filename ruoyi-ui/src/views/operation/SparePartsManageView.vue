<script setup lang="ts">
import DataTablePage from '@/components/DataTablePage.vue'
import { sparePartsColumns } from '@/config/pageConfigs'
</script>

<template>
  <DataTablePage
    title="备品备件"
    subtitle="备件库存、地点与出入库信息。"
    endpoint="/parts/list"
    detail-endpoint="/parts"
    :columns="sparePartsColumns"
    :search-fields="[
      { prop: 'code', label: '编号' },
      { prop: 'name', label: '名称' },
      { prop: 'location', label: '库存地点' }
    ]"
    readonly-reason="备件出入库动作需后端写接口校验，本轮只启用查询和详情。"
  />
</template>
