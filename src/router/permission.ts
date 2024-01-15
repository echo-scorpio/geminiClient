/*
 * @Descripttion: 
 * @version: 
 * @Author: lc
 * @Date: 2023-12-20 09:29:23
 * @LastEditors: lc
 * @LastEditTime: 2023-12-28 13:55:08
 */
import { getCookie } from '@/utils/auth'
import router from './index'
import { whiteListRoute,homeInfoConfig } from '@/config/constant'
import { userStore } from '@/store/index'
import { storeToRefs } from 'pinia'
import type { UserInfoModel } from '@/api/user/model'
import { message } from 'ant-design-vue'
import type { RouteRecordRaw } from 'vue-router'


const viewModules = import.meta.glob('@/views/**/**.vue') //页面
const layoutModules = import.meta.glob('@/components/layout/**.vue') //布局
//处理后端接口返回的菜单列表，生成动态路由
export const generateRouter = (menuList: menuInfo[]) => {
    const routes: RouteRecordRaw[] = [];
    // 遍历菜单列表
    menuList.forEach(menu => {
        const route: RouteRecordRaw = {
            path: menu.url || '/',
            name: menu.menuName ?? '',
            component: menu.menuType === 'page' ?
                viewModules[`/src/views${menu.url}/index.vue`] :
                layoutModules[`/src/components/layout/index.vue`], // 根据菜单类型动态加载对应的组件
            meta: {},
            children: []
        };
        // 处理子菜单
        if (menu.children && menu.children.length > 0) {
            route.children = generateRouter(menu.children);
        }
        router.addRoute(route)
        routes.push(route);
    })
    return routes;
}

router.beforeEach(async (to, _, next) => {
    const token = getCookie('token')
    const user_store = userStore()

    //token失效，跳转页面属于白名单，可以正常跳转，否则跳转登录页
    if (!token) {
        if (whiteListRoute.includes(to.path)) {
            next()
        }
        else {
            next('/login')
        }
    }
    else {
        if (user_store.menuList.length) {
            if(!to.path.includes('transfer')){
                user_store.AddTab(to as tabInfo) //添加页签
            }
            next()
        }
        else {
            await user_store.GetUserInfo().then(async (res) => {
                await user_store.GetMenuList().then((resp: menuInfo[]) => {
                    generateRouter(resp)
                    user_store.AddTab(homeInfoConfig)
                    next(to.path)

                })
            }).catch((err) => {
                next('/login')
                message.error(err)
            })
        }
    }
})