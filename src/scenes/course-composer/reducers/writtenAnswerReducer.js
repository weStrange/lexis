/* @flow */

import { List } from 'immutable'

import type { Action } from '../../../actions'
import type { WrittenAnswerModal } from '../types'

function getInitialState (): WrittenAnswerModal {
  return {
    exercise: {
      type: 'written-answer',
      items: List()
    },
    open: false
  }
}

export default function writingReducer (
  state: WrittenAnswerModal = getInitialState(),
  action: Action
): WrittenAnswerModal {
  switch (action.type) {
    case 'teacher-composer-written-ans-question-add':
      return {
        ...state,
        exercise: {
          ...state.exercise,
          items: state.exercise.items.push({
            question: '',
            answer: ''
          })
        }
      }

    case 'teacher-composer-written-ans-question-remove':
      return {
        ...state,
        exercise: {
          ...state.exercise,
          items: state.exercise.items.remove(action.idx)
        }
      }

    case 'teacher-composer-written-ans-question-edit':
      let questionEditAction = action
      return {
        ...state,
        exercise: {
          ...state.exercise,
          items: state.exercise.items.update(action.idx, p => ({
            ...p,
            question: questionEditAction.question
          }))
        }
      }

    case 'teacher-composer-written-ans-answer-edit':
      let answerEditAction = action
      return {
        ...state,
        exercise: {
          ...state.exercise,
          items: state.exercise.items.update(action.idx, p => ({
            ...p,
            answer: answerEditAction.answer
          }))
        }
      }

    case 'teacher-composer-activity-select':
      return {
        ...state,
        exercise:
          action.activity && action.activity.type === 'written-answer'
            ? action.activity
            : state.exercise,
        open: action.activityKind === 'written-answer'
      }

    case 'teacher-composer-written-ans-modal-open':
      return {
        ...state,
        open: true
      }

    case 'teacher-composer-written-ans-modal-close':
      return {
        ...getInitialState(),
        open: false
      }

    default:
      return state
  }
}
