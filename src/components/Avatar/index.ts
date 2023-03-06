import Component from '../../utils/Component'
import { IAvatar } from './types'
import template from './Avatar.hbs'

class Avatar extends Component {
    constructor(props: IAvatar) {
        super('div', props)
    }

    render() {
        return this.compile(template, this.props)
    }
}

export default Avatar
