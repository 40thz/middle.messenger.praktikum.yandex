import Block from '../modules/Component'
import { DefaultProps } from '../modules/Component/types'
import Router from '../modules/Router'

export function withRouter<T>(Component: typeof Block<T & DefaultProps>) {
  type Props = typeof Component extends typeof Block<infer P extends DefaultProps> ? P : T

  return class WithRouter extends Component {
    constructor(props: Props & PropsWithRouter) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      super({ ...props, router: Router })
    }
  }
}

export interface PropsWithRouter {
  router?: typeof Router
}
