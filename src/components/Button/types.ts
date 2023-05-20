import { DefaultProps } from '../../modules/Component/types'
import { IEvents } from '../../types'

export interface IButton extends DefaultProps {
  value: string
  events?: IEvents
}
