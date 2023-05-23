import { Chat, IChatUsers } from '../../../modules/Store/types'
import { DefaultProps } from '../../../modules/Component/types'
import { IMessage } from '../../../services/chat.service/types'
import { IUser } from '../../../services/auth.service/types'

interface IMessagesWithUser extends IMessage {
  user: IUser
}
export interface IChat extends DefaultProps {
  messages: IMessagesWithUser[]
  chat: Chat
  activeChat: number
  user: IUser
  users: IChatUsers[]
  children: any
}
