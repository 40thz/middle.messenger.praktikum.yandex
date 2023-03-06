import Component from '../../../utils/Component'
import HeaderChat from './HeaderChat'
import { IChat } from './types'
import Input from '../../Input'
import Sendmessage from './Sendmessage'

import avatarImg from '../../../../static/Home/Chat/avatar.jpg'

import template from './Chat.hbs'


class Chat extends Component {
  constructor(props: IChat) {
    super('div', { ...props })
  }

  init() {
    this.element.classList.add('messenger__home-content')
    this.children = { ...this.props.children }
    this.children.header = new HeaderChat({
      name: 'Андрей',
      avatar: avatarImg,
    })

    this.children.sendMessage = new Sendmessage({
      events: {
        submit: (e: Event) => {
          e.preventDefault()
          console.log({ message: (<Input>this.children.sendMessage.children.input).getValue() })
        },
      },
    })
  }

  render() {
    return this.compile(template, { ...this.props.children })
  }
}

export default Chat
