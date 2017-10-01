// @flow

export type CourseListItem = {
  name: string,
  description: string,
  id: string
}

export type CourseList = {
  selectedCourse: string
}

export type CourseContents = {
  selectedChapterId: string,
  selectedLessonId: string
}

export type CourseConsumerState = {
  courseContents: CourseContents,
  courseList: CourseList
}
