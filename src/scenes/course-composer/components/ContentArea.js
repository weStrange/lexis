/* @flow */

import React, { Component } from 'react'

import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'
import List, { ListItem, ListItemText } from 'material-ui/List'
import { grey } from 'material-ui/colors'
import Add from 'material-ui-icons/Add'

import { Text } from 'common-components'

import YouTube from 'react-youtube'

import type { MainViewState, ActivityAreaSelect } from '../types'

const commonStyles = {
  paddingTop: 16,
  paddingBottom: 16,
  marginLeft: window.innerWidth * 0.175,
  width: window.innerWidth * 0.4,
  overflow: 'auto'
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
  _getReadableDuration: () => void

  constructor (props: ContentAreaProps) {
    super(props)

    this._displayActivity = this._displayActivity.bind(this)
    this._getReadableDuration = this._getReadableDuration.bind(this)
  }

  _getReadableDuration (duration: number): string {
    switch (duration) {
      case 0:
        return 'No duration limit'

      case 30 * 60:
        return '30 minutes'

      case 45 * 60:
        return '45 minutes'

      case 1 * 60 * 60:
        return '1 hour'

      case 1.5 * 60 * 60:
        return '1.5 hour'

      case 2 * 60 * 60:
        return '2 hours'

      case 2.5 * 60 * 60:
        return '2.5 hours'

      case 3 * 60 * 60:
        return '3 hours'

      default:
        return 'No duration limit'
    }
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

    let activity =
      activityType === 'main'
        ? exercise.mainActivity
        : exercise.secondaryActivity
    if (activity === null) {
      return null
    }

    switch (activity.type) {
      case 'video':
        return activity.url ? (
          <div
            style={{
              position: 'relative',
              paddingBottom: '50%',
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
        return null

      case 'text':
        return (
          <Text>
            {activity.content.split('\n').map(p => (
              <span>
                {p}
                <br />
              </span>
            ))}
          </Text>
        )

      case 'skype':
        return (
          <div>
            <img
              height={window.innerHeight * 0.39}
              width={window.innerWidth * 0.4}
              src='https://secure.skypeassets.com/i/common/images/icons/skype-logo-open-graph.png'
            />
            <div
              style={{
                position: 'absolute',
                bottom: window.innerHeight * 0.55,
                left: window.innerWidth * 0.25
              }}
            >
              <Text style={{ marginBottom: '20px' }} color='white'>
                {activity.topic}
              </Text>
              <br />
              <Text style={{ marginBottom: '20px' }} color='white'>
                {activity.group ? 'Group session' : 'Individual session'}
              </Text>
              <br />
              <Text style={{ marginBottom: '20px' }} color='white'>
                {this._getReadableDuration(activity.duration)}
              </Text>
            </div>
          </div>
        )

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
        <List
          style={{
            height: window.innerHeight * 0.65,
            overflow: 'auto'
          }}
          className={classes.exerciseList}
        >
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
                    <ListItemText primary={p.name} />
                  </ListItem>
                ))
            : null}
          <ListItem
            style={{
              marginTop: '10px',
              backgroundColor: '#36d1dc'
            }}
            button
            onClick={onExerciseAdd}
          >
            <span>
              <Add />
              <span
                style={{
                  float: 'right',
                  marginLeft: '20px',
                  marginTop: '5px'
                }}
              >
                Add
              </span>
            </span>
          </ListItem>
        </List>
        <Paper
          className={classes.mainActivity}
          onClick={ev => {
            ev.stopPropagation()

            onActivitySelect('main')
          }}
          elevation={mainView.selectedActivityArea === 'main' ? 15 : 2}
        >
          {exercise && exercise.mainActivity === null ? (
            <label style={{ marginLeft: '25%' }}>
              Click here to select main activity
            </label>
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
          elevation={mainView.selectedActivityArea === 'secondary' ? 15 : 2}
        >
          {exercise && exercise.secondaryActivity === null ? (
            <label style={{ marginLeft: '25%' }}>
              Click here to select secondary activity
            </label>
          ) : (
            this._displayActivity('secondary')
          )}
        </Paper>
      </div>
    )
  }
}

export default withStyles(styles)(ContentArea)
