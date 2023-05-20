import Component from '../../modules/Component'
import { IUserCart } from './types'
import { checkAvatarUrl } from '../../utils/checkAvatarUrl'

import template from './UserCart.hbs'

export default class UserCart extends Component<IUserCart> {
  constructor(props: IUserCart) {
    super('div', { ...props })
  }

  init() {
    this.element.classList.add('user__cart')

    this.props.avatar = checkAvatarUrl(this.props.avatar)

    this.props.events = {
      click: () => {
        this.setProps({
          ...this.props,
          isActive: !this.props.isActive,
        })

        this.render()
      },
    }
  }

  getStatus() {
    const isActive = this.props.isActive

    if (isActive) {
      return {
        ...this.props,
      }
    } else {
      return
    }
  }

  render() {
    const isActive = this.props.isActive
    const elem = this.element

    isActive ? elem.classList.add('active') : elem.classList.remove('active')

    return this.compile(template, { ...this.props })
  }
}
