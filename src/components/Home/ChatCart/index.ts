import Component from '../../../utils/Component'
import { IChatCart } from './types'

import template from './ChatCart.hbs'

class ChatCart extends Component {
  constructor(props: IChatCart) {
    super('div', { ...props })
  }

  init() {
    this.element.classList.add('messenger__home-sidebar-chats-chat')
  }

  render() {
    return this.compile(template, { ...this.props })
  }
}

export default ChatCart
