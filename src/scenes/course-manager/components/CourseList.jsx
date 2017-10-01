/* @flow */

import { List as ImmList } from 'immutable'

import defaultImage from '../../../assets/course-space.svg'

import React, { Component } from 'react'
import styled from 'styled-components'
import Grid from 'material-ui/Grid'
import List, { ListItem } from 'material-ui/List'
import { GridList, GridListTile, GridListTileBar } from 'material-ui/GridList'
import { Text, ActionButton } from 'common-components'
import Card from 'material-ui/Card'
import AddIcon from 'material-ui-icons/Add'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'

import { AllCourses as CourseQuery } from '../queries'

import * as actionCreators from '../action-creators'

import type { Course, AppState } from 'core/types'
import type { CourseState } from '../types'

const CourseGridList = styled(GridList)`
  width: 100%;
  height: 450;
`

const PropertyList = styled(List)``

const ImageGridListTile = styled(GridListTile)`
  width: 40%;
  height: 100%;
  float: left;
`

const StrongAndUp = styled.span`
  text-transform: uppercase;
  font-weight: bold;
`

const CourseItem = styled(ListItem)`
  &::after {
    border-left: 1px solid ${props => props.theme.primary} !important;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    content: '';
  }
`
type CourseListProps = {
  item: any,
  course: CourseState,
  actions: any,
  data: any,
  props?: any
}

class CourseList extends Component {
  props: CourseListProps

  constructor (props: CourseListProps) {
    super(props)

    // this.props.actions.main.start()
  }

  render () {
    const { item, course, actions, data } = this.props
    const courses = data.course || []

    return (
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
          overflow: 'hidden'
        }}
      >
        <Text primary medium fontSize={'1.3em'}>
          Your courses
        </Text>
        <CourseGridList cellHeight={180}>
          {courses.map((p, i) => (
            <Card
              key={i}
              style={{
                margin: '10px 10px 10px 10px',
                width: '45%',
                color: 'black'
              }}
              component={Link}
              to={'/course-manager/' + p.id}
            >
              <ImageGridListTile>
                <img src={p.imageUrl || defaultImage} alt={p.name} />
              </ImageGridListTile>
              <PropertyList>
                <ListItem>
                  <StrongAndUp>Name: </StrongAndUp>
                  <span style={{ textAlign: 'left' }}>{p.name}</span>
                </ListItem>
                <ListItem>
                  <StrongAndUp>Number of participants: </StrongAndUp>
                  <span style={{ textAlign: 'left' }}>{p.students.length}</span>
                </ListItem>
                <ListItem>
                  <StrongAndUp>Difficulty: </StrongAndUp>
                  <span style={{ textAlign: 'left' }}>{p.difficulty}</span>
                </ListItem>
                <ListItem>
                  <StrongAndUp>Number of chapters: </StrongAndUp>
                  <span style={{ textAlign: 'left' }}>{p.levels.length}</span>
                </ListItem>
              </PropertyList>
            </Card>
          ))}
        </CourseGridList>

        <Link to='/course-composer/new'>
          <ActionButton>
            <AddIcon />
          </ActionButton>
        </Link>
      </div>
    )
  }
}

function mapStateToProps (state: AppState) {
  return {
    course: state.courseManager.course
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: {
      details: bindActionCreators(actionCreators.detailsActions, dispatch),
      main: bindActionCreators(actionCreators.mainActions, dispatch)
    }
  }
}

const ConnectedCourseList = connect(mapStateToProps, mapDispatchToProps)(
  CourseList
)

export default graphql(CourseQuery)(ConnectedCourseList)
