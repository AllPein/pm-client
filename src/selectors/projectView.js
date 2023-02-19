import get from 'lodash/get'
import { createSelector } from 'reselect'

const projectViewRootSelector = (state) => get(state, 'projectView')

const projectSelector = createSelector(
  [projectViewRootSelector],
  (projectView) => get(projectView, 'project')
)

const tasksFilterSelector = createSelector(
  [projectViewRootSelector],
  (projectView) => get(projectView, 'tasksFilter')
)

const activeTabSelector = createSelector(
  [projectViewRootSelector],
  (projectView) => get(projectView, 'activeTab')
)

const projectTimeSelector = createSelector(
  [projectViewRootSelector],
  (projectView) => get(projectView, 'projectTime')
)

const projectParticipantsSelector = createSelector(
  [projectSelector],
  (projectView) => get(projectView, 'participants')
)

const projectTasksSelector = createSelector(
  [projectSelector],
  (projectView) => get(projectView, 'tasks')
)

export {
  projectSelector,
  projectTasksSelector,
  tasksFilterSelector,
  projectTimeSelector,
  projectParticipantsSelector,
  activeTabSelector
}
