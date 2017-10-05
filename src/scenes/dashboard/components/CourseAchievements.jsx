// @flow

import React from 'react'
import type { AppState } from 'core/types'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'
import CourseAchievementsPanel from './CourseAchievementsPanel'

const styles = theme => ({
  container: theme.mixins.gutters({
    width: '100%',
    padding: '0 !important'
  }),
  panel: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginBottom: '30px'
  })
})

type Props = {
  courseData: Array<any>,
  classes: any
}

class CourseAchievements extends React.Component {
  props: Props

  renderCourseAchievementPanels () {
    const { courseData, classes } = this.props

    return courseData.map(course => <CourseAchievementsPanel course={course} />)
  }

  render () {
    const { classes } = this.props

    return (
      <div className={classes.container}>
        {this.renderCourseAchievementPanels()}
      </div>
    )
  }
}

function mapStateToProps (state: AppState) {
  return {
    courseData: [
      {
        name: 'Basics of French',
        achievements: [
          {
            name: 'Starter',
            description: 'Complete the 1st chapter'
          },
          {
            name: 'The Philosopher',
            description: 'Complete chapter on French Philosophy (8th)'
          }
        ]
      },
      {
        name: 'Basics of Spanish',
        achievements: [
          {
            name: 'Five Day Streak',
            description: 'Complete at least 1 lesson during 5 days in a row'
          },
          {
            name: 'The Intensive',
            description: 'Complete 2 chapters during 1 day'
          }
        ]
      }
    ]
  }
}

const StyledCourseAchievements = withStyles(styles)(CourseAchievements)

export default connect(mapStateToProps)(StyledCourseAchievements)
