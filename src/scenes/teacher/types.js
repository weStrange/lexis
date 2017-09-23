/* @flow */

import type { DashboardState } from './dashboard/types'
import type { ProfileState } from './profile/types'
import type { CourseManagerState } from './course-manager/types'
import type { CourseComposerState } from './course-composer/types'

export type TeacherState = {
  dashboard: DashboardState,
  profile: ProfileState,
  courseManager: CourseManagerState,
  courseComposer: CourseComposerState
}
