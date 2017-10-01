/* @flow */

import { gql } from 'react-apollo'

export const addCourseMutation = gql`
  mutation addCourse(
    $name: String!
    $description: String!
    $difficulty: Difficulty!
    $levels: [LevelInput]
    $imageUrl: String
  ) {
    addCourse(
      name: $name
      description: $description
      difficulty: $difficulty
      levels: $levels
      imageUrl: $imageUrl
    ) {
      id
      name
      imageUrl
    }
  }
`

export const updateCourseMutation = gql`
  mutation updateCourse(
    $id: String!
    $name: String!
    $description: String!
    $difficulty: Difficulty!
    $levels: [LevelInput]
    $imageUrl: String
  ) {
    updateCourse(
      id: $id
      name: $name
      description: $description
      difficulty: $difficulty
      levels: $levels
      imageUrl: $imageUrl
    ) {
      id
      name
      imageUrl
    }
  }
`
