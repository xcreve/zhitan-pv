<script setup lang="ts">
import DataTablePage from '@/components/pvadmin/DataTablePage.vue'
import { electricitySettingColumns } from '@/config/pvadmin/pageConfigs'
import { getElectricityTypeSetting, listElectricityTypeSetting } from '@/api/pvadmin/electricityTypeSetting'
</script>

<template>
  <DataTablePage
    title="峰平谷配置"
    subtitle="峰平谷主项和子项配置入口。"
    :list-api="listElectricityTypeSetting"
    :detail-api="getElectricityTypeSetting"
    :columns="electricitySettingColumns"
    :search-fields="[{ prop: 'remark', label: '备注' }]"
    permission="pvadmin:electricityTypeSetting:list"
    readonly-reason="配置写入接口存在但需业务校验，本轮按只读禁用编辑。"
  />
</template>
