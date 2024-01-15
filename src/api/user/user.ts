/*
 * @Descripttion: 
 * @version: 
 * @Author: lc
 * @Date: 2023-12-18 16:10:18
 * @LastEditors: lc
 * @LastEditTime: 2023-12-21 10:53:31
 */

import { get, post } from '@/utils/request'
import type { UserInfoModel } from './model'
// 获取用户信息
export async function queryUserInfo() {
  return get<ResData<any>>('/user/getUserInfo')
}
//登录
export async function login(info: UserInfoModel) {
  return post<ResData<any>>('/user/login', { data: info })
}
//获取菜单
export async function getMenuList() {
  return get<ResData<any>>('/user/getMenuList')
}