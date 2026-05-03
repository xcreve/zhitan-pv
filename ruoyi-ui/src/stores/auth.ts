import { defineStore } from 'pinia'
import { getInfo, getRouters, login, logout, type LoginPayload } from '@/api/auth'
import { getToken, removeToken, setToken } from '@/utils/auth'
import type { BackendRoute } from '@/types/ruoyi'

interface AuthState {
  token: string
  user: Record<string, unknown> | null
  roles: string[]
  permissions: string[]
  backendRoutes: BackendRoute[]
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: getToken(),
    user: null,
    roles: [],
    permissions: [],
    backendRoutes: []
  }),
  actions: {
    async login(payload: LoginPayload) {
      const response = await login(payload)
      const token = String(response.token || '')
      if (!token) throw new Error(response.msg || '登录接口未返回 token')
      this.token = token
      setToken(token)
      return token
    },
    async loadUser() {
      const response = await getInfo()
      this.user = (response.user as Record<string, unknown>) || null
      this.roles = Array.isArray(response.roles) ? (response.roles as string[]) : []
      this.permissions = Array.isArray(response.permissions) ? (response.permissions as string[]) : []
      return this.user
    },
    async loadRouters() {
      const response = await getRouters()
      this.backendRoutes = Array.isArray(response.data) ? response.data : []
      return this.backendRoutes
    },
    async logout() {
      try {
        await logout()
      } catch {
        // Local token cleanup is still required if backend logout is unavailable.
      } finally {
        this.reset()
      }
    },
    reset() {
      this.token = ''
      this.user = null
      this.roles = []
      this.permissions = []
      this.backendRoutes = []
      removeToken()
    }
  }
})
