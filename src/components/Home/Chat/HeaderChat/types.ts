import { DefaultProps } from '../../../../modules/Component/types'

export interface IHeaderChat extends DefaultProps {
  name: string
  avatar: string
  isAdmin?: boolean
  chatId?: string
}
