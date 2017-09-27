import React from 'react'
import styled from 'styled-components'
import Grid from 'material-ui/Grid'
import List, { ListItem, ListItemText } from 'material-ui/List'
import { Text } from 'common-components'
import Avatar from 'material-ui/Avatar'
import Youtube from 'react-youtube'
import { connect } from 'react-redux'
import avatar from 'assets/default-avatar.svg'
import _ from 'lodash'

const Wrapper = styled(Grid)`
  width: 100vw;
  height: 100vh;
`
const CourseDetail = ({ course }) => (
  <Wrapper container>
    <Grid item xs={8}>
      <Youtube videoId={'3tmd-ClpJxA'} />
      <br />
      <Text medium primary fontSize={'2rem'}>
        COURSE INFORMATION
      </Text>
      <List>
        {_.map(course.info, (item, key) => (
          <ListItem key={key}>
            <ListItemText primary={key.toUpperCase()} secondary={item} />
          </ListItem>
        ))}
      </List>
    </Grid>
    <Grid item xs={4}>
      <Text medium primary fontSize={'2rem'}>
        BEST STUDENT
      </Text>
      <List>
        {course.studentList.map((student, key) => (
          <ListItem key={key}>
            <Avatar src={student.avatar} />
            <ListItemText primary={student.name} secondary={student.score} />
          </ListItem>
        ))}
      </List>
      <Text medium primary fontSize={'2rem'}>
        FEEDBACK
      </Text>
      <List>
        {course.studentList.map((student, key) => (
          <ListItem key={key}>
            <Avatar src={student.avatar} />
            <ListItemText primary={student.name} secondary={student.score} />
          </ListItem>
        ))}
      </List>
    </Grid>
  </Wrapper>
)

export default connect(state => ({
  course: {
    studentList: [
      {
        name: 'Thanh Nguyen',
        score: 100,
        avatar
      },
      {
        name: 'Arsenii',
        score: 100,
        avatar
      },
      {
        name: 'Alex',
        score: 100,
        avatar
      },
      {
        name: 'Hung',
        score: 100,
        avatar
      },
      {
        name: 'Nobody',
        score: 100,
        avatar
      }
    ],
    info: {
      name: 'Intermediate English',
      description: 'A good course',
      difficulty: 'Hard',
      'number of lesson': 10,
      created: 'Thu 26th September 2017'
    }
  }
}))(CourseDetail)
