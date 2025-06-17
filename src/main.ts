// src/main.ts

// 1. 样式导入
// Vuetify 的核心样式
import 'vuetify/styles'
// Material Design Icons 的样式
import '@mdi/font/css/materialdesignicons.css'

// 2. 库和函数导入
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'
// 导入 Vuetify 的所有组件和指令，方便使用
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
// 导入我们创建的路由
import router from './router'

// 3. 根组件导入
import App from './App.vue'

// 4. 创建实例
// 创建 Vue 应用实例
const app = createApp(App)
// 创建 Pinia 实例
const pinia = createPinia()
// 创建 Vuetify 实例
const vuetify = createVuetify({
  components,
  directives,
  // 将 mdi 设置为默认图标集
  icons: {
    defaultSet: 'mdi',
  },
})

// 5. 注册插件
// 在 Vue 应用中使用 Pinia
app.use(pinia)
// 在 use(vuetify) 之前使用路由
app.use(router)
// 在 Vue 应用中使用 Vuetify
app.use(vuetify)

// 6. 挂载应用
app.mount('#app')