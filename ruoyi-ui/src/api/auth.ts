import request from '@/utils/request'
import type { BackendRoute, RuoYiResponse } from '@/types/ruoyi'

export interface LoginPayload {
  username: string
  password: string
  code?: string
  uuid?: string
}

export interface CaptchaResponse {
  captchaEnabled?: boolean
  img?: string
  uuid?: string
}

export function getCaptcha(): Promise<RuoYiResponse<CaptchaResponse> & CaptchaResponse> {
  return request.get('/captchaImage')
}

export function login(data: LoginPayload): Promise<RuoYiResponse> {
  return request.post('/login', data)
}

export function logout(): Promise<RuoYiResponse> {
  return request.post('/logout')
}

export function getInfo(): Promise<RuoYiResponse> {
  return request.get('/getInfo')
}

export function getRouters(): Promise<RuoYiResponse<BackendRoute[]>> {
  return request.get('/getRouters')
}
