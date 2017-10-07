/* @flow */

import { List } from 'immutable'

import type { Action } from '../../../actions'
import type { WritingModalState } from '../types'

function getInitialState (): WritingModalState {
  return {
    writing: {
      type: 'writing',
      question: '',
      minWords: 0,
      maxWords: 1000
    },
    open: false
  }
}

export default function writingReducer (
  state: WritingModalState = getInitialState(),
  action: Action
): WritingModalState {
  switch (action.type) {
    case 'teacher-composer-writing-question-edit':
      return {
        ...state,
        writing: {
          ...state.writing,
          question: action.question
        }
      }

    case 'teacher-composer-writing-max-words-edit':
      return {
        ...state,
        writing: {
          ...state.writing,
          maxWords: action.words
        }
      }

    case 'teacher-composer-writing-min-words-edit':
      return {
        ...state,
        writing: {
          ...state.writing,
          minWords: action.words
        }
      }

    case 'teacher-composer-activity-select':
      return {
        ...state,
        writing:
          action.activity && action.activity.type === 'writing'
            ? action.activity
            : state.writing,
        open: action.activityKind === 'writing'
      }

    case 'teacher-composer-writing-modal-open':
      return {
        ...state,
        open: true
      }

    case 'teacher-composer-writing-modal-close':
      return {
        ...getInitialState(),
        open: false
      }

    default:
      return state
  }
}
