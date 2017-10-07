/* @flow */

import type { Action } from '../../../actions'

export function open (): Action {
  return {
    type: 'teacher-composer-writing-modal-open'
  }
}

export function close (): Action {
  return {
    type: 'teacher-composer-writing-modal-close'
  }
}

export function editQuestion (question: string): Action {
  return {
    type: 'teacher-composer-writing-question-edit',
    question: question
  }
}

export function editMaxWords (words: number): Action {
  return {
    type: 'teacher-composer-writing-max-words-edit',
    words: words
  }
}

export function editMinWords (words: number): Action {
  return {
    type: 'teacher-composer-writing-min-words-edit',
    words: words
  }
}
