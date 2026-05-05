<script setup lang="ts">
import type { EChartsOption } from 'echarts'
import { computed, onMounted, ref } from 'vue'
import ChartPanel from '@/components/pvadmin/ChartPanel.vue'
import MetricCard from '@/components/pvadmin/MetricCard.vue'
import PageHeader from '@/components/pvadmin/PageHeader.vue'
import {
  getHomePowerStationInfo,
  getHomepageGenerationStats,
  getPeriodGenerationPercentage,
  listDashboardDevices,
  listHomeAlarm,
  listPowerStationRank
} from '@/api/pvadmin/dashboard'
import { displayValue, numberValue, today, toArray } from '@/utils/pvadmin/format'
import { normalizePage, unwrapData } from '@/utils/pvadmin/ruoyi'
import type { PvRecord } from '@/api/pvadmin/types/common'

const loading = ref(false)
const homeInfo = ref<PvRecord>({})
const stationRank = ref<PvRecord[]>([])
const alarms = ref<PvRecord[]>([])
const deviceRows = ref<PvRecord[]>([])
const generationStats = ref<PvRecord[]>([])
const periodStats = ref<PvRecord[]>([])

const stationCount = computed(() => stationRank.value.length || '--')
const alarmCount = computed(() => alarms.value.length || '--')
const inverterCount = computed(() => deviceRows.value.filter(row => String(row.deviceTypeId) === '1' || String(row.deviceType).includes('逆变器')).length)
const ammeterCount = computed(() => deviceRows.value.filter(row => row.ammeter === true || String(row.deviceTypeId) === '2').length)

const generationOption = computed<EChartsOption>(() => {
  const labels = generationStats.value.map(item => String(item.time || item.dataTime || '--'))
  return {
    color: ['#2c7be5', '#00d27a'],
    tooltip: { trigger: 'axis' },
    grid: { top: 28, left: 42, right: 18, bottom: 36 },
    xAxis: { type: 'category', data: labels },
    yAxis: { type: 'value', name: 'kWh' },
    series: [
      {
        name: '发电量',
        type: 'line',
        smooth: true,
        areaStyle: { opacity: 0.18 },
        data: generationStats.value.map(item => numberValue(item.value))
      }
    ]
  }
})

const periodOption = computed<EChartsOption>(() => ({
  color: ['#2c7be5', '#00d27a', '#27bcfd', '#f5803e', '#e63757'],
  tooltip: { trigger: 'item' },
  legend: { bottom: 0 },
  series: [
    {
      name: '时段占比',
      type: 'pie',
      radius: ['44%', '68%'],
      center: ['50%', '44%'],
      data: periodStats.value.map(item => ({
        name: String(item.timeNameCN || item.name || item.timeType || '--'),
        value: numberValue(item.value || item.percentage || item.powerConsumption)
      }))
    }
  ]
}))

function metricValue(key: string): string | number | null | undefined {
  const value = homeInfo.value[key]
  if (typeof value === 'string' || typeof value === 'number' || value === null || value === undefined) return value
  return String(value)
}

async function loadDashboard() {
  loading.value = true
  const baseParams = { timeType: 'DAY', queryTime: today() }
  const [home, rank, alarm, generation, period, devices] = await Promise.allSettled([
    getHomePowerStationInfo(),
    listPowerStationRank(),
    listHomeAlarm(),
    getHomepageGenerationStats(baseParams),
    getPeriodGenerationPercentage(baseParams),
    listDashboardDevices({ pageNum: 1, pageSize: 200 })
  ])

  if (home.status === 'fulfilled') homeInfo.value = unwrapData<PvRecord>(home.value) || {}
  if (rank.status === 'fulfilled') stationRank.value = toArray<PvRecord>(unwrapData(rank.value))
  if (alarm.status === 'fulfilled') alarms.value = toArray<PvRecord>(unwrapData(alarm.value))
  if (generation.status === 'fulfilled') generationStats.value = toArray<PvRecord>(unwrapData(generation.value))
  if (period.status === 'fulfilled') periodStats.value = toArray<PvRecord>(unwrapData(period.value))
  if (devices.status === 'fulfilled') deviceRows.value = normalizePage<PvRecord>(devices.value).rows

  loading.value = false
}

onMounted(loadDashboard)
</script>

