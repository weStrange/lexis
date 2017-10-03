// @flow

export type CourseConsumerAction =
  | { type: 'course-consumer-course-select', id: ?string }
  | {
      type: 'course-consumer-chapter-lesson-select',
      chapterIdx: ?number,
      lessonIdx: ?number
    }
  | { type: 'course-consumer-chapter-lesson-reset' }
