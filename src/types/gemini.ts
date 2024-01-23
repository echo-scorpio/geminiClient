/*
 * @Descripttion: 
 * @version: 
 * @Author: lc
 * @Date: 2024-01-15 15:04:45
 * @LastEditors: lc
 * @LastEditTime: 2024-01-23 14:05:53
 */
declare interface ChatPart {
    text: string
  }
  
  declare interface ChatMessage {
    role: 'model' | 'user'
    parts: ChatPart[],
    key:number
  }
  
  declare interface ErrorMessage {
    code: string
    message: string
  }
  