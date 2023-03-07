import Avatar from '../Avatar'
import Component from '../../utils/Component'
import { IForm } from './types'

import template from './Form.hbs'


export default class Form extends Component {
  constructor(props: IForm) {
    super('form', { ...props })
  }

  init() {
    this.element.classList.add(this.props.className)
    this.children = { ...this.props.children }

    if (this.props.isProfile)
      this.children.avatar = new Avatar({
        img: 'https://static.nationalgeographic.co.uk/files/styles/image_3200/public/Mighty-2048.jpg?w=710&h=400',
        name: 'Андрей'
      })
  }

  get data() {
    return (this.children.labels as any).reduce((result, label) => ({
      ...result,
      ...{ [label.props.props.name]: label.getValue() },
    }), {})
  }

  logData() {
    console.log(this.data)
  }

  isValid(): boolean {
    let result = true;
    (this.children.labels as any).forEach((label) => {
      result = label.isValid() && result
    })

    return result
  }

  render() {
    return this.compile(template, { ...this.props.children, ...this.props })
  }
}
