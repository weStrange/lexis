/* @flow */

import type { Action } from '../../../../actions'
import type { ActivityKind } from '../types'

export function select (activityKind: string): Action {
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
