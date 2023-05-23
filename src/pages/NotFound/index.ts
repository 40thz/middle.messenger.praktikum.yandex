import Component from '../../modules/Component'
import Link from '../../components/Link'
import router from '../../modules/Router/router'
import template from './NotFound.hbs'

export default class NotFound extends Component {
  constructor() {
    super('section')
  }

  init() {
    this.element.classList.add('notFound')
    this.children.link = new Link({
      value: 'Назад к чатам',
      color: '#6d3ed1',
      events: {
        click: () => {
          router.go('/messenger')
        },
      },
    })
  }
  render() {
    return this.compile(template, {})
  }
}
