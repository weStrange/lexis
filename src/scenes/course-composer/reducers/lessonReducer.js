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
    },
    editedActivityIdx: 0
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
        },
        editedActivityIdx: -1
      }

    case 'teacher-composer-lesson-edit-clean':
      return getInitialState()

    case 'teacher-composer-activity-edited-idx-set':
      return {
        ...state,
        editedActivityIdx: action.idx
      }
    /*
    case 'teacher-composer-activity-select':
      return {
        ...state,
        editedActivityIdx: -1
      }
*/
    case 'teacher-composer-activity-save':
      let idx = state.editedActivityIdx
      let editedActivity = state.lesson.activities.get(idx)

      return {
        ...state,
        editedActivityIdx: -1,
        lesson: {
          ...state.lesson,
          activities:
            idx >= 0 && editedActivity
              ? state.lesson.activities.set(idx, action.activity)
              : state.lesson.activities.push(action.activity)
        }
      }

    case 'teacher-composer-activity-remove':
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

    case 'teacher-composer-header-add':
      return {
        ...state,
        lesson: {
          ...state.lesson,
          activities: state.lesson.activities.push({
            type: 'header',
            text: 'My new header'
          })
        },
        editedActivityIdx: state.lesson.activities.size
      }

    case 'teacher-composer-header-edit':
      return {
        ...state,
        editedActivityIdx: -1,
        lesson: {
          ...state.lesson,
          activities: state.lesson.activities.set(action.idx, action.header)
        }
      }

    default:
      return state
  }
}
