<!--
 * @Descripttion: 编辑分组信息组件
 * @version: 
 * @Author: lc
 * @Date: 2024-01-19 15:10:51
 * @LastEditors: lc
 * @LastEditTime: 2024-01-19 15:51:35
-->
<template>
  <a-form :model="form" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
    <a-form-item
      label="分组名称"
      name="title"
      :rules="[{ required: true, message: '名称不能为空' }]"
    >
      <a-input v-model:value="form.username" />
    </a-form-item>
  </a-form>
</template>
<script lang="ts" setup>
const props = defineProps({
  form: {
    type: Object,
    default: () => {},
  },
});
</script>