/* @flow */

import React from 'react'
import TextField from 'material-ui/TextField'
import List, { ListItem, ListItemText } from 'material-ui/List'
import { grey } from 'material-ui/colors'
import Add from 'material-ui-icons/Add'
import styled from 'styled-components'

import { Text } from 'common-components'

import type { Lesson, Level } from '../types'

const LessonOverview = styled.div`
  position: fixed;
  top: 0px;
  padding-left: 20px;
  padding-right: 20px;
  margin-right: 0px;
  right: -20px;
  color: white;
  background: ${grey[800]};
  padding-top: 3rem;
  height: 200%;
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
          label='Level description'
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
          <ListItem style={{ marginTop: '10px' }} button onClick={onLessonAdd}>
            <span>
              <Add />
              <span
                style={{
                  float: 'right',
                  marginLeft: '20px',
                  marginTop: '5px'
                }}
              >
                Add
              </span>
            </span>
          </ListItem>
        </List>
      </LessonOverview>
    </div>
  )
}
