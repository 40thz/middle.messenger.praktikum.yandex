import Button from '../../components/Button'
import Component from '../../modules/Component'
import Form from '../../components/Form'
import Label from '../../components/Label'

// eslint-disable-next-line sort-imports
import { IUser } from '../../services/auth.service/types'
import { PROFILE_INPUTS } from '../../constants/Profile'
import RoundBtn from '../../components/RoundBtn'
import router from '../../modules/Router/router'
import template from '../Profile/Profile.hbs'
import userController from '../../controllers/user.controller'
import { withStore } from '../../hoc/withStore'

class ChangeProfile extends Component {
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
      isAdmin: true,
      events: {
        submit: (e: Event) => {
          e.preventDefault()
          const form: Form = this.children.form as Form

          if (form.isValid()) {
            const data = form.data

            userController.update(data as IUser)
          }
        },
      },
      children: {
        labels: PROFILE_INPUTS.map(
          (input) =>
            new Label({
              ...input,
              isProfile: true,
              disabled: false,
              value: this.props.user[input.name],
            })
        ),
        actions: [],
        button: new Button({
          value: 'Сохронить',
        }),
      },
    })
    return this.compile(template, this.props)
  }
}

export const ChangeProfilePage = withStore((state) => {
  return { user: state.user.data }
})(ChangeProfile)
