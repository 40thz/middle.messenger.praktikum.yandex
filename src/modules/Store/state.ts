import { State } from './types'

export const state: State = {
  user: {
    data: {
      id: 0,
      first_name: '',
      second_name: '',
      display_name: '',
      login: '',
      email: '',
      phone: '',
      avatar: '',
    },
    error: '',
    isLoading: false,
  },

  messenger: {
    isLoading: false,
    activeChat: null,
    chats: [],
    users: [],
    messages: {},
    isAdmin: false,
  },

  notification: {
    type: 'info',
    content: '',
    isActive: false,
  },
}
