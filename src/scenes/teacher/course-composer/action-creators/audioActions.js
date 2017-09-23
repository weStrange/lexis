/* @flow */

import type { Action } from '../../../../actions'

export function open (): Action {
  return {
    type: 'teacher-composer-audio-modal-open'
  }
}

export function close (): Action {
  return {
    type: 'teacher-composer-audio-modal-close'
  }
}

export function editUrl (url: string): Action {
  return {
    type: 'teacher-composer-audio-url-edit',
    url: url
  }
}
