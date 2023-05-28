import Component from '../Component'
import { Notification } from '../../components/Notification'
import authController from '../../controllers/auth.controller'
import { render } from './renderDom'
import router from '.'

class Route {
  private block: Component | null = null

  constructor(
    private pathname: string,
    private readonly blockClass: typeof Component | any,
    private readonly query: string,
    private readonly isProtected?: boolean
  ) {}

  leave() {
    this.block = null
  }

  getPathName() {
    return this.pathname
  }

  match(pathname: string) {
    return isEqual(pathname, this.pathname)
  }

  async chechAuth() {
    try {
      await authController.fetchUser()
    } catch (e) {
      router.go('/')
    }
  }

  render() {
    if (!this.block) {
      if (this.isProtected) this.chechAuth()

      const notification = new Notification({})

      this.block = new this.blockClass({ notification })

      render(this.query, this.block)
      return
    }
  }
}

export default Route

function isEqual(rhs, lhs) {
  return rhs === lhs
}
