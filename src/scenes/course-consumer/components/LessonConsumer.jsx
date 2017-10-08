// @flow

import * as React from 'react'

import { ActivityContent, Text, ActionButton } from 'common-components'
import { Grid, Paper } from 'material-ui'
import styled from 'styled-components'
import ListIcon from 'material-ui-icons/List'
import DoneIcon from 'material-ui-icons/Done'

import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'

import { courseContentsActions } from '../actions-creators'

import { makeProgress } from '../mutations'
import { progressQuery } from '../queries'

import type { AppState, Lesson, Course } from 'core/types'

const Container = styled(Grid)`padding: 3rem;`

const ActivityContainer = styled(Paper)`
  margin-bottom: 1.5rem;
  padding: 1rem;
`

type Props = {
  userEmail: string,
  lesson: Lesson,
  course: Course,
  actions: {
    courseContents: typeof courseContentsActions
  },
  makeProgress: any,
  history: any
}

class LessonConsumer extends React.Component {
  props: Props
  handleCourseContentsButtonClick: Function

  constructor (props: Props) {
    super(props)

    this.handleCourseContentsButtonClick = this.handleCourseContentsButtonClick.bind(
      this
    )
  }

  handleCourseContentsButtonClick () {
    const { course, actions, history } = this.props

    actions.courseContents.resetChapterAndLesson()

    if (course) history.push(`/courses/${course.name}`)
    else history.push(`/courses`)
  }

  renderActivities () {
    const { lesson } = this.props

    if (!lesson) return null

    const { activities } = lesson

    return activities.map((activity, i) => (
      <Grid key={i} item xs={12}>
        <ActivityContainer>
          <ActivityContent activity={activity} />
        </ActivityContainer>
      </Grid>
    ))
  }

  renderLessonHeader () {
    const { lesson } = this.props

    if (!lesson) return null

    return (
      <Grid item xs={12}>
        <ActivityContainer>
          <p>
            <Text fontSize={'2rem'}>{lesson.name}</Text>
          </p>
        </ActivityContainer>
      </Grid>
    )
  }

  render () {
    const { lesson, course, makeProgress, userEmail } = this.props

    return (
      <div>
        {lesson ? (
          <Container container>
            {this.renderLessonHeader()}
            {this.renderActivities()}
          </Container>
        ) : (
          <div>no lesson data</div>
        )}
        {/*  <ActionButton onClick={this.handleCourseContentsButtonClick}>
          <ListIcon />
        </ActionButton> */}
        <ActionButton
          onClick={() =>
            makeProgress({
              variables: {
                email: this.props.userEmail,
                courseId: course.id
              }
            }).then(() => this.handleCourseContentsButtonClick())}
        >
          <DoneIcon />
        </ActionButton>
      </div>
    )
  }
}

function mapStateToProps (state: AppState) {
  const {
    selectedChapterIdx,
    selectedLessonIdx,
    course
  } = state.courseConsumer.courseContents

  let chapter
  let lesson

  if (typeof selectedChapterIdx === 'number' && course && course.levels)
    chapter = course.levels.get(selectedChapterIdx)

  if (typeof selectedLessonIdx === 'number' && chapter && chapter.lessons)
    lesson = chapter.lessons.get(selectedLessonIdx)

  return {
    userEmail: state.auth.credential.email,
    lesson: lesson,
    course: course
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: {
      courseContents: bindActionCreators(courseContentsActions, dispatch)
    }
  }
}

const LessonConsumerWithMutation = graphql(makeProgress, {
  name: 'makeProgress'
})(LessonConsumer)

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LessonConsumerWithMutation)
)
