// @flow

import type { Action } from '../../../actions'

export function selectCourse (id: ?string): Action {
  return {
    type: 'course-consumer-course-select',
    id
  }
}

export function editCourseFilter (courseFilter: string): Action {
  return {
    type: 'course-consumer-course-filter-edit',
    courseFilter
  }
}
