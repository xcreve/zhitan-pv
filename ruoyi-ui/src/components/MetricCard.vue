<script setup lang="ts">
import { computed } from 'vue'
import Iconify from '@/components/Iconify.vue'
import { displayValue } from '@/utils/format'

const props = defineProps<{
  title: string
  value: string | number | null | undefined
  unit?: string
  icon?: string
  tone?: 'primary' | 'success' | 'info' | 'warning' | 'danger'
  footnote?: string
}>()

const toneClass = computed(() => `metric-${props.tone || 'primary'}`)
</script>

<template>
  <el-card class="metric-card" :class="toneClass" shadow="never">
    <div class="metric-head">
      <span class="metric-title">{{ title }}</span>
      <span class="metric-icon"><Iconify :name="icon || 'DataLine'" /></span>
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
  color: var(--zt-text-muted);
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

.metric-icon svg {
  width: 18px;
  height: 18px;
}

.metric-value {
  margin-top: 14px;
  color: var(--zt-text);
  font-size: 24px;
  font-weight: 700;
  line-height: 1.1;
}

.metric-foot {
  margin-top: 8px;
  color: var(--zt-text-muted);
  font-size: 12px;
}

.metric-primary {
  color: var(--zt-primary);
}

.metric-success {
  color: var(--zt-success);
}

.metric-info {
  color: var(--zt-info);
}

.metric-warning {
  color: var(--zt-warning);
}

.metric-danger {
  color: var(--zt-danger);
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
