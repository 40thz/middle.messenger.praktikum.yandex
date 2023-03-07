import Chat from '../../components/Home/Chat'
import ChatCart from '../../components/Home/ChatCart'
import ChatMessage from '../../components/Home/Chat/Message'
import Component from '../../utils/Component'
import Sidebar from '../../components/Home/Sidebar'
import { carts } from '../../constants/Home/carts'
import { chatMessages } from '../../constants/Home/chatMessages'
import template from './Home.hbs'

class Home extends Component {
  constructor(props) {
    super('main', { ...props })
  }

  init() {
    this.element.classList.add('messenger__home')

    // Список чатов
    this.children.sidebar = new Sidebar({
      children: {
        chats: carts.map((cart) => new ChatCart({ ...cart })),
      },
    })

    // Переписка
    this.children.chat = new Chat({
      children: {
        chatMessages: chatMessages.map((message) => new ChatMessage({ ...message })),
      },
    })
  }

  render() {
    return this.compile(template, this.props)
  }
}

export default Home
