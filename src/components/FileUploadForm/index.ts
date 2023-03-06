import Button from '../Button'
import Component from '../../utils/Component'
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
          const file = e.target.files[0]
          console.log(file)
          this.children.btnUpload.setProps({
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
          this.children.input.element.click()
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
