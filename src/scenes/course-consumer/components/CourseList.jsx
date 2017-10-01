// @flow

import type { CourseListItem } from '../types'
import * as React from 'react'

import { Wrapper, ListPanel } from 'common-components'
import { Grid, Paper } from 'material-ui'

type Props = {
  courses: Array<CourseListItem>
}

const CourseList = ({ courses }: Props) => {
  if (!courses) return null

  const renderCourseItems = () => {
    return courses.map(({ id, name, description }) => (
      <ListPanel heading={name} body={description} key={id} />
    ))
  }

  return <Wrapper>{renderCourseItems()}</Wrapper>
}

export default CourseList
