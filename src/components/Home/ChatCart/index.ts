import Component from '../../../modules/Component'
import { IChatCart } from './types'
import { checkAvatarUrl } from '../../../utils/checkAvatarUrl'
import { formatDate } from '../../../utils/formatDate'
import template from './ChatCart.hbs'

class ChatCart extends Component<IChatCart> {
  constructor(props: IChatCart) {
    super('div', { ...props })
  }

  init() {
    this.props.avatar = checkAvatarUrl(this.props.avatar)

    if (this.props.last_message?.time) {
      this.props.time = formatDate(this.props.last_message.time)
    }

    this.element.classList.add('messenger__home-sidebar-chats-chat')
  }

  render() {
    return this.compile(template, { ...this.props })
  }
}

export default ChatCart
