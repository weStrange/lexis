/* @flow */

import type { Action } from '../../../actions'
import type { Header } from 'core/types'

export function add (): Action {
  return {
    type: 'teacher-composer-header-add'
  }
}

export function remove (idx: number): Action {
  return {
    type: 'teacher-composer-header-remove',
    idx: idx
  }
}

export function edit (idx: number, header: Header): Action {
  return {
    type: 'teacher-composer-header-edit',
    idx: idx,
    header: header
  }
}

export function startEdit (idx: number): Action {
  return {
    type: 'teacher-composer-header-edit-start',
    idx: idx
  }
}
