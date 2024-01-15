/*
 * @Descripttion: 
 * @version: 
 * @Author: lc
 * @Date: 2023-12-12 09:12:11
 * @LastEditors: lc
 * @LastEditTime: 2023-12-29 10:36:28
 */
import { fileURLToPath, URL } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'
import {getPlugins} from './src/config/vite/index.ts'
import proxy from './src/config/vite/proxy';
import {VITE_PORT} from './src/config/constant.ts'
import {generateModifyVars} from './src/config/themeConfig.ts'
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const isBuild = command === 'build' //是否是生产环境  
  return {
    plugins: getPlugins(isBuild),
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('src', import.meta.url))
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: generateModifyVars(),
          javascriptEnabled: true,
        },
      },
    },
    server: {
      hmr: { overlay: false }, // 禁用或配置 HMR 连接 设置 server.hmr.overlay 为 false 可以禁用服务器错误遮罩层
      // 服务配置
      port: VITE_PORT, // 类型： number 指定服务器端口;
      open: false, // 类型： boolean | string在服务器启动时自动在浏览器中打开应用程序；
      cors: false, // 类型： boolean | CorsOptions 为开发服务器配置 CORS。默认启用并允许任何源
      // host: '0.0.0.0', // IP配置，支持从IP启动
      proxy,
    },
  }

})
