import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    collapsed: false,
    mobileSidebarVisible: false
  }),
  actions: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed
    },
    openMobileSidebar() {
      this.mobileSidebarVisible = true
    },
    closeMobileSidebar() {
      this.mobileSidebarVisible = false
    }
  }
})
