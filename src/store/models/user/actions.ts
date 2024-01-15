import { queryUserInfo, login, getMenuList } from '@/api/user/user'
import type { UserInfoModel } from '@/api/user/model'
import { setCookie } from '@/utils/auth'
import { homeInfoConfig } from '@/config/constant'

export const actions = {
    //获取用户信息
    GetUserInfo() {
        return new Promise((resolve, reject) => {
            queryUserInfo().then(res => {
                if (res.status_code === '0000') {
                    this.userInfo = res.data;
                    resolve(res.data);
                }
                else {
                    reject(res.message)
                }

            }).catch((err) => {
                reject(err)
            })
        })

    },
    //获取菜单
    GetMenuList(): Promise<menuInfo[]> {
        return new Promise((resolve, reject) => {
            getMenuList().then(res => {
                if (res.status_code === '0000') {
                    this.menuList = res.data;
                    resolve(res.data)
                }
                else {
                    reject(res.message)
                }
            }).catch(err => {
                reject(err)
            })
        })


    },
    //添加页签
    AddTab(tag: tabInfo) {
        if (!this.tabList.some((item: tabInfo) => item.path === tag.path)) {
            this.tabList.push(tag)
        }
    },
    //删除页签
    CloseTab(index: number) {
        this.tabList.splice(index, 1)
    },
    //关闭其他页签
    CloseOtherTab(tab: tabInfo) {
        let startIndex = tab.path != '/home' ? 1 : 0;
        this.tabList.splice(startIndex, this.tabList.length, tab);

    },
    // 全部关闭
    CloseAllTab() {
        this.tabList = [homeInfoConfig]
    },
    // 登录
    Login(info: UserInfoModel) {
        return new Promise((resolve, reject) => {
            login(info).then(res => {
                if (res.status_code === '0000') {
                    setCookie('token', info.username + new Date().getTime(), 7)
                    resolve(res)
                }
                else {
                    reject(res.message)
                }
            }).catch((err) => {
                reject(err)
            })
        })

    },

    //退出登录
    Logout() {
        return new Promise((resolve, reject) => {
            this.userInfo = null;
            this.CloseAllTab()
            setCookie('token', '', -1)
            resolve(true)
        })
    }
}