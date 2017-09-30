import React from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { NavLink } from 'react-router-dom'

import styled, { withTheme } from 'styled-components'
import { Paper, Avatar, Text } from '../../components'
import { grey, yellow, teal, blue } from 'material-ui/colors'
import List, { ListItem as MuiListItem } from 'material-ui/List'
import dashboardIcon from 'assets/trophy.svg'
import courseIcon from 'assets/blackboard.svg'
import courseComposerIcon from 'assets/compass.svg'
import tinyColor from 'tinycolor2'

import * as actionCreators from 'core/action-creators'
import type { AppState } from 'core/types'

const navigationItems = {
  TEACHER: [
    {
      title: 'Dashboard',
      imgSrc: dashboardIcon,
      link: '/dashboard',
      disabled: false
    },
    {
      title: 'My Courses',
      imgSrc: courseIcon,
      link: '/course-manager',
      disabled: false
    },
    {
      title: 'Profile',
      imgSrc: null,
      link: '/profile',
      disabled: true
    }
  ],
  STUDENT: [
    {
      title: 'Dashboard',
      imgSrc: dashboardIcon,
      link: '/dashboard',
      disabled: false
    },
    {
      title: 'My Courses',
      imgSrc: courseIcon,
      link: '/courses',
      disabled: true
    },
    {
      title: 'Profile',
      imgSrc: null,
      link: '/profile',
      disabled: true
    }
  ]
}

const white = 'rgba(255,255,255, 0.86)'

const ListItem = styled(MuiListItem)`
  transition: all ${({ theme }) => theme.transition.hard} ease !important;
  border-color: ${props => props.theme.primary} !important;
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
  const renderNavigationItems = () => {
    return navigationItems[props.nav.userRole].map((item, key) => {
      return (
        <ListItem
          button
          disabled={item.disabled}
          key={key}
          onClick={() => props.actions.nav.setIndex(key)}
          component={NavLink}
          to={item.link}
          activeStyle={{ borderLeft: `4px solid` }}
        >
          <Avatar
            backgroundColor='transparent'
            style={{ backgroundColor: 'transparent' }}
            imgProps={{ style: { transform: 'scale(0.8)' } }}
            src={item.imgSrc}
            size='3rem'
            to={item.link}
          />
          <ListText color={white}>{item.title}</ListText>
        </ListItem>
      )
    })
  }

  return (
    <Wrapper elevation={3}>
      <List>{renderNavigationItems()}</List>
    </Wrapper>
  )
}

export default connect(
  (state: AppState) => ({ nav: state.nav, location: state.router.location }),
  dispatch => ({
    actions: {
      nav: bindActionCreators(actionCreators.navActions, dispatch)
    }
  })
)(SideNavigation)
