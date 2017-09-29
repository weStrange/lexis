/* @flow */

import { List } from 'immutable'

import type { Action } from '../../../actions'
import type { LevelEditorState } from '../types'

function getInitialState (): LevelEditorState {
  return {
    level: {
      id: '',
      name: '',
      lessons: List()
    }
  }
}

export default function levelReducer (
  state: LevelEditorState = getInitialState(),
  action: Action
): LevelEditorState {
  switch (action.type) {
    case 'teacher-composer-level-edit-start':
      return {
        ...state,
        level: action.level
      }

    case 'teacher-composer-lesson-add':
      return {
        ...state,
        course: {
          ...state.level,
          lessons: state.level.lessons.push({
            id: '',
            name: 'My new lesson',
            activities: List()
          })
        }
      }

    case 'teacher-composer-lesson-remove':
      return {
        ...state,
        course: {
          ...state.level,
          lessons: state.level.lessons.remove(action.idx)
        }
      }

    case 'teacher-composer-lesson-edit':
      return {
        ...state,
        course: {
          ...state.level,
          lessons: state.level.lessons.set(action.idx, action.lesson)
        }
      }

    case 'teacher-composer-level-name-edit':
      return {
        ...state,
        course: {
          ...state.level,
          name: action.name
        }
      }

    case 'teacher-composer-level-description-edit':
      return {
        ...state,
        course: {
          ...state.level,
          description: action.description
        }
      }

    default:
      return state
  }
}
