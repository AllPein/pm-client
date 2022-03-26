import get from 'lodash/get'

const usersSelector = (state) => get(state, 'users')

export {
  usersSelector
}