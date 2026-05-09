<script setup lang="ts">
import * as echarts from 'echarts/core'
import { BarChart, LineChart, PieChart } from 'echarts/charts'
import { GridComponent, LegendComponent, TooltipComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { EChartsOption } from 'echarts'
import type { EChartsType } from 'echarts/core'

echarts.use([BarChart, LineChart, PieChart, GridComponent, LegendComponent, TooltipComponent, CanvasRenderer])

const props = withDefaults(
  defineProps<{
    title: string
    subtitle?: string
    option: EChartsOption
    height?: number
  }>(),
  {
    height: 320
  }
)

const chartEl = ref<HTMLDivElement | null>(null)
let chart: EChartsType | null = null

function renderChart() {
  if (!chartEl.value) return
  chart = chart || echarts.init(chartEl.value)
  chart.setOption(props.option, true)
  chart.resize()
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
  <el-card class="pv-card chart-panel" shadow="never">
    <template #header>
      <div class="chart-head">
        <div>
          <strong>{{ title }}</strong>
          <span v-if="subtitle">{{ subtitle }}</span>
        </div>
        <slot name="actions" />
      </div>
    </template>
    <div ref="chartEl" class="chart-body" :style="{ height: `${height}px` }" />
  </el-card>
</template>

<style scoped>
.pv-card {
  border: 0;
  border-radius: 6px;
  box-shadow: 0 7px 14px 0 rgba(18, 38, 63, 0.06);
}

.chart-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.chart-head strong {
  display: block;
  color: #12263f;
  font-size: 15px;
}

.chart-head span {
  display: block;
  margin-top: 2px;
  color: #6e84a3;
  font-size: 12px;
}

.chart-body {
  width: 100%;
  min-width: 0;
}
</style>
