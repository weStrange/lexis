/* @flow */

import React, { Component } from 'react'

import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'

import type { MainViewState, ActivityAreaSelect } from '../types'

const commonStyles = {
  paddingTop: 16,
  paddingBottom: 16,
  width: window.innerWidth * 0.5
}
const styles = theme => ({
  mainActivity: theme.mixins.gutters({
    ...commonStyles,
    height: window.innerHeight * 0.4,
    marginTop: theme.spacing.unit * 3
  }),
  secondaryActivity: theme.mixins.gutters({
    ...commonStyles,
    height: window.innerHeight * 0.2,
    marginTop: theme.spacing.unit * 3
  })
})

type ContentAreaProps = {
  mainView: MainViewState,
  classes: any, // material-ui thing
  onActivitySelect: (activity: ActivityAreaSelect) => void
}
export class ContentArea extends Component {
  prop: ContentAreaProps

  render () {
    const { classes, mainView, onActivitySelect } = this.props

    return (
      <div
        style={{
          width: '100%',
          height: '100%'
        }}
        onClick={() => onActivitySelect('none')}
      >
        <Paper
          className={classes.mainActivity}
          onClick={ev => {
            ev.stopPropagation()

            onActivitySelect('main')
          }}
          elevation={mainView.selectedActivityArea === 'main' ? 10 : 2}
        >
          Click here to select main activity
        </Paper>

        <Paper
          className={classes.secondaryActivity}
          onClick={ev => {
            ev.stopPropagation()

            onActivitySelect('secondary')
          }}
          elevation={mainView.selectedActivityArea === 'secondary' ? 10 : 2}
        >
          Click here to select secondary activity
        </Paper>
      </div>
    )
  }
}

export default withStyles(styles)(ContentArea)
