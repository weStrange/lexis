/* @flow */

import type { Action } from '../../../../actions'

export function add (): Action {
  return {
    type: 'teacher-composer-level-add'
  }
}

export function remove (idx: number): Action {
  return {
    type: 'teacher-composer-level-remove',
    idx: idx
  }
}

export function select (idx: number): Action {
  return {
    type: 'teacher-composer-level-select',
    idx: idx
  }
}

export function editName (name: string, idx: number): Action {
  return {
    type: 'teacher-composer-level-name-edit',
    name: name,
    idx: idx
  }
}
