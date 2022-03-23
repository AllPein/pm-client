import { createAction } from 'redux-actions'
import { createRequestAction } from '../requests'
import { projectsApi } from '@/api/projectsApi'

const FEATURE_NAME = 'PROJECT_VIEW'

export const setProject = createAction(
  `${FEATURE_NAME}/SET_PROJECT`
)

export const setActiveTab = createAction(
  `${FEATURE_NAME}/SET_ACTIVE_TAB`
)

export const changeActiveTab = (tab) => (dispatch) => {
  dispatch(setActiveTab(tab))
}

export const fetchProject = createRequestAction(
  'fetchProject',
  (code) => async (dispatch) => {
    const project = await projectsApi.fetchProject(code)
    dispatch(setProject(project))
    return project
  }
)