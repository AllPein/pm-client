import { handleActions } from 'redux-actions'

const initialState = []

const projectsReducer = handleActions(
  new Map([
    [
      () => {},
      (state, action) => (
        {
          ...state,
          table: action.payload
        }
      )
    ]
  ]),
  initialState
)

export {
  projectsReducer
}
