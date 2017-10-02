// @flow

import * as CourseUtils from '../type-methods/course'
import * as LessonUtils from '../type-methods/lesson'
import { List } from 'immutable'

export function parseFetchedCourse (fetchedCourse: any): Course {
  return {
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
}
