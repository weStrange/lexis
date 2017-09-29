/* @flow */

import React, { Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'
import List, { ListItem, ListItemText } from 'material-ui/List'
import { grey } from 'material-ui/colors'
import Add from 'material-ui-icons/Add'

import { Text } from 'common-components'

import YouTube from 'react-youtube'

import {
  ActivityPicker,
  VideoModal,
  AudioModal,
  SkypeModal,
  TextModal
} from '.'

import * as actionCreators from '../action-creators'

import type {
  LessonEditorState,
  TextModalState,
  AudioModalState,
  VideoModalState,
  SkypeModalState
} from '../types'
import type { AppState, Activity } from 'core/types'

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

type LessonEditorProps = {
  lessonEditor: LessonEditorState,
  textModal: TextModalState,
  audioModal: AudioModalState,
  videoModal: VideoModalState,
  skypeModal: SkypeModalState,
  actions: any
}
export class LessonEditor extends Component {
  prop: LessonEditorProps
  _displayActivity: () => void
  _getReadableDuration: () => void

  constructor (props: LessonEditorProps) {
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

  _displayActivity (activity: Activity) {
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
    const { lesson, activityPicker } = this.props.lessonEditor
    const {
      textModal,
      audioModal,
      videoModal,
      skypeModal,
      actions
    } = this.props

    return (
      <div
        style={{
          width: '100%',
          height: '100%'
        }}
      >
        {lesson.activities.map(p => this._displayActivity(p))}

        <ActivityPicker
          picker={activityPicker}
          onItemSelect={actions.activityPicker.select}
        />

        <VideoModal
          video={videoModal}
          onUrlEdit={actions.video.editUrl}
          onClose={actions.video.close}
          onSave={() => {}}
        />
        <AudioModal
          audio={audioModal}
          onUrlEdit={actions.audio.editUrl}
          onClose={actions.audio.close}
          onSave={() => {}}
        />
        <SkypeModal
          skype={skypeModal}
          onTopicEdit={actions.skype.editTopic}
          onGroupToggle={actions.skype.toggleGroup}
          onDurationChange={actions.skype.editDuration}
          onStartTimeChange={actions.skype.editStartTime}
          onClose={actions.skype.close}
          onSave={() => {}}
        />
        <TextModal
          text={textModal}
          onTextEdit={actions.text.editContent}
          onClose={actions.text.close}
          onSave={() => {}}
        />
      </div>
    )
  }
}

function mapStateToProps (state: AppState) {
  return {
    lessonEditor: state.courseComposer.lessonEditor,
    textModal: state.courseComposer.textModal,
    audioModal: state.courseComposer.audioModal,
    videoModal: state.courseComposer.videoModal,
    skypeModal: state.courseComposer.skypeModal
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: {
      lesson: bindActionCreators(actionCreators.lessonActions, dispatch),
      audio: bindActionCreators(actionCreators.audioActions, dispatch),
      skype: bindActionCreators(actionCreators.skypeActions, dispatch),
      text: bindActionCreators(actionCreators.textActions, dispatch),
      video: bindActionCreators(actionCreators.videoActions, dispatch)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(LessonEditor)
)
