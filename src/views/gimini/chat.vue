<!--
 * @Descripttion: 
 * @version: 
 * @Author: lc
 * @Date: 2024-01-15 09:46:56
 * @LastEditors: lc
 * @LastEditTime: 2024-01-22 10:22:13
-->
<template>
  <a-row class="chat-container">
    <a-col :span="4" class="chatGroup">
      <div class="group-contaienr">
        <div
          class="group-item"
          v-for="(item, index) in chatGroupData"
          :key="index"
          :style="{
            border:
              item.t === activeGroupKey
                ? '2px solid #40a9ff'
                : '1px solid #d9d9d9',
          }"
          @click="changeChatGroup(item)"
        >
          <div class="close" @click="deleteGroup(index)">
            <close-circle-outlined />
          </div>
          <p class="font14 bold">{{ item.title }}</p>
          <div class="flex-spb font12">
            <span>{{ item.chatData.length }}条对话</span>
            <span>{{ formatDate(item.t) }}</span>
          </div>
        </div>
      </div>
      <div class="flex-spb group-footer">
        <a-button @click="message.warning('开发中')" type="default"
          ><setting-outlined
        /></a-button>
        <a-button @click="handleAddGroup" type="primary" ghost
          >添加分组</a-button
        >
        <!-- <a-button type="dashed" @click="goGithub"><github-outlined /></a-button> -->
      </div>
    </a-col>
    <a-col :span="20">
      <div style="width: 100%">
        <div class="header">
          <p class="font16 flex-spb">
            <!-- 编辑状态  -->
            <template v-if="editable">
              <a-input
                v-model:value="currentGroup.title"
                style="width: 80%; border-radius: 5px"
                @blur="editable = false"
              />
              <a-button
                @click="editable = false"
                type="dashed"
                style="border-radius: 5px"
              >
                <check-outlined class="font16" style="color: #1890ff" />
              </a-button>
            </template>
            <!-- 非编辑状态 -->
            <template v-else>
              <span class="bold"> {{ currentGroup.title }}</span>
              <a-button
                @click="editable = true"
                type="dashed"
                style="border-radius: 5px"
                ><edit-outlined class="font16" style="color: #1890ff"
              /></a-button>
            </template>
          </p>
          <div class="font-12">
            <span>共{{ currentGroup.chatData.length }}条对话</span>
          </div>
        </div>
        <div class="chat-history">
          <div
            class="chat-item"
            v-for="(item, index) in chatHistoryList"
            :key="index"
          >
            <a-row style="align-items: center; margin-bottom: 15px">
              <div
                class="top"
                :style="{
                  background: item.role === 'user' ? '#d3e3fd' : '#bcf6d1',
                }"
              >
                <user-outlined
                  v-if="item.role === 'user'"
                  style="font-size: 25px"
                />
                <robot-outlined
                  v-else-if="item.role === 'model'"
                  style="font-size: 25px"
                />
              </div>
              <span class="font14 bold" v-if="item.role === 'user'">YOU</span>
              <span class="font14 bold" v-else>Gemini</span>
            </a-row>
            <div class="bottom">
              <v-md-preview :text="item.text"></v-md-preview>
            </div>
          </div>
        </div>
        <div class="chat-content">
          <a-input
            v-model:value="queryValue"
            @pressEnter="handleQuery"
            style="flex: 0.6"
          ></a-input>
          <a-button type="primary" @click="handleQuery" :disabled="loading"
            >发送
            <loading-outlined v-if="loading" />
          </a-button>
          <a-button
            @click="handleClear"
            type="danger"
            ghost
            style="margin-left: 10px"
            :disabled="loading"
            ><clear-outlined
          /></a-button>
        </div>
      </div>
    </a-col>
  </a-row>
</template>
<script lang="ts" setup>
import { GoogleGenerativeAI } from "@google/generative-ai";
import { computed, ref, nextTick, reactive } from "vue";
import { genimiStore } from "@/store";
import { message } from "ant-design-vue";
import VMdPreview from "@kangc/v-md-editor/lib/preview";
import "@kangc/v-md-editor/lib/style/preview.css";
import vuepressTheme from "@kangc/v-md-editor/lib/theme/vuepress.js";
import "@kangc/v-md-editor/lib/theme/style/vuepress.css";
// Prism
import Prism from "prismjs";
// 代码高亮
import "prismjs/components/prism-json";
import { describe } from "node:test";
import { dateFormat } from "@/utils/utils.ts";
// 选择使用主题
VMdPreview.use(vuepressTheme, {
  Prism,
});

