// @flow

import React from 'react'
import { connect } from 'react-redux'
import type { AppState } from 'core/types'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import { Text } from 'common-components'
import { Paper } from 'material-ui'
import { Avatar, Carousel } from 'common-components'
import trophy from 'assets/trophy.svg'
import type { Achievement } from 'core/types'
import { List } from 'immutable'

const styles = theme => ({
  achievementPanel: theme.mixins.gutters({
    padding: theme.spacing.unit,
    margin: '10px',
    minHeight: '150px'
  })
})

type Props = {
  achievements: List<Achievement>,
  classes: any
}

const nAchievementsPerView = 3

class GeneralAchievements extends React.Component {
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

  renderAchievementPanels (offset, nCourses) {
    const { classes, achievements } = this.props
    let coursePanels = []

    const coursesEndIndex =
      offset + nCourses > achievements.size
        ? achievements.size
        : offset + nCourses

    for (let i = offset; i < coursesEndIndex; i++) {
      coursePanels.push(
        <Grid item sm={4}>
          <Paper className={classes.achievementPanel} key={i}>
            <Grid container>
              <Grid item sm={3}>
                <Avatar src={trophy} size={'3.7em'} />
              </Grid>
              <Grid item sm={9}>
                <Text fontSize={'1.3em'}>{achievements.get(i).name}</Text>
                <br />
                <br />
                <Text>{achievements.get(i).description}</Text>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      )
    }

    return coursePanels
  }

  renderAchievementPanelViews () {
    const { achievements } = this.props

    const nViews = Math.floor(achievements.size / nAchievementsPerView) + 1

    let views = []

    for (let i = 0; i < nViews; i++) {
      views.push(
        <Grid container spacing={12} key={i} style={{ padding: '10px' }}>
          {this.renderAchievementPanels(
            i * nAchievementsPerView,
            nAchievementsPerView
          )}
        </Grid>
      )
    }

    return views
  }

  render () {
    const { achievements } = this.props
    const { selectedViewIdx } = this.state
    const nViews = Math.floor(achievements.size / nAchievementsPerView)

    return (
      <div>
        <Text fontSize='1.5em'>General Achievements</Text>
        <Carousel
          nViews={nViews}
          children={this.renderAchievementPanelViews()}
          onChangeIndex={this.handleChangeIndex}
          viewIdx={selectedViewIdx}
        />
      </div>
    )
  }
}

const StyledGeneralAchievements = withStyles(styles)(GeneralAchievements)

export default StyledGeneralAchievements
