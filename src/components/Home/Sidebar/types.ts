import { DefaultProps } from '../../../modules/Component/types'
import { State } from '../../../modules/Store/types'

export interface ISidebar extends DefaultProps {
  messenger: State['messenger']
  children: any
}
