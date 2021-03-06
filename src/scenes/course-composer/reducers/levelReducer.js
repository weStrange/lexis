/* @flow */

import { List } from 'immutable'

import type { Action } from '../../../actions'
import type { LevelEditorState } from '../types'

function getInitialState (): LevelEditorState {
  return {
    level: {
      id: '',
      name: '',
      description: '',
      lessons: List()
    },
    imageFile: null
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

    case 'teacher-composer-level-edit-clean':
      return getInitialState()

    case 'teacher-composer-lesson-add':
      return {
        ...state,
        level: {
          ...state.level,
          lessons: state.level.lessons.push(action.lesson)
        }
      }

    case 'teacher-composer-lesson-remove':
      return {
        ...state,
        level: {
          ...state.level,
          lessons: state.level.lessons.remove(action.idx)
        }
      }

    case 'teacher-composer-lesson-save':
      return {
        ...state,
        level: {
          ...state.level,
          lessons: state.level.lessons.set(action.lessonIdx, action.lesson)
        }
      }

    case 'teacher-composer-level-name-edit':
      return {
        ...state,
        level: {
          ...state.level,
          name: action.name
        }
      }

    case 'teacher-composer-level-description-edit':
      return {
        ...state,
        level: {
          ...state.level,
          description: action.description
        }
      }

    case 'teacher-composer-level-image-url-edit':
      return {
        ...state,
        level: {
          ...state.level,
          imageUrl: action.imageUrl
        }
      }

    case 'teacher-composer-level-image-file-edit':
      return {
        ...state,
        imageFile: action.imageFile
      }

    default:
      return state
  }
}
