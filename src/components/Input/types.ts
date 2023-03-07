import { IEvents } from "../../types"

export interface IInput {
  className?: string
  name: string,
  type?: string,
  value?: string,
  placeholder?: string,
  disabled?: boolean
  events?: IEvents
  hidden?: boolean
  isProfile?: boolean
}
