import chatmessage from "./Message"

export interface IChat {
    children: {
        chatMessages: chatmessage[]
    }
}
