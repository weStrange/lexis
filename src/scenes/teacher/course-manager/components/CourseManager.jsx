/* @flow */

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import React, { Component } from 'react'
import styled from 'styled-components'
import Grid from 'material-ui/Grid'
import CourseList from './CourseList'

import * as actonCreators from '../action-creators'

import type { AppState } from '../../../../types'
import type { CourseManagerState } from '../types'

const Wrapper = styled(Grid)`
  padding: 2rem;
  width: 100%;
`

type CourseManagerProps = {
  courseManager: CourseManagerState,
  actions: any
}
export class CourseManager extends Component {
  props: CourseManagerProps

  componentWillMount () {
    this.props.actions.main.start()
  }

  render () {
    const { courseManager } = this.props

    return (
      <Wrapper container spacing={24}>
        <CourseList item courses={courseManager.course.all} md={4} />
        <Grid item md={8} />
      </Wrapper>
    )
  }
}

function mapStateToProps (state: AppState) {
  return {
    courseManager: state.teacher.courseManager
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: {
      details: bindActionCreators(actonCreators.detailsActions, dispatch),
      filter: bindActionCreators(actonCreators.filterActions, dispatch),
      main: bindActionCreators(actonCreators.mainActions, dispatch)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseManager)
