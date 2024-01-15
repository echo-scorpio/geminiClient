/*
 * @Descripttion: 
 * @version: 
 * @Author: lc
 * @Date: 2024-01-15 15:04:45
 * @LastEditors: lc
 * @LastEditTime: 2024-01-15 15:04:58
 */
declare interface ChatPart {
    text: string
  }
  
  declare interface ChatMessage {
    role: 'model' | 'user'
    parts: ChatPart[]
  }
  
  declare interface ErrorMessage {
    code: string
    message: string
  }
  