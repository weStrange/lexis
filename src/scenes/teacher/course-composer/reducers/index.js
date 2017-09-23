/* @flow */

import { combineReducers } from 'redux'

import audio from './audioReducer'
import breadcrumbs from './breadcrumbsReducer'
import course from './courseReducer'
import skype from './skypeReducer'
import text from './textReducer'
import video from './videoReducer'

export default combineReducers({
  audio,
  breadcrumbs,
  course,
  skype,
  text,
  video
})
