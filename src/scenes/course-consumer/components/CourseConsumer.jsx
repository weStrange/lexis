// @flow

import * as React from 'react'
import { connect } from 'react-redux'
import { gql, graphql } from 'react-apollo'
import type { CourseListItem } from '../types'
import CourseList from './CourseList'

type Props = {
  data: {
    coursesByStudentEmail: Array<CourseListItem>
  }
}

class CourseConsumer extends React.Component {
  render () {
    const courses = this.props.data.coursesByStudentEmail

    return (
      <div>
        <CourseList courses={courses} />
      </div>
    )
  }
}

// export default CourseConsumer

const CourseConsumerWithData = graphql(gql`
  query courseConsumerCourseList {
    coursesByStudentEmail(email: "test@test.test") {
      name
      description
      id
    }
  }
`)(CourseConsumer)

function mapStateToProps (state) {
  return {}
}

export default connect(mapStateToProps)(CourseConsumerWithData)
