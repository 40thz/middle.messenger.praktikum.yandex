import Component from '../../modules/Component'
import { IModal } from './types'

import template from './Modal.hbs'

class Modal extends Component {
  constructor(props: IModal) {
    super('div', { ...props })
  }

  protected componentDidUpdate() {
    if (this.props.children) {
      this.children = this.props.children
    }

    return true
  }

  init() {
    this.element.classList.add('modal', 'hide')

    this.props.events = {
      click: (e: Event) => {
        e.stopPropagation()

        const modalBody = this.element.querySelector('.modal__body')
        if (!modalBody.contains(e.target as Node)) {
          this.close()
        }
      },
    }
  }

  open() {
    console.log('modal open')
    this.element.classList.remove('hide')
  }

  close() {
    console.log('modal close')
    this.element.classList.add('hide')
  }

  render() {
    return this.compile(template, this.props)
  }
}

export default Modal
