/* @flow */

import { List as ImmList } from 'immutable'

import React from 'react'
import styled from 'styled-components'
import Grid from 'material-ui/Grid'
import List, { ListItem } from 'material-ui/List'
import { GridList, GridListTile, GridListTileBar } from 'material-ui/GridList'
import { Text, ActionButton } from 'common-components'
import Card from 'material-ui/Card'
import AddIcon from 'material-ui-icons/Add'

import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import type { Course } from 'core/types'

const CourseGridList = styled(GridList)`
  width: 100%;
  height: 450;
`

const PropertyList = styled(List)`float: right;`

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
  courses: ImmList<Course>,
  props?: any
}
const CourseList = ({ item, courses, ...props }: CourseListProps) => (
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
          style={{
            margin: '10px 10px 10px 10px',
            width: '45%',
            color: 'black'
          }}
          component={Link}
          to='/course-manager/course-detail'
        >
          <ImageGridListTile key={i}>
            <img
              src='https://lh3.ggpht.com/EaoEf2uSk3CFAhPw9Fk-mbkU7c_qdBMlF5myx1ocDx4cHw54G21wDokRZSySJ3pd4iw=w300'
              alt={p.name}
            />
          </ImageGridListTile>
          <PropertyList>
            <ListItem>
              <StrongAndUp>Name: </StrongAndUp>
              {'  ' + p.name}
            </ListItem>
            <ListItem>
              <StrongAndUp>Creation date: </StrongAndUp>
              {'  01.01.2017'}
            </ListItem>
            <ListItem>
              <StrongAndUp>Number of participants: </StrongAndUp>
              {'  125'}
            </ListItem>
            <ListItem>
              <StrongAndUp>Difficulty: </StrongAndUp>
              {'  ' + p.difficulty}
            </ListItem>
          </PropertyList>
        </Card>
      ))}
    </CourseGridList>

    <Link to='/course-composer'>
      <ActionButton>
        <AddIcon />
      </ActionButton>
    </Link>
  </div>
)

export default connect(state => ({
  // mock data at the moment. will retrieve course list from actual redux store later
  courses: [
    {
      name: 'Course1',
      difficulty: 'Intermediate'
    },
    {
      name: 'Course1',
      difficulty: 'Intermediate'
    },
    {
      name: 'Course1',
      difficulty: 'Intermediate'
    },
    {
      name: 'Course1',
      difficulty: 'Intermediate'
    },
    {
      name: 'Course1',
      difficulty: 'Intermediate'
    },
    {
      name: 'Course1',
      difficulty: 'Intermediate'
    },
    {
      name: 'Course1',
      difficulty: 'Intermediate'
    },
    {
      name: 'Course1',
      difficulty: 'Intermediate'
    },
    {
      name: 'Course1',
      difficulty: 'Intermediate'
    },
    {
      name: 'Course1',
      difficulty: 'Intermediate'
    }
  ]
}))(CourseList)
