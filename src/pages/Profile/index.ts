import Component from '../../modules/Component'
import Form from '../../components/Form'
import { IProfilePage } from './types'
import Label from '../../components/Label'
import Link from '../../components/Link'
import { PROFILE_INPUTS } from '../../constants/Profile'
import RoundBtn from '../../components/RoundBtn'
import authController from '../../controllers/auth.controller'
import router from '../../modules/Router/router'
import template from './Profile.hbs'
import { withStore } from '../../hoc/withStore'

class Profile extends Component<IProfilePage> {
  constructor(props: IProfilePage) {
    super('main', { ...props })
  }

  // componentDidMount() {
  //   authController.fetchUser().catch(() => router.go('/'))
  // }

  componentDidUpdate() {
    this.element.id = 'profile'
    const user = this.props.user

    if (user.isLoading) {
      return
    }

    this.children.roundBtn = new RoundBtn({
      events: {
        click: () => {
          router.back()
        },
      },
    })

    this.children.form = new Form({
      className: 'profile__window',
      avatar: user.data.avatar,
      name: user.data.first_name,
      isProfile: true,

      children: {
        labels: PROFILE_INPUTS.map(
          (input) =>
            new Label({
              ...input,
              isProfile: true,
              disabled: true,
              value: user.data[input.name],
            })
        ),

        actions: [
          new Link({
            value: 'Изменить данные',
            color: '#6d3ed1',
            events: {
              click: () => {
                router.go('/profile/change-profile')
              },
            },
          }),

          new Link({
            value: 'Изменить пароль',
            color: '#6d3ed1',
            events: {
              click: () => {
                router.go('/profile/change-password')
              },
            },
          }),

          new Link({
            value: 'Выйти',
            color: '#C74141',
            events: {
              click: () => {
                authController.logout()
              },
            },
          }),
        ],
      },
    })

    return true
  }

  render() {
    return this.compile(template, this.props)
  }
}

export const ProfilePage = withStore((state) => {
  return { user: state.user }
})(Profile as any)
