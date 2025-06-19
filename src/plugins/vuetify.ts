// src/plugins/vuetify.ts

// 从 'vuetify' 中导入 createVuetify 函数
import { createVuetify } from 'vuetify'

// 导入 Material Design 图标字体
import '@mdi/font/css/materialdesignicons.css'

// 创建并导出 Vuetify 实例
export const vuetify = createVuetify({
    // 在这里可以配置 Vuetify 的主题、默认值等
    // 例如，配置默认的图标集为 Material Design Icons
    icons: {
        defaultSet: 'mdi',
    },
})