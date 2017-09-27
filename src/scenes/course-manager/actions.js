/* @flow */

import { List } from 'immutable'

import type { Course, User } from 'core/types'

export type CourseManagerAction =
  | { type: 'course-manager-start' }
  | { type: 'course-manager-courses-load-request' }
  | { type: 'course-manager-courses-load-success', courses: List<Course> }
  | { type: 'course-manager-courses-load-failure' }
  | { type: 'course-manager-details-load-request' }
  | {
      type: 'course-manager-details-load-success',
      course: Course,
      students: List<User>
    }
  | { type: 'course-manager-details-load-failure' }
  | { type: 'course-manager-search-edit', search: string }
