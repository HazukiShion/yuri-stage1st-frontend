// src/router/index.ts

import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/HomePage.vue'),
    },
    {
        path: '/works',
        name: 'WorkList',
        component: () => import('@/views/WorkListPage.vue'),
    },
    {
        path: '/work/:id', // 使用 :id 作为动态参数
        name: 'WorkDetail',
        component: () => import('@/views/WorkDetailPage.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

export default router