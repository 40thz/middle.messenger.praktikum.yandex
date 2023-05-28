import API, { AuthService } from '../services/auth.service'
import { ISignIn, ISignUp } from '../services/auth.service/types'
import messagesController from './messages.controller'
import router from '../modules/Router'
import { setNotification } from '../utils/setNotification'
import store from '../modules/Store'

class AuthController {
  private readonly api: AuthService

  constructor() {
    this.api = API
  }

  async signup(data: ISignUp) {
    try {
      await this.api.signup(data)

      await this.fetchUser()

      router.go('/profile')

      setNotification({ value: `Добро пожаловать ${data.login}`, type: 'succes' })
    } catch (e) {
      console.error(e)

      setNotification({ value: 'Что то пошло не так...', type: 'error' })
    }
  }

  async signin(data: ISignIn) {
    try {
      await this.api.signin(data)

      router.go('/messenger')

      setNotification({ value: `Добро пожаловать ${data.login}`, type: 'succes' })

      await this.fetchUser()
    } catch (e) {
      console.error(e)

      setNotification({ value: 'Неверный логин или пароль', type: 'error' })
    }
  }

  async fetchUser() {
    const user = await this.api.read()

    if (user) {
      store.set('user.data', user)
    }
  }

  async logout() {
    try {
      messagesController.closeAll()

      await this.api.logout()

      store.set('user.data', undefined)

      setNotification({ value: `Сессия закрыта. До скорых встреч !`, type: 'succes' })
      router.go('/')
    } catch (e) {
      console.error(e.message)

      setNotification({ value: 'Что то пошло не так...', type: 'error' })
    }
  }
}

export default new AuthController()
