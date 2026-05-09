<script setup lang="ts">
import { computed } from 'vue'
import { Bell, Calendar, DataLine, Lightning, Money, OfficeBuilding, SetUp, Sunny, TrendCharts } from '@element-plus/icons-vue'
import type { Component } from 'vue'
import { displayValue } from '@/utils/pvadmin/format'

const props = defineProps<{
  title: string
  value: string | number | null | undefined
  unit?: string
  icon?: string
  tone?: 'primary' | 'success' | 'info' | 'warning' | 'danger'
  footnote?: string
}>()

const icons: Record<string, Component> = {
  Bell,
  Calendar,
  DataLine,
  Lightning,
  Money,
  OfficeBuilding,
  SetUp,
  Sunny,
  TrendCharts
}

const toneClass = computed(() => `metric-${props.tone || 'primary'}`)
const iconComponent = computed(() => icons[props.icon || 'DataLine'] || DataLine)
</script>

<template>
  <el-card class="metric-card" :class="toneClass" shadow="never">
    <div class="metric-head">
      <span class="metric-title">{{ title }}</span>
      <span class="metric-icon">
        <el-icon><component :is="iconComponent" /></el-icon>
      </span>
    </div>
    <div class="metric-value">{{ displayValue(value, unit || '') }}</div>
    <div class="metric-foot">{{ footnote || '实时同步后端数据' }}</div>
  </el-card>
</template>

<style scoped>
.metric-card {
  position: relative;
  overflow: hidden;
  min-height: 126px;
  border: 0;
  border-radius: 6px;
  box-shadow: 0 7px 14px 0 rgba(18, 38, 63, 0.06);
}

.metric-card::after {
  position: absolute;
  right: -30px;
  bottom: -48px;
  width: 112px;
  height: 112px;
  border-radius: 50%;
  background: currentColor;
  content: "";
  opacity: 0.08;
}

.metric-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.metric-title {
  color: #6e84a3;
  font-size: 13px;
}

.metric-icon {
  display: inline-grid;
  width: 34px;
  height: 34px;
  place-items: center;
  border-radius: 50%;
  background: rgba(44, 123, 229, 0.1);
}

.metric-icon .el-icon {
  width: 18px;
  height: 18px;
}

.metric-value {
  margin-top: 14px;
  color: #12263f;
  font-size: 24px;
  font-weight: 700;
  line-height: 1.1;
}

.metric-foot {
  margin-top: 8px;
  color: #6e84a3;
  font-size: 12px;
}

.metric-primary {
  color: #2c7be5;
}

.metric-success {
  color: #00d27a;
}

.metric-info {
  color: #27bcfd;
}

.metric-warning {
  color: #f5803e;
}

.metric-danger {
  color: #e63757;
}

@media (max-width: 560px) {
  .metric-card {
    min-height: 110px;
  }

  .metric-value {
    font-size: 22px;
  }
}
</style>
