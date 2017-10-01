// @flow

import { gql } from 'react-apollo'

export default gql`
  query user {
    user(email: "test@test.test") {
      email
    }
  }
`
