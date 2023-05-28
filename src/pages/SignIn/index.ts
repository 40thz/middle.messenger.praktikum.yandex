import Button from '../../components/Button'
import Component from '../../modules/Component'
import Form from '../../components/Form'
import { ISignIn } from '../../services/auth.service/types'
import Label from '../../components/Label'
import Link from '../../components/Link'
import { SIGNIN_INPUTS } from '../../constants/SignIn'
import authController from '../../controllers/auth.controller'
import router from '../../modules/Router'
import template from './SignIn.hbs'

class SignIn extends Component {
  constructor(props) {
    super('section', {
      title: 'Авторизация',
      ...props,
    })
  }

  init() {
    authController.fetchUser().then(() => router.go('/messenger'))

    this.children.form = new Form({
      className: 'messenger__window-inner',
      events: {
        submit: (e) => this.onSubmit(e),
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
                router.go('/signup')
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

      authController.signin(data as ISignIn)
    }
  }

  render() {
    return this.compile(template, this.props)
  }
}

export default SignIn
