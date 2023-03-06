import Component from '../../../../utils/Component'
import { IMessage } from './types'

import template from './Message.hbs'

class ChatMessage extends Component {
  constructor(props: IMessage) {
    super('div', {
      ...props,
    })
  }

  init() {
    this.element.classList.add('messenger__home-content-chat-message')
    this.props.me && this.element.classList.add('me')
    this.props.img && this.element.classList.add('img')
  }

  render() {
    return this.compile(template, { ...this.props })
  }
}

export default ChatMessage
