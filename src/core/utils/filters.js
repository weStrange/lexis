// @flow

import { List } from 'immutable'
import type { Course } from '../types'
import Fuse from 'fuse.js'

export function filterCourses (courses: List<Course>, search: string) {
  if (search === '') {
    return courses
  }
  return List(
    new Fuse(courses.toArray(), {
      distance: 100,
      location: 0,
      threshold: 0.08,
      keys: ['description', 'name']
    }).search(search)
  )
}
