// @flow

import { gql } from 'react-apollo'

export default gql`
  query coursesByStudentEmail() {
     coursesByStudentEmail(email: "test@test.test") { 
        name
     }
  }
`
