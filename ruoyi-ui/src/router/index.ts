import { createRouter, createWebHistory, type RouteLocationNormalized } from 'vue-router'
import { storeToRefs } from 'pinia'
import LoginView from '@/views/auth/LoginView.vue'
import AppLayout from '@/layouts/AppLayout.vue'
import { flatStaticRoutes } from '@/router/staticRoutes'
import { hasToken } from '@/utils/auth'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
      meta: { public: true, title: '登录' }
    },
    {
      path: '/',
      component: AppLayout,
      redirect: '/dashboard',
      children: flatStaticRoutes()
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/dashboard'
    }
  ],
  scrollBehavior: () => ({ top: 0 })
})

router.beforeEach(async (to: RouteLocationNormalized) => {
  document.title = `${String(to.meta.title || '工作台')} - ${import.meta.env.VITE_APP_TITLE}`
  if (to.meta.public) return true

  if (!hasToken()) {
    return { path: '/login', query: { redirect: to.fullPath } }
  }

  const authStore = useAuthStore()
  const { user } = storeToRefs(authStore)
  if (!user.value) {
    try {
      await authStore.loadUser()
      await authStore.loadRouters()
    } catch {
      authStore.reset()
      return { path: '/login', query: { redirect: to.fullPath } }
    }
  }
  return true
})

export default router
