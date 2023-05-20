import Component from '../../modules/Component'
import { ILink } from './types'

import template from './Link.hbs'

class Link extends Component<ILink> {
  constructor(props: ILink) {
    super('a', props)
  }

  init() {
    this.element.classList.add('messenger-link')
    this.element.style.color = this.props.color
  }

  render() {
    return this.compile(template, this.props)
  }
}

export default Link
