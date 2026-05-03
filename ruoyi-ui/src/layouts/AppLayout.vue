<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import { Fold, FullScreen, Menu as MenuIcon, RefreshRight, SwitchButton } from '@element-plus/icons-vue'
import { useAppStore } from '@/stores/app'
import { useAuthStore } from '@/stores/auth'
import { effectiveMenuRoutes } from '@/router/staticRoutes'
import SidebarMenu from '@/layouts/SidebarMenu.vue'

const appStore = useAppStore()
const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()
const { collapsed, mobileSidebarVisible } = storeToRefs(appStore)

const menuRoutes = computed(() => effectiveMenuRoutes(authStore.backendRoutes))
const displayName = computed(() => String(authStore.user?.nickName || authStore.user?.userName || authStore.user?.username || '管理员'))
const initials = computed(() => displayName.value.slice(0, 1).toUpperCase())

async function logout() {
  await authStore.logout()
  router.replace('/login')
}

function refresh() {
  router.replace({ path: '/redirect', query: { path: route.fullPath } }).catch(() => {
    window.location.reload()
  })
  window.location.reload()
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen?.()
  } else {
    document.exitFullscreen?.()
  }
}

function handleMenuSelect(index?: string) {
  if (index?.startsWith('/')) {
    router.push(index).catch(() => undefined)
  }
  appStore.closeMobileSidebar()
}
</script>

<template>
  <div class="app-shell" :class="{ collapsed }">
    <aside class="sidebar desktop-sidebar">
      <div class="brand">
        <div class="brand-mark">PV</div>
        <div v-if="!collapsed" class="brand-copy">
          <strong>智碳光伏</strong>
          <span>Energy Console</span>
        </div>
      </div>
      <el-scrollbar>
          <el-menu :default-active="route.path" :collapse="collapsed" unique-opened class="side-menu" @select="handleMenuSelect">
          <SidebarMenu :routes="menuRoutes" />
        </el-menu>
      </el-scrollbar>
    </aside>

    <el-drawer v-model="mobileSidebarVisible" direction="ltr" size="286px" :with-header="false" class="mobile-drawer">
      <aside class="sidebar mobile-sidebar">
        <div class="brand">
          <div class="brand-mark">PV</div>
          <div class="brand-copy">
            <strong>智碳光伏</strong>
            <span>Energy Console</span>
          </div>
        </div>
        <el-scrollbar>
          <el-menu :default-active="route.path" unique-opened class="side-menu" @select="handleMenuSelect">
            <SidebarMenu :routes="menuRoutes" />
          </el-menu>
        </el-scrollbar>
      </aside>
    </el-drawer>

    <main class="main-panel">
      <header class="topbar">
        <div class="topbar-left">
          <el-button class="mobile-menu-button" :icon="MenuIcon" circle @click="appStore.openMobileSidebar" />
          <el-button class="desktop-collapse" :icon="Fold" circle @click="appStore.toggleCollapsed" />
          <div class="crumbs">
            <span>工作台</span>
            <strong>{{ route.meta.title || '首页总览' }}</strong>
          </div>
        </div>
        <div class="topbar-actions">
          <el-tooltip content="刷新页面">
            <el-button :icon="RefreshRight" circle @click="refresh" />
          </el-tooltip>
          <el-tooltip content="全屏">
            <el-button :icon="FullScreen" circle @click="toggleFullscreen" />
          </el-tooltip>
          <el-dropdown trigger="click">
            <div class="user-chip">
              <el-avatar :size="30">{{ initials }}</el-avatar>
              <span>{{ displayName }}</span>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item disabled>个人中心</el-dropdown-item>
                <el-dropdown-item divided :icon="SwitchButton" @click="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </header>

      <section class="content-area">
        <router-view />
      </section>
    </main>
  </div>
</template>

<style scoped>
.app-shell {
  display: grid;
  min-height: 100vh;
  grid-template-columns: 244px minmax(0, 1fr);
  background: var(--zt-bg);
}

.app-shell.collapsed {
  grid-template-columns: 72px minmax(0, 1fr);
}

.sidebar {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  background: var(--zt-sidebar);
  box-shadow: 0 0 18px rgba(59, 65, 94, 0.08);
}

.brand {
  display: flex;
  align-items: center;
  height: 64px;
  gap: 12px;
  padding: 0 18px;
  border-bottom: 1px solid var(--zt-border);
}

.brand-mark {
  display: grid;
  width: 36px;
  height: 36px;
  flex: 0 0 auto;
  place-items: center;
  border-radius: 50%;
  background: var(--zt-primary);
  color: white;
  font-weight: 800;
}

.brand-copy {
  min-width: 0;
}

.brand-copy strong,
.brand-copy span {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.brand-copy strong {
  color: var(--zt-text);
  font-size: 15px;
}

.brand-copy span {
  color: var(--zt-text-muted);
  font-size: 11px;
}

.side-menu {
  min-height: calc(100vh - 64px);
  border-right: 0;
}

.side-menu :deep(.el-menu-item),
.side-menu :deep(.el-sub-menu__title) {
  height: 42px;
  color: #5e6e82;
  font-size: 13px;
}

.side-menu :deep(.el-menu-item.is-active) {
  background: rgba(44, 123, 229, 0.1);
  color: var(--zt-primary);
}

.main-panel {
  display: flex;
  min-width: 0;
  min-height: 100vh;
  flex-direction: column;
}

.topbar {
  position: sticky;
  z-index: 20;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  gap: 14px;
  padding: 0 22px;
  background: rgba(255, 255, 255, 0.92);
  border-bottom: 1px solid rgba(216, 226, 239, 0.8);
  backdrop-filter: blur(12px);
}

.topbar-left,
.topbar-actions {
  display: flex;
  align-items: center;
  min-width: 0;
  gap: 10px;
}

.mobile-menu-button {
  display: none;
}

.crumbs {
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 2px;
}

.crumbs span {
  color: var(--zt-text-muted);
  font-size: 11px;
}

.crumbs strong {
  overflow: hidden;
  color: var(--zt-text);
  font-size: 15px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.user-chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.user-chip span {
  max-width: 110px;
  overflow: hidden;
  color: var(--zt-text);
  font-size: 13px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.content-area {
  width: 100%;
  min-width: 0;
  padding: 18px;
}

.mobile-sidebar {
  min-height: 100%;
}

@media (max-width: 900px) {
  .app-shell,
  .app-shell.collapsed {
    display: block;
  }

  .desktop-sidebar {
    display: none;
  }

  .desktop-collapse {
    display: none;
  }

  .mobile-menu-button {
    display: inline-flex;
  }

  .topbar {
    height: 58px;
    padding: 0 14px;
  }

  .topbar-actions .el-button:nth-child(2),
  .user-chip span {
    display: none;
  }

  .content-area {
    padding: 12px;
  }
}
</style>
