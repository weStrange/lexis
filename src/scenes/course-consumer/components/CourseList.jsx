// @flow

import type { CourseListItem } from '../types'
import * as React from 'react'

import { Wrapper, ListPanel, Text } from 'common-components'
import { Grid, List, Paper, ListItem } from 'material-ui'
import styled from 'styled-components'
import { bindActionCreators } from 'redux'
import * as courseListActions from '../actions-creators/courseListActions'
import { connect } from 'react-redux'
import { gql, graphql } from 'react-apollo'
import { withRouter } from 'react-router'
import { courseListQuery } from '../queries/index'

const ClickableContainer = styled(ListItem)`
  margin-bottom: 1rem;
  width: 100% !important;
  display: block !important;
`

const HeaderContainer = styled.div`
  margin-bottom: 1rem;
  width: 100%;
`

const DescriptionContainer = styled.div`
  margin-bottom: 1rem;
  width: 100%;
`

type Props = {
  onItemClick: (courseId: string) => void,
  actions: {
    courseList: typeof courseListActions
  },
  data: {
    coursesByStudentEmail: Array<CourseListItem>
  }
}

const CourseList = ({ data, onItemClick, actions, history }: Props) => {
  const courses = data.coursesByStudentEmail

  if (!courses) return null

  const renderCourseItems = () => {
    return courses.map(({ id, name, description }) => (
      <ListPanel key={id}>
        <ClickableContainer
          key={id}
          onClick={() => {
            actions.courseList.selectCourse(id)
            history.push(`/courses/${name}`)
          }}
          button
        >
          <HeaderContainer>
            <Text fontSize={'1.3rem'}>{name}</Text>
          </HeaderContainer>
          <DescriptionContainer>
            <Text>{description}</Text>
          </DescriptionContainer>
        </ClickableContainer>
      </ListPanel>
    ))
  }

  return <Grid container>{renderCourseItems()}</Grid>
}

const CourseListWithData = graphql(courseListQuery)(CourseList)

function mapDispatchToProps (dispatch) {
  return {
    actions: {
      courseList: bindActionCreators(courseListActions, dispatch)
    }
  }
}

export default withRouter(connect(null, mapDispatchToProps)(CourseListWithData))
