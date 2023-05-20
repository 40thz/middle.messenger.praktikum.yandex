import Component from '../../../modules/Component'
import { IChatAvatar } from './types'
import Modal from '../../Modal'
import { UserListChat } from '../Modal/UserListChat'
import { checkAvatarUrl } from '../../../utils/checkAvatarUrl'
import template from './ChatAvatar.hbs'
import { withStore } from '../../../hoc/withStore'

class ChatAvatarBase extends Component<IChatAvatar> {
  constructor(props: IChatAvatar) {
    super('div', props)
  }

  init() {
    this.element.classList.add('messenger__home-content-header-user')
    this.children.modal = new Modal({})

    this.props.avatar = checkAvatarUrl(this.props.chat.avatar)

    this.props.events = {
      click: (e: Event) => {
        e.stopPropagation()

        this.showModal()
      },
    }
  }

  showModal() {
    const modal: Modal = this.children.modal as Modal

    modal.open()

    modal.setProps({
      children: {
        body: new UserListChat({
          name: this.props.chat.title,
          img: this.props.chat.avatar,
          chatID: this.props.chatID,
        }),
      },
    })
  }

  componentDidUpdate(): boolean {
    return true
  }

  render() {
    return this.compile(template, this.props)
  }
}

export const ChatAvatar = withStore((state) => {
  const chatID = state.messenger.activeChat

  const chat = state.messenger.chats.find((item) => item.id === chatID) || {}

  return {
    chatID,
    chat,
    userLength: state.messenger.users.length,
  }
})(ChatAvatarBase as any)
