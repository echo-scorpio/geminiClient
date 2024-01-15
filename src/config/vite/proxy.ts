/*
 * @Descripttion: 
 * @version: 
 * @Author: lc
 * @Date: 2023-12-18 14:29:17
 * @LastEditors: lc
 * @LastEditTime: 2023-12-18 17:39:29
 */
import {
    API_BASE_URL,
    API_TARGET_URL,
    MOCK_API_BASE_URL,
    MOCK_API_TARGET_URL,
  } from '../constant';
  import type { ProxyOptions } from 'vite';
  
  type ProxyTargetList = Record<string, ProxyOptions>;
  
  const ret: ProxyTargetList = {
    // test
    [API_BASE_URL]: {
      target: API_TARGET_URL,
      changeOrigin: true,
      rewrite: (path) => path.replace(new RegExp(`^${API_BASE_URL}`), ''),
    },
    // mock
    [MOCK_API_BASE_URL]: {
      target: MOCK_API_TARGET_URL,
      changeOrigin: true,
      rewrite: (path) => path.replace(new RegExp(`^${MOCK_API_BASE_URL}`), '/api'),
    },
  };  
  export default ret;