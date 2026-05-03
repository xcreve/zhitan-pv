import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

const devApiTarget = 'http://localhost:9050'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 5173,
    proxy: {
      '/dev-api': {
        target: devApiTarget,
        changeOrigin: true,
        configure(proxy) {
          proxy.on('proxyReq', proxyReq => {
            proxyReq.setHeader('origin', devApiTarget)
          })
        },
        rewrite: path => path.replace(/^\/dev-api/, '')
      }
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          const normalizedId = id.replace(/\\/g, '/')
          if (!normalizedId.includes('node_modules')) return undefined
          if (normalizedId.includes('/echarts/')) return 'vendor-echarts'
          if (normalizedId.includes('/@element-plus/icons-vue/')) return 'vendor-element-icons'
          if (normalizedId.includes('/element-plus/')) return 'vendor-element-plus'
          if (normalizedId.includes('/vue/') || normalizedId.includes('/vue-router/') || normalizedId.includes('/pinia/')) return 'vendor-vue'
          return 'vendor'
        }
      }
    }
  },
  test: {
    environment: 'jsdom',
    globals: true,
    exclude: ['node_modules', 'dist', 'tests/e2e/**'],
    coverage: {
      reporter: ['text', 'html']
    }
  }
})
