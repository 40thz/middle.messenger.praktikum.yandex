import { DefaultProps } from '../../../../modules/Component/types'
import { IUser } from '../../../../services/auth.service/types'

export interface IUserControl extends DefaultProps {
  name: string
  isChat?: boolean

  users: IUser[]
  chatID?: number
  buttonValue?: string
}
