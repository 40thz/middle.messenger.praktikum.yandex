import { Home, SignIn, SignUp, Error, NotFound, Profile } from '../pages/index'

import './components'

function render(html) {
	const app = document.querySelector('#app')
	app.innerHTML = html
}

const ROUTES = {
	Home,
	SignIn,
	SignUp,
	NotFound,
	Error,
	Profile,
}

window.goToPage = function (name) {
	const page = ROUTES[name]
	render(page())
}

window.addEventListener('DOMContentLoaded', () => {
	const html = Home()
	render(html, ROUTES.Home())
})

// {{> button label="Hey asd" className="red" onClick="goToPage('profile')"}}
