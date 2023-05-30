import Button from '../../Dropdown/Button'
import Component from '../../../modules/Component'
import Dropdown from '../../Dropdown'
import Input from '../../Input'
import Modal from '../../Modal'
import UserControl from '../Chat/UserControl'
import chatController from '../../../controllers/chat.controller'
import { debounce } from '../../../utils/debounce'
import dropDownIcon from '../../../static/Home/Search/profile.svg'
import router from '../../../modules/Router'
import template from './Search.hbs'

class Search extends Component {
  constructor(props) {
    super('form', { ...props })
  }

  init() {
    const findChats = debounce(() => this.findChats(), 300)

    this.children.modal = new Modal({})

    this.children.input = new Input({
      type: 'text',
      name: 'search',
      placeholder: 'Поиск',
      events: {
        input: () => {
          findChats()
        },
      },
    })

    this.props.events = {
      submit: (e: Event) => {
        e.preventDefault()

        this.findChats()
      },
    }

    this.children.Dropdown = new Dropdown({
      icon: dropDownIcon,
      children: {
        buttons: [
          new Button({
            name: 'Профиль',
            events: {
              click: () => {
                router.go('/profile')
              },
            },
          }),

          new Button({
            name: 'Создать чат',
            events: {
              click: () => {
                this.showModal('Создание чата', 'Создать', 'Название чата')
              },
            },
          }),
        ],
      },
    })
    this.element.classList.add('messenger__home-sidebar-search')
  }

  showModal(name: string, buttonValue: string, inputName: string) {
    const modal: Modal = this.children.modal as Modal

    modal.open()

    modal.setProps({
      children: {
        body: new UserControl({
          name,
          buttonValue,
          inputName,
          isChat: true,
        }),
      },
    })
  }

  findChats() {
    const input: Input = this.children.input as Input

    const title = (input.element as HTMLInputElement).value

    chatController.findChatsByTitle(title)
  }

  render() {
    return this.compile(template, this.props)
  }
}

export default Search
