import Component from '../../modules/Component'
import { IButton } from './types'
import template from './Button.hbs'

class Button extends Component<IButton> {
  constructor(props: IButton) {
    super('button', props)
  }

  init() {
    this.element.classList.add('messenger__button')
    this.element.setAttribute('type', 'submit')
  }

  render() {
    return this.compile(template, this.props)
  }
}

export default Button
