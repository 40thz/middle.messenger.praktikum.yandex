import Button from '../../components/Button'
import Component from '../../modules/Component'
import Form from '../../components/Form'
import { ISignUp } from '../../services/auth.service/types'
import Label from '../../components/Label'
import Link from '../../components/Link'
import { SIGNUP_INPUTS } from '../../constants/SignUp'
import authController from '../../controllers/auth.controller'
import router from '../../modules/Router/router'
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
        submit: (e) => this.onSubmit(e),
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
                router.go('/')
              },
            },
          }),
        ],
      },
    })
  }

  onSubmit(e) {
    e.preventDefault()
    const form: Form = this.children.form as Form

    if (form.isValid()) {
      const data = form.data

      authController.signup(data as ISignUp)
    }
  }

  render() {
    return this.compile(template, this.props)
  }
}

export default SignUp
