<script setup lang="ts">
import DataTablePage from '@/components/DataTablePage.vue'
import { alarmColumns, alarmSearchFields } from '@/config/pageConfigs'
</script>

<template>
  <DataTablePage
    title="智能报警"
    subtitle="报警列表、状态、级别和详情查询；处理入口保持禁用。"
    endpoint="/alarm/list"
    detail-endpoint="/alarm"
    :columns="alarmColumns"
    :search-fields="alarmSearchFields"
    readonly-reason="报警处理需要提交处理意见，本轮只提供只读详情和状态识别。"
  />
</template>
