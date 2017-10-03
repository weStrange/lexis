/* @flow */

import { List as ListImm } from 'immutable'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link, withRouter } from 'react-router-dom'
import { findDOMNode } from 'react-dom'

import yellowBackground from 'assets/yellow-abstract-background.png'
import redBackground from 'assets/red-abstract-background.png'

import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Grid from 'material-ui/Grid'
import { GridList, GridListTileBar } from 'material-ui/GridList'
import { grey } from 'material-ui/colors'
import SaveIcon from 'material-ui-icons/Save'

import {
  Text,
  ActionButton,
  BackButton,
  StyledPopover
} from 'common-components'
import { StyledGridTile, BlockedTextField, InputForm, PlainLink } from '.'

import * as actionCreators from '../action-creators'

import type { Lesson, Level, LevelEditorState } from '../types'
import type { AppState } from 'core/types'

type LevelEditorProps = {
  levelEditor: LevelEditorState,
  levels: ListImm<Level>,
  history: any, // react router thing
  match: any, // react router thing
  actions: any
}
type EditorState = {
  popoverOpen: boolean,
  anchorEl: any
}
export class LevelEditor extends Component {
  props: LevelEditorProps
  state: EditorState

  constructor (props: LevelEditorProps) {
    super(props)

    this.state = {
      popoverOpen: false,
      anchorEl: null
    }

    let levelId = props.match.params.levelId
    if (levelId !== 'new') {
      let editedLevel = props.levels.get(levelId)

      if (!editedLevel) {
        return
      }

      // props.actions.level.startEdit(editedLevel)
    }
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
    const { levelEditor, match, actions } = this.props
    const { level } = levelEditor
    const { levelId, courseId } = match.params

    return (
      <div style={{ marginLeft: '5%' }}>
        <Link to={'/course-composer/' + courseId}>
          <BackButton
            onClick={() => actions.level.cleanEdit()}
            style={{ display: 'block' }}
          />
        </Link>
        <Text
          style={{
            textDecoration: 'underline'
          }}
          primary
          medium
          fontSize={'1.3em'}
        >
          Chapter details
        </Text>
        <InputForm>
          <BlockedTextField
            id='level-name'
            label='Chapter name'
            value={level.name}
            onChange={ev => actions.level.editName(ev.target.value)}
          />
          <BlockedTextField
            id='level-description'
            label='Chapter description'
            multiline
            rows='10'
            rowsMax='20'
            value={level.description}
            onChange={ev => actions.level.editDescription(ev.target.value)}
            margin='normal'
          />
        </InputForm>
        <Text
          style={{
            textDecoration: 'underline',
            marginTop: '50px'
          }}
          primary
          medium
          fontSize={'1.3em'}
        >
          Lessons
        </Text>

        <GridList style={{ marginLeft: '30px' }}>
          {level.lessons.map((p, i) => (
            <PlainLink
              to={'/course-composer/' + courseId + '/' + levelId + '/' + i}
            >
              <StyledGridTile image={`url(${yellowBackground})`} key={i} button>
                {p.name}
              </StyledGridTile>
            </PlainLink>
          ))}

          <PlainLink
            to={'/course-composer/' + courseId + '/' + levelId + '/new'}
          >
            <StyledGridTile image={`url(${redBackground})`} button>
              Add new
            </StyledGridTile>
          </PlainLink>
        </GridList>

        <ActionButton
          ref={node => {
            this.saveButton = node
          }}
          onClick={() => {
            if (levelId === 'new') {
              actions.level.add(level)
              this.props.history.push(
                '/course-composer/' + courseId + '/' + this.props.levels.size
              )
            } else {
              actions.level.save(levelId, level)
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

function mapStateToProps (state: AppState) {
  return {
    levelEditor: state.courseComposer.levelEditor,
    levels: state.courseComposer.courseEditor.course.levels
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: {
      level: bindActionCreators(actionCreators.levelActions, dispatch)
    }
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LevelEditor)
)