<template>
  <div v-loading="loading" class="pv-dashboard">
    <PageHeader title="首页总览" subtitle="汇总电站、发电、收益、减排、告警和设备状态，数据来自 RuoYi 后端接口。">
      <el-button type="primary" @click="loadDashboard">刷新看板</el-button>
    </PageHeader>

    <section class="metric-grid">
      <MetricCard title="电站数量" :value="stationCount" icon="OfficeBuilding" tone="primary" />
      <MetricCard title="装机容量" :value="metricValue('installedCapacity')" unit=" kW" icon="SetUp" tone="info" />
      <MetricCard title="当前功率" :value="metricValue('currentPower')" unit=" kW" icon="Lightning" tone="warning" footnote="后端首页接口未提供时保持空值" />
      <MetricCard title="今日发电量" :value="metricValue('cumulativeDay')" unit=" kWh" icon="Sunny" tone="success" />
      <MetricCard title="月发电量" :value="metricValue('cumulativeMonth')" unit=" kWh" icon="TrendCharts" tone="primary" footnote="后端未提供时保持空值" />
      <MetricCard title="年发电量" :value="metricValue('cumulativeYear')" unit=" kWh" icon="Calendar" tone="info" />
      <MetricCard title="累计收益" :value="metricValue('earnings')" unit=" 元" icon="Money" tone="success" />
      <MetricCard title="告警数量" :value="alarmCount" icon="Bell" tone="danger" />
    </section>

    <section class="chart-grid">
      <div class="trend-panel">
        <ChartPanel title="发电趋势" subtitle="DAY 维度首页发电量统计" :option="generationOption" />
      </div>
      <div>
        <ChartPanel title="尖峰平谷占比" subtitle="首页时段发电占比" :option="periodOption" />
      </div>
    </section>

    <section class="bottom-grid">
      <el-card class="rank-card" shadow="never">
        <template #header>
          <div class="card-head">
            <strong>电站分布 / 排名</strong>
            <span>来自 /powerStation/listPowerStationRank</span>
          </div>
        </template>
        <el-table :data="stationRank" empty-text="暂无电站数据" stripe>
          <el-table-column type="index" width="56" label="#" />
          <el-table-column prop="powerStationName" label="电站" min-width="150">
            <template #default="{ row }">{{ row.powerStationName || row.name || '--' }}</template>
          </el-table-column>
          <el-table-column prop="sumValue" label="发电量" min-width="120">
            <template #default="{ row }">{{ displayValue(row.sumValue || row.value, ' kWh') }}</template>
          </el-table-column>
          <el-table-column prop="installedCapacity" label="装机容量" min-width="120">
            <template #default="{ row }">{{ displayValue(row.installedCapacity, ' kW') }}</template>
          </el-table-column>
        </el-table>
      </el-card>

      <el-card class="overview-card" shadow="never">
        <template #header>
          <div class="card-head">
            <strong>设备状态概览</strong>
            <span>来自 /device/list</span>
          </div>
        </template>
        <div class="device-overview">
          <div>
            <span>设备总数</span>
            <strong>{{ deviceRows.length || '--' }}</strong>
          </div>
          <div>
            <span>逆变器</span>
            <strong>{{ inverterCount || '--' }}</strong>
          </div>
          <div>
            <span>电表</span>
            <strong>{{ ammeterCount || '--' }}</strong>
          </div>
          <div>
            <span>CO2 减排</span>
            <strong>{{ displayValue(homeInfo.carbonEmissions, ' t') }}</strong>
          </div>
        </div>
      </el-card>
    </section>
  </div>
</template>

<style scoped>
.pv-dashboard {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.metric-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}

.chart-grid {
  display: grid;
  grid-template-columns: minmax(0, 5fr) minmax(280px, 3fr);
  gap: 12px;
}

.bottom-grid {
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(280px, 1fr);
  gap: 12px;
}

.rank-card,
.overview-card {
  border: 0;
  border-radius: 6px;
  box-shadow: 0 7px 14px 0 rgba(18, 38, 63, 0.06);
}

.card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.card-head span {
  color: #6e84a3;
  font-size: 12px;
}

.device-overview {
  display: grid;
  gap: 12px;
}

.device-overview div {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 13px 0;
  border-bottom: 1px solid #d8e2ef;
}

.device-overview div:last-child {
  border-bottom: 0;
}

.device-overview span {
  color: #6e84a3;
  font-size: 13px;
}

.device-overview strong {
  color: #12263f;
  font-size: 18px;
}

@media (max-width: 900px) {
  .metric-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .chart-grid,
  .bottom-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}

@media (max-width: 560px) {
  .metric-grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .card-head {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
