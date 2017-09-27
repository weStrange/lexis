/* @flow */

import React, { Component } from 'react'

import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'
import List, { ListItem, ListItemText } from 'material-ui/List'

import { SoundPlayerContainer } from 'react-soundplayer/addons'

import YouTube from 'react-youtube'

import type { MainViewState, ActivityAreaSelect } from '../types'

const commonStyles = {
  paddingTop: 16,
  paddingBottom: 16,
  marginLeft: window.innerWidth * 0.2,
  width: window.innerWidth * 0.4
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
  }),
  exerciseList: theme.mixins.gutters({
    width: window.innerWidth * 0.1,
    marginTop: theme.spacing.unit * 3,
    paddingLeft: 0,
    marginLeft: 0,
    float: 'left'
  })
})

type ActivityType = 'main' | 'secondary'

type ContentAreaProps = {
  mainView: MainViewState,
  classes: any, // material-ui thing
  onActivitySelect: (activity: ActivityAreaSelect) => void,
  onExerciseAdd: () => void,
  onExerciseSelect: (idx: number) => void
}
export class ContentArea extends Component {
  prop: ContentAreaProps
  _displayActivity: () => void

  constructor (props: ContentAreaProps) {
    super(props)

    this._displayActivity = this._displayActivity.bind(this)
  }

  _displayActivity (activityType: ActivityType) {
    let mainView = this.props.mainView
    let level = mainView.course.levels.get(mainView.currentLevelIdx)
    if (level === undefined) {
      return null
    }

    let lesson = level.lessons.get(mainView.currentLessonIdx)
    if (lesson === undefined) {
      return null
    }

    let exercise = lesson.exercises.get(mainView.currentExerciseIdx)
    if (exercise === undefined) {
      return null
    }

    let activity = exercise.mainActivity
    if (activity === null) {
      return null
    }

    switch (activity.type) {
      case 'video':
        return activity.url ? (
          <div
            style={{
              position: 'relative',
              paddingBottom: '56.25%',
              paddingRight: '20%',
              height: 0,
              overflow: 'hidden'
            }}
          >
            <YouTube
              opts={{
                height: window.innerHeight * 0.4,
                width: window.innerWidth * 0.4,
                top: 0
              }}
              videoId={activity.url}
            />
          </div>
        ) : null

      case 'audio':
        return activity.url ? (
          <SoundPlayerContainer resolveUrl={activity.url} />
        ) : null

      case 'text':

      case 'skype':

      default:
        return null
    }
  }

  render () {
    const {
      classes,
      mainView,
      onActivitySelect,
      onExerciseAdd,
      onExerciseSelect
    } = this.props
    let exercise = mainView.course.levels
      .get(mainView.currentLevelIdx)
      .lessons.get(mainView.currentLessonIdx)
      .exercises.get(mainView.currentExerciseIdx)

    return (
      <div
        style={{
          width: '100%',
          height: '100%'
        }}
        onClick={() => onActivitySelect('none')}
      >
        <List className={classes.exerciseList}>
          {mainView.currentLevelIdx >= 0 &&
          mainView.currentLessonIdx >= 0 &&
          mainView.course.levels.get(mainView.currentLevelIdx)
            ? mainView.course.levels
                .get(mainView.currentLevelIdx)
                .lessons.get(mainView.currentLessonIdx)
                .exercises.map((p, i) => (
                  <ListItem
                    key={i}
                    style={{
                      backgroundColor:
                        mainView.currentExerciseIdx === i
                          ? '#cbdbf4'
                          : '#ffffff'
                    }}
                    onClick={() => onExerciseSelect(i)}
                    button
                  >
                    {/* TODO: Add styling to allow for selectable components */}
                    <ListItemText primary={p.name} />
                  </ListItem>
                ))
            : null}
          <ListItem button onClick={onExerciseAdd}>
            <ListItemText primary='Add' />
          </ListItem>
        </List>
        <Paper
          className={classes.mainActivity}
          onClick={ev => {
            ev.stopPropagation()

            onActivitySelect('main')
          }}
          elevation={mainView.selectedActivityArea === 'main' ? 10 : 2}
        >
          {exercise && exercise.mainActivity === null ? (
            <label>Click here to select main activity</label>
          ) : (
            this._displayActivity('main')
          )}
        </Paper>

        <Paper
          className={classes.secondaryActivity}
          onClick={ev => {
            ev.stopPropagation()

            onActivitySelect('secondary')
          }}
          elevation={mainView.selectedActivityArea === 'secondary' ? 10 : 2}
        >
          {exercise && exercise.secondaryActivity === null ? (
            <label>Click here to select secondary activity</label>
          ) : (
            this._displayActivity('secondary')
          )}
        </Paper>
      </div>
    )
  }
}

export default withStyles(styles)(ContentArea)
