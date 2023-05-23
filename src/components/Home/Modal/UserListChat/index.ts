import Avatar from '../../../Avatar'
import Button from '../../../Button'
import Component from '../../../../modules/Component'
import { IUser } from '../../../../services/auth.service/types'
import { IUserListChat } from './types'
import UserCart from '../../../UserCart'
import chatController from '../../../../controllers/chat.controller'
import template from './UserListChat.hbs'
import { withStore } from '../../../../hoc/withStore'

class UserListChatBase extends Component<IUserListChat> {
  constructor(props: IUserListChat) {
    super('div', { ...props })
  }

  async componentDidMount() {
    this.children.avatar = new Avatar({
      name: this.props.name,
      img: this.props.img,
      isAdmin: this.props.isAdmin,
    })

    this.children.button = new Button({
      value: 'Удалить выбранных пользователей',
      events: {
        click: () => {
          this.deleteSelectedUsers()
        },
      },
    })

    this.setProps({
      ...this.props,
      users: this.props.users,
    })
  }

  protected componentDidUpdate(
    oldProps: IUserListChat,
    newProps: IUserListChat
  ) {
    this.children.users = this.generateUserChatList(newProps.users)

    return true
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

  deleteSelectedUsers() {
    const isRemoving = confirm('Подтверить удаление пользовалтеля.')

    const users: UserCart[] = this.children.users as UserCart[]
    const usersToDelete = []

    if (isRemoving) {
      for (const key of users) {
        const userStatus = key.getStatus()

        if (userStatus !== undefined) {
          usersToDelete.push(userStatus.id)
        }
      }

      chatController.deleteUsersFromChat(this.props.chatID, usersToDelete)
    }
  }

  render() {
    return this.compile(template, this.props)
  }
}

export const UserListChat = withStore((state) => {
  return {
    isAdmin: state.messenger.isAdmin,
    users: state.messenger.users,
    chatID: state.messenger.activeChat,
  }
})(UserListChatBase as any)
