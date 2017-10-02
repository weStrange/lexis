/* @flow */

import type { Action } from '../../../actions'
import type { CourseListState } from '../types'

export default function courseListReducer (
  state: CourseListState = { selectedCourse: null },
  action: Action
): CourseListState {
  switch (action.type) {
    case 'course-consumer-course-select':
      return {
        ...state,
        selectedCourse: action.id
      }
    default:
      return state
  }
}
