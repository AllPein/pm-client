import { handleActions } from 'redux-actions'
import { setProject, setProjectTime, setActiveTab } from '@/actions/projectView'

const initialState = {
  project: null,
  projectTime: null,
  activeTab: 'participants'
}

const setProjectHandler = (state, action) => {
  return {
    ...state,
    project: action.payload
  }
}

const setProjectTimeHandler = (state, action) => {
  return {
    ...state,
    projectTime: action.payload
  }
}

const setActiveTabHandler = (state, action) => {
  return {
    ...state,
    activeTab: action.payload
  }
}

const projectViewReducer = handleActions(
  new Map([
    [
      setProject,
      setProjectHandler
    ],
    [
      setProjectTime,
      setProjectTimeHandler
    ],
    [
      setActiveTab,
      setActiveTabHandler
    ]
  ]),
  initialState
)

export {
  projectViewReducer
}