const MODEL_NAME = "gemini-pro";
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genimi_store = genimiStore();
const queryValue = ref("");
const loading = ref(false);
const tempKey = ref();
const currentGroup = ref({});
const editable = ref(false); //编辑状态
//左侧选中的聊天分组的key
const activeGroupKey: any = computed({
  set(val: number) {
    if (val) {
      tempKey.value = val;
    } else {
      tempKey.value = chatGroupData.value[0].t;
    }
  },
  get() {
    return tempKey.value;
  },
});
interface Group {
  t: number;
  title: string;
  chatData: ChatMessage[];
}
const getKey = () => {
  return Date.now();
};
//默认聊天分组

const updateKey = (data: Group) => {
  tempKey.value = data.t;
  currentGroup.value = data;
};
//左侧聊天分组数据
const chatGroupData: any = computed({
  set(val) {
    genimi_store.chatContentList = val;
  },
  get() {
    if (!genimi_store.chatContentList.length) {
      let defaultChatGroup = {
        t: getKey(), //时间戳作为key
        title: "新聊天",
        chatData: [],
      };
      genimi_store.setChatContent(defaultChatGroup);
      updateKey(defaultChatGroup);
    }
    return genimi_store.chatContentList;
  },
});

//右侧沟通内容
const chatHistoryList = computed(() => {
  if (chatGroupData.value) {
    try {
      return chatGroupData.value.filter(
        (item) => item.t === activeGroupKey.value
      )[0].chatData;
    } catch (e) {
      return [];
    }
  } else {
    return [];
  }
});

async function run(generateSearchData: ChatMessage[]) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const result = await model.generateContent({
    contents: generateSearchData,
    generationConfig,
  });
  const response = result.response;
  genimi_store.updateChatContent(
    { text: response.text(), role: "model" },
    activeGroupKey.value
  );
}
const handleQuery = () => {
  if (!queryValue.value) {
    message.error("请输入内容");
    return;
  }
  loading.value = true;
  const generateSearchData: ChatMessage = {
    role: "user",
    text: queryValue.value,
  };
  genimi_store.updateChatContent(generateSearchData, activeGroupKey.value);
  let messages = [];
  chatHistoryList.value.forEach((item: chatMessage) => {
    messages.push({
      parts: [{ text: item.text }],
      role: item.role,
    });
  });

  run(messages)
    .then(() => {
      loading.value = false;
    })
    .catch(() => {
      loading.value = false;
    });
  queryValue.value = "";
};
//添加聊天分组
const handleAddGroup = () => {
  let defaultChatGroup = {
    t: getKey(), //时间戳作为key
    title: "新聊天",
    chatData: [],
  };
  genimi_store.setChatContent(defaultChatGroup);
};
//点击切换聊天分组
const changeChatGroup=(record)=>{
  activeGroupKey.value=record.t;
  currentGroup.value =record;
}
//删除聊天分组
const deleteGroup = (index) => {
  genimi_store.deleteChatGroup(index);
};
//清空查询数据
const handleClear = () => {
  genimi_store.updateChatContent(null, activeGroupKey.value);
};
//格式化日期
const formatDate = (time) => {
  return dateFormat(new Date(time));
};
const goGithub=()=>{
  window.open('https://github.com/echo-scorpio/geminiClient')
}
</script>
<style lang="less" scoped>
.chat-container {
  width: 100%;
  margin: 0 auto;
  height: 100%;
  background-color: #f8f8f9;
  display: flex;
  align-items: center;
  .header {
    background: #fff;
    padding: 10px 20px;
    margin-top: 0px;
    box-shadow: 0 2px 8px #f0f1f2;
  }
  .chat-history {
    height: calc(100vh - 155px);
    min-height: 300px;
    overflow: auto;

    .chat-item {
      margin: 10px;
      padding: 10px;
      background: #f8f8f9;
      cursor: pointer;

      .top {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 15px;
        span {
          color: #fff;
        }
      }
    }
  }
  .chatGroup {
    display: flex;
    flex-direction: column;
    border: 1px dashed #e0e3ea;
    height: 100%;
    overflow: hidden auto;
    padding: 5px;
    flex-shrink: 0;
    .group-contaienr {
      height: calc(100vh - 40px);
      overflow-y: auto;
      margin-bottom: 20px;
      .group-item {
        border-radius: 5px;
        margin: 10px 5px;
        background: #fff;
        padding: 10px;
        position: relative;
        cursor: pointer;
        .close {
          position: absolute;
          top: 0;
          right: 10px;
          display: none;
        }
        &:hover {
          background: #f8f8f9;
          .close {
            display: block;
          }
        }
      }
    }
    .group-footer {
      background: #fff;
      padding: 10px;
    }
  }

  .chat-content {
    display: flex;
    justify-content: center;
    background: #fff;
    height: 50px;
    width: inherit;
    align-items: center;
  }
}
.flex-spb {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.font12 {
  font-size: 12px;
}
.color-grey {
  color: grey;
}
.font14 {
  font-size: 14px;
}
.font16 {
  font-size: 16px;
}
.bold {
  font-weight: bold;
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
.vuepress-markdown-body {
  background-color: #f8f8f9 !important;
}
</style>
