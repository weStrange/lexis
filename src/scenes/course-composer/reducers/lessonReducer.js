/* @flow */

import { List } from 'immutable'

import type { Action } from '../../../actions'
import type { LessonEditorState } from '../types'

function getInitialState (): LessonEditorState {
  return {
    lesson: {
      id: '',
      name: '',
      activities: List()
    },
    activityPicker: {
      open: false
    }
  }
}

export default function levelReducer (
  state: LessonEditorState = getInitialState(),
  action: Action
): LessonEditorState {
  switch (action.type) {
    case 'teacher-composer-lesson-edit-start':
      return {
        ...state,
        lesson: action.lesson,
        activityPicker: {
          open: false
        }
      }

    case 'teacher-composer-activity-add':
      return {
        ...state,
        lesson: {
          ...state.lesson,
          activities: state.lesson.activities.push(action.activity)
        }
      }

    case 'teacher-composer-lesson-remove':
      return {
        ...state,
        lesson: {
          ...state.lesson,
          activities: state.lesson.activities.remove(action.idx)
        }
      }

    case 'teacher-composer-activity-edit':
      return {
        ...state,
        lesson: {
          ...state.lesson,
          activities: state.lesson.activities.set(action.idx, action.activity)
        }
      }

    case 'teacher-composer-lesson-name-edit':
      return {
        ...state,
        lesson: {
          ...state.lesson,
          name: action.name
        }
      }

    case 'teacher-composer-activity-picker-open':
      return {
        ...state,
        activityPicker: {
          ...state.activityPicker,
          open: true
        }
      }

    case 'teacher-composer-activity-picker-close':
      return {
        ...state,
        activityPicker: {
          ...state.activityPicker,
          open: false
        }
      }

    default:
      return state
  }
}
