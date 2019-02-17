// @flow

import { List } from 'immutable'

import * as React from 'react'
import type { AppState, Lesson, Course, Activity } from 'core/types'
import { connect } from 'react-redux'

import { ActivityContent, Text, ActionButton } from 'common-components'
import { Grid, Paper } from 'material-ui'
import styled from 'styled-components'
import ListIcon from 'material-ui-icons/List'
import {
  courseContentsActions,
  lessonConsumerActions
} from '../actions-creators'
import DoneIcon from 'material-ui-icons/Done'

import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import type { ActivityAnswer } from '../types'
import WritingActivityAnswer from './WritingActivityAnswer'
import WrittenAnswerActivityAnswer from './WrittenAnswerActivityAnswer'
import { graphql, compose } from 'react-apollo'

import { makeProgress } from '../mutations'
import { progressQuery } from '../queries'

const Container = styled(Grid)`padding: 3rem;`

const ActivityContainer = styled(Paper)`
  margin-bottom: 1.5rem;
  padding: 1rem;
`

type Props = {
  userEmail: string,
  lesson: Lesson,
  course: Course,
  activityAnswers: Map<string, ActivityAnswer>,
  data: any,
  numberOfPrevLessons: number,
  actions: {
    courseContents: typeof courseContentsActions,
    lessonConsumer: typeof lessonConsumerActions
  },
  makeProgress: any,
  history: any
}

class LessonConsumer extends React.Component {
  props: Props
  handleCourseContentsButtonClick: Function

  constructor (props: Props) {
    super(props)

    const { actions, lesson } = this.props

    this.handleCourseContentsButtonClick = this.handleCourseContentsButtonClick.bind(
      this
    )

    if (lesson) actions.lessonConsumer.startLessonConsumer(lesson.activities)
  }

  handleCourseContentsButtonClick () {
    const { course, actions, history } = this.props

    actions.courseContents.resetChapterAndLesson()

    if (course) history.push(`/courses/${course.name}`)
    else history.push(`/courses`)
  }

  handleWrittenAnswerActivityAnswerChange (activityIdx, itemIdx, inputState) {
    const { editWrittenAnswerItem } = this.props.actions.lessonConsumer

    editWrittenAnswerItem(activityIdx.toString(), itemIdx, inputState)
  }

  handleWrittenAnswerActivityAnswerCompletion (activityIdx, itemIdx) {
    const { completeWrittenAnswerItem } = this.props.actions.lessonConsumer

    completeWrittenAnswerItem(activityIdx.toString(), itemIdx)
  }

  handleWritingAnswerChange (activityIdx, inputState) {
    const { editWriting } = this.props.actions.lessonConsumer

    editWriting(activityIdx.toString(), inputState)
  }

  handleWritingAnswerSubmission (activityIdx) {
    const { submitWriting } = this.props.actions.lessonConsumer

    submitWriting(activityIdx.toString())
  }

  handleWritingAnswerEditingStart (activityIdx) {
    const { startWritingEditing } = this.props.actions.lessonConsumer

    startWritingEditing(activityIdx.toString())
  }

  renderActivity (activity: Activity, activityIdx) {
    const { activityAnswers, actions } = this.props
    const activityAnswer = activityAnswers.get(activityIdx.toString())

    switch (activity.type) {
      case 'written-answer':
        if (!activityAnswer || activityAnswer.type !== 'written-answer')
          return null

        return (
          <ActivityContainer>
            <WrittenAnswerActivityAnswer
              activity={activity}
              activityAnswer={activityAnswer}
              onChange={(studentAnswer, itemIdx) => {
                this.handleWrittenAnswerActivityAnswerChange(
                  activityIdx,
                  itemIdx,
                  studentAnswer
                )
              }}
              onComplete={itemIdx => {
                this.handleWrittenAnswerActivityAnswerCompletion(
                  activityIdx,
                  itemIdx
                )
              }}
            />
          </ActivityContainer>
        )
      case 'writing':
        if (!activityAnswer) return null

        return (
          <ActivityContainer>
            <WritingActivityAnswer
              activity={activity}
              activityAnswer={activityAnswers.get(activityIdx.toString())}
              onChange={studentAnswer =>
                this.handleWritingAnswerChange(activityIdx, studentAnswer)}
              onSubmit={() => this.handleWritingAnswerSubmission(activityIdx)}
              onStartEdit={() =>
                this.handleWritingAnswerEditingStart(activityIdx)}
            />
          </ActivityContainer>
        )
      case 'header':
        return <ActivityContent activity={activity} />
      default:
        return (
          <ActivityContainer>
            <ActivityContent activity={activity} />
          </ActivityContainer>
        )
    }
  }

  renderActivities () {
    const { lesson } = this.props

    if (!lesson) return null

    const { activities } = lesson

    return activities.map((activity: Activity, i) => (
      <Grid key={i} item xs={12}>
        {this.renderActivity(activity, i)}
      </Grid>
    ))
  }

  renderLessonHeader () {
    const { lesson } = this.props

    if (!lesson) return null

    return (
      <Grid item xs={12}>
        <Text fontSize={'2.5rem'}>{lesson.name}</Text>
      </Grid>
    )
  }

  render () {
    const {
      lesson,
      course,
      makeProgress,
      userEmail,
      data,
      numberOfPrevLessons,
      activityAnswers
    } = this.props
    const complete = List(activityAnswers.values()).reduce((acc, p) => {
      switch (p.type) {
        case 'writing':
          return acc && p.submitted

        case 'written-answer':
          return acc && p.studentAnswers.filter(s => !s.complete).isEmpty()

        default:
          return acc
      }
    }, true)
    console.log(complete, List(activityAnswers.values()).toArray())
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
        {data.progress > numberOfPrevLessons ? (
          <ActionButton onClick={this.handleCourseContentsButtonClick}>
            <ListIcon />
          </ActionButton>
        ) : (
          <ActionButton
            disabled={!complete}
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
        )}
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
  let numberOfPrevLessons

  if (typeof selectedChapterIdx === 'number' && course && course.levels) {
    chapter = course.levels.get(selectedChapterIdx)
    numberOfPrevLessons =
      course.levels
        .take(selectedChapterIdx)
        .reduce((acc, p) => acc + p.lessons.size, 0) + selectedLessonIdx
  }

  if (typeof selectedLessonIdx === 'number' && chapter && chapter.lessons)
    lesson = chapter.lessons.get(selectedLessonIdx)

  return {
    userEmail: state.auth.credential.email,
    numberOfPrevLessons: numberOfPrevLessons,
    lesson: lesson,
    course: course,
    activityAnswers: state.courseConsumer.lessonConsumer.activityAnswers
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: {
      courseContents: bindActionCreators(courseContentsActions, dispatch),
      lessonConsumer: bindActionCreators(lessonConsumerActions, dispatch)
    }
  }
}

const LessonConsumerWithMutation = compose(
  graphql(makeProgress, {
    name: 'makeProgress'
  }),
  graphql(progressQuery, {
    options: props => {
      return {
        variables: { id: props.course.id, email: props.userEmail }
      }
    }
  })
)(LessonConsumer)

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LessonConsumerWithMutation)
)
