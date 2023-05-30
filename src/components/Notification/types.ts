import { DefaultProps } from '../../modules/Component/types'
import { State } from '../../modules/Store/types'

export interface INotification extends DefaultProps {
  notification: State['notification']
}
