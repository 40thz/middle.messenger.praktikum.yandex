import Avatar from '../Avatar'
import Component from '../../modules/Component'
import { IForm } from './types'
import Label from '../Label'
import template from './Form.hbs'

export default class Form extends Component<IForm> {
  constructor(props: IForm) {
    super('form', { ...props })
  }

  init() {
    this.element.classList.add(this.props.className)
    this.children = { ...this.props.children }

    if (this.props.isProfile)
      this.children.avatar = new Avatar({
        isProfile: true,
        img: this.props.avatar,
        name: this.props.name,
        isAdmin: this.props.isAdmin,
      })
  }

  get data() {
    const label: Label[] = this.children.labels as Label[]

    return label.reduce(
      (result, label: any) => ({
        ...result,
        ...{ [label.props.name]: label.getValue() },
      }),
      {}
    )
  }

  logData() {
    console.log(this.data)
  }

  isValid(): boolean {
    const label: Label[] = this.children.labels as Label[]

    const inputLength = label.length
    const validateArr = []

    label.forEach((label) => {
      validateArr.push(label.isValid())
    })

    const vaidateInputs = validateArr.filter((item) => item === false)

    return vaidateInputs.length === inputLength ? true : false
  }
  render() {
    return this.compile(template, { ...this.props.children, ...this.props })
  }
}
