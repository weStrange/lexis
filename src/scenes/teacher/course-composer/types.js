/* @flow */

import { List } from 'immutable'

export type ContentPickerState = {}

export type Video = {
  type: 'video',
  url: string
}

export type Audio = {
  type: 'audio',
  url: string
}

export type TextHighlight = {
  id: string,
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

export type MainActivity =
  | Video
  | Audio
  | Text
  | Skype
  | WrittenAnswerEx
  | MultiOptionEx

export type SecondaryActivity = Audio | Text | WrittenAnswerEx | MultiOptionEx

export type Lesson = {
  id: string,
  name: string,
  mainActivity: MainActivity,
  secondaryActivity: SecondaryActivity
}

export type Level = {
  id: string,
  name: string,
  lessons: List<Lesson>
}

export type CourseDifficulty =
  | 'Beginner'
  | 'Intermediate'
  | 'Upper-intermediate'
  | 'Advanced'
  | 'Proficient'

export type CourseComposerState = {
  levels: List<Level>,
  contentPicker: ContentPickerState,
  difficulty: CourseDifficulty
}
