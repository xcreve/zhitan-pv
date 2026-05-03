<script setup lang="ts">
import Iconify from '@/components/Iconify.vue'
import type { AppRouteRecord } from '@/types/ruoyi'

defineProps<{
  routes: AppRouteRecord[]
}>()
</script>

<template>
  <template v-for="route in routes" :key="route.path">
    <el-sub-menu v-if="route.children?.length" :index="route.path">
      <template #title>
        <el-icon><Iconify :name="route.meta.icon" /></el-icon>
        <span>{{ route.meta.title }}</span>
      </template>
      <SidebarMenu :routes="route.children" />
    </el-sub-menu>
    <el-menu-item v-else :index="route.path">
      <el-icon><Iconify :name="route.meta.icon" /></el-icon>
      <span>{{ route.meta.title }}</span>
    </el-menu-item>
  </template>
</template>
