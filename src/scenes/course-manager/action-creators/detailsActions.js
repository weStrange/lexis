/* @flow */

import type { Action } from '../../../actions'
import type { Course } from 'core/types'

export function load (): Action {
  return {
    type: 'course-manager-details-load-request'
  }
}

export function start (course: Course): Action {
  return {
    type: 'course-manager-details-start',
    course: course
  }
}
