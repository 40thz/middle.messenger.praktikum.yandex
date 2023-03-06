


import Button from '../../../Dropdown/Button'
import Component from '../../../../utils/Component'
import Dropdown from '../../../Dropdown'
import FileUploadForm from '../../../FileUploadForm'
import Input from '../../../Input'
import Modal from '../../../Modal'
import RoundBtn from '../../../RoundBtn'

import dropDownIcon from '../../../../../static/Home/Chat/icon.svg'
import fileIcon from '../../../../../static/Home/Sendmessage/fileIcon.svg'
import locationIcon from '../../../../../static/Home/Sendmessage/locationIcon.svg'
import photoIcon from '../../../../../static/Home/Sendmessage/photoIcon.svg'

import template from './Sendmessage.hbs'

class Sendmessage extends Component {
  constructor(props) {
    super('form', { ...props })
  }

  init() {
    this.children.dropdown = new Dropdown({
      icon: dropDownIcon,

      children: {
        buttons: [
          new Button({
            icon: photoIcon,
            name: 'Фото или Видео',
            events: {
              click: () => {
                (<Modal>this.children.modal).open()
                this.children.modal.setProps({
                  children: {
                    body: new FileUploadForm({}),
                  },
                })
              },
            },
          }),
          new Button({
            icon: fileIcon,
            name: 'Файл',
            events: {
              click: () => {
                (<Modal>this.children.modal).open()
                this.children.modal.setProps({
                  children: {
                    body: new FileUploadForm({}),
                  },
                })
              },
            },
          }),
          new Button({
            icon: locationIcon,
            name: 'Локация',
            events: {
              click: () => {
                (<Modal>this.children.modal).open()
                this.children.modal.setProps({
                  children: {
                    body: new FileUploadForm({}),
                  },
                })
              },
            },
          }),
        ],
      },
    })
    this.children.input = new Input({
      name: 'message',
      placeholder: 'Сообщение',
    })
    this.children.roundBtn = new RoundBtn({})
    this.element.classList.add('messenger__home-content-chat')
    this.children.modal = new Modal({})
  }

  render() {
    return this.compile(template, { ...this.props })
  }
}

export default Sendmessage
