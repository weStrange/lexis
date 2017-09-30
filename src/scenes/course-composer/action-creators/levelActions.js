/* @flow */

import type { Action } from '../../../actions'
import type { Level } from 'core/types'

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

export function edit (idx: number, level: Level): Action {
  return {
    type: 'teacher-composer-level-edit-start',
    idx: idx,
    level: level
  }
}

export function save (idx: number, level: Level): Action {
  return {
    type: 'teacher-composer-level-save',
    idx: idx,
    level: level
  }
}

export function editName (name: string, idx: number): Action {
  return {
    type: 'teacher-composer-level-name-edit',
    name: name,
    idx: idx
  }
}

export function editDescription (description: string, idx: number): Action {
  return {
    type: 'teacher-composer-level-description-edit',
    description: description,
    idx: idx
  }
}
