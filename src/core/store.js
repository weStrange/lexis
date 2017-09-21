/* flow */
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducers'

const initialState = {}
const store = createStore(
  rootReducer,
  initialState,
  compose(window.devToolsExtension ? window.devToolsExtension() : f => f)
)

export default store
