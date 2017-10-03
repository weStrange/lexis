// @flow

export function selectChapterAndLesson (chapterIdx: number, lessonIdx: number) {
  return {
    type: 'course-consumer-chapter-lesson-select',
    chapterIdx,
    lessonIdx
  }
}

export function resetChapterAndLesson () {
  return {
    type: 'course-consumer-chapter-lesson-reset'
  }
}
