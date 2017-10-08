// @flow

import type {
  ActivityAnswer,
  LessonConsumerState,
  WritingActivityAnswer,
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
        studentAnswer: '',
        submitted: false
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

function editWriting (state, { activityIdx, inputState }) {
  const { activityAnswers } = state
  const activityAnswer: WritingActivityAnswer = activityAnswers.get(activityIdx)

  return {
    ...state,
    activityAnswers: activityAnswers.set(activityIdx, {
      ...activityAnswer,
      studentAnswer: inputState
    })
  }
}

function submitWriting (state, { activityIdx }) {
  const { activityAnswers } = state
  const activityAnswer: WritingActivityAnswer = activityAnswers.get(activityIdx)

  return {
    ...state,
    activityAnswers: activityAnswers.set(activityIdx, {
      ...activityAnswer,
      submitted: true
    })
  }
}

function startWritingEditing (state, { activityIdx }) {
  const { activityAnswers } = state
  const activityAnswer: WritingActivityAnswer = activityAnswers.get(activityIdx)

  return {
    ...state,
    activityAnswers: activityAnswers.set(activityIdx, {
      ...activityAnswer,
      submitted: false
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
    case 'course-consumer-lesson-consumer-writing-edit':
      return editWriting(state, action)
    case 'course-consumer-lesson-consumer-writing-submit':
      return submitWriting(state, action)
    case 'course-consumer-lesson-consumer-writing-edit-start':
      return startWritingEditing(state, action)
    default:
      return state
  }
}
