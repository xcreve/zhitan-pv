<script setup lang="ts">
import * as Icons from '@element-plus/icons-vue'
import { computed } from 'vue'

const props = defineProps<{
  name?: string
}>()

const iconComponent = computed(() => {
  const iconName = props.name || 'Menu'
  return (Icons as Record<string, unknown>)[iconName] || Icons.Menu
})
</script>

<template>
  <component :is="iconComponent" />
</template>
