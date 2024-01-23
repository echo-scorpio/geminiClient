/*
 * @Descripttion: 
 * @version: 
 * @Author: lc
 * @Date: 2023-12-12 09:12:11
 * @LastEditors: lc
 * @LastEditTime: 2024-01-15 17:33:42
 */
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue';
import * as Icons from '@ant-design/icons-vue';

import 'ant-design-vue/dist/antd.css';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const app = createApp(App)
const icons : any  = Icons;
for (const i in icons) {
    app.component(i, icons[i]);
  }
const pinia =createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia)
app.use(router)
app.use(Antd)

app.mount('#app')
