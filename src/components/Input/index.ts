import Component from '../../modules/Component'
import { IInput } from './types'

export default class Input extends Component<IInput> {
  constructor(props: IInput) {
    super('input', props)
  }

  init() {
    const input = this.element as HTMLInputElement
    input.classList.add(this.props.className)
    input.name = this.props.name
    input.type = this.props.type
    input.placeholder = this.props.placeholder ? this.props.placeholder : ''
    input.value = this.props.value ? this.props.value : input.value
    input.disabled = this.props.disabled
    input.required = this.props.isRequired
    this.props.hidden ? this.hide() : this.show()
  }

  getValue(): string {
    return (this.element as HTMLInputElement).value
  }

  clear() {
    return ((this.element as HTMLInputElement).value = '')
  }
}
