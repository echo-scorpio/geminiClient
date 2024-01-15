<!--
 * @Descripttion: 
 * @version: 
 * @Author: lc
 * @Date: 2024-01-15 09:46:56
 * @LastEditors: lc
 * @LastEditTime: 2024-01-15 17:27:06
-->
<template>
  <div class="chat-container">
    <div class="chat-history">
      <div
        class="chat-item"
        v-for="(item, index) in chatHistoryList"
        :key="index"
      >
        <div
          class="left"
          :style="{ background: item.role === 'user' ? '#d3e3fd' : '#bcf6d1' }"
        >
          <user-outlined v-if="item.role === 'user'" style="font-size: 25px" />
          <robot-outlined
            v-else-if="item.role === 'model'"
            style="font-size: 25px"
          />
        </div>
        <div class="right">
          {{ item.text }}
        </div>
      </div>
    </div>
    <div class="chat-content">
      <a-input v-model:value="queryValue" @pressEnter="handleQuery" style="flex:.6"></a-input>
      <a-button type="primary" @click="handleQuery">发送</a-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { GoogleGenerativeAI } from "@google/generative-ai";
import { computed, ref } from "vue";
import { genimiStore } from "@/store";
import { message } from "ant-design-vue";
const MODEL_NAME = "gemini-pro";
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genimi_store = genimiStore();
const chatHistoryList = computed(() => genimi_store.chatContentList);
const queryValue = ref("");
async function run() {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const parts = [{ text: queryValue.value }];

  const result = await model.generateContent({
    contents: [{ role: "user", parts }],
    generationConfig,
  });
  const response = result.response;
  genimi_store.setChatContent({ text: response.text(), role: "model" });
}
const handleQuery = () => {
  if (!queryValue.value) {
    message.error("请输入内容");
    return;
  }
  const generateSearchData: ChatMessage = {
    role: "user",
    text: queryValue.value,
  };
  genimi_store.setChatContent(generateSearchData);
  run();
};
</script>
<style lang="less" scoped>
.chat-container {
  width: 70%;
  margin: 0 auto;
  height: 100%;
  background-color: #fff;
  .chat-history {
    height: calc(100% - 65px);
    min-height: 300px;
    overflow: auto;
    .chat-item {
      display: flex;
      align-items: center;
      margin: 30px;
      padding: 10px;
      &:hover{
        background: #f8f8f9;
      }
      .left {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 15px;
        span{
          color: #fff;
        }
      }
      .right {
        flex: 1;
      }
    }
  }
  .chat-content {
    display: flex;
    justify-content: center;

  }
}
/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  border-radius: 10px;
}
/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  background-color: #9b9b9b;
  border-radius: 5px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.4);
}
::-webkit-scrollbar {
  width: 6px;
  height: 8px;
}
/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  border-radius: 10px;
}
/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  background-color: #9b9b9b;
  border-radius: 5px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.4);
}
</style>
