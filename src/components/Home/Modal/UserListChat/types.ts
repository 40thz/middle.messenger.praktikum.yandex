import { DefaultProps } from '../../../../modules/Component/types'
import { IChatUsers } from '../../../../modules/Store/types'

export interface IUserListChat extends DefaultProps {
  userID: number
  chatID: number
  users: IChatUsers[]
  name: string
  img: string
  isAdmin?: boolean
}
