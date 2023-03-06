import Component from '../../utils/Component'
import { ILabel } from './types'
import Input from '../Input'

import template from './Label.hbs'

export default class Label extends Component {
  constructor(props: ILabel) {
    super('div', { props })
  }

  init() {
    this.element.classList.add('messenger__field')
    this.props.props.isProfile && this.element.classList.add('profile')
    this.children.input = new Input({
      ...this.props.props,
      className: 'messenger__field-input',
      events: {
        blur: () => this.isValid(),
        focus: () => this.isValid(),
      },
    })
  }

  isValid(): boolean {
    const value: string = this.getValue()
    const regexError: boolean = new RegExp(this.props.props.regex).test(value)
    const isError: boolean = this.props.required ? !value || regexError : !!value && regexError

    if (!isError) {
      this.element.classList.add('error')
    } else {
      this.element.classList.remove('error')
    }
    return !isError
  }

  getValue(): string {
    return (<HTMLInputElement>this.getContent().querySelector(`[name=${this.props.props.name}]`)).value
  }

  render() {
    return this.compile(template, this.props.props)
  }
}
