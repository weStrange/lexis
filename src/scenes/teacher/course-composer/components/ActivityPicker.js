/* @flow */

import React from 'react'

import { List as ImmList } from 'immutable'

import Grid from 'material-ui/Grid'
import List, { ListItem } from 'material-ui/List'
import { Text } from 'common-components'

const activities = ImmList.of(
  {
    name: 'Video'
  },
  {
    name: 'Audio'
  },
  {
    name: 'Skype'
  },
  {
    name: 'Text'
  }
)

type ActivityPickerProps = {
  selectedItemIdx: number,
  onItemSelect?: (idx: number) => void,
  onItemReset?: () => void
}

export default function ActivityPicker ({
  selectedItemIdx,
  onItemSelect = () => {},
  onItemReset = () => {}
}: ActivityPickerProps) {
  return (
    <Grid item>
      <Text primary medium fontSize={'1.3em'}>
        Select activity
      </Text>
      <List>
        {activities.map((p, key) => (
          <ListItem button key={key} onClick={() => onItemSelect(key)}>
            <Text normal color='rgba(0,0,0, .84)'>
              {p.name}
            </Text>
          </ListItem>
        ))}
      </List>
    </Grid>
  )
}
