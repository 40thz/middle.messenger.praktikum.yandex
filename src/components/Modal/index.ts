import Component from '../../utils/Component'
import { IModal } from './types'

import template from './Modal.hbs'

class Modal extends Component {
  constructor(props: IModal) {
    super('div', props)
  }

  init() {
    this.element.classList.add('modal', 'hide')

    this.props.events = {
      click: (e) => {
        const modalBody = this.element.querySelector('.modal__body')
        if (!modalBody.contains(e.target)) {
          this.close()
        }
      },
    }
  }

  open() {
    this.element.classList.remove('hide')
  }

  close() {
    this.element.classList.add('hide')
  }

  render() {
    this.children = { ...this.props.children }
    return this.compile(template, { ...this.props.children })
  }
}

export default Modal
