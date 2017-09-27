/* @flow */

import type { Role } from './types'

export type CoreActions =
  | { type: 'core-navigation-index-set', idx: number }
  | { type: 'navigation-change-role', role: Role }
