/* @flow */

import { List } from 'immutable'

import type {
  Audio,
  Video,
  Skype,
  Text,
  WrittenAnswerEx,
  MultiOptionEx,
  Course,
  Lesson,
  Level,
  ActivityKind
} from 'core/types'

export type {
  Audio,
  Video,
  Skype,
  WrittenAnswerEx,
  MultiOptionEx,
  Course,
  Text,
  Lesson,
  Level,
  ActivityKind
}

export type BreadcrumbsState = {
  level: string | null,
  lesson: string | null
}

export type AudioModalState = {
  audio: Audio,
  open: boolean
}

export type VideoModalState = {
  video: Video,
  open: boolean
}

export type SkypeModalState = {
  skype: Skype,
  open: boolean
}

export type TextModalState = {
  text: Text,
  open: boolean
}

export type WrittenAnswerModal = {
  exercise: WrittenAnswerEx,
  open: boolean
}

export type MultiOptionModal = {
  exercise: MultiOptionEx,
  open: boolean
}

export type ActivityAreaSelect = 'main' | 'secondary' | 'none'

export type MainViewState = {
  course: Course,
  selectedActivityArea: ActivityAreaSelect,
  currentLevelIdx: number,
  currentLessonIdx: number,
  currentExerciseIdx: number
}

export type ActivityPickerState = {
  open: boolean
}

export type CourseComposerState = {
  mainView: MainViewState,
  activityPicker: ActivityPickerState,
  breadcrumbs: BreadcrumbsState,
  audioModal: AudioModalState,
  videoModal: VideoModalState,
  skypeModal: SkypeModalState,
  textModal: TextModalState
  // writtenAnswerModal: WrittenAnswerModal,
  // multiOptionModal: MultiOptionModal
}
