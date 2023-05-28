import './styles/index.scss'
import { ChangePasswordPage, ChangeProfilePage, HomePage, ProfilePage, error, notFound, signin, signup } from './pages'
import Router from './modules/Router'

export enum Routes {
  HomePage = '/messenger',
  SignUp = '/signup',
  SignIn = '/',
  ProfilePage = '/profile',
  ChangePasswordPage = '/profile/change-password',
  ChangeProfile = '/profile/change-profile',
  ServerError = '/error',
  NotFound = '*',
}

window.addEventListener('DOMContentLoaded', async () => {
  Router.use({ pathname: Routes.HomePage, component: HomePage, isProtected: true })
    .use({ pathname: Routes.SignIn, component: signin })
    .use({ pathname: Routes.SignUp, component: signup })
    .use({ pathname: Routes.ProfilePage, component: ProfilePage, isProtected: true })
    .use({ pathname: Routes.ChangePasswordPage, component: ChangePasswordPage, isProtected: true })
    .use({ pathname: Routes.ChangeProfile, component: ChangeProfilePage, isProtected: true })
    .use({ pathname: Routes.NotFound, component: notFound })
    .use({ pathname: Routes.ServerError, component: error })
    .start()
})
