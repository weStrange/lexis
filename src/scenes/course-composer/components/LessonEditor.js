/* @flow */

import React, { Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'
import List, { ListItem, ListItemText } from 'material-ui/List'
import { grey } from 'material-ui/colors'
import SaveIcon from 'material-ui-icons/Save'
import EditIcon from 'material-ui-icons/Edit'
import DeleteIcon from 'material-ui-icons/Delete'
import styled from 'styled-components'

import { Text, ActionButton } from 'common-components'
import { StyledGridTile, BlockedTextField, InputForm } from '.'

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

const ActivityButton = styled(Button)`
  width: 40px !important;
  height: 30px !important;
  float: right;
  position: relative;
  left: 20px;
  bottom: 15px;
`

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
          <div>
            <YouTube videoId={activity.url} />
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
      <div style={{ marginLeft: '5%' }}>
        <Text
          style={{
            textDecoration: 'underline'
          }}
          primary
          medium
          fontSize={'1.3em'}
        >
          Lesson details
        </Text>
        <InputForm>
          <BlockedTextField
            id='lesson-name'
            label='Lesson name'
            value={lesson.name}
            onChange={ev => actions.lesson.editName(ev.target.value)}
          />
        </InputForm>
        <Text
          style={{
            textDecoration: 'underline'
          }}
          primary
          medium
          fontSize={'1.3em'}
        >
          Lesson activities (use sidebar to add new ones)
        </Text>
        {lesson.activities.map((p, i) => (
          <Paper
            style={{
              width: '70%',
              margin: '50px 50px 50px 50px'
            }}
          >
            <ActivityButton
              fab
              color='accent'
              style={{ backgroundColor: '#CC0000' }}
              onClick={() => actions.activity.remove(i)}
            >
              <DeleteIcon />
            </ActivityButton>
            <ActivityButton fab color='primary'>
              <EditIcon />
            </ActivityButton>
            {this._displayActivity(p)}
          </Paper>
        ))}
        <ActivityPicker
          picker={activityPicker}
          onItemSelect={actions.activity.select}
        />

        <VideoModal
          video={videoModal}
          onUrlEdit={actions.video.editUrl}
          onClose={actions.video.close}
          onSave={actions.activity.add}
        />
        <AudioModal
          audio={audioModal}
          onUrlEdit={actions.audio.editUrl}
          onClose={actions.audio.close}
          onSave={actions.activity.add}
        />
        <SkypeModal
          skype={skypeModal}
          onTopicEdit={actions.skype.editTopic}
          onGroupToggle={actions.skype.toggleGroup}
          onDurationChange={actions.skype.editDuration}
          onStartTimeChange={actions.skype.editStartTime}
          onClose={actions.skype.close}
          onSave={actions.activity.add}
        />
        <TextModal
          text={textModal}
          onTextEdit={actions.text.editContent}
          onClose={actions.text.close}
          onSave={actions.activity.add}
        />

        <ActionButton style={{ right: '220px' }}>
          <SaveIcon />
        </ActionButton>
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
      video: bindActionCreators(actionCreators.videoActions, dispatch),
      activity: bindActionCreators(actionCreators.activityActions, dispatch)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LessonEditor)
