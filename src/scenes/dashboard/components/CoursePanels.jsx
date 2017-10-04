// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import type { AppState } from 'core/types'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import { Text } from 'common-components'
import { Paper } from 'material-ui'
import { Carousel } from 'common-components'

const styles = theme => ({
  coursePanel: theme.mixins.gutters({
    padding: theme.spacing.unit,
    margin: '10px',
    minHeight: '8rem'
  })
})

type Props = {
  courses: Array<any>,
  classes: any
}

const nCoursesPerView = 3

class CoursePanels extends Component {
  props: Props
  state: {
    selectedViewIdx: number
  }
  handleChangeIndex: Function

  constructor (props) {
    super(props)

    this.state = {
      selectedViewIdx: 0
    }

    this.handleChangeIndex = this.handleChangeIndex.bind(this)
  }

  handleChangeIndex (idx) {
    this.setState({
      selectedViewIdx: idx
    })
  }

  renderCoursePanels (offset, nCourses) {
    const { classes, courses } = this.props
    let coursePanels = []

    const coursesEndIndex =
      offset + nCourses > courses.length ? courses.length : offset + nCourses

    for (let i = offset; i < coursesEndIndex; i++) {
      coursePanels.push(
        <Grid item xs={12} lg={4} key={i}>
          <Paper className={classes.coursePanel} key={i}>
            <Text fontSize={'1.3rem'}>{courses[i].name}</Text>
            <br />
            <br />
            <Text>Complete 1/12</Text>
          </Paper>
        </Grid>
      )
    }

    return coursePanels
  }

  renderCoursePanelViews () {
    const { courses } = this.props

    const nViews = Math.floor(courses.length / nCoursesPerView) + 1

    let views = []

    for (let i = 0; i < nViews; i++) {
      views.push(
        <Grid container spacing={0} key={i} style={{ padding: '10px' }}>
          {this.renderCoursePanels(i * nCoursesPerView, nCoursesPerView)}
        </Grid>
      )
    }

    return views
  }

  render () {
    const { courses } = this.props
    const { selectedViewIdx } = this.state
    const nViews = Math.floor(courses.length / nCoursesPerView)

    return (
      <div>
        <Text fontSize='1.5rem'>Courses</Text>
        <Carousel
          nViews={nViews}
          children={this.renderCoursePanelViews()}
          onChangeIndex={this.handleChangeIndex}
          viewIdx={selectedViewIdx}
        />
      </div>
    )
  }
}

const StyledCoursePanels = withStyles(styles)(CoursePanels)

function mapStateToProps (state: AppState) {
  return {
    courses: [
      {
        name: 'Business English',
        completion: '1/12'
      },
      {
        name: 'Cooking English',
        completion: '1/12'
      },
      {
        name: 'English for travelling',
        completion: '1/12'
      },
      {
        name: 'English for kids',
        completion: '1/12'
      },
      {
        name: 'Basics of Esperanto',
        completion: '1/12'
      },
      {
        name: 'Advanced French',
        completion: '1/12'
      },
      {
        name: 'Advanced Italian',
        completion: '1/12'
      }
    ]
  }
}

export default connect(mapStateToProps)(StyledCoursePanels)
