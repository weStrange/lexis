/* @flow */

import { gql } from 'react-apollo'

export const makeProgress = gql`
  mutation makeProgress($email: String!, $courseId: String!) {
    makeProgress(email: $email, courseId: $courseId) {
      email
      courses {
        course
        progress
      }
    }
  }
`

export const subscribe = gql`
  mutation addStudentToCourse($courseId: String!, $studentEmail: String!) {
    addStudentToCourse(courseId: $courseId, studentEmail: $studentEmail)
  }
`

export const unsubscribe = gql`
  mutation removeStudentFromCourse($courseId: String!, $studentEmail: String!) {
    removeStudentFromCourse(courseId: $courseId, studentEmail: $studentEmail)
  }
`
