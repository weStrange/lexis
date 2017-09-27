// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import type { AppState } from '../../../../types'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import { Text } from 'common-components'
import { Paper } from 'material-ui'
import { Carousel } from 'common-components'

const styles = theme => ({
  coursePanel: theme.mixins.gutters({
    padding: theme.spacing.unit,
    margin: '10px'
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
        <Grid item sm={4}>
          <Paper className={classes.coursePanel} key={i}>
            <Text fontSize={'1.3em'}>{courses[i].name}</Text>
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
        <Grid container spacing={12} key={i} style={{ padding: '10px' }}>
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
        <Text fontSize='1.5em'>Courses</Text>
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
        name: 'Amazing English',
        completion: '1/12'
      },
      {
        name: 'Cooking English',
        completion: '1/12'
      },
      {
        name: 'Helping The Poor English',
        completion: '1/12'
      },
      {
        name: 'Saving Humanity English',
        completion: '1/12'
      },
      {
        name: 'Basics of Alien',
        completion: '1/12'
      },
      {
        name: 'Menani French',
        completion: '1/12'
      },
      {
        name: 'Advanced Seppo',
        completion: '1/12'
      }
    ]
  }
}

export default connect(mapStateToProps)(StyledCoursePanels)
