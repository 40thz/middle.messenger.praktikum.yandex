import Button from '../../components/Button'
import Component from '../../utils/Component'
import Form from '../../components/Form'
import Label from '../../components/Label'
import Link from '../../components/Link'

import { SIGNIN_INPUTS } from '../../constants/SignIn'
import { renderDom } from '../../utils/renderDom'

import template from './SignIn.hbs'

class SignIn extends Component {
  constructor() {
    super('section', {
      title: 'Авторизация',
    })
  }

  init() {
    this.children.form = new Form({
      className: 'messenger__window-inner',
      events: {
        submit: (e: Event) => {
          e.preventDefault()
          e.preventDefault();
          (<Form>this.children.form).isValid();
          (<Form>this.children.form).logData()
        },
      },

      children: {
        labels: SIGNIN_INPUTS.map((input) => new Label(input)),
        actions: [
          new Button({
            value: 'Войти',
          }),
          new Link({
            value: 'Нет аккаунта?',
            color: '#6d3ed1',
            events: {
              click: () => {
                renderDom('signup')
              },
            },
          }),
        ],
      },
    })
  }

  render() {
    return this.compile(template, this.props)
  }
}

export default SignIn
