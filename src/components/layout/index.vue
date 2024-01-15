<!--
 * @Descripttion: 布局组件
 * @version: 
 * @Author: lc
 * @Date: 2023-12-19 10:54:39
 * @LastEditors: lc
 * @LastEditTime: 2023-12-28 14:53:10
-->
<template>
  <a-layout :style="{ height: '100%', background: '#fff' }">
    <!-- 顶部栏 -->
    <header-view></header-view>
    <a-layout
      :style="{ display: flex, flexDirection: 'row', background: '#fff' }"
    >
      <!-- 左侧菜单 -->
      <sider-view v-model:collapsed="collapsed"></sider-view>
      <!-- 右侧区域 -->
      <a-layout class="main-content">
          <!-- 主内容区-->
          <router-view />
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import headerView from "./components/header.vue";
import siderView from "./components/sider/index.vue";
const collapsed = ref(false);
</script>
<style lang="less" scoped>
.main-content {
  width: 100%;
  height: 100%;
  padding: 10px;
 
}
</style>