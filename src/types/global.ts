/*
 * @Descripttion: 
 * @version: 
 * @Author: lc
 * @Date: 2023-12-18 10:24:34
 * @LastEditors: lc
 * @LastEditTime: 2023-12-21 10:25:36
 */
declare interface ResData<T> {
    status_code: string | number;
    message: string;
    data: T;
    [key: string]: any;
}
declare type Recordable<T = any> = Record<string, T>

declare type ReadonlyStringable<T> = {
    readonly [key: string]: T
}
//菜单属性
declare interface menuInfo {
    url: string,
    icon: string,
    menuName: string,
    children?: menuInfo[],
    menuId: number,
    parentId: number,
    openType: number,
    menuType: 'catalog' | 'page'
}
// 页签属性
declare interface tabInfo{
    path:string,
    name:string,
    meta:object,
    query:object,
    params:object
}