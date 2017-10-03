/* @flow */

import { List as ListImm } from 'immutable'

import React, { Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link, withRouter } from 'react-router-dom'
import { findDOMNode } from 'react-dom'

import Paper from 'material-ui/Paper'
import Divider from 'material-ui/Divider'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'
import List, { ListItem, ListItemText } from 'material-ui/List'
import { grey } from 'material-ui/colors'
import SaveIcon from 'material-ui-icons/Save'
import EditIcon from 'material-ui-icons/Edit'
import CloseIcon from 'material-ui-icons/Close'
import DeleteIcon from 'material-ui-icons/Delete'
import styled from 'styled-components'

import {
  Text,
  ActionButton,
  BackButton,
  StyledPopover
} from 'common-components'
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
import type { AppState, Activity, Header, Lesson } from 'core/types'

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
  lessons: ListImm<Lesson>,
  textModal: TextModalState,
  audioModal: AudioModalState,
  videoModal: VideoModalState,
  skypeModal: SkypeModalState,
  history: any,
  match: any,
  actions: any
}
type EditorState = {
  popoverOpen: boolean,
  anchorEl: any
}
export class LessonEditor extends Component {
  props: LessonEditorProps
  state: EditorState

  constructor (props: LessonEditorProps) {
    super(props)

    this.state = {
      popoverOpen: false,
      anchorEl: null
    }

    let lessonId = props.match.params.lessonId
    if (lessonId !== 'new') {
      let editedLesson = props.lessons.get(lessonId)

      if (!editedLesson) {
        return
      }

      props.actions.lesson.startEdit(editedLesson)
    }
  }

  componentWillUnmount () {
    this.props.actions.lesson.cleanEdit()
  }

  handlePopoverOpen () {
    this.setState(prev => ({
      ...prev,
      popoverOpen: true,
      // $FlowIgnore
      anchorEl: findDOMNode(this.saveButton)
    }))

    setTimeout(
      () =>
        this.setState(prev => ({
          ...prev,
          popoverOpen: false
        })),
      3000
    )
  }

  handleRequestClose = () => {
    this.setState({
      popoverOpen: false
    })
  }

  saveButton = null

  render () {
    const {
      lesson,
      activityPicker,
      editedActivityIdx
    } = this.props.lessonEditor
    const {
      textModal,
      audioModal,
      videoModal,
      skypeModal,
      match,
      actions
    } = this.props
    const { lessonId, levelId, courseId } = match.params

    return (
      <div style={{ marginLeft: '5%' }}>
        <Link to={'/course-composer/' + courseId + '/' + levelId}>
          <BackButton style={{ display: 'block' }} />
        </Link>
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
        {/* Check if it is an Activity or a Header and select rendering respectively */}
        {lesson.activities.map(
          (p, i) =>
            p.type !== 'header' ? (
              <ActivityWrapper
                key={i}
                activity={p}
                onEditStart={() => {
                  actions.activity.startEdit(i)
                  actions.activity.select(p.type, p)
                }}
                onRemove={() => actions.activity.remove(i)}
              />
            ) : (
              <HeaderComponent
                key={i}
                header={p}
                isEdited={editedActivityIdx === i}
                onEdit={header => actions.header.edit(i, header)}
                onEditStart={() => actions.activity.startEdit(i)}
                onRemove={() => actions.activity.remove(i)}
              />
            )
        )}
        <ActivityPicker
          picker={activityPicker}
          onItemSelect={actions.activity.select}
          onHeaderAdd={actions.header.add}
        />

        <VideoModal
          video={videoModal}
          onUrlEdit={actions.video.editUrl}
          onClose={actions.video.close}
          onSave={actions.activity.save}
        />
        <AudioModal
          audio={audioModal}
          onUrlEdit={actions.audio.editUrl}
          onClose={actions.audio.close}
          onSave={actions.activity.save}
        />
        <SkypeModal
          skype={skypeModal}
          onTopicEdit={actions.skype.editTopic}
          onGroupToggle={actions.skype.toggleGroup}
          onDurationChange={actions.skype.editDuration}
          onStartTimeChange={actions.skype.editStartTime}
          onClose={actions.skype.close}
          onSave={actions.activity.save}
        />
        <TextModal
          text={textModal}
          onTextEdit={actions.text.editContent}
          onClose={actions.text.close}
          onSave={actions.activity.save}
        />

        <ActionButton
          ref={node => {
            this.saveButton = node
          }}
          style={{ right: '220px' }}
          onClick={() => {
            if (lessonId === 'new') {
              actions.lesson.add(lesson)
              this.props.history.push(
                '/course-composer/' +
                  courseId +
                  '/' +
                  levelId +
                  '/' +
                  this.props.lessons.size
              )
            } else {
              actions.lesson.save(levelId, lessonId, lesson)
            }
            this.handlePopoverOpen()
          }}
        >
          <SaveIcon />
        </ActionButton>
        <StyledPopover
          open={this.state.popoverOpen}
          anchorEl={this.state.anchorEl}
          onRequestClose={this.handleRequestClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
        >
          <Text>The changes have been saved</Text>
        </StyledPopover>
      </div>
    )
  }
}

type HeaderProps = {
  header: Header,
  isEdited: boolean,
  onRemove: () => void,
  onEditStart: () => void,
  onEdit: (header: Header) => void
}
type HeaderState = {
  editedText: string
}
class HeaderComponent extends Component {
  props: HeaderProps
  state: HeaderState

