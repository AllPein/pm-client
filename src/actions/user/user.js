import { createAction } from 'redux-actions'
import { ProjectRoles } from '@/enums/Role'
import { userApi } from '@/api/userApi'
import { createRequestAction } from '@/actions/requests'

const FEATURE_NAME = 'USER'

export const setUserInfo = createAction(
  `${FEATURE_NAME}/SET_USER_INFO`
)

export const setProjectRole = createAction(
  `${FEATURE_NAME}/SET_PROJECT_ROLE`
)

export const fetchUserData =  createRequestAction(
  'fetchUserData',
  () => async (dispatch) => {
    const user = await userApi.fetchUser()
    dispatch(setUserInfo(user))
    return user
  }
)

export const fetchProjectUserData = (projectid, userId) => (dispatch) => {
  const projectInfo = {
    user: {},
    project: {},
    role: ProjectRoles.PARTICIPANT
  }

  dispatch(setProjectRole(projectInfo.role))
}
