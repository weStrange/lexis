/* @flow */

import { gql } from 'react-apollo'

export const addCourseMutation = gql`
  mutation addCourse(
    $name: String!
    $description: String!
    $difficulty: Difficulty!
    $levels: [LevelInput]
  ) {
    addCourse(
      name: $name
      description: $description
      difficulty: $difficulty
      levels: $levels
    ) {
      id
      name
    }
  }
`
