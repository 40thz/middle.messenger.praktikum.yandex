import ChatCart from "../ChatCart"

export interface ISidebar {
    children: {
        chats: ChatCart[]
    }
}