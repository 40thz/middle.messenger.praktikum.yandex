import Component from '../Component'

export interface IRouter {
  pathname: string
  component: typeof Component
  isProtected?: boolean
  params?: any
}
