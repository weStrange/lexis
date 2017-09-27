// @flow

import React from 'react'

import { List } from 'immutable'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'

import CategoryAchievementsPanel from './CategoryAchievementsPanel'
import type { AchievementCategory } from 'core/types'

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
  achievementData: List<AchievementCategory>,
  classes: any
}

class CourseAchievements extends React.Component {
  props: Props

  renderCourseAchievementPanels () {
    const { achievementData } = this.props

    return achievementData.map(course => (
      <CategoryAchievementsPanel course={course} />
    ))
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

export default withStyles(styles)(CourseAchievements)
