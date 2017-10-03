import React from 'react'
import styled from 'styled-components'
import { Text, Paper, CenterBox, Icon, Avatar } from '../../components'
import logo from 'assets/logo.svg'
import SettingMenu from './SettingsMenu'

import { connect } from 'react-redux'

import type { Role, AppState } from 'core/types'

const Logo = styled.img`
  width: 3.5rem;
  height: auto;
  margin-right: 1rem;
`
const white = 'rgba(255, 255, 255, 0.86)'
const Appbar = styled(Paper)`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 56px;
  padding: 1rem 3rem 1rem 0rem;
  background: linear-gradient(to left, #36d1dc, #5b86e5);
  align-items: center;
  justify-content: flex-start;
  z-index: 1000;
`

const LogoBox = styled(CenterBox)`
  justify-content: center;
  padding-left: 3rem;
  padding-right: 3rem;
`

const UserFunc = styled(CenterBox)`
  flex-basis: 100%;
  justify-content: flex-end;
  padding-right: 3em;
`
type TopbarProps = {
  role: Role
}
function Topbar ({ role }: TopbarProps) {
  return (
    <Appbar elevation={3} shadowColor='#5B86E5'>
      <LogoBox>
        <Logo src={logo} />
        <Text medium fontSize={'2rem'} color={white}>
          Lexis
        </Text>
      </LogoBox>
      <UserFunc>
        <Icon
          color={white}
          iconClassName='fa fa-bell-o'
          size='1.3rem'
          onClick={() => alert('Hello, world!')}
        />
        <SettingMenu />
        <Avatar size='3rem' style={{ marginRight: 12 }} />
        <Text light normal color={white}>
          {'Welcome, ' + (role === 'TEACHER' ? 'Teacher' : 'Student')}
        </Text>
      </UserFunc>
    </Appbar>
  )
}

export default connect((state: AppState) => ({
  role: state.nav.userRole
}))(Topbar)
