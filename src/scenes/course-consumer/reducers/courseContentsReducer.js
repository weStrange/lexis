// @flow

import type { Action } from '../../../actions'
import type { CourseContentsState } from '../types'
import { parseFetchedCourse } from 'core/utils/parsers'

function getInitialState (): CourseContentsState {
  return {
    course: null,
    selectedChapterIdx: null,
    selectedLessonIdx: null
  }
}

export default function courseContentsReducer (
  state: CourseContentsState = getInitialState(),
  action: Action
): CourseContentsState {
  switch (action.type) {
    case 'APOLLO_QUERY_RESULT':
    case 'APOLLO_QUERY_RESULT_CLIENT':
      if (
        // make sure the operation is the one caused by the course-consumer
        action.operationName === 'CourseConsumerCourseContents'
      ) {
        return {
          ...state,
          course: parseFetchedCourse(action.result.data.course[0])
        }
      }
      return state
    case 'course-consumer-chapter-lesson-select':
      return {
        ...state,
        selectedChapterIdx: action.chapterIdx,
        selectedLessonIdx: action.lessonIdx
      }
    default:
      return state
  }
}
