/* @flow */

import { List } from 'immutable'

import type { Lesson } from '../types'

export function toStored (lessons: List<Lesson>): string {
  return JSON.stringify(
    lessons
      .map(p => ({
        ...p,
        activities: p.activities
          .map(s => {
            switch (s.type) {
              case 'header':
              case 'audio':
              case 'video':
              case 'skype':
                return s

              default:
                return s
            }
          })
          .toArray()
      }))
      .toArray()
  )
}

export function fromStored (lessons: string): List<Lesson> {
  let parsed = List(JSON.parse(lessons))
  parsed = parsed.map(p => ({
    ...p,
    activities: List(p.activities).map(s => {
      switch (s.type) {
        case 'header':
        case 'audio':
        case 'video':
        case 'skype':
          return s

        default:
          return s
      }
    })
  }))

  return parsed
}
