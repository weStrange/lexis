/* @flow */


import { List } from 'immutable'

import type { Action } from '../../../../actions'
import type { AudioModalState } from '../types'

function getInitialState (): AudioModalState {
  return {
    audio: {
      type: 'audio',
      url: ''
    },
    open: false
  }
}

export default function audioReducer (
  state: AudioModalState = getInitialState(),
  action: Action
): AudioModalState {
  switch (action.type) {
    case 'teacher-composer-audio-url-edit':
      return {
        ...state,
        video: {
          ...state.audio,
          url: action.url
        }
      }

    case 'teacher-composer-audio-modal-open':
      return {
        ...state,
        open: true
      }

    case 'teacher-composer-audio-modal-open':
      return {
        ...state,
        open: false
      }

    default:
      return state
  }
}
