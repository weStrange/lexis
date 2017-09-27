/* @flow */

import type { Action } from '../../../../actions'
import type {
  CourseDifficulty,
  MainActivity,
  SecondaryActivity
} from '../../../../core/types'

export function add (): Action {
  return {
    type: 'teacher-composer-exercise-add'
  }
}

export function remove (idx: number): Action {
  return {
    type: 'teacher-composer-exercise-remove',
    idx: idx
  }
}

export function select (idx: number): Action {
  return {
    type: 'teacher-composer-exercise-select',
    idx: idx
  }
}

export function editName (name: string, idx: number): Action {
  return {
    type: 'teacher-composer-exercise-name-edit',
    name: name,
    idx: idx
  }
}
