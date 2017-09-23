/* @flow */


import { List } from 'immutable'

import type { Action } from '../../../../actions'
import type { VideoModalState } from '../types'

function getInitialState (): VideoModalState {
  return {
    video: {
      type: 'video',
      url: ''
    },
    open: false
  }
}

export default function videoReducer (
  state: VideoModalState = getInitialState(),
  action: Action
): VideoModalState {
  switch (action.type) {
    case 'teacher-composer-video-url-edit':
      return {
        ...state,
        video: {
          ...state.video,
          url: action.url
        }
      }

    case 'teacher-composer-video-modal-open':
      return {
        ...state,
        open: true
      }

    case 'teacher-composer-video-modal-open':
      return {
        ...state,
        open: false
      }

    default:
      return state
  }
}
