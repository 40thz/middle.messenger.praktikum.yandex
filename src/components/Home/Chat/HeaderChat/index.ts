import Button from '../../../Dropdown/Button'
import { ChatAvatar } from '../../ChatAvatar'
import Component from '../../../../modules/Component'
import Dropdown from '../../../Dropdown'
import { IHeaderChat } from './types'
import Modal from '../../../Modal'
import UserControl from '../UserControl'
import chatController from '../../../../controllers/chat.controller'
import dropDownIcon from '../../../../../static/Home/Chat/headerIcon.svg'
import icon1 from '../../../../../static/Home/Chat/addIcon.svg'
import icon2 from '../../../../../static/Home/Chat/removeIcon.svg'
import template from './HeaderChat.hbs'
import { withStore } from '../../../../hoc/withStore'

class HeaderChatBase extends Component<IHeaderChat> {
  constructor(props: IHeaderChat) {
    super('div', {
      ...props,
    })
  }

  init() {
    this.children.avatar = new ChatAvatar({})
    const buttons = []

    buttons.push(
      new Button({
        icon: icon1,
        name: 'Добавить пользователя',
        events: {
          click: () => {
            this.showModal('Добавить пользователя', 'Добавить')
          },
        },
      })
    )

    if (this.props.isAdmin) {
      buttons.push(
        new Button({
          icon: icon2,
          name: 'Удалить чат',
          events: {
            click: () => {
              const isRemoving = confirm('После подтверждения чат удалиться.')

              if (isRemoving) {
                chatController.delete(this.props.chatId)
              }
            },
          },
        })
      )
    }

    this.children.dropdown = new Dropdown({
      icon: dropDownIcon,
      children: {
        buttons,
      },
    })

    this.children.modal = new Modal({})

    this.element.classList.add('messenger__home-content-header')
  }

  showModal(name: string, buttonValue: string) {
    const modal: Modal = this.children.modal as Modal

    modal.open()

    modal.setProps({
      children: {
        body: new UserControl({
          name,
          buttonValue,
        }),
      },
    })
  }

  render() {
    return this.compile(template, this.props)
  }
}

export const HeaderChat = withStore((state) => {
  return {
    chatId: state.messenger.activeChat,
    isAdmin: state.messenger.isAdmin,
  }
})(HeaderChatBase as any)

export default HeaderChat
