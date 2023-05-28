import { IRouter } from './types'
import Route from './route'

class Router {
  private static __instance: Router
  private routes: Route[] = []
  private currentRoute: Route | null = null
  private history = window.history

  constructor(private readonly rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance
    }

    this.routes = []

    Router.__instance = this
  }

  public use({ pathname, component, isProtected = false }: IRouter) {
    const route = new Route(pathname, component, this.rootQuery, isProtected)
    this.routes.push(route)

    return this
  }

  public start() {
    window.onpopstate = (event: PopStateEvent) => {
      const target = event.currentTarget as Window

      this._onRoute(target.location.pathname)
    }

    this._onRoute(window.location.pathname)
  }

  private _onRoute(pathname: string) {
    const route = this.getRoute(pathname)

    if (!route) {
      const notFoundPage = this.routes.find((route) => route.getPathName() === '*')

      notFoundPage.render()
      return
    }

    if (this.currentRoute && this.currentRoute !== route) {
      this.currentRoute.leave()
    }

    this.currentRoute = route

    route.render()
  }

  public go(pathname: string) {
    this.history.pushState({}, '', pathname)

    this._onRoute(pathname)
  }

  public back() {
    this.history.back()
  }

  public forward() {
    this.history.forward()
  }

  private getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname))
  }
}

export default new Router('#app')
