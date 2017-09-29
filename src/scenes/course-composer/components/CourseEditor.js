/* @flow */

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'

import React from 'react'
import Grid from 'material-ui/Grid'
import { GridList, GridListTileBar } from 'material-ui/GridList'
import Input, { InputLabel } from 'material-ui/Input'
import { MenuItem } from 'material-ui/Menu'
import { FormControl, FormHelperText } from 'material-ui/Form'
import Select from 'material-ui/Select'
import { grey } from 'material-ui/colors'
import SaveIcon from 'material-ui-icons/Save'

import { Text, ActionButton } from 'common-components'
import { StyledGridTile, BlockedTextField, InputForm } from '.'

import * as actionCreators from '../action-creators'

import type { CourseEditorState } from '../types'
import type { CourseDifficulty, AppState } from 'core/types'

type LevelEditorProps = {
  courseEditor: CourseEditorState,
  actions: any
}
export function CourseEditor ({ courseEditor, actions }: LevelEditorProps) {
  const { course } = courseEditor

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
          id='course-name'
          label='Course name'
          value={course.name}
          onChange={ev => actions.course.editName(ev.target.value)}
        />
        <BlockedTextField
          id='course-description'
          label='Course description'
          multiline
          rows='10'
          rowsMax='20'
          value={course.description}
          onChange={ev => actions.course.editDescription(ev.target.value)}
          margin='normal'
        />
        <FormControl
          style={{
            width: '40%',
            marginTop: '30px'
          }}
        >
          <InputLabel htmlFor='course-difficulty'>Difficulty</InputLabel>
          <Select
            value={course.difficulty}
            onChange={ev => actions.course.editDifficulty(ev.target.value)}
            input={<Input id='course-difficulty' />}
          >
            <MenuItem value={'Beginner'}>Beginner</MenuItem>
            <MenuItem value={'Intermediate'}>Intermediate</MenuItem>
            <MenuItem value={'Upper-intermediate'}>Upper-intermediate</MenuItem>
            <MenuItem value={'Advanced'}>Advanced</MenuItem>
            <MenuItem value={'Proficient'}>Proficient</MenuItem>
          </Select>
          <FormHelperText>Assess difficulty of the course</FormHelperText>
        </FormControl>
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
        {course.levels.map((p, i) => (
          <StyledGridTile key={i} button>
            {p.name}
          </StyledGridTile>
        ))}

        <StyledGridTile button>
          <Link to='/course-composer/new'>Add new</Link>
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
    courseEditor: state.courseComposer.courseEditor
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: {
      course: bindActionCreators(actionCreators.courseActions, dispatch)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseEditor)
