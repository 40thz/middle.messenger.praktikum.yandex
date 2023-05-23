import ChatMessage from './Message'
import Component from '../../../modules/Component'
import HeaderChat from './HeaderChat'
import { IChat } from './types'
import Input from '../../Input'
import Message from '../Message'
import Sendmessage from './Sendmessage'
import { isEqual } from '../../../utils/isEqual'
import messagesController from '../../../controllers/messages.controller'
import template from './Chat.hbs'
import { withStore } from '../../../hoc/withStore'

class ChatBase extends Component<IChat> {
  constructor(props: IChat) {
    super('div', { ...props })
  }

  init() {
    this.element.classList.add('messenger__home-content')
    this.children = { ...this.props.children }
  }

  componentDidUpdate(oldProps: IChat, newProps: IChat) {
    if (isEqual(oldProps, newProps)) {
      return false
    }

    return true
  }

  createMessages() {
    return this.props.messages.map((message) => {
      return new ChatMessage({
        value: message.content,
        me: message.user_id === this.props.user.id,
        name: message.user.display_name,
        time: message.time,
      })
    })
  }

  render() {
    if (this.props.activeChat !== null) {
      this.children.messages = this.createMessages()

      this.children.header = new HeaderChat({})

      this.children.sendMessage = new Sendmessage({
        events: {
          submit: (e: Event) => {
            e.preventDefault()
            const input = (this.children.sendMessage as any).children.input
            const message = (input as Input).getValue()
            const chatId = this.props.activeChat

            if (!message) return

            messagesController.sendMessage(chatId, message)

            return (input as Input).clear()
          },
        },
      })
    }
    this.children.chatIsNotFound = new Message({})
    return this.compile(template, { ...this.props })
  }
}

const withChats = withStore((state) => {
  const activeChatId = state.messenger.activeChat

  if (!activeChatId) {
    return {
      messages: [],
      activeChat: null,
      user: state.user.data,
    }
  }

  const messages = (state.messenger.messages || {})[activeChatId] || []

  const messagesWithUsers = messages.map((message) => {
    const user = state.messenger.users.find((user) => user.id === message.user_id)
    return {
      ...message,
      user,
    }
  })
  return {
    messages: messagesWithUsers,
    activeChat: activeChatId,
  }
})

export const Chat = withChats(ChatBase as any)
