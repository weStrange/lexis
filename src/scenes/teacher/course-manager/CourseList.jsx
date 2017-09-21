/* flow */
import React from 'react'
import styled from 'styled-components'
import Grid from 'material-ui/Grid'
import List, { ListItem } from 'material-ui/List'
import { connect } from 'react-redux'
import { Text } from 'common-components'

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
const CourseList = ({ item, ...props }) => (
  <Grid item {...props}>
    <Text primary medium fontSize={'1.3em'}>
      Your courses
    </Text>
    <List>
      {props.courses.map((course, key) => (
        <CourseItem button key={key} onClick={e => console.log(key)}>
          <Text normal color='rgba(0,0,0, .84)'>
            {course.title}
          </Text>
        </CourseItem>
      ))}
    </List>
  </Grid>
)

export default connect(state => ({
  courses: [
    {
      title: 'Intermediate english 1'
    },
    {
      title: 'Intermediate english 2'
    },
    {
      title: 'Intermediate english 3'
    },
    {
      title: 'English for Kids 1'
    },
    {
      title: 'English for Kids 2'
    },
    {
      title: 'English for Kids 3'
    },
    {
      title: 'Conquer IELTS within 90 days - Writing'
    },
    {
      title: 'Conquer IELTS within 90 days - Reading'
    },
    {
      title: 'Conquer IELTS within 90 days - Listening'
    },
    {
      title: 'Conquer IELTS within 90 days - Speaking'
    },
    {
      title: 'English for Working people 1'
    },
    {
      title: 'English for Working people 2'
    },
    {
      title: 'Intensive speaking 1'
    },
    {
      title: 'Fluent conversation in English'
    },
    {
      title: 'English thesaurus'
    }
  ]
}))(CourseList)
