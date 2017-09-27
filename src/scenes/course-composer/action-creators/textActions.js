/* @flow */

import type { Action } from '../../../actions'

export function open (): Action {
  return {
    type: 'teacher-composer-text-modal-open'
  }
}

export function close (): Action {
  return {
    type: 'teacher-composer-text-modal-close'
  }
}

export function editContent (text: string): Action {
  return {
    type: 'teacher-composer-text-content-edit',
    text: text
  }
}

export function addHighlight (length: number, offset: number): Action {
  return {
    type: 'teacher-composer-text-highlight-add',
    length: length,
    offset: offset
  }
}

export function removeHighlight (idx: number): Action {
  return {
    type: 'teacher-composer-text-highlight-remove',
    idx: idx
  }
}
