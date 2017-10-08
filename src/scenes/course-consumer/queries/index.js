// @flow

import { gql } from 'react-apollo'

// const courseListQuery = gql`
//   query courseConsumerCourseList {
//     coursesByStudentEmail(email: "test@test.test") {
//       name
//       description
//       id
//       imageUrl
//     }
//   }
// `

const courseListQuery = gql`
  query courseConsumerCourseList($email: String!) {
    course {
      name
      description
      id
      imageUrl
    }
    coursesByStudentEmail(email: $email) {
      name
      description
      id
      imageUrl
    }
  }
`
export const progressQuery = gql`
  query progressQuery($id: String!, $email: String!) {
    progress(courseId: $id, email: $email)
  }
`

const courseContentsQuery = gql`
  query CourseConsumerCourseContents($id: String!, $email: String!) {
    course(id: $id) {
      id
      creatorEmail
      name
      levels {
        name
        description
        lessons
      }
      students
      description
      difficulty
      imageUrl
    }
    progress(courseId: $id, email: $email)
  }
`

export { courseListQuery, courseContentsQuery }
