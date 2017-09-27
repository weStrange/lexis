/* @flow */

import { List } from 'immutable'

import type { Action } from '../../../actions'
import type { DetailsState } from '../types'

function getInitialState (): DetailsState {
  return {
    course: {
      id: '',
      name: '',
      description: '',
      difficulty: 'Beginner',
      levels: List()
    },
    students: List(),
    feedback: List()
  }
}

export default function detailsReducer (
  state: DetailsState = getInitialState(),
  action: Action
): DetailsState {
  switch (action.type) {
    case 'course-manager-details-load-success':
      return {
        ...state,
        course: action.course,
        students: action.students
      }

    default:
      return state
  }
}
