//import Button from '../../components/Button'
import Button from '../../components/Button'
import Component from '../../utils/Component'

import Form from '../../components/Form'

import Label from '../../components/Label'
import Link from '../../components/Link'
// eslint-disable-next-line sort-imports
import { PASSWORD_INPUTS, PROFILE_INPUTS } from '../../constants/Profile'

import RoundBtn from '../../components/RoundBtn'

import { renderDom } from '../../utils/renderDom'

import template from './Profile.hbs'

class Profile extends Component {
    constructor() {
        super('main')
    }

    init() {
        this.element.id = 'profile'
        this.children.roundBtn = new RoundBtn({
            events: {
                click: () => {
                    renderDom('home')
                }
            }
        })
        this.children.form = new Form({
            className: 'profile__window',
            isProfile: true,
            events: {
                submit: (e: Event) => {
                    e.preventDefault()
                    if ((<Form>this.children.form).isValid()) {
                        (<Form>this.children.form).logData()
                        // renderDom('home')
                    }
                },
            },

            children: {
                labels: PROFILE_INPUTS.map((input) => new Label({ ...input, isProfile: true, disabled: true })),
                actions: [
                    new Link({
                        value: 'Изменить данные',
                        color: '#6d3ed1',
                        events: {
                            click: () => {
                                this.getChangeForm()
                            }
                        }
                    }),
                    new Link({
                        value: 'Изменить пароль',
                        color: '#6d3ed1',
                        events: {
                            click: () => {
                                this.getChangePasswordForm()
                            }
                        }
                    }),
                    new Link({
                        value: 'Выйти',
                        color: '#C74141',
                        events: {
                            click: () => {
                                renderDom('signin')
                            }
                        }
                    })
                ],
            },
        })
    }

    getChangeForm() {
        this.setProps({
            children: {
                form: new Form({
                    className: 'profile__window',
                    isProfile: true,
                    events: {
                        submit: (e: Event) => {
                            e.preventDefault();
                            (<Form>this.children.form).isValid();
                            (<Form>this.children.form).logData()
                        },
                    },
                    children: {
                        labels: PROFILE_INPUTS.map((input) => new Label({ ...input, isProfile: true, disabled: false })),
                        actions: [],
                        button: new Button({
                            value: 'Сохронить'
                        })
                    },
                })
            }
        })
    }

    getChangePasswordForm() {
        this.setProps({
            children: {
                form: new Form({
                    className: 'profile__window',
                    isProfile: true,
                    events: {
                        submit: (e: Event) => {
                            e.preventDefault();
                            (<Form>this.children.form).isValid();
                            (<Form>this.children.form).logData()
                        },
                    },
                    children: {
                        labels: PASSWORD_INPUTS.map((input) => new Label({ ...input, isProfile: true, disabled: false })),
                        actions: [],
                        button: new Button({
                            value: 'Сохронить'
                        })
                    },
                })
            }
        })
    }

    render() {
        if (this.props.children) { this.children = { ...this.children, ...this.props.children } }

        return this.compile(template, this.props)
    }
}

export default Profile
