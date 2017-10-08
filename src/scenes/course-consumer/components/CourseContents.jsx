// @flow

import * as React from 'react'
import type { AppState, Course } from 'core/types'
import { connect } from 'react-redux'
import { graphql, compose, withApollo } from 'react-apollo'
import { courseContentsQuery } from '../queries'
import { subscribe, unsubscribe } from '../mutations'
import { Wrapper, Text } from 'common-components'
import { Grid, List, ListItem, Button } from 'material-ui'
import { courseContentsActions } from '../actions-creators'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import styled from 'styled-components'
import defaultImage from '../../../assets/course-space.svg'

import type { Level } from 'core/types'

const Container = styled(Grid)`padding: 3rem;`
const CourseImage = styled.img`
  height: 300px;
  position: relative;
  top: 50%;
  left: 50%;
  display: block;
  transform: translate(-50%, -50%);
`
const ImageContainer = styled(Grid)`overflow: hidden;`

type Props = {
  userEmail: string,
  course: Course,
  selectedCourse: Course,
  progress: number,
  subscribed: boolean,
  actions: {
    courseContents: typeof courseContentsActions
  },
  subscribe: any,
  unsubscribe: any,
  history: any,
  client: any,
  location: Location
}

class CourseContents extends React.Component {
  props: Props

  componentWillMount () {
    this.props.data.refetch()
  }

  renderLessonListItems (
    chapterIdx: number,
    chapter: Level,
    prevOffset: number
  ) {
    const { courseContents } = this.props.actions
    const { history, location, progress, subscribed } = this.props

    return chapter.lessons.map((lesson, i) => (
      <ListItem
        button
        disabled={!subscribed || prevOffset + i > progress}
        onClick={() => {
          courseContents.selectChapterAndLesson(chapterIdx, i)
          history.push(
            history.push(`${location.pathname}/${chapter.name}/${lesson.name}`)
          )
        }}
        key={i}
      >
        <Text>{`${i + 1}. ${lesson.name}`}</Text>
      </ListItem>
    ))
  }

  renderTableOfContents () {
    const { course } = this.props

    if (course) {
      return course.levels.map((chapter, i, arr) => (
        <div key={i}>
          <Text fontSize={'1.5rem'}>{`${i + 1}. ${chapter.name}`}</Text>
          <List>
            {this.renderLessonListItems(
              i,
              chapter,
              arr.take(i).reduce((acc, s) => acc + s.lessons.size, 0) // number of lessons before
            )}
          </List>
        </div>
      ))
    }
  }

  render () {
    const {
      course,
      userEmail,
      subscribe,
      unsubscribe,
      subscribed,
      selectedCourse
    } = this.props

    return (
      <Container container>
        {course ? (
          <Grid container>
            <ImageContainer item xs={4}>
              <CourseImage src={course.imageUrl || defaultImage} />
            </ImageContainer>
            <Grid item xs={8}>
              <p>
                <Text fontSize={'3rem'}>{course.name}</Text>
              </p>
              <p>
                <Text fontSize={'1.5rem'}>{course.description}</Text>
              </p>
            </Grid>
            <Grid item xs={12}>
              <p>
                <Text fontSize={'2rem'}>Contents</Text>
              </p>
              {this.renderTableOfContents()}
            </Grid>
            <Button
              raised
              style={{
                backgroundColor: subscribed ? 'grey' : 'red',
                color: 'white',
                fontWeight: 'bold',
                position: 'fixed',
                right: '50px',
                bottom: '50px'
              }}
              onClick={() =>
                (subscribed ? unsubscribe : subscribe)({
                  variables: {
                    studentEmail: userEmail,
                    courseId: course.id
                  },
                  refetchQueries: [
                    {
                      query: courseContentsQuery,
                      variables: { id: selectedCourse, email: userEmail }
                    }
                  ]
                })}
            >
              {subscribed ? 'Unsubscribe' : 'Subscribe'}
            </Button>
          </Grid>
        ) : (
          <div>No course data available</div>
        )}
      </Container>
    )
  }
}

function mapStateToProps (state: AppState) {
  return {
    userEmail: state.auth.credential.email,
    selectedCourse: state.courseConsumer.courseList.selectedCourse,
    course: state.courseConsumer.courseContents.course,
    progress: state.courseConsumer.courseContents.progress,
    subscribed: state.courseConsumer.courseContents.subscribed
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: {
      courseContents: bindActionCreators(courseContentsActions, dispatch)
    }
  }
}

const CourseContentsWithData = compose(
  graphql(subscribe, {
    name: 'subscribe'
  }),
  graphql(unsubscribe, { name: 'unsubscribe' }),
  graphql(courseContentsQuery, {
    options: props => {
      return {
        variables: { id: props.selectedCourse, email: props.userEmail }
      }
    }
  })
)(CourseContents)

export default withApollo(
  withRouter(
    connect(mapStateToProps, mapDispatchToProps)(CourseContentsWithData)
  )
)
