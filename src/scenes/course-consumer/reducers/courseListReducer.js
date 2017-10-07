/* @flow */

import type { Action } from '../../../actions'
import type { CourseListState } from '../types'

function getInitialState (): CourseListState {
  return {
    selectedCourse: null,
    courseFilter: ''
  }
}

export default function courseListReducer (
  state: CourseListState = getInitialState(),
  action: Action
): CourseListState {
  switch (action.type) {
    case 'course-consumer-course-select':
      return {
        ...state,
        selectedCourse: action.id
      }
    case 'course-consumer-course-filter-edit':
      return {
        ...state,
        courseFilter: action.courseFilter
      }
    default:
      return state
  }
}
