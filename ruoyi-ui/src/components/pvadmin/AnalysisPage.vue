<script setup lang="ts">
import type { EChartsOption } from 'echarts'
import { ElMessage } from 'element-plus'
import { computed, onMounted, reactive, ref } from 'vue'
import { Refresh, Search } from '@element-plus/icons-vue'
import ChartPanel from '@/components/pvadmin/ChartPanel.vue'
import PageHeader from '@/components/pvadmin/PageHeader.vue'
import { currentMonth, numberValue, today, toArray, valueOf } from '@/utils/pvadmin/format'
import { normalizePage, unwrapData } from '@/utils/pvadmin/ruoyi'
import type { PvListApi, PvQueryParams, PvRecord, PvSearchField, PvTableColumn } from '@/api/pvadmin/types/common'

type PvFormValue = string | number | null | undefined

const props = defineProps<{
  title: string
  subtitle?: string
  mode: 'generation' | 'compare' | 'peak' | 'quality'
  listApi: PvListApi
  columns?: PvTableColumn[]
  searchFields?: PvSearchField[]
  defaultParams?: Record<string, PvFormValue>
}>()

const loading = ref(false)
const rows = ref<PvRecord[]>([])
const form = reactive<Record<string, PvFormValue>>({
  timeType: 'DAY',
  timeTypeEnum: 'DAY',
  queryTime: today(),
  dataTime: today(),
  dateTime: currentMonth(),
  ...(props.defaultParams || {})
})

const chartOption = computed<EChartsOption>(() => {
  if (props.mode === 'compare') return compareOption(rows.value)
  if (props.mode === 'peak') return peakOption(rows.value)
  if (props.mode === 'quality') return lineOption(rows.value, props.title)
  return generationOption(rows.value)
})

async function fetchData() {
  loading.value = true
  try {
    const response = await props.listApi(cleanParams(form))
    const page = normalizePage<PvRecord>(response)
    const data = unwrapData(response)
    rows.value = resolveRows(page.rows, data)
  } catch (error) {
    rows.value = []
    ElMessage.error(error instanceof Error ? error.message : '接口请求失败')
  } finally {
    loading.value = false
  }
}

function reset() {
  Object.keys(form).forEach(key => {
    form[key] = undefined
  })
  form.timeType = 'DAY'
  form.timeTypeEnum = 'DAY'
  form.queryTime = today()
  form.dataTime = today()
  form.dateTime = currentMonth()
  Object.assign(form, props.defaultParams || {})
  fetchData()
}

function cleanParams(params: Record<string, PvFormValue>): PvQueryParams {
  const result: PvQueryParams = {}
  Object.entries(params).forEach(([key, value]) => {
    if (value !== '' && value !== undefined && value !== null) result[key] = value
  })
  return result
}

function resolveRows(pageRows: PvRecord[], data: unknown): PvRecord[] {
  if (pageRows.length) return pageRows
  const list = toArray<PvRecord>(data)
  if (list.length) return list
  if (props.mode === 'peak' && data && typeof data === 'object') return [data as PvRecord]
  return []
}

function generationOption(data: PvRecord[]): EChartsOption {
  const labels = extractLabels(data)
  return {
    tooltip: { trigger: 'axis' },
    legend: { type: 'scroll', bottom: 0 },
    grid: { top: 28, left: 42, right: 20, bottom: 54 },
    xAxis: { type: 'category', data: labels },
    yAxis: { type: 'value', name: 'kWh' },
    series: data.map(item => ({
      name: String(item.powerStationName || item.deviceName || item.name || '对象'),
      type: 'bar',
      stack: 'generation',
      data: labels.map(label => findTimeValue(item, label))
    }))
  }
}

function compareOption(data: PvRecord[]): EChartsOption {
  const names = data.map(row => String(row.powerStationName || row.deviceName || '--'))
  return {
    tooltip: { trigger: 'axis' },
    legend: { bottom: 0 },
    grid: { top: 28, left: 46, right: 20, bottom: 54 },
    xAxis: { type: 'category', data: names },
    yAxis: { type: 'value', name: '%' },
    series: [
      { name: '本期', type: 'bar', data: data.map(row => numberValue(row.currentValue)), itemStyle: { color: '#2c7be5' } },
      { name: '对比期', type: 'bar', data: data.map(row => numberValue(row.contrastValues)), itemStyle: { color: '#27bcfd' } },
      { name: '增长率', type: 'line', data: data.map(row => numberValue(row.ratio)), itemStyle: { color: '#f5803e' } }
    ]
  }
}

