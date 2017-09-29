/* @flow */

import type { Action } from '../../../actions'
import type { ActivityKind } from 'core/types'

export function open (): Action {
  return {
    type: 'teacher-composer-activity-picker-open'
  }
}

export function close (): Action {
  return {
    type: 'teacher-composer-activity-picker-close'
  }
}
