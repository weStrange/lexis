/* flow */
import React from 'react'
import styled from 'styled-components'
import Grid from 'material-ui/Grid'
import CourseList from './CourseList'

const Wrapper = styled(Grid)`
  padding: 2rem;
  width: 100%;
`

const CourseManager = props => (
  <Wrapper container spacing={24}>
    <CourseList item md={4} />
    <Grid item md={8} />
  </Wrapper>
)

export default CourseManager
