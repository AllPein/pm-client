import { handleActions } from 'redux-actions'
import { setFilters } from '@/actions/navigation'

const initialState = {
  page: 1,
  search: ''
}

const setFiltersHandler = (state, action) => {
  return {
    ...state,
    ...action.payload
  }
}

const navigationReducer = handleActions(
  new Map([
    [
      setFilters,
      setFiltersHandler
    ]
  ]),
  initialState
)

export {
  navigationReducer
}
