// @flow

import type { Action } from '../../../actions'

export function selectCourse (id: ?string): Action {
  return {
    type: 'course-consumer-course-select',
    id
  }
}
