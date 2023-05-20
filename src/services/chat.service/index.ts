import { Chat, IChatUsers } from '../../modules/Store/types'
import { IUser } from '../auth.service/types'
import http from '../../http'

export class ChatService extends http {
  constructor() {
    super('/chats')
  }

  read(): Promise<Chat[]> {
    return this.http.get('/')
  }

  create(title: string): Promise<{ id: number }> {
    return this.http.post('/', { title })
  }

  delete(id: string) {
    return this.http.delete('/', { chatId: id })
  }

  findChatsByTitle(title: string): Promise<Chat[]> {
    return this.http.get(`/?title=${title}`)
  }

  getToken(id: number): Promise<{ token: string }> {
    return this.http.post(`/token/${id}`)
  }

  addUsersToChat(chatId: number, usersID: number[]) {
    return this.http.put('/users', { users: usersID, chatId })
  }

  deleteUsersFromChat(chatId: number, usersID: number[]) {
    return this.http.delete('/users', { users: usersID, chatId })
  }

  getChatUsers(id: number): Promise<IChatUsers[]> {
    return this.http.get(`/${id}/users`)
  }

  changeChatAvatar(formdata: FormData) {
    return this.http.put('/avatar', formdata, 'FormData')
  }

  update = undefined
}

export default new ChatService()
