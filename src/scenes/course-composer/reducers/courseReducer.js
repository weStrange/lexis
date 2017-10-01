/* @flow */

import { List } from 'immutable'

import { LessonUtils } from 'core/type-methods'

import type { Action } from '../../../actions'
import type { CourseEditorState } from '../types'
import type { Course } from 'core/types'

function getInitialState (): CourseEditorState {
  return {
    course: {
      id: '',
      name: '',
      description: '',
      difficulty: 'Beginner',
      levels: List()
    },
    imageFile: null
  }
}

export default function courseReducer (
  state: CourseEditorState = getInitialState(),
  action: Action
): CourseEditorState {
  switch (action.type) {
    // apollo-dispatched actions
    case 'APOLLO_QUERY_RESULT':
    case 'APOLLO_QUERY_RESULT_CLIENT':
      if (action.operationName === 'Course') {
        return {
          ...state,
          course: {
            ...action.result.data.course[0],
            levels: List(action.result.data.course[0].levels)
          }
        }
      }
      return state

    case 'teacher-composer-start':
      // if it is a new course, creation of which just started
      if (!action.course) {
        const { name, description, levels } = state.course

        return !name && !description && levels.isEmpty()
          ? {
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
          : state
        // if editing existing course
      } else {
        return {
          ...state,
          course: {
            ...action.course,
            levels: List(action.course.levels)
          }
        }
      }

    case 'teacher-composer-level-add':
      return {
        ...state,
        course: {
          ...state.course,
          levels: state.course.levels.push(action.level)
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

    // reaching too deep here perhapse, but it's the easiest solution
    // updates lesson of a needed level when the command for such update was
    // is dispatched in lessonEditor
    case 'teacher-composer-lesson-save':
      let lessonSaveAction = action
      return {
        ...state,
        course: {
          ...state.course,
          levels: state.course.levels.update(lessonSaveAction.levelIdx, p => ({
            ...p,
            lessons: p.lessons.set(
              lessonSaveAction.lessonIdx,
              lessonSaveAction.lesson
            )
          }))
        }
      }

    case 'teacher-composer-course-id-edit':
      return {
        ...state,
        course: {
          ...state.course,
          id: action.id
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

    case 'teacher-composer-course-image-url-edit':
      return {
        ...state,
        course: {
          ...state.course,
          imageUrl: action.imageUrl
        }
      }

    case 'teacher-composer-course-image-file-edit':
      return {
        ...state,
        imageFile: action.file
      }

    default:
      return state
  }
}

function parseFetchedCourse (fetchedCourse: any): Course {
  return {
    id: fetchedCourse.id,
    name: fetchedCourse.name,
    description: fetchedCourse.description,
    difficulty: fetchedCourse.difficulty,
    levels: List(fetchedCourse.levels).map(p => ({
      ...p,
      lessons: LessonUtils.fromStored(p.lessons)
    })),
    imageUrl: fetchedCourse.imageUrl
  }
}
