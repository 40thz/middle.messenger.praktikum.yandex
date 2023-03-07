import Button from '../../components/Button'
import Component from '../../utils/Component'
import Form from '../../components/Form'
import Label from '../../components/Label'
import Link from '../../components/Link'

import { SIGNUP_INPUTS } from '../../constants/SignUp'
import { renderDom } from '../../utils/renderDom'

import template from './SignUp.hbs'

class SignUp extends Component {
  constructor() {
    super('section', {
      title: 'Регистрация',
    })
  }

  init() {
    this.children.form = new Form({
      className: 'messenger__window-inner',
      events: {
        submit: (e) => {
          e.preventDefault();
          (<Form>this.children.form).isValid();
          (<Form>this.children.form).logData()
        },
      },

      children: {
        labels: SIGNUP_INPUTS.map((input) => new Label(input)),
        actions: [
          new Button({
            value: 'Зарегистрироваться',
          }),
          new Link({
            value: 'Войти',
            color: '#6d3ed1',
            events: {
              click: () => {
                renderDom('signin')
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

export default SignUp
