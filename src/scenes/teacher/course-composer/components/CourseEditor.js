/* @flow */

import React from 'react'
import TextField from 'material-ui/TextField'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Input, { InputLabel } from 'material-ui/Input'
import { MenuItem } from 'material-ui/Menu'
import { FormControl, FormHelperText } from 'material-ui/Form'
import Select from 'material-ui/Select'

import { Text } from '../../../../components'

import type { Course, CourseDifficulty } from '../types'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  }
})

type LevelEditorProps = {
  course: Course,
  onNameEdit: (name: string) => void,
  onDescriptionEdit: (desc: string) => void,
  onDifficultyEdit: (diff: CourseDifficulty) => void,
  onLevelAdd: () => void,
  onLevelSelect: (idx: number) => void,
  classes?: any
}
export default function CourseEditor ({
  course,
  onNameEdit,
  onLevelAdd,
  onLevelSelect,
  onDescriptionEdit,
  onDifficultyEdit,
  classes = {}
}: LevelEditorProps) {
  return (
    <div>
      <form>
        <TextField
          id='course-name'
          label='Course name'
          value={course.name}
          onChange={ev => onNameEdit(ev.target.value)}
        />
        <TextField
          id='course-description'
          label='Multiline'
          multiline
          rowsMax='8'
          value={course.description}
          onChange={ev => onDescriptionEdit(ev.target.value)}
          margin='normal'
        />
        <FormControl className={classes.formControl}>
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
      </form>
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
    </div>
  )
}
