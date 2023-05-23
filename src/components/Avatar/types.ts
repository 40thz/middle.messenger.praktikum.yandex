import { DefaultProps } from '../../modules/Component/types'

export interface IAvatar extends DefaultProps {
  img: string
  name: string
  isAdmin: boolean
  isProfile?: boolean
  chatID?: number
}
