/* @flow */

import type { Action } from '../../../actions'

export function open (): Action {
  return {
    type: 'teacher-composer-video-modal-open'
  }
}

export function close (): Action {
  return {
    type: 'teacher-composer-video-modal-close'
  }
}

export function editUrl (url: string): Action {
  return {
    type: 'teacher-composer-video-url-edit',
    url: url
  }
}
