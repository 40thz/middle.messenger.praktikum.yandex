import Button from '../../components/Button'
import Component from '../../modules/Component'
import Form from '../../components/Form'
import Label from '../../components/Label'

// eslint-disable-next-line sort-imports
import { IEditPasswordData } from '../../services/user.service/types'
import { PASSWORD_INPUTS } from '../../constants/Profile'
import RoundBtn from '../../components/RoundBtn'

import router from '../../modules/Router'

import template from '../Profile/Profile.hbs'

import userController from '../../controllers/user.controller'

import { withStore } from '../../hock/withStore'

class ChangePassword extends Component {
  constructor(props) {
    super('main', { ...props })
  }

  componentDidUpdate() {
    return true
  }

  render() {
    this.element.id = 'profile'

    this.children.roundBtn = new RoundBtn({
      events: {
        click: () => {
          router.back()
        },
      },
    })

    this.children.form = new Form({
      className: 'profile__window',
      avatar: this.props.user.avatar,
      name: this.props.user.first_name,
      isProfile: true,

      events: {
        submit: (e: Event) => {
          e.preventDefault()
          const form: Form = this.children.form as Form

          if (form.isValid()) {
            const data = form.data

            userController.editPassword(data as IEditPasswordData)
          }
        },
      },

      children: {
        labels: PASSWORD_INPUTS.map((input) => new Label({ ...input, isProfile: true, disabled: false })),
        actions: [],
        button: new Button({
          value: 'Сохронить',
        }),
      },
    })

    return this.compile(template, this.props)
  }
}

export const ChangePasswordPage = withStore((state) => {
  return { user: state.user.data }
})(ChangePassword)
