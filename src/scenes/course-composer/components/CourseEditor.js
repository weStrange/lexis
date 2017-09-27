/* @flow */

import React from 'react'
import TextField from 'material-ui/TextField'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Input, { InputLabel } from 'material-ui/Input'
import { MenuItem } from 'material-ui/Menu'
import { FormControl, FormHelperText } from 'material-ui/Form'
import Select from 'material-ui/Select'
import styled from 'styled-components'

import { Text } from 'common-components'

import type { Course } from '../types'
import type { CourseDifficulty } from 'core/types'

const LevelOverview = styled.div`float: right;`

const InputForm = styled.form`
  float: left;
  margin-left: 15%;
`

const BlockedTextField = styled(TextField)`
  width: 100%;
  display: block;
`

type LevelEditorProps = {
  course: Course,
  onNameEdit: (name: string) => void,
  onDescriptionEdit: (desc: string) => void,
  onDifficultyEdit: (diff: CourseDifficulty) => void,
  onLevelAdd: () => void,
  onLevelSelect: (idx: number) => void
}
export default function CourseEditor ({
  course,
  onNameEdit,
  onLevelAdd,
  onLevelSelect,
  onDescriptionEdit,
  onDifficultyEdit
}: LevelEditorProps) {
  return (
    <div>
      <InputForm>
        <BlockedTextField
          id='course-name'
          label='Course name'
          value={course.name}
          onChange={ev => onNameEdit(ev.target.value)}
        />
        <BlockedTextField
          id='course-description'
          label='Course description'
          multiline
          rows='10'
          rowsMax='20'
          value={course.description}
          onChange={ev => onDescriptionEdit(ev.target.value)}
          margin='normal'
        />
        <FormControl
          style={{
            float: 'right',
            width: '40%',
            marginTop: '30px'
          }}
        >
          <InputLabel htmlFor='course-difficulty'>Difficulty</InputLabel>
          <Select
            value={course.difficulty}
            onChange={ev => onDifficultyEdit(ev.target.value)}
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
      <LevelOverview>
        <Text primary medium fontSize={'1.3em'}>
          Levels
        </Text>
        <List>
          {course.levels.map((p, i) => (
            <ListItem key={i} button onClick={() => onLevelSelect(i)}>
              {p.name}
            </ListItem>
          ))}
          <ListItem button onClick={onLevelAdd}>
            Add
          </ListItem>
        </List>
      </LevelOverview>
    </div>
  )
}
