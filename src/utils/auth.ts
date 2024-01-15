/*
 * @Descripttion: 
 * @version: 
 * @Author: lc
 * @Date: 2023-12-18 09:58:39
 * @LastEditors: lc
 * @LastEditTime: 2023-12-21 13:52:11
 */
const TokenKey = 'x-auth-token';

export function getToken() {
  return localStorage.getItem(TokenKey) || '';
}

export function setToken(token: string) {
  localStorage.setItem(TokenKey, token);
}

export function removeToken() {
  localStorage.setItem(TokenKey, '');
}

//获取cookie
export function getCookie(cname: string) {
  const name = cname + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1);
    if (c.indexOf(name) !== -1) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

//设置cookie
export function setCookie(cname: string, cvalue: string, exdays: number) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = 'expires=' + d.toUTCString();
  document.cookie = cname + '=' + cvalue + '; ' + expires;
}

