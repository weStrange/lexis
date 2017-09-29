/* @flow */

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'

import React from 'react'
import TextField from 'material-ui/TextField'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Grid from 'material-ui/Grid'
import { GridList, GridListTile, GridListTileBar } from 'material-ui/GridList'
import { grey } from 'material-ui/colors'
import SaveIcon from 'material-ui-icons/Save'
import styled from 'styled-components'

import { Text, ActionButton } from 'common-components'

import * as actionCreators from '../action-creators'

import type { Lesson, Level, LevelEditorState } from '../types'
import type { AppState } from 'core/types'

const StyledGridTile = styled(GridListTile)`
  border: 1px solid grey;
  border-radius: 20px;
  width: 200px !important;
  height: 60px !important;
  margin: 10px 7px 10px 7px;
`

const InputForm = styled.form`
  float: left;
  margin-left: 15%;
`

const BlockedTextField = styled(TextField)`
  width: 100%;
  display: block;
`

type LevelEditorProps = {
  levelEditor: LevelEditorState,
  actions: any
}
export function LevelEditor ({ levelEditor, actions }: LevelEditorProps) {
  const { level } = levelEditor

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
        Course details
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
        Chapters
      </Text>

      <GridList>
        {level.lessons.map((p, i) => (
          <StyledGridTile key={i} button>
            {p.name}
          </StyledGridTile>
        ))}

        <StyledGridTile button>
          <Link>Add new</Link>
        </StyledGridTile>
      </GridList>

      <ActionButton>
        <SaveIcon />
      </ActionButton>
    </div>
  )
}

function mapStateToProps (state: AppState) {
  return {
    levelEditor: state.courseComposer.levelEditor
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: {
      level: bindActionCreators(actionCreators.levelActions, dispatch)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LevelEditor)
