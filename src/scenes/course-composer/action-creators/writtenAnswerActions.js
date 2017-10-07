/* @flow */

import type { Action } from '../../../actions'

export function open (): Action {
  return {
    type: 'teacher-composer-written-ans-modal-open'
  }
}

export function close (): Action {
  return {
    type: 'teacher-composer-written-ans-modal-close'
  }
}

export function add (): Action {
  return {
    type: 'teacher-composer-written-ans-question-add'
  }
}

export function remove (idx: number): Action {
  return {
    type: 'teacher-composer-written-ans-question-remove',
    idx: idx
  }
}

export function editQuestion (question: string, idx: number): Action {
  return {
    type: 'teacher-composer-written-ans-question-edit',
    question: question,
    idx: idx
  }
}

export function editAnswer (answer: string, idx: number): Action {
  return {
    type: 'teacher-composer-written-ans-answer-edit',
    answer: answer,
    idx: idx
  }
}
