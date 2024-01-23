/*
 * @Descripttion: 
 * @version: 
 * @Author: lc
 * @Date: 2023-12-19 13:58:08
 * @LastEditors: lc
 * @LastEditTime: 2024-01-23 09:43:48
 */
import { defineStore } from 'pinia';
import { user } from './models/user';
import { gemini } from './models/gemini';
export const userStore = defineStore({
    id: 'user',
    state: () => user.state,
    actions: user.actions,
  });
  export const genimiStore = defineStore({
    id: 'gemini',
    state: () => gemini.state,
    actions: gemini.actions,
    persist: {
      key: 'vuex-store',
      storage: localStorage,
      paths: ['chatContentList'], //数据持久化需要缓存的状态，不填则默认将state中的状态全部缓存
    },
  });