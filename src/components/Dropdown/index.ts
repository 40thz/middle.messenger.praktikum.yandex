import Component from '../../utils/Component'
import { IDropdown } from './types'
import template from './Dropdown.hbs'

class Dropdown extends Component {
  constructor(props: IDropdown) {
    super('div', { ...props })
  }

  init() {
    this.element.classList.add('menu__elem')

    this.children = { ...this.props.children }

    this.props = {
      ...this.props,
      events: {
        click: () => {
          this.toggleDropDown()
        }
      }
    }

    // Следим за кликом вне области окна
    document.body.addEventListener('click', this.checkWithoutClick.bind(this))
  }

  checkWithoutClick(e: MouseEvent | null | any) {
    if (!this.element.contains(e.target)) {
      this.element.classList.remove('active')
    }
  }

  toggleDropDown() {
    if (this.element.classList.contains('active')) {
      this.element.classList.remove('active')
    } else {
      this.element.classList.add('active')
    }
  }

  render() {
    return this.compile(template, { ...this.props.children, ...this.props })
  }
}

export default Dropdown
