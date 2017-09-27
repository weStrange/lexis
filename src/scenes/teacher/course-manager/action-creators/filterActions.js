/* @flow */

import type { Action } from '../../../../actions'

export function editSearch (search: string): Action {
  return {
    type: 'course-manager-search-edit',
    search: search
  }
}
