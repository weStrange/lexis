import React from 'react'
import styled, { withTheme } from 'styled-components'
import { Paper, Avatar, Text } from 'common-components'
import { grey, yellow, teal, blue } from 'material-ui/colors'
import List, { ListItem as MuiListItem } from 'material-ui/List'
import dashboardIcon from 'assets/trophy.svg'
import courseIcon from 'assets/blackboard.svg'
import courseComposerIcon from 'assets/compass.svg'
import tinyColor from 'tinycolor2'

const navigationItems = [
  {
    title: 'Dash Board',
    imgSrc: dashboardIcon
  },
  {
    title: 'Courses',
    imgSrc: courseIcon
  },
  {
    title: 'Course Composer',
    imgSrc: courseComposerIcon
  },
  {
    title: 'Profile',
    imgSrc: null
  }
]
const white = 'rgba(255,255,255, 0.86)'

const ListItem = styled(MuiListItem)`
  border-width: ${props => (props.selected ? '4px' : '0px')} !important;
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
  width: 250px;
  position: fixed;
  top: 56px;
  left: 0;
  background: ${grey[800]};
  padding-top: 3rem;
`
const ListText = styled(Text)`margin-left: 16px;`
const SideNavigation = props => {
  let currentIndex = 2 // for mocking purposes
  const setIndex = i => {
    currentIndex = i
  }
  return (
    <Wrapper elevation={3}>
      <List>
        {navigationItems.map((item, key) => {
          const selected = currentIndex === key
          return (
            <ListItem
              selected={selected}
              button
              key={key}
              onClick={e => setIndex(key)}
            >
              <Avatar
                backgroundColor='transparent'
                style={{ backgroundColor: 'transparent' }}
                imgProps={{ style: { transform: 'scale(0.8)' } }}
                src={item.imgSrc}
                size='3rem'
              />
              <ListText light={!selected} medium={selected} color={white}>
                {item.title}
              </ListText>
            </ListItem>
          )
        })}
      </List>
    </Wrapper>
  )
}
export default SideNavigation
