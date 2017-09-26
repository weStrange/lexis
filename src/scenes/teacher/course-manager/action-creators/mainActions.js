/* @flow */

import type { Action } from '../../../../actions'

export function start (): Action {
  return {
    type: 'course-manager-start'
  }
}

export function loadCourses (): Action {
  return {
    type: 'course-manager-courses-load-request'
  }
}
