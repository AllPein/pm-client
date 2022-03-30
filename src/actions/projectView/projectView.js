import { createAction } from 'redux-actions'
import { createRequestAction } from '@/actions/requests'
import { projectsApi } from '@/api/projectsApi'

const FEATURE_NAME = 'PROJECT_VIEW'

export const setProject = createAction(
  `${FEATURE_NAME}/SET_PROJECT`
)

export const setActiveTab = createAction(
  `${FEATURE_NAME}/SET_ACTIVE_TAB`
)

export const setProjectTime = createAction(
  `${FEATURE_NAME}/SET_PROJECT_TIME`
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

export const fetchProjectTime = createRequestAction(
  'fetchProjectTime',
  (code) => async (dispatch) => {
    const projectTime = await projectsApi.fetchProjectTime(code)
    dispatch(setProjectTime(projectTime))
    return projectTime
  }
)

export const updateProject = createRequestAction(
  'updateProject',
  (data) => async (dispatch) => {
    const project = await projectsApi.updateProject(data)
    dispatch(setProject(project))
    return project
  }
)

export const addParticipant = createRequestAction(
  'addParticipant',
  (data) => async (dispatch) => {
    const project = await projectsApi.addParticipant(data)
    dispatch(setProject(project))
    return project
  }
)


export const updateParticipant = createRequestAction(
  'updateParticipant',
  (data) => async (dispatch) => {
    const project = await projectsApi.updateParticipant(data)
    dispatch(setProject(project))
    return project
  }
)