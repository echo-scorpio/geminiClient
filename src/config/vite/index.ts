/*
 * @Descripttion: 
 * @version: 
 * @Author: lc
 * @Date: 2023-12-18 11:24:08
 * @LastEditors: lc
 * @LastEditTime: 2024-01-15 17:32:47
 */
import vue from '@vitejs/plugin-vue';
import { configVisualizerConfig } from './plugins/visualizer'

export const getPlugins = (isBuild: boolean) => {
    return [
        vue(),
        configVisualizerConfig(),
    ]
}