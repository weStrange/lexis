/* @flow */

import type { Action } from '../../actions'
import type { Role } from '../types'

export function setIndex (idx: number): Action {
  return {
    type: 'core-navigation-index-set',
    idx: idx
  }
}
export const changeRole = (role: Role): Action => ({
  type: 'navigation-change-role',
  role
})
