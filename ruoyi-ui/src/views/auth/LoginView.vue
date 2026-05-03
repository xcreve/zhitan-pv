<script setup lang="ts">
import { Lock, Refresh, User } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getCaptcha } from '@/api/auth'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const loading = ref(false)
const captchaLoading = ref(false)
const captchaEnabled = ref(true)
const captchaImage = ref('')

const form = reactive({
  username: 'admin',
  password: 'admin123',
  code: '',
  uuid: ''
})

async function loadCaptcha() {
  captchaLoading.value = true
  try {
    const response = await getCaptcha()
    captchaEnabled.value = response.captchaEnabled !== false
    form.uuid = response.uuid || ''
    captchaImage.value = response.img ? `data:image/gif;base64,${response.img}` : ''
  } catch {
    captchaEnabled.value = false
  } finally {
    captchaLoading.value = false
  }
}

async function submit() {
  if (!form.username || !form.password) {
    ElMessage.warning('请输入用户名和密码')
    return
  }
  if (captchaEnabled.value && !form.code) {
    ElMessage.warning('请输入验证码')
    return
  }

  loading.value = true
  try {
    await authStore.login(form)
    await authStore.loadUser()
    await authStore.loadRouters()
    const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/dashboard'
    router.replace(redirect)
  } catch {
    form.code = ''
    await loadCaptcha()
  } finally {
    loading.value = false
  }
}

onMounted(loadCaptcha)
</script>

<template>
  <main class="login-page">
    <section class="login-brand">
      <div class="brand-badge">PV</div>
      <h1>智碳光伏管理系统</h1>
      <p>面向光伏电站实时监测、统计分析、智能报警和运维管理的企业能源工作台。</p>
      <div class="brand-metrics">
        <span><strong>#edf2f9</strong> Falcon 工作台背景</span>
        <span><strong>RuoYi</strong> JWT 权限认证</span>
        <span><strong>Vue3</strong> 响应式管理端</span>
      </div>
    </section>

    <el-card class="login-card" shadow="never">
      <h2>登录</h2>
      <p>使用后端账号进入管理端</p>
      <el-form :model="form" @keyup.enter="submit">
        <el-form-item>
          <el-input v-model="form.username" placeholder="用户名" :prefix-icon="User" autocomplete="username" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.password" placeholder="密码" :prefix-icon="Lock" type="password" show-password autocomplete="current-password" />
        </el-form-item>
        <el-form-item v-if="captchaEnabled">
          <div class="captcha-row">
            <el-input v-model="form.code" placeholder="验证码" />
            <button class="captcha-button" type="button" :disabled="captchaLoading" @click="loadCaptcha">
              <img v-if="captchaImage" :src="captchaImage" alt="验证码" />
              <el-icon v-else><Refresh /></el-icon>
            </button>
          </div>
        </el-form-item>
        <el-button type="primary" class="login-submit" :loading="loading" @click="submit">进入系统</el-button>
      </el-form>
      <div class="login-tip">默认开发账号参考 README：admin / admin123</div>
    </el-card>
  </main>
</template>

<style scoped>
.login-page {
  display: grid;
  min-height: 100vh;
  align-items: center;
  gap: 44px;
  grid-template-columns: minmax(0, 1fr) 420px;
  padding: 48px clamp(20px, 6vw, 96px);
  background:
    radial-gradient(circle at 18% 18%, rgba(44, 123, 229, 0.12), transparent 30%),
    linear-gradient(135deg, #edf2f9 0%, #f9fafd 100%);
}

.login-brand {
  max-width: 680px;
}

.brand-badge {
  display: grid;
  width: 58px;
  height: 58px;
  place-items: center;
  border-radius: 50%;
  background: var(--zt-primary);
  color: white;
  font-size: 20px;
  font-weight: 800;
}

.login-brand h1 {
  margin: 22px 0 14px;
  color: var(--zt-text);
  font-size: clamp(34px, 5vw, 58px);
  line-height: 1.08;
}

.login-brand p {
  max-width: 560px;
  margin: 0;
  color: var(--zt-text-muted);
  font-size: 16px;
  line-height: 1.8;
}

.brand-metrics {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 26px;
}

.brand-metrics span {
  padding: 10px 12px;
  border: 1px solid var(--zt-border);
  border-radius: var(--zt-radius);
  background: rgba(255, 255, 255, 0.72);
  color: var(--zt-text-muted);
  font-size: 12px;
}

.brand-metrics strong {
  display: block;
  color: var(--zt-text);
  font-size: 13px;
}

.login-card {
  width: min(100%, 420px);
}

.login-card h2 {
  margin: 0;
  color: var(--zt-text);
  font-size: 24px;
}

.login-card p {
  margin: 6px 0 22px;
  color: var(--zt-text-muted);
  font-size: 13px;
}

.captcha-row {
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: minmax(0, 1fr) 118px;
}

.captcha-button {
  display: grid;
  height: 32px;
  place-items: center;
  border: 1px solid var(--zt-border);
  border-radius: 5px;
  background: #f9fafd;
  cursor: pointer;
}

.captcha-button img {
  max-width: 100%;
  max-height: 30px;
}

.login-submit {
  width: 100%;
}

.login-tip {
  margin-top: 14px;
  color: var(--zt-text-muted);
  font-size: 12px;
  text-align: center;
}

@media (max-width: 900px) {
  .login-page {
    grid-template-columns: minmax(0, 1fr);
    padding: 28px 18px;
  }

  .login-brand {
    max-width: none;
  }
}

@media (max-width: 560px) {
  .login-brand h1 {
    font-size: 31px;
  }

  .brand-metrics {
    display: none;
  }
}
</style>
