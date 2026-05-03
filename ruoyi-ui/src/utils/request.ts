import axios, { type AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getToken, removeToken } from '@/utils/auth'
import { formatApiErrorMessage, isSuccessCode } from '@/utils/ruoyi'
import type { RuoYiResponse } from '@/types/ruoyi'

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 20_000
})

let unauthorizedShown = false

service.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

service.interceptors.response.use(
  (response: AxiosResponse<RuoYiResponse>) => {
    const payload = response.data
    if (payload && typeof payload === 'object' && !isSuccessCode(payload.code)) {
      const message = formatApiErrorMessage(payload.msg)
      if (payload.code === 401) {
        handleUnauthorized()
      } else {
        showApiError(message, payload.msg)
      }
      return Promise.reject(new Error(message))
    }
    return payload as unknown as AxiosResponse['data']
  },
  (error: AxiosError<RuoYiResponse>) => {
    const status = error.response?.status
    if (status === 401) {
      handleUnauthorized()
    } else {
      const rawMessage = error.response?.data?.msg || error.message
      const message = formatApiErrorMessage(rawMessage, '网络请求异常')
      showApiError(message, rawMessage)
    }
    return Promise.reject(error)
  }
)

function showApiError(message: string, rawMessage?: unknown): void {
  if (typeof rawMessage === 'string' && rawMessage.trim() && rawMessage.trim() !== message) {
    console.warn('[API Error]', rawMessage)
  }
  ElMessage.error({
    message,
    grouping: true,
    showClose: true,
    duration: 5_000,
    customClass: 'zt-api-error-message'
  })
}

function handleUnauthorized(): void {
  if (unauthorizedShown) return
  unauthorizedShown = true
  removeToken()
  ElMessageBox.alert('登录状态已过期，请重新登录。', '系统提示', {
    confirmButtonText: '重新登录',
    callback: () => {
      unauthorizedShown = false
      window.location.href = `/login?redirect=${encodeURIComponent(window.location.pathname + window.location.search)}`
    }
  })
}

export default service
