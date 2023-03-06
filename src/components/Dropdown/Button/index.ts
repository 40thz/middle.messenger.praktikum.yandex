import Component from '../../../utils/Component'
import { IButton } from './types'
import template from './Button.hbs'

class Button extends Component {
  constructor(props: IButton) {
    super('div', {
      ...props,
    })
  }

  init() {
    this.element.classList.add('menu__elem-dropdown-item')
  }

  toggleDropDown() {
    if (this.element.classList.contains('active')) {
      this.element.classList.remove('active')
    } else {
      this.element.classList.add('active')
    }
  }

  render() {
    return this.compile(template, this.props)
  }
}

export default Button