  constructor (props: HeaderProps) {
    super(props)

    this.state = {
      editedText: ''
    }
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ editedText: nextProps.header.text })
  }

  handleEdit (text: string) {
    this.setState(prevState => ({
      ...prevState,
      editedText: text
    }))
  }

  render () {
    const { header, isEdited, onEdit, onEditStart, onRemove } = this.props

    if (isEdited) {
      return (
        <div style={{ width: '50%' }}>
          <BlockedTextField
            style={{ width: '100%' }}
            value={this.state.editedText}
            onChange={ev => this.handleEdit(ev.target.value)}
          />
          <ActivityButton
            fab
            color='primary'
            onClick={() =>
              onEdit({
                text: this.state.editedText,
                type: 'header'
              })}
          >
            <SaveIcon />
          </ActivityButton>
        </div>
      )
    }

    return (
      <div style={{ width: '50%' }}>
        <ActivityButton
          fab
          color='accent'
          style={{ backgroundColor: '#CC0000' }}
          onClick={onRemove}
        >
          <DeleteIcon />
        </ActivityButton>
        <ActivityButton fab color='primary' onClick={onEditStart}>
          <EditIcon />
        </ActivityButton>

        <Text medium fontSize={'2rem'}>
          {header.text}
        </Text>
      </div>
    )
  }
}

type ActivityWrapperProps = {
  activity: Activity,
  onRemove: () => void,
  onEditStart: () => void
}
function ActivityWrapper ({
  activity,
  onRemove,
  onEditStart
}: ActivityWrapperProps) {
  return (
    <Paper
      style={{
        width: '70%',
        margin: '50px 50px 50px 50px'
      }}
    >
      <div style={{ width: '100%', height: '30px' }}>
        <CloseIcon style={{ float: 'right' }} onClick={onRemove} />
        <EditIcon style={{ float: 'right' }} onClick={onEditStart} />
      </div>
      <Divider />
      <ActivityContent activity={activity} />
    </Paper>
  )
}

type ActivityContentProps = {
  activity: Activity
}
function ActivityContent ({ activity }: ActivityContentProps) {
  if (activity === null) {
    return null
  }

  switch (activity.type) {
    case 'video':
      return activity.url ? (
        <div style={{ padding: '15px 6% 15px 6%' }}>
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
            width='50%'
            src='https://secure.skypeassets.com/i/common/images/icons/skype-logo-open-graph.png'
          />
          <List style={{ display: 'inline', width: '50%', float: 'right' }}>
            <ListItem>
              <ListItemText
                primary='Session topic'
                secondary={activity.topic}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary='Duration'
                secondary={getReadableDuration(activity.duration)}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary={
                  activity.group
                    ? 'It is a group session'
                    : 'It is an individual session'
                }
              />
            </ListItem>
          </List>
        </div>
      )

    default:
      return null
  }
}

function getReadableDuration (duration: number): string {
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

function mapStateToProps (state: AppState) {
  return {
    lessonEditor: state.courseComposer.lessonEditor,
    lessons: state.courseComposer.levelEditor.level.lessons,
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
      activity: bindActionCreators(actionCreators.activityActions, dispatch),
      header: bindActionCreators(actionCreators.headerActions, dispatch)
    }
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LessonEditor)
)
