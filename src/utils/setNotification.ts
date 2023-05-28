import store from '../modules/Store'

type setNotificationType = {
  value: string
  type?: 'error' | 'info' | 'succes'
}

export const setNotification = ({ value, type = 'info' }: setNotificationType) => {
  store.set('notification.content', value)
  store.set('notification.type', type)
  store.set('notification.isActive', true)
}