function peakOption(data: PvRecord[]): EChartsOption {
  const row = data[0] || {}
  const labels = ['尖', '峰', '平', '谷', '深谷']
  return {
    tooltip: { trigger: 'item' },
    legend: { bottom: 0 },
    series: [
      {
        name: '耗电量占比',
        type: 'pie',
        radius: ['42%', '68%'],
        center: ['50%', '45%'],
        data: [
          { name: labels[0], value: numberValue(row.tipPowerConsumption) },
          { name: labels[1], value: numberValue(row.peakPowerConsumption) },
          { name: labels[2], value: numberValue(row.flatPowerConsumption) },
          { name: labels[3], value: numberValue(row.troughPowerConsumption) },
          { name: labels[4], value: numberValue(row.deepPowerConsumption) }
        ]
      }
    ]
  }
}

function lineOption(data: PvRecord[], name: string): EChartsOption {
  const labels = extractLabels(data)
  const first = data[0] || {}
  return {
    tooltip: { trigger: 'axis' },
    grid: { top: 28, left: 46, right: 20, bottom: 38 },
    xAxis: { type: 'category', data: labels },
    yAxis: { type: 'value' },
    series: [{ name, type: 'line', smooth: true, areaStyle: {}, data: labels.map(label => findTimeValue(first, label)) }]
  }
}

function extractLabels(data: PvRecord[]): string[] {
  const firstWithTimeList = data.find(row => Array.isArray(row.timeList))
  const timeList = (firstWithTimeList?.timeList as PvRecord[] | undefined) || []
  if (timeList.length) return timeList.map(item => String(item.time || item.timeCode || item.name || '--'))
  return data.map((row, index) => String(row.time || row.dataTime || row.currentTime || index + 1))
}

function findTimeValue(row: PvRecord, label: string): number {
  const timeList = (row.timeList as PvRecord[] | undefined) || []
  const matched = timeList.find(item => String(item.time || item.timeCode || item.name) === label)
  if (matched) return numberValue(matched.value || matched.dataValue)
  return numberValue(valueOf(row, 'value') || valueOf(row, 'currentValue'))
}

onMounted(fetchData)
</script>

<template>
  <div class="pvadmin-page">
    <PageHeader :title="title" :subtitle="subtitle">
      <el-button :icon="Refresh" @click="fetchData">刷新</el-button>
    </PageHeader>

    <el-card class="pv-card" shadow="never">
      <el-form :model="form" class="analysis-search" label-width="88px">
        <el-form-item v-for="field in searchFields || []" :key="field.prop" :label="field.label">
          <el-input v-if="!field.type || field.type === 'text'" v-model="form[field.prop]" clearable :placeholder="field.placeholder || `请输入${field.label}`" />
          <el-select v-else-if="field.type === 'select'" v-model="form[field.prop]" clearable :placeholder="field.placeholder || `请选择${field.label}`">
            <el-option v-for="option in field.options || []" :key="String(option.value)" :label="option.label" :value="option.value" />
          </el-select>
          <el-date-picker v-else-if="field.type === 'month'" v-model="form[field.prop]" type="month" value-format="YYYY-MM" :placeholder="field.placeholder || `请选择${field.label}`" />
          <el-date-picker v-else v-model="form[field.prop]" type="date" value-format="YYYY-MM-DD" :placeholder="field.placeholder || `请选择${field.label}`" />
        </el-form-item>
        <el-form-item class="analysis-actions">
          <el-button type="primary" :icon="Search" @click="fetchData">查询</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <ChartPanel v-loading="loading" :title="`${title}趋势`" subtitle="接口失败或无数据时保持空图表状态" :option="chartOption" />

    <el-card class="pv-card" shadow="never">
      <template #header>
        <strong>{{ title }}明细</strong>
      </template>
      <el-table v-loading="loading" :data="rows" stripe empty-text="暂无后端数据">
        <el-table-column type="index" label="#" width="56" />
        <el-table-column v-for="column in columns || []" :key="column.prop" :prop="column.prop" :label="column.label" :min-width="column.minWidth || 120">
          <template #default="{ row }">
            {{ column.formatter ? column.formatter(row) : valueOf(row, column.prop) || '--' }}
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<style scoped>
.pvadmin-page {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.pv-card {
  border: 0;
  border-radius: 6px;
  box-shadow: 0 7px 14px 0 rgba(18, 38, 63, 0.06);
}

.analysis-search {
  display: grid;
  grid-template-columns: repeat(4, minmax(180px, 1fr));
  gap: 2px 12px;
}

.analysis-search :deep(.el-form-item) {
  margin-bottom: 12px;
}

@media (max-width: 900px) {
  .analysis-search {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 560px) {
  .analysis-search {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
