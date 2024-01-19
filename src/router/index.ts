/*
 * @Descripttion: 
 * @version: 
 * @Author: lc
 * @Date: 2023-12-12 09:12:11
 * @LastEditors: lc
 * @LastEditTime: 2024-01-17 17:02:27
 */
import { createRouter, createWebHistory,createWebHashHistory } from 'vue-router'
import HomeView from '@/views/home/index.vue'
import { generateRouter } from './permission.ts'
import Layout from '@/components/layout/index.vue'
const staticRoutes = [
  {
    path: '/',
    redirect: '/chat',
    children: [
      {
        path: '/chat',
        meta: { title: '聊天页' },
        component: () => import("@/views/gimini/chat.vue"),
      },
    ]
  },
  {
    path: "/transfer/:path/:afterUser(.*)?",
    name: "transfer",
    props: true,
    component: () => import("@/components/layout/components/transfer.vue"),
  },

]
const router = createRouter({
  history: createWebHashHistory(),
  routes: staticRoutes
})

// const dynamicRoutes=generateRouter()
export default router
