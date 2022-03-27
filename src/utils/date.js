import moment from 'moment'
import plural from 'plural-ru'

export const formatDate = (d) => {
  return moment(new Date(d)).format('DD.MM.yyyy')
}

export const getDuration = (time) => {
  const days = moment.duration(time, 's').get('days')
  const hours = moment.duration(time, 's').get('hours')
  const mins = moment.duration(time, 's').get('minutes')
  let str = ''

  if (days > 0) {
    str += `${days} ${plural(days, 'день', 'дня', 'дней')} `
  }
  
  if (hours > 0) {
    str += `${hours} ${plural(hours, 'час', 'часа', 'часов')} `
  }
  
  if (mins > 0) {
    str += `${mins} ${plural(mins, 'минута', 'минуты', 'минут')}`
  }

  return str
}