import { ISignIn, ISignUp, IUser } from './types'

import http from '../../http'

export class AuthService extends http {
  constructor() {
    super('/auth')
  }

  signin(data: ISignIn) {
    return this.http.post('/signin', data)
  }

  signup(data: ISignUp) {
    return this.http.post('/signup', data)
  }

  read(): Promise<IUser> {
    return this.http.get('/user')
  }

  logout() {
    return this.http.post('/logout')
  }

  create = undefined
  update = undefined
  delete = undefined
}

export default new AuthService()
