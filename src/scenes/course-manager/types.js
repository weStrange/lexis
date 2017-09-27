/* @flow */

import { List } from 'immutable'

import type { User, Course, CourseFeedback } from 'core/types'

export type CourseState = {
  all: List<Course>
}

export type FilterState = {
  search: string
}

export type DetailsState = {
  course: Course,
  students: List<User>,
  feedback: List<CourseFeedback>
}

export type CourseManagerState = {
  fitler: FilterState,
  course: CourseState,
  details: DetailsState
}
