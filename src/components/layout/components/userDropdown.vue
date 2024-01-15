<!--
 * @Descripttion: 
 * @version: 
 * @Author: lc
 * @Date: 2023-12-29 11:18:52
 * @LastEditors: lc
 * @LastEditTime: 2024-01-08 14:06:49
-->
<template>
  <a-dropdown>
    <user-outlined style="width:100%;" />
    <template #overlay>
      <a-menu v-bind="$attrs">
        <a-menu-item>
          <a @click="handleLogout">退出登录</a>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>
<script lang="ts" setup>
import {userStore} from '@/store'
import {useRouter} from 'vue-router'
import {useAttrs} from 'vue'
defineOptions({
  inheritAttrs: false
})
const attrs=useAttrs()
console.log(attrs,'aaaaaaaaaa');

const user_store=userStore()
const router=useRouter()
const handleLogout=()=>{
    user_store.Logout().then(()=>{
    router.replace('/login')
    })
}
</script>