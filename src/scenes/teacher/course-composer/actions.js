/* @flow */

import type { CourseDifficulty, MainActivity, SecondaryActivity } from './types'

export type CourseComposerAction =
  | { type: 'teacher-composer-start' }
  // Level actions
  | { type: 'teacher-composer-level-add' }
  | { type: 'teacher-composer-level-remove', idx: number }
  | { type: 'teacher-composer-level-select', idx: number }
  | { type: 'teacher-composer-level-name-edit', name: string, idx: number }

  // Course actions
  | { type: 'teacher-composer-course-name-edit', name: string }
  | {
      type: 'teacher-composer-course-difficulty-edit',
      difficulty: CourseDifficulty
    }
  | { type: 'teacher-composer-main-activity-set', activity: MainActivity }
  | {
      type: 'teacher-composer-secondary-activity-set',
      activity: SecondaryActivity
    }
  | { type: 'teacher-composer-main-area-toggle' }
  | { type: 'teacher-composer-secondary-area-toggle' }

  // Lesson actions
  | { type: 'teacher-composer-lesson-add' }
  | { type: 'teacher-composer-lesson-remove', idx: number }
  | { type: 'teacher-composer-lesson-select', idx: number }
  | { type: 'teacher-composer-lesson-name-edit', name: string, idx: number }

  // Exercise actions
  | { type: 'teacher-composer-exercise-add' }
  | { type: 'teacher-composer-exercise-remove', idx: number }
  | { type: 'teacher-composer-exercise-select', idx: number }
  | { type: 'teacher-composer-exercise-name-edit', name: string, idx: number }

  // Video actions
  | { type: 'teacher-composer-video-modal-open' }
  | { type: 'teacher-composer-video-modal-close' }
  | { type: 'teacher-composer-video-url-edit', url: string }

  // Audio actions
  | { type: 'teacher-composer-audio-modal-open' }
  | { type: 'teacher-composer-audio-modal-close' }
  | { type: 'teacher-composer-audio-url-edit', url: string }

  // Text actions
  | { type: 'teacher-composer-text-modal-open' }
  | { type: 'teacher-composer-text-modal-close' }
  | { type: 'teacher-composer-text-content-edit', text: string }
  | {
      type: 'teacher-composer-text-highlight-add',
      length: number,
      offset: number
    }
  | { type: 'teacher-composer-text-highlight-remove', idx: number }

  // Skype actions
  | { type: 'teacher-composer-skype-modal-open' }
  | { type: 'teacher-composer-skype-modal-close' }
  | { type: 'teacher-composer-skype-start-time-edit', startTime: number }
  | { type: 'teacher-composer-skype-duration-edit', duration: number }
  | { type: 'teacher-composer-skype-topic-edit', topic: string }
  | { type: 'teacher-composer-skype-group-toggle' }

  // Breadcrumbs actions
  | { type: 'teacher-composer-breadcrumbs-level-set', level: string | null }
  | { type: 'teacher-composer-breadcrumbs-lesson-set', lesson: string | null }
