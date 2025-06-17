// src/router/index.ts

import { createRouter, createWebHistory } from 'vue-router'
// 导入我们新建的首页组件
import HomeView from '../views/HomeView.vue'
import WorkListView from '../views/WorkListView.vue'
import WorkDetailView from '../views/WorkDetailView.vue'

const routes = [
  {
    path: '/', // 根路径
    name: 'Home',
    component: HomeView // 显示首页
  },
  {
    path: '/works', // 作品列表页的新路径
    name: 'WorkList',
    component: WorkListView
  },
  {
    path: '/works/:id',
    name: 'WorkDetail',
    component: WorkDetailView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router