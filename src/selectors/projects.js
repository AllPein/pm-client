import get from 'lodash/get'
import { createSelector } from 'reselect'

const projectsRootSelector = (state) => get(state, 'projects')

const projectsSelector = createSelector(
  [projectsRootSelector],
  (projects) => get(projects, 'data')
)

export {
  projectsSelector
}
