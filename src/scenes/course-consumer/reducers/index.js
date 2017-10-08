/* @flow */

import { combineReducers } from 'redux'

import courseList from './courseListReducer'
import courseContents from './courseContentsReducer'
import lessonConsumer from './lessonConsumerReducer'

export default combineReducers({
  courseList,
  courseContents,
  lessonConsumer
})
