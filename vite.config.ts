import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify' // 导入 vuetify 插件
import { fileURLToPath, URL } from 'node:url' // 导入 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vuetify({ autoImport: true }), // 启用 vuetify 插件并开启自动导入
  ],
  resolve: {
    alias: {
      // 使用 URL 和 fileURLToPath 来创建绝对路径
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  // vite.config.ts 中添加
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // json-server
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
