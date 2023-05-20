import { Chat } from '../../../modules/Store/types'
import { DefaultProps } from '../../../modules/Component/types'

export interface IChatAvatar extends DefaultProps {
  chatID: number
  chat: Chat
  avatar: string
  userLength: number
}
