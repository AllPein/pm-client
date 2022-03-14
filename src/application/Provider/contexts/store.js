import { routerMiddleware } from 'connected-react-router'
import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { createReducers } from '@/reducers'
import { history } from '@/utils/history'

const store = createStore(
  createReducers(history),
  composeWithDevTools(
    applyMiddleware(
      routerMiddleware(history),
      thunk
    )
  )
)

export {
  store
}
