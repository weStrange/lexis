/* @flow */

import { List } from 'immutable'

import type { Action } from '../../../actions'
import type { TextModalState } from '../types'

function getInitialState (): TextModalState {
  return {
    text: {
      type: 'text',
      content: '',
      highlights: List()
    },
    open: false
  }
}

export default function audioReducer (
  state: TextModalState = getInitialState(),
  action: Action
): TextModalState {
  switch (action.type) {
    case 'teacher-composer-text-content-edit':
      return {
        ...state,
        text: {
          ...state.text,
          content: action.text
        }
      }

    case 'teacher-composer-text-highlight-add':
      return {
        ...state,
        text: {
          ...state.text,
          highlights: state.text.highlights.push({
            offset: action.offset,
            length: action.length
          })
        }
      }

    case 'teacher-composer-text-highlight-remove':
      return {
        ...state,
        text: {
          ...state.text,
          highlights: state.text.highlights.remove(action.idx)
        }
      }

    case 'teacher-composer-activity-select':
      return {
        ...state,
        text:
          action.activity && action.activity.type === 'text'
            ? action.activity
            : state.text,
        open: action.activityKind === 'text'
      }

    case 'teacher-composer-text-modal-open':
      return {
        ...state,
        open: true
      }

    case 'teacher-composer-text-modal-close':
      return {
        ...getInitialState(),
        open: false
      }

    default:
      return state
  }
}
