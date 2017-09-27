/* @flow */

import React from 'react'
import TextField from 'material-ui/TextField'
import List, { ListItem, ListItemText } from 'material-ui/List'
import styled from 'styled-components'

import { Text } from 'common-components'

import type { Lesson, Level } from '../types'

const LessonOverview = styled.div`float: right;`

const InputForm = styled.form`
  float: left;
  margin-left: 15%;
`

const BlockedTextField = styled(TextField)`
  width: 100%;
  display: block;
`

type LevelEditorProps = {
  level: Level,
  onDescriptionEdit: (desc: string) => void,
  onNameEdit: (name: string) => void,
  onLessonAdd: () => void,
  onLessonSelect: (idx: number) => void
}
export default function LevelEditor ({
  level,
  onDescriptionEdit,
  onNameEdit,
  onLessonAdd,
  onLessonSelect
}: LevelEditorProps) {
  return (
    <div>
      <InputForm>
        <BlockedTextField
          id='levelName'
          label='Level name'
          value={level.name}
          onChange={ev => onNameEdit(ev.target.value)}
        />
        <BlockedTextField
          id='course-description'
          label='Multiline'
          multiline
          rows='10'
          rowsMax='20'
          value={level.description}
          onChange={ev => onDescriptionEdit(ev.target.value)}
          margin='normal'
        />
      </InputForm>
      <LessonOverview>
        <Text primary medium fontSize={'1.3em'}>
          Lessons
        </Text>
        <List>
          {level.lessons.map((p, i) => (
            <ListItem key={i} button onClick={() => onLessonSelect(i)}>
              {p.name}
            </ListItem>
          ))}
          <ListItem button onClick={onLessonAdd}>
            Add
          </ListItem>
        </List>
      </LessonOverview>
    </div>
  )
}
