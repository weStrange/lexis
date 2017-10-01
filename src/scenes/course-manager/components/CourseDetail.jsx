/* @flow */

import defaultImage from '../../../assets/course-space.svg'

import React from 'react'
import styled from 'styled-components'
import Grid from 'material-ui/Grid'
import List, { ListItem, ListItemText } from 'material-ui/List'
import { Text } from 'common-components'
import Avatar from 'material-ui/Avatar'
import { connect } from 'react-redux'
import avatar from 'assets/default-avatar.svg'
import EditIcon from 'material-ui-icons/Edit'
import _ from 'lodash'

import { ActionButton } from 'common-components'

import { graphql } from 'react-apollo'
import { Course as CourseQuery } from '../queries'

import { Link } from 'react-router-dom'

const Wrapper = styled(Grid)`
  width: 100vw;
  height: 100vh;
`

type CourseDetailProps = {
  match: any,
  data: any
}
const CourseDetail = ({ match, data }: CourseDetailProps) => {
  console.log(data)
  let course
  if (data.course) {
    course = data.course[0]
  }

  return course ? (
    <Wrapper container>
      <Grid item xs={8}>
        <img
          style={{ width: '80%', height: '80%' }}
          src={course.imageUrl || defaultImage}
        />
        <br />
        <Text medium primary fontSize={'2rem'}>
          BEST STUDENTS
        </Text>
        <List>
          {course.students.map((student, key) => (
            <ListItem key={key}>
              <Avatar src={student.avatarUrl} />
              <ListItemText primary={student.name} secondary={546} />
            </ListItem>
          ))}
        </List>
      </Grid>

      <Grid item xs={4}>
        <Text medium primary fontSize={'2rem'}>
          COURSE INFORMATION
        </Text>
        <List>
          <ListItem>
            <ListItemText primary='Name' secondary={course.name} />
          </ListItem>
          <ListItem>
            <ListItemText
              primary='Description'
              secondary={course.description}
            />
          </ListItem>
          <ListItem>
            <ListItemText primary='Difficulty' secondary={course.difficulty} />
          </ListItem>
          <ListItem>
            <ListItemText
              primary='Number of participants'
              secondary={course.students.length}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary='Number of chapters'
              secondary={course.levels.length}
            />
          </ListItem>
        </List>
      </Grid>

      <Link to={'/course-composer/' + course.id}>
        <ActionButton>
          <EditIcon />
        </ActionButton>
      </Link>
    </Wrapper>
  ) : null
}

export default graphql(CourseQuery, {
  options: ({ match, data }) => {
    return { variables: { id: match.params.courseId } }
  }
})(CourseDetail)
