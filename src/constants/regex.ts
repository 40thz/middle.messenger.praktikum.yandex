export const REGEXES = {
  email: '(.+)@(.+){2,}\\.(.+){2,}',
  login: '^[a-zA-Z0-9\\-\\_]{6,16}$',
  display_name: '^[a-zA-Zа-яА-Я0-9\\-\\_]+$',
  name: '^[a-zA-Zа-яА-Я\\-]+$',
  phone: '^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\\s\\./0-9]*$',
  password: '^[a-zA-Z0-9\\-\\_]{6,16}$',
}
