import { DefaultProps } from '../../modules/Component/types'
import { State } from '../../modules/Store/types'

export interface IProfilePage extends DefaultProps {
  user: State['user']
}
