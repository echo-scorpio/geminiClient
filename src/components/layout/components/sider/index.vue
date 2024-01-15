<!--
 * @Descripttion: 
 * @version: 
 * @Author: lc
 * @Date: 2023-12-19 10:54:54
 * @LastEditors: lc
 * @LastEditTime: 2023-12-25 09:26:34
-->
<template>
  <div class="sider-container">
    <a-layout-sider
      :collapsible="true"
      :trigger="null"
      :collapsed="collapsed"
      theme="light"
      class="sider-content bottomBorder"
      :width="siderWidth"
    >
      <a-menu
        :open-keys="openKeys"
        :selected-keys="selectedKeys"
        @openChange="handleOpenChange"
        @select="handleSelect"
        mode="inline"
      >
        <template v-for="menu in menus">
          <a-menu-item
            :key="menu.url"
            v-if="!menu.children"
          >
            <template #icon>
              <SettingOutlined />
            </template>
            <span :title="menu.menuName">{{ menu.menuName }}</span>
          </a-menu-item>
          <sub-menu
            v-else-if="menu.children"
            :key="menu.menuId"
            :menu="menu"
            @parentHandle="handleSelect"
          >
          </sub-menu>
        </template>
      </a-menu>
    </a-layout-sider>
    <div class="sider-footer">
      <menu-unfold-outlined
        v-if="collapsed"
        style="cursor: pointer"
        @click="handleCollapsed"
      />
      <menu-fold-outlined
        v-else
        style="cursor: pointer"
        @click="handleCollapsed"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import subMenu from "./subMenu.vue";
import { userStore } from "@/store/index";
import { computed } from "vue";
import { useRouter } from "vue-router";
const user_store = userStore();
const router = useRouter();
const menus = computed(() => user_store.menuList);
const props = defineProps({
  collapsed: {
    type: Boolean,
    default: false,
  },
  siderWidth: {
    type: Number,
    default: 208,
  },
});
const emit = defineEmits(["update:collapsed"]);
//折叠、收起左侧菜单
const handleCollapsed = () => {
  emit("update:collapsed", !props.collapsed);
};
//点击菜单，跳转路由
const handleSelect = ({ key }) => {
  if (key) {
    router.push(key);
  }
};
const selectedKeys = computed(() => [router.currentRoute.value.fullPath] ?? []);

</script>
<style lang="less" scoped>
.sider-container {
  display: flex;
  align-items: center;
  flex-direction: column !important;
  background: #fafcff;
  .sider-content {
    flex: 1 !important;
  }
  .sider-footer {
    height: 40px;
    width: 100%;
    line-height: 40px;
    text-align: center;
  }
}
</style>