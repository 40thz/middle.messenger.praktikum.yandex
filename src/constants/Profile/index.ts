import { ERROR_MESSAGES } from '../errorMessages'
import { REGEXES } from '../regex'

const EMAIL = {
  name: 'email',
  label: 'Email',
  required: true,
  value: 'pochta@yandex.ru',
  regex: REGEXES.email,
  error_text: ERROR_MESSAGES.email,
}

const LOGIN = {
  name: 'login',
  label: 'Логин',
  required: true,
  value: 'ivanivanov',
  regex: REGEXES.login,
  error_text: ERROR_MESSAGES.login,
}

const FIRST_NAME = {
  name: 'first_name',
  label: 'Имя',
  value: 'Иван',
  regex: REGEXES.name,
  error_text: ERROR_MESSAGES.name,
}

const SECOND_NAME = {
  name: 'second_name',
  label: 'Фамилия',
  value: 'Иванов',
  regex: REGEXES.name,
  error_text: ERROR_MESSAGES.name,
}

const DISPLAY_NAME = {
  name: 'display_name',
  label: 'Имя в чате',
  value: 'Иван',
  regex: REGEXES.name,
  error_text: ERROR_MESSAGES.name,
}

const PHONE = {
  name: 'phone',
  label: 'Телефон',
  value: '+79099673030',
  regex: REGEXES.phone,
  error_text: ERROR_MESSAGES.phone,
}

const OLD_PASSWORD = {
  name: 'oldPassword',
  type: 'password',
  label: 'Пароль',
  required: true,
  regex: REGEXES.password,
  error_text: ERROR_MESSAGES.password,
}

const NEW_PASSWORD = {
  name: 'newPassword',
  type: 'password',
  label: 'Пароль',
  required: true,
  regex: REGEXES.password,
  error_text: ERROR_MESSAGES.password,
}

// const PASSWORD = {
//   name: 'password',
//   type: 'password',
//   label: 'Пароль',
//   required: true,
//   regex: REGEXES.password,
//   error_text: ERROR_MESSAGES.password,
// }

const REPEAT_PASSWORD = {
  name: 'repeatPassword',
  type: 'password',
  label: 'Повторите пароль',
  required: true,
  regex: REGEXES.password,
  error_text: ERROR_MESSAGES.password,
}

export const PROFILE_INPUTS = [EMAIL, LOGIN, FIRST_NAME, SECOND_NAME, DISPLAY_NAME, PHONE]

export const PASSWORD_INPUTS = [OLD_PASSWORD, NEW_PASSWORD, REPEAT_PASSWORD]
