
import Button from '../../../Dropdown/Button'
import Component from '../../../../utils/Component'
import Dropdown from '../../../Dropdown'
import { IHeaderChat } from './types'
import Modal from '../../../Modal'
import UserControl from '../UserControl'

import dropDownIcon from '../../../../../static/Home/Chat/headerIcon.svg'
import icon1 from '../../../../../static/Home/Chat/addIcon.svg'
import icon2 from '../../../../../static/Home/Chat/removeIcon.svg'

import template from './HeaderChat.hbs'

class HeaderChat extends Component {
  constructor(props: IHeaderChat) {
    super('div', {
      ...props,
    })
  }

  init() {
    this.children.dropdown = new Dropdown({
      icon: dropDownIcon,
      children: {
        buttons: [
          new Button({
            icon: icon1,
            name: 'Добавить пользователя',
            events: {
              click: () => {
                (<Modal>this.children.modal).open()
                this.children.modal.setProps({
                  children: {
                    body: new UserControl({
                      name: 'Добавить пользователя',
                      buttonValue: 'Добавить',
                    }),
                  },
                })
              },
            },
          }),
          new Button({
            icon: icon2,
            name: 'Удалить пользователя',
            events: {
              click: () => {
                (<Modal>this.children.modal).open()
                this.children.modal.setProps({
                  children: {
                    body: new UserControl({
                      name: 'Удалить пользователя',
                      buttonValue: 'Удалить',
                    }),
                  },
                })
              },
            },
          }),
        ],
      },
    })

    this.children.modal = new Modal({})

    this.element.classList.add('messenger__home-content-header')
  }

  render() {
    return this.compile(template, this.props)
  }
}

export default HeaderChat
