import API, { UserService } from '../services/user.service'
import { IEditPasswordData } from '../services/user.service/types'
import { IUser } from '../services/auth.service/types'
import authController from './auth.controller'
import router from '../modules/Router'
import { setNotification } from '../utils/setNotification'

class AuthController {
  private readonly api: UserService

  constructor() {
    this.api = API
  }

  async update(data: IUser) {
    try {
      this.api.update(data)

      router.go('/profile')

      setNotification({ value: 'Профиль успешно обновлен', type: 'succes' })
    } catch (e) {
      console.error(e)

      setNotification({ value: `Что то пошло не так...`, type: 'error' })
    }
  }

  async editPassword(data: IEditPasswordData) {
    try {
      this.api.editPassword(data)

      router.go('/profile')

      setNotification({ value: 'Пароль успешно обновлен', type: 'succes' })
    } catch (e) {
      console.error(e)

      setNotification({ value: `Что то пошло не так...`, type: 'error' })
    }
  }

  async updateAvatar(formdata: FormData) {
    try {
      await this.api.updateAvatar(formdata)

      authController.fetchUser()

      setNotification({ value: 'Изображение профиля успешно обновлено', type: 'succes' })
    } catch (e) {
      console.error(e)

      setNotification({ value: `Что то пошло не так...`, type: 'error' })
    }
  }
}

export default new AuthController()
