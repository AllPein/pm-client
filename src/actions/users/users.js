import { createAction } from 'redux-actions'
import { userApi } from '@/api/userApi'
import { createRequestAction } from '@/actions/requests'

const FEATURE_NAME = 'USERS'

export const setUsers = createAction(
  `${FEATURE_NAME}/SET_USERS`
)

export const fetchUsers =  createRequestAction(
  'fetchUsers',
  (filter) => async (dispatch) => {
    const users = await userApi.fetchUsers(filter)
    dispatch(setUsers(users))
    return users
  }
)

export const fetchUsersInProject =  createRequestAction(
  'fetchUsersInProject',
  (filter, projectId) => async (dispatch) => {
    const users = await userApi.fetchUsersInProject(filter, projectId)
    dispatch(setUsers(users))
    return users
  }
)


