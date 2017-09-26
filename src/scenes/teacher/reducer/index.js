/* @flow */

import { combineReducers } from 'redux'

import courseComposer from '../course-composer/reducers'
import courseManager from '../course-manager/reducers'

export default combineReducers({
  courseComposer,
  courseManager
})
