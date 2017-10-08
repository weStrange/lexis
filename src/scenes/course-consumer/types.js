// @flow

import type { Course } from 'core/types'
import type { List, Map } from 'immutable'

export type CourseListItem = {
  name: string,
  description: string,
  id: string,
  imageUrl: ?string
}

export type CourseListState = {
  selectedCourse: ?string,
  courseFilter: string
}

export type CourseContentsState = {
  selectedChapterIdx: ?number,
  selectedLessonIdx: ?number,
  course: ?Course,
  progress: number,
  subscribed: boolean
}

export type CourseConsumerState = {
  courseContents: CourseContentsState,
  courseList: CourseListState,
  lessonConsumer: LessonConsumerState
}

export type WrittenAnswerActivityItemAnswer = {
  itemIdx: number,
  studentAnswer: string,
  complete: boolean
}

export type WrittenAnswerActivityAnswer = {
  activityIdx: number,
  studentAnswers: List<WrittenAnswerActivityItemAnswer>,
  type: 'written-answer'
}

export type WritingActivityAnswer = {
  activityIdx: number,
  studentAnswer: string,
  type: 'writing',
  submitted: boolean
}

export type ActivityAnswer = WrittenAnswerActivityAnswer | WritingActivityAnswer

// export type LessonAnswer = {
//   activityAnswers: Map<number, AnswerableActivity>
// }
//
// export type LevelAnswer = {
//   lessonAnswers: List<LessonAnswer>
// }
//
// export type CourseAnswer = {
//   levelAnswers: List<LevelAnswer>
// }

export type LessonConsumerState = {
  activityAnswers: Map<string, ActivityAnswer>
}
