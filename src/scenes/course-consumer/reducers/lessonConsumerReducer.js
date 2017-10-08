// @flow

import type {
  ActivityAnswer,
  LessonConsumerState,
  WrittenAnswerActivityAnswer
} from '../types'
import { List, Map } from 'immutable'
import type { Action } from '../../../actions'

function getInitialState (): LessonConsumerState {
  return {
    activityAnswers: Map()
  }
}

function activityToActivityAnswer (activity, activityIdx): ?ActivityAnswer {
  switch (activity.type) {
    case 'written-answer':
      return {
        activityIdx,
        type: activity.type,
        studentAnswers: List(
          activity.items.map((item, i) => ({
            itemIdx: i,
            studentAnswer: '',
            complete: false
          }))
        )
      }
    case 'writing':
      return {
        activityIdx,
        type: activity.type,
        studentAnswer: ''
      }
    default:
      return null
  }
}

function isAnswerable (activity) {
  return activity.type === 'written-answer' || activity.type === 'writing'
}

function activityAnswersFromLesson (state, activities) {
  let activityAnswers = {}

  activities.forEach((activity, i) => {
    if (isAnswerable(activity)) {
      const activityAnswer = activityToActivityAnswer(activity, i)
      if (activityAnswer) activityAnswers[i.toString()] = activityAnswer
    }
  })

  return {
    ...state,
    activityAnswers: Map(activityAnswers)
  }
}

function editWrittenAnswerItem (state, { activityIdx, itemIdx, inputState }) {
  const { activityAnswers } = state
  const activityAnswer = (activityAnswers.get(
    activityIdx
  ): WrittenAnswerActivityAnswer)
  const { studentAnswers } = activityAnswer
  const answerItem = studentAnswers.get(itemIdx)

  return {
    ...state,
    activityAnswers: activityAnswers.set(activityIdx, {
      ...activityAnswer,
      studentAnswers: studentAnswers.set(itemIdx, {
        ...answerItem,
        studentAnswer: inputState,
        complete: false
      })
    })
  }
}

function completeWrittenAnswerItem (state, { activityIdx, itemIdx }) {
  const { activityAnswers } = state
  const activityAnswer = (activityAnswers.get(
    activityIdx
  ): WrittenAnswerActivityAnswer)
  const { studentAnswers } = activityAnswer
  const answerItem = studentAnswers.get(itemIdx)

  return {
    ...state,
    activityAnswers: activityAnswers.set(activityIdx, {
      ...activityAnswer,
      studentAnswers: studentAnswers.set(itemIdx, {
        ...answerItem,
        complete: true
      })
    })
  }
}

export default function lessonConsumerReducer (
  state: LessonConsumerState = getInitialState(),
  action: Action
): LessonConsumerState {
  switch (action.type) {
    case 'course-consumer-lesson-consumer-start':
      return activityAnswersFromLesson(state, action.activities)
    case 'course-consumer-lesson-consumer-written-answer-item-edit':
      return editWrittenAnswerItem(state, action)
    case 'course-consumer-lesson-consumer-written-answer-item-complete':
      return completeWrittenAnswerItem(state, action)
    default:
      return state
  }
}
