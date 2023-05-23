import { IEditPasswordData } from './types'
import { IUser } from '../auth.service/types'
import http from '../../http'

export class UserService extends http {
  constructor() {
    super('/user')
  }

  update(data: IUser): Promise<IUser> {
    return this.http.put('/profile', data)
  }

  editPassword(data: IEditPasswordData) {
    return this.http.put('/password', data)
  }

  searchUsersByLogin(login: string): Promise<IUser[]> {
    return this.http.post('/search', { login })
  }

  updateAvatar(formdata: FormData): Promise<IUser> {
    return this.http.put('/profile/avatar', formdata, 'FormData')
  }

  read = undefined
  create = undefined
  delete = undefined
}

export default new UserService()
