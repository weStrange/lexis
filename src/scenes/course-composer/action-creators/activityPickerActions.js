/* @flow */

import type { Action } from '../../../actions'
import type { ActivityKind } from 'core/types'

export function select (activityKind: ActivityKind): Action {
  return {
    type: 'teacher-composer-activity-select',
    activityKind: activityKind
  }
}

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
