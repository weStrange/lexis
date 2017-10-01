/* @flow */

import type { Action } from '../../../actions'
import type { Lesson } from 'core/types'

export function add (lesson: Lesson): Action {
  return {
    type: 'teacher-composer-lesson-add',
    lesson: lesson
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

export function cleanEdit (): Action {
  return {
    type: 'teacher-composer-lesson-edit-clean'
  }
}

export function save (
  levelIdx: number,
  lessonIdx: number,
  lesson: Lesson
): Action {
  return {
    type: 'teacher-composer-lesson-save',
    lesson: lesson,
    lessonIdx: lessonIdx,
    levelIdx: levelIdx
  }
}

export function editName (name: string, idx: number): Action {
  return {
    type: 'teacher-composer-lesson-name-edit',
    name: name,
    idx: idx
  }
}
