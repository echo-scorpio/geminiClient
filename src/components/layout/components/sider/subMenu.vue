<template>
  <a-sub-menu :key="menu.menuId">
    <template #icon>
      <SettingOutlined />
    </template>
    <template #title>
      <span :title="menu.menuName">{{ menu.menuName }}</span>
    </template>
    <template v-for="child in menu.children">
      <a-menu-item v-if="!child.children" :key="child.url">
        <template #icon>
          <SettingOutlined />
        </template>
        <span :title="child.menuName">{{ child.menuName }}</span>
      </a-menu-item>
      <sub-menu v-else :menu="child" :key="child.url" />
    </template>
  </a-sub-menu>
</template>
<script lang="ts" setup>
const props = defineProps({
  menu: {
    type: Array,
    default: () => [],
  },
});
</script>