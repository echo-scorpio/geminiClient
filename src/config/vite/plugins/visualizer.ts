/*
 * @Descripttion: 
 * @version: 
 * @Author: lc
 * @Date: 2023-12-18 13:43:13
 * @LastEditors: lc
 * @LastEditTime: 2023-12-18 13:50:24
 */
/**
 * Package file volume analysis
 */
import {visualizer} from 'rollup-plugin-visualizer';
import { ANALYSIS } from '../../constant';

export function configVisualizerConfig() {
  if (ANALYSIS) {
    return visualizer({
      filename: './node_modules/.cache/visualizer/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    }) as Plugin;
  }
  return [];
}
