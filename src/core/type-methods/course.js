/* @flow */

import type { CourseDifficulty } from '../types'

export function difficultyToStored (difficulty: CourseDifficulty): string {
  switch (difficulty) {
    case 'Beginner':
      return 'BEGINNER'

    case 'Intermediate':
      return 'INTERMEDIATE'

    case 'Upper-intermediate':
      return 'UPPERINTERMEDIATE'

    case 'Advanced':
      return 'ADVANCED'

    case 'Proficient':
      return 'PROFICIENT'

    default:
      return difficulty.toUpperCase()
  }
}

export function difficultyFromStored (difficulty: string): CourseDifficulty {
  switch (difficulty) {
    case 'BEGINNER':
      return 'Beginner'

    case 'INTERMEDIATE':
      return 'Intermediate'

    case 'UPPERINTERMEDIATE':
      return 'Upper-intermediate'

    case 'ADVANCED':
      return 'Advanced'

    case 'PROFICIENT':
      return 'Proficient'

    default:
      return 'Beginner'
  }
}
