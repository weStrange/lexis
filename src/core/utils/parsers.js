// @flow

import * as CourseUtils from '../type-methods/course'
import * as LessonUtils from '../type-methods/lesson'
import { List } from 'immutable'

import type { Course } from '../types'

export function parseFetchedCourse (fetchedCourse: any): Course {
  let parsedCourse = {
    id: fetchedCourse.id,
    name: fetchedCourse.name,
    description: fetchedCourse.description,
    difficulty: CourseUtils.difficultyFromStored(fetchedCourse.difficulty),
    levels: List(fetchedCourse.levels).map(p => ({
      ...p,
      lessons: LessonUtils.fromStored(p.lessons)
    })),
    imageUrl: fetchedCourse.imageUrl
  }

  if (fetchedCourse.students) {
    parsedCourse = {
      ...parsedCourse,
      students: List(fetchedCourse.students)
    }
  }

  return parsedCourse
}
