/* @flow */

import type { Action } from '../../../actions'
import type { Activity, ActivityKind } from 'core/types'

export function save (activity: Activity): Action {
  return {
    type: 'teacher-composer-activity-save',
    activity: activity
  }
}

export function remove (idx: number): Action {
  return {
    type: 'teacher-composer-activity-remove',
    idx: idx
  }
}

export function select (activityKind: ActivityKind, activity?: Activity) {
  return {
    type: 'teacher-composer-activity-select',
    activityKind: activityKind,
    activity: activity
  }
}

export function edit (idx: number, activity: Activity): Action {
  return {
    type: 'teacher-composer-activity-edit',
    idx: idx,
    activity: activity
  }
}

export function startEdit (idx: number): Action {
  return {
    type: 'teacher-composer-activity-edited-idx-set',
    idx: idx
  }
}
