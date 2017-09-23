/* @flow */


import { List } from 'immutable'

import type { Action } from '../../../../actions'
import type { BreadcrumbsState } from '../types'

function getInitialState (): BreadcrumbsState {
  return {
    lesson: null,
    level: null
  }
}

export default function breadcrumbsReducer (
  state: BreadcrumbsState = getInitialState(),
  action: Action
): BreadcrumbsState {
  switch (action.type) {
    case 'teacher-composer-breadcrumbs-level-set':
      return {
        ...state,
        level: action.level
      }

    case 'teacher-composer-breadcrumbs-lesson-set':
      return {
        ...state,
        lesson: action.lesson
      }

    default:
      return state
  }
}
