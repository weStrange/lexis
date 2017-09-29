/* @flow */

import type { Action } from '../../../actions'
import type { Lesson } from 'core/types'

export function add (): Action {
  return {
    type: 'teacher-composer-lesson-add'
  }
}

export function remove (idx: number): Action {
  return {
    type: 'teacher-composer-lesson-remove',
    idx: idx
  }
}

export function startEdit (lesson: Lesson): Action {
  return {
    type: 'teacher-composer-lesson-edit-start',
    lesson: lesson
  }
}

export function edit (idx: number, lesson: Lesson): Action {
  return {
    type: 'teacher-composer-lesson-edit',
    lesson: lesson,
    idx: idx
  }
}

export function editName (name: string, idx: number): Action {
  return {
    type: 'teacher-composer-lesson-name-edit',
    name: name,
    idx: idx
  }
}
