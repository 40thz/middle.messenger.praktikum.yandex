import { EventBus } from '../eventBus'
import { State } from './types'
import { set } from '../../utils/helpers'

export enum StoreEvents {
  Updated = 'updated',
}

export class Store extends EventBus {
  private state: State = {
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
  }

  public set(keypath: string, data: unknown) {
    try {
      set(this.state, keypath, data)

      this.emit(StoreEvents.Updated, this.getState())
    } catch (e) {}
  }

  public getState() {
    return this.state
  }
}

const store = new Store()

window.store = store.getState()

export default store
