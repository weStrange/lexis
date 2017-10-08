/* @flow */

import { List as ImmList } from 'immutable'
import Fuse from 'fuse.js'

import defaultImage from '../../../assets/course-space.svg'

import React, { Component } from 'react'
import styled from 'styled-components'
import Grid from 'material-ui/Grid'
import Divider from 'material-ui/Divider'
import List, { ListItem, ListItemText } from 'material-ui/List'
import { GridList, GridListTile, GridListTileBar } from 'material-ui/GridList'
import { Text, ActionButton, CenterBox, SearchBox } from 'common-components'
import Card from 'material-ui/Card'
import AddIcon from 'material-ui-icons/Add'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'

import { AllCourses as CourseQuery } from '../queries'

import * as actionCreators from '../action-creators'

import type { Course, AppState } from 'core/types'
import type { CourseState, FilterState } from '../types'
import { filterCourses } from 'core/utils/filters'

const CourseGridList = styled(GridList)`
  width: 100%;
  height: 450;
`

const CourseTitle = styled(ListItemText)`color: #5b86e5 !important;`

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

const SearchSection = styled(CenterBox)`
  flex-basis: 70%;
  margin: 20px 20px 20px 20px;
`

type CourseListProps = {
  item: any,
  course: CourseState,
  filter: FilterState,
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

  componentWillMount () {
    this.props.data.refetch()
  }

  render () {
    const { item, course, actions, filter } = this.props
    // const courses = data.course || []

    return (
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
          overflow: 'hidden',
          width: '100%'
        }}
      >
        {/*  <Text primary medium fontSize={'1.3em'}>
          Your courses
        </Text>  */}
        <SearchSection>
          <SearchBox
            onChange={actions.filter.editSearch}
            text={filter.search}
          />
        </SearchSection>
        <CourseGridList cellHeight={180}>
          {filterCourses(course.all, filter.search).map((p, i) => (
            <Card
              key={i}
              style={{
                margin: '10px 10px 10px 10px',
                textDecoration: 'none',
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
                <ListItem style={{ paddingBottom: '10px', paddingTop: '0px' }}>
                  <CourseTitle disableTypography primary={p.name} />
                </ListItem>
                <Divider />
                <ListItem style={{ paddingBottom: '0px', paddingTop: '0px' }}>
                  <ListItemText
                    primary='Number of participants'
                    secondary={(p.students || List()).size}
                  />
                </ListItem>
                <Divider />
                <ListItem style={{ paddingBottom: '0px', paddingTop: '0px' }}>
                  <ListItemText primary='Difficulty' secondary={p.difficulty} />
                </ListItem>
                <Divider />
                <ListItem style={{ paddingBottom: '0px', paddingTop: '0px' }}>
                  <ListItemText
                    primary='Number of chapters'
                    secondary={p.levels.size}
                  />
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
    course: state.courseManager.course,
    filter: state.courseManager.filter
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: {
      details: bindActionCreators(actionCreators.detailsActions, dispatch),
      main: bindActionCreators(actionCreators.mainActions, dispatch),
      filter: bindActionCreators(actionCreators.filterActions, dispatch)
    }
  }
}

const ConnectedCourseList = connect(mapStateToProps, mapDispatchToProps)(
  CourseList
)

export default graphql(CourseQuery)(ConnectedCourseList)
