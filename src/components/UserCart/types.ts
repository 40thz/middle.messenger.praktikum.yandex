import { DefaultProps } from '../../modules/Component/types'

export interface IUserCart extends DefaultProps {
  id: number
  avatar: string
  name: string
  isActive?: boolean
}
