/* @flow */

import type { Action } from '../../../../actions'

export function load (): Action {
  return {
    type: 'course-manager-details-load-request'
  }
}
