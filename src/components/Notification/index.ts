import Component from '../../modules/Component'
import { INotification } from './types'
import store from '../../modules/Store'
import { withStore } from '../../hock/withStore'

class NotificationBase extends Component<INotification> {
  constructor(props: INotification) {
    super('div', props)
  }

  componentDidUpdate() {
    if (this.props.notification.isActive) {
      console.log('render')
      this.element.classList.add(this.props.notification.type)
      this.element.classList.add('active')

      setTimeout(() => {
        store.set('notification.isActive', false)
        this.element.classList.remove('active')

        this.element.classList.remove(this.props.notification.type)
      }, 2000)
    }

    return true
  }

  init() {
    this.element.classList.add('messenger__notification')
  }

  render() {
    return this.compile(() => this.props.notification.content, this.props)
  }
}

export const Notification = withStore((state) => {
  return { notification: state.notification }
})(NotificationBase as any)
