/* @flow */

import React from 'react'
import Topbar from './Topbar'
import SideNavigation from './SideNavigation'
import styled from 'styled-components'

const Content = styled.div`
  width: calc(100% - 265px);
  height: calc(100% - 88px);
  padding: 100px 0 0 250px;
`

export function AppShell ({ children }: any) {
  return (
    <div>
      <Topbar />
      <SideNavigation />
      <Content>{children}</Content>
    </div>
  )
}

export default AppShell
