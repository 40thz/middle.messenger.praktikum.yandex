import Component from '../../../modules/Component'

import template from './Message.hbs'

class Message extends Component {
  constructor(props) {
    super('div', { ...props })
  }

  init() {
    this.element.classList.add('messenger__home-content-message')
  }

  render() {
    return this.compile(template, this.props)
  }
}

export default Message
