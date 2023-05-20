import Component from '../../modules/Component'
import { IEvents } from '../../types'

export interface IModal {
  children?: {
    body: Component
  }
  events?: IEvents
}
