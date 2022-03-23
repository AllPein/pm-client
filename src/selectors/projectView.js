import get from 'lodash/get'
import { createSelector } from 'reselect'

const projectViewRootSelector = (state) => get(state, 'projectView')

const projectSelector = createSelector(
  [projectViewRootSelector],
  (projectView) => get(projectView, 'project')
)

const activeTabSelector = createSelector(
  [projectViewRootSelector],
  (projectView) => get(projectView, 'activeTab')
)

export {
  projectSelector,
  activeTabSelector
}
