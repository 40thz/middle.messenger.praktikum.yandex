import { IMessage } from '../../services/chat.service/types'
import { IUser } from '../../services/auth.service/types'

export interface State {
  user: {
    data: IUser
    error: string
    isLoading: boolean
  }

  messenger?: {
    isLoading?: boolean
    activeChat?: number | null
    chats?: Chat[]
    users: IChatUsers[]
    messages?: Record<number, IMessage[]>
    isAdmin: boolean
  }

  notification: {
    type: 'error' | 'info' | 'succes'
    content: string
    isActive: boolean
  }
}

export type Chat = {
  id: number
  title: string
  avatar: string
  unread_count: number
  last_message: LastMessage
}

type LastMessage = {
  user: IUser
  time: string
  content: string
}

export interface IChatUsers extends IUser {
  role: string
}
