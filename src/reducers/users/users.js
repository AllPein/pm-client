import { handleActions } from 'redux-actions'
import { setUsers } from '@/actions/users'

const initialState = []

const setUsersHandler = (state, action) => {
  return action.payload
}

const usersReducer = handleActions(
  new Map([
    [
      setUsers,
      setUsersHandler
    ]
  ]),
  initialState
)

export {
  usersReducer
}
