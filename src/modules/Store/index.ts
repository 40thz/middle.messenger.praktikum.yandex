import { EventBus } from '../eventBus'

import { set } from '../../utils/helpers'
import { state } from './state'

export enum StoreEvents {
  Updated = 'updated',
}

export class Store extends EventBus {
  private state = { ...state }

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
