/* @flow */

import { List } from 'immutable'

import type { Action } from '../../../../actions'
import type { ActivityPickerState } from '../types'

function getInitialState (): ActivityPickerState {
  return {
    open: false
  }
}

export default function activityPickerReducer (
  state: ActivityPickerState = getInitialState(),
  action: Action
): ActivityPickerState {
  switch (action.type) {
    case 'teacher-composer-activity-picker-open':
      return {
        ...state,
        open: true
      }

    case 'teacher-composer-activity-picker-close':
      return {
        ...state,
        open: false
      }

    case 'teacher-composer-activity-area-select':
      return {
        ...state,
        open: action.area !== 'none'
      }

    default:
      return state
  }
}
