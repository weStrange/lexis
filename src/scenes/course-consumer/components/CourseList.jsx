// @flow

import type { CourseListItem } from '../types'
import * as React from 'react'

import { List as ImmList } from 'immutable'
import { SearchBox, ListPanel, Text, CenterBox } from 'common-components'
import { Grid, List, Paper, ListItem } from 'material-ui'
import styled from 'styled-components'

import * as courseListActions from '../actions-creators/courseListActions'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { gql, graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router'

import { courseListQuery } from '../queries'
import { subscribe, unsubscribe } from '../mutations'

import defaultImage from '../../../assets/course-space.svg'

import { filterCourses } from '../../../core/utils/filters'

import type { AppState } from 'core/types'

const ClickableContainer = styled(ListItem)`
  margin-bottom: 1rem;
  width: 100% !important;
  display: block !important;
  padding: 0;
`

const Container = styled(Paper)`
  padding: 0;
  margin: 0;
  overflow: hidden;
  position: relative;
  max-height: 200px;
`

const HeaderContainer = styled.div`
  margin: 1rem;
  width: 100%;
`

const DescriptionContainer = styled.div`
  margin: 1rem;
  width: 100%;
`

const CourseImg = styled.img`
  height: 150px;
  position: relative;
  top: 50%;
  left: 50%;
  display: block;
  transform: translate(-50%, -50%);
`

const SearchBoxContainer = styled.div`
  width: 70%;
  margin: auto;
`

const Wrapper = styled(Grid)`
  padding: 1rem;
  margin: 1rem;
`

const ImgContainer = styled(Grid)`overflow: hidden;`

type Props = {
  courseFilter: string,
  actions: {
    courseList: typeof courseListActions
  },
  data: {
    course: Array<CourseListItem>,
    coursesByStudentEmail: Array<CourseListItem>,
    refetch: any
  },
  subscribe: any,
  unsubscribe: any,
  history: any
}

class CourseList extends React.Component {
  props: Props

  componentWillMount () {
    this.props.data.refetch()
  }

  renderCourseItems (filteredCourses: ImmList<CourseListItem>) {
    const { actions, history } = this.props

    return filteredCourses.map(({ id, imageUrl, name, description }) => (
      <ListPanel key={id}>
        <ClickableContainer
          key={id}
          onClick={() => {
            actions.courseList.selectCourse(id)
            history.push(`/courses/${name}`)
          }}
          button
        >
          <Container>
            <Grid container spacing={24}>
              <ImgContainer item xs={5}>
                <CourseImg src={imageUrl || defaultImage} />
              </ImgContainer>
              <Grid item xs={7}>
                <HeaderContainer>
                  <Text fontSize={'2rem'}>{name}</Text>
                </HeaderContainer>
                <DescriptionContainer>
                  <Text>{description}</Text>
                </DescriptionContainer>
              </Grid>
            </Grid>
          </Container>
        </ClickableContainer>
      </ListPanel>
    ))
  }

  render () {
    const { actions, data, courseFilter } = this.props
    const { editCourseFilter } = actions.courseList

    if (!data.course) return null

    const subscribedCourses = ImmList(data.coursesByStudentEmail)
    const subscribedCourseIds = subscribedCourses.map(s => s.id)
    const courses = ImmList(data.course).filter(
      p => !subscribedCourseIds.includes(p.id)
    )
    const filteredCourses = filterCourses(courses, courseFilter)
    const filteredSubscribedCourses = filterCourses(
      subscribedCourses,
      courseFilter
    )

    if (!data.course) return null

    return (
      <Wrapper container spacing={0}>
        <SearchBoxContainer>
          <SearchBox onChange={editCourseFilter} text={courseFilter} />
        </SearchBoxContainer>
        <Text
          style={{
            textDecoration: 'underline',
            marginTop: '50px',
            width: '100%',
            display: 'block'
          }}
          primary
          medium
          fontSize={'1.3em'}
        >
          My Courses
        </Text>
        {this.renderCourseItems(filteredSubscribedCourses, actions)}
        <Text
          style={{
            textDecoration: 'underline',
            marginTop: '50px',
            width: '100%',
            display: 'block'
          }}
          primary
          medium
          fontSize={'1.3em'}
        >
          All Courses
        </Text>
        {this.renderCourseItems(filteredCourses, actions)}
      </Wrapper>
    )
  }
}

const CourseListWithData = compose(
  graphql(subscribe, { name: 'subscribe' }),
  graphql(unsubscribe, { name: 'unsubscribe' }),
  graphql(courseListQuery, {
    options: props => {
      return { variables: { email: props.userEmail } }
    }
  })
)(CourseList)

function mapStateToProps (state: AppState) {
  return {
    userEmail: state.auth.credential.email,
    courseFilter: state.courseConsumer.courseList.courseFilter
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: {
      courseList: bindActionCreators(courseListActions, dispatch)
    }
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CourseListWithData)
)
