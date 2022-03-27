import { createAction } from 'redux-actions'
import { notifyError } from '@/utils/notification'

const FEATURE_NAME = 'REQUESTS'

export const requestAttempt = createAction(
  `${FEATURE_NAME}/REQUEST_ATTEMPT`
)

export const requestSuccess = createAction(
  `${FEATURE_NAME}/REQUEST_SUCCESS`
)

export const requestFailure = createAction(
  `${FEATURE_NAME}/REQUEST_FAILURE`,
  (requestId, error) => ({
    requestId,
    error
  })
)

export const createRequestAction = (requestId, actionCreator, errorHandler) => {
  const requestActionCreator = (...args) => async (dispatch, getState) => {
    try {
      dispatch(requestAttempt(requestId))
      const result = await actionCreator(...args)(dispatch, getState)
      dispatch(requestSuccess(requestId))
      return result
    } catch (error) {
      if (error) {
        notifyError('Ошибка', 'Кажется, что-то пошло не так')
      }
      dispatch(requestFailure(requestId, error.message))
      if (errorHandler) {
        errorHandler(error)
      } else {
        throw (error)
      }
    }
  }

  requestActionCreator.toString = () => requestId
  return requestActionCreator
}
