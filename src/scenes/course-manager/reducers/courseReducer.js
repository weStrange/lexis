/* @flow */

import { List } from 'immutable'

import type { Action } from '../../../actions'
import type { CourseState } from '../types'

function getInitialState (): CourseState {
  return {
    all: List()
  }
}

export default function courseReducer (
  state: CourseState = getInitialState(),
  action: Action
): CourseState {
  switch (action.type) {
    case 'APOLLO_QUERY_RESULT':
    case 'APOLLO_QUERY_RESULT_CLIENT':
      return {
        ...state,
        all: List(action.result.data.course).map(p => ({
          ...p,
          students: List(p.students),
          levels: List(p.levels)
        }))
      }

    case 'course-manager-start':
      return {
        ...getInitialState() /*,
        all: List([
          {
            name: 'Intermediate english 1',
            id: '1',
            levels: List(),
            description: '',
            difficulty: 'Beginner'
          },
          {
            name: 'Intermediate english 2',
            id: '2',
            levels: List(),
            description: '',
            difficulty: 'Beginner'
          },
          {
            name: 'Intermediate english 3',
            id: '3',
            levels: List(),
            description: '',
            difficulty: 'Beginner'
          },
          {
            name: 'English for Kids 1',
            id: '4',
            levels: List(),
            description: '',
            difficulty: 'Beginner'
          },
          {
            name: 'English for Kids 2',
            id: '5',
            levels: List(),
            description: '',
            difficulty: 'Beginner'
          },
          {
            name: 'English for Kids 3',
            id: '6',
            levels: List(),
            description: '',
            difficulty: 'Beginner'
          },
          {
            name: 'Conquer IELTS - Writing',
            id: '7',
            levels: List(),
            description: '',
            difficulty: 'Beginner'
          },
          {
            name: 'Conquer IELTS - Reading',
            id: '8',
            levels: List(),
            description: '',
            difficulty: 'Beginner'
          },
          {
            name: 'Conquer IELTS - Listening',
            id: '9',
            levels: List(),
            description: '',
            difficulty: 'Beginner'
          },
          {
            name: 'Conquer IELTS - Speaking',
            id: '10',
            levels: List(),
            description: '',
            difficulty: 'Beginner'
          },
          {
            name: 'English for Business 1',
            id: '11',
            levels: List(),
            description: '',
            difficulty: 'Beginner'
          },
          {
            name: 'English for Business 2',
            id: '12',
            levels: List(),
            description: '',
            difficulty: 'Beginner'
          },
          {
            name: 'Intensive speaking 1',
            id: '13',
            levels: List(),
            description: '',
            difficulty: 'Beginner'
          },
          {
            name: 'Fluent conversations',
            id: '14',
            levels: List(),
            description: '',
            difficulty: 'Beginner'
          },
          {
            name: 'English thesaurus',
            id: '15',
            levels: List(),
            description: '',
            difficulty: 'Beginner'
          }
        ])  */
      }

    default:
      return state
  }
}
