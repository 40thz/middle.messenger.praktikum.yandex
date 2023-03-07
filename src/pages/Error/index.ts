import Component from '../../utils/Component'
import Link from '../../components/Link'
import { renderDom } from '../../utils/renderDom'
import template from './Error.hbs'

export default class Error extends Component {
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
                    renderDom('home')
                }
            }
        })
    }
    render() {
        return this.compile(template, {})
    }
}
