import { createRequestAction } from '@/actions/requests'
import { authApi } from '@/api/authApi'
import { setUserInfo } from '@/actions/user'

export const signUp = createRequestAction(
  'signUp',
  (data) => async (dispatch) => {
    const response = await authApi.signUp(data)
    localStorage.setItem('access_token', response.token)
    dispatch(setUserInfo(response.user))
    return response.user
  }
)

export const signIn = createRequestAction(
  'signIn',
  (data) => async (dispatch) => {
    const response = await authApi.signIn(data)
    localStorage.setItem('access_token', response.token)
    dispatch(setUserInfo(response.user))
    return response.user
  }
)