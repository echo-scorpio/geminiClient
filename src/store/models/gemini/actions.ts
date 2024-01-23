/*
 * @Descripttion: 
 * @version: 
 * @Author: lc
 * @Date: 2024-01-15 16:13:58
 * @LastEditors: lc
 * @LastEditTime: 2024-01-23 14:14:08
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
    // 更新分组内容
    updateChatContent(data: ChatMessage, key: string) {
        let item = this.chatContentList.find((ele: any) => ele.t === key)
        if (item) {
            if (data) {
                item.chatData.push(data)
                return data.key;
            }
            else {
                item.chatData = []
                return null;
            }
        }
    },
    // 删除消息分组
    deleteChatGroup(index:number){
        this.chatContentList.splice(index,1)
    },
    //更新消息
    updateMessage(str:string,groupKey:string,messageKey:string){
        const item = this.chatContentList.find((ele: any) => ele.t === groupKey)
        if(item){
            console.log(item,'**********item')
            const messageItem=item.chatData.find(ele=>ele.key===messageKey)
            if(messageItem){
                messageItem.text+=str;
            }
        }
    }
}