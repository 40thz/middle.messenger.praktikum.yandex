import Button from './Button'
import { DefaultProps } from '../../modules/Component/types'

export interface IDropdown extends DefaultProps {
  icon: string
  children: {
    buttons: Button[]
  }
}
