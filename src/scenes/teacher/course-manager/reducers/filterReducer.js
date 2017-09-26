/* @flow */

import { List } from 'immutable'

import type { Action } from '../../../../actions'
import type { FilterState } from '../types'

function getInitialState (): FilterState {
  return {
    search: ''
  }
}

export default function filterReducer (
  state: FilterState = getInitialState(),
  action: Action
): FilterState {
  switch (action.type) {
    case 'course-manager-search-edit':
      return {
        ...state,
        search: action.search
      }

    default:
      return state
  }
}
