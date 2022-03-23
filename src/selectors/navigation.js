import get from 'lodash/get'
import { createSelector } from 'reselect'

const navigationRootSelector = (state) => get(state, 'navigation')

const searchSelector = createSelector(
  [navigationRootSelector],
  (navigation) => get(navigation, 'search')
)

const pageSelector = createSelector(
  [navigationRootSelector],
  (navigation) => get(navigation, 'page')
)

export {
  searchSelector,
  pageSelector,
}
