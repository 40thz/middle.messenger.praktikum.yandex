import { ERROR_MESSAGES } from '../errorMessages'
import { REGEXES } from '../regex'

const LOGIN = {
  name: 'login',
  label: 'Логин',
  required: true,
  regex: REGEXES.login,
  error_text: ERROR_MESSAGES.login,
}

const PASSWORD = {
  name: 'password',
  type: 'password',
  label: 'Пароль',
  required: true,
  regex: REGEXES.password,
  error_text: ERROR_MESSAGES.password,
}

export const SIGNIN_INPUTS = [
  LOGIN,
  PASSWORD,
]
