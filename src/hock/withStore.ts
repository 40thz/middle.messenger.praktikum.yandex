import store, { StoreEvents } from '../modules/Store'
import Block from '../modules/Component'
import { DefaultProps } from '../modules/Component/types'
import { State } from '../modules/Store/types'

export function withStore<T>(mapStateToProps: (state: State) => T) {
  return function (Component: typeof Block<T & DefaultProps>): any {
    return class extends Component {
      // eslint-disable-next-line
      constructor(props: any) {
        let state = mapStateToProps(store.getState())

        super({ ...props, ...state })

        store.on(StoreEvents.Updated, () => {
          const newState = mapStateToProps(store.getState())

          this.setProps({ ...newState })

          state = newState
        })
      }
    }
  }
}
