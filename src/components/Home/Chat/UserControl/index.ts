import Button from '../../../Button'
import Component from '../../../../utils/Component'
import { IUserControl } from './types'
import Label from '../../../Label'

import template from './UserControl.hbs'

class UserControl extends Component {
  constructor(props: IUserControl) {
    super('form', { ...props })
  }

  init() {
    this.element.classList.add('profile__avatarModal')

    this.props.events = {
      submit: (e) => {
        e.preventDefault()
        console.log(this.getValue())
      },
    }

    this.children.input = new Label({
      name: 'login',
      type: 'text',
      label: 'Логин',
    })

    this.children.button = new Button({
      value: this.props.buttonValue,
    })
  }

  getValue() {
    return {
      value: this.element.querySelector('input').value,
    }
  }

  render() {
    return this.compile(template, this.props)
  }
}

export default UserControl
