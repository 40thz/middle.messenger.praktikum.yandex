import Component from '../../../utils/Component'
import { ISidebar } from './types'
import Search from '../Search'

import template from './SideBar.hbs'

class Sidebar extends Component {
  constructor(props: ISidebar) {
    super('div', {
      ...props,
    })
  }

  init() {
    this.children = { ...this.props.children }
    this.children.Search = new Search({})
    this.element.classList.add('messenger__home-sidebar')
  }

  render() {
    return this.compile(template, this.props)
  }
}

export default Sidebar
