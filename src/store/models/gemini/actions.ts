/*
 * @Descripttion: 
 * @version: 
 * @Author: lc
 * @Date: 2024-01-15 16:13:58
 * @LastEditors: lc
 * @LastEditTime: 2024-01-15 16:19:19
 */
export const actions = {
    setChatContent(data:ChatMessage) {
        if (data) {
            this.chatContentList.push(data);
        }
        else {
            {
                this.chatContentList = [];
            }
        }
    }
}