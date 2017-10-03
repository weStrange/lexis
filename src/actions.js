/* @flow */

import type { CoreActions } from './core/actions'
import type { ProfileAction } from './scenes/profile/actions'
import type { DashboardAction } from './scenes/dashboard/actions'
import type { CourseManagerAction } from './scenes/course-manager/actions'
import type { CourseComposerAction } from './scenes/course-composer/actions'
import type { CourseConsumerAction } from './scenes/course-consumer/actions'

export type Action =
  | CoreActions
  | CourseManagerAction
  | CourseComposerAction
  | DashboardAction
  | ProfileAction
  | CourseConsumerAction
