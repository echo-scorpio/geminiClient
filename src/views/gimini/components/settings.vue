<!--
 * @Descripttion: 
 * @version: 
 * @Author: lc
 * @Date: 2024-01-30 09:26:13
 * @LastEditors: lc
 * @LastEditTime: 2024-01-30 11:10:25
-->
<template>
  <a-form
    :model="form"
    name="basic"
    :label-col="{ span: 6 }"
    :wrapper-col="{ span: 16 }"
    autocomplete="off"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <a-form-item label="apiKey" name="apiKey">
      <a-input-password placeholder="请输入" v-model:value="form.apiKey" />
    </a-form-item>
    <a-form-item label="模型" name="model">
      <a-select ref="select" v-model:value="form.model" :options="modelList">
      </a-select>
    </a-form-item>
    <a-form-item label="Temperature" name="temperature">
      <a-row align="middle">
        <a-col :span="20">
          <a-slider
            v-model:value="form.temperature"
            :min="0"
            :max="1"
            :step="0.01"
          />
        </a-col>
        <a-col :span="4" style="text-align: center">
          <span>{{ form.temperature }}</span>
        </a-col>
      </a-row>
    </a-form-item>
    <a-form-item label="Top K" name="topK">
      <a-input-number v-model:value="form.topK" :min="1" :max="20" />
    </a-form-item>
    <a-form-item label="Top P" name="topP">
      <a-row align="middle">
        <a-col :span="20">
          <a-slider v-model:value="form.topP" :min="0" :max="1" :step="0.01" />
        </a-col>
        <a-col :span="4" style="text-align: center">
          <span>{{ form.topP }}</span>
        </a-col>
      </a-row>
    </a-form-item>
  </a-form>
</template>
<script lang="ts" setup>
import { ref } from "vue";

const props = defineProps({
  form: {
    type: Object,
    default: () => {},
  },
});
const modelList = ref([
  {
    label: "gemini-pro 文字",
    value: "gemini-pro",
  },
  {
    label: "gemini-pro-vision 图片",
    value: "gemini-pro-vision",
    disabled:true
  },
]);
</script>