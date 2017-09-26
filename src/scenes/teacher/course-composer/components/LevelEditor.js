/* @flow */

import React from 'react'
import TextField from 'material-ui/TextField'
import List, { ListItem, ListItemText } from 'material-ui/List'

import { Text } from 'common-components'

import type { Lesson, Level } from '../types'

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
      <TextField
        id='levelName'
        label='Level name'
        value={level.name}
        onChange={ev => onNameEdit(ev.target.value)}
      />
      <TextField
        id='course-description'
        label='Multiline'
        multiline
        rowsMax='8'
        value={level.description}
        onChange={ev => onDescriptionEdit(ev.target.value)}
        margin='normal'
      />
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
    </div>
  )
}
