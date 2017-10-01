/* @flow */

import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import { ApolloClient } from 'react-apollo'
import { createNetworkInterface } from 'apollo-upload-client'

import * as rootReducer from './reducers'
import history from './history'
const apolloClient = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: '/graphql'
  })
})

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)
// const initialState = {}
const store = createStore(
  combineReducers({
    ...rootReducer,
    router: routerReducer,
    apollo: apolloClient.reducer()
  }),
  compose(
    applyMiddleware(middleware, apolloClient.middleware()),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)

export default store
export { apolloClient }
