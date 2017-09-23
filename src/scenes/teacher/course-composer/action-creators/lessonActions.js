/* @flow */

import type { Action } from '../../../../actions'

export function add (): Action {
  return {
    type: 'teacher-composer-lesson-add'
  }
}

export function remove (idx: number): Action {
  return {
    type: 'teacher-composer-lesson-remove',
    idx: idx
  }
}

export function select (idx: number): Action {
  return {
    type: 'teacher-composer-lesson-select',
    idx: idx
  }
}

export function editName (name: string, idx: number): Action {
  return {
    type: 'teacher-composer-lesson-name-edit',
    name: name,
    idx: idx
  }
}
