/*
 * @Descripttion: 
 * @version: 
 * @Author: lc
 * @Date: 2023-12-18 09:44:45
 * @LastEditors: lc
 * @LastEditTime: 2023-12-29 10:06:08
 */
/*
 * @Descripttion: 
 * @version: 
 * @Author: lc
 * @Date: 2023-12-18 09:44:45
 * @LastEditors: lc
 * @LastEditTime: 2023-12-18 16:20:23
 */
import axios, { AxiosError, } from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, } from 'axios'
import { getToken } from '@/utils/auth';
import { API_PREFIX } from '@/config/constant'
import { message } from 'ant-design-vue';
import Qs from 'qs';

const BASE_URL = import.meta.env.MODE === 'development' ? API_PREFIX : '';

const instance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    timeout: 10000,
    paramsSerializer: (params) => {
        //是一个负责 `params` 序列化的函数
        return Qs.stringify(params, { indices: false }); //将对象系列化成URL形式,并用&拼接
    },
});
//请求拦截
instance.interceptors.request.use((config: any) => {
    const token = getToken();
    if (token) {
        config.headers = {
            ...config.headers,
            Authorization: token,
        };
        // config.headers['Authorization'] = token;
    }
    return config;
}),
    ((error: AxiosError) => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 401 清除token信息并跳转到登录页面
                    // @ts-ignore
                    window.location.href = '/#/login';
                    break;
                case 403:
                // 403 清除token信息并跳转到登录页面
            }
        }
        return Promise.reject(error.response?.data);
    })

//响应拦截
instance.interceptors.response.use((response: AxiosResponse) => {
    const res = response.data as ResData<any>;
    if (res.status_code === '0000') {
        return res || true;
    }
    if (res.code == '307') {
        //用户信息失效，退出登录
    }
    return response.data;
},
    (error: AxiosError) => {
        message.error(error.message);
    })
const request = <T = any>(config: AxiosRequestConfig | string, options?: AxiosRequestConfig): Promise<T> => {
    if (typeof config === 'string') {
        if (!options) {
            return instance.request<T, T>({ url: config })
        }
        else {
            return instance.request<T, T>({ url: config, ...options })
        }
    }
    else {
        return instance.request<T, T>(config)
    }
}
export function get<T = any>(config: AxiosRequestConfig | string, options?: AxiosRequestConfig): Promise<T> {
    if (typeof config === 'string') {
        return request({ url: config, method: 'GET', data: options })
    }
    return request({ ...config, method: 'GET',data: options });
}

export function post<T = any>(
    config: AxiosRequestConfig | string,
    options?: AxiosRequestConfig,
): Promise<T> {
    if (typeof config === 'string') {
        return request({ url: config, method: 'POST', data: options })
    }
    return request({ ...config, method: 'POST',data: options });
}

export default request;
export type { AxiosInstance, AxiosResponse };



