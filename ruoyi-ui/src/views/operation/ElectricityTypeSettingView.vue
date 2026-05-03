<script setup lang="ts">
import DataTablePage from '@/components/DataTablePage.vue'
import { electricitySettingColumns } from '@/config/pageConfigs'
</script>

<template>
  <DataTablePage
    title="峰平谷配置"
    subtitle="峰平谷主项和子项配置入口。"
    endpoint="/electricityTypeSetting/list"
    detail-endpoint="/electricityTypeSetting"
    :columns="electricitySettingColumns"
    :search-fields="[{ prop: 'remark', label: '备注' }]"
    readonly-reason="配置写入接口存在但需业务校验，本轮按只读禁用编辑。"
  />
</template>
