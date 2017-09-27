/* @flow */

import type { Action } from '../../../actions'

export function startComposer (): Action {
  return {
    type: 'teacher-composer-start'
  }
}
