import { error, home, notFound, profile, signin, signup } from '../pages'


const ROUTES = {
  signup,
  signin,
  home,
  profile,
  error,
  notFound
}

export function renderDom(route: keyof typeof ROUTES) {
  const root = document.querySelector('#app')

  root.innerHTML = ''

  const pageComponent = ROUTES[route]
  const page = new pageComponent({})

  root.appendChild(page.element)

  page.dispatchComponentDidMount()

  return root
}
