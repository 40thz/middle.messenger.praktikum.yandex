import { renderDom } from '../utils/renderDom'

window.addEventListener('DOMContentLoaded', () => {
  renderDom('home')
})

window.goToPage = (route: string | any) => {
  renderDom(route)
}
