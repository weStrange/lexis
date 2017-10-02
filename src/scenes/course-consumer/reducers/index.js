/* @flow */

import { combineReducers } from 'redux'

import courseList from './courseListReducer'
import courseContents from './courseContentsReducer'

export default combineReducers({
  courseList,
  courseContents
})
