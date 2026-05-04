<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
}>()
</script>

<template>
  <div class="pv-page-header">
    <div>
      <h2 class="pv-page-title">{{ title }}</h2>
      <p v-if="subtitle" class="pv-page-subtitle">{{ subtitle }}</p>
    </div>
    <div class="pv-page-header-actions">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.pv-page-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}

.pv-page-title {
  margin: 0;
  color: #12263f;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 0;
}

.pv-page-subtitle {
  margin: 6px 0 0;
  color: #6e84a3;
  font-size: 13px;
}

.pv-page-header-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

@media (max-width: 560px) {
  .pv-page-header {
    flex-direction: column;
  }
}
</style>
