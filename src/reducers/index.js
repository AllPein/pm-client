import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { projectsReducer } from '@/reducers/projects'
import { navigationReducer } from '@/reducers/navigation'
import { projectViewReducer } from '@/reducers/projectView'
import { userReducer } from '@/reducers/user'
import { requestsReducer } from '@/reducers/requests'

const createReducers = (history) => combineReducers({
  projects: projectsReducer,
  navigation: navigationReducer,
  projectView: projectViewReducer,
  user: userReducer,
  requests: requestsReducer,
  router: connectRouter(history),
})

export {
  createReducers
}