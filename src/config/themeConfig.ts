/*
 * @Descripttion: 
 * @version: 
 * @Author: lc
 * @Date: 2023-12-29 10:33:03
 * @LastEditors: lc
 * @LastEditTime: 2023-12-29 10:35:33
 */
import { getThemeVariables } from 'ant-design-vue/dist/theme';
export function generateModifyVars(dark = false) {
    const modifyVars = getThemeVariables({ dark });
    return {
      ...modifyVars,
      'primary-color': '#3860F4',
      'link-color': '#3860F4',
    };
  }