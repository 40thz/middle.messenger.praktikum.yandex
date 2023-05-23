import { DefaultProps } from '../../modules/Component/types'

export interface ILabel extends DefaultProps {
  name: string
  type?: string
  label?: string
  value?: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
  regex?: string
  error_text?: string
  isProfile?: boolean
  onChange?: () => void
}
