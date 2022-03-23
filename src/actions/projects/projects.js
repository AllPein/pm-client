import { createRequestAction } from '@/actions/requests'
import { createAction } from 'redux-actions'
import { projectsApi } from '@/api/projectsApi'

const FEATURE_NAME = 'PROJECTS'

export const setProjects = createAction(
  `${FEATURE_NAME}/SET_PROJECTS`
)

export const fetchProjects = createRequestAction(
  'fetchProjects',
  (data) => async (dispatch) => {
    const projects = await projectsApi.fetchProjects(data)
    dispatch(setProjects(projects))
    return projects
  }
)
