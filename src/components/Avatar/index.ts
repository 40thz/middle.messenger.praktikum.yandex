import Component from '../../modules/Component'
import { IAvatar } from './types'
import { checkAvatarUrl } from '../../utils/checkAvatarUrl'
import template from './Avatar.hbs'
import { withStore } from '../../hock/withStore'
import ChnageInput from './ChangeAvatarZone'

class AvatarBase extends Component<IAvatar> {
  constructor(props: IAvatar) {
    super('div', props)
  }

  init() {
    this.props.img = checkAvatarUrl(this.props.img)
    this.children.changeInput = new ChnageInput({})
  }

  render() {
    return this.compile(template, this.props)
  }
}

const Avatar = withStore((state) => {
  return { chatID: state.messenger.activeChat }
})(AvatarBase as any)

export default Avatar
