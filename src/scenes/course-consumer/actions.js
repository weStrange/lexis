// @flow

import type { Activity } from 'core/types'
import type { List } from 'immutable'

export type CourseConsumerAction =
  | { type: 'course-consumer-course-select', id: ?string }
  | { type: 'course-consumer-course-filter-edit', courseFilter: string }
  | {
      type: 'course-consumer-chapter-lesson-select',
      chapterIdx: ?number,
      lessonIdx: ?number
    }
  | { type: 'course-consumer-chapter-lesson-reset' }

  // LessonConsumer actions
  | { type: 'course-consumer-lesson-writing' }
  | {
      type: 'course-consumer-lesson-consumer-start',
      activities: List<Activity>
    }
  | {
      type: 'course-consumer-lesson-consumer-written-answer-item-edit',
      itemIdx: number,
      activityIdx: string,
      inputState: string
    }
  | {
      type: 'course-consumer-lesson-consumer-written-answer-item-complete',
      activityIdx: string,
      itemIdx: number
    }
  | {
      type: 'course-consumer-lesson-consumer-writing-edit',
      activityIdx: string,
      inputState: string
    }
  | {
      type: 'course-consumer-lesson-consumer-writing-submit',
      activityIdx: string
    }
  | {
      type: 'course-consumer-lesson-consumer-writing-edit-start',
      activityIdx: string
    }
