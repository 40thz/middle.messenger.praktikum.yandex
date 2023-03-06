import Button from '../../Dropdown/Button'
import Component from '../../../utils/Component'
import Dropdown from '../../Dropdown'
import dropDownIcon from '../../../../static/Home/Search/profile.svg'
import { renderDom } from '../../../utils/renderDom'

import template from './Search.hbs'

class Search extends Component {
  constructor(props) {
    super('div', { ...props })
  }

  init() {
    this.children.Dropdown = new Dropdown({
      icon: dropDownIcon,
      children: {
        buttons: [
          new Button({
            name: 'Профиль',
            events: {
              click: () => {
                renderDom('profile')
              },
            },
          }),
        ],
      },
    })
    this.element.classList.add('messenger__home-sidebar-search')
  }

  render() {
    return this.compile(template, this.props)
  }
}

export default Search
