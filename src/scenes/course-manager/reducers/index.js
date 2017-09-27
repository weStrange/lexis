/* @flow */

import { combineReducers } from 'redux'

import course from './courseReducer'
import details from './detailsReducer'
import filter from './filterReducer'

export default combineReducers({
  course,
  details,
  filter
})
