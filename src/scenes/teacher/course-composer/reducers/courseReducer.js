/* @flow */

import { List } from 'immutable'

import type { Action } from '../../../../actions'
import type { MainViewState } from '../types'

function getInitialState (): MainViewState {
  return {
    course: {
      id: '',
      name: '',
      difficulty: 'Beginner',
      levels: List()
    },
    selectedActivityArea: 'none',
    currentLevelIdx: 0,
    currentLessonIdx: 0,
    currentExerciseIdx: 0
  }
}

export default function breadcrumbsReducer (
  state: MainViewState = getInitialState(),
  action: Action
): MainViewState {
  switch (action.type) {
    case 'teacher-composer-level-add':
      return {
        ...state,
        course: {
          ...state.course,
          levels: state.course.levels.push({
            id: '',
            name: '',
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

    case 'teacher-composer-level-select':
      return {
        ...state,
        currentLevelIdx: action.idx
      }

    case 'teacher-composer-level-name-edit':
      let levelNameAction = action
      return {
        ...state,
        course: {
          ...state.course,
          levels: state.course.levels.update(action.idx, p => ({
            ...p,
            name: levelNameAction.name
          }))
        }
      }

    case 'teacher-composer-lesson-add':
      return {
        ...state,
        course: {
          ...state.course,
          levels: state.course.levels.update(state.currentLevelIdx, p => ({
            ...p,
            lessons: p.lessons.push({
              id: '',
              name: '',
              exercises: List()
            })
          }))
        }
      }

    case 'teacher-composer-lesson-remove':
      let lessonRemoveAction = action
      return {
        ...state,
        course: {
          ...state.course,
          levels: state.course.levels.update(state.currentLevelIdx, p => ({
            ...p,
            lessons: p.lessons.remove(lessonRemoveAction.idx)
          }))
        }
      }

    case 'teacher-composer-lesson-select':
      return {
        ...state,
        currentLessonIdx: action.idx
      }

    case 'teacher-composer-lesson-name-edit':
      let lessonNameAction = action
      return {
        ...state,
        course: {
          ...state.course,
          levels: state.course.levels.update(state.currentLevelIdx, p => ({
            ...p,
            lessons: p.lessons.update(lessonNameAction.idx, s => ({
              ...s,
              name: lessonNameAction.name
            }))
          }))
        }
      }

    case 'teacher-composer-exercise-add':
      return {
        ...state,
        course: {
          ...state.course,
          levels: state.course.levels.update(state.currentLevelIdx, p => ({
            ...p,
            lessons: p.lessons.update(state.currentLessonIdx, s => ({
              id: '',
              name: '',
              exercises: s.exercises.push({
                id: '',
                name: '',
                mainActivity: null,
                secondaryActivity: null
              })
            }))
          }))
        }
      }

    case 'teacher-composer-exercise-remove':
      let exerciseRemoveAction = action
      return {
        ...state,
        course: {
          ...state.course,
          levels: state.course.levels.update(state.currentLevelIdx, p => ({
            ...p,
            lessons: p.lessons.update(state.currentLessonIdx, s => ({
              id: '',
              name: '',
              exercises: s.exercises.remove(exerciseRemoveAction.idx)
            }))
          }))
        }
      }

    case 'teacher-composer-exercise-select':
      return {
        ...state,
        currentExerciseIdx: action.idx
      }

    case 'teacher-composer-exercise-name-edit':
      let exerciseNameAction = action
      return {
        ...state,
        course: {
          ...state.course,
          levels: state.course.levels.update(state.currentLevelIdx, p => ({
            ...p,
            lessons: p.lessons.update(state.currentLessonIdx, s => ({
              id: '',
              name: '',
              exercises: s.exercises.update(exerciseNameAction.idx, t => ({
                ...t,
                name: exerciseNameAction.name
              }))
            }))
          }))
        }
      }

    case 'teacher-composer-main-activity-set':
      let mainActSetAction = action
      return {
        ...state,
        course: {
          ...state.course,
          levels: state.course.levels.update(state.currentLevelIdx, p => ({
            ...p,
            lessons: p.lessons.update(state.currentLessonIdx, s => ({
              id: '',
              name: '',
              exercises: s.exercises.update(state.currentExerciseIdx, t => ({
                ...t,
                mainActivity: mainActSetAction.activity
              }))
            }))
          }))
        }
      }

    case 'teacher-composer-secondary-activity-set':
      let secActSetAction = action
      return {
        ...state,
        course: {
          ...state.course,
          levels: state.course.levels.update(state.currentLevelIdx, p => ({
            ...p,
            lessons: p.lessons.update(state.currentLessonIdx, s => ({
              id: '',
              name: '',
              exercises: s.exercises.update(state.currentExerciseIdx, t => ({
                ...t,
                secondaryActivity: secActSetAction.activity
              }))
            }))
          }))
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
