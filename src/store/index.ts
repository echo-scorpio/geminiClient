/*
 * @Descripttion: 
 * @version: 
 * @Author: lc
 * @Date: 2023-12-19 13:58:08
 * @LastEditors: lc
 * @LastEditTime: 2024-01-15 16:23:29
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
  });