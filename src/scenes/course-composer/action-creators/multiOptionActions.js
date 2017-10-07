/* @flow */

import type { Action } from '../../../actions'

export function open (): Action {
  return {
    type: 'teacher-composer-multi-opt-modal-open'
  }
}

export function close (): Action {
  return {
    type: 'teacher-composer-multi-opt-modal-close'
  }
}

export function addQuestion (): Action {
  return {
    type: 'teacher-composer-multi-opt-question-add'
  }
}

export function removeQuestion (idx: number): Action {
  return {
    type: 'teacher-composer-multi-opt-question-remove',
    idx: idx
  }
}

export function editCorrectIdx (idx: number, correctIdx: number): Action {
  return {
    type: 'teacher-composer-multi-opt-correct-idx-edit',
    correctIdx: correctIdx,
    idx: idx
  }
}

export function editOption (
  idx: number,
  option: string,
  optionIdx: number
): Action {
  return {
    type: 'teacher-composer-multi-opt-option-edit',
    option: option,
    optionIdx: optionIdx,
    idx: idx
  }
}
