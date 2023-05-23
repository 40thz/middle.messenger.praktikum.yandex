import Component from '../../modules/Component'
import { withStore } from '../../hoc/withStore'

class MessengerLoaderBase extends Component {
  constructor(props) {
    super('div', { ...props })
  }

  init() {
    this.element.classList.add('messenger__loader')
  }

  componentDidUpdate(oldProps: any, newProps: any): boolean {
    const isLoading = newProps.isLoading

    if (isLoading) {
      this.loaderStarted()
    } else {
      this.loaderStopped()
    }

    return true
  }

  loaderStarted() {
    this.element.style.display = 'block'
    this.element.style.animationDuration = '1s'
  }

  loaderStopped() {
    setTimeout(() => {
      this.element.style.display = 'none'
    }, 800)
  }
}

export const MessengerLoader = withStore((state) => {
  return { isLoading: state.messenger.isLoading }
})(MessengerLoaderBase)
