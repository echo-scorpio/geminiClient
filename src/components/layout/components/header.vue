<template>
  <div class="header-container">
    <div class="header-left">
      <h2>vue3+ts+vite project</h2>
    </div>
    <div class="header-middle">
      <a-tabs v-model:activeKey="activeKey" @change="changeTab">
        <a-tab-pane v-for="(item, index) in tabList" :key="item.fullPath">
          <template v-slot:tab>
            <a-dropdown :trigger="['contextmenu']">
              <span
                @mouseenter="item.showClose = true"
                @mouseleave="item.showClose = false"
                >{{ item.name }}
                <reload-outlined
                  style="font-size: 10px; margin: 0 5px"
                  :spin="spin"
                  @click="handleReload(item)"
                  v-if="item.fullPath == activeKey"
                />
                <close-outlined
                  v-if="
                    item.showClose &&
                    tabList.length > 1 &&
                    item.fullPath !== '/home'
                  "
                  class="close-tabs-icon"
                  @click.stop="closeTab(item, index)"
                />
              </span>
              <template #overlay>
                <a-menu>
                  <a-menu-item
                    :disabled="tabList.length === 1"
                    key="close-other"
                    @click="closeOther(item)"
                  >
                    关闭其他
                  </a-menu-item>
                  <a-menu-item
                    key="close-left"
                    @click="closeAll()"
                    :disabled="tabList.length === 1"
                  >
                    全部关闭
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </template>
        </a-tab-pane>
      </a-tabs>
    </div>
    <div class="header-right">
      <userDropdown class="user-dropdown"></userDropdown>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { userStore } from "@/store/index";
import userDropdown from './userDropdown.vue'
const router = useRouter();
const user_store = userStore();
const activeKey = computed(() => router.currentRoute.value.fullPath);
const tabList = computed(() => user_store.tabList);
const spin = ref(false);

//切换页签
const changeTab = (fullPath: string) => {
  router.push(fullPath);
};
// 关闭页签
const closeTab = (tab: tabInfo, index: number) => {
  let preIndex: number = 0;
  user_store.CloseTab(index);
  //关闭页签为当前选中页签，需找到当前页签的前一个页签并选中
  if (tab.fullPath === activeKey.value) {
    if (index > 0) {
      preIndex = index - 1;
    }
    changeTab(tabList.value[preIndex].fullPath);
  }
};
//刷新页签
const handleReload = (tab: tabInfo) => {
  spin.value = true;
  setTimeout(() => {
    router.replace(`/transfer${tab.fullPath}`);
    spin.value = false;
  }, 500);
};
// 关闭其他
const closeOther = (tab: tabInfo) => {
  user_store.CloseOtherTab(tab);
  if (activeKey.value != tab.fullPath) {
    router.replace({ path: tab.fullPath });
  }
};
//关闭全部
const closeAll = () => {
  user_store.CloseAllTab();
  router.replace({ path: "/home" });
};
</script>
<style lang="less" scoped>
.header-container {
  width: 100%;
  display: flex;
  box-shadow: 0 1px 4px #00152914;
  height: 45px;
  z-index: 1;
  padding: 10px;
  align-items: center;
  .header-left {
    width: 200px;
    margin-right: 50px;
  }
  .header-middle {
    flex: 1;
    margin-top: 13px;
    .close-tabs-icon {
      color: red;
      font-size: 10px;
    }
  }
  .header-right {
    width: 100px;
    text-align: center;
  }
}
</style>