/* @flow */

import { List } from 'immutable'

import type { Action } from '../../../actions'
import type { CourseEditorState } from '../types'

function getInitialState (): CourseEditorState {
  return {
    course: {
      id: '',
      name: '',
      description: '',
      difficulty: 'Beginner',
      levels: List()
    }
  }
}

export default function courseReducer (
  state: CourseEditorState = getInitialState(),
  action: Action
): CourseEditorState {
  switch (action.type) {
    case 'teacher-composer-start':
      return {
        ...state,
        course: {
          ...state.course,
          name: 'My course',
          levels: List.of({
            id: '',
            name: 'My new level',
            description: '',
            lessons: List.of({
              id: '',
              name: 'My new lesson',
              activities: List()
            })
          })
        }
      }

    case 'teacher-composer-level-add':
      return {
        ...state,
        course: {
          ...state.course,
          levels: state.course.levels.push({
            id: '',
            name: 'My new level',
            description: '',
            lessons: List()
          })
        }
      }

    case 'teacher-composer-level-remove':
      return {
        ...state,
        course: {
          ...state.course,
          levels: state.course.levels.remove(action.idx)
        }
      }

    case 'teacher-composer-level-save':
      return {
        ...state,
        course: {
          ...state.course,
          levels: state.course.levels.set(action.idx, action.level)
        }
      }

    case 'teacher-composer-course-name-edit':
      return {
        ...state,
        course: {
          ...state.course,
          name: action.name
        }
      }

    case 'teacher-composer-course-description-edit':
      return {
        ...state,
        course: {
          ...state.course,
          description: action.description
        }
      }

    case 'teacher-composer-course-difficulty-edit':
      return {
        ...state,
        course: {
          ...state.course,
          difficulty: action.difficulty
        }
      }

    default:
      return state
  }
}
