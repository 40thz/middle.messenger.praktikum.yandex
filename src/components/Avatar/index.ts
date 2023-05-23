import ChnageInput from './ChangeInput'
import Component from '../../modules/Component'
import { IAvatar } from './types'
import { checkAvatarUrl } from '../../utils/checkAvatarUrl'
import template from './Avatar.hbs'
import { withStore } from '../../hoc/withStore'

class AvatarBase extends Component<IAvatar> {
  constructor(props: IAvatar) {
    super('div', props)
  }

  init() {
    this.props.img = checkAvatarUrl(this.props.img)

    this.children.changeInput = new ChnageInput({
      isProfile: this.props.isProfile,
      chatID: this.props.chatID,
    })
  }

  render() {
    return this.compile(template, this.props)
  }
}

const Avatar = withStore((state) => {
  return { chatID: state.messenger.activeChat }
})(AvatarBase as any)

export default Avatar
