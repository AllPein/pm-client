import { handleActions } from 'redux-actions'
import { setProjects } from '@/actions/projects'

const initialState = {
  data: []
}

const setProjectsHandler = (state, action) => {
  return {
    ...state,
    data: action.payload
  }
}

const projectsReducer = handleActions(
  new Map([
    [
      setProjects,
      setProjectsHandler
    ]
  ]),
  initialState
)

export {
  projectsReducer
}
