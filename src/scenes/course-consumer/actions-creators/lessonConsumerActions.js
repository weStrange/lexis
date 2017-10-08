// @flow

import type { Action } from '../../../actions'
import type { List } from 'immutable'
import type { Activity } from 'core/types'

export function startLessonConsumer (activities: List<Activity>): Action {
  return {
    type: 'course-consumer-lesson-consumer-start',
    activities
  }
}

export function editWrittenAnswerItem (
  activityIdx: string,
  itemIdx: number,
  inputState: string
) {
  return {
    type: 'course-consumer-lesson-consumer-written-answer-item-edit',
    itemIdx,
    activityIdx,
    inputState
  }
}

export function completeWrittenAnswerItem (
  activityIdx: string,
  itemIdx: number
) {
  return {
    type: 'course-consumer-lesson-consumer-written-answer-item-complete',
    activityIdx,
    itemIdx
  }
}

export function editWriting (activityIdx: string, inputState: string) {
  return {
    type: 'course-consumer-lesson-consumer-writing-edit',
    activityIdx,
    inputState
  }
}

export function submitWriting (activityIdx: string) {
  return {
    type: 'course-consumer-lesson-consumer-writing-submit',
    activityIdx
  }
}

export function startWritingEditing (activityIdx: string) {
  return {
    type: 'course-consumer-lesson-consumer-writing-edit-start',
    activityIdx
  }
}
