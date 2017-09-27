/* @flow */

import React from 'react'

import { List as ImmList } from 'immutable'

import Grid from 'material-ui/Grid'
import styled, { withTheme } from 'styled-components'
import { Paper, Avatar, Text } from 'common-components'
import { grey, yellow, teal, blue } from 'material-ui/colors'
import List, { ListItem as MuiListItem } from 'material-ui/List'
import tinyColor from 'tinycolor2'

import type { ActivityPickerState, ActivityAreaSelect } from '../types'

const white = 'rgba(255,255,255, 0.86)'

const ListItem = styled(MuiListItem)`
  border-width: ${props => (props.selected ? '8px' : '0px')} !important;
  border-style: solid !important;
  border-color: transparent transparent transparent
    ${props => props.selected && props.theme.primary} !important;
  &:hover {
    background-color: ${props =>
      tinyColor(props.theme.primary)
        .setAlpha(0.7)
        .toRgbString()} !important;
  }
`

const Wrapper = styled(Paper)`
  height: 100vh;
  width: 180px;
  position: fixed;
  top: 0px;
  padding-left: 20px;
  margin-right: 0px;
  right: -20px;
  background: ${grey[800]};
  padding-top: 3rem;
`

const activities = ImmList.of(
  {
    name: 'Video',
    kind: 'video',
    mainOnly: true
  },
  {
    name: 'Audio',
    kind: 'audio',
    mainOnly: false
  },
  {
    name: 'Skype',
    kind: 'skype',
    mainOnly: true
  },
  {
    name: 'Text',
    kind: 'text',
    mainOnly: false
  }
)

type ActivityPickerProps = {
  picker: ActivityPickerState,
  activityArea: ActivityAreaSelect,
  onItemSelect: (kind: string) => void
}

export default function ActivityPicker ({
  picker,
  activityArea,
  onItemSelect = () => {}
}: ActivityPickerProps) {
  return picker.open ? (
    <Wrapper>
      <Text primary medium fontSize={'1.3em'}>
        Select activity
      </Text>
      <List>
        {activities.map((p, key) => (
          <ListItem
            disabled={activityArea !== 'main' && p.mainOnly}
            button
            key={key}
            onClick={() => onItemSelect(p.kind)}
          >
            <Text normal color='white'>
              {p.name}
            </Text>
          </ListItem>
        ))}
      </List>
    </Wrapper>
  ) : null
}
