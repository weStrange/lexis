/* @flow */

import type { Action } from '../../../actions'

export function open (): Action {
  return {
    type: 'teacher-composer-skype-modal-open'
  }
}

export function close (): Action {
  return {
    type: 'teacher-composer-skype-modal-close'
  }
}

export function editStartTime (startTime: number): Action {
  return {
    type: 'teacher-composer-skype-start-time-edit',
    startTime: startTime
  }
}

export function editDuration (duration: number): Action {
  return {
    type: 'teacher-composer-skype-duration-edit',
    duration: duration
  }
}

export function editTopic (topic: string): Action {
  return {
    type: 'teacher-composer-skype-topic-edit',
    topic: topic
  }
}

export function toggleGroup (): Action {
  return {
    type: 'teacher-composer-skype-group-toggle'
  }
}
