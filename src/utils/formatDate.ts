export const formatDate = (time: string) => {
  const date = new Date(time)
  return date.getHours() + ':' + date.getMinutes()
}
