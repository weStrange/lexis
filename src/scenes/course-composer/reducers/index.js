/* @flow */

import { combineReducers } from 'redux'

import audioModal from './audioReducer'
import courseEditor from './courseReducer'
import levelEditor from './levelReducer'
import lessonEditor from './lessonReducer'
import skypeModal from './skypeReducer'
import textModal from './textReducer'
import videoModal from './videoReducer'

export default combineReducers({
  audioModal,
  courseEditor,
  levelEditor,
  lessonEditor,
  skypeModal,
  textModal,
  videoModal
})
