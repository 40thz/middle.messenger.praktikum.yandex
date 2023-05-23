import Component from '../../../modules/Component'
import Input from '../../Input'
import chatController from '../../../controllers/chat.controller'
import template from './ChangeInput.hbs'
import userController from '../../../controllers/user.controller'

class ChnageInput extends Component {
  constructor(props) {
    super('p', props)
  }
  init() {
    this.element.classList.add('profile__window-avatar-change')

    this.children.input = new Input({
      name: 'file',
      type: 'file',
      hidden: true,
      events: {
        change: (e) => {
          if (!this.props.isProfile) {
            this.changeChatAvatar(e)
          } else {
            this.chnageUserAvatar(e)
          }
        },
      },
    })

    this.props.events = {
      click: () => {
        const input: Input = this.children.input as Input

        input.element.click()
      },
    }
  }

  changeChatAvatar(e) {
    const chatID = this.props.chatID
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('avatar', file)
    formData.append('chatId', chatID)

    chatController.changeChatAvatar(formData)
  }

  chnageUserAvatar(e) {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('avatar', file)

    userController.updateAvatar(formData)
  }

  render() {
    return this.compile(template, this.props)
  }
}

export default ChnageInput
