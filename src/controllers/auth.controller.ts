import API, { AuthService } from '../services/auth.service'
import { ISignIn, ISignUp } from '../services/auth.service/types'
import messagesController from './messages.controller'
import router from '../modules/Router/router'
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
    } catch (e: any) {
      console.error(e)
    }
  }

  async signin(data: ISignIn) {
    try {
      await this.api.signin(data)

      router.go('/messenger')

      await this.fetchUser()
    } catch (e) {
      console.error(e)
    }
  }

  async fetchUser() {
    const user = await this.api.read()

    try {
      store.set('user.data', user)
    } catch (e) {
      console.log(e)
    }
  }

  async logout() {
    try {
      messagesController.closeAll()

      await this.api.logout()

      store.set('user.data', undefined)

      router.go('/')
    } catch (e: any) {
      console.error(e.message)
    }
  }
}

export default new AuthController()
