import Button from '../Button'
import Component from '../../modules/Component'
import Input from '../Input'
import btnUpload from './btnUpload'
import template from './FileUploadForm.hbs'

class FileUploadForm extends Component {
  constructor(props) {
    super('form', props)
  }

  init() {
    this.element.classList.add('profile__avatarModal')

    this.children.input = new Input({
      name: 'file',
      type: 'file',
      hidden: true,
      events: {
        change: (e) => {
          const btnUpload: btnUpload = this.children.btnUpload as btnUpload
          const file = e.target.files[0]
          console.log(file)
          btnUpload.setProps({
            value: file.name,
          })
        },
      },
    })

    this.children.btnUpload = new btnUpload({
      value: 'Выбрать файл на компьютере',
      events: {
        click: (e) => {
          e.preventDefault()
          const input: Input = this.children.input as Input

          input.element.click()
        },
      },
    })

    this.children.button = new Button({
      value: 'Загрузить',
    })
  }

  render() {
    return this.compile(template, { ...this.props })
  }
}

export default FileUploadForm
