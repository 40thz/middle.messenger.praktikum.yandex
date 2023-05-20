import Component from '../../modules/Component'
import { IBtnUpload } from './types'
import template from './btnUpload.hbs'

class btnUpload extends Component<IBtnUpload> {
  constructor(props: IBtnUpload) {
    super('div', props)
  }

  init() {
    this.element.classList.add('profile__avatarModal-upload')
  }

  render() {
    return this.compile(template, { ...this.props })
  }
}

export default btnUpload
