import Component from '../../utils/Component'
import { IbtnUpload } from './types'
import template from './btnUpload.hbs'

class btnUpload extends Component {
  constructor(props: IbtnUpload) {
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
