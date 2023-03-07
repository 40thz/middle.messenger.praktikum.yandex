import { ERROR_MESSAGES } from '../errorMessages'
import { REGEXES } from '../regex'

const EMAIL = {
  name: 'email',
  label: 'Email',
  required: true,
  regex: REGEXES.email,
  error_text: ERROR_MESSAGES.email,
}

const LOGIN = {
  name: 'login',
  label: 'Логин',
  required: true,
  regex: REGEXES.login,
  error_text: ERROR_MESSAGES.login,
}

const FIRST_NAME = {
  name: 'first_name',
  label: 'Имя',
  regex: REGEXES.name,
  error_text: ERROR_MESSAGES.name,
}

const SECOND_NAME = {
  name: 'second_name',
  label: 'Фамилия',
  regex: REGEXES.name,
  error_text: ERROR_MESSAGES.name,
}

const PHONE = {
  name: 'phone',
  label: 'Телефон',
  regex: REGEXES.phone,
  error_text: ERROR_MESSAGES.phone,
}

const PASSWORD = {
  name: 'password',
  type: 'password',
  label: 'Пароль',
  required: true,
  regex: REGEXES.password,
  error_text: ERROR_MESSAGES.password,
}

const REPEAT_PASSWORD = {
  name: 'repeatPassword',
  type: 'password',
  label: 'Повторите пароль',
  required: true,
  regex: REGEXES.password,
  error_text: ERROR_MESSAGES.password,
}

export const SIGNUP_INPUTS = [
  EMAIL,
  LOGIN,
  FIRST_NAME,
  SECOND_NAME,
  PHONE,
  PASSWORD,
  REPEAT_PASSWORD,
]
