import Component from '../../modules/Component'
import template from './RoundBtn.hbs'

class RoundBtn extends Component {
  constructor(props) {
    super('button', props)
  }

  init() {
    this.element.setAttribute('type', 'submit')
    this.element.classList.add('round-btn')
  }

  render() {
    return this.compile(template, { ...this.props })
  }
}

export default RoundBtn
