import ChatMessage from "./Message"

export interface IChat {
    children: {
        chatMessages: ChatMessage[]
    }
}