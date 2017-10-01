/* @flow */

import { gql } from 'react-apollo'

export const Course = gql`
  query CourseForUpdate($id: String!) {
    course(id: $id) {
      id
      creatorEmail
      name
      levels {
        name
        description
        lessons
      }
      description
      difficulty
      imageUrl
    }
  }
`
