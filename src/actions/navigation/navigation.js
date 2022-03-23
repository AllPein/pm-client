import { createAction } from 'redux-actions'

const FEATURE_NAME = 'NAVIGATION'

export const setFilters = createAction(
  `${FEATURE_NAME}/SET_FILTERS`
)

export const changeFilters = (filters) => (dispatch) => {
  dispatch(setFilters(filters))
}

