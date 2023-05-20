import { Chat } from '../../../modules/Store/types'

export interface IChatCart extends Chat {
  time?: string

  events?: {
    [key in keyof HTMLElementEventMap]?: EventListenerOrEventListenerObject
  }
}
