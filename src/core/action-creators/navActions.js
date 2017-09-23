/* @flow */

import type { Action } from '../../actions'

export function setIndex (idx: number): Action {
  return {
    type: 'core-navigation-index-set',
    idx: idx
  }
}
