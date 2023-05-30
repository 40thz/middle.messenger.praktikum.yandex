import avatarImg from '../static/Home/Chat/avatar.png'

export const checkAvatarUrl = (url) => {
  return url ? `https://ya-praktikum.tech/api/v2/resources/${url}` : avatarImg
}
