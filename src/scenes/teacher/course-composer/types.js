/* @flow */

import { List } from 'immutable'

export type Video = {
  type: 'video',
  url: string
}

export type Audio = {
  type: 'audio',
  url: string
}

export type TextHighlight = {
  length: number,
  offset: number
}

export type Text = {
  type: 'text',
  content: string,
  highlights: List<TextHighlight>
}

export type Skype = {
  type: 'skype',
  startTime: number, // number of seconds from Epoch time
  duration: number, // number of seconds,
  topic: string,
  group: boolean
}

export type WrittenAnswerEx = {
  type: 'written-answer',
  items: List<{ question: string, answer: string }>
}

export type MultiOptionEx = {
  type: 'multi-option',
  items: List<{
    question: string,
    correctIdx: string,
    options: List<string>
  }>
}

export type ActivityKind = MainActivityKind & SecondaryActivityKind

export type MainActivityKind =
  | 'video'
  | 'audio'
  | 'text'
  | 'skype'
  | 'written-answer'
  | 'multi-option'

export type MainActivity =
  | Video
  | Audio
  | Text
  | Skype
  | WrittenAnswerEx
  | MultiOptionEx

export type SecondaryActivityKind =
  | 'audio'
  | 'text'
  | 'written-answer'
  | 'multi-option'

export type SecondaryActivity = Audio | Text | WrittenAnswerEx | MultiOptionEx

export type Exercise = {
  id: string,
  name: string,
  mainActivity: MainActivity | null,
  secondaryActivity: SecondaryActivity | null
}

export type Lesson = {
  id: string,
  name: string,
  exercises: List<Exercise>
}

export type Level = {
  id: string,
  name: string,
  lessons: List<Lesson>
}

export type Course = {
  id: string,
  name: string,
  difficulty: CourseDifficulty,
  levels: List<Level>
}

export type CourseDifficulty =
  | 'Beginner'
  | 'Intermediate'
  | 'Upper-intermediate'
  | 'Advanced'
  | 'Proficient'

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
