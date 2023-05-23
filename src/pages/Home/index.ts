import { Chat } from '../../components/Home/Chat'
import Component from '../../modules/Component'
import { MessengerLoader } from '../../components/MessengerLoader'
import { Sidebar } from '../../components/Home/Sidebar'

import chatController from '../../controllers/chat.controller'

import template from './Home.hbs'

class Home extends Component {
  constructor(props) {
    super('main', { ...props })
  }

  componentDidMount() {
    chatController.fetchChats()
  }

  render() {
    this.element.classList.add('messenger__home')

    // Лоадер
    this.children.loader = new MessengerLoader({})

    // Список чатов
    this.children.sidebar = new Sidebar({})

    // Переписка
    this.children.chat = new Chat({})

    return this.compile(template, this.props)
  }
}

export const HomePage = Home
