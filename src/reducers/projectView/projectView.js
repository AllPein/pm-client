import { handleActions } from 'redux-actions'
import { setProject, setActiveTab } from '@/actions/projectView'

const initialState = {
  project: null,
  activeTab: 'participants'
}

const setProjectHandler = (state, action) => {
  return {
    ...state,
    project: action.payload
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
      setActiveTab,
      setActiveTabHandler
    ]
  ]),
  initialState
)

export {
  projectViewReducer
}
