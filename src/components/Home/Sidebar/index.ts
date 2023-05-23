import ChatCart from '../ChatCart'
import Component from '../../../modules/Component'
import { ISidebar } from './types'
import Search from '../Search'
import chatController from '../../../controllers/chat.controller'
import template from './SideBar.hbs'
import { withStore } from '../../../hoc/withStore'

class BaseSidebar extends Component<ISidebar> {
  constructor(props: ISidebar) {
    super('div', {
      ...props,
    })
  }

  componentDidUpdate(): boolean {
    const messenger = this.props.messenger

    if (messenger.isLoading) {
      return
    }

    this.children.chats = this.createChatItem(messenger)

    return true
  }

  init() {
    this.children = { ...this.props.children }

    this.children.Search = new Search({})

    this.element.classList.add('messenger__home-sidebar')
  }

  createChatItem(messenger) {
    const { chats = [] } = messenger

    return chats.map((chat) => {
      return new ChatCart({
        ...chat,
        events: {
          click: () => {
            chatController.setSelectChat(chat.id)
          },
        },
      })
    })
  }

  render() {
    return this.compile(template, this.props)
  }
}

const withChats = withStore((state) => {
  return { messenger: state.messenger }
})

export const Sidebar = withChats(BaseSidebar as any)
