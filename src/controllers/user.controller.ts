import API, { UserService } from '../services/user.service'
import { IEditPasswordData } from '../services/user.service/types'
import { IUser } from '../services/auth.service/types'
import authController from './auth.controller'
import router from '../modules/Router/router'

class AuthController {
  private readonly api: UserService

  constructor() {
    this.api = API
  }

  async update(data: IUser) {
    try {
      this.api.update(data)

      router.go('/profile')
    } catch (e: any) {
      console.error(e)
    }
  }

  async editPassword(data: IEditPasswordData) {
    try {
      this.api.editPassword(data)

      router.go('/profile')
    } catch (e: any) {
      console.error(e)
    }
  }

  async updateAvatar(formdata: FormData) {
    try {
      await this.api.updateAvatar(formdata)

      authController.fetchUser()
    } catch (e) {
      console.error(e)
    }
  }
}

export default new AuthController()
