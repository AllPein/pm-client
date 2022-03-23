import get from 'lodash/get'
import { createSelector } from 'reselect'

const userSelector = (state) => get(state, 'user')

const userInfoSelector = createSelector(
  [userSelector],
  (user) => get(user, 'userInfo')
)

const userProjectRoleSelector = createSelector(
  [userSelector],
  (user) => get(user, 'projectRole')
)

export {
  userInfoSelector,
  userProjectRoleSelector
}
