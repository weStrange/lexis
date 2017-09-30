/* @flow */

import { List } from 'immutable'

import type { Action } from '../../../actions'
import type { SkypeModalState } from '../types'

function getInitialState (): SkypeModalState {
  return {
    skype: {
      type: 'skype',
      startTime: 0, // number of seconds from Epoch time
      duration: 0, // number of seconds,
      topic: '',
      group: false
    },
    open: false
  }
}

export default function videoReducer (
  state: SkypeModalState = getInitialState(),
  action: Action
): SkypeModalState {
  switch (action.type) {
    case 'teacher-composer-skype-topic-edit':
      return {
        ...state,
        skype: {
          ...state.skype,
          topic: action.topic
        }
      }

    case 'teacher-composer-skype-group-toggle':
      return {
        ...state,
        skype: {
          ...state.skype,
          group: !state.skype.group
        }
      }

    case 'teacher-composer-skype-duration-edit':
      return {
        ...state,
        skype: {
          ...state.skype,
          duration: action.duration
        }
      }

    case 'teacher-composer-skype-start-time-edit':
      return {
        ...state,
        skype: {
          ...state.skype,
          startTime: action.startTime
        }
      }

    case 'teacher-composer-activity-select':
      return {
        ...state,
        skype:
          action.activity && action.activity.type === 'skype'
            ? action.activity
            : state.skype,
        open: action.activityKind === 'skype'
      }

    case 'teacher-composer-skype-modal-open':
      return {
        ...state,
        open: true
      }

    case 'teacher-composer-skype-modal-close':
      return {
        ...getInitialState(),
        open: false
      }

    default:
      return state
  }
}
