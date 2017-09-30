/* @flow */

import type { Action } from '../../../actions'
import type { Level } from 'core/types'

export function add (level: Level): Action {
  return {
    type: 'teacher-composer-level-add',
    level: level
  }
}

export function remove (idx: number): Action {
  return {
    type: 'teacher-composer-level-remove',
    idx: idx
  }
}

export function startEdit (level: Level): Action {
  return {
    type: 'teacher-composer-level-edit-start',
    level: level
  }
}

export function cleanEdit (): Action {
  return {
    type: 'teacher-composer-level-edit-clean'
  }
}

export function save (idx: number, level: Level): Action {
  return {
    type: 'teacher-composer-level-save',
    idx: idx,
    level: level
  }
}

export function editName (name: string, idx: number): Action {
  return {
    type: 'teacher-composer-level-name-edit',
    name: name,
    idx: idx
  }
}

export function editDescription (description: string, idx: number): Action {
  return {
    type: 'teacher-composer-level-description-edit',
    description: description,
    idx: idx
  }
}

export function editImageUrl (url: string): Action {
  return {
    type: 'teacher-composer-level-image-url-edit',
    imageUrl: url
  }
}

export function editImageFile (file: File | null): Action {
  return {
    type: 'teacher-composer-level-image-file-edit',
    imageFile: file
  }
}
