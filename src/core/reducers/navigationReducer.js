/* @flow */

import type { Action } from '../../actions'
import type { NavigationState } from '../types'

function getInitialState (): NavigationState {
  return {
    currIdx: 0,
    userRole: 'STUDENT'
  }
}

export default function navigationReducer (
  state: NavigationState = getInitialState(),
  action: Action
): NavigationState {
  switch (action.type) {
    // depricated
    case 'core-navigation-index-set':
      return {
        ...state,
        currIdx: action.idx
      }
    case 'navigation-change-role':
      return { ...state, userRole: action.role }
    default:
      return state
  }
}
