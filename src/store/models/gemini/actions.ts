/*
 * @Descripttion: 
 * @version: 
 * @Author: lc
 * @Date: 2024-01-15 16:13:58
 * @LastEditors: lc
 * @LastEditTime: 2024-01-19 17:07:55
 */
export const actions = {
    //设置消息内容
    setChatContent(data: ChatMessage) {
        if (data) {
            this.chatContentList.push(data);
        }
        else {
            {
                this.chatContentList = [];
            }
        }
    },
    // 更新消息
    updateChatContent(data: ChatMessage, key: string) {
        let item = this.chatContentList.find((ele: any) => ele.t === key)
        if (item) {
            if (data) {
                item.chatData.push(data)
            }
            else {
                item.chatData = []
            }
        }


    },
    // 删除消息分组
    deleteChatGroup(index:number){
        this.chatContentList.splice(index,1)
    }
}