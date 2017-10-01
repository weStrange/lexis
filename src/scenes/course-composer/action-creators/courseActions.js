/* @flow */

import type { Action } from '../../../actions'
import type { ActivityAreaSelect } from '../types'
import type { CourseDifficulty, Course } from 'core/types'

export function start (course?: Course): Action {
  return {
    type: 'teacher-composer-start',
    course: course
  }
}

export function editId (id: string): Action {
  return {
    type: 'teacher-composer-course-id-edit',
    id: id
  }
}

export function editName (name: string): Action {
  return {
    type: 'teacher-composer-course-name-edit',
    name: name
  }
}

export function editDescription (description: string): Action {
  return {
    type: 'teacher-composer-course-description-edit',
    description: description
  }
}

export function editDifficulty (difficulty: CourseDifficulty): Action {
  return {
    type: 'teacher-composer-course-difficulty-edit',
    difficulty: difficulty
  }
}

export function editImageUrl (url: string): Action {
  return {
    type: 'teacher-composer-course-image-url-edit',
    imageUrl: url
  }
}

export function editImageFile (file: File): Action {
  return {
    type: 'teacher-composer-course-image-file-edit',
    file: file
  }
}
