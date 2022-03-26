import moment from 'moment'

export const formatDate = (d) => {
  return moment(new Date(d)).format('DD.MM.yyyy')
}