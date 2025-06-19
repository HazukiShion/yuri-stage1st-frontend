// src/main.ts

import { createApp } from 'vue'
import App from './App.vue'

// 导入 Pinia
import { createPinia } from 'pinia'

// 导入我们创建的 Vuetify 实例
import { vuetify } from './plugins/vuetify'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)   // 注册 Pinia
app.use(vuetify) // 注册 Vuetify

app.mount('#app')