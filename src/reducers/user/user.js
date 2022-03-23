import { handleActions } from 'redux-actions'
import { setUserInfo, setProjectRole } from '@/actions/user'

const initialState = {
  userInfo: { },
  projectRole: null
}

const setUserInfoHandler = (state, action) => {
  return {
    ...state,
    userInfo: action.payload
  }
}

const setProjectRoleHandler = (state, action) => {
  return {
    ...state,
    projectRole: action.payload
  }
}


const userReducer = handleActions(
  new Map([
    [
      setUserInfo,
      setUserInfoHandler
    ],
    [
      setProjectRole,
      setProjectRoleHandler
    ]
  ]),
  initialState
)

export {
  userReducer
}
