import Button from '../../../Button'
import Component from '../../../../modules/Component'
import { IUser } from '../../../../services/auth.service/types'
import { IUserControl } from './types'
import Label from '../../../Label'
import UserCart from '../../../UserCart'
import chatController from '../../../../controllers/chat.controller'
import { debounce } from '../../../../utils/debounce'
import template from './UserControl.hbs'
import userService from '../../../../services/user.service'
import { withStore } from '../../../../hock/withStore'

class UserControlBase extends Component<IUserControl> {
  constructor(props: IUserControl) {
    super('form', { ...props })
  }

  init() {
    const isChat = this.props.isChat
    this.element.classList.add('profile__avatarModal')

    this.children.button = new Button({
      value: this.props.buttonValue,
    })

    if (!isChat) {
      const searchUsersProcess = debounce(() => this.searchUsers(), 1000)

      this.children.input = new Label({
        name: 'login',
        type: 'text',
        label: 'Логин',
        onChange: async () => {
          searchUsersProcess()
        },
      })

      this.props.events = {
        submit: (e) => {
          e.preventDefault()
          this.addSelectedUsersToChat()
        },
      }
    }

    if (isChat) {
      this.children.input = new Label({
        name: 'chatname',
        type: 'text',
        label: 'Название чата',
      })

      this.props.events = {
        submit: async (e) => {
          e.preventDefault()

          const { value } = this.getValue()

          await chatController.create(value)

          document.querySelector('.modal').classList.add('hide')
        },
      }
    }
  }

  async searchUsers() {
    const { value } = this.getValue()

    const users = await userService.searchUsersByLogin(value)

    this.setProps({
      ...this.props,
      users,
    })
  }

  getValue() {
    return {
      value: this.element.querySelector('input').value,
    }
  }

  generateUserChatList(users: IUser[]) {
    return users.map((user) => {
      return new UserCart({
        id: user.id,
        avatar: user.avatar,
        name: user.login,
      })
    })
  }

  componentDidUpdate(_: IUserControl, newProps: IUserControl): boolean {
    const users = newProps.users

    if (users) {
      this.children.users = this.generateUserChatList(users)
    }

    return true
  }

  addSelectedUsersToChat() {
    const isRemoving = confirm('Подтверить добавление пользовалтелей.')

    const users: UserCart[] = this.children.users as UserCart[]
    const selectedUsers = []

    if (isRemoving) {
      for (const user of users) {
        const userStatus = user.getStatus()

        if (userStatus !== undefined) {
          selectedUsers.push(userStatus.id)
        }
      }

      chatController.addUsersToChat(this.props.chatID, selectedUsers)
    }
  }

  render() {
    return this.compile(template, this.props)
  }
}

export const UserControl = withStore((state) => {
  return {
    chatID: state.messenger.activeChat,
  }
})(UserControlBase as any)

export default UserControl
