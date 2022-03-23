import get from 'lodash/get'
import { createSelector } from 'reselect'

const rootSelector = (state) => get(state, 'requests')

const pendingSelector = createSelector(
  [rootSelector],
  (request) => get(request, 'pending')
)

const isFetchingSelector = (action) => createSelector(
  [pendingSelector],
  (pending) => pending.includes(action.toString())
)

export {
  isFetchingSelector
}