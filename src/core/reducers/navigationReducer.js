/* @flow */

import type { Action } from '../../actions'
import type { NavigationState } from '../types'

function getInitialState (): NavigationState {
  return {
    currIdx: 0
  }
}

export default function audioReducer (
  state: NavigationState = getInitialState(),
  action: Action
): NavigationState {
  switch (action.type) {
    case 'core-navigation-index-set':
      return {
        ...state,
        currIdx: action.idx
      }

    default:
      return state
  }
}
