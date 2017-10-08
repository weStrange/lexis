/* @flow */

import { gql } from 'react-apollo'

export const AllCourses = gql`
  query AllCourses {
    course {
      id
      creatorEmail
      name
      students
      levels {
        name
      }
      description
      difficulty
      imageUrl
    }
  }
`

export const Course = gql`
  query Course($id: String!) {
    course(id: $id) {
      id
      creatorEmail
      name
      students
      levels {
        name
      }
      description
      difficulty
      imageUrl
    }
  }
`
