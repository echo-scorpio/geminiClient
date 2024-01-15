/*
 * @Descripttion: 
 * @version: 
 * @Author: lc
 * @Date: 2023-12-28 17:16:32
 * @LastEditors: lc
 * @LastEditTime: 2023-12-29 09:45:10
 */
import { get, post } from '@/utils/request'
//模拟接口调用，查询菜单列表
export async function queryMenuList(data: ReadonlyStringable<string | number>) {
  console.log(data,'dataaaaaaaaaaaaa');
  
  return post<ResData<any>>('/menu/list',data)
}