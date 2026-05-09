<script setup lang="ts">
import DataTablePage from '@/components/pvadmin/DataTablePage.vue'
import { alarmColumns, alarmSearchFields } from '@/config/pvadmin/pageConfigs'
import { getAlarm, listAlarm } from '@/api/pvadmin/alarm'
</script>

<template>
  <DataTablePage
    title="智能报警"
    subtitle="报警列表、状态、级别和详情查询；处理入口保持禁用。"
    :list-api="listAlarm"
    :detail-api="getAlarm"
    :columns="alarmColumns"
    :search-fields="alarmSearchFields"
    permission="pvadmin:alarm:list"
    readonly-reason="报警处理需要提交处理意见，本轮只提供只读详情和状态识别。"
  />
</template>
