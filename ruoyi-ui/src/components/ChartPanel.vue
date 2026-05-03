<script setup lang="ts">
import * as echarts from 'echarts/core'
import { BarChart, LineChart, PieChart } from 'echarts/charts'
import { GridComponent, LegendComponent, TooltipComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { EChartsOption } from 'echarts'
import type { EChartsType } from 'echarts/core'

echarts.use([BarChart, LineChart, PieChart, GridComponent, LegendComponent, TooltipComponent, CanvasRenderer])

const props = defineProps<{
  title: string
  subtitle?: string
  option: EChartsOption
  height?: number
}>()

const chartEl = ref<HTMLDivElement | null>(null)
let chart: EChartsType | null = null

function renderChart() {
  if (!chartEl.value) return
  const currentChart = chart || echarts.init(chartEl.value)
  chart = currentChart
  currentChart.setOption(props.option, true)
  currentChart.resize()
}

function resize() {
  chart?.resize()
}

onMounted(async () => {
  await nextTick()
  renderChart()
  window.addEventListener('resize', resize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resize)
  chart?.dispose()
  chart = null
})

watch(
  () => props.option,
  async () => {
    await nextTick()
    renderChart()
  },
  { deep: true }
)
</script>

<template>
  <el-card class="chart-panel" shadow="never">
    <template #header>
      <div class="chart-head">
        <div>
          <strong>{{ title }}</strong>
          <span v-if="subtitle">{{ subtitle }}</span>
        </div>
        <slot name="actions" />
      </div>
    </template>
    <div ref="chartEl" class="chart-body" :style="{ height: `${height || 320}px` }" />
  </el-card>
</template>

<style scoped>
.chart-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  color: var(--zt-text);
}

.chart-head strong {
  display: block;
  font-size: 15px;
}

.chart-head span {
  display: block;
  margin-top: 2px;
  color: var(--zt-text-muted);
  font-size: 12px;
}

.chart-body {
  width: 100%;
  min-width: 0;
}
</style>
