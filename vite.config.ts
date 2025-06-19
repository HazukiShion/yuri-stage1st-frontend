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
  // --- 添加以下 server 配置 ---
  server: {
    proxy: {
      // 定义一个代理规则，所有以 /api 开头的请求都会被拦截
      '/api': {
        // 代理的目标服务器。由于我们只是想利用代理的路径重写功能，
        // 而不是真的要请求另一个服务器，所以这里可以不设置或指向自己。
        // 我们将它留空，主要依赖 rewrite 功能。
        target: 'http://localhost:5173', // 假设你的开发服务器运行在 5173 端口
        changeOrigin: true, // 必须设置为 true，表示改变请求源
        // 路径重写规则
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
