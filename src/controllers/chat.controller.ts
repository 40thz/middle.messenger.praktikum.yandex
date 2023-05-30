import API, { ChatService } from '../services/chat.service'
import { Chat } from '../modules/Store/types'
import messagesController from './messages.controller'
import { setNotification } from '../utils/setNotification'
import store from '../modules/Store'
import wsController from './messages.controller'

class ChatsController {
  private readonly api: ChatService

  constructor() {
    this.api = API
  }

  async setSelectChat(id: number) {
    const { activeChat } = store.getState().messenger

    if (activeChat === id) {
      return
    }

    store.set('messenger.isLoading', true)

    // Проверка на права редактирования
    const users = await this.getChatUsers(id)
    const state = store.getState()
    const user = users.find((user) => user.id === state.user.data.id)
    const isAdmin = user.role === 'admin'
    // Проверка на права редактирования //

    store.set('messenger.isLoading', false)

    store.set('messenger.activeChat', id)
    store.set('messenger.users', users)
    store.set('messenger.isAdmin', isAdmin)
  }

  async getChatUsers(id: number) {
    try {
      const data = await this.api.getChatUsers(id)

      return data
    } catch (e) {
      console.error(e)

      setNotification({ value: 'Что то пошло не так...', type: 'error' })
    }
  }

  async fetchChats(data?: Chat[]) {
    store.set('messenger', { isLoading: true })

    const chats = await this.api.read()

    const dataChats = data ? data : chats

    store.set('messenger', {
      chats: dataChats,
      isLoading: false,
    })

    dataChats.map(async (chat) => {
      try {
        const res = await this.api.getToken(chat.id)

        await wsController.connect(chat.id, res.token)
      } catch (e) {
        console.error(e)

        setNotification({ value: 'Что то пошло не так...', type: 'error' })
      }
    })
  }

  async deleteUsersFromChat(chatID: number, usersID: number[]) {
    try {
      await this.api.deleteUsersFromChat(chatID, usersID)

      const users = await this.getChatUsers(chatID)

      store.set('messenger.users', users)

      setNotification({ value: 'Пользователи успешно удалены', type: 'succes' })
    } catch (e) {
      console.error(e)

      setNotification({ value: 'Что то пошло не так...', type: 'error' })
    }
  }

  async addUsersToChat(chatID: number, usersID: number[]) {
    try {
      await this.api.addUsersToChat(chatID, usersID)

      const users = await this.getChatUsers(chatID)

      store.set('messenger.users', users)

      setNotification({ value: 'Пользователи успешно добавлены', type: 'succes' })
    } catch (e) {
      console.error(e)
    }
  }

  async changeChatAvatar(formData: FormData) {
    try {
      await this.api.changeChatAvatar(formData)

      this.fetchChats()

      setNotification({ value: 'Изображение чата успешно обновлено', type: 'succes' })
    } catch (e) {
      console.error(e)

      setNotification({ value: 'Что то пошло не так...', type: 'error' })
    }
  }

  async create(title: string) {
    try {
      const { id } = await this.api.create(title)

      this.fetchChats()

      this.setSelectChat(id)

      setNotification({ value: `Чат "${title}" успешно создан`, type: 'succes' })
    } catch (e) {
      console.error(e)

      setNotification({ value: 'Что то пошло не так...', type: 'error' })
    }
  }

  async delete(id: string) {
    try {
      await this.api.delete(id)

      this.fetchChats()

      store.set('messenger.activeChat', null)

      setNotification({ value: `Чат успешно удален`, type: 'succes' })
    } catch (e) {
      console.error(e)

      setNotification({ value: 'Что то пошло не так...', type: 'error' })
    }
  }

  async findChatsByTitle(title: string) {
    messagesController.closeAll()

    const chats = await this.api.findChatsByTitle(title)

    await this.fetchChats(chats)

    store.set('messenger.activeChat', null)
  }
}

export default new ChatsController()
