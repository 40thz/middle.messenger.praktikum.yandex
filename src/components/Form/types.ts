import Component from '../../modules/Component'
import { DefaultProps } from '../../modules/Component/types'
import Label from '../Label'

export interface IForm extends DefaultProps {
  className: string
  isProfile?: boolean
  avatar?: string
  name?: string
  isAdmin?: true
  children?: {
    labels: Label[]
    actions: Component[]
    button?: Component
  }
}
