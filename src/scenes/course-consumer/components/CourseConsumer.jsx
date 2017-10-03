// @flow

import * as React from 'react'
import { connect } from 'react-redux'
import CourseList from './CourseList'
import type { AppState } from 'core/types'
import CourseContents from './CourseContents'
import { Redirect, Route } from 'react-router'
import LessonConsumer from './LessonConsumer'

type Props = {
  selectedCourse: ?string
}

class CourseConsumer extends React.Component {
  props: Props

  render () {
    const { selectedCourse } = this.props

    return (
      <div>
        {!selectedCourse && <Redirect to='/courses' />}

        <Route path='/courses' exact component={CourseList} />
        <Route path='/courses/:courseName' exact component={CourseContents} />
        <Route
          path='/courses/:courseName/:chapterName/:lessonName'
          exact
          component={LessonConsumer}
        />
      </div>
    )
  }
}

function mapStateToProps (state: AppState) {
  return {
    selectedCourse: state.courseConsumer.courseList.selectedCourse
  }
}

export default connect(mapStateToProps)(CourseConsumer)
