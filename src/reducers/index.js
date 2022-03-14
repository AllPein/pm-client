import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { projectsReducer } from '@/reducers/projects'

const createReducers = (history) => combineReducers({
  projects: projectsReducer,
  router: connectRouter(history),
})

export {
  createReducers
}