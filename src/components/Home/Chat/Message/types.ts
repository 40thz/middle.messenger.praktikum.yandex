import { DefaultProps } from '../../../../modules/Component/types'

export interface IMessage extends DefaultProps {
  value?: string
  img?: string
  me?: boolean
  date?: string
  name: string
  time: string
}
