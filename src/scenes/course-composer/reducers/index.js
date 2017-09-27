/* @flow */

import { combineReducers } from 'redux'

import audioModal from './audioReducer'
import breadcrumbs from './breadcrumbsReducer'
import mainView from './courseReducer'
import skypeModal from './skypeReducer'
import textModal from './textReducer'
import videoModal from './videoReducer'
import activityPicker from './activityPickerReducer'

export default combineReducers({
  audioModal,
  breadcrumbs,
  mainView,
  skypeModal,
  textModal,
  videoModal,
  activityPicker
})
