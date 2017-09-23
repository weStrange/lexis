/* @flow */

import type { ProfileAction } from './profile/actions'
import type { DashboardAction } from './dashboard/actions'
import type { CourseManagerAction } from './course-manager/actions'
import type { CourseComposerAction } from './course-composer/actions'

export type TeacherAction =
  | ProfileAction
  | DashboardAction
  | CourseManagerAction
  | CourseComposerAction
