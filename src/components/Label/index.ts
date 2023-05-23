import Component from '../../modules/Component'
import { ILabel } from './types'
import Input from '../Input'

import template from './Label.hbs'

export default class Label extends Component<ILabel> {
  constructor(props: ILabel) {
    super('div', { ...props })
  }

  init() {
    this.element.classList.add('messenger__field')
    this.props.isProfile && this.element.classList.add('profile')
    this.children.input = new Input({
      ...this.props,
      className: 'messenger__field-input',
      events: {
        blur: () => this.isValid(),
        focus: () => this.isValid(),
        input: () => this.props.onChange && this.props.onChange(),
      },
    })
  }

  isValid(): boolean {
    const value: string = this.getValue()
    const regexError: boolean = new RegExp(this.props.regex).test(value)
    const isError: boolean = this.props.required
      ? !value || regexError
      : !!value && regexError

    if (!isError) {
      this.element.classList.add('error')
    } else {
      this.element.classList.remove('error')
    }
    return !isError
  }

  getValue(): string {
    return (<HTMLInputElement>(
      this.getContent().querySelector(`[name=${this.props.name}]`)
    )).value
  }

  render() {
    return this.compile(template, this.props)
  }
}
