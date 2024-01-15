/*
 * @Descripttion: 
 * @version: 
 * @Author: lc
 * @Date: 2023-12-12 09:12:11
 * @LastEditors: lc
 * @LastEditTime: 2024-01-15 17:33:21
 */
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/home/index.vue'
import {generateRouter} from './permission.ts'
import Layout from '@/components/layout/index.vue'
const staticRoutes=[
  {
    path:'/chat',
    meta:{title:'聊天页'},
    component: () => import("@/views/gimini/chat.vue"),
  },
  {
    path: "/transfer/:path/:afterUser(.*)?",
    name: "transfer",
    props: true,
    component: () => import("@/components/layout/components/transfer.vue"),
  },
  
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes:staticRoutes
})

// const dynamicRoutes=generateRouter()
export default router
